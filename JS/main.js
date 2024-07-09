let siteName = document.querySelector('#siteName');
let siteURL = document.querySelector('#siteURL');

let arrayOfSites= [];

let submitBtn= document.querySelector(".submitBtn");
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


//validation of site name
function validateSiteName() {
  if(!siteName.value.match(/^[a-zA-Z0-9]{3,}$/)){
    document.querySelector('#siteName').classList.add('is-invalid')
    document.querySelector('#siteName').classList.remove('is-valid')
    return false;
  }else{
    document.querySelector('#siteName').classList.add('is-valid')
    document.querySelector('#siteName').classList.remove('is-invalid')
    return true;
  }
};


//validation of site URL
function validateUrl() {
  if(!siteURL.value.match(/^(https?:\/\/)?(WWW\.)?[a-zA-Z]{4,}\.[a-zA-Z]{2,5}\/?$/i)){
    document.querySelector('#siteURL').classList.add('is-invalid')
    document.querySelector('#siteURL').classList.remove('is-valid')
    return false;
  }
  else{
    document.querySelector('#siteURL').classList.add('is-valid')
    document.querySelector('#siteURL').classList.remove('is-invalid')
    return true;
  }
};





