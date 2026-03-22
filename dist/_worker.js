var Ht=Object.defineProperty;var mt=e=>{throw TypeError(e)};var Yt=(e,t,s)=>t in e?Ht(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;var h=(e,t,s)=>Yt(e,typeof t!="symbol"?t+"":t,s),nt=(e,t,s)=>t.has(e)||mt("Cannot "+s);var d=(e,t,s)=>(nt(e,t,"read from private field"),s?s.call(e):t.get(e)),x=(e,t,s)=>t.has(e)?mt("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,s),y=(e,t,s,a)=>(nt(e,t,"write to private field"),a?a.call(e,s):t.set(e,s),s),k=(e,t,s)=>(nt(e,t,"access private method"),s);var pt=(e,t,s,a)=>({set _(r){y(e,t,r,s)},get _(){return d(e,t,a)}});var ut=(e,t,s)=>(a,r)=>{let n=-1;return o(0);async function o(l){if(l<=n)throw new Error("next() called multiple times");n=l;let c,i=!1,m;if(e[l]?(m=e[l][0][0],a.req.routeIndex=l):m=l===e.length&&r||void 0,m)try{c=await m(a,()=>o(l+1))}catch(u){if(u instanceof Error&&t)a.error=u,c=await t(u,a),i=!0;else throw u}else a.finalized===!1&&s&&(c=await s(a));return c&&(a.finalized===!1||i)&&(a.res=c),a}},Kt=Symbol(),Vt=async(e,t=Object.create(null))=>{const{all:s=!1,dot:a=!1}=t,n=(e instanceof Nt?e.raw.headers:e.headers).get("Content-Type");return n!=null&&n.startsWith("multipart/form-data")||n!=null&&n.startsWith("application/x-www-form-urlencoded")?_t(e,{all:s,dot:a}):{}};async function _t(e,t){const s=await e.formData();return s?Qt(s,t):{}}function Qt(e,t){const s=Object.create(null);return e.forEach((a,r)=>{t.all||r.endsWith("[]")?zt(s,r,a):s[r]=a}),t.dot&&Object.entries(s).forEach(([a,r])=>{a.includes(".")&&(Xt(s,a,r),delete s[a])}),s}var zt=(e,t,s)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(s):e[t]=[e[t],s]:t.endsWith("[]")?e[t]=[s]:e[t]=s},Xt=(e,t,s)=>{let a=e;const r=t.split(".");r.forEach((n,o)=>{o===r.length-1?a[n]=s:((!a[n]||typeof a[n]!="object"||Array.isArray(a[n])||a[n]instanceof File)&&(a[n]=Object.create(null)),a=a[n])})},Et=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},Zt=e=>{const{groups:t,path:s}=qt(e),a=Et(s);return Jt(a,t)},qt=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(s,a)=>{const r=`@${a}`;return t.push([r,s]),r}),{groups:t,path:e}},Jt=(e,t)=>{for(let s=t.length-1;s>=0;s--){const[a]=t[s];for(let r=e.length-1;r>=0;r--)if(e[r].includes(a)){e[r]=e[r].replace(a,t[s][1]);break}}return e},Xe={},es=(e,t)=>{if(e==="*")return"*";const s=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(s){const a=`${e}#${t}`;return Xe[a]||(s[2]?Xe[a]=t&&t[0]!==":"&&t[0]!=="*"?[a,s[1],new RegExp(`^${s[2]}(?=/${t})`)]:[e,s[1],new RegExp(`^${s[2]}$`)]:Xe[a]=[e,s[1],!0]),Xe[a]}return null},lt=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,s=>{try{return t(s)}catch{return s}})}},ts=e=>lt(e,decodeURI),Ct=e=>{const t=e.url,s=t.indexOf("/",t.indexOf(":")+4);let a=s;for(;a<t.length;a++){const r=t.charCodeAt(a);if(r===37){const n=t.indexOf("?",a),o=t.slice(s,n===-1?void 0:n);return ts(o.includes("%25")?o.replace(/%25/g,"%2525"):o)}else if(r===63)break}return t.slice(s,a)},ss=e=>{const t=Ct(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},Ie=(e,t,...s)=>(s.length&&(t=Ie(t,...s)),`${(e==null?void 0:e[0])==="/"?"":"/"}${e}${t==="/"?"":`${(e==null?void 0:e.at(-1))==="/"?"":"/"}${(t==null?void 0:t[0])==="/"?t.slice(1):t}`}`),At=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),s=[];let a="";return t.forEach(r=>{if(r!==""&&!/\:/.test(r))a+="/"+r;else if(/\:/.test(r))if(/\?/.test(r)){s.length===0&&a===""?s.push("/"):s.push(a);const n=r.replace("?","");a+="/"+n,s.push(a)}else a+="/"+r}),s.filter((r,n,o)=>o.indexOf(r)===n)},rt=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?lt(e,It):e):e,St=(e,t,s)=>{let a;if(!s&&t&&!/[%+]/.test(t)){let o=e.indexOf("?",8);if(o===-1)return;for(e.startsWith(t,o+1)||(o=e.indexOf(`&${t}`,o+1));o!==-1;){const l=e.charCodeAt(o+t.length+1);if(l===61){const c=o+t.length+2,i=e.indexOf("&",c);return rt(e.slice(c,i===-1?void 0:i))}else if(l==38||isNaN(l))return"";o=e.indexOf(`&${t}`,o+1)}if(a=/[%+]/.test(e),!a)return}const r={};a??(a=/[%+]/.test(e));let n=e.indexOf("?",8);for(;n!==-1;){const o=e.indexOf("&",n+1);let l=e.indexOf("=",n);l>o&&o!==-1&&(l=-1);let c=e.slice(n+1,l===-1?o===-1?void 0:o:l);if(a&&(c=rt(c)),n=o,c==="")continue;let i;l===-1?i="":(i=e.slice(l+1,o===-1?void 0:o),a&&(i=rt(i))),s?(r[c]&&Array.isArray(r[c])||(r[c]=[]),r[c].push(i)):r[c]??(r[c]=i)}return t?r[t]:r},as=St,ns=(e,t)=>St(e,t,!0),It=decodeURIComponent,gt=e=>lt(e,It),Re,_,ce,Lt,Rt,it,me,ft,Nt=(ft=class{constructor(e,t="/",s=[[]]){x(this,ce);h(this,"raw");x(this,Re);x(this,_);h(this,"routeIndex",0);h(this,"path");h(this,"bodyCache",{});x(this,me,e=>{const{bodyCache:t,raw:s}=this,a=t[e];if(a)return a;const r=Object.keys(t)[0];return r?t[r].then(n=>(r==="json"&&(n=JSON.stringify(n)),new Response(n)[e]())):t[e]=s[e]()});this.raw=e,this.path=t,y(this,_,s),y(this,Re,{})}param(e){return e?k(this,ce,Lt).call(this,e):k(this,ce,Rt).call(this)}query(e){return as(this.url,e)}queries(e){return ns(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((s,a)=>{t[a]=s}),t}async parseBody(e){var t;return(t=this.bodyCache).parsedBody??(t.parsedBody=await Vt(this,e))}json(){return d(this,me).call(this,"text").then(e=>JSON.parse(e))}text(){return d(this,me).call(this,"text")}arrayBuffer(){return d(this,me).call(this,"arrayBuffer")}blob(){return d(this,me).call(this,"blob")}formData(){return d(this,me).call(this,"formData")}addValidatedData(e,t){d(this,Re)[e]=t}valid(e){return d(this,Re)[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[Kt](){return d(this,_)}get matchedRoutes(){return d(this,_)[0].map(([[,e]])=>e)}get routePath(){return d(this,_)[0].map(([[,e]])=>e)[this.routeIndex].path}},Re=new WeakMap,_=new WeakMap,ce=new WeakSet,Lt=function(e){const t=d(this,_)[0][this.routeIndex][1][e],s=k(this,ce,it).call(this,t);return s&&/\%/.test(s)?gt(s):s},Rt=function(){const e={},t=Object.keys(d(this,_)[0][this.routeIndex][1]);for(const s of t){const a=k(this,ce,it).call(this,d(this,_)[0][this.routeIndex][1][s]);a!==void 0&&(e[s]=/\%/.test(a)?gt(a):a)}return e},it=function(e){return d(this,_)[1]?d(this,_)[1][e]:e},me=new WeakMap,ft),rs={Stringify:1},Mt=async(e,t,s,a,r)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const n=e.callbacks;return n!=null&&n.length?(r?r[0]+=e:r=[e],Promise.all(n.map(l=>l({phase:t,buffer:r,context:a}))).then(l=>Promise.all(l.filter(Boolean).map(c=>Mt(c,t,!1,a,r))).then(()=>r[0]))):Promise.resolve(e)},os="text/plain; charset=UTF-8",ot=(e,t)=>({"Content-Type":e,...t}),He,Ye,re,Me,oe,B,Ke,Te,De,ve,Ve,_e,pe,Ne,bt,is=(bt=class{constructor(e,t){x(this,pe);x(this,He);x(this,Ye);h(this,"env",{});x(this,re);h(this,"finalized",!1);h(this,"error");x(this,Me);x(this,oe);x(this,B);x(this,Ke);x(this,Te);x(this,De);x(this,ve);x(this,Ve);x(this,_e);h(this,"render",(...e)=>(d(this,Te)??y(this,Te,t=>this.html(t)),d(this,Te).call(this,...e)));h(this,"setLayout",e=>y(this,Ke,e));h(this,"getLayout",()=>d(this,Ke));h(this,"setRenderer",e=>{y(this,Te,e)});h(this,"header",(e,t,s)=>{this.finalized&&y(this,B,new Response(d(this,B).body,d(this,B)));const a=d(this,B)?d(this,B).headers:d(this,ve)??y(this,ve,new Headers);t===void 0?a.delete(e):s!=null&&s.append?a.append(e,t):a.set(e,t)});h(this,"status",e=>{y(this,Me,e)});h(this,"set",(e,t)=>{d(this,re)??y(this,re,new Map),d(this,re).set(e,t)});h(this,"get",e=>d(this,re)?d(this,re).get(e):void 0);h(this,"newResponse",(...e)=>k(this,pe,Ne).call(this,...e));h(this,"body",(e,t,s)=>k(this,pe,Ne).call(this,e,t,s));h(this,"text",(e,t,s)=>!d(this,ve)&&!d(this,Me)&&!t&&!s&&!this.finalized?new Response(e):k(this,pe,Ne).call(this,e,t,ot(os,s)));h(this,"json",(e,t,s)=>k(this,pe,Ne).call(this,JSON.stringify(e),t,ot("application/json",s)));h(this,"html",(e,t,s)=>{const a=r=>k(this,pe,Ne).call(this,r,t,ot("text/html; charset=UTF-8",s));return typeof e=="object"?Mt(e,rs.Stringify,!1,{}).then(a):a(e)});h(this,"redirect",(e,t)=>{const s=String(e);return this.header("Location",/[^\x00-\xFF]/.test(s)?encodeURI(s):s),this.newResponse(null,t??302)});h(this,"notFound",()=>(d(this,De)??y(this,De,()=>new Response),d(this,De).call(this,this)));y(this,He,e),t&&(y(this,oe,t.executionCtx),this.env=t.env,y(this,De,t.notFoundHandler),y(this,_e,t.path),y(this,Ve,t.matchResult))}get req(){return d(this,Ye)??y(this,Ye,new Nt(d(this,He),d(this,_e),d(this,Ve))),d(this,Ye)}get event(){if(d(this,oe)&&"respondWith"in d(this,oe))return d(this,oe);throw Error("This context has no FetchEvent")}get executionCtx(){if(d(this,oe))return d(this,oe);throw Error("This context has no ExecutionContext")}get res(){return d(this,B)||y(this,B,new Response(null,{headers:d(this,ve)??y(this,ve,new Headers)}))}set res(e){if(d(this,B)&&e){e=new Response(e.body,e);for(const[t,s]of d(this,B).headers.entries())if(t!=="content-type")if(t==="set-cookie"){const a=d(this,B).headers.getSetCookie();e.headers.delete("set-cookie");for(const r of a)e.headers.append("set-cookie",r)}else e.headers.set(t,s)}y(this,B,e),this.finalized=!0}get var(){return d(this,re)?Object.fromEntries(d(this,re)):{}}},He=new WeakMap,Ye=new WeakMap,re=new WeakMap,Me=new WeakMap,oe=new WeakMap,B=new WeakMap,Ke=new WeakMap,Te=new WeakMap,De=new WeakMap,ve=new WeakMap,Ve=new WeakMap,_e=new WeakMap,pe=new WeakSet,Ne=function(e,t,s){const a=d(this,B)?new Headers(d(this,B).headers):d(this,ve)??new Headers;if(typeof t=="object"&&"headers"in t){const n=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[o,l]of n)o.toLowerCase()==="set-cookie"?a.append(o,l):a.set(o,l)}if(s)for(const[n,o]of Object.entries(s))if(typeof o=="string")a.set(n,o);else{a.delete(n);for(const l of o)a.append(n,l)}const r=typeof t=="number"?t:(t==null?void 0:t.status)??d(this,Me);return new Response(e,{status:r,headers:a})},bt),O="ALL",ls="all",cs=["get","post","put","delete","options","patch"],Tt="Can not add a route since the matcher is already built.",Dt=class extends Error{},ds="__COMPOSED_HANDLER",ms=e=>e.text("404 Not Found",404),yt=(e,t)=>{if("getResponse"in e){const s=e.getResponse();return t.newResponse(s.body,s)}return console.error(e),t.text("Internal Server Error",500)},q,P,Ot,J,be,Ze,qe,Oe,ps=(Oe=class{constructor(t={}){x(this,P);h(this,"get");h(this,"post");h(this,"put");h(this,"delete");h(this,"options");h(this,"patch");h(this,"all");h(this,"on");h(this,"use");h(this,"router");h(this,"getPath");h(this,"_basePath","/");x(this,q,"/");h(this,"routes",[]);x(this,J,ms);h(this,"errorHandler",yt);h(this,"onError",t=>(this.errorHandler=t,this));h(this,"notFound",t=>(y(this,J,t),this));h(this,"fetch",(t,...s)=>k(this,P,qe).call(this,t,s[1],s[0],t.method));h(this,"request",(t,s,a,r)=>t instanceof Request?this.fetch(s?new Request(t,s):t,a,r):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${Ie("/",t)}`,s),a,r)));h(this,"fire",()=>{addEventListener("fetch",t=>{t.respondWith(k(this,P,qe).call(this,t.request,t,void 0,t.request.method))})});[...cs,ls].forEach(n=>{this[n]=(o,...l)=>(typeof o=="string"?y(this,q,o):k(this,P,be).call(this,n,d(this,q),o),l.forEach(c=>{k(this,P,be).call(this,n,d(this,q),c)}),this)}),this.on=(n,o,...l)=>{for(const c of[o].flat()){y(this,q,c);for(const i of[n].flat())l.map(m=>{k(this,P,be).call(this,i.toUpperCase(),d(this,q),m)})}return this},this.use=(n,...o)=>(typeof n=="string"?y(this,q,n):(y(this,q,"*"),o.unshift(n)),o.forEach(l=>{k(this,P,be).call(this,O,d(this,q),l)}),this);const{strict:a,...r}=t;Object.assign(this,r),this.getPath=a??!0?t.getPath??Ct:ss}route(t,s){const a=this.basePath(t);return s.routes.map(r=>{var o;let n;s.errorHandler===yt?n=r.handler:(n=async(l,c)=>(await ut([],s.errorHandler)(l,()=>r.handler(l,c))).res,n[ds]=r.handler),k(o=a,P,be).call(o,r.method,r.path,n)}),this}basePath(t){const s=k(this,P,Ot).call(this);return s._basePath=Ie(this._basePath,t),s}mount(t,s,a){let r,n;a&&(typeof a=="function"?n=a:(n=a.optionHandler,a.replaceRequest===!1?r=c=>c:r=a.replaceRequest));const o=n?c=>{const i=n(c);return Array.isArray(i)?i:[i]}:c=>{let i;try{i=c.executionCtx}catch{}return[c.env,i]};r||(r=(()=>{const c=Ie(this._basePath,t),i=c==="/"?0:c.length;return m=>{const u=new URL(m.url);return u.pathname=u.pathname.slice(i)||"/",new Request(u,m)}})());const l=async(c,i)=>{const m=await s(r(c.req.raw),...o(c));if(m)return m;await i()};return k(this,P,be).call(this,O,Ie(t,"*"),l),this}},q=new WeakMap,P=new WeakSet,Ot=function(){const t=new Oe({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,y(t,J,d(this,J)),t.routes=this.routes,t},J=new WeakMap,be=function(t,s,a){t=t.toUpperCase(),s=Ie(this._basePath,s);const r={basePath:this._basePath,path:s,method:t,handler:a};this.router.add(t,s,[a,r]),this.routes.push(r)},Ze=function(t,s){if(t instanceof Error)return this.errorHandler(t,s);throw t},qe=function(t,s,a,r){if(r==="HEAD")return(async()=>new Response(null,await k(this,P,qe).call(this,t,s,a,"GET")))();const n=this.getPath(t,{env:a}),o=this.router.match(r,n),l=new is(t,{path:n,matchResult:o,env:a,executionCtx:s,notFoundHandler:d(this,J)});if(o[0].length===1){let i;try{i=o[0][0][0][0](l,async()=>{l.res=await d(this,J).call(this,l)})}catch(m){return k(this,P,Ze).call(this,m,l)}return i instanceof Promise?i.then(m=>m||(l.finalized?l.res:d(this,J).call(this,l))).catch(m=>k(this,P,Ze).call(this,m,l)):i??d(this,J).call(this,l)}const c=ut(o[0],this.errorHandler,d(this,J));return(async()=>{try{const i=await c(l);if(!i.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return i.res}catch(i){return k(this,P,Ze).call(this,i,l)}})()},Oe),Pt=[];function us(e,t){const s=this.buildAllMatchers(),a=((r,n)=>{const o=s[r]||s[O],l=o[2][n];if(l)return l;const c=n.match(o[0]);if(!c)return[[],Pt];const i=c.indexOf("",1);return[o[1][i],c]});return this.match=a,a(e,t)}var et="[^/]+",Be=".*",$e="(?:|/.*)",Le=Symbol(),gs=new Set(".\\+*[^]$()");function ys(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===Be||e===$e?1:t===Be||t===$e?-1:e===et?1:t===et?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var we,ke,ee,Ae,hs=(Ae=class{constructor(){x(this,we);x(this,ke);x(this,ee,Object.create(null))}insert(t,s,a,r,n){if(t.length===0){if(d(this,we)!==void 0)throw Le;if(n)return;y(this,we,s);return}const[o,...l]=t,c=o==="*"?l.length===0?["","",Be]:["","",et]:o==="/*"?["","",$e]:o.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let i;if(c){const m=c[1];let u=c[2]||et;if(m&&c[2]&&(u===".*"||(u=u.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(u))))throw Le;if(i=d(this,ee)[u],!i){if(Object.keys(d(this,ee)).some(g=>g!==Be&&g!==$e))throw Le;if(n)return;i=d(this,ee)[u]=new Ae,m!==""&&y(i,ke,r.varIndex++)}!n&&m!==""&&a.push([m,d(i,ke)])}else if(i=d(this,ee)[o],!i){if(Object.keys(d(this,ee)).some(m=>m.length>1&&m!==Be&&m!==$e))throw Le;if(n)return;i=d(this,ee)[o]=new Ae}i.insert(l,s,a,r,n)}buildRegExpStr(){const s=Object.keys(d(this,ee)).sort(ys).map(a=>{const r=d(this,ee)[a];return(typeof d(r,ke)=="number"?`(${a})@${d(r,ke)}`:gs.has(a)?`\\${a}`:a)+r.buildRegExpStr()});return typeof d(this,we)=="number"&&s.unshift(`#${d(this,we)}`),s.length===0?"":s.length===1?s[0]:"(?:"+s.join("|")+")"}},we=new WeakMap,ke=new WeakMap,ee=new WeakMap,Ae),tt,Qe,xt,fs=(xt=class{constructor(){x(this,tt,{varIndex:0});x(this,Qe,new hs)}insert(e,t,s){const a=[],r=[];for(let o=0;;){let l=!1;if(e=e.replace(/\{[^}]+\}/g,c=>{const i=`@\\${o}`;return r[o]=[i,c],o++,l=!0,i}),!l)break}const n=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let o=r.length-1;o>=0;o--){const[l]=r[o];for(let c=n.length-1;c>=0;c--)if(n[c].indexOf(l)!==-1){n[c]=n[c].replace(l,r[o][1]);break}}return d(this,Qe).insert(n,t,a,d(this,tt),s),a}buildRegExp(){let e=d(this,Qe).buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const s=[],a=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(r,n,o)=>n!==void 0?(s[++t]=Number(n),"$()"):(o!==void 0&&(a[Number(o)]=++t),"")),[new RegExp(`^${e}`),s,a]}},tt=new WeakMap,Qe=new WeakMap,xt),bs=[/^$/,[],Object.create(null)],Je=Object.create(null);function Ft(e){return Je[e]??(Je[e]=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,s)=>s?`\\${s}`:"(?:|/.*)")}$`))}function xs(){Je=Object.create(null)}function vs(e){var i;const t=new fs,s=[];if(e.length===0)return bs;const a=e.map(m=>[!/\*|\/:/.test(m[0]),...m]).sort(([m,u],[g,f])=>m?1:g?-1:u.length-f.length),r=Object.create(null);for(let m=0,u=-1,g=a.length;m<g;m++){const[f,I,w]=a[m];f?r[I]=[w.map(([v])=>[v,Object.create(null)]),Pt]:u++;let b;try{b=t.insert(I,u,f)}catch(v){throw v===Le?new Dt(I):v}f||(s[u]=w.map(([v,N])=>{const D=Object.create(null);for(N-=1;N>=0;N--){const[te,M]=b[N];D[te]=M}return[v,D]}))}const[n,o,l]=t.buildRegExp();for(let m=0,u=s.length;m<u;m++)for(let g=0,f=s[m].length;g<f;g++){const I=(i=s[m][g])==null?void 0:i[1];if(!I)continue;const w=Object.keys(I);for(let b=0,v=w.length;b<v;b++)I[w[b]]=l[I[w[b]]]}const c=[];for(const m in o)c[m]=s[o[m]];return[n,c,r]}function Se(e,t){if(e){for(const s of Object.keys(e).sort((a,r)=>r.length-a.length))if(Ft(s).test(t))return[...e[s]]}}var ue,ge,st,jt,vt,ws=(vt=class{constructor(){x(this,st);h(this,"name","RegExpRouter");x(this,ue);x(this,ge);h(this,"match",us);y(this,ue,{[O]:Object.create(null)}),y(this,ge,{[O]:Object.create(null)})}add(e,t,s){var l;const a=d(this,ue),r=d(this,ge);if(!a||!r)throw new Error(Tt);a[e]||[a,r].forEach(c=>{c[e]=Object.create(null),Object.keys(c[O]).forEach(i=>{c[e][i]=[...c[O][i]]})}),t==="/*"&&(t="*");const n=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const c=Ft(t);e===O?Object.keys(a).forEach(i=>{var m;(m=a[i])[t]||(m[t]=Se(a[i],t)||Se(a[O],t)||[])}):(l=a[e])[t]||(l[t]=Se(a[e],t)||Se(a[O],t)||[]),Object.keys(a).forEach(i=>{(e===O||e===i)&&Object.keys(a[i]).forEach(m=>{c.test(m)&&a[i][m].push([s,n])})}),Object.keys(r).forEach(i=>{(e===O||e===i)&&Object.keys(r[i]).forEach(m=>c.test(m)&&r[i][m].push([s,n]))});return}const o=At(t)||[t];for(let c=0,i=o.length;c<i;c++){const m=o[c];Object.keys(r).forEach(u=>{var g;(e===O||e===u)&&((g=r[u])[m]||(g[m]=[...Se(a[u],m)||Se(a[O],m)||[]]),r[u][m].push([s,n-i+c+1]))})}}buildAllMatchers(){const e=Object.create(null);return Object.keys(d(this,ge)).concat(Object.keys(d(this,ue))).forEach(t=>{e[t]||(e[t]=k(this,st,jt).call(this,t))}),y(this,ue,y(this,ge,void 0)),xs(),e}},ue=new WeakMap,ge=new WeakMap,st=new WeakSet,jt=function(e){const t=[];let s=e===O;return[d(this,ue),d(this,ge)].forEach(a=>{const r=a[e]?Object.keys(a[e]).map(n=>[n,a[e][n]]):[];r.length!==0?(s||(s=!0),t.push(...r)):e!==O&&t.push(...Object.keys(a[O]).map(n=>[n,a[O][n]]))}),s?vs(t):null},vt),ye,ie,wt,ks=(wt=class{constructor(e){h(this,"name","SmartRouter");x(this,ye,[]);x(this,ie,[]);y(this,ye,e.routers)}add(e,t,s){if(!d(this,ie))throw new Error(Tt);d(this,ie).push([e,t,s])}match(e,t){if(!d(this,ie))throw new Error("Fatal error");const s=d(this,ye),a=d(this,ie),r=s.length;let n=0,o;for(;n<r;n++){const l=s[n];try{for(let c=0,i=a.length;c<i;c++)l.add(...a[c]);o=l.match(e,t)}catch(c){if(c instanceof Dt)continue;throw c}this.match=l.match.bind(l),y(this,ye,[l]),y(this,ie,void 0);break}if(n===r)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,o}get activeRouter(){if(d(this,ie)||d(this,ye).length!==1)throw new Error("No active router has been determined yet.");return d(this,ye)[0]}},ye=new WeakMap,ie=new WeakMap,wt),Ge=Object.create(null),he,W,Ee,Pe,U,le,xe,Fe,Es=(Fe=class{constructor(t,s,a){x(this,le);x(this,he);x(this,W);x(this,Ee);x(this,Pe,0);x(this,U,Ge);if(y(this,W,a||Object.create(null)),y(this,he,[]),t&&s){const r=Object.create(null);r[t]={handler:s,possibleKeys:[],score:0},y(this,he,[r])}y(this,Ee,[])}insert(t,s,a){y(this,Pe,++pt(this,Pe)._);let r=this;const n=Zt(s),o=[];for(let l=0,c=n.length;l<c;l++){const i=n[l],m=n[l+1],u=es(i,m),g=Array.isArray(u)?u[0]:i;if(g in d(r,W)){r=d(r,W)[g],u&&o.push(u[1]);continue}d(r,W)[g]=new Fe,u&&(d(r,Ee).push(u),o.push(u[1])),r=d(r,W)[g]}return d(r,he).push({[t]:{handler:a,possibleKeys:o.filter((l,c,i)=>i.indexOf(l)===c),score:d(this,Pe)}}),r}search(t,s){var c;const a=[];y(this,U,Ge);let n=[this];const o=Et(s),l=[];for(let i=0,m=o.length;i<m;i++){const u=o[i],g=i===m-1,f=[];for(let I=0,w=n.length;I<w;I++){const b=n[I],v=d(b,W)[u];v&&(y(v,U,d(b,U)),g?(d(v,W)["*"]&&a.push(...k(this,le,xe).call(this,d(v,W)["*"],t,d(b,U))),a.push(...k(this,le,xe).call(this,v,t,d(b,U)))):f.push(v));for(let N=0,D=d(b,Ee).length;N<D;N++){const te=d(b,Ee)[N],M=d(b,U)===Ge?{}:{...d(b,U)};if(te==="*"){const H=d(b,W)["*"];H&&(a.push(...k(this,le,xe).call(this,H,t,d(b,U))),y(H,U,M),f.push(H));continue}const[se,je,de]=te;if(!u&&!(de instanceof RegExp))continue;const $=d(b,W)[se],Ue=o.slice(i).join("/");if(de instanceof RegExp){const H=de.exec(Ue);if(H){if(M[je]=H[0],a.push(...k(this,le,xe).call(this,$,t,d(b,U),M)),Object.keys(d($,W)).length){y($,U,M);const ze=((c=H[0].match(/\//))==null?void 0:c.length)??0;(l[ze]||(l[ze]=[])).push($)}continue}}(de===!0||de.test(u))&&(M[je]=u,g?(a.push(...k(this,le,xe).call(this,$,t,M,d(b,U))),d($,W)["*"]&&a.push(...k(this,le,xe).call(this,d($,W)["*"],t,M,d(b,U)))):(y($,U,M),f.push($)))}}n=f.concat(l.shift()??[])}return a.length>1&&a.sort((i,m)=>i.score-m.score),[a.map(({handler:i,params:m})=>[i,m])]}},he=new WeakMap,W=new WeakMap,Ee=new WeakMap,Pe=new WeakMap,U=new WeakMap,le=new WeakSet,xe=function(t,s,a,r){const n=[];for(let o=0,l=d(t,he).length;o<l;o++){const c=d(t,he)[o],i=c[s]||c[O],m={};if(i!==void 0&&(i.params=Object.create(null),n.push(i),a!==Ge||r&&r!==Ge))for(let u=0,g=i.possibleKeys.length;u<g;u++){const f=i.possibleKeys[u],I=m[i.score];i.params[f]=r!=null&&r[f]&&!I?r[f]:a[f]??(r==null?void 0:r[f]),m[i.score]=!0}}return n},Fe),Ce,kt,Cs=(kt=class{constructor(){h(this,"name","TrieRouter");x(this,Ce);y(this,Ce,new Es)}add(e,t,s){const a=At(t);if(a){for(let r=0,n=a.length;r<n;r++)d(this,Ce).insert(e,a[r],s);return}d(this,Ce).insert(e,t,s)}match(e,t){return d(this,Ce).search(e,t)}},Ce=new WeakMap,kt),Ut=class extends ps{constructor(e={}){super(e),this.router=e.router??new ks({routers:[new ws,new Cs]})}},As=e=>{const s={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...e},a=(n=>typeof n=="string"?n==="*"?()=>n:o=>n===o?o:null:typeof n=="function"?n:o=>n.includes(o)?o:null)(s.origin),r=(n=>typeof n=="function"?n:Array.isArray(n)?()=>n:()=>[])(s.allowMethods);return async function(o,l){var m;function c(u,g){o.res.headers.set(u,g)}const i=await a(o.req.header("origin")||"",o);if(i&&c("Access-Control-Allow-Origin",i),s.credentials&&c("Access-Control-Allow-Credentials","true"),(m=s.exposeHeaders)!=null&&m.length&&c("Access-Control-Expose-Headers",s.exposeHeaders.join(",")),o.req.method==="OPTIONS"){s.origin!=="*"&&c("Vary","Origin"),s.maxAge!=null&&c("Access-Control-Max-Age",s.maxAge.toString());const u=await r(o.req.header("origin")||"",o);u.length&&c("Access-Control-Allow-Methods",u.join(","));let g=s.allowHeaders;if(!(g!=null&&g.length)){const f=o.req.header("Access-Control-Request-Headers");f&&(g=f.split(/\s*,\s*/))}return g!=null&&g.length&&(c("Access-Control-Allow-Headers",g.join(",")),o.res.headers.append("Vary","Access-Control-Request-Headers")),o.res.headers.delete("Content-Length"),o.res.headers.delete("Content-Type"),new Response(null,{headers:o.res.headers,status:204,statusText:"No Content"})}await l(),s.origin!=="*"&&o.header("Vary","Origin",{append:!0})}};const A=new Ut;A.use("/api/*",As());const Ss="e77554988b424c6498d85362b0367757",Is="https://www.streak.com/api/v1",F={mabsilico:{name:"MabSilico",pipelineKey:"agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgOqI26zZCAw",url:"https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgOqI26zZCAw",networkSheetGid:"910674612",sources:{promote:"",network:"https://docs.google.com/spreadsheets/d/1NzUlKfHTW6v7i-S59GjtBFlzQwTX2AaeK4gQ4fVSAsw/edit?gid=910674612#gid=910674612",engage:"https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgOqI26zZCAw"}},"finance-montreal":{name:"Finance Montreal (Steve)",pipelineKey:"agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgI7YkpykCQw",url:"https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgI7YkpykCQw"},"apm-music":{name:"APM Music",pipelineKey:"agxzfm1haWxmb29nYWVyRAsSDE9yZ2FuaXphdGlvbiIdYWluYS5hbmRyaWFtYW5nYXNvbkBnbWFpbC5jb20MCxIIV29ya2Zsb3cYgIClnNb8gwsM",url:"https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyRAsSDE9yZ2FuaXphdGlvbiIdYWluYS5hbmRyaWFtYW5nYXNvbkBnbWFpbC5jb20MCxIIV29ya2Zsb3cYgIClnNb8gwsM"},ducrocq:{name:"Ducrocq",pipelineKey:"agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgNaSl4OGCww",url:"https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgNaSl4OGCww"},milvue:{name:"Milvue",pipelineKey:"agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgMX-7baZCgw",url:"https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgMX-7baZCgw"},seekyo:{name:"Seekyo Therapeutics",pipelineKey:"agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgLnYo_uUCww",url:"https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgLnYo_uUCww"},altavia:{name:"Altavia",pipelineKey:"agxzfm1haWxmb29nYWVyRAsSDE9yZ2FuaXphdGlvbiIdYWluYS5hbmRyaWFtYW5nYXNvbkBnbWFpbC5jb20MCxIIV29ya2Zsb3cYgICFz_elmwgM",url:"https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyRAsSDE9yZ2FuaXphdGlvbiIdYWluYS5hbmRyaWFtYW5nYXNvbkBnbWFpbC5jb20MCxIIV29ya2Zsb3cYgICFz_elmwgM"},valos:{name:"Valos",pipelineKey:"agxzfm1haWxmb29nYWVyRAsSDE9yZ2FuaXphdGlvbiIdYWluYS5hbmRyaWFtYW5nYXNvbkBnbWFpbC5jb20MCxIIV29ya2Zsb3cYgICF5ei7lgkM",url:"https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyRAsSDE9yZ2FuaXphdGlvbiIdYWluYS5hbmRyaWFtYW5nYXNvbkBnbWFpbC5jb20MCxIIV29ya2Zsb3cYgICF5ei7lgkM"},"dab-embedded":{name:"DAB-Embedded",pipelineKey:"agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgKWyqIboCww",url:"https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgKWyqIboCww"},"finance-montreal-noza":{name:"Finance Montreal (Noza)",pipelineKey:"agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgKWVvvDkCgw",url:"https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgKWVvvDkCgw"}},Y=F.mabsilico.pipelineKey;F.mabsilico.name;const Wt="Fit",Gt="Interest",Ns="1NzUlKfHTW6v7i-S59GjtBFlzQwTX2AaeK4gQ4fVSAsw",Ls=`https://docs.google.com/spreadsheets/d/${Ns}/export?format=csv`;async function fe(e,t){return F[t]}async function C(e){const t=btoa(`${Ss}:`),s=await fetch(`${Is}${e}`,{headers:{Authorization:`Basic ${t}`,"Content-Type":"application/json"}});if(!s.ok)throw new Error(`Streak API error: ${s.statusText}`);return s.json()}async function Rs(e){try{const t=`${Ls}&gid=${e}`,s=await fetch(t);if(!s.ok)throw new Error(`Google Sheets error: ${s.statusText}`);const r=(await s.text()).split(`
`).filter(w=>w.trim()),n=[];for(let w=1;w<r.length;w++){const v=r[w].split(",");if(v.length>=9&&v[3]&&v[3].trim()){const N=parseInt(v[3])||0,D=parseInt(v[4])||0,te=v[7]?v[7].replace("%","").trim():"0",M=parseFloat(te)||0;n.push({week:v[0],from:v[1],to:v[2],invitations:N,messages:D,acceptance:M,opportunities:parseInt(v[8])||0})}}const o=n.reduce((w,b)=>w+b.invitations,0),l=n.reduce((w,b)=>{const v=Math.min(b.acceptance,100);return w+Math.round(b.invitations*v/100)},0),c=n.map(w=>Math.min(w.acceptance,100)),i=c.length>0?c.reduce((w,b)=>w+b,0)/c.length:0,m=20,u=i>0?i/m*100:0,g=n.slice(-4),f=n[n.length-1]||{invitations:0,acceptance:0},I=n[n.length-2]||{invitations:0,acceptance:0};return{totalInvitations:o,totalAccepted:l,avgAcceptanceRate:Math.round(i*10)/10,networkObjective:m,objectiveAchievement:Math.round(u*10)/10,thisWeek:{invitations:f.invitations,acceptance:Math.min(f.acceptance,100)},lastWeek:{invitations:I.invitations,acceptance:Math.min(I.acceptance,100)},recentWeeks:g.map(w=>({...w,acceptance:Math.min(w.acceptance,100)})),allData:n}}catch(t){return console.error("Error fetching network data:",t),{totalInvitations:0,totalAccepted:0,avgAcceptanceRate:0,thisWeek:{invitations:0,acceptance:0},lastWeek:{invitations:0,acceptance:0},recentWeeks:[],allData:[]}}}A.get("/api/pipeline",async e=>{try{const t=await C(`/pipelines/${Y}`);return e.json(t)}catch(t){return e.json({error:t.message},500)}});A.get("/api/boxes",async e=>{try{const t=await C(`/pipelines/${Y}/boxes`);return e.json(t)}catch(t){return e.json({error:t.message},500)}});A.get("/api/boxes/:boxKey",async e=>{try{const t=e.req.param("boxKey"),s=await C(`/boxes/${t}`);return e.json(s)}catch(t){return e.json({error:t.message},500)}});A.get("/api/sheets/stage/:stageName/count",async e=>{try{const t=e.req.param("stageName"),[s,a]=await Promise.all([C(`/pipelines/${Y}`),C(`/pipelines/${Y}/boxes`)]),r=s.stageOrder||[],n=Array.isArray(r)?r.map(l=>{var c,i;return{key:l,name:((i=(c=s.stages)==null?void 0:c[l])==null?void 0:i.name)||"Unknown"}}):[],o=Array.isArray(a)?a.filter(l=>{const c=n.find(i=>i&&i.key===l.stageKey);return c&&c.name.toLowerCase()===t.toLowerCase()}).length:0;return e.text(o.toString())}catch{return e.text("ERROR")}});A.get("/api/sheets/priority/:priorityName/count",async e=>{try{const t=e.req.param("priorityName"),[s,a]=await Promise.all([C(`/pipelines/${Y}`),C(`/pipelines/${Y}/boxes`)]),n=(Array.isArray(s.fields)?s.fields:[]).find(l=>l&&l.name==="Priority"),o=Array.isArray(a)?a.filter(l=>{var g;if(!n||!l.fields||!l.fields[n.key])return t.toLowerCase()==="no priority";const c=l.fields[n.key],i=(g=n.dropdownSettings)==null?void 0:g.items,m=Array.isArray(i)?i.find(f=>f&&f.key===c):null;return(m?m.name:"No Priority").toLowerCase().includes(t.toLowerCase())}).length:0;return e.text(o.toString())}catch{return e.text("ERROR")}});A.get("/api/sheets/country/:countryName/count",async e=>{try{const t=e.req.param("countryName"),[s,a]=await Promise.all([C(`/pipelines/${Y}`),C(`/pipelines/${Y}/boxes`)]),n=(Array.isArray(s.fields)?s.fields:[]).find(l=>l&&l.name==="Country"),o=Array.isArray(a)?a.filter(l=>{var g;if(!n||!l.fields||!l.fields[n.key])return t.toLowerCase()==="unknown";const c=l.fields[n.key],i=(g=n.dropdownSettings)==null?void 0:g.items,m=Array.isArray(i)?i.find(f=>f&&f.key===c):null;return(m?m.name:"Unknown").toLowerCase()===t.toLowerCase()}).length:0;return e.text(o.toString())}catch{return e.text("ERROR")}});A.get("/api/sheets/total",async e=>{try{const t=await C(`/pipelines/${Y}/boxes`),s=Array.isArray(t)?t.length:0;return e.text(s.toString())}catch{return e.text("ERROR")}});A.get("/api/sheets/freshness/:level/count",async e=>{try{const t=e.req.param("level").toLowerCase(),s=await C(`/pipelines/${Y}/boxes`),a=Array.isArray(s)?s.filter(r=>{const n=r.freshness||0;return t==="high"?n>.5:t==="medium"?n>=.2&&n<=.5:t==="low"?n<.2:!1}).length:0;return e.text(a.toString())}catch{return e.text("ERROR")}});A.get("/api/sheets/fit/:fitLevel/count",async e=>{try{const t=e.req.param("fitLevel"),[s,a]=await Promise.all([C(`/pipelines/${Y}`),C(`/pipelines/${Y}/boxes`)]),n=(Array.isArray(s.fields)?s.fields:[]).find(l=>l&&l.name===Wt),o=Array.isArray(a)?a.filter(l=>{var g;if(!n||!l.fields||!l.fields[n.key])return t.toLowerCase()==="not set";const c=l.fields[n.key],i=(g=n.dropdownSettings)==null?void 0:g.items,m=Array.isArray(i)?i.find(f=>f&&f.key===c):null;return(m?m.name:"Not Set").toLowerCase()===t.toLowerCase()}).length:0;return e.text(o.toString())}catch{return e.text("ERROR")}});A.get("/api/sheets/interest/:interestLevel/count",async e=>{try{const t=e.req.param("interestLevel"),[s,a]=await Promise.all([C(`/pipelines/${Y}`),C(`/pipelines/${Y}/boxes`)]),n=(Array.isArray(s.fields)?s.fields:[]).find(l=>l&&l.name===Gt),o=Array.isArray(a)?a.filter(l=>{var g;if(!n||!l.fields||!l.fields[n.key])return t.toLowerCase()==="not set";const c=l.fields[n.key],i=(g=n.dropdownSettings)==null?void 0:g.items,m=Array.isArray(i)?i.find(f=>f&&f.key===c):null;return(m?m.name:"Not Set").toLowerCase()===t.toLowerCase()}).length:0;return e.text(o.toString())}catch{return e.text("ERROR")}});A.get("/api/companies",async e=>{try{const t=Object.keys(F).map(s=>{var a,r,n;return{key:s,name:F[s].name,url:F[s].url,pipeline_key:F[s].pipelineKey,promote_url:((a=F[s].sources)==null?void 0:a.promote)||null,network_url:((r=F[s].sources)==null?void 0:r.network)||null,network_sheet_gid:F[s].networkSheetGid||null,engage_url:((n=F[s].sources)==null?void 0:n.engage)||null,notion_url:F[s].notionUrl||null}});return e.json({companies:t,count:t.length})}catch(t){return console.error("Error fetching companies:",t),e.json({error:"Failed to fetch companies",companies:[],count:0},500)}});A.post("/api/companies",async e=>{try{const t=await e.req.json(),{key:s,name:a,pipeline_key:r,url:n,promote_url:o,network_url:l,network_sheet_gid:c,engage_url:i,notion_url:m}=t;return!s||!a||!r||!n?e.json({error:"Missing required fields: key, name, pipeline_key, url"},400):F[s]?e.json({error:"Company with this key already exists"},409):(F[s]={name:a,pipelineKey:r,url:n,networkSheetGid:c||null,notionUrl:m||null,sources:{promote:o||"",network:l||"",engage:i||""}},e.json({success:!0,message:"Company added successfully (session only)",key:s}))}catch(t){return console.error("Error adding company:",t),e.json({error:"Failed to add company"},500)}});A.delete("/api/companies/:key",async e=>{try{const t=e.req.param("key");return F[t]?(delete F[t],e.json({success:!0,message:"Company deleted successfully (session only)"})):e.json({error:"Company not found"},404)}catch(t){return console.error("Error deleting company:",t),e.json({error:"Failed to delete company"},500)}});A.put("/api/companies/:key",async e=>{try{const t=e.req.param("key"),s=await e.req.json(),{name:a,pipeline_key:r,url:n,promote_url:o,network_url:l,network_sheet_gid:c,engage_url:i,notion_url:m}=s;return F[t]?(F[t]={name:a,pipelineKey:r,url:n,networkSheetGid:c||null,notionUrl:m||null,sources:{promote:o||"",network:l||"",engage:i||""}},e.json({success:!0,message:"Company updated successfully (session only)"})):e.json({error:"Company not found"},404)}catch(t){return console.error("Error updating company:",t),e.json({error:"Failed to update company"},500)}});A.get("/api/sheets/:companyName/total",async e=>{try{const t=e.req.param("companyName").toLowerCase(),s=await fe(void 0,t);if(!s)return e.text("COMPANY_NOT_FOUND");const a=await C(`/pipelines/${s.pipelineKey}/boxes`),r=Array.isArray(a)?a.length:0;return e.text(r.toString())}catch{return e.text("ERROR")}});A.get("/api/sheets/:companyName/month/:yearMonth/count",async e=>{try{const t=e.req.param("companyName").toLowerCase(),s=e.req.param("yearMonth"),a=await fe(void 0,t);if(!a)return e.text("COMPANY_NOT_FOUND");const r=await C(`/pipelines/${a.pipelineKey}/boxes`),[n,o]=s.split("-").map(Number),l=Array.isArray(r)?r.filter(c=>{const i=new Date(c.creationTimestamp);return i.getFullYear()===n&&i.getMonth()+1===o}).length:0;return e.text(l.toString())}catch{return e.text("ERROR")}});A.get("/api/sheets/:companyName/week/count",async e=>{try{const t=e.req.param("companyName").toLowerCase(),s=await fe(void 0,t);if(!s)return e.text("ERROR");const a=await C(`/pipelines/${s.pipelineKey}/boxes`);if(!Array.isArray(a))return e.text("0");const n=Date.now()-10080*60*1e3,o=a.filter(l=>(l.creationTimestamp||0)>=n).length;return e.text(o.toString())}catch{return e.text("ERROR")}});A.get("/api/sheets/:companyName/duration/total",async e=>{try{const t=e.req.param("companyName").toLowerCase(),s=await fe(void 0,t);if(!s)return e.text("0");const a=await C(`/pipelines/${s.pipelineKey}/boxes`);if(!Array.isArray(a)||a.length===0)return e.text("0");const r=a.map(u=>u.creationTimestamp).filter(u=>u);if(r.length===0)return e.text("0");const n=Math.min(...r),o=new Date(n),l=new Date,c=l.getFullYear()-o.getFullYear(),i=l.getMonth()-o.getMonth(),m=c*12+i+1;return e.text(m.toString())}catch{return e.text("0")}});A.get("/api/sheets/:companyName/monthly-stats",async e=>{try{const t=e.req.param("companyName").toLowerCase(),s=await fe(void 0,t);if(!s)return e.json({error:"Company not found"},404);const a=await C(`/pipelines/${s.pipelineKey}/boxes`),r=Array.isArray(a)?a:[],n=new Date,o=[];for(let m=11;m>=0;m--){const u=new Date(n.getFullYear(),n.getMonth()-m,1),g=u.getFullYear(),f=u.getMonth()+1,I=r.filter(b=>{const v=new Date(b.creationTimestamp);return v.getFullYear()===g&&v.getMonth()+1===f}).length,w=(I/10*100).toFixed(1);o.push({month:`${g}-${String(f).padStart(2,"0")}`,count:I,objective:10,percentage:parseFloat(w)})}const l=o.reduce((m,u)=>m+u.count,0),c=(l/12).toFixed(1),i=(parseFloat(c)/10*100).toFixed(1);return e.json({company:s.name,companyKey:t,objective:10,monthlyStats:o,summary:{totalLeads:l,average:parseFloat(c),averagePercentage:parseFloat(i)}})}catch(t){return e.json({error:t.message},500)}});A.get("/api/sheets/:companyName/due",async e=>{try{const t=e.req.param("companyName").toLowerCase().replace(/ /g,"-"),s=await fe(void 0,t);if(!s)return e.text("COMPANY_NOT_FOUND");const[a,r]=await Promise.all([C(`/pipelines/${s.pipelineKey}`),C(`/pipelines/${s.pipelineKey}/boxes`)]);if(!Array.isArray(r))return e.text("0");const o=(Array.isArray(a.fields)?a.fields:[]).find(i=>i&&(i.name==="Est Start Date"||i.name==="Due Date"||i.name==="Start Date"));if(!o)return e.text("0");const l=Date.now();let c=0;return r.forEach(i=>{i.fields&&i.fields[o.key]&&i.fields[o.key]&&c++}),e.text(c.toString())}catch(t){return console.error("Error fetching due items:",t),e.text("ERROR")}});A.get("/api/sheets/:companyName/overdue",async e=>{try{const t=e.req.param("companyName").toLowerCase().replace(/ /g,"-"),s=await fe(void 0,t);if(!s)return e.text("COMPANY_NOT_FOUND");const[a,r]=await Promise.all([C(`/pipelines/${s.pipelineKey}`),C(`/pipelines/${s.pipelineKey}/boxes`)]);if(!Array.isArray(r))return e.text("0");const o=(Array.isArray(a.fields)?a.fields:[]).find(i=>i&&(i.name==="Est Start Date"||i.name==="Due Date"||i.name==="Start Date"));if(!o)return e.text("0");const l=Date.now();let c=0;return r.forEach(i=>{if(i.fields&&i.fields[o.key]){const m=i.fields[o.key];m&&m<l&&c++}}),e.text(c.toString())}catch(t){return console.error("Error fetching overdue items:",t),e.text("ERROR")}});A.get("/api/analytics",async e=>{try{const t=e.req.query("company")||"mabsilico",s=await fe(void 0,t);if(!s)return e.json({error:"Invalid company key"},400);const a=s.pipelineKey,[r,n]=await Promise.all([C(`/pipelines/${a}`),C(`/pipelines/${a}/boxes`)]),o=Array.isArray(n)?n.length:0,l={},c={},i={},m={},u={},g={},f={"High (>0.5)":0,"Medium (0.2-0.5)":0,"Low (<0.2)":0},I=r.stageOrder||[],w=Array.isArray(I)?I.map(p=>{var R,G;return{key:p,name:((G=(R=r.stages)==null?void 0:R[p])==null?void 0:G.name)||"Unknown"}}):[],b=Array.isArray(r.fields)?r.fields:[],v=b.find(p=>p&&p.name==="Origin"),N=b.find(p=>p&&p.name===Wt),D=b.find(p=>p&&p.name===Gt),te=b.find(p=>p&&p.name==="Est Start Date"),M=b.find(p=>p&&p.name==="Country"),se=b.find(p=>p&&p.name==="Language");Array.isArray(n)&&n.forEach(p=>{var V,ae,ne,Q,z;if(!p)return;const R=w.find(T=>T&&T.key===p.stageKey),G=R?R.name:"Unknown";if(l[G]=(l[G]||0)+1,v&&p.fields&&p.fields[v.key]){const T=p.fields[v.key],L=(V=v.dropdownSettings)==null?void 0:V.items,j=Array.isArray(L)?L.find(E=>E&&E.key===T):null,S=j?j.name:"Unknown";c[S]=(c[S]||0)+1}if(N&&p.fields&&p.fields[N.key]){const T=p.fields[N.key],L=(ae=N.dropdownSettings)==null?void 0:ae.items,j=Array.isArray(L)?L.find(E=>E&&E.key===T):null,S=j?j.name:"Not Set";i[S]=(i[S]||0)+1}else i["Not Set"]=(i["Not Set"]||0)+1;if(D&&p.fields&&p.fields[D.key]){const T=p.fields[D.key],L=(ne=D.dropdownSettings)==null?void 0:ne.items,j=Array.isArray(L)?L.find(E=>E&&E.key===T):null,S=j?j.name:"Not Set";m[S]=(m[S]||0)+1}else m["Not Set"]=(m["Not Set"]||0)+1;if(M&&p.fields&&p.fields[M.key]){const T=p.fields[M.key],L=(Q=M.dropdownSettings)==null?void 0:Q.items,j=Array.isArray(L)?L.find(E=>E&&E.key===T):null,S=j?j.name:"Unknown";u[S]=(u[S]||0)+1}else u.Unknown=(u.Unknown||0)+1;if(se&&p.fields&&p.fields[se.key]){const T=p.fields[se.key],L=(z=se.dropdownSettings)==null?void 0:z.items,j=Array.isArray(L)?L.find(E=>E&&E.key===T):null,S=j?j.name:"Unknown";g[S]=(g[S]||0)+1}else g.Unknown=(g.Unknown||0)+1;const K=p.freshness||0;K>.5?f["High (>0.5)"]++:K>=.2?f["Medium (0.2-0.5)"]++:f["Low (<0.2)"]++});const je={};Object.keys(i).forEach(p=>{je[p]=o>0?(i[p]/o*100).toFixed(1):0});const de={};Object.keys(m).forEach(p=>{de[p]=o>0?(m[p]/o*100).toFixed(1):0});const $=new Date,Ue=[],H=10;for(let p=11;p>=0;p--){const R=new Date($.getFullYear(),$.getMonth()-p,1),G=R.getFullYear(),K=R.getMonth()+1,V=Array.isArray(n)?n.filter(ne=>{const Q=new Date(ne.creationTimestamp);return Q.getFullYear()===G&&Q.getMonth()+1===K}).length:0,ae=(V/H*100).toFixed(1);Ue.push({month:`${G}-${String(K).padStart(2,"0")}`,monthName:R.toLocaleString("en-US",{month:"short",year:"numeric"}),count:V,objective:H,percentage:parseFloat(ae),status:V>=H?"achieved":"pending"})}const at=(Ue.reduce((p,R)=>p+R.count,0)/12).toFixed(1),$t=(parseFloat(at)/H*100).toFixed(1);let ct=0,We=null;if(Array.isArray(n)&&n.length>0){const p=n.map(R=>R.creationTimestamp).filter(R=>R);if(p.length>0){const R=Math.min(...p);We=new Date(R);const G=$.getFullYear()-We.getFullYear(),K=$.getMonth()-We.getMonth();ct=G*12+K+1}}let dt=null;return s.networkSheetGid&&(dt=await Rs(s.networkSheetGid)),e.json({company:s.name,companyKey:t,totalBoxes:o,campaignDurationMonths:ct,firstLeadDate:We?We.toISOString():null,networkData:dt,stageDistribution:l,originDistribution:c,fitDistribution:i,fitPercentages:je,interestDistribution:m,interestPercentages:de,countryDistribution:u,languageDistribution:g,freshnessDistribution:f,monthlyLeads:Ue,leadObjective:H,averageLeadsPerMonth:parseFloat(at),averagePercentage:parseFloat($t),recentBoxes:Array.isArray(n)?n.filter(p=>{var ae,ne;const R=N&&p.fields&&p.fields[N.key],G=D&&p.fields&&p.fields[D.key];let K="Not Set";if(R){const Q=p.fields[N.key],z=(ae=N.dropdownSettings)==null?void 0:ae.items,T=Array.isArray(z)?z.find(L=>L&&L.key===Q):null;K=T?T.name:"Not Set"}let V="Not Set";if(G){const Q=p.fields[D.key],z=(ne=D.dropdownSettings)==null?void 0:ne.items,T=Array.isArray(z)?z.find(L=>L&&L.key===Q):null;V=T?T.name:"Not Set"}return K==="High"||V==="High"}).slice(0,10).map(p=>{var z,T,L,j;const R=w.find(S=>S&&S.key===p.stageKey);let G="Not Set";if(N&&p.fields&&p.fields[N.key]){const S=p.fields[N.key],E=(z=N.dropdownSettings)==null?void 0:z.items,X=Array.isArray(E)?E.find(Z=>Z&&Z.key===S):null;G=X?X.name:"Not Set"}let K="Not Set";if(D&&p.fields&&p.fields[D.key]){const S=p.fields[D.key],E=(T=D.dropdownSettings)==null?void 0:T.items,X=Array.isArray(E)?E.find(Z=>Z&&Z.key===S):null;K=X?X.name:"Not Set"}let V=null;te&&p.fields&&p.fields[te.key]&&(V=new Date(p.fields[te.key]).toISOString());let ae="Unknown";if(M&&p.fields&&p.fields[M.key]){const S=p.fields[M.key],E=(L=M.dropdownSettings)==null?void 0:L.items,X=Array.isArray(E)?E.find(Z=>Z&&Z.key===S):null;ae=X?X.name:"Unknown"}let ne="Unknown";if(se&&p.fields&&p.fields[se.key]){const S=p.fields[se.key],E=(j=se.dropdownSettings)==null?void 0:j.items,X=Array.isArray(E)?E.find(Z=>Z&&Z.key===S):null;ne=X?X.name:"Unknown"}const Q=p.freshness||0;return{name:p.name||"Unnamed",key:p.boxKey,stage:R?R.name:"Unknown",fit:G,interest:K,dueDate:V,country:ae,language:ne,freshness:Q.toFixed(3),lastUpdated:new Date(p.lastUpdatedTimestamp).toISOString()}}):[]})}catch(t){return e.json({error:t.message},500)}});A.get("/admin",e=>e.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Admin Panel - Gershon CRM</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <style>
            body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
        </style>
    </head>
    <body class="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
        <!-- Header -->
        <div class="bg-white shadow-lg border-b-4 border-blue-600">
            <div class="max-w-7xl mx-auto px-6 py-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg">
                            <i class="fas fa-shield-alt mr-2"></i>
                            <span class="font-bold">ADMIN PANEL</span>
                        </div>
                        <h1 class="text-2xl font-bold text-gray-800">Company Management</h1>
                    </div>
                    <div class="flex items-center space-x-4">
                        <span class="text-sm text-gray-600">Version <strong>1.0.0</strong></span>
                        <a href="/" class="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all">
                            <i class="fas fa-arrow-left mr-2"></i>
                            Back to Dashboard
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div class="max-w-7xl mx-auto px-6 py-8">
            <!-- Stats Overview -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div class="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-600 font-medium">Total Companies</p>
                            <p id="total-companies" class="text-3xl font-bold text-gray-800 mt-1">-</p>
                        </div>
                        <div class="bg-blue-100 p-4 rounded-lg">
                            <i class="fas fa-building text-blue-600 text-2xl"></i>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-600 font-medium">Configured</p>
                            <p id="configured-companies" class="text-3xl font-bold text-gray-800 mt-1">-</p>
                        </div>
                        <div class="bg-green-100 p-4 rounded-lg">
                            <i class="fas fa-check-circle text-green-600 text-2xl"></i>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-lg shadow-lg p-6 border-l-4 border-yellow-500">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-600 font-medium">Needs Setup</p>
                            <p id="needs-setup-companies" class="text-3xl font-bold text-gray-800 mt-1">-</p>
                        </div>
                        <div class="bg-yellow-100 p-4 rounded-lg">
                            <i class="fas fa-exclamation-triangle text-yellow-600 text-2xl"></i>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Add New Company Form -->
            <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
                <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <i class="fas fa-plus-circle text-green-600 mr-3"></i>
                    Add New Company
                </h2>
                
                <form id="add-company-form" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Company Name -->
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            Company Name <span class="text-red-500">*</span>
                        </label>
                        <input 
                            type="text" 
                            id="company-name" 
                            placeholder="e.g., Acme Corporation"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <!-- Company Key -->
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            Company Key <span class="text-red-500">*</span>
                        </label>
                        <input 
                            type="text" 
                            id="company-key" 
                            placeholder="e.g., acme-corp"
                            pattern="[a-z0-9-]+"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono"
                            required
                        />
                        <p class="text-xs text-gray-500 mt-1">Lowercase letters, numbers, and hyphens only</p>
                    </div>

                    <!-- Streak Pipeline Key -->
                    <div class="md:col-span-2">
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            Streak Pipeline Key <span class="text-red-500">*</span>
                        </label>
                        <textarea 
                            id="pipeline-key" 
                            rows="2"
                            placeholder="e.g., agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlh..."
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                            required
                        ></textarea>
                    </div>

                    <!-- ENGAGE URL -->
                    <div class="md:col-span-2">
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            ENGAGE URL (Streak Pipeline) <span class="text-red-500">*</span>
                        </label>
                        <input 
                            type="url" 
                            id="engage-url" 
                            placeholder="https://www.streak.com/a/pipelines/..."
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 font-mono text-sm"
                            required
                        />
                    </div>

                    <!-- NETWORK URL -->
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            NETWORK URL (Google Sheets)
                        </label>
                        <input 
                            type="url" 
                            id="network-url" 
                            placeholder="https://docs.google.com/spreadsheets/..."
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                        />
                    </div>

                    <!-- Network GID -->
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            Network Sheet GID
                        </label>
                        <input 
                            type="text" 
                            id="network-gid" 
                            placeholder="e.g., 608600451"
                            pattern="[0-9]*"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono"
                        />
                    </div>

                    <!-- PROMOTE URL -->
                    <div class="md:col-span-2">
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            PROMOTE URL
                        </label>
                        <input 
                            type="url" 
                            id="promote-url" 
                            placeholder="https://..."
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 font-mono text-sm"
                        />
                    </div>

                    <!-- Buttons -->
                    <div class="md:col-span-2 flex space-x-4">
                        <button 
                            type="submit"
                            class="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-lg"
                        >
                            <i class="fas fa-plus-circle mr-2"></i>
                            Add Company
                        </button>
                        <button 
                            type="reset"
                            class="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
                        >
                            <i class="fas fa-undo mr-2"></i>
                            Reset
                        </button>
                    </div>
                </form>

                <!-- Message Display -->
                <div id="form-message" class="hidden mt-6"></div>
            </div>

            <!-- Companies List -->
            <div class="bg-white rounded-lg shadow-lg p-8">
                <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <i class="fas fa-list text-blue-600 mr-3"></i>
                    All Companies
                </h2>
                
                <div id="companies-list" class="space-y-4">
                    <!-- Companies will be loaded here -->
                    <p class="text-gray-500 text-center py-8">Loading companies...</p>
                </div>
            </div>
        </div>

        <script>
            // Load companies on page load
            let companies = {};

            async function loadCompanies() {
                try {
                    const response = await fetch('/api/companies');
                    const data = await response.json();
                    companies = {};
                    
                    // Convert array to object
                    data.companies.forEach(company => {
                        companies[company.key] = company;
                    });

                    // Update stats
                    document.getElementById('total-companies').textContent = data.count;
                    
                    let configured = 0;
                    let needsSetup = 0;
                    
                    data.companies.forEach(company => {
                        if (company.url || (company.sources && (company.sources.promote || company.sources.network || company.sources.engage))) {
                            configured++;
                        } else {
                            needsSetup++;
                        }
                    });
                    
                    document.getElementById('configured-companies').textContent = configured;
                    document.getElementById('needs-setup-companies').textContent = needsSetup;

                    // Display companies
                    displayCompanies(data.companies);
                } catch (error) {
                    console.error('Error loading companies:', error);
                    showMessage('error', 'Failed to load companies: ' + error.message);
                }
            }

            function displayCompanies(companiesList) {
                const container = document.getElementById('companies-list');
                if (companiesList.length === 0) {
                    container.innerHTML = '<p class="text-gray-500 text-center py-8">No companies found</p>';
                    return;
                }

                container.innerHTML = companiesList.map(company => {
                    const sources = company.sources || {};
                    return \`
                    <div class="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all">
                        <div class="flex items-start justify-between mb-4">
                            <div class="flex-1">
                                <h3 class="text-lg font-bold text-gray-800 mb-3">
                                    <i class="fas fa-building text-blue-600 mr-2"></i>
                                    \${company.name}
                                </h3>
                                
                                <!-- Company Key -->
                                <div class="mb-3">
                                    <span class="text-gray-600 font-medium text-sm">Key:</span>
                                    <code class="ml-2 bg-gray-100 px-2 py-1 rounded text-xs font-mono">\${company.key}</code>
                                </div>
                                
                                <!-- Data Sources -->
                                <div class="space-y-2 mt-4">
                                    <h4 class="text-sm font-semibold text-gray-700 mb-2">Data Sources:</h4>
                                    
                                    <!-- PROMOTE -->
                                    <div class="flex items-start space-x-2 text-sm">
                                        <i class="fas fa-bullhorn text-yellow-600 mt-0.5"></i>
                                        <div class="flex-1">
                                            <span class="font-medium text-gray-700">PROMOTE:</span>
                                            \${sources.promote ? 
                                                \`<a href="\${sources.promote}" target="_blank" class="text-blue-600 hover:underline text-xs ml-2 break-all">\${sources.promote.substring(0, 50)}...</a>\` : 
                                                '<span class="text-gray-400 text-xs ml-2">Not configured</span>'
                                            }
                                        </div>
                                    </div>
                                    
                                    <!-- NETWORK -->
                                    <div class="flex items-start space-x-2 text-sm">
                                        <i class="fas fa-users text-blue-600 mt-0.5"></i>
                                        <div class="flex-1">
                                            <span class="font-medium text-gray-700">NETWORK:</span>
                                            \${sources.network ? 
                                                \`<a href="\${sources.network}" target="_blank" class="text-blue-600 hover:underline text-xs ml-2 break-all">\${sources.network.substring(0, 50)}...</a>\` : 
                                                '<span class="text-gray-400 text-xs ml-2">Not configured</span>'
                                            }
                                            \${company.networkSheetGid ? \`<span class="text-gray-500 text-xs ml-2">(GID: \${company.networkSheetGid})</span>\` : ''}
                                        </div>
                                    </div>
                                    
                                    <!-- ENGAGE -->
                                    <div class="flex items-start space-x-2 text-sm">
                                        <i class="fas fa-handshake text-green-600 mt-0.5"></i>
                                        <div class="flex-1">
                                            <span class="font-medium text-gray-700">ENGAGE:</span>
                                            \${sources.engage || company.url ? 
                                                \`<a href="\${sources.engage || company.url}" target="_blank" class="text-blue-600 hover:underline text-xs ml-2 break-all">\${(sources.engage || company.url).substring(0, 50)}...</a>\` : 
                                                '<span class="text-gray-400 text-xs ml-2">Not configured</span>'
                                            }
                                        </div>
                                    </div>
                                    
                                    <!-- Pipeline Key -->
                                    <div class="flex items-start space-x-2 text-sm">
                                        <i class="fas fa-key text-purple-600 mt-0.5"></i>
                                        <div class="flex-1">
                                            <span class="font-medium text-gray-700">Pipeline Key:</span>
                                            <code class="text-xs ml-2 bg-gray-100 px-2 py-1 rounded break-all">\${company.pipelineKey || 'Not set'}</code>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Action Buttons -->
                            <div class="ml-6 flex flex-col space-y-2">
                                <a href="/?company=\${company.key}" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all text-sm text-center whitespace-nowrap">
                                    <i class="fas fa-external-link-alt mr-1"></i>
                                    View Dashboard
                                </a>
                                <button onclick="deleteCompany('\${company.key}', '\${company.name}')" class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-sm whitespace-nowrap">
                                    <i class="fas fa-trash-alt mr-1"></i>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                \`;
                }).join('');
            }

            // Delete Company Function
            async function deleteCompany(companyKey, companyName) {
                if (!confirm(\`Are you sure you want to delete "\${companyName}"?\\n\\nThis action cannot be undone and will permanently remove the company from the database.\`)) {
                    return;
                }
                
                try {
                    const response = await fetch(\`/api/companies/\${companyKey}\`, {
                        method: 'DELETE'
                    });

                    const data = await response.json();

                    if (!response.ok) {
                        throw new Error(data.error || 'Failed to delete company');
                    }
                    
                    // Show success message
                    showMessage('success', \`Company "\${companyName}" has been permanently deleted from the database!\`);
                    
                    // Reload companies list from database
                    loadCompanies();
                } catch (error) {
                    console.error('Error deleting company:', error);
                    showMessage('error', error.message || 'Failed to delete company. Please try again.');
                }
            }

            // Handle form submission
            document.getElementById('add-company-form').addEventListener('submit', async (e) => {
                e.preventDefault();

                const name = document.getElementById('company-name').value.trim();
                const key = document.getElementById('company-key').value.trim();
                const pipelineKey = document.getElementById('pipeline-key').value.trim();
                const engageUrl = document.getElementById('engage-url').value.trim();
                const networkUrl = document.getElementById('network-url').value.trim();
                const networkGid = document.getElementById('network-gid').value.trim();
                const promoteUrl = document.getElementById('promote-url').value.trim();

                // Validate
                if (!/^[a-z0-9-]+$/.test(key)) {
                    showMessage('error', 'Company Key must contain only lowercase letters, numbers, and hyphens');
                    return;
                }

                // Save to database via API
                try {
                    const response = await fetch('/api/companies', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            key,
                            name,
                            pipeline_key: pipelineKey,
                            url: engageUrl,
                            promote_url: promoteUrl || null,
                            network_url: networkUrl || null,
                            network_sheet_gid: networkGid || null,
                            engage_url: engageUrl || null,
                            notion_url: null
                        })
                    });

                    const data = await response.json();

                    if (!response.ok) {
                        throw new Error(data.error || 'Failed to add company');
                    }

                    // Success
                    showMessage('success', \`Company "\${name}" added successfully and saved to database!\`);
                    
                    // Reload company list from database
                    loadCompanies();

                    // Reset form
                    e.target.reset();

                    // Scroll to message
                    document.getElementById('form-message').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                } catch (error) {
                    console.error('Error adding company:', error);
                    showMessage('error', error.message || 'Failed to add company. Please try again.');
                }
            });

            function showMessage(type, message) {
                const messageEl = document.getElementById('form-message');
                messageEl.classList.remove('hidden');
                
                if (type === 'success') {
                    messageEl.className = 'bg-green-50 border-l-4 border-green-500 p-4 mt-6';
                    messageEl.innerHTML = \`
                        <div class="flex items-center">
                            <i class="fas fa-check-circle text-green-600 text-xl mr-3"></i>
                            <div>
                                <p class="text-sm font-semibold text-green-800">Success!</p>
                                <p class="text-sm text-green-700 mt-1">\${message}</p>
                            </div>
                        </div>
                    \`;
                    setTimeout(() => messageEl.classList.add('hidden'), 5000);
                } else {
                    messageEl.className = 'bg-red-50 border-l-4 border-red-500 p-4 mt-6';
                    messageEl.innerHTML = \`
                        <div class="flex items-center">
                            <i class="fas fa-exclamation-circle text-red-600 text-xl mr-3"></i>
                            <div>
                                <p class="text-sm font-semibold text-red-800">Error</p>
                                <p class="text-sm text-red-700 mt-1">\${message}</p>
                            </div>
                        </div>
                    \`;
                }
            }

            // Load on page load
            loadCompanies();
        <\/script>
    </body>
    </html>
  `));A.get("/",e=>e.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Gershon CRM - Client Dashboard</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"><\/script>
        <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.2.0/dist/chartjs-plugin-datalabels.min.js"><\/script>
        <style>
            @media print {
                .no-print { display: none !important; }
                .page-break { page-break-before: always; }
                body { margin: 0; padding: 20px; }
                table { page-break-inside: avoid; }
                .print-header { margin-bottom: 30px; }
                @page { margin: 1cm; }
            }
            .print-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            .print-table th { background-color: #f3f4f6; padding: 12px 8px; text-align: left; font-weight: 600; border-bottom: 2px solid #e5e7eb; }
            .print-table td { padding: 10px 8px; border-bottom: 1px solid #e5e7eb; }
            .print-table tr:hover { background-color: #f9fafb; }
        </style>
    </head>
    <body class="bg-gray-50 min-h-screen">
        <div class="container mx-auto px-4 py-8">
            <!-- Header -->
            <div class="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg shadow-xl p-8 mb-8 text-white">
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <h1 class="text-4xl font-bold mb-3">
                            <i class="fas fa-chart-line mr-3"></i>
                            Gershon CRM - Client Dashboard
                            <span class="text-sm font-normal text-blue-200 ml-3">v1.0.0</span>
                        </h1>
                        <!-- Company Selector -->
                        <div class="flex items-center space-x-3">
                            <label for="company-selector" class="text-blue-100 text-sm font-medium">
                                <i class="fas fa-building mr-2"></i>Select Company:
                            </label>
                            <select id="company-selector" onchange="switchCompany(this.value)" class="bg-white text-gray-800 rounded-lg px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-md">
                                <option value="mabsilico">MabSilico</option>
                                <option value="finance-montreal">Finance Montreal (Steve)</option>
                                <option value="finance-montreal-noza">Finance Montreal (Noza)</option>
                                <option value="apm-music">APM Music</option>
                                <option value="ducrocq">Ducrocq</option>
                                <option value="milvue">Milvue</option>
                                <option value="seekyo">Seekyo Therapeutics</option>
                                <option value="altavia">Altavia</option>
                                <option value="valos">Valos</option>
                                <option value="dab-embedded">DAB-Embedded</option>
                            </select>
                            <button onclick="refreshDashboard()" class="bg-blue-500 hover:bg-blue-400 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors shadow-md">
                                <i class="fas fa-sync-alt mr-2"></i>Refresh
                            </button>
                            <a href="/admin" class="bg-purple-500 hover:bg-purple-400 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors shadow-md">
                                <i class="fas fa-shield-alt mr-2"></i>Admin Panel
                            </a>
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="text-blue-100 text-sm mb-2">
                            <i class="fas fa-sync-alt mr-2"></i>
                            Last Updated: <span id="last-updated" class="font-semibold">Loading...</span>
                        </p>
                        <p class="text-blue-200 text-xs">
                            <i class="fas fa-calendar-alt mr-1"></i>
                            Auto-refreshes every Monday at 8:00 AM
                        </p>
                    </div>
                </div>
                <div>
                    <p class="text-blue-100">Tracking 9 Company Pipelines with Streak CRM</p>
                </div>
            </div>

            <!-- Loading State -->
            <div id="loading" class="text-center py-12">
                <i class="fas fa-spinner fa-spin text-5xl text-blue-600 mb-4"></i>
                <p class="text-gray-600 text-lg">Loading pipeline data...</p>
            </div>

            <!-- Error State -->
            <div id="error" class="hidden bg-red-50 border border-red-200 rounded-lg p-6">
                <div class="flex items-center">
                    <i class="fas fa-exclamation-circle text-red-500 text-2xl mr-3"></i>
                    <div>
                        <h3 class="text-red-800 font-semibold">Error Loading Data</h3>
                        <p id="error-message" class="text-red-600"></p>
                    </div>
                </div>
            </div>

            <!-- Dashboard Content -->
            <div id="dashboard" class="hidden">
                <!-- View Tabs -->
                <div class="bg-white rounded-lg shadow mb-8">
                    <div class="border-b border-gray-200">
                        <nav class="flex -mb-px">
                            <button onclick="switchView('promote')" id="tab-promote" class="view-tab border-b-2 border-transparent py-4 px-6 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                                <i class="fas fa-bullhorn mr-2"></i>PROMOTE
                            </button>
                            <button onclick="switchView('network')" id="tab-network" class="view-tab border-b-2 border-transparent py-4 px-6 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                                <i class="fas fa-users mr-2"></i>NETWORK
                            </button>
                            <button onclick="switchView('engage')" id="tab-engage" class="view-tab active border-b-2 border-blue-500 py-4 px-6 text-sm font-medium text-blue-600">
                                <i class="fas fa-handshake mr-2"></i>ENGAGE
                            </button>
                            <button onclick="switchView('print')" id="tab-print" class="view-tab border-b-2 border-transparent py-4 px-6 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                                <i class="fas fa-print mr-2"></i>Print Report
                            </button>
                            <button onclick="switchView('settings')" id="tab-settings" class="view-tab border-b-2 border-transparent py-4 px-6 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                                <i class="fas fa-cog mr-2"></i>Settings
                            </button>
                            <button onclick="switchView('onboarding')" id="tab-onboarding" class="view-tab border-b-2 border-transparent py-4 px-6 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                                <i class="fas fa-rocket mr-2"></i>Onboarding
                            </button>
                        </nav>
                    </div>
                </div>

                <!-- PROMOTE View (Coming Soon) -->
                <div id="view-promote" class="view-content hidden">
                    <div class="bg-yellow-50 border-l-4 border-yellow-500 p-8 rounded-lg">
                        <div class="flex items-center mb-4">
                            <i class="fas fa-bullhorn text-yellow-600 text-4xl mr-4"></i>
                            <div>
                                <h2 class="text-2xl font-bold text-gray-800">PROMOTE Section</h2>
                                <p class="text-gray-600 mt-2">Marketing campaigns and promotional activities coming soon...</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- NETWORK View -->
                <div id="view-network" class="view-content hidden">
                    <div id="network-content">
                        <!-- Network content will be populated by JavaScript -->
                    </div>
                </div>

                <!-- ENGAGE View (formerly Overview) --><div id="view-engage" class="view-content">
                <!-- Campaign Performance Summary Cards -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <!-- Total Leads Card -->
                    <div class="bg-white rounded-lg shadow p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-500 text-sm font-medium">Total Leads</p>
                                <p id="total-boxes" class="text-3xl font-bold text-gray-800 mt-1">0</p>
                            </div>
                            <div class="bg-blue-100 rounded-full p-3">
                                <i class="fas fa-users text-blue-600 text-2xl"></i>
                            </div>
                        </div>
                    </div>

                    <!-- Campaign Duration Card -->
                    <div class="bg-white rounded-lg shadow p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-500 text-sm font-medium">Campaign Duration</p>
                                <p id="campaign-months" class="text-3xl font-bold text-indigo-600 mt-1">0</p>
                                <p class="text-xs text-gray-500 mt-1">months running</p>
                            </div>
                            <div class="bg-indigo-100 rounded-full p-3">
                                <i class="fas fa-calendar-alt text-indigo-600 text-2xl"></i>
                            </div>
                        </div>
                    </div>

                    <!-- Average Leads per Month Card -->
                    <div class="bg-white rounded-lg shadow p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-500 text-sm font-medium">Avg Leads/Month</p>
                                <p id="avg-leads" class="text-3xl font-bold text-green-600 mt-1">0.0</p>
                                <p class="text-xs text-gray-500 mt-1">new leads/month</p>
                            </div>
                            <div class="bg-green-100 rounded-full p-3">
                                <i class="fas fa-chart-line text-green-600 text-2xl"></i>
                            </div>
                        </div>
                    </div>

                    <!-- Objective Achievement Card -->
                    <div class="bg-white rounded-lg shadow p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-500 text-sm font-medium">Objective Achievement</p>
                                <p id="objective-percentage" class="text-3xl font-bold text-purple-600 mt-1">0%</p>
                                <p class="text-xs text-gray-500 mt-1">of 10 leads/month</p>
                            </div>
                            <div id="objective-icon" class="bg-purple-100 rounded-full p-3">
                                <i class="fas fa-bullseye text-purple-600 text-2xl"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Charts -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <div class="bg-white rounded-lg shadow p-6">
                        <h3 class="text-xl font-semibold text-gray-800 mb-4">
                            <i class="fas fa-chart-bar mr-2 text-blue-600"></i>
                            By Stage
                        </h3>
                        <canvas id="stageChart"></canvas>
                    </div>

                    <div class="bg-white rounded-lg shadow p-6">
                        <h3 class="text-xl font-semibold text-gray-800 mb-4">
                            <i class="fas fa-chart-bar mr-2 text-red-600"></i>
                            By FIT
                        </h3>
                        <canvas id="fitChart"></canvas>
                    </div>
                </div>

                <!-- Top Origins -->
                <div class="bg-white rounded-lg shadow p-6 mb-8">
                    <h3 class="text-xl font-semibold text-gray-800 mb-4">
                        <i class="fas fa-star mr-2 text-yellow-600"></i>
                        Top Origins
                    </h3>
                    <div id="origins-list" class="space-y-3"></div>
                </div>

                <!-- Recent Boxes -->
                <div class="bg-white rounded-lg shadow p-6">
                    <h3 class="text-xl font-semibold text-gray-800 mb-4">
                        <i class="fas fa-exclamation-circle mr-2 text-red-600"></i>
                        High FIT/INTEREST Opportunities
                    </h3>
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stage</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">FIT</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">INTEREST</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Updated</th>
                                </tr>
                            </thead>
                            <tbody id="recent-boxes" class="bg-white divide-y divide-gray-200"></tbody>
                        </table>
                    </div>
                </div>
                </div>
                <!-- End ENGAGE View -->

                <!-- Print Report View -->
                <div id="view-print" class="view-content hidden">
                    <div class="bg-white rounded-lg shadow p-8">
                        <div class="flex justify-between items-center mb-6 no-print">
                            <h2 class="text-2xl font-bold text-gray-800">
                                <i class="fas fa-file-alt mr-2 text-blue-600"></i>
                                Complete Pipeline Report
                            </h2>
                            <button onclick="window.print()" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow flex items-center">
                                <i class="fas fa-print mr-2"></i>
                                Print Report
                            </button>
                        </div>

                        <!-- Print Header -->
                        <div class="print-header mb-8 pb-4 border-b-2 border-gray-200">
                            <h1 id="print-company-name" class="text-3xl font-bold text-gray-900 mb-2">Company Pipeline Report</h1>
                            <p class="text-gray-600">Generated on <span id="print-date"></span></p>
                        </div>

                        <!-- Campaign Summary Section -->
                        <div class="mb-8">
                            <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                <i class="fas fa-chart-bar mr-2 text-blue-600"></i>
                                Campaign Performance Summary
                            </h3>
                            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                <div class="border border-gray-200 rounded-lg p-4">
                                    <p class="text-gray-600 text-sm font-medium">Total Leads</p>
                                    <p id="print-total-leads" class="text-2xl font-bold text-gray-900 mt-1">0</p>
                                </div>
                                <div class="border border-gray-200 rounded-lg p-4">
                                    <p class="text-gray-600 text-sm font-medium">Campaign Duration</p>
                                    <p id="print-duration" class="text-2xl font-bold text-indigo-600 mt-1">0 months</p>
                                </div>
                                <div class="border border-gray-200 rounded-lg p-4">
                                    <p class="text-gray-600 text-sm font-medium">Avg Leads/Month</p>
                                    <p id="print-avg-leads" class="text-2xl font-bold text-green-600 mt-1">0.0</p>
                                </div>
                                <div class="border border-gray-200 rounded-lg p-4">
                                    <p class="text-gray-600 text-sm font-medium">Objective Achievement</p>
                                    <p id="print-achievement" class="text-2xl font-bold text-purple-600 mt-1">0%</p>
                                </div>
                            </div>
                        </div>

                        <!-- Stage Distribution Section -->
                        <div class="mb-8">
                            <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                <i class="fas fa-layer-group mr-2 text-blue-600"></i>
                                Lead Distribution by Stage
                            </h3>
                            <div id="print-stage-table"></div>
                        </div>

                        <!-- FIT Distribution Section -->
                        <div class="mb-8">
                            <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                <i class="fas fa-check-circle mr-2 text-green-600"></i>
                                FIT Distribution
                            </h3>
                            <div id="print-fit-table"></div>
                        </div>

                        <!-- INTEREST Distribution Section -->
                        <div class="mb-8">
                            <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                <i class="fas fa-star mr-2 text-purple-600"></i>
                                INTEREST Distribution
                            </h3>
                            <div id="print-interest-table"></div>
                        </div>

                        <!-- Country Distribution Section -->
                        <div class="mb-8">
                            <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                <i class="fas fa-globe mr-2 text-blue-600"></i>
                                Geographic Distribution (Top 10)
                            </h3>
                            <div id="print-country-table"></div>
                        </div>

                        <!-- Monthly Performance Section -->
                        <div class="mb-8 page-break">
                            <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                <i class="fas fa-calendar-alt mr-2 text-indigo-600"></i>
                                Monthly Performance (Last 12 Months)
                            </h3>
                            <div id="print-monthly-table"></div>
                        </div>

                        <!-- High Value Opportunities Section -->
                        <div class="mb-8">
                            <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                <i class="fas fa-trophy mr-2 text-yellow-600"></i>
                                High Value Opportunities (Top 20)
                            </h3>
                            <div id="print-opportunities-table"></div>
                        </div>
                    </div>
                </div>

            </div>

            <!-- Settings View -->
            <div id="view-settings" class="view-content hidden">
                <div class="bg-white rounded-lg shadow p-8">
                    <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                        <i class="fas fa-cog text-blue-600 mr-3"></i>
                        <span id="settings-company-name">Company</span> Settings
                    </h2>
                    
                    <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                        <p class="text-sm text-blue-800">
                            <i class="fas fa-info-circle mr-2"></i>
                            <strong>Data Sources:</strong> Edit the source URLs for PROMOTE, NETWORK, and ENGAGE sections.
                        </p>
                    </div>

                    <form id="edit-sources-form" class="space-y-6" onsubmit="return false;">
                        <!-- PROMOTE Source -->
                        <div class="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <h3 class="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                                <i class="fas fa-bullhorn text-yellow-600 mr-2"></i>
                                PROMOTE Data Source
                            </h3>
                            <div class="space-y-2">
                                <label class="text-sm font-medium text-gray-700">Source URL:</label>
                                <input 
                                    type="url" 
                                    id="edit-promote-url" 
                                    placeholder="https://..."
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 font-mono text-sm"
                                />
                                <p class="text-xs text-gray-500 mt-2">
                                    <i class="fas fa-calendar-alt mr-1"></i>
                                    Marketing campaigns and promotional activities data source
                                </p>
                            </div>
                        </div>

                        <!-- NETWORK Source -->
                        <div class="p-6 bg-blue-50 border border-blue-200 rounded-lg">
                            <h3 class="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                                <i class="fas fa-users text-blue-600 mr-2"></i>
                                NETWORK Data Source
                            </h3>
                            <div class="space-y-3">
                                <div>
                                    <label class="text-sm font-medium text-gray-700">Google Sheets URL:</label>
                                    <input 
                                        type="url" 
                                        id="edit-network-url" 
                                        placeholder="https://docs.google.com/spreadsheets/d/..."
                                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                                    />
                                </div>
                                <div>
                                    <label class="text-sm font-medium text-gray-700">Sheet GID (optional):</label>
                                    <input 
                                        type="text" 
                                        id="edit-network-gid" 
                                        placeholder="e.g., 608600451"
                                        pattern="[0-9]*"
                                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                                    />
                                </div>
                                <p class="text-xs text-gray-500">
                                    <i class="fas fa-table mr-1"></i>
                                    LinkedIn networking data from Google Sheets
                                </p>
                            </div>
                        </div>

                        <!-- ENGAGE Source -->
                        <div class="p-6 bg-green-50 border border-green-200 rounded-lg">
                            <h3 class="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                                <i class="fas fa-handshake text-green-600 mr-2"></i>
                                ENGAGE Data Source
                            </h3>
                            <div class="space-y-2">
                                <label class="text-sm font-medium text-gray-700">Streak Pipeline URL:</label>
                                <input 
                                    type="url" 
                                    id="edit-engage-url" 
                                    placeholder="https://www.streak.com/a/pipelines/..."
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 font-mono text-sm"
                                />
                                <p class="text-xs text-gray-500 mt-2">
                                    <i class="fas fa-database mr-1"></i>
                                    Streak CRM pipeline data
                                </p>
                            </div>
                        </div>

                        <!-- Save Button -->
                        <div class="flex items-center space-x-4 pt-4">
                            <button 
                                type="button"
                                onclick="saveSourceURLs()"
                                class="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg flex items-center justify-center"
                            >
                                <i class="fas fa-save mr-2"></i>
                                Save Changes
                            </button>
                            <button 
                                type="button"
                                onclick="updateSettingsView()"
                                class="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all flex items-center"
                            >
                                <i class="fas fa-undo mr-2"></i>
                                Reset
                            </button>
                        </div>

                        <!-- Success/Error Messages -->
                        <div id="edit-sources-message" class="hidden mt-4"></div>
                    </form>

                    <!-- Add New Company Section -->
                    <div class="mt-10 pt-8 border-t-2 border-gray-200">
                        <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                            <i class="fas fa-plus-circle text-green-600 mr-3"></i>
                            Add New Company
                        </h2>
                        
                        <div class="bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-green-500 p-4 mb-6">
                            <p class="text-sm text-gray-800">
                                <i class="fas fa-info-circle mr-2"></i>
                                <strong>Quick Setup:</strong> Add a new company by providing its details below. The company will be immediately available in the dashboard.
                            </p>
                        </div>

                        <form id="add-company-form" class="space-y-6" onsubmit="return false;">
                            <!-- Company Name -->
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-building text-blue-600 mr-2"></i>
                                    Company Name *
                                </label>
                                <input 
                                    type="text" 
                                    id="new-company-name" 
                                    placeholder="e.g., Acme Corporation"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                                <p class="text-xs text-gray-500 mt-1">Display name for the company</p>
                            </div>

                            <!-- Company Key -->
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-key text-purple-600 mr-2"></i>
                                    Company Key *
                                </label>
                                <input 
                                    type="text" 
                                    id="new-company-key" 
                                    placeholder="e.g., acme-corp"
                                    pattern="[a-z0-9-]+"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono"
                                    required
                                />
                                <p class="text-xs text-gray-500 mt-1">Lowercase letters, numbers, and hyphens only (e.g., acme-corp)</p>
                            </div>

                            <!-- Streak Pipeline Key -->
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-database text-green-600 mr-2"></i>
                                    Streak Pipeline Key *
                                </label>
                                <textarea 
                                    id="new-pipeline-key" 
                                    rows="3"
                                    placeholder="e.g., agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F..."
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                                    required
                                ></textarea>
                                <p class="text-xs text-gray-500 mt-1">The unique pipeline identifier from Streak CRM</p>
                            </div>

                            <!-- ENGAGE URL (Streak Pipeline URL) -->
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-handshake text-green-600 mr-2"></i>
                                    ENGAGE URL (Streak Pipeline URL) *
                                </label>
                                <input 
                                    type="url" 
                                    id="new-engage-url" 
                                    placeholder="https://www.streak.com/a/pipelines/..."
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                                    required
                                />
                                <p class="text-xs text-gray-500 mt-1">Full Streak pipeline URL for CRM data</p>
                            </div>

                            <!-- NETWORK URL (Optional) -->
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-users text-blue-600 mr-2"></i>
                                    NETWORK URL (Google Sheets URL)
                                    <span class="text-gray-400 text-xs ml-2">(Optional)</span>
                                </label>
                                <input 
                                    type="url" 
                                    id="new-network-url" 
                                    placeholder="https://docs.google.com/spreadsheets/d/..."
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                                />
                                <p class="text-xs text-gray-500 mt-1">Google Sheets URL for LinkedIn networking data</p>
                            </div>

                            <!-- Network Sheet GID (Optional) -->
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-table text-blue-600 mr-2"></i>
                                    Network Sheet GID
                                    <span class="text-gray-400 text-xs ml-2">(Optional)</span>
                                </label>
                                <input 
                                    type="text" 
                                    id="new-network-gid" 
                                    placeholder="e.g., 608600451"
                                    pattern="[0-9]*"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono"
                                />
                                <p class="text-xs text-gray-500 mt-1">The gid parameter from your Google Sheets URL (numbers only)</p>
                            </div>

                            <!-- PROMOTE URL (Optional) -->
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-bullhorn text-yellow-600 mr-2"></i>
                                    PROMOTE URL
                                    <span class="text-gray-400 text-xs ml-2">(Optional)</span>
                                </label>
                                <input 
                                    type="url" 
                                    id="new-promote-url" 
                                    placeholder="https://..."
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                                />
                                <p class="text-xs text-gray-500 mt-1">URL for marketing campaigns and promotional activities</p>
                            </div>

                            <!-- Action Buttons -->
                            <div class="flex items-center space-x-4 pt-4">
                                <button 
                                    type="button"
                                    onclick="addNewCompany()"
                                    class="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-lg flex items-center justify-center"
                                >
                                    <i class="fas fa-plus-circle mr-2"></i>
                                    Add Company
                                </button>
                                <button 
                                    type="button"
                                    onclick="resetAddCompanyForm()"
                                    class="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all flex items-center"
                                >
                                    <i class="fas fa-undo mr-2"></i>
                                    Reset
                                </button>
                            </div>

                            <!-- Success/Error Messages -->
                            <div id="add-company-message" class="hidden mt-4"></div>
                        </form>
                    </div>

                    <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-6">
                        <p class="text-sm text-gray-700">
                            <i class="fas fa-shield-alt text-green-600 mr-2"></i>
                            <strong>Note:</strong> New companies are added to the current session only. For persistent storage, please configure in the application settings.
                        </p>
                    </div>
                </div>
            </div>

            <!-- Onboarding View -->
            <div id="view-onboarding" class="view-content hidden">
                <div class="bg-white rounded-lg shadow p-8">
                    <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                        <i class="fas fa-rocket text-green-600 mr-3"></i>
                        <span id="onboarding-company-name">Company</span> Onboarding Status
                    </h2>
                    
                    <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                        <p class="text-sm text-blue-800">
                            <i class="fas fa-info-circle mr-2"></i>
                            <strong>Onboarding Tracker:</strong> Monitor the onboarding progress and status from Notion.so
                        </p>
                    </div>

                    <!-- Notion Integration Status -->
                    <div class="mb-6 p-6 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg">
                        <h3 class="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                            <i class="fas fa-plug text-purple-600 mr-2"></i>
                            Notion Integration
                        </h3>
                        <div id="notion-status" class="space-y-3">
                            <div class="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                                <p class="text-sm text-yellow-800">
                                    <i class="fas fa-exclamation-triangle mr-2"></i>
                                    <strong>Configuration Needed:</strong> Notion.so URL not configured yet. Please provide the Notion.so link to fetch onboarding data.
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Onboarding Data Display -->
                    <div id="onboarding-data" class="hidden">
                        <!-- Onboarding Progress -->
                        <div class="mb-6">
                            <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                <i class="fas fa-tasks text-blue-600 mr-2"></i>
                                Onboarding Progress
                            </h3>
                            <div class="bg-gray-100 rounded-lg p-4">
                                <div class="flex items-center justify-between mb-2">
                                    <span class="text-sm font-medium text-gray-700">Overall Progress</span>
                                    <span id="progress-percentage" class="text-sm font-bold text-blue-600">0%</span>
                                </div>
                                <div class="w-full bg-gray-300 rounded-full h-4">
                                    <div id="progress-bar" class="bg-gradient-to-r from-blue-500 to-green-500 h-4 rounded-full transition-all duration-500" style="width: 0%"></div>
                                </div>
                            </div>
                        </div>

                        <!-- Onboarding Steps -->
                        <div class="mb-6">
                            <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                <i class="fas fa-list-check text-green-600 mr-2"></i>
                                Onboarding Steps
                            </h3>
                            <div id="onboarding-steps" class="space-y-3">
                                <!-- Steps will be dynamically loaded here -->
                            </div>
                        </div>

                        <!-- Next Actions -->
                        <div>
                            <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                <i class="fas fa-arrow-right text-orange-600 mr-2"></i>
                                Next Actions
                            </h3>
                            <div id="next-actions" class="space-y-3">
                                <!-- Next actions will be dynamically loaded here -->
                            </div>
                        </div>
                    </div>

                    <!-- Configuration Form -->
                    <div id="onboarding-config" class="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-lg">
                        <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                            <i class="fas fa-cog text-gray-600 mr-2"></i>
                            Configure Notion Integration
                        </h3>
                        <form id="notion-config-form" class="space-y-4" onsubmit="return false;">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    Notion.so Page URL
                                </label>
                                <input 
                                    type="url" 
                                    id="notion-url" 
                                    placeholder="https://www.notion.so/..."
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-mono text-sm"
                                />
                                <p class="text-xs text-gray-500 mt-1">Paste the Notion page URL that contains the onboarding data</p>
                            </div>
                            <button 
                                type="button"
                                onclick="saveNotionConfig()"
                                class="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg"
                            >
                                <i class="fas fa-save mr-2"></i>
                                Save & Fetch Data
                            </button>
                        </form>
                    </div>

                    <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-6">
                        <p class="text-sm text-gray-700">
                            <i class="fas fa-lightbulb text-yellow-500 mr-2"></i>
                            <strong>Note:</strong> This feature will fetch onboarding status data from your Notion.so page once configured. Make sure the page is publicly accessible or provide API credentials.
                        </p>
                    </div>
                </div>
            </div>

            <!-- Google Sheets Integration Section -->
            <div class="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg shadow-lg p-8 mt-8 border border-green-200">
                <div class="flex items-center mb-6">
                    <div class="bg-green-500 rounded-full p-3 mr-4">
                        <i class="fas fa-table text-white text-2xl"></i>
                    </div>
                    <div>
                        <h2 class="text-2xl font-bold text-gray-800">Google Sheets Integration</h2>
                        <p class="text-gray-600">Pull live data directly into your spreadsheets</p>
                    </div>
                </div>

                <div class="bg-white rounded-lg p-6 shadow mb-6">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <i class="fas fa-info-circle text-blue-500 mr-2"></i>
                        How to Use
                    </h3>
                    <p class="text-gray-700 mb-4">
                        Use the <code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">IMPORTDATA()</code> function in Google Sheets to import live data from your pipeline.
                        The data updates automatically when you refresh your sheet.
                    </p>
                    <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                        <p class="text-sm text-blue-800">
                            <strong>Tip:</strong> Copy the formulas below and paste them directly into your Google Sheets cells.
                        </p>
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <!-- General Metrics -->
                    <div class="bg-white rounded-lg p-6 shadow">
                        <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                            <i class="fas fa-chart-bar text-purple-500 mr-2"></i>
                            General Metrics
                        </h3>
                        <div class="space-y-3">
                            <div class="border-b pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">Total Boxes</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://client.gershoncrm.com/api/sheets/total")
                                </code>
                            </div>

                        </div>
                    </div>

                    <!-- By Stage -->
                    <div class="bg-white rounded-lg p-6 shadow">
                        <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                            <i class="fas fa-layer-group text-blue-500 mr-2"></i>
                            By Stage (Active Stages)
                        </h3>
                        <div class="space-y-3">
                            <div class="border-b pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">Closing</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://client.gershoncrm.com/api/sheets/stage/Closing/count")
                                </code>
                            </div>
                            <div class="border-b pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">Negotiating</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://client.gershoncrm.com/api/sheets/stage/Negotiating/count")
                                </code>
                            </div>
                            <div class="border-b pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">Nurtering</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://client.gershoncrm.com/api/sheets/stage/Nurtering/count")
                                </code>
                            </div>
                            <div class="pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">Proposal Sent</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://client.gershoncrm.com/api/sheets/stage/Proposal Sent/count")
                                </code>
                            </div>
                        </div>
                    </div>

                    <!-- By FIT -->
                    <div class="bg-white rounded-lg p-6 shadow">
                        <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                            <i class="fas fa-check-circle text-green-500 mr-2"></i>
                            By FIT
                        </h3>
                        <div class="space-y-3">
                            <div class="border-b pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">High FIT</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://client.gershoncrm.com/api/sheets/fit/high/count")
                                </code>
                            </div>
                            <div class="border-b pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">Medium FIT</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://client.gershoncrm.com/api/sheets/fit/medium/count")
                                </code>
                            </div>
                            <div class="pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">Low FIT</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://client.gershoncrm.com/api/sheets/fit/low/count")
                                </code>
                            </div>
                        </div>
                    </div>
                    
                    <!-- By INTEREST -->
                    <div class="bg-white rounded-lg p-6 shadow">
                        <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                            <i class="fas fa-star text-purple-500 mr-2"></i>
                            By INTEREST
                        </h3>
                        <div class="space-y-3">
                            <div class="border-b pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">High INTEREST</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://client.gershoncrm.com/api/sheets/interest/high/count")
                                </code>
                            </div>
                            <div class="border-b pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">Medium INTEREST</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://client.gershoncrm.com/api/sheets/interest/medium/count")
                                </code>
                            </div>
                            <div class="pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">Low INTEREST</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://client.gershoncrm.com/api/sheets/interest/low/count")
                                </code>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Company-Specific Tracking (Dynamic) -->
                    <div class="bg-white rounded-lg p-6 shadow col-span-1 lg:col-span-2">
                        <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                            <i class="fas fa-building text-indigo-500 mr-2"></i>
                            <span id="sheets-company-title">Company Lead Tracking (10 Leads/Month Objective)</span>
                        </h3>
                        
                        <div class="bg-indigo-50 border-l-4 border-indigo-500 p-4 mb-4 rounded">
                            <p class="text-sm text-indigo-800">
                                <strong>Current Company:</strong> <span id="sheets-company-name" class="font-semibold"></span>
                            </p>
                            <p class="text-sm text-indigo-700 mt-1">
                                These formulas are specific to the currently selected company. Switch companies to see different formulas.
                            </p>
                        </div>
                        
                        <h4 class="text-md font-semibold text-gray-800 mb-3">Total Leads Formula:</h4>
                        <div class="border-b pb-4 mb-4">
                            <p class="text-sm font-medium text-gray-700 mb-2">Get total number of leads for <span id="sheets-total-company"></span></p>
                            <code id="sheets-total-formula" class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                =IMPORTDATA("https://client.gershoncrm.com/api/sheets/mabsilico/total")
                            </code>
                        </div>
                        
                        <h4 class="text-md font-semibold text-gray-800 mb-3">Time-Based Tracking Formulas:</h4>
                        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                            <div class="border-b pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-2">📅 Campaign Duration</p>
                                <code id="sheets-duration-formula" class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://client.gershoncrm.com/api/sheets/mabsilico/duration/total")
                                </code>
                                <p class="text-xs text-gray-500 mt-1">Returns months</p>
                            </div>
                            <div class="border-b pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-2">🔥 Past Week</p>
                                <code id="sheets-week-formula" class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://client.gershoncrm.com/api/sheets/mabsilico/week/count")
                                </code>
                            </div>
                            <div class="border-b pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-2">January 2026</p>
                                <code id="sheets-jan-formula" class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://client.gershoncrm.com/api/sheets/mabsilico/month/2026-01/count")
                                </code>
                            </div>
                            <div class="pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-2">December 2025</p>
                                <code id="sheets-dec-formula" class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://client.gershoncrm.com/api/sheets/mabsilico/month/2025-12/count")
                                </code>
                            </div>
                        </div>
                        
                        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                            <h4 class="text-sm font-semibold text-blue-900 mb-2">📋 Formula Patterns:</h4>
                            <div class="space-y-2 text-xs text-blue-800">
                                <p>• <strong>Total Leads:</strong> <code class="bg-white px-2 py-1 rounded">/api/sheets/<span id="pattern-company-1">COMPANY</span>/total</code></p>
                                <p>• <strong>Campaign Duration:</strong> <code class="bg-white px-2 py-1 rounded">/api/sheets/<span id="pattern-company-4">COMPANY</span>/duration/total</code> (months)</p>
                                <p>• <strong>Weekly Leads:</strong> <code class="bg-white px-2 py-1 rounded">/api/sheets/<span id="pattern-company-2">COMPANY</span>/week/count</code></p>
                                <p>• <strong>Monthly Leads:</strong> <code class="bg-white px-2 py-1 rounded">/api/sheets/<span id="pattern-company-3">COMPANY</span>/month/YYYY-MM/count</code></p>
                                <p>• <strong>Achievement %:</strong> <code class="bg-white px-2 py-1 rounded">=IMPORTDATA(url)/10*100</code></p>
                            </div>
                        </div>
                        
                        <div class="mt-4 bg-green-50 border border-green-200 rounded-lg p-3">
                            <p class="text-xs text-green-800">
                                <strong>💡 Tip:</strong> Replace YYYY-MM with any month (e.g., 2026-02, 2025-11) to track different periods.
                            </p>
                        </div>
                    </div>
                </div>

                <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
                    <div class="flex items-start">
                        <i class="fas fa-lightbulb text-yellow-600 text-lg mt-1 mr-3"></i>
                        <div>
                            <h4 class="font-semibold text-yellow-900 mb-2">Advanced Tips</h4>
                            <ul class="text-sm text-yellow-800 space-y-1">
                                <li>• <strong>Company Tracking:</strong> Use /api/sheets/COMPANY_NAME/total for any company</li>
                                <li>• <strong>Monthly Tracking:</strong> Use /api/sheets/COMPANY_NAME/month/YYYY-MM/count</li>
                                <li>• <strong>Objective:</strong> Track progress toward 10 leads/month goal per company</li>
                                <li>• You can also query other stages (e.g., "Contacted", "Pitched", "Scheduled", "Lead") by replacing the stage name in the URL</li>
                                <li>• Use these formulas in your weekly reports for automatic data updates</li>
                                <li>• Combine with Google Sheets charts for custom visualizations</li>
                                <li>• Data refreshes automatically when you reopen or refresh your Google Sheet</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <script>
            // Register Chart.js datalabels plugin
            Chart.register(ChartDataLabels);
            
            let stageChart, fitChart;
            let currentData = null;
            let currentCompany = 'mabsilico'; // Default company
            let COMPANIES = {}; // Will be loaded from API

            // Load companies from API on page load
            async function loadCompanies() {
                try {
                    const response = await fetch('/api/companies');
                    const data = await response.json();
                    
                    // Transform API response into COMPANIES object format
                    COMPANIES = {};
                    data.companies.forEach(company => {
                        COMPANIES[company.key] = {
                            name: company.name,
                            pipelineKey: company.pipeline_key,
                            url: company.url,
                            networkSheetGid: company.network_sheet_gid,
                            notionUrl: company.notion_url,
                            sources: {
                                promote: company.promote_url || '',
                                network: company.network_url || '',
                                engage: company.engage_url || ''
                            }
                        };
                    });
                    
                    // Update company selector
                    updateCompanySelector();
                    
                    // Load default company data
                    if (COMPANIES[currentCompany]) {
                        fetchCompanyData(currentCompany);
                    }
                } catch (error) {
                    console.error('Error loading companies:', error);
                    alert('Failed to load companies. Please refresh the page.');
                }
            }

            // Update company selector dropdown with companies from API
            function updateCompanySelector() {
                const selector = document.getElementById('company-selector');
                if (!selector) return;
                
                selector.innerHTML = '';
                Object.keys(COMPANIES).forEach(key => {
                    const option = document.createElement('option');
                    option.value = key;
                    option.textContent = COMPANIES[key].name;
                    if (key === currentCompany) {
                        option.selected = true;
                    }
                    selector.appendChild(option);
                });
            }

            // Company configuration (fallback - will be replaced by API data)
            const COMPANIES_FALLBACK = {
                'mabsilico': {
                    name: 'MabSilico',
                    pipelineKey: 'agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgOqI26zZCAw',
                    sources: {
                        promote: '',
                        network: 'https://docs.google.com/spreadsheets/d/1NzUlKfHTW6v7i-S59GjtBFlzQwTX2AaeK4gQ4fVSAsw/edit?gid=910674612#gid=910674612',
                        engage: 'https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgOqI26zZCAw'
                    }
                },
                'finance-montreal': {
                    name: 'Finance Montreal (Steve)',
                    pipelineKey: 'agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgI7YkpykCQw'
                },
                'finance-montreal-noza': {
                    name: 'Finance Montreal (Noza)',
                    pipelineKey: 'agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgKWVvvDkCgw'
                },
                'apm-music': {
                    name: 'APM Music',
                    pipelineKey: 'agxzfm1haWxmb29nYWVyRAsSDE9yZ2FuaXphdGlvbiIdYWluYS5hbmRyaWFtYW5nYXNvbkBnbWFpbC5jb20MCxIIV29ya2Zsb3cYgIClnNb8gwsM'
                },
                'ducrocq': {
                    name: 'Ducrocq',
                    pipelineKey: 'agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgNaSl4OGCww'
                },
                'milvue': {
                    name: 'Milvue',
                    pipelineKey: 'agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEhhXb3JrZmxvdxiAgMX-7baZCgw'
                },
                'seekyo': {
                    name: 'Seekyo Therapeutics',
                    pipelineKey: 'agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgLnYo_uUCww'
                },
                'altavia': {
                    name: 'Altavia',
                    pipelineKey: 'agxzfm1haWxmb29nYWVyRAsSDE9yZ2FuaXphdGlvbiIdYWluYS5hbmRyaWFtYW5nYXNvbkBnbWFpbC5jb20MCxIIV29ya2Zsb3cYgICFz_elmwgM'
                },
                'valos': {
                    name: 'Valos',
                    pipelineKey: 'agxzfm1haWxmb29nYWVyRAsSDE9yZ2FuaXphdGlvbiIdYWluYS5hbmRyaWFtYW5nYXNvbkBnbWFpbC5jb20MCxIIV29ya2Zsb3cYgICF5ei7lgkM'
                },
                'dab-embedded': {
                    name: 'DAB-Embedded',
                    pipelineKey: 'agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgKWyqIboCww'
                }
            };

            // Switch to a different company
            function switchCompany(companyKey) {
                currentCompany = companyKey;
                console.log('Switching to company:', COMPANIES[companyKey].name);
                
                // Show loading state
                document.getElementById('dashboard').classList.add('hidden');
                document.getElementById('loading').classList.remove('hidden');
                document.getElementById('error').classList.add('hidden');
                
                // Update Google Sheets formulas for this company
                updateSheetsFormulas();
                
                // Update Settings view
                updateSettingsView();
                
                // Fetch new company data
                fetchCompanyData(companyKey);
            }

            // Refresh current dashboard
            function refreshDashboard() {
                switchCompany(currentCompany);
            }

            // Fetch data for a specific company
            async function fetchCompanyData(companyKey) {
                try {
                    const company = await getCompany(undefined, companyKey);
                    const response = await fetch(\`/api/analytics?company=\${companyKey}\`);
                    
                    if (!response.ok) {
                        throw new Error('Failed to fetch company data');
                    }
                    
                    const data = await response.json();
                    currentData = data;
                    
                    // Update page title with company name
                    document.querySelector('h1').innerHTML = \`
                        <i class="fas fa-chart-line mr-3"></i>
                        \${company.name} - Pipeline Report
                    \`;
                    
                    // Hide loading, show dashboard
                    document.getElementById('loading').classList.add('hidden');
                    document.getElementById('dashboard').classList.remove('hidden');
                    updateTimestamp();
                    
                    // Update summary cards and charts
                    updateDashboard(data);
                    
                } catch (error) {
                    console.error('Error fetching company data:', error);
                    document.getElementById('loading').classList.add('hidden');
                    document.getElementById('error').classList.remove('hidden');
                    document.getElementById('error-message').textContent = error.message;
                }
            }

            // View switching function
            function switchView(viewName) {
                // Hide all views
                document.querySelectorAll('.view-content').forEach(view => {
                    view.classList.add('hidden');
                });
                
                // Remove active class from all tabs
                document.querySelectorAll('.view-tab').forEach(tab => {
                    tab.classList.remove('active', 'border-blue-500', 'text-blue-600');
                    tab.classList.add('border-transparent', 'text-gray-500');
                });
                
                // Show selected view
                document.getElementById('view-' + viewName).classList.remove('hidden');
                
                // Add active class to selected tab
                const activeTab = document.getElementById('tab-' + viewName);
                activeTab.classList.add('active', 'border-blue-500', 'text-blue-600');
                activeTab.classList.remove('border-transparent', 'text-gray-500');
                
                // Render view-specific content
                if (currentData) {
                    if (viewName === 'print') {
                        renderPrintView(currentData);
                    } else if (viewName === 'network' || viewName === 'stage' || viewName === 'fit' || viewName === 'interest') {
                        renderView(viewName, currentData);
                    } else if (viewName === 'onboarding') {
                        updateOnboardingView();
                    }
                }
            }

            // Update Onboarding View
            function updateOnboardingView() {
                const company = COMPANIES[currentCompany];
                document.getElementById('onboarding-company-name').textContent = company.name;
                
                // Check if Notion URL is configured
                const notionUrl = company.notionUrl || '';
                
                if (!notionUrl) {
                    // Show configuration needed message
                    document.getElementById('onboarding-data').classList.add('hidden');
                    document.getElementById('notion-url').value = '';
                } else {
                    // URL is configured, show placeholder data
                    document.getElementById('notion-url').value = notionUrl;
                    // In a real implementation, you would fetch data from Notion API here
                    displayPlaceholderOnboardingData();
                }
            }

            // Save Notion Configuration
            async function saveNotionConfig() {
                const notionUrl = document.getElementById('notion-url').value.trim();
                
                if (!notionUrl) {
                    alert('Please enter a Notion.so URL');
                    return;
                }
                
                if (!notionUrl.includes('notion.so')) {
                    alert('Please enter a valid Notion.so URL');
                    return;
                }
                
                // Save to database via API
                try {
                    const company = COMPANIES[currentCompany];
                    const response = await fetch(\`/api/companies/\${currentCompany}\`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            name: company.name,
                            pipeline_key: company.pipelineKey,
                            url: company.url,
                            promote_url: company.sources?.promote || null,
                            network_url: company.sources?.network || null,
                            network_sheet_gid: company.networkSheetGid || null,
                            engage_url: company.sources?.engage || null,
                            notion_url: notionUrl
                        })
                    });

                    if (!response.ok) {
                        throw new Error('Failed to save Notion URL');
                    }

                    // Update local object
                    company.notionUrl = notionUrl;
                    
                    // Show success message
                    const statusDiv = document.getElementById('notion-status');
                    statusDiv.innerHTML = \`
                        <div class="bg-green-50 border-l-4 border-green-500 p-4">
                            <p class="text-sm text-green-800">
                                <i class="fas fa-check-circle mr-2"></i>
                                <strong>Configuration Saved!</strong> Notion URL has been saved to database. Fetching data...
                            </p>
                        </div>
                    \`;
                    
                    // In a real implementation, you would fetch data from Notion API here
                    setTimeout(() => {
                        displayPlaceholderOnboardingData();
                    }, 1000);
                } catch (error) {
                    console.error('Error saving Notion URL:', error);
                    alert('Failed to save Notion URL. Please try again.');
                }
            }

            // Display Placeholder Onboarding Data
            function displayPlaceholderOnboardingData() {
                // Show onboarding data section
                document.getElementById('onboarding-data').classList.remove('hidden');
                
                // Update progress
                document.getElementById('progress-percentage').textContent = '60%';
                document.getElementById('progress-bar').style.width = '60%';
                
                // Display steps
                const stepsHtml = \`
                    <div class="flex items-start space-x-3 p-4 bg-green-50 border-l-4 border-green-500 rounded">
                        <i class="fas fa-check-circle text-green-600 text-xl mt-1"></i>
                        <div class="flex-1">
                            <p class="font-semibold text-gray-800">Initial Setup Completed</p>
                            <p class="text-sm text-gray-600 mt-1">Company profile created and basic information configured</p>
                        </div>
                    </div>
                    <div class="flex items-start space-x-3 p-4 bg-green-50 border-l-4 border-green-500 rounded">
                        <i class="fas fa-check-circle text-green-600 text-xl mt-1"></i>
                        <div class="flex-1">
                            <p class="font-semibold text-gray-800">Streak Pipeline Connected</p>
                            <p class="text-sm text-gray-600 mt-1">CRM pipeline integrated and data flowing</p>
                        </div>
                    </div>
                    <div class="flex items-start space-x-3 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                        <i class="fas fa-spinner fa-spin text-blue-600 text-xl mt-1"></i>
                        <div class="flex-1">
                            <p class="font-semibold text-gray-800">Team Training In Progress</p>
                            <p class="text-sm text-gray-600 mt-1">Onboarding team members and setting up permissions</p>
                        </div>
                    </div>
                    <div class="flex items-start space-x-3 p-4 bg-gray-50 border-l-4 border-gray-300 rounded">
                        <i class="fas fa-circle text-gray-400 text-xl mt-1"></i>
                        <div class="flex-1">
                            <p class="font-semibold text-gray-800">Go-Live Preparation</p>
                            <p class="text-sm text-gray-600 mt-1">Final checks and deployment planning</p>
                        </div>
                    </div>
                \`;
                document.getElementById('onboarding-steps').innerHTML = stepsHtml;
                
                // Display next actions
                const actionsHtml = \`
                    <div class="p-4 bg-orange-50 border-l-4 border-orange-500 rounded">
                        <p class="font-semibold text-gray-800 mb-2">Complete Team Training</p>
                        <p class="text-sm text-gray-600 mb-3">Schedule training sessions for remaining team members</p>
                        <button class="text-sm bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-all">
                            <i class="fas fa-calendar mr-2"></i>Schedule Training
                        </button>
                    </div>
                    <div class="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                        <p class="font-semibold text-gray-800 mb-2">Review Data Quality</p>
                        <p class="text-sm text-gray-600 mb-3">Verify pipeline data accuracy and completeness</p>
                        <button class="text-sm bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all">
                            <i class="fas fa-check mr-2"></i>Review Data
                        </button>
                    </div>
                \`;
                document.getElementById('next-actions').innerHTML = actionsHtml;
                
                // Update status
                document.getElementById('notion-status').innerHTML = \`
                    <div class="bg-green-50 border-l-4 border-green-500 p-4">
                        <p class="text-sm text-green-800">
                            <i class="fas fa-check-circle mr-2"></i>
                            <strong>Connected:</strong> Onboarding data synced from Notion.so
                        </p>
                    </div>
                \`;
            }

            // Update last updated timestamp
            function updateTimestamp() {
                const now = new Date();
                const options = { 
                    weekday: 'short', 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric', 
                    hour: '2-digit', 
                    minute: '2-digit',
                    hour12: true
                };
                document.getElementById('last-updated').textContent = now.toLocaleDateString('en-US', options);
            }

            // Check if it's Monday 8AM and schedule auto-refresh
            function setupAutoRefresh() {
                const checkAndRefresh = () => {
                    const now = new Date();
                    const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday
                    const hour = now.getHours();
                    const minute = now.getMinutes();
                    
                    // If it's Monday (1) at 8:00 AM
                    if (dayOfWeek === 1 && hour === 8 && minute === 0) {
                        console.log('Auto-refreshing dashboard - Monday 8:00 AM');
                        loadDashboard();
                    }
                };
                
                // Check every minute
                setInterval(checkAndRefresh, 60000);
                
                // Also calculate time until next Monday 8AM for console info
                const now = new Date();
                const nextMonday = new Date();
                const daysUntilMonday = (8 - now.getDay()) % 7 || 7; // Days until next Monday
                nextMonday.setDate(now.getDate() + daysUntilMonday);
                nextMonday.setHours(8, 0, 0, 0);
                
                const timeUntilRefresh = nextMonday - now;
                const hoursUntil = Math.floor(timeUntilRefresh / (1000 * 60 * 60));
                console.log(\`Next auto-refresh scheduled for: \${nextMonday.toLocaleString()} (in \${hoursUntil} hours)\`);
            }

            // Render print view with all data
            function renderPrintView(data) {
                // Set company name and date
                const companyName = COMPANIES[currentCompany]?.name || 'Company';
                document.getElementById('print-company-name').textContent = companyName + ' - Pipeline Report';
                document.getElementById('print-date').textContent = new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
                });
                
                // Campaign summary
                document.getElementById('print-total-leads').textContent = data.totalBoxes || '0';
                document.getElementById('print-duration').textContent = (data.campaignDurationMonths || 0) + ' months';
                document.getElementById('print-avg-leads').textContent = data.averageLeadsPerMonth || '0.0';
                document.getElementById('print-achievement').textContent = (data.averagePercentage || 0) + '%';
                
                // Stage distribution table
                let stageHTML = '<table class="print-table"><thead><tr><th>Stage</th><th>Count</th><th>Percentage</th></tr></thead><tbody>';
                const totalBoxes = data.totalBoxes || 1;
                Object.keys(data.stageDistribution || {}).sort((a, b) => (data.stageDistribution[b] || 0) - (data.stageDistribution[a] || 0)).forEach(stage => {
                    const count = data.stageDistribution[stage] || 0;
                    const pct = ((count / totalBoxes) * 100).toFixed(1);
                    stageHTML += '<tr><td>' + stage + '</td><td>' + count + '</td><td>' + pct + '%</td></tr>';
                });
                stageHTML += '</tbody></table>';
                document.getElementById('print-stage-table').innerHTML = stageHTML;
                
                // FIT distribution table
                let fitHTML = '<table class="print-table"><thead><tr><th>FIT Level</th><th>Count</th><th>Percentage</th></tr></thead><tbody>';
                ['High', 'Medium', 'Low', 'Not Set'].forEach(level => {
                    const count = data.fitDistribution[level] || 0;
                    const pct = data.fitPercentages[level] || 0;
                    fitHTML += '<tr><td>' + level + '</td><td>' + count + '</td><td>' + pct + '%</td></tr>';
                });
                fitHTML += '</tbody></table>';
                document.getElementById('print-fit-table').innerHTML = fitHTML;
                
                // INTEREST distribution table
                let interestHTML = '<table class="print-table"><thead><tr><th>INTEREST Level</th><th>Count</th><th>Percentage</th></tr></thead><tbody>';
                ['High', 'Medium', 'Low', 'Not Set'].forEach(level => {
                    const count = data.interestDistribution[level] || 0;
                    const pct = data.interestPercentages[level] || 0;
                    interestHTML += '<tr><td>' + level + '</td><td>' + count + '</td><td>' + pct + '%</td></tr>';
                });
                interestHTML += '</tbody></table>';
                document.getElementById('print-interest-table').innerHTML = interestHTML;
                
                // Country distribution table (top 10)
                let countryHTML = '<table class="print-table"><thead><tr><th>Country</th><th>Count</th><th>Percentage</th></tr></thead><tbody>';
                const countries = Object.keys(data.countryDistribution || {})
                    .sort((a, b) => (data.countryDistribution[b] || 0) - (data.countryDistribution[a] || 0))
                    .slice(0, 10);
                countries.forEach(country => {
                    const count = data.countryDistribution[country] || 0;
                    const pct = ((count / totalBoxes) * 100).toFixed(1);
                    countryHTML += '<tr><td>' + country + '</td><td>' + count + '</td><td>' + pct + '%</td></tr>';
                });
                countryHTML += '</tbody></table>';
                document.getElementById('print-country-table').innerHTML = countryHTML;
                
                // Monthly performance table
                let monthlyHTML = '<table class="print-table"><thead><tr><th>Month</th><th>Leads</th><th>Objective</th><th>Achievement</th><th>Status</th></tr></thead><tbody>';
                (data.monthlyLeads || []).forEach(month => {
                    const status = month.count >= 10 ? '✓ Achieved' : '○ Pending';
                    monthlyHTML += '<tr><td>' + month.monthName + '</td><td>' + month.count + '</td><td>10</td><td>' + month.percentage + '%</td><td>' + status + '</td></tr>';
                });
                monthlyHTML += '</tbody></table>';
                document.getElementById('print-monthly-table').innerHTML = monthlyHTML;
                
                // High value opportunities table (top 20)
                let oppHTML = '<table class="print-table"><thead><tr><th>Name</th><th>Stage</th><th>FIT</th><th>INTEREST</th><th>Country</th></tr></thead><tbody>';
                (data.recentBoxes || []).slice(0, 20).forEach(box => {
                    oppHTML += '<tr><td>' + box.name + '</td><td>' + box.stage + '</td><td>' + (box.fit || 'N/A') + '</td><td>' + (box.interest || 'N/A') + '</td><td>' + (box.country || 'N/A') + '</td></tr>';
                });
                oppHTML += '</tbody></table>';
                document.getElementById('print-opportunities-table').innerHTML = oppHTML;
            }
            
            // Render view-specific content
            function renderView(viewName, data) {
                const contentId = viewName + '-content';
                const contentDiv = document.getElementById(contentId);
                
                if (viewName === 'stage') {
                    contentDiv.innerHTML = renderStageView(data);
                } else if (viewName === 'fit') {
                    contentDiv.innerHTML = renderFitView(data);
                } else if (viewName === 'interest') {
                    contentDiv.innerHTML = renderInterestView(data);
                } else if (viewName === 'network') {
                    contentDiv.innerHTML = renderNetworkView(data);
                }
            }

            function renderStageView(data) {
                const stages = Object.entries(data.stageDistribution).sort((a, b) => b[1] - a[1]);
                return \`
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        \${stages.map(([stage, count]) => {
                            const percentage = ((count / data.totalBoxes) * 100).toFixed(1);
                            return \`
                                <div class="bg-white rounded-lg shadow p-6">
                                    <h3 class="text-lg font-semibold text-gray-800 mb-2">\${stage}</h3>
                                    <div class="flex items-end justify-between">
                                        <div>
                                            <p class="text-3xl font-bold text-blue-600">\${count}</p>
                                            <p class="text-sm text-gray-500">opportunities</p>
                                        </div>
                                        <div class="text-right">
                                            <p class="text-2xl font-semibold text-gray-700">\${percentage}%</p>
                                            <p class="text-xs text-gray-500">of total</p>
                                        </div>
                                    </div>
                                </div>
                            \`;
                        }).join('')}
                    </div>
                \`;
            }

            function renderFitView(data) {
                const fitLevels = [
                    { name: 'High', key: 'High', color: 'green', icon: 'fa-check-circle' },
                    { name: 'Medium', key: 'Medium', color: 'yellow', icon: 'fa-adjust' },
                    { name: 'Low', key: 'Low', color: 'red', icon: 'fa-times-circle' }
                ];
                return \`
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        \${fitLevels.map(fit => {
                            const count = data.fitDistribution[fit.key] || 0;
                            const percentage = ((count / data.totalBoxes) * 100).toFixed(1);
                            return \`
                                <div class="bg-white rounded-lg shadow p-8 text-center">
                                    <div class="inline-flex items-center justify-center w-16 h-16 bg-\${fit.color}-100 rounded-full mb-4">
                                        <i class="fas \${fit.icon} text-\${fit.color}-600 text-2xl"></i>
                                    </div>
                                    <h3 class="text-xl font-semibold text-gray-800 mb-2">\${fit.name} FIT</h3>
                                    <p class="text-5xl font-bold text-\${fit.color}-600 mb-2">\${count}</p>
                                    <p class="text-sm text-gray-500">\${percentage}% of total</p>
                                </div>
                            \`;
                        }).join('')}
                    </div>
                \`;
            }

            function renderInterestView(data) {
                const interestLevels = [
                    { name: 'High', key: 'High', color: 'purple', icon: 'fa-star' },
                    { name: 'Medium', key: 'Medium', color: 'blue', icon: 'fa-star-half-alt' },
                    { name: 'Low', key: 'Low', color: 'gray', icon: 'fa-star-o' }
                ];
                return \`
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        \${interestLevels.map(interest => {
                            const count = data.interestDistribution[interest.key] || 0;
                            const percentage = ((count / data.totalBoxes) * 100).toFixed(1);
                            return \`
                                <div class="bg-white rounded-lg shadow p-8 text-center">
                                    <div class="inline-flex items-center justify-center w-16 h-16 bg-\${interest.color}-100 rounded-full mb-4">
                                        <i class="fas \${interest.icon} text-\${interest.color}-600 text-2xl"></i>
                                    </div>
                                    <h3 class="text-xl font-semibold text-gray-800 mb-2">\${interest.name} INTEREST</h3>
                                    <p class="text-5xl font-bold text-\${interest.color}-600 mb-2">\${count}</p>
                                    <p class="text-sm text-gray-500">\${percentage}% of total</p>
                                </div>
                            \`;
                        }).join('')}
                    </div>
                \`;
            }

            function renderNetworkView(data) {
                const network = data.networkData;
                
                if (!network || !network.allData || network.allData.length === 0) {
                    return \`
                        <div class="bg-blue-50 border-l-4 border-blue-500 p-8 rounded-lg">
                            <div class="flex items-center">
                                <i class="fas fa-info-circle text-blue-600 text-4xl mr-4"></i>
                                <div>
                                    <h2 class="text-2xl font-bold text-gray-800">Network Data Not Available</h2>
                                    <p class="text-gray-600 mt-2">LinkedIn networking data will appear here once available.</p>
                                </div>
                            </div>
                        </div>
                    \`;
                }
                
                return \`
                    <!-- Network Performance Summary Cards -->
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <!-- Average Acceptance Rate Card (Most Important) -->
                        <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
                            <div class="flex items-center justify-between mb-2">
                                <div>
                                    <p class="text-green-100 text-sm font-medium mb-1">AVERAGE ACCEPTANCE RATE</p>
                                    <p class="text-5xl font-bold">\${network.avgAcceptanceRate}%</p>
                                    <p class="text-sm text-green-100 mt-2">LinkedIn connections</p>
                                </div>
                                <div class="bg-white bg-opacity-20 rounded-full p-4">
                                    <i class="fas fa-user-check text-4xl"></i>
                                </div>
                            </div>
                        </div>

                        <!-- Objective Achievement Card -->
                        <div class="bg-white rounded-lg shadow p-6">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-gray-500 text-sm font-medium">Objective Achievement</p>
                                    <p class="text-3xl font-bold text-purple-600 mt-1">\${network.objectiveAchievement}%</p>
                                    <p class="text-xs text-gray-500 mt-1">of \${network.networkObjective}% target</p>
                                </div>
                                <div class="bg-purple-100 rounded-full p-3">
                                    <i class="fas fa-bullseye text-purple-600 text-2xl"></i>
                                </div>
                            </div>
                        </div>

                        <!-- Total Invitations Card -->
                        <div class="bg-white rounded-lg shadow p-6">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-gray-500 text-sm font-medium">Total Invitations</p>
                                    <p class="text-3xl font-bold text-blue-600 mt-1">\${network.totalInvitations}</p>
                                    <p class="text-xs text-gray-500 mt-1">sent</p>
                                </div>
                                <div class="bg-blue-100 rounded-full p-3">
                                    <i class="fas fa-paper-plane text-blue-600 text-2xl"></i>
                                </div>
                            </div>
                        </div>

                        <!-- Total Accepted Card -->
                        <div class="bg-white rounded-lg shadow p-6">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-gray-500 text-sm font-medium">Accepted</p>
                                    <p class="text-3xl font-bold text-green-600 mt-1">\${network.totalAccepted}</p>
                                    <p class="text-xs text-gray-500 mt-1">connections</p>
                                </div>
                                <div class="bg-green-100 rounded-full p-3">
                                    <i class="fas fa-user-plus text-green-600 text-2xl"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Weekly Comparison -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <!-- This Week Card -->
                        <div class="bg-white rounded-lg shadow p-6">
                            <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                <i class="fas fa-calendar-day text-blue-600 mr-2"></i>
                                This Week
                            </h3>
                            <div class="space-y-3">
                                <div class="flex justify-between items-center">
                                    <span class="text-gray-600">Invitations Sent:</span>
                                    <span class="text-2xl font-bold text-blue-600">\${network.thisWeek.invitations}</span>
                                </div>
                                <div class="flex justify-between items-center">
                                    <span class="text-gray-600">Acceptance Rate:</span>
                                    <span class="text-2xl font-bold text-green-600">\${network.thisWeek.acceptance}%</span>
                                </div>
                            </div>
                        </div>

                        <!-- Last Week Card -->
                        <div class="bg-white rounded-lg shadow p-6">
                            <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                <i class="fas fa-calendar-week text-indigo-600 mr-2"></i>
                                Last Week
                            </h3>
                            <div class="space-y-3">
                                <div class="flex justify-between items-center">
                                    <span class="text-gray-600">Invitations Sent:</span>
                                    <span class="text-2xl font-bold text-blue-600">\${network.lastWeek.invitations}</span>
                                </div>
                                <div class="flex justify-between items-center">
                                    <span class="text-gray-600">Acceptance Rate:</span>
                                    <span class="text-2xl font-bold text-green-600">\${network.lastWeek.acceptance}%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Recent Weeks Performance -->
                    <div class="bg-white rounded-lg shadow p-6 mb-8">
                        <h3 class="text-xl font-semibold text-gray-800 mb-4">
                            <i class="fas fa-chart-line mr-2 text-purple-600"></i>
                            Recent Weeks Performance
                        </h3>
                        <div class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Week</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Period</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invitations</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Messages</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acceptance Rate</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Opportunities</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                    \${network.recentWeeks.map(week => {
                                        // Color based on 20% objective: green >= 20%, yellow >= 15%, red < 15%
                                        const rateColor = week.acceptance >= 20 ? 'text-green-600' : week.acceptance >= 15 ? 'text-yellow-600' : 'text-red-600';
                                        return \`
                                            <tr>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">W\${week.week}</td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">\${week.from} - \${week.to}</td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">\${week.invitations}</td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">\${week.messages}</td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold \${rateColor}">\${week.acceptance}%</td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">\${week.opportunities}</td>
                                            </tr>
                                        \`;
                                    }).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                \`;
            }




            async function loadDashboard() {
                // Use the new fetchCompanyData function instead
                fetchCompanyData(currentCompany);
            }
            
            // Update dashboard with new data
            function updateDashboard(data) {
                currentData = data;
                
                // Update campaign performance summary cards
                document.getElementById('total-boxes').textContent = data.totalBoxes;
                document.getElementById('campaign-months').textContent = data.campaignDurationMonths || 0;
                document.getElementById('avg-leads').textContent = data.averageLeadsPerMonth || '0.0';
                
                const objectivePercentage = data.averagePercentage || 0;
                document.getElementById('objective-percentage').textContent = objectivePercentage + '%';
                
                // Update objective icon color based on achievement
                const objectiveIcon = document.getElementById('objective-icon');
                const objectiveText = document.getElementById('objective-percentage');
                if (objectivePercentage >= 100) {
                    objectiveIcon.className = 'bg-green-100 rounded-full p-3';
                    objectiveIcon.innerHTML = '<i class="fas fa-check-circle text-green-600 text-2xl"></i>';
                    objectiveText.className = 'text-3xl font-bold text-green-600 mt-1';
                } else if (objectivePercentage >= 75) {
                    objectiveIcon.className = 'bg-yellow-100 rounded-full p-3';
                    objectiveIcon.innerHTML = '<i class="fas fa-exclamation-triangle text-yellow-600 text-2xl"></i>';
                    objectiveText.className = 'text-3xl font-bold text-yellow-600 mt-1';
                } else {
                    objectiveIcon.className = 'bg-red-100 rounded-full p-3';
                    objectiveIcon.innerHTML = '<i class="fas fa-times-circle text-red-600 text-2xl"></i>';
                    objectiveText.className = 'text-3xl font-bold text-red-600 mt-1';
                }

                    // Create stage distribution chart - ALL stages sorted by count
                    const stageEntries = Object.entries(data.stageDistribution || {}).sort((a, b) => b[1] - a[1]);
                    const stageLabels = stageEntries.map(e => e[0]);
                    const stageValues = stageEntries.map(e => e[1]);
                    
                    // Generate colors for all stages
                    const baseColors = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#EC4899', '#14B8A6'];
                    const stageColors = stageLabels.map((_, i) => baseColors[i % baseColors.length]);
                    
                    const stageCtx = document.getElementById('stageChart').getContext('2d');
                    if (stageChart) stageChart.destroy();
                    stageChart = new Chart(stageCtx, {
                        type: 'bar',
                        data: {
                            labels: stageLabels,
                            datasets: [{
                                label: 'Opportunities',
                                data: stageValues,
                                backgroundColor: stageColors.slice(0, stageLabels.length),
                                borderWidth: 2,
                                borderColor: '#ffffff',
                                borderRadius: 8
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: true,
                            plugins: {
                                legend: { display: false },
                                tooltip: {
                                    callbacks: {
                                        label: function(context) {
                                            const total = stageValues.reduce((a, b) => a + b, 0);
                                            const percentage = ((context.parsed.y / total) * 100).toFixed(1);
                                            return context.parsed.y + ' opportunities (' + percentage + '%)';
                                        }
                                    }
                                },
                                datalabels: {
                                    anchor: 'end',
                                    align: 'top',
                                    formatter: function(value, context) {
                                        const total = stageValues.reduce((a, b) => a + b, 0);
                                        const percentage = ((value / total) * 100).toFixed(1);
                                        return value + '\\n(' + percentage + '%)';
                                    },
                                    font: {
                                        weight: 'bold',
                                        size: 12
                                    },
                                    color: '#1F2937'
                                }
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    ticks: {
                                        stepSize: 10,
                                        font: { size: 12 }
                                    },
                                    grid: {
                                        color: '#E5E7EB'
                                    }
                                },
                                x: {
                                    ticks: {
                                        font: { size: 11 },
                                        maxRotation: 45,
                                        minRotation: 45
                                    },
                                    grid: {
                                        display: false
                                    }
                                }
                            }
                        }
                    });

                    // Create FIT distribution chart - Low, Medium, High, Not Set
                    const fitLabels = ['Low', 'Medium', 'High', 'Not Set'];
                    const fitKeys = ['Low', 'Medium', 'High', 'Not Set'];
                    const fitValues = fitKeys.map(key => data.fitDistribution[key] || 0);
                    const totalFit = fitValues.reduce((a, b) => a + b, 0);
                    
                    const fitCtx = document.getElementById('fitChart').getContext('2d');
                    if (fitChart) fitChart.destroy();
                    fitChart = new Chart(fitCtx, {
                        type: 'bar',
                        data: {
                            labels: fitLabels,
                            datasets: [{
                                label: 'Opportunities',
                                data: fitValues,
                                backgroundColor: ['#EF4444', '#F59E0B', '#10B981', '#9CA3AF'], // Red, Orange, Green, Gray
                                borderWidth: 2,
                                borderColor: '#ffffff',
                                borderRadius: 8
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: true,
                            plugins: {
                                legend: { display: false },
                                tooltip: {
                                    callbacks: {
                                        label: function(context) {
                                            const percentage = ((context.parsed.y / totalFit) * 100).toFixed(1);
                                            return context.parsed.y + ' opportunities (' + percentage + '%)';
                                        }
                                    }
                                },
                                datalabels: {
                                    anchor: 'end',
                                    align: 'top',
                                    formatter: function(value, context) {
                                        const percentage = ((value / totalFit) * 100).toFixed(1);
                                        return value + '\\n(' + percentage + '%)';
                                    },
                                    font: {
                                        weight: 'bold',
                                        size: 12
                                    },
                                    color: '#1F2937'
                                }
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    ticks: {
                                        stepSize: 10,
                                        font: { size: 12 }
                                    },
                                    grid: {
                                        color: '#E5E7EB'
                                    }
                                },
                                x: {
                                    ticks: {
                                        font: { size: 13, weight: 'bold' }
                                    },
                                    grid: {
                                        display: false
                                    }
                                }
                            }
                        }
                    });

                    // Display top origins
                    const originsList = document.getElementById('origins-list');
                    const sortedOrigins = Object.entries(data.originDistribution)
                        .sort((a, b) => b[1] - a[1])
                        .slice(0, 10);
                    
                    originsList.innerHTML = sortedOrigins.map(([name, count]) => \`
                        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                            <span class="text-gray-700 font-medium">\${name}</span>
                            <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">\${count}</span>
                        </div>
                    \`).join('');

                    // Display recent boxes
                    const recentBoxes = document.getElementById('recent-boxes');
                    // Show boxes with High FIT or High INTEREST
                    recentBoxes.innerHTML = data.recentBoxes.map(box => {
                        const fitColor = box.fit === 'High' ? 'bg-green-100 text-green-800' : 
                                        box.fit === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                                        box.fit === 'Low' ? 'bg-red-100 text-red-800' : 
                                        'bg-gray-100 text-gray-600';
                        
                        const interestColor = box.interest === 'High' ? 'bg-purple-100 text-purple-800' : 
                                             box.interest === 'Medium' ? 'bg-blue-100 text-blue-800' : 
                                             box.interest === 'Low' ? 'bg-gray-100 text-gray-800' : 
                                             'bg-gray-100 text-gray-600';
                        
                        return \`
                        <tr class="hover:bg-gray-50">
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">\${box.name}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded">\${box.stage}</span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                <span class="px-2 py-1 \${fitColor} rounded">\${box.fit}</span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                <span class="px-2 py-1 \${interestColor} rounded">\${box.interest}</span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                \${new Date(box.lastUpdated).toLocaleDateString()}
                            </td>
                        </tr>
                        \`;
                    }).join('');
            }
            
            // Update Google Sheets formulas based on current company
            function updateSheetsFormulas() {
                const companyName = COMPANIES[currentCompany].name;
                const baseUrl = window.location.origin;
                
                // Update company name displays
                document.getElementById('sheets-company-name').textContent = companyName;
                document.getElementById('sheets-company-title').textContent = companyName + ' Lead Tracking (10 Leads/Month Objective)';
                document.getElementById('sheets-total-company').textContent = companyName;
                
                // Update pattern placeholders
                document.getElementById('pattern-company-1').textContent = currentCompany;
                document.getElementById('pattern-company-2').textContent = currentCompany;
                document.getElementById('pattern-company-3').textContent = currentCompany;
                document.getElementById('pattern-company-4').textContent = currentCompany;
                
                // Update formulas
                document.getElementById('sheets-total-formula').textContent = 
                    '=IMPORTDATA("' + baseUrl + '/api/sheets/' + currentCompany + '/total")';
                
                document.getElementById('sheets-duration-formula').textContent = 
                    '=IMPORTDATA("' + baseUrl + '/api/sheets/' + currentCompany + '/duration/total")';
                
                document.getElementById('sheets-week-formula').textContent = 
                    '=IMPORTDATA("' + baseUrl + '/api/sheets/' + currentCompany + '/week/count")';
                    
                document.getElementById('sheets-jan-formula').textContent = 
                    '=IMPORTDATA("' + baseUrl + '/api/sheets/' + currentCompany + '/month/2026-01/count")';
                    
                document.getElementById('sheets-dec-formula').textContent = 
                    '=IMPORTDATA("' + baseUrl + '/api/sheets/' + currentCompany + '/month/2025-12/count")';
            }

            function updateSettingsView() {
                const company = COMPANIES[currentCompany];
                const sources = company.sources || { promote: '', network: '', engage: '' };
                
                // Update company name in settings header
                document.getElementById('settings-company-name').textContent = company.name;
                
                // Populate input fields with current values
                document.getElementById('edit-promote-url').value = sources.promote || '';
                document.getElementById('edit-network-url').value = sources.network || '';
                document.getElementById('edit-network-gid').value = company.networkSheetGid || '';
                document.getElementById('edit-engage-url').value = sources.engage || company.url || '';
                
                // Hide any previous messages
                const messageEl = document.getElementById('edit-sources-message');
                if (messageEl) {
                    messageEl.classList.add('hidden');
                }
            }

            // Save Source URLs Function
            async function saveSourceURLs() {
                const company = COMPANIES[currentCompany];
                
                // Get values from input fields
                const promoteUrl = document.getElementById('edit-promote-url').value.trim();
                const networkUrl = document.getElementById('edit-network-url').value.trim();
                const networkGid = document.getElementById('edit-network-gid').value.trim();
                const engageUrl = document.getElementById('edit-engage-url').value.trim();

                // Validate URLs if provided
                if (promoteUrl && !isValidURL(promoteUrl)) {
                    showEditMessage('error', 'PROMOTE URL is not valid. Please enter a valid URL or leave it empty.');
                    return;
                }
                if (networkUrl && !isValidURL(networkUrl)) {
                    showEditMessage('error', 'NETWORK URL is not valid. Please enter a valid URL or leave it empty.');
                    return;
                }
                if (engageUrl && !isValidURL(engageUrl)) {
                    showEditMessage('error', 'ENGAGE URL is not valid. Please enter a valid URL.');
                    return;
                }
                if (networkGid && !/^[0-9]*$/.test(networkGid)) {
                    showEditMessage('error', 'Network Sheet GID must contain only numbers.');
                    return;
                }

                // Save to database via API
                try {
                    const response = await fetch(\`/api/companies/\${currentCompany}\`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            name: company.name,
                            pipeline_key: company.pipelineKey,
                            url: engageUrl || company.url,
                            promote_url: promoteUrl || null,
                            network_url: networkUrl || null,
                            network_sheet_gid: networkGid || null,
                            engage_url: engageUrl || company.url,
                            notion_url: company.notionUrl || null
                        })
                    });

                    if (!response.ok) {
                        throw new Error('Failed to save company data');
                    }

                    // Update local COMPANIES object
                    if (!company.sources) {
                        company.sources = {};
                    }
                    
                    company.sources.promote = promoteUrl;
                    company.sources.network = networkUrl;
                    company.sources.engage = engageUrl || company.url;
                    
                    // Update network GID if provided
                    if (networkGid) {
                        company.networkSheetGid = networkGid;
                    } else {
                        delete company.networkSheetGid;
                    }
                    
                    // Also update the main URL to match engage URL if provided
                    if (engageUrl) {
                        company.url = engageUrl;
                    }

                    // Show success message
                    showEditMessage('success', \`Source URLs for \${company.name} have been saved successfully to the database!\`);

                    // Reload dashboard to reflect changes
                    loadDashboard();
                } catch (error) {
                    console.error('Error saving company data:', error);
                    showEditMessage('error', 'Failed to save company data. Please try again.');
                }
            }

            // Validate URL
            function isValidURL(string) {
                try {
                    new URL(string);
                    return true;
                } catch (_) {
                    return false;
                }
            }

            // Show Edit Message Function
            function showEditMessage(type, message) {
                const messageEl = document.getElementById('edit-sources-message');
                messageEl.classList.remove('hidden');
                
                if (type === 'success') {
                    messageEl.className = 'bg-green-50 border-l-4 border-green-500 p-4 mt-4';
                    messageEl.innerHTML = \`
                        <div class="flex items-center">
                            <i class="fas fa-check-circle text-green-600 text-xl mr-3"></i>
                            <div>
                                <p class="text-sm font-semibold text-green-800">Success!</p>
                                <p class="text-sm text-green-700 mt-1">\${message}</p>
                            </div>
                        </div>
                    \`;
                    
                    // Auto-hide after 5 seconds
                    setTimeout(() => {
                        messageEl.classList.add('hidden');
                    }, 5000);
                } else {
                    messageEl.className = 'bg-red-50 border-l-4 border-red-500 p-4 mt-4';
                    messageEl.innerHTML = \`
                        <div class="flex items-center">
                            <i class="fas fa-exclamation-circle text-red-600 text-xl mr-3"></i>
                            <div>
                                <p class="text-sm font-semibold text-red-800">Error</p>
                                <p class="text-sm text-red-700 mt-1">\${message}</p>
                            </div>
                        </div>
                    \`;
                }
            }

            // Add New Company Function
            function addNewCompany() {
                // Get form values
                const name = document.getElementById('new-company-name').value.trim();
                const key = document.getElementById('new-company-key').value.trim();
                const pipelineKey = document.getElementById('new-pipeline-key').value.trim();
                const engageUrl = document.getElementById('new-engage-url').value.trim();
                const networkUrl = document.getElementById('new-network-url').value.trim();
                const networkGid = document.getElementById('new-network-gid').value.trim();
                const promoteUrl = document.getElementById('new-promote-url').value.trim();

                // Validate required fields
                if (!name || !key || !pipelineKey || !engageUrl) {
                    showMessage('error', 'Please fill in all required fields (marked with *)');
                    return;
                }

                // Validate key format (lowercase, numbers, hyphens only)
                if (!/^[a-z0-9-]+$/.test(key)) {
                    showMessage('error', 'Company Key must contain only lowercase letters, numbers, and hyphens');
                    return;
                }

                // Check if key already exists
                if (COMPANIES[key]) {
                    showMessage('error', \`Company key "\${key}" already exists. Please use a different key.\`);
                    return;
                }

                // Create new company object
                const newCompany = {
                    name: name,
                    pipelineKey: pipelineKey,
                    url: engageUrl,
                    sources: {
                        promote: promoteUrl || '',
                        network: networkUrl || '',
                        engage: engageUrl
                    }
                };

                // Add networkSheetGid if provided
                if (networkGid) {
                    newCompany.networkSheetGid = networkGid;
                }

                // Add company to COMPANIES object
                COMPANIES[key] = newCompany;

                // Add to dropdown
                const selector = document.getElementById('company-selector');
                const option = document.createElement('option');
                option.value = key;
                option.textContent = name;
                selector.appendChild(option);

                // Switch to the new company
                currentCompany = key;
                selector.value = key;

                // Update UI
                updateSheetsFormulas();
                updateSettingsView();
                loadDashboard();

                // Show success message
                showMessage('success', \`Company "\${name}" has been added successfully! Switched to this company.\`);

                // Reset form
                resetAddCompanyForm();

                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }

            // Reset Add Company Form
            function resetAddCompanyForm() {
                document.getElementById('new-company-name').value = '';
                document.getElementById('new-company-key').value = '';
                document.getElementById('new-pipeline-key').value = '';
                document.getElementById('new-engage-url').value = '';
                document.getElementById('new-network-url').value = '';
                document.getElementById('new-network-gid').value = '';
                document.getElementById('new-promote-url').value = '';
                
                // Hide message
                const messageEl = document.getElementById('add-company-message');
                messageEl.classList.add('hidden');
            }

            // Show Message Function
            function showMessage(type, message) {
                const messageEl = document.getElementById('add-company-message');
                messageEl.classList.remove('hidden');
                
                if (type === 'success') {
                    messageEl.className = 'bg-green-50 border-l-4 border-green-500 p-4 mt-4';
                    messageEl.innerHTML = \`
                        <div class="flex items-center">
                            <i class="fas fa-check-circle text-green-600 text-xl mr-3"></i>
                            <div>
                                <p class="text-sm font-semibold text-green-800">Success!</p>
                                <p class="text-sm text-green-700 mt-1">\${message}</p>
                            </div>
                        </div>
                    \`;
                } else {
                    messageEl.className = 'bg-red-50 border-l-4 border-red-500 p-4 mt-4';
                    messageEl.innerHTML = \`
                        <div class="flex items-center">
                            <i class="fas fa-exclamation-circle text-red-600 text-xl mr-3"></i>
                            <div>
                                <p class="text-sm font-semibold text-red-800">Error</p>
                                <p class="text-sm text-red-700 mt-1">\${message}</p>
                            </div>
                        </div>
                    \`;
                }

                // Auto-hide success messages after 5 seconds
                if (type === 'success') {
                    setTimeout(() => {
                        messageEl.classList.add('hidden');
                    }, 5000);
                }
            }

            // Load dashboard on page load and setup auto-refresh
            updateSheetsFormulas(); // Initialize Google Sheets formulas
            updateSettingsView(); // Initialize Settings view
            loadCompanies(); // Load companies from D1 database (will call loadDashboard internally)
            setupAutoRefresh();
        <\/script>
    </body>
    </html>
  `));const ht=new Ut,Ms=Object.assign({"/src/index.tsx":A});let Bt=!1;for(const[,e]of Object.entries(Ms))e&&(ht.route("/",e),ht.notFound(e.notFoundHandler),Bt=!0);if(!Bt)throw new Error("Can't import modules from ['/src/index.tsx','/app/server.ts']");export{ht as default};
