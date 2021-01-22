export function getAppointmentsForDay(state, day) {
  const filteredAppointments = state.days.filter(d => d.name === day);

  let appointments = [];

  if (filteredAppointments.length){
    appointments = filteredAppointments[0].appointments.map(x => state.appointment[x]);
  }

  return appointments;
}




export function getInterview(state, interview) {
  if (interview === null) {
    return null;
  }
  const interviewObj = { 
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  }
  
  return interviewObj;
  
  
}

