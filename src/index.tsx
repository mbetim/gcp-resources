import { ActionPanel, List, Action } from "@raycast/api";

const AnotherList = () => (
  <List>
    <List.Item title="Item one" />
    <List.Item title="Item two" />
    <List.Item title="Item three" />
  </List>
);

export default function Command() {
  return (
    <List>
      <List.Item
        icon="list-icon.png"
        title="Greeting"
        actions={
          <ActionPanel>
            <Action.Push title="Show Details" target={<AnotherList />} />
          </ActionPanel>
        }
      />
    </List>
  );
}
