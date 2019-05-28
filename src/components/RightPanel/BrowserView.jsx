import React, { Component, useState, useContext } from 'react';
import { UrlContext, ToggleContext } from '../../App';
// const { ipcRenderer } = window.require('electron')
// const { BrowserView } = window.require('electron').remote


const TestView = () => {
  const url = useContext(UrlContext)
  const toggleView = useContext(ToggleContext)

  // const testView = new BrowserView({
  //   width: 500,
  //   height: '100%'
  // })

  const test = {
    padding: ".625rem",
    height: "auto",
    width: "2rem",
    border: "grey",
  }

  const style = {
    width: 500,
    height: '100%',
  }

  // ipcRenderer.send('openTest', url);


  return (
    <div style={test}>
      {url && toggleView && <webview src={url} style={style}/>}
    </div>
  )
}

export default TestView;