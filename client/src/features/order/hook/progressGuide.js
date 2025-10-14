/*
Progress Guide is a effective when a path is changed 
Logic
1) Get the index of the selected path 
2) Get the latest progress checking from server 
3) Check the progress status of previous page of selected path
    a) If the status is true. The path is ready to navigate  
    b) If the status is false. The path is not ready to navigate. 
    Redirect to the last page with false. 
*/




/***************Import external Modules****************** */
import { useState, useEffect } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';



/***************Import Internal Modules****************** */
import orderProcess from '../data/menuItems.json';
import progresschecking from '../middlewares/progressChecking';
import { isOrderLoading, selectProgressChecking } from '../orderSlice';

const useProgressGuide = () => {

    //Hook Action 
    const dispatch = useDispatch();
    const navigate = useNavigate();


    //Get the path of page 
    const location = useLocation();

    console.log(`Return of Location, ${JSON.stringify(location, null, 2)}`);

    //Index of path 
    const [selectedIndex, setSelectedIndex] = useState(0);



    //Set Index of path 
    useEffect(() => {

        //Set the latest Index 
        const indexOfPath = orderProcess.findIndex((steps) => {
            return steps.path === location.pathname
        });

        setSelectedIndex(indexOfPath);

        //Get the latest progress index from server
        dispatch(progresschecking());

    }, [location, dispatch]);



    //Get the progress checking result from server 
    //const isLoading = useSelector(isOrderLoading, shallowEqual);
    const checkingResult = useSelector(selectProgressChecking, shallowEqual);


    useEffect(() => {

        //If slice is loading OR access the index page, skip the checking 
        if (selectedIndex === 0) {
            return;
        }

        //Get the progress checking of previous page 
        const isValidForNavigation = checkingResult[(selectedIndex - 1)];

        //If the previous is not ready to visit, user is redirected to the last page user stopped
        if (!isValidForNavigation) {
            const newIndex = orderProcess.indexOf(false)
            setSelectedIndex(newIndex);
            navigate(orderProcess[newIndex ?? 0].path);

        }


    }, [checkingResult, selectedIndex, navigate])

    //Export Data 
    return selectedIndex;

};

export default useProgressGuide; 