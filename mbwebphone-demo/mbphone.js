const server = {
  domain: '172.21.2.210',
  wsServers: 'wss://172.21.2.210:7443',
};

const user = {
    disName: 'test 1000',
    name: '1000',
    authName: '1000',
    authPwd: 'mbstudio',
    regExpires: 180
}

var socket = new JsSIP.WebSocketInterface(server.wsServers);
var configuration = {
  sockets  : [ socket ],
  display_name: user.disName,
  uri      : 'sip:'+user.name+'@'+server.domain,
  contact_uri: 'sip:'+user.name+'@'+server.domain,
  authorization_user: user.authName,
  password : user.authPwd,
  register_expires: user.regExpires,
  user_agent: 'MBWebPhone 1.0'
};
//https://jssip.net/documentation/api/ua_configuration_parameters/#parameter_authorization_user

var myPhone = new JsSIP.UA(configuration);
myPhone.on('connected', function(e){ 
  console.log('connected');
});
myPhone.on('disconnected', function(e){ 
  console.log('disconnected');
});
myPhone.on('newRTCSession', function(e){ 
  console.log('newRTCSession');
});
myPhone.on('newMessage', function(e){ 
  console.log('newMessage');
});
myPhone.on('registered', function(e){ 
  console.log('registered');
});
myPhone.on('unregistered', function(e){ 
  console.log('unregistered');
});
myPhone.on('registrationFailed', function(e){ 
  console.log('registrationFailed');
});

myPhone.start();

var views = {
  'selfView':   document.getElementById('local-video'),
  'remoteView': document.getElementById('remote-video')
};
var eventHandlers = {
  'progress':   function(data){ 
    console.log("calling");
   },
  'failed':     function(data){ 
    console.log("call failed");
   },
  'confirmed':  function(data){ 
    console.log("call confirmed");
   },
  'ended':      function(data){ 
    console.log("call ended");
   }
};
var options = {
  'eventHandlers': eventHandlers,
  'mediaConstraints': {'audio': true, 'video': true},
  'pcConfig': {
    'iceServers': [{urls: 'stun:stun.l.google.com:19302'}]
  },
  sessionTimersExpires: 3600  //过短也会呼叫失败
};

const callee = 1002;
myPhone.call('sip:'+callee+'@'+server.domain, options);