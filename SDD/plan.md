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

## Step 11.5 — Dark/Light theme ✓

Adicionado sistema de temas em `src/theme/colors.ts`:

```ts
export const darkTheme = { background: '#222831', foreground: '#FFFFFF' }
export const lightTheme = { background: '#FFFFFF', foreground: '#222831' }
```

Exportados via `theme` em `src/theme/index.ts`.

- **HomeScreen + GestureNavigator** → `darkTheme` (sem alteração)
- **Screens secundárias** (Info, Routes, Maps, MyStations) → `lightTheme` (fundo branco, texto escuro)
- **Header** → usa `lightTheme.foreground` (só aparece em screens secundárias)
- **Button** → recebeu prop `colorScheme?: 'dark' | 'light'` (default `'dark'`). Cores calculadas em runtime via `getVariantStyle` / `getTextColor`. `secondary` em `light` usa estilo outlined.

---

## Step 12 — MapsScreen content ✓

Arquivo: `src/components/MapsScreen.tsx`

`Header` com `title="Maps"` e `direction="left"` já presente. Adicionar abaixo do header um `View` em coluna com `gap: 4` contendo dois `Button`:

| label         | variant     | size    |
|---------------|-------------|---------|
| `"Metro Map"` | `secondary` | `wide`  |
| `"Turism Map"`| `secondary` | `wide`  |

O container dos botões recebe `paddingHorizontal` para controlar o espaço lateral (comportamento padrão do `size="wide"`). `onPress` a definir quando a navegação/conteúdo dos mapas for especificado.

---

## Step 13 — Refactor: gesture screens → `src/gesture/` ✓

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

## Step 14 — Install material top tabs dependencies ✓

```bash
npx expo install @react-navigation/material-top-tabs react-native-tab-view react-native-pager-view
```

---

## Step 15 — Card component ✓

Arquivo: `src/components/Card/index.tsx`

Componente dinâmico reutilizável para os dois contextos da `MyStationsScreen`.

**Props base:**

| Prop | Tipo | Descrição |
|------|------|-----------|
| `variant` | `"station" \| "line"` | Define o tipo de conteúdo renderizado |
| `size` | `"sm" \| "md"` | Tamanho do card. Padrão: `"md"` |
| `onPress` | `() => void` | Callback de toque |

**Props — `variant="line"` (card de categoria):**

| Prop | Tipo |
|------|------|
| `lineId` | `string` |
| `lineNumber` | `number` |
| `lineColor` | `string` |
| `lineName` | `string` |

Exibe: cor da linha, número, nome e ícone de seta (indica navegação para lista de estações).

**Props — `variant="station"` (card de estação favorita):**

| Prop | Tipo |
|------|------|
| `stationName` | `string` |
| `lineNumber` | `number` |
| `lineColor` | `string` |
| `lineName` | `string` |
| `isFavorited` | `boolean` |
| `onUnfavorite` | `() => void` |

Exibe: nome da estação, tempo de espera fictício e ícone `star` preenchido amarelo. Ao pressionar a estrela, chama `onUnfavorite` e o card é removido da `FlatList`.

---

## Step 16 — my-stations Stack navigation ✓

Estrutura de arquivos para suportar navegação Stack a partir da tab "Stations":

```
app/(tabs)/my-stations/
  _layout.tsx          ← Stack layout
  index.tsx            ← tela principal (MyStationsScreen com top tabs)
  [lineId]/
    index.tsx          ← lista de estações da linha (StationsListScreen)
```

**`_layout.tsx`:**

```tsx
import { Stack } from 'expo-router';

export default function MyStationsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[lineId]/index" options={{ headerShown: false }} />
    </Stack>
  );
}
```

Navegação do `Card` (`variant="line"`) ao pressionar:

```tsx
router.push({
  pathname: '/my-stations/[lineId]',
  params: { lineId: '1', lineColor: '#003399', lineName: 'Línea 1' },
})
```

---

## Step 17 — StationsListScreen ✓

Arquivo: `app/(tabs)/my-stations/[lineId]/index.tsx`

Tela exibida ao selecionar uma linha na tab "Stations". Recebe `lineId`, `lineColor` e `lineName` via `useLocalSearchParams`.

Renderiza um `FlatList` simples com as estações daquela linha. Cada item da lista exibe o nome da estação e um ícone `star` (Lucide) para favoritar:

| Estado da estrela | Visual | Ação ao pressionar |
|---|---|---|
| Não favoritada | outline (padrão) | Favorita → fill amarelo → estação aparece na tab "My Stations" |
| Favoritada | fill amarelo | Desfavorita → volta para outline → remove da tab "My Stations" |

