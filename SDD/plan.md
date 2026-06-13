# Madrid Metro — Implementation Plan

Ordem de implementação baseada em dependências: tema e primitivos primeiro, navegação por último.

---

## Step 1 — Install dependencies

```bash
npx expo install @expo-google-fonts/space-grotesk
```

- `@expo-google-fonts/space-grotesk` — fonte display (já temos Roboto via `@expo-google-fonts/roboto`)
- `Animated` e `PanResponder` são built-in do React Native — nenhuma instalação necessária

---

## Step 2 — theme/colors.ts ✓

Cores já definidas em `src/theme/colors.ts`. Nenhuma alteração necessária.

---

## Step 3 — Update theme/font-family.ts

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

## Step 4 — Load fonts in root layout

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

## Step 5 — Create Text component

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

## Step 6 — Create Header component

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

## Step 7 — Secondary screens

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

## Step 8 — GestureNavigator

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

## Step 9 — Home screen content

`HomeScreen` dentro do `GestureNavigator`: logo do Madrid Metro centralizado.
Asset disponível em `src/assets/metro.png`.
