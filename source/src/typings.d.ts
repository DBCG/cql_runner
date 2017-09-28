/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

// CodeMirror

import * as CodeMirror from 'codemirror';

declare module 'codemirror' {
    interface EditorConfiguration {
      autoFocus?: boolean;
      matchBrackets?: boolean;
      //  when set to true, causes matching brackets to be highlighted whenever the cursor is next to them
      autoCloseBrackets?: boolean;
      rulers?: any; // TODO: Flesh out
      styleActiveLine?: boolean;
    }
    // Part of CodeMirror extensions
    function defineSimpleMode(name: string, states: any): any;
    // interface defineSimpleMode {
    //   (name: string, states: any): any
    // }
    function simpleMode(config: any, states: any): any;
    interface simpleMode {
      (config: string, states: any): any
    }
    interface EditorFromTextArea extends Editor {
      getSelection(lineSep?: string): string; 
    }
}

export = CodeMirror;