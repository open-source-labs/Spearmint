import React, { useContext } from 'react'
import { UrlContext, ToggleContext } from '../../App'

const TestView = () => {
  const url = useContext(UrlContext)
  const toggleView = useContext(ToggleContext)
  const test = {
    padding: '.625rem',
    height: 'auto',
    width: '2rem',
    border: 'grey',
  }
  const style = {
    width: 500,
    height: '100%',
  }

  return <div style={test}>{url && toggleView && <webview src={url} style={style} />}</div>
}

export default TestView
