import React, {useEffect, useState} from 'react';
import {BannerImage} from "../asset";
import {useParams} from "react-router-dom";
import {addToCollection, fetchFeedsDetails} from "../sanity";
import {FaHeart} from "react-icons/fa";
import {useSelector} from "react-redux";
import {MdBookmarks} from "react-icons/md";
import {MasonryLayout} from "./index";

const FeedDetails = ()=>{
    const [alreadySaved, setAlreadySaved] = useState(null);
    const [feed, setFeed] = useState(null);
    const {_id} = useParams();
    const user = useSelector((state) => state.user);
    const feeds = useSelector((state) => state.feeds);

    useEffect(() => {
        fetchFeedsDetails(_id).then((data)=>{
            setFeed(data[0]);
        })
    }, []);

    const saveToCollections = async (id, uid)=>{
        if(!alreadySaved){
            addToCollection(id, uid).then(()=>{
                window.location.reload();
            });
        }
    };

    useEffect(() => {
        setAlreadySaved(
            !!feed?.collections?.filter((item)=>item._id===user?.uid).length
        );
    }, [alreadySaved, _id]);
    
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
                <div className="flex px-7 flex-col justify-start w-full gap-6">

                    {/*user area*/}
                    <div className="flex items-center justify-center gap-3">
                        <img src={feed?.users?.photoURL} alt="" className="w-12 h-12 rounded-full object-cover shadow-md"/>
                        <p className="text-lg text-primary font-semibold">{feed?.users?.displayName}</p>
                    </div>

                    {/*Collections area*/}
                    <div className="flex items-center justify-center gap-2">
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
                        <div
                            className={`w-8 h-8 rounded-md flex items-center justify-center border ${alreadySaved?'border-emerald-400':'border-gray-100'}`}
                            onClick={()=>saveToCollections(feed?._id, user?.uid)}>
                            <MdBookmarks className={`text-lg ${alreadySaved?'text-emerald-400':'text-gray-100'}`}/>
                        </div>
                    </div>
                    {/*tags area*/}
                    {feed?.keywords?.length>0 && (
                        <p className="text-base text-primary font-semibold">
                            Tags: {feed?.keywords?.map((tag, i)=>(
                            <span className="px-1 py-[1px] mx-1 rounded-md border border-gray-200" key={i}>{tag}</span>
                        ))}
                        </p>
                    )}
                    {/*freeDawnloade area*/}
                    {user && (
                        <>
                            {feed?.mainImage &&(
                                <a href={`${feed?.mainImage?.asset.url}?dl`} className="w-auto px-16 text-lg text-gray-50 font-semibold py-2 rounded-full bg-emerald-500 hover:shadow-md">
                                    Free dawnloade
                                </a>
                            )}

                            {feed?.otherMedia &&(
                                <a href={`${feed?.otherMedia?.asset.url}?dl`} className="w-auto px-16 text-lg text-gray-50 font-semibold py-2 rounded-full bg-emerald-500 hover:shadow-md">
                                    Free dawnloade
                                </a>
                            )}
                        </>
                    )}

                    <div className="w-full h-[1px] rounded-md bg-gray-200 px-4"></div>
                    <p className="text-base text-primary">{feed?.desc}</p>
                    <div className="w-full h-[1px] rounded-md bg-gray-200 px-4"></div>

                    <p className="text-lg font-semibold text-primary">Suggestions : </p>

                    <div className="w-full items-center justify-center flex-wrap gap-3">
                        <MasonryLayout
                            isSuggestion={true}
                            feeds={
                            feed?.otherMedia
                                ?feeds.slice(0,6).filter(item=>item.otherMedia)
                                :feeds.slice(0,6).filter(item=>item.mainImage )
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeedDetails;