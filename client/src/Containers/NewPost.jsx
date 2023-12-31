import React, {useState} from 'react';
import {BannerImage} from "../asset";
import {subMenu} from '../utils/support';
import {NavLink, Route, Routes} from "react-router-dom";
import {Collections, CreatePost, My_Media} from "../Components";
import feed from "../Components/Feed";
import {useSelector} from "react-redux";

const NewPost=()=>{
    const feeds = useSelector((state)=>state.feeds);
    const [isActive, setIsActive] = useState(false);

    const handleMouseEnter = () => {
        setIsActive(true);
    };
    const handleMouseLeave = () => {
        setIsActive(false);
    };

    const newPostStyle = {
        sectionStyle:{
            display:"flex",
            flexDirection:"column",
            width: "100%",
            height: "auto",
            alignItems:"center",
            justifyContent:"flex-start",
            paddingLeft: "1.5rem",
            paddingRight: "1.5rem",
            paddingTop: "3rem",
            paddingBottom: "3rem",
        },
        subMenuStyle:{
            width:"100%",
            height:"auto",
            display:"flex",
            alignItems:"center",
            justifyContent:"flex-start",
            overflowX:"scroll",
        },
        unorderList:{
            display: "flex",
            alignItems:"center",
            gap: "1.5rem",
            justifyContent: "center",

            isActiveStyle:{
                cursor:"pointer",
                fontSize: "1.125rem",
                lineHeight: "1.75rem",
                color:isActive? "rgb(85 85 85)" : "rgb(96 165 250)",
            },
        },
        ContentStyle:{
            width:"100%",
            display:"flex",
            flexDirection: "column",
            height:"auto",
            justifyContent: "flex-start",
            paddingTop: "1rem",
            paddingBottom: "1rem",
        }

    }

    return (
        <div className="w-screen h-auto flex flex-col items-center justify-center relative">
            <div className="w-screen h-420 flex items-center justify-center relative">
                <img src={BannerImage} alt="" className="object-cover" />
            </div>
            {/*Filter section*/}
            <section style={newPostStyle.sectionStyle}>
                {/*SubMenu*/}
                <div style={newPostStyle.subMenuStyle}>
                    <ul style={newPostStyle.unorderList}>
                        {subMenu && subMenu.map(menu=>(
                            <NavLink
                                to={menu.slug} key={menu.id}
                                style={newPostStyle.unorderList.isActiveStyle}
                                onLoad={handleMouseEnter}
                                // onunload={handleMouseLeave}
                            >{menu.name}</NavLink>
                        ))}
                    </ul>
                </div>
                <div style={newPostStyle.ContentStyle}>
                    <Routes>
                        <Route path="/upload" element={<CreatePost/>}/>
                        <Route path="/collections" element={<Collections/>}/>
                        <Route path="/my-media" element={<My_Media feeds={feeds}/>}/>
                    </Routes>
                </div>
            </section>
        </div>
    );
};

export default NewPost;
