# Madrid Metro — Software Design Document

## Navigation

### Concept

The app uses a **spatial/positional navigator** — not a traditional Stack or Tab navigator. Each screen occupies a fixed position in a 2D grid. The user swipes to move between positions; there is no back button and no navigation history. The whole "world" translates on gesture.

### Screen Map

```
              [ng.shop]          swipe UP
                  ↑
[carteira] ← [HOME] → [navegar]
                  ↓
            [@usuário]           swipe DOWN
```

| Position | Direction | Screen |
|----------|-----------|--------|
| (0, 0)   | center    | Home — balance, transfer, request |
| (0, -1)  | up        | ng.shop |
| (0, 1)   | down      | @usuário — user profile |
| (-1, 0)  | left      | Carteira — wallet |
| (1, 0)   | right     | Navegar — browse |

### How it works

- All adjacent screens are rendered (or lazily mounted) simultaneously in an `Animated.View` container
- A `Pan` gesture detects swipe direction and velocity
- `react-native-reanimated` v4 translates the container to the target screen with a spring animation
- The gesture snaps to the nearest valid screen position
- Invalid directions (no screen mapped) cancel the gesture and snap back

### Implementation plan

1. **Phase 1 — vertical only**: up (ng.shop) and down (@usuário)
2. **Phase 2 — horizontal**: left (Carteira) and right (Navegar)
3. **Phase 3 — detail screens**: Stack navigation layered on top for drilling into content within any spatial screen

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
