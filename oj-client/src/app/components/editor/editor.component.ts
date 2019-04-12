import { Component, OnInit } from '@angular/core';

declare const ace: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
   languages: string[]= ['Java', 'Python'];
   language: string = 'Java';
   editor: any;

   defaultContent = {
      'Java':`class Solution{
          public static void main(String[]) args){
            //type your java code here.
          }
      }`,
      'Python':`class Solution{
        def example():
        # write your python code here

      }`
   };

  constructor() { }

  ngOnInit() {
    this.editor = ace.edit("editor");
    this.editor.setTheme("ace/theme/eclipse");
    this.resetEditor();
    // this.editor.setValue(this.defaultContent['Java']);
  }

  resetEditor():void{
    this.editor.setValue(this.defaultContent[this.language]);
    this.editor.session.setMode("ace/mode/" + this.language.toLowerCase());
  }

  setLanguage(language:string):void{
    this.language = language;
    this.resetEditor();
  }

  submit(): void{
    const userCode = this.editor.getValue();
    console.log(userCode)
  }


}
