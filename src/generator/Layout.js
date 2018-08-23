import React, { PureComponent } from 'react'

class Layout extends PureComponent {
  render() {
    const { children } = this.props
    return <>{children}</>
  }
}

export default Layout
