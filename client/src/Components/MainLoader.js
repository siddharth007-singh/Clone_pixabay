import React from 'react';
import {Loader} from "../asset";
const MainLoader=()=>{

    const mainLoaderStyle = {
        LoadStyle:{
            position: "fixed",
            top:"15rem",
            display:"flex",
            justifyItems:"center",
            justifyContent: "center",
            alignItems: "center",
            backdropBlur: "blur(12px)",
            backdropFilter:"var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale)",
        }
    }

    return (
        <div style={mainLoaderStyle.LoadStyle}>
            <img src={Loader} alt="Load"/>
        </div>
    );
};

export default MainLoader;