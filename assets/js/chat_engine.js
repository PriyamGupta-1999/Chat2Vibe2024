//front end 


class ChatEngine{
    constructor(chatBoxId, userEmail,chatRoom,reciever){
        console.log(chatRoom);
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;
        this.chatroom= chatRoom
        this.reciever=reciever
        this.socket = io.connect('http://54.177.111.108:5000');
        
        if (this.userEmail){
            this.connectionHandler();
        }

    }


    connectionHandler(){
        let self=this;

        
        this.socket.on('connect', function(){
            console.log('connection established using sockets...!');
            
            //we will create the room and this will be recieverd on chat sockets 
            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom: self.chatroom,
            })

            self.socket.emit('join_room', {
                user_email: self.reciever,
                chatroom: self.chatroom,

                
            })

            //to recieve use on
            // to give use emit
            self.socket.on('user_joined',function(data){
                console.log('a user joined!', data);
                
            })
        });

        $('#send-message').click(function(){
            // console.log('jhjjfpajdp;jnfdk');
            let msg=$('#chat-message-input').val();
            $('#chat-message-input').val('');
            console.log(msg);
            if(msg !=''){
                self.socket.emit('send_message',{
                    message: msg,
                    user_email:self.userEmail,
                    chatroom: self.chatroom,
                    reciever: self.reciever,
                })
            }
        });

        self.socket.on('receive_message', function(data){
            if(self.userEmail==data.reciever){
                console.log('recieved something ');
                console.log('message recievd', data.message);

                let newMessage = $('<li>');

                let messageType='other-message';

                if(data.user_email== self.userEmail){
                    messageType='self-message';
                }

                newMessage.append($('<span>',{
                    'html': data.message
                }));

                newMessage.append($('<sub>',{
                    'html': data.user_email
                }))

                newMessage.addClass(messageType);

                $('#chat-messages-list').append(newMessage);
            }else if(data.user_email== self.userEmail){
                let newMessage = $('<li>');
                let messageType='self-message';
                newMessage.append($('<span>',{
                    'html': data.message
                }));

                newMessage.append($('<sub>',{
                    'html': data.user_email
                }))

                newMessage.addClass(messageType);

                $('#chat-messages-list').append(newMessage);
            }
            

        })
    }
}