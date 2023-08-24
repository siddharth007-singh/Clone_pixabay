import React from "react";
import Masonry from "react-masonry-css";
import {Feed} from "../Components";


const BreakPoints = {
    default: 4,
    3000:6,
    2000:5,
    1200:3,
    1000:2,
    500:1,
}

const MasonryLayout = ({feeds})=>{
    return(
        <Masonry className="flex" breakpointCols={BreakPoints}>
            {feeds?.map((feed, i)=>(
                <Feed key={i} data={feed}/>
            ))}
        </Masonry>
    );
};

export  default MasonryLayout;