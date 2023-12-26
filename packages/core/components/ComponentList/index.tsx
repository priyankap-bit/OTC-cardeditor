import { Droppable } from "@hello-pangea/dnd";
import styles from "./styles.module.css";
import getClassNameFactory from "../../lib/get-class-name-factory";
import { Draggable } from "../Draggable";
import { DragIcon } from "../DragIcon";
import { ReactNode } from "react";
import { useAppContext } from "../Puck/context";
import { ChevronDown, ChevronUp } from "react-feather";
import React from "react";

const getClassName = getClassNameFactory("ComponentList", styles);
const getClassNameItem = getClassNameFactory("ComponentListItem", styles);

const ComponentListItem = ({
  component,
  index,
  id,
}: {
  component: string;
  index: number;
  id: string;
}) => {
  return (
    <div className={getClassNameItem()}>
      <Draggable
        key={component}
        id={id}
        index={index}
        showShadow
        disableAnimations
        className={() => getClassNameItem("draggable")}
      >
        {() => (
          <>
            <div className={getClassNameItem("name")}>{component}</div>
            <div className={getClassNameItem("icon")}>
              <DragIcon />
            </div>
          </>
        )}
      </Draggable>
    </div>
  );
};

const ComponentList = ({
  children,
  title,
  id,
}: {
  id: string;
  children?: ReactNode;
  title?: string;
}) => {
  const { config, state, setUi } = useAppContext();

  const { expanded = true } = state.ui.componentList[id] || {};

  return (
    <div
      className={getClassName({ isExpanded: expanded })}
      style={{
        marginBottom: "10px",
      }}
    >
      {title && (
        <div
          className={getClassName("title")}
          onClick={() =>
            setUi({
              componentList: {
                ...state.ui.componentList,
                [id]: {
                  ...state.ui.componentList[id],
                  expanded: !expanded,
                },
              },
            })
          }
          title={
            expanded
              ? `Collapse${title ? ` ${title}` : ""}`
              : `Expand${title ? ` ${title}` : ""}`
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 26 27"
            fill="none"
          >
            <path
              d="M14.0842 8.47487C13.7773 8.47487 13.5198 8.37087 13.3118 8.16287C13.1038 7.95487 13.0001 7.69776 13.0009 7.39154C13.0009 7.08459 13.1049 6.82712 13.3129 6.61912C13.5209 6.41112 13.778 6.30748 14.0842 6.3082H22.7509C23.0578 6.3082 23.3153 6.4122 23.5233 6.6202C23.7313 6.8282 23.8349 7.08531 23.8342 7.39154C23.8342 7.69848 23.7302 7.95595 23.5222 8.16395C23.3142 8.37195 23.0571 8.47559 22.7509 8.47487H14.0842ZM14.0842 14.9749C13.7773 14.9749 13.5198 14.8709 13.3118 14.6629C13.1038 14.4549 13.0001 14.1978 13.0009 13.8915C13.0009 13.5846 13.1049 13.3271 13.3129 13.1191C13.5209 12.9111 13.778 12.8075 14.0842 12.8082H22.7509C23.0578 12.8082 23.3153 12.9122 23.5233 13.1202C23.7313 13.3282 23.8349 13.5853 23.8342 13.8915C23.8342 14.1985 23.7302 14.456 23.5222 14.664C23.3142 14.872 23.0571 14.9756 22.7509 14.9749H14.0842ZM14.0842 21.4749C13.7773 21.4749 13.5198 21.3709 13.3118 21.1629C13.1038 20.9549 13.0001 20.6978 13.0009 20.3915C13.0009 20.0846 13.1049 19.8271 13.3129 19.6191C13.5209 19.4111 13.778 19.3075 14.0842 19.3082H22.7509C23.0578 19.3082 23.3153 19.4122 23.5233 19.6202C23.7313 19.8282 23.8349 20.0853 23.8342 20.3915C23.8342 20.6985 23.7302 20.956 23.5222 21.164C23.3142 21.372 23.0571 21.4756 22.7509 21.4749H14.0842ZM5.74253 21.7999L2.92586 18.9832C2.72725 18.7846 2.62325 18.5361 2.61386 18.2379C2.60448 17.9396 2.70848 17.6825 2.92586 17.4665C3.12448 17.2679 3.37292 17.1639 3.6712 17.1545C3.96948 17.1451 4.22659 17.2401 4.44253 17.4395L5.41753 18.3874V9.3957L4.44253 10.3436C4.24392 10.5422 3.99548 10.6415 3.6972 10.6415C3.39892 10.6415 3.14181 10.5332 2.92586 10.3165C2.72725 10.1179 2.62795 9.86515 2.62795 9.5582C2.62795 9.25126 2.72725 8.99848 2.92586 8.79987L5.74253 5.9832C5.9592 5.76654 6.21198 5.6582 6.50086 5.6582C6.78975 5.6582 7.04253 5.76654 7.2592 5.9832L10.0759 8.79987C10.2745 8.99848 10.3785 9.24692 10.3879 9.5452C10.3973 9.84348 10.2933 10.1006 10.0759 10.3165C9.87725 10.5151 9.62881 10.6191 9.33053 10.6285C9.03225 10.6379 8.77514 10.543 8.5592 10.3436L7.5842 9.3957V18.3874L8.5592 17.4395C8.75781 17.2408 9.00625 17.1415 9.30453 17.1415C9.60281 17.1415 9.85992 17.2499 10.0759 17.4665C10.2745 17.6651 10.3738 17.9179 10.3738 18.2249C10.3738 18.5318 10.2745 18.7846 10.0759 18.9832L7.2592 21.7999C7.04253 22.0165 6.78975 22.1249 6.50086 22.1249C6.21198 22.1249 5.9592 22.0165 5.74253 21.7999Z"
              fill="white"
            />
          </svg>
          <div>{title}</div>
          <div className={getClassName("titleIcon")}>
            {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </div>
        </div>
      )}
      <div className={getClassName("content")}>
        <Droppable
          droppableId={`component-list${title ? `:${title}` : ""}`}
          isDropDisabled
        >
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={getClassName({
                isDraggingFrom: !!snapshot.draggingFromThisWith,
              })}
            >
              {children ||
                Object.keys(config.components).map((componentKey, i) => {
                  return (
                    <ComponentListItem
                      key={componentKey}
                      component={componentKey}
                      index={i}
                      id={componentKey}
                    />
                  );
                })}
              {/* Use different element so we don't clash with :last-of-type */}
              <span style={{ display: "none" }}>{provided.placeholder}</span>
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

ComponentList.Item = ComponentListItem;

export { ComponentList };
