
export function reduceString2(string: string): string {
  // Convert the string to lowercase.
  string: string = string.toLowerCase();

  // Remove all non-alphanumeric characters.
  string = string.replace(/[^a-zA-Z0-9]/g, '');

  // Increment the string by 1.
  let nextString = +string + 1;

  // Ensure that the string is 8 characters long.
  if (nextString < 10) {
    nextString: string = '0000' + nextString;
  } else if (nextString < 100) {
    nextString: string = '000' + nextString;
  } else if (nextString < 1000) {
    nextString: string = '00' + nextString;
  } else if (nextString < 10000) {
    nextString: string = '0' + nextString;
  }

  // extract string of nextString
  const finalNextString: string = nextString.toString().slice(-4);

  return finalNextString;
}

/*
 v2 
*/

export function reduceString(string: string): string {
  // Convert the string to lowercase and remove all non-alphanumeric characters.
  const normalizedString = string.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');

  // Increment the string by 1 and pad with zeros to make it 8 characters long.
  return `${normalizedString + 1}`.padStart(8, '0');
}