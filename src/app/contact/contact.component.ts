// src/app/contact/contact.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  form: FormGroup;
  submitted = false;
  sending = false;
  success = false;
  error: string | null = null;

  // change to your real inbox
  private targetEmail = 'maxi@your-domain.tld';

  constructor(private fb: FormBuilder, private t: TranslateService) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      privacy: [false, [Validators.requiredTrue]],
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.error = null;
    this.success = false;

    if (this.form.invalid) return;

    this.sending = true;
    try {
      const { name, email, message } = this.form.value;
      const subject = encodeURIComponent(
        `[Portfolio] ${this.t.instant('CONTACT.EMAIL_SUBJECT', { name })}`
      );
      const body = encodeURIComponent(
        `${this.t.instant('CONTACT.EMAIL_BODY_NAME')}: ${name}\n` +
          `${this.t.instant(
            'CONTACT.EMAIL_BODY_EMAIL'
          )}: ${email}\n\n${message}`
      );
      window.location.href = `mailto:${this.targetEmail}?subject=${subject}&body=${body}`;
      this.success = true;
    } catch {
      this.error = this.t.instant('CONTACT.ERROR_GENERIC');
    } finally {
      this.sending = false;
    }
  }
}
