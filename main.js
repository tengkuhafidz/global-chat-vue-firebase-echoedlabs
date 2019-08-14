var app = new Vue({
    el: '#app',
    data: {
      messages: [
        {
          author: "Dummy User",
          text: "Dummy message"
        },
        {
            author: "Dummy User",
            text: "Dummy message 2"
        },
        {
            author: "Me",
            text: "Dummy message 1"
        },
        ],
        currentUser: "",
        newMessageText: ""
    },
    created: async function() {
      console.log("created>>>>", this.currentUser )

      db.collection("messages")
        .orderBy("createdAt", "asc")
        .onSnapshot((querySnapshot)=> {
          const chatArea = document.getElementById('chatArea')
          if(chatArea) {
            chatArea.scrollTop = chatArea.scrollHeight;
          }
            this.messages = [];
            querySnapshot.forEach((doc) => {
                this.messages.push(doc.data())
            });
        });
    },
    methods: {
      addMessage: function() {
        console.log("addMessage currentUser". this.currentUser)
        const message = {
          author: this.currentUser,
          text: this.newMessageText,
          createdAt: new Date()
        }
        // this.messages.push(message);
        this.addToFirestore(message);
        this.newMessageText = "";
      },
      addToFirestore: function(message) {
        db.collection("messages").add({
          author: message.author,
          text: message.text,
          createdAt: message.createdAt
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
      }
    }
  })