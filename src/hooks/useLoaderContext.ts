import { useCallback, useContext } from 'react';
import { LoaderContext } from '@context';

function useLoaderContext() {
  const { isLoading, setIsLoading: setIsLoadingFunction } =
    useContext(LoaderContext);

  const setIsLoading = useCallback(
    (value: boolean) => {
      if (setIsLoadingFunction) {
        setIsLoadingFunction(value);
      }
    },
    [setIsLoadingFunction]
  );

  return {
    isLoading,
    setIsLoading
  };
}

export default useLoaderContext;
