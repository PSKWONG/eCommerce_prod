/***************Import external Modules****************** */
import React from 'react';
import { Form } from 'react-router-dom';

/***************Import Internal Modules****************** */
import formStyles from '../../../components/pageTemplate/styles/form.module.css';
import boxStyles from '../../../components/pageTemplate/styles/shaddowContainer.module.css';
import pageStyles from '../../../components/pageTemplate/styles/page.module.css';
import styles from './Profile.module.css';
import IconComponent from '../../../components/app/iconSet/IconComponents'; 



const ProfileComponent = (props) => {

    //Exxtract data from container
    const { data, actions } = props?.control ?? {};
    const { status, userInfo, error } = data ?? {};
    const { isEditable, isSubmitting } = status ?? {};
    const { errMessage, errStatus } = error ?? {};



    //Error Message Rendering 
    const errorContent = (errMessage ?? []).map((msg, index) => {
        return <span key={index}>{msg}</span>
    })

    return (

        <div>

            <h1>Profile</h1>


            <Form method="post" className={` ${formStyles.formWrapper} `}>

                <div>
                    <label><strong>User Name: </strong></label>
                    {
                        (userInfo?.user_name ?? null) && <label> {userInfo?.user_name} </label>
                    }

                </div>

                {(isEditable &&
                    <div className={ `${boxStyles.section} ${pageStyles.yellowStyles}` }>
                        <label>New User Name: </label>
                        <input name="username" type="text" />
                    </div>
                )}
                <div>
                    <label><strong> Email: </strong></label>
                    {
                        (userInfo?.email ?? null) && <label> {userInfo?.email } </label>
                    }
                </div>

                {(isEditable &&
                    <>
                        <div className={`${boxStyles.section} ${pageStyles.yellowStyles} `}>
                            <label>New Email: </label>
                            <input name="email" type="text" />
                        </div>

                        <div className={`${boxStyles.section} ${pageStyles.yellowStyles} ${styles.passwordWrapper}`} >
                            <div >
                                <label>New Password: </label>
                                <input name="password" type='password' />
                            </div>
                            <div >
                                <label>Confirm password: </label>
                                <input name="passwordCheck" type='password' />
                            </div>
                        </div>
                    </>
                )}

                {
                    errStatus &&
                    <div className={`${boxStyles.section} ${pageStyles.orangeStyles}`}>
                        {errorContent}
                    </div>
                }

                {!isEditable &&
                    <button onClick={actions.handleEditability} > I want to update my porfile </button>
                }

                {isEditable &&
                    <button onClick={actions.handleEditability} >Cancel </button>
                }

                {isEditable &&
                    <button type="submit"  >
                        {
                            isSubmitting && <IconComponent data={'loading'} />
                        }
                        {
                            !isSubmitting && 'Submit the change'
                        }


                    </button>
                }


            </Form>


        </div>
    )
}

export default ProfileComponent; 