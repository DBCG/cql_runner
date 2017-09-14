import { Routes, RouterModule } from '@angular/router';
import { FormatterComponent } from './components/formatter/formatter.component';
import { RunnerComponent } from './components/runner/runner.component';

const routes: Routes = [
  {path: 'formatter', component: FormatterComponent},
  {path: '', component: RunnerComponent},
  {path: 'runner', component: RunnerComponent}
];

export const routing = RouterModule.forRoot(routes);
