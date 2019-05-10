import React from 'react'
import { Icon } from 'antd-mobile'
import classNames from 'classnames'
import { noop } from '../../utils/tools'
import styles from './modal.less'

function Modal({ visible = false, onClose = noop, children }) {
  return (
    <>
      <div
        className={classNames(styles.overlay, { [styles.show]: visible })}
        onClick={onClose}
      />
      <div className={classNames(styles.modal, { [styles.open]: visible })}>
        <div className={styles.header} onClick={onClose}>
          <Icon type="cross" />
        </div>
        {children}
      </div>
    </>
  )
}

export default Modal
