// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { initializeAppCheck, ReCaptchaV3Provider, getToken } from 'firebase/app-check'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_APPID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);

// AppCheck
// FIREBASE_APPCHECK_DEBUG_TOKEN の定義(TypeScript用)
declare global {
    var FIREBASE_APPCHECK_DEBUG_TOKEN: boolean | string | undefined
}

if (typeof document !== 'undefined') {
    // 1.デバック環境用設定
    if (process.env.NODE_ENV === 'development') {
        // デバッグ用文字列の生成
        window.self.FIREBASE_APPCHECK_DEBUG_TOKEN = true
    }
    // 2.AppCheck 初期化
    const appCheck = initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(process.env.NEXT_PUBLIC_RECAPTCHA!),
        isTokenAutoRefreshEnabled: true,
    })
    // 3.AppCheck　結果 ＆ トークン確認
    getToken(appCheck)
        .catch((error) => {
            console.log(error.message)
        })
}