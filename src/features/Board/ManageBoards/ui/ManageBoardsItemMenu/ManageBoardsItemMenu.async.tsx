import dynamic from 'next/dynamic';
import { ManageBoardsItemMenuTrigger } from '../ManageBoardsItemMenuTrigger/ManageBoardsItemMenuTrigger';

export const LazyManageBoardsItemMenu = dynamic(
  () => import('./ManageBoardsItemMenu').then(mod => mod.ManageBoardsItemMenu),
  { ssr: false, loading: () => <ManageBoardsItemMenuTrigger disabled /> },
);
