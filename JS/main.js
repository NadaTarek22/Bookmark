var siteName = document.querySelector('#siteName');
var siteURL = document.querySelector('#siteURL');

var arrayOfSites= [];

var submitBtn= document.querySelector(".submitBtn");
submitBtn.addEventListener('click' , addElements);

if(localStorage.getItem('Sites') != null){

    arrayOfSites = JSON.parse(localStorage.getItem('Sites'));
    displayTable();
    
};


siteName.addEventListener("input", ()=>{
  siteName.value= siteName.value[0].toUpperCase() + siteName.value.slice(1);
});

function addElements() {

  if(validateSiteName() == true && validateUrl() == true){
    var site = {
      name: siteName.value,
      url:  siteURL.value
    };
    
    arrayOfSites.push(site);
        
    localStorage.setItem('Sites',JSON.stringify(arrayOfSites) );

   console.log(arrayOfSites);
 
    displayTable();
    clearAllValues();
  } 
  else{
    var myModal = new bootstrap.Modal(document.getElementById('exampleModal'), { 
      keyboard: false 
    }) 
    myModal.show()
  };
  
};

function clearAllValues(){
  siteName.value= '';
  siteURL.value = '';
};

function displayTable(){
  cartona = '';

  for (var i=0 ; i<arrayOfSites.length ; i++){
      cartona += `
        <tr>
        <td>${i+1}</td>
        <td>${arrayOfSites[i].name}</td>
        <td>
          <button onclick=" window.open('${arrayOfSites[i].url}');"  id="btn1" class="btn btn1">
            <i class="fa-solid fa-eye pe-2"></i>
            Visit
          </button>
        </td>
        <td>
          <button onclick="deleteElements(${i})" id="btn2" class="btn pe-2 btn2">
            <i class="fa-solid fa-trash-can"></i>
            Delete
          </button>
        </td>
      </tr>
        `
    }
  document.getElementById('tbody').innerHTML = cartona
};

function deleteElements(indexNum){
  arrayOfSites.splice(indexNum , 1);
  displayTable();
  localStorage.setItem('Sites',JSON.stringify(arrayOfSites) );
    
};

function validateSiteName() {
  if(!siteName.value.match(/^[a-zA-Z0-9]{3,}$/)){
    document.getElementById("invalidImg").innerHTML=
    `
    <img class="w-5 position-absolute " src="imgs/invalid.svg" alt="">
    `;
    document.getElementById("validImg").innerHTML="";

    siteName.style.borderColor= "#dc3545";
    siteName.style.boxShadow= "0 0 0 .25rem rgba(220, 53, 69, .25)";
    return false;
  }else{
    document.getElementById("invalidImg").innerHTML="";
    document.getElementById("validImg").innerHTML=
    `
    <img class="w-5 position-absolute " src="imgs/valid.svg" alt="">
    `;
    siteName.style.borderColor= "#198754";
    siteName.style.boxShadow= "0 0 0 .25rem rgba(25, 135, 84, .25)";
    return true;
  }
};

function validateUrl() {
  if(!siteURL.value.match(/^(https?:\/\/)?(WWW\.)?[a-zA-Z]{4,}\.[a-zA-Z]{2,5}\/?$/i)){
    document.getElementById("invalidImg2").innerHTML=
    `
    <img class="w-6 position-absolute " src="imgs/invalid.svg" alt="">
    `;
    document.getElementById("validImg2").innerHTML="";
    siteURL.style.borderColor= "#dc3545";
    siteURL.style.boxShadow= "0 0 0 .25rem rgba(220, 53, 69, .25)";
    return false;
  }
  else{
    document.getElementById("invalidImg2").innerHTML="";
    document.getElementById("validImg2").innerHTML=
    `
    <img class="w-6 position-absolute " src="imgs/valid.svg" alt="">
    `;
    siteURL.style.borderColor= "#198754";
    siteURL.style.boxShadow= "0 0 0 .25rem rgba(25, 135, 84, .25)";
    return true;
  }
};





