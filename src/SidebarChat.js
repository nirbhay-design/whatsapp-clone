import { Avatar } from '@material-ui/core';
import React from 'react'
import './sidebarchat.css';

function SidebarChat() {
    return (
        <div className="sidebarChat">
            <Avatar />
            <div className="sidebarchat__info">
                <h2>Group Name</h2>
                <p>this is last message</p>
            </div>


        </div>
    )
}

export default SidebarChat
