import { useColor } from '@peersyst/react-components';

import { CardRoot } from './Card.styles';
import type { CardProps } from './Card.types';

function Card({ elevation = 0, color: colorProp = 'grey.300', square = false, ...rest }: CardProps): JSX.Element {
  const color = useColor(colorProp);

  return <CardRoot elevation={elevation} color={color!} square={square} {...rest} />;
}

export default Card;
