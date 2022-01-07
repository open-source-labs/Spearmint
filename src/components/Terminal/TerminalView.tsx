import React, { useEffect, ChangeEvent } from 'react';
import { XTerm } from 'xterm-for-react';
import { TerminalType } from '../../utils/terminalTypes';

const { Terminal } = require('xterm');
const ipc = require('electron').ipcRenderer;

const terminalArgs: TerminalType = {
  fontSize: 15,
  // Currently rows are hardcoded, next step is to make terminal sizing dynamic.
  rows: 30,
  fontFamily: 'monospace',
  theme: {
    background: '#002a36',
  },
};

const term = new Terminal(terminalArgs);

const TerminalView = () => {
  useEffect(() => {
    // console.log(global.projectFilePath);
    term.open(document.getElementsByClassName('terminal')[0]);
    // when we have input events (e), we would send the data to the main processor
    term.onData((e: ChangeEvent) => {
      ipc.send('terminal.toTerm', e);
    });
    // when incoming Data comes back to the main process, this ipc renderer
    // will take it and writes it to xterm monitor
    ipc.on('terminal.incData', (event, data: string) => {
      term.write(data);
    });
  }, []);

  return <XTerm className="terminal" />;
};

export default TerminalView;
