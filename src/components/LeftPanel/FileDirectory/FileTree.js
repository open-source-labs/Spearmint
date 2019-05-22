import './styles.css'
import React, { Component } from 'react'
// import { ipcRenderer } from 'electron';
const { ipcRenderer } = window.require('electron')
let remote = window.require('electron').remote
// let electron = require('electron')

let electronFs = remote.require('fs')

export default class FileTree {
    constructor(path, name = null){
        this.path = path;
        this.name = name;
        this.items = [];
    }

    build = () => {
        this.items = FileTree.readDir(this.path);
    }

    renderUnorderedList = () => {
        console.log('items inside render list func', this.items)
        return FileTree.renderUnorderedListHtml(this.items);
    }

    static renderUnorderedListHtml(files) {
        return (
            <div>
                {files.map((file, i) => {
                    return (
                        <ul key={i}>
                            <span><img src="https://img.icons8.com/metro/26/000000/document.png"></img>{file.name}</span>
                            {/* <span>{file.name}</span> */}
    
                            {file.items.length > 0 &&
                                FileTree.renderUnorderedListHtml(file.items)
                            }
                           
                        </ul>
                    )
                })}
            </div>
        )
    }


    static readDir(path) {
        var fileArray = [];
        electronFs.readdirSync(path).forEach(file => {
            let fileInfo = new FileTree(`${path}//${file}`, file)
                console.log(fileInfo.path, 'fileinfo path')
                let stats = electronFs.statSync(fileInfo.path);
                    if (stats.isDirectory()) {
                        fileInfo.items = FileTree.readDir(fileInfo.path);
                    }
                    
                // })
                fileArray.push(fileInfo);
            })
            console.log('file array', fileArray)
            return fileArray;
            }
        
}


