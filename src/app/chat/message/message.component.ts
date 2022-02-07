import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input() message: { id: string, text: string, user_id: string };
  @Input() actualUserId: string;
  class: string = 'message';

  constructor() { }

  ngOnInit(): void {
    if(this.actualUserId === this.message.user_id){
      this.class += ' user';
    }
  }

}
