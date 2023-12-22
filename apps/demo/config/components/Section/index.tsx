import { CSSProperties, ReactNode } from "react";
import styles from "./styles.module.css";
import { getClassNameFactory } from "@/core/lib";
import {useSelector} from "react-redux"
const getClassName = getClassNameFactory("Section", styles);
type RootState = {
  app: {
    fontSize: number;
    fontColor: string;
    bgColor: string;
    fontfamily:string;
  };
};


const Gloabalfontsize = () => {
  const bgColor = useSelector((state: RootState) => state.app.bgColor);
  // console.log(bgColor)
  return bgColor;
  // return "red";
};

export type SectionProps = {
  className?: string;
  children: ReactNode;
  padding?: string;
  maxWidth?: string;
  style?: CSSProperties;
  bgColor?: string;
};

export const Section = ({
  children,
  className,
  padding = "0px",
  maxWidth = "1280px",
  bgColor = Gloabalfontsize(),
  style = {},
}: SectionProps) => {
  return (
    <div
      className={`${getClassName()}${className ? ` ${className}` : ""}`}
      style={{
        ...style,
        paddingTop: padding,
        paddingBottom: padding,
        backgroundColor:bgColor,
      }}
    >
      <div className={getClassName("inner")} style={{ maxWidth }}>
        {children}
      </div>
    </div>
  );
};
