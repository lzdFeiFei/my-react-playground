import * as React from "react";
import { Dialog, Tooltip } from "radix-ui";

const MyButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<"button">
>((props, forwardedRef) => <button {...props} ref={forwardedRef} />);

const MultiplePrimitives = () => {
  return (
    <Tooltip.Provider>
      <Dialog.Root>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <Dialog.Trigger asChild>
              <MyButton>Open dialog</MyButton>
            </Dialog.Trigger>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content>Tooltip content</Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>

        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content>
            <Dialog.Title>Dialog Title</Dialog.Title>
            <Dialog.Description>Dialog description</Dialog.Description>
            <Dialog.Close>Close</Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Tooltip.Provider>
  );
};

export default MultiplePrimitives;
