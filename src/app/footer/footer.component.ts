// src/app/footer/footer.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
// Add this if you use |translate in footer.component.html
// import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // TranslateModule, // <-- uncomment if template uses |translate
  ],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'], // <-- fix: plural
})
export class FooterComponent {
  year = new Date().getFullYear();
  form: FormGroup;
  submitted = false;
  sending = false;
  success = false;
  error = '';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      privacy: [false, Validators.requiredTrue],
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.sending = true;
    // TODO: implement actual submit or mailto logic
    this.sending = false;
    this.success = true;
  }
}
