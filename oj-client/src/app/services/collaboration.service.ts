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

    //注册一个event listener, 监听server端发过来的改变，
    this.collaborationSocket.on('change', (delta: string) => {
      delta = JSON.parse(delta);
      editor.lastAppliedChange = delta;
      editor.getSession().getDocument().applyDeltas([delta]);
    });
  }


//change function，client changes, 发送改变的部分
  change(delta: string): void {
    this.collaborationSocket.emit('change', delta);
  }

}
