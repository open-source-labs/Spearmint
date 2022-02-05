import React from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "./xterm.css";
// //import "./App.css";
// import { Resizable } from "re-resizable";
// import ResizeObserver from "react-resize-observer";

let term;
const fitAddon = new FitAddon();

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      logs: ""
    };
  }

  componentDidMount() {
    term = new Terminal({
      convertEol: true,
      fontFamily: `'Fira Mono', monospace`,
      fontSize: 15,
      fontWeight: 900
      // rendererType: "dom" // default is canvas
    });

    //Styling
    term.setOption("theme", {
      background: "black",
      foreground: "white"
    });

    // Load Fit Addon
    term.loadAddon(fitAddon);

    // Open the terminal in #terminal-container
    term.open(document.getElementById("xterm"));

    //Write text inside the terminal
    term.write("I am Blue and i like it");

    // Make the terminal's size and geometry fit the size of #terminal-container
    fitAddon.fit();

    term.onKey((key) => {
      const char = key.domEvent.key;
      if (char === "Enter") {
        this.prompt();
      } else if (char === "Backspace") {
        term.write("\b \b");
      } else {
        term.write(char);
      }
    });

    this.prompt();
  }

  prompt = () => {
    var shellprompt = "$ ";
    term.write("\r\n" + shellprompt);
  };

  render() {
    return (
      <div className="App" style={{ background: "" }}>
        <h1>Xterm.js</h1>
        {/* <Resizable
          width={350}
          height={350}
          style={{
            background: "firebrick",
            padding: "0.4em",
            margin: "1em"
          }}
        >
          <div id="xterm" style={{ height: "100%", width: "100%" }} />
          <ResizeObserver
            onResize={rect => {
              fitAddon.fit();
              console.log("Resized. New bounds:", rect.width, "x", rect.height);
            }}
            onPosition={rect => {
              console.log("Moved. New position:", rect.left, "x", rect.top);
            }}
          />
        </Resizable> */}
      </div>
    );
  }
}
