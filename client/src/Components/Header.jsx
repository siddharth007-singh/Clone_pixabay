import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import {Log} from "../asset";
import {FcGoogle} from "react-icons/fc";

const HeaderStyle = {
    head:{
        position: "fixed",
        left:"20px",
        right:"20px",
        display:"flex",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex:50,
        transitionProperty: "all",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        transitionDuration: "300ms",
    },

    logo:{
        width: "10rem",
        height: "auto",
        objectFit: "contain",
        padding: "0.5rem",
    },

    beforeLogin:{
        position: "relative",
        cursor: "pointer",

        Img:{
            borderRadius: "9999px",
            width: "2.5rem",
            height: "2.5rem",
            objectFit: "cover",
        }
    },

    afterLogin:{
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        gap: "0.5rem",
        borderWidth: "1px",
        paddingLeft: "0.5rem",
        paddingRight: "0.5rem",
        paddingTop: "0.25rem",
        paddingBottom: "0.25rem",
        borderRadius: "0.375rem",
        cursor: "pointer",
        transitionProperty: "all",
        // transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transitionDuration: "150ms",

    },
}


const Header = () => {
    const [user, setUser] = useState(null);
    const[color, setColor] = useState(false);

    const changeColor = ()=>{
        if(typeof window!=="undefined"){
            if(window.scrollY>=1){
                setColor(true);
            }
            else{
                setColor(false);
            }
        }
    };

    if(typeof window!=="undefined"){
        window.addEventListener("scroll", changeColor);
    }

    return(
        <header style={HeaderStyle.head} className={`${color?'bg-white': 'bg-transparent'}`}
        >
            {/*Logo Section*/}
            <NavLink to={"/"}>
                <img
                    src={Log}
                    alt="Main Logo "
                    style={HeaderStyle.logo}
                />
            </NavLink>
            {/*UserProfile Section */}
            {user?(
                <>
                    <div style={HeaderStyle.beforeLogin}>
                        <img
                            src=""
                            style={HeaderStyle.beforeLogin.Img}
                            alt=""
                        />
                    </div>
                </>
            ):(
                <>
                    <div style={HeaderStyle.afterLogin}>
                        <FcGoogle/>
                        <p>Login</p>
                    </div>
                </>
            )}
        </header>
    );
};

export default Header;