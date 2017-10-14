import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Configuration } from '../config/config.model';
import { ConfigComponent } from '../config/config.component';
import { RunnerComponent } from '../runner/runner.component';
import * as glob from '../menu/example';

@Component({
  selector: 'cql-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [ RunnerComponent ]
})
export class MenuComponent {
  private _config: Configuration;
  @Input() runner: RunnerComponent;
  constructor (public dialog: MatDialog) {}

  loadExample(num: number) {
    this.runner.output = glob.examples[num].cql;
    this.runner.displayOutput();
  }

  openDialog() {
    const dialogRef = this.dialog.open(ConfigComponent, {
      height: '615px',
      width: '775px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
