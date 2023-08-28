import React, {useEffect, useState} from 'react';
import {BannerImage} from "../asset";
import {Filter, MasonryLayout, Spinner} from "../Components";
import {useParams} from "react-router-dom";
import {fetchSearchQuery} from "../sanity";


const SearchContainer = () => {

    const {searchTerm} = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [searchFeed, setSearchFeed] = useState(null);

    useEffect(()=>{
        setIsLoading(true);
        fetchSearchQuery(searchTerm).then((data)=>{
            console.log(data);
            setSearchFeed(data);

            setInterval(()=>{
                setIsLoading(false);
            },2000)
        })
    },[searchTerm]);
    

    return(
        <div className="w-screen h-auto flex flex-col items-center justify-center relative">
            <div className="w-screen h-420 flex items-center justify-center relative">
                <img src={BannerImage} alt="" className="object-cover" />
            </div>

            <Filter/>

            <section className="w-full items-center justify-between flex-wrap gap-3 px-8 py-6">
        {isLoading ? (
          <div className="w-full flex items-center justify-center py-12">
            <Spinner />
          </div>
        ) : (
          <>
            {searchFeed?.length > 0 ? (
              <>
                <MasonryLayout feeds={searchFeed} />
              </>
            ) : (
              <div className="w-full flex flex-col items-center justify-center gap-3 py-24">
                <p className="text-xl lg:text-3xl font-bold text-primary">
                  Sorry! No result found :(
                </p>
                <p className="text-lg lg:text-lg text-primary">
                  We're sorry what you were looking for. Please try another term
                </p>
              </div>
            )}
          </>
        )}
      </section>


            <div>Its just for puloading the page into the github </div>
        </div>
    )
}

export default SearchContainer;