import React from'react';
import 'components/InterviewerListItem.scss'

const classNames = require('classnames')

export default function InterviewerListItem(props) {
  let interviewerClass;
  props.selected? interviewerClass = classNames(`interviewers__item--selected`) : interviewerClass = classNames(`interviewers__item`)
  return (
    <li data-testid="interviewer-id" className={interviewerClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  )
}