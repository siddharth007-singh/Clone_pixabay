import React, {useEffect, useState} from 'react';
import {BannerImage} from "../asset";
import {useDispatch, useSelector} from "react-redux";
import {fetchFeeds} from "../sanity";
import {SET_FEED} from "../context/actions/feedAction";
import {MasonryLayout, Spinner} from "../Components";


const HomeContainer = () => {

  const [isLoading, setIsLoading] = useState(false);
  const feeds = useSelector((state)=>state.feeds);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!feeds){
      setIsLoading(true);
      fetchFeeds().then((data)=>{
        console.log("Home Container Data : ", data);
        dispatch(SET_FEED(data));

        setInterval(()=>{
          setIsLoading(false);
        }, 2000);
      })
    }
  }, []);

  return(
      <div className="w-screen">
        <div className="w-screen h-420 flex items-center justify-center relative object-cover">
          <img src={BannerImage} className="object-cover" alt="" style={{width:"1920px", height:"440px"}}/>
        </div>
        {isLoading ? (
            <div className="w-full p-12 flex items-center justify-center">
              <Spinner/>
            </div>
        ):(
            <div className="w-full items-center justify-between flex-wrap gap-3 px-8 py-6">
              <MasonryLayout feeds={feeds}/>
            </div>
        )};
      </div>
  )
}

export default HomeContainer;