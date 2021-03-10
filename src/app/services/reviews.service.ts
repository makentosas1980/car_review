import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { CarReview } from '../interfaces/car-review';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(
    private firestore: AngularFirestore,
    private snackbar: MatSnackBar) { }

  createCarReview(data: any) {
    return new Promise<any>((resolve) => {
      this.firestore
      .collection('carReviews')
      .add(data)
    });
    console.log('nice');
  }

  addCarReview() {
    return this.firestore.collection('carReviews');
  }

  getCarReviews() {
    return this.firestore.collection('carReviews').valueChanges();
  }

  // getCarMark() {
  //   return this.firestore.collection('carReviews').get();
  // }

  showSnackbar(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 2000,
    });
  }
}
