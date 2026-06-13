import { Text as RNText, TextStyle } from 'react-native';
import { theme } from '@/theme';

type Variant = 'heading' | 'subheading' | 'body' | 'label' | 'caption';

type Props = {
  variant?: Variant;
  children: React.ReactNode;
};

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

export function Text({ variant = 'body', children }: Props) {
  return (
    <RNText style={[{ color: theme.colors.background }, variantStyles[variant]]}>
      {children}
    </RNText>
  );
}
