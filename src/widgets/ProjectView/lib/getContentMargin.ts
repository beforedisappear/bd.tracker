import {
  DESKTOP_LAYOUT_MARGIN_VALUE,
  MOBILE_LAYOUT_MARGIN_VALUE,
} from '../constants';

export function getContentMargin(isMobile: boolean) {
  return isMobile ? MOBILE_LAYOUT_MARGIN_VALUE : DESKTOP_LAYOUT_MARGIN_VALUE;
}
