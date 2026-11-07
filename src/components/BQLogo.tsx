import { Image, ImageStyle, StyleProp } from 'react-native';

interface Props {
  style?: StyleProp<ImageStyle>;
  size?: number;
}

export default function BQLogo({ style, size = 40 }: Props) {
  return (
    <Image
      source={require('../../assets/images/logo-bq.png')}
      style={[{ width: size, height: size, marginBottom: 10 }, style]}
      resizeMode="contain"
    />
  );
}