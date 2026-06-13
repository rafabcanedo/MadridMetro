import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import { Text } from '@/components/Text';
import { theme } from '@/theme';
import type { ButtonProps } from '@/@types';

export function Button({ label, variant = 'primary', size = 'default', onPress, disabled }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        styles[size],
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <Text variant="label" style={{ color: variant === 'primary' ? theme.colors.shadow : theme.colors.background }}>
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
  primary: {
    backgroundColor: theme.colors.background,
    borderRadius: 100,
  } as ViewStyle,
  secondary: {
    backgroundColor: theme.colors.primary,
    borderRadius: 100,
  } as ViewStyle,
  ghost: {
    backgroundColor: 'transparent',
    borderRadius: 100,
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
