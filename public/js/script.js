// check time
function ctime() {
let dt = new Date();
document.getElementById("datetime").innerHTML = (("0"+(dt.getMonth()+1)).slice(-2)) +"/"+ 
(("0"+dt.getDate()).slice(-2)) +"/"+ (dt.getFullYear()) +" "+ dt.toLocaleTimeString();
}

//register check
function validateUser(username) {
    const regex = /[a-zA-Z0-9_\.\-]{4,}/;
    return regex.test(username);
}

function validatePass(password) {
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    return regex.test(password);
}

function validateEmail(email) {
    const emailRegex = /^[\w\.\-]+@[a-zA-Z0-9\.]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
}

function errorMsg(){
    document.getElementById('errors').innerHTML = 'Please input a valid username, password and email';
}

/*
//edit
async function usernameCheck(name){
    const p = document.getElementById('username').nextElementSibling.nextElementSibling;
    const exist = document.getElementById('exist');
    return fetch('/dataCheck',{
        method:"POST",
        body:new URLSearchParams(`username=${name}`)
    })
    .then(function(response) {
        if(response.status != 200){
          console.log('response error');
        }else{
          console.log(('reponse ok'));
        };
          return response.json();
    })
    .then(function(data) {  //傳回來的資料
        news = await data.length;
        console.log(data.length);
        if(data.length>=1){
            p.innerHTML = "User name exist, please retry.."
            p.style.color = "red";
            exist.innerHTML = "exist";
        }else{
            exist.innerHTML = "ok";
            if (validateUser(name)){
                p.innerHTML = "Correct"
                p.style.color = "green";
            }else{
                 p.innerHTML = "Incorrect;"
                p.style.color = "red";
            }
        }
    });
}







//edit*/




function registerCheck(){
    let username = document.querySelector('form>fieldset>input[name=username]');
    let pass = document.querySelector('form>fieldset>input[name=password]');
    let email = document.querySelector('form>fieldset>input[name=email]');
    let exist = document.getElementById('exist').innerHTML;
    if(exist == "ok" && validateUser(username.value) && validatePass(pass.value) && validateEmail(email.value)){
        console.log("ok, send!")
    }else{   
        console.log(exist +" name " + validateUser(username.value) + " pw " + validatePass(pass.value)+" email " + validateEmail(email.value))
        errorMsg();
        event.preventDefault(); 
    }
    
}



function usernameCheck(name){
    const p = document.getElementById('username').nextElementSibling.nextElementSibling;
    const exist = document.getElementById('exist');
    fetch('/dataCheck',{
        method:"POST",
        body:new URLSearchParams(`username=${name}`)
    })
    .then(function(response) {
        if(response.status != 200){
          console.log('response error');
        }else{
          console.log(('reponse ok'));
        };
          return response.json();
    })
    .then(function(data) {  //傳回來的資料
       
        console.log(data.length);
        if(data.length>=1){
            p.innerHTML = "User name exist, please retry.."
            p.style.color = "red";
            exist.innerHTML = "exist";
        }else{
            exist.innerHTML = "ok";
            if (validateUser(name)){
                p.innerHTML = "Correct"
                p.style.color = "green";
            }else{
                 p.innerHTML = "Incorrect;"
                p.style.color = "red";
            }
        }
    });
}



function passwordCheck(data){
    const p = document.getElementById('password').nextElementSibling.nextElementSibling;
    if (validatePass(data)){
        p.innerHTML = "Correct"
        p.style.color = "green";
    }else{
         p.innerHTML = "Incorrect"
        p.style.color = "red";
    }
}


function emailCheck(data){
    const p = document.getElementById('email').nextElementSibling.nextElementSibling;
    if (validateEmail(data)){
        p.innerHTML = "Correct"
        p.style.color = "green";
    }else{
         p.innerHTML = "Incorrect"
        p.style.color = "red";
    }
}




//preview image
function readURL(input){
    if(input.files && input.files[0]){
        //console.log(input.files);
        let imageTagID = input.getAttribute("targetID");
        //console.log(imageTagID);
        let reader = new FileReader();
        reader.onload = function (e) {
            let img = document.getElementById(imageTagID);
            //console.log(img);
            img.setAttribute("src", e.target.result)
        }
      reader.readAsDataURL(input.files[0]);
    }
}

//add create button
function createBtn(){
    const element = document.querySelector('p[class=title]');
	const link = document.createElement('a');
	link.setAttribute('href','/create');
	const abtn = document.createElement('button');
	abtn.innerText = 'create'
	abtn.setAttribute('class','button btn-blue');
	abtn.style.fontSize='20';
	abtn.style.margin='10px';
	link.appendChild(abtn);
	element.after(link);
}

//add update button
function updateBtn(){
    const element = document.querySelectorAll('div[class=card]');
	for(let i=0; i < element.length; i++){
		const img = element[i].children[1];
		const id = img.getAttribute('alt');
		const link = document.createElement('a');
		link.setAttribute('href','/update/' + id);
		const abtn = document.createElement('button');
		abtn.innerText = 'update'
		abtn.setAttribute('class','button btn-green');
		abtn.style.fontSize='20';
		abtn.style.margin='10px 0px 0px 10px';
		link.appendChild(abtn);
		img.after(link);
	}
}

