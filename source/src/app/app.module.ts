import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RunnerComponent } from './components/runner/runner.component';
import { ConfigComponent } from './components/config/config.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { CodeMirrorDirective } from './shared/code-mirror/code-mirror.directive';
import { FormatterComponent } from './components/formatter/formatter.component';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    RunnerComponent,
    ConfigComponent,
    FooterComponent,
    HeaderComponent,
    CodeMirrorDirective,
    FormatterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
