import React, {useState} from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import "swiper/css/bundle";
import ".../asset/css/swiperStyle.css";

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
            {/*file uploade*/}
            {/*keyword*/}
            {/*description*/}
        </div>
    );
}
export default  CreatePost;