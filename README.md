![](/public/spearmint_crop.png)

Spearmint helps developers easily create functional Accessibility, Endpoint, GraphQL, Puppeteer, React, Hooks, Redux, Svelte, Vue, and Security tests without writing any code. It dynamically converts user inputs into executable Jest test code by using DOM query selectors provided by @testing-library.

# Installation 
Please download spearmint from our [website](https://www.spearmintjs.com/). Available for Mac OS, Windows, and Linux.


# How to use in development mode

**Mac Developers**: Install Xcode 

**Windows Developers**: Install Node.js globally

1. Fork and clone this repository.
2. ```npm install```
3. ```npm run watch```
4. ```npm run start-dev```

Note: Windows users may also have to run Spearmint in admin mode

5. Create a .env file in the root directory of the project
6. Insert the following lines of code into the .env file
```
APP_DEV=true
BROWSER=non
SKIP_PREFLIGHT_CHECK=true
MONGO_LINK=
```
7. Set MONGO_LINK to your MongoDB URI


<br>


# How it works


1.  On the initial screen, a user is prompt to login, sign up (via OAuth or standard sign-up/login), or login as a guest. Once logged in, choose your file and load your application to start creating tests.

![](/public/darkModeLogin.gif)

2.  Utilize our auto-complete, drop-down options, and tooltips features to easily create arrangement, action, and assertion test statements for React, Vue, and Svelte; reducer, action creator, asynchronous action creator, and middleware test statements for Redux; and hooks, context, endpoint, and GraphQL test statements. Spearmint can save test templates for future use for logged in user (not guests). 

![](/public/testingModal.png)

3.  Spearmint will then convert user input to dynamically generate a test file. You can click the export icon on the nav bar to automatically save the test file in the **\_\_tests\_\_** folder to run test or to modify in the future.

![](/public/saveTest.png)    


4.  Lastly click **Run Test** button and follow the guide on the popup and click what type of test you would like to perform.
![](/public/runTest.png) 


5. The latest version of Spearmint adopted testing capability for Svelte and GraphQL. The [Svelte](https://testing-library.com/docs/svelte-testing-library/intro/) library has been utilized to test your Svelte application. 

![](/public/svelte.gif)

# New features with version 0.10.0

* Testing capability for Svelte components

* GraphQL endpoint testing functionality

* Google Oauth 

* Facebook Oauth

* Dependency refactoring

* Additional typescript component conversions

* Logout button

* UI/UX streamlining

* Ample bug fixes

<br>

<!-- # Demos

### Guest login
![](/public/demos/guest-login.gif)

### Signup + login 
![](/public/demos/pwlogin.gif)

### Github Oauth login
![](/public/demos/oauth.gif)

### Facebook Oauth login
![](/public/demos/oauth2.gif)

### Google Oauth login
![](/public/demos/oauth3.gif)

### Vue Test
![](/public/demos/vuetest.gif)

### Svelte Test
![](/public/demos/sveltetest.gif)

### GraphQL Test
![](/public/demos/graphqltest.gif)

### Dark Mode + Upgraded UI/UX
![](/public/darkMode.gif)

### Save Test Functionality
![](/public/saveTest.gif)

### Run a security test 
![](/public/demos/snyk-auth-testdep.gif)

<br> -->


# The Spearmint Team
<hr>

> Alan [@alanrichardson7](https://github.com/alanrichardson7) <br />
> Alex [@apark0720](https://github.com/apark0720) <br />
> Alfred  [@astaiglesia](https://github.com/astaiglesia) <br />
> Annie  [@annieshinn](https://github.com/annieshinn) <br />
> Ben [@bkwak](https://github.com/bkwak) <br />
> Charlie [@charlie-maloney](https://github.com/charlie-maloney) <br /> 
> Chen(Chloe) [@chloelu29](https://github.com/chloelu29) <br />
> Chloe [@HeyItsChloe](https://github.com/HeyItsChloe) <br />
> Chris [@cptcheng](https://github.com/cptcheng) <br />
> Cornelius [@corneeltron](https://github.com/corneeltron) <br />
> David [@koyykdy](https://github.com/koyykdy) <br />
> Dave [@davefranz](https://github.com/davefranz) <br />
> Deriante [@dsin16](https://github.com/dsin16) <br />
> Dieu [@dieunity](https://github.com/dieunity) <br />
> Eric [@ericgpark](https://github.com/ericgpark) <br />
> Evan [@Berghoer](https://github.com/Berghoer) <br /> 
> Gabriel [@bielchristo](https://github.com/bielchristo) <br />
> Huy [@huyqbui](https://github.com/huyqbui) <br />
> Joe [@josephnagy](https://github.com/Josephnagy) <br />
> Johnny [@johnny-lim](https://github.com/johnny-lim) <br />
> Judy [@judysongg](https://github.com/judysongg) <br />
> Julie [@julicious100](https://github.com/julicious100) <br />
> Justin [@JIB3377](https://github.com/JIB3377) <br />
> Karen [@karenpinilla](https://github.com/karenpinilla) <br /> 
> Linda [@lcwish](https://github.com/lcwish) <br />
> Luis [@Luis-KM-Lo](https://github.com/Luis-KM-Lo) <br />
> Max B[@mbromet](https://github.com/mbromet) <br />
> Max W [@MaxWeisen](https://github.com/MaxWeisen) <br />
> Mike [@mbcoker](https://github.com/mbcoker) <br />
> Mina [@alsdk850](https://github.com/alsdk850) <br />
> Mo [@mhmaidi789](https://github.com/mhmaidi789) <br /> 
> Myles [@mylestsutsui](https://github.com/mylestsutsui) <br />
> Natlyn [@natlynp](https://github.com/natlynp) <br /> 
> Nick [@nicolaspita](https://github.com/nicolaspita) <br />
> Owen [@oweneldridge](https://github.com/oweneldridge) <br />
> Rachel [@rachethecreator](https://github.com/rachethecreator) <br />
> Ruzeb [@Ruzeb](https://github.com/Ruzeb) <br />
> Sean Y [@seanyyoo](https://github.com/seanyyoo) <br />
> Sean H [@sean-haverstock](https://github.com/Sean-Haverstock) <br /> 
> Sharon [@sharon-zhu](https://github.com/sharon-zhu) <br /> 
> Sieun [@sieunjang](https://github.com/sieunjang) <br />
> Terence [@TERR-inss](https://github.com/TERR-inss) <br />
> Tolan [@taoantaoan](https://github.com/taoantaoan) <br />
> Tristen [@twastell](https://github.com/twastell) <br />
> Tyler [@tytyjameson](https://github.com/tytyjameson)
<hr>

***

# If You Want To Contribute: 
The following is a list of features + improvements for future open-source developers that the Spearmint team has either started or would like to see implemented. Or, if you have additional new ideas, feel free to implement those as well! 
- Containerization with Docker
- Exporting test files in TypeScript
- Additional security testing functionality 
- Dry refactoring of codebase
