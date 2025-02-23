import { useEffect } from 'react';

const DEFAULT_TITLE = 'POCO | Know your markets';

export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `POCO | ${title}` : DEFAULT_TITLE;

    // Reset to default on unmount
    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [title]);
}