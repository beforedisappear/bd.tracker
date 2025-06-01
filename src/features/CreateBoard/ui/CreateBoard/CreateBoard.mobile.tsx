'use client';

import { Drawer } from '@/shared/ui/c';
import { CreateBoardForm } from '../CreateBoardForm';
import { CreateBoardTrigger } from '../CreateBoardTrigger/CreateBoardTrigger';

import { CREATE_BOARD_TITLE } from '../../constants';

export function CreateBoardMobile() {
  return (
    <Drawer
      title={CREATE_BOARD_TITLE}
      titleClassName='text-center'
      trigger={<CreateBoardTrigger />}
      className='h-[400px]'
    >
      <CreateBoardForm />
    </Drawer>
  );
}
