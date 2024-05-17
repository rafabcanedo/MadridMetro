import { ButtonIconProps, ButtonProps, ButtonTextProps } from "@/@types";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { colors } from "@/theme/colors";
import { fontFamily } from "@/theme/fontFamily";

function Button({ children, ...rest}: ButtonProps) {
 return (
  <TouchableOpacity
   style={styles.butonStyle}
   activeOpacity={0.7}
   {...rest}
   >
    {children}
  </TouchableOpacity>
 )
}

function ButtonText({ children }: ButtonTextProps) {
 return (
  <Text>
   {children}
  </Text>
 )
}

function ButtonIcon({ children }: ButtonIconProps) {
 return children
}

Button.Text = ButtonText
Button.Icon = ButtonIcon

export { Button }

const styles = StyleSheet.create({
 butonStyle: {
  backgroundColor: colors.primary,
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
  padding: 10,
  borderRadius: 30,
  },
 textStyle: {
  color: colors.white,
  fontFamily: fontFamily.medium,
  fontSize: 10,
  marginRight: 0.5,
  marginLeft: 0.5,
  }
})