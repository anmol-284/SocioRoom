import React from 'react';
import useConversation from '../zustand/useConversation';
import { useSocketContext } from '../context/SocketContext';

const Conversation = ({ conversation, lastInd }) => {
    const { selectedConversation, setSelectedConversation } = useConversation();

    const isSelected = selectedConversation?._id === conversation._id;
    const { onlineUsers } = useSocketContext();
    const isOnline = onlineUsers.includes(conversation._id);

    return (
        <>
            <div
                className={`flex gap-2 items-center hover:bg-slate-500 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-black" : ""}
			`}
                onClick={() => setSelectedConversation(conversation)}
            >
                <div className={`avatar ${isOnline ? "online" : ""}`}>
                    <div className="w-12 rounded-full">
                        <img src={conversation.image} alt='user avatar' />
                    </div>
                </div>
                <div className="flex flex-col flex-1">
                    <div className="flex gap-3 justify-between">
                        <p className="font-bold text-white">
                            {conversation.username}
                        </p>
                    </div>
                </div>
            </div>
            {!lastInd && <div className="divider my-0 py-0 h-1"></div>}
        </>
    );
};

export default Conversation;
