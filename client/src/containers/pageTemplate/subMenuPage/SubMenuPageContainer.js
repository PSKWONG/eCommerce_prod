/*
This template is used to put the content into a SubMenu Page Template.
## Input: 
- SubMenu content : 
    * It should be a REACT function which return a JSX element
*/


/***************Import external Modules****************** */
import React, { useState, useEffect } from 'react';

/***************Import Internal Modules****************** */
import PageTemplate from '../../../components/pageTemplate/subMenuPage/SubMenuPageComponent';


const SubMenuPageContainer = (props) => {

    //Extract content from props
    const { subMenu } = props

    //States for submenu component
    const [contentDisplayed, setContentDisplayed] = useState();

    //Update visible content
    useEffect(() => {

        const defaultContent = <></>;

        if (typeof subMenu === 'function') {

            try {
                const element = React.createElement(subMenu);
                setContentDisplayed(element);
                return;

            } catch (err) {
                //Internal Log
                console.log(
                    `Error in showing Portal Conctent. The content is invalid. 
                            * Input content: ${subMenu}
                            `
                )
                setContentDisplayed(defaultContent);
                return;
            }

        } else {
            setContentDisplayed(defaultContent);
            return;
        }

    }, [subMenu]);


    return (
        <PageTemplate subMenu={contentDisplayed} >
            {props.children}
        </PageTemplate>
    )


}

export default SubMenuPageContainer; 