# Madrid Metro — Software Design Document

## Navigation

### Concept

The app uses a **spatial/positional navigator** — not a traditional Stack or Tab navigator. Each screen occupies a fixed position in a 2D grid. The user swipes to move between positions; there is no back button and no navigation history. The whole "world" translates on gesture.

### Screen Map

```
            [info]          swipe UP
               ↑
[maps] ← [HOME] → [my stations]
               ↓
           [routes]         swipe DOWN
```

| Position | Direction | Screen |
|----------|-----------|--------|
| (0, 0)   | center    | Home — Madrid Metro logo |
| (0, -1)  | up        | Info |
| (0, 1)   | down      | Routes |
| (-1, 0)  | left      | Maps |
| (1, 0)   | right     | My Stations |

All 4 neighbor screens participate in the swipe animation. Each neighbor screen is a placeholder with only an identifying label until their content is designed.

### How it works

- All adjacent screens are rendered (or lazily mounted) simultaneously in an `Animated.View` container
- A `Pan` gesture detects swipe direction and velocity
- `react-native-reanimated` v4 translates the container to the target screen with a spring animation
- The gesture snaps to the nearest valid screen position
- Invalid directions (no screen mapped) cancel the gesture and snap back

### Navigation labels

The labels of all 4 neighbor screens are always visible at the edges of the Home screen — static, no animation tied to the gesture. They serve as a spatial guide for the user.

### Tech stack

- `react-native-reanimated` v4 (already installed)
- `react-native-gesture-handler` (to install)
- Custom `GestureNavigator` component — lives inside `src/app/(tabs)/index.tsx`

### Tabs preservation

The Expo Router `(tabs)` structure is kept intact and untouched. The spatial navigator lives entirely inside the home tab screen, so file-based routing and deep linking remain available for future use.

### What this is NOT

- Not a Stack navigator — no push/pop, no back gesture
- Not Material Top Tabs — those only handle horizontal, one axis
- Not a ScrollView pager — we need full gesture control and 2D movement

---

## Colors & Styles

> To be defined. Next topic after navigation.

---

## Components

Shared UI primitives used across all screens. Each component is style-fixed — consumers only pass content and intent, never layout or style overrides.

### Button

A pressable action element with visual variants to communicate intent.

**Variants (to be finalized):**
- `primary` — main action, filled
- `secondary` — supporting action, outlined or muted
- `ghost` — low-emphasis, no background
- More variants can be added as screens are designed

**Props idea:** `label`, `variant`, `onPress`, `disabled`

---

### TextField

Two modes under the same component:

#### Normal
Standard text input. Single line, consistent styling across the app.

**Props idea:** `placeholder`, `value`, `onChangeText`, `secureTextEntry`

#### With Dropdown Selection
Text input that opens a selectable list of predefined options below it (not a native picker). The list of items will be defined per use case as screens are designed.

**Props idea:** `placeholder`, `value`, `onSelect`, `items` (array — defined later per screen)

---

### Title

A text-only display component for screen and section headings. Style is fixed — only the text string is dynamic.

**Props idea:** `text`

---

### Notes

- All components consume `Colors` from `src/constants/Colors.ts`
- No style props exposed — styling is internal and consistent
- Variants and items lists will be filled in as each screen is speced out
