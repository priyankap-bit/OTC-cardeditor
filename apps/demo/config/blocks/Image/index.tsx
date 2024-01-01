import React, { useState } from "react";
import { ComponentConfig } from "@/core";
import { Section } from "../../components/Section";

export type ImageProps = {
  image: string; // Assuming the image is a Base64-encoded string
};

let base64Image: any;

const base64ToBlob = (base64String) => {
  const decodedImage = atob(base64String);
  const arrayBuffer = new ArrayBuffer(decodedImage.length);
  const uint8Array = new Uint8Array(arrayBuffer);

  for (let i = 0; i < decodedImage.length; i++) {
    uint8Array[i] = decodedImage.charCodeAt(i);
  }

  return new Blob([uint8Array], { type: 'image/png' });
};

export const Image: ComponentConfig<ImageProps> = {
  fields: {
    image: {
      type: "custom",
      render: ({ name, onChange, value, ...rest }) => {
        const handleImageChange = (e) => {
          const file = e.target.files[0];
          const reader = new FileReader();

          reader.onload = () => {
            base64Image = (reader.result as string).split(',')[1];
            onChange(base64Image);
          };

          reader.readAsDataURL(file);
        };

        return (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <label htmlFor="image_upload">Image</label>
            <input
              type="file"
              id="image_upload"
              onChange={handleImageChange}
              {...rest}
            />
            {value ? (
              <img src={URL.createObjectURL(base64ToBlob(value))} alt="Preview" />
            ) : (
              <img src="https://as1.ftcdn.net/v2/jpg/04/34/72/82/1000_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg" alt="Default Preview" />
            )}
          </div>
        );
      },
    },
  },
  defaultProps: {
    image: "",
  },
  render: ({ image }) => {
    const imageUrl = image ? URL.createObjectURL(base64ToBlob(image)) : null;

    return (
      <Section>
         <div>
          {image ? (
            <img src={imageUrl} alt="Preview" style={{ width: '100%', WebkitWidth: '-webkit-fill-available' }}  />
          ) : (
            <img src="https://as1.ftcdn.net/v2/jpg/04/34/72/82/1000_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg" alt="Default Preview" style={{ width: '100%', WebkitWidth: '-webkit-fill-available' }}  />
          )}
        </div>
      </Section>
    );
  },
};
