import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component ({
  selector: 'cql-runner',
  template: `
        <main-nav></main-nav>
        <router-outlet></router-outlet>
        <div>
            <footer></footer>
        </div>
    `,
  styles: [`
        :host {
            font-family: 'Seqoe UI', Halvetica, Tahoma, Geneva, Verdana, sans-serif;
            height: 100%;
        }        

        .noPadding {
            padding: 0px !important;
        } 

        .button.running {
            background-color: darkgrey;
        }

        .button.running:hover {
            cursor: default;
        }

        button:focus {outline:0;}       
    `]
})

export class RunnerComponent {

}
