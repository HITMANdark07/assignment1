import React from 'react';
import styles from '../styles/header.module.css';

const Header = () => {
  return (
    <div className={styles.container}>
        <div className={styles.item}>ASSIGNMENT 1</div>
        <div className={styles.item}>ASSIGNMENT 2</div>
    </div>
  );
}

export default Header;
