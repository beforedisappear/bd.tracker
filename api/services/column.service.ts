import { ApiError } from 'api/errors/apiError';
import { prismaService } from 'config/prisma';
import { BaseService } from './base.service';

const COLUMN_ORDER_STEP = 1_000_000;
const NORMALIZATION_COLUMN_THRESHOLD = 15;

class ColumnService extends BaseService {
  async createColumn(args: {
    boardId: string;
    name: string;
    order: number;
    initiatorId: string;
  }) {
    const { boardId, name, order, initiatorId } = args;

    const board = await prismaService.board.findUnique({
      where: { id: boardId },
    });

    if (!board) throw ApiError.notFound('Board not found');

    const { inProject } = await this.checkIsUserInProject(board.projectId, {
      userId: initiatorId,
    });

    if (!inProject)
      throw ApiError.forbidden('You are not member of this project');

    const column = await prismaService.column.create({
      data: {
        name,
        boardId,
        order,
        projectId: board.projectId,
        tenantId: board.tenantId,
      },
    });

    return { ...column, tasks: [] };
  }

  async deleteColumn(args: { id: string; initiatorId: string }) {
    const { id, initiatorId } = args;

    const column = await prismaService.column.findUnique({
      where: { id },
    });

    if (!column) throw ApiError.notFound('Column not found');

    const { inProject } = await this.checkIsUserInProject(column.projectId, {
      userId: initiatorId,
    });

    if (!inProject)
      throw ApiError.forbidden('You are not member of this project');

    const deletedColumn = await prismaService.$transaction(async tx => {
      // удаляем все задачи в колонке
      await tx.task.deleteMany({ where: { columnId: id } });

      return tx.column.delete({ where: { id } });
    });

    return { id: deletedColumn.id, tenantId: deletedColumn.tenantId };
  }

  async renameColumn(args: { id: string; name: string; initiatorId: string }) {
    const { id, name, initiatorId } = args;

    const column = await prismaService.column.findUnique({
      where: { id },
    });

    if (!column) throw ApiError.notFound('Column not found');

    const { inProject } = await this.checkIsUserInProject(column.projectId, {
      userId: initiatorId,
    });

    if (!inProject)
      throw ApiError.forbidden('You are not member of this project');

    const renamedColumn = await prismaService.column.update({
      where: { id },
      data: { name },
    });

    return { id: renamedColumn.id, tenantId: renamedColumn.tenantId };
  }

  async moveColumn(args: { id: string; order: number; initiatorId: string }) {
    const { id, order, initiatorId } = args;

    const movedColumn = await prismaService.column.findUnique({
      where: { id },
      include: { board: true },
    });

    if (!movedColumn) throw ApiError.notFound('Column not found');

    const { inProject } = await this.checkIsUserInProject(
      movedColumn.projectId,
      { userId: initiatorId },
    );

    if (!inProject)
      throw ApiError.forbidden('You are not member of this project');

    const moveCount = movedColumn.board.columnMoveCount;
    const shouldNormalize = moveCount >= NORMALIZATION_COLUMN_THRESHOLD;

    await prismaService.column.update({
      where: { id },
      data: {
        order,
        board: { update: { columnMoveCount: moveCount + 1 } },
      },
    });

    if (shouldNormalize) {
      await this.normalizeOrder(movedColumn.boardId);
    }

    return {
      isNormalized: shouldNormalize,
      id: movedColumn.id,
      tenantId: movedColumn.tenantId,
    };
  }

  private async normalizeOrder(boardId: string) {
    try {
      await prismaService.$transaction(async tx => {
        const columns = await tx.column.findMany({
          where: { boardId },
          orderBy: { order: 'asc' },
        });

        for (let i = 0; i < columns.length; i++) {
          await tx.column.update({
            where: { id: columns[i].id },
            data: { order: i * COLUMN_ORDER_STEP },
          });
        }

        await tx.board.update({
          where: { id: boardId },
          data: { columnMoveCount: 0 },
        });
      });
    } catch (error) {
      console.error(error);

      throw ApiError.internal('Failed to normalize columns order');
    }
  }
}

export const columnService = new ColumnService();
