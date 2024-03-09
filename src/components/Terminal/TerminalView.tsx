import React, { useLayoutEffect } from 'react';
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "./xterm.css";
import "./Terminal.css";
import { ipcRenderer } from 'electron';
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

/**
 * React component that renders on the RightPanel component
 * @returns { JSX.Element } returns the TerminalView component
 */
const TerminalView = (): JSX.Element => {
  useLayoutEffect(() => {
    const terminalContainer = document.getElementById('terminalContainer') as HTMLElement
    term.open(terminalContainer);
    // when we have input events (e), we would send the data to the main processor
    const onData = term.onData((e) => {
      ipc.send('terminal.toTerm', e);
    });
    // when incoming Data comes back to the main process, this ipc renderer
    // will take it and writes it to xterm monitor
    ipc.on('terminal.incData', (event, data) => {
      term.write(data);
    });

    fitAddon.fit();

    // remove event listeners when component is unmounted
    return () => {
      ipcRenderer.removeAllListeners('terminal.incData');
      onData.dispose();
    }
  }, []);

  useLayoutEffect(() => {
    fitAddon.fit();

    // tell ptyprocess to resize also 
    term.onResize((e) => {
      ipc.send('terminal.resize', e, term.cols, term.rows);
    })
  });

  return (
    <div id="terminalContainer">
    </div>
  )
};

export default TerminalView;
