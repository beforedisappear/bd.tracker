import { ApiError } from 'api/errors/apiError';
import { prismaService } from 'config/prisma';
import { BaseService } from './base.service';
import { Color } from 'config/prisma/generated/client';
import { PrismaClient } from '@prisma/client';

class TaskService extends BaseService {
  async getTaskById(args: { id: string; initiatorId: string }) {
    const { id, initiatorId } = args;

    const task = await prismaService.task.findUnique({
      where: { id },
      include: { stickers: true, assignees: true },
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
    description?: string;
    color?: Color;
    assigneeIds?: string[];
    initiatorId: string;
  }) {
    const { columnId, title, description, color, assigneeIds, initiatorId } =
      args;

    const column = await prismaService.column.findUnique({
      where: { id: columnId },
      include: { board: { include: { project: { include: { team: true } } } } },
    });

    if (!column) {
      throw ApiError.notFound('Column not found');
    }

    const { inTeam } = await this.checkIsUserInTeam(
      column.board.project.team.id,
      { userId: initiatorId },
    );

    if (!inTeam) {
      throw ApiError.forbidden('You are not in this team');
    }

    // Get the last task in the column to link it with the new one
    const lastTask = await prismaService.task.findFirst({
      where: { columnId, nextTaskId: null },
    });

    const task = await prismaService.task.create({
      data: {
        title,
        description,
        color,
        columnId,
        projectId: column.board.project.id,
        assignees: assigneeIds
          ? { connect: assigneeIds.map(id => ({ id })) }
          : undefined,
        // If there is a last task, connect it with the new one
        ...(lastTask && {
          previousTask: {
            connect: { id: lastTask.id },
          },
        }),
      },
      include: {
        assignees: true,
        stickers: true,
        previousTask: { select: { id: true } },
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

    const deletedTask = await prismaService.$transaction(async tx => {
      // Update task order by connecting previous and next tasks
      if (task.nextTaskId) {
        await tx.task.update({
          where: { id: task.nextTaskId },
          data: { previousTask: { disconnect: true } },
        });
      }

      return tx.task.delete({ where: { id } });
    });

    return { id: deletedTask.id };
  }

  async moveTask(args: {
    id: string;
    nextTaskId: string | null;
    previousTaskId: string | null;
    columnId: string;
    initiatorId: string;
  }) {
    const { id, nextTaskId, previousTaskId, columnId, initiatorId } = args;

    // Если передали оба, то выкидываем ошибку
    if (nextTaskId && previousTaskId) {
      throw ApiError.badRequest(
        'Only one of nextTaskId or previousTaskId must be provided',
      );
    }

    const [movedTask, targetColumn] = await Promise.all([
      prismaService.task.findUnique({
        where: { id },
        select: {
          id: true,
          projectId: true,
          previousTask: { select: { id: true } },
          nextTask: { select: { id: true } },
        },
      }),
      prismaService.column.findUnique({
        where: { id: columnId },
        select: {
          projectId: true,
          tasks: {
            where: { isArchived: false },
            select: { id: true },
          },
        },
      }),
    ]);

    if (!movedTask || !targetColumn)
      throw ApiError.notFound('Task or column not found');

    // Проверяем, что задача и колонка в одном проекте
    if (movedTask.projectId !== targetColumn.projectId) {
      throw ApiError.forbidden('Cannot move task to a different project');
    }

    const { inProject } = await this.checkIsUserInProject(movedTask.projectId, {
      userId: initiatorId,
    });

    if (!inProject) throw ApiError.forbidden('You are not in this project');

    await prismaService.$transaction(async tx => {
      // 1. Корректно обновляем старые связи перемещаемой задачи
      if (movedTask.previousTask && movedTask.nextTask) {
        // Задача была между двумя — связываем их напрямую
        await this.extractTask(
          {
            id: movedTask.id,
            previousTaskId: movedTask.previousTask.id,
            nextTaskId: movedTask.nextTask.id,
          },
          tx,
        );
      } else if (movedTask.previousTask) {
        // Задача была последней
        await this.extractTask(
          {
            id: movedTask.id,
            previousTaskId: movedTask.previousTask.id,
            nextTaskId: null,
          },
          tx,
        );
      } else if (movedTask.nextTask) {
        // Задача была первой
        await this.extractTask(
          {
            id: movedTask.id,
            previousTaskId: null,
            nextTaskId: movedTask.nextTask.id,
          },
          tx,
        );
      }

      const isEmptyArgs = !nextTaskId && !previousTaskId;

      // 2. Обновляем перемещаемую задачу и новые связи
      // Обновляем колонку задачи
      await tx.task.update({
        where: { id },
        data: {
          column: { connect: { id: columnId } },
          ...(isEmptyArgs
            ? {
                previousTask: { disconnect: true },
                nextTask: { disconnect: true },
              }
            : {}),
        },
      });

      // вставка после указанной задачи
      if (previousTaskId) {
        await this.insertAfterTask({ id, previousTaskId }, tx);
        return null;
      }

      // вставка перед указанной задачей
      if (nextTaskId) {
        await this.insertBeforeTask({ id, nextTaskId }, tx);
        return null;
      }

      // Если оба ID null, делаем задачу последней в колонке
      if (isEmptyArgs) {
        const lastTaskInColumn = await tx.task.findFirst({
          where: {
            columnId,
            nextTaskId: null,
            id: { not: id }, // Исключаем саму перемещаемую задачу
          },
        });

        if (lastTaskInColumn) {
          await this.insertAfterTask(
            { id, previousTaskId: lastTaskInColumn.id },
            tx,
          );
        }
      }

      return null;
    });

    return { id: movedTask.id };
  }

  // Вставляем задачу после указанной задачи
  private async insertAfterTask(
    args: { id: string; previousTaskId: string },
    tx: PrismaClient,
  ) {
    const { id, previousTaskId } = args;

    // проверяем, что предыдущая задача существует
    const previousTask = await tx.task.findUnique({
      where: { id: previousTaskId },
      select: { nextTask: { select: { id: true } } },
    });

    if (!previousTask) throw ApiError.notFound('Previous task not found');

    // обновляем ссылки на предыдущую и следующую задачу перемещаемой задачи
    await tx.task.update({
      where: { id },
      data: {
        previousTask: { connect: { id: previousTaskId } },
        nextTask: previousTask.nextTask
          ? { connect: { id: previousTask.nextTask.id } }
          : { disconnect: true },
      },
    });

    // назначаем movedTask в качестве next для previousTask
    await tx.task.update({
      where: { id: previousTaskId },
      data: { nextTask: { connect: { id } } },
    });

    // назначаем movedTask в качестве previous для nextTask у previousTask
    if (previousTask.nextTask) {
      await tx.task.update({
        where: { id: previousTask.nextTask.id },
        data: {
          previousTask: { connect: { id } },
        },
      });
    }

    return null;
  }

  // Вставляем задачу перед указанной задачей
  private async insertBeforeTask(
    args: { id: string; nextTaskId: string },
    tx: PrismaClient,
  ) {
    const { id, nextTaskId } = args;

    // проверяем, что следующая задача существует
    const nextTask = await tx.task.findUnique({
      where: { id: nextTaskId },
      select: { previousTask: { select: { id: true } } },
    });

    if (!nextTask) throw ApiError.notFound('Next task not found');

    // обновляем ссылки на предыдущую и следующую задачу перемещаемой задачи
    await tx.task.update({
      where: { id },
      data: {
        nextTask: { connect: { id: nextTaskId } },
        previousTask: nextTask.previousTask
          ? { connect: { id: nextTask.previousTask.id } }
          : { disconnect: true },
      },
    });

    // назначаем movedTask в качестве previous для nextTask
    await tx.task.update({
      where: { id: nextTaskId },
      data: { previousTask: { connect: { id } } },
    });

    // назначаем movedTask в качестве next для previousTask у nextTask
    if (nextTask.previousTask) {
      await tx.task.update({
        where: { id: nextTask.previousTask.id },
        data: { nextTask: { connect: { id } } },
      });
    }

    return null;
  }

  // Извлекаем задачу из текущего места и корректно обновляем ссылки на соседние задачи
  private async extractTask(
    args: {
      id: string;
      previousTaskId: string | null;
      nextTaskId: string | null;
    },
    tx: PrismaClient,
  ) {
    const { id, previousTaskId, nextTaskId } = args;

    // если у переданной задачи есть и предыдущая и следующая задача
    if (previousTaskId && nextTaskId) {
      await Promise.all([
        // очищаем ссылки на предыдущую и следующую задачу
        this.clearTaskConnections({ id }, tx),
        // связываем соседние задачи переданной задачи между собой
        tx.task.update({
          where: { id: previousTaskId },
          data: { nextTask: { connect: { id: nextTaskId } } },
        }),
        tx.task.update({
          where: { id: nextTaskId },
          data: { previousTask: { connect: { id: previousTaskId } } },
        }),
      ]);
      return null;
    }

    // если переданная задача - последняя
    if (previousTaskId) {
      await Promise.all([
        this.clearTaskConnections({ id }, tx),
        tx.task.update({
          where: { id: previousTaskId },
          data: { nextTask: { disconnect: true } },
        }),
      ]);

      return null;
    }

    // если переданная задача - первая
    if (nextTaskId) {
      await Promise.all([
        this.clearTaskConnections({ id }, tx),
        tx.task.update({
          where: { id: nextTaskId },
          data: { previousTask: { disconnect: true } },
        }),
      ]);

      return null;
    }

    throw ApiError.badRequest('Invalid task connections');
  }

  // Очищаем ссылки на предыдущую и следующую задачу
  private async clearTaskConnections(args: { id: string }, tx: PrismaClient) {
    const { id } = args;

    await tx.task.update({
      where: { id },
      data: {
        previousTask: { disconnect: true },
        nextTask: { disconnect: true },
      },
    });
  }
}

export const taskService = new TaskService();
