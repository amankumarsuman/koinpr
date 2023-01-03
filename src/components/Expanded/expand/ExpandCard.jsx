import { Avatar, Paper } from "@mui/material";
import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import styles from "./expand.module.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/actions";
function ExpandCard({ id, name, details, image, price = 10 }) {
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    alert("clicked")
    const payload = { id, name, details, image, price, quantity: 1 };
    dispatch(addToCart(payload));
  };
  return (
    <>
      <Paper
        style={{ background: "#F9F9F9" }}
        className="md:w-[484px] h-[380px] sm:w-full  p-6"
      >
        <div style={{ display: "flex", marginTop: "22px" }}>
          <Avatar>{image}</Avatar>
          <div
            style={{
              marginTop: "0.4em",
              marginLeft: "12px",
              fontSize: "15px",
              fontWeight: 600,
            }}
          >
            {name}
          </div>
        </div>

        <div
          style={{
            marginTop: "100px",
            color: "#4E4D4D",
            fontSize: "12px",
            fontWeight: 500,
          }}
        >
          {details}
        </div>
        <div
          style={{
            marginTop: "100px",
            display: "flex",
            justifyContent: "space-between",
            fontWeight: 600,
            fontSize: "16px",
          }}
        >
          <p>${price}</p>
          <span onClick={handleAddToCart}>
            <AddCircleOutlineIcon />
          </span>
        </div>
      </Paper>
    </>
  );
}

export default ExpandCard;
