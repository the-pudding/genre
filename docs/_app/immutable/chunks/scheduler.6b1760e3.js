var q=Object.defineProperty;var G=(t,e,n)=>e in t?q(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var f=(t,e,n)=>(G(t,typeof e!="symbol"?e+"":e,n),n);function L(){}function R(t,e){for(const n in e)t[n]=e[n];return t}function F(t){return t()}function dt(){return Object.create(null)}function I(t){t.forEach(F)}function J(t){return typeof t=="function"}function ht(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function mt(t){return Object.keys(t).length===0}function K(t,...e){if(t==null){for(const i of e)i(void 0);return L}const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function pt(t,e,n){t.$$.on_destroy.push(K(e,n))}function yt(t,e,n,i){if(t){const s=O(t,e,n,i);return t[0](s)}}function O(t,e,n,i){return t[1]&&i?R(n.ctx.slice(),t[1](i(e))):n.ctx}function gt(t,e,n,i){if(t[2]&&i){const s=t[2](i(n));if(e.dirty===void 0)return s;if(typeof s=="object"){const c=[],r=Math.max(e.dirty.length,s.length);for(let l=0;l<r;l+=1)c[l]=e.dirty[l]|s[l];return c}return e.dirty|s}return e.dirty}function bt(t,e,n,i,s,c){if(s){const r=O(e,n,i,c);t.p(r,s)}}function xt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function wt(t){const e={};for(const n in t)n[0]!=="$"&&(e[n]=t[n]);return e}function vt(t,e){const n={};e=new Set(e);for(const i in t)!e.has(i)&&i[0]!=="$"&&(n[i]=t[i]);return n}const Q=(t,e)=>Object.prototype.hasOwnProperty.call(t,e);function Et(t){return t&&J(t.destroy)?t.destroy:L}let b=!1;function Tt(){b=!0}function At(){b=!1}function U(t,e,n,i){for(;t<e;){const s=t+(e-t>>1);n(s)<=i?t=s+1:e=s}return t}function V(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const o=[];for(let a=0;a<e.length;a++){const u=e[a];u.claim_order!==void 0&&o.push(u)}e=o}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let s=0;for(let o=0;o<e.length;o++){const a=e[o].claim_order,u=(s>0&&e[n[s]].claim_order<=a?s+1:U(1,s,W=>e[n[W]].claim_order,a))-1;i[o]=n[u]+1;const N=u+1;n[N]=o,s=Math.max(N,s)}const c=[],r=[];let l=e.length-1;for(let o=n[s]+1;o!=0;o=i[o-1]){for(c.push(e[o-1]);l>=o;l--)r.push(e[l]);l--}for(;l>=0;l--)r.push(e[l]);c.reverse(),r.sort((o,a)=>o.claim_order-a.claim_order);for(let o=0,a=0;o<r.length;o++){for(;a<c.length&&r[o].claim_order>=c[a].claim_order;)a++;const u=a<c.length?c[a]:null;t.insertBefore(r[o],u)}}function X(t,e){t.appendChild(e)}function Y(t,e){if(b){for(V(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function Z(t,e,n){t.insertBefore(e,n||null)}function $(t,e,n){b&&!n?Y(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function y(t){t.parentNode&&t.parentNode.removeChild(t)}function Nt(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function E(t){return document.createElement(t)}function kt(t,e){const n={};for(const i in t)Q(t,i)&&e.indexOf(i)===-1&&(n[i]=t[i]);return n}function j(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function T(t){return document.createTextNode(t)}function Ct(){return T(" ")}function Mt(){return T("")}function k(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function A(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}const tt=["width","height"];function et(t,e){const n=Object.getOwnPropertyDescriptors(t.__proto__);for(const i in e)e[i]==null?t.removeAttribute(i):i==="style"?t.style.cssText=e[i]:i==="__value"?t.value=t[i]=e[i]:n[i]&&n[i].set&&tt.indexOf(i)===-1?t[i]=e[i]:A(t,i,e[i])}function St(t,e){for(const n in e)A(t,n,e[n])}function nt(t,e){Object.keys(e).forEach(n=>{it(t,n,e[n])})}function it(t,e,n){e in t?t[e]=typeof t[e]=="boolean"&&n===""?!0:n:A(t,e,n)}function Ht(t){return/-/.test(t)?nt:et}function Lt(t){return t.dataset.svelteH}function Ot(t){return t===""?null:+t}function jt(t){return Array.from(t.childNodes)}function P(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function D(t,e,n,i,s=!1){P(t);const c=(()=>{for(let r=t.claim_info.last_index;r<t.length;r++){const l=t[r];if(e(l)){const o=n(l);return o===void 0?t.splice(r,1):t[r]=o,s||(t.claim_info.last_index=r),l}}for(let r=t.claim_info.last_index-1;r>=0;r--){const l=t[r];if(e(l)){const o=n(l);return o===void 0?t.splice(r,1):t[r]=o,s?o===void 0&&t.claim_info.last_index--:t.claim_info.last_index=r,l}}return i()})();return c.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,c}function z(t,e,n,i){return D(t,s=>s.nodeName===e,s=>{const c=[];for(let r=0;r<s.attributes.length;r++){const l=s.attributes[r];n[l.name]||c.push(l.name)}c.forEach(r=>s.removeAttribute(r))},()=>i(e))}function Pt(t,e,n){return z(t,e,n,E)}function Dt(t,e,n){return z(t,e,n,j)}function st(t,e){return D(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>T(e),!0)}function zt(t){return st(t," ")}function C(t,e,n){for(let i=n;i<t.length;i+=1){const s=t[i];if(s.nodeType===8&&s.textContent.trim()===e)return i}return-1}function Bt(t,e){const n=C(t,"HTML_TAG_START",0),i=C(t,"HTML_TAG_END",n+1);if(n===-1||i===-1)return new M(e);P(t);const s=t.splice(n,i-n+1);y(s[0]),y(s[s.length-1]);const c=s.slice(1,s.length-1);for(const r of c)r.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1;return new M(e,c)}function Wt(t,e){e=""+e,t.data!==e&&(t.data=e)}function qt(t,e){t.value=e??""}function Gt(t,e,n,i){n==null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}let p;function rt(){if(p===void 0){p=!1;try{typeof window<"u"&&window.parent&&window.parent.document}catch{p=!0}}return p}function Rt(t,e){getComputedStyle(t).position==="static"&&(t.style.position="relative");const i=E("iframe");i.setAttribute("style","display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;"),i.setAttribute("aria-hidden","true"),i.tabIndex=-1;const s=rt();let c;return s?(i.src="data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>",c=k(window,"message",r=>{r.source===i.contentWindow&&e()})):(i.src="about:blank",i.onload=()=>{c=k(i.contentWindow,"resize",e),e()}),X(t,i),()=>{(s||c&&i.contentWindow)&&c(),y(i)}}function Ft(t,e,n){t.classList.toggle(e,!!n)}function ct(t,e,{bubbles:n=!1,cancelable:i=!1}={}){return new CustomEvent(t,{detail:e,bubbles:n,cancelable:i})}function It(t,e){const n=[];let i=0;for(const s of e.childNodes)if(s.nodeType===8){const c=s.textContent.trim();c===`HEAD_${t}_END`?(i-=1,n.push(s)):c===`HEAD_${t}_START`&&(i+=1,n.push(s))}else i>0&&n.push(s);return n}class ot{constructor(e=!1){f(this,"is_svg",!1);f(this,"e");f(this,"n");f(this,"t");f(this,"a");this.is_svg=e,this.e=this.n=null}c(e){this.h(e)}m(e,n,i=null){this.e||(this.is_svg?this.e=j(n.nodeName):this.e=E(n.nodeType===11?"TEMPLATE":n.nodeName),this.t=n.tagName!=="TEMPLATE"?n:n.content,this.c(e)),this.i(i)}h(e){this.e.innerHTML=e,this.n=Array.from(this.e.nodeName==="TEMPLATE"?this.e.content.childNodes:this.e.childNodes)}i(e){for(let n=0;n<this.n.length;n+=1)Z(this.t,this.n[n],e)}p(e){this.d(),this.h(e),this.i(this.a)}d(){this.n.forEach(y)}}class M extends ot{constructor(n=!1,i){super(n);f(this,"l");this.e=this.n=null,this.l=i}c(n){this.l?this.n=this.l:super.c(n)}i(n){for(let i=0;i<this.n.length;i+=1)$(this.t,this.n[i],n)}}function Jt(t,e){return new t(e)}let g;function x(t){g=t}function m(){if(!g)throw new Error("Function called outside component initialization");return g}function Kt(t){m().$$.on_mount.push(t)}function Qt(t){m().$$.after_update.push(t)}function Ut(){const t=m();return(e,n,{cancelable:i=!1}={})=>{const s=t.$$.callbacks[e];if(s){const c=ct(e,n,{cancelable:i});return s.slice().forEach(r=>{r.call(t,c)}),!c.defaultPrevented}return!0}}function Vt(t,e){return m().$$.context.set(t,e),e}function Xt(t){return m().$$.context.get(t)}const h=[],S=[];let d=[];const H=[],B=Promise.resolve();let v=!1;function lt(){v||(v=!0,B.then(ut))}function Yt(){return lt(),B}function at(t){d.push(t)}const w=new Set;let _=0;function ut(){if(_!==0)return;const t=g;do{try{for(;_<h.length;){const e=h[_];_++,x(e),ft(e.$$)}}catch(e){throw h.length=0,_=0,e}for(x(null),h.length=0,_=0;S.length;)S.pop()();for(let e=0;e<d.length;e+=1){const n=d[e];w.has(n)||(w.add(n),n())}d.length=0}while(h.length);for(;H.length;)H.pop()();v=!1,w.clear(),x(t)}function ft(t){if(t.fragment!==null){t.update(),I(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(at)}}function Zt(t){const e=[],n=[];d.forEach(i=>t.indexOf(i)===-1?e.push(i):n.push(i)),n.forEach(i=>i()),d=e}export{mt as $,It as A,Nt as B,R as C,j as D,Dt as E,St as F,vt as G,wt as H,at as I,Ft as J,k as K,J as L,I as M,Ut as N,Rt as O,Vt as P,Et as Q,Xt as R,kt as S,Ht as T,M as U,Bt as V,Lt as W,qt as X,Ot as Y,dt as Z,ut as _,Ct as a,Zt as a0,g as a1,x as a2,F as a3,h as a4,lt as a5,Tt as a6,At as a7,Qt as b,zt as c,y as d,Mt as e,E as f,Pt as g,jt as h,$ as i,A as j,Gt as k,T as l,st as m,Wt as n,Kt as o,S as p,Jt as q,yt as r,ht as s,Yt as t,bt as u,xt as v,gt as w,Y as x,L as y,pt as z};
