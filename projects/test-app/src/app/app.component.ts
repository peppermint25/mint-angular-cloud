import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// app.component.ts
import { MintAngularCloudComponent, WordItem } from 'mint-angular-cloud';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MintAngularCloudComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  words: WordItem[] = [
    // Most prominent technologies
    { text: 'Angular', weight: 200 },
    { text: 'TypeScript', weight: 180 },
    { text: 'JavaScript', weight: 175 },
    { text: 'React', weight: 170 },
    { text: 'Node.js', weight: 165 },
    
    // Very important technologies
    { text: 'Python', weight: 140 },
    { text: 'Docker', weight: 135 },
    { text: 'Kubernetes', weight: 130 },
    { text: 'AWS', weight: 125 },
    { text: 'HTML', weight: 120 },
    
    // Medium importance
    { text: 'CSS', weight: 90 },
    { text: 'Git', weight: 85 },
    { text: 'Linux', weight: 80 },
    { text: 'MongoDB', weight: 75 },
    { text: 'PostgreSQL', weight: 70 },
    
    // Lower-medium importance
    { text: 'Vue', weight: 60 },
    { text: 'Azure', weight: 55 },
    { text: 'GraphQL', weight: 50 },
    { text: 'REST', weight: 45 },
    { text: 'Redis', weight: 40 },
    
    // Background technologies
    { text: 'VSCode', weight: 30 },
    { text: 'Bootstrap', weight: 28 },
    { text: 'Material', weight: 26 },
    { text: 'WebSocket', weight: 24 },
    { text: 'CI/CD', weight: 22 },
    { text: 'Windows', weight: 20 },
    { text: 'MacOS', weight: 18 },
    { text: 'Postman', weight: 16 },
    { text: 'IntelliJ', weight: 14 },
    { text: 'Swagger', weight: 12 },
    
    // Smallest items
    { text: 'Eclipse', weight: 10 },
    { text: 'Agile', weight: 8 },
    { text: 'Scrum', weight: 6 },
    { text: 'Framework', weight: 5 },
    { text: 'Development', weight: 4 },
    { text: 'Backend', weight: 4 },
    { text: 'Performance', weight: 3 },
    { text: 'DevOps', weight: 3 },
    { text: 'OAuth', weight: 2 },
    { text: 'Testing', weight: 2 },
    { text: 'Jest', weight: 1 },
    { text: 'SASS', weight: 1 },
    { text: 'NPM', weight: 1 }
  ];

  words2: WordItem[] = [
    { text: 'Angular', weight: 20 },
    { text: 'TypeScript', weight: 20 },
    { text: 'JavaScript', weight: 20 },
    { text: 'HTML', weight: 20 },
    { text: 'CSS', weight: 20 },
    { text: 'React', weight: 16 },
    { text: 'Vue', weight: 16 },
    { text: 'Node.js', weight: 14 },
    { text: 'Express', weight: 14 },
    { text: 'MongoDB', weight: 12 },
    { text: 'PostgreSQL', weight: 12 },
    { text: 'GraphQL', weight: 10 },
    { text: 'REST', weight: 10 },
    { text: 'Docker', weight: 8 },
    { text: 'Kubernetes', weight: 8 },
    { text: 'AWS', weight: 8 },
    { text: 'Azure', weight: 8 },
    { text: 'CI/CD', weight: 6 },
    { text: 'Git', weight: 6 },
    { text: 'Agile', weight: 6 },
    { text: 'Next.js', weight: 20 },
    { text: 'Svelte', weight: 20 },
    { text: 'Python', weight: 20 },
    { text: 'Java', weight: 20 },
    { text: 'PHP', weight: 20 },
    { text: 'Vuex', weight: 16 },
    { text: 'Deno', weight: 14 },
    { text: 'FastAPI', weight: 14 },
    { text: 'Redis', weight: 12 },
    { text: 'MySQL', weight: 12 },
    { text: 'WebSocket', weight: 10 },
    { text: 'gRPC', weight: 10 },
    { text: 'Terraform', weight: 8 },
    { text: 'OpenShift', weight: 8 },
    { text: 'GCP', weight: 8 },
    { text: 'DigitalOcean', weight: 8 },
    { text: 'GitLab', weight: 6 },
    { text: 'Bitbucket', weight: 6 },
    { text: 'Scrum', weight: 6 }
  ];
}