/* s/o to Magic UI https://magicui.design/docs/components/ripple */
import React from 'react';

import { RippleCircle, RippleRoot } from './Ripple.styles';

export interface RippleConfig {
  mainCircleSize: number;
  mainCircleOpacity: number;
  numCircles: number;
  top: string;
}

const RIPPLE_CONFIG = {
  desktop: {
    mainCircleSize: 595,
    mainCircleOpacity: 0.24,
    numCircles: 6,
    top: '20%',
  },
  mobile: {
    mainCircleSize: 200,
    mainCircleOpacity: 0.24,
    numCircles: 6,
    top: '48.5%',
  },
};

export interface RippleProps {
  config?: RippleConfig;
  mobile?: boolean;
}

const Ripple = React.memo(function Ripple({ config, mobile = false }: RippleProps) {
  const { mainCircleSize, mainCircleOpacity, numCircles, top } = config || (mobile ? RIPPLE_CONFIG.mobile : RIPPLE_CONFIG.desktop);
  return (
    <RippleRoot className="Ripple" mobile={mobile}>
      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * 150; // px
        const opacity = mainCircleOpacity - i * 0.03;
        const animationDelay = `${i * 0.06}s`;

        return <RippleCircle className="RippleCircle" key={i} top={top} size={size} opacity={opacity} delay={animationDelay} />;
      })}
    </RippleRoot>
  );
});

export default Ripple;
