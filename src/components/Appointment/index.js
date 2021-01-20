import React from 'react';

import Header from "./Header"
import Empty from "./Empty"
import Show from "./Show"

import 'components/Appointment/styles.scss'

const interviewer = {
  id: 1,
  name: "Sylvia Palmer",
  avatar: "https://i.imgur.com/LpaY82x.png"
};

export default function Appointment(props) {
  
  return (
    <article className="appointment">
      <Header 
        time ={props.time}
      />
       {props.interview? <Show student={props.interview.student} interviewer={props.interview.interviewer} />: <Empty />}
      
    </article>
    
  )


}