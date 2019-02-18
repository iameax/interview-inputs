/* eslint-disable react/sort-comp */
import isNil from 'lodash/isNil'
import isEmpty from 'lodash/isEmpty'

import { branch } from 'recompose'
import React, { Fragment } from 'react'
import cn from 'classnames'
import type { HOC } from '../../common/types';

import style from '../style.module.css'
import { FiX } from 'react-icons/fi';


type AsClearableInProps = {
  value?: string,
  onChange: (value: string) => void,
  postfix: React.Node,
  onClear?: () => void,
  clearable?: boolean,
  readOnly?: boolean,
  className?: string,
}

type AsClearableOutProps = {
  postfix: React.Node,
  className: string,
}

const ClearIcon = props => <FiX className={style.clearIcon} {...props} />

const ClearPostfix = ({
  value,
  handleClick,
}) => {
  const isClearable = !isEmpty(value)

  return isClearable ? <ClearIcon onClick={handleClick} /> : ``
}

const asClearable: HOC<AsClearableInProps, AsClearableOutProps> = (Input) => {
  const AsClearable = ({
    clearable,
    className,
    ...props
  }) => {
    const {
      postfix,
      value,
      onChange,
    } = props

    const composedPostfix = (
      <Fragment>
        <ClearPostfix value={value} handleClick={() => onChange('')} />
        {postfix}
      </Fragment>
    )

    return (
      <Input
        {...props}
        className={cn(className, clearable && style.clearable)}
        postfix={composedPostfix}
      />
    )
  }

  return AsClearable
}

const manageClearable: HOC<{ clerable: boolean, readOnly: boolean }> = branch(
  ({ clearable, readOnly }) => !isNil(clearable) ? clearable : !readOnly,
  asClearable,
)

export default manageClearable
