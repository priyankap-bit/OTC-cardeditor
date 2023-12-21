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

import Root, { RootProps } from "./root";

type Props = {
  ButtonGroup: ButtonGroupProps;
  Card: CardProps;
  Columns: ColumnsProps;
  Hero: HeroProps;
  Heading: HeadingProps;
  Flex: FlexProps;
  Logos: LogosProps;
  Stats: StatsProps;
  Text: TextProps;
  Image: ImageProps;
  VerticalSpace: VerticalSpaceProps;
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
      components: ["Heading", "Text", "Image"],
    },
    interactive: {
      title: "Actions",
      components: ["ButtonGroup"],
    },
  },
  components: {
    ButtonGroup,
    Card,
    Columns,
    Hero,
    Heading,
    Flex,
    Logos,
    Stats,
    Text,
    Image,
    VerticalSpace,
  },
};

const dd=[
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
      "title": false,
      "description": false,
      "buttons": true,
      "id": true,
      "height": true,
      "image": true,
      "padding": true,
      "align": true
    }
  },
  {
    "type": "VerticalSpace",
    "props": {
      "size": "96px",
      "id": "VerticalSpace-1687298109536",
      "rights": true
    },
    "readOnly": {
      "size": true,
      "id": true,
      "rights": true
    }
  },
  {
    "type": "Columns",
    "props": {
      "columns": [
        {},
        {},
        {}
      ],
      "distribution": "auto",
      "id": "Columns-2d650a8ceb081a2c04f3a2d17a7703ca6efb0d06"
    }
  },
  {
    "type": "VerticalSpace",
    "props": {
      "size": "96px",
      "id": "VerticalSpace-1687298110602"
    }
  },
  {
    "type": "VerticalSpace",
    "props": {
      "size": "40px",
      "id": "VerticalSpace-1687296179388"
    }
  },
  {
    "type": "VerticalSpace",
    "props": {
      "size": "96px",
      "id": "VerticalSpace-1687287070296"
    }
  },
  {
    "type": "VerticalSpace",
    "props": {
      "size": "8px",
      "id": "VerticalSpace-1687284122744"
    }
  },
  {
    "type": "Text",
    "props": {
      "align": "center",
      "text": "Configure Puck with your own components to make change for your marketing pages without a developer.",
      "padding": "0px",
      "size": "m",
      "id": "Text-1687297621556",
      "color": "muted",
      "rights": true
    },
    "readOnly": {
      "align": true,
      "text": true,
      "padding": true,
      "size": true,
      "id": true,
      "color": true,
      "rights": true
    }
  },
  {
    "type": "Heading",
    "props": {
      "align": "center",
      "level": 2,
      "text": "The numbers",
      "padding": "0px",
      "size": "xxl",
      "rights": true,
      "id": "Heading-1687296574110"
    }
  },
  {
    "type": "Text",
    "props": {
      "align": "center",
      "text": "This page demonstrates Puck configured with a custom component library. This component is called \"Stats\", and contains some made-up numbers. You can configure any page by adding \"/edit\" onto the URL.",
      "padding": "0px",
      "size": "m",
      "id": "Text-1687284565722",
      "color": "muted",
      "maxWidth": "916px"
    }
  },
  {
    "type": "VerticalSpace",
    "props": {
      "size": "16px",
      "id": "VerticalSpace-1687284283005"
    }
  },
  {
    "type": "VerticalSpace",
    "props": {
      "size": "96px",
      "id": "VerticalSpace-1687297618253"
    }
  },
  {
    "type": "Stats",
    "props": {
      "items": [
        {
          "title": "Users reached",
          "description": "20M+",
          "icon": "Feather"
        },
        {
          "title": "Cost savings",
          "description": "$1.5M",
          "icon": "Feather"
        },
        {
          "title": "Another stat",
          "description": "5M kg",
          "icon": "Feather"
        },
        {
          "title": "Final fake stat",
          "description": "15K",
          "icon": "Feather"
        }
      ],
      "mode": "flat",
      "id": "Stats-1687297239724"
    }
  },
  {
    "type": "VerticalSpace",
    "props": {
      "size": "120px",
      "id": "VerticalSpace-1687297589663"
    }
  },
  {
    "type": "Heading",
    "props": {
      "align": "center",
      "level": 2,
      "text": "Extending Puck",
      "padding": "0px",
      "size": "xxl",
      "id": "Heading-1687296184321"
    }
  },
  {
    "type": "VerticalSpace",
    "props": {
      "size": "8px",
      "id": "VerticalSpace-1687296602860"
    }
  },
  {
    "type": "Text",
    "props": {
      "align": "center",
      "text": "Puck can also be extended with plugins and headless CMS content fields, transforming Puck into the perfect tool for your Content Ops.",
      "padding": "0px",
      "size": "m",
      "id": "Text-1687296579834",
      "color": "muted",
      "maxWidth": "916px"
    }
  },
  {
    "type": "VerticalSpace",
    "props": {
      "size": "96px",
      "id": "VerticalSpace-1687299311382"
    }
  },
  {
    "type": "Columns",
    "props": {
      "columns": [
        {
          "span": 4
        },
        {
          "span": 4
        },
        {
          "span": 4
        },
        {
          "span": 4
        },
        {
          "span": 4
        },
        {
          "span": 4
        }
      ],
      "id": "Columns-3c2ca5b045ee26535fcdf0eddf409a6308764634",
      "distribution": "manual"
    }
  },
  {
    "type": "VerticalSpace",
    "props": {
      "size": "96px",
      "id": "VerticalSpace-1687299315421"
    }
  },
  {
    "type": "Heading",
    "props": {
      "align": "center",
      "level": 2,
      "text": "Get started",
      "padding": "0px",
      "size": "xxl",
      "id": "Heading-1687299303766"
    }
  },
  {
    "type": "VerticalSpace",
    "props": {
      "size": "16px",
      "id": "VerticalSpace-1687299318902"
    }
  },
  {
    "type": "Text",
    "props": {
      "align": "center",
      "text": "Browse the Puck GitHub to get started, or try editing this page",
      "padding": "0px",
      "size": "m",
      "id": "Text-1687299305686",
      "color": "muted"
    }
  },
  {
    "type": "VerticalSpace",
    "props": {
      "size": "24px",
      "id": "VerticalSpace-1687299335149"
    }
  },
  {
    "type": "ButtonGroup",
    "props": {
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
      "id": "ButtonGroup-1687299235545",
      "align": "center"
    }
  },
  {
    "type": "VerticalSpace",
    "props": {
      "size": "96px",
      "id": "VerticalSpace-1687284290127"
    }
  },
  {
    "type": "Heading",
    "props": {
      "align": "center",
      "level": "2",
      "text": "Drag-and-drop your own React components",
      "padding": "20px",
      "size": "xxl",
      "id": "Heading-1687297593514",
      "rights": false
    }
  }
]
export const initialData: Record<string, Data> = {
  "/": {
    "content": [
      {
        "type": "Card",
        "props": {
            "Name": "Jhon Doe",
            "Company": "Doe Enterprise",
            "Designation": "CEO | Financial Advisor",
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
      {
          "type": "VerticalSpace",
          "props": {
              "size": "96px",
              "id": "VerticalSpace-1687298109536",
              "rights": true
          },
          "readOnly": {
              "size": true,
              "id": true,
              "rights": true
          }
      },
      {
          "type": "Columns",
          "props": {
              "columns": [
                  {},
                  {},
                  {}
              ],
              "distribution": "auto",
              "id": "Columns-2d650a8ceb081a2c04f3a2d17a7703ca6efb0d06"
          }
      },
      {
          "type": "VerticalSpace",
          "props": {
              "size": "96px",
              "id": "VerticalSpace-1687298110602"
          }
      },
      {
          "type": "VerticalSpace",
          "props": {
              "size": "40px",
              "id": "VerticalSpace-1687296179388"
          }
      },
      {
          "type": "VerticalSpace",
          "props": {
              "size": "96px",
              "id": "VerticalSpace-1687287070296"
          }
      },
      {
          "type": "VerticalSpace",
          "props": {
              "size": "8px",
              "id": "VerticalSpace-1687284122744"
          }
      },
      {
          "type": "Text",
          "props": {
              "align": "center",
              "text": "Configure Puck with your own components to make change for your marketing pages without a developer.",
              "padding": "0px",
              "size": "m",
              "id": "Text-1687297621556",
              "color": "muted",
              "rights": true
          },
          "readOnly": {
              "align": true,
              "text": true,
              "padding": true,
              "size": true,
              "id": true,
              "color": true,
              "rights": true
          }
      },
      {
          "type": "Heading",
          "props": {
              "align": "center",
              "level": 2,
              "text": "The numbers",
              "padding": "0px",
              "size": "xxl",
              "rights": true,
              "id": "Heading-1687296574110"
          },
          "readOnly": {
              "align": true,
              "level": true,
              "text": true,
              "padding": true,
              "size": true,
              "rights": true,
              "id": true
          }
      },
      {
          "type": "Text",
          "props": {
              "align": "center",
              "text": "This page demonstrates Puck configured with a custom component library. This component is called \"Stats\", and contains some made-up numbers. You can configure any page by adding \"/edit\" onto the URL.",
              "padding": "0px",
              "size": "m",
              "id": "Text-1687284565722",
              "color": "muted",
              "maxWidth": "916px"
          }
      },
      {
          "type": "VerticalSpace",
          "props": {
              "size": "16px",
              "id": "VerticalSpace-1687284283005"
          }
      },
      {
          "type": "VerticalSpace",
          "props": {
              "size": "96px",
              "id": "VerticalSpace-1687297618253"
          }
      },
      {
          "type": "Stats",
          "props": {
              "items": [
                  {
                      "title": "Users reached",
                      "description": "20M+",
                      "icon": "Feather"
                  },
                  {
                      "title": "Cost savings",
                      "description": "$1.5M",
                      "icon": "Feather"
                  },
                  {
                      "title": "Another stat",
                      "description": "5M kg",
                      "icon": "Feather"
                  },
                  {
                      "title": "Final fake stat",
                      "description": "15K",
                      "icon": "Feather"
                  }
              ],
              "mode": "flat",
              "id": "Stats-1687297239724"
          }
      },
      {
          "type": "VerticalSpace",
          "props": {
              "size": "120px",
              "id": "VerticalSpace-1687297589663"
          }
      },
      {
          "type": "Heading",
          "props": {
              "align": "center",
              "level": 2,
              "text": "Extending Puck",
              "padding": "0px",
              "size": "xxl",
              "id": "Heading-1687296184321"
          }
      },
      {
          "type": "VerticalSpace",
          "props": {
              "size": "8px",
              "id": "VerticalSpace-1687296602860"
          }
      },
      {
          "type": "Text",
          "props": {
              "align": "center",
              "text": "Puck can also be extended with plugins and headless CMS content fields, transforming Puck into the perfect tool for your Content Ops.",
              "padding": "0px",
              "size": "m",
              "id": "Text-1687296579834",
              "color": "muted",
              "maxWidth": "916px"
          }
      },
      {
          "type": "VerticalSpace",
          "props": {
              "size": "96px",
              "id": "VerticalSpace-1687299311382"
          }
      },
      {
          "type": "Columns",
          "props": {
              "columns": [
                  {
                      "span": 4
                  },
                  {
                      "span": 4
                  },
                  {
                      "span": 4
                  },
                  {
                      "span": 4
                  },
                  {
                      "span": 4
                  },
                  {
                      "span": 4
                  }
              ],
              "id": "Columns-3c2ca5b045ee26535fcdf0eddf409a6308764634",
              "distribution": "manual"
          }
      },
      {
          "type": "VerticalSpace",
          "props": {
              "size": "96px",
              "id": "VerticalSpace-1687299315421"
          }
      },
      {
          "type": "Heading",
          "props": {
              "align": "center",
              "level": 2,
              "text": "Get started",
              "padding": "0px",
              "size": "xxl",
              "id": "Heading-1687299303766"
          }
      },
      {
          "type": "VerticalSpace",
          "props": {
              "size": "16px",
              "id": "VerticalSpace-1687299318902"
          }
      },
      {
          "type": "Text",
          "props": {
              "align": "center",
              "text": "Browse the Puck GitHub to get started, or try editing this page",
              "padding": "0px",
              "size": "m",
              "id": "Text-1687299305686",
              "color": "muted"
          }
      },
      {
          "type": "VerticalSpace",
          "props": {
              "size": "24px",
              "id": "VerticalSpace-1687299335149"
          }
      },
      {
          "type": "ButtonGroup",
          "props": {
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
              "id": "ButtonGroup-1687299235545",
              "align": "center"
          }
      },
      {
          "type": "VerticalSpace",
          "props": {
              "size": "96px",
              "id": "VerticalSpace-1687284290127"
          }
      },
      {
          "type": "Heading",
          "props": {
              "align": "center",
              "level": "2",
              "text": "Drag-and-drop your own React components",
              "padding": "20px",
              "size": "xxl",
              "id": "Heading-1687297593514",
              "rights": false
          }
      }
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
