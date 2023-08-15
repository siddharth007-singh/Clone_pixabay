import React from 'react';
import {BannerImage} from "../asset";

const HomeContainerStyle={
  width: "100%",

  ImageDiv:{
    width: "100vw",
    height: "420px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  }
}

const HomeContainer = () => {
  return <div style={HomeContainerStyle}>
    <div style={HomeContainerStyle.ImageDiv}>
      <img src={BannerImage} className=""/>
    </div>
  </div>
}

export default HomeContainer;