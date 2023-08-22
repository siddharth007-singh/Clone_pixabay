import React, {useState} from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import "swiper/css/bundle";
import {categoriesList} from "../utils/support";
import {Spinner} from "../Components";
import {BiCloudUpload} from 'react-icons/bi';
import {uploadeAsset} from "../sanity";

const CreatePost = ()=>{
    const [title, seTtitle] = useState("");
    const [category, setCategory] = useState("");
    const [isloading, setIsloading] = useState(false);
    
    // File Uploading States
    const [asset, setAsset] = useState(null);
    const [alert, setAlert] = useState(null);
    const handleFileSelect = async (event)=>{
        setIsloading(true);
        const file = event.target.files[0];
        if(file && isAllowed(file)){
            await uploadeAsset(file).then(data=>{
                console.log("Uploaded Asset", data);
                setAsset(data);
                setInterval(()=>{
                    setIsloading(false);
                }, 3000);
            })
        }
        else{
            setIsloading(false);
            setAsset(null);
            setAlert("Invalid File Type");
            setInterval(()=>{
                setAlert(null);
            }, 3000);
        }
    };

    const isAllowed  =(file)=>{
        const allowedTypes=[
            "audio/mp3",
            "audio/wav",
            "audio/avi",
            "audio/jpeg",
            "audio/jpg",
            "audio/png",
            "audio/gif",
        ];
        return allowedTypes.includes(file.type);
    }

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
        },
        SilderStyle:{
            paddingLeft: "0.5rem",
            paddingRight: "0.5rem",
            paddingTop: "0.01rem",
            paddingBottom: "0.01rem",
            display: "flex",
            justifyContent: "center",
            borderRadius: "0.375rem",
            borderWidth: "1px",
            fontSize:"1.1rem",
        },
    }

    return(
        <div style={CreatePostStyle.MainSection}>
            {/*Alert Notificstion*/}
            {alert && (
                <div className="w-full px-4 py-3 rounded-md bg-red-100 shadow-inner flex items-center justify-center">
                    <p className="text-xl text-primary font-medium">{alert}</p>
                </div>
            )}

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
                    <SwiperSlide key={value.id}>
                        <div style={CreatePostStyle.SilderStyle} className={`rounded-md border-gray-200 hover:shadow-md shadow-inner ${category===value.name && "bg-gray-200"}`} onClick={()=>setCategory(value.name)}>
                            <p className="text-base text-primary cursor-pointer ">{value.name}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/*file uploade*/}
            <div className="w-full bg-gray-100 backdrop-blur-md rounded-md border-2 border-dotted border-gray-300 cursor-pointer flex items-center justify-center" style={{height:"370px"}}>
                {isloading?<Spinner/>: <>{!asset?<>
                    <label className="w-full h-full cursor-pointer">
                            <div className="flex flex-col items-center justify-center h-full">
                                <div className="flex flex-col justify-center items-center cursor-pointer">
                                    <p className="font-bold text-2xl"><BiCloudUpload/></p>
                                    <p className="text-lg">Click to Upload</p>
                                </div>
                            </div>
                        <input
                            type="file"
                            className="w-0 h-0"
                            accept=".mp3, .wav, .avi, .mp4, .jpeg, .png, .gif"
                            onChange={handleFileSelect}
                        />
                    </label>
                </>:<>
                    {asset && ["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(asset?.mimeType)&&(
                        <img
                            src={asset?.url}
                            alt=""
                            className="h-full w-full object-cover"
                        />
                    )}
                </>}</>}
            </div>
            {/*keyword*/}
            {/*description*/}
        </div>
    );
}
export default  CreatePost;