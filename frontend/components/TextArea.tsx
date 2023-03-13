import React, { TextareaHTMLAttributes } from 'react'
import styles from '../styles/WriteBlog.module.css'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea: React.FC<TextareaProps> = ({ ...props }) => {
  return <textarea className={styles.TextArea} 
   {...props} required/>
}

export default Textarea
