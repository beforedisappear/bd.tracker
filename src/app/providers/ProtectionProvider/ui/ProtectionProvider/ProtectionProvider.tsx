'use client';

import { Loader2 } from 'lucide-react';

import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useLayoutEffect } from 'react';

import { teamQueries } from '@/entities/Team';
import { getHomeRoutePath } from '@/shared/config/routes';

import { isAxiosError } from 'axios';

interface IProps {
  children: React.ReactNode;
}

/**
 * Используется для защиты маршрутов от несанкционированного доступа.
 * Данная реализация выступает компромиссом между хорошим UX и дезопасностью.
 * Более безопасный вариант - проверка на уровне ServerComponent,
 * что не позволяет сохранять для страниц статическую генерацию (А это необходимо, поскольку приложение закрытое и
 * в SSR смысла здесь нет).
 * Ещё один вариант - использовать middleware + хранить команды в JWT (их не может быть более 10). Но здесь есть
 * проблема с синхронизацией слага команды и содержимого access токена.
 * Так или иначе основная защита должна быть на уровне API.
 */

export function ProtectionProvider({ children }: IProps) {
  const { push } = useRouter();
  const { tenant } = useParams<{ tenant: string }>()!;

  const { data, error, isLoading } = useQuery(
    teamQueries.getHaveAccessToTeam({ idOrSlug: tenant }),
  );

  const isNotFound = isAxiosError(error) && error.response?.status === 404;
  const isRestricted = data && !data.inTeam;
  const showLoader = isLoading || isNotFound || isRestricted;

  useLayoutEffect(() => {
    if (isRestricted) push(getHomeRoutePath());
  }, [isRestricted, push]);

  useLayoutEffect(() => {
    if (isNotFound) push(getHomeRoutePath());
  }, [isNotFound, push]);

  return (
    <>
      {children}
      {showLoader && process.env.NODE_ENV !== 'development' && (
        <>
          <div className='fixed inset-0 bg-black/25 dark:bg-black/50 backdrop-blur-md' />
          <div className='fixed inset-0 flex items-center justify-center'>
            <Loader2 className='h-10 w-10 animate-spin' />
          </div>
        </>
      )}
    </>
  );
}
