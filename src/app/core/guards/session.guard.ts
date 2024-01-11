import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';




export const sessionGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)
  const cookie = inject(CookieService)
  let token:boolean = false


  try {

    const session = cookie.get('token')

    if(!session){

      router.navigateByUrl('auth/login')
      return token = false
    }

    token = true

  } catch (error) {
    return token
  }

  return token
};



