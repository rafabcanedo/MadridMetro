import { Text as RNText, TextStyle } from 'react-native';
import { theme } from '@/theme';
import type { Variant, TextProps } from '@/@types';

const variantStyles: Record<Variant, TextStyle> = {
  heading: {
    fontFamily: theme.fontFamily.display.bold,
    fontSize: 32,
  },
  subheading: {
    fontFamily: theme.fontFamily.display.medium,
    fontSize: 20,
  },
  body: {
    fontFamily: theme.fontFamily.sans.regular,
    fontSize: 16,
  },
  label: {
    fontFamily: theme.fontFamily.sans.medium,
    fontSize: 14,
  },
  caption: {
    fontFamily: theme.fontFamily.sans.regular,
    fontSize: 12,
  },
};

export function Text({ variant = 'body', style, children }: TextProps) {
  return (
    <RNText style={[{ color: theme.colors.background }, variantStyles[variant], style]}>
      {children}
    </RNText>
  );
}
