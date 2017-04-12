import { Component, EventEmitter, Output } from '@angular/core';

@Component ({
  selector: "input-nav",
  template: `
        <nav class="navbar navbar-default noMargin input">
            <div class="navbar-text in">
                <h4 class="self-center">Input</h4>
            </div>
            <div class="pull-right">
                <button class="run" [class.running]="running" (click)="setEvent()">
                    <div class="self-center">
                        Run
                    </div>
                    <i class="material-icons">play_arrow</i>
                </button>
            </div>
        </nav>
    `,
  styles: [`
        .hidden {
            display: none;
        }

        .noMargin {
            margin: 0px !important;
        }

        .in {
            color: #2f2f2f;            
        }

        button {
            border: none;
            color: white;
            font-size: 1em;
            padding: 0px;
            height: 70px !important;
            min-width: 70px;
            outline: none;
        }        

        .run {
            background-color: #4CAF50;
        }

        .input {
            border-bottom: 1px solid #efefef;
            border-top: none;
            border-right: none;
            border-left: none;
            height: 70px !important;
        }
    `]
})

export class InputComponent {
  @Output('run') run = new EventEmitter();

  setEvent () {
    this.run.emit();
  }
}
