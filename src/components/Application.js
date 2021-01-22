
import React, { useState, useEffect } from "react";
import axios from 'axios'

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "./Appointment/index"
import { getAppointmentsForDay } from "../helpers/selectors";
import {getInterviewersForDay} from "../helpers/selectors"
import {getInterview} from "../helpers/selectors"


//  const appointments = [
//      {
//        id: 1,
//        time: "12pm",
//      },
//      {
//        id: 2,
//        time: "1pm",
//        interview: {
//          student: "Lydia eMiller-Jones",
//          interviewer: {
//            id: 1,
//            name: "Colins Palmer",
//            avatar: "https:i.imgur.com/LpaY82x.png",
//          }
//        }
//      },
//      {
//        id: 3,
//        time: "2pm",
//      },
//      {
//        id: 4,
//        time: "3pm",
//        interview: {
//          student: "Olivia king",
//          interviewer: {
//            id: 3,
//            name: "henry Palmer",
//            avatar: "https:i.imgur.com/twYrpay.jpg"
//          }
//        }
//      },
//      {
//        id: "last",
//        time: "4pm",
//        interview: {
//          student: "Olivia kimaryng",
//          interviewer: {
//            id: 4,
//            name: "henry Palmer",
//            avatar: "https:i.imgur.com/twYrpay.jpg"
//          }
//        }
//      }
//    ];



export default function Application(props) {
 const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments:{},
    interviewers: {}

  })


  //useeffect to make the axios call
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      setState(prev => ( {
        ...prev, 
        days: all[0].data, 
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    })
  },[]);

  
  
  //FUNCTION bookInterview

  function bookInterview(id, interview) {
    //console.log(id,interview)
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
  
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const response = axios.put(`/api/appointments/${id}`, {"interview":interview}).then(() =>
      setState({
        ...state,
        appointments
      })
    
    )
    return response;
  }
 

  const setDay = day => setState({ ...state, day });
  const dailyAppointments =  getAppointmentsForDay(state, state.day);
  const schedule = dailyAppointments.map(appointment => {
      const dailyInterview = getInterview(state, appointment.interview);
     // console.log(dailyInterview)
      const interviewersArray = getInterviewersForDay(state, state.day); 
      return (
        <Appointment 
          key = {appointment.id} 
          interviewers={interviewersArray}
          id= {appointment.id}
          time={appointment.time}
          interview= {dailyInterview}
          bookInterview= {bookInterview}
          /> 
        )});

        
  
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
          {schedule}
          <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
