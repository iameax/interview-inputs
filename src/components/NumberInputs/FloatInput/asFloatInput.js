/* eslint-disable prefer-const */
import isNil from 'lodash/isNil'
import isNaN from 'lodash/isNaN'
import isEmpty from 'lodash/isEmpty'
import repeat from 'lodash/repeat'
import isString from 'lodash/isString'

import {
  compose,
  withHandlers,
} from 'recompose'

import asNumberInput from '../asNumberInput'
import removeProps from '../../common/removeProps'
import type { HOC } from '../../common/types';


type InProps = {
  fractionLength?: number,
}

type OutProps = {
  value: string,
  onChange: (value: string) => void,
  onBlur: () => void,
}

const formatFractionDigits = (digits: string = ``, fractionLength: number) => {
  if (isNil(fractionLength) || fractionLength <= 0) {
    return digits
  }

  let formattedFraction = digits.substr(0, fractionLength)
  if (formattedFraction.length < fractionLength) {
    return formattedFraction + repeat(`0`, fractionLength - formattedFraction.length)
  }

  return formattedFraction
}

const asFloatInput: HOC<InProps, OutProps> = compose(
  withHandlers({
    formatValue: ({ fractionLength }) => (value: string): string => {
      if (isEmpty(value) || !isString(value)) {
        return ``
      }

      const [integerString, fractionString] = value.split(`.`, 2)
      const integer = Number(integerString) ? Number(integerString) : '';

      const formattedFraction = formatFractionDigits(fractionString, fractionLength)
      const numberString = isEmpty(formattedFraction) ? integer : `${integer}.${formattedFraction}`

      return numberString
    },
    parseValue: () => (value: string): number => {
      const floatValue = parseFloat(value)

      if (isEmpty(value) || isNaN(floatValue)) {
        return null
      }

      return floatValue
    },
    cleanValue: () => (value: string): string => {
      if (isEmpty(value)) {
        return ``
      }

      const matchRes = value.match(/^-?(0|([1-9]\d*))?(\.(\d+)?)?/, ``)

      return matchRes ? matchRes[0] : ``
    },
  }),
  asNumberInput,
  removeProps([`fractionLength`]),
)

export default asFloatInput
