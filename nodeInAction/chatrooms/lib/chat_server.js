var socketio        = require('socket.io'),
    io,
    guestNumber     = 1,
    nickNames       = {},
    namesUserd      = [],
    currentRoom     = {};

exports.listen = function(server) {
    io = socketio.listen(server);

    io.set('log lever', 1);
    io.sockets.on('connection', function(socket) {
        // 分配用户昵称
        guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUserd);
        // 进入聊天室
        joinRoom(socket, 'Lobby');
        handleMessageBroadcasting(socket, nickNames);
        handleNameChangeAttempts(socket, nickNames, namesUserd);
        handleRoomJoining(socket);

        socket.on('rooms', function() {
            socket.emit('rooms', io.socket.manager.rooms);
        });

        handleClientDisconnection(socket, nickNames, namesUserd);
    });
};

function handleClientDisconnection(socket) {
    socket.on('disconnect', function() {
        var nameIndex = namesUsed.indexOf(nickNames[socket.id]);
        delete namesUsed[nameIndex];
        delete nickNames[socket.id];
    });
}

function handleRoomJoining(socket) {
    socket.on('join', function(room) {
        socket.leave(currentRoom[socket.id]);
        joinRoom(socket, room.newRoom);
    });
}

function handleMessageBroadcasting(socket) {
    socket.on('message', function (message) {
        socket.broadcast.to(message.room).emit('message', {
            text: nickNames[socket.id] + ': ' + message.text
        });
    });
}

function handleNameChangeAttempts(socket, nickNames, namesUsed) {
    socket.on('nameAttempt', function(name) {　　 //添加nameAttempt事件的监听器
        if (name.indexOf('Guest') == 0) {  //昵称不能以Guest开头
            socket.emit('nameResult', {
                success: false,
                message: 'Names cannot begin with "Guest".'
            });
        } else {
            if (namesUsed.indexOf(name) == -1) {  //如果昵称还没注册就注册上
                var previousName = nickNames[socket.id];
                var previousNameIndex = namesUsed.indexOf(previousName);
                namesUsed.push(name);
                nickNames[socket.id] = name;
                delete namesUsed[previousNameIndex];  //删掉之前用的昵称，让其他用户可以使用
                socket.emit('nameResult', {
                    success: true,
                    name: name
                });
                socket.broadcast.to(currentRoom[socket.id]).emit('message', {
                    text: previousName + ' is now known as ' + name + '.'
                });
            } else {
                socket.emit('nameResult', {  //如果昵称已经被占用，给客户端发送错误消息
                    success: false,
                    message: 'That name is already in use.'
                });
            }
        }
    });
}


function joinRoom(socket, room) {
    socket.join(room);
    currentRoom[socket.id] = room;
    socket.emit('joinResult', {room: room});

    socket.broadcast.to(room).emit('message', {
        text: nickNames[socket.id] + 'hasJoined ' + room + '.'
    });

    var usersInRoom = io.sockets.clients(room);
    if(usersInRoom.length > 1) {
        var usersInRoomSummary = 'Users currently in ' + room + ': ';
        for(var index in usersInRoom) {
            var userSocketId = usersInRoom[index].id;
            if(userSocketId != socket.id) {
                if(index > 0) {
                    usersInRoomSummary += ', ';
                }

                usersInRoomSummary += nickNames[userSocketId];
            }
        }

        usersInRoomSummary += '.';
        socket.emit('message', {text: usersInRoomSummary});
    }
}

function assignGuestName(socket, guestNumber, nickNames, namesUserd) {
    var name = 'guest' + guestNumber;
    nickNames[socket.id] = name;
    socket.emit('nameResult', {
        success: true,
        name: name
    });

    namesUserd.push(name);
    return guestNumber + 1;
}