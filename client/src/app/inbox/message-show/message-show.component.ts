import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, UserById } from 'src/app/auth/auth.service';
import { MessageService } from '../message.service';
import { MessagesDiscussion } from '../messages-discussion';

@Component({
  selector: 'app-message-show',
  templateUrl: './message-show.component.html',
  styleUrls: ['./message-show.component.css'],
})
export class MessageShowComponent implements OnInit {
  @Output() messagesDiscussion: MessagesDiscussion[];
  seller: UserById;
  buyer: UserById;
  email$: Observable<UserById>;

  constructor(private route: ActivatedRoute, private authService: AuthService) {
    this.messagesDiscussion = route.snapshot.data.messagesDiscussion;
    this.route.data.subscribe(({ messagesDiscussion }) => {
      this.messagesDiscussion = messagesDiscussion;
      this.authService
        .getUserById(messagesDiscussion[0].discussion.buyerId)
        .subscribe((email) => {
          this.buyer = email;
        });

      this.authService
        .getUserById(messagesDiscussion[0].discussion.sellerId)
        .subscribe((email) => {
          this.seller = email;
        });
    });
  }

  ngOnInit(): void {}

  ngOnChanges() {}

  trackedByCreated(i: number, msg: MessagesDiscussion) {
    return msg.createdAt;
  }

  getUserById(userId: string) {
    return this.authService.getUserById(userId);
  }
}
