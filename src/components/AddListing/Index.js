import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import { Usekey } from "../../common/keyboardInteraction/KeyboardPress";
import "./AddListing.scss";

import Cookies from "universal-cookie";
import CustomizedDialogs from "../../common/alertDialogue/AlertDialogForApiResponse";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
const AddListing = () => {
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  const cookies = new Cookies();
  const [userId, setUserId] = useState();

  const navigate = useNavigate();

  useEffect(() => {
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
      })
      .catch((err) => {
        console.log(err, "err");
        navigate("/sign-in");
      });
  }, [userId]);

  const init = {
    email: "",
    userType: "",
    price: 0,
    websiteLink: "",
    offerTitle: "",
    listingCategory: "",
   
    websiteLanguage: "",
    noFollowLinkAllowed: true,
    doFollowLinkAllowed: true,
    indexedArticle: "",
    linkedin: "",
    googleNews: "",
    socialShare: "",
    facebook: "",
    twitter: "",
  };

  const [addListingInput, setAddListingInput] = useState(init);
const [image,setImage]=useState('')
// console.log(image)
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "noFollowLinkAllowed") {
      setAddListingInput({
        ...addListingInput,
        noFollowLinkAllowed: checked,
      });
    }
    if (name === "doFollowLinkAllowed") {
      setAddListingInput({
        ...addListingInput,
        doFollowLinkAllowed: checked,
      });
    } else {
      setAddListingInput({ ...addListingInput, [name]: value });
    }
    // setAddListingInput({ ...addListingInput, [name]: value, [checked]: value });
    // console.log(e.target.checked);
    // console.log(e.target.name);
  };
  const [showDialog, setShowDialog] = useState(false);

  const handleSubmitFunction = () => {
    const {
      email,
      userType,
      price,
      websiteLanguage,
      linkedin,
      googleNews,
      socialShare,
      facebook,
      twitter,
      offerTitle,
      listingCategory,
      
      noFollowLinkAllowed,
      doFollowLinkAllowed,
      indexedArticle,
      websiteLink,

    } = addListingInput;


    const formData = new FormData()

    formData.append('image', image)
    formData.append('websiteLink', websiteLink)
    formData.append('indexedArticle', indexedArticle)
    formData.append('doFollowLinkAllowed', doFollowLinkAllowed)
    formData.append('noFollowLinkAllowed', noFollowLinkAllowed)
    formData.append('listingCategory', listingCategory)
    formData.append('offerTitle', offerTitle)
    formData.append('twitter', twitter)
    formData.append('facebook', facebook)
    formData.append('socialShare', socialShare)
    formData.append('googleNews', googleNews)
    formData.append('linkedin', linkedin)
    formData.append('websiteLanguage', websiteLanguage)
    formData.append('price', price)
    formData.append('userType', userType)
    formData.append('email', email)
    
    const token = cookies.get("auth-token");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .post(
        "api/listing/add",
        {
          // formData
          email,
          userType,
          price,
          websiteLanguage,
          linkedin,
          googleNews,
          socialShare,
          facebook,
          twitter,
          offerTitle,
          listingCategory,
          image:image,
          noFollowLinkAllowed,
          doFollowLinkAllowed,
          indexedArticle,
          websiteLink,
          userType,
          userId: userId,
          image:image
        },
        config
      )
      .then((res) => {
        if (res?.data?.success) {
          navigate("/");
        }
        // console.log(res);
        if (!res?.data.success) {
          <CustomizedDialogs
            open={showDialog}
            setShowDialog={setShowDialog}
            err={res?.data?.message}
          />;
          console.log("error", res);
          alert("res?.data?.message");
          setShowDialog(true);
        }
      })
      .catch((err) => {
        if (!err?.response?.data?.success) setShowDialog(true);
        <CustomizedDialogs
          showDialog={true}
          setShowDialog={setShowDialog}
          err={err?.response?.data?.message}
        />;
        alert(err?.response?.data?.message);
        // console.log("err", err);
        // console.log("err", err?.response?.data?.message);
      });
  };

  //keyboard interaction
  Usekey("Enter", handleSubmitFunction);
  Usekey("NumpadEnter", handleSubmitFunction);
  // const { register, handleSubmit } = useForm();

  // const schema = yup
  //   .object({
  //     price: yup.number().positive().integer().required(),
  //   })
  //   .required();

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({
  //   resolver: yupResolver(schema),
  // });
  return (
    <>
      {/* <form onSubmit={handleSubmit(handleSubmitFunction)}> */}
      <div className="AddListing">
        <div className="content">
          <div className="mainHeading">Add Your Listing</div>
          <div className="inputs">
            <input
              onChange={handleChange}
              value={addListingInput?.websiteLink}
              name="websiteLink"
              type="text"
              placeholder="Your Website Link"
              className="input"
              // {...register("websiteLink")}
            />
            <input
              onChange={handleChange}
              value={addListingInput?.email}
              name="email"
              type="text"
              placeholder="Email"
              className="input"
              // {...register("email")}
            />
            <input
              value={addListingInput?.price}
              onChange={handleChange}
              type="number"
              placeholder="Price"
              className="input"
              name="price"
              // {...register("price")}
            />
            {/* <p>{errors.price?.message}</p> */}
          </div>
          <div className="inputs">
            <Box sx={{ minWidth: 220 }}>
              <FormControl sx={{ width: "250px" }} size="small">
                <InputLabel id="demo-simple-select-label">
                  Listing Category
                </InputLabel>
                <Select
                  // sx={{ padding: "10px" }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={addListingInput.listingCategory}
                  name="listingCategory"
                  label="Listing Category"
                  onChange={handleChange}
                >
                  <MenuItem value={"pressRelease"}>Press Release</MenuItem>
                  <MenuItem value={"sponsoredArticle"}>
                    Sponsored Articles
                  </MenuItem>
                  <MenuItem value={"buttonAds"}>Button Ads</MenuItem>
                  <MenuItem value={"bannerads"}>Banner Ads</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <input
              onChange={handleChange}
              name="offerTitle"
              type="text"
              placeholder="Title"
              className="input"
              value={addListingInput?.offerTitle}

              // {...register("offerTitle")}
            />
            <input
              onChange={handleChange}
              type="button"
              className="input but"
              name="logo"
              value="UploadLogo +"
            />
          </div>

          <div className="subHeading">More Details</div>
          <div className="inputs">
            <input
              value={addListingInput?.websiteLanguage}
              onChange={handleChange}
              name="websiteLanguage"
              type="text"
              placeholder="Your Website Language"
              className="input"
              // {...register("websiteLanguage")}
            />

            <div className="wInput mt20">
              <label>No-Follow Links Allowed</label>
              <input
                value={addListingInput?.noFollowLinkAllowed}
                type="checkbox"
                name="noFollowLinkAllowed"
                onChange={handleChange}
                checked={addListingInput?.noFollowLinkAllowed}
              />
            </div>

            <div className="wInput mt20">
              <label>Do-Follow Links Allowed</label>
              <input
                value={addListingInput?.doFollowLinkAllowed}
                type="checkbox"
                name="doFollowLinkAllowed"
                onChange={handleChange}
                checked={addListingInput?.doFollowLinkAllowed}
              />
            </div>
          </div>
          <div className="inputs">
            <input
              onChange={handleChange}
              type="text"
              name="indexedArticle"
              placeholder="Indexed Article"
              className="input"
              value={addListingInput?.indexedArticle}

              // {...register("indexedArticle")}
            />
            <input
              onChange={handleChange}
              name="linkedin"
              type="text"
              placeholder="LinkedIn Link"
              className="input"
              value={addListingInput?.linkedin}

              // {...register("linkedin")}
            />
            <input
              onChange={handleChange}
              type="text"
              name="googleNews"
              placeholder="Google News Visibilty"
              className="input"
              value={addListingInput?.googleNews}
              // {...register("googleNews")}
            />
          </div>
          <div className="inputs">
            <input
              onChange={handleChange}
              type="text"
              name="socialShare"
              placeholder="Social Share"
              className="input"
              value={addListingInput?.socialShare}
              // {...register("socialShare")}
            />
            <input
              onChange={handleChange}
              type="text"
              name="facebook"
              placeholder="Facebook Link"
              className="input"
              value={addListingInput?.facebook}
              // {...register("facebook")}
            />
            <input
              onChange={handleChange}
              type="text"
              name="twitter"
              placeholder="Twitter Link"
              className="input"
              value={addListingInput?.twitter}
              // {...register("twitter")}
            />
          </div>
          <div className="inputs">
            <Box sx={{ minWidth: 220 }}>
              <FormControl sx={{ width: "250px" }} size="small">
                <InputLabel id="demo-simple-select-label">User Type</InputLabel>
                <Select
                  // sx={{ padding: "10px" }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={addListingInput.userType}
                  name="userType"
                  label="User Type"
                  onChange={handleChange}
                >
                  <MenuItem value={"ADVERTISER"}>ADVERTISER</MenuItem>
                  <MenuItem value={"PUBLISHER"}>PUBLISHER</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <input
              onChange={(e)=>setImage(e.target.files[0])}
              type="file"
              name="image"
              
              className="input"
              
              // {...register("twitter")}
            />
          </div>
          <div style={{display:"flex",justifyContent:"space-between"}}>


          <button
            type="button"
            onClick={handleSubmitFunction}
            className="submit"
          >
            Submit Listing
            <ArrowForwardIcon/>
          </button>
          <button
            type="button"
            onClick={()=>
        navigate("/")
            
            }
            className="submit"
          >
            <ArrowBackIcon/>
            Cancel
          </button>
          </div>
        </div>
        {/* {showDialog ? (
          <CustomizedDialogs open={true} err={"res?.data?.message"} />
        ) : null} */}
      </div>
      {/* </form> */}
    </>
  );
};

export default AddListing;
