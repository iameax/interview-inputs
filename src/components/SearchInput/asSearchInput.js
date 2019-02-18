import { withProps } from 'recompose'
import React from 'react'

import { FiSearch } from 'react-icons/fi'
import styles from './style.module.css'


export default withProps(({ value }) => ({
  postfix: !value && (
    <FiSearch className={styles.searchIcon} />
  ),
}))
