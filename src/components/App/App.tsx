import { useState } from 'react';

import styles from './App.module.scss';
import OptionsInput from '../OptionsInput/OptionsInput';
import Reel from '../Reel/Reel';
import { Option } from '../../types/types';
import { getRandomOptionid } from '../../utils/randomUtils';
import { defaultRandomnessСoefficient } from '../../constants/randomConstants';
import { getFromLocalStorage, saveToLocalStorage } from '../../utils/localStorageUtils';

function App() {
  const [optionList, setOptionList] = useState<Option[]>(getFromLocalStorage());
  const [winner, setWinner] = useState(0);
  const [spinning, setSpinning] = useState(false);

  const editOptions = (value: Option[]) => {
    saveToLocalStorage(value);
    setOptionList(value);
  };

  const onStartClick = () => {
    if (spinning) {
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
      <Reel optionList={optionList} winner={winner} onStartClick={onStartClick} />
      <OptionsInput
        optionList={optionList}
        setOptionList={editOptions}
        onStartClick={onStartClick}
        winner={winner}
        disabled={spinning}
      />
    </div>
  );
}

export default App;
