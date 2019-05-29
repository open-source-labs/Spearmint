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

  const folderToggle = (file) => {
    file.toggle = !file.toggle;
  }

  const convertToHTML = (filetree) => {
    let folderImg = "https://img.icons8.com/ios/20/000000/opened-folder.png";
    let fileImg = "https://img.icons8.com/metro/20/000000/document.png";
  
    return filetree.map((file) => {
        if (file.fileName !== 'node_modules' && file.fileName !== '.git') {
          if (file.files.length > 0) {
            return (
              <ul key={file.fileName} style={ul}>
                <span>
                  <img src={folderImg}></img>
                  <button style={fileBtn} className="fileBtn" onClick={() => folderToggle(file)}>
                    {file.fileName}
                  </button>
                </span>
                {file.files.length > 0 && convertToHTML(file.files, fileImg)}
              </ul>
            )
          } 
          if (file.files.length == 0) {
            return (
              <ul key={file.filePath} style={ul}>
                <span>
                  <img src={fileImg}></img>
                  <button style ={fileBtn} className ="fileBtn" onClick={() => handleShowCode(file.filePath)}>  
                    {file.fileName}
                  </button>
                </span>
              </ul>
            )
        }
        }
    })
  }

  // const showFiles = (filetree) => {

  //   let folderImg = "https://img.icons8.com/ios/20/000000/opened-folder.png";
  //   let fileImg = "https://img.icons8.com/metro/20/000000/document.png";
  //   // console.log('filetree in showfiles', filetree)

  //     return filetree.map((file) => {
  //       // console.log('file in showfiles loop', file)
  //       if (file.toggle == true) {          
  //         if (file.files.length > 0) {
  //           // console.log('INSIDE > 0 CONDITIONAL', file)
  //           // console.log('INSIDE > 0 CONDITIONAL', file.files[0].files, 'at index 0')
  //           return (
  //             <ul key={file.fileName} style={ul}>
  //               <span>
  //                 <img src={folderImg}></img>
  //                 <button style={fileBtn} className="fileBtn" onClick={() => {folderToggle(file)}}>
  //                   {file.fileName}
  //                 </button>
  //               </span>
  //               {file.files.length > 0 && showFiles(file.files[0][file.files], fileImg)}
  //             </ul>
  //           )
  //         } 
  //         if (file.files.length == 0) {
  //           // console.log('INSIDE == 0 CONDITIONAL')
  //           return (
  //             <ul key={file.filePath} style={ul}>
  //               <span>
  //                 <img src={fileImg}></img>
  //                 <button style ={fileBtn} className ="fileBtn" onClick={() => handleShowCode(file.filePath)}>  
  //                   {file.fileName}
  //                 </button>
  //               </span>
  //             </ul>
  //           )
  //         }
  //       }
  //     })
  // }

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

