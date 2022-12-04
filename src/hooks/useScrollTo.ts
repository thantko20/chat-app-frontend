import { useRef } from 'react';

export function useScrollTo<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  return {
    ref,
    scrollTo(arg?: boolean | ScrollIntoViewOptions | undefined) {
      ref.current?.scrollIntoView(arg);
    },
  };
}
