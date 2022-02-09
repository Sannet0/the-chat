import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: [
    '../auth.scss',
    '../../chat/message/message.component.scss'
  ]
})
export class RegistrationComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
  }

  firstTry: boolean = true;

  registrationForm = this.formBuilder.group({
    login: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    repPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  registration(): void {
    this.firstTry = false;

    if (this.registrationForm.valid) {
      const { login, password, repPassword } = this.registrationForm.value;
      const trimmedForm = {
        login: login.trim(),
        password: password.trim(),
        repPassword: repPassword.trim()
      };

      if (((trimmedForm.login && trimmedForm.password) && trimmedForm.repPassword === trimmedForm.password) && this.registrationForm.valid) {
        this.authService.registration(trimmedForm.login, trimmedForm.password, trimmedForm.repPassword);
      }
    }
  }

}
