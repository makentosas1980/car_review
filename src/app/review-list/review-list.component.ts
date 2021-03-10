import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { Car, CarReview } from '../interfaces/car-review';
import { ReviewsService } from "../services/reviews.service";

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss']
})
export class ReviewListComponent implements OnInit {
  allCarReviews: Array<CarReview> = [];
  reviewList: Array<CarReview> = [];
  allCarMarks: string[] = [];
  allCarModels: string[] = [];
  allCarYears: number[] = [];
  showSelectedCarModels: boolean = false;

  private mark: string = '';
  private model: string = '';
  private year: string = '';

  secondForm = new FormGroup({
    carMarkValueToGet: new FormControl(''),
    carModelValueToGet: new FormControl(''),
    carYearValueToGet: new FormControl('')
  });

  constructor(
    private reviewService: ReviewsService,
    private db: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData() {
    this.db.collection('carReviews').get()
      .subscribe((res: any) => {
        res.docs.forEach((doc: any) => {
          this.allCarReviews.push(doc.data());
        });
        this.availableCarMarks();
        this.availableCarYears(this.reviewList);
      });
    this.reviewList = this.allCarReviews;
  }

  getInputValues() {
    const mark = this.secondForm.value.carMarkValueToGet;
    const model = this.secondForm.value.carModelValueToGet;
    const year = this.secondForm.value.carYearValueToGet;
    this.sortReviews(mark, model, year);
  }

  selectMark(mark: any) {
    this.secondForm.value.carModelValueToGet = '';
    this.getInputValues();
    this.showCarModels(mark.currentTarget.value);
  }

  selectModel() {
    this.getInputValues();
  }

  selectYear() {
    this.secondForm.value.carModelValueToGet = '';
    this.getInputValues();
  }

  sortReviews(mark: string, model: string, year: string) {
    this.reviewList = [];
    if (mark !== '' && model !== '' && year !== '') {
      this.sortByModelMarkYear(mark, model, year);
      return;
    }
    if (mark !== '' && model !== '') {
      this.sortByMarkModel(mark, model);
      return;
    }
    if (mark !== '' && year !== '') {
      this.sortByMarkYear(mark, year);
      return;
    }
    if (mark !== '') {
      this.sortByMark(mark);
      return;
    }
    if (year !== '') {
      this.sortByYear(year);
      return;
    }
    this.getAllData();
  }

  sortByMark(mark: string) {
    this.db.collection('carReviews',
        ref => ref.where('mark', '==', mark))
        .get()
        .subscribe((res: any) => {
          res.docs.forEach((doc: any) => {
            this.reviewList.push(doc.data());
          });
          this.availableCarModels();
        });
  }

  sortByYear(year: string) {
    this.db.collection('carReviews',
        ref => ref.where('year', '==', year))
        .get()
        .subscribe((res: any) => {
          res.docs.forEach((doc: any) => {
            this.reviewList.push(doc.data());
          });
          this.availableCarModels();
        });
  }

  sortByModelMarkYear(mark: string, model: string, year: string) {
    this.db.collection('carReviews',
      ref => ref.where('mark', '==', mark)
        .where('model', '==', model)
        .where('year', '==', year))
      .get()
      .subscribe((res: any) => {
        res.docs.forEach((doc: any) => {
          this.reviewList.push(doc.data());
        });
      });
  }

  sortByMarkModel(mark: string, model: string) {
    this.db.collection('carReviews',
      ref => ref.where('mark', '==', mark)
        .where('model', '==', model))
      .get()
      .subscribe((res: any) => {
        res.docs.forEach((doc: any) => {
          this.reviewList.push(doc.data());
        });
      });
  }

  sortByMarkYear(mark: string, year: string) {
    this.db.collection('carReviews',
      ref => ref.where('mark', '==', mark)
        .where('year', '==', year))
      .get()
      .subscribe((res: any) => {
        res.docs.forEach((doc: any) => {
          this.reviewList.push(doc.data());
        });
        this.availableCarModels();
      });
  }

  availableCarMarks() {
    for (const car of this.reviewList) {
      if (this.allCarMarks.length === 0) {
        this.allCarMarks.push(car.mark);
      } else {
        if (!this.allCarMarks.includes(car.mark)) {
          this.allCarMarks.push(car.mark);
        }
      }
    }
  }

  availableCarModels() {
    this.allCarModels = [];
    for (const car of this.reviewList) {
      if (this.allCarModels.length === 0) {
        this.allCarModels.push(car.model);
      } else {
        if (!this.allCarModels.includes(car.model)) {
          this.allCarModels.push(car.model);
        }
      }
    }
  }

  availableCarYears(reviewList: Array<CarReview>) {
    this.allCarYears = [];
    for (const car of this.reviewList) {
      if (this.allCarYears.length === 0) {
        this.allCarYears.push(car.year);
      } else {
        if (!this.allCarYears.includes(car.year)) {
          this.allCarYears.push(car.year);
        }
      }
    }
  }

  showCarModels(carMark: string) {
    if (carMark !== '') {
      this.showSelectedCarModels = true;
    } else {
      this.showSelectedCarModels = false;
    }
  }

}
