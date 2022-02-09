import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { StorageService } from '../../service/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    '../auth.scss',
    '../../chat/message/message.component.scss'
  ]
})
export class LoginComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
  }

  firstTry: boolean = true;

  loginForm = this.formBuilder.group({
    login: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  login(): void {
    this.firstTry = false;
    if (this.loginForm.valid) {
      const { login, password } = this.loginForm.value;
      const trimmedForm = {
        login: login.trim(),
        password: password.trim()
      };

      if (trimmedForm.login && trimmedForm.password) {
        this.authService.login(trimmedForm.login, trimmedForm.password).subscribe((token: { jwt: string; }) => {
          this.storageService.setAuthData(token.jwt);
        });
      }
    }
  }

}
