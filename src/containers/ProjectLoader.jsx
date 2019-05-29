import '../components/NavBar/styles.css'
import React, { useContext, useState } from 'react';
import FileDirectory from '../components/NavBar/FileDirectory';
import { FileTreeContext, LoadedContext } from '../App';
import { Treebeard } from 'react-treebeard/dist';

let remote = window.require('electron').remote;
let electronFs = remote.require('fs')
let { dialog } = remote;

const h1 = {
  fontSize:"80px",
  textAlign:"center",
  paddingTop: "200px",
  fontFamily: "comfortaa",
  color: "#02c2c3",
}

const h2 = {
  fontSize:"24px",
  textAlign:"center",
  paddingTop: "10px",
  paddingBottom: "20px",
  fontFamily: "montserrat",
  color: "#ffc800"
}

const imgStyle ={
  padding: "10px"
}


let dataTree = {
  "name": "react-treebeard",
  "toggled": false,
  "children": [
      {
          "name": "example",
          "children": [
              {
                  "name": "app.js"
              },
              {
                  "name": "data.js"
              },
              {
                  "name": "index.html"
              },
              {
                  "name": "styles.js"
              },
              {
                  "name": "webpack.config.js"
              }
          ]
      },
      {
          "name": "node_modules",
          "loading": true,
          "children": []
      },
      {
          "name": "src",
          "children": [
              {
                  "name": "components",
                  "children": [
                      {
                          "name": "decorators.js"
                      },
                      {
                          "name": "treebeard.js"
                      }
                  ]
              },
              {
                  "name": "index.js"
              }
          ]
      },
      {
          "name": "themes",
          "children": [
              {
                  "name": "animations.js"
              },
              {
                  "name": "default.js"
              }
          ]
      },
      {
          "name": "Gulpfile.js"
      },
      {
          "name": "index.js"
      },
      {
          "name": "package.json"
      }
  ],
  "active": true
}


const ProjectLoader = () => {

  const setLoaded = useContext(LoadedContext)
  const setFileTree = useContext(FileTreeContext);


  //TREE BEARD
  const [data, setData] = useState(dataTree);
  const [cursor, setCursor] = useState(false);



  const handleOpenFolder = () => {
    let directory = dialog.showOpenDialog({
      properties: ['openDirectory'],
      filters: [
        {name: 'Javascript Files', extensions: ['js', 'jsx']},
        {name: 'Style', extensions: ['css']},
        {name: 'Html', extensions: ['html']}
      ]
    });
    if (directory && directory[0]){
      setLoaded(true)
      setFileTree(generateFileTreeObject(directory[0]));
    }
  }

//TREE BEARD
  const onToggle = (node, toggled) => {
    // console.log('before cursor', cursor)
    if (cursor) {
        cursor.active = false;
    }
    // console.log('after cursor', cursor)
    node.active = true;
    // console.log('node in on toggle', node)
    // console.log('node.active', node.active)
    // console.log('toggled in ontoggle', node.toggled)
    // console.log('toggled', toggled)
    //children is files in directory
    if (node.children) {
        node.toggled = toggled;
    }
    // console.log('data', data)
    setCursor(node);
    setData(Object.assign({}, data))
  }

  //reads contents within the selected directory and checks if it is a file/folder
  
  const generateFileTreeObject = (directoryPath) => {
      let fileArray = electronFs.readdirSync(directoryPath).map(fileName => {
        const file = {
          filePath: `${directoryPath}/${fileName}`,
          fileName,
          files: [],
        }
        //generateFileTreeObj will be recursively called if it is a folder
        const fileData = electronFs.statSync(file.filePath);
        if (file.fileName !== '.git' && file.fileName !== 'node_modules') {
          if (fileData.isDirectory()) {
              file.toggle = false;
              file.files = generateFileTreeObject(file.filePath)
          }
        }
        return file;
      })
      return fileArray;
  }




  return (
    <div>
      <span>
      <h1 style={h1}>spearmint
        <img style={imgStyle} src="https://img.icons8.com/ios/40/000000/natural-food.png"></img>
      </h1>
      </span>
      <h2 style={h2}>A FRESH TAKE ON TESTING </h2>
      <button className="openBtn" onClick={handleOpenFolder}>
        Open Folder
      </button>
      <Treebeard data={data} onToggle={onToggle}/>
      <div id="filetree">
      </div>
    </div>
  );
}

export default ProjectLoader;



