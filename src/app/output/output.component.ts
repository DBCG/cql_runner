import { Component, Output, EventEmitter } from '@angular/core';

@Component ({
  selector: "output-nav",
  template: `
        <nav class="navbar navbar-default noMargin output">
            <div class="navbar-text out">
                <h4 class="self-center">Output</h4>
            </div>
            <div class="pull-right">
                <button class="clear" id="clearBtn" (click)="setEvent()">
                    <div class="self-auto">
                        Clear
                    </div>
                    <i class="material-icons" [hidden]="running">clear_all</i>
                </button>
            </div>
        </nav>
    `,
  styles: [`
        .clear {
            background-color: #2f2f2f;
        }

        .output {
            background-color: #272822;
            border-bottom: 1px solid #555651;
            border-top: none;
            border-right: none;
            border-left: none;
            border-radius: 0 !important;
            -moz-border-radius: 0 !important;
            height: 70px !important;        
        }

        .noMargin {
            margin: 0px !important;
        }

        .out {
            color: #efefef;
        }

        button {
            border: none;
            color: white;
            font-size: 1em;
            padding: 5px 10px;
            height: 70px !important;
            min-width: 70px;
        }

        button:focus {outline:0;}
    `]
})

export class OutputComponent {
  @Output('clearOutput') clearOutput = new EventEmitter();

  setEvent () {
    this.clearOutput.emit();
  }
}
