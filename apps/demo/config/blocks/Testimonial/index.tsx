import React from "react";
import { ComponentConfig } from "@/core/types/Config";
import styles from "./styles.module.css";
import { getClassNameFactory } from "@/core/lib";
import { Section } from "../../components/Section";

const getClassName = getClassNameFactory("Testimonial", styles);

export type TestimonialProps = {
  //   content: string;
  //   image: string;
  //   name: string;
  //   title: string;
  items: {
    content: string;
    image: string;
    name: string;
    title: string;
  }[];
};

const base64ToBlob = (base64String) => {
  const decodedImage = atob(base64String);
  const arrayBuffer = new ArrayBuffer(decodedImage.length);
  const uint8Array = new Uint8Array(arrayBuffer);

  for (let i = 0; i < decodedImage.length; i++) {
    uint8Array[i] = decodedImage.charCodeAt(i);
  }

  return new Blob([uint8Array], { type: "image/png" });
};

export const Testimonial: ComponentConfig<TestimonialProps> = {
  fields: {
    items: {
      type: "array",
      getItemSummary: (item, i) => item.alt || `Item #${i}`,
      defaultItemProps: {
        content: "Content",
        image: "",
        name: "Name",
        title: "Title",
      },
      arrayFields: {
        content: {
          label: "Content",
          type: "textarea",
        },
        image: {
          label: "Image URL",
          type: "custom",
          render: ({ name, onChange, value, ...rest }) => {
            const handleImageChange = (e) => {
              const file = e.target.files[0];
              const reader = new FileReader();

              reader.onload = () => {
                const base64Image = reader.result.split(",")[1]; // Extract base64 data
                onChange(base64Image);
              };

              reader.readAsDataURL(file);
            };
            return (
              <label
                style={{
                  display: "inline-block",
                  padding: "10px 15px",
                  fontSize: "16px",
                  cursor: "pointer",
                  backgroundColor: "#3498db",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                Upload pic
                <input
                  name={name}
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  style={{ display: "none" }} // Hide the default file input
                  onChange={handleImageChange}
                  {...rest}
                />
              </label>
            );
          },
        },
        name: {
          label: "Name",
          type: "text",
        },
        title: {
          label: "Title",
          type: "text",
        },
      },
    },
  },
  defaultProps: {
    // content: "Content",
    // image: "",
    // name: "name",
    // title: "title",
    items: [
      {
        content: "Content",
        image: "",
        name: "Name",
        title: "Title",
      },
    ],
  },
  render: ({ items }) => {
    // const imageUrl = image ? URL.createObjectURL(base64ToBlob(image)) : null;
    return (
      // <div className={getClassName()} style={{ textAlign: "center", maxWidth:"1280px", marginLeft:"auto", marginRight:"auto" }}>
      <Section>
        {items &&
          items.map((item, i) => (
            <>
              <div key={i} className={getClassName("contents")}>
                {/* <div className={getClassName("content")}>{item.content}</div> */}
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
                        //   style={{ width: "300px", height: "300px" }}
                      />
                    ) : (
                      <img
                        src="https://as1.ftcdn.net/v2/jpg/04/34/72/82/1000_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg"
                        alt="Default Preview"
                        className={getClassName("img")}
                        //   style={{ width: "300px", height: "300px" }}
                      />
                    )}
                  </div>
                    <div className={getClassName("text-info")}>
                      <div
                        className={getClassName("name")}
                        style={{ textAlign: "left", fontWeight: "bold" }}
                      >
                        {item.name}
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
            </>
          ))}
      </Section>
    );
  },
};
