var startBtn = document.getElementById('start-btn');
var modal = document.getElementById('modal');
var modalCloseBtn = document.getElementById('modal-close-btn');
var modalXBtn = document.getElementById('modal-x-btn');
var addInput = document.getElementById('add-input');
var inputModal = document.getElementById('input-modal');
var inputModalXBtn = document.getElementById('input-modal-x-btn');
var inputTypeText = document.getElementById('input-type-text');
var inputModalCloseBtn = document.getElementById('input-modal-close-btn');
var output = document.querySelector('#output div');

startBtn.addEventListener('click', openModal);
// modal.addEventListener('blur', closeModal);
modalCloseBtn.addEventListener('click', closeModal);
modalXBtn.addEventListener('click', closeModal);
addInput.addEventListener('click', ShowInputModal);
inputModalXBtn.addEventListener('click', closeInputModal);
inputModalCloseBtn.addEventListener('click', closeInputModal);
inputTypeText.addEventListener('click', addInputTypeText);


function openModal() {
 modal.style.display = 'block';
 // startBtn.style.display = 'none';
 // toggleModal()
}

function closeModal() {
 modal.style.display = 'none';
 // startBtn.style.display = 'inline-block';
 // toggleModal();
}

// function toggleModal() {
//  if(modal.style.display == 'none';) {
//   modal.style.display = 'block';
//  } else {
//   modal.style.display = 'none';
//  }
// }

function ShowInputModal() {
 closeModal();
 inputModal.style.display = 'block';
}

function closeInputModal() {
 inputModal.style.display = 'none';
}

function addInputTypeText(e) {
 var inputTypeText = document.createElement('input');
 inputTypeText.type = 'text';
 closeInputModal();
 output.appendChild(inputTypeText);
 var inputTypeSubmit = document.createElement('input');
 inputTypeSubmit.type = 'submit';
 output.appendChild(inputTypeSubmit);
 console.log(e.target);
}


// TEMP STUFF
openModal();