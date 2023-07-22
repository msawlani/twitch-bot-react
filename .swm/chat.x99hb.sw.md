---
id: x99hb
title: Chat
file_version: 1.1.3
app_version: 1.10.3
---

these are the use states that I am using for chat and setting the message
<!-- NOTE-swimm-snippet: the lines below link your snippet to Swimm -->
### 📄 src/Chat.js
```javascript
4      const Chat = ({ chat, setChat, userData }) => {
5        const [messages, setMessages] = useState("");
```

<br/>

This code will handle chat useState which will store whatever messages come into the stream
<!-- NOTE-swimm-snippet: the lines below link your snippet to Swimm -->
### 📄 src/Chat.js
```javascript
11         e.preventDefault();
12         if (messages === "") {
13           return;
14         }
15         client.say("sinsofaninja", messages);
16         setMessages("");
17       };
18     
19       const clearChat = () => {
20         setChat([]);
21         localStorage.setItem("chat", JSON.stringify([]));
22       };
23     
24       return (
25         <div className="container">
26           <div className="row">
27             <div className="col-12 col-md-9">
28               <iframe
29                 src="https://player.twitch.tv/?channel=sinsofaninja&parent=ninjashideout-twitch-bot.onrender.com&autoplay=true&muted=true"
30                 height="1000"
31                 width="850"
32                 frameborder="0"
33                 scrolling="no"
34                 allowfullscreen="true"
35               ></iframe>
36             </div>
37     
38             <div className="chatWindow col-12 col-md-3">
39               {chat.map((msg, index) => (
40                 <div key={index}>
41                   <strong style={{ color: msg.color }}>{msg.user}: </strong>
42                   <span>{msg.text}</span>
43                 </div>
44               ))}
45               <form onSubmit={sendMessage} hidden={client.readyState() !== "OPEN"}>
46                 <div className="form-group">
47                   <input
48                     className="form-control form-control-sm"
49                     type="text"
50                     placeholder="Type a message"
51                     value={messages}
52                     onChange={(e) => setMessages(e.target.value)}
53                   />
54                 </div>
55     
56                 <div className="d-flex justify-content-center">
57                   <button className="btn btn-primary" type="submit">
58                     Send
59                   </button>
60                   <button
61                     className="btn btn-danger"
62                     onClick={clearChat}
63                     type="button"
64                   >
65                     Clear
66                   </button>
67                 </div>
68               </form>
69             </div>
70           </div>
71         </div>
72       );
73     };
```

<br/>

First I created a way to save chat messages through local storage and then check if there is a saved chat to set the current chat to that saved one. client on message will then handle what messages come in and update the saved chat and current chat.

<br/>

This code handles sending messages to chat from the front end.
<!-- NOTE-swimm-snippet: the lines below link your snippet to Swimm -->
### 📄 src/Chat.js
```javascript
10       const sendMessage = (e) => {
11         e.preventDefault();
12         if (messages === "") {
13           return;
14         }
15         client.say("sinsofaninja", messages);
16         setMessages("");
17       };
```

<br/>

This code snip handles the messages being displayed from useState chat and sending messages using the sendMessage function.
<!-- NOTE-swimm-snippet: the lines below link your snippet to Swimm -->
### 📄 src/Chat.js
```javascript
36             </div>
37     
38             <div className="chatWindow col-12 col-md-3">
39               {chat.map((msg, index) => (
40                 <div key={index}>
41                   <strong style={{ color: msg.color }}>{msg.user}: </strong>
42                   <span>{msg.text}</span>
43                 </div>
44               ))}
45               <form onSubmit={sendMessage} hidden={client.readyState() !== "OPEN"}>
46                 <div className="form-group">
47                   <input
48                     className="form-control form-control-sm"
49                     type="text"
50                     placeholder="Type a message"
51                     value={messages}
52                     onChange={(e) => setMessages(e.target.value)}
53                   />
54                 </div>
55     
56                 <div className="d-flex justify-content-center">
57                   <button className="btn btn-primary" type="submit">
58                     Send
59                   </button>
60                   <button
61                     className="btn btn-danger"
62                     onClick={clearChat}
63                     type="button"
64                   >
65                     Clear
66                   </button>
67                 </div>
68               </form>
69             </div>
```

<br/>

This file was generated by Swimm. [Click here to view it in the app](https://app.swimm.io/repos/Z2l0aHViJTNBJTNBdHdpdGNoLWJvdC1yZWFjdCUzQSUzQW1zYXdsYW5p/docs/x99hb).
