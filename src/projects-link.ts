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
