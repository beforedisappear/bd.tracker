export function ViewTeamMembersHeader() {
  return (
    <div className='flex items-center gap-4 py-2 px-3'>
      <span className='w-6'></span>
      <span className='text-xs w-64 font-medium text-zinc-500'>
        Имя пользователя
      </span>
      <span className='text-xs w-64 font-medium text-zinc-500'>
        Адрес электронной почты
      </span>
    </div>
  );
}
