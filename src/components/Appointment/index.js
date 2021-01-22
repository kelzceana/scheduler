import React from 'react';

import Header from "./Header"
import Empty from "./Empty"
import Show from "./Show"
import Form from "./Form"
import Status from "./Status"

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
  const SAVING = "SAVING"
   

export default function Appointment(props) {
  
  const {mode,transition, back} = useVisualMode(
      props.interview? SHOW : EMPTY

  )

  //FUNCTION save

  function save (name, interviewer) {
    transition(SAVING)
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview).then(()=> transition(SHOW))
    
   // console.log(interview) ;
  }

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
       interviewers= {props.interviewers}
       onSave = {save}
       onCancel= {event=>transition(EMPTY)}
       />)}
      {mode === SAVING && <Status message= 'Saving'/>}
    </article>
    
  )


}

