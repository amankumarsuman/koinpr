import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from '../../../axios';
import './profileAdvertiserMobile.scss';

const ProfileAdvertiserMobile = () => {

    const cookies = new Cookies();
    const navigate = useNavigate();

    const [isCompany, setIsCompany] = useState(false);
    const [step, setStep] = useState(1);
    const [userId, setUserId] = useState();

    const [formState, setFormState] = useState({}); 

    // useEffect(()=>{
    //     const auth = cookies.get('auth-token');
    //     // if(!auth){
    //     //     navigate('/sign-in');
    //     // }
    //     axios.post('/api/user/get-user-by-token',{},{
    //         headers:{
    //             Authorization: 'Bearer ' + auth
    //         }
    //     }).then(res=>{
    //         if(!res.data.success){
    //             navigate('/sign-in');
    //         }
    //         setUserId(res.data.user._id);
    //     }).catch(err=>{
    //         console.log(err,'err');
    //         navigate('/sign-in');
    //     })
    // }, []);

    const companyCheckboxHandler = () =>{
        setIsCompany(!isCompany);
    };

    const changeHandler = (e)=>{
        const {name, value} = e.target;
        setFormState({...formState, [name]: value});
    };

    const step1Handler = () =>{
        // console.log(formState);
        // axios.patch('/api/user/update',{},{
        //     headers:{
        //         Authorization: 'Bearer ' + auth
        //     }
        // }).then(res=>{
        //     if(!res.data.success){
        //         navigate('/sign-in');
        //     }
        //     setUserId(res.data.user._id);
        // }).catch(err=>{
        //     console.log(err,'err');
        //     navigate('/sign-in');
        // })
    };

    return (
        <div className='Profile'>
            <div className='pLeft'>
                <h2 className='lHead'>Account Details</h2>
                <p className='cStatus'>Current Status : <span className='status'>Not Verified</span></p>
                <div className='inputs mt40'>
                    <div className='wInput'>
                        <label>Identification Details</label>
                        <input type='radio' name='a' checked={step===1} ></input>
                    </div>
                    <div className='wInput mt20'>
                        <label>Upload Documents</label>
                        <input type='radio' name='a' checked={step===2}></input>
                    </div>
                    {isCompany && (
                        <div className='wInput mt20'>
                            <label>Withdrawl Options</label>
                            <input type='radio' name='a' checked={step===3}></input>
                        </div>
                    )}
                </div>
            </div>
            <div className='pRight'>
                {step ===1 && (
                    <>
                        <h2 className='pHeading'>Identification Details</h2>
                        <p className='cStatus mt15'>Your details will be used for billing and generating invoice</p>
                        <div className='inputs'>
                            <div className='wInput mt40'>
                                <label htmlFor='represent'>I represent a company</label>
                                <input className='.chHeight' id='represent' type='checkbox' name='representCompany' checked={isCompany} onChange={companyCheckboxHandler}></input>
                            </div>
                        </div>
                        <p className='cStatus mt40'>Enter your details</p>
                        { isCompany ? (
                            <div className='inputs df mt25'>
                                <input onChange={changeHandler} className='wInput' placeholder='Company Name' name="companyName"/>
                                <input onChange={changeHandler} className='wInput' placeholder='Company Identification No.' name="companyId"/>
                            </div>
                        ) :
                        (
                            <div className='inputs df mt25'>
                                <input onChange={changeHandler} className='wInput' placeholder='First Name' name="firstName"/>
                                <input onChange={changeHandler} className='wInput' placeholder='Last Name' name="lastName"/>
                            </div>
                        )}
                        <div className='inputs df mt25'>
                            <input className='wInput' placeholder='Country' onChange={changeHandler} name="country"/>
                            <input className='wInput' placeholder='Address' onChange={changeHandler} name="walletAddress"/>
                        </div>
                        <button type='button' className='pButton mt40' onClick={step1Handler}>Proceed</button>
                        <p className='pBottom'>Please make sure that the details you enter here matches the documents you will be providing for verification.</p>
                    </>
                )}
                {step===2 && (
                    <>
                        <h2 className='pHeading'>Upload Documents</h2>
                        <p className='cStatus mt15'>Please upload the required documents below in order to validate your Identification Details.</p>
                        <div className='inputs'>
                            <div className='wInput mt40'>
                                <label>Choose Document Type</label>
                            </div>
                            <div className='wInput mt40'>
                                <input type='file' />
                            </div>
                        </div>
                        <p className='pBottom'>Max file size 5 MB. Supported file types: png, jpeg, pdf, doc.</p>
                        <button type='button' className='pButton mt40'>Proceed</button>
                    </>
                )}
                {step ===3 && (
                    <>
                        <h2 className='pHeading'>Withdrawal Option</h2>
                        <p className='cStatus mt15'>Select Your Withdrawal Method</p>
                        <div className='inputs'>
                        <div className='inputs df mt25'>
                            <input type='text' className='wInput' placeholder='Bank Transfer/SWIFT'></input>
                            <input type='text' className='wInput' placeholder='Cryptocurrency'></input>
                        </div>
                        </div>
                        <p className='cStatus mt40'>Enter your bank details</p>
                        <div className='inputs df mt25'>
                                <input type='text' placeholder='Beneficiary Name' className='wInput'></input>
                                <input type='text' placeholder='IBAN/Account No.' className='wInput'></input>
                        </div>
                        <div className='inputs df mt25'>
                                <input type='text' placeholder='SWIFT Code' className='wInput'></input>
                                <input type='text' placeholder='Bank Name' className='wInput'></input>
                        </div>
                        <button type='button' className='pButton mt40'>Proceed</button>
                        <p className='pBottom'>We will automatically generate a withdrawal request at the end of every month depending on your selected preference. </p>
                    </>
                )}
            </div>
        </div>
    )
}

export default ProfileAdvertiserMobile