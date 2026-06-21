import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import { Text } from '@/components/Text';
import { theme } from '@/theme';
import type { ButtonProps, ButtonVariant, ColorScheme } from '@/@types';

function getVariantStyle(variant: ButtonVariant, colorScheme: ColorScheme): ViewStyle {
  const t = colorScheme === 'dark' ? theme.darkTheme : theme.lightTheme;

  switch (variant) {
    case 'primary':
      return { backgroundColor: t.foreground, borderRadius: 100 };
    case 'secondary':
      return colorScheme === 'dark'
        ? { backgroundColor: t.background, borderRadius: 100 }
        : { backgroundColor: theme.colors.hover, borderRadius: 100 };
    case 'ghost':
      return { backgroundColor: 'transparent', borderRadius: 100 };
  }
}

function getTextColor(variant: ButtonVariant, colorScheme: ColorScheme): string {
  if (variant === 'primary') {
    const t = colorScheme === 'dark' ? theme.darkTheme : theme.lightTheme;
    return t.background;
  }
  if (variant === 'secondary') return '#FFFFFF';
  const t = colorScheme === 'dark' ? theme.darkTheme : theme.lightTheme;
  return t.foreground;
}

export function Button({ label, variant = 'primary', size = 'default', colorScheme = 'dark', onPress, disabled }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        getVariantStyle(variant, colorScheme),
        styles[size],
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <Text variant="label" style={{ color: getTextColor(variant, colorScheme) }}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  default: {} as ViewStyle,
  wide: {
    alignSelf: 'stretch',
    borderRadius: 12,
  } as ViewStyle,
  pressed: {
    opacity: 0.7,
  } as ViewStyle,
  disabled: {
    opacity: 0.4,
  } as ViewStyle,
});
