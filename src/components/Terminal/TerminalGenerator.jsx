import { cyan } from '@material-ui/core/colors';
import React, { useEffect } from 'react';
import { XTerm } from 'xterm-for-react';
import { FitAddon } from 'xterm-addon-fit';
const { Terminal } = require('xterm');
const ipc = require('electron').ipcRenderer;


const term = new Terminal({
  fontSize: 10,
  fontFamily: 'monospace',
  theme: {
    background: '#002a36'
  }
});
const fitAddon = new FitAddon();


const TerminalGenerator = () => {

  useEffect(() => {
    term.loadAddon(fitAddon);
    term.open(document.getElementsByClassName('terminal')[0]);
    fitAddon.fit();
    term.onData(e => {
      ipc.send('terminal.toTerm', e);
    });
    ipc.on('terminal.incData', function(event, data) {
      term.write(data);
    });
  }, []);


  return <XTerm className='terminal' />
}

export default TerminalGenerator;
