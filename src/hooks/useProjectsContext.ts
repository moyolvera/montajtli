import { useContext } from 'react';
import { ProjectsContext } from '@context';

function useProjectsContext() {
  const { projects } = useContext(ProjectsContext);

  return {
    projects
  };
}

export default useProjectsContext;
