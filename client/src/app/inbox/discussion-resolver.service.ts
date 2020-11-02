import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageService } from './message.service';
import { MessagesDiscussion } from './messages-discussion';

@Injectable({
  providedIn: 'root',
})
export class DiscussionResolverService
  implements Resolve<MessagesDiscussion[]> {
  constructor(
    private messagesService: MessageService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    const { id } = route.params;

    return this.messagesService.getDiscussionById(id).pipe(
      catchError(() => {
        this.router.navigateByUrl('/inbox/not-found');

        return EMPTY;
      })
    );
  }
}
