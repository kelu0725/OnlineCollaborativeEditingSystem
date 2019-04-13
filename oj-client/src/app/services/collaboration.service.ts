import { Injectable } from '@angular/core';

declare const io: any;


@Injectable()
export class CollaborationService {
  collaborationSocket: any;
  constructor() { }

  init(editor: any, sessionId: string):void {
    //发sessionId给server
    this.collaborationSocket = io(window.location.origin, {query: 'message=' + sessionId});

    // this.collaborationSocket.on('message', (message) => {
    //   console.log('message received from server :' + message);
    // });

    //register event listener, listen to changes from server
    this.collaborationSocket.on('change', (delta: string) => {
      delta = JSON.parse(delta);
      editor.lastAppliedChange = delta;
      editor.getSession().getDocument().applyDeltas([delta]);
      //Applies all the changes previously accumulated
    });
  }

//send change event to server
  change(delta: string): void {
    this.collaborationSocket.emit('change', delta);
  }

//send restoreBuffer event to server
  restoreBuffer():void {
    this.collaborationSocket.emit('restoreBuffer');
  }

}
