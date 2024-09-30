import * as admin from "firebase-admin"

const serviceAccount = {
  authProviderX509CertUrl: process.env.AUTH_PROVIDER_X509_CERT_URL!,
  authUri: process.env.AUTH_URI!,
  clientC509CertUrl: process.env.CLIENT_X509_CERT_URL!,
  clientEmail: process.env.CLIENT_EMAIL!,
  clientId: process.env.CLIENT_ID!,
  privateKey: process.env.PRIVATE_KEY!.replace(/\\n/g, "\n"),
  privateKeyId: process.env.PRIVATE_KEY_ID!,
  projectId: process.env.PROJECT_ID!,
  tokenUri: process.env.TOKEN_URI!,
  type: process.env.TYPE!,
}

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${serviceAccount.projectId}.firebaseio.com`,
  })
}

const db = admin.firestore()

export { db }
