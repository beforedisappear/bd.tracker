import {
  ProjectWithFirstBoardId,
  projectQueries,
  RenameProjectSchema,
} from '@/entities/Project';
import { useMutation } from '@tanstack/react-query';
import { ZodError } from 'zod';
import { useState, type FocusEvent, type RefObject } from 'react';
import { toast } from 'sonner';
import { getErrorMessage, getZodErrorMessage } from '@/shared/lib/error';

interface Args {
  project: ProjectWithFirstBoardId;
  tenant: string;
  inputRef: RefObject<HTMLInputElement | null>;
}

export function useProjectNameEditing(args: Args) {
  const { project, tenant, inputRef } = args;

  const [isEditing, setIsEditing] = useState(false);
  const [projectName, setProjectName] = useState(project.name);

  const { mutateAsync: renameProject } = useMutation(
    projectQueries.renameProject(),
  );

  const onStartEditing = () => {
    setTimeout(() => {
      setIsEditing(true);
      inputRef.current?.focus();
    }, 100);
  };

  const onEndEditing = (e: FocusEvent<HTMLInputElement>) => {
    setIsEditing(false);

    const name = e.target.value;

    if (name === project.name) return;

    try {
      RenameProjectSchema.parse({ name });
    } catch (error) {
      if (error instanceof ZodError) toast.error(getZodErrorMessage(error));
      setProjectName(project.name);
      return;
    }

    renameProject({ teamIdOrSlug: tenant, projectId: project.id, name })
      .then(() => {})
      .catch(e => {
        toast.error(getErrorMessage(e));
        setProjectName(project.name);
      });
  };

  return {
    isEditing,
    projectName,
    setProjectName,
    onStartEditing,
    onEndEditing,
  };
}
