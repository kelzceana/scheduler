import { useState, useEffect } from "react";
import axios from 'axios'

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments:{},
    interviewers: {}
  });

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


  function cancelInterview (id) {
    const nullAppointment = {
      ...state.appointments[id],
      interview:null
    }

    const appointments = {
      ...state.appointments,
      [id]: nullAppointment
    };

    const response = axios.delete(`/api/appointments/${id}`).then(() =>
    setState({
      ...state,
      appointments
    })
  
    )
    return response;
  }

  const setDay = day => setState({ ...state, day });

  return { state, setDay, bookInterview, cancelInterview }

}
