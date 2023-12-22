/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ComponentConfig } from "@/core/types/Config";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Section } from "../../components/Section";

const selectOption = [
    { label: "YouTub", value: "YouTub" },
    { label: "Vimo", value: "Vimo" },]

export type VideoGalleryProps = {
    carouselVideo: {
        Title: string;
        LinkType: string;
        upload: string;
    }[];
};

let base64Video: any;

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

const renderUploadedVideos = (item) => {


    if (item.length === 1) {
        return item.map((videoData, index) => (
            videoData.upload === '' ? (
                <video key={index} width={550} height={300} style={{ borderRadius: '10px' }} controls>
                    <source src="https://www.example.com/default-video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            ) : (
                
                <video key={index} width={550} height={300} style={{ borderRadius: '10px' }} controls>
                    <source src={`data:video/mp4;base64,${videoData.upload}`} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )
        ));
    } else {

        return (
            <Carousel>
                {item.map((videoData, index) => (
                    <Carousel.Item key={index} interval={4000}>
                        {videoData.upload === '' ? (
                            <video width={550} height={300} style={{ borderRadius: '10px' }} controls>
                                <source src="https://www.youtube.com/watch?v=FDzYegv8JHE&list=RDcj1jnyy3Egw&index=5" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <video width={550} height={300} style={{ borderRadius: '10px' }} controls>
                                <source src={`data:video/mp4;base64,${videoData.upload}`} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        )}
                    </Carousel.Item>
                ))}
            </Carousel>
        );
    }
};
export const VideoGallery: ComponentConfig<VideoGalleryProps> = {

    fields: {
        carouselVideo: {
            type: "array",
            getItemSummary: (item, i) => item.Title || `Feature #${i}`,
            defaultItemProps: {
                Title: "",
                LinkType: '',
                upload: "",
            },
            arrayFields: {
                Title: { type: "text" },
                LinkType: { type: "select", options: selectOption },
                upload: { type: "text" },
            },
        },



    },

    render: ({ carouselVideo }) => {

        return (
            <Section style={{margin:"10px"}}>
                <span style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                    {carouselVideo == undefined ? <div style={{ height: "200px" }}>
                        <span style={{ fontSize: "20px", fontWeight: "700" }}>SINGLE VIDEO</span>
                    </div> :
                        carouselVideo.length > 0 ?
                            carouselVideo[0].upload == '' ? <div style={{ height: "200px" }}>
                                <span style={{ fontSize: "20px", fontWeight: "700" }}>SINGLE VIDEO</span>
                            </div> :
                                renderUploadedVideos(carouselVideo)
                            : ""
                    }
                </span>
            </Section>
        );
    },
};
