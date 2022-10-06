# How to use in development mode

1. 
    **Mac Developers**: Install Xcode 

    **Windows Developers**: Install Node.js globally, may also have to run Spearmint in admin mode. 

2. Fork and clone this repository.
3. Install node version 16.13: ```nvm install 16.13```
4. Use node version 16.13: ```nvm use 16.13```
5. ```npm install```
6. Create a .env file in the root directory of the project
7. Insert the following lines of code into the .env file
    ```
    APP_DEV=true
    BROWSER=non
    SKIP_PREFLIGHT_CHECK=true
    MONGO_LINK=
    ```
8. Set MONGO_LINK to your MongoDB URI (ex: mongodb://localhost:27017)
9. Make sure your MongoDB is running if it's hosted locally. 
10. ```npm run rebuild``` 
11. ```npm run dev``` 

# Tips for development mode

- To enable hot-module reloading, uncomment line 24 in the Electron.js file.
        // require('electron-reloader')(module);
- To enable dev tools, uncomment line 72 in the Electron.js file:
        // mainWindow.webContents.openDevTools();

# Build and Run image on Docker

## Pre-requisites 
- Mongo: Mongodb is used for authentication functionality. If you didn't use locally hosted mongodb URI in .env file, you may skip to the X server section. 

    1. Add `172.17.0.1` and `0.0.0.0` to the network interfaces of mongo config file.

        a. Open `mongod.cfg` (Usually located in C:\Program Files\MongoDB\Server\4.4\bin)

            # network interfaces
            net:
              port: 27017
              bindIp: 127.0.0.1, 172.17.0.1, 0.0.0.0

     2. Run mongo on port 27017

- X server

    1. Download and run either [X410](https://x410.dev/) or [VcXsrv](https://sourceforge.net/projects/vcxsrv/)

        * For X410, use the following configuration

        ![x410 with display = 0](/public/x410.png)

        * For VcXsrv: change the display number to 0, for other settings, use default. 

        ![VcXsrv with display = 0](/public/VcXsrv.png)


## Running the image 
After running the mongo on port 27017 and running the x server with display number of 0, follow the steps below. 

1. Build the docker image by running the following command

    `docker build -t [image name] .`

2. Run the docker image by using the following command: 

    `docker run -e DISPLAY='host.docker.internal:0.0' -it -v [directory of project to be tested]:/[directory to create volume] [image name]`

    - `-e DISPLAY='host.docker.internal:0.0'`: Set environment variable ‘display’ to host.docker.internal:0.0 

    - `-it`: Run container as interactive

    - `-v`: Creates a volume and mounts the testing application into the container. (ex: `-v [testing files]:[created volume]`)

    *Please note that once the spearmint container is running, you can only access the folders that you mounted here.`  qGHP\
*Please note that the image uses root user, as shown in the Dockerfile.
    
