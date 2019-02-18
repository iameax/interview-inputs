/* eslint-disable react/no-did-update-set-state,react/sort-comp */
import isNil from 'lodash/isNil'
import omit from 'lodash/omit'

import React, { useCallback, useState, useEffect } from 'react'
import type { HOC } from '../common/types';


type NumberValue = number | null

type InProps = {
  value: NumberValue,
  onChange: (value: NumberValue) => void,
  // Форматирование числовой строки
  formatValue: (cleanValue: string) => string,
  // Приведение строки к числу
  parseValue: (cleanValue: string) => NumberValue,
  // Очистка строки от левых символов
  cleanValue: (value: string) => string,
}

type OutProps = {
  value: string,
  onChange: (value: string) => void,
  onBlur: () => void,
  onFocus: () => void,
}

const toStringValue = (value: string | NumberValue) => isNil(value) ? `` : `${value}`

const hasDigit = (value: string) => value && value.search(/\d/) !== -1

const getValidValue = (value, min, max) => {
  if (isNil(value)) {
    return value
  }

  if (!isNil(min) && value < min) {
    return min;
  }

  if (!isNil(max) && value > max) {
    return max;
  }

  return value
}

const asNumberInput: HOC<InProps, OutProps> = (Input) => {
  const AsNumberInput = (props) => {
    const {
      min,
      max,
      value,
      onChange,
      onFocus,
      onBlur,
    } = props

    const [inputValue, setInputValue] = useState(props.formatValue(toStringValue(props.value)))

    const toNumberValue = (value: string) => {
      const cleanValue = props.cleanValue(value)

      if (!hasDigit(cleanValue)) {
        return null
      }

      const formattedValue = props.formatValue(cleanValue)
      const numberValue = props.parseValue(formattedValue)

      return numberValue
    }

    useEffect(
      () => {
        // Синхронизация значения input'а и value из пропсов.
        const numberValue = toNumberValue(inputValue)

        if (value !== numberValue) {
          setInputValue(value)
        }
      },
      [value],
    )

    const changeHandler = useCallback(
      (inputValue: string) => {
        const cleanStringValue = props.cleanValue(inputValue)
        const numberValue = toNumberValue(cleanStringValue)
        const validNumber = getValidValue(numberValue, min, max)
        const isValueChanged = (isNil(value) && !isNil(validNumber)) || (value !== validNumber)

        if (isValueChanged) {
          onChange(validNumber)
        }

        if (numberValue !== validNumber) {
          setInputValue(toStringValue(validNumber))
        } else {
          setInputValue(cleanStringValue)
        }
      },
      [value, min, max],
    )

    const focusHandler = useCallback(
      (e) => {
        setInputValue(toStringValue(value))

        if (onFocus) {
          onFocus(e)
        }
      },
      [value],
    )

    const blurHandler = useCallback(
      (e) => {
        const formattedValue = props.formatValue(inputValue)
        setInputValue(formattedValue)

        if (onBlur) {
          onBlur(e)
        }
      },
      [inputValue],
    )

    return (
      <Input
        {...omit(props, [
          `formatValue`,
          `parseValue`,
          `cleanValue`,
        ])}
        onChange={changeHandler}
        onBlur={blurHandler}
        onFocus={focusHandler}
        value={inputValue}
      />
    )
  }

  return AsNumberInput
}

export default asNumberInput
