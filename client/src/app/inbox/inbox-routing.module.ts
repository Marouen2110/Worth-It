import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlaceholderComponent } from '../inbox/placeholder/placeholder.component';

import { HomeComponent } from './home/home.component';
import { MessageShowComponent } from './message-show/message-show.component';
import { DiscussionResolverService } from './discussion-resolver.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { MessageCreateComponent } from './message-create/message-create.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'not-found',
        component: NotFoundComponent,
      },

      {
        path: ':id',
        component: MessageShowComponent,
        resolve: {
          messagesDiscussion: DiscussionResolverService,
        },
      },
      {
        path: ':id',
        component: MessageCreateComponent,
        resolve: {
          messagesDiscussion: DiscussionResolverService,
        },
      },
      { path: '', component: PlaceholderComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InboxRoutingModule {}
