import { inject } from "@angular/core";
import { CanActivateChildFn, CanActivateFn, Router } from "@angular/router";
import { AuthenticationService } from "../services/authentication.service";

export const LogoutGuard: CanActivateFn = () => {
    const authenticationService = inject(AuthenticationService);
    const router = inject(Router);

    authenticationService.userLogout();

    // redirect to login page
    return router.parseUrl('/login');

}