const CLIENT_ID = '366206569642-1qbckqr1vbfhc833v1n4714djjtbet15.apps.googleusercontent.com';
const API_KEY = 'AIzaSyCgXpxeDdwxEdvKmk5xTOyMIXrtta9Py-4';
const DISCOVERY_DOCS = ['https://sheets.googleapis.com/$discovery/rest?version=v4'];
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets';
const authorizeButton = document.getElementById('authorize_button');
const signoutButton = document.getElementById('signout_button');

function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';
  } else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
  }
}

function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES,
  }).then(() => {
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = () => gapi.auth2.getAuthInstance().signIn();
    signoutButton.onclick = () => gapi.auth2.getAuthInstance().signOut();
  }, (error) => {
    console.log(error);
  });
}
