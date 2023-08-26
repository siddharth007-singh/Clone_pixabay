import React, {useState} from "react";
import {Spinner} from "./index";
import moment from  "moment";
import {addToComments, fetchFeeds, fetchFeedsDetails} from "../sanity";
import {useDispatch} from "react-redux";
import {SET_FEED} from "../context/actions/feedAction";

const Comment = (feed, user, setFeed)=>{

    const [comment, setComment] = useState("");
    const [loading, setIsLoading] = useState(false);
    const [index, setIndex] = useState(5);

    const dispatch = useDispatch();

    const saveComment = async (event)=>{
        if(event.key==="Enter"){
            if(comment){
                setIsLoading(true);
                addToComments(feed?._id, user?.uid, comment).then(()=>{
                    fetchFeedsDetails(feed?._id).then((newData)=>{
                        setFeed(newData[0])
                        fetchFeeds().then((data)=>{
                            dispatch(SET_FEED(data))
                        })
                        setInterval(()=>{
                            setIsLoading(false);
                        },2000)

                    })
                })
            }
        }
    }
    
    return(
        <div className="w-full flex flex-col items-start justify-start gap-2">
            <p className="text-lg text-primary font-semibold">Comemnt</p>
            <div className="w-full flex gap-3 items-center justify-center">

                <input
                    value={comment}
                    onChange={(e)=>setComment(e.target.value)}
                    onKeyDown={saveComment}
                    type="text"
                    placeholder="Add Your Comment Heree .."
                    className="w-full px-2 py-2 h-20 rounded-md shadow-inner text-base text-primary border-gray-1   00"
                />
            </div>

            <div className="w-full flex flex-col items-center justify-center gap-2">
                {loading ? (
                    <Spinner/>
                ):(
                    <>
                        {feed?.comments? (
                            feed?.comments?.slice(0,index).map((msg)=>(
                                <div key={msg._id} className="w-full flex gap-3 items-start justify-start">
                                    <img
                                        src={msg?.users?.photoURL}
                                        alt=""
                                        className="w-16 h-16 rounded-full object-cover shadow-md"
                                    />
                                    <div className="flex w-full flex-col items-start justify-start gap-2">
                                        <div className="flex w-full items-center justify-between">
                                            <p className="text-lg text-primary font-semibold">{msg?.users?.displayName}</p>
                                            <p>
                                                {moment(
                                                    `${new Date(msg?._createdAt
                                                    ).toLocaleDateString()} ${new Date(
                                                        msg?._createdAt
                                                    ).toLocaleTimeString()}`,
                                                    "DD/MM/YYY h:mm:ss A"
                                                ).fromNow()}
                                            </p>
                                        </div>
                                        <p className="text-base text-primary">{msg?.comment}</p>
                                    </div>
                                </div>
                            ))
                            ):(
                                <><p>No Comments</p></>
                            )}
                    </>
                )}
            </div>
        </div>
    )
}

export default Comment;