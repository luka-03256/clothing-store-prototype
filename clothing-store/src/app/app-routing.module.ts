import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./components/signup/signup.component";
import { HomeComponent } from "./components/home/home.component";
import { ClothesComponent } from "./components/clothes/clothes.component";
import { ClothesResolverService } from "./services/clothes-resolver.service";
import { ClothesDetailsComponent } from "./components/clothes-details/clothes-details.component";
import { ClothesDetailsResolverService } from "./services/clothes-details-resolver.service";
import { SearchComponent } from "./components/search/search.component";
import { SearchResolverService } from "./services/search-resolver.service";
import { ReviewsComponent } from "./components/reviews/reviews.component";
import { CartComponent } from "./components/cart/cart.component";
import { LogoutGuard } from "./helper-components/logout.guard";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { ProfileComponent } from "./components/profile/profile.component";

const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: 'clothes', component: ClothesComponent,
        resolve: { clothes: ClothesResolverService },
    },
    {
        path: 'clothes/:id',
        component: ClothesDetailsComponent,
        resolve: { clothingItem: ClothesDetailsResolverService },
    },
    {
        path: 'search',
        component: SearchComponent,
        resolve: { clothes: SearchResolverService },
    },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'reviews', component: ReviewsComponent },
    { path: 'cart', component: CartComponent },
    { path: 'profile', component: ProfileComponent },
    {
        path: 'logout',
        canActivate: [LogoutGuard],
        component: LoginComponent,
    },
    { path: '**', component: PageNotFoundComponent }//wildcard route for 404 page 
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        scrollPositionRestoration: 'enabled',
    })],
    exports: [RouterModule]
})

export class AppRoutingModule { }