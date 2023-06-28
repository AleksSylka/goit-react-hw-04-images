import { ImageGalleryItem } from "./ImageGalleryItem/ImageGalleryItem";
import { GalleryList } from "./ImageGallery.styled.jsx";
import React from "react";


export const ImageGallery = ({data}) => {
    return (
        <>
            <GalleryList>
                {data.map(({id, webformatURL, tags}) => (
                    <ImageGalleryItem key={id}
                        webformatURL={webformatURL}
                        tags={tags}  
                    >   
                    </ImageGalleryItem>
                ))}     
            </GalleryList>
                
        </>)

}