import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- for *ngIf, *ngFor, etc.
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';

type ContactForm = FormGroup<{
  name: FormControl<string>;
  email: FormControl<string>;
  message: FormControl<string>;
  privacy: FormControl<boolean>;
}>;

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // <-- include CommonModule
  templateUrl: './contact.component.html', // <-- point to your HTML file
})
export class ContactComponent {
  submitted = false;
  sending = false;
  success = false;
  error: string | null = null;

  constructor(private fb: FormBuilder) {}

  form: ContactForm = this.fb.nonNullable.group({
    name: this.fb.nonNullable.control('', {
      validators: [Validators.required],
    }),
    email: this.fb.nonNullable.control('', {
      validators: [Validators.required, Validators.email],
    }),
    message: this.fb.nonNullable.control('', {
      validators: [Validators.required, Validators.minLength(10)],
    }),
    privacy: this.fb.nonNullable.control(false, {
      validators: [Validators.requiredTrue],
    }),
  });

  // getters for clean template access
  get name() {
    return this.form.controls.name;
  }
  get email() {
    return this.form.controls.email;
  }
  get message() {
    return this.form.controls.message;
  }
  get privacy() {
    return this.form.controls.privacy;
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) return;

    this.sending = true;
    this.error = null;

    // Example: open user's mail client with prefilled content (optional)
    const { name, email, message } = this.form.getRawValue();
    const subject = encodeURIComponent(`Contact from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );
    window.location.href = `mailto:your@email.com?subject=${subject}&body=${body}`;

    this.sending = false;
    this.success = true;
    // Optionally reset after a moment
    // setTimeout(() => this.form.reset({ name: '', email: '', message: '', privacy: false }), 500);
  }
}
