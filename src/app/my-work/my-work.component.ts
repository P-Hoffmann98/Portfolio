import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

type Project = {
  title: string;
  description: string;
  image: string; // path to screenshot
  tech: string[]; // tags you already show
  liveUrl: string; // live demo link
  githubUrl: string; // repo link
};

@Component({
  selector: 'app-my-work',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './my-work.component.html',
  styleUrls: ['./my-work.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyWorkComponent {
  // Sample data — replace with your real projects
  projects: Project[] = [
    {
      title: 'Join',
      description:
        'Task manager inspired by the Kanban system. Create and organize tasks, drag & drop, assign users and categories.',
      image: 'assets/img/join.png',
      tech: ['Angular', 'TypeScript', 'HTML', 'CSS', 'Firebase'],
      liveUrl: 'https://your-live-demo-url.example.com/join',
      githubUrl: 'https://github.com/yourname/join',
    },
    {
      title: 'Another Project',
      description: 'Short one-liner about what it does and why it’s cool.',
      image: 'assets/img/another-project.png',
      tech: ['Angular', 'RxJS', 'Tailwind'],
      liveUrl: 'https://your-live-demo-url.example.com/another',
      githubUrl: 'https://github.com/yourname/another',
    },
  ];
}
