// import './styles.css'
import React from 'react'

const FileTree = ({ fileTree, handleShowCode }) => {
  const convertToHTML = (filetree) => {
    let folderImg = "https://img.icons8.com/ios/26/000000/opened-folder.png";
    let fileImg = "https://img.icons8.com/metro/26/000000/document.png";
    
    return filetree.map((file) => {
      if (file.files.length) {
        return (
          <ul key={file.fileName}>
            <span>
              <img src={folderImg}></img>
              <button className="fileBtn">
                {file.fileName}
              </button>
            </span>
            {file.files.length && convertToHTML(file.files)}
          </ul>
        )
      } else {
        return (
          <ul key={file.filePath}>
            <img src={fileImg}></img>
            <button className ="fileBtn" onClick={() => handleShowCode(file.filePath)}>  
              {file.fileName}
            </button>
          </ul>
        )
      }
    })
  }



    return (
      <>
        {fileTree && convertToHTML(fileTree)}
      </>
    )
  }

export default FileTree;
