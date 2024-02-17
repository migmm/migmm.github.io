import { useState, useEffect, useRef } from 'react';


/* 
* Custom hook for fading in images as they become visible in the viewport.
*/
const useImageFadeIn = ({ imagesNumber, interval }: any) => {
    /* 
    * State to track the visibility of each image.
    */
    const [imageVisibility, setImageVisibility] = useState(Array(imagesNumber).fill(false));

    /* 
    * Ref to hold references to the image elements.
    */
    const imgRefs = useRef<(HTMLImageElement | null)[]>(Array(imagesNumber).fill(null));

    /* 
    * Effect to handle the scroll event and fade in images as they become visible.
    */
    useEffect(() => {
        const handleScroll = () => {
            imgRefs.current.forEach((imgRef, index) => {
                if (imgRef && isElementInViewport(imgRef) && !imageVisibility[index]) {
                    setTimeout(() => {
                        setImageVisibility((prevVisibility) => {
                            const updatedVisibility = [...prevVisibility];
                            updatedVisibility[index] = true;
                            return updatedVisibility;
                        });
                    }, interval * index);
                }
            });
        };

        window.addEventListener('scroll', handleScroll);

        /* 
        * Clean-up function to remove event listener when component unmounts.
        */
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [imageVisibility, interval]);

    /* 
    * Function to check if an element is in the viewport.
    */
    const isElementInViewport = (el: HTMLImageElement) => {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    /* 
    * Return the imageVisibility state and imgRefs ref.
    */
    return { imageVisibility, imgRefs };
};


export default useImageFadeIn;
