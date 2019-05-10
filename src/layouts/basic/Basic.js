import React from 'react'
import styles from './Basic.less'

function Basic({ children }) {
  return (
    <div className={styles.basic}>
      <div className={styles.header}>REACT PAGEN LAYOUT HEADER</div>
      <div className={styles.content}>{children}</div>
      <div className={styles.footer}>REACT PAGEN LAYOUT FOOTER</div>
    </div>
  )
}

export default Basic
