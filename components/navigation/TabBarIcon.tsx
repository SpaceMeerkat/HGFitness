// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import Ionicons from '@expo/vector-icons/Ionicons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';
import { type ColorValue } from 'react-native';

type TabBarIconProps = Omit<IconProps<ComponentProps<typeof Ionicons>['name']>, 'color'> & {
  // The tab bar passes a ColorValue; the icons only take strings (the tab bar's colours always are)
  color?: ColorValue;
};

export function TabBarIcon({ style, color, ...rest }: TabBarIconProps) {
  return <Ionicons size={28} style={[{ marginBottom: -3 }, style]} color={color as string | undefined} {...rest} />;
}
