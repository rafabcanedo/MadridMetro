import type { ComponentProps } from 'react';
import { Link } from 'expo-router';

export type Variant = 'heading' | 'subheading' | 'body' | 'label' | 'caption';

export type TextProps = {
  variant?: Variant;
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
