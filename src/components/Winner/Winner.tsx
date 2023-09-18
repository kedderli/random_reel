import styles from './Winner.module.scss';
import cn from 'classnames';
import { getRandomEmoji } from '../../utils/getRandomEmoji';
import React from 'react';

interface IWinnerProps {
  winner?: string;
}

function Winner({ winner }: IWinnerProps) {
  return (
    <div className={cn(styles.block, { [styles.smallFont]: (winner?.length || 0) > 10 })}>
      {winner && (
        <>{`${getRandomEmoji()}${getRandomEmoji()}${getRandomEmoji()} ${winner} ${getRandomEmoji()}${getRandomEmoji()}${getRandomEmoji()}`}</>
      )}
    </div>
  );
}

export default React.memo(Winner);
