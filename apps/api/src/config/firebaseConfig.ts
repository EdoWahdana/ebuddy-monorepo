import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail: "firebase-adminsdk-zzip1@backend-repo-afd7c.iam.gserviceaccount.com",
      projectId: "backend-repo-afd7c",
      privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC5gD9jYubBo9To\nWdjmN5Rk+aHZB5CukpuEfqwgWT/RtO2dV3Z4E6lOZT+McvYH2RzfJhd07QY/qf77\nNMvyj5fhVsPHPCqYBwCLUpzQOJK/Gc+VreCXZAYw6ZMgRXprAcdJfLWlXbtHKHo6\ngT0THYVkHv6ISAp6rSL3NWl9wIgKzqIlLclu29IfaU4C/8yrE21XkiMme1Vv/Dep\nQoUTQidjUabIFopmZO85HxXFPkViTObx4kYgzTMZSGt4cla9iRmlgDFUmfIO9JrG\nINWcj5wEPQmOpID/gEtls3+pF2122eL5d8sQVawvJJI1ArbSWrNs/X2JgHQmL2g6\nmkt6Uix5AgMBAAECggEACQmQXQZTHXU+wMyqymmECWjXi6AomnayTLHSrzdF6pC0\n4Fzj3M0Bazw3zL8HkUGQvGbpzuSi0Kx2q5SqiIBaKwxr+JuL7DDwI/mEAgl1jcmj\nQUSxu9Jv0kd452I3KPoy1DfXDi3LO1fjn5DPEcy3BFYVurw+xXQEr3RK1clw30zV\nUIdhiQ/6aDQZPcI0A25WfJNn0DXwXuNM+89eX92fxXSBuVFckF8rJN9evn+Ik2rY\nCCCtphCCHMEqF3roEwGbSBPdEIxmgGlPqkaqFliOXIE6urK0ic6nb6nHI8BQZLdj\n9cdzzhiFtf4MogRhF5RY8vdMvqXE5QpTg/t0FB9RwQKBgQDsDMdQrkErexJuLJLg\nx8+lysTP2I52iwdaRaksoMuEsBIMF9iMU8tGlh6d/Wd/+CnzI2y8MqVfIxXGFnWx\nguqcqZpyiA0doDDpI19dxhQFOonW1JsAuP4zYThtCI7jRPHHX2p/uc6/xmWd8KH0\nCfeqDxXh74uwPNCdLjQRVurguQKBgQDJLchBF8wSzFkVbagZ+DksJqIZGHIuVci0\n7hv2KNbwYwcQZQH/k8ye9j783hOFPuL76CO26TjXeoASGnAO3HR4vWL7l2eSprlY\nP/B5RSrxX+1ecyof8y/xAVi9+e0VBYkAf3Mf0TbKX0i1+6zU3ceCDOobRRYGpTsb\n9sN9aXpJwQKBgQC2kSuXOy8scgPPMqpnMCNqF2ohV1zYUq9dIoO2AKdn+MX8lHTo\nE+cksPb9OwDR+R547u0qogFFk91DWBuvL5JFmOfbrV53i25I4xLfdFQHtz7k6Yr5\nBBuXoZoCupvJK4nUqfe00gEWUlxFy9d26D6lSQWjuaJQrLis2Q9sWc1QAQKBgC0v\nm0sDjVKrk1a8yoUKu8yu4LnCQ+MkYXBCCwW/JofXtj54cXp2N/98T6l8N+Y1ucXa\n3iq3N40udpWaWpD78y0rXJAl8Z1+1SJ9OgYDAyIz6ZzNQSjr9lirdMM234lZNOxn\ns/PxidzqiepWHPuy1JzhSbPWUJwtgJlHU6FXj6ABAoGBAJ9loHdtQM+y/swtOL98\nh5KrjRygOKxrS5AtEO9klBnRhF0xmdmP5p1FQIYCLp76DhUMqdgSjyX64l6HQROz\nsv0OD1lVd8UXjSRHTXcVzNiXjrszBaY14V2uo1zRxpTtJplvdZFPR4AvyQiT/mHm\nRg++ebL5FI1gyJm5xV54F2TL\n-----END PRIVATE KEY-----\n",
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL || 'https://backend-repo-afd7c.firebaseio.com'
  });
}

const firestore = admin.firestore();
const auth = admin.auth();

export { admin, firestore, auth, functions };