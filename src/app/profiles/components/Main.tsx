// "use client";

// import React, { useState, useEffect } from 'react';
// import styles from '../styles/Card.module.scss'; // Import the CSS module

// const API_URL = "https://randomuser.me/api/?results=6";

// const fetchUsers = async (): Promise<any[]> => {
//   try {
//     const response = await fetch(API_URL);
//     if (!response.ok) {
//       throw new Error("Failed to fetch user data");
//     }
//     const data = await response.json();
//     return data.results; // Return all user results
//   } catch (error) {
//     console.error("Error fetching user data:", error);
//     throw error;
//   }
// };

// const Main: React.FC = () => {
//   const [users, setUsers] = useState<any[]>([]); // State to store users

//   useEffect(() => {
//     // Fetch users when the component mounts
//     const fetchData = async () => {
//       const usersData = await fetchUsers();
//       setUsers(usersData);
//     };

//     fetchData();
//   }, []); // Empty dependency array ensures this effect runs only once when the component mounts

//   useEffect(() => {
//     // Set up the mousemove event listener after the DOM has rendered
//     const wrapper = document.querySelector(".cards");
//     const cards = document.querySelectorAll(".card");

//     if (wrapper) {
//       const handleMouseMove = ($event: MouseEvent) => {
//         cards.forEach((card) => {
//           const rect = card.getBoundingClientRect();
//           const x = $event.clientX - rect.left;
//           const y = $event.clientY - rect.top;

//           card.style.setProperty("--xPos", `${x}px`);
//           card.style.setProperty("--yPos", `${y}px`);
//         });
//       };

//       wrapper.addEventListener("mousemove", handleMouseMove);

//       // Clean up the event listener when the component unmounts
//       return () => {
//         wrapper.removeEventListener("mousemove", handleMouseMove);
//       };
//     }
//   }, [users]); // This useEffect runs whenever 'users' is updated, ensuring the cards are in the DOM

//   return (
//     <main className={styles.main}>
//       <div className={styles.cards}>
//         {users.map((user, index) => (
//           <div className={styles.card} key={index}>
//             <div className={styles.cardContent}>
//               <img src={user.picture.large} alt={`${user.name.first} ${user.name.last}`} className={styles.cardImage} />
//               <h2 className={styles.cardHeading}>{`${user.name.first} ${user.name.last}`}</h2>
//               <p className={styles.cardEmail}>{user.email}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </main>
//   );
// };

// export default Main;
