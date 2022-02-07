import { Component, OnInit } from '@angular/core';
import { Manager } from 'socket.io-client';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  currentMessageName = '';
  messages: any = {};
  messagesIds: string[] = [];

  manager = new Manager(environment.wsUrl);
  socket = this.manager.socket("/");

  actualUserId = '' + new Date();


  ngOnInit(): void {
    this.socket.on('msgToClient', (message: any) => {
      this.messages[message.id] = { text: message.text, user_id: message.user_id };
      this.messagesIds = Object.keys(this.messages).reverse();
    })
  }

  addNewMessage(): void {
    const trimmedMessage = this.currentMessageName.trim()
    if (trimmedMessage) {
      this.socket.emit('msgToServer', { user_id: this.actualUserId, text: trimmedMessage });
    }
    this.currentMessageName = '';
  }

}
