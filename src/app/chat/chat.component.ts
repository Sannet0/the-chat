import { Component, OnDestroy, OnInit } from '@angular/core';
import { Manager } from 'socket.io-client';
import { environment } from '../../environments/environment';
import { UserService } from '../service/user.service';
import { StorageService } from '../service/storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../service/message.service';
import { ChatService } from '../service/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  currentMessageName: string = '';
  currentChatName: string = '';
  messages: any = {};
  chats: string[] = [];
  messagesIds: string[] = [];
  usersInChat: string[] = [];

  chatName: string;

  manager: Manager;
  socket: any;

  userInfo: { id: string, login: string };

  constructor(
    private readonly userService: UserService,
    private readonly storageService: StorageService,
    private readonly messageService: MessageService,
    private readonly chatService: ChatService,
    private readonly actRoute: ActivatedRoute,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.chatService.getAllChats().subscribe((chats) => {
      this.chats = chats;
    });

    this.init(this.actRoute.snapshot.params.chatName);
  }

  init(chatName: string): void {
    this.chatName = chatName;
    this.messages = {};
    this.messagesIds = [];

    this.userService.getUserInfo().subscribe((user) => {
      this.userInfo = user;

      this.manager = new Manager(environment.wsUrl, {
        query: {
          room: chatName,
          user_name: user.login
        }
      });

      this.socket = this.manager.socket("/", {
        auth: {
          token: 'Bearer ' + this.storageService.getAuthData().token
        }
      });

      this.messageService.getMessages(chatName).subscribe((messages) => {
        messages.forEach((message: any) => {
          this.insertMessage(message);
        })
      });

      this.socket.on('msgToClient', (message: any) => {
        this.insertMessage(message);
      })
      this.socket.on('newChatCreated', (chatName: any) => {
        this.chats.push(chatName);
      })
      this.socket.on(`newUserInChat.${ chatName }`, (userInChat: any) => {
        this.usersInChat = userInChat;
      })
    });
  }

  insertMessage(message: any): void {
    this.messages[message.id] = { text: message.text, user_id: message.user_id, user_name: message.user_name };
    this.messagesIds = Object.keys(this.messages).reverse();
  }

  async goToChat(chatName: string): Promise<void> {
    if(this.router.url !== `/chat/${ chatName }`) {
      this.socket.disconnect()
      await this.router.navigate([`chat/${ chatName }`]);
      this.init(chatName);
    }
  }

  ngOnDestroy(): void {
    this.socket.disconnect()
  }

  addNewMessage(): void {
    const trimmedMessage = this.currentMessageName.trim()
    if (trimmedMessage) {
      this.socket.emit('msgToServer', trimmedMessage);
    }
    this.currentMessageName = '';
  }

  createNewChat(): void {
    const trimmedChatName = this.currentChatName.trim()
    if (trimmedChatName) {
      this.socket.emit('createNewChat', trimmedChatName);
    }

    this.currentChatName = '';
  }

}