O estado de favoritos é compartilhado — a estrela reflete o mesmo estado em ambas as telas. Gerenciamento de estado a definir em step dedicado.

---

## Step 18 — MyStationsScreen content ✓

Arquivo: `src/gesture/MyStationsScreen/index.tsx`

`Header` com `title="My Stations"` e `direction="right"`. Abaixo do header, top tab navigator com duas tabs usando `createMaterialTopTabNavigator` e custom tab bar.

### Tabs

| Tab | Conteúdo |
|-----|----------|
| `My Stations` | `FlatList` de `Card` (`variant="station"`) com favoritos. Se vazia, exibe `EmptyFavorites` |
| `Stations` | `FlatList` de `Card` (`variant="line"`) com as 13 linhas do metro. Ao pressionar, navega via Stack para `[lineId]` |

### Componentes locais

Pasta: `src/gesture/MyStationsScreen/components/`

#### EmptyFavorites

Exibido na tab "My Stations" quando não há favoritos.

Mensagem: `"Tu lista de favoritos está vacía, marca tu estación favorita"`

Props, layout e tipografia a definir.

#### TopTabBar

Custom tab bar passada via prop `tabBar` do `Tab.Navigator`. Ícones via `lucide-react-native`. Visual e ícones a definir.

---

## Step 19 — MapViewer screen ✓

Tela fullscreen modal para visualização dos mapas estáticos. Rota raiz, fora de `(tabs)`.

### Arquivos alterados

| Arquivo | Ação |
|---------|------|
| `src/app/_layout.tsx` | Registrar rota `map-viewer` na Stack raiz |
| `src/app/map-viewer.tsx` | Criar tela de visualização |
| `src/gesture/MapsScreen/index.tsx` | Adicionar `onPress` nos dois botões |

### `src/app/_layout.tsx`

Adicionar dentro do `<Stack>`:

```tsx
<Stack.Screen
  name="map-viewer"
  options={{ headerShown: false, presentation: 'fullScreenModal' }}
/>
```

### `src/app/map-viewer.tsx` (novo)

```tsx
import { View, Image, Pressable, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { X } from 'lucide-react-native';
import { theme } from '@/theme';

const MAPS = {
  metro: require('@/assets/metro.png'),
  turism: require('@/assets/turism.png'),
} as const;

export default function MapViewer() {
  const { type } = useLocalSearchParams<{ type: keyof typeof MAPS }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Pressable onPress={() => router.back()} style={styles.close} hitSlop={8}>
        <X size={24} color={theme.lightTheme.foreground} />
      </Pressable>
      <Image
        source={MAPS[type] ?? MAPS.metro}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.lightTheme.background,
  },
  close: {
    alignSelf: 'flex-end',
    padding: 16,
  },
  image: {
    flex: 1,
    width: '100%',
  },
});
```

### `src/gesture/MapsScreen/index.tsx`

Adicionar `useRouter` e `onPress` nos botões:

```tsx
const router = useRouter();

// Metro Map button
onPress={() => router.push({ pathname: '/map-viewer' as any, params: { type: 'metro' } })}

// Turism Map button
onPress={() => router.push({ pathname: '/map-viewer' as any, params: { type: 'turism' } })}
```

---

## Step 20 — Button secondary+light visual fix ✓

Arquivo: `src/components/Button/index.tsx`

O `secondary` em `colorScheme="light"` hoje retorna fundo transparente com borda — presença visual insuficiente. Alterar para fundo escuro (`#222831`) com texto branco, espelhando o comportamento do `secondary` em `dark`.

**Alterar em `getVariantStyle`:**

```ts
case 'secondary':
  return colorScheme === 'dark'
    ? { backgroundColor: t.background, borderRadius: 100 }
    : { backgroundColor: theme.colors.hover, borderRadius: 100 }; // era: transparent + border
```

O `getTextColor` para `secondary` já retorna `t.foreground` — mas em `light`, `t.foreground` é `#222831` (escuro). Precisa forçar branco:

```ts
function getTextColor(variant: ButtonVariant, colorScheme: ColorScheme): string {
  if (variant === 'primary') {
    const t = colorScheme === 'dark' ? theme.darkTheme : theme.lightTheme;
    return t.background;
  }
  if (variant === 'secondary') return '#FFFFFF';
  const t = colorScheme === 'dark' ? theme.darkTheme : theme.lightTheme;
  return t.foreground;
}
```
