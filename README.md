![](/public/spearmint_crop.png)

Spearmint helps developers easily create functional Accessibility, Endpoint, GraphQL, Puppeteer, React, Hooks, Redux, Svelte, Vue, Security, and now **_Solid.js_** tests without writing any code. It dynamically converts user inputs into executable Jest test code by using DOM query selectors provided by @testing-library.

# Installation 
Please download spearmint from our [website](https://www.spearmintjs.com/)


# How to use in development mode

Please refer to [README-dev.md](https://github.com/open-source-labs/spearmint/blob/main/README-dev.md)

<br>


# How it works

1. Open the folder of the repo you'd like to create tests for, then choose the framework/type of test you'd like to create. 

2.  Utilize our auto-complete, drop-down options, and tooltips features to easily create arrangement, action, and assertion test statements for React, Vue, Svelte, and Solid; reducer, action creator, asynchronous action creator, and middleware test statements for Redux; and hooks, context, endpoint, and GraphQL test statements. Endpoint testing for Deno is now available in version 0.12.0. 


3.  Spearmint will then convert user input to dynamically generate a test file. Follow the instructions in the recently added User Guide tab on the right to export and run your tests. Don't forget to select your test file from the left panel in order to manually edit the test in the Test Editor; otherwise the changes won't be reflected in the test file. 


# Containerization with Docker
Spearmint is now available as an OCI-compliant container image via Docker. 

Windows and Linux users may access Spearmint by running a Docker image.

Please pull down the image from [Docker hub](https://hub.docker.com/repository/docker/spearmintoslabs/spearmint) if you would like to run Spearmint on Docker. 

![Screenshot of spearmint's docker hub webpage](/public/docker.png)

For developers: [README-dev.md](https://github.com/open-source-labs/spearmint/blob/main/README-dev.md)

# New features with version 0.12.0

* More in depth user guide and a demo video for React testing.

* More intuitive and streamlined UX, with UI imporovements as well. 

* Endpoint testing for Deno.

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
> Erika [@erikacollinsreynolds](https://github.com/erikacollinsreynolds) <br />
> Evan [@Berghoer](https://github.com/Berghoer) <br /> 
> Gabriel [@bielchristo](https://github.com/bielchristo) <br />
> Huy [@huyqbui](https://github.com/huyqbui) <br />
> Jasmine [@jasminezalez](https://github.com/jasminezalez) <br />
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
> Rawan [@rawanBairouti](https://github.com/rawanBairouti) <br />
> Ruzeb [@Ruzeb](https://github.com/Ruzeb) <br />
> Sean H. [@sean-haverstock](https://github.com/Sean-Haverstock) <br /> 
> Sean Y. [@seanyyoo](https://github.com/seanyyoo) <br />
> Sharon [@sharon-zhu](https://github.com/sharon-zhu) <br /> 
> Sieun [@sieunjang](https://github.com/sieunjang) <br />
> Terence [@TERR-inss](https://github.com/TERR-inss) <br />
> Tolan [@taoantaoan](https://github.com/taoantaoan) <br />
> Tristen [@twastell](https://github.com/twastell) <br />
> Tyler [@tytyjameson](https://github.com/tytyjameson) <br />
> Wilson [@Wilson-Tran](https://github.com/Wilson-Tran) <br />
> Yeunha [@yeunhakim93](https://github.com/yeunhakim93)
<hr>

***

# If You Want To Contribute: 
The following is a list of features + improvements for future open-source developers that the Spearmint team has either started or would like to see implemented. Or, if you have additional new ideas, feel free to implement those as well! Please refer to the README-dev.md for more in depth info. 
- Exporting test files in TypeScript
- Dry refactoring of codebase
- Persist user data (incomplete tests for example)
- Fix known bugs and issues
- Add more customization to the tests themseleves
