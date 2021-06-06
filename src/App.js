import {useEffect,useState} from 'react'
import './App.css';
import Chat from './Chat.js';
import Sidebar from './Sidebar'
import Pusher from 'pusher-js'
import axios from './Axios.js'
const ServerUrl = 'https://whatsapp-backend-nirbhay.herokuapp.com';

function App() {

  const [messages,setMessages] = useState([]);
  useEffect(()=>{
      axios.get(ServerUrl+'/messages/sync').then((response)=>{
          setMessages(response.data);
        })
  },[])
  

  useEffect(() => {
    const pusher = new Pusher('bff3056498b99656c590', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage)=> {
      // alert(JSON.stringify(newMessage));
      // console.log(JSON.stringify(newMessage))
      setMessages([...messages,newMessage])
    });

    return ()=>{
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [messages]);

  // console.log(messages);
  return (
    <div className="app">
      <div className="app_body">

      <Sidebar/>
      <Chat messagess={messages}/>

      </div>
    </div>
  );
}

export default App;
