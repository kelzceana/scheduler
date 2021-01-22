import React from 'react';

import Header from "./Header"
import Empty from "./Empty"
import Show from "./Show"
import Form from "./Form"
import {useVisualMode} from "../../hooks/useVisualMode"


import 'components/Appointment/styles.scss'

  const interviewer = {
    id: 1,
    name: "Sylvia Palmer",
    avatar: "https://i.imgur.com/LpaY82x.png"
  };

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE"


export default function Appointment(props) {
  
  const {mode,transition, back} = useVisualMode(
      props.interview? SHOW : EMPTY

  )

  return (
    <article className="appointment">
      <Header 
        time ={props.time}
      />
       {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
       {mode === SHOW && (
         <Show
         student={props.interview.student}
         interviewer={props.interview.interviewer}
       />
       )}
       {mode === CREATE &&( <Form 
       name=""
       interviewers= {props.interviewers}
       value = {""}
       onSave = {event=>transition(EMPTY)}
       onCancel= {event=>transition(EMPTY)}
       />)}
    </article>
    
  )


}

