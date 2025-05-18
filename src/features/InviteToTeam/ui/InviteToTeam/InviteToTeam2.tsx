'use client';

import { useDeviceType } from '@/shared/lib/deviceType/c';

import { LazyInviteToTeam2Desktop } from './InviteToTeam2.desktop.async';
import { LazyInviteToTeam2Mobile } from './InviteToTeam2.mobile.async';

import { INVITE_TO_TEAM_BTN_TEXT_2 } from '../../config';

/**
 * @description
 * Вариант с альтернативным текстом
 * Поскольку в next.js loading нельзя прокинуть пропсы, то придется
 * создавать вторую версию компонента
 */

export function InviteToTeam2() {
  const { isMobile, isDesktop } = useDeviceType();

  return (
    <>
      {isMobile && (
        <LazyInviteToTeam2Mobile
          btnText={INVITE_TO_TEAM_BTN_TEXT_2}
          triggerBtnVariant={null}
        />
      )}
      {isDesktop && (
        <LazyInviteToTeam2Desktop
          btnText={INVITE_TO_TEAM_BTN_TEXT_2}
          triggerBtnVariant={null}
        />
      )}
    </>
  );
}
