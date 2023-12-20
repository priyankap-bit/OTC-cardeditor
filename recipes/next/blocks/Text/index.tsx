import React from "react";

import { ComponentConfig } from "@/core";
import { Section } from "../../components/Section";

export type TextProps = {
  align: "left" | "center" | "right";
  text?: string;
  padding?: string;
  size?: "s" | "m";
  color: any;
  backgroundColor: any;
  maxWidth?: string;
};

export const Text: ComponentConfig<TextProps> = {
  fields: {
    text: { type: "textarea" },
    size: {
      type: "select",
      options: [
        { label: "S", value: "s" },
        { label: "M", value: "m" },
      ],
    },
    align: {
      type: "radio",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
    color: {
      type: "custom",
      render: ({ name, onChange, value }) => (
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <label htmlFor="color-picker">Color</label>
        <input
          style={{border:"none",padding:"0px"}}
          type="color"
          id="color-picker"
          defaultValue={value}
          onChange={(e) => onChange(e.currentTarget.value)}
        />
      </div>
      ),
    },
    backgroundColor: {
      type: "custom",
      render: ({ name, onChange, value }) => (
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <label htmlFor="bgcolor-picker">Background color</label>
        <input
          style={{border:"none",padding:"0px"}}
          type="color"
          id="bgcolor-picker"
          defaultValue={value}
          onChange={(e) => onChange(e.currentTarget.value)}
        />
      </div>
      ),
    },
    padding: { type: "text" },
    maxWidth: { type: "text" },
  },
  defaultProps: {
    align: "left",
    text: "Text",
    padding: "24px",
    size: "m",
    color: "default",
    backgroundColor: "default",
  },
  render: ({ align, color, text, size, padding, maxWidth, backgroundColor }) => {
    return (
      <Section padding={padding} maxWidth={maxWidth} backgroundColor={backgroundColor}>
        <span
          style={{
            color: color,
            display: "flex",
            textAlign: align,
            width: "100%",
            fontSize: size === "m" ? "20px" : "16px",
            fontWeight: 300,
            maxWidth,
            marginLeft: "auto",
            marginRight: "auto",
            justifyContent:
              align === "center"
                ? "center"
                : align === "right"
                ? "flex-end"
                : "flex-start",
          }}
        >
          {text}
        </span>
      </Section>
    );
  },
};
