// GlobalTools.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setFontSize,
  setFontColor,
  setBgColor,
  setFontFamily,
} from "../Redux/Actions/index";
import { useSelector } from "react-redux";
import RootState from "./RootState/index";
import styles from "./styles.module.css";
import { getClassNameFactory } from "../../../core/lib";
import { DropZone, DropZoneProvider, dropZoneContext } from "../DropZone";

const getClassName = getClassNameFactory("globalstyle", styles);

export const GlobalTools = () => {
  const dispatch = useDispatch();
  const fontSize = useSelector((state: RootState) => state.app.fontSize);
  const fontColor = useSelector((state: RootState) => state.app.fontColor);
  const bgColor = useSelector((state: RootState) => state.app.bgColor);

  const fontFamily = useSelector((state: RootState) => state.app.fontfamily);
  const handleChange = (event) => {
    const newSize = parseInt(event.target.value, 10);
    // dispatch(setFontSize(newSize));
  };

  const handleFontColorChange = (event) => {
    const newColor = event.target.value;
    dispatch(setFontColor(newColor));
  };

  const handleBgColorChange = (event) => {
    const newColor = event.target.value;

    dispatch(setBgColor(newColor));
  };

  // ... rest of your component
  const fontFamilies = ["Times New Roman", "Courier New", "Verdana"];

  const handleFontFamilyChange = (event) => {
    const newFamily = event.target.value;
    // dispatch(setFontFamily(newFamily));
  };

  const [isExpanded, setExpanded] = useState(false);
  const [isExpandedTypography, setExpandedTypography] = useState(false);
  const [isExpandedSections, setExpandedSections] = useState(false);

  const handleToggle = () => {
    setExpanded(!isExpanded);
  };

  const handleToggleTypography = () => {
    setExpandedTypography(!isExpandedTypography);
  };

  const handleToggleSections = () => {
    setExpandedSections(!isExpandedSections);
  };

  return (
    <>
      <div>
        <div onClick={handleToggle} className={getClassName("globalItem")}>
          {isExpanded ? (
            <>
              <div className={getClassName("globalItemVentor")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                >
                  <path
                    d="M4.58333 5.29232L0 0.708984H9.16667L4.58333 5.29232Z"
                    fill="#333333"
                  />
                </svg>
              </div>
            </>
          ) : (
            <>
              <div
                className={getClassName("globalItemVentor")}
                style={{
                  marginLeft: "-7px",
                  marginRight: "4px",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="23"
                  viewBox="0 0 22 23"
                  fill="none"
                >
                  <path
                    d="M10.9987 9.14128L15.582 13.7246L6.41537 13.7246L10.9987 9.14128Z"
                    fill="#333333"
                  />
                </svg>
              </div>
            </>
          )}
          <div className={getClassName("mainTitle")}>
            <p style={{ marginTop: "4px" }}>Default Brand Colors</p>
          </div>
        </div>
        {isExpanded && (
          <div>
            {/* <div className={getClassName("expandedItems")}>
              <div className={getClassName("title")}>
                <p>Primary</p>
              </div>
              <div
                className={getClassName("svgDiv")}
                style={{ background: "#1E50C3" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M13.125 9C12.8266 9 12.5405 8.88147 12.3295 8.6705C12.1185 8.45952 12 8.17337 12 7.875C12 7.57663 12.1185 7.29048 12.3295 7.0795C12.5405 6.86853 12.8266 6.75 13.125 6.75C13.4234 6.75 13.7095 6.86853 13.9205 7.0795C14.1315 7.29048 14.25 7.57663 14.25 7.875C14.25 8.17337 14.1315 8.45952 13.9205 8.6705C13.7095 8.88147 13.4234 9 13.125 9ZM10.875 6C10.5766 6 10.2905 5.88147 10.0795 5.6705C9.86853 5.45952 9.75 5.17337 9.75 4.875C9.75 4.57663 9.86853 4.29048 10.0795 4.0795C10.2905 3.86853 10.5766 3.75 10.875 3.75C11.1734 3.75 11.4595 3.86853 11.6705 4.0795C11.8815 4.29048 12 4.57663 12 4.875C12 5.17337 11.8815 5.45952 11.6705 5.6705C11.4595 5.88147 11.1734 6 10.875 6ZM7.125 6C6.82663 6 6.54048 5.88147 6.3295 5.6705C6.11853 5.45952 6 5.17337 6 4.875C6 4.57663 6.11853 4.29048 6.3295 4.0795C6.54048 3.86853 6.82663 3.75 7.125 3.75C7.42337 3.75 7.70952 3.86853 7.9205 4.0795C8.13147 4.29048 8.25 4.57663 8.25 4.875C8.25 5.17337 8.13147 5.45952 7.9205 5.6705C7.70952 5.88147 7.42337 6 7.125 6ZM4.875 9C4.57663 9 4.29048 8.88147 4.0795 8.6705C3.86853 8.45952 3.75 8.17337 3.75 7.875C3.75 7.57663 3.86853 7.29048 4.0795 7.0795C4.29048 6.86853 4.57663 6.75 4.875 6.75C5.17337 6.75 5.45952 6.86853 5.6705 7.0795C5.88147 7.29048 6 7.57663 6 7.875C6 8.17337 5.88147 8.45952 5.6705 8.6705C5.45952 8.88147 5.17337 9 4.875 9ZM9 2.25C7.20979 2.25 5.4929 2.96116 4.22703 4.22703C2.96116 5.4929 2.25 7.20979 2.25 9C2.25 10.7902 2.96116 12.5071 4.22703 13.773C5.4929 15.0388 7.20979 15.75 9 15.75C9.29837 15.75 9.58452 15.6315 9.7955 15.4205C10.0065 15.2095 10.125 14.9234 10.125 14.625C10.125 14.3325 10.0125 14.07 9.8325 13.875C9.66 13.6725 9.5475 13.41 9.5475 13.125C9.5475 12.8266 9.66603 12.5405 9.87701 12.3295C10.088 12.1185 10.3741 12 10.6725 12H12C12.9946 12 13.9484 11.6049 14.6517 10.9017C15.3549 10.1984 15.75 9.24456 15.75 8.25C15.75 4.935 12.7275 2.25 9 2.25Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div> */}

            <div className={getClassName("expandedItems")}>
              <div className={getClassName("title")}>
                <p>Primary</p>
              </div>
              <div
                // className={getClassName("svgDiv")}
                style={{ position: "relative" }}
              >
                <input
                  type="color"
                  id="bgColor"
                  // onChange={handleBgColorChange}
                  // value={bgColor}
                  className={getClassName("colorpikar")}
                />
                <svg
                  className={getClassName("svg")}
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M13.125 9C12.8266 9 12.5405 8.88147 12.3295 8.6705C12.1185 8.45952 12 8.17337 12 7.875C12 7.57663 12.1185 7.29048 12.3295 7.0795C12.5405 6.86853 12.8266 6.75 13.125 6.75C13.4234 6.75 13.7095 6.86853 13.9205 7.0795C14.1315 7.29048 14.25 7.57663 14.25 7.875C14.25 8.17337 14.1315 8.45952 13.9205 8.6705C13.7095 8.88147 13.4234 9 13.125 9ZM10.875 6C10.5766 6 10.2905 5.88147 10.0795 5.6705C9.86853 5.45952 9.75 5.17337 9.75 4.875C9.75 4.57663 9.86853 4.29048 10.0795 4.0795C10.2905 3.86853 10.5766 3.75 10.875 3.75C11.1734 3.75 11.4595 3.86853 11.6705 4.0795C11.8815 4.29048 12 4.57663 12 4.875C12 5.17337 11.8815 5.45952 11.6705 5.6705C11.4595 5.88147 11.1734 6 10.875 6ZM7.125 6C6.82663 6 6.54048 5.88147 6.3295 5.6705C6.11853 5.45952 6 5.17337 6 4.875C6 4.57663 6.11853 4.29048 6.3295 4.0795C6.54048 3.86853 6.82663 3.75 7.125 3.75C7.42337 3.75 7.70952 3.86853 7.9205 4.0795C8.13147 4.29048 8.25 4.57663 8.25 4.875C8.25 5.17337 8.13147 5.45952 7.9205 5.6705C7.70952 5.88147 7.42337 6 7.125 6ZM4.875 9C4.57663 9 4.29048 8.88147 4.0795 8.6705C3.86853 8.45952 3.75 8.17337 3.75 7.875C3.75 7.57663 3.86853 7.29048 4.0795 7.0795C4.29048 6.86853 4.57663 6.75 4.875 6.75C5.17337 6.75 5.45952 6.86853 5.6705 7.0795C5.88147 7.29048 6 7.57663 6 7.875C6 8.17337 5.88147 8.45952 5.6705 8.6705C5.45952 8.88147 5.17337 9 4.875 9ZM9 2.25C7.20979 2.25 5.4929 2.96116 4.22703 4.22703C2.96116 5.4929 2.25 7.20979 2.25 9C2.25 10.7902 2.96116 12.5071 4.22703 13.773C5.4929 15.0388 7.20979 15.75 9 15.75C9.29837 15.75 9.58452 15.6315 9.7955 15.4205C10.0065 15.2095 10.125 14.9234 10.125 14.625C10.125 14.3325 10.0125 14.07 9.8325 13.875C9.66 13.6725 9.5475 13.41 9.5475 13.125C9.5475 12.8266 9.66603 12.5405 9.87701 12.3295C10.088 12.1185 10.3741 12 10.6725 12H12C12.9946 12 13.9484 11.6049 14.6517 10.9017C15.3549 10.1984 15.75 9.24456 15.75 8.25C15.75 4.935 12.7275 2.25 9 2.25Z"
                    // fill={bgColor === "#ffffff" ? "black" : "white"}
                    fill="white"
                  />
                </svg>
              </div>
            </div>

            <div className={getClassName("expandedItems")}>
              <div className={getClassName("title")}>
                <p>Accent</p>
              </div>
              <div
                // className={getClassName("svgDiv")}
                style={{ position: "relative" }}
              >
                <input
                  type="color"
                  id="bgColor"
                  // onChange={handleBgColorChange}
                  // value={bgColor}
                  className={getClassName("colorpikar")}
                />
                <svg
                  className={getClassName("svg")}
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M13.125 9C12.8266 9 12.5405 8.88147 12.3295 8.6705C12.1185 8.45952 12 8.17337 12 7.875C12 7.57663 12.1185 7.29048 12.3295 7.0795C12.5405 6.86853 12.8266 6.75 13.125 6.75C13.4234 6.75 13.7095 6.86853 13.9205 7.0795C14.1315 7.29048 14.25 7.57663 14.25 7.875C14.25 8.17337 14.1315 8.45952 13.9205 8.6705C13.7095 8.88147 13.4234 9 13.125 9ZM10.875 6C10.5766 6 10.2905 5.88147 10.0795 5.6705C9.86853 5.45952 9.75 5.17337 9.75 4.875C9.75 4.57663 9.86853 4.29048 10.0795 4.0795C10.2905 3.86853 10.5766 3.75 10.875 3.75C11.1734 3.75 11.4595 3.86853 11.6705 4.0795C11.8815 4.29048 12 4.57663 12 4.875C12 5.17337 11.8815 5.45952 11.6705 5.6705C11.4595 5.88147 11.1734 6 10.875 6ZM7.125 6C6.82663 6 6.54048 5.88147 6.3295 5.6705C6.11853 5.45952 6 5.17337 6 4.875C6 4.57663 6.11853 4.29048 6.3295 4.0795C6.54048 3.86853 6.82663 3.75 7.125 3.75C7.42337 3.75 7.70952 3.86853 7.9205 4.0795C8.13147 4.29048 8.25 4.57663 8.25 4.875C8.25 5.17337 8.13147 5.45952 7.9205 5.6705C7.70952 5.88147 7.42337 6 7.125 6ZM4.875 9C4.57663 9 4.29048 8.88147 4.0795 8.6705C3.86853 8.45952 3.75 8.17337 3.75 7.875C3.75 7.57663 3.86853 7.29048 4.0795 7.0795C4.29048 6.86853 4.57663 6.75 4.875 6.75C5.17337 6.75 5.45952 6.86853 5.6705 7.0795C5.88147 7.29048 6 7.57663 6 7.875C6 8.17337 5.88147 8.45952 5.6705 8.6705C5.45952 8.88147 5.17337 9 4.875 9ZM9 2.25C7.20979 2.25 5.4929 2.96116 4.22703 4.22703C2.96116 5.4929 2.25 7.20979 2.25 9C2.25 10.7902 2.96116 12.5071 4.22703 13.773C5.4929 15.0388 7.20979 15.75 9 15.75C9.29837 15.75 9.58452 15.6315 9.7955 15.4205C10.0065 15.2095 10.125 14.9234 10.125 14.625C10.125 14.3325 10.0125 14.07 9.8325 13.875C9.66 13.6725 9.5475 13.41 9.5475 13.125C9.5475 12.8266 9.66603 12.5405 9.87701 12.3295C10.088 12.1185 10.3741 12 10.6725 12H12C12.9946 12 13.9484 11.6049 14.6517 10.9017C15.3549 10.1984 15.75 9.24456 15.75 8.25C15.75 4.935 12.7275 2.25 9 2.25Z"
                    // fill={bgColor === "#ffffff" ? "black" : "white"}
                    fill="white"
                  />
                </svg>
              </div>
            </div>

            <div className={getClassName("expandedItems")}>
              <div className={getClassName("title")}>
                <p>Red</p>
              </div>
              <div
                // className={getClassName("svgDiv")}
                style={{ position: "relative" }}
              >
                <input
                  type="color"
                  id="bgColor"
                  // onChange={handleBgColorChange}
                  // value={bgColor}
                  className={getClassName("colorpikar")}
                />
                <svg
                  className={getClassName("svg")}
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M13.125 9C12.8266 9 12.5405 8.88147 12.3295 8.6705C12.1185 8.45952 12 8.17337 12 7.875C12 7.57663 12.1185 7.29048 12.3295 7.0795C12.5405 6.86853 12.8266 6.75 13.125 6.75C13.4234 6.75 13.7095 6.86853 13.9205 7.0795C14.1315 7.29048 14.25 7.57663 14.25 7.875C14.25 8.17337 14.1315 8.45952 13.9205 8.6705C13.7095 8.88147 13.4234 9 13.125 9ZM10.875 6C10.5766 6 10.2905 5.88147 10.0795 5.6705C9.86853 5.45952 9.75 5.17337 9.75 4.875C9.75 4.57663 9.86853 4.29048 10.0795 4.0795C10.2905 3.86853 10.5766 3.75 10.875 3.75C11.1734 3.75 11.4595 3.86853 11.6705 4.0795C11.8815 4.29048 12 4.57663 12 4.875C12 5.17337 11.8815 5.45952 11.6705 5.6705C11.4595 5.88147 11.1734 6 10.875 6ZM7.125 6C6.82663 6 6.54048 5.88147 6.3295 5.6705C6.11853 5.45952 6 5.17337 6 4.875C6 4.57663 6.11853 4.29048 6.3295 4.0795C6.54048 3.86853 6.82663 3.75 7.125 3.75C7.42337 3.75 7.70952 3.86853 7.9205 4.0795C8.13147 4.29048 8.25 4.57663 8.25 4.875C8.25 5.17337 8.13147 5.45952 7.9205 5.6705C7.70952 5.88147 7.42337 6 7.125 6ZM4.875 9C4.57663 9 4.29048 8.88147 4.0795 8.6705C3.86853 8.45952 3.75 8.17337 3.75 7.875C3.75 7.57663 3.86853 7.29048 4.0795 7.0795C4.29048 6.86853 4.57663 6.75 4.875 6.75C5.17337 6.75 5.45952 6.86853 5.6705 7.0795C5.88147 7.29048 6 7.57663 6 7.875C6 8.17337 5.88147 8.45952 5.6705 8.6705C5.45952 8.88147 5.17337 9 4.875 9ZM9 2.25C7.20979 2.25 5.4929 2.96116 4.22703 4.22703C2.96116 5.4929 2.25 7.20979 2.25 9C2.25 10.7902 2.96116 12.5071 4.22703 13.773C5.4929 15.0388 7.20979 15.75 9 15.75C9.29837 15.75 9.58452 15.6315 9.7955 15.4205C10.0065 15.2095 10.125 14.9234 10.125 14.625C10.125 14.3325 10.0125 14.07 9.8325 13.875C9.66 13.6725 9.5475 13.41 9.5475 13.125C9.5475 12.8266 9.66603 12.5405 9.87701 12.3295C10.088 12.1185 10.3741 12 10.6725 12H12C12.9946 12 13.9484 11.6049 14.6517 10.9017C15.3549 10.1984 15.75 9.24456 15.75 8.25C15.75 4.935 12.7275 2.25 9 2.25Z"
                    // fill={bgColor === "#ffffff" ? "black" : "white"}
                    fill="white"
                  />
                </svg>
              </div>
            </div>

            <div className={getClassName("expandedItems")}>
              <div
                className={getClassName("mainTitle")}
                style={{ fontStyle: "14px" }}
              >
                <p>Typography colors</p>
              </div>
            </div>

            <div className={getClassName("expandedItems")}>
              <div className={getClassName("title")}>
                <p>Section title</p>
              </div>
              <div
                // className={getClassName("svgDiv")}
                style={{ position: "relative" }}
              >
                <input
                  type="color"
                  id="bgColor"
                  // onChange={handleBgColorChange}
                  // value={bgColor}
                  className={getClassName("colorpikar")}
                />
                <svg
                  className={getClassName("svg")}
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M13.125 9C12.8266 9 12.5405 8.88147 12.3295 8.6705C12.1185 8.45952 12 8.17337 12 7.875C12 7.57663 12.1185 7.29048 12.3295 7.0795C12.5405 6.86853 12.8266 6.75 13.125 6.75C13.4234 6.75 13.7095 6.86853 13.9205 7.0795C14.1315 7.29048 14.25 7.57663 14.25 7.875C14.25 8.17337 14.1315 8.45952 13.9205 8.6705C13.7095 8.88147 13.4234 9 13.125 9ZM10.875 6C10.5766 6 10.2905 5.88147 10.0795 5.6705C9.86853 5.45952 9.75 5.17337 9.75 4.875C9.75 4.57663 9.86853 4.29048 10.0795 4.0795C10.2905 3.86853 10.5766 3.75 10.875 3.75C11.1734 3.75 11.4595 3.86853 11.6705 4.0795C11.8815 4.29048 12 4.57663 12 4.875C12 5.17337 11.8815 5.45952 11.6705 5.6705C11.4595 5.88147 11.1734 6 10.875 6ZM7.125 6C6.82663 6 6.54048 5.88147 6.3295 5.6705C6.11853 5.45952 6 5.17337 6 4.875C6 4.57663 6.11853 4.29048 6.3295 4.0795C6.54048 3.86853 6.82663 3.75 7.125 3.75C7.42337 3.75 7.70952 3.86853 7.9205 4.0795C8.13147 4.29048 8.25 4.57663 8.25 4.875C8.25 5.17337 8.13147 5.45952 7.9205 5.6705C7.70952 5.88147 7.42337 6 7.125 6ZM4.875 9C4.57663 9 4.29048 8.88147 4.0795 8.6705C3.86853 8.45952 3.75 8.17337 3.75 7.875C3.75 7.57663 3.86853 7.29048 4.0795 7.0795C4.29048 6.86853 4.57663 6.75 4.875 6.75C5.17337 6.75 5.45952 6.86853 5.6705 7.0795C5.88147 7.29048 6 7.57663 6 7.875C6 8.17337 5.88147 8.45952 5.6705 8.6705C5.45952 8.88147 5.17337 9 4.875 9ZM9 2.25C7.20979 2.25 5.4929 2.96116 4.22703 4.22703C2.96116 5.4929 2.25 7.20979 2.25 9C2.25 10.7902 2.96116 12.5071 4.22703 13.773C5.4929 15.0388 7.20979 15.75 9 15.75C9.29837 15.75 9.58452 15.6315 9.7955 15.4205C10.0065 15.2095 10.125 14.9234 10.125 14.625C10.125 14.3325 10.0125 14.07 9.8325 13.875C9.66 13.6725 9.5475 13.41 9.5475 13.125C9.5475 12.8266 9.66603 12.5405 9.87701 12.3295C10.088 12.1185 10.3741 12 10.6725 12H12C12.9946 12 13.9484 11.6049 14.6517 10.9017C15.3549 10.1984 15.75 9.24456 15.75 8.25C15.75 4.935 12.7275 2.25 9 2.25Z"
                    // fill={bgColor === "#ffffff" ? "black" : "white"}
                    fill="white"
                  />
                </svg>
              </div>
            </div>
            <div className={getClassName("expandedItems")}>
              <div className={getClassName("title")}>
                <p>Text color</p>
              </div>
              <div
                // className={getClassName("svgDiv")}
                style={{ position: "relative" }}
              >
                <input
                  type="color"
                  id="bgColor"
                  onChange={handleFontColorChange}
                  value={fontColor}
                  className={getClassName("colorpikar")}
                />
                <svg
                  className={getClassName("svg")}
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M13.125 9C12.8266 9 12.5405 8.88147 12.3295 8.6705C12.1185 8.45952 12 8.17337 12 7.875C12 7.57663 12.1185 7.29048 12.3295 7.0795C12.5405 6.86853 12.8266 6.75 13.125 6.75C13.4234 6.75 13.7095 6.86853 13.9205 7.0795C14.1315 7.29048 14.25 7.57663 14.25 7.875C14.25 8.17337 14.1315 8.45952 13.9205 8.6705C13.7095 8.88147 13.4234 9 13.125 9ZM10.875 6C10.5766 6 10.2905 5.88147 10.0795 5.6705C9.86853 5.45952 9.75 5.17337 9.75 4.875C9.75 4.57663 9.86853 4.29048 10.0795 4.0795C10.2905 3.86853 10.5766 3.75 10.875 3.75C11.1734 3.75 11.4595 3.86853 11.6705 4.0795C11.8815 4.29048 12 4.57663 12 4.875C12 5.17337 11.8815 5.45952 11.6705 5.6705C11.4595 5.88147 11.1734 6 10.875 6ZM7.125 6C6.82663 6 6.54048 5.88147 6.3295 5.6705C6.11853 5.45952 6 5.17337 6 4.875C6 4.57663 6.11853 4.29048 6.3295 4.0795C6.54048 3.86853 6.82663 3.75 7.125 3.75C7.42337 3.75 7.70952 3.86853 7.9205 4.0795C8.13147 4.29048 8.25 4.57663 8.25 4.875C8.25 5.17337 8.13147 5.45952 7.9205 5.6705C7.70952 5.88147 7.42337 6 7.125 6ZM4.875 9C4.57663 9 4.29048 8.88147 4.0795 8.6705C3.86853 8.45952 3.75 8.17337 3.75 7.875C3.75 7.57663 3.86853 7.29048 4.0795 7.0795C4.29048 6.86853 4.57663 6.75 4.875 6.75C5.17337 6.75 5.45952 6.86853 5.6705 7.0795C5.88147 7.29048 6 7.57663 6 7.875C6 8.17337 5.88147 8.45952 5.6705 8.6705C5.45952 8.88147 5.17337 9 4.875 9ZM9 2.25C7.20979 2.25 5.4929 2.96116 4.22703 4.22703C2.96116 5.4929 2.25 7.20979 2.25 9C2.25 10.7902 2.96116 12.5071 4.22703 13.773C5.4929 15.0388 7.20979 15.75 9 15.75C9.29837 15.75 9.58452 15.6315 9.7955 15.4205C10.0065 15.2095 10.125 14.9234 10.125 14.625C10.125 14.3325 10.0125 14.07 9.8325 13.875C9.66 13.6725 9.5475 13.41 9.5475 13.125C9.5475 12.8266 9.66603 12.5405 9.87701 12.3295C10.088 12.1185 10.3741 12 10.6725 12H12C12.9946 12 13.9484 11.6049 14.6517 10.9017C15.3549 10.1984 15.75 9.24456 15.75 8.25C15.75 4.935 12.7275 2.25 9 2.25Z"
                    // fill={bgColor === "#ffffff" ? "black" : "white"}
                    fill="white"
                  />
                </svg>
              </div>
            </div>

            <div className={getClassName("expandedItems")}>
              <div className={getClassName("title")}>
                <p>Link color</p>
              </div>
              <div
                // className={getClassName("svgDiv")}
                style={{ position: "relative" }}
              >
                <input
                  type="color"
                  id="LinkColor"
                  // onChange={handleBgColorChange}
                  // value={bgColor}
                  className={getClassName("colorpikar")}
                />
                <svg
                  className={getClassName("svg")}
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M13.125 9C12.8266 9 12.5405 8.88147 12.3295 8.6705C12.1185 8.45952 12 8.17337 12 7.875C12 7.57663 12.1185 7.29048 12.3295 7.0795C12.5405 6.86853 12.8266 6.75 13.125 6.75C13.4234 6.75 13.7095 6.86853 13.9205 7.0795C14.1315 7.29048 14.25 7.57663 14.25 7.875C14.25 8.17337 14.1315 8.45952 13.9205 8.6705C13.7095 8.88147 13.4234 9 13.125 9ZM10.875 6C10.5766 6 10.2905 5.88147 10.0795 5.6705C9.86853 5.45952 9.75 5.17337 9.75 4.875C9.75 4.57663 9.86853 4.29048 10.0795 4.0795C10.2905 3.86853 10.5766 3.75 10.875 3.75C11.1734 3.75 11.4595 3.86853 11.6705 4.0795C11.8815 4.29048 12 4.57663 12 4.875C12 5.17337 11.8815 5.45952 11.6705 5.6705C11.4595 5.88147 11.1734 6 10.875 6ZM7.125 6C6.82663 6 6.54048 5.88147 6.3295 5.6705C6.11853 5.45952 6 5.17337 6 4.875C6 4.57663 6.11853 4.29048 6.3295 4.0795C6.54048 3.86853 6.82663 3.75 7.125 3.75C7.42337 3.75 7.70952 3.86853 7.9205 4.0795C8.13147 4.29048 8.25 4.57663 8.25 4.875C8.25 5.17337 8.13147 5.45952 7.9205 5.6705C7.70952 5.88147 7.42337 6 7.125 6ZM4.875 9C4.57663 9 4.29048 8.88147 4.0795 8.6705C3.86853 8.45952 3.75 8.17337 3.75 7.875C3.75 7.57663 3.86853 7.29048 4.0795 7.0795C4.29048 6.86853 4.57663 6.75 4.875 6.75C5.17337 6.75 5.45952 6.86853 5.6705 7.0795C5.88147 7.29048 6 7.57663 6 7.875C6 8.17337 5.88147 8.45952 5.6705 8.6705C5.45952 8.88147 5.17337 9 4.875 9ZM9 2.25C7.20979 2.25 5.4929 2.96116 4.22703 4.22703C2.96116 5.4929 2.25 7.20979 2.25 9C2.25 10.7902 2.96116 12.5071 4.22703 13.773C5.4929 15.0388 7.20979 15.75 9 15.75C9.29837 15.75 9.58452 15.6315 9.7955 15.4205C10.0065 15.2095 10.125 14.9234 10.125 14.625C10.125 14.3325 10.0125 14.07 9.8325 13.875C9.66 13.6725 9.5475 13.41 9.5475 13.125C9.5475 12.8266 9.66603 12.5405 9.87701 12.3295C10.088 12.1185 10.3741 12 10.6725 12H12C12.9946 12 13.9484 11.6049 14.6517 10.9017C15.3549 10.1984 15.75 9.24456 15.75 8.25C15.75 4.935 12.7275 2.25 9 2.25Z"
                    // fill={bgColor === "#ffffff" ? "black" : "white"}
                    fill="white"
                  />
                </svg>
              </div>
            </div>

            <div className={getClassName("expandedItems")}>
              <div
                className={getClassName("mainTitle")}
                style={{ fontStyle: "14px" }}
              >
                <p>Background</p>
              </div>
            </div>

            <div className={getClassName("expandedItems")}>
              <div className={getClassName("title")}>
                <p>Color</p>
              </div>
              <div
                // className={getClassName("svgDiv")}
                style={{ position: "relative" }}
              >
                <input
                  type="color"
                  id="bgColor"
                  onChange={handleBgColorChange}
                  // value={bgColor}
                  className={getClassName("colorpikar")}
                />
                <svg
                  className={getClassName("svg")}
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M13.125 9C12.8266 9 12.5405 8.88147 12.3295 8.6705C12.1185 8.45952 12 8.17337 12 7.875C12 7.57663 12.1185 7.29048 12.3295 7.0795C12.5405 6.86853 12.8266 6.75 13.125 6.75C13.4234 6.75 13.7095 6.86853 13.9205 7.0795C14.1315 7.29048 14.25 7.57663 14.25 7.875C14.25 8.17337 14.1315 8.45952 13.9205 8.6705C13.7095 8.88147 13.4234 9 13.125 9ZM10.875 6C10.5766 6 10.2905 5.88147 10.0795 5.6705C9.86853 5.45952 9.75 5.17337 9.75 4.875C9.75 4.57663 9.86853 4.29048 10.0795 4.0795C10.2905 3.86853 10.5766 3.75 10.875 3.75C11.1734 3.75 11.4595 3.86853 11.6705 4.0795C11.8815 4.29048 12 4.57663 12 4.875C12 5.17337 11.8815 5.45952 11.6705 5.6705C11.4595 5.88147 11.1734 6 10.875 6ZM7.125 6C6.82663 6 6.54048 5.88147 6.3295 5.6705C6.11853 5.45952 6 5.17337 6 4.875C6 4.57663 6.11853 4.29048 6.3295 4.0795C6.54048 3.86853 6.82663 3.75 7.125 3.75C7.42337 3.75 7.70952 3.86853 7.9205 4.0795C8.13147 4.29048 8.25 4.57663 8.25 4.875C8.25 5.17337 8.13147 5.45952 7.9205 5.6705C7.70952 5.88147 7.42337 6 7.125 6ZM4.875 9C4.57663 9 4.29048 8.88147 4.0795 8.6705C3.86853 8.45952 3.75 8.17337 3.75 7.875C3.75 7.57663 3.86853 7.29048 4.0795 7.0795C4.29048 6.86853 4.57663 6.75 4.875 6.75C5.17337 6.75 5.45952 6.86853 5.6705 7.0795C5.88147 7.29048 6 7.57663 6 7.875C6 8.17337 5.88147 8.45952 5.6705 8.6705C5.45952 8.88147 5.17337 9 4.875 9ZM9 2.25C7.20979 2.25 5.4929 2.96116 4.22703 4.22703C2.96116 5.4929 2.25 7.20979 2.25 9C2.25 10.7902 2.96116 12.5071 4.22703 13.773C5.4929 15.0388 7.20979 15.75 9 15.75C9.29837 15.75 9.58452 15.6315 9.7955 15.4205C10.0065 15.2095 10.125 14.9234 10.125 14.625C10.125 14.3325 10.0125 14.07 9.8325 13.875C9.66 13.6725 9.5475 13.41 9.5475 13.125C9.5475 12.8266 9.66603 12.5405 9.87701 12.3295C10.088 12.1185 10.3741 12 10.6725 12H12C12.9946 12 13.9484 11.6049 14.6517 10.9017C15.3549 10.1984 15.75 9.24456 15.75 8.25C15.75 4.935 12.7275 2.25 9 2.25Z"
                    // fill={bgColor === "#ffffff" ? "black" : "white"}
                    fill="white"
                  />
                </svg>
              </div>
            </div>

            <div className={getClassName("expandedItems")}>
              <div
                className={getClassName("mainTitle")}
                style={{ fontStyle: "14px" }}
              >
                <p>Custom colors</p>
              </div>
            </div>

            <div className={getClassName("expandedItems")}>
              <div className={getClassName("title")}>
                <p>Green</p>
              </div>
              <div style={{ display: "flex" }}>
                <div
                  className={getClassName("svgDiv")}
                  style={{ background: "#fff" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M7 21C6.45 21 5.979 20.804 5.587 20.412C5.195 20.02 4.99933 19.5493 5 19V6H4V4H9V3H15V4H20V6H19V19C19 19.55 18.804 20.021 18.412 20.413C18.02 20.805 17.5493 21.0007 17 21H7ZM9 17H11V8H9V17ZM13 17H15V8H13V17Z"
                      fill="#8A8A8A"
                    />
                  </svg>
                </div>
                <div
                  className={getClassName("svgDiv")}
                  style={{ background: "#48AF25" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M4.61333 12.6664L3.33333 11.3864L8.70667 5.99971L10 7.29305M13.8067 3.75305L12.2467 2.19305C12 1.93305 11.5667 1.93305 11.3067 2.19305L9.22667 4.27305L7.94 2.99971L7 3.93971L7.94667 4.88638L2 10.833V13.9997H5.16667L11.1133 8.05305L12.06 8.99971L13 8.05971L11.72 6.77971L13.8 4.69971C14.0667 4.43305 14.0667 3.99971 13.8067 3.75305Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}
        <div
          style={{
            borderTop: "1px solid #000",
          }}
        />
        <div
          onClick={handleToggleTypography}
          className={getClassName("globalItem")}
        >
          {isExpandedTypography ? (
            <>
              <div className={getClassName("globalItemVentor")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                >
                  <path
                    d="M4.58333 5.29232L0 0.708984H9.16667L4.58333 5.29232Z"
                    fill="#333333"
                  />
                </svg>
              </div>
            </>
          ) : (
            <>
              <div
                className={getClassName("globalItemVentor")}
                style={{
                  marginLeft: "-7px",
                  marginRight: "4px",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="23"
                  viewBox="0 0 22 23"
                  fill="none"
                >
                  <path
                    d="M10.9987 9.14128L15.582 13.7246L6.41537 13.7246L10.9987 9.14128Z"
                    fill="#333333"
                  />
                </svg>
              </div>
            </>
          )}
          <div className={getClassName("mainTitle")}>
            <p style={{ marginTop: "4px" }}>Default Typography</p>
          </div>
        </div>
        {isExpandedTypography && (
          <div>
            <div className={getClassName("expandedItems")}>
              <div className={getClassName("title")}>
                <p>Section title</p>
              </div>
              <div
                // className={getClassName("svgDiv")}
                style={{ position: "relative" }}
              >
                <input
                  type="color"
                  id="bgColor"
                  onChange={handleBgColorChange}
                  // value={bgColor}
                  className={getClassName("colorpikar")}
                />
                {/* <svg
                  className={getClassName("svg")}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M13.14 4.695C13.4 4.435 13.4 4.00167 13.14 3.755L11.58 2.195C11.3333 1.935 10.9 1.935 10.64 2.195L9.33333 3.50167L11.8333 6.00167M11.1667 6.66833L8.66667 4.16833L2 10.835V13.335H4.5L11.1667 6.66833Z"
                    fill="black"
                  />
                </svg> */}
              </div>
            </div>
            <div className={getClassName("expandedItems")}>
              <div className={getClassName("title")}>
                <p>Text</p>
              </div>
              <div
                // className={getClassName("svgDiv")}
                style={{ position: "relative" }}
              >
                <input
                  type="color"
                  id="bgColor"
                  onChange={handleBgColorChange}
                  // value={bgColor}
                  className={getClassName("colorpikar")}
                />
                {/* <svg
                  className={getClassName("svg")}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M13.14 4.695C13.4 4.435 13.4 4.00167 13.14 3.755L11.58 2.195C11.3333 1.935 10.9 1.935 10.64 2.195L9.33333 3.50167L11.8333 6.00167M11.1667 6.66833L8.66667 4.16833L2 10.835V13.335H4.5L11.1667 6.66833Z"
                    fill="black"
                  />
                </svg> */}
              </div>
            </div>
          </div>
        )}

        <div
          style={{
            borderTop: "1px solid #000",
          }}
        />

        {/* <div
          onClick={handleToggleSections}
          className={getClassName("globalItem")}
        >
          {isExpandedSections ? (
            <>
              <div className={getClassName("globalItemVentor")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                >
                  <path
                    d="M4.58333 5.29232L0 0.708984H9.16667L4.58333 5.29232Z"
                    fill="#333333"
                  />
                </svg>
              </div>
            </>
          ) : (
            <>
              <div
                className={getClassName("globalItemVentor")}
                style={{
                  marginLeft: "-7px",
                  marginRight: "4px",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="23"
                  viewBox="0 0 22 23"
                  fill="none"
                >
                  <path
                    d="M10.9987 9.14128L15.582 13.7246L6.41537 13.7246L10.9987 9.14128Z"
                    fill="#333333"
                  />
                </svg>
              </div>
            </>
          )}
          <div className={getClassName("mainTitle")}>
            <p style={{ marginTop: "4px" }}>Sections</p>
          </div>
        </div>
        {isExpandedSections && (
          <div>
             <div className={getClassName("expandedItems")}>
              <div
                className={getClassName("mainTitle")}
                style={{ fontStyle: "14px" }}
              >
                <p>Divider</p>
              </div>
            </div>
            <div className={getClassName("expandedItems")}>
              <div className={getClassName("title")}>
                <p>Divider color</p>
              </div>
              <div
                // className={getClassName("svgDiv")}
                style={{ position: "relative" }}
              >
                <input
                  type="color"
                  id="bgColor"
                  onChange={handleBgColorChange}
                  // value={bgColor}
                  className={getClassName("colorpikar")}
                />
              </div>
            </div>
            <div className={getClassName("expandedItems")}>
              <div className={getClassName("title")}>
                <p>Icon color</p>
              </div>
              <div
                // className={getClassName("svgDiv")}
                style={{ position: "relative" }}
              >
                <input
                  type="color"
                  id="bgColor"
                  onChange={handleBgColorChange}
                  // value={bgColor}
                  className={getClassName("colorpikar")}
                />
              </div>
            </div>
            <div className={getClassName("expandedItem")}>
              <div className={getClassName("title")}>
                <p>Divider Padding</p>
              </div>
              <div style={{ display: "flex"}}>
                <input type="number" style={{ width: "50px"}} />
                <input type="number" style={{ width: "50px"}} />
                <input type="number" style={{ width: "50px"}} />
              </div>
              
            </div>
            <div className={getClassName("expandedItems")}>
              <div
                className={getClassName("mainTitle")}
                style={{ fontStyle: "14px" }}
              >
                <p>Title</p>
              </div>
            </div>
            <div className={getClassName("expandedItems")}>
              <div className={getClassName("title")}>
                <p>Title padding</p>
              </div>
              
            </div>

            <div className={getClassName("expandedItems")}>
              <div
                className={getClassName("mainTitle")}
                style={{ fontStyle: "14px" }}
              >
                <p>Padding</p>
              </div>
            </div>
          </div>
        )}
         <div
          style={{
            borderTop: "1px solid #000",
          }}
        /> */}
      </div>
      {/* Font size input */}
      {/* <div className={getClassName("container")} >
        <label htmlFor="fontSize" className={getClassName("text")}>Font Size</label>
        <input
          type="number"
          id="fontSize"
          onChange={handleChange}
          value={fontSize}
          className={getClassName("input")}
        />
      </div> */}
      {/* <div className={getClassName("container")}>
        <label htmlFor="fontFamily" className={getClassName("text")}>
          Font Family
        </label>
        <select
          id="fontFamily"
          onChange={handleFontFamilyChange}
          value={fontFamily}
          className={getClassName("input")}
        >
          {fontFamilies.map((family, index) => (
            <option key={index} value={family}>
              {family}
            </option>
          ))}
        </select>
      </div> */}
      {/* Font color input */}
      {/* <div  className={getClassName("container")}>
        <label htmlFor="fontColor" className={getClassName("text")}>Font Color</label>
        <input
          type="color"
          id="fontColor"
          onChange={handleFontColorChange}
          value={fontColor}
          className={getClassName("colorpikar")}
        />
      </div> */}

      {/* Background color input */}
      {/* <div className={getClassName("container")}>
        <label htmlFor="bgColor" className={getClassName("text")}>Background Color</label>
        <input
          type="color"
          id="bgColor"
          onChange={handleBgColorChange}
          value={bgColor}
          className={getClassName("colorpikar")}
        />
      </div> */}

      {/* ... rest of your component */}
    </>
  );
};
