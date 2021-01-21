
import React, { useState, useEffect } from "react";
import axios from 'axios'

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "./Appointment/index"
import { getAppointmentsForDay } from "../helpers/selectors";



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
    appointment:{}
  })


  //useeffect to make the axios call
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments")
    ]).then((all) => {
      setState(prev => ( {
        ...prev, 
        days: all[0].data, 
        appointment: all[1].data 
      }));
    })
  },[]);

  
  

  const setDay = day => setState({ ...state, day });
  const dailyAppointments =  getAppointmentsForDay(state, state.day)
  



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
         
          {dailyAppointments.map(appointment => 
          <Appointment key = {appointment.id} {...appointment}/> 
          )}
          <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
