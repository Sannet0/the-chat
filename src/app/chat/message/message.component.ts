import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input() message: { id: string, text: string, user_id: string, user_name: string };
  @Input() userInfo: { id: string, login: string };
  class: string = 'message';
  isUserMessage: boolean;

  constructor() { }

  ngOnInit(): void {
    this.isUserMessage = this.userInfo.id == this.message.user_id;
    if(this.isUserMessage){
      this.class = 'message user';
    }
  }

}
