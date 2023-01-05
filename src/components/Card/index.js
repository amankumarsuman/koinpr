import React from 'react';

import './Card.scss';
import { useNavigate } from 'react-router-dom';
import Actions from '../../actions/cartActions';
import { connect } from 'react-redux';

const Card = (props) => {

    const navigate = useNavigate();
    // console.log('ab',Actions.addToCart );

    return (
        <div onClick={()=>navigate(`/expand/${props.name}`)} className='card'>
            <div className='cardHead'>
                <span className='image'></span>
                <span className='name'>{props.name}</span>
            </div>
            <div className='cardBottom'>
                <div className='cardLeft'>
                    <span className='details'>View Details</span>
                    <span className='price'>{`$${props.price}`}</span>
                </div>
                <div className='cardRight'>
                    <span className='plusSign' onClick={(e)=>{e.stopPropagation(); props.addToCart(props.id)}}>+</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(Card);