import { CSSProperties, ReactNode } from "react";
import styles from "./styles.module.css";
import { getClassNameFactory } from "@/core/lib";
import { useSelector } from "react-redux";

const getClassName = getClassNameFactory("Section", styles);
type RootState = {
  app: {
    fontSize: number;
    fontColor: string;
    bgColor: string;
    fontfamily:string;
  };
};

const GlobalFontSize = () => {
  const fontSize: string = useSelector((state: RootState) => state.app.fontfamily);
  // console.log(fontSize,"///");
  let val = 0
  if(fontSize == 'red'){
  val = 1
  }else if(fontSize == 'green'){
    val = 2
  }
  if(val == 1){
    // console.log(val);
    
    return 'red'
  }else if(val==2){   
    // console.log(val);

    return 'green'
  }
};
export type SectionProps = {
  className?: string;
  children: ReactNode;
  padding?: string;
  maxWidth?: string;
  style?: CSSProperties;
  backgroundColor?:any;
};

export const Section = ({
  children,
  className,
  padding = "0px",
  maxWidth = "1280px",
  backgroundColor = GlobalFontSize(),
  style = {},
}: SectionProps) => {
  return (
    <div
      className={`${getClassName()}${className ? ` ${className}` : ""}`}
      style={{
        ...style,
        paddingTop: padding,
        paddingBottom: padding,
        backgroundColor:GlobalFontSize()
      }}
    >
      <div className={getClassName("inner")} style={{ maxWidth }}>
        {children}
      </div>
    </div>
  );
};
