import React, { useState } from 'react';
import Input from './components/Input';
import { IntegerInput, FloatInput } from './components/NumberInputs';
import SearchInput from './components/SearchInput';

import styles from './App.module.css'


const App = () => {
  const [inputValue, onInputValueChange] = useState(null)
  const [integerValue, onIntegerChange] = useState(null)
  const [floatValue, onFloatChange] = useState(null)
  const [searchQuery, onSearchQueryChange] = useState(null)
  const [min, onMinChange] = useState(-100)
  const [max, onMaxChange] = useState(100)

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.row}>
          <IntegerInput
            placeholder='Min'
            value={min}
            onChange={onMinChange}
          />
        </div>
        <div className={styles.row}>
          <IntegerInput
            placeholder='Max'
            value={max}
            onChange={onMaxChange}
          />
        </div>
      </div>

      <div className={styles.values}>
        <pre><code>stringValue: {JSON.stringify(inputValue)}</code></pre>
        <pre><code>integerValue: {JSON.stringify(integerValue)}</code></pre>
        <pre><code>floatValue: {JSON.stringify(floatValue)}</code></pre>
        <pre><code>searchQuery: {JSON.stringify(searchQuery)}</code></pre>
      </div>

      <div className={styles.form}>
        <div className={styles.row}>
          <Input
            placeholder='String'
            value={inputValue}
            onChange={onInputValueChange}
          />
        </div>
        <div className={styles.row}>
          <IntegerInput
            placeholder='Integer'
            value={integerValue}
            onChange={onIntegerChange}
            min={min}
            max={max}
          />
        </div>
        <div className={styles.row}>
          <FloatInput
            placeholder='Float'
            value={floatValue}
            onChange={onFloatChange}
            fractionLength={2}
            min={min}
            max={max}
          />
        </div>
        <div className={styles.row}>
          <SearchInput
            placeholder='Search query'
            value={searchQuery}
            onChange={onSearchQueryChange}
          />
        </div>
      </div>
    </div>
  )
}

export default App;
