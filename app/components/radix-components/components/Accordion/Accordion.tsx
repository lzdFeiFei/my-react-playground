import * as React from "react";
import { Accordion } from "radix-ui";
import classNames from "classnames";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import styles from "./styles.module.css";

const AccordionDemo = () => (
  <Accordion.Root
    className={styles.Root}
    type="single"
    defaultValue="item-1"
    collapsible
  >
    <Accordion.Item className={styles.Item} value="item-1">
      <AccordionTrigger>Is it accessible?</AccordionTrigger>
      <AccordionContent>
        Yes. It adheres to the WAI-ARIA design pattern.
      </AccordionContent>
    </Accordion.Item>

    <Accordion.Item className={styles.Item} value="item-2">
      <AccordionTrigger>Is it unstyled?</AccordionTrigger>
      <AccordionContent>
        Yes. It's unstyled by default, giving you freedom over the look and
        feel.
      </AccordionContent>
    </Accordion.Item>

    <Accordion.Item className={styles.Item} value="item-3">
      <AccordionTrigger>Can it be animated?</AccordionTrigger>
      <AccordionContent>
        Yes! You can animate the Accordion with CSS or JavaScript.
      </AccordionContent>
    </Accordion.Item>
  </Accordion.Root>
);

interface AccordionTriggerProps {
  children: React.ReactNode;
  className?: string;
}

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Header className={styles.Header}>
    <Accordion.Trigger
      className={classNames(styles.Trigger, className)}
      {...props}
      ref={forwardedRef}
    >
      {children}
      <ChevronDownIcon className={styles.Chevron} aria-hidden />
    </Accordion.Trigger>
  </Accordion.Header>
));

interface AccordionContentProps {
  children: React.ReactNode;
  className?: string;
}

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  AccordionContentProps
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Content
    className={classNames(styles.Content, className)}
    {...props}
    ref={forwardedRef}
  >
    <div className={styles.ContentText}>{children}</div>
  </Accordion.Content>
));

export default AccordionDemo;
