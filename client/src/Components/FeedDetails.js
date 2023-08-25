import React, {useEffect, useState} from 'react';
import {BannerImage} from "../asset";
import {useParams} from "react-router-dom";
import {fetchFeedsDetails} from "../sanity";
import {FaHeart} from "react-icons/fa";

const FeedDetails = ()=>{

    const [feed, setFeed] = useState(null);
    const {_id} = useParams();

    useEffect(() => {
        fetchFeedsDetails(_id).then((data)=>{
            setFeed(data[0]);
        })
    }, []);
    
    return(
        <div className="w-screen h-auto flex flex-col items-center justify-center relative">
            <div className="w-screen  flex items-center justify-center relative ">
                <img src={BannerImage} alt="" className="object-cover" />
                <div className="inset-0 bg-overlay-4"></div>
            </div>

            <div className="w-full grid grid-cols-1 lg:grid-cols-2 px-8 lg:px-10 xl:px-32 py-3">
                <div className="flex flex-col items-start justify-start">
                    <div className="flex h-auto lg:h-500 xl:h-[800] items-center justify-center flex-col overflow-hidden rounded-md shadow-md">
                        {feed?.mainImage &&(
                            <img src={feed.mainImage.asset.url} alt="" className="w-full h-full object-cover object-center"/>
                        )}

                        {feed?.otherMedia &&(
                            <video src={feed.otherMedia.asset.url} loop autoPlay muted className="object-cover"/>
                        )}
                    </div>
                </div>
                <div className="flex items-center flex-col justify-start w-full gap-6">

                    <div className="flex items-center justify-center gap-3">
                        <img src={feed?.users?.photoURL} alt="" className="w-12 h-12 rounded-full object-cover shadow-md"/>
                        <p className="text-lg text-primary font-semibold">{feed?.users?.displayName}</p>
                    </div>

                    <div className="flex items-center justify-center gap-3">
                        <div className="flex items-center justify-center gap-2 px-2 py-1 rounded-md border border-red-200">
                            <FaHeart className="text-red-500 text-lg"/>

                            {feed?.collections?.length>0?(
                                <p className="text-base text-primary font-semibold">
                                    {feed?.collections?.length}
                                </p>
                            ):(
                                <p className="text-base text-primary font-semibold">0</p>
                            )}

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default FeedDetails;