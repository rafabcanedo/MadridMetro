import { LinkProps } from "expo-router/build/link/Link"
import { ElementType, ReactNode } from "react"
import { TouchableOpacityProps } from "react-native"


export type ButtonProps = TouchableOpacityProps & {
    children: ReactNode
}

export interface ButtonTextProps {
    children: ReactNode
}
   
export interface ButtonIconProps {
    children: ReactNode
}

export type ButtonLinkProps = LinkProps & {
 icon?: ElementType
}

export interface PropsInput {
 children: ReactNode
}

export type FilterProps = {
 filter: string
 selected: boolean
}

export type IFilterActivedProps = {
  filters: string[]
  filter: string
  onChange: (value: string) => void
}

export interface TitleProps {
 title: string
}