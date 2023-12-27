import { Action, ActionPanel, Form, Toast, getPreferenceValues, popToRoot, showHUD, showToast } from "@raycast/api";
import { FormValidation, useForm } from "@raycast/utils";
import { ProjectLink, saveProjectLink } from "./projects-link";

export default function LinkProjectCommand() {
  const { defaultUserId } = getPreferenceValues<{ defaultUserId: number }>();

  const { itemProps, handleSubmit } = useForm<ProjectLink>({
    initialValues: {
      userId: String(defaultUserId),
    },
    validation: {
      name: FormValidation.Required,
      id: FormValidation.Required,
      userId: (value) => {
        if (!value) return "Required";

        const valueAsNumber = parseInt(value);
        if (isNaN(valueAsNumber)) return "Must be a number";

        if (valueAsNumber < 0) return "Must be greater than 0";
      },
    },
    onSubmit: async (values) => {
      const toast = await showToast(Toast.Style.Animated, "Creating project link...");

      try {
        await saveProjectLink(values);
        showHUD("✅ Project link saved");
        popToRoot({ clearSearchBar: true });
      } catch (error) {
        toast.style = Toast.Style.Failure;

        if (typeof error === "object" && error && "message" in error && typeof error.message === "string") {
          toast.title = error.message;
        } else {
          toast.title = "Um erro inesperado aconteceu";
        }

        return;
      }
    },
  });

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Submit" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField {...itemProps.name} title="Name" placeholder="Project name" />
      <Form.TextField {...itemProps.id} title="ID" placeholder="project-name" />
      <Form.TextField {...itemProps.userId} title="User ID" placeholder="0" />
    </Form>
  );
}
