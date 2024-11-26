import Svg, { G, Path } from 'react-native-svg';

export default function SvgComponent() {
  return (
    <Svg
      fill="none"
      style={{
        position: 'absolute'
      }}
    >
      <Path
        fill="#D9D9D9"
        d="M250 0A249.994 249.994 0 0 1 95.67 230.97 249.994 249.994 0 0 1 0 250V0h250Z"
      />
    </Svg>
  );
}