import type { Config } from "@measured/puck";
import { ButtonGroup, ButtonGroupProps } from "./blocks/ButtonGroup";
import { Heading, HeadingProps } from "./blocks/Heading";
import { Text, TextProps } from "./blocks/Text";
// import { FeatureList, FeatureListProps } from "./blocks/FeatureList";

type Props = {
  ButtonGroup: ButtonGroupProps;
  Heading: HeadingProps;
  Text: TextProps;
  // FeatureList: FeatureListProps;
};

const config: Config<Props> = {
  components: {
    Heading,
    Text,
    Button : ButtonGroup,
    // List : FeatureList,
  },
};

export default config;
