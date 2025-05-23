import { useParams } from 'next/navigation';

export function SelectBoard() {
  const { projectId } = useParams<{ projectId: string }>()!;

  return <div>SelectBoard</div>;
}
