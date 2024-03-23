import { Input , Button } from 'antd';
import { DeleteOutlined, PauseCircleOutlined, PlayCircleOutlined, AppstoreAddOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Option } from '../../types/types';
import styles from './OptionsInput.module.scss';
import { defaultRandomnessСoefficient } from '../../constants/randomConstants';
import { createShareLink } from '../../utils/localStorageUtils';

interface IOptionsInputProps {
  optionList: Option[];
  setOptionList: (options: Option[]) => void;
  onStartClick: () => void;
  disabled: boolean;
  winner: number;
}

export default function OptionsInput({ optionList, setOptionList, onStartClick, disabled }: IOptionsInputProps) {
  const [editingItemIdx, setEditingItemIdx] = useState(-1);
  const [editingItemValue, setEditingItemValue] = useState('');
  const [newOptionValue, setNewOptionValue] = useState('');

  const onDisableClick = (idx: number) => {
    setOptionList([
      ...optionList.slice(0, idx),
      { ...optionList[idx], disabled: !optionList[idx].disabled },
      ...optionList.slice(idx + 1),
    ]);
  };

  const onDeleteClick = (idx: number) => {
    setOptionList([...optionList.slice(0, idx), ...optionList.slice(idx + 1)]);
  };

  const onStartEdit = (idx: number) => {
    setEditingItemValue(optionList[idx].value);
    setEditingItemIdx(idx);
  };

  const onEndEdit = (idx: number, keepFocusing?: boolean) => {
    if (editingItemValue) {
      setOptionList([
        ...optionList.slice(0, idx),
        { ...optionList[idx], value: editingItemValue },
        ...optionList.slice(idx + 1),
      ]);
    }
    if (!keepFocusing) {
      setEditingItemIdx(-1);
    }
  };

  const onClickCreateNewOption = () => {
    if (newOptionValue) {
      setOptionList([
        ...optionList,
        {
          value: newOptionValue,
          disabled: false,
          randomnessСoefficient: defaultRandomnessСoefficient,
          id: new Date().getTime(),
        },
      ]);
    }

    setNewOptionValue('');
  };

  const onResetClick = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Вы уверены что хотите сбросить все шансы к начальным значениям?')) {
      setOptionList(optionList.map((option) => ({ ...option, randomnessСoefficient: defaultRandomnessСoefficient })));
    }
  };

  const onShareClick = () => {
    const url = createShareLink();

    navigator.clipboard.writeText(url)
      .then(() => {
        alert(`Ссылка скопирована в буфер обмена. \n\n ${url}`);
      })
      .catch(err => {
        console.log('Something went wrong', err);
      });
  }

  return (
    <div className={styles.block}>
      <ul className={styles.list}>
        {optionList.map((option, idx) => (
          <li key={option.id} className={styles.item}>
            <Input
              value={editingItemIdx !== idx ? option.value : editingItemValue}
              onChange={(evt) => setEditingItemValue(evt.target.value)}
              onFocus={() => onStartEdit(idx)}
              onBlur={() => onEndEdit(idx)}
              onKeyDown={(evt) => {
                if (evt.code === 'Enter') {
                  onEndEdit(idx, true);
                }
              }}
              disabled={disabled}
            />
            <Button onClick={() => onDisableClick(idx)} disabled={disabled}>
              {option.disabled ? <PlayCircleOutlined /> : <PauseCircleOutlined />}
            </Button>
            <Button onClick={() => onDeleteClick(idx)} disabled={disabled}>
              <DeleteOutlined />
            </Button>
          </li>
        ))}
      </ul>
      <div className={styles.newItem}>
        <Input
          value={newOptionValue}
          onChange={(evt) => setNewOptionValue(evt.target.value)}
          onKeyDown={(evt) => {
            if (evt.code === 'Enter') {
              onClickCreateNewOption();
            }
          }}
          disabled={disabled}
          placeholder="Новый участник"
        />
        <Button onClick={onClickCreateNewOption} disabled={disabled}>
          <AppstoreAddOutlined />
        </Button>
      </div>

      <div className={styles.buttonsWrapper}>
        <Button onClick={onStartClick} type="primary" disabled={disabled}>
          Крутить
        </Button>
        <Button onClick={onResetClick} disabled={disabled}>
          Сбросить шансы
        </Button>
      </div>
      <div className={styles.shareWrapper}>
        <Button onClick={onShareClick} disabled={disabled}>
          Поделиться списком
        </Button>
      </div>
    </div>
  );
}
