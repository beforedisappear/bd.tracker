import { ApiError } from 'api/errors/apiError';
import { prismaService } from 'config/prisma';
import { BaseService } from './base.service';

import type { PrismaClient } from '@prisma/client';

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

    const { inProject } = await this.checkIsUserInProject(board.projectId, {
      userId: initiatorId,
    });

    if (!inProject)
      throw ApiError.forbidden('You are not member of this project');

    // Get the last column to link it with the new one
    const lastColumn = await prismaService.column.findFirst({
      where: { boardId, nextColumnId: null },
    });

    const column = await prismaService.column.create({
      data: {
        name,
        boardId,
        projectId: board.projectId,
        // если есть последняя колонка, то связываем ее с новой
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
        previousColumn: true,
        nextColumn: true,
      },
    });

    if (!column) {
      throw ApiError.notFound('Column not found');
    }

    const { inProject } = await this.checkIsUserInProject(column.projectId, {
      userId: initiatorId,
    });

    if (!inProject)
      throw ApiError.forbidden('You are not member of this project');

    const deletedColumn = await prismaService.$transaction(async tx => {
      // удаляем все задачи в колонке
      await tx.task.deleteMany({ where: { columnId: id } });

      // обновляем ссылки у соседних колонок
      await this.extractColumn(
        {
          id,
          previousColumnId: column.previousColumn?.id ?? null,
          nextColumnId: column.nextColumn?.id ?? null,
        },
        tx,
      );

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

    const { inProject } = await this.checkIsUserInProject(column.projectId, {
      userId: initiatorId,
    });

    if (!inProject)
      throw ApiError.forbidden('You are not member of this project');

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

    // Если ничего не передано, то выкидываем ошибку
    if (!nextColumnId && !previousColumnId) {
      throw ApiError.badRequest(
        'Either nextColumnId or previousColumnId must be provided',
      );
    }

    // Если передали оба, то выкидываем ошибку
    if (nextColumnId && previousColumnId) {
      throw ApiError.badRequest(
        'Only one of nextColumnId or previousColumnId must be provided',
      );
    }

    const movedColumn = await prismaService.column.findUnique({
      where: { id },
      include: {
        board: { include: { project: { include: { team: true } } } },
        previousColumn: true,
        nextColumn: true,
      },
    });

    if (!movedColumn) {
      throw ApiError.notFound('Column not found');
    }

    const { inProject } = await this.checkIsUserInProject(
      movedColumn.projectId,
      { userId: initiatorId },
    );

    if (!inProject)
      throw ApiError.forbidden('You are not member of this project');

    await prismaService.$transaction(async tx => {
      // 1. Корректно обновляем старые связи перемещаемой колонки
      if (movedColumn.previousColumn && movedColumn.nextColumn) {
        // Колонка была между двумя — связываем их напрямую
        await this.extractColumn(
          {
            id: movedColumn.id,
            previousColumnId: movedColumn.previousColumn.id,
            nextColumnId: movedColumn.nextColumn.id,
          },
          tx,
        );
      } else if (movedColumn.previousColumn) {
        // Колонка была последней
        await this.extractColumn(
          {
            id: movedColumn.id,
            previousColumnId: movedColumn.previousColumn.id,
            nextColumnId: null,
          },
          tx,
        );
      } else if (movedColumn.nextColumn) {
        // Колонка была первой
        await this.extractColumn(
          {
            id: movedColumn.id,
            previousColumnId: null,
            nextColumnId: movedColumn.nextColumn.id,
          },
          tx,
        );
      }

      // 2. Обновляем перемещаемую колонку и новые связи

      // вставка после указанной колонки
      if (previousColumnId) {
        await this.insertAfterColumn({ id, previousColumnId }, tx);
        return null;
      }

      // вставка перед указанной колонкой
      if (nextColumnId) {
        await this.insertBeforeColumn({ id, nextColumnId }, tx);
        return null;
      }
    });

    return null;
  }

  //вставляем колонку после указанной колонки
  private async insertAfterColumn(
    args: { id: string; previousColumnId: string },
    tx: PrismaClient,
  ) {
    const { id, previousColumnId } = args;

    // проверяем, что предыдущая колонка существует
    const previousColumn = await tx.column.findUnique({
      where: { id: previousColumnId },
      include: { nextColumn: true },
    });

    if (!previousColumn) throw ApiError.notFound('Previous column not found');

    // обновляем ссылки на предыдущую и следующую колонку перемещаемой колонки
    await tx.column.update({
      where: { id },
      data: {
        previousColumn: { connect: { id: previousColumnId } },
        nextColumn: previousColumn.nextColumn
          ? { connect: { id: previousColumn.nextColumn.id } }
          : { disconnect: true },
      },
    });

    // назначем movedColumn в качестве next для previousColumn
    await tx.column.update({
      where: { id: previousColumnId },
      data: { nextColumn: { connect: { id } } },
    });

    // назначем movedColumn в качестве previous для nextColumn у previousColumn
    if (previousColumn.nextColumn) {
      await tx.column.update({
        where: { id: previousColumn.nextColumn.id },
        data: {
          previousColumn: { connect: { id } },
        },
      });
    }

    return null;
  }

  //вставляем колонку перед указанной колонкой
  private async insertBeforeColumn(
    args: { id: string; nextColumnId: string },
    tx: PrismaClient,
  ) {
    const { id, nextColumnId } = args;

    // проверяем, что следующая колонка существует
    const nextColumn = await tx.column.findUnique({
      where: { id: nextColumnId },
      include: { previousColumn: true },
    });

    if (!nextColumn) throw ApiError.notFound('Next column not found');

    // обновляем ссылки на предыдущую и следующую колонку перемещаемой колонки
    await tx.column.update({
      where: { id },
      data: {
        nextColumn: { connect: { id: nextColumnId } },
        previousColumn: nextColumn.previousColumn
          ? { connect: { id: nextColumn.previousColumn.id } }
          : { disconnect: true },
      },
    });

    // назначаем movedColumn в качестве previous для nextColumn
    await tx.column.update({
      where: { id: nextColumnId },
      data: { previousColumn: { connect: { id } } },
    });

    // назначаем movedColumn в качестве next для previousColumn у nextColumn
    if (nextColumn.previousColumn) {
      await tx.column.update({
        where: { id: nextColumn.previousColumn.id },
        data: { nextColumn: { connect: { id } } },
      });
    }

    return null;
  }

  //извлекаем колонку из текущего места и корректно обновляем ссылки на соседние колонки
  private async extractColumn(
    args: {
      id: string;
      previousColumnId: string | null;
      nextColumnId: string | null;
    },
    tx: PrismaClient,
  ) {
    const { id, previousColumnId, nextColumnId } = args;

    // если у переданной колонки есть и предыдущая и следующая колонка
    if (previousColumnId && nextColumnId) {
      await Promise.all([
        //очищаем ссылки на предыдущую и следующую колонку
        this.clearColumnConnections({ id }, tx),
        //связываем соседние колонки переданной колонки между собой
        tx.column.update({
          where: { id: previousColumnId },
          data: { nextColumn: { connect: { id: nextColumnId } } },
        }),
        tx.column.update({
          where: { id: nextColumnId },
          data: { previousColumn: { connect: { id: previousColumnId } } },
        }),
      ]);
      return null;
    }

    // если переднная колонка - последняя
    if (previousColumnId) {
      await Promise.all([
        this.clearColumnConnections({ id }, tx),
        tx.column.update({
          where: { id },
          data: { nextColumn: { disconnect: true } },
        }),
      ]);

      return null;
    }

    // если переданная колонка - первая
    if (nextColumnId) {
      await Promise.all([
        this.clearColumnConnections({ id }, tx),
        tx.column.update({
          where: { id },
          data: { previousColumn: { disconnect: true } },
        }),
      ]);

      return null;
    }

    // если переданная колонка - единственная
    await this.clearColumnConnections({ id }, tx);

    return null;
  }

  //очищаем ссылки на предыдущую и следующую колонку
  private async clearColumnConnections(args: { id: string }, tx: PrismaClient) {
    const { id } = args;

    await tx.column.update({
      where: { id },
      data: {
        previousColumn: { disconnect: true },
        nextColumn: { disconnect: true },
      },
    });
  }
}

export const columnService = new ColumnService();
