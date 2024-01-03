import {
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";
import { DragDropContext, DragStart, DragUpdate } from "@hello-pangea/dnd";
import type {
  AppState,
  Config,
  Data,
  Field,
  UiState,
} from "../../types/Config";
import { InputOrGroup } from "../InputOrGroup";
import { ComponentList } from "../ComponentList";
import { Button } from "../Button";

import { Plugin } from "../../types/Plugin";
import { usePlaceholderStyle } from "../../lib/use-placeholder-style";

import { SidebarSection } from "../SidebarSection";
import {
  ChevronDown,
  ChevronUp,
  Globe,
  Sidebar,
  Settings,
  Edit,
} from "react-feather";
import { Heading } from "../Heading";
import { IconButton } from "../IconButton/IconButton";
import { DropZone, DropZoneProvider, dropZoneContext } from "../DropZone";
import { rootDroppableId } from "../../lib/root-droppable-id";
import { ItemSelector, getItem } from "../../lib/get-item";
import {
  PuckAction,
  ReplaceAction,
  SetAction,
  StateReducer,
  createReducer,
  replaceAction,
  setAction,
} from "../../reducer";
import { LayerTree } from "../LayerTree";
import { findZonesForArea } from "../../lib/find-zones-for-area";
import { areaContainsZones } from "../../lib/area-contains-zones";
import { flushZones } from "../../lib/flush-zones";
import getClassNameFactory from "../../lib/get-class-name-factory";
import { AppProvider, defaultAppState } from "./context";
import { useComponentList } from "../../lib/use-component-list";
import { useResolvedData } from "../../lib/use-resolved-data";
import { MenuBar } from "../MenuBar";
import styles from "./styles.module.css";
import React from "react";
import { Render } from "../Render";

const getClassName = getClassNameFactory("Puck", styles);

const Field = () => {};

const defaultPageFields: Record<string, Field> = {
  title: { type: "text" },
};

const PluginRenderer = ({
  children,
  dispatch,
  state,
  plugins,
  renderMethod,
}: {
  children: ReactNode;
  dispatch: (action: PuckAction) => void;
  state: AppState;
  plugins;
  renderMethod:
    | "renderRoot"
    | "renderRootFields"
    | "renderFields"
    | "renderComponentList";
}) => {
  return plugins
    .filter((item) => item[renderMethod])
    .map((item) => item[renderMethod])
    .reduce(
      (accChildren, Item) => (
        <Item dispatch={dispatch} state={state}>
          {accChildren}
        </Item>
      ),
      children
    );
};

export function Puck({
  config,
  data: initialData = { content: [], root: { props: { title: "" } } },
  onChange,
  onSave,
  onPublish,
  plugins = [],
  renderComponentList,
  renderHeader,
  renderHeaderActions,
  headerTitle,
  headerPath,
}: {
  config: Config<any, any, any>;
  data: Data;
  onChange?: (data: Data) => void;
  onSave: (data: Data) => void;
  onPublish: (data: Data) => void;
  plugins?: Plugin[];
  renderComponentList?: (props: {
    children: ReactNode;
    dispatch: (action: PuckAction) => void;
    state: AppState;
  }) => ReactElement;
  renderHeader?: (props: {
    children: ReactNode;
    dispatch: (action: PuckAction) => void;
    state: AppState;
  }) => ReactElement;
  renderHeaderActions?: (props: {
    state: AppState;
    dispatch: (action: PuckAction) => void;
  }) => ReactElement;
  headerTitle?: string;
  headerPath?: string;
}) {
  const [reducer] = useState(() => createReducer({ config }));

  const [initialAppState] = useState<AppState>({
    ...defaultAppState,
    data: initialData,
    ui: {
      ...defaultAppState.ui,

      // Store categories under componentList on state to allow render functions and plugins to modify
      componentList: config.categories
        ? Object.entries(config.categories).reduce(
            (acc, [categoryName, category]) => {
              return {
                ...acc,
                [categoryName]: {
                  title: category.title,
                  components: category.components,
                  expanded: category.defaultExpanded,
                  visible: category.visible,
                },
              };
            },
            {}
          )
        : {},
    },
  });

  const [appState, dispatch] = useReducer<StateReducer>(
    reducer,
    flushZones(initialAppState)
  );

  const { data, ui } = appState;

  const { resolveData, componentState } = useResolvedData(
    appState,
    config,
    dispatch
  );

  const [menuOpen, setMenuOpen] = useState(false);

  const { itemSelector, leftSideBarVisible, rightSideBarVisible } = ui;

  const setItemSelector = useCallback(
    (newItemSelector: ItemSelector | null) => {
      dispatch({
        type: "setUi",
        ui: { itemSelector: newItemSelector },
      });
    },
    []
  );

  const selectedItem = itemSelector ? getItem(itemSelector, data) : null;

  const Page = useCallback(
    (pageProps) => (
      <PluginRenderer
        plugins={plugins}
        renderMethod="renderRoot"
        dispatch={pageProps.dispatch}
        state={pageProps.state}
      >
        {config.root?.render
          ? config.root?.render({ ...pageProps, editMode: true })
          : pageProps.children}
      </PluginRenderer>
    ),
    [config.root]
  );

  const PageFieldWrapper = useCallback(
    (props) => (
      <PluginRenderer
        plugins={plugins}
        renderMethod="renderRootFields"
        dispatch={props.dispatch}
        state={props.state}
      >
        {props.children}
      </PluginRenderer>
    ),
    []
  );

  const ComponentFieldWrapper = useCallback(
    (props) => (
      <PluginRenderer
        plugins={plugins}
        renderMethod="renderFields"
        dispatch={props.dispatch}
        state={props.state}
      >
        {props.children}
      </PluginRenderer>
    ),
    []
  );

  const ComponentListWrapper = useCallback((props) => {
    const children = (
      <PluginRenderer
        plugins={plugins}
        renderMethod="renderComponentList"
        dispatch={props.dispatch}
        state={props.state}
      >
        {props.children}
      </PluginRenderer>
    );

    // User's render method wraps the plugin render methods
    return renderComponentList
      ? renderComponentList({
          children,
          dispatch,
          state: appState,
        })
      : children;
  }, []);

  const FieldWrapper = itemSelector ? ComponentFieldWrapper : PageFieldWrapper;

  const rootFields = config.root?.fields || defaultPageFields;

  let fields = selectedItem
    ? (config.components[selectedItem.type]?.fields as Record<
        string,
        Field<any>
      >) || {}
    : rootFields;

  useEffect(() => {
    if (onChange) onChange(data);
  }, [data]);

  const { onDragStartOrUpdate, placeholderStyle } = usePlaceholderStyle();

  const [draggedItem, setDraggedItem] = useState<
    DragStart & Partial<DragUpdate>
  >();

  const componentList = useComponentList(config, appState.ui);

  // DEPRECATED
  const rootProps = data.root.props || data.root;

  // DEPRECATED
  useEffect(() => {
    if (Object.keys(data.root).length > 0 && !data.root.props) {
      console.error(
        "Warning: Defining props on `root` is deprecated. Please use `root.props`. This will be a breaking change in a future release."
      );
    }
  }, []);

  const toggleSidebars = useCallback(
    (sidebar: "left" | "right") => {
      const widerViewport = window.matchMedia("(min-width: 638px)").matches;
      const sideBarVisible =
        sidebar === "left" ? leftSideBarVisible : rightSideBarVisible;
      const oppositeSideBar =
        sidebar === "left" ? "rightSideBarVisible" : "leftSideBarVisible";

      dispatch({
        type: "setUi",
        ui: {
          [`${sidebar}SideBarVisible`]: !sideBarVisible,
          ...(!widerViewport ? { [oppositeSideBar]: false } : {}),
        },
      });
    },
    [dispatch, leftSideBarVisible, rightSideBarVisible]
  );

  useEffect(() => {
    if (!window.matchMedia("(min-width: 638px)").matches) {
      dispatch({
        type: "setUi",
        ui: {
          leftSideBarVisible: false,
          rightSideBarVisible: false,
        },
      });
    }

    const handleResize = () => {
      if (!window.matchMedia("(min-width: 638px)").matches) {
        dispatch({
          type: "setUi",
          ui: (ui) => ({
            ...ui,
            ...(ui.rightSideBarVisible ? { leftSideBarVisible: false } : {}),
          }),
        });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [showComponentsSection, setShowComponentsSection] = useState(false);
  const [showGlobaleProps, setShowGlobaleProps] = useState(false)
  const [isClicked, setIsClicked] = useState(false);
  
  const handleAddBlockButtonClick = () => {
    // Toggle the showComponentsSection state
    if (selectedItem) {
      setItemSelector(null);      
      setShowGlobaleProps(false)
      setIsClicked(false);  
    }  
    setShowComponentsSection(!showComponentsSection);  
    setIsClicked(!isClicked);  
    setShowGlobaleProps(false)
  };

  const handleGlobaleStyleButton = () => {
    if (selectedItem) {
      setItemSelector(null);      
    }  
    setShowGlobaleProps(!showGlobaleProps)
    setShowComponentsSection(false)
    setIsClicked(false);  
  }
  
  return (
    <div>
      <AppProvider
        value={{ state: appState, dispatch, config, componentState }}
      >
        <DragDropContext
          onDragUpdate={(update) => {
            setDraggedItem({ ...draggedItem, ...update });
            onDragStartOrUpdate(update);
          }}
          onBeforeDragStart={(start) => {
            onDragStartOrUpdate(start);
            setItemSelector(null);
          }}
          onDragEnd={(droppedItem) => {
            setDraggedItem(undefined);

            // User cancel drag
            if (!droppedItem.destination) {
              return;
            }

            // New component
            if (
              droppedItem.source.droppableId.startsWith("component-list") &&
              droppedItem.destination
            ) {
              const [_, componentType] = droppedItem.draggableId.split("::");

              dispatch({
                type: "insert",
                componentType: componentType || droppedItem.draggableId,
                destinationIndex: droppedItem.destination!.index,
                destinationZone: droppedItem.destination.droppableId,
              });

              setItemSelector({
                index: droppedItem.destination!.index,
                zone: droppedItem.destination.droppableId,
              });

              return;
            } else {
              const { source, destination } = droppedItem;

              if (source.droppableId === destination.droppableId) {
                dispatch({
                  type: "reorder",
                  sourceIndex: source.index,
                  destinationIndex: destination.index,
                  destinationZone: destination.droppableId,
                });
              } else {
                dispatch({
                  type: "move",
                  sourceZone: source.droppableId,
                  sourceIndex: source.index,
                  destinationIndex: destination.index,
                  destinationZone: destination.droppableId,
                });
              }

              setItemSelector({
                index: destination.index,
                zone: destination.droppableId,
              });
            }
          }}
        >
          <DropZoneProvider
            value={{
              data,
              itemSelector,
              setItemSelector,
              config,
              dispatch,
              draggedItem,
              placeholderStyle,
              mode: "edit",
              areaId: "root",
            }}
          >
            <dropZoneContext.Consumer>
              {(ctx) => {
                return (
                  <div
                    className={getClassName({
                      leftSideBarVisible,
                      menuOpen,
                      rightSideBarVisible,
                    })}
                  >
                    <header className={getClassName("header")}>
                      {renderHeader ? (
                        renderHeader({
                          children: (
                            <>
                              <Button
                                onClick={() => {
                                  onSave(data);
                                }}
                                icon={<Globe size="14px" />}
                              >
                                Save
                              </Button>
                              <Button
                                onClick={() => {
                                  onPublish(data);
                                }}
                                icon={<Globe size="14px" />}
                              >
                                Publish
                              </Button>
                            </>
                          ),
                          dispatch,
                          state: appState,
                        })
                      ) : (
                        <div className={getClassName("headerInner")}>
                          <div className={getClassName("headerToggle")}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="157"
                              height="32"
                              viewBox="0 0 157 32"
                              fill="none"
                            >
                              <path
                                d="M57.5259 26.4302C57.0465 26.6487 56.6543 26.6487 53.9524 26.6487C50.5096 26.6487 50.2481 26.4302 50.2481 23.5907C50.2481 21.6685 50.3352 21.1879 50.771 20.7947C51.2068 20.4016 51.7298 20.3142 54.6932 20.3142C57.7874 20.3142 58.0488 20.4016 58.136 21.7122H61.5788V21.319C61.5788 19.5715 61.143 18.5231 60.1842 18.0425C59.1819 17.562 58.2231 17.4746 53.8216 17.4746C50.5096 17.4746 49.3765 17.6494 48.3306 18.261C47.1104 18.9599 46.7617 20.0958 46.7617 23.1975C46.7617 26.6924 47.1104 27.9592 48.2434 28.7019C49.2022 29.3135 50.2917 29.4883 53.6909 29.4883C56.0442 29.4883 57.4387 29.4883 58.1796 29.4009C60.0099 29.2698 60.9687 28.7893 61.448 27.7845C61.7095 27.2603 61.7531 26.6487 61.7531 24.9449H58.2667C58.2231 25.8623 58.0488 26.2118 57.5259 26.4302Z"
                                fill="#E65925"
                              />
                              <path
                                d="M76.2653 17.6923C75.4373 17.5613 74.3914 17.5176 70.9921 17.5176C67.898 17.5176 66.8085 17.6049 65.8062 17.8671C64.4988 18.2602 63.8015 18.9155 63.4529 20.1824C63.235 20.9688 63.1914 21.493 63.1914 23.4589C63.1914 26.0363 63.2786 26.9101 63.7579 27.7838C64.1937 28.6575 64.9782 29.1381 66.2856 29.4002C66.9828 29.5312 68.421 29.5749 71.2536 29.5749C72.3867 29.5749 73.9556 29.5749 74.6093 29.5312C76.3089 29.4439 77.3112 29.1817 78.0085 28.5701C79.0108 27.7401 79.3159 26.6043 79.3159 23.721C79.3159 22.2794 79.2723 21.3183 79.2287 20.8377C78.9672 18.9592 78.052 17.9981 76.2653 17.6923ZM75.3065 25.9927C74.9143 26.5606 74.2606 26.648 71.1665 26.648C68.4645 26.648 67.898 26.5606 67.4186 26.1674C66.9828 25.7742 66.8521 25.1626 66.8521 23.4152C66.8521 21.7114 66.9828 21.1435 67.4622 20.7503C67.9416 20.4009 68.6389 20.3135 71.2972 20.3135C75.6988 20.3135 75.7859 20.3572 75.7859 23.3278C75.7423 24.9879 75.6552 25.5558 75.3065 25.9927Z"
                                fill="#E65925"
                              />
                              <path
                                d="M107.032 26.6048L99.885 17.6055H93.8274L93.9146 26.6048L86.7675 17.6055H81.0586V29.4444H84.5014L84.4142 20.5324L91.4741 29.4444H97.2266V20.1829L104.548 29.4444H110.344V17.6055H106.945L107.032 26.6048Z"
                                fill="#E65925"
                              />
                              <path
                                d="M115.835 24.6826H124.812V22.3236H115.835V20.314H125.379V17.6055H112.305V29.4444H125.509V26.7795H115.835V24.6826Z"
                                fill="#E65925"
                              />
                              <path
                                d="M137.624 26.4302C137.144 26.6487 136.752 26.6487 134.05 26.6487C130.607 26.6487 130.346 26.4302 130.346 23.5907C130.346 21.6685 130.433 21.1879 130.869 20.7947C131.304 20.4016 131.827 20.3142 134.791 20.3142C137.885 20.3142 138.146 20.4016 138.234 21.7122H141.676V21.319C141.676 19.5715 141.241 18.5231 140.282 18.0425C139.28 17.562 138.321 17.4746 133.919 17.4746C130.607 17.4746 129.474 17.6494 128.428 18.261C127.208 18.9599 126.859 20.0958 126.859 23.1975C126.859 26.6924 127.208 27.9592 128.341 28.7019C129.3 29.3135 130.389 29.4883 133.789 29.4883C136.142 29.4883 137.536 29.4883 138.277 29.4009C140.108 29.2698 141.066 28.7893 141.546 27.7845C141.807 27.2603 141.851 26.6487 141.851 24.9449H138.364C138.321 25.8623 138.146 26.2118 137.624 26.4302Z"
                                fill="#E65925"
                              />
                              <path
                                d="M148.086 29.4451H151.659V20.5332L148.086 22.4117V29.4451Z"
                                fill="#E65925"
                              />
                              <path
                                d="M156.889 17.6055H142.812V20.5324H156.889V17.6055Z"
                                fill="#E65925"
                              />
                              <path
                                d="M59.7458 2.4892C61.5761 2.83868 62.4477 3.75609 62.7092 5.67828C62.7963 6.15882 62.7963 7.11991 62.7963 8.56155C62.7963 11.4011 62.4913 12.5807 61.4889 13.4107C60.7917 14.0223 59.7893 14.2844 58.0897 14.3718C57.436 14.4155 55.8672 14.4155 54.7341 14.4155C51.945 14.4155 50.5069 14.3718 49.766 14.2407C48.4586 14.0223 47.7178 13.4981 47.2384 12.6243C46.759 11.7506 46.6719 10.8769 46.6719 8.29944C46.6719 6.33357 46.7155 5.80933 46.9333 5.02298C47.282 3.75609 47.9793 3.1008 49.2867 2.70763C50.289 2.44551 51.3349 2.35814 54.4726 2.35814C57.8718 2.27077 58.9177 2.31445 59.7458 2.4892ZM50.9427 5.5909C50.4633 5.98408 50.3326 6.552 50.3326 8.25575C50.3326 10.0032 50.4633 10.6148 50.8991 11.008C51.3785 11.4011 51.945 11.4885 54.6469 11.4885C57.7411 11.4885 58.3948 11.4011 58.787 10.8332C59.1356 10.3964 59.2228 9.78476 59.2228 8.21206C59.2228 5.24141 59.1792 5.19773 54.7341 5.19773C52.1193 5.19773 51.422 5.2851 50.9427 5.5909Z"
                                fill="black"
                              />
                              <path
                                d="M64.582 2.40234H70.291L77.438 11.4017L77.3509 2.40234H80.7501V14.1976H74.9976L67.9377 5.32931L68.0248 14.2413H64.582V2.40234Z"
                                fill="black"
                              />
                              <path
                                d="M95.7854 2.40234V5.06719H86.2415V7.12043H95.2189V9.47948H86.2415V11.5764H95.8726V14.2413H82.668V2.44603H95.7854V2.40234Z"
                                fill="black"
                              />
                              <path
                                d="M102.804 5.32931H97.5742V2.40234H111.65V5.32931H106.421V14.2413H102.847V5.32931H102.804Z"
                                fill="black"
                              />
                              <path
                                d="M115.921 2.40234H120.715L127.165 14.1976H123.242L122.066 12.1006H114.483L113.35 14.1976H109.297L115.921 2.40234ZM120.845 9.65422L118.318 4.93613L115.79 9.65422H120.845Z"
                                fill="black"
                              />
                              <path
                                d="M127.773 2.40234H136.794C139.061 2.40234 139.671 2.48972 140.412 2.8392C141.588 3.40712 142.024 4.49927 142.024 6.72726C142.024 8.99893 141.632 10.1348 140.629 10.7464C139.932 11.1832 139.148 11.3143 137.099 11.3143H131.347V14.2413H127.773V2.40234ZM136.533 8.4747C138.015 8.4747 138.407 8.1689 138.407 7.03306C138.407 5.63511 138.058 5.28562 136.533 5.28562H131.303V8.4747H136.533Z"
                                fill="black"
                              />
                              <path
                                d="M18.2148 11.5776L16.0358 9.39329C16.0358 9.39329 15.9922 9.34961 15.9486 9.34961C15.9051 9.34961 15.9051 9.34961 15.8615 9.39329C14.2055 11.097 13.2031 13.3687 13.2031 15.9025C13.2031 18.4363 14.2055 20.7517 15.8615 22.4117C15.8615 22.4117 15.9051 22.4554 15.9486 22.4554C15.9922 22.4554 15.9922 22.4554 16.0358 22.4117L18.2148 20.2274C18.2584 20.1837 18.2584 20.0964 18.2148 20.0527C17.1689 18.9605 16.5152 17.4752 16.5152 15.8588C16.5152 14.2424 17.1689 12.7571 18.2148 11.665C18.3019 11.7087 18.2584 11.6213 18.2148 11.5776Z"
                                fill="#E65925"
                              />
                              <path
                                d="M34.1244 6.98957C34.168 6.98957 34.2551 7.03326 34.2551 7.12063V24.7698C34.2551 24.8135 34.2116 24.9008 34.1244 24.9008H16.2568L11.5938 29.5752H35.2575C37.8722 29.5752 40.0512 27.4346 40.0512 24.7698V7.07694C40.0512 4.45578 37.9158 2.27148 35.2575 2.27148H11.5938L16.2568 6.94589H34.1244V6.98957ZM37.4364 9.34862V22.4981C37.4364 22.6728 37.3057 22.8476 37.0878 22.8476C36.8699 22.8476 36.7392 22.7165 36.7392 22.4981V9.34862C36.7392 9.17387 36.8699 8.99913 37.0878 8.99913C37.3057 8.99913 37.4364 9.17387 37.4364 9.34862Z"
                                fill="black"
                              />
                              <path
                                d="M13.5542 6.90181L11.3752 4.71751C11.3752 4.71751 11.3316 4.67383 11.288 4.67383C11.2444 4.67383 11.2444 4.67383 11.2009 4.71751C8.36818 7.60079 6.625 11.5762 6.625 15.9448C6.625 20.3134 8.36818 24.2888 11.2009 27.1721C11.2009 27.1721 11.2444 27.2158 11.288 27.2158C11.3316 27.2158 11.3316 27.2158 11.3752 27.1721L13.5542 24.9878C13.5977 24.9441 13.5977 24.8568 13.5542 24.8131C11.3316 22.5414 9.93705 19.396 9.93705 15.9448C9.93705 12.4936 11.3316 9.34823 13.5542 7.07656C13.5977 7.03287 13.5977 6.9455 13.5542 6.90181Z"
                                fill="#E65925"
                              />
                              <path
                                d="M6.53694 0.043687C2.48404 4.15017 0 9.74198 0 15.9454C0 22.1488 2.48404 27.7406 6.53694 31.8471C6.53694 31.8471 6.58052 31.8908 6.6241 31.8908C6.66768 31.8908 6.66768 31.8908 6.71126 31.8471L8.89023 29.6628C8.93382 29.6191 8.93382 29.5317 8.89023 29.4881C5.44745 25.9932 3.31205 21.2314 3.31205 15.9454C3.31205 10.6594 5.44745 5.89761 8.89023 2.40273C8.93382 2.35904 8.93382 2.27167 8.89023 2.22799L6.71126 0.043687C6.71126 0.043687 6.66768 0 6.6241 0C6.58052 0 6.58052 9.99242e-07 6.53694 0.043687Z"
                                fill="#E65925"
                              />
                              <path
                                d="M22.9084 18.6314C24.3895 18.4486 25.4423 17.0969 25.2599 15.6122C25.0776 14.1275 23.7291 13.0722 22.2481 13.255C20.767 13.4378 19.7142 14.7895 19.8966 16.2742C20.0789 17.7588 21.4274 18.8142 22.9084 18.6314Z"
                                fill="#E65925"
                              />
                            </svg>
                            {/* <div className={getClassName("leftSideBarToggle")}>
                              <IconButton
                                onClick={() => {
                                  toggleSidebars("left");
                                }}
                                title="Toggle left sidebar"
                              >
                                <Sidebar focusable="false" />
                              </IconButton>
                            </div>
                            <div className={getClassName("rightSideBarToggle")}>
                              <IconButton
                                onClick={() => {
                                  toggleSidebars("right");
                                }}
                                title="Toggle right sidebar"
                              >
                                <Sidebar focusable="false" />
                              </IconButton>
                            </div> */}
                          </div>
                          <div className={getClassName("headerTitle")}>
                            {/* <Heading rank={2} size="xs">
                              {headerTitle || rootProps.title || "Page"}
                              {headerPath && (
                                <>
                                  {" "}
                                  <code className={getClassName("headerPath")}>
                                    {headerPath}
                                  </code>
                                </>
                              )}
                            </Heading> */}
                            <Button
                            // icon={<Edit size="14px" />}
                            onClick={handleGlobaleStyleButton}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="21"
                                height="20"
                                viewBox="0 0 21 20"
                                fill="none"
                              >
                                <path
                                  d="M17.3516 7.39922L13.1016 3.14922L14.5266 1.72422C14.9099 1.34089 15.3809 1.14922 15.9396 1.14922C16.4982 1.14922 16.9689 1.34089 17.3516 1.72422L18.7766 3.14922C19.1599 3.53255 19.3516 4.00355 19.3516 4.56222C19.3516 5.12089 19.1599 5.59155 18.7766 5.97422L17.3516 7.39922ZM1.50156 18.9992V14.7492L6.00156 10.2492L0.726562 4.92422L5.45156 0.199219L10.7516 5.52422L11.7016 4.57422L15.9516 8.79922L15.0016 9.74922L20.2766 15.0742L15.5766 19.7742L10.2516 14.4742L5.75156 18.9992H1.50156ZM7.42656 8.82422L9.32656 6.92422L8.12656 5.72422L6.92656 6.89922L5.52656 5.49922L6.70156 4.29922L5.42656 3.04922L3.55156 4.94922L7.42656 8.82422ZM15.5516 16.9492L17.4516 15.0492L16.1766 13.7992L15.0016 14.9742L13.5766 13.5742L14.7766 12.3742L13.5516 11.1742L11.6516 13.0742L15.5516 16.9492Z"
                                  fill="white"
                                />
                              </svg>
                              Global Styling
                            </Button>
                            <Button
                              // icon={<Settings size="14px" />}
                              variant="warning"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M9.24922 22L8.84922 18.8C8.63255 18.7167 8.42822 18.6167 8.23622 18.5C8.04422 18.3833 7.85689 18.2583 7.67422 18.125L4.69922 19.375L1.94922 14.625L4.52422 12.675C4.50755 12.5583 4.49922 12.4457 4.49922 12.337V11.663C4.49922 11.5543 4.50755 11.4417 4.52422 11.325L1.94922 9.375L4.69922 4.625L7.67422 5.875C7.85755 5.74167 8.04922 5.61667 8.24922 5.5C8.44922 5.38333 8.64922 5.28333 8.84922 5.2L9.24922 2H14.7492L15.1492 5.2C15.3659 5.28333 15.5702 5.38333 15.7622 5.5C15.9542 5.61667 16.1416 5.74167 16.3242 5.875L19.2992 4.625L22.0492 9.375L19.4742 11.325C19.4909 11.4417 19.4992 11.5543 19.4992 11.663V12.337C19.4992 12.4457 19.4826 12.5583 19.4492 12.675L22.0242 14.625L19.2742 19.375L16.3242 18.125C16.1409 18.2583 15.9492 18.3833 15.7492 18.5C15.5492 18.6167 15.3492 18.7167 15.1492 18.8L14.7492 22H9.24922ZM12.0492 15.5C13.0159 15.5 13.8409 15.1583 14.5242 14.475C15.2076 13.7917 15.5492 12.9667 15.5492 12C15.5492 11.0333 15.2076 10.2083 14.5242 9.525C13.8409 8.84167 13.0159 8.5 12.0492 8.5C11.0659 8.5 10.2366 8.84167 9.56122 9.525C8.88589 10.2083 8.54855 11.0333 8.54922 12C8.54922 12.9667 8.88655 13.7917 9.56122 14.475C10.2359 15.1583 11.0652 15.5 12.0492 15.5Z"
                                  fill="#333333"
                                />
                              </svg>
                              Global Settings
                            </Button>
                          </div>
                          <div className={getClassName("headerTools")}>
                            <div className={getClassName("menuButton")}>
                              <IconButton
                                onClick={() => {
                                  return setMenuOpen(!menuOpen);
                                }}
                                title="Toggle menu bar"
                              >
                                {menuOpen ? (
                                  <ChevronUp focusable="false" />
                                ) : (
                                  <ChevronDown focusable="false" />
                                )}
                              </IconButton>
                            </div>
                            <MenuBar
                              appState={appState}
                              data={data}
                              dispatch={dispatch}
                              onSave={onSave}
                              onPublish={onPublish}
                              menuOpen={menuOpen}
                              renderHeaderActions={renderHeaderActions}
                              setMenuOpen={setMenuOpen}
                            />
                          </div>
                        </div>
                      )}
                    </header>
                    <div className={getClassName("leftSideBar")}>
                      <div className={getClassName("leftSideBarButton")}>
                        <Button align="center" variant="info">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="19"
                            height="19"
                            viewBox="0 0 19 19"
                            fill="none"
                          >
                            <path
                              d="M17.5 17.8906H17.51M1.5 17.8906H1.51M5.5 17.8906H5.51M9.5 17.8906H9.51M13.5 17.8906H13.51M17.5 1.89062H17.51M1.5 1.89062H1.51M5.5 1.89062H5.51M9.5 1.89062H9.51M13.5 1.89062V1.90063M1.5 6.89062C1.5 6.62541 1.60536 6.37105 1.79289 6.18352C1.98043 5.99598 2.23478 5.89062 2.5 5.89062H16.5C16.7652 5.89062 17.0196 5.99598 17.2071 6.18352C17.3946 6.37105 17.5 6.62541 17.5 6.89062V12.8906C17.5 13.1558 17.3946 13.4102 17.2071 13.5977C17.0196 13.7853 16.7652 13.8906 16.5 13.8906H2.5C2.23478 13.8906 1.98043 13.7853 1.79289 13.5977C1.60536 13.4102 1.5 13.1558 1.5 12.8906V6.89062Z"
                              stroke="white"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          Add Section
                        </Button>
                        <Button
                          variant={isClicked ? 'gray' : 'info'}
                          align="center"
                          // onClick={() =>
                          //   setShowComponentsSection(!showComponentsSection)
                          // }
                          onClick={handleAddBlockButtonClick}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 25 25"
                            fill="none"
                          >
                            <path
                              d="M17.15 13.4656C17.0167 13.4656 16.8917 13.445 16.775 13.4036C16.6583 13.3623 16.55 13.2913 16.45 13.1906L12.2 8.94063C12.1 8.84063 12.0293 8.73229 11.988 8.61562C11.9467 8.49896 11.9257 8.37396 11.925 8.24062C11.925 8.10729 11.946 7.98229 11.988 7.86562C12.03 7.74896 12.1007 7.64062 12.2 7.54063L16.45 3.29063C16.55 3.19063 16.6583 3.11996 16.775 3.07862C16.8917 3.03729 17.0167 3.01629 17.15 3.01562C17.2833 3.01562 17.4083 3.03662 17.525 3.07862C17.6417 3.12062 17.75 3.19129 17.85 3.29063L22.1 7.54063C22.2 7.64062 22.271 7.74896 22.313 7.86562C22.355 7.98229 22.3757 8.10729 22.375 8.24062C22.375 8.37396 22.354 8.49896 22.312 8.61562C22.27 8.73229 22.1993 8.84063 22.1 8.94063L17.85 13.1906C17.75 13.2906 17.6417 13.3616 17.525 13.4036C17.4083 13.4456 17.2833 13.4663 17.15 13.4656ZM4.5 11.8906C4.21667 11.8906 3.97933 11.7946 3.788 11.6026C3.59667 11.4106 3.50067 11.1733 3.5 10.8906V4.89062C3.5 4.60729 3.596 4.36962 3.788 4.17762C3.98 3.98562 4.21733 3.88996 4.5 3.89062H10.5C10.7833 3.89062 11.021 3.98663 11.213 4.17863C11.405 4.37063 11.5007 4.60796 11.5 4.89062V10.8906C11.5 11.174 11.404 11.4116 11.212 11.6036C11.02 11.7956 10.7827 11.8913 10.5 11.8906H4.5ZM14.5 21.8906C14.2167 21.8906 13.9793 21.7946 13.788 21.6026C13.5967 21.4106 13.5007 21.1733 13.5 20.8906V14.8906C13.5 14.6073 13.596 14.3696 13.788 14.1776C13.98 13.9856 14.2173 13.89 14.5 13.8906H20.5C20.7833 13.8906 21.021 13.9866 21.213 14.1786C21.405 14.3706 21.5007 14.608 21.5 14.8906V20.8906C21.5 21.174 21.404 21.4116 21.212 21.6036C21.02 21.7956 20.7827 21.8913 20.5 21.8906H14.5ZM4.5 21.8906C4.21667 21.8906 3.97933 21.7946 3.788 21.6026C3.59667 21.4106 3.50067 21.1733 3.5 20.8906V14.8906C3.5 14.6073 3.596 14.3696 3.788 14.1776C3.98 13.9856 4.21733 13.89 4.5 13.8906H10.5C10.7833 13.8906 11.021 13.9866 11.213 14.1786C11.405 14.3706 11.5007 14.608 11.5 14.8906V20.8906C11.5 21.174 11.404 21.4116 11.212 21.6036C11.02 21.7956 10.7827 21.8913 10.5 21.8906H4.5Z"
                              fill="white"
                            />
                          </svg>
                          Add Block
                        </Button>
                      </div>

                      <SidebarSection title="Outline">
                        {ctx?.activeZones &&
                          ctx?.activeZones[rootDroppableId] && (
                            <LayerTree
                              data={data}
                              label={
                                areaContainsZones(data, "root")
                                  ? rootDroppableId
                                  : ""
                              }
                              zoneContent={data.content}
                              setItemSelector={setItemSelector}
                              itemSelector={itemSelector}
                            />
                          )}

                        {Object.entries(findZonesForArea(data, "root")).map(
                          ([zoneKey, zone]) => {
                            return (
                              <LayerTree
                                key={zoneKey}
                                data={data}
                                label={zoneKey}
                                zone={zoneKey}
                                zoneContent={zone}
                                setItemSelector={setItemSelector}
                                itemSelector={itemSelector}
                              />
                            );
                          }
                        )}
                      </SidebarSection>
                    </div>
                    <div className={getClassName("rightSideBar")}>
                      {/* {showComponentsSection && (
                        <SidebarSection title="Components">
                          <ComponentListWrapper>
                            {componentList ? (
                              componentList
                            ) : (
                              <ComponentList id="all" />
                            )}
                          </ComponentListWrapper>
                        </SidebarSection>
                      )} */}
                      {!selectedItem && showComponentsSection && (
                        <SidebarSection title="Components">
                          <ComponentListWrapper>
                            {componentList ? (
                              componentList
                            ) : (
                              <ComponentList id="all" />
                            )}
                          </ComponentListWrapper>
                        </SidebarSection>
                      )}

                      {selectedItem &&  (
                        <FieldWrapper dispatch={dispatch} state={appState}>
                          <SidebarSection
                            noPadding
                            // showBreadcrumbs
                            title={selectedItem ? selectedItem.type : "Page"}
                            isLoading={
                              selectedItem
                                ? componentState[selectedItem?.props.id]
                                    ?.loading
                                : componentState["puck-root"]?.loading
                            }
                          >
                            {Object.keys(fields).map((fieldName) => {
                              const field = fields[fieldName];

                              const onChange = (
                                value: any,
                                updatedUi?: Partial<UiState>
                              ) => {
                                let currentProps;

                                if (selectedItem) {
                                  currentProps = selectedItem.props;
                                } else {
                                  currentProps = rootProps;
                                }

                                const newProps = {
                                  ...currentProps,
                                  [fieldName]: value,
                                };

                                if (itemSelector) {
                                  const replaceActionData: ReplaceAction = {
                                    type: "replace",
                                    destinationIndex: itemSelector.index,
                                    destinationZone:
                                      itemSelector.zone || rootDroppableId,
                                    data: { ...selectedItem, props: newProps },
                                  };

                                  // We use `replace` action, then feed into `set` action so we can also process any UI changes
                                  const replacedData = replaceAction(
                                    data,
                                    replaceActionData
                                  );

                                  const setActionData: SetAction = {
                                    type: "set",
                                    state: {
                                      data: { ...data, ...replacedData },
                                      ui: { ...ui, ...updatedUi },
                                    },
                                  };

                                  // If the component has a resolveData method, we let resolveData run and handle the dispatch once it's done
                                  if (
                                    config.components[selectedItem!.type]
                                      ?.resolveData
                                  ) {
                                    resolveData(
                                      setAction(appState, setActionData)
                                    );
                                  } else {
                                    dispatch({
                                      ...setActionData,
                                      recordHistory: true,
                                    });
                                  }
                                } else {
                                  if (data.root.props) {
                                    // If the component has a resolveData method, we let resolveData run and handle the dispatch once it's done
                                    if (config.root?.resolveData) {
                                      resolveData({
                                        ui: { ...ui, ...updatedUi },
                                        data: {
                                          ...data,
                                          root: { props: newProps },
                                        },
                                      });
                                    } else {
                                      dispatch({
                                        type: "set",
                                        state: {
                                          ui: { ...ui, ...updatedUi },
                                          data: {
                                            ...data,
                                            root: { props: newProps },
                                          },
                                        },
                                        recordHistory: true,
                                      });
                                    }
                                  } else {
                                    // DEPRECATED
                                    dispatch({
                                      type: "setData",
                                      data: { root: newProps },
                                    });
                                  }
                                }
                              };

                              if (selectedItem && itemSelector) {
                                const { readOnly = {} } = selectedItem;

                                return (
                                  <InputOrGroup
                                    key={`${selectedItem.props.id}_${fieldName}`}
                                    field={field}
                                    name={fieldName}
                                    id={`${selectedItem.props.id}_${fieldName}`}
                                    label={field.label}
                                    readOnly={readOnly[fieldName]}
                                    readOnlyFields={readOnly}
                                    value={selectedItem.props[fieldName]}
                                    onChange={onChange}
                                  />
                                );
                              } else {
                                const { readOnly = {} } = data.root;

                                return (
                                  <InputOrGroup
                                    key={`page_${fieldName}`}
                                    field={field}
                                    name={fieldName}
                                    id={`root_${fieldName}`}
                                    label={field.label}
                                    readOnly={readOnly[fieldName]}
                                    readOnlyFields={readOnly}
                                    value={rootProps[fieldName]}
                                    onChange={onChange}
                                  />
                                );
                              }
                            })}
                          </SidebarSection>
                        </FieldWrapper>
                      ) }

                      {!selectedItem  && showGlobaleProps && (
                        <FieldWrapper dispatch={dispatch} state={appState}>
                        <SidebarSection
                          noPadding
                          // showBreadcrumbs
                          title="Page"
                          isLoading={componentState["puck-root"]?.loading}
                        >
                          {Object.keys(fields).map((fieldName) => {
                            const field = fields[fieldName];
                      
                            const onChange = (
                              value: any,
                              updatedUi?: Partial<UiState>
                            ) => {
                              const newProps = {
                                ...rootProps,
                                [fieldName]: value,
                              };
                      
                              if (data.root.props) {
                                if (config.root?.resolveData) {
                                  resolveData({
                                    ui: { ...ui, ...updatedUi },
                                    data: {
                                      ...data,
                                      root: { props: newProps },
                                    },
                                  });
                                } else {
                                  dispatch({
                                    type: "set",
                                    state: {
                                      ui: { ...ui, ...updatedUi },
                                      data: {
                                        ...data,
                                        root: { props: newProps },
                                      },
                                    },
                                    recordHistory: true,
                                  });
                                }
                              } else {
                                // DEPRECATED
                                dispatch({
                                  type: "setData",
                                  data: { root: newProps },
                                });
                              }
                            };
                      
                            const { readOnly = {} } = data.root;
                      
                            return (
                              <InputOrGroup
                                key={`page_${fieldName}`}
                                field={field}
                                name={fieldName}
                                id={`root_${fieldName}`}
                                label={field.label}
                                readOnly={readOnly[fieldName]}
                                readOnlyFields={readOnly}
                                value={rootProps[fieldName]}
                                onChange={onChange}
                              />
                            );
                          })}
                        </SidebarSection>
                      </FieldWrapper>
                      
                      )}

                    </div>
                    <div
                      className={getClassName("frame")}
                      onClick={() => setItemSelector(null)}
                      id="puck-frame"
                    >
                      <div className={getClassName("root")}>
                        <div className={getClassName("page")}>
                          <Page
                            dispatch={dispatch}
                            state={appState}
                            {...rootProps}
                          >
                            <DropZone zone={rootDroppableId} />
                          </Page>
                        </div>
                      </div>
                      {/* Fill empty space under root */}
                      <div
                        style={{
                          background: "var(--puck-color-grey-10)",
                          height: "100%",
                          flexGrow: 1,
                        }}
                      ></div>
                    </div>
                  </div>
                );
              }}
            </dropZoneContext.Consumer>
          </DropZoneProvider>
        </DragDropContext>
      </AppProvider>
      <div id="puck-portal-root" />
    </div>
  );
}
