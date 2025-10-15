

/***************Import external Modules****************** */
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

/***************Import Internal Modules****************** */
import dataChecking from '../middlewares/dataChecking';


const useDataChecker = (currentIndex) => {

    //Hook Action 
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const dataChecker = () => {

        dispatch(dataChecking({ currentIndex, navigate }));

    }

    return dataChecker; 

};

export default useDataChecker; 