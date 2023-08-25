import React, {useEffect, useState} from 'react';
import {Banner2} from "../asset";
import {useParams} from "react-router-dom";
import {fetchFeedsDetails} from "../sanity";

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
            <div className="w-screen py-3 flex items-center justify-center relative ">
                <img src={Banner2} alt="" className="object-cover" />
                <div className="inset-0 bg-overlay-4"></div>
            </div>

            <div className="w-full grid grid-cols-1 lg:grid-cols-2 px-8 lg:px-10 xl:px-32 gap-4">
                <div className="flex flex-col items-start justify-start gap-4">
                    <div className="flex h-auto lg:h-500 xl:h-[800] items-center justify-center flex-col overflow-hidden rounded-md shadow-md">
                        {feed?.mainImage &&(
                            <img src={feed.mainImage.asset.url} alt="" className="w-full h-full object-cover object-center"/>
                        )}

                        {feed?.otherMedia &&(
                            <video src={feed.otherMedia.asset.url} loop autoPlay muted className="object-cover"/>
                        )}
                    </div>
                </div>
                <div>2</div>
            </div>
        </div>
    )
}

export default FeedDetails;