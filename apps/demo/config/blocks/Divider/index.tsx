import React from "react";
import { ComponentConfig } from "@/core/types/Config";
import styles from "./styles.module.css";
import { getClassNameFactory } from "@/core/lib";
import { Section } from "../../components/Section";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const getClassName = getClassNameFactory("Divider", styles);

// export type DividerProps = {
//   Items: {
//     content: string;
//     name: string;
//     title: string;
//   }[];
// };



export const Divider: ComponentConfig = {
  
  render: () => {
    return (
      <Section>
       <div className={getClassName("divider")}>
          <div className={getClassName("dividerOne")}></div>
          <div>
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
          </div>
          <div className={getClassName("dividerOne")}></div>
        </div>
        {/* {Items.map((item, i) => (
            <div key={i} className={getClassName("contents")}>
              <div className={getClassName("talk-bubble")}>
                <div className={getClassName("talktext")}>
                  <span
                    style={{
                      fontWeight: 300,
                      marginLeft: "auto",
                      marginRight: "auto",
                      justifyContent: "center",
                      maxWidth: "100%",
                      wordWrap: "break-word",
                    }}
                    className={getClassName("p")}
                  >
                    {item.content}
                  </span>
                </div>
              </div>
              <div className={getClassName("info")}>
                <div className={getClassName("image")}>
                  {item.image ? (
                    <img
                      src={`data:image/png;base64,${item.image}`}
                      alt="Preview"
                      className={getClassName("img")}
                    />
                  ) : (
                    <img
                      src="https://as1.ftcdn.net/v2/jpg/04/34/72/82/1000_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg"
                      alt="Default Preview"
                      className={getClassName("img")}
                    />
                  )}
                </div>
                <div className={getClassName("text-info")}>
                  <div
                    className={getClassName("name")}
                    style={{textAlign: "left",  }}
                  >
                    <span
                        style={{
                          fontWeight: "bold",
                          marginLeft: "auto",
                          marginRight: "auto",
                          justifyContent: "center",
                          maxWidth: "100%",
                          wordWrap: "break-word",
                        }}
                        className={getClassName("p")}
                      >
                        {item.name}
                      </span>
                  </div>
                  <div
                    className={getClassName("title")}
                    style={{ textAlign: "left" }}
                  >
                    {item.title}
                  </div>
                </div>
              </div>
            </div>
          ))} */}
      </Section>
    );
  },
};
