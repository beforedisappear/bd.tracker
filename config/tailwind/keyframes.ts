export const keyframes = {
  'caret-blink': {
    '0%,70%,100%': { opacity: '1' },
    '20%,50%': { opacity: '0' },
  },
  'accordion-down': {
    from: { height: '0px' },
    to: { height: 'var(--radix-accordion-content-height)' },
  },
  'accordion-up': {
    from: { height: 'var(--radix-accordion-content-height)' },
    to: { height: '0px' },
  },
};
