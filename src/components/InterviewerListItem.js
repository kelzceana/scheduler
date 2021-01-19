import React from'react';
import 'components/InterviewerListItem.scss'

const classNames = require('classnames')

export default function InterviewerListItem(props) {
  let interviewerClass;
  props.selected? interviewerClass = classNames(`interviewers__item--selected`) : interviewerClass = classNames(`interviewers__item`)
  return (
    <li className={interviewerClass} onClick={()=>{props.setInterviewer(props.name)}}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.name}
    </li>
  )
}