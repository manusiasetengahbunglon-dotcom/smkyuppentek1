import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCg7ghwMyhap6dgAPUHGtJBr5tVMwx_M08",
  authDomain: "smkyuppentek1tgr.firebaseapp.com",
  databaseURL: "https://smkyuppentek1tgr-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "smkyuppentek1tgr",
  storageBucket: "smkyuppentek1tgr.appspot.com", // ✅ ini diperbaiki
  messagingSenderId: "281700076149",
  appId: "1:281700076149:web:332108f3a24520e018c63c",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);
