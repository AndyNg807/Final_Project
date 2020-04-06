// check time
function ctime() {
let dt = new Date();
document.getElementById("datetime").innerHTML = (("0"+(dt.getMonth()+1)).slice(-2)) +"/"+ 
(("0"+dt.getDate()).slice(-2)) +"/"+ (dt.getFullYear()) +" "+ dt.toLocaleTimeString();
}

//register name regex 
function validateUser(username) {
    const regex = /[a-zA-Z0-9_\.\-]{4,}/;
    return regex.test(username);
}

//register password regex
function validatePass(password) {
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    return regex.test(password);
}

//register email regex
function validateEmail(email) {
    const emailRegex = /^[\w\.\-]+@[a-zA-Z0-9\.]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
}

//check register name regex exist or not
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
    .then(function(data) {  
       
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

//check register password
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

//check register email
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

//register error message
function errorMsg(){
    document.getElementById('errors').innerHTML = 'Please input a valid username, password and email';
}

//register Check
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



//preview image (product create and update)
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

//show add to cart button
function purchaseBtn(){
    const element = document.querySelector('div[class=product_details]>a');
    element.classList.remove('hidden');
}

//show shopping-cart logo
function purchaseLogo(){
    const element = document.querySelector('nav>ul>li[class=hidden]');
    element.classList.remove('hidden');
}

//add admin link
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

//shwo welcome message
function welcome(){
    const element = document.querySelector('div[class=top-right]>p');
    element.style.width='400px';
    element.style.margin='0px 20px 0px 0px';
}

//remove login element
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

//show admin link
function adminLogin(admin){
    if(admin == true){
        adminLink();
    }
}

//add item to cart
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

//increase cart item qty
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

//reduce cart item qty
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

//delete cart item
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