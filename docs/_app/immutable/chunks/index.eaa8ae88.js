var H=Object.defineProperty;var K=(t,e,n)=>e in t?H(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var P=(t,e,n)=>(K(t,typeof e!="symbol"?e+"":e,n),n);import{y as w,d as N,a2 as Q,a3 as T,M as v,L as C,J as b,a4 as W,U,a5 as I,h as X,a6 as Y,a7 as Z,a8 as tt,a9 as et,aa as L,ab as nt,ac as it,ad as st,ae as at,af as rt}from"./scheduler.5250af04.js";const B=typeof window<"u";let D=B?()=>window.performance.now():()=>Date.now(),z=B?t=>requestAnimationFrame(t):w;const p=new Set;function F(t){p.forEach(e=>{e.c(t)||(p.delete(e),e.f())}),p.size!==0&&z(F)}function J(t){let e;return p.size===0&&z(F),{promise:new Promise(n=>{p.add(e={c:t,f:n})}),abort(){p.delete(e)}}}const k=new Map;let O=0;function ot(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}function ft(t,e){const n={stylesheet:T(e),rules:{}};return k.set(t,n),n}function V(t,e,n,i,a,r,u,l=0){const d=16.666/i;let s=`{
`;for(let g=0;g<=1;g+=d){const m=e+(n-e)*r(g);s+=g*100+`%{${u(m,1-m)}}
`}const f=s+`100% {${u(n,1-n)}}
}`,o=`__svelte_${ot(f)}_${l}`,_=Q(t),{stylesheet:c,rules:$}=k.get(_)||ft(_,t);$[o]||($[o]=!0,c.insertRule(`@keyframes ${o} ${f}`,c.cssRules.length));const h=t.style.animation||"";return t.style.animation=`${h?`${h}, `:""}${o} ${i}ms linear ${a}ms 1 both`,O+=1,o}function R(t,e){const n=(t.style.animation||"").split(", "),i=n.filter(e?r=>r.indexOf(e)<0:r=>r.indexOf("__svelte")===-1),a=n.length-i.length;a&&(t.style.animation=i.join(", "),O-=a,O||ut())}function ut(){z(()=>{O||(k.forEach(t=>{const{ownerNode:e}=t.stylesheet;e&&N(e)}),k.clear())})}let x;function q(){return x||(x=Promise.resolve(),x.then(()=>{x=null})),x}function j(t,e,n){t.dispatchEvent(W(`${e?"intro":"outro"}${n}`))}const S=new Set;let y;function gt(){y={r:0,c:[],p:y}}function yt(){y.r||v(y.c),y=y.p}function ct(t,e){t&&t.i&&(S.delete(t),t.i(e))}function pt(t,e,n,i){if(t&&t.o){if(S.has(t))return;S.add(t),y.c.push(()=>{S.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}const G={duration:0};function wt(t,e,n){const i={direction:"in"};let a=e(t,n,i),r=!1,u,l,d=0;function s(){u&&R(t,u)}function f(){const{delay:_=0,duration:c=300,easing:$=U,tick:h=w,css:g}=a||G;g&&(u=V(t,0,1,c,_,$,g,d++)),h(0,1);const m=D()+_,E=m+c;l&&l.abort(),r=!0,b(()=>j(t,!0,"start")),l=J(M=>{if(r){if(M>=E)return h(1,0),j(t,!0,"end"),s(),r=!1;if(M>=m){const A=$((M-m)/c);h(A,1-A)}}return r})}let o=!1;return{start(){o||(o=!0,R(t),C(a)?(a=a(i),q().then(f)):f())},invalidate(){o=!1},end(){r&&(s(),r=!1)}}}function xt(t,e,n){const i={direction:"out"};let a=e(t,n,i),r=!0,u;const l=y;l.r+=1;let d;function s(){const{delay:f=0,duration:o=300,easing:_=U,tick:c=w,css:$}=a||G;$&&(u=V(t,1,0,o,f,_,$));const h=D()+f,g=h+o;b(()=>j(t,!1,"start")),"inert"in t&&(d=t.inert,t.inert=!0),J(m=>{if(r){if(m>=g)return c(0,1),j(t,!1,"end"),--l.r||v(l.c),!1;if(m>=h){const E=_((m-h)/o);c(1-E,E)}}return r})}return C(a)?q().then(()=>{a=a(i),s()}):s(),{end(f){f&&"inert"in t&&(t.inert=d),f&&a.tick&&a.tick(1,0),r&&(u&&R(t,u),r=!1)}}}function vt(t,e,n){const i=t.$$.props[e];i!==void 0&&(t.$$.bound[i]=n,n(t.$$.ctx[i]))}function Et(t){t&&t.c()}function St(t,e){t&&t.l(e)}function lt(t,e,n){const{fragment:i,after_update:a}=t.$$;i&&i.m(e,n),b(()=>{const r=t.$$.on_mount.map(nt).filter(C);t.$$.on_destroy?t.$$.on_destroy.push(...r):v(r),t.$$.on_mount=[]}),a.forEach(b)}function dt(t,e){const n=t.$$;n.fragment!==null&&(tt(n.after_update),v(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function _t(t,e){t.$$.dirty[0]===-1&&(it.push(t),st(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function bt(t,e,n,i,a,r,u,l=[-1]){const d=et;L(t);const s=t.$$={fragment:null,ctx:[],props:r,update:w,not_equal:a,bound:I(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(d?d.$$.context:[])),callbacks:I(),dirty:l,skip_bound:!1,root:e.target||d.$$.root};u&&u(s.root);let f=!1;if(s.ctx=n?n(t,e.props||{},(o,_,...c)=>{const $=c.length?c[0]:_;return s.ctx&&a(s.ctx[o],s.ctx[o]=$)&&(!s.skip_bound&&s.bound[o]&&s.bound[o]($),f&&_t(t,o)),_}):[],s.update(),f=!0,v(s.before_update),s.fragment=i?i(s.ctx):!1,e.target){if(e.hydrate){at();const o=X(e.target);s.fragment&&s.fragment.l(o),o.forEach(N)}else s.fragment&&s.fragment.c();e.intro&&ct(t.$$.fragment),lt(t,e.target,e.anchor),rt(),Y()}L(d)}class kt{constructor(){P(this,"$$");P(this,"$$set")}$destroy(){dt(this,1),this.$destroy=w}$on(e,n){if(!C(n))return w;const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const a=i.indexOf(n);a!==-1&&i.splice(a,1)}}$set(e){this.$$set&&!Z(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const $t="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add($t);export{kt as S,ct as a,Et as b,yt as c,St as d,dt as e,wt as f,gt as g,xt as h,bt as i,vt as j,J as l,lt as m,D as n,pt as t};