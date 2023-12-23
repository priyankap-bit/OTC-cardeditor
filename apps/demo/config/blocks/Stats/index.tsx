/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ComponentConfig } from "@/core";
import styles from "./styles.module.css";
import { getClassNameFactory } from "@/core/lib";
import { Section } from "../../components/Section";
import * as reactFeather from "react-feather";
import { useSelector } from "react-redux";

const getClassName = getClassNameFactory("Stats", styles);
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
const icons = Object.keys(reactFeather).reduce((acc, iconName) => {
  if (typeof reactFeather[iconName] === "object") {
    const El = reactFeather[iconName];

    return {
      ...acc,
      [iconName]: <El />,
    };
  }

  return acc;
}, {});

const iconOptions = Object.keys(reactFeather).map((iconName) => ({
  label: iconName,
  value: iconName,
}));

export type StatsProps = {
  items: {
    title: string;
    description: string;
  }[];
};

export const Stats: ComponentConfig<StatsProps> = {
  fields: {
    items: {
      type: "array",
      getItemSummary: (item, i) => item.title || `Feature #${i}`,
      defaultItemProps: {
        title: "Title",
        description: "Description",
      },
      arrayFields: {
        title: { type: "text" },
        description: { type: "text" },
      },
    },
  },
  defaultProps: {
    items: [
      {
        title: "Feature",
        description: "Description",
      },
    ],
  },
  render: ({ items }) => {
    const globalvalue = Gloabalfontsize();

    return (
      <Section style={{backgroundColor:globalvalue.bgColor}} className={getClassName()} maxWidth={"916px"}>
        <div  className={getClassName("items")}>
          {items.map((item, i) => (
            <div key={i} className={getClassName("item")}>
              <div style={{fontSize:globalvalue.fontSize,color:globalvalue.fontColor, fontFamily:globalvalue.fontfamily,}} className={getClassName("label")}>{item.title}</div>
              <div style={{fontSize:globalvalue.fontSize,color:globalvalue.fontColor, fontFamily:globalvalue.fontfamily,}} className={getClassName("value")}>{item.description}</div>
            </div>
          ))}
        </div>
      </Section>
    );
  },
};
