import React from "react";
import { Popover } from "radix-ui";
import "./styles.css";

const PopoverDemo = () => {
  return (
    <Popover.Root>
      <Popover.Trigger className="PopoverTrigger">Show Info</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="PopoverContent">
          Some Content
          <Popover.Arrow className="PopoverArrow" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default PopoverDemo;
