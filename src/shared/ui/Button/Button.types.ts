import { VariantProps } from 'class-variance-authority';
import { buttonStyles, buttonVariants } from './Button.utils';
import { ButtonHTMLAttributes } from 'react';

export type ButtonSize = keyof (typeof buttonStyles)['variants']['size'];
export type ButtonVariant =
  | keyof (typeof buttonStyles)['variants']['variant']
  | null;
export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}
