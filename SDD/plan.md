# Madrid Metro — Implementation Plan

Ordem de implementação baseada em dependências: tema e primitivos primeiro, navegação por último.

---

## Step 1 — Install dependencies ✓

```bash
npx expo install @expo-google-fonts/space-grotesk
```

- `@expo-google-fonts/space-grotesk` — fonte display (já temos Roboto via `@expo-google-fonts/roboto`)
- `Animated` e `PanResponder` são built-in do React Native — nenhuma instalação necessária

---

## Step 2 — theme/colors.ts ✓

Cores definidas em `src/theme/colors.ts` com os seguintes tokens:

| Token      | Value     |
|------------|-----------|
| `primary`  | `#222831` |
| `background`| `#FFFFFF`|
| `hover`    | `#393E46` |
| `details`  | `#393E46` |
| `subtitle` | `#9A9A9A` |
| `positive` | `#9EEA6C` |
| `shadow`   | `#000000` |
| `blue`     | `#3b5998` |

---

## Step 3 — Update theme/font-family.ts ✓

Adicionar Space Grotesk como família `display` ao lado do Roboto (`sans`):

```ts
export const fontFamily = {
  display: {
    medium: 'SpaceGrotesk_500Medium',
    bold:   'SpaceGrotesk_700Bold',
  },
  sans: {
    regular: 'Roboto_400Regular',
    medium:  'Roboto_500Medium',
  },
}
```

---

## Step 4 — Load fonts in root layout ✓

Arquivo: `src/app/_layout.tsx`

- Importar `useFonts` de `expo-font`
- Importar os pesos usados de `@expo-google-fonts/roboto` e `@expo-google-fonts/space-grotesk`
- Manter `SplashScreen.preventAutoHideAsync()` até fontes carregadas

```tsx
const [loaded] = useFonts({
  SpaceGrotesk_500Medium,
  SpaceGrotesk_700Bold,
  Roboto_400Regular,
  Roboto_500Medium,
})
```

---

## Step 5 — Create Text component ✓

Arquivo: `src/components/Text.tsx`

Props: `variant`, `children`

| Variant      | Font family      | Weight | Size |
|--------------|------------------|--------|------|
| `heading`    | SpaceGrotesk     | 700    | 32   |
| `subheading` | SpaceGrotesk     | 500    | 20   |
| `body`       | Roboto           | 400    | 16   |
| `label`      | Roboto           | 500    | 14   |
| `caption`    | Roboto           | 400    | 12   |

Cores: `foreground` por default. Sem props de estilo expostas.

---

## Step 6 — Create Header component ✓

Arquivo: `src/components/Header.tsx`

Props: `title: string`, `direction: 'up' | 'down' | 'left' | 'right'`

Mapeamento de seta (indica o caminho de volta ao Home):

| direction | arrow |
|-----------|-------|
| `up`      | `↓`   |
| `down`    | `↑`   |
| `left`    | `→`   |
| `right`   | `←`   |

Layout: seta + título lado a lado, alinhados à esquerda, padding padrão no topo.
Usa o componente `Text` internamente (`variant="heading"`).

---

## Step 7 — Secondary screens ✓

Quatro screens internas ao `GestureNavigator` (não são arquivos de rota separados):
- `InfoScreen`
- `RoutesScreen`
- `MapsScreen`
- `MyStationsScreen`

Cada uma: `Header` com `title` e `direction` correspondente + `Text` centralizado com o nome da screen (`variant="heading"`, Space Grotesk Bold). Fundo `background`, sem mais elementos — placeholder até o conteúdo real ser especificado.

| Screen       | title          | direction |
|--------------|----------------|-----------|
| Info         | `"Info"`       | `"up"`    |
| Routes       | `"Routes"`     | `"down"`  |
| Maps         | `"Maps"`       | `"left"`  |
| My Stations  | `"My Stations"`| `"right"` |

---

## Step 8 — GestureNavigator ✓

Arquivo: `src/components/GestureNavigator.tsx`  
Usado em: `src/app/(tabs)/index.tsx`

### Grid

5 posições fixas em coordenadas de tela. O container `Animated.View` tem largura `3 * screenWidth` e altura `3 * screenHeight`, posicionando cada screen na célula correta:

```
col:  -1        0         +1
row -1:       [Info]
row  0: [Maps] [Home] [MyStations]
row +1:      [Routes]
```

### Estado

```ts
const col = useRef(0)                          // posição atual na grade (coluna)
const row = useRef(0)                          // posição atual na grade (linha)
const pan = useRef(new Animated.ValueXY({ x: -W, y: -H })).current  // posição do container
```

### Gesture

- `PanResponder` do React Native (built-in)
- A tela permanece **fixa durante o arrasto** — não segue o dedo
- No `onPanResponderRelease`: determinar direção dominante (horizontal vs vertical) pelo `dx`/`dy` e velocidade `vx`/`vy`
- Se atingir `SWIPE_THRESHOLD` (50px) ou `VELOCITY_THRESHOLD` (0.5 px/ms): navegar para a próxima posição
- Se a direção não tem screen mapeada: snap de volta à posição atual
- Animação: `Animated.spring` com `damping: 20`, `stiffness: 200`, `useNativeDriver: true`

