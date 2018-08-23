import React, { PureComponent } from 'react'
import { Icon } from 'antd-mobile'
import classNames from 'classnames'
import { any, func, bool } from 'prop-types'
import { noop } from '../../utils/tools'
import styles from './modal.less'

class Modal extends PureComponent {
  static propTypes = {
    open: bool,
    onClose: func,
    children: any.isRequired,
  }

  static defaultProps = {
    open: false,
    onClose: noop,
  }

  render() {
    const { children, open, onClose } = this.props

    return (
      <>
        <div
          className={classNames(styles.overlay, { [styles.show]: open })}
          onClick={onClose}
        />
        <div className={classNames(styles.modal, { [styles.open]: open })}>
          <div className={styles.header} onClick={onClose}>
            <Icon type="cross" />
          </div>
          {children}
        </div>
      </>
    )
  }
}

export default Modal
