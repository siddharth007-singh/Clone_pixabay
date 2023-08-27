import React, {useState} from 'react';
import {BannerImage} from "../asset";
import {FaSearch} from "react-icons/fa";
import {useNavigate} from "react-router-dom";


const Banner = () => {

    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const handleKeyDown = (e)=>{
        if(e.key==="Enter"){
            navigate(`search/${search}`,{replace:true});
        }
    }
    
    return(
        <div className="w-screen flex items-center justify-center relative object-cover">
            <img src={BannerImage} className="object-cover" alt=""/>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
                <h2 className="text-4xl font-extrabold text-white tracking-wider">
                    Stunning free images & royalty free stock
                </h2>
                <p className="text-white py-4">
                    over 2.8 million+ high  quality stock images, video and music shared by our talented community
                </p>
                <div className="w-1/2 gap-4 px-4 py-3 rounded-full bg-white flex items-center justify-between">
                    <FaSearch size={16} color="#656F79"/>
                    <input
                        type="text"
                        value={search}
                        onChange={(e)=>setSearch(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Search Here"
                        className="flex-1 border-none outline-none text-textColor text-lg font-semibold"
                    />
                </div>
            </div>

        </div>
    )
}

export default Banner;