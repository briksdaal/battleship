(()=>{"use strict";var t={426:(t,e,n)=>{n.d(e,{Z:()=>o});var a=n(81),r=n.n(a),s=n(645),i=n.n(s)()(r());i.push([t.id,"@import url(https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap);"]),i.push([t.id,':root {\n  font-size: 18px;\n  --cell-size: 40px;\n}\n\n* {\n  padding: 0;\n  margin: 0;\n  font-family: "Roboto", sans-serif;\n  box-sizing: border-box;\n}\n\n.main {\n  padding: 40px;\n}\n\n.heading-container {\n  text-align: center;\n}\n\n.main-heading {\n  font-size: 3rem;\n}\n\n.boards-container {\n  padding-top: 60px;\n  display: flex;\n  gap: 300px;\n  justify-content: center;\n}\n\n.board {\n  display: inline-grid;\n  grid-template-columns: repeat(10, var(--cell-size));\n  grid-template-rows: repeat(10, var(--cell-size));\n  gap: 2px;\n  background-color: black;\n  border: 2px solid black;\n}\n\n.cell {\n  background: white;\n  cursor: pointer;\n}\n\n.cell.ship {\n  background: green;\n  cursor: auto;\n}\n\n.cell.hit {\n  background: red;\n  cursor: auto;\n}\n\n.cell.miss {\n  background: grey;\n  cursor: auto;\n}\n\n.cell.revealed {\n  background: rgb(209, 209, 209);\n  cursor: auto;\n}\n\n.rotation-btn {\n  width: 40px;\n  height: 40px;\n}\n',""]);const o=i},645:t=>{t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n="",a=void 0!==e[5];return e[4]&&(n+="@supports (".concat(e[4],") {")),e[2]&&(n+="@media ".concat(e[2]," {")),a&&(n+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),n+=t(e),a&&(n+="}"),e[2]&&(n+="}"),e[4]&&(n+="}"),n})).join("")},e.i=function(t,n,a,r,s){"string"==typeof t&&(t=[[null,t,void 0]]);var i={};if(a)for(var o=0;o<this.length;o++){var l=this[o][0];null!=l&&(i[l]=!0)}for(var h=0;h<t.length;h++){var d=[].concat(t[h]);a&&i[d[0]]||(void 0!==s&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=s),n&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=n):d[2]=n),r&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=r):d[4]="".concat(r)),e.push(d))}},e}},81:t=>{t.exports=function(t){return t[1]}},379:t=>{var e=[];function n(t){for(var n=-1,a=0;a<e.length;a++)if(e[a].identifier===t){n=a;break}return n}function a(t,a){for(var s={},i=[],o=0;o<t.length;o++){var l=t[o],h=a.base?l[0]+a.base:l[0],d=s[h]||0,c="".concat(h," ").concat(d);s[h]=d+1;var p=n(c),u={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==p)e[p].references++,e[p].updater(u);else{var m=r(u,a);a.byIndex=o,e.splice(o,0,{identifier:c,updater:m,references:1})}i.push(c)}return i}function r(t,e){var n=e.domAPI(e);return n.update(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap&&e.supports===t.supports&&e.layer===t.layer)return;n.update(t=e)}else n.remove()}}t.exports=function(t,r){var s=a(t=t||[],r=r||{});return function(t){t=t||[];for(var i=0;i<s.length;i++){var o=n(s[i]);e[o].references--}for(var l=a(t,r),h=0;h<s.length;h++){var d=n(s[h]);0===e[d].references&&(e[d].updater(),e.splice(d,1))}s=l}}},569:t=>{var e={};t.exports=function(t,n){var a=function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}e[t]=n}return e[t]}(t);if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(n)}},216:t=>{t.exports=function(t){var e=document.createElement("style");return t.setAttributes(e,t.attributes),t.insert(e,t.options),e}},565:(t,e,n)=>{t.exports=function(t){var e=n.nc;e&&t.setAttribute("nonce",e)}},795:t=>{t.exports=function(t){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=t.insertStyleElement(t);return{update:function(n){!function(t,e,n){var a="";n.supports&&(a+="@supports (".concat(n.supports,") {")),n.media&&(a+="@media ".concat(n.media," {"));var r=void 0!==n.layer;r&&(a+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),a+=n.css,r&&(a+="}"),n.media&&(a+="}"),n.supports&&(a+="}");var s=n.sourceMap;s&&"undefined"!=typeof btoa&&(a+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(s))))," */")),e.styleTagTransform(a,t,e.options)}(e,t,n)},remove:function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(e)}}}},589:t=>{t.exports=function(t,e){if(e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}}},e={};function n(a){var r=e[a];if(void 0!==r)return r.exports;var s=e[a]={id:a,exports:{}};return t[a](s,s.exports,n),s.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var a in e)n.o(e,a)&&!n.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:e[a]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.nc=void 0,(()=>{class t{#t;#e;#n;#a;constructor(e){Number.isInteger(e)&&e>=0&&e<5?(this.#t=e,[this.#e,this.#n]=t.#r[e],this.#a=0):(this.#t=-1,this.#e="Illegal ship",this.#n=0,this.#a=0)}get id(){return this.#t}get name(){return this.#e}get length(){return this.#n}get hits(){return this.#a}hit(){this.#a!==this.#n&&(this.#a+=1)}isSunk(){return this.#a===this.#n}static#r=[["Carrier",5],["Battleship",4],["Destroyer",3],["Submarine",3],["Patrol Boat",2]]}const e=t;class a{#s;#i;#o=[];constructor(){this.#i=[...new Array(10)].map((()=>[...new Array(10)].map((()=>null)))),this.#s=null}get board(){return this.#i}placeShip(t,n,a=!0){const r=new e(t);if(-1===r.id||!this.isLegalPlacement(r.length,n,a))return!1;const[s,i]=n,o=a?s+1:s+r.length,l=a?i+r.length:i+1;for(let t=s;t<o;t+=1)for(let e=i;e<l;e+=1)this.#i[t][e]=r;return this.#l(r.length,n,a,t),this.#o.push(r),!0}isShip(t){const[n,a]=t;return this.#i[n][a]instanceof e}receiveAttack(t){if(!a.#h(t))return!1;const[e,n]=t;if(null!==this.#i[e][n]&&("attackResult"in this.#i[e][n]||!0===this.#i[e][n].revealed))return!1;if(this.#s={coordinates:t,type:0},this.isShip(t)){const t=this.#i[e][n];t.hit(),this.#i[e][n]={attackResult:!0},this.#s.type=1,t.isSunk()&&(this.#d(t),this.#s.type=2)}else null===this.#i[e][n]?this.#i[e][n]={attackResult:!1}:this.#i[e][n].attackResult=!1;return!0}allSunk(){return this.#o.length>0&&this.#o.every((t=>t.isSunk()))}allPlaced(){return 5===this.#o.length&&this.#o.some((t=>0===t.id))&&this.#o.some((t=>1===t.id))&&this.#o.some((t=>2===t.id))&&this.#o.some((t=>3===t.id))&&this.#o.some((t=>4===t.id))}getCellForRender(t){const[e,n]=t,a=this.#i[e][n];let r;return r=null===a?0:this.isShip(t)?1:"attackResult"in a&&!0===a.attackResult?2:"attackResult"in a&&!1===a.attackResult?3:!0===a.revealed?4:0,r}isLegalPlacement(t,e,n){const[r,s]=e,i=n?r+1:r+t,o=n?s+t:s+1;for(let t=r;t<i;t+=1)for(let e=s;e<o;e+=1)if(!a.#h([t,e])||this.#c([t,e]))return!1;return!0}reset(){this.#i=this.#i.map((t=>t.map((()=>null)))),this.#o=[],this.#s=null}get lastEvent(){return this.#s}static#h(t){const[e,n]=t;return e>=0&&e<10&&n>=0&&n<10}#c(t){const[e,n]=t;return this.#i[e][n]}#l(t,e,n,r){const[s,i]=e,o=n?s+1:s+t,l=n?i+t:i+1;for(let t=s-1;t<o+1;t+=1)for(let e=i-1;e<l+1;e+=1)!a.#h([t,e])||t!==s-1&&t!==o&&e!==i-1&&e!==l||(this.#c([t,e])||(this.#i[t][e]={neighbor:[]}),this.#i[t][e].neighbor.push(r))}#d(t){const e=t.id;for(let t=0;t<10;t+=1)for(let n=0;n<10;n+=1)null!==this.#i[t][n]&&this.#i[t][n].neighbor&&this.#i[t][n].neighbor.includes(e)&&(this.#i[t][n].revealed=!0)}}const r=a;class s{#p;#u;#m;constructor(t){this.#p=t,this.gameboard=new r,this.#m=[],this.smell=null}set enemy(t){this.#u=t}get enemy(){return this.#u}get isHuman(){return this.#p}reset(){this.#m=[]}#g(){return this.#u.gameboard.lastEvent}makeMove(t){return this.enemy instanceof s&&this.enemy.gameboard.receiveAttack(t)}randomMove(){let t=!0;for(;t;)t=!this.makeMove(s.#v());return!0}pcMove(){const t=this.#g();if(console.log(t),null===t)this.randomMove();else if(2===t.type)this.smell=null,this.#m=[],this.randomMove();else if(0===t.type)0===this.#m.length?this.randomMove():this.#y();else if(1===t.type){const[e,n]=t.coordinates;this.#m.push([e-1,n]),this.#m.push([e+1,n]),this.#m.push([e,n-1]),this.#m.push([e,n+1]),this.smell?this.smell[0]===e?this.#m=this.#m.filter((t=>t[0]===e)):this.smell[1]===n&&(this.#m=this.#m.filter((t=>t[1]===n))):this.smell=t.coordinates,this.#y()}}#y(){let t;do{t=this.#m.pop()}while(!this.makeMove(t))}randomPlace(){for(let t=0;t<5;t+=1){let e=!0;for(;e;)e=!this.gameboard.placeShip(t,s.#v(),s.#f())}return!0}testPlace(){this.gameboard.placeShip(0,[0,1],!0),this.gameboard.placeShip(1,[2,0],!0),this.gameboard.placeShip(2,[2,6],!1),this.gameboard.placeShip(3,[4,4],!1),this.gameboard.placeShip(4,[8,8],!0)}static#v(){return[Math.floor(10*Math.random()),Math.floor(10*Math.random())]}static#f(){return 0===Math.floor(2*Math.random())}}const i=s;class o{constructor(){this.game=new class{#b;#S;constructor(){this.#b=new i(!0),this.#S=new i(!1),this.#b.enemy=this.#S,this.#S.enemy=this.#b,this.gameOver=null}get player1(){return this.#b}get player2(){return this.#S}isGameOver(){if(this.gameOver)return this.gameOver;let t;return t=this.#b.gameboard.allSunk()?this.#S:this.#S.gameboard.allSunk()?this.#b:null,this.gameOver=t,t}reset(){this.player1.gameboard.reset(),this.player2.gameboard.reset(),this.gameOver=null}},this.init(),this.placeShips()}init(){this.main=document.createElement("div"),this.main.classList.add("main");const t=document.createElement("div");t.classList.add("heading-container");const e=document.createElement("h1");e.classList.add("main-heading"),e.textContent="Battleship",t.appendChild(e);const n=document.createElement("div");n.classList.add("boards-container");const a=document.createElement("div");a.classList.add("user-container");const r=document.createElement("div");r.classList.add("opponent-container");const s=document.createElement("h3");s.textContent="Player Board";const i=this.createBoard(!0);i.classList.add("user-board"),a.appendChild(s),a.appendChild(i);const o=document.createElement("h3");o.textContent="PC Board";const l=this.createBoard(!1);l.classList.add("opponent-board"),r.appendChild(o),r.appendChild(l),n.appendChild(a),n.appendChild(r);const h=document.createElement("div");h.classList.add("status-container"),this.status=document.createElement("h2"),this.status.classList.add("game-status"),h.appendChild(this.status),this.main.appendChild(t),this.main.appendChild(n),this.main.appendChild(h),document.body.appendChild(this.main)}createBoard(t){const e=[...new Array(10)].map((()=>[...new Array(10)])),n=document.createElement("div");n.classList.add("board");for(let t=0;t<10;t+=1)for(let a=0;a<10;a+=1){const r=document.createElement("div");r.classList.add("cell"),r.dataset.row=t,r.dataset.col=a,e[t][a]=r,n.appendChild(r)}return t?this.playerBoard=e:this.opponentBoard=e,n}placeShips(){this.status.textContent="Place Carrier...",this.currentShip=0,this.rotationBtn=document.createElement("button"),this.rotationBtn.textContent="RRR",this.rotationBtn.classList.add("rotation-btn"),document.querySelector(".user-container").appendChild(this.rotationBtn),this.rotationDirection=!0,this.rotationBtn.addEventListener("click",this.changeRotation),document.querySelector(".user-board").addEventListener("mouseout",this.player1Render),this.playerBoard.forEach((t=>{t.forEach((t=>{t.addEventListener("mouseover",this.showShip),t.addEventListener("click",this.placeShipOnClick)}))}))}showShip=t=>{const e=o.#r[this.currentShip][1];this.renderBoard(this.game.player1);const n=[+t.target.dataset.row,+t.target.dataset.col],[a,r]=n,s=this.game.player1.gameboard.isLegalPlacement(e,n,this.rotationDirection)?"ship":"hit";if(this.rotationDirection)for(let t=r;t<r+e&&t<10;t+=1)this.playerBoard[a][t].classList.add(s);else for(let t=a;t<a+e&&t<10;t+=1)this.playerBoard[t][r].classList.add(s)};changeRotation=()=>{this.rotationDirection=!this.rotationDirection};player1Render=()=>this.renderBoard(this.game.player1);placeShipOnClick=t=>{const e=[+t.target.dataset.row,+t.target.dataset.col];this.game.player1.gameboard.placeShip(this.currentShip,e,this.rotationDirection)&&this.afterShipPlaced()};afterShipPlaced(){if(this.rotationDirection=!0,this.currentShip+=1,5===this.currentShip)this.finishPlacementStage();else{const t=o.#r[this.currentShip][0];this.status.textContent=`Place ${t}...`}}finishPlacementStage(){this.rotationBtn.removeEventListener("click",this.changeRotation),this.rotationBtn.remove(),document.querySelector(".user-board").removeEventListener("mouseout",this.player1Render),this.playerBoard.forEach((t=>{t.forEach((t=>{t.removeEventListener("mouseover",this.showShip),t.removeEventListener("click",this.placeShipOnClick)}))})),this.game.player2.randomPlace(),this.setTurnHandler()}renderBoard(t){const e=t===this.game.player1,n=e?this.game.player1.gameboard:this.game.player2.gameboard,a=e?this.playerBoard:this.opponentBoard;for(let t=0;t<10;t+=1)for(let r=0;r<10;r+=1){a[t][r].className="cell";const s=n.getCellForRender([t,r]);1===s&&e?a[t][r].classList.add("ship"):2===s?a[t][r].classList.add("hit"):3===s?a[t][r].classList.add("miss"):4===s&&a[t][r].classList.add("revealed")}}setTurnHandler(){this.status.textContent="Attack!",this.opponentBoard.forEach((t=>{t.forEach((t=>{t.addEventListener("click",this.boundPlayerMove)}))}))}boundPlayerMove=this.playerMove.bind(this);playerMove(t){const e=[t.target.dataset.row,t.target.dataset.col];if(this.game.player1.makeMove(e)){this.renderBoard(this.game.player2);let t=this.game.isGameOver();t||(this.game.player2.pcMove(),this.renderBoard(this.game.player1),t=this.game.isGameOver()),t&&this.gameOverCleanUp(t)}}gameOverCleanUp(t){this.main.classList.add("game-over"),this.status.textContent=`Game Over, ${t===this.game.player1?"You":"PC"} won!`,this.opponentBoard.forEach((t=>{t.forEach((t=>{t.removeEventListener("click",this.boundPlayerMove)}))})),this.playAgainBtn=document.createElement("button"),this.playAgainBtn.classList.add("play-again-btn"),this.playAgainBtn.textContent="Play Again",document.querySelector(".status-container").appendChild(this.playAgainBtn),this.playAgainBtn.addEventListener("click",this.playAgain)}playAgain=()=>{this.playAgainBtn.removeEventListener("click",this.playAgain),this.playAgainBtn.remove(),this.game.reset(),this.renderBoard(this.game.player1),this.renderBoard(this.game.player2),this.placeShips()};static#r=[["Carrier",5],["Battleship",4],["Destroyer",3],["Submarine",3],["Patrol Boat",2]]}const l=o;var h=n(379),d=n.n(h),c=n(795),p=n.n(c),u=n(569),m=n.n(u),g=n(565),v=n.n(g),y=n(216),f=n.n(y),b=n(589),S=n.n(b),E=n(426),B={};B.styleTagTransform=S(),B.setAttributes=v(),B.insert=m().bind(null,"head"),B.domAPI=p(),B.insertStyleElement=f(),d()(E.Z,B),E.Z&&E.Z.locals&&E.Z.locals,new l})()})();