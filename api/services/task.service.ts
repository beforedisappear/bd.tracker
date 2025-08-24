import { ApiError } from 'api/errors/apiError';
import { prismaService } from 'config/prisma';
import { BaseService } from './base.service';
import { Color } from 'config/prisma/generated/client';

const TASK_ORDER_STEP = 1_000_000;
const NORMALIZATION_TASK_THRESHOLD = 10;

class TaskService extends BaseService {
  async getTaskById(args: { id: string; initiatorId: string }) {
    const { id, initiatorId } = args;

    const task = await prismaService.task.findUnique({
      where: { id },
      include: { stickers: true, assignees: true, author: true },
    });

    if (!task) throw ApiError.notFound('Task not found');

    const { inProject } = await this.checkIsUserInProject(task.projectId, {
      userId: initiatorId,
    });

    if (!inProject) throw ApiError.forbidden('You are not in this project');

    return task;
  }

  async createTask(args: {
    columnId: string;
    title: string;
    order: number;
    description?: string;
    color?: Color;
    assigneeIds?: string[];
    initiatorId: string;
  }) {
    const {
      columnId,
      title,
      order,
      description,
      color,
      assigneeIds,
      initiatorId,
    } = args;

    const column = await prismaService.column.findUnique({
      where: { id: columnId },
    });

    if (!column) throw ApiError.notFound('Column not found');

    const { inProject } = await this.checkIsUserInProject(column.projectId, {
      userId: initiatorId,
    });

    if (!inProject) throw ApiError.forbidden('You are not in this project');

    const task = await prismaService.task.create({
      data: {
        title,
        description,
        color,
        order,
        columnId,
        projectId: column.projectId,
        tenantId: column.tenantId,
        authorId: initiatorId,
        assignees: assigneeIds
          ? { connect: assigneeIds.map(id => ({ id })) }
          : undefined,
      },
      include: {
        assignees: true,
        stickers: true,
      },
    });

    return task;
  }

  async updateTask(args: {
    id: string;
    title?: string;
    description?: string | null;
    color?: Color;
    isDone?: boolean;
    isArchived?: boolean;
    startDate?: string | null;
    endDate?: string | null;
    assigneeIds?: string[];
    stickerIds?: string[];
    initiatorId: string;
  }) {
    const {
      id,
      title,
      description,
      color,
      isDone,
      isArchived,
      startDate,
      endDate,
      assigneeIds,
      stickerIds,
      initiatorId,
    } = args;

    const task = await prismaService.task.findUnique({
      where: { id },
    });

    if (!task) throw ApiError.notFound('Task not found');

    const { inProject } = await this.checkIsUserInProject(task.projectId, {
      userId: initiatorId,
    });

    if (!inProject) throw ApiError.forbidden('You are not in this project');

    const updatedTask = await prismaService.task.update({
      where: { id },
      data: {
        title,
        description,
        color,
        isDone,
        isArchived,
        startDate,
        endDate,
        assignees: assigneeIds
          ? {
              set: [], // Clear existing assignees
              connect: assigneeIds.map(id => ({ id })),
            }
          : undefined,
        stickers: stickerIds
          ? {
              set: [],
              connect: stickerIds.map(id => ({ id })),
            }
          : undefined,
      },
      include: {
        assignees: true,
        stickers: true,
      },
    });

    return updatedTask;
  }

  async deleteTask(args: { id: string; initiatorId: string }) {
    const { id, initiatorId } = args;

    const task = await prismaService.task.findUnique({
      where: { id },
    });

    if (!task) throw ApiError.notFound('Task not found');

    const { inProject } = await this.checkIsUserInProject(task.projectId, {
      userId: initiatorId,
    });

    if (!inProject) throw ApiError.forbidden('You are not in this project');

    const deletedTask = await prismaService.task.delete({
      where: { id },
    });

    return { id: deletedTask.id, tenantId: deletedTask.tenantId };
  }

  async moveTask(args: {
    id: string;
    order: number;
    columnId?: string;
    initiatorId: string;
  }) {
    const { id, order, columnId, initiatorId } = args;

    const movedTask = await prismaService.task.findUnique({
      where: { id },
      include: { column: true },
    });

    if (!movedTask) throw ApiError.notFound('Task not found');

    let targetColumnId = movedTask.columnId;
    let targetColumnProjectId = movedTask.projectId;
    let targetColumnMoveCount = movedTask.column.taskMoveCount;

    if (columnId) {
      const targetColumn = await prismaService.column.findUnique({
        where: { id: columnId },
      });

      if (!targetColumn) throw ApiError.notFound('Column not found');

      targetColumnId = targetColumn.id;
      targetColumnProjectId = targetColumn.projectId;
      targetColumnMoveCount = targetColumn.taskMoveCount;
    }

    // Проверяем, что задача и колонка в одном проекте
    if (targetColumnProjectId !== movedTask.projectId)
      throw ApiError.forbidden('Cannot move task to a different project');

    const { inProject } = await this.checkIsUserInProject(
      targetColumnProjectId,
      { userId: initiatorId },
    );

    if (!inProject) throw ApiError.forbidden('You are not in this project');

    const shouldNormalize =
      targetColumnMoveCount >= NORMALIZATION_TASK_THRESHOLD;

    let newOrder = order;

    await prismaService.$transaction(async tx => {
      return Promise.all([
        tx.task.update({
          where: { id },
          data: { order, columnId: targetColumnId },
        }),
        tx.column.update({
          where: { id: targetColumnId },
          data: { taskMoveCount: targetColumnMoveCount + 1 },
        }),
      ]);
    });

    if (shouldNormalize) {
      const normalizedOrder = await this.normalizeOrder(targetColumnId, id);
      newOrder = normalizedOrder;
    }

    return {
      id: movedTask.id,
      columnId: targetColumnId,
      newOrder,
      isNormalized: shouldNormalize,
      tenantId: movedTask.tenantId,
    };
  }

  private async normalizeOrder(columnId: string, taskId: string) {
    let newOrder = 0;

    try {
      await prismaService.$transaction(async tx => {
        const tasks = await tx.task.findMany({
          where: { columnId },
          orderBy: { order: 'asc' },
        });

        for (let i = 0; i < tasks.length; i++) {
          const updatedTask = await tx.task.update({
            where: { id: tasks[i]!.id },
            data: { order: i * TASK_ORDER_STEP },
          });

          if (updatedTask.id === taskId) newOrder = updatedTask.order;
        }

        await tx.column.update({
          where: { id: columnId },
          data: { taskMoveCount: 0 },
        });
      });
    } catch (error) {
      console.error(error);

      throw ApiError.internal('Failed to normalize tasks order');
    }

    return newOrder;
  }
}

export const taskService = new TaskService();
