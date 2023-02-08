![](/public/spearmint_crop.png)

<p align="center">
  🍃 ✨ spearmint v13 ✨ 🍃
</p>

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![SASS](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)
![Electron](https://img.shields.io/badge/Electron-191970?style=for-the-badge&logo=Electron&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)

Spearmint helps developers easily create functional Accessibility, Endpoint, GraphQL, Puppeteer, React, Hooks, Redux, Svelte, Vue, Security, and Solid.js tests without writing any code. It dynamically converts user inputs into executable Jest test code by using DOM query selectors provided by @testing-library.

# Installation

Please download spearmint from our [website](https://www.spearmintjs.com/)

# How to use in development mode

Please refer to [README-dev.md](https://github.com/open-source-labs/spearmint/blob/main/README-dev.md)

<br>

# How it works

1. Open the folder of the repo you'd like to create tests for, then choose the framework/type of test you'd like to create.
   <picture>
      <source media="(prefers-color-scheme: dark)" srcset="public/LoadProjectDemo.gif">
      <source media="(prefers-color-scheme: light)" srcset="public/LoadProjectDemo.gif">
      <img alt="spearmint gif" src="public/LoadProjectDemo.gif" width="800px">
   </picture>

2. Utilize our auto-complete, drop-down options, and tooltips features to easily create arrangement, action, and assertion test statements for React, Vue, Svelte, and Solid; reducer, action creator, asynchronous action creator, and middleware test statements for Redux; and hooks, context, endpoint, and GraphQL test statements.
3. Spearmint will then convert user input to dynamically generate a test file in the Code Editor.
   <picture>
      <source media="(prefers-color-scheme: dark)" srcset="public/ShowDemo.gif">
      <source media="(prefers-color-scheme: light)" srcset="public/ShowDemo.gif">
      <img alt="spearmint gif" src="public/ShowDemo.gif" width="800px">
   </picture>

4. Follow the instructions in the recently added User Guide tab on the right to export and run your tests.
   <picture>
      <source media="(prefers-color-scheme: dark)" srcset="public/RunDemo.gif">
      <source media="(prefers-color-scheme: light)" srcset="public/RunDemo.gif">
      <img alt="spearmint gif" src="public/RunDemo.gif" width="800px">
   </picture>

5. Don't forget to select your test file from the left panel in order to manually edit the test in the Test Editor; otherwise the changes won't be reflected in the test file.
   <picture>
      <source media="(prefers-color-scheme: dark)" srcset="public/SaveDemo.gif">
      <source media="(prefers-color-scheme: light)" srcset="public/SaveDemo.gif">
      <img alt="spearmint gif" src="public/SaveDemo.gif" width="800px">
   </picture>

# Containerization with Docker

Spearmint is now available as an OCI-compliant container image via Docker.

Windows and Linux users may access Spearmint by running a Docker image.

Please pull down the image from [Docker hub](https://hub.docker.com/repository/docker/spearmintoslabs/spearmint) if you would like to run Spearmint on Docker.

![Screenshot of spearmint's docker hub webpage](/public/docker.png)

For developers: [README-dev.md](https://github.com/open-source-labs/spearmint/blob/main/README-dev.md). This containes more information specific to developers such as data systems, outlines of the application, turning on dev tools, etc.

# New features with version 0.13.0

- Working with updated versions of node and electron.

- Accessibility component fixed.

- Reinstated dev testing.

- Migrating the codebase to TypeScript

- Added documentation for future developers

<br>

# Iteration Roadmap

1. _Continual TypeScript Conversion:_
   - This will help with the maintainability and quality of spearmint
2. _Persistant data:_
   - There is a framework for login, including github and google, however it is not implemented
   - Adding more features to make login and user data more valuable, such as favorited or saved tests
3. _Adding more testing:_
   - Either more frameworks to test
   - Or deeper testing of existing frameworks
4. _Revamp UI for certain test cases:_
   - Some of test cases needs improvement on UI as they do not have any styling or optimal user experience

<br>

# Known Bugs

1. Screen reader for Accessibilty can turn on and off but does not read.

<br>

# The Spearmint Team

|     Developed By      |                                                                                                                                                         |                                                                                                                                                             |
| :-------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------: |
|    Alan Richardson    |   [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/alanrichardson7)    |         [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/arichardson7/)         |
|       Alex Park       |      [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/apark0720)       |                             [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)]()                              |
|  Alfred Sta. Iglesia  |     [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/astaiglesia)      |         [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/astaiglesia/)          |
|     Anjanie McCoy     |     [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/anjaniemccoy)     |         [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/anjaniemccoy/)         |
|      Annie Shin       |      [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/annieshinn)      |          [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/annieshinn/)          |
|       Ben Kwak        |        [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/bkwak)         |           [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ben-kwak/)           |
|     Brandon Tran      |       [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/btran140)       |             [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://linkedin.com/in/btran140)              |
|     Chacta Brice      |    [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/StaticShock93)     | [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/chacta-isaacs-brice-258636ba/) |
|    Charlie Maloney    |   [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/charlie-maloney)    |       [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/charlie-maloney/)        |
|    Chen 'Chloe' Lu    |      [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/chloelu29)       |           [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/chloeclu/)           |
|      Chloe Aribo      |     [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/HeyItsChloe)      |         [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/chloe-aribo/)          |
|      Chris Cheng      |       [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ctpcheng)       |           [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ctpcheng/)           |
|  Cornelius Phanthanh  |     [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/corneeltron)      |      [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/corneliusphanthanh/)      |
|     Danny Wallace     |      [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/danuscript)      |          [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/danuscript/)          |
|      Dave Franz       |      [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/davefranz)       |          [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/dave-franz/)          |
|       David Kim       |       [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/koyykdy)        |          [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/dydavidkim/)          |
|   DeriAnte Sinclair   |        [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/dsin16)        | [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/deriante-sinclair-a76321238/)  |
| Dieu 'Dieunity' Hyunh |       [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/dieunity)       |          [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/dieu-huynh/)          |
|     Erik Komatsu      |      [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/etkomatsu)       |         [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/eric-komatsu/)         |
|       Erik Park       |      [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ericgpark)       |          [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ericgpark/)           |
|     Erika Collins     | [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/erikacollinsreynolds) |    [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/erika-collins-reynolds/)    |
|     Evan Berghoff     |       [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Berghoer)       |         [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/evanberghoff/)         |
|      Evan Decker      |      [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/EvanDecker)      |    [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/evan-d-decker/)     |
|    Gabriel Christo    |     [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/bielchristo)      |   [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/gabriel-christo-44364086/)   |
|        Huy Bui        |       [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/huyqbui)        |           [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/huyqbui/)            |
|   Jasmine Gonzalez    |     [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/jasminezalez)     |         [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jasminezalez/)         |
|      Joseph Nagy      |      [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Josephnagy)      |         [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/josephmnagy/)          |
|      Johnny Lim       |      [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/johnny-lim)      |                 [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/)                 |
|       Judy Song       |      [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/judysongg)       |          [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/judysongg/)           |
|      Julie Beak       |     [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/julicious100)     |          [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/juliebeak/)           |
|      Justin Baik      |       [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/JIB3377)        |         [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/justin-baik/)          |
|     Karen Pinilla     |     [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/karenpinilla)     |        [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/karen-pinilla/)         |
|       Li Cheng        |     [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/delacour124)      |      [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/li-cheng-76890540/)       |
|   Linda Wishingrad    |        [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/lcwish)        |       [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/lindawishingrad/)        |
|        Luis Lo        |      [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Luis-KM-Lo)      |           [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/luis-lo/)            |
|  Mahmoud 'Mo' Hmaidi  |      [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mhmaidi789)      |      [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mahmoud-hmaidi-mo/)       |
|      Max Bromet       |       [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mbromet)        |     [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/max-bromet-2607aa211/)     |
|   Max Weisenberger    |      [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/MaxWeisen)       |          [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/maxweisen/)           |
|      Mike Coker       |       [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mbcoker)        |          [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mike-coker/)          |
|       Mina Koo        |       [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/alsdk850)       |           [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/minakoo/)            |
|     Myles Tsutsui     |     [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mylestsutsui)     |         [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mylestsutsui/)         |
|   Natlyn Phomsvanh    |       [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/natlynp)        |                 [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/)                 |
|     Nicolas Pita      |     [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/nicolaspita)      |         [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/nicolaspita/)          |
|     Owen Eldridge     |     [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/oweneldridge)     |        [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/owen-eldridge/)         |
|      Rachel Yoo       |   [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/rachethecreator)    |          [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/rachel-yoo/)          |
|    Rawan Bairouti     |    [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/rawanBairouti)     |        [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/rawanbairouti/)         |
|    Ruzeb Chowdhury    |        [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Ruzeb)         |        [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ruzebchowdhury/)        |
|    Sean Haverstock    |   [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Sean-Haverstock)    |       [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/sean-haverstock/)        |
|       Sean Yoo        |       [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/seanyyoo)       |           [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/seanyyoo/)           |
|      Sharon Zhu       |      [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sharon-zhu)      |          [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/sharonzhu/)           |
|      Sieun Jang       |      [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sieunjang)       |            [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/sieunj/)            |
|   Terence Petersen    |      [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/TERR-inss)       |       [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/terence-petersen/)       |
|    Tolan Thornton     |      [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/taoantaoan)      |        [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/tolanthornton/)         |
|    Tristen Wastell    |       [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/twastell)       |        [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/tristenwastell/)        |
|     Troy Witonsky     |      [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/TWitonsky)       |         [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/troy-witonsky)         |
|    Tyler Martinez     |     [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/tytyjameson)      |     [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/tylerjamesonmartinez/)     |
|      William Lee      |    [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/WilliamHaakLee)    |        [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/williamhaaklee)         |
|      Wilson Tran      |     [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Wilson-Tran)      |         [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/wilsonwttran/)         |
|      Yeunha Kim       |     [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/yeunhakim93)      |         [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/yeunhakim93/)          |

<hr>
