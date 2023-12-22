import { useSelector } from "react-redux";
type RootState = {
    app: {
      fontSize: number;
      fontColor: string;
      bgColor: string;
      fontfamily: string;
    };
  };
// Custom hook to get global font size
const useGlobalFontSize = (): { fontSize: number; fontColor: string; bgColor: string; fontfamily: string } => {
  const { fontSize, fontColor, bgColor, fontfamily } = useSelector((state: RootState) => state.app);
  return { fontSize, fontColor, bgColor, fontfamily };
};

export default useGlobalFontSize;
