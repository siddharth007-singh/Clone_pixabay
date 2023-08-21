import React from 'react';
import {Banner2} from "../asset";
import {subMenu} from '../utils/support';
import {NavLink} from "react-router-dom";
import {hover} from "@testing-library/user-event/dist/hover";

const NewPost=()=>{

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

            },
            NotActiveStyle:{
                cursor:"pointer",
                fontSize: "1.125rem",
                lineHeight: "1.75rem",
                color: "rgb(85 85 85)",
            }
        },
    }

    return (
        <div className="w-screen h-auto flex flex-col items-center justify-center relative">
            <div className="w-screen h-420 flex items-center justify-center relative">
                <img src={Banner2} alt="" className="object-cover" />
            </div>
            {/*Filter section*/}
            <section style={newPostStyle.sectionStyle} className="text-lg text-primary hover:text-blue-700 cursor-pointer">
                {/*SubMenu*/}
                <div style={newPostStyle.subMenuStyle}>
                    <ul style={newPostStyle.unorderList}>
                        {subMenu && subMenu.map(menu=>(
                            <NavLink to={menu.slug} key={menu.id} className={(isActive)=>
                            isActive?"text-lg text-blue-400 hover:text-blue-400 cursor-pointer":"text-lg text-primary hover:text-blue-700 cursor-pointer"}>
                                {menu.name}
                            </NavLink>
                        ))}
                    </ul>
                </div>
                <div></div>
            </section>
        </div>
    );
};

export default NewPost;