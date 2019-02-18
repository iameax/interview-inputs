/* eslint-disable react/sort-comp,react/require-default-props */
import isNil from 'lodash/isNil'

import * as React from 'react'
import cn from 'classnames'

import style from './style.module.css'
import asInput from './hocs/asInput'


type InProps = {
  value: string,
  onChange: (e: Event) => void,
  postfix: React.Node,
  refProxy: () => void,
  readOnly: boolean,
  fluid: boolean,
  className?: string,
  placeholder?: string,
  mask?: string,
}

const Input = ({
  className,
  fluid,
  postfix,
  invalid,
  mask,
  refProxy,
  value,
  readOnly,
  placeholder,
  ...props
}: InProps) => {
  const containerClassNames = cn(style.container, {
    [style.fluid]: fluid,
    [style.hasPostfix]: !isNil(postfix),
  })

  return (
    <span className={containerClassNames}>
      <input
        ref={refProxy}
        value={value}
        readOnly={readOnly}
        placeholder={placeholder}
        className={cn(style.input, className, invalid && style.invalid)}
        {...props}
      />
      { postfix && <span className={style.postfix}>{postfix}</span> }
    </span>
  )
}


export default asInput(Input)
