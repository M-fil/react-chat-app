export enum SocketEvents {
  ReceiveMessage = 'message',
  SendMessage = 'sendMessage',
  Connect = 'connect',
  Disconnect = 'disconnect',
  Error = 'error',
  CreateConversation = 'conversationCreate',
  AdminJoinToConversation = 'adminJoin',
}