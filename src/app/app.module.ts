// import { MATERIAL_COMPATIBILITY_MODE } from '@angular/material'; // Strip out once they fix

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { RunnerComponent } from './components/runner/runner.component';
import { ConfigComponent } from './components/config/config.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { CodeMirrorDirective } from './shared/code-mirror/code-mirror.directive';
import { MenuComponent } from './components/menu/menu.component';

import { ConfigService } from './components/config/config.service';

import { routing } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    RunnerComponent,
    ConfigComponent,
    FooterComponent,
    HeaderComponent,
    CodeMirrorDirective,
    MenuComponent
  ],
  entryComponents: [
    ConfigComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
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
    // { provide: MATERIAL_COMPATIBILITY_MODE, useValue: true }, // Strip out once they fix
    ConfigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
