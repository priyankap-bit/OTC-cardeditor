/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ComponentConfig } from "@/core/types/Config";
import styles from "./styles.module.css";
import { getClassNameFactory } from "@/core/lib";
import { Button } from "@/core/components/Button";
import { Section } from "../../components/Section";
import { useSelector } from "react-redux";

const getClassName = getClassNameFactory("ButtonGroup", styles);
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
export type ButtonGroupProps = {
  Align?: string;
  Buttons: { Label: string; Href: string; Variant: "primary" | "secondary" }[];
};

export const ButtonGroup: ComponentConfig<ButtonGroupProps> = {
  fields: {
    Buttons: {
      type: "array",
      getItemSummary: (item) => item.Label || "Button",
      arrayFields: {
        Label: { type: "text" },
        Href: { type: "text" },
        Variant: {
          type: "radio",
          options: [
            { label: "primary", value: "primary" },
            { label: "secondary", value: "secondary" },
          ],
        },
      },
      defaultItemProps: {
        Label: "Button",
        Href: "#",
        Variant: "primary",
      },
    },
    Align: {
      type: "radio",
      options: [
        { label: "left", value: "left" },
        { label: "center", value: "center" },
      ],
    },
  },
  defaultProps: {
    Buttons: [{ Label: "Learn more", Href: "#", Variant: "primary" }],
  },
  render: ({ Align, Buttons }) => {
    const sizevalue = Gloabalfontsize();

    return (
      <Section style={{backgroundColor:sizevalue.bgColor}} className={getClassName({ center: Align === "center" })}>
        <div className={getClassName("actions")}>
          {Buttons.map((button, i) => (
            <Button
              key={i}
              href={button.Href}
              variant={button.Variant}
              size="large"
            >
              {button.Label}
            </Button>
          ))}
        </div>
      </Section>
    );
  },
};
