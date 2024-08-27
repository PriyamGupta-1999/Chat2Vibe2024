const comment=require('../models/comment')
module.exports.chatSockets= function(socketServer){
    let io=require('socket.io')(socketServer,{
        
            cors: {
                origin: "http://54.177.111.108",
                method: ['GET','POST']
              }
          
    }); //handling the connecntions

    //this going to be fired when io.connect in chat engine 
    io.on('connection',function(socket){
        console.log('new connection recieved',socket.id);
        
        socket.on('disconnect', function(){
            console.log('socket disconnected');

         })

         socket.on('join_room', function(data){
             console.log('joining request rec. ', data);
             socket.join(data.chatroom); // if the chatroom with this name exist then user will be entered
             // if not new one will be created
            //  now other in chatroom should get notification that new have join the room to all the users in chat room
            // for that we will be usign the emit
            io.in(data.chatroom).emit('user_joined',data);
            
            
         })

         socket.on('send_message', function(data){
             io.in(data.chatroom).emit('receive_message',data);
         })
    })

    //when we click on someone name we need to create the room where another user comes and chat
    //when other user comes there is notification 



}