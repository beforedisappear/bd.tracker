import type { Task } from '@/entities/Board';

// TODO: устранить дублирование кода с restoreColumnsOrder
export function restoreTasksOrder(tasks: Task[]) {
  if (tasks.length === 0) return [];

  const mapTasksById: Record<string, Task> = {};
  const setOfNextTaskIds = new Set<string>();
  const mapOfPreviousTaskIds = new Map<string, string>();

  for (const task of tasks) {
    mapTasksById[task.id] = task;

    if (task.nextTaskId != null) {
      setOfNextTaskIds.add(task.nextTaskId);
      mapOfPreviousTaskIds.set(task.nextTaskId, task.id);
    }
  }

  const head = tasks.find(task => !setOfNextTaskIds.has(task.id));

  if (!head) throw new Error('Head not found');

  const ordered: Task[] = [];
  let current: Task | null = head;

  while (current) {
    ordered.push(current);

    current = current.nextTaskId ? mapTasksById[current.nextTaskId] : null;
  }

  // Check if we found all tasks
  if (ordered.length !== tasks.length) {
    // Return original array if some tasks were lost
    return tasks;
  }

  return ordered;
}
