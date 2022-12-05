import { useCallback, useRef } from 'react';

export function useScrollTo<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  const scrollTo = useCallback(
    (arg?: boolean | ScrollIntoViewOptions | undefined) => {
      ref.current?.scrollIntoView(arg);
    },
    [],
  );

  return {
    ref,
    scrollTo,
  };
}
