/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiError } from 'api/errors/apiError';
import { prismaService } from 'config/prisma';
import { BaseService } from './base.service';

class ColumnService extends BaseService {
  async createColumn(args: {
    boardId: string;
    name: string;
    initiatorId: string;
  }) {
    const { boardId, name, initiatorId } = args;

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

    // Get the last column to link it with the new one
    const lastColumn = await prismaService.column.findFirst({
      where: { boardId, nextColumnId: null },
    });

    const column = await prismaService.column.create({
      data: {
        name,
        boardId,
        projectId: board.projectId,
        // If there's a last column, link it with the new one
        ...(lastColumn && {
          previousColumn: {
            connect: { id: lastColumn.id },
          },
        }),
      },
    });

    return column;
  }

  async deleteColumn(args: { id: string; initiatorId: string }) {
    const { id, initiatorId } = args;

    const column = await prismaService.column.findUnique({
      where: { id },
      include: {
        board: { include: { project: { include: { team: true } } } },
        previousColumn: true,
        nextColumn: true,
      },
    });

    if (!column) {
      throw ApiError.notFound('Column not found');
    }

    const { inTeam } = await this.checkIsUserInTeam(
      column.board.project.team.id,
      {
        userId: initiatorId,
      },
    );

    if (!inTeam) {
      throw ApiError.forbidden('You are not in this team');
    }

    const deletedColumn = await prismaService.$transaction(async tx => {
      // Delete all tasks in the column
      await tx.task.deleteMany({ where: { columnId: id } });

      // Update the links between previous and next columns
      if (column.previousColumn && column.nextColumn) {
        await tx.column.update({
          where: { id: column.previousColumn.id },
          data: { nextColumnId: column.nextColumn.id },
        });
      } else if (column.previousColumn) {
        await tx.column.update({
          where: { id: column.previousColumn.id },
          data: { nextColumnId: null },
        });
      } else if (column.nextColumn) {
        await tx.column.update({
          where: { id: column.nextColumn.id },
          data: { previousColumn: { disconnect: true } },
        });
      }

      return tx.column.delete({ where: { id } });
    });

    return { id: deletedColumn.id };
  }

  async renameColumn(args: { id: string; name: string; initiatorId: string }) {
    const { id, name, initiatorId } = args;

    const column = await prismaService.column.findUnique({
      where: { id },
      include: { board: { include: { project: { include: { team: true } } } } },
    });

    if (!column) {
      throw ApiError.notFound('Column not found');
    }

    const { inTeam } = await this.checkIsUserInTeam(
      column.board.project.team.id,
      {
        userId: initiatorId,
      },
    );

    if (!inTeam) {
      throw ApiError.forbidden('You are not in this team');
    }

    const renamedColumn = await prismaService.column.update({
      where: { id },
      data: { name },
    });

    return { id: renamedColumn.id };
  }

  async moveColumn(args: {
    id: string;
    nextColumnId: string | null;
    previousColumnId: string | null;
    initiatorId: string;
  }) {
    const { id, nextColumnId, previousColumnId, initiatorId } = args;

    if (!nextColumnId && !previousColumnId) {
      throw ApiError.badRequest(
        'Either nextColumnId or previousColumnId must be provided',
      );
    }

    const column = await prismaService.column.findUnique({
      where: { id },
      include: {
        board: { include: { project: { include: { team: true } } } },
        previousColumn: true,
        nextColumn: true,
      },
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

    const movedColumn = await prismaService.$transaction(async tx => {});

    return { id: '123' };
  }

  async getColumnById(args: { id: string; initiatorId: string }) {
    const { id, initiatorId } = args;

    const column = await prismaService.column.findUnique({
      where: { id },
      include: {
        board: { include: { project: { include: { team: true } } } },
        tasks: {
          include: {
            assignees: true,
            stickers: true,
          },
        },
        previousColumn: true,
        nextColumn: true,
      },
    });

    if (!column) {
      throw ApiError.notFound('Column not found');
    }

    const { inTeam } = await this.checkIsUserInTeam(
      column.board.project.team.id,
      {
        userId: initiatorId,
      },
    );

    if (!inTeam) {
      throw ApiError.forbidden('You are not in this team');
    }

    return column;
  }
}

export const columnService = new ColumnService();
