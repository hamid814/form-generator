// ADD ALL BTNS
btnList = ['text', 'password', 'button', 'checkbox', 'range', 'number', 'email', 'color', 'date', 'month', 'file', 'time', 'url', 'reset', 'submit', 'search', 'radio', 'tel'];
var btnPlace = document.querySelector('#btn-place');
for(var i = 0; i < btnList.length; i++) {
  btnPlace.innerHTML += `<div class="col-3 mb-4 p-0 mr-2 ml-3">
  <div id="${btnList[i]}">
    <button class="btn btn-block f-site-btn">${btnList[i].charAt(0).toUpperCase() + btnList[i].slice(1)}</button>
  </div>
</div>`;
}

// add custom input (input+type)
// btnPlace.innerHTML += `<div class="col-3 mb-4 p-0 mr-2 ml-3">
//   <div id="new-item">
//     <button class="btn btn-block f-site-btn">${btnList[i].charAt(0).toUpperCase() + btnList[i].slice(1)}</button>
//   </div>
// </div>`;

btnPlace.addEventListener('click', addField);
function addField(e) {
  var type = event.target.parentElement.id;
  if(event.target.id != 'btn-place') {
    makeTable.makeTableRow('input', type);
  }
}

// VARS
var roundBtn = document.querySelector('#round-btn');
var sharpBtn = document.querySelector('#sharp-btn');
var tableBody = document.querySelector('#table-body');
var formOutputBtn = document.querySelector('#form-output-btn');
var heart = document.getElementById('heart');
// MODAL VARS
var modal = document.querySelector('#modal');
var modalXBtn = document.querySelector('#modal-x-btn');
var modalTitle = document.querySelector('#modal-title');
var modalBody = document.querySelector('#modal-body');
var modalDiscardBtn = document.querySelector('#modal-discard-btn');
var modalSaveBtn = document.querySelector('#modal-save-btn');
var editResult = document.querySelector('#edit-result');
var editStaticPanel = document.querySelector('#edit-static-panel');
var editVariablePanel = document.querySelector('#edit-variable-panel');
var finalCode = document.querySelector('#final-code');
var copyBtn = document.querySelector('#copy-btn');
var finalView = document.querySelector('#final-view');
var finalViewBtn = document.querySelector('#final-view-btn');

//ALERT VARS
var alertModal = document.querySelector('#alert');
var alertHeader = document.querySelector('#alert-header');
var alertBody = document.querySelector('#alert-body');
var alertFooter = document.querySelector('#alert-footer');
var alertCloseBtn = document.querySelector('#alert-close-btn');
var alertDontCloseBtn = document.querySelector('#alert-dont-close-btn');
//clear form vars
var clearModal = document.querySelector('#clear-modal');
var clearModalInput = document.querySelector('#clear-modal-input');
var formClearBtn = document.querySelector('#form-clear-btn');
var clearBtn = document.querySelector('#clear-btn');
var dontClearBtn = document.querySelector('#dont-clear-btn');

// functional VARS
copyBtn.addEventListener('click', copyCode);
var rowNumber = 0;
var modalIsChanged = false;
var selectedRow = ''; // for editin stuff;
var selectedElement;
var editingElement;
var btnsBorder = 'nothing';
var varItems = ['type', 'placeholder', 'value', 'title', 'min', 'max', 'step', '...'];
var staticItems = ['checked', 'readonly', 'required', '...'];
var generalItems = ['name', 'class', 'id', 'style', '...'];
var dblCheckDel = false;

