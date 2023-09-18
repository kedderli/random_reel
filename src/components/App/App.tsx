import { useState } from 'react';

import styles from './App.module.scss';
import OptionsInput from '../OptionsInput/OptionsInput';
import Wheel from '../Wheel/Wheel';
import { Option } from '../../types/types';
import { getRandomOptionid } from '../../utils/randomUtils';
import { defaultRandomnessСoefficient } from '../../constants/randomConstants';
import { getFromLocalStorage, saveToLocalStorage } from '../../utils/localStorageUtils';
import Winner from '../Winner/Winner';

function App() {
  const [optionList, setOptionList] = useState<Option[]>(getFromLocalStorage());
  const [winner, setWinner] = useState(0);
  const [spinning, setSpinning] = useState(false);

  const winnerValue = optionList.find((option) => option.id === winner)?.value;

  const editOptions = (value: Option[]) => {
    saveToLocalStorage(value);
    setOptionList(value);
  };

  const onStartClick = () => {
    const activeOptions = optionList.filter((option) => !option.disabled);

    if (spinning || activeOptions.length < 2) {
      return;
    }

    const newWinner = getRandomOptionid(optionList);
    setWinner(newWinner);
    setSpinning(true);

    setTimeout(() => {
      setSpinning(false);
    }, 8300);

    editOptions(
      optionList.map((option) => {
        if (option.disabled) {
          return option;
        }
        return {
          ...option,
          randomnessСoefficient:
            newWinner === option.id
              ? defaultRandomnessСoefficient
              : option.randomnessСoefficient * defaultRandomnessСoefficient,
        };
      }),
    );
  };

  return (
    <div className={styles.wrapper}>
      <Wheel optionList={optionList} winner={winner} onStartClick={onStartClick} spinning={spinning} />
      <div className={styles.sidePannel}>
        <Winner winner={spinning ? undefined : winnerValue} />
        <OptionsInput
          optionList={optionList}
          setOptionList={editOptions}
          onStartClick={onStartClick}
          winner={winner}
          disabled={spinning}
        />
      </div>
    </div>
  );
}

export default App;
