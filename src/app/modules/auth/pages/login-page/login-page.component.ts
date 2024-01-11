import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@module/auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit{

  errorSession: boolean = false
  formLogin: UntypedFormGroup = new UntypedFormGroup({});

  constructor( private authService: AuthService, private router: Router, private cokkie: CookieService ) { }

  ngOnInit(): void {

    this.formLogin = new UntypedFormGroup(
      {
        email: new UntypedFormControl('test@test.com', [
          Validators.required,
          Validators.email
        ]),
        password: new UntypedFormControl('12345678',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(12)
          ])
      }
    )
  };

  sendLogin(): void {

    const { email, password } = this.formLogin.value

    this.authService.sendCredentials(email, password)
      .subscribe( responseOk => {
        const { data, tokenSession } = responseOk
        this.cokkie.set('token', tokenSession)
        this.router.navigateByUrl('/tracks')
      }, err => {
        this.errorSession = true
        setTimeout( () => this.errorSession = false, 4000)
      })

  };



};
