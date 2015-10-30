function changeState(state){
	switch(state){
		case 'saved':
			addClass('hidden', buttonSave);
			addClass('hidden', buttonCancel);
			removeClass('hidden', buttonSaved);
			break;
		case 'changed':
			removeClass('hidden', buttonSave);
			removeClass('hidden', buttonCancel);
			addClass('hidden', buttonSaved);
			break;
	}
}

function addClass(classname, element) {
    var cn = element.className;
    if(cn.indexOf(classname) != -1 ) {
    	return;
    }
    if(cn != '') {
    	classname = ' ' + classname;
    }
    element.className = cn + classname;
}

function removeClass(classname, element) {
    var cn = element.className;
    var rxp = new RegExp("\\s?\\b"+classname+"\\b", "g");
    cn = cn.replace(rxp, '');
    element.className = cn;
}

var buttonCancel = document.getElementById('button-cancel');
var buttonSave = document.getElementById('button-save');
var buttonSaved = document.getElementById('button-saved');
var checkboxStart = document.getElementById('checkbox-start');
var checkboxTray = document.getElementById('checkbox-tray');

var savedState = {
	checkboxstart: true,
	checkboxtray: false
}

var currentState = copyState(savedState);

function copyState(state){
	return {
		checkboxstart: state.checkboxstart,
		checkboxtray: state.checkboxtray
	}
}

checkboxStart.onclick = function(){
	if(currentState.checkboxstart)
		removeClass('active', checkboxStart);
	else
		addClass('active', checkboxStart);
	currentState.checkboxstart = !currentState.checkboxstart; 
	changeState('changed');
}

checkboxTray.onclick = function(){
	if(currentState.checkboxtray)
		removeClass('active', checkboxTray);
	else
		addClass('active', checkboxTray);
	currentState.checkboxtray = !currentState.checkboxtray; 
	changeState('changed');
}

document.getElementById('button-save').addEventListener("click", function(){
	savedState = copyState(currentState);
	changeState('saved');
});

document.getElementById('button-cancel').addEventListener("click", reloadState);

function reloadState(){
	currentState = copyState(savedState);
	if(currentState.checkboxtray)
		addClass('active', checkboxTray);
	else
		removeClass('active', checkboxTray);

	if(currentState.checkboxstart)
		addClass('active', checkboxStart);
	else
		removeClass('active', checkboxStart);
		
	changeState('saved');
}

reloadState();