import React from "react";
import { ComponentConfig } from "@/core/types/Config";
import styles from "./styles.module.css";
import { getClassNameFactory } from "@/core/lib";
import { Section } from "../../components/Section";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const getClassName = getClassNameFactory("Testimonial", styles);

export type TestimonialProps = {
  //   content: string;
  //   image: string;
  //   name: string;
  //   title: string;
  Divider: true | false;
  Title: true | false;
  Icon: string; // Add a new prop for the custom icon
  Items: {
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
    Divider: {
      type: "radio",
      options: [
        { label: "Show Divider", value: true },
        { label: "Hide Divider", value: false },
      ],
    },
    Title: {
      type: "radio",
      options: [
        { label: "Show Title", value: true },
        { label: "Hide Title", value: false },
      ],
    },
    Icon: {
      label: "Custom Icon",
      type: "custom",
      render: ({ name, onChange, value, ...rest }) => {
        const handleIconChange = (e) => {
          const file = e.target.files[0];
          const reader = new FileReader();

          reader.onload = () => {
            const base64Icon = reader.result.split(",")[1];
            onChange(base64Icon);
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
            Upload Icon
            <input
              name={name}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleIconChange}
              {...rest}
            />
          </label>
        );
      },
    },
    Items: {
      type: "array",
      getItemSummary: (item, i) => item.alt || `Testimonial ${i}`,
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
    Divider: true,
    Title: true,
    Icon: "https://img.icons8.com/fluency-systems-filled/48/star.png", // Default icon
    Items: [
      {
        content: "Content",
        image: "",
        name: "Name",
        title: "Title",
      },
    ],
  },
  render: ({ Items, Divider, Title, Icon }) => {
    console.log("icon",Icon);
    
    // const imageUrl = image ? URL.createObjectURL(base64ToBlob(image)) : null;
    return (
      // <div className={getClassName()} style={{ textAlign: "center", maxWidth:"1280px", marginLeft:"auto", marginRight:"auto" }}>
      <Section>
        {Divider && (
          <div className={getClassName("divider")}>
            <div className={getClassName("dividerOne")}></div>
            <div className={getClassName("icon")}>
              {/* <img
                width="30"
                height="30"
                src="https://img.icons8.com/fluency-systems-filled/48/star.png"
                alt="star"
              /> */}
               <img
                width="30"
                height="30"
                src={Icon.startsWith('http') ? Icon : `data:image/png;base64,${Icon}`}
                alt="icon"
              />
            </div>
            <div className={getClassName("dividerOne")}></div>
          </div>
        )}
        {Items && Items.length > 1 ? (
          <Carousel
            prevIcon={null} // Set to null to hide the previous arrow
            nextIcon={null} // Set to null to hide the next arrow
          >
            {Items.map((item, i) => (
              <Carousel.Item key={i}>
                <div className={getClassName("contents")}>
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
                        style={{ textAlign: "left" }}
                      >
                        {/* {item.name} */}
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
                      {Title && (
                        <div
                          className={getClassName("title")}
                          style={{ textAlign: "left" }}
                        >
                          {item.title}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          Items.map((item, i) => (
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
                {Title && (
                  <div className={getClassName("text-info")}>
                    <div
                      className={getClassName("name")}
                      style={{ textAlign: "left" }}
                    >
                      {/* {item.name} */}
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
                )}
              </div>
            </div>
          ))
        )}
      </Section>
    );
  },
};
