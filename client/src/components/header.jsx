import axios from "axios";
import styles from "./header.module.css";

const Header = () => {
  const logout = async() => {
    window.open("http://localhost:8080/auth/logout", "_self");
  }

  return (
    <header className={styles.transparent}>
      <div className={styles.container}>
        <a href="#" className={styles.logo}>
          <h3>Rest Review</h3>
        </a>
        <button className={styles["login-button"]} onClick={logout}>Logout</button>
      </div>
    </header>
  );
}

export default Header;
