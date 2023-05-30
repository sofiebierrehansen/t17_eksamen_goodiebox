(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerpolicy&&(o.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?o.credentials="include":s.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();function bt(t,e){t.indexOf(e)===-1&&t.push(e)}const et=(t,e,n)=>Math.min(Math.max(n,t),e),g={duration:.3,delay:0,endDelay:0,repeat:0,easing:"ease"},q=t=>typeof t=="number",A=t=>Array.isArray(t)&&!q(t[0]),vt=(t,e,n)=>{const i=e-t;return((n-t)%i+i)%i+t};function xt(t,e){return A(t)?t[vt(0,t.length,e)]:t}const nt=(t,e,n)=>-n*t+n*e+t,it=()=>{},x=t=>t,H=(t,e,n)=>e-t===0?1:(n-t)/(e-t);function st(t,e){const n=t[t.length-1];for(let i=1;i<=e;i++){const s=H(0,e,i);t.push(nt(n,1,s))}}function wt(t){const e=[0];return st(e,t-1),e}function St(t,e=wt(t.length),n=x){const i=t.length,s=i-e.length;return s>0&&st(e,s),o=>{let r=0;for(;r<i-2&&!(o<e[r+1]);r++);let a=et(0,1,H(e[r],e[r+1],o));return a=xt(n,r)(a),nt(t[r],t[r+1],a)}}const ot=t=>Array.isArray(t)&&q(t[0]),N=t=>typeof t=="object"&&Boolean(t.createAnimation),S=t=>typeof t=="function",Tt=t=>typeof t=="string",D={ms:t=>t*1e3,s:t=>t/1e3},rt=(t,e,n)=>(((1-3*n+3*e)*t+(3*n-6*e))*t+3*e)*t,Et=1e-7,At=12;function Ot(t,e,n,i,s){let o,r,a=0;do r=e+(n-e)/2,o=rt(r,i,s)-t,o>0?n=r:e=r;while(Math.abs(o)>Et&&++a<At);return r}function k(t,e,n,i){if(t===e&&n===i)return x;const s=o=>Ot(o,0,1,t,n);return o=>o===0||o===1?o:rt(s(o),e,i)}const Lt=(t,e="end")=>n=>{n=e==="end"?Math.min(n,.999):Math.max(n,.001);const i=n*t,s=e==="end"?Math.floor(i):Math.ceil(i);return et(0,1,s/t)},Z={ease:k(.25,.1,.25,1),"ease-in":k(.42,0,1,1),"ease-in-out":k(.42,0,.58,1),"ease-out":k(0,0,.58,1)},It=/\((.*?)\)/;function B(t){if(S(t))return t;if(ot(t))return k(...t);if(Z[t])return Z[t];if(t.startsWith("steps")){const e=It.exec(t);if(e){const n=e[1].split(",");return Lt(parseFloat(n[0]),n[1].trim())}}return x}class at{constructor(e,n=[0,1],{easing:i,duration:s=g.duration,delay:o=g.delay,endDelay:r=g.endDelay,repeat:a=g.repeat,offset:l,direction:f="normal"}={}){if(this.startTime=null,this.rate=1,this.t=0,this.cancelTimestamp=null,this.easing=x,this.duration=0,this.totalDuration=0,this.repeat=0,this.playState="idle",this.finished=new Promise((p,c)=>{this.resolve=p,this.reject=c}),i=i||g.easing,N(i)){const p=i.createAnimation(n);i=p.easing,n=p.keyframes||n,s=p.duration||s}this.repeat=a,this.easing=A(i)?x:B(i),this.updateDuration(s);const h=St(n,l,A(i)?i.map(B):x);this.tick=p=>{var c;o=o;let m=0;this.pauseTime!==void 0?m=this.pauseTime:m=(p-this.startTime)*this.rate,this.t=m,m/=1e3,m=Math.max(m-o,0),this.playState==="finished"&&this.pauseTime===void 0&&(m=this.totalDuration);const O=m/this.duration;let L=Math.floor(O),b=O%1;!b&&O>=1&&(b=1),b===1&&L--;const P=L%2;(f==="reverse"||f==="alternate"&&P||f==="alternate-reverse"&&!P)&&(b=1-b);const I=m>=this.totalDuration?1:Math.min(b,1),T=h(this.easing(I));e(T),this.pauseTime===void 0&&(this.playState==="finished"||m>=this.totalDuration+r)?(this.playState="finished",(c=this.resolve)===null||c===void 0||c.call(this,T)):this.playState!=="idle"&&(this.frameRequestId=requestAnimationFrame(this.tick))},this.play()}play(){const e=performance.now();this.playState="running",this.pauseTime!==void 0?this.startTime=e-this.pauseTime:this.startTime||(this.startTime=e),this.cancelTimestamp=this.startTime,this.pauseTime=void 0,this.frameRequestId=requestAnimationFrame(this.tick)}pause(){this.playState="paused",this.pauseTime=this.t}finish(){this.playState="finished",this.tick(0)}stop(){var e;this.playState="idle",this.frameRequestId!==void 0&&cancelAnimationFrame(this.frameRequestId),(e=this.reject)===null||e===void 0||e.call(this,!1)}cancel(){this.stop(),this.tick(this.cancelTimestamp)}reverse(){this.rate*=-1}commitStyles(){}updateDuration(e){this.duration=e,this.totalDuration=e*(this.repeat+1)}get currentTime(){return this.t}set currentTime(e){this.pauseTime!==void 0||this.rate===0?this.pauseTime=e:this.startTime=performance.now()-e/this.rate}get playbackRate(){return this.rate}set playbackRate(e){this.rate=e}}class Mt{setAnimation(e){this.animation=e,e==null||e.finished.then(()=>this.clearAnimation()).catch(()=>{})}clearAnimation(){this.animation=this.generator=void 0}}const $=new WeakMap;function ct(t){return $.has(t)||$.set(t,{transforms:[],values:new Map}),$.get(t)}function kt(t,e){return t.has(e)||t.set(e,new Mt),t.get(e)}const Dt=["","X","Y","Z"],qt=["translate","scale","rotate","skew"],z={x:"translateX",y:"translateY",z:"translateZ"},J={syntax:"<angle>",initialValue:"0deg",toDefaultUnit:t=>t+"deg"},Ft={translate:{syntax:"<length-percentage>",initialValue:"0px",toDefaultUnit:t=>t+"px"},rotate:J,scale:{syntax:"<number>",initialValue:1,toDefaultUnit:x},skew:J},F=new Map,G=t=>`--motion-${t}`,C=["x","y","z"];qt.forEach(t=>{Dt.forEach(e=>{C.push(t+e),F.set(G(t+e),Ft[t])})});const Pt=(t,e)=>C.indexOf(t)-C.indexOf(e),Rt=new Set(C),lt=t=>Rt.has(t),jt=(t,e)=>{z[e]&&(e=z[e]);const{transforms:n}=ct(t);bt(n,e),t.style.transform=Vt(n)},Vt=t=>t.sort(Pt).reduce(zt,"").trim(),zt=(t,e)=>`${t} ${e}(var(${G(e)}))`,K=t=>t.startsWith("--"),Q=new Set;function Ct(t){if(!Q.has(t)){Q.add(t);try{const{syntax:e,initialValue:n}=F.has(t)?F.get(t):{};CSS.registerProperty({name:t,inherits:!1,syntax:e,initialValue:n})}catch{}}}const U=(t,e)=>document.createElement("div").animate(t,e),Y={cssRegisterProperty:()=>typeof CSS<"u"&&Object.hasOwnProperty.call(CSS,"registerProperty"),waapi:()=>Object.hasOwnProperty.call(Element.prototype,"animate"),partialKeyframes:()=>{try{U({opacity:[1]})}catch{return!1}return!0},finished:()=>Boolean(U({opacity:[0,1]},{duration:.001}).finished),linearEasing:()=>{try{U({opacity:0},{easing:"linear(0, 1)"})}catch{return!1}return!0}},_={},E={};for(const t in Y)E[t]=()=>(_[t]===void 0&&(_[t]=Y[t]()),_[t]);const $t=.015,Ut=(t,e)=>{let n="";const i=Math.round(e/$t);for(let s=0;s<i;s++)n+=t(H(0,i-1,s))+", ";return n.substring(0,n.length-2)},tt=(t,e)=>S(t)?E.linearEasing()?`linear(${Ut(t,e)})`:g.easing:ot(t)?_t(t):t,_t=([t,e,n,i])=>`cubic-bezier(${t}, ${e}, ${n}, ${i})`;function Nt(t,e){for(let n=0;n<t.length;n++)t[n]===null&&(t[n]=n?t[n-1]:e());return t}const Bt=t=>Array.isArray(t)?t:[t];function W(t){return z[t]&&(t=z[t]),lt(t)?G(t):t}const V={get:(t,e)=>{e=W(e);let n=K(e)?t.style.getPropertyValue(e):getComputedStyle(t)[e];if(!n&&n!==0){const i=F.get(e);i&&(n=i.initialValue)}return n},set:(t,e,n)=>{e=W(e),K(e)?t.style.setProperty(e,n):t.style[e]=n}};function dt(t,e=!0){if(!(!t||t.playState==="finished"))try{t.stop?t.stop():(e&&t.commitStyles(),t.cancel())}catch{}}function Kt(t,e){var n;let i=(e==null?void 0:e.toDefaultUnit)||x;const s=t[t.length-1];if(Tt(s)){const o=((n=s.match(/(-?[\d.]+)([a-z%]*)/))===null||n===void 0?void 0:n[2])||"";o&&(i=r=>r+o)}return i}function Wt(){return window.__MOTION_DEV_TOOLS_RECORD}function Ht(t,e,n,i={},s){const o=Wt(),r=i.record!==!1&&o;let a,{duration:l=g.duration,delay:f=g.delay,endDelay:h=g.endDelay,repeat:p=g.repeat,easing:c=g.easing,persist:m=!1,direction:O,offset:L,allowWebkitAcceleration:b=!1}=i;const P=ct(t),I=lt(e);let T=E.waapi();I&&jt(t,e);const y=W(e),R=kt(P.values,y),v=F.get(y);return dt(R.animation,!(N(c)&&R.generator)&&i.record!==!1),()=>{const j=()=>{var d,M;return(M=(d=V.get(t,y))!==null&&d!==void 0?d:v==null?void 0:v.initialValue)!==null&&M!==void 0?M:0};let u=Nt(Bt(n),j);const X=Kt(u,v);if(N(c)){const d=c.createAnimation(u,e!=="opacity",j,y,R);c=d.easing,u=d.keyframes||u,l=d.duration||l}if(K(y)&&(E.cssRegisterProperty()?Ct(y):T=!1),I&&!E.linearEasing()&&(S(c)||A(c)&&c.some(S))&&(T=!1),T){v&&(u=u.map(w=>q(w)?v.toDefaultUnit(w):w)),u.length===1&&(!E.partialKeyframes()||r)&&u.unshift(j());const d={delay:D.ms(f),duration:D.ms(l),endDelay:D.ms(h),easing:A(c)?void 0:tt(c,l),direction:O,iterations:p+1,fill:"both"};a=t.animate({[y]:u,offset:L,easing:A(c)?c.map(w=>tt(w,l)):void 0},d),a.finished||(a.finished=new Promise((w,yt)=>{a.onfinish=w,a.oncancel=yt}));const M=u[u.length-1];a.finished.then(()=>{m||(V.set(t,y,M),a.cancel())}).catch(it),b||(a.playbackRate=1.000001)}else if(s&&I)u=u.map(d=>typeof d=="string"?parseFloat(d):d),u.length===1&&u.unshift(parseFloat(j())),a=new s(d=>{V.set(t,y,X?X(d):d)},u,Object.assign(Object.assign({},i),{duration:l,easing:c}));else{const d=u[u.length-1];V.set(t,y,v&&q(d)?v.toDefaultUnit(d):d)}return r&&o(t,e,u,{duration:l,delay:f,easing:c,repeat:p,offset:L},"motion-one"),R.setAnimation(a),a}}const Gt=(t,e)=>t[e]?Object.assign(Object.assign({},t),t[e]):Object.assign({},t);function ut(t,e){var n;return typeof t=="string"?e?((n=e[t])!==null&&n!==void 0||(e[t]=document.querySelectorAll(t)),t=e[t]):t=document.querySelectorAll(t):t instanceof Element&&(t=[t]),Array.from(t||[])}const Xt=t=>t(),ft=(t,e,n=g.duration)=>new Proxy({animations:t.map(Xt).filter(Boolean),duration:n,options:e},Jt),Zt=t=>t.animations[0],Jt={get:(t,e)=>{const n=Zt(t);switch(e){case"duration":return t.duration;case"currentTime":return D.s((n==null?void 0:n[e])||0);case"playbackRate":case"playState":return n==null?void 0:n[e];case"finished":return t.finished||(t.finished=Promise.all(t.animations.map(Qt)).catch(it)),t.finished;case"stop":return()=>{t.animations.forEach(i=>dt(i))};case"forEachNative":return i=>{t.animations.forEach(s=>i(s,t))};default:return typeof(n==null?void 0:n[e])>"u"?void 0:()=>t.animations.forEach(i=>i[e]())}},set:(t,e,n)=>{switch(e){case"currentTime":n=D.ms(n);case"currentTime":case"playbackRate":for(let i=0;i<t.animations.length;i++)t.animations[i][e]=n;return!0}return!1}},Qt=t=>t.finished;function Yt(t=.1,{start:e=0,from:n=0,easing:i}={}){return(s,o)=>{const r=q(n)?n:te(n,o),a=Math.abs(r-s);let l=t*a;if(i){const f=o*t;l=B(i)(l/f)*f}return e+l}}function te(t,e){if(t==="first")return 0;{const n=e-1;return t==="last"?n:n/2}}function ee(t,e,n){return S(t)?t(e,n):t}function ne(t){return function(n,i,s={}){n=ut(n);const o=n.length,r=[];for(let a=0;a<o;a++){const l=n[a];for(const f in i){const h=Gt(s,f);h.delay=ee(h.delay,a,o);const p=Ht(l,f,i[f],h,t);r.push(p)}}return ft(r,s,s.duration)}}const ie=ne(at),se={any:0,all:1};function ht(t,e,{root:n,margin:i,amount:s="any"}={}){if(typeof IntersectionObserver>"u")return()=>{};const o=ut(t),r=new WeakMap,a=f=>{f.forEach(h=>{const p=r.get(h.target);if(h.isIntersecting!==Boolean(p))if(h.isIntersecting){const c=e(h);S(c)?r.set(h.target,c):l.unobserve(h.target)}else p&&(p(h),r.delete(h.target))})},l=new IntersectionObserver(a,{root:n,rootMargin:i,threshold:typeof s=="number"?s:se[s]});return o.forEach(f=>l.observe(f)),()=>l.disconnect()}function oe(t,e={}){return ft([()=>{const n=new at(t,[0,1],e);return n.finished.catch(()=>{}),n}],e,e.duration)}function pt(t,e,n){return(S(t)?oe:ie)(t,e,n)}window.addEventListener("load",re);function re(){console.log("sidenVises"),document.querySelector("#topnav1").classList.add("hidden"),document.querySelector("#menuknap").addEventListener("click",ae)}function ae(){console.log("toggleMenu"),document.querySelector("#topnav1").classList.toggle("hidden"),document.querySelector("#topnav1").classList.contains("hidden")==!0?document.querySelector("#menuknap").textContent="☰":document.querySelector("#menuknap").textContent="x"}ht(".cardinview",({target:t})=>{pt(t.querySelectorAll("article"),{x:[-2e3,0]},{duration:1,delay:Yt(1,{start:.25})})});ht(".txtinview",()=>{pt(".txtinview",{x:[2e3,0]},{duration:1})});const ce=document.querySelector("#accepter"),le=document.querySelector("#afvis"),mt=document.querySelector("#cookieboks");ce.addEventListener("click",gt);le.addEventListener("click",gt);function gt(){mt.classList.add("hidden"),sessionStorage.setItem("fjerncookieboks",!0)}sessionStorage.getItem("fjerncookieboks")&&mt.classList.add("hidden");class de extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.html=`<style>
          /****** LOGIN MODAL ******/
          #login-modal {
              background: #d2f707;
              position:fixed;
              width:100vw;
              height:100vh;
          }
          .loginmodal-container {
            padding: 30px;
            max-width: 350px;
            width: 100% !important;
            background-color: #F7F7F7;
            margin: 0 auto;
            border-radius: 2px;
            box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
            overflow: hidden;
            font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI","Roboto","Helvetica Neue", Arial, sans-serif;
          }
          .loginmodal-container h1 {
            text-align: center;
            font-size: 1.8em;
          }
          .loginmodal-container input[type=submit] {
            width: 100%;
            display: block;
            margin-bottom: 10px;
            position: relative;
          }
          input[type=password] {
            height: 44px;
            font-size: 16px;
            width: 100%;
            margin-bottom: 10px;
            -webkit-appearance: none;
            background: #fff;
            border: 1px solid #d9d9d9;
            border-top: 1px solid #c0c0c0;
            padding: 0 8px;
            box-sizing: border-box;
          }
          input[type=password]:hover {
            border: 1px solid #b9b9b9;
            border-top: 1px solid #a0a0a0;
            box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
          }
          .loginmodal {
            text-align: center;
            font-size: 14px;
            font-weight: 700;
            height: 36px;
            padding: 0 8px;
          }
          .loginmodal-submit {
            border: 0px;
            color: #fff;
            text-shadow: 0 1px rgba(0,0,0,0.1); 
            background-color: #4d90fe;
            padding: 17px 0px;
            font-size: 14px;
          }
          .loginmodal-submit:hover {
            border: 0px;
            text-shadow: 0 1px rgba(0,0,0,0.3);
            background-color: #357ae8;
          }
        </style>
        <div class="modal fade" id="login-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="loginmodal-container">
              <h1>Login</h1><br>
              <p>This is a school project for the multimedia designer education at KEA.</p>
              <p>The password is <code>kea</code></p>
              <form>
                <input type="password" name="pass" placeholder="Password">
                <input type="submit" name="login" class="login loginmodal-submit" value="Login">
              </form>
            </div>
          </div>
        </div>`,this.render(),this.shadowRoot.querySelector("form").addEventListener("submit",e=>{e.preventDefault(),this.shadowRoot.querySelector("input[name=pass]").value==="kea"&&(document.querySelector("#totally-delete-me").remove(),localStorage.setItem("iform-totally-logged-in",!0))})}render(){this.shadowRoot.innerHTML=this.html}}customElements.define("iform-login",de);window.addEventListener("load",()=>{if(!localStorage.getItem("iform-totally-logged-in")){const t=document.createElement("div");t.id="totally-delete-me",t.style.width="100vw",t.style.height="100vh",t.style.position="fixed",t.style.zIndex="9999",t.innerHTML="<iform-login />",document.body.prepend(t)}});
