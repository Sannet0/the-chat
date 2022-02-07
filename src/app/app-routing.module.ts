import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { MessageComponent } from './chat/message/message.component';

const routes: Routes = [
  {
    path: '',
    component: ChatComponent,
    children: [
      { path: '', component: MessageComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
