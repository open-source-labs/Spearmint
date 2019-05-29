import './styles.css'
import React from 'react'
import { useContext} from 'react'
import { FileCodeContext } from '../../App';
let remote = window.require('electron').remote;
let electronFs = remote.require('fs')

const FileDirectory = ({ fileTree }) => {
  const setFileCode = useContext(FileCodeContext);

  const handleShowCode = (fileTree) => {
    const content = electronFs.readFileSync(fileTree, "utf8");
    setFileCode(content);
  }

  const convertToHTML = (filetree) => {
    let folderImg = "https://img.icons8.com/ios/20/000000/opened-folder.png";
    let fileImg = "https://img.icons8.com/metro/20/000000/document.png";

    return filetree.map((file) => {
      if (file.files.length) {
        return (
          <ul key={file.fileName} style={ul}>
            <span>
              <img src={folderImg} alt=""/>
              <button style={fileBtn} className="fileBtn">
                {file.fileName}
              </button>
            </span>
            {file.files.length && convertToHTML(file.files, fileImg)}
          </ul>
        )
      } else {
        return (
          <ul key={file.filePath} style={ul}>
            <span>
              <img src={fileImg} alt=""/>
              <button style ={fileBtn} className ="fileBtn" onClick={() => handleShowCode(file.filePath)}>  
                {file.fileName}
              </button>
            </span>
          </ul>
        )
      }
    })
  }

  const fileDir = {
    padding: ".625rem",
    height: "auto",
    width: "12rem",
    border: "grey",
    backgroundColor: "white",
    overflow: "scroll"
  };

  const ul = {
    marginLeft: "10px", 
    listStyleType: "none",
    fontSize: "12px",
  }

  const fileBtn = {
    hover: "lightgrey",
    border: "none"
  }

  return (
    <>
    <div style={fileDir} className="fileDir">
      {fileTree && convertToHTML(fileTree)}
    </div>
    </>
  )
}

export default FileDirectory;

