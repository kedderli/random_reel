import { useEffect, useRef } from 'react';
import cn from 'classnames';
import { Option } from '../../types/types';
import styles from './Wheel.module.scss';
import { drawWheel } from '../../utils/drawWheel';
import { getRandomInt } from '../../utils/randomUtils';

interface IWheelProps {
  optionList: Option[];
  winner: number;
  onStartClick: () => void;
  spinning: boolean;
}

export default function Wheel({ optionList, winner, onStartClick, spinning }: IWheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeOptions = optionList.filter((option) => !option.disabled);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (ctx) {
      drawWheel(ctx, activeOptions);
    }
  }, [optionList]);

  useEffect(() => {
    if (spinning && winner && canvasRef.current) {
      const winnerIdx = activeOptions.findIndex((option) => option.id === winner);
      const oneOptionDeg = 360 / activeOptions.length;
      const prevPos = +canvasRef.current.style.transform.replace(/[^.\d]/g, '');
      const toFullTurn = 360 - (prevPos % 360);

      const newDeg = 360 * 5 + oneOptionDeg * winnerIdx + getRandomInt(3, oneOptionDeg) + prevPos + toFullTurn;

      canvasRef.current.style.transform = `rotate(${-newDeg}deg)`;
    }
  }, [winner, spinning]);

  return (
    <div className={cn(styles.wrapper, { [styles.active]: !spinning })} onClick={onStartClick}>
      <div className={styles.arrow} />
      <canvas ref={canvasRef} height={600} width={600} className={styles.canvas} />
    </div>
  );
}
