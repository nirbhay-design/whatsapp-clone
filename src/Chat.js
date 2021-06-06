import React from 'react'
import './chat.css'
import {Avatar, IconButton} from '@material-ui/core'
import AttachFileIcon from '@material-ui/icons/AttachFile';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import {useState} from 'react'
import axios from "./Axios.js";

const ServerUrl = 'https://whatsapp-backend-nirbhay.herokuapp.com';
function Chat({ messagess }) {
    const [Input , setInput] = useState("");
    const sendMessage = async (e)=>{
        e.preventDefault();
        await axios.post(ServerUrl+'/messages/new',{ 
            message:Input,
            name:"DEMO name",
            timestamp:`${new Date().toUTCString()}`,
            received:true,

        })

        setInput("")
    }
    return (
        <div className = "chat"> 
            <div className="chat_header">
                <Avatar />
                <div className="chatheader__info">
                    <h2>Room Name</h2>
                    <p>Last Seen Today</p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <AttachFileIcon/>

                    </IconButton>
                    <IconButton>
                        <SearchOutlinedIcon/>

                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>

                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
                {messagess.map((message)=>{
                    return (
                    
                    message.received === false ?<p className="chat__message">
                    <span className="chat__name">{message.name}</span>                    
                    {message.message}
                <span className="chat__time">{message.timestamp}</span>
                    </p>:
                    <p className="chat__reciever">
                    <span className="chat__name">{message.name}</span>                    
                    {message.message}
                <span className="chat__time">{message.timestamp}</span>
                    </p>
                    )        
                })}
                
                

                
            </div>

            <div className="chat__footer">
                <IconButton>
                    <InsertEmoticonIcon/>
                </IconButton>
                <form>
                    <input value = {Input} onChange={(e)=>{setInput(e.target.value)}}placeholder="type a message" type="text" />

                    <button type="submit" onClick={sendMessage}>Send Message</button>
                </form>
                <IconButton>
                    <MicIcon/>
                </IconButton>
            </div>
        </div>
    )
}

export default Chat
