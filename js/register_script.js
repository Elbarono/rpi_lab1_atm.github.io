function register() {
    let bg_layer = document.createElement('div')
    bg_layer.className = "bg_layer"
    bg_layer.id = "bg"

    let model = document.createElement('div')
    model.className = "modal"

    let header = document.createElement('div')
    header.className = "headeregister"

    let text = document.createElement('span')
    text.textContent = "Register"
    text.className = "headerstext"

    let line = document.createElement('div');
    line.className = 'register_line';

    let exit = document.createElement('button')
    exit.className = "exit"
    exit.onclick = function() { closemodel() }

    let smart = document.createElement("i")
    smart.className = "fa-solid fa-times"

    let formInput = document.createElement('div');
    formInput.className= 'form_input';

    let nameInput = document.createElement('div');
    nameInput.className= 'user_input';

    let emailInput = document.createElement('div');
    emailInput.className= 'user_input';

    let phoneInput = document.createElement('div');
    phoneInput.className= 'user_input';

    let Nametext = document.createElement("p")
    Nametext.className = "textregister"
    Nametext.textContent = "Name"


    let Emailtext = document.createElement("p")
    Emailtext.className = "textregister"
    Emailtext.textContent = "Email"

    let Phonetext = document.createElement("p")
    Phonetext.className = "textregister"
    Phonetext.textContent = "Phone"

    let Nameinput = document.createElement("input")
    Nameinput.type = "text"
    Nameinput.id = "Name"
    Nameinput.className = "inputregister"
    Nameinput.onchange = function () { validinput() }

    let Emailinput = document.createElement("input")
    Emailinput.type = "text"
    Emailinput.id = "Email"
    Emailinput.className = "inputregister"
    Emailinput.onchange = function () { validinput() }

    let Phoneinput = document.createElement("input")
    Phoneinput.type = "text"
    Phoneinput.id = "Phone"
    Phoneinput.className = "inputregister"
    Phoneinput.onchange = function () { validinput() }

    let send = document.createElement('button')
    send.className = "send"
    send.onclick = function () { tryregister() }
    send.id = "Send"
    send.disabled = true

    send.textContent = "Send"

    exit.appendChild(smart)
    header.appendChild(text)
    header.appendChild(exit)
    model.appendChild(header)
    header.appendChild(line);

    model.appendChild(formInput);
    formInput.appendChild(nameInput);
    formInput.appendChild(emailInput);
    formInput.appendChild(phoneInput);

    nameInput.appendChild(Nametext)
    nameInput.appendChild(Nameinput)

    emailInput.appendChild(Emailtext)
    emailInput.appendChild(Emailinput)

    phoneInput.appendChild(Phonetext)
    phoneInput.appendChild(Phoneinput)

    formInput.appendChild(send)

    bg_layer.appendChild(model)

    let content = document.getElementById('content')
    content.appendChild(bg_layer)
}

function closemodel() {
    let needit = document.getElementById("bg")
    needit.remove()
}

function validinput() {
    let Name = document.getElementById('Name').value
    let Email = document.getElementById('Email').value
    let Phone = document.getElementById('Phone').value
    Name = Name.trim()
    Email = Email.trim()
    Phone = Phone.trim()
    if ((/[a-zA-Z_ ]{5,20}/.test(Name))&&(/[a-z.A-Z]+@[a-z.A-Z]+\.[a-z.A-Z]+/.test(Email))&&(/^\+(\d){10,14}$/.test(Phone))) {//
        document.getElementById('Send').disabled = false
    } else {
        document.getElementById('Send').disabled = true
    }
}

function tryregister() {
    let needit = document.getElementById("bg")
    let Name = document.getElementById('Name').value
    Name = Name.trim()
    needit.firstChild.remove()
    let success_message = document.createElement('div')
    success_message.className = "success"
    let Text = document.createElement("p")
    Text.className = "textregister"
    Text.textContent = "Your registration was successful."

    success_message.appendChild(Text)
    needit.appendChild(success_message)

    setTimeout( function () {
        document.getElementById('register').remove()
        let account = document.getElementById('account')
        account.textContent = Name
        let log = document.getElementById('log_out')
        log.textContent = "Log out"
        log.onclick = function () { log_out() }
        document.cookie = 'User='+Name+'; max-age=60'
        needit.remove()
    }, 5000)
}

function log_out() {
    document.cookie = 'User=; max-age=-1'
    location.reload()
}

if (document.cookie != '') {
    let Name = document.cookie.split('=')
    for (let i=0; i < Name.length; i+=2 ) {
        if (Name[i] == 'User') {
            let account = document.getElementById('account')
            document.getElementById('register').remove()
            account.textContent = Name[i+1]
            let log = document.getElementById('log_out')
            log.textContent = "Log out"
            log.onclick = function () { log_out() }
        }
    }
}
