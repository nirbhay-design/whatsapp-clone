//  importing 
import express from 'express'; // able to do because of type = module;
import mongoose from 'mongoose'
import Messages from './dbMessages.js';
import Pusher from 'pusher'
import cors from 'cors';

// app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "1212149",
    key: "bff3056498b99656c590",
    secret: "f873e0be356c2e7d1590",
    cluster: "eu",
    useTLS: true
  });



// middleware
app.use(express.json());
app.use(cors())
// so we dont require this here 
// app.use((req,res)=>{
//     res.setHeader("Access-Control-Allow-Origin","*");
//     res.setHeader("Access-Control-Allow-Headers","*");
//     next();
// })

//db config
const pass = "4cDnWsx3AAkE55Gi";
const user = "nirbhaysharma";
const connection_url = 'mongodb+srv://nirbhaysharma:4cDnWsx3AAkE55Gi@cluster0.bijdp.mongodb.net/whatsappdb?retryWrites=true&w=majority'
mongoose.connect(connection_url,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const db = mongoose.connection
db.once('open',()=>{
    console.log("db is connected")

    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();

    changeStream.on('change',(change)=>{
        // console.log(change);
        // triggering out pusher
        if(change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages','inserted',{
                name:messageDetails.name,
                message:messageDetails.message,
                timestamp:messageDetails.timestamp,
                received:messageDetails.received,
            });
        } else {
            console.log("error triggering puser")
        }
    })
})

// ???? 

// api routes  res.status(200) 200 means ok;

// get post delete (get : get hte message post : to post the msg delete: delete the message)
app.get('/',(req,res)=> res.status(200).send("hello world"));

app.post('/messages/new',(req,res)=>{
    const dbMessage = req.body

    Messages.create(dbMessage,(err,data)=>{
        if(err){
            res.status(500).send(err);//error means 500
        } else{
            res.status(201).send(data); // 201 created ok
        }
    })
})

app.get('/messages/sync',(req,res)=>{
    Messages.find((err,data)=>{
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })
})



// listen

app.listen(port,()=>console.log(`listening on local host ${port}`))