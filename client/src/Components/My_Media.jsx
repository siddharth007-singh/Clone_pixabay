import {React, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {MasonryLayout, Spinner} from "./index";

const My_Media = ({feeds})=>{

    const [isLoading, setIsLoading] = useState(false);
    const user = useSelector((state)=>state.user);
    const [filterFeed, setfilterFeed] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        setfilterFeed(feeds?.filter((data)=>data.users._id===user?.uid));
        setInterval(()=>{
            setIsLoading(false);
        }, 2000);
    }, []);
    
    return(
        <div className="w-full h-auto flex flex-col items-center justify-start">
            {isLoading?(
                <Spinner/>
            ):(
                <>
                    <div className="w-full items-center justify-between flex-wrap gap-3 ">
                        <MasonryLayout feeds={filterFeed}/>
                    </div>
                </>
            )}
        </div>
    )
}
export default  My_Media;