# Mint Word Cloud
An Angular component for creating customizable word clouds.

## Installation
```bash
npm install @your-scope/mint-word-cloud
```

## Usage
```typescript
import { MintAngularCloudComponent } from '@your-scope/mint-word-cloud';

@Component({
  imports: [MintAngularCloudComponent],
  // ...
})
```

## API
- `words: WordItem[]` - Array of words with weights
- `theme: 'orange' | 'blue' | 'green' | 'purple' | 'multi'`
- `emphasis: 'high' | 'medium' | 'low'`
- `minFontSize: number`
- `maxFontSize: number`