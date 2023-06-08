// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Optionally import the services that you want to use
import { getAuth } from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// export const firebaseConfig = {
//   apiKey: "AIzaSyBbA01nWbJ1R0BJp_j2GWkcpBQo0T1ZpdQ",
//   authDomain: "cirf-react-native-project.firebaseapp.com",
//   projectId: "cirf-react-native-project",
//   storageBucket: "cirf-react-native-project.appspot.com",
//   messagingSenderId: "758362227950",
//   appId: "1:758362227950:web:f9bbd95528dc0d553cdfff",
//   measurementId: "G-12X53S75J6",
//   databaseURL:
//     "https://cirf-react-native-project-default-rtdb.asia-southeast1.firebasedatabase.app/",
// };
export const firebaseConfig = {
  apiKey: "AIzaSyADwa1bU8prp2kmnVjR17h14B95wr-wEls",
  authDomain: "cirf-expo.firebaseapp.com",
  projectId: "cirf-expo",
  storageBucket: "cirf-expo.appspot.com",
  messagingSenderId: "167723493109",
  appId: "1:167723493109:web:a222ace70b6302988707bc",
  measurementId: "G-TDD5TDDF2N",
  databaseURL:
    "https://cirf-expo-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);

// Services
export const auth = getAuth(app);
