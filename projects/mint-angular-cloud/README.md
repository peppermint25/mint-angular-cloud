# Mint Angular Cloud

A responsive and dynamic word cloud component for Angular 17+. This component automatically adjusts to container size, supports dynamic scaling, and provides a beautiful visualization of weighted words.

## Installation

```bash
npm install mint-angular-cloud
```

## Usage

```typescript
import { MintAngularCloudComponent, WordItem } from 'mint-angular-cloud';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MintAngularCloudComponent],
  template: `
    <div style="height: 500px">
      <mint-word-cloud 
        [words]="words"
        [minFontSize]="12"
        [maxFontSize]="60">
      </mint-word-cloud>
    </div>
  `
})
export class AppComponent {
  words: WordItem[] = [
    { text: 'Angular', weight: 10 },
    { text: 'TypeScript', weight: 8 },
    { text: 'Component', weight: 6 }
  ];
}
```

## Features

- Responsive design that adapts to container size
- Dynamic font scaling based on word weights
- Automatic layout optimization
- Centered placement of highest weighted word
- Smooth transitions and animations
- Standalone component compatible with Angular 17+

## API

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| words | WordItem[] | [] | Array of words with their weights |
| minFontSize | number | 12 | Minimum font size in pixels |
| maxFontSize | number | 60 | Maximum font size in pixels |

### WordItem Interface

```typescript
interface WordItem {
  text: string;   // The word to display
  weight: number; // The weight/importance of the word
}
```

## License

MIT