// // closeApp.js

// import { ipcRenderer } from 'electron';

// // // Get references to buttons
// // const minimizeButton = document.getElementById('titleButtonsMin');
// // const maximizeButton = document.getElementById('titleButtonsMax');
// // const closeButton = document.getElementById('titleButtonsClose');

// // // Add click event listeners to buttons
// // minimizeButton.addEventListener('click', () => {
// //   ipcRenderer.send('minimize-window');
// // });

// // maximizeButton.addEventListener('click', () => {
// //   console.log('max');
// //   ipcRenderer.send('maximize-window');
// // });

// // closeButton.addEventListener('click', () => {
// //   ipcRenderer.send('close-window');
// // });
// document.addEventListener('DOMContentLoaded', () => {
//   // Get references to buttons
//   const minimizeButton = document.getElementById('titleButtonsMin');
//   const maximizeButton = document.getElementById('titleButtonsMax');
//   const closeButton = document.getElementById('titleButtonsClose');

//   // Check if elements are found before adding event listeners
//   if (minimizeButton && maximizeButton && closeButton) {
//     // Add click event listeners to buttons
//     minimizeButton.addEventListener('click', () => {
//       ipcRenderer.send('minimize-window');
//     });

//     maximizeButton.addEventListener('click', () => {
//       console.log('max');
//       ipcRenderer.send('maximize-window');
//     });

//     closeButton.addEventListener('click', () => {
//       ipcRenderer.send('close-window');
//     });
//   } else {
//     console.error('One or more buttons not found');
//   }
// });
