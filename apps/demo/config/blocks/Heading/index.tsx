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
  Align: "left" | "center" | "right";
  Text?: string;
  Level?: _HeadingProps["rank"];
  Size: _HeadingProps["size"];
  Padding?: string;
  Rights: string;
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
    Text: { type: "text" },
    Size: {
      type: "select",
      options: sizeOptions,
    },
    Level: {
      type: "select",
      options: levelOptions,
    },
    Align: {
      type: "radio",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
    Padding: { type: "text" },
    Rights: {
      type: "radio",
      options: [
        { label: "Yes", value: "false" },
        { label: "No", value: "true" },
      ],
    },
  },
  defaultProps: {
    Align: "left",
    Text: "Heading",
    Padding: "24px",
    Size: "m",
    Rights:'true'
  },
  render: ({ Align, Text, Size, Level, Padding, Rights }) => {
    const globalvalue = Gloabalfontsize();

    return (
      <Section className={Rights} padding={Padding} style={{backgroundColor:globalvalue.bgColor}} >
        <_Heading size={Size} rank={Level as any}>
          <span style={{ display: "block", textAlign: Align, width: "100%" ,fontSize:globalvalue.fontSize,color:globalvalue.fontColor, fontFamily:globalvalue.fontfamily,}}>
            {Text}
          </span>
        </_Heading>
      </Section>
    );
  },
};
