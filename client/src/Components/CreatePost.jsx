import React, {useState} from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import "swiper/css/bundle";
import {categoriesList} from "../utils/support";
import {Spinner} from "../Components";
import {BiCloudUpload} from 'react-icons/bi';
import {AiFillCloseCircle, AiOutlineClear} from 'react-icons/ai';
import {FaTrash} from 'react-icons/fa';
import {uploadeAsset, deleteUploadeAsset} from "../sanity";

const CreatePost = ()=>{
    const [title, seTtitle] = useState("");
    const [category, setCategory] = useState("");
    const [isloading, setIsloading] = useState(false);
    const [keywords, setKeywords] = useState("");
    const [tags, setTags] = useState([]);
    const [description, setDescription] = useState("");
    
    // File Uploading States
    const [asset, setAsset] = useState(null);
    const [alert, setAlert] = useState(null);
    const handleFileSelect = async (event)=>{
        setIsloading(true);
        const file = event.target.files[0];
        if(file && isAllowed(file)){
            await uploadeAsset(file).then(data=>{
                console.log("Uplode asset", data);
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

    const isAllowed =(file)=>{
        const allowedTypes=[
            "audio/mp3",
            "audio/wav",
            "audio/avi",
            "audio/mp4",
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/gif",
        ];
        return allowedTypes.includes(file.type);
    }

    const deleteAsset = async (id)=>{
        setIsloading(true);
        await deleteUploadeAsset(id).then(data=>{
            setAsset(null);
            setInterval(()=>{
                setIsloading(false);
            }, 3000);
        })
    };

    const handlekeyUp = (event)=>{
        if(event.key ==="Enter"){
            setTags(keywords.split(","));
            setKeywords("");
            console.log(tags);
        }
    }

    const SaveData = async ()=>{
        if(!title || !asset || !category || tags){
            setAlert("required Fields are missing");
            setInterval(()=>{
                setAlert(null);
            }, 2000);
        }
        else{
            //Cheking whearter the is a=save accorinf to file or iamge
            if(asset?.mimeType.split("/")[0]==='image'){
                console.log(asset?.mimeType.split("/")[0]==='image')
            }
            else{
                console.log(asset?.mimeType.split("/")[0]==='image')
            }
        }
    };

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

                    {asset && ["video/mp4", "video/avi", "video/mov", "video/wav"].includes(asset?.mimeType)&&(
                        <video
                            src={asset?.url}
                            controls
                            className="h-full w-full object-cover"
                        />
                    )}
                </>}</>}

                {asset &&(
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-red-400 hover:bg-red-600 cursor-pointer
                    absolute top-5 right-5" onClick={()=>deleteAsset(asset?._id)}>
                        <FaTrash className="text-base text-white"/>
                    </div>
                )}
            </div>
            {/*keyword*/}
            <div className="w-full flex flex-col gap-4 items-center justify-center">
                <div className="w-full flex flex-col gap-4 items-center justify-center relative">
                    <input
                        type="text"
                        placeholder="Type your Tags seprated by Commas"
                        value={keywords}
                        onChange={(e)=>setKeywords(e.target.value)}
                        className="w-full px-4 py-3 rounded-md border border-gray-200 shadow-inner text-lg text-primary font-semibold"
                        onKeyUp={handlekeyUp}
                    />
                    <AiOutlineClear
                        className="absolute text-xl text-primary cursor-pointer hover:text-2xl transition-all duration-150"
                        style={{right:"20px"}}
                        onClick={()=>{
                            setKeywords("");
                            setTags([]);
                        }}
                    />
                </div>
                <div>
                    {tags.length>0 &&(
                        <div className="h-auto px-4 py-4 flex items-center justify-center  flex-wrap border border-dashed rounded-md border-gray-200 gap-4">
                            {tags.map((tag, i)=>(
                                <div key={i} className="flex items-center justify-center gap-2 px-2 py-1 rounded-md border border-gray-200 border-dashed shadow-inner hover:bg-gray-200 cursor-pointer">
                                    <p>{tag}</p>
                                    <AiFillCloseCircle
                                     className="text-lg text-primary  cursor-pointer"
                                     onClick={()=>{
                                         setTags(tags.filter((value)=>value!==tag));
                                     }}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {/*description*/}
            <textarea
                type="text"
                rows={6}
                cols={1}
                placeholder="Description"
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-md border border-gray-200 shadow-inner text-lg text-primary font-semibold"
            />

            {/*Button*/}
            <div className="w-full flex items-center">
                <button
                    className="px-4 py-2 rounded-md bg-blue-300 text-lg text-primary cursor-pointer hover:bg-blue-600 hover:text-white w-full lg:w-68 ml-auto"
                    onClick={SaveData}
                >
                    Save
                </button>
            </div>
        </div>
    );
}
export default  CreatePost;