import React from 'react'
import '../'

function ErrorMsg(props){
    return(
        <div className="errors">
            {props.children}
        </div>
    )
}

export default ErrorMsg