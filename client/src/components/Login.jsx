import { Link } from "react-router-dom";
import styles from "./Login.module.css";

function Login() {
	const googleAuth = () => {
		window.open(
			
			"http://localhost:8080/auth/google/callback",
			"_self"
		);
	};
	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>Log in</h1>
			<div className={styles.form_container}>
				<div className={styles.left}>
					<img className={styles.img} src="./images/login.jpg" alt="login" />
				</div>
				<div className={styles.right}>
					<button className={styles.google_btn} onClick={googleAuth}>
						<img src="./images/google.png" alt="google icon" />
						<span>Log in with Google</span>
					</button>
					<p className={styles.text}>
						New Here ? <Link to="/signup">Sign Up</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Login;
