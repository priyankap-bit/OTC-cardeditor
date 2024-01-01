/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ComponentConfig } from "@/core/types/Config";
import { Carousel } from "react-bootstrap";
//import "bootstrap/dist/css/bootstrap.min.css";
import { Section } from "../../components/Section";

const selectOption = [
    { label: "YouTube", value: "YouTube" },
    { label: "Vimo", value: "Vimo" },]

export type VideoGalleryProps = {
    Videos: {
        Title: string;
        LinkType: string;
        upload: string;
    }[];
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

                <iframe key={index} width={500} height={350} src={`https://www.youtube.com/embed${videoData.upload.replace('https://www.youtube.com', '')}`} />

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
                            <iframe key={index} width={500} height={350} src={`https://www.youtube.com/embed${videoData.upload.replace('https://www.youtube.com', '')}`} />
                        )}
                    </Carousel.Item>
                ))}
            </Carousel>
        );
    }
};
export const VideoGallery: ComponentConfig<VideoGalleryProps> = {

    fields: {
        Videos: {
            type: "array",
            getItemSummary: (item, i) => item.Title || `Video #${i}`,
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

    render: ({ Videos }) => {

        return (
            <Section style={{ margin: "10px" }}>
                <span style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                    {Videos == undefined ? <div style={{ height: "200px" }}>
                        <span style={{ fontSize: "20px", fontWeight: "700" }}>SINGLE VIDEO</span>
                    </div> :
                        Videos.length > 0 ?
                        Videos[0].upload == '' ? <div style={{ height: "200px" }}>
                                <span style={{ fontSize: "20px", fontWeight: "700" }}>SINGLE VIDEO</span>
                            </div> :
                                renderUploadedVideos(Videos)
                            : ""
                    }
                </span>
            </Section>
        );
    },
};
