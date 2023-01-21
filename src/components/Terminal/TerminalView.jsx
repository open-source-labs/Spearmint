import React, { useLayoutEffect } from 'react';
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
  rows: 60,
  cols: 100,
};

const term = new Terminal(terminalArgs);
const fitAddon = new FitAddon();
term.loadAddon(fitAddon);

const TerminalView = () => {
  
  useLayoutEffect(() => {

    term.open(document.getElementById('terminalContainer'));
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
  }, []);

  useLayoutEffect(() => {
    // console.log('USE-EFFEcT ALWAYS before fitaddon', term.cols, term.rows);
    //console.log(container.offsetWidth, container.offsetHeight)
    fitAddon.fit();
    //console.log('USE-EFFEcT ALWAYS after fitaddon', term.cols, term.rows);

    // tell ptyprocess to resize also 
    term.onResize((e) => {
      //console.log('resizing with', term.cols, term.rows);
      ipc.send('terminal.resize', e, term.cols, term.rows)
    })
  });

  return (
    <div id="terminalContainer">
   </div>
  )
};

export default TerminalView;
