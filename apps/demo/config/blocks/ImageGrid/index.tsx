/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ComponentConfig } from "@/core/types/Config";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Section } from "../../components/Section";


export type ImageGridProps = {
    Images?: {
        alt: string;
        url: string;
        upload: string;
    }[];
    column: number;
};

let base64Image: any;

//This is use to provide uploaded file link.
const base64ToBlob = (base64String) => {
    const decodedImage = atob(base64String);
    const arrayBuffer = new ArrayBuffer(decodedImage.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < decodedImage.length; i++) {
        uint8Array[i] = decodedImage.charCodeAt(i);
    }

    return new Blob([uint8Array], { type: 'image/png' });
};

const calculateAdjustedWidth = (column, gap) => {
    const baseColumnWidth = 100 / column;
    return `minmax(calc(${baseColumnWidth}% - ${gap}px), 1fr)`;
};

const renderGridImages = (item, column) => {
    const gap = 10;
    const adjustedColumnWidth = calculateAdjustedWidth(column, gap);

    return (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fill, ${adjustedColumnWidth})`, gap: `${gap}px` }}>
            {item.map((base64Image, index) => (<>
                <div key={index} style={{ width: '100%' }}>
                    {base64Image.upload == '' ?
                        <a href={base64Image.url} target="_blank"><img src="https://as1.ftcdn.net/v2/jpg/04/34/72/82/1000_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg" width="100%" height={120} style={{ borderRadius: '10px' }} alt={`Uploaded ${index}`} /></a>
                        :
                        <a href={base64Image.url} target="_blank"><img src={URL.createObjectURL(base64ToBlob(base64Image.upload))} width="100%" height={120} style={{ borderRadius: '10px' }} alt={`Uploaded ${index}`} /></a>
                    }
                </div>
            </>))}
        </div>
    );
};

export const ImageGrid: ComponentConfig<ImageGridProps> = {

    fields: {
        Images: {
            type: "array",
            getItemSummary: (item, i) => item.alt || `Image ${i}`,
            defaultItemProps: {
                alt: "",
                url: "#",
                upload: "",
            },
            arrayFields: {
                alt: { type: "text" },
                url: { type: "text" },
                upload: {
                    type: "custom",
                    label: "Label Example",
                    render: ({ name, onChange, value }) => {
                        //get uploaded files.
                        const handleImageChange = (e) => {
                            console.log(e.target.files);

                            const files = e.target.files;
                            const imagesArray = [];

                            const processImage = (index) => {
                                if (index < files.length) {
                                    const file = files[index];
                                    const reader = new FileReader();

                                    reader.onload = () => {
                                        const base64Image = (reader.result as string).split(/,/)[1];
                                        imagesArray.push(base64Image);
                                        processImage(index + 1);
                                    };

                                    reader.readAsDataURL(file);
                                } else {
                                    // All images processed, update the state or call onChange
                                    onChange(imagesArray);
                                }
                            };

                            processImage(0);
                        };

                        return (
                            <label
                                style={{
                                    width: "100%",
                                    textAlign: "center",
                                    display: 'inline-block',
                                    padding: '10px 15px',
                                    fontSize: '16px',
                                    cursor: 'pointer',
                                    backgroundColor: '#3498db',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '5px',
                                }}
                            >
                                Upload File
                                <input
                                    name={name}
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }} // Hide the default file input
                                    onChange={handleImageChange}
                                />
                            </label>
                        )
                    },
                },
            },
        },
        column: { type: "number" }
    },
    defaultProps: {
        column: 2,
    },
    render: ({ Images, column }) => {
        return (
            <Section style={{ margin: "10px" }}>
                {Images && Images.length > 0 ?
                    renderGridImages(Images, column) :
                    <div style={{ height: "200px" }}>
                        <span style={{ fontSize: "20px", fontWeight: "700" }}>IMAGE GRID GALLERY</span>
                    </div>
                }
            </Section>
        );
    },
};
