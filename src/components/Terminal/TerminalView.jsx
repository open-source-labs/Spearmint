import React, { useEffect, ChangeEvent } from 'react';
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "./xterm.css";
const ipc = require('electron').ipcRenderer;

const terminalArgs = {
  convertEol: true,
  fontSize: 12,
  // Currently rows are hardcoded, next step is to make terminal sizing dynamic.
  fontFamily: 'monospace',
  //endererType: "dom",
};

const term = new Terminal(terminalArgs);
const fitAddon = new FitAddon();

const TerminalView = () => {
  
  useEffect(() => {
    term.setOption("theme", {background: "black", foreground: "white"});
    term.loadAddon(fitAddon);
    term.open(document.getElementById('xterm'));
    fitAddon.fit();
    // when we have input events (e), we would send the data to the main processor
    term.onData((e) => {
      ipc.send('terminal.toTerm', e);
    });
    // when incoming Data comes back to the main process, this ipc renderer
    // will take it and writes it to xterm monitor
    ipc.on('terminal.incData', (event, data) => {
      term.write(data);
    });
  }, []);

  return (
    <div id="terminalContainer">

      <div id="xterm" style={{ height: "900px", width: "100%" }}/>
    </div>

  )
};

export default TerminalView;
