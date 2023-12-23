// GlobalTools.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFontSize, setFontColor, setBgColor ,setFontFamily} from '../Redux/Actions/index';
import { useSelector } from "react-redux";
import RootState from './RootState/index';
import styles from "./styles.module.css";
import { getClassNameFactory } from "../../../core/lib";

const getClassName = getClassNameFactory("globalstyle", styles);

export const GlobalTools = () => {
    const dispatch = useDispatch();
    const fontSize = useSelector((state: RootState) => state.app.fontSize);
    const fontColor = useSelector((state: RootState) => state.app.fontColor);
    const bgColor = useSelector((state: RootState) => state.app.bgColor);
   const fontFamily = useSelector((state: RootState) => state.app.fontfamily);
  const handleChange = (event) => {
    const newSize = parseInt(event.target.value, 10);
    dispatch(setFontSize(newSize));
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
  const fontFamilies = ['red', 'green', 'Times New Roman', 'Courier New', 'Verdana'];

  const handleFontFamilyChange = (event)=>{
    const newFamily = event.target.value
    dispatch(setFontFamily(newFamily));
  }
  return (
    <>
      {/* Font size input */}
      <div className={getClassName("container")} >
        <label htmlFor="fontSize" className={getClassName("text")}>Font Size</label>
        <input
          type="number"
          id="fontSize"
          onChange={handleChange}
          value={fontSize}
          className={getClassName("input")}
        />
      </div>
      <div className={getClassName("container")}>
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
      </div>
      {/* Font color input */}
      <div  className={getClassName("container")}>
        <label htmlFor="fontColor" className={getClassName("text")}>Font Color</label>
        <input
          type="color"
          id="fontColor"
          onChange={handleFontColorChange}
          value={fontColor}
          className={getClassName("colorpikar")}
        />
      </div>

      {/* Background color input */}
      <div className={getClassName("container")}>
        <label htmlFor="bgColor" className={getClassName("text")}>Background Color</label>
        <input
          type="color"
          id="bgColor"
          onChange={handleBgColorChange}
          value={bgColor}
          className={getClassName("colorpikar")}
        />
      </div>

      {/* ... rest of your component */}
    </>
  );
};
