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

- All adjacent screens are rendered simultaneously in an `Animated.View` container
- A `PanResponder` detects swipe direction and velocity on release — the screen stays fixed during the drag
- On release, `Animated.spring` translates the container to the target screen
- The gesture snaps to the nearest valid screen position
- Invalid directions (no screen mapped) cancel the gesture and snap back to current position

### Navigation labels

The labels of all 4 neighbor screens are always visible at the edges of the Home screen — static, no animation tied to the gesture. They serve as a spatial guide for the user.

### Tech stack

- `Animated` + `PanResponder` do React Native (built-in, sem dependências externas)
- Custom `GestureNavigator` component — `src/components/GestureNavigator.tsx`

### Tabs preservation

The Expo Router `(tabs)` structure is kept intact and untouched. The spatial navigator lives entirely inside the home tab screen, so file-based routing and deep linking remain available for future use.

### What this is NOT

- Not a Stack navigator — no push/pop, no back gesture
- Not Material Top Tabs — those only handle horizontal, one axis
- Not a ScrollView pager — we need full gesture control and 2D movement

---

## Colors & Styles

### Theme

Dark theme. Fundo escuro com elementos claros de alto contraste — estética geométrica e retro-futurista.

### Color Tokens

| Token        | Value       | Usage                                 |
|--------------|-------------|---------------------------------------|
| `primary`    | `#222831`   | Fundo principal do app                |
| `background` | `#FFFFFF`   | Texto e ícones primários              |
| `hover`      | `#393E46`   | Superfícies secundárias, bordas       |
| `details`    | `#393E46`   | Detalhes e elementos de apoio         |
| `subtitle`   | `#9A9A9A`   | Texto secundário, placeholders        |
| `positive`   | `#9EEA6C`   | Destaques e estados positivos         |
| `shadow`     | `#000000`   | Sombras e overlays                    |
| `blue`       | `#3b5998`   | Ações e links                         |

### Typography

Duas famílias de fonte, cada uma com papel definido:

| Family    | Font          | Role                                    |
|-----------|---------------|-----------------------------------------|
| `display` | Space Grotesk | Headings, títulos, ênfase               |
| `sans`    | Roboto        | Body text, labels, ações                |

**Variantes do componente `Text`:**

| Variant      | Font          | Weight      | Usage                        |
|--------------|---------------|-------------|------------------------------|
| `heading`    | Space Grotesk | Bold (700)  | Título de screen             |
| `subheading` | Space Grotesk | Medium (500)| Títulos de seção             |
| `body`       | Roboto        | Regular (400)| Conteúdo geral              |
| `label`      | Roboto        | Medium (500)| Botões, tags, nav labels     |
| `caption`    | Roboto        | Regular (400)| Texto descritivo pequeno    |

---

## Components

Shared UI primitives used across all screens. Each component is style-fixed — consumers only pass content and intent, never layout or style overrides.

### Text

Componente de tipografia central do app. Aplica font, size e weight corretos internamente baseado na variante. Consumidores nunca passam estilos diretos.

**Variants:** `heading` | `subheading` | `body` | `label` | `caption`

**Props:** `variant`, `children`, `style` (escape hatch para overrides pontuais — uso restrito)

---

### Header

Componente de cabeçalho exclusivo das screens secundárias (Info, Routes, Maps, My Stations). Exibe o nome da screen e um indicador de direção mostrando de onde o usuário veio — referência espacial do navegador.

**Props:** `title`, `direction` (`'up' | 'down' | 'left' | 'right'`)

O `direction` é mapeado para a seta correspondente: `up → ↓`, `down → ↑`, `left → →`, `right → ←` (indica o caminho de volta ao Home).

---

### Button

A pressable action element with visual variants to communicate intent.

