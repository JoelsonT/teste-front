///////////////////////////////////////////////////////////////////////////////////////////////////////
//        LINK PARA A PAGINA DE CADASTRO
///////////////////////////////////////////////////////////////////////////////////////////////////////

function pgAccount(event) {
    event.preventDefault();
    location.href = 'http://127.0.0.1:5500/htm/account.html';
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
//        CADASTRO
///////////////////////////////////////////////////////////////////////////////////////////////////////

function registerAccount(event) {
    event.preventDefault();

    const logUser = document.getElementById("userRegister");
    const logPassword = document.getElementById("passRegister");
    const logPassword2 = document.getElementById("passRegister2");

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = {
        name: logUser.value,
        pass: logPassword.value
    };

    users.push(user);

    if (logPassword.value != logPassword2.value) {
        alert("Senhas não conferem");
    } else {
        localStorage.setItem('users', JSON.stringify(users));
        alert("Usuário Criado com sucesso!");
        location.href = "http://127.0.0.1:5500/index.html";

    };

};

///////////////////////////////////////////////////////////////////////////////////////////////////////
//        LOGAR
///////////////////////////////////////////////////////////////////////////////////////////////////////

function logar(event) {
    event.preventDefault();

    const loginUser = document.getElementById("user").value;
    const loginPassword = document.getElementById("pass").value;

    const logUsers = JSON.parse(localStorage.getItem('users')) || [];

    for (let user of logUsers) {

        document.getElementById('logged').classList.remove('red');

        if (loginUser === user.name && loginPassword === user.pass) {
            document.getElementById('logged').innerHTML = "Usuário logado com sucesso";
            document.getElementById('logged').classList.add('green');
            location.href = 'http://127.0.0.1:5500/htm/errands.html';

        } else {
            document.getElementById('logged').innerHTML = "Usuário/senha incorreto ou em branco";
            document.getElementById('logged').classList.add('red');

        };

    };

};

///////////////////////////////////////////////////////////////////////////////////////////////////////
//        SALVAR RECADO
///////////////////////////////////////////////////////////////////////////////////////////////////////
    

const cadastros = JSON.parse(localStorage.getItem('cadastros')) || [];

const description = document.getElementById('inpDescription').value;
const detail = document.getElementById('inpDetail').value;

function salvarRecado(event) {
    event.preventDefault();

    const cadastros = JSON.parse(localStorage.getItem('cadastros')) || [];

    const description = document.getElementById('inpDescription').value;
    const detail = document.getElementById('inpDetail').value;
       
    //document.getElementById('error').innerHTML = "";

    if (description.length <= 3 || detail.length <= 3) {
        document.getElementById('error').innerHTML = "* Preencha os campos corretamente para salvar!";
        return false;
    };

    const cadastro = {
        description: description,
        detail: detail
    };

    cadastros.push(cadastro);
    localStorage.setItem('cadastros', JSON.stringify(cadastros));
    
    mostraRecados();
};

function mostraRecados(){
    tableErrands.innerHTML='';

    for(let item of cadastros){
        
        //console.log(item);
        let position = cadastros.indexOf(item);

        const tr = document.createElement('tr');
        const th = document.createElement('th');
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const delButton = document.createElement('div');
        const editButton = document.createElement('div');

        th.setAttribute('scope', 'row');
        delButton.setAttribute('type', 'button');
        delButton.setAttribute('class', 'btn btn-outline-primary rounded-3 me-2')
        delButton.setAttribute('onclick',`delCadastros(${position})`);
        editButton.setAttribute('type', 'button');
        editButton.setAttribute('class', 'btn btn-outline-danger rounded-3 me-2');
        editButton.setAttribute('onclick',`editCadastros(${position})`);

        

        tableErrands.appendChild(tr);
        tr.appendChild(th);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(editButton);
        tr.appendChild(delButton);

        th.innerText = position +1;
        td1.innerText = item.description;
        td2.innerText = item.detail;
        delButton.innerText = ' Apagar ';
        editButton.innerText = ' Editar ';

    };

};
mostraRecados();

///////////////////////////////////////////////////////////////////////////////////////////////////////
//        APAGAR RECADO
///////////////////////////////////////////////////////////////////////////////////////////////////////
function delCadastros(position){
   //cadastros.splice(position, 2);
   //localStorage.removeItem(position);

   /* Não saiu*/

   cadastros[position].remove;
              
   console.log(`esta e minha posição: ${position}`);
   
};


///////////////////////////////////////////////////////////////////////////////////////////////////////
//        EDITAR RECADO
///////////////////////////////////////////////////////////////////////////////////////////////////////
function editCadastros(position){
    event.preventDefault();
    /* Não saiu - tive a ideia de usar os mesmos inputs para edição...cheguei a colocar mais um botão...aí deu nó.*/

    document.getElementById('inpDescription').value = cadastros[position].description;
    document.getElementById('inpDetail').value = cadastros[position].detail;

    cadastros[position].description = document.getElementById('inpDescription').value;
    cadastros[position].detail = document.getElementById('inpDetail').value;

};