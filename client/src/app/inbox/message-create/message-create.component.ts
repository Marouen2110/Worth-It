import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService, UserById } from 'src/app/auth/auth.service';
import { MessageShowComponent } from '../message-show/message-show.component';
import { MessageService } from '../message.service';
import { Message, MessagesDiscussion } from '../messages-discussion';

@Component({
  selector: 'app-message-create',
  templateUrl: './message-create.component.html',
  styleUrls: ['./message-create.component.css'],
})
export class MessageCreateComponent {
  @Input() messagesDiscussion: MessagesDiscussion[];
  message: Message;
  showModal = false;
  seller: UserById;
  buyer: UserById;
  to = '';
  annonceTitle = '';
  discussionId = '';
  sellerId = '';
  buyerId = '';

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    // console.log(this.messagesDiscussion);
  }

  // if (authService.email === this.seller.email) {
  //   this.to = this.buyer.email;
  // } else {
  //   this.to = this.seller.email;
  // }

  ngOnChanges(): void {
    this.messagesDiscussion = this.route.snapshot.data.messagesDiscussion;
    // console.log(this.messagesDiscussion);
    this.discussionId = this.messagesDiscussion[0].discussion.id;
    // console.log(this.discussionId);
    this.sellerId = this.messagesDiscussion[0].discussion.sellerId;
    // console.log(this.sellerId);
    this.sellerId = this.messagesDiscussion[0].discussion.sellerId;
    // console.log(this.sellerId);
    this.buyerId = this.messagesDiscussion[0].discussion.buyerId;
    // console.log(this.sellerId);
    this.annonceTitle = this.messagesDiscussion[0].annonce.title;
    this.discussionId = this.messagesDiscussion[0].discussion.id;

    this.authService.getUserById(this.sellerId).subscribe((email) => {
      this.seller = email;
      // console.log(email);
    });

    this.authService.getUserById(this.buyerId).subscribe((email) => {
      this.buyer = email;
      // console.log(email);
    });

    //   if (this.authService.email === this.seller.email) {
    //   this.to = this.buyer.email;
    // } else {
    //   this.to = this.seller.email;
    // }

    this.message = {
      from: this.authService.user.email,
      to: this.to,
      annonceTitle: this.annonceTitle,
      messageText: '',
    };
  }

  onSubmit(message: Message) {
    this.messageService
      .sendMessage(message, this.discussionId)
      .subscribe(() => {
        this.showModal = false;
      });
  }
}
