// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  engineUri: 'http://cql.dataphoria.org/cql/evaluate',
  // fhirUri: 'http://measure.eval.kanvix.com/cqf-ruler/baseDstu3',
  terminologyUri: 'http://measure.eval.kanvix.com/cqf-ruler/baseDstu3',
  dataSourceUri: 'http://measure.eval.kanvix.com/cqf-ruler/baseDstu3'
};
