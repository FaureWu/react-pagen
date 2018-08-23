import React, { PureComponent } from 'react'
import Modal from 'components/modal/modal'
import styles from './Demo.less'

class Demo extends PureComponent {
  state = {
    open: false,
  }

  handleClose = () => this.setState({
    open: false,
  })

  handleOpen = () => this.setState({
    open: true,
  })

  render() {
    const { open } = this.state

    return (
      <div className={styles.demo}>
        <div className={styles.header}>Demo Header</div>
        <div className={styles.content} onClick={this.handleOpen}>Demo Content <span>click me to open modal</span></div>
        <div className={styles.footer}>Demo Footer</div>
        <Modal open={open} onClose={this.handleClose}>
          <div className={styles.modal}>
            Modal Content
          </div>
        </Modal>
      </div>
    )
  }
}

export default Demo
