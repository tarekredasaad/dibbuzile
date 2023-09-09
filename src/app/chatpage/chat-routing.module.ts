import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { UserprofileComponent } from './userprofile/userprofile.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  {path:"chat",component:ChatComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
