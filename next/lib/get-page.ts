// import { Data } from "@measured/puck";
// import fs from "fs";
// import fetch from 'node-fetch';

// // Replace with call to your database

// let data = {}; 

// const fetchData = async () => {
//   try {
//     const response = await fetch('https://eoyxqqw6g14gk2a.m.pipedream.net');
    
//     if (!response.ok) {
//       throw new Error('Failed to fetch data');
//     }
    
//     const fetchedData = await response.json();
    
//     // Store fetchedData in the data variable
//     data = fetchedData;
    
//     console.log('Data fetched:', data);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// };

// fetchData(); // Initiate fetching of data

// export const getPage = (path: string) => {
//   // Use the fetched data in this function
//   return data[path] || null;
// };

import { Data } from "@measured/puck";
import fs from "fs";

// Replace with call to your database
export const getPage = (path: string) => {
  const allData: Record<string, Data> | null = fs.existsSync("database.json")
    ? JSON.parse(fs.readFileSync("database.json", "utf-8"))
    : null;

  return allData ? allData[path] : null;
};
