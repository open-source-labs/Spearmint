import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "./xterm.css";
import "./Terminal.css";
const ipc = require('electron').ipcRenderer;

const terminalArgs = {
  convertEol: true,
  fontSize: 12,
  // Currently rows are hardcoded, next step is to make terminal sizing dynamic.
  fontFamily: 'monospace',
  //rendererType: "dom",
};

const term = new Terminal(terminalArgs);
const fitAddon = new FitAddon();
term.loadAddon(fitAddon);

const TerminalView = () => {

  const elem = useRef()
  const [isElemVisible, setIElemVisible] = useState(false)

  useEffect(() => {
    console.log('here')
    if (isElemVisible) {
      // Assuming UI has updated:
      elem.current.getBoundingClientRect() // do something with this object
      console.log('visible')
      const container = document.getElementById('base-element')

    console.log(container);
    term.open(document.getElementById('base-element'));
    // when we have input events (e), we would send the data to the main processor
    term.onData((e) => {
      ipc.send('terminal.toTerm', e);
    });
    // when incoming Data comes back to the main process, this ipc renderer
    // will take it and writes it to xterm monitor
    ipc.on('terminal.incData', (event, data) => {
      term.write(data);
    });

    //console.log("in useEffect once before fit", container.offsetWidth, container.offsetHeight)
    fitAddon.fit();
    //console.log("in useEffect once after fit", container.offsetWidth, container.offsetHeight)
    }
 
   }, [isElemVisible])
  
  useLayoutEffect(() => {
    //term.setOption("theme", {background: "black", foreground: "white"});
    console.log(isElemVisible)
  }, []);

  useLayoutEffect(() => {
    console.log('USE-EFFEcT ALWAYS before fitaddon', term.cols, term.rows);
    const container = document.getElementById('terminalContainer')
    //console.log(container.offsetWidth, container.offsetHeight)
    fitAddon.fit();
    //console.log('USE-EFFEcT ALWAYS after fitaddon', term.cols, term.rows);

    // tell ptyprocess to resize also 
    term.onResize((e) => {
      //console.log('resizing with', term.cols, term.rows);
      ipc.send('terminal.resize', e, term.cols, term.rows)
    })
    
    //term.resize(Math.floor(container.offsetWidth/7), Math.floor(container.offsetHeight/14))
    
  });




  return (
    <div id="base-element">
    { isElemVisible && (
      <div id="element" ref={elem}></div>
    )}
   </div>
  )
};

export default TerminalView;
