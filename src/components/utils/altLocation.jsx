import React from 'react'

async function AltLocation() {
   try {
      const response = await fetch('https://ipinfo.io/json');
      if (!response.ok) {
        throw new Error(`HTTP Error: Status ${response.status}`);
      }
      const data = await response.json();
      return data
    } catch (error) {
      throw new Error('Error fetching location:', error);
    }
}

export default AltLocation
