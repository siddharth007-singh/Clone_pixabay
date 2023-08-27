import React, {useEffect, useState} from 'react';
import {BannerImage} from "../asset";
import {Filter} from "../Components";
import {useParams} from "react-router-dom";
import {fetchSearchQuery} from "../sanity";


const SearchContainer = () => {

    const {searchTerm} = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [searchFeed, setSearchFeed] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        fetchSearchQuery(searchTerm).then((data)=>{
            console.log(data);
            setSearchFeed(data);
            setInterval(()=>{
                setIsLoading(false);
            }, 2000);
        });
    }, [searchTerm]);
    

    return(
        <div className="w-screen h-auto flex flex-col items-center justify-center relative">
            <div className="w-screen h-420 flex items-center justify-center relative">
                <img src={BannerImage} alt="" className="object-cover" />
            </div>

            <Filter/>
        </div>
    )
}

export default SearchContainer;