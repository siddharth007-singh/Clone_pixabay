import React, {useState} from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import "swiper/css/bundle";
import {CSS} from "../asset";
import {categoriesList} from "../utils/support";

const CreatePost = ()=>{
    const [title, seTtitle] = useState("");

    const CreatePostStyle={
        MainSection:{
            width:"100%",
            height:"auto",
            display:"flex",
            alignItems:"center",
            justifyContent:"flex-start",
            flexDirection:"column",
            gap:"1rem",
        },
        InputStyle:{
            width: "100%",
            paddingLeft: "1rem",
            paddingRight: "1rem",
            paddingTop: "0.75rem",
            paddingBottom: "0.75rem",
            borderRadius: "0.375rem",
            borderWidth: "1px",
            borderColor: "rgb(229 231 235)",
            boxShadow: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
            shadowColor:"inset 0 2px 4px 0",
        }

    }

    return(
        <div style={CreatePostStyle.MainSection}>
            {/*Alert Notificstion*/}
            {/*title*/}
            <input
                type="text"
                placeholder="Your Post Title Here"
                style={CreatePostStyle.InputStyle}
                value={title}
                onChange={(e)=>seTtitle(e.target.value)}
            />

            {/*category slider*/}
            <Swiper
                grabCursor={true}
                spaceBetween={10}
                centeredSlides={false}
                className="mySwiper"
                slidesPerView={8}>

                {categoriesList && categoriesList.map(value=>(
                    <SwiperSlide key={value.id} className="py-4">
                        <div className={`px-2 py-1 flex items-center justify-center rounded-md border border-grey-300 hover:shadow-md shadow-inner`}>
                            <p>{value.name}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            {/*file uploade*/}
            {/*keyword*/}
            {/*description*/}
        </div>
    );
}
export default  CreatePost;