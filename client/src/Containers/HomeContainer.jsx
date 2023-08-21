import React from 'react';
import {BannerImage} from "../asset";

// const HomeContainerStyle={
//
// }

const HomeContainer = () => {
  return <div className="w-screen h-auto flex flex-col items-center justify-center relative">
    <div className="w-screen h-420 flex items-center justify-center relative">
      <img src={BannerImage} className="object-cover" alt="" style={{width:"1920px", height:"440px"}}/>
    </div>
  </div>
}

export default HomeContainer;