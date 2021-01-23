import React from 'react';

import Header from "./Header"
import Empty from "./Empty"
import Show from "./Show"
import Form from "./Form"
import Status from "./Status"
import Confirm from "./Confirm"

import {useVisualMode} from "../../hooks/useVisualMode"

import 'components/Appointment/styles.scss'

  const interviewer = {
    id: 1,
    name: "Sylvia Palmer",
    avatar: "https://i.imgur.com/LpaY82x.png"
  };

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT"
   

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

  function cancel() {
    props.cancelInterview(props.id).then((res)=> transition(EMPTY) )
  }
 
  function confirmation() {
    transition(CONFIRM)
  }

  function edit() {
    transition(EDIT)
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
         onDelete={event=> confirmation()}
         onEdit={event => edit()}
       /> 
       )}
      {mode === CREATE &&( <Form interviewers= {props.interviewers} onSave = {save} onCancel= {event=>transition(EMPTY)}/>)}
      {mode === EDIT &&( <Form interviewer={props.interview.interviewer.id}  name={props.interview.student} interviewers= {props.interviewers} onCancel={() => transition(SHOW)} onSave={save}/>)}
      {mode === SAVING && <Status message= 'Saving'/>}
      {mode === CONFIRM && <Confirm message= 'Are you sure you would like to delete?' onCancel={() => back()} onConfirm={()=>cancel()}/>}
    </article>
    
  )
}

