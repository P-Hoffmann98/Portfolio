// src/app/teamplayer/teamplayer.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-teamplayer',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './teamplayer.component.html',
  styleUrls: ['./teamplayer.component.scss'],
})
export class TeamplayerComponent {}
