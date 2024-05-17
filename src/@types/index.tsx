import { ReactNode } from "react"
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