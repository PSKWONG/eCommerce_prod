/***************Import External Modules****************** */
import { useState, useEffect } from 'react';

/***************Import Internal Modules****************** */
import menuItems from '../data/menuItems.json';
import responsiveGuide from '../data/responsiveGuide.json';


/*
This hook is used to control the menu item distrisbution according to
the Windows Size

## Background: 
This app has following types of menu 
- Functional Menu 
- Navigational Menu 
- Mobile Menu 
- Floating Menu 

## Logic: 
- Get the information of windows Size 
- Get the information of Responsive Size Guide 
- Get the information of Menu Items 

### Conditions
- Mobile size: 
    * Mobile Menu : Item types ( 0, 2 )
    * Navigational Menu : Null    
    * Floating Menu : Item types ( 1 )
    * Functional Menu: Null
- Tablet Size: 
    * Mobile Menu : Null 
    * Floating Menu : Item types ( 1 )
    * Navigational Menu : Item types ( 0 )
    * Functional Menu: Item types ( 2 )
- Desktop Size: 
    * Mobile Menu : Null 
    * Floating Menu : Null
    * Navigational Menu : Item types ( 0,1 )
    * Functional Menu: Item types ( 2 )

*/


const useMenuController = (windowSize) => {

    //States for Menu Item Control 
    const [pageWidth, setPageWidth] = useState(window.innerWidth);
    const [navMenuItems, setNavMenuItems] = useState([]);
    const [funcMenuItems, setFuncMenuItems] = useState([]);
    const [mobileMenuItems, setMobileMenuItems] = useState([]);
    const [floatingNavMenuItems, setFloatingNavMenuItems] = useState([]);
    const [isFloatingMenuVisible, setIsFloatingMenuVisible] = useState(false);


    //Response to change of window size 
    useEffect(() => {
        if (windowSize) {
            setPageWidth(windowSize);
        }
    }, [windowSize])

    //Menu Items distribution 
    useEffect(() => {
        if (pageWidth <= responsiveGuide['mobile']) {
            setMobileMenuItems(
                menuItems
                    .filter((item) => item.type === 0 || item.type === 2)
                    .sort((a, b) => a["position"] - b["position"])
            );

            setFloatingNavMenuItems(
                menuItems
                    .filter((item) => item.type === 1)
                    .sort((a, b) => a["position"] - b["position"])
            );


            setNavMenuItems([]);
            setFuncMenuItems([]);


        } else if (pageWidth <= responsiveGuide['tablet']) {

            setNavMenuItems(
                menuItems
                    .filter((item) => item.type === 0)
                    .sort((a, b) => a["position"] - b["position"])
            );

            setFuncMenuItems(
                menuItems
                    .filter((item) =>  item.type === 2)
                    .sort((a, b) => a["position"] - b["position"])
            );

            setFloatingNavMenuItems(
                menuItems
                    .filter((item) => item.type === 1 )
                    .sort((a, b) => a["position"] - b["position"])
            );

            setMobileMenuItems([]);

        } else {

            setMobileMenuItems([]);
            setFloatingNavMenuItems([]); 

            setNavMenuItems(
                menuItems
                    .filter((item) => item.type === 0 || item.type === 1)
                    .sort((a, b) => a["position"] - b["position"])
            );

            setFuncMenuItems(
                menuItems
                    .filter((item) => item.type === 2)
                    .sort((a, b) => a["position"] - b["position"])
            );

        }
    }, [pageWidth])

    //Set Floating Menu Actions
    const handleShowingFloatingMenu = (event) => {
        event.preventDefault();
        if(isFloatingMenuVisible){
            setIsFloatingMenuVisible(false);
        }else{
            setIsFloatingMenuVisible(true);
        }
        
    }


    //Information to be exported 

    return {
        data: {
            navMenuItems,
            funcMenuItems,
            mobileMenuItems,
            floatingNavMenuItems
        },
        actions: {
            handleShowingFloatingMenu,
        }
    }

}

export default useMenuController; 