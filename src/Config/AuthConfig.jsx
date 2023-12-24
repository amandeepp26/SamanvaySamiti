import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC0pPhob2ejgNj3As9xIPLy--mcbASw0is",
  authDomain: "samanvaysamiti.com",
  projectId: "samanvaysamiti-66c25",
  storageBucket: "samanvaysamiti-66c25.appspot.com",
  messagingSenderId: "246639333950",
  appId: "1:246639333950:web:66671e63167f28bbc4376f",
  measurementId: "G-KNS34VQV6M",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
