import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Pagination,
  Select,
  TablePagination,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import React, { useEffect } from "react";
import { useState } from "react";
import SavedSearchIcon from "@mui/icons-material/SavedSearch";
import MarketPlaceCards from "./MarketPlaceCards";
import axios from "../../../axios";
import Cookies from "universal-cookie";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Usekey } from "../../../common/keyboardInteraction/KeyboardPress";
import CachedIcon from "@mui/icons-material/Cached";
import { ProgressWithLabel } from "../../../common/progressWithLabel/ProgressWithLabel";

import { StringParam, useQueryParam } from "use-query-params";
import { UserAuthentication } from "../../../common/userAuthentication/UserAuthentication";

import "../Marketplace.scss"
import { useEffectOnceWhen } from "../../../common/useEffectOnceWhen.js/useEffectOncewhen";
import { getUserByJwtToken } from "../../../redux/actions";
function MarketPlace(props) {
  const query = '';

  const [listingFilter, setListingFilter] = useState("pressRelease");
  const [offerFilter, setOfferFilter] = useState();

  //for getting current location from the react-router
  // const location = useLocation();
  // console.log(location.search);
  //
  // const params = new URLSearchParams(location.search);
  // const param1 = params.get("param1");
  // const param2 = params.get("param2");
  // console.log(param1);
  // console.log(params, "param");  
  // const [category, setCategory] = React.useState('press');
  // const [input, setInput] = useState(init);
  // const [categoryParam, setCategoryParam] = useQueryParam(
  //   'filterByCategory',
  //   StringParam
  // )
  const cookies = new Cookies();
  const navigate = useNavigate();

  const [marketList, setMarketList] = useState([]);

  const [userId, setUserId] = useState();
// console.log(marketList,"marketList")
  // const filteredData = marketList.filter((item) => {
  //   return item.offerTitle === param1 && item.listingCategory == param2;
  // });

  // console.log(query.get("name"), "jhdskjcn");
  // useEffect(() => {
  //   setMarketList(filteredData);
  // }, [param1, param2]);

const searchQuery=(searchQuery)=>{
  axios
  .get(`/api/listing/get-all?${searchQuery}`)
  .then((res) => {
    if (res.data.success) {
      setMarketList(res.data.data);
    }
    // console.log(res.data);
  })
  .catch((err) => {
    console.log(err, "err");
  });
}

  const getData = (lc, oc) => {
    let searchQuery = `userId=${userId}`;
    if(lc){
      searchQuery += `&listingCategory=${lc}`;
    }
    if(offerFilter){
      searchQuery += `&offerTitle=${oc}`;
    }
    axios
      .get(`/api/listing/get-all?${searchQuery}`)
      .then((res) => {
        if (res.data.success) {
          setMarketList(res.data.data);
        }
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };

  // useEffect(() => {
  //   const auth = cookies.get("auth-token");
  //   // console.log(auth);
  //   if (!auth) {
  //     navigate("/sign-in");
  //   }
  //   axios
  //     .post(
  //       "/api/user/get-user-by-token",
  //       {},
  //       {
  //         headers: {
  //           Authorization: "Bearer " + auth,
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       if (!res.data.success) {
  //         navigate("/sign-in");
  //       }
  //       setUserId(res.data.user._id);
  //       console.log(" marketplace")
  //     })
  //     .catch((err) => {
  //       console.log(err, "err");
  //       navigate("/sign-in");
  //     });
  //   // UserAuthentication();
  // }, [window.location.search,userId]);

  useEffectOnceWhen(()=>{
    const auth = cookies.get("auth-token");
      // console.log(auth);
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
          // console.log(" marketplace")
        })
        .catch((err) => {
          console.log(err, "err");
          navigate("/sign-in");
        });
    // getUserByJwtToken()
    searchQuery("pressRelease")
  },[])
useEffect(()=>{
  getUserByJwtToken()

},[])
  useEffect(()=>{
    if(!userId){
      return;

    };

    const { search } = window.location;
    let params = new URLSearchParams(search);

    let lc = params.get('listingCategory');
    let ot = params.get('offerTitle');

    if(lc){
      setListingFilter(lc);
    }
    if(ot){
      setOfferFilter(ot);
    };

    getData(lc, ot);
    
  }, [window.location.search, userId]);

  // useEffect(() => {
  //   if (userId) {
  //     getData();
  //   }
  // }, [userId]);

  //function to handle search
  const handleSearchKeys = (e) => {
    const { name, value } = e.target;

    // if (name === "offerTitle") {
    //   setInput({ offerTitle: value, listingCategory: "" });
    //   // setCategoryParam(e.target.value)
    // } else if (name === "listingCategory") {
    //   setInput({ listingCategory: value, offerTitle: "" });
    // }
    window.location.search = `listingCategory=${e.target.value}`;
    // axios
    //   .get(`/api/listing/get-all?${name}=${value}&userId=${userId}`)
    //   .then((res) => {
    //     if (res.data.success) {
    //       setMarketList(res.data.data);
    //     }
    //     console.log(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err, "err");
    //   });
  };

  // useEffect(() => {
  //   const listingCategory = query.get("listingCategory");
  //   const offerTitle = query.get("offerTitle");
  //   if (
  //     listingCategory === "pressRelease" ||
  //     listingCategory === "sponsoredArticle" ||
  //     listingCategory === "buttonAds" ||
  //     listingCategory === "bannerAds"
  //   ) {
  //     axios
  //       .get(
  //         `/api/listing/get-all?listingCategory=${listingCategory}&userId=${userId}`
  //       )
  //       .then((res) => {
  //         if (res.data.success) {
  //           setMarketList(res.data.data);
  //         }
  //         console.log(res.data, "jhdsjdh");
  //       })
  //       .catch((err) => {
  //         console.log(err, "err");
  //       });
  //   } 
  //   // else {
  //   //   axios
  //   //     .get(`/api/listing/get-all?offerTitle=${offerTitle}&userId=${userId}`)
  //   //     .then((res) => {
  //   //       if (res.data.success) {
  //   //         setMarketList(res.data.data);
  //   //       }
  //   //       console.log(res.data);
  //   //     })
  //   //     .catch((err) => {
  //   //       console.log(err, "err");
  //   //     });
  //   // }
  // }, []);
  
  const handleReset = () => {
    getData();
    // setInput(init);
  };
  //keyboard interaction
  // Usekey("Enter", handleSearchKeys);
  // Usekey("NumpadEnter", handleSearchKeys);

  //pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(9);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <div className="w-full p-4 mx-auto mt-20 bg-white rounded-xl  overflow-hidden ">
        <div className="md:flex lg:flex xs:flex w-full">
          <div className="p-5 md:w-3/12 lg:w-3/12 sm:w-full bg-[#F8F8F8]">
            <Grid container spacing={2}>
              <Grid item xs={12} md={12} sx={{ marginLeft: "1em" }}>
                <p
                  className="sm:invisible md:visible"
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginBottom: "16px",
                  }}
                >
                  Search offerTitle
                </p>
                <FormControl sx={{ width: "98%" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Enter publisher name
                  </InputLabel>

                  <OutlinedInput
                    size="small"
                    fullWidth
                    sx={{ p: "10px" }}
                    id="outlined-basic"
                    name="offerTitle"
                    value={offerFilter}
                    onChange={handleSearchKeys}
                    label="Enter publisher name"
                    variant="outlined"
                    endAdornment={
                      <InputAdornment position="start">
                        <IconButton onClick={handleSearchKeys} edge="end">
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              <Grid
                xs={12}
                md={12}
                sx={{ marginLeft: "2em", marginTop: "1em" }}
              >
                <p
                  className="sm:invisible md:visible"
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginBottom: "16px",
                  }}
                >
                  Choose Category
                </p>

                {/* <Box sx={{ minWidth: 220 }}>
                  <FormControl sx={{ width: "98%" }} size="small">
                    <InputLabel id="demo-simple-select-label">
                      Listing Category
                    </InputLabel>
                    <Select
                      sx={{ padding: "10px" }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={listingFilter}
                      name="listingCategory"
                      label="Listing Category"
                      onChange={handleSearchKeys}
                    >
                      <MenuItem value={"pressRelease"}>Press Release</MenuItem>
                      <MenuItem value={"sponsoredArticle"}>Sponsored Articles</MenuItem>
                      <MenuItem value={"buttonAds"}>Button Ads</MenuItem>
                      <MenuItem value={"bannerAds"}>Banner Ads</MenuItem>
                    </Select>
                  </FormControl>
                </Box> */}
                 <div className='marketplace'>
            <div className='panels'>
                <div className='mpLeft'>
                  <div className='publishers'>
                        {/* <span>Choose Category</span> */}
                        <div className='option'>
                            <label htmlFor='pressRelease'>Press Release</label>
                            <input type='radio' name='category' id='pressRelease' value='pressRelease' 
                checked={listingFilter === "pressRelease"}
                      onChange={handleSearchKeys}
                            
                            />
                        </div>
                        <div className='option'>
                            <label htmlFor='sponsoredArticles'>Sponsored Articles</label>
                            <input type='radio' name='category' id='sponsoredArticle' 
                checked={listingFilter === "sponsoredArticle"}
                      onChange={handleSearchKeys}
                            
                            value='sponsoredArticle' />
                        </div>
                        <div className='option'>
                            <label htmlFor='button'>Button Ads</label>
                            <input type='radio'
                                            checked={listingFilter === "buttonAds"}
                                            onChange={handleSearchKeys}
                            name='category' id='button' value='buttonAds' />
                        </div>
                        <div className='option'>
                            <label htmlFor='banner'>Banner Ads</label>
                            <input type='radio' name='category'
                                            checked={listingFilter === "bannerAds"}
                                            onChange={handleSearchKeys}
                            id='banner' value='bannerAds' />
                        </div>
                        {/* <div className='option'>
                            {/* <label htmlFor='bannerAds'>Banner Ads</label> */}
                            {/* <input type='radio' name='category' id='bannerAds' value='bannerAds' /> */}
                        {/* </div> */}
                    </div>
                    </div>
                    </div>
                    </div>
              </Grid>
            </Grid>
          </div>
          <div className="p-3 md:w-8/12 lg:w-8/12 sm:w-full place-content-center md:mx-20 ">
            <Grid container spacing={2}>
              {/* <Grid sx={{textAlign:"center"}} item xs={12} md={12}>
                <Link to="/add-listing">
                
              <Button  variant="contained">
ADD
                </Button>
                </Link>
              </Grid> */}

              {marketList
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((el) => (
                  <Grid item xs={12} md={4}>
                    <MarketPlaceCards
                      data={el}
                      name={el?.user?.fullName}
                      details={"View Details"}
                      price={el?.price}
                    />
                  </Grid>
                ))}
              {marketList?.length === 0 ? (
                // <div
                //   style={{
                //     cursor: "pointer",
                //   }}
                //   onClick={handleReset}
                // >
                  <h1>No Data Found</h1>
                //   <ProgressWithLabel />
                //   <CachedIcon />
                // </div>
              ) : null}
              {marketList.length > 9 ? (
                <Grid item xs={12} md={12}>
                  <TablePagination
                    rowsPerPageOptions={[9, 18, 27, 36]}
                    component="div"
                    count={marketList?.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Grid>
              ) : null}
            </Grid>
          </div>
        </div>
      </div>
    </>
  );
}

export default MarketPlace;
