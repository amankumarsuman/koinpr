import { useState } from "react";
import axios from "axios";
import styles from "./forgetPassword.module.css";
import CommonPopup from "../../common/Popup";
import { useDispatch } from "react-redux";
import { snackbarNotification } from "../../redux/snackbar.action";
const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const [msg, setMsg] = useState("");
	const [error, setError] = useState("");
const dispatch=useDispatch()
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = `https://koinpr.onrender.com/api/password-reset`;
			const { data } = await axios.post(url, { email });
			const notification={
				notificationType: "success",
			notificationMessage: data.message,
			  }
			  dispatch(snackbarNotification(notification));
			setMsg(data.message);

			setError("");
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				const notification={
					notificationType: "error",
				notificationMessage: error.response.data.message,
				  }
				  dispatch(snackbarNotification(notification));
				setError(error.response.data.message);
				setMsg("");
			}
		}
	};

	return (
		// <div className={styles.container}>
		// 	<form className={styles.form_container} onSubmit={handleSubmit}>
		// 		<h1>Forgot Password</h1>
		// 		<input
		// 			type="email"
		// 			placeholder="Email"
		// 			name="email"
		// 			onChange={(e) => setEmail(e.target.value)}
		// 			value={email}
		// 			required
		// 			className={styles.input}
		// 		/>
		// 		{error && <div className={styles.error_msg}>{error}</div>}
		// 		{msg && <div className={styles.success_msg}>{msg}</div>}
		// 		<button type="submit" className={styles.green_btn}>
		// 			Submit
		// 		</button>
		// 	</form>
		// </div>
		<>
		<CommonPopup title="Reset Your Password" error={error} msg={msg} value1={email} setValue1={setEmail} input1="Your Registered Email" buttonText="Submit ->" handleSubmit={handleSubmit}/>
		</>
	);
};

export default ForgotPassword;