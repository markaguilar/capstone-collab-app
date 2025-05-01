export const conversations = [
  {
    id: 1,
    user: "Alex Johnson",
    lastMessage: "I've completed the first prototype of the homepage...",
    time: "2 hours ago",
    unread: true,
    messages: [
      {
        id: 1,
        sender: "them",
        text: "Hi there! I'm interested in your project.",
        time: "10:30 AM",
      },
      {
        id: 2,
        sender: "me",
        text: "Great! What experience do you have with React?",
        time: "10:32 AM",
      },
      {
        id: 3,
        sender: "them",
        text: "I've been working with React for 3 years now.",
        time: "10:35 AM",
      },
      {
        id: 4,
        sender: "them",
        text: "I've completed the first prototype of the homepage, would you like to see it?",
        time: "12:15 PM",
      },
    ],
  },
  {
    id: 2,
    user: "Sam Wilson",
    lastMessage: "The deadline is approaching, do you need any changes?",
    time: "1 day ago",
    unread: false,
    messages: [
      {
        id: 1,
        sender: "them",
        text: "Hello! I saw your proposal and it looks good.",
        time: "Yesterday",
      },
      {
        id: 2,
        sender: "me",
        text: "Thanks! When can you start?",
        time: "Yesterday",
      },
      {
        id: 3,
        sender: "them",
        text: "I can start next Monday.",
        time: "Yesterday",
      },
      {
        id: 4,
        sender: "them",
        text: "The deadline is approaching, do you need any changes?",
        time: "Yesterday",
      },
    ],
  },
  {
    id: 3,
    user: "Taylor Smith",
    lastMessage:
      "Let me know if you have any questions about the requirements.",
    time: "3 days ago",
    unread: false,
    messages: [
      {
        id: 1,
        sender: "them",
        text: "Hi, I'm the student who posted the project.",
        time: "3 days ago",
      },
      {
        id: 2,
        sender: "me",
        text: "Nice to meet you! I had a few questions about the requirements.",
        time: "3 days ago",
      },
      { id: 3, sender: "them", text: "Sure, ask away!", time: "3 days ago" },
      {
        id: 4,
        sender: "them",
        text: "Let me know if you have any questions about the requirements.",
        time: "3 days ago",
      },
    ],
  },
];
