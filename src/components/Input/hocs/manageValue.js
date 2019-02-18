import toString from 'lodash/toString'
import isNil from 'lodash/isNil'
import { withHandlers, withProps, compose } from 'recompose'

import type { HOC } from '@infotech/reference-ui-common/src/common/types'


type InProps = {
  value?: string,
  handleChange: (e: Event) => void,
  onChange: (value: string) => void,
};

type OutProps = {
  value: string,
  onChange: (e: Event) => void,
};

const manageValue: HOC<InProps, OutProps> = compose(
  withHandlers({
    onChange: ({ onChange, handleChange }) => (e) => {
      if (handleChange) {
        handleChange(e)
      }

      return onChange(e.target.value)
    },
  }),
  withProps(({
    value,
  }) => ({
    value: isNil(value) ? `` : toString(value),
  })),
)

export default manageValue
