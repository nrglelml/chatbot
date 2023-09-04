$(document).ready(function () {
    const chatboxMessageWrapper = document.querySelector('.chatbox-message-content');

    $('#messageArea').submit(function (e) {
        e.preventDefault();
        var user_input = $('#text').val();
        $.ajax({
            type: "POST",
            url: "/gpt",
            data: { user_input: user_input },
            success: function (data) {
                var botHtml = '<div class="chatbox-message-item received">' +
                              '<span class="chatbox-message-item-text">' +
                              'Assistant: ' + data.content +
                              '</span>' +
                              '<span class="chatbox-message-item-time">' + getCurrentTime() + '</span>' +
                              '</div>';
                chatboxMessageWrapper.insertAdjacentHTML('beforeend', botHtml);
                scrollBottom();
            },
            error: function () {
                alert("Bir hata oluştu, lütfen tekrar deneyin.");
            },
        });
        $('#text').val(''); // Mesajı gönderdikten sonra giriş alanını temizle
        loadingDiv.style.display = 'flex'; // Gönderilen mesajdan sonra yükleniyor görselini göster
    });
});

// MESSAGE INPUT
const textarea = document.querySelector('.chatbox-message-input');
const chatboxForm = document.querySelector('.chatbox-message-form');

textarea.addEventListener('input', function () {
    let line = textarea.value.split('\n').length;

    if (textarea.rows < 6 || line < 6) {
        textarea.rows = line;
    }

    if (textarea.rows > 1) {
        chatboxForm.style.alignItems = 'flex-end';
    } else {
        chatboxForm.style.alignItems = 'center';
    }
});

const loadingDiv = document.getElementById('loading');

chatboxForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (isValid(textarea.value)) {
        writeMessage();
        loadingDiv.style.display = 'flex'; // Gönderilen mesajdan sonra yükleniyor görselini göster
        setTimeout(autoReply, 1000);
    }
});

function autoReply() {
    const today = new Date();
    let message = `
    <div class="chatbox-message-item received">
        <span class="chatbox-message-item-text">
        Thank you for your awesome support!
        </span>
        <span class="chatbox-message-item-time">${addZero(
            today.getHours()
        )}:${addZero(today.getMinutes())}</span>
    </div>
    `;
    chatboxMessageWrapper.insertAdjacentHTML('beforeend', message);
    loadingDiv.style.display = 'none'; // Cevap geldiğinde yükleniyor görselini gizle
    scrollBottom();
}

// TOGGLE CHATBOX
const chatboxToggle = document.querySelector('.chatbox-toggle');
const chatboxMessage = document.querySelector('.chatbox-message-wrapper');

chatboxToggle.addEventListener('click', function () {
    chatboxMessage.classList.toggle('show');
});

// DROPDOWN TOGGLE
const dropdownToggle = document.querySelector('.chatbox-message-dropdown-toggle');
const dropdownMenu = document.querySelector('.chatbox-message-dropdown-menu');

dropdownToggle.addEventListener('click', function () {
    dropdownMenu.classList.toggle('show');
});

document.addEventListener('click', function (e) {
    if (!e.target.matches('.chatbox-message-dropdown, .chatbox-message-dropdown *')) {
        dropdownMenu.classList.remove('show');
    }
});

// CHATBOX MESSAGE
const chatboxMessageWrapper = document.querySelector('.chatbox-message-content');
const chatboxNoMessage = document.querySelector('.chatbox-message-no-message');

chatboxForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (isValid(textarea.value)) {
        writeMessage();
        setTimeout(autoReply, 1000);
    }
});

function addZero(num) {
    return num < 10 ? '0' + num : num;
}

function writeMessage() {
    const today = new Date();
    let message = `
    <div class="chatbox-message-item sent">
        <span class="chatbox-message-item-text">
        ${textarea.value.trim().replace(/\n/g, '<br>\n')}
        </span>
        <span class="chatbox-message-item-time">${addZero(today.getHours())}:${addZero(today.getMinutes())}</span>
    </div>
    `;
    chatboxMessageWrapper.insertAdjacentHTML('beforeend', message);
    chatboxForm.style.alignItems = 'center';
    textarea.rows = 1;
    textarea.focus();
    textarea.value = '';
    chatboxNoMessage.style.display = 'none';
    scrollBottom();
}

function scrollBottom() {
    chatboxMessageWrapper.scrollTo(0, chatboxMessageWrapper.scrollHeight);
}

function isValid(value) {
    let text = value.replace(/\n/g, '');
    text = text.replace(/\s/g, '');

    return text.length > 0;
}
