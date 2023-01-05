import { SNACKBAR_NOTIFICATION_TYPES } from "./snackbar.types";

//*****************Snackbar Notification Action Creators in Redux Store*****************//
const snackbarNotificationRequest = () => {
  return {
    type: SNACKBAR_NOTIFICATION_TYPES.SNACKBAR_NOTIFICATION_REQUEST,
  };
};
const snackbarNotificationSuccess = (payload) => {
  return {
    type: SNACKBAR_NOTIFICATION_TYPES.SNACKBAR_NOTIFICATION_SUCCESS,
    payload: payload,
  };
};

/**
 * @description: This function is used to close the alert snackbar notification from the UI
 */
export const snackbarNotificationClose = () => {
  return {
    type: SNACKBAR_NOTIFICATION_TYPES.SNACKBAR_NOTIFICATION_CLOSE,
  };
};

/**
 * @description: This function is used to display the snackbar in the UI, depending upon the situation like any entry is deleted in the backend or something, where
 *                user need to show a confirmation thing
 * @param {Object{
 *    @param {String} notificationType  - To determine the notifination type like error or something
 *    @param {String} notificationMessage - To Display the message title to the user
 * }} payload object data
 */
export const snackbarNotification = (payload) => (dispatch) => {
  const { notificationType, notificationMessage } = payload;
  dispatch(snackbarNotificationRequest());
  dispatch(
    snackbarNotificationSuccess({ notificationType, notificationMessage })
  );
};
