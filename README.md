![](/public/spearmint_crop.png)

Spearmint helps developers easily create functional Accessibility, Endpoint, GraphQL, Puppeteer, React, Hooks, Redux, Svelte, Vue, Security, and now **_Solid.js_** tests without writing any code. It dynamically converts user inputs into executable Jest test code by using DOM query selectors provided by @testing-library.

# Installation 
Please download spearmint from our [website](https://www.spearmintjs.com/).


# How to use in development mode

Please refer to [README-dev.md](https://github.com/open-source-labs/spearmint/blob/main/README-dev.md)

<br>


# How it works


1.  On the initial screen, a user is prompt to login, sign up (via OAuth or standard sign-up/login), or login as a guest. Once logged in, choose your file and load your application to start creating tests.

![Demo of the login page](/public/LoginDemo.gif)

2.  Utilize our auto-complete, drop-down options, and tooltips features to easily create arrangement, action, and assertion test statements for React, Vue, Svelte, and Solid; reducer, action creator, asynchronous action creator, and middleware test statements for Redux; and hooks, context, endpoint, and GraphQL test statements. Spearmint can save test templates for future use for logged in user (not guests). 

![Demo of the show button](/public/ShowDemo.gif)

3.  Spearmint will then convert user input to dynamically generate a test file. You can click the export icon on the nav bar to automatically save the test file in the **\_\_tests\_\_** folder to run test or to modify in the future.

![Demo of the save button](/public/SaveDemo.gif)    


4.  Lastly click **Run Test** button and follow the guide on the popup and click what type of test you would like to perform.
![Demo of the run button](/public/RunDemo.gif)

5. Spearmint v.0.11 now supports Solid.js, an up-and-coming front-end JavaScript library.

![Screenshot of the solid panel](/public/demo.png)

# Containerization with Docker
Spearmint is now available as an OCI-compliant container image via Docker. 

Windows and Linux users may access Spearmint by running a Docker image.

Please pull down the image from [Docker hub](https://hub.docker.com/repository/docker/spearmintoslabs/spearmint) if you would like to run Spearmint on Docker. 

![Screenshot of spearmint's docker hub webpage](/public/docker.png)

For developers: [README-dev.md](https://github.com/open-source-labs/spearmint/blob/main/README-dev.md)

# New features with version 0.11.0

* Testing capability for Solid.js components

* Optimized UI/UX features

* Containerization in Docker

<br>

# The Spearmint Team
<hr>

> Alan [@alanrichardson7](https://github.com/alanrichardson7) <br />
> Alex [@apark0720](https://github.com/apark0720) <br />
> Alfred  [@astaiglesia](https://github.com/astaiglesia) <br />
> Anjanie [@anjaniemccoy](https://github.com/anjaniemccoy) <br />
> Annie  [@annieshinn](https://github.com/annieshinn) <br />
> Ben [@bkwak](https://github.com/bkwak) <br />
> Chacta [@StaticShock93](https://github.com/StaticShock93) <br />
> Charlie [@charlie-maloney](https://github.com/charlie-maloney) <br /> 
> Chen(Chloe) [@chloelu29](https://github.com/chloelu29) <br />
> Chloe [@HeyItsChloe](https://github.com/HeyItsChloe) <br />
> Chris [@cptcheng](https://github.com/cptcheng) <br />
> Cornelius [@corneeltron](https://github.com/corneeltron) <br />
> David [@koyykdy](https://github.com/koyykdy) <br />
> Dave [@davefranz](https://github.com/davefranz) <br />
> Deriante [@dsin16](https://github.com/dsin16) <br />
> Dieu [@dieunity](https://github.com/dieunity) <br />
> Eric K. [@etkomatsu](https://github.com/etkomatsu) <br />
> Eric P. [@ericgpark](https://github.com/ericgpark) <br />
> Evan [@Berghoer](https://github.com/Berghoer) <br /> 
> Gabriel [@bielchristo](https://github.com/bielchristo) <br />
> Huy [@huyqbui](https://github.com/huyqbui) <br />
> Joe [@josephnagy](https://github.com/Josephnagy) <br />
> Johnny [@johnny-lim](https://github.com/johnny-lim) <br />
> Judy [@judysongg](https://github.com/judysongg) <br />
> Julie [@julicious100](https://github.com/julicious100) <br />
> Justin [@JIB3377](https://github.com/JIB3377) <br />
> Karen [@karenpinilla](https://github.com/karenpinilla) <br /> 
> Li [@delacour124](https://github.com/delacour124) <br />
> Linda [@lcwish](https://github.com/lcwish) <br />
> Luis [@Luis-KM-Lo](https://github.com/Luis-KM-Lo) <br />
> Max B. [@mbromet](https://github.com/mbromet) <br />
> Max W. [@MaxWeisen](https://github.com/MaxWeisen) <br />
> Mike [@mbcoker](https://github.com/mbcoker) <br />
> Mina [@alsdk850](https://github.com/alsdk850) <br />
> Mo [@mhmaidi789](https://github.com/mhmaidi789) <br /> 
> Myles [@mylestsutsui](https://github.com/mylestsutsui) <br />
> Natlyn [@natlynp](https://github.com/natlynp) <br /> 
> Nick [@nicolaspita](https://github.com/nicolaspita) <br />
> Owen [@oweneldridge](https://github.com/oweneldridge) <br />
> Rachel [@rachethecreator](https://github.com/rachethecreator) <br />
> Ruzeb [@Ruzeb](https://github.com/Ruzeb) <br />
> Sean H. [@sean-haverstock](https://github.com/Sean-Haverstock) <br /> 
> Sean Y. [@seanyyoo](https://github.com/seanyyoo) <br />
> Sharon [@sharon-zhu](https://github.com/sharon-zhu) <br /> 
> Sieun [@sieunjang](https://github.com/sieunjang) <br />
> Terence [@TERR-inss](https://github.com/TERR-inss) <br />
> Tolan [@taoantaoan](https://github.com/taoantaoan) <br />
> Tristen [@twastell](https://github.com/twastell) <br />
> Tyler [@tytyjameson](https://github.com/tytyjameson) <br />
> Yeunha [@yeunhakim93](https://github.com/yeunhakim93)
<hr>

***

# If You Want To Contribute: 
The following is a list of features + improvements for future open-source developers that the Spearmint team has either started or would like to see implemented. Or, if you have additional new ideas, feel free to implement those as well! 
- Exporting test files in TypeScript
- Additional security testing functionality 
- Dry refactoring of codebase