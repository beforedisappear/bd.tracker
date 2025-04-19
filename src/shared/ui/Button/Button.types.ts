import { buttonStyles } from './Button.utils';

export type ButtonSize = keyof (typeof buttonStyles)['variants']['size'];
export type ButtonVariant = keyof (typeof buttonStyles)['variants']['variant'];
