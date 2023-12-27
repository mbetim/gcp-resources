import { LocalStorage } from "@raycast/api";

export interface ProjectLink {
  name: string;
  id: string;
  userId: string;
}

export const saveProjectLink = async (project: ProjectLink) => {
  const isProjectIdInUse = await LocalStorage.getItem(`project-${project.id}`);

  if (isProjectIdInUse) throw new Error("Project ID already in use");

  await LocalStorage.setItem(`project-${project.id}`, JSON.stringify(project));
};

export const getProjectLinks = async () => {
  const savedProjects = await LocalStorage.allItems();
  const filteredProjects: ProjectLink[] = [];

  for (const [key, value] of Object.entries(savedProjects)) {
    if (!key.startsWith("project-")) continue;

    filteredProjects.push(JSON.parse(value));
  }

  return filteredProjects;
};

export const removeProjectLink = async (projectId: string) => {
  await LocalStorage.removeItem(`project-${projectId}`);
};
