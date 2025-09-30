import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { LandingPageComponent } from './landing-page/landing-page.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { SkillSetComponent } from './skill-set/skill-set.component';
import { MyWorkComponent } from './my-work/my-work.component';
import { TeamplayerComponent } from './teamplayer/teamplayer.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    TranslateModule, // needed here if template uses |translate
    LandingPageComponent,
    AboutMeComponent,
    SkillSetComponent,
    MyWorkComponent,
    TeamplayerComponent,
    ContactComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'], // plural
})
export class AppComponent {
  title = 'portfolio';

  constructor(private t: TranslateService) {
    t.addLangs(['en', 'de']);
    const saved = localStorage.getItem('lang') as 'en' | 'de' | null;
    const browser = navigator.language?.startsWith('de') ? 'de' : 'en';
    t.use(saved ?? browser ?? 'en');
  }

  setLang(lang: 'en' | 'de') {
    this.t.use(lang);
    localStorage.setItem('lang', lang);
  }
}
