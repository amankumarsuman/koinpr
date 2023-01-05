import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import './Marketplace.scss'
import Card from '../Card';
import axios from '../../axios';
import Actions from '../../actions/cartActions';
import { Button } from '@mui/material';


const Marketplace = (addToCart) => {

    const cookies = new Cookies();
    const navigate = useNavigate();

    const [marketList, setMarketList] = useState([]);
    const [searchVal, setSearchVal] = useState('');
    const [userId, setUserId] = useState();

    useEffect(()=>{
        const auth = cookies.get('auth-token');
        if(!auth){
            navigate('/sign-in');
        }
        axios.post('/api/user/get-user-by-token',{},{
            headers:{
                Authorization: 'Bearer ' + auth
            }
        }).then(res=>{
            if(!res.data.success){
                navigate('/sign-in');
            }
            setUserId(res.data.user._id);
        }).catch(err=>{
            console.log(err,'err');
            navigate('/sign-in');
        })
    }, [userId]);

    useEffect(()=>{
        if(userId){
            axios.get(`/api/listing/get-all?userId=635c60cce1f9a1c40b03bef3`
        ).then(res=>{
            if(res.data.success){
                setMarketList(res.data.data);
            }
            // console.log(res.data);
        }).catch(err=>{
            console.log(err,'err');
        })
        }
    },[userId]);

    return (
        <div className='marketplace'>
            <div className='panels'>
                <div className='mpLeft'>
                    <div className='publishers'>
                        <span>Search</span>
                        <input type='search' name='psearch' placeholder='Enter publisher name' value={searchVal} onChange={(e)=>{setSearchVal(e.target.value)}}/>
                    </div>
                    <div className='publishers'>
                        <span>Choose Category</span>
                        <div className='option'>
                            <label htmlFor='pressRelease'>Press Release</label>
                            <input type='radio' name='category' id='pressRelease' value='pressRelease' />
                        </div>
                        <div className='option'>
                            <label htmlFor='sponsoredArticles'>Sponsored Articles</label>
                            <input type='radio' name='category' id='sponsoredArticles' value='sponsoredArticles' />
                        </div>
                        <div className='option'>
                            <label htmlFor='button'>Button Ads</label>
                            <input type='radio' name='category' id='button' value='buttonAds' />
                        </div>
                        <div className='option'>
                            <label htmlFor='banner'>Banner Ads</label>
                            <input type='radio' name='category' id='banner' value='bannerAds' />
                        </div>
                        {/* <div className='option'>
                            {/* <label htmlFor='bannerAds'>Banner Ads</label> */}
                            {/* <input type='radio' name='category' id='bannerAds' value='bannerAds' /> */}
                        {/* </div> */}
                    </div>
                </div>
                {/* <div className='mpRight'>
                    <div className='row'>
                        <Card name='Todayq News' price='500'/>
                        <Card name='Amreek' price='Infinity'/>
                        <Card name='Todayq News' price='500'/>
                    </div>
                    <div className='row'>
                        <Card name='Todayq News' price='500'/>
                        <Card name='Todayq News' price='500'/>
                        <Card name='Todayq News' price='500'/>
                    </div>
                    <div className='row'>
                        <Card name='Todayq News' price='500'/>
                        <Card name='Todayq News' price='500'/>
                        <Card name='Todayq News' price='500'/>
                    </div>
                </div> */}
                <div className='mpRight'>
                    <div style={{border:"1px solid red !important"}}>
                        <Button variant='contained'>
Add
                        </Button>
                    </div>
                {marketList.map(item=>(
                    <Card name={item.offerTitle} price='500' id={item._id} />
                ))}
                    {/* <Card name='Todayq News' price='500'/>
                    <Card name='Amreek' price='Infinity'/>
                    <Card name='Todayq News' price='500'/>
                    <Card name='Todayq News' price='500'/>
                    <Card name='Todayq News' price='500'/>
                    <Card name='Todayq News' price='500'/>
                    <Card name='Todayq News' price='500'/>
                    <Card name='Todayq News' price='500'/>
                    <Card name='Todayq News' price='500'/> */}
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        addToCart : (id) =>  dispatch(Actions.addToCart(id))
    };
};

const mapStateToProps = state =>{
    return {
        cart: state.cart 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Marketplace);