import { v4 as uuidv4 } from 'uuid';
import {FaCamera, FaFire, FaHome, FaPaintBrush, FaVideo} from "react-icons/fa";
export const subMenu=[
    {id: uuidv4(), name:"Media", slug:"my-media"},
    {id: uuidv4(), name:"Upload", slug:"upload"},
    {id: uuidv4(), name:"Statistics", slug:"statistics"},
    {id: uuidv4(), name:"Collections", slug:"collections"},
    {id: uuidv4(), name:"Followings", slug:"followings"},
    {id: uuidv4(), name:"Messages", slug:"messages"},
]

export const mainMenu=[
    {id: uuidv4(), name:"My media", slug:"my-media"},
    {id: uuidv4(), name:"Upload", slug:"upload"},
    {id: uuidv4(), name:"Upload", slug:"upload"},
    {id: uuidv4(), name:"Statistics", slug:"statistics"},
    {id: uuidv4(), name:"Collections", slug:"collections"},
    {id: uuidv4(), name:"Profile", slug:"profile"},
]


export const categoriesList=[
    {id: uuidv4(), name:"Nature"},
    {id: uuidv4(), name:"Photos"},
    {id: uuidv4(), name:"illustrations"},
    {id: uuidv4(), name:"Musics"},
    {id: uuidv4(), name:"Video"},
    {id: uuidv4(), name:"Gifs"},
    {id: uuidv4(), name:"Anime"},
    {id: uuidv4(), name:"Background"},
    {id: uuidv4(), name:"Sky"},
    {id: uuidv4(), name:"Money"},
    {id: uuidv4(), name:"Water"},
    {id: uuidv4(), name:"Cat"},
    {id: uuidv4(), name:"Baby"},
    {id: uuidv4(), name:"Dog"},
    {id: uuidv4(), name:"Food"},
    {id: uuidv4(), name:"Car"},
    {id: uuidv4(), name:"Flower"},
    {id: uuidv4(), name:"Articles"},
    {id: uuidv4(), name:"4K Wallpapers"},
    {id: uuidv4(), name:"Wallpapers"},
]

export const fetchQuery = `
*[_type=='post'] | order(_createAt desc) {
  _id,
  title,
  keywords,
  categories,
  otherMedia{
    asset->{
      url
    }
  },
  mainImage{
    asset->{
      url
    }
  },
  keywords,
  desc,
  _createdAt,
  users->{
    _id,
    displayName,
    photoURL,
  },
  collections[]->{
     _id,
    displayName,
    photoURL,
  },
  comments[]->{
    _id,
    comment,
    _createdAt,
    users->{
    _id,
    displayName,
    photoURL,
  }
  }
}
`;

export const fetchDetailsQuery = (feedId) => {
  const query = `*[_type == 'post' && _id == '${feedId}']   {
    _id,
    title,
    keywords,
    categories,
    otherMedia {
      asset -> {
        url
      }
    },
    mainImage {
      asset -> {
        url
      }
    },
    description,
    _createdAt,
    users -> {
      _id,
      displayName,
      photoURL
    },
    collections[] -> {
      _id,
      displayName,
      photoURL
    },
    comments[] -> {
      _id,
      comment,
      _createdAt,
      users -> {
      _id,
      displayName,
      photoURL
    }
    }
  }`;

  return query;
};


export const filterMenu=[
    {id:uuidv4(), to:"/", label:"Home", icon:FaHome},
    {id:uuidv4(), to:"/search/photos", label:"Photos", icon:FaCamera},
    {id:uuidv4(), to:"/search/illustration", label:"Illustrations", icon:FaPaintBrush},
    {id:uuidv4(), to:"/search/videos", label:"Videos", icon:FaVideo},
    {id:uuidv4(), to:"/search/gifs", label:"Gifs", icon:FaFire},
]

export const searchQuery = (searchTerm) =>{
  const query = `*[_type=='post' && title match '${searchTerm}*' || categories match '${searchTerm}*' || keywords match '${searchTerm}*'] {
    _id,
    title,
    keywords,
    categories,
    otherMedia{
      asset->{
        url
      }
    },
    mainImage{
      asset->{
        url
      }
    },
    keywords,
    desc,
    _createdAt,
    users->{
      _id,
      displayName,
      photoURL,
    },
    collections[]->{
       _id,
      displayName,
      photoURL,
    },
    comments[]->{
      _id,
      comment,
      _createdAt,
      users->{
      _id,
      displayName,
      photoURL,
    }
    }
  }`;
    return query;
}