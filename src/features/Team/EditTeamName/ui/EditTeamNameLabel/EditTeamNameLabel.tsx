interface Props {
  label: string;
  as?: 'h3' | 'span';
}

export function EditTeamNameLabel({ label, as = 'span' }: Props) {
  const Component = as;

  return (
    <Component
      className='text-xl font-bold
      md:text-base'
    >
      {label}
    </Component>
  );
}
