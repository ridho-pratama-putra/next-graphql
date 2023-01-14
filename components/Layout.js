import styles from "../styles/Layout.module.css";

/*
* wrapped component will have container style defined in layout module
* */
export default function Layout({ children }) {
    return <div className={styles.container}>{children}</div>;
}