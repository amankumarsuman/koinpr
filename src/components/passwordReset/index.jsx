import { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./passwordReset.module.css";
import { snackbarNotification } from "../../redux/snackbar.action";
import { useDispatch } from "react-redux";
import CommonPopup from "../../common/Popup";

const PasswordReset = () => {
	const [validUrl, setValidUrl] = useState(false);
	const [password, setPassword] = useState("");
	const [confpassword, setConfPassword] = useState("");
	const [msg, setMsg] = useState("");
	const [error, setError] = useState("");
const dispatch=useDispatch()

	const param = useParams();
	const url = `https://koinpr.onrender.com/api/password-reset/${param.id}/${param.token}`;

	useEffect(() => {
		const verifyUrl = async () => {
			try {
				await axios.get(url);
				setValidUrl(true);
			} catch (error) {
				setValidUrl(false);
			}
		};
		verifyUrl();
	}, [param, url]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.post(url, { password });
			const notification={
				notificationType: "success",
			notificationMessage: data.message,
			  }
			  dispatch(snackbarNotification(notification));
			setMsg(data.message);
			setError("");
			window.location = "/login";
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
		<Fragment>
			{validUrl ? (
				// <div className={styles.container}>
				// 	<form className={styles.form_container} onSubmit={handleSubmit}>
				// 		<h1>Add New Password</h1>
				// 		<input
				// 			type="password"
				// 			placeholder="Enter New Password"
				// 			name="password"
				// 			onChange={(e) => setPassword(e.target.value)}
				// 			value={password}
				// 			required
				// 			className={styles.input}
				// 		/>
				// 		<input
				// 			type="password"
				// 			placeholder="Confirm New Password"
				// 			name="password"
				// 			onChange={(e) => setConfPassword(e.target.value)}
				// 			value={confpassword}
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
		<CommonPopup 
		title="Set New Password" 
		error={error} msg={msg} 
		value1={password} setValue1={setPassword} 
		value2={confpassword} setValue2={setConfPassword} 
		input1="Enter New Password" 
		input2="Confirm New Password" 
		buttonText="Submit ->" 
		handleSubmit={handleSubmit}/>
				
				</>
			) : (
				<h1>404 Not Found</h1>
			)}
		</Fragment>
	);
};

export default PasswordReset;