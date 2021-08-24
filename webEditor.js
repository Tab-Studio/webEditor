console.log('%c 您已使用「webEditor」!','background:#ffeba0;color:#905000')
console.log('%c 現在，你可以利用「webEditor」的各種工具隨心所欲的編輯當前所瀏覽的頁面。','background:#ffeba0;color:#905000')
//()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()
const $_GET = {}, $_COOKIE = {};
let url = location.href;
if(url.indexOf('?') != -1){
	url.split('?')[1].split('&').forEach(function(kv){
		$_GET[kv.split('=')[0]] = kv.split('=')[1];
	});
}
let cookie = document.cookie;
let WE_dragItem;
if(cookie != ''){
	cookie.split('; ').forEach(function(kv){
		$_COOKIE[kv.split('=')[0]] = kv.split('=')[1];
	});
}
function DomEval(st){
	let s = document.createElement('script');
	s.innerHTML = st;
	document.body.appendChild(s);
	document.body.removeChild(s);
}
function WE_sendPhp(kiwiPlugInPhpName,kiwiPlugInSendValue){
	var xmlhttp = new XMLHttpRequest();				
	xmlhttp.open("POST", kiwiPlugInPhpName,true);
	xmlhttp.onreadystatechange=function() {
		if (xmlhttp.readyState==4) {
			window.console.log(xmlhttp.responseText);
		}
	}
	xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xmlhttp.send(kiwiPlugInSendValue);
}
const WE$ = (e, f = document) => {return(f.querySelector(e));};
const WE$$ = (e, f = document) => {return(f.querySelectorAll(e));};
const vw = () => {return(window.innerWidth/100);}
const vh = () => {return(window.innerHeight/100);}
const WEDiv = document.createElement('div');
const WEMD = document.createElement('div');
const WEMask = document.createElement('div');
const WEBox = document.createElement('div');
const WEScript = document.createElement('script');
const WEStyle = document.createElement('style');
const WESelectStyle = document.createElement('style');
const WEBtn = [];
WEDiv.setAttribute('KWUN', '')
WEDiv.setAttribute('KWUP', '')
WEDiv.setAttribute('id', 'WEDiv');
WEDiv.style.zIndex = '99999999999999999999999999999999999';
WEDiv.style.zIndex--;
WEDiv.style.width = 1.7*vw()+'px';
WEDiv.style.height = 3*vw()+'px';
WEDiv.style.backgroundColor = '#fcfb92';
WEDiv.style.userSelect = 'none';
WEDiv.style.position = 'fixed';
WEDiv.style.right = '0px';
WEDiv.style.bottom = '0px';
WEDiv.style.borderRadius = 0.5*vw()+'px';
WEDiv.style.display = 'grid';
WEDiv.style.gridAutoRows = 2.6*vw()+'px';
WEDiv.style.gridGap = 0.2*vw()+'px';
WEDiv.style.padding = 0.2*vw()+'px';
WEDiv.style.boxSizing = 'border-box';
WEDiv.style.gridAutoColumns = 1.3*vw()+'px';
let WEbtnId_now = 'btn1';
let WEGt = 'QMRU';
for(let i = 0; i < WEGt.length; i++){
	WEDiv.setAttribute(WEGt[i], $_GET[WEGt[i]]);
}
let WEQt;
if(WEDiv.getAttribute('M')[2] == 3){WEQt = 20;}
else if(WEDiv.getAttribute('M')[2] == 2){WEQt = 10;}
else if(WEDiv.getAttribute('M')[2] == 1){WEQt = 5;}
WEDiv.setAttribute('qTotal', WEQt);
WEDiv.setAttribute('aTotal', WEQt);
WEMD.setAttribute('id', 'WEMD')
WEMD.style.backgroundImage = 'url(\'https://maohupi.riarock.com/web/tool/webEditor/img/md.png\')';
WEMD.style.backgroundRepeat = 'no-repeat';
WEMD.style.backgroundSize = 'cover';
WEMD.style.zIndex = '99999999999999999999999999999999999';
WEMD.style.zIndex -= 2;
WEMD.style.gridArea = '1/1/2/2';
WEDiv.appendChild(WEMD);
const WENowUser = $_GET['U'] ? $_GET['U'] : '無法辨識';
var WEBtnTitle = ['普通瀏覽', '文字選取', '文字瀏覽', '物件拖曳', '物件編輯', '程式編輯', '網頁下載', '關閉選單'];
for(let i = 0; i < 8; i++){
	WEBtn[i] = document.createElement('button');
	WEBtn[i].style.backgroundColor = '#00000000';
	WEBtn[i].style.borderRadius = 0.5*vw()+'px';
	WEBtn[i].style.border = 'none';
	WEBtn[i].style.margin = '0px';
	WEBtn[i].style.backgroundImage = `url('https://maohupi.riarock.com/web/tool/webEditor/img/btn${i+1}.png')`;
	WEBtn[i].style.backgroundRepeat = 'no-repeat';
	WEBtn[i].style.backgroundSize = '100%';
	WEBtn[i].style.gridArea = `1/${i+2}/2/${i+3}`;
	WEBtn[i].style.padding = '0px';
	WEBtn[i].style.boxSizing = 'border-box';
	WEBtn[i].setAttribute('WE-btnId', `btn${i+1}`);
	WEBtn[i].setAttribute('title', WEBtnTitle[i]);
	WEBtn[i].setAttribute('kscc', 'true');
	WEBtn[i].addEventListener('mousedown', (e) => {
		e.stopPropagation();
	});
	WEBtn[i].onclick = function(e){
		e.stopPropagation();
		if(WEbtnId_now != this.getAttribute('WE-btnId')){
			WEbtnId_now = this.getAttribute('WE-btnId');
			if(WEbtnId_now == 'btn1'){
				WE_cantEdit();
				WE_cantSelect();
				WE_cantDrag();
			}
			else if(WEbtnId_now == 'btn2'){
				WE_cantEdit();
				WE_canSelect();
				WE_cantDrag();
			}
			else if(WEbtnId_now == 'btn3'){
				WE_cantEdit();
				WE_cantSelect();
				WE_cantDrag();
				WEBox.innerHTML = '';
				WEBox.innerHTML = `
					<textarea WE-id="WETextarea-text" readonly="true"></textarea>
				`;
				WE$('#WEBox > textarea').value = document.body.innerText;
				WE$('#WEBox > textarea').oncontextmenu = function(e){
					e;
				}
				WEMask.style.opacity = '1';
				WEMask.style.pointerEvents = 'auto';
			}
			else if(WEbtnId_now == 'btn4'){
				WE_cantEdit();
				WE_cantSelect();
				WE_setDragEL();
				WE_canDrag();
			}
			else if(WEbtnId_now == 'btn5'){
				WE_canEdit();
				WE_cantSelect();
				WE_cantDrag();
			}
			else if(WEbtnId_now == 'btn6'){
				WE_cantEdit();
				WE_cantSelect();
				WE_cantDrag();
				WEBox.innerHTML = '';
				WEBox.innerHTML = `
					<textarea WE-id="WETextarea-code"></textarea>
				`;
				WE$('body').removeChild(WEDiv);
				WE$('body').removeChild(WEMask);
				let iHTML = WE$('html').innerHTML;
				WE$('body').appendChild(WEDiv);
				WE$('body').appendChild(WEMask);
				WE$('#WEBox > textarea').value = iHTML;
				WE$('#WEBox > textarea').oncontextmenu = function(e){
					e;
				}
				WEMask.style.opacity = '1';
				WEMask.style.pointerEvents = 'auto';
				WE_codeSetLoop();
			}
			else if(WEbtnId_now == 'btn7'){
				WE_cantEdit();
				WE_cantSelect();
				WE_cantDrag();
				WEDiv.style.opacity = '0';
				WEDiv.style.pointerEvents = 'none';
				WE_download(document.querySelector('html').outerHTML, `${document.title}.html`, 'html');
				WEDiv.style.opacity = '1';
				WEDiv.style.pointerEvents = 'auto';
				WEbtnId_now = 'btn1';
			}
			else if(WEbtnId_now == 'btn8'){
				WE_cantEdit();
				WE_cantSelect();
				WE_cantDrag();
				document.body.removeChild(WEDiv);
				WEbtnId_now = 'btn1';
			}
			reSetBtnFocus();
		}
	}
	WEBtn[i].addEventListener('mouseover', function(e){
		e.stopPropagation();
		if(this.getAttribute('WE-btnId') != WEbtnId_now){
			this.style.backgroundColor = '#ffffff88';
		}
	});
	WEBtn[i].addEventListener('mouseleave', function(e){
		e.stopPropagation();
		if(this.getAttribute('WE-btnId') != WEbtnId_now){
			this.style.backgroundColor = '#00000000';
		}
	});
	WEDiv.appendChild(WEBtn[i]);
	WEDiv.style.width = (WEDiv.style.width.replace('px', '')-1+1+2.8*vw())+'px';
	WEDiv.style.gridAutoColumns += ` ${2.6*vw()}px`;
}
WEMask.style.position = 'fixed';
WEMask.style.left = '0px';
WEMask.style.top = '0px';
WEMask.style.width = 100*vw()+'px';
WEMask.style.height = 100*vh()+'px';
WEMask.style.backgroundColor = '#00000088';
WEMask.style.zIndex = '99999999999999999999999999999999999';
WEMask.style.opacity = '0';
WEMask.style.pointerEvents = 'none';
WEMask.style.transition = '0.5s';
WEMask.setAttribute('id', 'WEMask');
WEMask.addEventListener('mousedown', function(e){
	e.stopPropagation();
})
WEMask.addEventListener('click', function(e){
	e.stopPropagation();
	WE_codeSet();
	this.style.opacity = '0';
	this.style.pointerEvents = 'none';
	WEbtnId_now = 'btn1';
	reSetBtnFocus();
})
WEBox.style.width = 80*vw()+'px';
WEBox.style.height = 80*vh()+'px';
WEBox.style.margin = 10*vh()+'px auto';
WEBox.style.borderRadius = 1*vw()+'px';
WEBox.style.overflow = 'hidden';
WEBox.style.backgroundColor = '#ffffff';
WEBox.style.padding = 1*vw()+'px';
WEBox.setAttribute('id', 'WEBox')
WEBox.addEventListener('click', (e) => {e.stopPropagation();});
WEBox.addEventListener('mousedown', (e) => {e.stopPropagation();});
WEBox.addEventListener('keydown', function(e){
	e.stopPropagation();
});
WEScript.innerHTML = `
	
`;
WEStyle.innerHTML = `
	#WEBox * {
		outline: none;
		color: #000000;
	}
	#WEBox *::selection {
		color: #ffffff;
		background-color: #000000;
	}
	#WEBox input, #WEBox button, #WEBox select, #WEBox option {
		color: #000000;
		background-color: #ffffffff;
		border: 1px outset #222222;
		border-radius: 0.3vw;
	}
	#WEBox input:hover, #WEBox button:hover, #WEBox select:hover {
		color: #000000;
		box-shadow: 0px 0px 0.5vw 0px #000000;
	}
	#WEBox input:focus, #WEBox button:active, #WEBox select:focus, #WEBox option:hover {
		color: #000000;
		background-color: #dddddd;
	}
	#WEBox > textarea {
		height: 100%;
		width: 100%;
		overflow: auto;
		border: none;
		padding: 0.5vw;
		resize: none;
		box-sizing: border-box;
	}
	#WEDivMM {
		position: fixed;
		top: 0px;
		left: 0px;
		width: 100vw;
		height: 100vh;
		background-color: transparent;
		z-index: 99999999999999;
		display: none;
	}
	#WEMD:active #WEDivMM {
		display: block;
	}
`;
WESelectStyle.innerHTML = '';
WESelectStyle.WE_innerCode = `
	*::selection {
		font-weight: 1000;
		color: #000000;
		background-color: yellow;
		text-shadow: 0.1vw 0.1vw 0px #ffffff,  0px 0px 0.5vw yellow,  0px 0px 0.5vw yellow,  0px 0px 0.5vw yellow,  0px 0px 0.5vw yellow,  0px 0px 0.5vw yellow;
	}
`;
WEMask.appendChild(WEBox);
document.body.appendChild(WEMask);
WEDiv.appendChild(WEScript);
WEDiv.appendChild(WEStyle);
WEDiv.appendChild(WESelectStyle);
const WEDivMM = document.createElement('div');
WEDivMM.setAttribute('id', 'WEDivMM');
WEMD.appendChild(WEDivMM);
document.body.appendChild(WEDiv);
function WE_addMousemoveEL(){
	document.body.addEventListener('mousemove', (e) => {
		WEDiv.MX = e.clientX;
		WEDiv.MY = e.clientY;
		if(WEDiv.Move){
			WEDiv.style.left = WEDiv.MX - 0.85*vw() + 'px';
			WEDiv.style.top = WEDiv.MY - 1.5*vw() + 'px';
		}
		if(WEDiv.style.left.replace('px', '') < 0){WEDiv.style.left = '0px'}
		else if(WEDiv.style.left.replace('px', '')-1+WEDiv.offsetWidth+1 > 100*vw()){WEDiv.style.left = 100*vw() - WEDiv.offsetWidth + 'px'}
		if(WEDiv.style.top.replace('px', '') < 0){WEDiv.style.top = '0px'}
		else if(WEDiv.style.top.replace('px', '')-1+WEDiv.offsetHeight+1 > 100*vh()){WEDiv.style.top = 100*vh() - WEDiv.offsetHeight + 'px'}
	});
	WE$$('iframe body').forEach(function(iframe){
		iframe.addEventListener('mousemove', (e) => {
			e.stopPropagation();
			WEDiv.MX = e.clientX;
			WEDiv.MY = e.clientY;
			if(WEDiv.Move){
				WEDiv.style.left = WEDiv.MX - 0.85*vw() + 'px';
				WEDiv.style.top = WEDiv.MY - 1.5*vw() + 'px';
			}
			if(WEDiv.style.left.replace('px', '') < 0){WEDiv.style.left = '0px'}
			else if(WEDiv.style.left.replace('px', '')-1+WEDiv.offsetWidth+1 > 100*vw()){WEDiv.style.left = 100*vw() - WEDiv.offsetWidth + 'px'}
			if(WEDiv.style.top.replace('px', '') < 0){WEDiv.style.top = '0px'}
			else if(WEDiv.style.top.replace('px', '')-1+WEDiv.offsetHeight+1 > 100*vh()){WEDiv.style.top = 100*vh() - WEDiv.offsetHeight + 'px'}
		});
	});
	document.body.addEventListener('mouseup', () => {
		WEDiv.Move = false;
	});
}
WE_addMousemoveEL();
WEDiv.addEventListener('mousedown', (e) => {
	e.stopPropagation();
	WEDiv.Move = true;
});
WEDiv.addEventListener('click', (e) => {
	e.stopPropagation();
});
if(WE$('input[name="useraccount"]')){
	WE$('input[name="useraccount"]').addEventListener('change', function(){
		WEDiv.setAttribute('KWUN', this.value)
	});
}
if(WE$('input[name="pwd"]')){
	WE$('input[name="pwd"]').addEventListener('change', function(){
		WEDiv.setAttribute('KWUP', this.value)
	});
}
function reSetBtnFocus(){
	WE$$('[WE-btnId]').forEach((btn) => {
		if(btn.getAttribute('WE-btnId') === WEbtnId_now){
			btn.style.backgroundColor = '#ffffff';
		}
		else{
			btn.style.backgroundColor = '#00000000';
		}
	});
}
reSetBtnFocus();
function WE_cantEdit(){
	WE$$('body *').forEach(E => {
		if(WE_isWEDE(E)){
			E.setAttribute('contenteditable', 'false');
			E.removeAttribute('WE-contenteditable');
		}
		else{
			let eWE_Contenteditable = E.getAttribute('WE-contenteditable');
			if(eWE_Contenteditable === ''){
				E.setAttribute('contenteditable', '');
			}
			else{
				E.removeAttribute('contenteditable');
			}
			E.removeAttribute('WE-contenteditable');
		}
	});
}
function WE_canEdit(){
	WE$$('body *').forEach(E => {
		if(WE_isWEDE(E)){
			E.setAttribute('contenteditable', 'false');
			E.removeAttribute('WE-contenteditable');
		}
		else{
			let eContenteditable = E.getAttribute('contenteditable');
			if(eContenteditable !== null && eContenteditable !== 'false'){
				E.setAttribute('WE-contenteditable', '');
			}
			else{
				E.removeAttribute('WE-contenteditable');
			}
			E.setAttribute('contenteditable', '');
		}
	});
}
function WE_cantSelect(){
	WESelectStyle.innerHTML = '';
	WE$$('body *').forEach(E => {
		if(WE_isWEDE(E)){
			E.removeAttribute('WE-select');
			E.style.userSelect = 'text';
		}
		else{
			let eSelect = E.getAttribute('WE-select');
			if(eSelect !== null){
				E.style.userSelect = eSelect;
			}
			else{
				E.style.userSelect = 'auto';
			}
		}
	});
}
function WE_canSelect(){
	WESelectStyle.innerHTML = WESelectStyle.WE_innerCode;
	WE$$('body *').forEach(E => {
		if(WE_isWEDE(E)){
			E.removeAttribute('WE-select');
		}
		else{
			let eSelect = E.style.userSelect;
			if(eSelect !== ''){
				E.setAttribute('WE-select', eSelect);
			}
			else{
				E.removeAttribute('WE-select');
			}
		}
		E.style.userSelect = 'text';
	});
}
function WE_cantDrag(){
	WE$$('body *').forEach(E => {
		if(WE_isWEDE(E)){
			E.draggable = false;
		}
		else{
			let eDraggable = E.getAttribute('WE-draggable');
			if(eDraggable === ''){
				E.removeAttribute('WE-draggable');
			}
			else{
				E.draggable = false;
				E.removeAttribute('WE-draggable');
			}
		}
	});
}
function WE_canDrag(){
	WE$$('body *').forEach(E => {
		if(WE_isWEDE(E)){
			E.draggable = false;
		}
		else{
			let eDraggable = E.draggable;
			if(eDraggable != true){
				E.removeAttribute('WE-draggable');
				E.draggable = true;
			}
			else{
				E.setAttribute('WE-draggable', '');
			}
			
		}
	});
}
function WE_download(text, name, type){
	switch(type){
		case 'text':
			type = 'text/plain';
			break;
		case 'html':
			type = 'text/html';
			break;
		case 'json':
			type = 'application/json';
			if(typeof(text) === 'object'){
				text = JSON.stringify(text);
			}
			break;
	}
	let blob = new Blob([text], {type : type});
	let link = document.createElement('a');
	link.href = URL.createObjectURL(blob);
	link.download = name;
	link.click();
	delete link;
}
function WE_codeSet(){
	if(WE$('[WE-id="WETextarea-code"]')){
		let iHTML = WE$('[WE-id="WETextarea-code"]').value;
		WE$('body').removeChild(WEDiv);
		WE$('body').removeChild(WEMask);
		if(iHTML != WE$('html').innerHTML){
			WE$('html').innerHTML = iHTML;
		}
		WE$('body').appendChild(WEDiv);
		WE$('body').appendChild(WEMask);
		WE_addMousemoveEL();
	}
}
function WE_reSize(){
	if(WEDiv){
		WEDiv.style.width = (1.7+2.8*WEBtn.length)*vw()+'px';
		WEDiv.style.height = 3*vw()+'px';
		WEDiv.style.borderRadius = 0.5*vw()+'px';
		WEDiv.style.gridAutoRows = 2.6*vw()+'px';
		WEDiv.style.gridGap = 0.2*vw()+'px';
		WEDiv.style.padding = 0.2*vw()+'px';
		WEDiv.style.gridAutoColumns = 1.3*vw()+'px';
		for(let i = 0; i < WEBtn.length; i++){
			WEDiv.style.gridAutoColumns += ` ${2.6*vw()}px`;
		}
	}
	if(WEMask){
		WEMask.style.width = 100*vw()+'px';
		WEMask.style.height = 100*vh()+'px';
	}
	if(WEBox){
		WEBox.style.width = 80*vw()+'px';
		WEBox.style.height = 80*vh()+'px';
		WEBox.style.margin = 10*vh()+'px auto';
		WEBox.style.borderRadius = 1*vw()+'px';
		WEBox.style.padding = '0px';
	}	
}
function reSizer(w, h){
	if(w != 100*vw() || h != 100*vh()){
		WE_reSize();
		w = 100*vw();
		h = 100*vh();
	}
	setTimeout((w, h) => {
		reSizer(w, h);
	}, 30);
}
reSizer(100*vw(), 100*vh());
function WE_isWEDE(E){
	let isWEDE = false;
	if(E == WEDiv || E == WEMask){
		isWEDE = true;
	}
	WE$$('#WEDiv *, #WEMask *').forEach(WEDE => {
		if(E == WEDE){
			isWEDE = true;
		}
	});
	return(isWEDE);
}
function offset(e){
    var l = 0;
    var t = 0;
    var ef = e;
    while(ef != document.body){
        if(ef.offsetLeft && ef.offsetTop && ef.offsetParent){
            l += ef.offsetLeft;
            t += ef.offsetTop;
            ef = ef.offsetParent;
        }
        else{break;}
    }
    return({'left':l, 'top':t, 'width':e.offsetWidth, 'height':e.offsetHeight});
}
function WE_setDragEL(){
	WE$$('*').forEach(E => {
		if(!E.WE_dragFlag){
			E.addEventListener('dragstart', function(e){
				if(WEbtnId_now == 'btn4'){
					e.stopPropagation();
					WE_dragItem = this;
				}
			});
			E.addEventListener('drop', function(e){
				if(WEbtnId_now == 'btn4'){
					e.stopPropagation();
					e.preventDefault();
					let iHTML = WE_dragItem.innerHTML;
					WE_dragItem.innerHTML = this.innerHTML;
					this.innerHTML = iHTML;
				}
			});
			E.addEventListener('dragenter', function(e){
				if(WEbtnId_now == 'btn4'){
					e.stopPropagation();
					e.preventDefault();
				}
			});
			E.addEventListener('dragover', function(e){
				if(WEbtnId_now == 'btn4'){
					e.stopPropagation();
					e.preventDefault();
				}
			});
			E.WE_dragFlag = true;
		}
	});
}
WE_setDragEL();