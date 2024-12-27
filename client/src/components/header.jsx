import axios from "axios";
import styles from "./header.module.css"; // Import the CSS module styles

const Header = () => {
  const logout = async() => {
    window.open("http://localhost:8080/auth/logout", "_self");
  }

  return (
    <header className={styles.transparent}>
      <div className={styles.container}>
        <a href="#" className={styles.logo}>
          <img src="./images/logo.png" className={styles.logo} alt="MyApp" />
          <p>Rest Review</p>
        </a>
        <button className={styles["login-button"]} onClick={logout}>Logout</button>
      </div>
    </header>
  );
}

export default Header;
