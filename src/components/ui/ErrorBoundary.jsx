import { Component } from 'react'

/** Renders nothing (or a fallback) if a child throws, e.g. when WebGL is unavailable. */
export default class ErrorBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? this.props.fallback ?? null : this.props.children
  }
}
