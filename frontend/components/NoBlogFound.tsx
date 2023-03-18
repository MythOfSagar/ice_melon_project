import React from 'react'

type NoBlogFoundProps = {category: string}; 

const NoBlogFound = ({category}:NoBlogFoundProps) => {
  return (
    <div>No Blog Found of {category} Category</div>
  )
}

export default NoBlogFound