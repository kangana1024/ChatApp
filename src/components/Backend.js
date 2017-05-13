import firebase from 'firebase';

class Backend {
  uid = '';
  messagesRef = null;
  // initialize Firebase Backend
  constructor() {
    // Config firebase
    firebase.initializeApp({
      apiKey: "AIzaSyA5_BXuGrMEMlg4fdAXqJmeDv7MpWv3jNY",
      authDomain: "blazing-torch-3505.firebaseapp.com",
      databaseURL: "https://blazing-torch-3505.firebaseio.com",
      projectId: "blazing-torch-3505",
      storageBucket: "blazing-torch-3505.appspot.com",
      messagingSenderId: "529412272501"
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setUid(user.uid);
      } else {
        // Anonymous Login
        // ทำการ login แบบ Anonymously
        firebase.auth().signInAnonymously().catch((error) => {
          alert(error.message);
        });
        // หรือ Login อย่างอื่นก็ได้
      }
    });
  }
  setUid(value) {
    this.uid = value;
  }
  getUid() {
    return this.uid;
  }
  // retrieve the messages from the Firebase Backend
  // ดึงข้อความจาก Firebase Backend
  loadMessages(callback) {
    this.messagesRef = firebase.database().ref('messages');
    this.messagesRef.off();
    const onReceive = (data) => {
      const message = data.val();
      callback({
        _id: data.key,
        text: message.text,
        createdAt: new Date(message.createdAt),
        user: {
          _id: message.user._id,
          name: message.user.name,
          // avatar: 'https://facebook.github.io/react/img/logo_og.png',
        },
      });
    };
    this.messagesRef.limitToLast(20).on('child_added', onReceive);
  }
  // send the message to the Backend
  // ส่งข้อความไปที่ Firebase Backend
  sendMessage(message) {
    for (let i = 0; i < message.length; i++) {
      this.messagesRef.push({
        text: message[i].text,
        user: message[i].user,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
      });
    }
  }
  // close the connection to the Backend
  // ปิดการเชื่อมต่อกับฐานข้อมูล Firebase
  closeChat() {
    if (this.messagesRef) {
      this.messagesRef.off();
    }
  }
}

export default new Backend();