import { ActionPanel, List, Action } from "@raycast/api";
import { useCachedPromise, useFrecencySorting } from "@raycast/utils";
import { ProjectLink, getProjectLinks } from "./projects-link";

const resources = [
  { name: "Cloud Run", url: "/run" },
  { name: "Cloud Build", url: "/cloud-build/builds" },
  { name: "Cloud SQL", url: "/sql/instances" },
  { name: "IAM", url: "/iam-admin/iam" },
  { name: "Cloud Scheduler", url: "/cloudscheuler" },
  { name: "Cloud Storage", url: "/storage/browser" },
  { name: "Cloud Overview", url: "/home/dashboard" },
];

const ResourcesList = ({ project }: { project: ProjectLink }) => {
  const getGcpUrl = (urlPath: string) => {
    const urlParams = new URLSearchParams({ project: project.id, authuser: project.userId });

    return "https://console.cloud.google.com" + urlPath + `?${urlParams.toString()}`;
  };

  return (
    <List>
      {resources.map((resource) => (
        <List.Item
          key={resource.name}
          title={resource.name}
          actions={
            <ActionPanel>
              <Action.OpenInBrowser url={getGcpUrl(resource.url)} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
};

export default function Command() {
  const { data, isLoading } = useCachedPromise(getProjectLinks);
  const { data: projects, visitItem } = useFrecencySorting(data, { namespace: "projects" });

  return (
    <List isLoading={isLoading}>
      {projects.map((project) => (
        <List.Item
          key={project.id}
          title={project.name}
          subtitle={project.id}
          actions={
            <ActionPanel>
              <Action.Push
                title="Choose a Resource"
                target={<ResourcesList project={project} />}
                onPush={() => visitItem(project)}
              />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
