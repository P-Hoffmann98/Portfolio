import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  form: FormGroup;
  submitted = false;
  sending = false;
  success = false;
  error: string | null = null;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      privacy: [false, [Validators.requiredTrue]],
    });
  }

  onSubmit(): void {
    this.submitted = true;
    this.error = null;
    this.success = false;

    if (this.form.invalid) return;

    this.sending = true;
    try {
      const { name, email, message } = this.form.value;
      const subject = encodeURIComponent(`[Portfolio] Message from ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\n${message}`
      );
      window.location.href = `mailto:maxi@your-domain.tld?subject=${subject}&body=${body}`;
      this.success = true;
    } catch {
      this.error = 'Could not prepare your message. Please try again.';
    } finally {
      this.sending = false;
    }
  }
}
