/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { ComponentConfig } from "@/core/types/Config";
import styles from "./styles.module.css";
import { getClassNameFactory } from "@/core/lib";
import * as reactFeather from "react-feather";
import { useSelector } from "react-redux";
import useGlobalFontSize from "./useGlobalFontSize";
import { Carousel } from "react-bootstrap";
//import "bootstrap/dist/css/bootstrap.min.css";

const EMAIL_ID = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
const getClassName = getClassNameFactory("Card", styles);
type RootState = {
  app: {
    fontSize: number;
    fontColor: string;
    bgColor: string;
    fontfamily: string;
  };
};

const Gloabalfontsize = (): { fontSize: number; fontColor: string; bgColor: string; fontfamily: string; } => {
  const { fontSize, fontColor, bgColor, fontfamily } = useSelector((state: RootState) => state.app);
  return { fontSize, fontColor, bgColor, fontfamily };
};

export type CardProps = {
  Name: string;
  Company: string;
  Designations: {
    alt: string;
  }[];

};

export const Card: ComponentConfig<CardProps> = {

  fields: {

    Name: { type: "text" },
    Company: { type: "text" },

    Designations: {
      type: "array",
      getItemSummary: (item, i) => item.alt || `Feature #${i}`,
      defaultItemProps: {
        alt: "",
      },
      arrayFields: {
        alt: { type: "text" },
      },
    },
  },
  defaultProps: {
    Name:"Name",
    Company:"Company",
    Designations: [
      {
        alt: "",
      },
    ],

  },
  render: ({ Name, Company, Designations }) => {
    const sizevalue = Gloabalfontsize();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const userEmail = EMAIL_ID;
          const response = await fetch("http://localhost:5001/api/v1/admin/getaUser/"+userEmail);
          const data = await response.json();
          setUserData(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, []);

    if(userData){
      if(userData && userData.designation){
        var transformedDesignations = userData.designation.map((designation) => ({
          alt: designation
        }));
      }

    Card.defaultProps = {
      Name: userData && userData.first_name 
            ? userData.first_name + " " + userData.last_name
            : "Name",
      Company: userData && userData.companyID && userData.companyID.company_name
            ? userData.companyID.company_name : "Company Name",
      Designations: transformedDesignations,
 
    };
  }
  if(userData){
    return (
      <>
        <div style={{ backgroundColor: sizevalue.bgColor }} className={getClassName("onetap_conn_card_container")}>
          <div className={getClassName("onetap_conn_personal_card")}>
            <div className={getClassName("onetap_conn_card_image_container")}>
              <img
                src={'https://cw-cbs.rs/wp-content/uploads/2023/02/CikagoSjedinjeneAmerickeDrzave.jpg'}
                alt="cover_photo"
                className={getClassName("onetap_conn_card_image")}
              />

              <div className={getClassName("onetap_conn_user_image_container_form")}>
                  <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="100%" height="60%" style={{margin:"10px 0px"}} fill="white"><path d="M 30.398438 2 L 7 2 L 7 48 L 43 48 L 43 14.601563 Z M 15 28 L 31 28 L 31 30 L 15 30 Z M 35 36 L 15 36 L 15 34 L 35 34 Z M 35 24 L 15 24 L 15 22 L 35 22 Z M 30 15 L 30 4.398438 L 40.601563 15 Z"/></svg>
              </div>
                <div className={getClassName("onetap_conn_user_image_container")}>
                    <img
                      src={userData && userData.avatar ? `https://localhost:5001/api/v1/profile/img/`+userData.avatar : 'http://proseps.campusfc.unibo.it/wp-content/uploads/2017/01/profil-pic_dummy-300x300.png'}
                      alt="user_photo"
                      className={getClassName("onetap_conn_user_image")}
                    />
                </div>
              <div className={getClassName("onetap_conn_user_image_container_google")}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="60%" style={{margin:"10px 0px"}} fill="white" viewBox="0 0 24 24" id="google"><g data-name="Layer 2"><g data-name="google"><polyline points="0 0 24 0 24 24 0 24" opacity="0"></polyline><path d="M17.5 14a5.51 5.51 0 0 1-4.5 3.93 6.15 6.15 0 0 1-7-5.45A6 6 0 0 1 12 6a6.12 6.12 0 0 1 2.27.44.5.5 0 0 0 .64-.21l1.44-2.65a.52.52 0 0 0-.23-.7A10 10 0 0 0 2 12.29 10.12 10.12 0 0 0 11.57 22 10 10 0 0 0 22 12.52v-2a.51.51 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h5"></path></g></g></svg>
              </div>
            </div>
            <div className={getClassName("onetap_conn_personal_card_info")}>
              <div style={{ fontSize: `${sizevalue.fontSize}px`, color: sizevalue.fontColor, fontFamily: sizevalue.fontfamily }} className={getClassName("onetap_conn_personal_card_info_name")}>
              {Name}
              </div>
              <div style={{ fontSize: `${sizevalue.fontSize}px`, color: sizevalue.fontColor, fontFamily: sizevalue.fontfamily }} className={getClassName("onetap_conn_personal_card_info_subname")}>
              {Company}
              </div>
              <div style={{ fontSize: `${sizevalue.fontSize}px`, color: sizevalue.fontColor, fontFamily: sizevalue.fontfamily }} className={getClassName("onetap_conn_personal_card_2")}>
              {/* {Designation} */}

              {Designations && Designations.map((item, i) => (
                    <span key={i} className={getClassName("item")}>
                      {item.alt}
                      {i < Designations.length - 1 && " | "}
                    </span>
                  ))}


              </div>
            </div>


            <div className={getClassName()}>
              <div className={getClassName("items")}>
                
              </div>
            </div>


            <div className={getClassName("profile-card-social")}>
              <a href="https://www.facebook.com/iaMuhammedErdem" className={getClassName("profile-card-social__item")} target="_blank">
                <span className={getClassName("icon-font_w")}>
                  <svg width="60px" height="60px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" rx="12" fill="#214FC3"/>
                  <g clip-path="url(#clip0_8_370)">
                  <path d="M17.8327 9.39545V14.9167C17.8327 15.3631 17.6622 15.7926 17.3559 16.1173C17.0497 16.4421 16.631 16.6376 16.1853 16.6638L16.0827 16.6667H7.91602C7.46964 16.6667 7.04013 16.4962 6.71536 16.1899C6.39059 15.8837 6.19512 15.465 6.16893 15.0194L6.16602 14.9167V9.39545L11.6756 13.0687L11.7433 13.1072C11.823 13.1462 11.9106 13.1664 11.9993 13.1664C12.0881 13.1664 12.1757 13.1462 12.2554 13.1072L12.3231 13.0687L17.8327 9.39545Z" fill="white"/>
                  <path d="M16.0829 7.33331C16.7129 7.33331 17.2653 7.66581 17.5733 8.16573L11.9995 11.8816L6.42578 8.16573C6.57204 7.92818 6.77299 7.72905 7.01186 7.58495C7.25073 7.44086 7.5206 7.35598 7.79895 7.3374L7.9162 7.33331H16.0829Z" fill="white"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_8_370">
                  <rect x="5" y="5" width="14" height="14" rx="7" fill="white"/>
                  </clipPath>
                  </defs>
                  </svg>
                </span>
              </a>

              <a href="https://twitter.com/iaMuhammedErdem" className={getClassName("profile-card-social__item")} target="_blank">
                <span className={getClassName("icon-font_w")}>
                  <svg width="60px" height="60px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" rx="12" fill="#214FC3"/>
                  <g clip-path="url(#clip0_8_371)">
                  <path d="M15.6907 18.125C15.1569 18.125 14.4072 17.9319 13.2844 17.3047C11.9192 16.5391 10.8631 15.8322 9.50524 14.4779C8.19603 13.1695 7.55892 12.3224 6.66724 10.6998C5.65989 8.86776 5.83161 7.90745 6.02356 7.49702C6.25216 7.00647 6.58958 6.71308 7.02571 6.42187C7.27343 6.25956 7.53558 6.12043 7.80884 6.00624C7.83618 5.99448 7.86161 5.98327 7.88431 5.97315C8.01966 5.91218 8.22474 5.82003 8.4845 5.91847C8.65786 5.98355 8.81263 6.11671 9.05489 6.35597C9.55173 6.84597 10.2307 7.93726 10.4811 8.47319C10.6493 8.8344 10.7606 9.07284 10.7609 9.34026C10.7609 9.65335 10.6034 9.89479 10.4122 10.1554C10.3764 10.2043 10.3409 10.2511 10.3064 10.2965C10.0983 10.5699 10.0527 10.6489 10.0827 10.79C10.1437 11.0736 10.5984 11.9177 11.3458 12.6634C12.0931 13.409 12.9128 13.835 13.1975 13.8957C13.3446 13.9272 13.4252 13.8796 13.7074 13.6641C13.7479 13.6332 13.7895 13.6012 13.8329 13.5692C14.1244 13.3524 14.3547 13.199 14.6604 13.199H14.662C14.9281 13.199 15.1558 13.3144 15.5332 13.5047C16.0254 13.753 17.1495 14.4232 17.6425 14.9206C17.8823 15.1623 18.016 15.3165 18.0813 15.4896C18.1798 15.7502 18.0871 15.9544 18.0267 16.0912C18.0165 16.1139 18.0053 16.1387 17.9936 16.1664C17.8785 16.4391 17.7385 16.7007 17.5755 16.9478C17.2848 17.3826 16.9903 17.7192 16.4987 17.9481C16.2462 18.0675 15.9699 18.128 15.6907 18.125Z" fill="white"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_8_371">
                  <rect width="14" height="14" fill="white" transform="translate(5 5)"/>
                  </clipPath>
                  </defs>
                  </svg>
                </span>
              </a>

              <a href="https://www.instagram.com/iamuhammederdem"  className={getClassName("profile-card-social__item")}  target="_blank">
                <span className={getClassName("icon-font_w")}>
                  <svg width="60px" height="60px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" rx="12" fill="#214FC3"/>
                  <path d="M10.3846 5C7.44838 5 5 7.01923 5 9.57692C5 10.8854 5.71615 12.0258 6.73331 12.8583C6.66763 13.3006 6.4878 13.7182 6.21154 14.0698C6.0988 14.2142 5.98098 14.3544 5.85831 14.4904C5.79481 14.5573 5.73833 14.6306 5.68977 14.709C5.65908 14.7591 5.61115 14.8151 5.58908 14.9282C5.56646 15.0407 5.59715 15.2259 5.68977 15.3654L5.75708 15.4833L5.89169 15.5506C6.36285 15.7859 6.87169 15.7445 7.33908 15.6179C7.80592 15.4908 8.255 15.2733 8.68523 15.0455C9.11492 14.8183 9.52362 14.5803 9.84615 14.4064C9.89138 14.3822 9.92046 14.3762 9.96408 14.3558C10.8132 15.5232 12.3683 16.3077 14.1032 16.3077C14.1199 16.3098 14.1355 16.3077 14.1538 16.3077C14.8538 16.3077 17.1154 18.6198 18.4615 17.7045C18.5154 17.4896 17.278 16.9506 17.2161 15.3487C18.2698 14.604 18.9499 13.4964 18.9499 12.2692C18.9499 10.4535 17.509 8.95338 15.5845 8.416C14.9755 6.43446 12.8583 5 10.3846 5ZM10.3846 6.07692C12.833 6.07692 14.6923 7.71923 14.6923 9.57692C14.6923 11.4346 12.833 13.0769 10.3846 13.0769C9.94738 13.0769 9.69646 13.2557 9.34108 13.4474C8.98569 13.6385 8.57808 13.876 8.18015 14.0865C7.83554 14.2685 7.50708 14.4085 7.20446 14.5071C7.499 14.0817 7.80646 13.5222 7.86031 12.7404L7.87754 12.4372L7.625 12.2525C6.66546 11.58 6.07692 10.6124 6.07692 9.57692C6.07692 7.71923 7.93623 6.07692 10.3846 6.07692Z" fill="white"/>
                  </svg>
                </span>
              </a>

              <a href="https://www.behance.net/iaMuhammedErdem" style={{backgroundColor:"orange"}} className={getClassName("profile-card-social__item")} target="_blank">
                <span className={getClassName("icon-font_w")}>
                  <svg width="60px" height="60px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" rx="12" fill="#DFA850"/>
                  <g clip-path="url(#clip0_8_373)">
                  <path d="M18.1302 15.0266C19.3087 15.0266 19.7283 14.0697 19.7424 13.4144L19.7424 10.586C19.7377 9.40275 18.7855 8.98791 18.1302 8.97377L16.5227 8.97848L15.3018 7.75754C14.4061 6.86188 13.4162 6.81474 12.6101 7.09286L8.42399 7.09286L6.53837 8.97848L5.87369 8.97377C4.69047 8.97848 4.27563 9.93072 4.26149 10.586L4.26149 13.4144C4.26149 13.9235 4.44062 14.2912 4.6999 14.5505C5.03459 14.8852 5.506 15.0266 5.8737 15.0266L8.42399 15.0219L10.1163 16.7142C10.9177 17.5156 11.8228 17.4213 12.4592 17.0772C13.1333 17.4685 13.831 17.3553 14.3448 17.0772C15.2641 17.6193 16.2305 17.1998 16.716 16.7142L18.1302 15.3L17.8521 15.0219L18.1302 15.0266ZM15.7732 15.7714C15.5611 15.9836 15.2122 16.1533 14.8304 15.7714L14.359 15.3L13.8876 15.7714C13.6754 15.9836 13.3266 16.1533 12.9448 15.7714L12.4734 15.3L12.002 15.7714C11.7898 15.9836 11.441 16.1533 11.0591 15.7714L8.98025 13.6925H5.88784C5.60499 13.6831 5.60028 13.5181 5.60028 13.4144L5.59557 10.6001C5.60499 10.3173 5.76999 10.3126 5.8737 10.3126L7.09463 10.3078L8.98025 8.42222L10.8659 8.42222L10.1163 9.17176C9.54594 9.74216 9.07925 10.9631 10.1163 12.0002C11.1534 13.0373 12.3744 12.5706 12.9448 12.0002L16.2446 15.3L15.7732 15.7714ZM18.1302 13.6878L16.5227 13.6925L12.9448 10.1146L12.002 11.0574C11.7898 11.2695 11.441 11.4392 11.0591 11.0574C10.6773 10.6755 10.847 10.3267 11.0591 10.1146L12.4734 8.70035C12.6902 8.48351 13.4963 7.83768 14.359 8.70035L15.9665 10.3078L18.1161 10.3078C18.3989 10.3173 18.4036 10.4823 18.4036 10.586L18.4083 13.4003C18.3989 13.6831 18.2339 13.6878 18.1302 13.6878Z" fill="white"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_8_373">
                  <rect width="16" height="16" fill="white" transform="translate(4 4)"/>
                  </clipPath>
                  </defs>
                  </svg>
                </span>
              </a>


              <a href="https://www.behance.net/iaMuhammedErdem" style={{backgroundColor:"orange"}} className={getClassName("profile-card-social__item")} target="_blank">
                
                <svg width="60px" height="60px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" rx="12" fill="#214FC3"/>
                <path d="M9.04818 7.91664C9.04802 8.22606 8.92496 8.52274 8.70606 8.74143C8.48715 8.96011 8.19035 9.08288 7.88093 9.08272C7.57151 9.08257 7.27482 8.9595 7.05614 8.7406C6.83746 8.5217 6.71469 8.22489 6.71484 7.91547C6.715 7.60605 6.83806 7.30937 7.05697 7.09069C7.27587 6.872 7.57267 6.74924 7.88209 6.74939C8.19151 6.74954 8.4882 6.87261 8.70688 7.09151C8.92556 7.31041 9.04833 7.60722 9.04818 7.91664ZM9.08318 9.94664H6.74984V17.25H9.08318V9.94664ZM12.7698 9.94664H10.4482V17.25H12.7465V13.4175C12.7465 11.2825 15.529 11.0841 15.529 13.4175V17.25H17.8332V12.6241C17.8332 9.02497 13.7148 9.15914 12.7465 10.9266L12.7698 9.94664Z" fill="white"/>
                </svg>

              </a>

              <a href="https://www.behance.net/iaMuhammedErdem" style={{backgroundColor:"orange"}} className={getClassName("profile-card-social__item")} target="_blank">
                <span className={getClassName("icon-font_w")}>
                
                  <svg width="60px" height="60px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" rx="12" fill="#214FC3"/>
                  <path d="M13.1673 12.875H14.6257L15.209 10.5417H13.1673V9.37502C13.1673 8.77419 13.1673 8.20835 14.334 8.20835H15.209V6.24835C15.0188 6.22327 14.3007 6.16669 13.5424 6.16669C11.9587 6.16669 10.834 7.13327 10.834 8.90835V10.5417H9.08398V12.875H10.834V17.8334H13.1673V12.875Z" fill="white"/>
                  </svg>

                </span>
              </a>

              <a href="https://www.behance.net/iaMuhammedErdem" style={{backgroundColor:"orange"}} className={getClassName("profile-card-social__item")} target="_blank">
                <span className={getClassName("icon-font_w")}>
                  
                  <svg width="60px" height="60px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" rx="12" fill="#214FC3"/>
                  <path d="M11.9992 6.75C11.5351 6.75 11.09 6.93437 10.7618 7.26256C10.4336 7.59075 10.2492 8.03587 10.2492 8.5C10.2492 8.96413 10.4336 9.40924 10.7618 9.73743C11.09 10.0656 11.5351 10.25 11.9992 10.25C12.4634 10.25 12.9085 10.0656 13.2367 9.73743C13.5649 9.40924 13.7492 8.96413 13.7492 8.5C13.7492 8.03587 13.5649 7.59075 13.2367 7.26256C12.9085 6.93437 12.4634 6.75 11.9992 6.75ZM9.08257 8.5C9.08269 7.94815 9.23936 7.40765 9.53439 6.94128C9.82942 6.47492 10.2507 6.10182 10.7493 5.86533C11.2479 5.62883 11.8034 5.53865 12.3512 5.60524C12.899 5.67183 13.4167 5.89247 13.8441 6.24154C14.2716 6.5906 14.5912 7.05377 14.7659 7.57723C14.9406 8.1007 14.9632 8.66299 14.8311 9.1988C14.699 9.7346 14.4176 10.2219 14.0196 10.6042C13.6216 10.9865 13.1233 11.248 12.5826 11.3583V14.9167H11.4159V11.3583C10.7572 11.2236 10.1652 10.8656 9.74007 10.3448C9.31491 9.82399 9.08266 9.17232 9.08257 8.5ZM6.81049 11.4167H9.66591V12.5833H7.85466L7.40082 16.6667H16.5977L16.1438 12.5833H14.3326V11.4167H17.188L17.9008 17.8333H6.09766L6.81049 11.4167Z" fill="white"/>
                  </svg>

                </span>
              </a>

              <a href="https://www.behance.net/iaMuhammedErdem" style={{backgroundColor:"orange"}} className={getClassName("profile-card-social__item")} target="_blank">
                <span className={getClassName("icon-font_w")}>
                  
                  <svg width="60px" height="60px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" rx="12" fill="#214FC3"/>
                  <path d="M16.0833 8.5H7.91667C7.27233 8.5 6.75 9.02233 6.75 9.66667V16.0833C6.75 16.7277 7.27233 17.25 7.91667 17.25H16.0833C16.7277 17.25 17.25 16.7277 17.25 16.0833V9.66667C17.25 9.02233 16.7277 8.5 16.0833 8.5Z" stroke="white"/>
                  <path d="M6.75 10.8333C6.75 9.73317 6.75 9.18367 7.09183 8.84183C7.43367 8.5 7.98317 8.5 9.08333 8.5H14.9167C16.0168 8.5 16.5663 8.5 16.9082 8.84183C17.25 9.18367 17.25 9.73317 17.25 10.8333H6.75Z" fill="white"/>
                  <path d="M9.08398 6.75V8.5M14.9173 6.75V8.5" stroke="white" stroke-linecap="round"/>
                  </svg>

                </span>
              </a>

            </div>

          </div>
        </div>
      </> 
      );
    }
  },
};
