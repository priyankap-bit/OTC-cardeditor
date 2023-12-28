import { Config, Data } from "@/core/types/Config";
import { ButtonGroup, ButtonGroupProps } from "./blocks/ButtonGroup";
import { Card, CardProps } from "./blocks/Card";
import { Columns, ColumnsProps } from "./blocks/Columns";
import { Hero, HeroProps } from "./blocks/Hero";
import { Heading, HeadingProps } from "./blocks/Heading";
import { Flex, FlexProps } from "./blocks/Flex";
import { Logos, LogosProps } from "./blocks/Logos";
import { Stats, StatsProps } from "./blocks/Stats";
import { Text, TextProps } from "./blocks/Text";
import { Image, ImageProps } from "./blocks/Image";
import { VerticalSpace, VerticalSpaceProps } from "./blocks/VerticalSpace";
import { Testimonial, TestimonialProps} from "./blocks/Testimonial"

import Root, { RootProps } from "./root";
import { ImageGallery, ImageGalleryProps } from "./blocks/ImageGallery";
import {SingleVideo,SingleVideoProps} from "./blocks/SingleVideo"
import {VideoGallery,VideoGalleryProps} from "./blocks/VideoGallery"
type Props = {
  ButtonGroup: ButtonGroupProps;
  Card: CardProps;
  ImageGallery:ImageGalleryProps;
  Columns: ColumnsProps;
  Hero: HeroProps;
  Heading: HeadingProps;
  Flex: FlexProps;
  Logos: LogosProps;
  Stats: StatsProps;
  Text: TextProps;
  Image: ImageProps;
  VerticalSpace: VerticalSpaceProps;
  SingleVideo:SingleVideoProps;
  VideoGallery:VideoGalleryProps;
  Testimonial: TestimonialProps;
};

// We avoid the name config as next gets confused
export const conf: Config<
  Props,
  RootProps,
  "free" | "premium"
> = {
  root: {
    render: Root,
  },
  categories: {
    free: {
      visible: false,
      components: ["Columns", "VerticalSpace", "Heading", "Text"],
    },
   
    premium: {
      components: ["Card", "ButtonGroup", "Hero", "Flex", "Logos", "Stats", "VideoGallery", "SingleVideo", "VerticalSpace", "Image", "ImageGallery", "Testimonial"],
    },
  },
  components: {
    ButtonGroup,
    Card,
    ImageGallery,
    Columns,
    Hero,
    Heading,
    Flex,
    Logos,
    Stats,
    Text,
    Image,
    VerticalSpace,
    SingleVideo,
    VideoGallery,
    Testimonial,
  },
};


export const initialData: Record<string, Data> = {
  "/": {
    "content": [
      {
        "type": "Card",
        "props": {
            "title": "Title",
            "description": "Description",
            "icon": "Feather",
            "mode": "flat",
            "id": "Card-1b0e8edb5672dc988de78063815be8db5bae8360"
        }
      },
      {
          "type": "Hero",
          "props": {
              "rights": true,
              "title": "Thisasdasdasdasdasd page waasdasdasds built with Puck",
              "description": "Puck is the self-hosted visual editor for React. Bring your own components and make site changes instantly, without a deploy.",
              "buttons": [
                  {
                      "label": "Visit GitHub",
                      "href": "https://github.com/measuredco/puck"
                  },
                  {
                      "label": "Edit this page",
                      "href": "/edit",
                      "variant": "secondary"
                  }
              ],
              "id": "Hero-1687283596554",
              "height": "",
              "image": {
                  "url": "https://images.unsplash.com/photo-1687204209659-3bded6aecd79?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
                  "mode": "inline"
              },
              "padding": "128px",
              "align": "left"
          },
          "readOnly": {
              "rights": true,
              "title": true,
              "description": true,
              "buttons": true,
              "id": true,
              "height": true,
              "image": true,
              "padding": true,
              "align": true
          }
      },
      
  ],
    "root": {
      "props": {
        "title": "Name"
      }
    },
    "zones": {
      "Columns-2d650a8ceb081a2c04f3a2d17a7703ca6efb0d06:column-0": [
        {
          "type": "Text",
          "props": {
            "align": "left",
            "text": "Texthfhgfghf",
            "padding": "24px",
            "size": "m",
            "color": "default",
            "Font": "serif",
            "id": "Text-3b03e805faaa1912e422f712c3c0019c7f6624ce"
          }
        }
      ],
      "Columns-2d650a8ceb081a2c04f3a2d17a7703ca6efb0d06:column-1": [],
      "Columns-2d650a8ceb081a2c04f3a2d17a7703ca6efb0d06:column-2": [],
      "Columns-3c2ca5b045ee26535fcdf0eddf409a6308764634:column-0": [],
      "Columns-3c2ca5b045ee26535fcdf0eddf409a6308764634:column-1": [],
      "Columns-3c2ca5b045ee26535fcdf0eddf409a6308764634:column-2": [],
      "Columns-3c2ca5b045ee26535fcdf0eddf409a6308764634:column-3": [],
      "Columns-3c2ca5b045ee26535fcdf0eddf409a6308764634:column-4": [],
      "Columns-3c2ca5b045ee26535fcdf0eddf409a6308764634:column-5": []
    }
  },
  
};

export default conf;
