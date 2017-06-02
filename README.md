# CQL Runner

## Introduction

[![Angular 2 Style Guide](https://mgechev.github.io/angular2-style-guide/images/badge.svg)](https://angular.io/styleguide)

HTML-based Clinical Query Language (CQL) Runner

- Allows you to run CQL commands against a pre-existing CQL Engine from the comfort of your own browser

– Runs against the [CQL execution service](https://github.com/c-schuler/Cql_Engine/tree/master/Src/java/cql-execution-service) (feel free to point to the execution service in your own project)

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version *webpack*.

## Dependencies

The CQL Runner has the following global dependencies:

1) [NodeJS/NPM](https://nodejs.org/en/) v4.5+
Simply download and install as per site instructions

2) [angular-cli](https://github.com/angular/angular-cli) version *webpack* +
In your console, run `npm install -g angular-cli@1.0.0-rc.1`

## Build

Run `npm install -g` -- This installs global dependencies

Run `npm install` -- This installs local dependencies

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Development server
Navigate to /source/ and run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

*Note that on Windows, you might see some error messages when serving--it should still work just fine. This is a documented Angular CLI bug and should be fixed in the next patch*

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/route/class`.


## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Integration as an AngularJS component

cql_runner can be used as a component within a larger AngularJS application in a few steps. First, add it to your package.json:

	...
	"cql-ace-syntax": "1.2.0",
	"cql-runner": "1.0.9",
	....

Next, include the modules in your app.modules.ts (or equivalent):

	...
	import { RunnerModule, ApiService } from 'cql-runner';
	...
	@NgModule({
		imports: [
			RunnerModule,
			...
		],
		providers: [
			ApiService,
			...
		],
		...
	})

Now, make sure the ace.js file is added to your vendor dependencies. In grunt, for example:

		copy: {
			build: {
				files: [{
					cwd: 'node_modules/cql-ace-syntax/',
					src: "ace.js",
					dest: 'build/',
					expand: true
				}]
			}
		}

Include ace.js in your HTML

	html
		head
			script(src="ace.js")

You can now use cql_runner as a component within your application. Attribute defaults are show, below:

	cql-runner(
		engineUri="'http://cql.dataphoria.org/cql/evaluate'",
		engineUser="'username'",
		enginePass="'password'",
		termUri="'http://fhirtest.uhn.ca/baseDstu3'",
		termUser="'username'", termPass="'password'",
		dataUri="'http://fhirtest.uhn.ca/baseDstu3'",
		dataUser="'username'", dataPass="'password'")


## Deploying to Github Pages

Run `ng github-pages:deploy` to deploy to Github Pages.

## Further help

To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# License

Copyright 2016 University of Utah

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
