import type { ComponentProps } from 'react';
import { Link } from 'expo-router';
import type { TextStyle } from 'react-native';

export type Variant = 'heading' | 'subheading' | 'body' | 'label' | 'caption';

export type TextProps = {
  variant?: Variant;
  style?: TextStyle;
  children: React.ReactNode;
};

export type Direction = 'up' | 'down' | 'left' | 'right';

export type HeaderProps = {
  title: string;
  direction: Direction;
};

export interface ExternalLinkProps
  extends Omit<ComponentProps<typeof Link>, 'href'> {
  href: string;
}

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'default' | 'wide';
export type ColorScheme = 'dark' | 'light';

export type ButtonProps = {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  colorScheme?: ColorScheme;
  onPress?: () => void;
  disabled?: boolean;
};

export type CardSize = 'sm' | 'md';

export type CardLineProps = {
  variant: 'line';
  size?: CardSize;
  lineId: string;
  lineNumber: number;
  lineColor: string;
  lineName: string;
  onPress: () => void;
};

export type CardStationProps = {
  variant: 'station';
  size?: CardSize;
  stationName: string;
  lineNumber: number;
  lineColor: string;
  lineName: string;
  isFavorited: boolean;
  onUnfavorite: () => void;
};

export type CardProps = CardLineProps | CardStationProps;

export type TextFieldMode = 'normal' | 'dropdown';

export type DropdownItem = {
  label: string;
  value: string;
};

export type TextFieldProps =
  | {
      mode?: 'normal';
      placeholder?: string;
      value: string;
      onChangeText: (text: string) => void;
      secureTextEntry?: boolean;
    }
  | {
      mode: 'dropdown';
      placeholder?: string;
      value: string;
      onSelect: (item: DropdownItem) => void;
      items: DropdownItem[];
    };
