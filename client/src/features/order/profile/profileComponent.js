

/***************Import external Modules****************** */
import React from 'react';


/***************Import Internal Modules****************** */
import styles from './profile.module.css';
import formStyles from '../../../components/pageTemplate/styles/form.module.css'; 
import basic from '../../../components/pageTemplate/styles/shaddowContainer.module.css'; 
import pageStyles from '../../../components/pageTemplate/styles/page.module.css'; 




const ProfileComponent = (props) => {

    //Get the Sharing Data 
    const { data, action } = props
    const { profileData } = data;
    const { handleOnChange, handleLogin } = action;

    const { userName, email } = profileData ?? {};

    return (
        <div className={` ${styles.contentWrapper}`}>


            <div>
                <div className={`${basic.section} ${pageStyles.yellowStyles} `}>
                    <span>Becoming member for express Checking out:  </span>
                    <button className={styles.login} onClick={handleLogin}>Login / Sign Up</button>
                </div>

                <h1>User Information</h1>
                <form className={formStyles.formWrapper}>
                    <div>
                        <label>User Name: </label>
                        <input name="userName" type="text" value={userName} onChange={handleOnChange} />
                    </div>
                    <div>
                        <label>Email: </label>
                        <input name="email" type="text" value={email} onChange={handleOnChange} />
                    </div>
                </form>
            </div>

        </div>
    )

};

export default ProfileComponent; 