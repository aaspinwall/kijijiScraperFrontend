import React from "react";
import { Wrapper, Paragraph } from "./elements";
import Button from "../../../../Components/buttons/discrete";

const Description = ({ text }) => {
  const description = text;
  const len = description.length;
  const limit = 400;
  const shouldCut = limit <= len;
  const [showFull, toggleFull] = React.useState(false);
  const descriptionShort =
    description.slice(0, limit) + (shouldCut ? " . . ." : "");

  const ToggleMore = () => (
    <Button p={0} onClick={() => toggleFull(!showFull)}>
      {!showFull ? "show more" : "show less"}
    </Button>
  );

  return (
    <Wrapper>
      <Paragraph>{showFull ? description : descriptionShort}</Paragraph>
      {shouldCut ? ToggleMore() : null}
    </Wrapper>
  );
};

export default Description;
