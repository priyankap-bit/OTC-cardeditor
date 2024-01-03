/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ComponentConfig } from "@/core/types/Config";
import { Carousel } from "react-bootstrap";
//import "bootstrap/dist/css/bootstrap.min.css";
import { Section } from "../../components/Section";
import ReactPlayer from "react-player/youtube";

// const selectOption = [
//     { label: "YouTube", value: "YouTube" },
//     { label: "vimeo", value: "vimeo" },]

export type VideoGalleryProps = {
    Videos: {
        Title: string;
        // LinkType: string;
        upload: string;
        image: string;
    }[];
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

const renderUploadedVideos = (item) => {
    if (item.length === 1) {
        return (
            <div style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fill, minmax(calc(100% - 10px), 1fr))" }}>
                {item.map((videoData, index) => {
                    console.log(videoData)
                    const imageUrl = videoData.image ? URL.createObjectURL(base64ToBlob(videoData.image)) : null;
                    const videoId = getYouTubeVideoId(videoData.upload);
                    const VimeovideoId = getVimeoVideoId(videoData.upload);
                    if (videoId) {
                        return (
                            <ReactPlayer
                                url={`https://www.youtube.com/embed/${videoId}`}
                                playing={true}
                                controls={true}
                                light={imageUrl}
                                width="100%"
                                height={300}
                            />
                        );
                    } else if (VimeovideoId) {
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
                    else {
                        return (
                            <img src="https://sciencecast.org/no-video-available.jpg" width="100%" height={300} style={{ borderRadius: '10px' }} alt={`Uploaded_video ${index}`} />)
                    }
                })}
            </div>
        );
    } else {
        return (
            <div style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fill, minmax(calc(100% - 10px), 1fr))" }}>
                <Carousel>
                    {item.map((videoData, index) => {
                        const imageUrl = videoData.image ? URL.createObjectURL(base64ToBlob(videoData.image)) : null;
                        const videoId = getYouTubeVideoId(videoData.upload);
                        const VimeovideoId = getVimeoVideoId(videoData.upload);
                        if (videoId) {
                            return (
                                <Carousel.Item key={index} interval={2000} style={{ width: '100%' }}>
                                    {videoId && (
                                        <ReactPlayer
                                            url={`https://www.youtube.com/embed/${videoId}`}
                                            playing={true}
                                            controls={true}
                                            light={imageUrl}
                                            width="100%"
                                            height={300}
                                        />
                                    )}
                                </Carousel.Item>
                            );
                        }
                        else if (VimeovideoId) {
                            return (
                                <Carousel.Item key={index} interval={2000} style={{ width: '100%' }}>
                                    {VimeovideoId && (
                                        <iframe
                                            title="Vimeo Video"
                                            src={`https://player.vimeo.com/video/${VimeovideoId}`}
                                            width="100%"
                                            height={300}
                                            allowFullScreen
                                        ></iframe>
                                    )}
                                </Carousel.Item>
                            );
                        }
                        else {
                            return (
                                <Carousel.Item key={index} interval={2000} style={{ width: '100%' }}>
                                    <img src="https://sciencecast.org/no-video-available.jpg" width="100%" height={300} style={{ borderRadius: '10px' }} alt={`Uploaded_video ${index}`} /> </Carousel.Item>)
                        }
                    })}
                </Carousel>
            </div>
        );
    }
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

export const VideoGallery: ComponentConfig<VideoGalleryProps> = {

    fields: {
        Videos: {
            type: "array",
            getItemSummary: (item, i) => item.Title || `Video #${i}`,
            defaultItemProps: {
                Title: "",
                // LinkType: '',
                upload: "",
                image: ""
            },
            arrayFields: {
                Title: { type: "text" },
                // LinkType: { type: "select", options: selectOption },
                upload: { type: "text" },
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
        },
    },

    render: ({ Videos }) => {
        return (
            <Section style={{ margin: "10px" }}>
                {Videos && Videos.length > 0 ?
                    renderUploadedVideos(Videos) :
                    <div style={{ height: "200px" }}>
                        <span style={{ fontSize: "20px", fontWeight: "700" }}>VIDEO GALLERY</span>
                    </div>
                }
            </Section>
        );
    },
};
