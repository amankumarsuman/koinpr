import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { style } from "./style";
import { useSelector } from "react-redux";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

/**
 * @description: This function is used show some alert in the UI to inform something to the user.
 * @returns: JSX Component to show to the user
 */

export const AlertDialog = (props) => {
  //   const dialogConfirmationDetails = useSelector((state) => state.alertDialog);
  const {
    alertType,
    alertTitle,
    alertMessage,
    alertSecondaryMessage,
    onAgree,
    onDisagree,
    displayError,
    isOpen,
  } = props;

  const styles = style();

  return isOpen ? (
    <Dialog
      open={true}
      keepMounted
      fullWidth
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: "800px",
          },
        },
      }}
    >
      <DialogTitle className={styles.title} id="alert-dialog-title">
        <Grid container>
          <Grid item xs={12} sm={12} className={styles.wrapIcon}>
            <ReportProblemIcon className={styles.icon} /> {alertTitle}
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <DialogContentText className={styles.message}>
          {alertMessage}
        </DialogContentText>

        <DialogContentText className={styles.message}>
          {alertSecondaryMessage ? alertSecondaryMessage : null}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {displayError ? (
          <Button variant="outlined" onClick={onAgree}>
            Ok
          </Button>
        ) : (
          <>
            <Button variant="outlined" onClick={onDisagree}>
              CANCEL
            </Button>
            <Button variant="contained" onClick={onAgree}>
              {alertType === "danger" ? "CONFIRM" : "DELETE"}
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  ) : null;
};
