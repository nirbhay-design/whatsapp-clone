import React from 'react'
import './sidebar.css';
import SidebarChat from './SidebarChat.js';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import {Avatar, IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

function Sidebar() {
    
    return (
        <div className = "sidebar">
            <div className="sidebar_header">
                <Avatar src = 'https://avatars.githubusercontent.com/u/66327437?s=400&u=6f4439528f16797e219d598cff6ce8b92bc04165&v=4'/>
                <div className="sidebar_headeRight">
                    <IconButton>
                        <DonutLargeIcon/>
                    </IconButton>
                    <IconButton>
                        <ChatIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
            </div> 

            <div className="sidebar_search">
                <div className="sidebar_searchcontainer">
                    <SearchOutlinedIcon/>
                    <input placeholder="enter something bitch" type = "text"/>
                </div>

            </div>   

            <div className="sidebar_chat">
                <SidebarChat />;
                <SidebarChat />;
                <SidebarChat />;
                
                               
            </div>
        </div>
    )
}

export default Sidebar



// {/* {obj.map((e)=>{
//                     return (
//                     <>
//                     <SidebarChat object = {e}/>;
//                     </>     )               
//                 })} */}
