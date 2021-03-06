import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CollaborationService } from '../../services/collaboration.service';
import { DataService} from '../../services/data.service'

declare const ace: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  sessionId: string;
  languages: string[] = ['Java', 'Python'];
  language: string = 'Java';
  editor: any;

  defaultContent = {
    'Java': `class Solution{
          public static void main(String[]) args){
            //type your java code here.
          }
      }`,
    'Python': `class Solution{
        def example():
        # write your python code here

      }`
  };
  output: string = '';
  constructor(private collaboration: CollaborationService,
    private route: ActivatedRoute, private dataService: DataService) { }

//The ActivatedRoute service provides a params Observable which we can subscribe to to get the route parameters

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.sessionId = params['id'];
        this.initEditor();
        this.collaboration.restoreBuffer();
      })
  }


  initEditor(): void {
    this.editor = ace.edit("editor");
    this.editor.setTheme("ace/theme/eclipse");
    this.resetEditor();
    this.editor.$blockScrolling = Infinity;
    //set up collaboration socket
    this.collaboration.init(this.editor, this.sessionId);
    //lastAppliedChange是自己加的一个property
    this.editor.lastAppliedChange = null;

    //register change callback, once change, call collaboration service change function
    this.editor.on('change', (e) => {
      console.log('editor change: ' + JSON.stringify(e));
      if (this.editor.lastAppliedChange != e) {
        this.collaboration.change(JSON.stringify(e));
      }
    });
  }

  resetEditor(): void {
    this.editor.setValue(this.defaultContent[this.language]);
    this.editor.getSession().setMode("ace/mode/" + this.language.toLowerCase());
  }

  setLanguage(language: string): void {
    this.language = language;
    this.resetEditor();
  }



  submit(): void {
    const userCode = this.editor.getValue();
    const data = {
      userCodes : userCode,
      lang: this.language.toLocaleLowerCase()
    }
    this.dataService.buildAndRun(data)
    .then(res => this.output = res.text);

    console.log(userCode)
  }

}
