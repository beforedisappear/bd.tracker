/* eslint-disable @typescript-eslint/no-unused-vars */
import { BaseService } from './base.service';
import { ApiError } from 'api/errors/apiError';
import { prismaService } from 'config/prisma';
import type { Color } from 'config/prisma/generated/client';

class BoardService extends BaseService {
  async createBoard(args: {
    projectId: string;
    name: string;
    initiatorId: string;
  }) {
    const { projectId, name, initiatorId } = args;

    const project = await prismaService.project.findUnique({
      where: { id: projectId },
      include: { team: true },
    });

    if (!project) throw ApiError.notFound('Project not found');

    const { inProject } = await this.checkIsUserInProject(project.id, {
      userId: initiatorId,
    });

    if (!inProject) throw ApiError.forbidden('You are not in this project');

    const board = await prismaService.board.create({
      data: {
        name,
        projectId,
        tenantId: project.team.id,
      },
    });

    return board;
  }

  async deleteBoard(args: { id: string; initiatorId: string }) {
    const { id, initiatorId } = args;

    const board = await prismaService.board.findUnique({
      where: { id },
      include: { project: { include: { team: true } } },
    });

    if (!board) throw ApiError.notFound('Board not found');

    const { inProject } = await this.checkIsUserInProject(board.project.id, {
      userId: initiatorId,
    });

    if (!inProject) throw ApiError.forbidden('You are not in this project');

    // Check if this is the only board in the project
    const boardCount = await prismaService.board.count({
      where: { projectId: board.projectId },
    });

    if (boardCount <= 1)
      throw ApiError.badRequest('Cannot delete the only board in the project');

    const deletedBoard = await prismaService.$transaction(async tx => {
      await Promise.all([
        tx.task.deleteMany({ where: { column: { boardId: id } } }),
        tx.column.deleteMany({ where: { boardId: id } }),
        tx.sticker.deleteMany({ where: { boardId: id } }),
      ]);

      return tx.board.delete({ where: { id } });
    });

    return { id: deletedBoard.id, tenantId: deletedBoard.tenantId };
  }

  async renameBoard(args: { id: string; name: string; initiatorId: string }) {
    const { id, name, initiatorId } = args;

    const board = await prismaService.board.findUnique({
      where: { id },
      include: { project: { include: { team: true } } },
    });

    if (!board) throw ApiError.notFound('Board not found');

    const { inProject } = await this.checkIsUserInProject(board.project.id, {
      userId: initiatorId,
    });

    if (!inProject) throw ApiError.forbidden('You are not in this project');

    const renamedBoard = await prismaService.board.update({
      where: { id },
      data: { name },
    });

    return renamedBoard;
  }

  async getBoardById(args: {
    id: string;
    initiatorId: string;
    colors?: Color[];
    assigneeIds?: string[];
    dateRange?: [string, string];
    stickerIds?: string[];
  }) {
    const { id, initiatorId, colors, assigneeIds, dateRange, stickerIds } =
      args;

    const taskFilters: Record<string, unknown> = {};

    if (assigneeIds) {
      taskFilters.assignees = { some: { id: { in: assigneeIds } } };
    }

    if (stickerIds) {
      taskFilters.stickers = { some: { id: { in: stickerIds } } };
    }

    if (colors) {
      taskFilters.color = { in: colors };
    }

    if (dateRange) {
      const [startDate, endDate] = dateRange;

      if (startDate && endDate) {
        taskFilters.startDate = { gte: new Date(startDate) };
        taskFilters.endDate = { lte: new Date(endDate) };
      }
    }

    const board = await prismaService.board.findUnique({
      where: { id },
      include: {
        project: { include: { team: true } },
        columns: {
          include: {
            tasks: {
              include: {
                assignees: true,
                stickers: true,
              },
              where:
                Object.keys(taskFilters).length > 0 ? taskFilters : undefined,
            },
          },
        },
      },
    });

    if (!board) throw ApiError.notFound('Board not found');

    const { inProject } = await this.checkIsUserInProject(board.project.id, {
      userId: initiatorId,
    });

    if (!inProject) throw ApiError.forbidden('You are not in this project');

    const { project, ...res } = board;

    return res;
  }

  async getAllBoards(args: { projectId: string; initiatorId: string }) {
    const { projectId, initiatorId } = args;

    const project = await prismaService.project.findUnique({
      where: { id: projectId },
      include: { team: true },
    });

    if (!project) throw ApiError.notFound('Project not found');

    const { inProject } = await this.checkIsUserInProject(project.id, {
      userId: initiatorId,
    });

    if (!inProject) throw ApiError.forbidden('You are not in this project');

    const boards = await prismaService.board.findMany({
      where: { projectId },
      orderBy: { createdAt: 'asc' },
    });

    return boards;
  }

  async getAllStickers(args: { boardId: string; initiatorId: string }) {
    const { boardId, initiatorId } = args;

    const board = await prismaService.board.findUnique({
      where: { id: boardId },
    });

    if (!board) throw ApiError.notFound('Board not found');

    const { inProject } = await this.checkIsUserInProject(board.projectId, {
      userId: initiatorId,
    });

    if (!inProject) throw ApiError.forbidden('You are not in this project');

    const stickers = await prismaService.sticker.findMany({
      where: { boardId },
      orderBy: { createdAt: 'asc' },
    });

    return stickers;
  }

  async createSticker(args: {
    boardId: string;
    name: string;
    initiatorId: string;
    color?: Color;
  }) {
    const { boardId, name, color, initiatorId } = args;

    const board = await prismaService.board.findUnique({
      where: { id: boardId },
    });

    if (!board) {
      throw ApiError.notFound('Board not found');
    }

    const { inProject } = await this.checkIsUserInProject(board.projectId, {
      userId: initiatorId,
    });

    if (!inProject) throw ApiError.forbidden('You are not in this project');

    const sticker = await prismaService.sticker.create({
      data: {
        name,
        color,
        boardId,
        projectId: board.projectId,
        tenantId: board.tenantId,
      },
    });

    return sticker;
  }

  async updateSticker(args: {
    id: string;
    name?: string;
    color?: Color;
    initiatorId: string;
  }) {
    const { id, name, color, initiatorId } = args;

    const sticker = await prismaService.sticker.findUnique({
      where: { id },
    });

    if (!sticker) throw ApiError.notFound('Sticker not found');

    const { inProject } = await this.checkIsUserInProject(sticker.projectId, {
      userId: initiatorId,
    });

    if (!inProject) throw ApiError.forbidden('You are not in this project');

    const updatedSticker = await prismaService.sticker.update({
      where: { id },
      data: { name, color },
    });

    return updatedSticker;
  }

  async deleteSticker(args: { id: string; initiatorId: string }) {
    const { id, initiatorId } = args;

    const sticker = await prismaService.sticker.findUnique({
      where: { id },
    });

    if (!sticker) throw ApiError.notFound('Sticker not found');

    const { inProject } = await this.checkIsUserInProject(sticker.projectId, {
      userId: initiatorId,
    });

    if (!inProject) throw ApiError.forbidden('You are not in this project');

    const deletedSticker = await prismaService.sticker.delete({
      where: { id },
    });

    return deletedSticker;
  }
}

export const boardService = new BoardService();
