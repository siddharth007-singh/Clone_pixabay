import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import {Logo} from "../asset";
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
        transitionDuration: "150ms",
        transitionDuration: "300ms",
    },

    logo:{
        width: "10rem",
        height: "auto",
        objectFit: "contain",
        padding: "0.5rem",
    },

    beforeLogin:{

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
    return(
        <header style={HeaderStyle.head}
        >
            {/*Logo Section*/}
            <NavLink to={"/"}>
                <img
                    src={Logo}
                    alt="Main Logo "
                    style={HeaderStyle.logo}
                />
            </NavLink>
            {/*UserProfile Section */}
            {user?(
                <>
                    <div className="relative cursor-pointer">
                        <img
                            src=""
                            className="rounded-full w-10 h-10 object-cover"
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