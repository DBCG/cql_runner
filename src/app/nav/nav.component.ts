import { Component } from '@angular/core';

@Component ({
  selector: "main-nav",
  template: `
        <nav class="navbar navbar-default navbar-static-top" id="header">
            <span class="title self-center">CQL Runner</span>
            <button (click)="toggleResources()" class="self-center button pull-right">
                <span class="self-center resLink">CQL Resources <i class="glyphicon glyphicon-question-sign"></i></span>
            </button>                 
        </nav>
        <div class="resources" [hidden]="!resources">
            <ul>
                <li><a href="https://github.com/DBCG/cql_engine/wiki" target="_blank">CQL Engine Documentation Home</a></li>
                <li><a href="http://cql-runner.dataphoria.org/format">CQL Formatter</a></li>
            </ul>
        </div>
    `,
  styles: [`
        span {
            display: inline-block;
            vertical-align: middle;
            line-height: normal;  
        }

        i {
            padding-top: 3px;
        }

        .resLink {
            padding-bottom: 4px;
        }

        .resources {
            background-color: #2196F3;
            color: white;
        }

        .resources ul {
            -webkit-margin-before: 0;
            -webkit-margin-after: 0;
            -webkit-margin-start: 0px;
            -webkit-margin-end: 0px;
            -webkit-padding-start: 40px;
            padding-top: 10px;
            padding-bottom: 10px;
            list-style: none;
            margin-bottom: 0 !important;
        }

        .resources a {
            color: white;
        }

        .resources a:hover {
            color: #fdfdfd;
        }
        
        [hidden] {
            display: none;
        }

        .navbar-static-top {
            min-height: 28px !important;
            height: 28px;
            color: white;
            background-color: #2f2f2f;
            margin: 0px;  
            border: none;
        }

        .title {            
            font-weight: 600;
            padding-left: 5px;
            padding-top: 3px;
            max-width: 200px;
            min-height: 28px !important;
        }

        #header .button {
            background-color: #2196F3;
            border: none;
            color: white;
            font-size: 1em;
            height: 28px;
            width: 200px;
        }

        #header .button:hover {
            cursor: pointer;
        }
    `]
})

export class NavComponent {
  resources: boolean = false;

  toggleResources () {
    this.resources = !this.resources;
  }
}