### Navigation labels

Quatro `Text` com `variant="label"` posicionados nas bordas do Home (não animados):
- `"Info"` — borda superior, centralizado
- `"Routes"` — borda inferior, centralizado  
- `"Maps"` — borda esquerda, rotacionado 90°
- `"My Stations"` — borda direita, rotacionado -90°

---

## Step 9 — Home screen content ✓

`HomeScreen` dentro do `GestureNavigator`: logo do Madrid Metro centralizado.
Assets: `src/assets/logo.png` (logo principal) e `src/assets/comunidadmadrid.png` (logo Comunidad de Madrid com label abaixo).

---

## Step 10 — Create Button component ✓

Arquivo: `src/components/Button.tsx`

Props: `label`, `variant`, `size`, `onPress`, `disabled`

**Color variants:**

| Variant     | Background              | Text                    |
|-------------|-------------------------|-------------------------|
| `primary`   | `foreground` (#FFFFFF)  | `background` (#111111)  |
| `secondary` | `surface` (#222831)     | `foreground` (#FFFFFF)  |
| `ghost`     | transparente            | `foreground` (#FFFFFF)  |

**Size variants:**

| Size      | Comportamento                                                                 |
|-----------|-------------------------------------------------------------------------------|
| `default` | Largura pelo conteúdo + `paddingHorizontal`, `borderRadius: 100` (pill)       |
| `wide`    | `alignSelf: 'stretch'`, `borderRadius` moderado. Pai controla espaço lateral via `paddingHorizontal` |

Usa o componente `Text` internamente (`variant="label"`).

---

## Step 11 — Create TextField component ✓

Arquivo: `src/components/TextField.tsx`

`height: 56`, `alignSelf: 'stretch'`, `borderRadius: 8`, borda `muted` (#393E46), fundo transparente.

**Modos:**

| Modo       | Props                                              |
|------------|----------------------------------------------------|
| `normal`   | `placeholder`, `value`, `onChangeText`, `secureTextEntry` |
| `dropdown` | `placeholder`, `value`, `onSelect`, `items` (array — definido por screen) |

O modo `dropdown` abre uma lista selecionável abaixo do input (não é native picker). Selecionar um item fecha a lista automaticamente. `items` são definidos por screen quando o conteúdo for especificado.

---

## Step 12 — MapsScreen content

Arquivo: `src/components/MapsScreen.tsx`

`Header` com `title="Maps"` e `direction="left"` já presente. Adicionar abaixo do header um `View` em coluna com `gap: 4` contendo dois `Button`:

| label         | variant     | size    |
|---------------|-------------|---------|
| `"Metro Map"` | `secondary` | `wide`  |
| `"Turism Map"`| `secondary` | `wide`  |

O container dos botões recebe `paddingHorizontal` para controlar o espaço lateral (comportamento padrão do `size="wide"`). `onPress` a definir quando a navegação/conteúdo dos mapas for especificado.

---

## Step 13 — Refactor: gesture screens → `src/gesture/`

Mover todas as gesture screens de `src/components/` para `src/gesture/`, convertendo arquivos planos em pastas com `index.tsx`:

| De | Para |
|----|------|
| `src/components/HomeScreen.tsx` | `src/gesture/HomeScreen/index.tsx` |
| `src/components/InfoScreen.tsx` | `src/gesture/InfoScreen/index.tsx` |
| `src/components/MapsScreen.tsx` | `src/gesture/MapsScreen/index.tsx` |
| `src/components/MyStationsScreen.tsx` | `src/gesture/MyStationsScreen/index.tsx` |
| `src/components/RoutesScreen.tsx` | `src/gesture/RoutesScreen/index.tsx` |

Atualizar imports no `GestureNavigator`. Primitivos compartilhados (Text, Button, Header, TextField, GestureNavigator) permanecem em `src/components/`.

---

## Step 14 — Install material top tabs dependencies

```bash
npx expo install @react-navigation/material-top-tabs react-native-tab-view react-native-pager-view
```

---

## Step 15 — CardStations component

Arquivo: `src/gesture/MyStationsScreen/components/CardStation/index.tsx`

Card que representa uma estação favorita.

> **TODO:** definir props e visual com o usuário.

---

## Step 16 — MyStationsScreen content

Arquivo: `src/gesture/MyStationsScreen/index.tsx`

`Header` com `title="My Stations"` e `direction="right"`. Abaixo do header, top tab navigator com duas tabs usando `createMaterialTopTabNavigator` e custom tab bar.

### Tabs

| Tab | Conteúdo |
|-----|----------|
| `My Stations` | `FlatList` de `CardStation` com favoritos. Se vazia, exibe `EmptyFavorites` |
| `Stations` | `FlatList` com todas as estações. A definir. |

### Componentes locais

Pasta: `src/gesture/MyStationsScreen/components/`

#### EmptyFavorites

Exibido na tab "My Stations" quando não há favoritos.

Mensagem: `"Tu lista de favoritos está vacía, marca tu estación favorita"`

Props, layout e tipografia a definir.

#### TopTabBar

Custom tab bar passada via prop `tabBar` do `Tab.Navigator`. Ícones via `lucide-react-native`. Visual e ícones a definir.
