import { Component } from '@angular/core';

@Component ({
  selector: "footer",
  template: `
        <nav class="navbar navbar-default navbar-fixed-bottom">
            <div class="container-fluid nopadding">
                <div class="col-lg-5 nopadding self-center navbar-text text">This is an open source project - <a href="https://github.com/DBCG/cql_runner">feel free to leave feedback and/or contribute</a></div>
                <div class="col-lg-2 nopadding button self-center issues pull-right">
                    <a href="https://github.com/DBCG/cql_runner/issues/new">Report an issue<span class="glyphicon glyphicon-bullhorn issue"></span></a>
                </div>
            </div>
        </nav>
    `,
  styles: [`
        nav {
            height: 28px !important;
            min-height: 28px;
            background-color: #2f2f2f;
            border: none;
        }

        a {
            color: white;
        }

        .nopadding {
            padding: 0px;
            margin: 0px;
            height: 28px;
        }

        .issues {
            padding-top: 3px;
            width: 200px;
        }

        .issue {
            padding-left: 10px;
        }

        .text {
            padding-left: 5px;
            padding-top: 3px;
            color: white;
        }

        .button {
            background-color: #2196F3;
            border: none;
            color: white;
            font-size: 1em;
            height: 28px;
            text-align: center;
        }
    `]
})

export class FooterComponent {}
