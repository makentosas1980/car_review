import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateReviewComponent } from './create-review/create-review.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReviewListComponent } from './review-list/review-list.component';

const routes: Routes = [
  {path: 'list', component: ReviewListComponent},
  {path: 'create', component: CreateReviewComponent},
  {path: '', redirectTo: '/list', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
