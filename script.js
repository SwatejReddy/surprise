 // Import the functions you need from the SDKs you need
 const name = prompt("Enter your name");

 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
 import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

 // Your web app's Firebase configuration
 const firebaseConfig = {
     apiKey: "AIzaSyDUiXomKgR9PhqGjtX9bUHw7B4piIKcc0s",
     authDomain: "surprise-2bdd0.firebaseapp.com",
     projectId: "surprise-2bdd0",
     storageBucket: "surprise-2bdd0.appspot.com",
     messagingSenderId: "881125189657",
     appId: "1:881125189657:web:b6555c13f8c3988eafa288"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 // console.log(app);

 const db = getDatabase(app);
 console.log(db);


 console.log(db);


const noBtn = document.getElementsByClassName("no-btn")[0];

//calculates the distance from the noBtn to top of the screen and noBtn to the bottom of the screen:
function calculateDistances() {
    // Get the coordinates of the noBtn relative to the viewport
    const noBtnRect = noBtn.getBoundingClientRect();
  
    // Calculate the distance from the top of noBtn to the top of the screen
    const distanceToTop = noBtnRect.top + window.scrollY;
  
    // Calculate the distance from the bottom of noBtn to the bottom of the screen
    const distanceToBottom = window.innerHeight - noBtnRect.bottom + window.scrollY;
  
    return { distanceToTop, distanceToBottom };
}

const { distanceToTop, distanceToBottom } = calculateDistances();
console.log(distanceToTop);
console.log(distanceToBottom);


function calculateRanges() {
    // Screen dimensions
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
  
    // Button dimensions (replace with your actual button dimensions)
    const btnWidth = 80; // Replace with your button width
    const btnHeight = 40; // Replace with your button height
  
    // Constraints for X axis
    const minX = 0;
    const maxX = (screenWidth/2) - (0.02 * screenWidth) - btnWidth;
  
    // Constraints for Y axis
    const minY = 0;
    var maxY = (screenHeight) - (0.02 * screenHeight) - btnHeight;
  
    return { minX, maxX, minY, maxY };
  }
  

  // Function to calculate X and Y values within the specified ranges with random signs
function calculateValuesWithSign() {
    // Calculate ranges
    const { minX, maxX, minY, maxY } = calculateRanges();
  
    // Randomly choose X and Y values within the calculated ranges
    const randomX = Math.random() * (maxX - minX) + minX;
    var randomY = Math.random() * (maxY - minY) + minY;
  
    // Randomly choose positive or negative signs for X and Y
    const randomXSign = Math.random() < 0.5 ? -1 : 1;
    const randomYSign = Math.random() < 0.7 ? -1 : 1;
  
    // Apply signs to the chosen values
    const finalX = randomX * randomXSign;

    //goes to bottom as multiplier is +ve:
    if(randomYSign != -1 && distanceToBottom > 50){
        var finalY = Math.random()*(distanceToBottom*0.95)*randomYSign;
        // console.log(finalY);
        // console.log(distanceToBottom);
    }
    else{
        var finalY = Math.random()*(distanceToTop*0.95) * -1;
        console.log(finalY);
        console.log(distanceToTop);
    }
  
    return { finalX, finalY };
  }

noBtn.addEventListener("mouseover", ()=>{

    const { finalX, finalY } = calculateValuesWithSign();

    console.log('Success');

    noBtn.style.left = finalX + 'px';
    noBtn.style.top = finalY + 'px';
})
noBtn.addEventListener("click", ()=>{
    const { finalX, finalY } = calculateValuesWithSign();

    console.log('Success')

    noBtn.style.left = finalX + 'px';
    noBtn.style.top = finalY + 'px';
})
const yesBtn = document.getElementsByClassName("yes-btn")[0];

// var uId = 0;
// function writeUserData(userID, name, status, email, date){

//     set(ref(db, 'users/' + userID),{
//         Clicked:'yes',
//         time: `${date}`
//     })
// }

// yesBtn.addEventListener('click', function (e){
//     uId++;
//     const date = new Date();
//     writeUserData(uId, "Swatej", 'Yes', "s@gmail.com", date);
// })

var uId = 0;

function writeGirlDescision(status, date) {
  // Use push method instead of set
  push(ref(db, 'users/' + name), {
    date: `${date}`,
    Clicked: status,
  });
}

yesBtn.addEventListener('click', function (e) {
  let date = new Date();
  writeGirlDescision('Yes', date);
});

noBtn.addEventListener('mouseover', function (e) {
  let date = new Date();
  writeGirlDescision('No', date);
});
noBtn.addEventListener('click', function (e) {
  let date = new Date();
  writeGirlDescision('No', date);
});
