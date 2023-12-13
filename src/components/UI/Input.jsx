import React from 'react'

import classes from './Input.module.css'

//this function is now an argumunt to forward our ref
const Input = React.forwardRef ((props, ref) => {
  return (
    <div className={classes.input}>
        <label htmlFor={props.input.id}>{props.label}</label>
        {/* 'spread operator' : Passing all the datas from props.input.id to the input tag with ...props.input all the key value pairs */}

        <input ref={ref}  {...props.input}  />
    </div>
  )
})

export default Input