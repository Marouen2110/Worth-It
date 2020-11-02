import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InboxRoutingModule } from './inbox-routing.module';
import { HomeComponent } from './home/home.component';
import { MessageCreateComponent } from './message-create/message-create.component';
import { MessageReplyComponent } from './message-reply/message-reply.component';
import { MessageIndexComponent } from './message-index/message-index.component';
import { MessageShowComponent } from './message-show/message-show.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SharedModule } from '../shared/shared.module';
import { MessageFormComponent } from './message-form/message-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    MessageCreateComponent,
    MessageReplyComponent,
    MessageIndexComponent,
    MessageShowComponent,
    NotFoundComponent,
    MessageFormComponent,
  ],
  imports: [
    CommonModule,
    InboxRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class InboxModule {}
