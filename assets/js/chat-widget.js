// Chat Widget & Floating Buttons
$(document).ready(function() {
    var chatHTML = `
    <div class="floating-widgets">
        <div class="float-btn chat" id="toggleChat">
            <i class="far fa-comments"></i>
        </div>
        <a href="https://wa.me/5531992730127" target="_blank" class="float-btn whatsapp">
            <i class="fab fa-whatsapp"></i>
        </a>
    </div>

    <div class="chat-window" id="chatWindow">
        <div class="chat-header">
            Famita Tambores
            <button id="closeChat"><i class="fas fa-times"></i></button>
        </div>
        <div class="chat-body" id="chatBody">
            <div class="chat-msg bot">Olá! Em breve estarei pronto para tirar suas dúvidas sobre a Famita!</div>
        </div>
        <div class="chat-footer">
            <input type="text" id="chatInput" placeholder="Digite uma mensagem...">
            <button id="sendChat"><i class="fas fa-paper-plane"></i></button>
        </div>
    </div>
    `;
    $('body').append(chatHTML);

    $('#toggleChat, #closeChat').on('click', function(e) {
        e.preventDefault();
        $('#chatWindow').toggleClass('active');
    });

    function sendMessage() {
        var msg = $('#chatInput').val().trim();
        if(msg !== "") {
            $('#chatBody').append('<div class="chat-msg user">' + msg + '</div>');
            $('#chatInput').val('');
            $('#chatBody').scrollTop($('#chatBody')[0].scrollHeight);
            
            setTimeout(function() {
                $('#chatBody').append('<div class="chat-msg bot">Olá! Em breve estarei pronto para tirar suas dúvidas sobre a Famita!</div>');
                $('#chatBody').scrollTop($('#chatBody')[0].scrollHeight);
            }, 1000);
        }
    }

    $('#sendChat').on('click', sendMessage);
    $('#chatInput').on('keypress', function(e) {
        if(e.which == 13) sendMessage();
    });
});
