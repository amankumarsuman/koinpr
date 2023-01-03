import React from "react";

function RightCard({ image, heading, subheader, date, time, alt }) {
  return (
    <div
      style={{
        marginTop: "38px",
        marginLeft: "38px",
        marginBottom: "35px",
        marginRight: "21px",
      }}
    >
      <div style={{ display: "flex" }}>
        <img src={image} alt={alt} />
        <span>
          <h1
            style={{
              width: "202px",
              fontSize: "13px",
              fontWeight: 600,
              marginLeft: "11px",
            }}
          >
            {heading}
          </h1>
          <span
            style={{
              width: "202px",
              fontSize: "9px",
              fontWeight: 500,
              marginLeft: "11px",
              color: "#AAAAAA",
            }}
          >
            {subheader}|{date}-{time}
          </span>
        </span>
      </div>
    </div>
  );
}

export default RightCard;
