// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging"
import * as authApi from "api/authApi/authApi"

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

export const requestPermissions = (userId: string | null) => {
    Notification.requestPermission().then(permission => {
        if (permission === "granted") {
            return getToken(messaging, {
                vapidKey: "BLoK0WNsDDtJZIy5EEGIivV_B-KTGEJwy5s05xcz5gp3eX51mN0GrxejEMlKJK5HizxQlCc29G-QMI60IMvsOxs"
            })
                .then(async (curentToken) => {
                    if (curentToken) {
                        console.log(curentToken)
                        const data = await authApi.sendNotifyUser(userId ? userId : null, curentToken)
                        if (data?.success) {
                            localStorage.setItem("fcmTokenId", data?.data?.fcmTokenId)
                        }
                    }
                    else {
                        console.log("Failed to generate client token")
                    }
                }
                ).catch(err => {
                    console.log("An error occurred: " + err)
                })
        }
        else {
            console.log("User permissions denied")
        }
    })
}