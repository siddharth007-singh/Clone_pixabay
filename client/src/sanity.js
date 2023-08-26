import {createClient} from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import {fetchDetailsQuery, fetchQuery} from "./utils/support";
import {v4 as uuidv4} from "uuid";

const clients = createClient({
    projectId: "s1n4ybp1",
    dataset: "production",
    apiVersion: "2023-05-23",
    // useCdn: true
    token: process.env.REACT_APP_SANITY_TOKEN
});

//Builder and url are help to extract the image and all
const builder = imageUrlBuilder(clients);
export const urlFor = (source)=>builder.image(source);


//Adding the user data
export const createNewUser = async (data)=>{
    const _doc={
        _id: data.uid,
        _type: "users",
        uid: data.uid,
        displayName: data.displayName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        photoURL: data.photoURL,
    };

    await clients.createIfNotExists(_doc).then(res=>{
       return res;
    });
};

export const uploadeAsset = async (asset)=>{
    let data;
    if(["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(asset.type)){
        data = await clients.assets.upload("image", asset, {
            contentType: asset.type,
            filename: asset.name,
        })
        return data;
    }
    else{
        data = await clients.assets.upload("file", asset, {
            contentType: asset.type,
            filename: asset.name,
        })
        return  data;
    }
};

export const deleteUploadeAsset = async (id)=>{
    let data = await clients.delete(id);
    return data;
};

export const SavePost = async(doc)=>{
    await clients.create(doc).then((res)=>{
        console.log("Save Doc : ", res);
        return res;
    })
};

export const fetchFeeds = ()=>{
    let data = clients.fetch(fetchQuery);
    return data;
};

export const deleteFeed= async (id)=>{
    let data = await clients.delete(id);
    return data;
};

export const addToCollection = async (id, uid)=>{
    await clients
        .patch(id)
        .setIfMissing({collections:[]})
        .insert("after", "collections[-1]",[
            {_key:uuidv4(), _type:"reference", _ref:uid},
        ])
        .commit();
};

export const fetchFeedsDetails = async (feedID)=>{
    let query = fetchDetailsQuery(feedID);
    if(query) {
        let data = await clients.fetch(query);
        return data;
    }
};

export const addToComments = async (id, uid, comment)=>{
    const doc= {
        _type:"comments",
        comment,
        users:{
            _type:"reference",
            _ref: uid,
        },
    };
    await clients.create(doc).then((com)=>{
        clients
            .patch(id)
            .setIfMissing({comments:[]})
            .insert("after", "comments[-1]", [
            {
                _key:uuidv4(),
                _type:"reference",
                _ref:com._id,
            },
        ])
            .commit()
            .then((res)=>{
                console.log(res);
            });
    });
}