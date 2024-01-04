import React from "react";
import styles from "./styles.module.css";
// import getClassNameFactory from "../../lib/get-class-name-factory";
import { getClassNameFactory } from "../../../core/lib";

const getClassName = getClassNameFactory("AddSection", styles);

export const AddSection = () => {
  return (
    <>
      <div className={getClassName("body")}>
        <div className={getClassName("searchsection")}>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              id="bgColor"
              placeholder="Search"
              className={getClassName("Input")}
            />
            <svg
              className={getClassName("searchSvg")}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M15.5 14H14.71L14.43 13.73C15.4439 12.554 16.0011 11.0527 16 9.5C16 8.21442 15.6188 6.95772 14.9046 5.8888C14.1903 4.81988 13.1752 3.98676 11.9874 3.49479C10.7997 3.00282 9.49279 2.87409 8.23192 3.1249C6.97104 3.3757 5.81285 3.99477 4.90381 4.90381C3.99477 5.81285 3.3757 6.97104 3.1249 8.23192C2.87409 9.49279 3.00282 10.7997 3.49479 11.9874C3.98676 13.1752 4.81988 14.1903 5.8888 14.9046C6.95772 15.6188 8.21442 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
                fill="#49454F"
              />
            </svg>
          </div>
          <div
            style={{
              padding: "0px 8px 8px 8px",
              alignItems: "center",
            }}
          >
            <div className={getClassName("headingDiv")}>
              <div className={getClassName("heading")}>Add Section</div>
            </div>
          </div>
        </div>

        <div className={getClassName("componentDiv")}>
            <img src="https://as1.ftcdn.net/v2/jpg/04/34/72/82/1000_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg" alt="ddsfdsaa" width={150} height={200} style={{borderRadius:"10px"}} />
        </div>

      </div>
    </>
  );
};
