![Harmony](./assets/harmony.png)

# Harmony

A new kind of Color Picker

### Installation

Harmony is available on the npm registry. It requires React as a peer dependency.

`pnpm install @newfrgmnt/harmony`

### API

```typescript
import {ColorWheel} from '@newfrgmnt/harmony';

export const MyColorPicker = () => {
    return (
        <ColorWheel harmony="analogous" radius={200} />
    );
}
```

#### Supported properties

```typescript
radius: number;
harmony: keyof typeof harmonies;
color?: {hue: number, saturation: number, value: number};
defaultColor?: {hue: number, saturation: number, value: number};
onChange?: (colors: { hue: number; saturation: number; value: number }[]) => void;
```