var lorem = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo odit nobis fugiat!
 Numquam rem in ipsum eligendi debitis, minus veniam non omnis magni pariatur alias magnam 
 asperiores qui sunt perferendis.`;

// EVENTS
roundBtn.addEventListener('click', btnsToRuond);
sharpBtn.addEventListener('click', btnsToSharp);
formOutputBtn.addEventListener('click', getOutput);
// EDIT STUFF
tableBody.addEventListener('click', startEdit);

// MDOAL EVENTS
modalXBtn.addEventListener('click', checkModalChange);
modalDiscardBtn.addEventListener('click', closeModal);
modal.addEventListener('click', blurCloseFunction);
modal.addEventListener('keyup',(e)=>{if(event.keyCode===13&&event.target.id!='custom-name'&&event.target.id!='custom-value'){modalSaveBtn.click();console.log(event.target);}else if(event.keyCode===13){addCustom();}});
modalSaveBtn.addEventListener('click', saveChanges);
//ALERT EVENTS
alertModal.addEventListener('click', blurCloseFunction);
alertCloseBtn.addEventListener('click', closeModal);
alertDontCloseBtn.addEventListener('click', closeAlert);
// clear alert events
clearModal.addEventListener('click', blurCloseFunction);
formClearBtn.addEventListener('click', showClearAlert);
clearModalInput.addEventListener('keyup',(e)=>{if(event.keyCode===13){clearBtn.click();}});
clearBtn.addEventListener('click', clearForm);
dontClearBtn.addEventListener('click', closeClearAlert);

// GENERAL FUNCTION
class makeTable {
 static makeTableRow(field, type) {
  rowNumber++;
  var newField = document.createElement(field);
  newField.type = type;
  newField.title = 'enter ' + type + ' here';
  var makeTr = document.createElement('tr');
  var trId = 'tr-number-' + rowNumber;
  makeTr.id = trId;
  makeTr.className = 'edit-row';
  tableBody.appendChild(makeTr); 
  var makeTd = document.createElement('td');
  var makeTd2 = document.createElement('td');
  var tdLId = 'td-left-' + rowNumber;
  var tdRId = 'td-right-' + rowNumber;
  makeTd.id = tdLId;
  makeTd.className = 'col-8';
  makeTd2.id = tdRId;
  makeTd2.className = 'float-right right-of-table';
  var tr = document.getElementById(trId);
  tr.appendChild(makeTd);
  tr.appendChild(makeTd2);
  var td = document.getElementById(tdLId);
  var td2 = document.getElementById(tdRId);
  td.appendChild(newField);
  var makeBtnGroup = document.createElement('div');
  makeBtnGroup.className = 'btn-groups hidden-panel';
  var makeEBtn = document.createElement('button');
  makeEBtn.title = 'Edit ' + type;
  // makeEBtn.innerHTML = '<i class="fas fa-edit"></i>';
  makeEBtn.innerHTML = 'E';
  makeEBtn.classList.add('btn');
  makeEBtn.classList.add('text-warning');
  makeEBtn.classList.add('rounded-0');
  makeEBtn.classList.add('edit-btn-round');
  makeEBtn.classList.add('f-site-btn');
  makeEBtn.classList.add('f-tr-edit-btn');
	makeBtnGroup.appendChild(makeEBtn);
  var makeXBtn = document.createElement('button');
  makeXBtn.innerHTML = '<i class="fas fa-times-circle"></i>';
  makeXBtn.className = 'btn text-danger edit-btn-round font-weight-bold f-tr-del-btn f-site-btn';
  makeXBtn.title = 'Delete ' + type;
	makeBtnGroup.appendChild(makeXBtn);
  var makeCBtn = document.createElement('button');
  makeCBtn.innerHTML = '<i class="fas fa-clone"></i>';
  makeCBtn.className = 'btn text-success edit-btn-round f-tr-clone-btn f-site-btn';
  makeCBtn.title = 'clone ' + type;
	makeBtnGroup.appendChild(makeCBtn);
  td2.appendChild(makeBtnGroup);
 switch (type) {
  case 'text':
   newField.placeholder = 'enter text here';
   break;
  case 'password':
   newField.placeholder = 'enter your password';
   break;
	case 'button':
		newField.value = 'new button';
   break;
  case 'submit':
   break;
  case 'reset': 
   break;
   case 'range':
    break;
   case 'checkbox':
    newField.setAttribute('checked', '');
    break;
   case 'number':
    break;
   case 'email':
    newField.placeholder = 'Enter your email';
    break;
   default :
 }
 styleBtns();
} // end of method
} // end of class

// style all btns
var btns = document.getElementsByClassName('f-site-btn');
function styleBtns() {
  for(var i =0 ; i < btns.length; i++) {
    btns[i].title = btns[i].innerText;
    // btns[i].classList.add('border-top');
    // btns[i].classList.add('border-bottom');
    // btns[i].classList.add('border-right');
    // btns[i].classList.add('border-left');
    btns[i].classList.add(btnsBorder);
    btns[i].classList.add('btn-dark');
  if(btns[i].classList.contains('f-tr-edit-btn') || btns[i].classList.contains('f-tr-del-btn') || btns[i].classList.contains('f-tr-clone-btn')) {
    // btns[i].addEventListener('mouseover', btnHoverStart);
    // btns[i].addEventListener('mouseout', btnHoverEnd);
  }
  }
}
function btnsToRuond() {
  btnsBorder = 'rounded-0';
  styleBtns();
}
function btnsToSharp() {
  for(var i =0 ; i < btns.length; i++) {
     btns[i].classList.remove('rounded-0');
  }
  btnsBorder = 'no-effect-class';
}

// v.1 edit btns hover style (change content of btn) (added in styleBtns func)
function btnHoverStart(e) {
  event.target.classList.add('pl-4');
  event.target.classList.add('pr-4');
  if(event.target.classList.contains('f-tr-edit-btn')) {
    event.target.innerHTML = 'Edit ' + event.target.parentElement.parentElement.previousElementSibling.firstElementChild.type;
  } else if(event.target.classList.contains('f-tr-del-btn')) {
    event.target.innerHTML = 'Delet ' + event.target.parentElement.parentElement.previousElementSibling.firstElementChild.type;
  } else if(event.target.classList.contains('f-tr-clone-btn')) {
    event.target.innerHTML = 'Clone ' + event.target.parentElement.parentElement.previousElementSibling.firstElementChild.type;
  }
}
function btnHoverEnd(e) {
  event.target.classList.remove('pl-4');
  event.target.classList.remove('pr-4');
  if(event.target.classList.contains('f-tr-edit-btn')) {
    event.target.innerHTML = '<i class="fas fa-edit"></i>';
  } else if(event.target.classList.contains('f-tr-del-btn')) {
    event.target.innerHTML = '<i class="fas fa-times-circle"></i>';
    dblCheckDel = false;
  } else if(event.target.classList.contains('f-tr-clone-btn')) {
    event.target.innerHTML = '<i class="fas fa-clone"></i>';
  }
}

// heart stuff
function heartTip() {
  heart.style.fontSize = '1em';
  setTimeout(heartTap, 300);
}function heartTap() {
  heart.style.fontSize = '0.8em';
  setTimeout(heartTip, 900);
}
heart.addEventListener('click', stopHeart);
function stopHeart() {
  heart.id = '';
}

// modal general functions
function checkModalChange() {
  if(modalIsChanged) {
    showAlert();
  } else {
    closeModal();
  }
}
function showModal() {
  modal.style.display = 'block';
}
function closeModal() {
  closeAlert();
  modal.classList.add('fade-out');
  setTimeout(modalDiplayNone, 500);
  function modalDiplayNone() {
    modal.style.display = 'none';
    modal.classList.remove('fade-out');
    // clear modal for next edit
    finalCode.style.display = 'none';
    copyBtn.style.display = 'none';
    finalView.style.display = 'none';
    finalViewBtn.style.display = 'none';
    editResult.style.display = 'block';
    editStaticPanel.style.display = 'block';
    editVariablePanel.style.display = 'block';
    editStaticPanel.innerHTML = '';
    finalCode.innerHTML = '';
    editVariablePanel.innerHTML = '';
    editResult.innerHTML = '';
    modalSaveBtn.style.display = 'block';
    modalDiscardBtn.innerHTML = '<i class="fas fa-times"></i> discard changes';
    modalIsChanged = false;
  }
}


function showAlert() {
  alertModal.style.display = 'block';
}
function closeAlert() {
  alertModal.classList.add('fade-out');
  setTimeout(closeAlertModalDisplayNone, 500);
  function closeAlertModalDisplayNone() {
    alertModal.style.display = 'none';
    alertModal.classList.remove('fade-out');
  }
}

var attrDelDblCheck = false;
function blurCloseFunction(e) {
  if(event.target.classList.contains('modal')) {
    if(event.target.id === 'modal') {
      checkModalChange();
    } else {
      event.target.classList.add('fade-out');
      var theTraget = event.target;
      setTimeout(blurCloseDisplayNone, 500);
      function blurCloseDisplayNone(e) {
        theTraget.classList.remove('fade-out');
        theTraget.style.display = 'none';
      }
    }
  } else if(event.target.classList.contains('f-del-attr-btn')) {
    if(!attrDelDblCheck && event.target.parentElement.previousElementSibling.value != '') {
      // console.log(event.target.parentElement.previousElementSibling.value);
      event.target.innerHTML = 'Sure?';
      attrDelDblCheck = true;
      event.target.addEventListener('mouseout', () => {
        attrDelDblCheck = false;
        event.target.innerHTML = 'X';
      });
    } else {
      event.target.parentElement.parentElement.classList.add('accardeon-die');
      var theEventTraget = event.target;
      var theNextRow = event.target.parentElement.parentElement.nextElementSibling;
      setTimeout(()=>{
        editingElement.removeAttribute(theEventTraget.parentElement.previousElementSibling.name);
        theNextRow.style.marginTop = '46px';
        theNextRow.classList.add('come-up');
        setTimeout(()=>{
          theNextRow.classList.remove('come-up');
          theNextRow.style.marginTop = '0';
        },200);
        theEventTraget.parentElement.parentElement.remove();
        modalIsChanged = true;
        },290);
      attrDelDblCheck = false;
    }
  }
}
  
// modal edit related functions

function setModalTitle(e) {
  if(event.target.id === 'form-output-btn') {
    modalTitle.innerText = '</Result>';
    modalTitle.previousElementSibling.innerHTML = '';
  } else if(event.target.id === '') {
    if(selectedElement.type === 'email') {
      modalTitle.innerText = 'E-mail';
      modalTitle.previousElementSibling.innerHTML = 'Edit ';
    } else {
      modalTitle.innerText = selectedElement.type.charAt(0).toUpperCase() + selectedElement.type.slice(1);
      modalTitle.previousElementSibling.innerHTML = 'Edit ';
    }
  }
}
function fillEditStaticPanel() {
  for(var i = 0; i < staticItems.length; i++) {
    for(var j = 0; j < selectedElement.attributes.length; j++) {
      if(staticItems[i] === selectedElement.attributes[j].name) {
        editStaticPanel.innerHTML += `<button class="btn f-site-btn">${selectedElement.attributes[j].name.charAt(0).toUpperCase() + selectedElement.attributes[j].name.slice(1)}</button>`;
      } else if(selectedElement.attributes[j].name === '') {
        editStaticPanel.innerHTML += `<button class="btn f-site-btn">${selectedElement.attributes[j].name.charAt(0).toUpperCase() + selectedElement.attributes[j].name.slice(1)}</button>`;             
      }
    }
  }
}
function fillEditVariablepanel() {
  editVariablePanel.innerHTML = '';
  for(var i = 0; i < selectedElement.attributes.length; i++) {
    if(varItems.indexOf(selectedElement.attributes[i].name) != -1) {
      editVariablePanel.innerHTML += `<div class="input-group mb-2"><div class="input-group-prepend"><span class="input-group-text text-white bg-dark border-0">${selectedElement.attributes[i].name.charAt(0).toUpperCase() + selectedElement.attributes[i].name.slice(1)}:</span></div><input type="text" name="${selectedElement.attributes[i].name}" class="p-1 pl-3 form-control" value="${selectedElement.attributes[i].value}"><div class="input-group-append"><span class="btn pl-3 pr-3 f-del-attr-btn text-danger bg-dark border-0" title="Delete '${selectedElement.attributes[i].name}' attribute">X</span></div>`;
      }
  }
  for(var i = 0; i < generalItems.length; i++) {
    if(selectedElement.attributes.getNamedItem(generalItems[i])) {
      // the general exists
      editVariablePanel.innerHTML += `<div class="input-group mb-2"><div class="input-group-prepend"><span class="input-group-text text-white bg-dark border-0">${generalItems[i].charAt(0).toUpperCase() + generalItems[i].slice(1)}:</span></div><input type="text" class="p-1 pl-3 form-control" name="${generalItems[i]}" value="${selectedElement.attributes.getNamedItem(generalItems[i]).value}"><div class="input-group-append"><span class="btn text-danger pl-3 pr-3 f-del-attr-btn bg-dark border-0" title="Delete ${generalItems[i]} attribute">X</span></div>`;
    } else {
      // the general doesnt exist
      editVariablePanel.innerHTML += `<div class="input-group mb-2"><div class="input-group-prepend"><span class="input-group-text text-white bg-dark border-0">${generalItems[i].charAt(0).toUpperCase() + generalItems[i].slice(1)}:</span></div><input type="text" class="p-1 pl-3 form-control" name="${generalItems[i]}" placeholder="${'enter ' + generalItems[i] + ' here'}"><div class="input-group-append"><span class="btn text-danger pl-3 pr-3 f-del-attr-btn bg-dark border-0" title="Delete '${generalItems[i]}' attribute">X</span></div>`;
    }
  }
  editVariablePanel.innerHTML += `<div class="input-group"><div class="input-group-prepend"><span class="input-group-text text-white bg-dark border-0">new attribute:</span></div><input type="text" class="p-1 pl-3 form-control" name="custom" id="custom-name" placeholder="name"><input type="text" class="p-1 pl-3 form-control" name="custom" id="custom-value" placeholder="value"><div class="input-group-append"><span class="input-group-text text-white bg-dark border-0" onclick="addCustom()" id="add-custom-btn" title="Add custom attribute">Add</span></div></div>`;
}


function saveChanges() {
  if(!modalIsChanged) {
    modalSaveBtn.innerHTML = 'Nothing is changed dude!';
    modalSaveBtn.classList.toggle('text-warning');
    setTimeout(reviveModalSaveBtn1, 1000);
      function reviveModalSaveBtn1() {
    modalSaveBtn.innerHTML = 'Nothing is changed dude!.';
    setTimeout(reviveModalSaveBtn2, 1000);
  }function reviveModalSaveBtn2() {
    modalSaveBtn.innerHTML = 'Nothing is changed dude!..';
    setTimeout(reviveModalSaveBtn3, 800);
  }function reviveModalSaveBtn3() {
    modalSaveBtn.innerHTML = 'Nothing is changed dude!...';
    setTimeout(reviveModalSaveBtn4, 500);
  }function reviveModalSaveBtn4() {
    modalSaveBtn.innerHTML = '<i class="fas fa-save"></i> Save changes';
    modalSaveBtn.classList.toggle('text-warning');
  }
  } else {
    selectedElement.parentElement.replaceChild(editingElement, selectedElement);
    closeModal();
    // selectedRow.firstElementChild.nextElementSibling.firstElementChild.firstElementChild.innerHTML = '<i class="fas fa-edit text-secondary"></i> Edit ' + editingElement.type;
  }
}

// show modal by edit btn in every row
 function startEdit(e) {
	if(event.target.classList.contains('f-tr-edit-btn')) {
    showModal();
    selectedRow = event.target.parentElement.parentElement.parentElement;
    selectedElement = selectedRow.firstElementChild.firstElementChild;
	 // CHANGE INSIDE OF THE MODAL
    editingElement = selectedElement.cloneNode();
    editResult.innerHTML = '';
    var resultlabel = document.createElement('div');
    resultlabel.className = 'text-white';
    resultlabel.innerHTML = 'Result:';
    var resultInput = document.createElement('div');
    resultInput.className = 'd-block m-4 text-center';
    resultInput.appendChild(editingElement);
    editResult.appendChild(resultlabel);
    editResult.appendChild(resultInput);
    
    setModalTitle();
    fillEditVariablepanel();
    fillEditStaticPanel();
    styleBtns();
	} else if(event.target.classList.contains('f-tr-clone-btn')) {
   var newRow = event.target.parentElement.parentElement.parentElement.cloneNode(true);
   newRow.lastElementChild.lastElementChild.lastElementChild.innerHTML = '<i class="fas fa-clone"></i>';
   newRow.lastElementChild.lastElementChild.lastElementChild.classList.remove('pl-4');
   newRow.lastElementChild.lastElementChild.lastElementChild.classList.remove('pr-4');
   tableBody.appendChild(newRow);
   styleBtns();
  } else if(event.target.classList.contains('f-tr-del-btn')) {
    if(!dblCheckDel) {
      event.target.innerText = 'Click again';
      dblCheckDel = true;
    } else {
      event.target.parentElement.parentElement.parentElement.remove();
      dblCheckDel = false;
    }
  }
  // styleBtns();
}

 //clear form stuff
function showClearAlert() {
  if(tableBody.innerHTML != '') {
    clearModal.style.display = 'block';
    clearModalInput.focus();
  } else {
    formClearBtn.innerHTML = 'insert some thing first ;)';
    setTimeout(() => formClearBtn.innerHTML = '<i class="fas fa-broom"></i> clear form', 3000);
  }
}
function clearForm() {
  var checkWord = clearModalInput.value.toLowerCase();
  if(checkWord === 'c') {
    tableBody.innerHTML = '<div class="alert alert-warning border border-warning text-center">All the form deleted!</div>';
    closeClearAlert();
    setTimeout(() => tableBody.innerHTML = '', 3000);
  } else {
    clearModalInput.value = '';
    clearModalInput.focus();
    clearModalInput.classList.remove('bg-dark');
    clearModalInput.classList.add('bg-danger');
    setTimeout(reviveClearInput, 1000);
    function reviveClearInput() {
      clearModalInput.classList.remove('bg-danger');
      clearModalInput.classList.add('bg-dark');
    }
  }
}
function closeClearAlert() {
  clearModal.classList.add('fade-out');
  setTimeout(clearModalDisplayNone, 500);
  function clearModalDisplayNone() {
    clearModal.style.display = 'none';
    clearModalInput.value = '';
    clearModal.classList.remove('fade-out');
  }
}

// output form the form
function getOutput() {
  if(tableBody.innerHTML != '') {
      showModal();
      setModalTitle();
     finalCode.style.display = 'block';
     copyBtn.style.display = 'block';
     finalView.style.display = 'block';
     finalViewBtn.style.display = 'block';
     editResult.style.display = 'none';
     editStaticPanel.style.display = 'none';
     editVariablePanel.style.display = 'none';
     var allTr = document.getElementsByTagName('tr');
     for(var i = 0; i < allTr.length; i++) {
     finalCode.innerHTML += allTr[i].firstElementChild.innerHTML + `