//add delete button
function deleteBtn(){
    const element = document.querySelectorAll('div[class=card]');
	for(let i=0; i < element.length; i++){
		const img = element[i].children[1];
		const id = img.getAttribute('alt');
		const link = document.createElement('a');
		link.setAttribute('href','/delete/' + id);
		const abtn = document.createElement('button');
		abtn.innerText = 'delete'
		abtn.setAttribute('class','button btn-red');
		abtn.style.fontSize='20';
		abtn.style.margin='10px 0px 0px 10px';
		link.appendChild(abtn);
		img.after(link);
	}
}

//add purchase button
function purchaseBtn(){
    /*
    const element = document.querySelector('div[class=product_details]');
	const link = document.createElement('a');
	link.setAttribute('href','./cart');
	const abtn = document.createElement('button');
	abtn.setAttribute('class','purchase btn-blue');
    const img = document.createElement('img');
    img.setAttribute('class','cart');
    img.setAttribute('src','/img/web/shopping-cart.png'); //pic
    abtn.appendChild(img);
    abtn.append('Purchases');
	link.appendChild(abtn);
    element.appendChild(link);
    */
    const element = document.querySelector('div[class=product_details]>a');
    element.classList.remove('hidden');
}

//add shopping-cart logo
function purchaseLogo(){
    /*
    const element = document.querySelector('nav>ul');
    const list = document.createElement('li');
    const link = document.createElement('a');
    link.setAttribute('href','./cart');
    const img = document.createElement('img');
    img.setAttribute('class','cart');
    img.setAttribute('src','/img/web/shopping-cart.png'); //pic 在/:id中, 加上"/"在img前,才可以正常顯示
    link.appendChild(img);
    list.appendChild(link);
    element.appendChild(list);
    */
    const element = document.querySelector('nav>ul>li[class=hidden]');
    element.classList.remove('hidden');
}

//add user control link
function adminLink(){
    const element = document.querySelector('nav>ul');
    const list = document.createElement('li');
    const link = document.createElement('a');
    const admin = document.createTextNode("Admin");
    link.appendChild(admin);
    link.setAttribute('href','/userControl');
    list.appendChild(link);
    element.insertBefore(list, element.childNodes[0]);
}

//add logout button
function logoutBtn(){
    const element = document.querySelector('div[class=top-right]');
    const link = document.createElement('a');
    link.setAttribute('href','/logout');
    const abtn = document.createElement('button');
    abtn.innerText = 'Logout'
    abtn.setAttribute('class','button btn-red');
    link.appendChild(abtn);
    element.appendChild(link);
}

function welcome(){
    const element = document.querySelector('div[class=top-right]>p');
    element.style.width='400px';
    element.style.margin='0px 20px 0px 0px';
}

function removeElt(){
    const element = document.querySelector('div[class=top-right]');
    const btn = element.children.item(0);
    element.removeChild(btn);
}



// add create, update, delete button for admin login (for product view)
function cardAdmin(admin){
    if(admin == true){
        createBtn();
        deleteBtn();
        updateBtn();
    }
}

// add purchase button for user login (for detail vew)
function detail(login){
    if(login == true){
        purchaseBtn();
    }

}

//adjust view for user login
function layoutLogin(login){
    if(login == true){
        //remove login button
        removeElt();
        //remove register button
        removeElt();
        //show welcome sentence
        welcome();
        //add logout button
        logoutBtn();
        //add shopping-cart logo
        purchaseLogo();
    }
}

function adminLogin(admin){
    if(admin == true){
        adminLink();
    }
}

function sendCart(data){
    const tagID = data.getAttribute("targetID");
    console.log(tagID);
    const element = document.querySelector('div[class=product_img]>img');
    console.log(element);
    const id = element.alt;
    console.log(id);
    
    fetch('/cart',{
        method:"POST",
        body:new URLSearchParams(tagID)
    })
    .then(function(response) {
        if(response.status != 200){
          console.log('response error');
        }else{
          console.log(('reponse ok'));
        };
          return response.json();
    })
    .then(function(data) {  //傳回來的資料
       
        console.log(data);
    });
    window.location.href = '/product/' + id;

}

function addItem(data){
    const tr = data.parentNode.parentNode;
    const tagID = tr.getAttribute("targetID");
    console.log(tagID);
    
    fetch('/cart',{
        method:"POST",
        body:new URLSearchParams(tagID)
    })
    .then(function(response) {
        if(response.status != 200){
          console.log('response error');
        }else{
          console.log(('reponse ok'));
        };
          return response.json();
    })
    .then(function(data) {  //傳回來的資料
       
        console.log(data);
    });
    window.location.href = '/cart';

}

function reduceItem(data){
    const tr = data.parentNode.parentNode;
    const tagID = tr.getAttribute("targetID");
    console.log(tagID);
    
    fetch('/reduceCart',{
        method:"POST",
        body:new URLSearchParams(tagID)
    })
    .then(function(response) {
        if(response.status != 200){
          console.log('response error');
        }else{
          console.log(('reponse ok'));
        };
          return response.json();
    })
    .then(function(data) {  //傳回來的資料
       
        console.log(data);
    });
    window.location.href = '/cart';

}

function deleteItem(data){
    const tr = data.parentNode.parentNode;
    const tagID = tr.getAttribute("targetID");
    console.log(tagID);
    
    fetch('/deleteCart',{
        method:"POST",
        body:new URLSearchParams(tagID)
    })
    .then(function(response) {
        if(response.status != 200){
          console.log('response error');
        }else{
          console.log(('reponse ok'));
        };
          return response.json();
    })
    .then(function(data) {  //傳回來的資料
       
        console.log(data);
    });
    window.location.href = '/cart';

}