import React from "react";

import { ComponentConfig } from "@/core";
import { spacingOptions } from "../../options";

export type VerticalSpaceProps = {
  Size: string;
};

export const VerticalSpace: ComponentConfig<VerticalSpaceProps> = {
  fields: {
    Size: {
      type: "select",
      options: spacingOptions,
    },
  },
  defaultProps: {
    Size: "24px",
  },
  render: ({ Size }) => {
    return <div style={{ height: Size, width: "100%" }} />;
  },
};
