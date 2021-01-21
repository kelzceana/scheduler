
export function getAppointmentsForDay(state, dayName) {
  const appointmentforDay = [];
  let filteredDay;

  

  if (state.days.length > 0) {
    filteredDay = state.days.filter(day => day.name === dayName)
    if (filteredDay.length>0 && filteredDay[0].appointments ) {
      filteredDay[0].appointments.forEach(id => {
        appointmentforDay.push(state.appointment[id])
      });

    } 
    
  } 
  return appointmentforDay;
}

