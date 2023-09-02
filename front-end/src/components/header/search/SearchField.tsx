import styles from "./SearchField.module.css";
export const SearchField = () => {
  return (
    <div className={styles.containerField}>
      <input placeholder="Search" className={styles.field} />
    </div>
  );
};
