import React from 'react'
import classNames from 'classnames/bind'
import styles from './FormRequest.module.scss'

const cx = classNames.bind(styles)

export default function FormRequest() {
  return (
    <div className={cx('formRequest')}>FormRequest</div>
  )
}
