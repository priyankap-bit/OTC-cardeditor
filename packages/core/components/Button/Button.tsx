import { ReactNode, useEffect, useState } from "react";
import styles from "./Button.module.css";
import getClassNameFactory from "../../lib/get-class-name-factory";
import { ClipLoader } from "react-spinners";

const getClassName = getClassNameFactory("Button", styles);

export const Button = ({
  children,
  href,
  onClick,
  variant = "primary",
  align,
  type,
  disabled,
  tabIndex,
  newTab,
  fullWidth,
  icon,
  size = "medium",
  loading: loadingProp = false,
}: {
  children: ReactNode;
  href?: string;
  onClick?: (e: any) => void | Promise<void>;
  variant?: "primary" | "secondary" | "success" | "info" | "warning" | "gray";
  type?: "button" | "submit" | "reset";
  align?: "center" | "left" | "right";
  disabled?: boolean;
  tabIndex?: number;
  newTab?: boolean;
  fullWidth?: boolean;
  icon?: ReactNode;
  size?: "medium" | "large";
  loading?: boolean;
}) => {
  const [loading, setLoading] = useState(loadingProp);

  useEffect(() => setLoading(loadingProp), [loadingProp]);

  const ElementType = href ? "a" : "button";

  const el = (
    <ElementType
      className={getClassName({
        primary: variant === "primary",
        secondary: variant === "secondary",
        success: variant === "success",
        info: variant === "info",
        warning: variant === "warning",
        gray: variant === "gray",
        center: align === "center",
        disabled,
        fullWidth,
        [size]: true,
      })}
      onClick={(e) => {
        if (!onClick) return;

        setLoading(true);
        Promise.resolve(onClick(e)).then(() => {
          setLoading(false);
        });
      }}
      type={type}
      disabled={disabled || loading}
      tabIndex={tabIndex}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noreferrer" : undefined}
      href={href}
    >
      {icon && <div className={getClassName("icon")}>{icon}</div>}
      {children}
      {loading && (
        <>
          &nbsp;&nbsp;
          <ClipLoader color="inherit" size="14px" />
        </>
      )}
    </ElementType>
  );

  return el;
};
