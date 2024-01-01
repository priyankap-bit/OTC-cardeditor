import { Droppable } from "@hello-pangea/dnd";
import styles from "./styles.module.css";
import getClassNameFactory from "../../lib/get-class-name-factory";
import { Draggable } from "../Draggable";
import { DragIcon } from "../DragIcon";
import { ReactNode } from "react";
import { useAppContext } from "../Puck/context";
import { ChevronDown, ChevronUp } from "react-feather";

const getClassName = getClassNameFactory("ComponentList", styles);
const getClassNameItem = getClassNameFactory("ComponentListItem", styles);

const ComponentListItem = ({
  component,
  index,
  id,
  extraField,
}: {
  component: string;
  index: number;
  id: string;
  extraField?: boolean | undefined;
}) => {
  return (
    <div
      className={getClassNameItem("itemContent")}
      // style={{
      //   width: "120px",
      // }}
    >
      <Draggable
        key={component}
        id={id}
        index={index}
        showShadow
        disableAnimations
        isDragDisabled={extraField}
        className={() => getClassNameItem(extraField ? "disable" : "draggable")}
      >
        {() => (
          <div>
            <div className={getClassNameItem("icon")}>
              {component === "Text" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 41 40"
                  fill="none"
                >
                  <path
                    d="M8.58203 28.3327H31.9154V24.9994H8.58203V28.3327ZM8.58203 21.666H31.9154V18.3327H8.58203V21.666ZM8.58203 14.9994H25.2487V11.666H8.58203V14.9994ZM6.91537 33.3327C5.9987 33.3327 5.2137 33.006 4.56037 32.3527C3.90703 31.6994 3.58092 30.9149 3.58203 29.9994V9.99935C3.58203 9.08268 3.9087 8.29768 4.56203 7.64435C5.21537 6.99102 5.99981 6.66491 6.91537 6.66602H33.582C34.4987 6.66602 35.2837 6.99268 35.937 7.64602C36.5904 8.29935 36.9165 9.0838 36.9154 9.99935V29.9994C36.9154 30.916 36.5887 31.701 35.9354 32.3544C35.282 33.0077 34.4976 33.3338 33.582 33.3327H6.91537ZM6.91537 29.9994H33.582V9.99935H6.91537V29.9994Z"
                    fill="#545454"
                  />
                </svg>
              ) : component === "Testimonial" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 41 40"
                  fill="none"
                >
                  <path
                    d="M8.25 6H32.25C33.35 6 34.29 6.4 35.07 7.18C35.85 7.96 36.25 8.9 36.25 10V24C36.25 25.1 35.85 26.04 35.07 26.82C34.29 27.6 33.35 28 32.25 28H30.25L20.25 38V28H8.25C7.15 28 6.21 27.6 5.43 26.82C4.65 26.04 4.25 25.1 4.25 24V10C4.25 8.9 4.65 7.96 5.43 7.18C6.21 6.4 7.15 6 8.25 6ZM30.25 10H8.25V12H30.25V10ZM32.25 16H8.25V18H32.25V16ZM26.25 22H8.25V24H26.25V22Z"
                    fill="#49454F"
                  />
                </svg>
              ) : component === "ImageGallery" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 41 40"
                  fill="none"
                >
                  <path
                    d="M5.7513 31.6673C4.83464 31.6673 4.04964 31.3407 3.3963 30.6873C2.74297 30.034 2.41686 29.2495 2.41797 28.334V11.6673C2.41797 10.7507 2.74464 9.96566 3.39797 9.31232C4.0513 8.65899 4.83575 8.33288 5.7513 8.33399H22.418C23.3346 8.33399 24.1196 8.66066 24.773 9.31399C25.4263 9.96732 25.7524 10.7518 25.7513 11.6673V28.334C25.7513 29.2507 25.4246 30.0357 24.7713 30.689C24.118 31.3423 23.3335 31.6684 22.418 31.6673H5.7513ZM30.7513 18.334C30.2791 18.334 29.883 18.174 29.563 17.854C29.243 17.534 29.0835 17.1384 29.0846 16.6673V10.0007C29.0846 9.52843 29.2446 9.13232 29.5646 8.81232C29.8846 8.49232 30.2802 8.33288 30.7513 8.33399H37.418C37.8902 8.33399 38.2863 8.49399 38.6063 8.81399C38.9263 9.13399 39.0858 9.52955 39.0846 10.0007V16.6673C39.0846 17.1395 38.9246 17.5357 38.6046 17.8557C38.2846 18.1757 37.8891 18.3351 37.418 18.334H30.7513ZM32.418 15.0007H35.7513V11.6673H32.418V15.0007ZM5.7513 28.334H22.418V11.6673H5.7513V28.334ZM9.08464 25.0007H19.0846C19.418 25.0007 19.668 24.8479 19.8346 24.5423C20.0013 24.2368 19.9735 23.9451 19.7513 23.6673L17.043 20.0423C16.8763 19.8201 16.6541 19.709 16.3763 19.709C16.0985 19.709 15.8763 19.8201 15.7096 20.0423L13.2513 23.334L11.6263 21.1673C11.4596 20.9451 11.2374 20.834 10.9596 20.834C10.6819 20.834 10.4596 20.9451 10.293 21.1673L8.41797 23.6673C8.19575 23.9451 8.16797 24.2368 8.33464 24.5423C8.50131 24.8479 8.75131 25.0007 9.08464 25.0007ZM30.7513 31.6673C30.2791 31.6673 29.883 31.5073 29.563 31.1873C29.243 30.8673 29.0835 30.4718 29.0846 30.0007V23.334C29.0846 22.8618 29.2446 22.4657 29.5646 22.1457C29.8846 21.8257 30.2802 21.6662 30.7513 21.6673H37.418C37.8902 21.6673 38.2863 21.8273 38.6063 22.1473C38.9263 22.4673 39.0858 22.8629 39.0846 23.334V30.0007C39.0846 30.4729 38.9246 30.869 38.6046 31.189C38.2846 31.509 37.8891 31.6684 37.418 31.6673H30.7513ZM32.418 28.334H35.7513V25.0007H32.418V28.334Z"
                    fill="#49454F"
                  />
                </svg>
              ) : component === "VideoGallery" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 41 40"
                  fill="none"
                >
                  <path
                    d="M29.457 17.709C29.8459 17.459 30.0404 17.1118 30.0404 16.6673C30.0404 16.2229 29.8459 15.8757 29.457 15.6257L21.332 10.4173C20.9154 10.1395 20.4915 10.1184 20.0604 10.354C19.6293 10.5895 19.4143 10.9579 19.4154 11.459V21.8757C19.4154 22.3757 19.6309 22.744 20.062 22.9807C20.4931 23.2173 20.9165 23.1962 21.332 22.9173L29.457 17.709ZM13.582 30.0007C12.6654 30.0007 11.8804 29.674 11.227 29.0207C10.5737 28.3673 10.2476 27.5829 10.2487 26.6673V6.66732C10.2487 5.75065 10.5754 4.96565 11.2287 4.31232C11.882 3.65899 12.6665 3.33288 13.582 3.33399H33.582C34.4987 3.33399 35.2837 3.66065 35.937 4.31399C36.5904 4.96732 36.9165 5.75177 36.9154 6.66732V26.6673C36.9154 27.584 36.5887 28.369 35.9354 29.0223C35.282 29.6757 34.4976 30.0018 33.582 30.0007H13.582ZM13.582 26.6673H33.582V6.66732H13.582V26.6673ZM6.91537 36.6673C5.9987 36.6673 5.2137 36.3407 4.56037 35.6873C3.90703 35.034 3.58092 34.2495 3.58203 33.334V11.6673C3.58203 11.1951 3.74203 10.799 4.06203 10.479C4.38203 10.159 4.77759 9.99954 5.2487 10.0007C5.72092 10.0007 6.11703 10.1607 6.43703 10.4807C6.75703 10.8007 6.91648 11.1962 6.91537 11.6673V33.334H28.582C29.0543 33.334 29.4504 33.494 29.7704 33.814C30.0904 34.134 30.2498 34.5295 30.2487 35.0007C30.2487 35.4729 30.0887 35.869 29.7687 36.189C29.4487 36.509 29.0531 36.6684 28.582 36.6673H6.91537Z"
                    fill="#49454F"
                  />
                </svg>
              ) : component === "ButtonGroup" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 41 40"
                  fill="none"
                >
                  <path
                    d="M34.082 34.1673C34.082 35.5006 32.9154 36.6673 31.582 36.6673H22.4154C21.7487 36.6673 21.2487 36.5007 20.7487 36.0007L14.082 29.0007L15.2487 27.6673C15.582 27.334 16.082 27.1673 16.582 27.1673H16.9154L20.7487 30.0007V15.0007C20.7487 14.0007 21.4154 13.334 22.4154 13.334C23.4154 13.334 24.082 14.0007 24.082 15.0007V22.5007L26.082 22.6673L32.582 26.334C33.4154 26.6673 34.082 27.6673 34.082 28.5007V34.1673ZM34.082 3.33398H7.41536C5.58203 3.33398 4.08203 4.83398 4.08203 6.66732V20.0007C4.08203 21.834 5.58203 23.334 7.41536 23.334H14.082V20.0007H7.41536V6.66732H34.082V20.0007H30.7487V23.334H34.082C35.9154 23.334 37.4154 21.834 37.4154 20.0007V6.66732C37.4154 4.83398 35.9154 3.33398 34.082 3.33398Z"
                    fill="#49454F"
                  />
                </svg>
              ) : component === "Heading" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="39"
                  height="39"
                  viewBox="0 0 42 42"
                  fill="none"
                >
                  <path
                    d="M18.1888 34.6673V12.459H8.79297V7.33398H32.7096V12.459H23.3138V34.6673H18.1888Z"
                    fill="#545454"
                  />
                </svg>
              ) : component === "Columns" ? (
                <img width="40px" height="40px"  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAZUlEQVR4nGNgGAUjCng5+3p4uvg99nT1/09V7OL3CGQ2TotBCqhuKZLlDDgthioiVY5SvQyjFiOD0aBGB6OJCxmMZicMMFqAIIPRAgQdjBYgQ6QAcRmgpo8XpLH3iO6NvVEwLAEAMdC6cd54iHwAAAAASUVORK5CYII=" />
              ) :
              component === "Card" ?(
                <img width="40px" height="40px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABIElEQVR4nO2ZUW7CQAxEfQygh0GqvOw6QWu4C9ADtNeidyrw0X61cghCIklVqZXipfOk/XI+ZjJOpEyIAAAAANBFFqtlYt0L60mCfvo6+WjaIuf6exNBX8YXqz86ifW538RitWwuYn1PrJsY11NyRozraQx5axpNa28yifW1dboh50jQXat13zPMRxtW82pCzqnm1aQ1cugML7tHhSBDeu/OiBR2CEbC+CkIEgkFJkKFIDByD4nIX+8xjFzBM+INwVvLGYJEnCFIxBmCREpJJLEebOCxmLulfqwfGiOsb51h0/eakZC35JzE+jRY0Fn92Lq0OnLHnGfkDOY8MxOJ80dz04fKbCuGx/50ld+W2BfM5XnNzhVqkb8VAAAAgP/KF8N04Wn9iSJ8AAAAAElFTkSuQmCC" />
              ): (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 41 40"
                  fill="none"
                >
                  <path
                    d="M8.58203 28.3327H31.9154V24.9994H8.58203V28.3327ZM8.58203 21.666H31.9154V18.3327H8.58203V21.666ZM8.58203 14.9994H25.2487V11.666H8.58203V14.9994ZM6.91537 33.3327C5.9987 33.3327 5.2137 33.006 4.56037 32.3527C3.90703 31.6994 3.58092 30.9149 3.58203 29.9994V9.99935C3.58203 9.08268 3.9087 8.29768 4.56203 7.64435C5.21537 6.99102 5.99981 6.66491 6.91537 6.66602H33.582C34.4987 6.66602 35.2837 6.99268 35.937 7.64602C36.5904 8.29935 36.9165 9.0838 36.9154 9.99935V29.9994C36.9154 30.916 36.5887 31.701 35.9354 32.3544C35.282 33.0077 34.4976 33.3338 33.582 33.3327H6.91537ZM6.91537 29.9994H33.582V9.99935H6.91537V29.9994Z"
                    fill="#545454"
                  />
                </svg>
              )}
            </div>
            <div className={getClassNameItem("name")}>{component}</div>

            {/* <div className={getClassNameItem("icon")}>
              <DragIcon />
            </div> */}
          </div>
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
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                background: "#DCDCDC",
                padding: "10px 6px",
                gap: "6px",
              }}
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
