import '../components/NavBar/styles.css'
import React, { useContext, useState } from 'react';
import FileDirectory from '../components/NavBar/FileDirectory';
import { FileTreeContext, LoadedContext, UrlContext } from '../App';

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

const ProjectLoader = () => {

  const setUrl = useContext(UrlContext)
  const setLoaded = useContext(LoadedContext)
  const setFileTree = useContext(FileTreeContext);

  const handleChangeUrl = (e) => {
    setUrl(e.target.value)
  }
  
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
      setLoaded(!false)
      setFileTree(generateFileTreeObject(directory[0]));
    }
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
      if (fileData.isDirectory()) {
        file.files = generateFileTreeObject(file.filePath)
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
      <input type='text' id='url' placeholder="Enter test site's URL..." onChange={handleChangeUrl}></input>
      <button className="openBtn" onClick={handleOpenFolder}>
        Open Folder
      </button>
      <div id="filetree">
      </div>
    </div>
  );
}

export default ProjectLoader;



