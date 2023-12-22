/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ComponentConfig } from "@/core/types/Config";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Section } from "../../components/Section";


export type ImageGalleryProps = {
    carouselImage: {
        alt: string;
        upload: string;
    }[];
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

//This is use for show uploaded file carousel.
const renderUploadedImages = (item) => {
    if (item.length == 1) {
        console.log(item, "...");

        return item.map((base64Image, index) => (
            base64Image.upload == '' ?
                <img key={index} src="https://as1.ftcdn.net/v2/jpg/04/34/72/82/1000_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg" width={550} height={300} style={{ borderRadius: '10px' }} alt={`Uploaded ${index}`} />
                :
                <img key={index} src={URL.createObjectURL(base64ToBlob(base64Image.upload))} width={550} height={300} style={{ borderRadius: '10px' }} alt={`Uploaded ${index}`} />

        ))

    } else {
        return <Carousel >
            {item.map((base64Image, index) => (
                <Carousel.Item key={index} interval={4000}>
                    {base64Image.upload == '' ?
                        <img key={index} src="https://as1.ftcdn.net/v2/jpg/04/34/72/82/1000_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg" width={550} height={300} style={{ borderRadius: '10px' }} alt={`Uploaded ${index}`} />
                        :
                        <img key={index} src={URL.createObjectURL(base64ToBlob(base64Image.upload))} width={550} height={300} style={{ borderRadius: '10px' }} alt={`Uploaded ${index}`} />
                    }
                </Carousel.Item>
            ))}
        </Carousel>
    }
};

export const ImageGallery: ComponentConfig<ImageGalleryProps> = {

    fields: {
        carouselImage: {
            type: "array",
            getItemSummary: (item, i) => item.alt || `Feature #${i}`,
            defaultItemProps: {
                alt: "",
                upload: "",
            },
            arrayFields: {
                alt: { type: "text" },
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
                                    multiple
                                    style={{ display: 'none' }} // Hide the default file input
                                    onChange={handleImageChange}
                                />
                            </label>
                        )
                    },
                },
            },
        },
    },


    render: ({ carouselImage }) => {
        console.log(carouselImage, "carouselImage");

        return (
            <Section style={{margin:"10px"}}>
                <span style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                    {carouselImage != undefined ?

                        carouselImage.length > 0 ?
                            carouselImage[0].upload == '' ? <div style={{ height: "200px" }}>
                                <span style={{ fontSize: "20px", fontWeight: "700" }}>IMAGE GALLERY</span>
                            </div> :
                                renderUploadedImages(carouselImage)
                            : "" : <div style={{ height: "200px" }}>
                            <span style={{ fontSize: "20px", fontWeight: "700" }}>IMAGE GALLERY</span>
                        </div>
                    }
                </span>
            </Section>
        );
    },
};
