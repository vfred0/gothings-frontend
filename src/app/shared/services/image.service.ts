import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Image } from '@core/utils/image';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private readonly API_URL = 'https://api.imgbb.com/1/upload';
  private readonly API_KEY = 'be0b8dc0b6550244d83f2fb2368aa6a3';
  private readonly http: HttpClient = inject(HttpClient);

  public uploadImage(image: string) {
    image = image.replace(/^data:image\/(png|jpg|jpeg|webp);base64,/, '');
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post<Image>(
      `${this.API_URL}?key=${this.API_KEY}`,
      formData
    );
  }
}
