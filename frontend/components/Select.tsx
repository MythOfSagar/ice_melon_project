import React, { SelectHTMLAttributes } from 'react'
import styles from '../styles/WriteBlog.module.css'


interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string }[]
}

const Select: React.FC<SelectProps> = ({ options, ...props }) => {
  return (
    <select
    className={styles.Select}
     {...props}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.value}
        </option>
      ))}
    </select>
  )
}

export default Select
