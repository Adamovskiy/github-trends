'use client';

import styles from './FiltersPanel.module.scss';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {clsIf, clss} from '@/utils/classes';

const FilterButton = ({value, active, onClick}: {
  value: string | undefined,
  active: boolean,
  onClick: () => void
}) => {
  return <div className={clss(styles.filterButton, clsIf(active, styles.active))}
              onClick={onClick}>{value == undefined ? '<Not Set>' : value}</div>
}

export const FiltersPanel = ({availableLanguages, onEnabledLanguagesChange}: {
  availableLanguages: (string | undefined)[],
  onEnabledLanguagesChange: (value: string[]) => void
}) => {
  const allAvailableLanguages = useCallback((enabled: boolean) => {
    return availableLanguages.reduce((prev, curr) => {
      prev[curr] = enabled;
      return prev;
    }, {});
  }, [availableLanguages]);

  const [enabledLanguages, setEnabledLanguagesInnerState] = useState({});
  const setEnabledLanguages = useCallback((value) => {
    setEnabledLanguagesInnerState(value);
    onEnabledLanguagesChange(Object.keys(value).filter(lang => value[lang]));
  }, [onEnabledLanguagesChange]);

  useEffect(() => {
    setEnabledLanguages(allAvailableLanguages(true));
  }, [setEnabledLanguages, allAvailableLanguages]);

  const allEnabled = useMemo(() => Object.values(enabledLanguages).indexOf(false) === -1, [enabledLanguages]);

  return <div className={styles.panel}>
    <h2 className={styles.header}>Filters</h2>
    <div className={styles.filtersList}>
      <FilterButton value={'All'} active={allEnabled}
                    onClick={() => setEnabledLanguages(allAvailableLanguages(!allEnabled))}
      />
      {availableLanguages.map(lang => <FilterButton key={lang} value={lang} active={enabledLanguages[lang]}
                                                    onClick={() => setEnabledLanguages({
                                                      ...enabledLanguages,
                                                      [lang]: !enabledLanguages[lang],
                                                    })}
      />)}
    </div>
  </div>;
};
