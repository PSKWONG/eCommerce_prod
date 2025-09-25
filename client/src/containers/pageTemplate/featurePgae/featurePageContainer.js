/*
This template is used to put the content into a Feature Page Template.
## Input: 
- content : 
    * It should be a REACT function which return a JSX element
- backgroundImage : 
    * Set the image as the banner's background image

*/

/***************Import external Modules****************** */
import React, { useState, useEffect } from 'react';

/***************Import Internal Modules****************** */
import PageTemplate from '../../../components/pageTemplate/featurePage/FeaturePageComponent';

const FeaturePageContainer = ({ children, banner }) => {

    const { bkgImage, content } = banner ?? {};

    const [bannerContent, setBannerContent] = useState();

    //Update banner content
    useEffect(() => {

        //Check if the input is a REACT function 
        if (typeof content === 'function') {

            try {
                const element = React.createElement(content);
                setBannerContent(element);
                return;

            } catch (err) {
                //Internal Log
                console.log(
                    `Error in creating Banner Conctent. The content is invalid. 
                        * Input content: ${content}
                    `
                )
                return;
            }

        }

    }, [content])

    //Export Banner Control 
    const bannerControl = {
        bkgImage, 
        bannerContent
    }

    return (
        <PageTemplate bannerControl={bannerControl}>
            {children}
        </PageTemplate>
    )
}

export default FeaturePageContainer; 