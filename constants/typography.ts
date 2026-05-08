import { TextStyle } from 'react-native';

export const typography = {
  displayLg:  { fontSize: 22, fontWeight: '700' as const } satisfies TextStyle,
  displayMd:  { fontSize: 18, fontWeight: '600' as const } satisfies TextStyle,
  bodyMd:     { fontSize: 14, fontWeight: '400' as const } satisfies TextStyle,
  bodySm:     { fontSize: 13, fontWeight: '400' as const } satisfies TextStyle,
  labelSm:    { fontSize: 11, fontWeight: '500' as const, letterSpacing: 0.8, textTransform: 'uppercase' as const } satisfies TextStyle,
};
