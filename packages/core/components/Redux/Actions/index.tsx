export const setFontSize = (fontSize) => {
    return {
      type: 'SET_FONT_SIZE',
      payload: fontSize,
    };
  };
  
  export const setFontColor = (fontColor) => {
    return {
      type: 'SET_FONT_COLOR',
      payload: fontColor,
    };
  };
  
  export const setBgColor = (bgColor) => {
    return {
      type: 'SET_BG_COLOR',
      payload: bgColor,
    };
  };

  export const setFontFamily = (fontfamily) => {
    return {
      type: 'SET_FONT_FAMILY',
      payload: fontfamily,
    };
  };