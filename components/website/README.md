# Component:  Website
This component provide web-page with SPARQL query editor and act as a gateway to other services and resources.
As such this component compose of a web-application, the query editor, located in ```www``` directory and NginX configuration.
NginX is used to serve static content and works as reverse proxy.

The web-application is bundled using Parcel and utilize [Yasgui](https://triply.cc/docs/yasgui) as the SPARQL editor of choice.
The SPARQL endpoint itself is exposed using reverse proxy to GraphDB component.

The web-application may be extended in two directions:
 * Adding new predefined queries
 * Adding new languages

## Predefined queries
Queries are specified in the ```www/src/sparql-queries.yaml``` file. 
For each query all languages for ```name``` and ```description``` must be specified!

## i18n - translations
You can add a new language by using following modifications in the ```www``` directory.
 * Add language to ```i18n``` command in the ```package.json``` file as ```-i {language}```.
 * Append source file to ```package.json``` to ```source``` field.
 * Copy existing file in ```src/locales```, rename it to the ```{language}.yaml``` and provide the translation.
 * Edit the ```src/sparql-queries.yaml``` file and add translation in given languages to all queries.

## Build process
This article comment on the specific of the website build process.
The support of multiple languages is implemented using ```{language}/...``` URL prefix.
In this notation a page located in the default language, Slovakia, at ```./about.html``` would be at ```./en/about.html``` for English.
At the same time we need to have only one source file and localization files. 
As there is little localization in JavaScript we mostly translate only the HTML template.
To do so we employ ```static-i18n``` package, that substitute values in ```src/index.html``` with values from ```src/locales``` and write the files to ```i18n``` directory.
This step is covered by the ```npm run i18n``` script.

In the next step Parcel is employed to produce the output by bundling, transpilation and optimization of resources.
The produced files are located in the ```dist``` directory. 
Unfortunately Parcel is not working nice with relative URL prefix.
As a result files in the language directories, like ```en/index.html``` have invalid path to all the assets.
To address this issue we perform text-based replace using the ```"replace-in-file``` plugin and custom code in ```postbuild.js```.

Another issue is connected to ```@id-sk/frontend``` package that assume that all assets are stored in a single directory.
This require manual copy of the assets as a part of the build process using the ```assets``` command.

As a result in order to build the application you must execute the following steps:
 * ```npm run assets```
 * ```npm run i18n```
 * ```npm run build```
The last command may be replaced with ```npm run start``` to start the developer mode.
