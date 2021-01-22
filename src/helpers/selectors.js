
export function getAppointmentsForDay(state, day) {
  const filteredAppointments = state.days.filter(d => d.name === day);
  let appointments = [];
  if (filteredAppointments.length){
    appointments = filteredAppointments[0].appointments.map(x => state.appointments[x]);
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
export function getInterviewersForDay(state, day) {
  //find day first

 const filteredAppointments = state.days.find(d => d.name === day);

 // access to interviers for that day
 let interviewers = [];
 if (!filteredAppointments){
 return interviewers 
 }
 interviewers = filteredAppointments.interviewers.map(x => state.interviewers[x]);
 return interviewers;
}

