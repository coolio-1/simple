var socket = io();
var x=0;
var y=0;
function enterName()
{
var name=$('#name').val();
socket.emit('chatMessage', 'System', '<b>' + name + '</b> has joined the discussion');
document.getElementById("form1").style.display="none";
document.getElementById("form2").style.visibility="visible";
document.getElementById("messages").style.height="630px";

return false;
}
 
function submitfunction()
{
  var from = $('#name').val();
  var message = $('#m').val();
  if(message != '') {
  socket.emit('chatMessage', from, message);
}
$('#m').val('').focus();
  return false;
}
 
function notifyTyping() 
{ 
  var user = $('#name').val();
  socket.emit('notifyUser', user);
}
 
socket.on('chatMessage', function(from, msg)
{
  var me = $('#name').val();
  var color = (from == me) ? 'black' :'black';
  var from = (from == me) ? 'Me' : from;
if(from=='Me'){
  $('#messages').append('<div><p class="oval-speech"><font size=5><b style="color:' + color + '">' + from + '</b>: ' + msg + '</font></p><div>');
  $('messages').append('<br>');
(document.getElementsByClassName("oval-speech")[x]).style.float='right';
  (document.getElementsByClassName("oval-speech")[x++]).style.clear='right';
  $('#messages').animate({scrollTop: $('#messages').prop("scrollHeight")}, 500);}
else{
$('#messages').append('<div><p class="oval-speech1"><font size=5><b style="color:' + color + '">' + from + '</b>: ' + msg + '</font></p><div>');
$('messages').append('<br>');
(document.getElementsByClassName("oval-speech1")[y]).style.float='left';
(document.getElementsByClassName("oval-speech1")[y++]).style.clear='left';
  $('#messages').animate({scrollTop: $('#messages').prop("scrollHeight")}, 500);
}

 
});
 
socket.on('notifyUser', function(user){
  var me = $('#user').val();
  if(user != me) {
    $('#notifyUser').text(user + ' is typing ...');
  }
  setTimeout(function(){ $('#notifyUser').text(''); }, 10000);;
});
 
$(document).ready(function()
{
document.getElementById("name").value="";
 
});
 

