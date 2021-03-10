import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from '@angular/router';
import { Car, CarReview } from "../interfaces/car-review";
import { ReviewsService } from "../services/reviews.service";



@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.scss']
})

export class CreateReviewComponent implements OnInit {
  public years: number[] = [2018, 2019, 2020, 2021];
  public engines: number[] = [1.6, 1.7, 1.8, 1.9, 2.0];
  public fuels: string[] = ['dyzelinas', 'benzinas', 'benzinas-dujos'];
  public gearbox: string[] = ['automatinė', 'mechaninė'];

  public carForm!: FormGroup;

  public carReviews: CarReview[] = [];

  public carMarks: Car[] = [
    { id: '0', value: '', models: [] }
  ]

  public markControl = new FormControl(this.carMarks[0].id);
  public modelControl = new FormControl(undefined);
  public yearControl = new FormControl(undefined);
  public engineControl = new FormControl(undefined);
  public fuelControl = new FormControl(undefined);
  public gearboxControl = new FormControl(undefined);
  public commentControl = new FormControl(undefined);

  constructor(
    private reviewService: ReviewsService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.carJson();
    this.createForm();
  }

  submitForm(): void {
    let carMark = '';
    for (const item of this.carMarks) {
      if (item.id == this.carForm.value.mark) {
        carMark = item.value;
        this.carForm.value.mark = carMark;
      }
    }
    let data = this.carForm.value;

    this.reviewService.addCarReview().add(data)
      .then(res => {
        this.reviewService.showSnackbar('Sėkmingai sukurtas įrašas!', 'x');
        setTimeout(() => {
          this.router.navigate(['/list']);
        }, 1000);
      })
      .catch(err => {
        this.reviewService.showSnackbar('Įvyko klaida, bandykite dar karta...', 'x');
        console.log(err);
      })
  }

  carJson() {
    this.http.get('../../assets/cars.json')
      .subscribe((res: any) => {
        this.carMarks = [];
        this.carMarks = res.data;
      })
  }

  createForm() {
    this.carForm = new FormGroup({
      mark: this.markControl,
      model: this.modelControl,
      year: this.yearControl,
      engine: this.engineControl,
      fuel: this.fuelControl,
      gearbox: this.gearboxControl,
      comment: this.commentControl
    });
  }

}