`;
     modalSaveBtn.style.display = 'none';
     modalDiscardBtn.innerHTML = '<i class="fas fa-times"></i> close';
    }
  } else {
    formOutputBtn.classList.remove('btn-dark');
    formOutputBtn.classList.add('btn-danger');
    formOutputBtn.classList.add('text-dark');
    formOutputBtn.innerHTML = 'form = null';
    setTimeout(reviveFormOutputBtn, 3000);
    function reviveFormOutputBtn() {
    formOutputBtn.classList.add('btn-dark');
    formOutputBtn.classList.remove('btn-danger');
    formOutputBtn.classList.remove('text-dark');
    formOutputBtn.innerHTML = '<i class="fas fa-poll-h"></i> Generate code/';
    }
  }
}
function copyCode() {
  finalCode.select();
  document.execCommand("copy");
}

// functions to start on load
heartTip();
styleBtns();

    // TEMP


// THEME STUFF
var theme1 = document.querySelector('#bounds');
var theme2 = document.getElementById('expand-btn');
var theme3 = document.querySelector('#theme-3');

theme1.addEventListener('blur', newTheme('this'));
theme2.addEventListener('click', newTheme(self));
theme3.addEventListener('ikxerhg', newTheme('top two logs to be checked ↑ (why are they executing?)'));


  function newTheme(hamid) {
    console.log('hamid: '+hamid);
  }
// set mdoal change to true
editVariablePanel.addEventListener('input', editVariablePanelClicked);
function editVariablePanelClicked(e) {
  if(event.target.name != 'custom') {
    var theAttrName = e.target.name;
    var theAttrValue = e.target.value;
    editingElement.setAttribute(theAttrName, theAttrValue);
  }
  modalIsChanged = true;
}
function addCustom() {
  var newAttrName = document.querySelector('#custom-name').value;
  var newAttrValue = document.querySelector('#custom-value').value;
  if(newAttrName != '') {
  editingElement.setAttribute(newAttrName, newAttrValue);
  var newAttrRow = document.createElement('div');
  newAttrRow.className = 'input-group mb-2 new-attr-row';
  newAttrRow.innerHTML = `<div class="input-group-prepend"><span class="input-group-text text-white bg-dark border-0">${newAttrName}:</span></div><input type="text" class="p-1 pl-3 form-control" name="${newAttrName}" value="${newAttrValue}"><div class="input-group-append"><span class="btn text-danger pl-3 pr-3 f-del-attr-btn bg-dark border-0" title="Delete '${newAttrName}' attribute">X</span>`;
  editVariablePanel.lastElementChild.classList.add('come-down');
  setTimeout(()=>{
    editVariablePanel.insertBefore(newAttrRow, editVariablePanel.lastElementChild);
    editVariablePanel.lastElementChild.previousElementSibling.classList.add('accardeon-back');
    setTimeout(()=>{
      editVariablePanel.lastElementChild.previousElementSibling.classList.remove('accardeon-back');
      editVariablePanel.lastElementChild.previousElementSibling.classList.remove('new-attr-row');
      editVariablePanel.lastElementChild.classList.remove('come-down');
    },290);
  },190);
  setTimeout(()=>{
    document.querySelector('#custom-name').value = '';
    document.querySelector('#custom-value').value = '';
  }, 100);
  } else {
    document.querySelector('#custom-name').classList.toggle('bg-warning');
    setTimeout(()=>{document.querySelector('#custom-name').classList.toggle('bg-warning');}, 800);
  }
};

// show areas
document.getElementById('bounds').addEventListener('click', showBorders);
function showBorders() {
  var allDoc = document.all;
  for(var i = 0; i < allDoc.length; i++) {
    allDoc[i].classList.add('border');
    allDoc[i].classList.add('border-danger');
  }
}


document.querySelector('#expand-btn').addEventListener('click', function() {
  var leftSection = document.querySelector('#left-section');
  var BtnPlace = document.querySelector('#btn-place');
  var rightSection = document.querySelector('#right-section');
  // leftSection.classList.add('collapse-left');
  leftSection.style.maxWidth = '0';
  Array.from(document.querySelectorAll('#btn-place .btn')).forEach(function(btn){btn.style.maxWidth = '0';btn.style.marginRigth = '0';btn.style.marginLeft = '0';});
  setTimeout(dida, 3000);
  function dida() {
    // leftSection.classList.remove('collapse-left');
    // leftSection.classList.add('expand-left');
    leftSection.style.maxWidth = '379' + 'px';
    Array.from(document.querySelectorAll('#btn-place .btn')).forEach(function(btn){btn.style.display='block';});
    // leftSection.style.display = 'none';
    setTimeout(()=>{leftSection.classList.remove('expand-left');}, 300);
  }
});

// CHANGE THE SIZE OF THE COL4 AND COL8 WITH MOUSE

// IF TWO PASSWORD FILED ADDED, THE SECOND HAVE BTN FOR MAKE IT RE ENTER PASSWORD

// PREBUILDED FORMS

// ACTIVATE SAVE CHANGES BTN ON CHANGES MADE

// ADD BTN TO LEFT OF THE TR FOR DRAG AND DROP REPLACING(BRAD HAS THE TOTUREAL)(LIKE YOUTUBE WHATCH LATER LIST)

// FSAT-CODETIME "AFTER THE END OF CODING, CODE FROM SCRATCH FAST AND NON-STOP"

// SHOETIZE FUNCTIONS AS MUCH AS POSIBLE, MAKE REPEATETETIVE FUNCTIONS AND STYLES AND VARS IN JS SHORT LINES

// ALL FIRST LETTERS MUST BE CAPITALASIED

//  ADD FORM TITLE

// ADD CUSTOM CSS TO IT (in-line style)

// SAY STH LIKE POWERED FROM HTML VERSION 5.0 / PHP 7.3 FRIENDLY

// WARNING BTNS CAN BE 'CLSOE WITH/WITHOUT SAVING'

// ADD POPOVERS ( BOOTSTRAP STUFF )

// style the scroll bar

// gradiant design

// form wants fucking labels

// hide save changes and discard change btn on get output

// a place t make cutstom stylesheet for the form ( a style tag before the form tags )

// add sth to radio and chechboxs there must be a text after them

// find all classes used in document to style it from scratch

// add value for range, and submit, reset

// sub/res btns

// add title to delete attr btn

// add recapctu (test for not being robot)

// remove id of each table row, it doesnt need it...

// add padding to all table rows on drag start, and lighter background

// edit as code (edit an element as its code)

// label and input in one row or two (btn for it)

// highhight js (for the edit as code part and maybe in generate code ...)

// the folowing function is to find all classes but doesnt find the classes that are not added like classes inside the modal or classes that add when an animation runs
/*
function allCLasses() {
    var elements = document.all;
    var listOfClasses = [];
    var number = 0;
    for (elem of elements) {
      if (elem.attributes.length > 0) {
        for(attr of elem.attributes) {
          if(attr.name === 'class') {
            var classListOfThis = elem.classList;
            for(theClass of classListOfThis) {
              // console.log(theClass);
              if(listOfClasses.indexOf(theClass) === -1) {
                listOfClasses.push(theClass);
              }
            }
          }
        }
      }
    }
    console.log(listOfClasses);
    console.log(number);
}
allCLasses();
*/