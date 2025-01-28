# Mint Angular Word Cloud

A customizable, responsive word cloud component for Angular 19+ applications.

## Installation

```bash
npm install @miiint/mint-angular-cloud
```

## Usage

1. Import the component in your standalone component:
```typescript
import { MintAngularCloudComponent } from '@miiint/mint-angular-cloud';

@Component({
  standalone: true,
  imports: [MintAngularCloudComponent],
  template: `
    <div class="word-cloud-container">
      <mint-word-cloud
        [words]="words"
        [theme]="'blue'"
        [emphasis]="'high'">
      </mint-word-cloud>
    </div>
  `
})
```

2. Add the required styles:
```scss
.word-cloud-container {
    height: 400px;  // Fixed height
    width: 100%;
    display: block;
    position: relative;

    mint-word-cloud {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        height: 100%;
        width: 100%;
    }
}
```

3. Define your word data:
```typescript
words = [
  { text: 'Example', weight: 100 },
  { text: 'Cloud', weight: 85 },
  { text: 'Component', weight: 70 },
  // ... more words
];
```

## Test app 

Test app is available if you open the test folder with

```bash
cd ./projects/test-app
```

and then use 'ng serve' and open 'localhost:4200', which is the default port


## API Reference

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| words | WordItem[] | [] | Array of words with weights |
| theme | 'orange' \| 'blue' \| 'green' \| 'purple' \| 'multi' | 'orange' | Color theme for the word cloud |
| emphasis | 'high' \| 'medium' \| 'low' | 'high' | Controls size difference between weights |
| minFontSize | number | 12 | Minimum font size in pixels |
| maxFontSize | number | 48 | Maximum font size in pixels |

### Interfaces

```typescript
interface WordItem {
  text: string;
  weight: number;
}
```

## Themes

The component comes with 5 predefined color themes:
- orange: Warm orange gradients
- blue: Professional blue tones
- green: Natural green shades
- purple: Rich purple hues
- multi: Dynamic multi-color scheme

## Important Notes

- Container sizing is crucial for proper rendering
- The component requires specific CSS structure as shown in the usage section
- The word cloud is responsive and will adjust to container resizing
- Word weights affect both size and boldness of the text
- Words are positioned to avoid overlapping

## License

MIT