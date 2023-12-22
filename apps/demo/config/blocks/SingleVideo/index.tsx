/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ComponentConfig } from "@/core/types/Config";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Section } from "../../components/Section";


export type SingleVideoProps = {
    LinkType: string;
    upload: string;
};




const renderUploadedVideos = (item) => {
    console.log(item);
    
    return <video width={550} height={300} style={{ borderRadius: '10px' }} controls>
        <source src={`data:video/mp4;base64,${item}`} type="video/mp4" />
        Your browser does not support the video tag.
    </video>
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
