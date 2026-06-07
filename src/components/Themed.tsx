import { theme } from '@/theme';
import { Text as DefaultText, View as DefaultView } from 'react-native';

export type TextProps = DefaultText['props'];
export type ViewProps = DefaultView['props'];

export function Text({ style, ...otherProps }: TextProps) {
  return (
    <DefaultText
      style={[{ color: theme.colors.primary, fontFamily: theme.fontFamily.regular }, style]}
      {...otherProps}
    />
  );
}

export function View({ style, ...otherProps }: ViewProps) {
  return (
    <DefaultView
      style={[{ backgroundColor: theme.colors.background }, style]}
      {...otherProps}
    />
  );
}
