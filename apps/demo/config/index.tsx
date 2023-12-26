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
  "layout" | "typography" | "interactive"
> = {
  root: {
    render: Root,
  },
  categories: {
    layout: {
      components: ["Columns", "Flex", "VerticalSpace"],
    },
    typography: {
      components: ["Heading", "Text","Image","ImageGallery","SingleVideo","VideoGallery"],
    },
    interactive: {
      title: "Actions",
      components: ["ButtonGroup"],
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

  
};

export default conf;
