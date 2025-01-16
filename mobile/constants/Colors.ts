/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#1E40AF'; // blue-800
const tintColorDark = '#1E3A8A'; // Slightly darker shade of blue-800 for dark mode

export const Colors = {
  light: {
    text: '#f5f5f5',
    background: '#F3F4F6', // gray-100
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#9CA3AF', // gray-400
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#6B7280', // gray-500
    tabIconSelected: tintColorDark,
  },
};
