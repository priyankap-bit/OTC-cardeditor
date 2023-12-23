import React from "react";

import { ComponentConfig } from "@/core";
import { Heading as _Heading } from "@/core/components/Heading";
import type { HeadingProps as _HeadingProps } from "@/core/components/Heading";
import { Section } from "../../components/Section";
import { useSelector } from "react-redux";


type RootState = {
  app: {
    fontSize: number;
    fontColor: string;
    bgColor: string;
    fontfamily:string;
  };
};

const Gloabalfontsize = (): { fontSize: number; fontColor: string; bgColor: string; fontfamily:string;} => {
  const { fontSize, fontColor, bgColor,fontfamily } = useSelector((state: RootState) => state.app);
  
  return { fontSize, fontColor, bgColor ,fontfamily};
};
export type HeadingProps = {
  align: "left" | "center" | "right";
  text?: string;
  level?: _HeadingProps["rank"];
  size: _HeadingProps["size"];
  padding?: string;
  rights: string;
};

const sizeOptions = [
  { value: "xxxl", label: "XXXL" },
  { value: "xxl", label: "XXL" },
  { value: "xl", label: "XL" },
  { value: "l", label: "L" },
  { value: "m", label: "M" },
  { value: "s", label: "S" },
  { value: "xs", label: "XS" },
];

const levelOptions = [
  { label: "", value: "" },
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
];

export const Heading: ComponentConfig<HeadingProps> = {
  fields: {
    text: { type: "text" },
    size: {
      type: "select",
      options: sizeOptions,
    },
    level: {
      type: "select",
      options: levelOptions,
    },
    align: {
      type: "radio",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
    padding: { type: "text" },
    rights: {
      type: "radio",
      options: [
        { label: "Yes", value: "false" },
        { label: "No", value: "true" },
      ],
    },
  },
  defaultProps: {
    align: "left",
    text: "Heading",
    padding: "24px",
    size: "m",
    rights:'true'
  },
  render: ({ align, text, size, level, padding, rights }) => {
    const globalvalue = Gloabalfontsize();

    return (
      <Section className={rights} padding={padding} style={{backgroundColor:globalvalue.bgColor}} >
        <_Heading size={size} rank={level as any}>
          <span style={{ display: "block", textAlign: align, width: "100%" ,fontSize:globalvalue.fontSize,color:globalvalue.fontColor, fontFamily:globalvalue.fontfamily,}}>
            {text}
          </span>
        </_Heading>
      </Section>
    );
  },
};
