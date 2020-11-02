import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-index',
  templateUrl: './message-index.component.html',
  styleUrls: ['./message-index.component.css'],
})
export class MessageIndexComponent implements OnInit {
  discussions = [];
  email = '';
  emails = [];

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.messageService.getMessages().subscribe((discussions) => {
      this.discussions = discussions;
      for (let discussion of this.discussions) {
        this.messageService
          .getDiscussionById(discussion.discussionId)
          .subscribe((chat) => {
            // this.email = user.email;
            // console.log(chat[0].discussion.sellerId);
          });
      }
    });

    // for (let discussion of this.discussions) {
    //   this.messageService.getUserById(discussion.userId).subscribe((user) => {
    //     this.email = user.email;
    //     console.log(this.email);
    //   });
    // }
  }
}
