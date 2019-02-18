/* eslint-disable prefer-const */
import isString from 'lodash/isString'
import isNaN from 'lodash/isNaN'
import isEmpty from 'lodash/isEmpty'

import {
  compose,
  withHandlers,
} from 'recompose'

import asNumberInput from '../common/asNumberInput'


type InProps = {
}

type OutProps = {
  value: string,
  onChange: (value: string) => void,
  onBlur: () => void,
}

const asIntegerInput: HOC<InProps, OutProps> = compose(
  withHandlers({
    formatValue: () => value => isEmpty(value) || !isString(value) ? `` : value,
    parseValue: () => (value: string): number => {
      const integer = parseInt(value, 10)

      if (isEmpty(value) || isNaN(integer)) {
        return null
      }

      return integer
    },
    cleanValue: () => (value: string): string => {
      if (isEmpty(value)) {
        return ``
      }

      const matchRes = value.match(/^-?(\d+)?/, ``)

      return matchRes ? matchRes[0] : ``
    },
  }),
  asNumberInput,
)

export default asIntegerInput
