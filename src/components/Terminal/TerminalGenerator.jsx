import React, { useEffect, useContext } from 'react';
const { Terminal } = require('xterm');

const term = new Terminal()


const TerminalGenerator = () => {
  useEffect(() => {
    term.open(document.getElementsByClassName('terminal')[0]);
    term.write('Hello, world');
  }, []);
  return <div></div>;
}

export default TerminalGenerator;
