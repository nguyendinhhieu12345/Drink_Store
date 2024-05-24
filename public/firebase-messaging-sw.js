// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging"
import { onBackgroundMessage } from "firebase/messaging/sw";

const firebaseConfig = {
    apiKey: "AIzaSyAgwPNPml-TNOlBEj1Dth1FencAtStMFyc",
    authDomain: "shopfee-12b03.firebaseapp.com",
    projectId: "shopfee-12b03",
    storageBucket: "shopfee-12b03.appspot.com",
    messagingSenderId: "198446900787",
    appId: "1:198446900787:web:b4cd6f7fd746fdec466546",
    measurementId: "G-C8B5F51QWV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

onBackgroundMessage(messaging, (payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
        body: 'Background Message body.',
        // icon: '/firebase-logo.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});