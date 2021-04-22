import React, { useEffect } from 'react';
const { Terminal } = require('xterm');
const ipc = require('electron').ipcRenderer;
const term = new Terminal()


const TerminalGenerator = () => {
  useEffect(() => {
    term.open(document.getElementsByClassName('terminal')[0]);
    term.onData(e => {
      ipc.send('terminal.toTerm', e);
    });
    ipc.on('terminal.incData', function(event, data) {
      term.write(data);
    });
  }, []);
  return <div/>;
}

export default TerminalGenerator;
