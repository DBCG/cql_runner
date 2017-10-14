
import { MATERIAL_COMPATIBILITY_MODE } from '@angular/material'; // Strip out once they fix

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatMenuModule, MatDialogModule, MatIconModule, MatInputModule, MatAutocompleteModule, MatCardModule, MatTooltipModule, MatToolbarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { RunnerComponent } from './components/runner/runner.component';
import { ConfigComponent } from './components/config/config.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { CodeMirrorDirective } from './shared/code-mirror/code-mirror.directive';
import { FormatterComponent } from './components/formatter/formatter.component';
import { MenuComponent } from './components/menu/menu.component';

import { ConfigService } from './components/config/config.service';

import { routing } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    RunnerComponent,
    ConfigComponent,
    FooterComponent,
    HeaderComponent,
    CodeMirrorDirective,
    FormatterComponent,
    MenuComponent
  ],
  entryComponents: [
    ConfigComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatAutocompleteModule,
    MatCardModule,
    MatTooltipModule,
    routing
  ],
  providers: [
    { provide: MATERIAL_COMPATIBILITY_MODE, useValue: true }, // Strip out once they fix
    ConfigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
