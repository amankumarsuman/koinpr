import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

function TabLevelLoader({isLoading}) {
  const [showLoading, setShowLoading] = React.useState(false);
//   const { listOfUniqueIds } = useSelector((state) => state.tabLevelLoader);
//   const { isLoading } = useSelector((state) => state.userAuth);
  const { pathname } = useLocation();
//   React.useEffect(() => {
//     let value = pathname.split("/").reverse()[0];
//     setShowLoading(listOfUniqueIds.includes(value));
//   }, [pathname, listOfUniqueIds]);
  return (
    <>
      {/* {( isLoading) && ( */}
        <div
          style={{
            display: "flex",
            opacity: "0.7",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "fixed",
            backgroundColor: "#f5f5f5",
            zIndex: "1000",
          }}
        >
          <div style={{ margin: "auto" }}>
            {/* KOINPR */}
            <CircularProgress size="5em" >KOINPR</CircularProgress>
          </div>
        </div>
      {/* )} */}
    </>
  );
}

export default TabLevelLoader;
