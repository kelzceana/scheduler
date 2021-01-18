import React from "react";
import "components/Button.scss";



const classnames = require('classnames')

export default function Button(props) {
   let buttonClass = classnames("button", `button--${props.confirm?"confirm":"danger"}`);
   return <button 
            className={buttonClass} 
            disabled = {props.disabled? true: false} 
            onClick={props.onClick}
         >
            {props.children} 
         
         </button>;
   
}
