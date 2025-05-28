/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiError } from 'api/errors/apiError';
import { prismaService } from 'config/prisma';
import { BaseService } from './base.service';
import { Color } from 'config/prisma/generated/client';

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

    if (!project) {
      throw ApiError.notFound('Project not found');
    }

    const { inTeam } = await this.checkIsUserInTeam(project.team.id, {
      userId: initiatorId,
    });

    if (!inTeam) {
      throw ApiError.forbidden('You are not in this team');
    }

    const board = await prismaService.board.create({
      data: {
        name,
        projectId,
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

    if (!board) {
      throw ApiError.notFound('Board not found');
    }

    const { inTeam } = await this.checkIsUserInTeam(board.project.team.id, {
      userId: initiatorId,
    });

    if (!inTeam) {
      throw ApiError.forbidden('You are not in this team');
    }

    const deletedBoard = await prismaService.$transaction(async tx => {
      await Promise.all([
        tx.task.deleteMany({ where: { projectId: board.projectId } }),
        tx.column.deleteMany({ where: { projectId: board.projectId } }),
        tx.sticker.deleteMany({ where: { projectId: board.projectId } }),
      ]);

      return tx.board.delete({ where: { id } });
    });

    return { id: deletedBoard.id };
  }

  async renameBoard(args: { id: string; name: string; initiatorId: string }) {
    const { id, name, initiatorId } = args;

    const board = await prismaService.board.findUnique({
      where: { id },
      include: { project: { include: { team: true } } },
    });

    if (!board) {
      throw ApiError.notFound('Board not found');
    }

    const { inTeam } = await this.checkIsUserInTeam(board.project.team.id, {
      userId: initiatorId,
    });

    if (!inTeam) {
      throw ApiError.forbidden('You are not in this team');
    }

    const renamedBoard = await prismaService.board.update({
      where: { id },
      data: { name },
    });

    return { id: renamedBoard.id };
  }

  async getBoardById(args: { id: string; initiatorId: string }) {
    const { id, initiatorId } = args;

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
            },
          },
        },
      },
    });

    if (!board) {
      throw ApiError.notFound('Board not found');
    }

    const { inTeam } = await this.checkIsUserInTeam(board.project.team.id, {
      userId: initiatorId,
    });

    if (!inTeam) {
      throw ApiError.forbidden('You are not in this team');
    }

    const { project, ...res } = board;

    return res;
  }

  async getAllBoards(args: { projectId: string; initiatorId: string }) {
    const { projectId, initiatorId } = args;

    const project = await prismaService.project.findUnique({
      where: { id: projectId },
      include: { team: true },
    });

    if (!project) {
      throw ApiError.notFound('Project not found');
    }

    const { inTeam } = await this.checkIsUserInTeam(project.team.id, {
      userId: initiatorId,
    });

    if (!inTeam) {
      throw ApiError.forbidden('You are not in this team');
    }

    const boards = await prismaService.board.findMany({
      where: { projectId },
    });

    return boards;
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
      include: { project: { include: { team: true } } },
    });

    if (!board) {
      throw ApiError.notFound('Board not found');
    }

    const { inTeam } = await this.checkIsUserInTeam(board.project.team.id, {
      userId: initiatorId,
    });

    if (!inTeam) {
      throw ApiError.forbidden('You are not in this team');
    }

    const sticker = await prismaService.sticker.create({
      data: {
        name,
        color,
        boardId,
        projectId: board.projectId,
      },
    });

    return sticker;
  }

  async updateSticker(args: {
    id: string;
    name: string;
    color: Color;
    initiatorId: string;
  }) {
    const { id, name, color, initiatorId } = args;

    const sticker = await prismaService.sticker.findUnique({
      where: { id },
      include: { board: { include: { project: { include: { team: true } } } } },
    });

    if (!sticker) {
      throw ApiError.notFound('Sticker not found');
    }

    const { inTeam } = await this.checkIsUserInTeam(
      sticker.board.project.team.id,
      {
        userId: initiatorId,
      },
    );

    if (!inTeam) {
      throw ApiError.forbidden('You are not in this team');
    }

    const updatedSticker = await prismaService.sticker.update({
      where: { id },
      data: {
        name,
        color,
      },
    });

    return updatedSticker;
  }

  async deleteSticker(args: { id: string; initiatorId: string }) {
    const { id, initiatorId } = args;

    const sticker = await prismaService.sticker.findUnique({
      where: { id },
      include: { board: { include: { project: { include: { team: true } } } } },
    });

    if (!sticker) {
      throw ApiError.notFound('Sticker not found');
    }

    const { inTeam } = await this.checkIsUserInTeam(
      sticker.board.project.team.id,
      {
        userId: initiatorId,
      },
    );

    if (!inTeam) {
      throw ApiError.forbidden('You are not in this team');
    }

    const deletedSticker = await prismaService.sticker.delete({
      where: { id },
    });

    return { id: deletedSticker.id };
  }
}

export const boardService = new BoardService();
