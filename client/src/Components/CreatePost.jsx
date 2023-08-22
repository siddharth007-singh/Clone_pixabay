import React from "react";

const CreatePost = ()=>{

    const CreatePostStyle={
        MainSection:{
            width:"100%",
            height:"auto",
            display:"flex",
            alignItems:"center",
            justifyContent:"flex-start",
            flexDirection:"column",
            gap:"1rem",
        },
        InputStyle:{
            width: "100%",
            paddingLeft: "1rem",
            paddingRight: "1rem",
            paddingTop: "0.75rem",
            paddingBottom: "0.75rem",
            borderRadius: "0.375rem",
            borderWidth: "1px",
            borderColor: "rgb(229 231 235)",
            boxShadow: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
            shadowColor:"inset 0 2px 4px 0",
        }

    }

    return(
        <div style={CreatePostStyle.MainSection}>
            {/*Alert Notificstion*/}
            {/*title*/}
            <input type="text" placeholder="Your Post Title Here" style={CreatePostStyle.InputStyle}/>
            {/*category slider*/}
            {/*file uploade*/}
            {/*keyword*/}
            {/*description*/}
        </div>
    );
}
export default  CreatePost;