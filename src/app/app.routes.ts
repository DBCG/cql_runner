import {Routes, RouterModule} from '@angular/router';
import {CqlFormatterComponent} from './cql-formatter/cql-formatter.component';
import {CqlRunnerComponent} from './cql-runner/cql-runner.component';

const routes: Routes = [
  {path: 'format', component: CqlFormatterComponent},
  {path: '', component: CqlRunnerComponent},
  {path: 'editor', component: CqlRunnerComponent}
];

export const routing = RouterModule.forRoot(routes);
