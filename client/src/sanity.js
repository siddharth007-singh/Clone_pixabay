import {createClient} from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

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
}