import * as React from 'react';
import { useTranslation } from 'react-i18next';

function useLocalization() {
  const { t } = useTranslation();

  const localize = React.useCallback(
    (text: string | React.ReactNode) => {
      if (typeof text === 'string') {
        return t(text);
      }

      return text;
    },
    [t]
  );

  return {
    localize
  };
}

export default useLocalization;
