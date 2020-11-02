import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ImageUploadService } from 'src/app/annonces/annonce-form/image-upload-service';

@Component({
  selector: 'app-input-image',
  templateUrl: './input-image.component.html',
  styleUrls: ['./input-image.component.css'],
})
export class InputImageComponent implements OnInit {
  @Input() label: string;
  @Input() control: FormControl;
  @Input() controlType = 'input';
  @Input() uploadImageLabel: string;
  @Output() urlOnChange = new EventEmitter();

  url: string;

  constructor(private imageUploadService: ImageUploadService) {}

  ngOnInit(): void {}

  ngOnChanges() {
    this.urlOnChange.emit(this.url);
  }

  // imageUpload(imageInput: HTMLInputElement) {
  //   this.imageUploadService.imageUpload(imageInput);
  // }
}
