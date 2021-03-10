export interface CarReview {
  mark: string;
  model: string;
  year: number;
  engine: number;
  fuel: string;
  gearbox: string;
  comment: string;
}

export interface Car {
  id: string;
  value: string;
  models: Array<string>;
}
