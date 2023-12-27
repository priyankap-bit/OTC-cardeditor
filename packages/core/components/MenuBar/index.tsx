import { Dispatch, ReactElement, SetStateAction } from "react";
import { Globe, ChevronLeft, ChevronRight } from "react-feather";

import { Button } from "../Button";
import { IconButton } from "../IconButton/IconButton";
import getClassNameFactory from "../../lib/get-class-name-factory";
import { usePuckHistory } from "../../lib/use-puck-history";
import { PuckAction } from "../../reducer";
import type { AppState, Data } from "../../types/Config";

import styles from "./styles.module.css";

const getClassName = getClassNameFactory("MenuBar", styles);

export const MenuBar = ({
  appState,
  data = { content: [], root: { props: { title: "" } } },
  dispatch,
  menuOpen = false,
  onPublish,
  renderHeaderActions,
  setMenuOpen,
}: {
  appState: AppState;
  data: Data;
  dispatch: (action: PuckAction) => void;
  onPublish: (data: Data) => void;
  menuOpen: boolean;
  renderHeaderActions?: (props: {
    state: AppState;
    dispatch: (action: PuckAction) => void;
  }) => ReactElement;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { canForward, canRewind, rewind, forward } = usePuckHistory({
    appState,
    dispatch,
  });

  return (
    <div
      className={getClassName({ menuOpen })}
      onClick={(event) => {
        const element = event.target as HTMLElement;

        if (window.matchMedia("(min-width: 638px)").matches) {
          return;
        }
        if (
          element.tagName === "A" &&
          element.getAttribute("href")?.startsWith("#")
        ) {
          setMenuOpen(false);
        }
      }}
    >
      <div className={getClassName("inner")}>
        <div className={getClassName("history")}>
          <IconButton title="undo" disabled={!canRewind} onClick={rewind}>
            {/* <ChevronLeft
              size={21}
              stroke={
                canRewind
                  ? "var(--puck-color-black)"
                  : "var(--puck-color-grey-7)"
              }
            /> */}
            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 34 34" fill="none">
              <path d="M17 3.1875C9.37191 3.1875 3.1875 9.37191 3.1875 17C3.1875 24.6281 9.37191 30.8125 17 30.8125C24.6281 30.8125 30.8125 24.6281 30.8125 17C30.8125 9.37191 24.6281 3.1875 17 3.1875ZM16.3911 19.2007V22.8438L9.69531 16.4688L16.3911 10.0938V13.7368C22.7993 13.7368 24.3047 18.3188 24.3047 22.8438C22.4553 20.4817 20.8197 19.2007 16.3911 19.2007Z" fill="black" />
            </svg>
            <span>Undo</span>
          </IconButton>
          <span style={{display:"flex", alignItems:"center"}}>|</span>
          <IconButton title="redo" disabled={!canForward} onClick={forward}>
            <span>Redo</span>
            {/* <ChevronRight
              size={21}
              stroke={
                canForward
                  ? "var(--puck-color-black)"
                  : "var(--puck-color-grey-7)"
              }
            /> */}
            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 34 34" fill="none">
              <path d="M3.1875 17C3.1875 24.6281 9.37191 30.8125 17 30.8125C24.6281 30.8125 30.8125 24.6281 30.8125 17C30.8125 9.37191 24.6281 3.1875 17 3.1875C9.37191 3.1875 3.1875 9.37191 3.1875 17ZM9.5625 21.4273C9.92441 17.3466 11.8296 13.6518 17.7218 13.6518V11.1735C17.7229 11.0663 17.7551 10.9617 17.8145 10.8724C17.874 10.7832 17.9581 10.7132 18.0567 10.6709C18.1552 10.6287 18.264 10.6161 18.3696 10.6345C18.4752 10.653 18.5732 10.7019 18.6515 10.7751L24.2662 16.0703C24.3202 16.1212 24.3633 16.1827 24.3928 16.2508C24.4222 16.319 24.4374 16.3925 24.4374 16.4668C24.4374 16.541 24.4222 16.6145 24.3928 16.6827C24.3633 16.7509 24.3202 16.8123 24.2662 16.8632L18.6602 22.1604C18.5818 22.2336 18.4838 22.2825 18.3782 22.301C18.2726 22.3195 18.1639 22.3068 18.0653 22.2646C17.9667 22.2223 17.8826 22.1523 17.8231 22.0631C17.7637 21.9738 17.7315 21.8692 17.7305 21.762V19.2857C13.9407 19.2857 12.1185 20.1802 10.5201 21.8543C10.1555 22.2295 9.51934 21.942 9.5625 21.4273Z" fill="black" />
            </svg>
          </IconButton>
        </div>
        <>
          {renderHeaderActions &&
            renderHeaderActions({
              state: appState,
              dispatch,
            })}
        </>
        <div>
          <Button
            onClick={() => {
              onPublish(data);
            }}
            icon={<Globe size="14px" />}
          >
            Publish
          </Button>
        </div>
      </div>
    </div>
  );
};
