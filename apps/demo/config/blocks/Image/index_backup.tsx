import React from "react";

import { ComponentConfig } from "@/core";
import { Section } from "../../components/Section";
import { useState } from 'react';

// const useImageUpload = () => {
//   const [selectedImage, setSelectedImage] = useState(null);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     console.log(file, "====file")
//     setSelectedImage(file);
//   };

//   return { selectedImage, handleImageChange };
// };

// const handleImageUpload = (onChange) => async (e) => {
//   const file = e.target.files[0];

//   if (file) {
//     const reader = new FileReader();

//     reader.onload = async (upload) => {
//       const imageData = upload.target.result;

//       // Call the onChange function with the uploaded image data
//       onChange(imageData);

//       // Send the image file to the server
//       await sendImageToServer(file);
//     };

//     reader.readAsDataURL(file);
//   }
// };

// const sendImageToServer = async (file) => {
//   const formData = new FormData();
//   formData.append("avatar", file);
//   formData.append('userID', "123");

//   try {
//     const response = await fetch("http://localhost:5001/api/v1/card_editor_image_upload", {
//       method: "POST",
//       body: formData,
//     });

//     if (response.ok) {
//       console.log("Image uploaded successfully");
//     } else {
//       console.error("Failed to upload image");
//     }
//   } catch (error) {
//     console.error("Error uploading image:", error);
//   }
// };

export type ImageProps = {
  image: File
};

export const Image: ComponentConfig<ImageProps> = {
  fields: {
    image: {
      type: "custom",
      render: ({ name, onChange, value, ...rest }) => {
        // const { selectedImage, handleImageChange } = useImageUpload();

        return (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <label htmlFor="image_upload">Image</label>
            <input
              type="file"
              id="image_upload"
              // defaultValue={value}
              // onChange={handleImageChange}
              onChange={(e) => onChange(e.target.files[0])}
              {...rest}
            />
            {value ? (
              <img src={URL.createObjectURL(value)} alt="Preview" />
            ) : (
              <img src="https://as1.ftcdn.net/v2/jpg/04/34/72/82/1000_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg" alt="Default Preview" />
            )}
          </div>
        );
      },
      // render: ({ name, onChange, value, ...rest }) => (
      //   <div style={{display:"flex", flexDirection:"column", gap:"10px"}}>
      //   <label htmlFor="image_upload">Image</label>
      //   <input
      //     type="file"
      //     id="image_upload"
      //     defaultValue={value}
      //     onChange={handleImageUpload(onChange)}
      //   />
      //   </div>
      // ),
    },
  },
  defaultProps: {
    image: null,
  },
  render: ({ image }) => {
    // if (!image) {
    //   return <div>No image selected</div>;
    // }

    return (
      <Section>
        <span>
          {image ? (
            <img src={URL.createObjectURL(image)} alt="Preview" />
          ) : (
            <img src="https://as1.ftcdn.net/v2/jpg/04/34/72/82/1000_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg" alt="Default Preview" />
          )}
        </span>
      </Section>
    );
  },
};
