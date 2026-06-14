import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { Text } from '@/components/Text';
import { theme } from '@/theme';
import type { DropdownItem, TextFieldProps } from '@/@types';

export function TextField(props: TextFieldProps) {
  const [open, setOpen] = useState(false);

  if (props.mode === 'dropdown') {
    const selected = props.items.find(i => i.value === props.value);

    return (
      <View>
        <Pressable style={styles.input} onPress={() => setOpen(prev => !prev)}>
          <Text variant="body" style={{ color: selected ? theme.colors.background : theme.colors.subtitle }}>
            {selected ? selected.label : (props.placeholder ?? '')}
          </Text>
        </Pressable>
        {open && (
          <View style={styles.dropdown}>
            {props.items.map((item: DropdownItem) => (
              <Pressable
                key={item.value}
                style={styles.dropdownItem}
                onPress={() => {
                  props.onSelect(item);
                  setOpen(false);
                }}
              >
                <Text variant="body">{item.label}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>
    );
  }

  return (
    <TextInput
      style={styles.input}
      placeholder={props.placeholder}
      placeholderTextColor={theme.colors.subtitle}
      value={props.value}
      onChangeText={props.onChangeText}
      secureTextEntry={props.secureTextEntry}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 56,
    alignSelf: 'stretch',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.hover,
    paddingHorizontal: 16,
    justifyContent: 'center',
    color: theme.colors.background,
  },
  dropdown: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.hover,
    marginTop: 4,
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.hover,
  },
});
