import React from 'react'
import { compose, defaultProps } from 'recompose'

import type { HOC } from '@infotech/reference-ui-common/src/common/types'
import manageClearable from './manageClearable'
import manageFocus from './manageFocus'
import manageValue from './manageValue'


type InProps = {
  value?: string,
  // оригинальный html обработчик onChange
  handleChange: (e: Event) => void,
  onChange: (value: string) => void,
  // Элемент, который нарисуется в конце инпута
  postfix?: React.Node,
  readOnly?: boolean,
  // Возможность очистить значение через крестик
  clearable?: boolean,
  fluid?: boolean,
  className?: string,
}

type OutProps = {
  value: string,
  onChange: (e: Event) => void,
  refProxy: () => void,
  readOnly: boolean,
  fluid: boolean,
  postfix?: React.Node,
  className?: string,
}

const asInput: HOC<InProps, OutProps> = compose(
  defaultProps({
    readOnly: false,
    fluid: true,
    value: ``,
    onChange: Function.prototype,
  }),
  manageFocus,
  manageClearable,
  manageValue,
)

export default asInput
