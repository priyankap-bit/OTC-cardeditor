/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ComponentConfig } from "@/core/types/Config";
import { Carousel } from "react-bootstrap";
//import "bootstrap/dist/css/bootstrap.min.css";
import { Section } from "../../components/Section";


export type SingleVideoProps = {
    LinkType: string;
    upload: string;
};




const renderUploadedVideos = (item) => {
    const videoId = item.replace('https://www.youtube.com', '');

    // Now videoId contains "Ph9WRhlPacY&list=RDcj1jnyy3Egw&index=12"
    console.log(videoId,"//////");

    return <iframe width={500} height={350} src={`https://www.youtube.com/embed${videoId}`} />

};
const selectOption = [
    { label: "YouTub", value: "YouTub" },
    { label: "Vimo", value: "Vimo" },]
export const SingleVideo: ComponentConfig<SingleVideoProps> = {

    fields: {
        LinkType: { type: "select", options: selectOption },
        upload: { type: "text" },
    },

    render: ({ LinkType, upload }) => {

        return (
            <Section style={{ margin: "10px" }}>
                <span style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                    {upload == undefined ? <div style={{ height: "200px" }}>
                        <span style={{ fontSize: "20px", fontWeight: "700" }}>SINGLE VIDEO</span>
                    </div> :

                        upload == '' ? <div style={{ height: "200px" }}>
                            <span style={{ fontSize: "20px", fontWeight: "700" }}>SINGLE VIDEO</span>
                        </div> :
                            renderUploadedVideos(upload)

                    }
                </span>
            </Section>
        );
    },
};
