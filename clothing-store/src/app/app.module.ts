import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CartComponent } from "./components/cart/cart.component";
import { ClothesDetailsComponent } from "./components/clothes-details/clothes-details.component";
import { ClothesComponent } from "./components/clothes/clothes.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { ReviewsComponent } from "./components/reviews/reviews.component";
import { SearchComponent } from "./components/search/search.component";
import { SignupComponent } from "./components/signup/signup.component";
import { ClothesHeroCarouselComponent } from "./helper-components/clothes-hero-carousel/clothes-hero-carousel.component";
import { ClothesHeroItemComponent } from "./helper-components/clothes-hero-item/clothes-hero-item.component";
import { ClothesListItemComponent } from "./helper-components/clothes-list-item/clothes-list-item.component";
import { ClothesListComponent } from "./helper-components/clothes-list/clothes-list.component";
import { FiltersListItemComponent } from "./helper-components/filters-list-item/filters-list-item.component";
import { FiltersListComponent } from "./helper-components/filters-list/filters-list.component";
import { FiltersSidebarComponent } from "./helper-components/filters-sidebar/filters-sidebar.component";
import { LoginFormComponent } from "./helper-components/login-form/login-form.component";
import { ReviewHeroItemComponent } from "./helper-components/review-hero-item/review-hero-item.component";
import { ReviewModalContentComponent } from "./helper-components/review-modal-content/review-modal-content.component";
import { ReviewsListItemComponent } from "./helper-components/reviews-list-item/reviews-list-item.component";
import { ReviewsListComponent } from "./helper-components/reviews-list/reviews-list.component";
import { ReviewsThumbListItemComponent } from "./helper-components/reviews-thumb-list-item/reviews-thumb-list-item.component";
import { ReviewsThumbListComponent } from "./helper-components/reviews-thumb-list/reviews-thumb-list.component";
import { SearchFormComponent } from "./helper-components/search-form/search-form.component";
import { AuthenticationService } from "./services/authentication.service";
import { CartService } from "./services/cart.service";
import { ClothesDetailsResolverService } from "./services/clothes-details-resolver.service";
import { ClothesResolverService } from "./services/clothes-resolver.service";
import { FilterService } from "./services/filter.service";
import { ProducerService } from "./services/producer.service";
import { ReviewsService } from "./services/reviews.service";
import { SharedService } from "./services/shared.service";
import { SignupFormComponent } from './helper-components/signup-form/signup-form.component';
import { ProfileComponent } from './components/profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    ClothesListItemComponent,
    ClothesListComponent,
    ClothesComponent,
    ClothesHeroItemComponent,
    ClothesHeroCarouselComponent,
    ClothesDetailsComponent,
    ClothesDetailsComponent,
    ReviewHeroItemComponent,
    ReviewModalContentComponent,
    ReviewsListComponent,
    ReviewsListItemComponent,
    ReviewsThumbListComponent,
    ReviewsThumbListItemComponent,
    PageNotFoundComponent,
    FiltersListComponent,
    FiltersListItemComponent,
    FiltersSidebarComponent,
    CartComponent,
    ReviewsComponent,
    SearchComponent,
    HomeComponent,
    SearchFormComponent,
    LoginFormComponent,
    SignupFormComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,

  ],
  providers: [AuthenticationService, SharedService,
    CartService, ClothesResolverService, FilterService,
    ProducerService, ReviewsService,
    ClothesDetailsResolverService],
  bootstrap: [AppComponent]
})
export class AppModule { }
