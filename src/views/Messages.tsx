import { useState } from "react";
import { mockMessages } from "@/data/mockMessages.ts";

const Messages = () => {
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    name: "John Doe",
    email: "JohnDoe@gmail.com",
    role: "developer",
    school: "Tech University",
    avatar: "https://i.pravatar.cc/150",
    course: "Computer Science",
    capstoneIdeas: [
      {
        title: "AI Tutor for Programming",
        description: "An AI that helps students learn programming",
        date: "2023-10-01",
      },
      {
        title: "Campus Navigation App",
        description: "Mobile app to navigate university campus",
        date: "2023-09-15",
      },
    ],
    skills: ["JavaScript", "Python", "React"],
  });

  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [activeChat, setActiveChat] = useState(null);

  // Message handlers
  const sendMessage = (text) => {
    if (!activeChat) return;

    const updatedMessages = messages.map((chat) => {
      if (chat.id === activeChat) {
        return {
          ...chat,
          messages: [
            ...chat.messages,
            {
              sender: currentUser.email,
              text,
              time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            },
          ],
        };
      }
      return chat;
    });
    setMessages(updatedMessages);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      sendMessage(newMessage);
      setNewMessage("");
    }
  };

  const activeChatData = mockMessages.find((chat) => chat.id === activeChat);

  return (
    <div className="slide-in">
      <h2 className="text-3xl font-bold mb-8">Messages</h2>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-col md:flex-row h-[70vh]">
          {/* Conversation List */}
          <div className="w-full md:w-1/3 border-r">
            <div className="p-4 border-b">
              <h3 className="font-bold">Conversations</h3>
            </div>

            <div className="overflow-y-auto h-[calc(70vh-52px)]">
              {mockMessages.length > 0 ? (
                mockMessages.map((chat) => {
                  const otherParticipant = chat.participants.find(
                    (p) => p !== currentUser.email,
                  );
                  const project = chat.projectId
                    ? `Project #${chat.projectId}`
                    : "General";
                  const lastMessage = chat.messages[chat.messages.length - 1];

                  return (
                    <div
                      key={chat.id}
                      onClick={() => onChatSelect(chat.id)}
                      className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                        activeChat === chat.id ? "bg-blue-50" : ""
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="font-semibold">{otherParticipant}</div>
                        <div className="text-xs text-gray-500">
                          {lastMessage.time}
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 truncate">
                        {lastMessage.text}
                      </div>
                      <div className="text-xs text-blue-500 mt-1">
                        {project}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-4 text-center text-gray-500">
                  No conversations yet
                </div>
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="w-full md:w-2/3 flex flex-col">
            {activeChatData ? (
              <>
                <div className="p-4 border-b flex items-center">
                  <img
                    src={`https://i.pravatar.cc/40?u=${activeChatData.participants.find((p) => p !== currentUser.email)}`}
                    alt="Participant"
                    className="w-8 h-8 rounded-full mr-3"
                  />
                  <div>
                    <div className="font-semibold">
                      {activeChatData.participants.find(
                        (p) => p !== currentUser.email,
                      )}
                    </div>
                    <div className="text-xs text-gray-500">
                      {activeChatData.projectId
                        ? `Project #${activeChatData.projectId}`
                        : "General Chat"}
                    </div>
                  </div>
                </div>

                <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
                  <div className="space-y-3">
                    {activeChatData.messages.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          msg.sender === currentUser.email
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-xs md:max-w-md p-3 ${
                            msg.sender === currentUser.email
                              ? "bg-blue-600 text-white chat-bubble-right"
                              : "bg-white border chat-bubble-left"
                          }`}
                        >
                          <div className="text-sm">{msg.text}</div>
                          <div
                            className={`text-xs mt-1 ${
                              msg.sender === currentUser.email
                                ? "text-blue-100"
                                : "text-gray-500"
                            }`}
                          >
                            {msg.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 border-t">
                  <div className="flex">
                    <Input
                      type="text"
                      className="flex-grow px-4 py-2 border rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleSendMessage()
                      }
                    />
                    <Button
                      onClick={handleSendMessage}
                      className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
                    >
                      <i className="fas fa-paper-plane"></i>
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-grow flex items-center justify-center text-gray-500">
                Select a conversation to start chatting
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
