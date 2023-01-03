import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function AddListing() {
  const init = {
    weblink: "",
    offertitle: "",
    listCat: "",
    weblang: "",
    nfollowlink: "",
    dfollowlink: "",
    indart: "",
    linkedinlink: "",
    googleNewsVis: "",
    socialShare: "",
    fblink: "",
    twitterlink: "",
  };

  const [input, setInput] = useState(init);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  return (
    <div className="p-5 mt-10 mx-auto md:w-10/12 sm:w-full bg-[#F9F9F9]">
      <Paper sx={{ padding: "3em", background: "#F9F9F9" }} elevation={3}>
        <Typography fontWeight="bold" marginBottom="2em">
          Add Your Listing
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TextField
              size="small"
              fullWidth
              label="Your Website Link"
              name="weblink"
              onChange={handleChange}
              value={input.weblink}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              size="small"
              fullWidth
              label="Offer Title"
              name="offertitle"
              onChange={handleChange}
              value={input.offertitle}
            />
          </Grid>
          <Grid item md={4}></Grid>
          <Grid item xs={12} md={4}>
            <TextField
              size="small"
              fullWidth
              label="Listing Category"
              name="listCat"
              onChange={handleChange}
              value={input.listCat}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              className="upload"
              size="small"
              sx={{ padding: "0.4em" }}
              variant="outlined"
              component="label"
            >
              Upload Logo +
              <input hidden accept="image/*" multiple type="file" />
            </Button>
          </Grid>
          <Grid item md={6}></Grid>
        </Grid>
        <Typography marginBottom="2em" marginTop="2em">
          More Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TextField
              size="small"
              fullWidth
              label="Your Website Language"
              name="weblang"
              onChange={handleChange}
              value={input.weblang}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              size="small"
              fullWidth
              label="No-Follow Links Allowed"
              name="nfollowlink"
              onChange={handleChange}
              value={input.nfollowlink}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              size="small"
              fullWidth
              label="Do-Follow Links Allowed"
              name="dfollowlink"
              onChange={handleChange}
              value={input.dfollowlink}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              size="small"
              fullWidth
              label="Indexed Article"
              name="indart"
              onChange={handleChange}
              value={input.indart}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              size="small"
              fullWidth
              label="LinkedIn Link"
              name="linkedinlink"
              onChange={handleChange}
              value={input.linkedinlink}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              size="small"
              fullWidth
              label="Google News Visibilty"
              name="googleNewsVis"
              onChange={handleChange}
              value={input.googleNewsVis}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              size="small"
              fullWidth
              label="Social Share"
              name="socialShare"
              onChange={handleChange}
              value={input.socialShare}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              size="small"
              fullWidth
              label="Facebook Link"
              name="fblink"
              onChange={handleChange}
              value={input.fblink}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              size="small"
              fullWidth
              label="Twitter Link"
              name="twitterlink"
              onChange={handleChange}
              value={input.twitterlink}
            />
          </Grid>
          <div className="p-5 sm:w-full">
            <Button
              sx={{ marginTop: "2em", padding: "1em", background: "black" }}
              variant="contained"
            >
              Submit Listing
              <span className="hidden md:block">
                <ArrowForwardIcon />
              </span>
            </Button>
          </div>
        </Grid>
      </Paper>
    </div>
  );
}

export default AddListing;
