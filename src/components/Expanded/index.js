import React, { memo, useEffect, useState } from 'react';
import './Expanded.scss';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from '../../axios';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, subtractQuantity } from '../../redux/actions';
import CancelIcon from '@mui/icons-material/Cancel';
import { useRef } from 'react';
import { useEffectOnceWhen } from '../../common/useEffectOnceWhen.js/useEffectOncewhen';
const Expanded = () => {
    
    // const cookies = new Cookies();
    // const navigate = useNavigate();
    // const [userId, setUserId] = useState();
    // // const { id } = useParams();

    // const [displayData, setDisplayData] = useState({});

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

    // const {id} = useParams();

    // useEffect(()=>{
    //     if(userId){
    //         axios.get(`/api/listing/get-all?userId=${userId}&offerTitle=${id}`
    //         ).then(res=>{
    //             setDisplayData(res.data.data[0]);
    //             console.log(res.data.data);
    //         }).catch(err=>{
    //             console.log(err,'err');
    //         });
    //     }
    // },[userId]);

    const [displayData, setDisplayData] = useState({});

    const cookies = new Cookies();
    const navigate = useNavigate();
    const [userId, setUserId] = useState();
    const [showAddIcon,setShowAddIcon]=useState(true)

    


    // function useEffectOnce(effect) {
    //   const effectFn = useRef(effect)
    //   const destroyFn = useRef()
    //   const effectCalled = useRef(false)
    //   const rendered = useRef(false)
    //   const [, refresh] = useState(0)
    
    //   if (effectCalled.current) {
    //     rendered.current = true
    //   }
    
    //   useEffect(() => {
    //     if (!effectCalled.current) {
    //       destroyFn.current = effectFn.current()
    //       effectCalled.current = true
    //     }
    
    //     refresh(1)
    
    //     return () => {
    //       if (rendered.current === false) return
    //       if (destroyFn.current) destroyFn.current()
    //     }
    //   }, [])
    // }


    useEffectOnceWhen(() => {
   
      const auth = cookies.get("auth-token");
      if (!auth) {
        navigate("/sign-in");
      }
    

        axios
          .post(
            "/api/user/get-user-by-token",
            {},
            {
              headers: {
                Authorization: "Bearer " + auth,
              },
            }
          )
          .then((res) => {
            if (!res.data.success) {
              navigate("/sign-in");
            }
            setUserId(res.data.user._id);
            // console.log("first")
          })
          .catch((err) => {
            // console.log(err, "err");
            navigate("/sign-in");
          });
    
    },[]);
  
    const { id } = useParams();
  
    useEffect(() => {
      if (userId) {
        axios
          .get(`/api/listing/get-all?userId=${userId}&offerTitle=${id}`)
          .then((res) => {
            setDisplayData(res.data.data[0]);
            // console.log(res.data.data);
          })
          .catch((err) => {
            console.log(err, "err");
          });
      }
    },[userId,id]);
    const[ids,setId]=useState()
    const cartData=useSelector((state)=>state?.cart?.products)
    var cartDataId=cartData.map((el)=>el?.id)
    const dispatch = useDispatch();
    console.log(cartDataId,"cartDataId")
    console.log(displayData,"displayData")
    console.log(cartDataId.includes(displayData?._id),"displayData")
    const handleAddToCart = () => {
      const {_id,details,image,price}=displayData
      if(cartDataId?.includes(ids)){
        alert("Already added to the cart")
      }else{
      const payload = { id:_id, name:displayData?.user?.fullName, image, price, quantity: 1 };
      dispatch(addToCart(payload));
      setShowAddIcon(false)
      setId(_id)

      }
    };

    const handleRemoveFromCart = () => {
      const {name,_id,details,image,price}=displayData
      
      dispatch(subtractQuantity({id: _id, quantity: 1 }));
      setShowAddIcon(true)
    };
    if(displayData){
        return (
            <div className='expanded'>
                <div className='back'>
                    <span><ArrowBackIcon/></span>
                    <span onClick={()=>navigate('/')}>Continue Shopping</span>
                </div>
                <div className='mainExp'>
                    <div className='left'>
                        <div className='headExp'>
                            <span className='image'></span>
                            <span>{displayData.offerTitle}</span>
                        </div>
                        <span className='data'>Todayq News is an online Cryptocurrency News, Analysis & Blockchain platform focused on covering daily happenings in the cryptocurrency and blockchain space. The website is presenting the latest developments from the market, offering a clear view of the performance and dynamics of Blockchain, Bitcoin, Ethereum, and other cryptocurrency projects.</span>
                        <div className='price'>
                            <span className='amount'>{displayData?.price?`$${displayData?.price}`:"$200"}</span>
                            <span onClick={!(cartDataId?.includes(displayData?._id))?handleAddToCart:handleRemoveFromCart}>{!(cartDataId?.includes(displayData?._id))?<AddCircleOutlineIcon/>:<CancelIcon/>}</span>
                        </div>
                    </div>
                    <div className='right'>
                        <div className='row'>
                            <span className='head'>Website</span>
                            <span className='data'>{displayData.websiteLink}</span>
                        </div>
                        <div className='row'>
                            <span className='head'>Visitors</span>
                            <span className='data'> {displayData?.visitors?displayData?.visitors:"Visitors"}</span>
                        </div>
                        <div className='row'>
                            <span className='head'>Twitter</span>
                            <span className='data'>{displayData.twitter}</span>
                        </div>
                        <div className='row'>
                            <span className='head'>Facebook</span>
                            <span className='data'>{displayData.facebook}</span>
                        </div>
                        <div className='row'>
                            <span className='head'>LinkedIn</span>
                            <span className='data'>{displayData.linkedin}</span>
                        </div>
                        <div className='row'>
                            <span className='head'>Do-Follow Links</span>
                            <span className='data'>{displayData.doFollowLinkAllowed ? 'true' : 'false'}</span>
                        </div>
                        <div className='row'>
                            <span className='head'>No-Follow Links</span>
                            <span className='data'>{displayData.noFollowLinkAllowed ? 'true' : 'false'}</span>
                        </div>
                        <div className='row'>
                            <span className='head'>Google news</span>
                            <span className='data'>{displayData.googleNews}</span>
                        </div>
                        <div className='row'>
                            <span className='head'>Indexed Article</span>
                            <span className='data'>{displayData.indexedArticle}</span>
                        </div>
                        <div >
                            <span className='head'>Social Share</span>
                            <span className='data'>{displayData.socialShare}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (<h2>No Data Found</h2>)
}

export default memo(Expanded);