export const FindPrecedingNumber = (keys: string[], query: string): string | number => {
    // Iterate through each string in the memoryKeys array
    for (let keyString of keys) {
      const keyArray = keyString.split(","); // Split the string into an array of numbers
  
      // Find the index of the query in the current array
      const index = keyArray.indexOf(query);
      
      if (index > -1) {
        // If the query is found and it's not the first element, return the previous number
        if (index > 0) {
          return keyArray[index - 1];
        } else {
          // If it's the first element, return 0
          return 0;
        }
      }
    }
    
    // If the query string is not found in any of the lists
    return "Query not found";
  };