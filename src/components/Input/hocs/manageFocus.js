/* eslint-disable no-return-assign */
import React from 'react'


export const manageFocus = WrappedComponent => (
  class ManageFocus extends React.Component {
    componentDidMount() {
      if (this.props.autoFocus) {
        this.focus()
      }
    }

    componentWillReceiveProps(newProps) {
      this.focusOnUpdate = !this.props.autoFocus && newProps.autoFocus
    }

    componentDidUpdate() {
      if (this.focusOnUpdate) {
        this.focus()
      }
    }

    refProxy = (element) => {
      this.element = element
    }

    focus = () => this.element.focus()

    focusOnUpdate = false

    render() {
      return (
        <WrappedComponent
          refProxy={this.refProxy}
          {...this.props}
        />
      )
    }
  }
)

export default manageFocus
