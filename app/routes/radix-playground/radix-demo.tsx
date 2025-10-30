import MultiplePrimitives from "../../components/radix-components/multiple-primitives/MultiplePrimitives";
import {
  MyAccordion,
  SimpleAccordion,
} from "../../components/radix-components/components/Accordion";
const RadixDemo = () => {
  // return <MultiplePrimitives />;
  return (
    <div>
      <div>
        <MyAccordion />
      </div>
      <div>
        <SimpleAccordion />
      </div>
    </div>
  );
};

export default RadixDemo;
