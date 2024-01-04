/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ComponentConfig } from "@/core/types/Config";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Section } from "../../components/Section";
import ReactPlayer from "react-player/youtube";

export type SingleVideoProps = {
    // LinkType: string;
    Upload: string;
    image: string;
};


type ImageStyles = {
    width: string;
    WebkitWidth: string;
};

function getYouTubeVideoId(url) {
    // Regular expression to match YouTube video ID
    const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);

    // If the URL matches, return the video ID, otherwise return null
    return match ? match[1] : null;
}
function getVimeoVideoId(url) {
    // Regular expression to match YouTube video ID
    const regex = /(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|video\/|)(\d+)(?:|\/\?)/;
    const match = url.match(regex);

    // If the URL matches, return the video ID, otherwise return null
    return match ? match[2] : null;
}


const renderUploadedVideos = (videoLink, thumbnail) => {
    const videoId = getYouTubeVideoId(videoLink);
    const VimeovideoId = getVimeoVideoId(videoLink);
    if (videoId) {
        return (
            <ReactPlayer
                url={`https://www.youtube.com/embed/${videoId}`}
                playing={true}
                controls={true}
                light={thumbnail}
                width="100%"
                height={300}
            />
        );
    }
    if (VimeovideoId) {
        return (
            <iframe
                title="Vimeo Video"
                src={`https://player.vimeo.com/video/${VimeovideoId}`}
                width="100%"
                height={300}
                allowFullScreen
            ></iframe>
        );
    }

    return null;
};
// const selectOption = [
//     { label: "YouTube", value: "YouTube" },
//     { label: "vimeo ", value: "vimeo " },]

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
export const SingleVideo: ComponentConfig<SingleVideoProps> = {

    fields: {
        // LinkType: { type: "select", options: selectOption },
        Upload: { type: "text", label: "Video link: (youtube/vimeo)" },
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

    render: ({ Upload, image }) => {
        const imageUrl = image ? URL.createObjectURL(base64ToBlob(image)) : null;

        return (
            <Section style={{ margin: "10px" }}>
                {/* <span style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                    {Upload == undefined ? <div style={{ height: "200px" }}>
                        <span style={{ fontSize: "20px", fontWeight: "700" }}>SINGLE VIDEO</span>
                    </div> :

                        Upload == '' ? <div style={{ height: "200px" }}>
                            <span style={{ fontSize: "20px", fontWeight: "700" }}>SINGLE VIDEO</span>
                        </div> :
                            renderUploadedVideos(Upload, imageUrl)

                    }
                </span> */}
                <div>
                    {Upload ? (
                        renderUploadedVideos(Upload, imageUrl)
                    ) : (
                        <img src="https://sciencecast.org/no-video-available.jpg" alt="Default Preview" style={{ width: '100%', WebkitWidth: '-webkit-fill-available' } as ImageStyles} />
                    )}
                </div>
            </Section>
        );
    },
};
