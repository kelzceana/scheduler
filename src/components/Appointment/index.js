import React from 'react';

import Header from "./Header"
import Empty from "./Empty"
import Show from "./Show"
import Form from "./Form"
import Status from "./Status"
import Confirm from "./Confirm"
import Error from "./Error"

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
  const EDIT = "EDIT";
  const DELETING = "DELETING";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
   

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
    props.bookInterview(props.id, interview)
    .then(()=> transition(SHOW))
    .catch(e => transition(ERROR_SAVE, true))
    
   // console.log(interview) ;
  }

  function cancel() {
    transition(DELETING)
    props.cancelInterview(props.id)
    .then(()=> transition(EMPTY))
    .catch(() => {
      transition(ERROR_DELETE, true)
    })
  }
 
  function confirmation() {
    transition(CONFIRM)
    
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
         onEdit={event => transition(EDIT)}
       /> 
       )}
      {mode === CREATE &&( <Form interviewers= {props.interviewers} onSave = {save} onCancel= {event=>back()}/>)}
      {mode === EDIT &&( <Form interviewer={props.interview.interviewer.id}  name={props.interview.student} interviewers= {props.interviewers} onCancel={() => transition(SHOW)} onSave={save}/>)}
      {mode === SAVING && <Status message= 'Saving'/>}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && <Confirm message= 'Are you sure you would like to delete?' onCancel={() => back()} onConfirm={()=>cancel()}/>}
      {mode === ERROR_DELETE && <Error message="Error deleting appointment" onClose={() => back()}/>}
      {mode === ERROR_SAVE && <Error message="Error saving appointment" onClose={() => back()}/>}
    </article>
    
  )
}

