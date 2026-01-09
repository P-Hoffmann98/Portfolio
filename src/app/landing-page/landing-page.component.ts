import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {
  isMenuOpen = false;
  currentLang: 'en' | 'de' = 'en';

  constructor(private t: TranslateService) {
    this.t.addLangs(['en', 'de']);
    const saved = localStorage.getItem('lang') as 'en' | 'de' | null;
    const browser = navigator.language?.startsWith('de') ? 'de' : 'en';
    this.currentLang = saved ?? (this.t.currentLang as any) ?? browser ?? 'en';
    this.t.use(this.currentLang);
  }

  setLang(lang: 'en' | 'de') {
    if (lang === this.currentLang) return;
    this.currentLang = lang;
    this.t.use(lang);
    localStorage.setItem('lang', lang);
  }

  @HostListener('document:keydown.escape')
  onEsc() {
    this.isMenuOpen = false;
  }
}
