import React, { useEffect } from 'react';
import { XTerm } from 'xterm-for-react';
const { Terminal } = require('xterm');
const ipc = require('electron').ipcRenderer;

const term = new Terminal({
  fontSize: 15,
  // Currently rows are hardcoded, next step is to make terminal sizing dynamic.
  rows: 30,
  fontFamily: 'monospace',
  theme: {
    background: '#002a36'
  }
});

const TerminalGenerator = () => {
  useEffect(() => {
    term.open(document.getElementsByClassName('terminal')[0]);
    term.onData(e => {
      ipc.send('terminal.toTerm', e);
    });
    ipc.on('terminal.incData', (event, data) => {
      term.write(data);
    });
  }, []);


  return <XTerm className='terminal' />
}

export default TerminalGenerator;
