import React, { useEffect } from 'react';
import { XTerm } from 'xterm-for-react';
const { Terminal } = require('xterm');
const ipc = require('electron').ipcRenderer;


const term = new Terminal();


const TerminalGenerator = () => {

  useEffect(() => {
   console.log('this is terminal div', document.getElementsByClassName('terminal')[0])
    term.open(document.getElementsByClassName('terminal')[0]);
    term.onData(e => {
      ipc.send('terminal.toTerm', e);
    });
    ipc.on('terminal.incData', function(event, data) {
      term.write(data);
    });
  }, []);


  return <XTerm className='terminal' options={{ fontSize: 100 }} />
}

export default TerminalGenerator;
