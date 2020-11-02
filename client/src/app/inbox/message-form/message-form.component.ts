import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Message, MessagesDiscussion } from '../messages-discussion';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css'],
})
export class MessageFormComponent implements OnInit {
  messageForm: FormGroup;
  @Input() message: Message;
  @Input() messagesDiscussion: MessagesDiscussion[];
  @Output() messageSubmit = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    const { from, to, annonceTitle, messageText } = this.message;

    this.messageForm = new FormGroup({
      to: new FormControl({ value: to, disabled: true }),
      from: new FormControl({ value: from, disabled: true }),
      annonceTitle: new FormControl({ value: annonceTitle, disabled: true }),
      messageText: new FormControl(messageText, [Validators.required]),
    });
  }

  onSubmit() {
    if (this.messageForm.invalid) {
      return;
    }

    this.messageSubmit.emit(this.messageForm.value);
  }
}
