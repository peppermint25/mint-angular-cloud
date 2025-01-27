import { Component, Input, ElementRef, OnInit, Signal, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordItem } from './models/word-item.interface';

interface BoundingBox {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface PlacedWord {
  word: WordItem;
  box: BoundingBox;
}

type ColorTheme = {
  baseHue: number;
  name: string;
  saturationRange: [number, number];
  lightnessRange: [number, number];
};

@Component({
  selector: 'mint-word-cloud',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="word-cloud-container" #container>
      <div *ngFor="let word of visibleWords()"
          class="word"
          [style.fontSize.px]="calculateFontSize(word)"
          [style.fontWeight]="calculateFontWeight(word)"
          [style.color]="getWordColor(word)"
          [style.left.px]="getPosition(word).left"
          [style.top.px]="getPosition(word).top">
        {{ word.text }}
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    .word-cloud-container {
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;
    }

    .word {
      position: absolute;
      white-space: nowrap;
      cursor: pointer;
      user-select: none;
      transition: all 0.3s ease;
    }
  `]
})
export class MintAngularCloudComponent implements OnInit {
  @Input() set words(value: WordItem[]) {
    this._words.set(value);
    this.updateCloud();
  }
  @Input() minFontSize: number = 12;
  @Input() maxFontSize: number = 48;
  @Input() theme: 'orange' | 'blue' | 'green' | 'purple' | 'multi' = 'orange';
  @Input() emphasis: 'high' | 'medium' | 'low' = 'high';

  private readonly THEMES: Record<string, ColorTheme> = {
    orange: { 
      baseHue: 20, 
      name: 'orange',
      saturationRange: [70, 90],
      lightnessRange: [30, 60]
    },
    blue: { 
      baseHue: 210, 
      name: 'blue',
      saturationRange: [60, 80],
      lightnessRange: [35, 65]
    },
    green: { 
      baseHue: 150, 
      name: 'green',
      saturationRange: [65, 85],
      lightnessRange: [30, 60]
    },
    purple: { 
      baseHue: 270, 
      name: 'purple',
      saturationRange: [60, 80],
      lightnessRange: [35, 65]
    },
    multi: { 
      baseHue: 0, // Will be dynamic
      name: 'multi',
      saturationRange: [65, 85],
      lightnessRange: [35, 65]
    }
  };

  private _words = signal<WordItem[]>([]);
  private containerWidth = signal<number>(0);
  private containerHeight = signal<number>(0);
  private placedWords: PlacedWord[] = [];

  visibleWords: Signal<WordItem[]> = computed(() => {
    return [...this._words()].sort((a, b) => b.weight - a.weight);
  });

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    console.log('Component initialized');
    this.updateContainerDimensions();
    window.addEventListener('resize', () => this.updateContainerDimensions());
  }
  
  ngAfterViewInit() {
    console.log('View initialized');
    this.updateContainerDimensions();
  }

  private updateContainerDimensions() {
    const container = this.elementRef.nativeElement.querySelector('.word-cloud-container');
    console.log('Container dimensions:', {
      width: container.offsetWidth,
      height: container.offsetHeight,
      element: container
    });
    this.containerWidth.set(container.offsetWidth);
    this.containerHeight.set(container.offsetHeight);
    this.updateCloud();
  }

  private updateCloud() {
    this.placedWords = [];
  }

  calculateFontSize(word: WordItem): number {
    const words = this.visibleWords();
    const maxWeight = Math.max(...words.map(w => w.weight));
    const minWeight = Math.min(...words.map(w => w.weight));
    
    let normalizedWeight = (word.weight - minWeight) / (maxWeight - minWeight);
    
    // Apply emphasis factor based on selected emphasis level
    const emphasisFactor = this.getEmphasisFactor();
    normalizedWeight = Math.pow(normalizedWeight, emphasisFactor);
    
    return Math.round(this.minFontSize + (this.maxFontSize - this.minFontSize) * normalizedWeight);
  }

  calculateFontWeight(word: WordItem): number {
    const words = this.visibleWords();
    const maxWeight = Math.max(...words.map(w => w.weight));
    const minWeight = Math.min(...words.map(w => w.weight));
    
    const normalizedWeight = (word.weight - minWeight) / (maxWeight - minWeight);
    
    // Map normalized weight to font weights between 400 (normal) and 700 (bold)
    // We use Math.round to ensure we get standard font weight values
    return Math.round(400 + (normalizedWeight * 300));
  }

  private getEmphasisFactor(): number {
    switch (this.emphasis) {
      case 'high': return 0.5;    // More emphasis on larger weights
      case 'medium': return 0.7;  // Moderate emphasis
      case 'low': return 0.9;     // Less emphasis on larger weights
      default: return 0.5;
    }
  }

  getWordColor(word: WordItem): string {
    const words = this.visibleWords();
    const maxWeight = Math.max(...words.map(w => w.weight));
    const intensity = Math.pow(word.weight / maxWeight, 0.7); // Non-linear intensity
    
    const theme = this.THEMES[this.theme];
    
    if (this.theme === 'multi') {
      // For multi-theme, assign different hues based on word index
      const index = words.findIndex(w => w === word);
      const hue = (index * 137.508) % 360; // Golden angle approximation for good distribution
      return this.generateColor(hue, intensity, theme);
    }
    
    return this.generateColor(theme.baseHue, intensity, theme);
  }

  private generateColor(hue: number, intensity: number, theme: ColorTheme): string {
    const [minSat, maxSat] = theme.saturationRange;
    const [minLight, maxLight] = theme.lightnessRange;
    
    const saturation = minSat + ((1 - intensity) * (maxSat - minSat));
    const lightness = maxLight - (intensity * (maxLight - minLight));
    
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

  private measureWord(word: WordItem): { width: number; height: number } {
    const fontSize = this.calculateFontSize(word);
    const tempSpan = document.createElement('span');
    tempSpan.style.fontSize = `${fontSize}px`;
    tempSpan.style.visibility = 'hidden';
    tempSpan.textContent = word.text;
    document.body.appendChild(tempSpan);
    const width = tempSpan.offsetWidth;
    const height = fontSize;
    document.body.removeChild(tempSpan);
    return { width, height };
  }

  getPosition(word: WordItem): BoundingBox {
    const words = this.visibleWords();
    const index = words.findIndex(w => w.text === word.text);
    
    // Return cached position if already placed
    const existing = this.placedWords.find(p => p.word === word);
    if (existing) {
      return existing.box;
    }

    const dimensions = this.measureWord(word);
    const position = this.findPosition(word, dimensions);
    this.placedWords.push({ word, box: position });
    return position;
  }

  private findPosition(word: WordItem, dimensions: { width: number; height: number }): BoundingBox {
    const { width, height } = dimensions;
    const spacing = 2; // Minimal space between words

    // Place the first (highest weighted) word in the center
    if (this.placedWords.length === 0) {
      return {
        left: (this.containerWidth() - width) / 2,
        top: (this.containerHeight() - height) / 2,
        width,
        height
      };
    }

    // Find potential positions near existing words
    const positions: BoundingBox[] = [];
    
    this.placedWords.forEach(placed => {
      // Try positions around each placed word
      const directions = [
        { dx: -1, dy: 0 }, // Left
        { dx: 1, dy: 0 },  // Right
        { dx: 0, dy: -1 }, // Top
        { dx: 0, dy: 1 },  // Bottom
        { dx: -1, dy: -1 }, // Top-left
        { dx: 1, dy: -1 },  // Top-right
        { dx: -1, dy: 1 },  // Bottom-left
        { dx: 1, dy: 1 }    // Bottom-right
      ];

      directions.forEach(({ dx, dy }) => {
        const box: BoundingBox = {
          left: placed.box.left + dx * (placed.box.width + spacing),
          top: placed.box.top + dy * (placed.box.height + spacing),
          width,
          height
        };

        // Adjust position to prevent overlap
        if (dx === 0) box.left = placed.box.left + (placed.box.width - width) / 2;
        if (dy === 0) box.top = placed.box.top + (placed.box.height - height) / 2;

        // Check if position is valid
        if (this.isValidPosition(box)) {
          positions.push(box);
        }
      });
    });

    // Sort positions by distance to center
    const centerX = this.containerWidth() / 2;
    const centerY = this.containerHeight() / 2;
    positions.sort((a, b) => {
      const distA = Math.pow(a.left + width/2 - centerX, 2) + Math.pow(a.top + height/2 - centerY, 2);
      const distB = Math.pow(b.left + width/2 - centerX, 2) + Math.pow(b.top + height/2 - centerY, 2);
      return distA - distB;
    });

    // Return the best position or fall back to a default
    return positions[0] || {
      left: Math.random() * (this.containerWidth() - width),
      top: Math.random() * (this.containerHeight() - height),
      width,
      height
    };
  }

  private isValidPosition(box: BoundingBox): boolean {
    // Check container bounds
    if (box.left < 0 || box.left + box.width > this.containerWidth() ||
        box.top < 0 || box.top + box.height > this.containerHeight()) {
      return false;
    }

    // Check collisions with other words
    return !this.placedWords.some(placed => this.boxesOverlap(box, placed.box));
  }

  private boxesOverlap(a: BoundingBox, b: BoundingBox): boolean {
    const spacing = 2; // CHANGED: Increased from 2 to 10
    const buffer = 17.5;   // NEW: Added buffer for font weight variations
    
    // NEW: Add buffer to box dimensions to account for bold text
    const aWidth = a.width + buffer;
    const bWidth = b.width + buffer;
    
    return !(
      a.left + aWidth + spacing <= b.left ||
      b.left + bWidth + spacing <= a.left ||
      a.top + a.height + spacing <= b.top ||
      b.top + b.height + spacing <= a.top
    );
  }

  ngOnDestroy() {
    window.removeEventListener('resize', () => this.updateContainerDimensions());
  }
}