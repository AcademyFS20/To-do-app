/**
 * Select items
 */
const alert = document.querySelector('.form__alert');
const form = document.querySelector('.form__info');
const input = document.getElementById('todo');
const submitBtn = document.querySelector('.submit');
const listItems = document.querySelector('.list__item');
const section = document.querySelector('#main');
const btnClear = document.querySelector('.clear');
const p=document.querySelector(".list__text");
/*Edit option */
let editElement;
let editFlag = false;
let editId = '';
let tab=[];


/* Events */
window.addEventListener('DOMContentLoaded',loadContent);
form.addEventListener('submit',addItem);
btnClear.addEventListener('click',clearItems);


/* functions */
function addItem(e)
{
    e.preventDefault();

    const value = input.value;

    const id = new Date().getTime().toString();
  
    if(value && !editFlag){
      let element=document.createElement('div');
      element.setAttribute('data-id',id);
      element.classList.add('list');
      element.innerHTML=`
      <div class="list__item">

                <p class="list__text">${value}</p>
                <div class="list__action">
                    <button class="list__button" id="edit">
                        <i class="fas fa-edit" class="list__button--edit"></i>
                    </button>
                    <button class="list__button delete">
                        <i class="fas fa-trash" class="list__button--delete"></i>
                    </button>
                </div>
                
            </div>`;
    section.appendChild(element);
    const deleteBtn = document.querySelectorAll(".delete");
    deleteBtn.forEach((item)=>{
      item.addEventListener("click",deleteItem);
    })

    Swal.fire({
      title: '<strong>Item Added <u></u></strong>',
      icon: 'success',
      html:
        '<b style="color:hsl(125, 67%, 44%);">Successfuly</b>, ',
      showCloseButton: true,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Great!',
      confirmButtonAriaLabel: 'Thumbs up, great!',
     
    });
    setBackToDefault("more");

    let edit=document.querySelectorAll("#edit");
          edit.forEach((item)=>{
            item.addEventListener("click",editItem);
          })
    addToLocalStorage(id,value);
    }
 
    else if(value && editFlag){
    
      let text=document.querySelectorAll(".list__text");
      function filt(item)
      {
        return item.textContent==editElement;
      }
      text=[...text];
      text=text.filter(filt);
      text[0].innerText=input.value;
      editFlag=false;
      input.value="";  

      editLocalStorage(editId,text[0].innerText);

             

    }else{

      Swal.fire(
        'The value is empty',
        '',
        'warning'
      )
}

}


function clearItems(){
  Swal.fire({
    title: 'Do you want to clear items?',
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: 'Yes',
    denyButtonText: `No`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      const list = document.querySelectorAll('.list');
      console.log(list);
      list.forEach((element)=>{
        element.remove();
        setBackToDefault('submit')
      });
      btnClear.classList.add("hidden");
      Swal.fire('The items are cleared', '', 'success')
    } else if (result.isDenied) {
      Swal.fire('The items saved', '', 'info')
    }
  }) 
}


function deleteItem(e){

  const id=this.parentElement.parentElement.parentElement;
  id.parentElement.removeChild(id);
}

function editItem(e){
  const list=e.currentTarget.parentElement.parentElement.parentElement;
 const element=this.parentElement.previousElementSibling;
 
 editElement = element.textContent;
 editId = list.dataset.id;
  editFlag=true;
  input.value = editElement;
 
}


function setBackToDefault(flag){

  input.value = "";
  submitBtn.innerText=flag;
  btnClear.classList.remove("hidden");
}

/****** Local Storage *****/
function addToLocalStorage(id,value){
  tab.push({id,value});
  const arr=JSON.stringify(tab);
  localStorage.setItem('item',arr);
  
}

function  removeFromLocalStorage(ide)
{
  let obj=getFromLocalStorage();
  function filt(item)
  {
    return item.id==ide;
  }
  let object=obj.filter(filt);
  delete object;
  // localStorage.removeItem('object[0]');
  // delete obj.object[0];
}


function editLocalStorage(ide,valu){
  const obj=getFromLocalStorage();
  function filt(item)
  {
    return item.id==ide;
  }
  const object=obj.filter(filt);
  object[0].value=valu;
  // removeFromLocalStorage(ide);
  addToLocalStorage(ide,valu);
}

function getFromLocalStorage(){
  let item=localStorage.getItem('item');
  let obj=JSON.parse(item);
  return obj;
}


function loadContent(){
let obj=getFromLocalStorage();
obj.forEach((item)=>{
  // e.preventDefault();

  // if(value && !editFlag){
    let element=document.createElement('div');
    element.setAttribute('data-id',item.id);
    element.classList.add('list');
    element.innerHTML=`
    <div class="list__item">

              <p class="list__text">${item.value}</p>
              <div class="list__action">
                  <button class="list__button" id="edit">
                      <i class="fas fa-edit" class="list__button--edit"></i>
                  </button>
                  <button class="list__button delete">
                      <i class="fas fa-trash" class="list__button--delete"></i>
                  </button>
              </div>
              
          </div>`;
  section.appendChild(element);
  const deleteBtn = document.querySelectorAll(".delete");
    deleteBtn.forEach((item)=>{
      item.addEventListener("click",deleteItem);
    })
    let edit=document.querySelectorAll("#edit");
          edit.forEach((item)=>{
            item.addEventListener("click",editItem);
          })
})   
}





  
