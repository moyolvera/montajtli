import * as React from 'react';
import { useTranslation } from 'react-i18next';

function useLocalization() {
  const { t } = useTranslation();

  console.log(t('home.welcome'));

  const localize = React.useCallback(
    (text: string | React.ReactNode) => {
      if (typeof text === 'string') {
        console.log(text);

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
