import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Message, MessagesDiscussion } from '../inbox/messages-discussion';
import { NotificationsService } from '../notifications/notifications.service';
import { url } from '../shared/rootUrl';

interface Discussion {
  annonceId: string;
  annonceTitle: string;
  discussionId: number;
}

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  rootUrl = environment.API_URL;

  constructor(
    private http: HttpClient,
    private notificationsService: NotificationsService
  ) {}

  getMessages() {
    return this.http.get<Discussion[]>(
      `${this.rootUrl}/api/discussion/messages/user`
    );
  }

  getDiscussionById(discussionId: string) {
    return this.http.get<MessagesDiscussion[]>(
      `${this.rootUrl}/api/discussion/${discussionId}`
    );
  }

  sendMessage(message: Message, discussionId: string) {
    return this.http
      .post(`${this.rootUrl}/api/discussion/${discussionId}/messages`, message)
      .pipe(
        tap(() => {
          this.notificationsService.addSuccess('Message sent successfully');
        }),
        catchError((err) => {
          this.notificationsService.addError('Failed to send your message');

          return throwError(err);
        })
      );
  }
}
