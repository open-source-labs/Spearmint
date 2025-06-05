# How to use in development mode

**Mac Developers**: Install Xcode command line tools if you don't already have them.

**Windows Developers**: Install Node.js globally, may also have to run Spearmint in admin mode.

## Procedure for working on the project as a Windows user.

1. Download VcXsrv or a similar program in order to run an X environment on Windows. [VcXsrv](https://sourceforge.net/projects/vcxsrv/)
2. Configure XLaunch properly:
3. On the first settings screen on launch, select the following settings:
	- Multiple windows
	- Display number: -1
4. On Client Startup: Select “Start no client”
5. On Extrra Settings: select the following options:
   - Clipboard
   - Primary Selection
   - Native opengl
   - In “Additional Parameters”:  write ‘-ac’ (no quotes)
     
  
     Set up your WSL enviorment
   - Set the DISPLAY variable: `export DISPLAY=:0` to match VcXsrv configuration
  
   - Before running Spearmint, ensure the Electron binary is available. From your project root, run:
   - ls ./node_modules/.bin/electron
   - If you dont see a result, intall Electron: npm install
  

Completing these steps after installing will launch XLaunch and enable you to run Spearmint in the Windows desktop environment.  

# Initial Setup

As of January 2023, spearmint works with node version 20.1.0.
React must be version 17 due to a dependency for mui. Fix-path must be version 3.0.0 due to 4.0.0 only being usable with an import statement, which is not supported in electron.jsx.

1. Fork and clone this repository.

2. `npm install`

3. Create a .env file in the root directory of the project

4. Insert the following lines of code into the .env file

   ```
   APP_DEV=true
   BROWSER=non
   SKIP_PREFLIGHT_CHECK=true
   MONGO_LINK=mongodb+srv://username:spearmint1234@cluster0.nzon2t8.mongodb.net/?retryWrites=true&w=majority
   ```

5. Set MONGO_LINK to your MongoDB URI or use the URI we provided (ex: mongodb://localhost:27017)

6. Make sure your MongoDB is running if it's hosted locally.

7. `npm run rebuild` (different from `npm rebuild` so please pay attention to that)

8. `npm run dev`

# Tips for development mode

- To enable hot-module reloading, uncomment line 22 in the electron.jsx file.

      // require('electron-reloader')(module);

- To enable Chrome Dev Tools, uncomment line 70 in the electron.jsx file:

      // mainWindow.webContents.openDevTools();

# Suggestions if you would like contriubute:

1. Exporting test files in TypeScript: the tests currently export in JS.

2. Convert codebase to TypeScript: currently, there are some files in TS, and others in JS. It would be great to convert all to TS.

3. Dry refactoring of codebase: A lot of the folders and files for the frontend frameworks testing are the same, and the codebase would GREATLY benefit from refactoring and modularizing those.

4. Persist user data: there is currently sign up and login functionality. V0.13.0 commented out the login functionality because there is currently no user data being persisted. A great feature would be to save tests to work on them later, or create templates for each user.

5. GitHub OAuth is functional, but Google OAuth is currently broken. If you are planning to persist user data, this is an excellent feature to resolve.

6. Add more customization to the tests themselves such as chaining expects, add the ability to use siblings and children, etc., or having the ability to test more than one component in one test file.

7. Some of test cases needs improvement on UI as they do not have any styling or optimal user experience

8. Continue to improve internal testing coverage – while it has been greatly expanded there are many parts of the internals of the application that are still not being tested, and especially with regards to integration and end to end testing, more could be done.

9. Consider removing MUI framework as it is incompatible with React v18+ and no longer being actively updated - either replacing with another frontend framework or styling via CSS.

10. Consider implementing React Dev Tools in the app.
    
11. Clean up the before cy.visit('') inside useGenerateTest.jsx.
    
13. Modernize app UI

**_Please feel free to add any other features or fixes that you would like or are interested in._**

# Build and Run image on Docker

## Pre-requisites

- Mongo: Mongodb is used for authentication functionality. If you didn't use locally hosted mongodb URI in .env file, you may skip to the X server section.

  1.  Add `172.17.0.1` and `0.0.0.0` to the network interfaces of mongo config file.

      a. Open `mongod.cfg` (Usually located in C:\Program Files\MongoDB\Server\4.4\bin)

          # network interfaces
          net:
            port: 27017
            bindIp: 127.0.0.1, 172.17.0.1, 0.0.0.0

  2.  Run mongo on port 27017

- X server

  1. Download and run either [X410](https://x410.dev/) or [VcXsrv](https://sourceforge.net/projects/vcxsrv/)

     - For X410, use the following configuration

     ![x410 with display = 0](/public/x410.png)

     - For VcXsrv: change the display number to 0, for other settings, use default.

     ![VcXsrv with display = 0](/public/VcXsrv.png)

## Running the image

After running the mongo on port 27017 and running the x server with display number of 0, follow the steps below.

1.  Build the docker image by running the following command

    `docker build -t [image name] .`

2.  Run the docker image by using the following command:

        `docker run -e DISPLAY='host.docker.internal:0.0' -it -v [directory of project to be tested]:/[directory to create volume] [image name]`

        - `-e DISPLAY='host.docker.internal:0.0'`: Set environment variable ‘display’ to host.docker.internal:0.0

        - `-it`: Run container as interactive

        - `-v`: Creates a volume and mounts the testing application into the container. (ex: `-v [testing files]:[created volume]`)

        *Please note that once the spearmint container is running, you can only access the folders that you mounted here.`

    **_Please note that the image uses root user, as shown in the Dockerfile._**

# Resources for onboarding developers

<div align="center" style="display:flex;flex-direction:column;"}>
  <div align>
  <a href="https://excalidraw.com/#room=9abc890c35d8e7d3f149,htwzR9k0SUhZzhwB3zjJ8A">
      <img width="300" height="72" alt="Connect to the Dev Excalidraw" src="https://img.shields.io/badge/Excalidraw-181717?style=for-the-badge&logo"/>
  </a>
  <a href="https://discord.gg/5FNPTvZSTq">
    <img width="300" height="72" src="https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white"/>
  </a>
  <h3>Virtual whiteboard for sketching the structure/data flow of spearmint. Also inside the /public/spearmint.svg file</h3>
  <h3>Let's stay up to date, ask/answer questions, and connect with one another!</h3>
  <h3>Join the spearmint developer community Discord!</h3>
</div>
