import React, { PureComponent } from 'react'
import styles from './Basic.less'

class Basic extends PureComponent {
  render() {
    const { children } = this.props
    return (
      <div className={styles.basic}>
        <div className={styles.header}>Layout Header</div>
        <div className={styles.content}>{children}</div>
        <div className={styles.footer}>Layout Footer</div>
      </div>
    )
  }
}

export default Basic
