import React from 'react'
import ErrorCard from "../ErrorCard/ErrorCard"

class ErrorBoundary extends React.Component<{ msg?:string }, { hasError:boolean, errMsg: string }> {
  constructor(props: any) {
    super(props)
    this.state = { 
      hasError: false,
      errMsg: props.msg || "Love is a many-splendored thing."
    }
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true }
  }
  componentDidCatch(error:any, info:any) {
    console.log('error boundary triggered')
    console.log(error, info)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="narrow">
          <ErrorCard>{this.state.errMsg}</ErrorCard>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary