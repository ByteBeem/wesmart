import {initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage";

const firebaseConfig = {

  "type": "service_account",
  "project_id": "peermine-843bb",
  "private_key_id": "c6c9b9ec993b96ceb2fc54a1bdb070c97ce34397",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDKKqsq1fy5b7L7\n/lPc+gqStJoeoOF80t2pTisDAxRv6fUplyylyBoMwqoIs7EdGxeVUZS0kdxSyVAq\neiERShDHeFa7j30OHCe2tE9E+XuwAotb2gnqlaFmeNBu5MT5h43Fm8csYt0ZVD77\nD+ldT/qSgruB8CBXuh9rqdtuBYj6O6cV+c+6QMQVgdoXJUwbtAzR75oFBa+iPrx+\nAJzfXwKFubjgkTwWKSj47uLbExpYL6QbsasSMK9o7oNFOizNGz73H1Y978xnUDKz\nBQ2PR96nGQzHoSlms+t//vdSAaB0UIIaKOse9oq/9U8zp7ymJYNCRnXdbzJrPZPa\nF2V5meqFAgMBAAECggEAHI3fRDsaKXTh4l6/KJh2ctcoZ4gQoSlFXproT1IZil8Q\nnhG4oCe9qiy6iGUc8H/5mkD+EG0DofvGI2HBlugPq6TPF0nCf4Ixh8g65AKa2jbZ\nyRzoRqZguBD7W5ZbTeU7/Huuq5HBKckw5hQOwXvA5/2oD0fDwbBLrNC+afFFMhaH\nkZfEv1cJ0kEiU4TxD5aCTnxKNNgDmCV0M971i82rtMdTEdvL+9DNSKpqBOtWEbYN\nvnY5HP6SOp6qxq5np5p7HuaTq15qsEesURlwqgLrP/dVnfaJcPiPhf8m9Ugkp4X+\nh8FGvUN75xrWN0W+sh5A04Q1JYFU3A5UVf9JQWzT1wKBgQDoAbxx8RFwZXXum+HL\nLZRYs1CM1VZgrdUI+pqB5qC7OmZT0aAsawJlHEI1jrU6fcEewkVg1IHA2AjfPjk3\nVCfyLvm4Iza1pg7Sp7je+j0VDpBm2wgE0mwS6tId6TJosyPgeEMFbH0mgsxRBXVF\nQFcsLkcBbMTACgIdzDBmnCa6swKBgQDfEu439oT1wk0Iw+U4plcTBaw16AkDXaTA\nYNaAq5OMoT0w5MUCWVYcHS1ewlorNxcvCKPZbNUFrmxGMaUIuJHf5wiTnD+mE/OM\nPr6y/OANJj31zRDbBviVWUtpIHxOX27d2NQkYQGtSlh0udWnJmREI9SDlv96ylkx\n0Twn7cBB5wKBgFOTDIcfB+EtK2Zg0N2X9bBeJ84Tq6H3/J3XaIESyyOmzeWzxbc6\ndQpnO5J/bdk8I60o3kUbSAJn0ApbJ9E+h4U+VsZ2KOcWgpBvyrDIA+jp7iqfDCxw\ngG3wGPCdaIM+xNW/fKUfh5Wv2Fn3VV805jIMGZfxzo4/DLQfMfBEn87xAoGAXZZM\nmO/00kJFHWNKPJ0UtOdRW4BQn7fe0dMOywawrXRL/sJLoPOn+72F9lZli/Hd6R6f\n1y0gpfSKelyDl4gPszbzUzJfRabjK7h7Ow56VSnxHrl809c13TqMN7uoSx0gnzRD\ntEt6b6BcQgRhDXI+6JN7qgVkg7h2+T6GFV5apYsCgYAPKMzWREzUQxKM+nhBgaK5\nJUg/AyGRMzRi8neJ1c/bGefSrBP2k4NNeStqSBtBqdAY+QwLy+rWmUu+mUk+dm+8\ntJ4VEWWXJHBCo5LFdFwdw04wxia4xXp4kzOmq5E/SvGQYaOGuz3cmPt0Qu+cZLtc\nr4xRvRZAjYUjEIMaHJee3A==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-8h40m@peermine-843bb.iam.gserviceaccount.com",
  "client_id": "101385532115864745360",
  "storageBucket": 'gs://peermine-843bb.appspot.com',
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-8h40m%40peermine-843bb.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"

};

const app = initializeApp(firebaseConfig);
export const storage=getStorage(app);
