import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InputImageComponent } from 'src/app/shared/input-image/input-image.component';
import { Annonce } from '../annonces';
import { ImageUploadService } from './image-upload-service';

@Component({
  selector: 'app-annonce-form',
  templateUrl: './annonce-form.component.html',
  styleUrls: ['./annonce-form.component.scss'],
})
export class AnnonceFormComponent {
  annonceForm: FormGroup;
  @Input() annonce: Annonce;
  imageUrl: string;
  @Output() annonceSubmit = new EventEmitter();

  uploadImageLabel = 'Choose file (max size 2MB)';
  private imageFileIsTooBig = false;
  selectedFileSrc: string;
  url: string;

  constructor(private imageUploadService: ImageUploadService) {}

  ngOnChanges(): void {
    const {
      title,
      description,
      image,
      price,
      shippingFee,
      phone,
      adress,
    } = this.annonce;

    this.annonceForm = new FormGroup({
      title: new FormControl(title, [Validators.required]),
      description: new FormControl(description, [Validators.required]),
      phone: new FormControl(phone, [Validators.required]),
      adress: new FormControl(adress, [Validators.required]),
      price: new FormControl(price, [Validators.required]),
      shippingFee: new FormControl(shippingFee, [Validators.required]),
      // image: new FormControl(''),
    });
  }

  onSubmit() {
    if (this.annonceForm.invalid) {
      return;
    }
    this.annonce = this.annonceForm.value;
    this.annonce.image = this.url;

    this.annonceSubmit.emit(this.annonce);
  }

  // imageUrlS3(imageUrl: string) {
  //   this.imageUrl = imageUrl;
  // }

  imageUpload(imageInput: HTMLInputElement) {
    const file: File = imageInput.files[0];
    this.uploadImageLabel = `${file.name} (${(file.size * 0.000001).toFixed(
      2
    )} MB)`;
    if (file.size > 1048576 * 2) {
      this.imageFileIsTooBig = true;
    } else {
      this.imageFileIsTooBig = false;
      const reader = new FileReader();
      // reader.addEventListener('load', (event: any) => {
      //   this.selectedFileSrc = event.target.result;
      this.imageUploadService.uploadImage(file).subscribe((response) => {
        console.log(response.url);
        this.url = response.url;
      });
      if (file) {
        reader.readAsDataURL(file);
      }
      // });
    }
  }
}
