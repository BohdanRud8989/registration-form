import React from 'react';

import styles from './button.module.css';

export default function Button({ children, ...props }) {
  return (
    <button type="button" className={styles.main} {...props}>
      {children}
    </button>
  );
}
