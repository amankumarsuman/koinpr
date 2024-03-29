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
import SearchIcon from "@mui/icons-material/Search";
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

import "../Marketplace.scss";
import { useEffectOnceWhen } from "../../../common/useEffectOnceWhen.js/useEffectOncewhen";
import { getUserByJwtToken } from "../../../redux/actions";
import { LoadingForm } from "../../../common/loader/Loader";
import TabLevelLoader from "../../loader/Loader";
import ChangeEmailPopup from "../../popups/ChangeEmail";
function MarketPlace(props) {
  const query = "";

  const [listingFilter, setListingFilter] = useState("pressRelease");
  const [offerFilter, setOfferFilter] = useState();
  const [isLoading, setIsLoading] = useState(false);
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

  const [input, setInput] = useState("");
  // const [categoryParam, setCategoryParam] = useQueryParam(
  //   'filterByCategory',
  //   StringParam
  // )
  const inputData = input;
  const cookies = new Cookies();
  const navigate = useNavigate();

  const [marketList, setMarketList] = useState([]);

  const [userId, setUserId] = useState();
  const [user, setUser] = useState();
  const [isLoadings, setIsLoadings] = useState(true);
  console.log(user, "user");
  // console.log(marketList,"marketList")
  // const filteredData = marketList.filter((item) => {
  //   return item.offerTitle === param1 && item.listingCategory == param2;
  // });

  // console.log(query.get("name"), "jhdskjcn");
  // useEffect(() => {
  //   setMarketList(filteredData);
  // }, [param1, param2]);

  // var searchQuery = (searchQuerys) => {
  //   axios
  //     .get(`api/listing/get-all?${searchQuerys}`)
  //     .then((res) => {
  //       if (res.data.success) {
  //         setMarketList(res.data.data);
  //         setIsLoading(true);
  //       }
  //       // console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err, "err");
  //     });
  // };

  const getData = (lc, oc) => {
    // let searchQuery = `userId=${userId}`;
    let searchQuery;
    if (lc) {
      // searchQuery += `listingCategory=${lc}`;
      axios
        .get(`api/listing/get-all?listingCategory=${lc}`, {
          headers: {
            token: "koinpratodayqproductrsstoken",
          },
        })
        .then((res) => {
          if (res.data.success) {
            const verifiedListing = res?.data?.data.filter(
              (el) => el?.verifiedByAdmin === true
            );

            setMarketList(verifiedListing);
            setIsLoading(false);
            setIsLoadings(false);
          }
          // console.log(res.data);
        })
        .catch((err) => {
          console.log(err, "err");
        });
    } else if (oc) {
      // searchQuery += `&offerTitle=${oc}`;
      axios
        .get(`api/listing/get-all?offerTitle=${oc}`, {
          headers: {
            token: "koinpratodayqproductrsstoken",
          },
        })
        .then((res) => {
          if (res.data.success) {
            const verifiedListing = res?.data?.data.filter(
              (el) => el?.verifiedByAdmin === true
            );

            setMarketList(verifiedListing);

            setIsLoading(false);
            setIsLoadings(false);
          }
          // console.log(res.data);
        })
        .catch((err) => {
          console.log(err, "err");
        });
    } else {
      axios
        .get(`api/listing/get-all`, {
          headers: {
            token: "koinpratodayqproductrsstoken",
          },
        })
        .then((res) => {
          if (res.data.success) {
            const verifiedListing = res?.data?.data.filter(
              (el) => el?.verifiedByAdmin === true
            );
            console.log(verifiedListing, "data");
            setMarketList(verifiedListing);

            setIsLoading(false);
            setIsLoadings(false);
          }
          // console.log(res.data);
        })
        .catch((err) => {
          console.log(err, "err");
        });
    }
  };

  useEffect(() => {
    const auth = cookies.get("auth-token");
    console.log(auth, "auth");
    //     const cookieValue = document.cookie
    // .split('; ')
    // .find(row => row.startsWith('Bearer'))
    // .split('=')[1];
    // console.log(cookieValue,"cookievalue")
    // console.log(auth);
    // if (!auth) {
    //   navigate("/sign-in");
    // }
    axios
      .post(
        "api/user/get-user-by-token",
        {},
        {
          headers: {
            Authorization: "Bearer " + auth,
          },
        }
      )
      .then((res) => {
        console.log(res, "market err");
        if (!res.data.success) {
          navigate("/sign-in");
        }
        setUserId(res.data.user._id);
        setUser(res?.data?.user);
        console.log(" marketplace");
      })
      .catch((err) => {
        console.log(err, "err");
        navigate("/sign-in");
      });
    // UserAuthentication();
  }, [window.location.search, userId]);
  const auth = cookies.get("auth-token");
  console.log(auth);
  // useEffectOnceWhen(()=>{
  // const auth = cookies.get("auth-token");
  //   console.log(auth);
  //   // if (!auth) {
  //   //   navigate("/sign-in");
  //   // }
  //   axios
  //     .post(
  //       "https://koinprapi.onrender.com/api/user/get-user-by-token",

  //       {
  //         headers: {
  //           Authorization: "Bearer " + auth,
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       if (!res.data.success) {
  //         // navigate("/sign-in");
  //       }
  //       setUserId(res.data.user._id);
  //       // console.log(" marketplace")
  //     })
  //     .catch((err) => {
  //       console.log(err, "err");
  //       navigate("/sign-in");
  //     });
  // // getUserByJwtToken()
  // searchQuery("pressRelease")
  // },[userId])
  // useEffect(()=>{
  //   // getUserByJwtToken()
  //   const auth = cookies.get("auth-token");
  //   console.log(auth);
  //   // if (!auth) {
  //   //   navigate("/sign-in");
  //   // }
  //   axios
  //     .post(
  //       "https://koinprapi.onrender.com/api/user/get-user-by-token",

  //       {
  //         headers: {
  //           Authorization: "Bearer " + auth,
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       if (!res.data.success) {
  //         // navigate("/sign-in");
  //       }
  //       setUserId(res.data.user._id);
  //       // console.log(" marketplace")
  //     })
  //     .catch((err) => {
  //       console.log(err, "err");
  //       navigate("/sign-in");
  //     });
  // // getUserByJwtToken()
  // searchQuery("pressRelease")

  // },[userId])
  useEffect(() => {
    // if(!userId){
    //   return;

    // };

    const { search } = window.location;
    let params = new URLSearchParams(search);

    let lc = params.get("listingCategory");
    let ot = params.get("offerTitle");
    console.log(lc, ot, params, "search");
    if (lc) {
      setListingFilter(lc);
    }
    if (ot) {
      setOfferFilter(ot);
    }

    getData(lc, ot);
  }, [window.location.search, listingFilter]);

  // useEffect(() => {
  //   if (userId) {
  //     getData();
  //   }
  // }, [userId]);

  //function to handle search
  const handleSearchKeys = (e) => {
    const { name, value } = e.target;

    if (name === "offerTitle") {
      setInput(e.target.value);
      window.localStorage.setItem("publisher_search", e.target.value);
      // const filteredData = marketList?.filter((item) =>
      //   item.offerTitle.includes(e.target.value)
      // );
      // setMarketList(filteredData);
      // setCategoryParam(e.target.value)
    } else if (name === "category") {
      // setInput({ listingCategory: value, offerTitle: "" });
      window.location.search = `listingCategory=${e.target.value}`;
    }
    // window.location.search = `offerTitle=${input}`;

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

  const handleOfferTitle = () => {
    window.location.search = `offerTitle=${input}`;
  };

  useEffect(() => {
    const data = window.localStorage.getItem("publisher_search");
    if (data !== null) {
      setInput(data);
    }
  }, []);
  return (
    <>
      {isLoadings ? (
        <TabLevelLoader />
      ) : (
        <div className="w-full p-4 mx-auto mt-20 bg-white rounded-xl  overflow-hidden ">
          <div className="md:flex lg:flex xs:flex w-full">
            <div
              // style={{marginLeft:"80px"}}
              className="p-5 md:w-3/12 md:ml-14  lg:w-3/12 sm:w-full bg-[#F8F8F8]"
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={12} sx={{ marginLeft: "1em" }}>
                  <p
                    className="invisible md:visible"
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      marginBottom: "16px",
                    }}
                  >
                    Search Publisher
                  </p>
                  <span className="invisible md:visible">
                    <FormControl sx={{ width: "95%" }} variant="outlined">
                      <InputLabel sx={{ marginTop: "-5px" }}>
                        Enter publisher name
                      </InputLabel>

                      <OutlinedInput
                        size="small"
                        // disabled
                        // fullWidth
                        // sx={{ p: "10px" }}
                        // sx={{ width: "78%" }}
                        id="outlined-basic"
                        name="offerTitle"
                        value={input}
                        onChange={handleSearchKeys}
                        label="Enter publisher name"
                        variant="outlined"
                        endAdornment={
                          <InputAdornment position="start">
                            <IconButton onClick={handleOfferTitle} edge="end">
                              <SearchIcon />
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </span>
                  <span className="sm:visible md:invisible">
                    <FormControl sx={{ width: "230px" }} variant="outlined">
                      <InputLabel sx={{ marginTop: "-5px" }}>
                        Enter publisher name
                      </InputLabel>

                      <OutlinedInput
                        size="small"
                        fullWidth
                        // sx={{ p: "10px"}}
                        id="outlined-basic"
                        name="offerTitle"
                        value={input}
                        onChange={handleSearchKeys}
                        label="Enter publisher name"
                        variant="outlined"
                        endAdornment={
                          <InputAdornment position="start">
                            <IconButton onClick={handleOfferTitle} edge="end">
                              <SearchIcon />
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </span>
                </Grid>
                <Grid
                  xs={12}
                  md={12}
                  sx={{ marginLeft: "2em", marginTop: "20px" }}
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
                  <div className="marketplace">
                    <div className="panels">
                      <div className="mpLeft">
                        <div className="publishers">
                          {/* <span>Choose Category</span> */}
                          <div className="option">
                            <label htmlFor="pressRelease">Press Release</label>
                            <input
                              type="radio"
                              name="category"
                              id="pressRelease"
                              value="pressRelease"
                              checked={listingFilter === "pressRelease"}
                              onChange={handleSearchKeys}
                            />
                          </div>
                          <div className="option">
                            <label htmlFor="sponsoredArticles">
                              Sponsored Articles
                            </label>
                            <input
                              type="radio"
                              name="category"
                              id="sponsoredArticle"
                              checked={listingFilter === "sponsoredArticle"}
                              onChange={handleSearchKeys}
                              value="sponsoredArticle"
                            />
                          </div>
                          <div className="option">
                            <label htmlFor="button">Button Ads</label>
                            <input
                              type="radio"
                              checked={listingFilter === "buttonAds"}
                              onChange={handleSearchKeys}
                              name="category"
                              id="button"
                              value="buttonAds"
                            />
                          </div>
                          <div className="option">
                            <label htmlFor="banner">Banner Ads</label>
                            <input
                              type="radio"
                              name="category"
                              checked={listingFilter === "bannerAds"}
                              onChange={handleSearchKeys}
                              id="banner"
                              value="bannerAds"
                            />
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
            <div className="p-3 md:w-8/12 lg:w-8/12 sm:w-full place-content-center md:mx-10 ">
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
                        isLoading={isLoading}
                        data={el}
                        name={el?.user?.fullName}
                        details={"View Details"}
                        price={el?.price}
                        user={user}
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
                ) : //   <ProgressWithLabel />
                //   <CachedIcon />
                // </div>
                null}
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
          {/* <ChangeEmailPopup oldEmail={user}/> */}
        </div>
      )}
    </>
  );
}

export default MarketPlace;
