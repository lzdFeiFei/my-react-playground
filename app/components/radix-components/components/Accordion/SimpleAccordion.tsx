import { Accordion } from "radix-ui";
const SimpleAccordion = () => (
  <Accordion.Root defaultValue="item-1" type="single">
    <Accordion.Item value="item-1">
      <Accordion.Header>
        Header1
        <Accordion.Trigger>Trigger 1</Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content>content1</Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="item-2">
      <Accordion.Header>
        Header2
        <Accordion.Trigger>Tigger 2</Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content>content2</Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
);

export default SimpleAccordion;
