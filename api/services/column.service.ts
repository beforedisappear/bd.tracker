/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiError } from '$/errors/apiError';
import { prismaService } from '&/prisma';
import { BaseService } from './base.service';
import { Column } from '&/prisma/generated/client';

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

    return renamedColumn;
  }

  async moveColumn(args: {
    id: string;
    newPosition: 'start' | 'end' | { afterColumnId: string };
    initiatorId: string;
  }) {
    const { id, newPosition, initiatorId } = args;

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

    const movedColumn = await prismaService.$transaction(async tx => {
      // First, remove the column from its current position
      if (column.previousColumn) {
        await tx.column.update({
          where: { id: column.previousColumn.id },
          data: { nextColumnId: column.nextColumn?.id || null },
        });
      }

      if (column.nextColumn) {
        await tx.column.update({
          where: { id: column.nextColumn.id },
          data: { previousColumn: { disconnect: true } },
        });
      }

      // Then, place it in the new position
      if (newPosition === 'start') {
        const firstColumn = await tx.column.findFirst({
          where: { boardId: column.boardId, previousColumn: null },
        });

        if (firstColumn) {
          await tx.column.update({
            where: { id: firstColumn.id },
            data: { previousColumn: { connect: { id } } },
          });
        }

        return tx.column.update({
          where: { id },
          data: { previousColumn: { disconnect: true } },
        });
      } else if (newPosition === 'end') {
        const lastColumn = await tx.column.findFirst({
          where: { boardId: column.boardId, nextColumn: null },
        });

        if (lastColumn) {
          await tx.column.update({
            where: { id: lastColumn.id },
            data: { nextColumn: { connect: { id } } },
          });
        }

        return tx.column.update({
          where: { id },
          data: { nextColumn: { disconnect: true } },
        });
      } else {
        const afterColumn = await tx.column.findUnique({
          where: { id: newPosition.afterColumnId },
          include: { nextColumn: true },
        });

        if (!afterColumn) {
          throw ApiError.notFound('Target column not found');
        }

        if (afterColumn.nextColumn) {
          await tx.column.update({
            where: { id: afterColumn.nextColumn.id },
            data: { previousColumn: { connect: { id } } },
          });
        }

        await tx.column.update({
          where: { id: afterColumn.id },
          data: { nextColumn: { connect: { id } } },
        });

        return tx.column.update({
          where: { id },
          data: { previousColumn: { connect: { id: afterColumn.id } } },
        });
      }
    });

    return movedColumn;
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

  async getAllColumns(args: { boardId: string; initiatorId: string }) {
    const { boardId, initiatorId } = args;

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

    // Get all columns and sort them by their linked list order
    const columns = await prismaService.column.findMany({
      where: { boardId },
      include: {
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

    // Find the first column (the one without a previous column)
    const firstColumn = columns.find(col => !col.previousColumn);
    if (!firstColumn) return [];

    // Build the ordered array
    const orderedColumns: typeof columns = [];
    let currentColumn: typeof firstColumn | undefined = firstColumn;
    while (currentColumn) {
      orderedColumns.push(currentColumn);
      currentColumn = columns.find(
        col => col.id === currentColumn!.nextColumnId,
      );
    }

    return orderedColumns;
  }
}

export const columnService = new ColumnService();
