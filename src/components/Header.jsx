import React from 'react';
import styles from '../styles/header.module.css';
import { withRouter} from 'react-router-dom';

const Header = ({active, history}) => {
  return (
    <div className={styles.container}>
        <div className={[styles.item].join(' ')} onClick={() => { history.push("/")}} style={{backgroundColor: active==="one" ? 'purple':'#000'}}>ASSIGNMENT 1</div>
        <div className={[styles.item].join(' ')} onClick={() => { history.push("/signup")}} style={{backgroundColor: active==="two" ? 'purple':'#000'}}>ASSIGNMENT 2</div>
    </div>
  );
}

export default withRouter(Header);
