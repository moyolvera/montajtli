import * as React from 'react';
import { ProjectItem, UserItemProject } from '@utils/types';
import { useAuthContext } from '@hooks';
import { project } from '@actions';
import { useLoaderContext } from '@hooks';

type ProjectsContextType = {
  projects?: ProjectItem[];
};

export const ProjectsContext = React.createContext<ProjectsContextType>({
  projects: undefined
});

function ProjectsProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuthContext();
  const { setIsLoading } = useLoaderContext();
  const [projectIds, setProjectIds] = React.useState<string>();
  const [projects, setProjects] = React.useState<ProjectItem[]>([]);

  const value = React.useMemo(() => ({ projects }), [projects]);

  async function updateProjects(parsedProjects: UserItemProject[]) {
    setIsLoading(true);
    console.log('updateProjects - on');

    try {
      const data = await project.getAllProjectsInArray(parsedProjects);
      setProjects(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      console.log('projects - off');
    }
  }

  React.useEffect(() => {
    if (!!projectIds) {
      const parsedProjects = JSON.parse(
        projectIds
      ) as unknown as UserItemProject[];
      if (parsedProjects.length > 0) {
        updateProjects(parsedProjects);
      }
    } else {
      setProjects([]);
    }
  }, [projectIds]);

  React.useEffect(() => {
    if (!user || !user.projects) {
      return;
    }

    setProjectIds(JSON.stringify(user.projects));
  }, [user]);

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
}

export default ProjectsProvider;
