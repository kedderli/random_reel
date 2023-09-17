import { useEffect, useRef } from 'react';
import { Option } from '../../types/types';
import styles from './Reel.module.scss';
import { drawWheel } from '../../utils/drawWheel';
import { getRandomInt } from '../../utils/randomUtils';
import { CaretDownOutlined } from '@ant-design/icons';

interface IReelProps {
  optionList: Option[];
  winner: number;
  onStartClick: () => void;
}

export default function Reel({ optionList, winner, onStartClick }: IReelProps) {
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
    if (winner && canvasRef.current) {
      const winnerIdx = activeOptions.findIndex((option) => option.id === winner);
      const oneOptionDeg = 360 / activeOptions.length;
      const prevPos = +canvasRef.current.style.transform.replace(/[^.\d]/g, '');
      const toFullTurn = 360 - (prevPos % 360);

      const newDeg = 360 * 5 + oneOptionDeg * winnerIdx + getRandomInt(3, oneOptionDeg) + prevPos + toFullTurn;

      canvasRef.current.style.transform = `rotate(${-newDeg}deg)`;
    }
  }, [winner]);

  return (
    <div className={styles.wrapper} onClick={onStartClick}>
      <CaretDownOutlined className={styles.arrow} size={50} />
      <canvas ref={canvasRef} height={650} width={650} className={styles.canvas} />
    </div>
  );
}
