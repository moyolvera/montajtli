import * as React from 'react';
import { Loader } from '@components';

type LoaderContextType = {
  isLoading: boolean;
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LoaderContext = React.createContext<LoaderContextType>({
  isLoading: false
});

function LoaderProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const value = React.useMemo(
    () => ({ isLoading, setIsLoading }),
    [isLoading, setIsLoading]
  );

  return (
    <LoaderContext.Provider value={value}>
      <Loader loading={isLoading} />
      {children}
    </LoaderContext.Provider>
  );
}

export default LoaderProvider;
