/***************Import External Modules****************** */
import { useState, useEffect } from 'react';

/***************Import Internal Modules****************** */
import menuItems from '../data/menuItems.json';


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


const useMenuController = (pageLayout) => {

    //States for Menu Item Control 
    const [layout, setLayout] = useState('desktop');
    const [navMenuItems, setNavMenuItems] = useState([]);
    const [funcMenuItems, setFuncMenuItems] = useState([]);
    const [mobileMenuItems, setMobileMenuItems] = useState([]);
    const [floatingNavMenuItems, setFloatingNavMenuItems] = useState([]);


    //Response to change of window size 
    useEffect(() => {
            setLayout(pageLayout);
    }, [pageLayout])

    //Menu Items distribution 
    useEffect(() => {
        if (layout === 'mobile') {
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


        } else if (layout === 'tablet') {

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
    }, [layout])




    //Information to be exported 

    return {
        data: {
            navMenuItems,
            funcMenuItems,
            mobileMenuItems,
            floatingNavMenuItems
        },
        actions: {
        }
    }

}

export default useMenuController; 