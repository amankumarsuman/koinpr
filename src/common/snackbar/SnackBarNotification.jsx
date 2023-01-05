
import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import { useDispatch, useSelector } from "react-redux";
import { snackbarNotificationClose } from "../../redux/snackbar.action";
// import { snackbarNotificationClose } from "";

// CONSTANT VALUES: severity: "success" | "info" | "warning" | "error" only

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

/**
 * @description: This function is used show some information in the UI to inform something to the user.
 * @returns: JSX Component to show to the user
 */

export const SnackbarNotification = () => {
  const snackbarNotificationDetails = useSelector(
    (state) => state.snackbarNotification
  );
  const { isOpen, notificationType, notificationMessage } =
    snackbarNotificationDetails;

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(snackbarNotificationClose());
  };

  return isOpen ? (
    <Snackbar
      open={isOpen}
      autoHideDuration={3000}
      TransitionComponent={TransitionUp}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={notificationType}
        sx={{ width: "100%" }}
      >
        {notificationMessage}
      </Alert>
    </Snackbar>
  ) : null;
};
