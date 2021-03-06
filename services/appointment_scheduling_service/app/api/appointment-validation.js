const moment = require('moment');
/**
 * Tests to see if two appointments are exactly the same.
 * @param {*} firstAppointment The first appointment object.
 * @param {*} secondAppointment The second appointment object.
 */
const isSame = (firstAppointment, secondAppointment) => {
  // Tests if the two initiators are the same for both appointments.
  const sameInitiator = firstAppointment.initiator === secondAppointment.initiator;
  const sameAppointee = firstAppointment.appointee === secondAppointment.appointee;
  const sameTime = moment(firstAppointment.startTime).isSame(secondAppointment.startTime);

  return sameAppointee && sameInitiator && sameTime;
}
/**
 * Tests whether the date and times of two appointments overlap.
 * @param {*} firstAppointment The first appointment object.
 * @param {*} secondAppointment The second appointment object.
 * @return {*} True if the two appointments' dates and times 
 * do overlap, false if they don't.
 */
const timesConflict = (firstAppointment, secondAppointment) => {
  // Construct moment objects for the existing appointment's times.
  const firstStartTime = moment(firstAppointment.startTime);
  const firstEndTime = moment(firstAppointment.endTime);

  // Construct moment objects for the new appointment's times.
  const secondStartTime = moment(secondAppointment.startTime);
  const secondEndTime = moment(secondAppointment.endTime);
  
  // The tests - if any are true, then the appointments overlap (conflict).

  // The end time of the new appointment is between an existing appointment's start and end time.
  const firstTest = (firstStartTime).isBefore(secondEndTime) && (firstEndTime).isAfter(secondEndTime);
  // The start of the new appointment is between an existing appointment's start and end time.
  const secondTest = (firstStartTime).isBefore(secondStartTime) && (firstEndTime).isAfter(secondStartTime);
  // The new appointment starts at the same time an existing one does.
  const thirdTest = (firstStartTime).isSame(secondStartTime);
  // The new appointment ends at the same time an existing one does.
  const fourthTest = (firstEndTime).isSame(secondEndTime);

  return firstTest || secondTest || thirdTest || fourthTest;
};


/**
 * Validates if a newly created appointment (the one passed in) does not
 * conflict with any of the appointments that already exist in the database
 * (the appointment list).
 * @param {*} appointment The newly created appointment.
 * @param {*} appointmentList The list of appointments that already exist in the database.
 * @return {*} True if the new appointment doesn't conflict with any of the existing
 * appointments, false otherwise.
 */
const noConflicts_Create = (appointment, appointmentList) => {
  let valid = true;
  for(let i in appointmentList) {
    // Check if overlapping appointment times.
    if(timesConflict(appointmentList[i], appointment)) {
      // Invalid time.
      valid = false;
      break;
    }
  }
  return valid;
};

/**
 * Returns true if the appointment doesn't conflict with any
 * existing appointments.
 * @param {*} appointments The original and modified appointments.
 * @param {*} appointmentList The list of all the appointments this user has.
 */
const noConflicts_Modify = (appointments, appointmentList) => {
  let valid = true;

  // The modified appointment.
  const newAppointment = appointments.modified;

  // The original appointment.
  const original = appointments.original;

  // Goes through list of existing appointments and tests if the modified appointment conflicts with an existing one.
  for(let i in appointmentList) {
    // Tests if this appointment is the same as the original appointment.
    const match = isSame(appointmentList[i], original);

    // Only checks for conflicts if the appointment is not the original appointment.
    if(!match) {
      // Check if overlapping appointment times.
      if(timesConflict(appointmentList[i], newAppointment)) {
        // Invalid time.
        valid = false;
        break;
      }
    } 
  }
  return valid;
};

/**
 * Validates the appointment doesn't conflict with any other appointments and
 * is therefore a valid appointment.
 * @param {*} repo The appointment repository.
 * @param {*} appointment The appointment to be checked.
 * @param {*} initiator The initiator of the appointments.
 * @param {*} appointee The person this initiator is requesting an appointment with.
 * @param {*} noTimeConflicts The function used to check for time conflicts.
 */
const validate = (repo, appointment, initiator, appointee, noTimeConflicts) => {
  return new Promise((fulfill, reject) => {
    // Gets all initiator's appointments. 
    repo.GetAppointment(initiator).then(initiatorResult => {
      // Validates no conflicting appointment times for initiator.
      if(initiatorResult === null || noTimeConflicts(appointment, initiatorResult.appointments)) {
        // Gets all appointee's appointments.
        repo.GetAppointment(appointee).then(appointeeResult => {
          // Validates no conflicting appointment times for appointee.
          if(appointeeResult === null || noTimeConflicts(appointment, appointeeResult.appointments)) {
            // No conflicting times.
            fulfill({success: true, reason: ""});
          } else {
            // Conflicting appointments with the appointee.
            console.log("Error appointment time unavailable for appointee.");
            fulfill({success: false, reason: "Appointment time conflicts with the appointee's existing appointment."});
          }
        });
      } else {
        // Conflicting appointments with the initiator.
        console.log("Error appointment time unavailable for initiator.");
        fulfill({success: false, reason: "Appointment time conflicts with your existing appointment."});
      }
    }).catch(error => {
      console.log(error);
    });
  });
};

/**
 * Helper function for checking for conflicts. 
 * Passes in the modification function to check.
 * Appointment modification.
 * @param {*} repo The repository.
 * @param {*} appointments The appointments (original and modified appointments).
 * @param {*} initiator The user who initiated the appointment.
 * @param {*} appointee The user who's being requested this appointment.
 */
const validate_modification = (repo, appointments, initiator, appointee) => {
  return new Promise((fulfill, reject) => {
    validate(repo, appointments, initiator, appointee, noConflicts_Modify).then(result => {
      fulfill(result);
    });
  });
}

/**
 * Helper function for validating appointment creation. Passes in the correct validation function.
 * @param {*} repo The appointment repository.
 * @param {*} appointment The appointment object that was created.
 * @param {*} initiator The initiator of the appointment.
 * @param {*} appointee The person this appointment is requested.
 */
const validate_creation = (repo, appointment, initiator, appointee) => {
  return new Promise((fulfill, reject) => {
    validate(repo, appointment, initiator, appointee, noConflicts_Create).then(result => {
      fulfill(result);
    });
  });
}

module.exports = {validate_creation, validate_modification};