/*! For license information please see main.js.LICENSE.txt */
(()=>{"use strict";function e(e,r){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=t(e))||r&&e&&"number"==typeof e.length){n&&(e=n);var a=0,i=function(){};return{s:i,n:function(){return a>=e.length?{done:!0}:{done:!1,value:e[a++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,s=!0,l=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return s=e.done,e},e:function(e){l=!0,o=e},f:function(){try{s||null==n.return||n.return()}finally{if(l)throw o}}}}function t(e,t){if(e){if("string"==typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(e,t):void 0}}function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function n(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var a=function(){function a(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),this.boardSize=8,this.container=null,this.boardEl=null,this.cells=[],this.cellClickListeners=[],this.cellEnterListeners=[],this.cellLeaveListeners=[],this.newGameListeners=[],this.saveGameListeners=[],this.loadGameListeners=[]}var i,o,s;return i=a,o=[{key:"bindToDOM",value:function(e){if(!(e instanceof HTMLElement))throw new Error("container is not HTMLElement");this.container=e}},{key:"drawUi",value:function(e){var t,r,n=this;this.checkBinding(),this.container.innerHTML='\n      <div class="controls">\n        <button data-id="action-restart" class="btn">New Game</button>\n        <button data-id="action-save" class="btn">Save Game</button>\n        <button data-id="action-load" class="btn">Load Game</button>\n      </div>\n      <div class="board-container">\n        <div data-id="board" class="board"></div>\n      </div>\n    ',this.newGameEl=this.container.querySelector("[data-id=action-restart]"),this.saveGameEl=this.container.querySelector("[data-id=action-save]"),this.loadGameEl=this.container.querySelector("[data-id=action-load]"),this.newGameEl.addEventListener("click",(function(e){return n.onNewGameClick(e)})),this.saveGameEl.addEventListener("click",(function(e){return n.onSaveGameClick(e)})),this.loadGameEl.addEventListener("click",(function(e){return n.onLoadGameClick(e)})),this.boardEl=this.container.querySelector("[data-id=board]"),this.boardEl.classList.add(e);for(var a=0;a<Math.pow(this.boardSize,2);a+=1){var i=document.createElement("div");i.classList.add("cell","map-tile","map-tile-".concat((t=a,r=this.boardSize,0===t?"top-left":t===r-1?"top-right":t>0&&t<r-1?"top":t===r*r-1?"bottom-right":t===r*r-r?"bottom-left":t>r*r-r&&t<r*r-1?"bottom":t%r==0?"left":t%r==r-1?"right":"center"))),i.addEventListener("mouseenter",(function(e){return n.onCellEnter(e)})),i.addEventListener("mouseleave",(function(e){return n.onCellLeave(e)})),i.addEventListener("click",(function(e){return n.onCellClick(e)})),this.boardEl.appendChild(i)}this.cells=Array.from(this.boardEl.children)}},{key:"redrawPositions",value:function(t){var r,n=e(this.cells);try{for(n.s();!(r=n.n()).done;)r.value.innerHTML=""}catch(e){n.e(e)}finally{n.f()}var a,i,o=e(t);try{for(o.s();!(a=o.n()).done;){var s=a.value,l=this.boardEl.children[s.position],c=document.createElement("div");c.classList.add("character",s.character.type);var u=document.createElement("div");u.classList.add("health-level");var h=document.createElement("div");h.classList.add("health-level-indicator","health-level-indicator-".concat((i=s.character.health)<15?"critical":i<50?"normal":"high")),h.style.width="".concat(s.character.health,"%"),u.appendChild(h),c.appendChild(u),l.appendChild(c)}}catch(e){o.e(e)}finally{o.f()}}},{key:"addCellEnterListener",value:function(e){this.cellEnterListeners.push(e)}},{key:"addCellLeaveListener",value:function(e){this.cellLeaveListeners.push(e)}},{key:"addCellClickListener",value:function(e){this.cellClickListeners.push(e)}},{key:"addNewGameListener",value:function(e){this.newGameListeners.push(e)}},{key:"addSaveGameListener",value:function(e){this.saveGameListeners.push(e)}},{key:"addLoadGameListener",value:function(e){this.loadGameListeners.push(e)}},{key:"onCellEnter",value:function(e){e.preventDefault();var t=this.cells.indexOf(e.currentTarget);this.cellEnterListeners.forEach((function(e){return e.call(null,t)}))}},{key:"onCellLeave",value:function(e){e.preventDefault();var t=this.cells.indexOf(e.currentTarget);this.cellLeaveListeners.forEach((function(e){return e.call(null,t)}))}},{key:"onCellClick",value:function(e){var t=this.cells.indexOf(e.currentTarget);this.cellClickListeners.forEach((function(e){return e.call(null,t)}))}},{key:"onNewGameClick",value:function(e){e.preventDefault(),this.newGameListeners.forEach((function(e){return e.call(null)}))}},{key:"onSaveGameClick",value:function(e){e.preventDefault(),this.saveGameListeners.forEach((function(e){return e.call(null)}))}},{key:"onLoadGameClick",value:function(e){e.preventDefault(),this.loadGameListeners.forEach((function(e){return e.call(null)}))}},{key:"selectCell",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"yellow";this.deselectCell(e),this.cells[e].classList.add("selected","selected-".concat(t))}},{key:"deselectCell",value:function(e){var n,a,i=this.cells[e];(n=i.classList).remove.apply(n,function(e){if(Array.isArray(e))return r(e)}(a=Array.from(i.classList).filter((function(e){return e.startsWith("selected")})))||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(a)||t(a)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}())}},{key:"showCellTooltip",value:function(e,t){this.cells[t].title=e}},{key:"hideCellTooltip",value:function(e){this.cells[e].title=""}},{key:"showDamage",value:function(e,t){var r=this;return new Promise((function(n){var a=r.cells[e],i=document.createElement("span");i.textContent=t,i.classList.add("damage"),a.appendChild(i),i.addEventListener("animationend",(function(){a.removeChild(i),n()}))}))}},{key:"setCursor",value:function(e){this.boardEl.style.cursor=e}},{key:"checkBinding",value:function(){if(null===this.container)throw new Error("GamePlay not bind to DOM")}}],s=[{key:"showError",value:function(e){alert(e)}},{key:"showMessage",value:function(e){alert(e)}}],o&&n(i.prototype,o),s&&n(i,s),Object.defineProperty(i,"prototype",{writable:!1}),a}();function i(e){return i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i(e)}function o(){o=function(){return e};var e={},t=Object.prototype,r=t.hasOwnProperty,n="function"==typeof Symbol?Symbol:{},a=n.iterator||"@@iterator",s=n.asyncIterator||"@@asyncIterator",l=n.toStringTag||"@@toStringTag";function c(e,t,r){return Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{c({},"")}catch(e){c=function(e,t,r){return e[t]=r}}function u(e,t,r,n){var a=t&&t.prototype instanceof m?t:m,i=Object.create(a.prototype),o=new P(n||[]);return i._invoke=function(e,t,r){var n="suspendedStart";return function(a,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===a)throw i;return{value:void 0,done:!0}}for(r.method=a,r.arg=i;;){var o=r.delegate;if(o){var s=S(o,r);if(s){if(s===f)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var l=h(e,t,r);if("normal"===l.type){if(n=r.done?"completed":"suspendedYield",l.arg===f)continue;return{value:l.arg,done:r.done}}"throw"===l.type&&(n="completed",r.method="throw",r.arg=l.arg)}}}(e,r,o),i}function h(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(e){return{type:"throw",arg:e}}}e.wrap=u;var f={};function m(){}function p(){}function d(){}var y={};c(y,a,(function(){return this}));var v=Object.getPrototypeOf,g=v&&v(v(T([])));g&&g!==t&&r.call(g,a)&&(y=g);var b=d.prototype=m.prototype=Object.create(y);function w(e){["next","throw","return"].forEach((function(t){c(e,t,(function(e){return this._invoke(t,e)}))}))}function L(e,t){function n(a,o,s,l){var c=h(e[a],e,o);if("throw"!==c.type){var u=c.arg,f=u.value;return f&&"object"==i(f)&&r.call(f,"__await")?t.resolve(f.__await).then((function(e){n("next",e,s,l)}),(function(e){n("throw",e,s,l)})):t.resolve(f).then((function(e){u.value=e,s(u)}),(function(e){return n("throw",e,s,l)}))}l(c.arg)}var a;this._invoke=function(e,r){function i(){return new t((function(t,a){n(e,r,t,a)}))}return a=a?a.then(i,i):i()}}function S(e,t){var r=e.iterator[t.method];if(void 0===r){if(t.delegate=null,"throw"===t.method){if(e.iterator.return&&(t.method="return",t.arg=void 0,S(e,t),"throw"===t.method))return f;t.method="throw",t.arg=new TypeError("The iterator does not provide a 'throw' method")}return f}var n=h(r,e.iterator,t.arg);if("throw"===n.type)return t.method="throw",t.arg=n.arg,t.delegate=null,f;var a=n.arg;return a?a.done?(t[e.resultName]=a.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,f):a:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,f)}function C(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function k(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function P(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(C,this),this.reset(!0)}function T(e){if(e){var t=e[a];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var n=-1,i=function t(){for(;++n<e.length;)if(r.call(e,n))return t.value=e[n],t.done=!1,t;return t.value=void 0,t.done=!0,t};return i.next=i}}return{next:E}}function E(){return{value:void 0,done:!0}}return p.prototype=d,c(b,"constructor",d),c(d,"constructor",p),p.displayName=c(d,l,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===p||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,d):(e.__proto__=d,c(e,l,"GeneratorFunction")),e.prototype=Object.create(b),e},e.awrap=function(e){return{__await:e}},w(L.prototype),c(L.prototype,s,(function(){return this})),e.AsyncIterator=L,e.async=function(t,r,n,a,i){void 0===i&&(i=Promise);var o=new L(u(t,r,n,a),i);return e.isGeneratorFunction(r)?o:o.next().then((function(e){return e.done?e.value:o.next()}))},w(b),c(b,l,"Generator"),c(b,a,(function(){return this})),c(b,"toString",(function(){return"[object Generator]"})),e.keys=function(e){var t=[];for(var r in e)t.push(r);return t.reverse(),function r(){for(;t.length;){var n=t.pop();if(n in e)return r.value=n,r.done=!1,r}return r.done=!0,r}},e.values=T,P.prototype={constructor:P,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(k),!e)for(var t in this)"t"===t.charAt(0)&&r.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function n(r,n){return o.type="throw",o.arg=e,t.next=r,n&&(t.method="next",t.arg=void 0),!!n}for(var a=this.tryEntries.length-1;a>=0;--a){var i=this.tryEntries[a],o=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var s=r.call(i,"catchLoc"),l=r.call(i,"finallyLoc");if(s&&l){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(s){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(e,t){for(var n=this.tryEntries.length-1;n>=0;--n){var a=this.tryEntries[n];if(a.tryLoc<=this.prev&&r.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var i=a;break}}i&&("break"===e||"continue"===e)&&i.tryLoc<=t&&t<=i.finallyLoc&&(i=null);var o=i?i.completion:{};return o.type=e,o.arg=t,i?(this.method="next",this.next=i.finallyLoc,f):this.complete(o)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),f},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),k(r),f}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var a=n.arg;k(r)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,r){return this.delegate={iterator:T(e),resultName:t,nextLoc:r},"next"===this.method&&(this.arg=void 0),f}},e}var s=o().mark(l);function l(e,t){var r,n;return o().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return r=e[Math.floor(Math.random()*e.length)],n=Math.floor(Math.random()*t)+1,a.next=5,new r(n);case 5:a.next=0;break;case 7:case"end":return a.stop()}}),s)}function c(e,t,r){return new Array(r).fill(0).map((function(){return l(e,t).next().value}))}function u(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function h(e,t,r){return t&&u(e.prototype,t),r&&u(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}function f(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var m=h((function e(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"generic";if(f(this,e),this.level=t,this.attack=0,this.defence=0,this.health=50,this.type=r,(this instanceof e?this.constructor:void 0)===e)throw new Error("Нельзя создавать экземпляры базового класса")}));function p(e){return p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},p(e)}function d(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function y(e,t,r){return t&&d(e.prototype,t),r&&d(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}function v(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function g(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&b(e,t)}function b(e,t){return b=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},b(e,t)}function w(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=S(e);if(t){var a=S(this).constructor;r=Reflect.construct(n,arguments,a)}else r=n.apply(this,arguments);return L(this,r)}}function L(e,t){if(t&&("object"===p(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function S(e){return S=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},S(e)}var C=function(e){g(r,e);var t=w(r);function r(e){var n;return v(this,r),(n=t.call(this,e,"bowman")).attack=25,n.defence=25,n.range=2,n}return y(r)}(m),k=function(e){g(r,e);var t=w(r);function r(e){var n;return v(this,r),(n=t.call(this,e,"swordsman")).attack=40,n.defence=10,n.range=4,n}return y(r)}(m),P=function(e){g(r,e);var t=w(r);function r(e){var n;return v(this,r),(n=t.call(this,e,"magician")).attack=10,n.defence=40,n.range=1,n}return y(r)}(m),T=function(e){g(r,e);var t=w(r);function r(e){var n;return v(this,r),(n=t.call(this,e,"vampire")).attack=25,n.defence=25,n.range=2,n}return y(r)}(m),E=function(e){g(r,e);var t=w(r);function r(e){var n;return v(this,r),(n=t.call(this,e,"undead")).attack=40,n.defence=10,n.range=4,n}return y(r)}(m),O=function(e){g(r,e);var t=w(r);function r(e){var n;return v(this,r),(n=t.call(this,e,"daemon")).attack=10,n.defence=40,n.range=1,n}return y(r)}(m);function G(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function x(e,t,r){return t&&G(e.prototype,t),r&&G(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}var j=x((function e(t,r){if(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),!(t instanceof m))throw new Error("character must be instance of Character or its children");if("number"!=typeof r)throw new Error("position must be a number");this.character=t,this.position=r}));const M="prairie",I="desert",A="arctic",D="mountain";function _(e){return function(e){if(Array.isArray(e))return N(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return N(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?N(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function N(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function F(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var R=function(){function e(t){var r,n,a=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),n=function(e){var t=e.type,r=e.level,n=e.health,i=e.attack,o=e.defence,s=e.range,l=a.typeToCharacter(t,r);return l.health=n,l.attack=i,l.defence=o,l.range=s,l},(r="characterFromData")in this?Object.defineProperty(this,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):this[r]=n,this.boardSize=t,this.maxLevel=3,this.allowedPlayerClasses=[P,C,k],this.allowedComputerClasses=[T,E,O],this.resetState()}var t,r;return t=e,(r=[{key:"resetState",value:function(){this.currentTheme=null,this.currentLevel=0,this.currentPlayer="player",this.currentSelection=null,this.playerTeam=[],this.computerTeam=[],this.positions=[],this.nextLevel()}},{key:"nextLevel",value:function(){var e,t,r;if(this.isLevelOver()){switch(this.currentTheme){case M:this.currentTheme=I,this.currentLevel=1,this.playerTeam.forEach(this.healAndLevelUp),(e=this.playerTeam).push.apply(e,_(c(this.allowedPlayerClasses,1,1))),this.computerTeam=c(this.allowedComputerClasses,2,this.playerTeam.length);break;case I:this.currentTheme=A,this.currentLevel=2,this.playerTeam.forEach(this.healAndLevelUp),(t=this.playerTeam).push.apply(t,_(c(this.allowedPlayerClasses,2,2))),this.computerTeam=c(this.allowedComputerClasses,3,this.playerTeam.length);break;case A:this.currentTheme=D,this.currentLevel=3,this.playerTeam.forEach(this.healAndLevelUp),(r=this.playerTeam).push.apply(r,_(c(this.allowedPlayerClasses,3,2))),this.computerTeam=c(this.allowedComputerClasses,4,this.playerTeam.length);break;case D:break;default:this.currentTheme=M,this.playerTeam=c(this.allowedPlayerClasses,1,2),this.computerTeam=c(this.allowedComputerClasses,1,2)}this.reassignPositions()}}},{key:"healAndLevelUp",value:function(e){return e.health=50,e.level++,e}},{key:"reassignPositions",value:function(){var e=this,t=[0,1,8,9,16,17,24,25,32,33,40,41,48,49,56,57],r=[6,7,14,15,22,23,30,31,38,39,46,47,54,55];this.positions=[],this.playerTeam.forEach((function(r){var n=Math.floor(Math.random()*t.length),a=t[n];t.splice(n,1),e.positions.push(new j(r,a))})),this.computerTeam.forEach((function(t){var n=Math.floor(Math.random()*r.length),a=r[n];r.splice(n,1),e.positions.push(new j(t,a))}))}},{key:"select",value:function(e){this.currentSelection=this.positions.find((function(t){return t.character===e}))}},{key:"moveSelectedCharacterTo",value:function(e){var t=this.currentSelection.character;if(t){var r=this.positions.findIndex((function(e){return e.character===t}));this.positions[r].position=e}}},{key:"attack",value:function(e,t){var r=e.character;if(r){var n=this.positions.findIndex((function(e){return e.character===r}));this.positions[n].character.health-=t,this.removeDeadCharacters()}}},{key:"removeDeadCharacters",value:function(){this.positions=this.positions.filter((function(e){return e.character.health>0})),this.computerTeam=this.computerTeam.filter((function(e){return e.health>0})),this.playerTeam=this.playerTeam.filter((function(e){return e.health>0}))}},{key:"isGameOver",value:function(){return this.isLevelOver()&&this.currentLevel>=this.maxLevel}},{key:"isLevelOver",value:function(){return 0===this.playerTeam.length||0===this.computerTeam.length}},{key:"getCharacterAt",value:function(e){var t=this.positions.find((function(t){return t.position===e}));return t?t.character:null}},{key:"restoreFrom",value:function(e){var t=this,r=e.currentTheme,n=e.currentLevel,a=e.currentPlayer,i=e.positions;this.playerTeam=[],this.computerTeam=[],this.currentTheme=r,this.currentLevel=n,this.currentPlayer=a,this.positions=i.map((function(e){var r=e.character,n=e.position,a=t.characterFromData(r);return t.allowedPlayerClasses.includes(a.constructor)&&t.playerTeam.push(a),t.allowedComputerClasses.includes(a.constructor)&&t.computerTeam.push(a),new j(a,n)}))}},{key:"typeToCharacter",value:function(e,t){switch(e){case"bowman":return new C(t);case"swordsman":return new k(t);case"magician":return new P(t);case"vampire":return new T(t);case"undead":return new E(t);case"daemon":return new O(t);default:return null}}},{key:"asObject",value:function(){return{currentTheme:this.currentTheme,currentLevel:this.currentLevel,currentPlayer:this.currentPlayer,positions:this.positions}}}])&&F(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}();function U(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function q(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var z=function(){function e(t,r){var n=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),q(this,"calculateDamage",(function(e,t){return Math.max(e.attack-t.defence,.1*e.attack)})),q(this,"isInRange",(function(e,t,r){return n.getDistance(e,t)<=r})),q(this,"isPositionFree",(function(e){return!n.gameState.positions.find((function(t){return t.position===e}))})),q(this,"isCharacterInPlayerTeam",(function(e){return n.gameState.playerTeam.includes(e)})),q(this,"isCharacterInEnemyTeam",(function(e){return n.gameState.computerTeam.includes(e)})),q(this,"gameLoop",(function(){n.gameState.isGameOver()||n.gameState.isLevelOver()&&(n.gameState.nextLevel(),n.gamePlay.drawUi(n.gameState.currentTheme),n.gamePlay.redrawPositions(n.gameState.positions))})),this.gamePlay=t,this.stateService=r,this.gameState=new R(8)}var t,r;return t=e,(r=[{key:"init",value:function(){this.gamePlay.drawUi(this.gameState.currentTheme),this.gamePlay.redrawPositions(this.gameState.positions),this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this)),this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this)),this.gamePlay.addCellClickListener(this.onCellClick.bind(this)),this.gamePlay.addNewGameListener(this.onNewGame.bind(this)),this.gamePlay.addSaveGameListener(this.onSaveGame.bind(this)),this.gamePlay.addLoadGameListener(this.onLoadGame.bind(this))}},{key:"onCellEnter",value:function(e){if(!this.gameState.isGameOver()){var t=this.gameState.getCharacterAt(e),r=this.gameState.currentSelection;if(t){var n=this.generateTooltip(t);this.gamePlay.showCellTooltip(n,e)}(null===r&&t&&this.isCharacterInPlayerTeam(t)||r&&r.position!==e&&t&&this.isCharacterInPlayerTeam(t))&&this.gamePlay.setCursor("pointer"),null===t&&r&&r.position!==e&&this.isInRange(e,r.position,r.character.range)&&(this.gamePlay.setCursor("pointer"),this.gamePlay.selectCell(e,"green")),t&&this.isCharacterInEnemyTeam(t)&&r&&r.position!==e&&this.isInRange(e,r.position,r.character.range)?(this.gamePlay.setCursor("crosshair"),this.gamePlay.selectCell(e,"red")):t&&r&&r.position!==e&&this.isCharacterInEnemyTeam(t)&&null===this.isInRange(e,r.position,r.character.range)&&this.gamePlay.setCursor("not-allowed")}}},{key:"onCellClick",value:function(e){var t=this;if(!this.gameState.isGameOver()){var r=this.gameState.currentSelection,n=this.gameState.getCharacterAt(e);if(null===n||null===r||n!==r.character){if(n&&this.isCharacterInPlayerTeam(n))this.deSelect(),this.gamePlay.selectCell(e),this.gameState.select(n);else if(n&&null===r&&this.isCharacterInEnemyTeam(n))a.showError("Нельзя выбирать не вашего персонажа");else if(r&&null===n&&this.isInRange(e,r.position,r.character.range))this.gamePlay.deselectCell(r.position),this.gameState.moveSelectedCharacterTo(e),this.gamePlay.deselectCell(e),this.gamePlay.redrawPositions(this.gameState.positions),this.deSelect(),this.gameState.currentPlayer="computer",this.computerTurn();else if(r&&this.isCharacterInEnemyTeam(n)&&this.isInRange(e,r.position,r.character.range)){this.gamePlay.deselectCell(e);var i=this.calculateDamage(r.character,n);this.gameState.attack({character:n},i),this.gamePlay.showDamage(e,i).then((function(){t.gamePlay.redrawPositions(t.gameState.positions),t.deSelect(),t.gameState.currentPlayer="computer",t.computerTurn()}))}this.gameLoop()}}}},{key:"onCellLeave",value:function(e){var t=this.gameState.currentSelection;this.gamePlay.hideCellTooltip(e),this.gamePlay.setCursor("default"),t&&t.position!==e&&this.gamePlay.deselectCell(e)}},{key:"computerTurn",value:function(){var e=this;if("computer"===this.gameState.currentPlayer){var t=this.gameState.computerTeam[Math.floor(Math.random()*this.gameState.computerTeam.length)],r=this.gameState.positions.find((function(e){return e.character===t})),n=this.gameState.positions.filter((function(t){return e.isCharacterInPlayerTeam(t.character)})).reduce((function(t,n){return e.getDistance(n.position,r.position)<e.getDistance(t.position,r.position)?n:t}));if(this.getDistance(r.position,n.position)<=t.range){var a=this.calculateDamage(t,n.character);this.gameState.attack(n,a),this.gamePlay.showDamage(n.position,a).then((function(){e.gameState.currentPlayer="player",e.gamePlay.redrawPositions(e.gameState.positions)}))}else this.moveCloser(r,n.position),this.gamePlay.redrawPositions(this.gameState.positions);this.gameLoop()}}},{key:"moveCloser",value:function(e,t){for(var r=e.character,n=e.position,a=n%8,i=Math.floor(n/8),o=t%8,s=Math.floor(t/8),l=a<o?1:-1,c=i<s?1:-1,u=Math.abs(a-o),h=Math.abs(i-s),f=a+l*Math.min(u,r.range),m=i+c*Math.min(h,r.range),p=8*m+f;!1===this.isPositionFree(p);)f-=l,p=this.isPositionFree(8*f+m)?8*f+m:8*(m-=c)+f;var d=this.gameState.positions.findIndex((function(e){return e.character===r}));this.gameState.positions[d].position=p,this.gamePlay.redrawPositions(this.gameState.positions)}},{key:"generateTooltip",value:function(e){return"".concat(e.type,": 🎖").concat(e.level," ⚔").concat(e.attack," 🛡").concat(e.defence," ❤").concat(e.health," 🦶").concat(e.range)}},{key:"getDistance",value:function(e,t){var r=Math.floor(e/8),n=e%8,a=Math.floor(t/8),i=t%8,o=Math.abs(r-a),s=Math.abs(n-i);return Math.sqrt(Math.pow(o,2)+Math.pow(s,2))}},{key:"deSelect",value:function(){var e=this.gameState.currentSelection;null!==e&&(this.gamePlay.deselectCell(e.position),this.gameState.currentSelection=null)}},{key:"onNewGame",value:function(){this.gameState.resetState(),this.gamePlay.drawUi(this.gameState.currentTheme),this.gamePlay.redrawPositions(this.gameState.positions)}},{key:"onSaveGame",value:function(){this.stateService.save(this.gameState.asObject()),this.gamePlay.drawUi(this.gameState.currentTheme),this.gamePlay.redrawPositions(this.gameState.positions)}},{key:"onLoadGame",value:function(){var e=this.stateService.load();e&&this.gameState.restoreFrom(e),this.gamePlay.drawUi(this.gameState.currentTheme),this.gamePlay.redrawPositions(this.gameState.positions)}}])&&U(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}();function B(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var H=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.storage=t}var t,r;return t=e,(r=[{key:"save",value:function(e){this.storage.setItem("state",JSON.stringify(e))}},{key:"load",value:function(){try{return JSON.parse(this.storage.getItem("state"))}catch(e){throw new Error("Invalid state")}}}])&&B(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}(),J=new a;J.bindToDOM(document.querySelector("#game-container")),new z(J,new H(localStorage)).init()})();