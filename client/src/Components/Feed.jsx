import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import {MdBookmarks, MdDelete} from 'react-icons/md';
import {useSelector} from "react-redux";


const Feed = ({data})=>{

    const [alreadySaved, setAlreadySaved] = useState(null);
    const [ishover, setIshover] = useState(false);
    const user = useSelector(state => state.user)
    
    return(
        <div className="m-2 relative" onMouseEnter={()=>setIshover(true)} onMouseLeave={()=>setIshover(false)}>
            <div className="relative cursor-pointer w-auto rounded-lg shadow-md overflow-hidden">
                {data?.mainImage &&(
                    <NavLink to={`/feed-details/${data?._id}`} className="w-full h-full">
                        <img src={data.mainImage.asset.url} alt="" className="w-full h-full object-cover"/>
                    </NavLink>
                )}

                {data?.otherMedia &&(
                    <NavLink to={`/feed-details/${data?._id}`} className="w-full h-full">
                        <video src={data.otherMedia.asset.url} loop autoPlay muted className="w-full h-full object-cover"/>
                    </NavLink>
                )}

                {ishover && (
                    <>
                        <div className="absolute inset-x-0 top-0 px-3 py-2 flex items-center">
                            <div className={`w-8 h-8 rounded-md flex items-center justify-center border ${alreadySaved?'border-emerald-400':'border-gray-100'}`}>
                                <MdBookmarks className={`text-lg ${alreadySaved?'text-emerald-400':'text-gray-100'}`}/>
                            </div>
                        </div>
                        {data?.keywords && (
                            <div className="absolute inset-x-0 bottom-0 px-3 py-2 flex items-center gap-1 bg-gradient-to-bl form-[rgba(0,0,0,0.2)] to-[rgba(0,0,0,0.8)] backdrop-blur-sm flex-wrap">
                                {data.keywords.slice(0, 3).map((tag, i)=>(
                                    <p className="text-sm font-semibold text-gray-50" key={i}>{`${tag.length>10? `${tag.slice(1,10)}...`: tag}`}</p>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>

            {user?.uid===data?.users?._id && (
                <div className="absolute top-2 right-2 w-6 h-6 cursor-pointer rounded-full bg-[rgba(256,256,256,0.6)] flex items-center justify-center hover:bg-white">
                    <MdDelete className="text-lg text-red-500 "/>
                </div>
            )}
        </div>
    )
}

export  default Feed;
