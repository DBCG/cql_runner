import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RunnerComponent } from './app.component';
import { ConfigComponent } from './config/config.component';
import { FooterComponent } from './footer/footer.component';
import { InputComponent } from './input/input.component';
import { NavComponent } from './nav/nav.component';
import { OutputComponent } from './output/output.component';
import { RunnerDirective } from './runner.directive';
import { CqlFormatterComponent } from './cql-formatter/cql-formatter.component';
import { CqlRunnerComponent } from './cql-runner/cql-runner.component';

import { routing } from './app.routes';

@NgModule({
  declarations: [
    RunnerComponent,
    ConfigComponent,
    FooterComponent,
    InputComponent,
    NavComponent,
    OutputComponent,
    RunnerDirective,
    CqlFormatterComponent,
    CqlRunnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    routing
  ],
  providers: [],
  bootstrap: [RunnerComponent]
})
export class RunnerModule { }
