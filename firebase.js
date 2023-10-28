const firebaseConfig = {
  apiKey: "AIzaSyCNF23Pimut_RGVqpyDxmrnzkMG_gpRpcw",
  authDomain: "pagepenguin-af269.firebaseapp.com",
  databaseURL: "https://pagepenguin-af269-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "pagepenguin-af269",
  storageBucket: "pagepenguin-af269.appspot.com",
  messagingSenderId: "718535991458",
  appId: "1:718535991458:web:0da5b9b1c0cf7ce65f77fb",
  measurementId: "G-24FQJD1WWX"
};

firebase.initializeApp(firebaseConfig)
var uiConfig = {
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  tosUrl: '/tos',
  privacyPolicyUrl: function() {
    window.location.assign('/privacy');
  }
};

var signedIn = false
firebase.auth().onAuthStateChanged(function(user) {
  if (user && !signedIn) {
    signedIn = true
    initDash(user)
  } else {
    if (signedIn) {
      window.location.reload()
    }
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui', uiConfig);
  }
});