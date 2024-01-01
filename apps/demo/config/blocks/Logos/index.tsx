/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ComponentConfig } from "@/core";
import styles from "./styles.module.css";
import { getClassNameFactory } from "@/core/lib";
import { Section } from "../../components/Section";
import { useSelector } from "react-redux";

const getClassName = getClassNameFactory("Logos", styles);
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
export type LogosProps = {
  Logos: {
    Alt: string;
    ImageUrl: string;
  }[];
};

export const Logos: ComponentConfig<LogosProps> = {
  fields: {
    Logos: {
      type: "array",
      getItemSummary: (item, i) => item.Alt || `Feature #${i}`,
      defaultItemProps: {
        Alt: "",
        ImageUrl: "",
      },
      arrayFields: {
        Alt: { type: "text" },
        ImageUrl: { type: "text" },
      },
    },
  },
  defaultProps: {
    Logos: [
      {
        Alt: "Google",
        ImageUrl:
          "https://logolook.net/wp-content/uploads/2021/06/Google-Logo.png",
      },
      {
        Alt: "Google",
        ImageUrl:
          "https://logolook.net/wp-content/uploads/2021/06/Google-Logo.png",
      },
      {
        Alt: "Google",
        ImageUrl:
          "https://logolook.net/wp-content/uploads/2021/06/Google-Logo.png",
      },
      {
        Alt: "Google",
        ImageUrl:
          "https://logolook.net/wp-content/uploads/2021/06/Google-Logo.png",
      },
      {
        Alt: "Google",
        ImageUrl:
          "https://logolook.net/wp-content/uploads/2021/06/Google-Logo.png",
      },
    ],
  },
  render: ({ Logos }) => {
    const globalvalue = Gloabalfontsize();

    return (
      <Section style={{backgroundColor:globalvalue.bgColor}} className={getClassName()}>
        <div className={getClassName("items")}>
          {Logos.map((item, i) => (
            <div key={i} className={getClassName("item")}>
              <img
                className={getClassName("image")}
                alt={item.Alt}
                src={item.ImageUrl}
                height={64}
              ></img>
            </div>
          ))}
        </div>
      </Section>
    );
  },
};