**Color variants:**
- `primary` — background `foreground` (#FFFFFF), text `background` (#111111)
- `secondary` — background `surface` (#222831), text `foreground` (#FFFFFF)
- `ghost` — transparent background, text `foreground` (#FFFFFF)

**Size variants:**
- `default` — width by content + horizontal padding (pill shape)
- `wide` — `alignSelf: 'stretch'`, estica para preencher o container. O pai controla o espaço lateral via `paddingHorizontal`

**Props:** `label`, `variant`, `size`, `onPress`, `disabled`

---

### TextField

Two modes under the same component. `height: 56`, `alignSelf: 'stretch'`, `borderRadius: 8`, borda `muted` (#393E46), fundo transparente.

#### Normal
Standard text input. Single line, consistent styling across the app.

**Props:** `placeholder`, `value`, `onChangeText`, `secureTextEntry`

#### With Dropdown Selection
Text input that opens a selectable list of predefined options below it (not a native picker). The list of items will be defined per use case as screens are designed.

**Props:** `placeholder`, `value`, `onSelect`, `items` (array — defined later per screen)

---

### Title

A text-only display component for screen and section headings. Style is fixed — only the text string is dynamic.

**Props idea:** `text`

---

### Notes

- All components consume `Colors` from `src/theme/colors.ts`
- No style props exposed — styling is internal and consistent
- Variants and items lists will be filled in as each screen is speced out

---

## Screens

### My Stations

A tela tem duas tabs: **My Stations** e **Stations**.

**My Stations:** lista de cards das estações favoritadas pelo usuário. O usuário marca favoritos de dentro de outras telas — esta tab é a visão consolidada do que foi salvo. Sem favoritos, exibe um empty state com a mensagem: "Tu lista de favoritos está vacía, marca tu estación favorita".

**Stations:** lista das 13 linhas do metrô de Madrid, exibidas como cards de categoria. Ao pressionar uma linha, navega via Stack para a lista de estações daquela linha.

---

### Card de Linha (`variant="line"`)

Card de categoria que representa uma linha do metrô. Usado na tab "Stations" da `MyStationsScreen`.

**Layout — `flex-col`:**

```
┌──────────────────────────────────┐
│  [🚇]  Línea 1          [  →  ] │
│                                  │
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │  ← barra colorida
└──────────────────────────────────┘
```

**Estrutura interna:**

Row superior (`flex-row`, `align-items: center`):
- Ícone `train-front` (Lucide React Native)
- Nome da linha — `Text variant="subheading"` (ex: `"Línea 1"`)
- Ícone `chevron-right` (Lucide) — extremo direito

Barra inferior:
- `View` com `height: 4`, `backgroundColor: lineColor`, `borderRadius: 2`
- Ocupa a largura total do card
- Accent visual da cor da linha

**Props:**

| Prop | Tipo |
|------|------|
| `lineId` | `string` |
| `lineNumber` | `number` |
| `lineColor` | `string` |
| `lineName` | `string` |
| `onPress` | `() => void` |

**As 13 linhas do Metrô de Madrid:**

| Linha | Nome | Cor |
|-------|------|-----|
| 1 | Línea 1 | `#1E88E5` (azul) |
| 2 | Línea 2 | `#E53935` (vermelho) |
| 3 | Línea 3 | `#FDD835` (amarelo) |
| 4 | Línea 4 | `#6D4C41` (marrom) |
| 5 | Línea 5 | `#43A047` (verde) |
| 6 | Línea 6 | `#757575` (cinza) |
| 7 | Línea 7 | `#FF8F00` (laranja) |
| 8 | Línea 8 | `#E91E8C` (rosa) |
| 9 | Línea 9 | `#6A1B9A` (roxo) |
| 10 | Línea 10 | `#0D47A1` (azul escuro) |
| 11 | Línea 11 | `#558B2F` (verde escuro) |
| 12 | Línea 12 | `#9E9D24` (verde oliva) |
| R | Ramal | `#1E88E5` (azul — ramal da L1) |

> Cores aproximadas para uso em desenvolvimento. Validar com a paleta oficial da EMT/Madrid Metro antes do release.

---

### Card de Estação (`variant="station"`)

Card de estação favorita. Usado na tab "My Stations" da `MyStationsScreen`.

**Layout — `flex-row` (conteúdo à esquerda, estrela à direita):**

```
┌──────────────────────────────────┐
│  Sol                        [★] │
│  3 min                           │
└──────────────────────────────────┘
```

**Estrutura interna:**

Conteúdo (`flex-col`, `flex: 1`):
- Nome da estação — `Text variant="subheading"`
- Tempo de espera — `Text variant="caption"` (ex: `"3 min"`)

Ícone estrela:
- `star` do Lucide React Native
- Estado **favoritado**: preenchido (`fill`), cor amarela
- Estado **não favoritado**: outline (padrão do ícone), sem fill
- `onPress`: desfavorita a estação → card é removido da `FlatList`

**Tempo de espera:**

Dado fictício gerado em runtime: `Math.floor(Math.random() * 10) + 1` (1–10 min). Placeholder até integração com API real.

**Props:**

| Prop | Tipo |
|------|------|
| `stationName` | `string` |
| `lineNumber` | `number` |
| `lineColor` | `string` |
| `lineName` | `string` |
| `isFavorited` | `boolean` |
| `onUnfavorite` | `() => void` |
