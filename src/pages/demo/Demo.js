import React, { useState } from 'react'
import { dispatcher } from 'generator'
import Modal from 'components/modal/modal'
import styles from './Demo.less'

function Demo() {
  const [visible, setVisible] = useState(false)
  const [data, setData] = useState({})

  const handleClose = () => setVisible(false)
  const handleOpen = () => {
    dispatcher.demo.getInfo().then(d => setData(d))
    setVisible(true)
  }

  return (
    <div className={styles.demo}>
      <div className={styles.header}>Demo Header</div>
      <div className={styles.content} onClick={handleOpen}>
        Demo Content <span>click me to open modal</span>
      </div>
      <div className={styles.footer}>Demo Footer</div>
      <Modal visible={visible} onClose={handleClose}>
        <div className={styles.modal}>{data.name}</div>
      </Modal>
    </div>
  )
}

export default Demo
