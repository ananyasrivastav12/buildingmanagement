export function convertToMinutes(timeString) {
    // Split the string into hour and minute components
    const [hourStr, minuteStr] = timeString.split(':');
  
    // Convert the hour and minute components into integers
    const hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);
  
    // Calculate the total number of minutes
    const totalMinutes = hour * 60 + minute;
  
    return totalMinutes;
  }


export function convertMinutesToTime(minutes) {
    // Calculate the hours and minutes
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
  
    // Format the hours and minutes as strings
    const hoursString = String(hours).padStart(2, '0');
    const minutesString = String(remainingMinutes).padStart(2, '0');
  
    // Create the time string in the format "HH:MM"
    const timeString = `${hoursString}:${minutesString}`;
  
    return timeString;
  }
  



//   // Example usage
//   const totalMinutes = ; // Assuming 143 minutes
//   const time = convertMinutesToTime(totalMinutes);
//   console.log(time); // Output: "02:23"

// //   // Example usage
//   const timeString = '23:30';
//   const minutes = convertToMinutes(timeString);
//   console.log(minutes); // Output: 150