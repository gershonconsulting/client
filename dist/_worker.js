var gs=Object.defineProperty;var Fn=e=>{throw TypeError(e)};var us=(e,t,n)=>t in e?gs(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var D=(e,t,n)=>us(e,typeof t!="symbol"?t+"":t,n),vn=(e,t,n)=>t.has(e)||Fn("Cannot "+n);var x=(e,t,n)=>(vn(e,t,"read from private field"),n?n.call(e):t.get(e)),K=(e,t,n)=>t.has(e)?Fn("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),O=(e,t,n,s)=>(vn(e,t,"write to private field"),s?s.call(e,n):t.set(e,n),n),q=(e,t,n)=>(vn(e,t,"access private method"),n);var _n=(e,t,n,s)=>({set _(o){O(e,t,o,n)},get _(){return x(e,t,s)}});var Wn=(e,t,n)=>(s,o)=>{let a=-1;return r(0);async function r(i){if(i<=a)throw new Error("next() called multiple times");a=i;let c,l=!1,d;if(e[i]?(d=e[i][0][0],s.req.routeIndex=i):d=i===e.length&&o||void 0,d)try{c=await d(s,()=>r(i+1))}catch(p){if(p instanceof Error&&t)s.error=p,c=await t(p,s),l=!0;else throw p}else s.finalized===!1&&n&&(c=await n(s));return c&&(s.finalized===!1||l)&&(s.res=c),s}},hs=Symbol(),fs=async(e,t=Object.create(null))=>{const{all:n=!1,dot:s=!1}=t,a=(e instanceof ka?e.raw.headers:e.headers).get("Content-Type");return a!=null&&a.startsWith("multipart/form-data")||a!=null&&a.startsWith("application/x-www-form-urlencoded")?ys(e,{all:n,dot:s}):{}};async function ys(e,t){const n=await e.formData();return n?bs(n,t):{}}function bs(e,t){const n=Object.create(null);return e.forEach((s,o)=>{t.all||o.endsWith("[]")?xs(n,o,s):n[o]=s}),t.dot&&Object.entries(n).forEach(([s,o])=>{s.includes(".")&&(vs(n,s,o),delete n[s])}),n}var xs=(e,t,n)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(n):e[t]=[e[t],n]:t.endsWith("[]")?e[t]=[n]:e[t]=n},vs=(e,t,n)=>{let s=e;const o=t.split(".");o.forEach((a,r)=>{r===o.length-1?s[a]=n:((!s[a]||typeof s[a]!="object"||Array.isArray(s[a])||s[a]instanceof File)&&(s[a]=Object.create(null)),s=s[a])})},ya=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},ws=e=>{const{groups:t,path:n}=ks(e),s=ya(n);return Es(s,t)},ks=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(n,s)=>{const o=`@${s}`;return t.push([o,n]),o}),{groups:t,path:e}},Es=(e,t)=>{for(let n=t.length-1;n>=0;n--){const[s]=t[n];for(let o=e.length-1;o>=0;o--)if(e[o].includes(s)){e[o]=e[o].replace(s,t[n][1]);break}}return e},tn={},Ss=(e,t)=>{if(e==="*")return"*";const n=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(n){const s=`${e}#${t}`;return tn[s]||(n[2]?tn[s]=t&&t[0]!==":"&&t[0]!=="*"?[s,n[1],new RegExp(`^${n[2]}(?=/${t})`)]:[e,n[1],new RegExp(`^${n[2]}$`)]:tn[s]=[e,n[1],!0]),tn[s]}return null},$n=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,n=>{try{return t(n)}catch{return n}})}},Cs=e=>$n(e,decodeURI),ba=e=>{const t=e.url,n=t.indexOf("/",t.indexOf(":")+4);let s=n;for(;s<t.length;s++){const o=t.charCodeAt(s);if(o===37){const a=t.indexOf("?",s),r=t.slice(n,a===-1?void 0:a);return Cs(r.includes("%25")?r.replace(/%25/g,"%2525"):r)}else if(o===63)break}return t.slice(n,s)},Is=e=>{const t=ba(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},kt=(e,t,...n)=>(n.length&&(t=kt(t,...n)),`${(e==null?void 0:e[0])==="/"?"":"/"}${e}${t==="/"?"":`${(e==null?void 0:e.at(-1))==="/"?"":"/"}${(t==null?void 0:t[0])==="/"?t.slice(1):t}`}`),xa=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),n=[];let s="";return t.forEach(o=>{if(o!==""&&!/\:/.test(o))s+="/"+o;else if(/\:/.test(o))if(/\?/.test(o)){n.length===0&&s===""?n.push("/"):n.push(s);const a=o.replace("?","");s+="/"+a,n.push(s)}else s+="/"+o}),n.filter((o,a,r)=>r.indexOf(o)===a)},wn=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?$n(e,wa):e):e,va=(e,t,n)=>{let s;if(!n&&t&&!/[%+]/.test(t)){let r=e.indexOf("?",8);if(r===-1)return;for(e.startsWith(t,r+1)||(r=e.indexOf(`&${t}`,r+1));r!==-1;){const i=e.charCodeAt(r+t.length+1);if(i===61){const c=r+t.length+2,l=e.indexOf("&",c);return wn(e.slice(c,l===-1?void 0:l))}else if(i==38||isNaN(i))return"";r=e.indexOf(`&${t}`,r+1)}if(s=/[%+]/.test(e),!s)return}const o={};s??(s=/[%+]/.test(e));let a=e.indexOf("?",8);for(;a!==-1;){const r=e.indexOf("&",a+1);let i=e.indexOf("=",a);i>r&&r!==-1&&(i=-1);let c=e.slice(a+1,i===-1?r===-1?void 0:r:i);if(s&&(c=wn(c)),a=r,c==="")continue;let l;i===-1?l="":(l=e.slice(i+1,r===-1?void 0:r),s&&(l=wn(l))),n?(o[c]&&Array.isArray(o[c])||(o[c]=[]),o[c].push(l)):o[c]??(o[c]=l)}return t?o[t]:o},Ms=va,As=(e,t)=>va(e,t,!0),wa=decodeURIComponent,Kn=e=>$n(e,wa),It,Se,He,Ea,Sa,Mn,Ye,pa,ka=(pa=class{constructor(e,t="/",n=[[]]){K(this,He);D(this,"raw");K(this,It);K(this,Se);D(this,"routeIndex",0);D(this,"path");D(this,"bodyCache",{});K(this,Ye,e=>{const{bodyCache:t,raw:n}=this,s=t[e];if(s)return s;const o=Object.keys(t)[0];return o?t[o].then(a=>(o==="json"&&(a=JSON.stringify(a)),new Response(a)[e]())):t[e]=n[e]()});this.raw=e,this.path=t,O(this,Se,n),O(this,It,{})}param(e){return e?q(this,He,Ea).call(this,e):q(this,He,Sa).call(this)}query(e){return Ms(this.url,e)}queries(e){return As(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((n,s)=>{t[s]=n}),t}async parseBody(e){var t;return(t=this.bodyCache).parsedBody??(t.parsedBody=await fs(this,e))}json(){return x(this,Ye).call(this,"text").then(e=>JSON.parse(e))}text(){return x(this,Ye).call(this,"text")}arrayBuffer(){return x(this,Ye).call(this,"arrayBuffer")}blob(){return x(this,Ye).call(this,"blob")}formData(){return x(this,Ye).call(this,"formData")}addValidatedData(e,t){x(this,It)[e]=t}valid(e){return x(this,It)[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[hs](){return x(this,Se)}get matchedRoutes(){return x(this,Se)[0].map(([[,e]])=>e)}get routePath(){return x(this,Se)[0].map(([[,e]])=>e)[this.routeIndex].path}},It=new WeakMap,Se=new WeakMap,He=new WeakSet,Ea=function(e){const t=x(this,Se)[0][this.routeIndex][1][e],n=q(this,He,Mn).call(this,t);return n&&/\%/.test(n)?Kn(n):n},Sa=function(){const e={},t=Object.keys(x(this,Se)[0][this.routeIndex][1]);for(const n of t){const s=q(this,He,Mn).call(this,x(this,Se)[0][this.routeIndex][1][n]);s!==void 0&&(e[n]=/\%/.test(s)?Kn(s):s)}return e},Mn=function(e){return x(this,Se)[1]?x(this,Se)[1][e]:e},Ye=new WeakMap,pa),Ls={Stringify:1},Ca=async(e,t,n,s,o)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const a=e.callbacks;return a!=null&&a.length?(o?o[0]+=e:o=[e],Promise.all(a.map(i=>i({phase:t,buffer:o,context:s}))).then(i=>Promise.all(i.filter(Boolean).map(c=>Ca(c,t,!1,s,o))).then(()=>o[0]))):Promise.resolve(e)},Ts="text/plain; charset=UTF-8",kn=(e,t)=>({"Content-Type":e,...t}),Vt,zt,Be,Mt,Fe,be,Yt,At,Lt,it,qt,Zt,qe,Et,ma,$s=(ma=class{constructor(e,t){K(this,qe);K(this,Vt);K(this,zt);D(this,"env",{});K(this,Be);D(this,"finalized",!1);D(this,"error");K(this,Mt);K(this,Fe);K(this,be);K(this,Yt);K(this,At);K(this,Lt);K(this,it);K(this,qt);K(this,Zt);D(this,"render",(...e)=>(x(this,At)??O(this,At,t=>this.html(t)),x(this,At).call(this,...e)));D(this,"setLayout",e=>O(this,Yt,e));D(this,"getLayout",()=>x(this,Yt));D(this,"setRenderer",e=>{O(this,At,e)});D(this,"header",(e,t,n)=>{this.finalized&&O(this,be,new Response(x(this,be).body,x(this,be)));const s=x(this,be)?x(this,be).headers:x(this,it)??O(this,it,new Headers);t===void 0?s.delete(e):n!=null&&n.append?s.append(e,t):s.set(e,t)});D(this,"status",e=>{O(this,Mt,e)});D(this,"set",(e,t)=>{x(this,Be)??O(this,Be,new Map),x(this,Be).set(e,t)});D(this,"get",e=>x(this,Be)?x(this,Be).get(e):void 0);D(this,"newResponse",(...e)=>q(this,qe,Et).call(this,...e));D(this,"body",(e,t,n)=>q(this,qe,Et).call(this,e,t,n));D(this,"text",(e,t,n)=>!x(this,it)&&!x(this,Mt)&&!t&&!n&&!this.finalized?new Response(e):q(this,qe,Et).call(this,e,t,kn(Ts,n)));D(this,"json",(e,t,n)=>q(this,qe,Et).call(this,JSON.stringify(e),t,kn("application/json",n)));D(this,"html",(e,t,n)=>{const s=o=>q(this,qe,Et).call(this,o,t,kn("text/html; charset=UTF-8",n));return typeof e=="object"?Ca(e,Ls.Stringify,!1,{}).then(s):s(e)});D(this,"redirect",(e,t)=>{const n=String(e);return this.header("Location",/[^\x00-\xFF]/.test(n)?encodeURI(n):n),this.newResponse(null,t??302)});D(this,"notFound",()=>(x(this,Lt)??O(this,Lt,()=>new Response),x(this,Lt).call(this,this)));O(this,Vt,e),t&&(O(this,Fe,t.executionCtx),this.env=t.env,O(this,Lt,t.notFoundHandler),O(this,Zt,t.path),O(this,qt,t.matchResult))}get req(){return x(this,zt)??O(this,zt,new ka(x(this,Vt),x(this,Zt),x(this,qt))),x(this,zt)}get event(){if(x(this,Fe)&&"respondWith"in x(this,Fe))return x(this,Fe);throw Error("This context has no FetchEvent")}get executionCtx(){if(x(this,Fe))return x(this,Fe);throw Error("This context has no ExecutionContext")}get res(){return x(this,be)||O(this,be,new Response(null,{headers:x(this,it)??O(this,it,new Headers)}))}set res(e){if(x(this,be)&&e){e=new Response(e.body,e);for(const[t,n]of x(this,be).headers.entries())if(t!=="content-type")if(t==="set-cookie"){const s=x(this,be).headers.getSetCookie();e.headers.delete("set-cookie");for(const o of s)e.headers.append("set-cookie",o)}else e.headers.set(t,n)}O(this,be,e),this.finalized=!0}get var(){return x(this,Be)?Object.fromEntries(x(this,Be)):{}}},Vt=new WeakMap,zt=new WeakMap,Be=new WeakMap,Mt=new WeakMap,Fe=new WeakMap,be=new WeakMap,Yt=new WeakMap,At=new WeakMap,Lt=new WeakMap,it=new WeakMap,qt=new WeakMap,Zt=new WeakMap,qe=new WeakSet,Et=function(e,t,n){const s=x(this,be)?new Headers(x(this,be).headers):x(this,it)??new Headers;if(typeof t=="object"&&"headers"in t){const a=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[r,i]of a)r.toLowerCase()==="set-cookie"?s.append(r,i):s.set(r,i)}if(n)for(const[a,r]of Object.entries(n))if(typeof r=="string")s.set(a,r);else{s.delete(a);for(const i of r)s.append(a,i)}const o=typeof t=="number"?t:(t==null?void 0:t.status)??x(this,Mt);return new Response(e,{status:o,headers:s})},ma),le="ALL",Ns="all",Ps=["get","post","put","delete","options","patch"],Ia="Can not add a route since the matcher is already built.",Ma=class extends Error{},Rs="__COMPOSED_HANDLER",Ds=e=>e.text("404 Not Found",404),Hn=(e,t)=>{if("getResponse"in e){const n=e.getResponse();return t.newResponse(n.body,n)}return console.error(e),t.text("Internal Server Error",500)},Te,de,Aa,$e,st,rn,ln,Tt,Os=(Tt=class{constructor(t={}){K(this,de);D(this,"get");D(this,"post");D(this,"put");D(this,"delete");D(this,"options");D(this,"patch");D(this,"all");D(this,"on");D(this,"use");D(this,"router");D(this,"getPath");D(this,"_basePath","/");K(this,Te,"/");D(this,"routes",[]);K(this,$e,Ds);D(this,"errorHandler",Hn);D(this,"onError",t=>(this.errorHandler=t,this));D(this,"notFound",t=>(O(this,$e,t),this));D(this,"fetch",(t,...n)=>q(this,de,ln).call(this,t,n[1],n[0],t.method));D(this,"request",(t,n,s,o)=>t instanceof Request?this.fetch(n?new Request(t,n):t,s,o):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${kt("/",t)}`,n),s,o)));D(this,"fire",()=>{addEventListener("fetch",t=>{t.respondWith(q(this,de,ln).call(this,t.request,t,void 0,t.request.method))})});[...Ps,Ns].forEach(a=>{this[a]=(r,...i)=>(typeof r=="string"?O(this,Te,r):q(this,de,st).call(this,a,x(this,Te),r),i.forEach(c=>{q(this,de,st).call(this,a,x(this,Te),c)}),this)}),this.on=(a,r,...i)=>{for(const c of[r].flat()){O(this,Te,c);for(const l of[a].flat())i.map(d=>{q(this,de,st).call(this,l.toUpperCase(),x(this,Te),d)})}return this},this.use=(a,...r)=>(typeof a=="string"?O(this,Te,a):(O(this,Te,"*"),r.unshift(a)),r.forEach(i=>{q(this,de,st).call(this,le,x(this,Te),i)}),this);const{strict:s,...o}=t;Object.assign(this,o),this.getPath=s??!0?t.getPath??ba:Is}route(t,n){const s=this.basePath(t);return n.routes.map(o=>{var r;let a;n.errorHandler===Hn?a=o.handler:(a=async(i,c)=>(await Wn([],n.errorHandler)(i,()=>o.handler(i,c))).res,a[Rs]=o.handler),q(r=s,de,st).call(r,o.method,o.path,a)}),this}basePath(t){const n=q(this,de,Aa).call(this);return n._basePath=kt(this._basePath,t),n}mount(t,n,s){let o,a;s&&(typeof s=="function"?a=s:(a=s.optionHandler,s.replaceRequest===!1?o=c=>c:o=s.replaceRequest));const r=a?c=>{const l=a(c);return Array.isArray(l)?l:[l]}:c=>{let l;try{l=c.executionCtx}catch{}return[c.env,l]};o||(o=(()=>{const c=kt(this._basePath,t),l=c==="/"?0:c.length;return d=>{const p=new URL(d.url);return p.pathname=p.pathname.slice(l)||"/",new Request(p,d)}})());const i=async(c,l)=>{const d=await n(o(c.req.raw),...r(c));if(d)return d;await l()};return q(this,de,st).call(this,le,kt(t,"*"),i),this}},Te=new WeakMap,de=new WeakSet,Aa=function(){const t=new Tt({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,O(t,$e,x(this,$e)),t.routes=this.routes,t},$e=new WeakMap,st=function(t,n,s){t=t.toUpperCase(),n=kt(this._basePath,n);const o={basePath:this._basePath,path:n,method:t,handler:s};this.router.add(t,n,[s,o]),this.routes.push(o)},rn=function(t,n){if(t instanceof Error)return this.errorHandler(t,n);throw t},ln=function(t,n,s,o){if(o==="HEAD")return(async()=>new Response(null,await q(this,de,ln).call(this,t,n,s,"GET")))();const a=this.getPath(t,{env:s}),r=this.router.match(o,a),i=new $s(t,{path:a,matchResult:r,env:s,executionCtx:n,notFoundHandler:x(this,$e)});if(r[0].length===1){let l;try{l=r[0][0][0][0](i,async()=>{i.res=await x(this,$e).call(this,i)})}catch(d){return q(this,de,rn).call(this,d,i)}return l instanceof Promise?l.then(d=>d||(i.finalized?i.res:x(this,$e).call(this,i))).catch(d=>q(this,de,rn).call(this,d,i)):l??x(this,$e).call(this,i)}const c=Wn(r[0],this.errorHandler,x(this,$e));return(async()=>{try{const l=await c(i);if(!l.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return l.res}catch(l){return q(this,de,rn).call(this,l,i)}})()},Tt),La=[];function js(e,t){const n=this.buildAllMatchers(),s=((o,a)=>{const r=n[o]||n[le],i=r[2][a];if(i)return i;const c=a.match(r[0]);if(!c)return[[],La];const l=c.indexOf("",1);return[r[1][l],c]});return this.match=s,s(e,t)}var yn="[^/]+",Ft=".*",_t="(?:|/.*)",St=Symbol(),Us=new Set(".\\+*[^]$()");function Bs(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===Ft||e===_t?1:t===Ft||t===_t?-1:e===yn?1:t===yn?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var lt,ct,Ne,ut,Fs=(ut=class{constructor(){K(this,lt);K(this,ct);K(this,Ne,Object.create(null))}insert(t,n,s,o,a){if(t.length===0){if(x(this,lt)!==void 0)throw St;if(a)return;O(this,lt,n);return}const[r,...i]=t,c=r==="*"?i.length===0?["","",Ft]:["","",yn]:r==="/*"?["","",_t]:r.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let l;if(c){const d=c[1];let p=c[2]||yn;if(d&&c[2]&&(p===".*"||(p=p.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(p))))throw St;if(l=x(this,Ne)[p],!l){if(Object.keys(x(this,Ne)).some(m=>m!==Ft&&m!==_t))throw St;if(a)return;l=x(this,Ne)[p]=new ut,d!==""&&O(l,ct,o.varIndex++)}!a&&d!==""&&s.push([d,x(l,ct)])}else if(l=x(this,Ne)[r],!l){if(Object.keys(x(this,Ne)).some(d=>d.length>1&&d!==Ft&&d!==_t))throw St;if(a)return;l=x(this,Ne)[r]=new ut}l.insert(i,n,s,o,a)}buildRegExpStr(){const n=Object.keys(x(this,Ne)).sort(Bs).map(s=>{const o=x(this,Ne)[s];return(typeof x(o,ct)=="number"?`(${s})@${x(o,ct)}`:Us.has(s)?`\\${s}`:s)+o.buildRegExpStr()});return typeof x(this,lt)=="number"&&n.unshift(`#${x(this,lt)}`),n.length===0?"":n.length===1?n[0]:"(?:"+n.join("|")+")"}},lt=new WeakMap,ct=new WeakMap,Ne=new WeakMap,ut),bn,Xt,ga,_s=(ga=class{constructor(){K(this,bn,{varIndex:0});K(this,Xt,new Fs)}insert(e,t,n){const s=[],o=[];for(let r=0;;){let i=!1;if(e=e.replace(/\{[^}]+\}/g,c=>{const l=`@\\${r}`;return o[r]=[l,c],r++,i=!0,l}),!i)break}const a=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let r=o.length-1;r>=0;r--){const[i]=o[r];for(let c=a.length-1;c>=0;c--)if(a[c].indexOf(i)!==-1){a[c]=a[c].replace(i,o[r][1]);break}}return x(this,Xt).insert(a,t,s,x(this,bn),n),s}buildRegExp(){let e=x(this,Xt).buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const n=[],s=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(o,a,r)=>a!==void 0?(n[++t]=Number(a),"$()"):(r!==void 0&&(s[Number(r)]=++t),"")),[new RegExp(`^${e}`),n,s]}},bn=new WeakMap,Xt=new WeakMap,ga),Ws=[/^$/,[],Object.create(null)],cn=Object.create(null);function Ta(e){return cn[e]??(cn[e]=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,n)=>n?`\\${n}`:"(?:|/.*)")}$`))}function Ks(){cn=Object.create(null)}function Hs(e){var l;const t=new _s,n=[];if(e.length===0)return Ws;const s=e.map(d=>[!/\*|\/:/.test(d[0]),...d]).sort(([d,p],[m,u])=>d?1:m?-1:p.length-u.length),o=Object.create(null);for(let d=0,p=-1,m=s.length;d<m;d++){const[u,g,v]=s[d];u?o[g]=[v.map(([b])=>[b,Object.create(null)]),La]:p++;let h;try{h=t.insert(g,p,u)}catch(b){throw b===St?new Ma(g):b}u||(n[p]=v.map(([b,k])=>{const C=Object.create(null);for(k-=1;k>=0;k--){const[E,w]=h[k];C[E]=w}return[b,C]}))}const[a,r,i]=t.buildRegExp();for(let d=0,p=n.length;d<p;d++)for(let m=0,u=n[d].length;m<u;m++){const g=(l=n[d][m])==null?void 0:l[1];if(!g)continue;const v=Object.keys(g);for(let h=0,b=v.length;h<b;h++)g[v[h]]=i[g[v[h]]]}const c=[];for(const d in r)c[d]=n[r[d]];return[a,c,o]}function xt(e,t){if(e){for(const n of Object.keys(e).sort((s,o)=>o.length-s.length))if(Ta(n).test(t))return[...e[n]]}}var Ze,Xe,xn,$a,ua,Gs=(ua=class{constructor(){K(this,xn);D(this,"name","RegExpRouter");K(this,Ze);K(this,Xe);D(this,"match",js);O(this,Ze,{[le]:Object.create(null)}),O(this,Xe,{[le]:Object.create(null)})}add(e,t,n){var i;const s=x(this,Ze),o=x(this,Xe);if(!s||!o)throw new Error(Ia);s[e]||[s,o].forEach(c=>{c[e]=Object.create(null),Object.keys(c[le]).forEach(l=>{c[e][l]=[...c[le][l]]})}),t==="/*"&&(t="*");const a=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const c=Ta(t);e===le?Object.keys(s).forEach(l=>{var d;(d=s[l])[t]||(d[t]=xt(s[l],t)||xt(s[le],t)||[])}):(i=s[e])[t]||(i[t]=xt(s[e],t)||xt(s[le],t)||[]),Object.keys(s).forEach(l=>{(e===le||e===l)&&Object.keys(s[l]).forEach(d=>{c.test(d)&&s[l][d].push([n,a])})}),Object.keys(o).forEach(l=>{(e===le||e===l)&&Object.keys(o[l]).forEach(d=>c.test(d)&&o[l][d].push([n,a]))});return}const r=xa(t)||[t];for(let c=0,l=r.length;c<l;c++){const d=r[c];Object.keys(o).forEach(p=>{var m;(e===le||e===p)&&((m=o[p])[d]||(m[d]=[...xt(s[p],d)||xt(s[le],d)||[]]),o[p][d].push([n,a-l+c+1]))})}}buildAllMatchers(){const e=Object.create(null);return Object.keys(x(this,Xe)).concat(Object.keys(x(this,Ze))).forEach(t=>{e[t]||(e[t]=q(this,xn,$a).call(this,t))}),O(this,Ze,O(this,Xe,void 0)),Ks(),e}},Ze=new WeakMap,Xe=new WeakMap,xn=new WeakSet,$a=function(e){const t=[];let n=e===le;return[x(this,Ze),x(this,Xe)].forEach(s=>{const o=s[e]?Object.keys(s[e]).map(a=>[a,s[e][a]]):[];o.length!==0?(n||(n=!0),t.push(...o)):e!==le&&t.push(...Object.keys(s[le]).map(a=>[a,s[le][a]]))}),n?Hs(t):null},ua),Qe,_e,ha,Vs=(ha=class{constructor(e){D(this,"name","SmartRouter");K(this,Qe,[]);K(this,_e,[]);O(this,Qe,e.routers)}add(e,t,n){if(!x(this,_e))throw new Error(Ia);x(this,_e).push([e,t,n])}match(e,t){if(!x(this,_e))throw new Error("Fatal error");const n=x(this,Qe),s=x(this,_e),o=n.length;let a=0,r;for(;a<o;a++){const i=n[a];try{for(let c=0,l=s.length;c<l;c++)i.add(...s[c]);r=i.match(e,t)}catch(c){if(c instanceof Ma)continue;throw c}this.match=i.match.bind(i),O(this,Qe,[i]),O(this,_e,void 0);break}if(a===o)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,r}get activeRouter(){if(x(this,_e)||x(this,Qe).length!==1)throw new Error("No active router has been determined yet.");return x(this,Qe)[0]}},Qe=new WeakMap,_e=new WeakMap,ha),Dt=Object.create(null),Je,ue,dt,$t,pe,We,ot,Nt,zs=(Nt=class{constructor(t,n,s){K(this,We);K(this,Je);K(this,ue);K(this,dt);K(this,$t,0);K(this,pe,Dt);if(O(this,ue,s||Object.create(null)),O(this,Je,[]),t&&n){const o=Object.create(null);o[t]={handler:n,possibleKeys:[],score:0},O(this,Je,[o])}O(this,dt,[])}insert(t,n,s){O(this,$t,++_n(this,$t)._);let o=this;const a=ws(n),r=[];for(let i=0,c=a.length;i<c;i++){const l=a[i],d=a[i+1],p=Ss(l,d),m=Array.isArray(p)?p[0]:l;if(m in x(o,ue)){o=x(o,ue)[m],p&&r.push(p[1]);continue}x(o,ue)[m]=new Nt,p&&(x(o,dt).push(p),r.push(p[1])),o=x(o,ue)[m]}return x(o,Je).push({[t]:{handler:s,possibleKeys:r.filter((i,c,l)=>l.indexOf(i)===c),score:x(this,$t)}}),o}search(t,n){var c;const s=[];O(this,pe,Dt);let a=[this];const r=ya(n),i=[];for(let l=0,d=r.length;l<d;l++){const p=r[l],m=l===d-1,u=[];for(let g=0,v=a.length;g<v;g++){const h=a[g],b=x(h,ue)[p];b&&(O(b,pe,x(h,pe)),m?(x(b,ue)["*"]&&s.push(...q(this,We,ot).call(this,x(b,ue)["*"],t,x(h,pe))),s.push(...q(this,We,ot).call(this,b,t,x(h,pe)))):u.push(b));for(let k=0,C=x(h,dt).length;k<C;k++){const E=x(h,dt)[k],w=x(h,pe)===Dt?{}:{...x(h,pe)};if(E==="*"){const I=x(h,ue)["*"];I&&(s.push(...q(this,We,ot).call(this,I,t,x(h,pe))),O(I,pe,w),u.push(I));continue}const[S,R,U]=E;if(!p&&!(U instanceof RegExp))continue;const T=x(h,ue)[S],f=r.slice(l).join("/");if(U instanceof RegExp){const I=U.exec(f);if(I){if(w[R]=I[0],s.push(...q(this,We,ot).call(this,T,t,x(h,pe),w)),Object.keys(x(T,ue)).length){O(T,pe,w);const A=((c=I[0].match(/\//))==null?void 0:c.length)??0;(i[A]||(i[A]=[])).push(T)}continue}}(U===!0||U.test(p))&&(w[R]=p,m?(s.push(...q(this,We,ot).call(this,T,t,w,x(h,pe))),x(T,ue)["*"]&&s.push(...q(this,We,ot).call(this,x(T,ue)["*"],t,w,x(h,pe)))):(O(T,pe,w),u.push(T)))}}a=u.concat(i.shift()??[])}return s.length>1&&s.sort((l,d)=>l.score-d.score),[s.map(({handler:l,params:d})=>[l,d])]}},Je=new WeakMap,ue=new WeakMap,dt=new WeakMap,$t=new WeakMap,pe=new WeakMap,We=new WeakSet,ot=function(t,n,s,o){const a=[];for(let r=0,i=x(t,Je).length;r<i;r++){const c=x(t,Je)[r],l=c[n]||c[le],d={};if(l!==void 0&&(l.params=Object.create(null),a.push(l),s!==Dt||o&&o!==Dt))for(let p=0,m=l.possibleKeys.length;p<m;p++){const u=l.possibleKeys[p],g=d[l.score];l.params[u]=o!=null&&o[u]&&!g?o[u]:s[u]??(o==null?void 0:o[u]),d[l.score]=!0}}return a},Nt),pt,fa,Ys=(fa=class{constructor(){D(this,"name","TrieRouter");K(this,pt);O(this,pt,new zs)}add(e,t,n){const s=xa(t);if(s){for(let o=0,a=s.length;o<a;o++)x(this,pt).insert(e,s[o],n);return}x(this,pt).insert(e,t,n)}match(e,t){return x(this,pt).search(e,t)}},pt=new WeakMap,fa),Na=class extends Os{constructor(e={}){super(e),this.router=e.router??new Vs({routers:[new Gs,new Ys]})}},qs=e=>{const n={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...e},s=(a=>typeof a=="string"?a==="*"?()=>a:r=>a===r?r:null:typeof a=="function"?a:r=>a.includes(r)?r:null)(n.origin),o=(a=>typeof a=="function"?a:Array.isArray(a)?()=>a:()=>[])(n.allowMethods);return async function(r,i){var d;function c(p,m){r.res.headers.set(p,m)}const l=await s(r.req.header("origin")||"",r);if(l&&c("Access-Control-Allow-Origin",l),n.credentials&&c("Access-Control-Allow-Credentials","true"),(d=n.exposeHeaders)!=null&&d.length&&c("Access-Control-Expose-Headers",n.exposeHeaders.join(",")),r.req.method==="OPTIONS"){n.origin!=="*"&&c("Vary","Origin"),n.maxAge!=null&&c("Access-Control-Max-Age",n.maxAge.toString());const p=await o(r.req.header("origin")||"",r);p.length&&c("Access-Control-Allow-Methods",p.join(","));let m=n.allowHeaders;if(!(m!=null&&m.length)){const u=r.req.header("Access-Control-Request-Headers");u&&(m=u.split(/\s*,\s*/))}return m!=null&&m.length&&(c("Access-Control-Allow-Headers",m.join(",")),r.res.headers.append("Vary","Access-Control-Request-Headers")),r.res.headers.delete("Content-Length"),r.res.headers.delete("Content-Type"),new Response(null,{headers:r.res.headers,status:204,statusText:"No Content"})}await i(),n.origin!=="*"&&r.header("Vary","Origin",{append:!0})}},Zs=/^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i,Gn=(e,t=Qs)=>{const n=/\.([a-zA-Z0-9]+?)$/,s=e.match(n);if(!s)return;let o=t[s[1]];return o&&o.startsWith("text")&&(o+="; charset=utf-8"),o},Xs={aac:"audio/aac",avi:"video/x-msvideo",avif:"image/avif",av1:"video/av1",bin:"application/octet-stream",bmp:"image/bmp",css:"text/css",csv:"text/csv",eot:"application/vnd.ms-fontobject",epub:"application/epub+zip",gif:"image/gif",gz:"application/gzip",htm:"text/html",html:"text/html",ico:"image/x-icon",ics:"text/calendar",jpeg:"image/jpeg",jpg:"image/jpeg",js:"text/javascript",json:"application/json",jsonld:"application/ld+json",map:"application/json",mid:"audio/x-midi",midi:"audio/x-midi",mjs:"text/javascript",mp3:"audio/mpeg",mp4:"video/mp4",mpeg:"video/mpeg",oga:"audio/ogg",ogv:"video/ogg",ogx:"application/ogg",opus:"audio/opus",otf:"font/otf",pdf:"application/pdf",png:"image/png",rtf:"application/rtf",svg:"image/svg+xml",tif:"image/tiff",tiff:"image/tiff",ts:"video/mp2t",ttf:"font/ttf",txt:"text/plain",wasm:"application/wasm",webm:"video/webm",weba:"audio/webm",webmanifest:"application/manifest+json",webp:"image/webp",woff:"font/woff",woff2:"font/woff2",xhtml:"application/xhtml+xml",xml:"application/xml",zip:"application/zip","3gp":"video/3gpp","3g2":"video/3gpp2",gltf:"model/gltf+json",glb:"model/gltf-binary"},Qs=Xs,Js=(...e)=>{let t=e.filter(o=>o!=="").join("/");t=t.replace(new RegExp("(?<=\\/)\\/+","g"),"");const n=t.split("/"),s=[];for(const o of n)o===".."&&s.length>0&&s.at(-1)!==".."?s.pop():o!=="."&&s.push(o);return s.join("/")||"."},Pa={br:".br",zstd:".zst",gzip:".gz"},eo=Object.keys(Pa),to="index.html",no=e=>{const t=e.root??"./",n=e.path,s=e.join??Js;return async(o,a)=>{var d,p,m,u;if(o.finalized)return a();let r;if(e.path)r=e.path;else try{if(r=decodeURIComponent(o.req.path),/(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(r))throw new Error}catch{return await((d=e.onNotFound)==null?void 0:d.call(e,o.req.path,o)),a()}let i=s(t,!n&&e.rewriteRequestPath?e.rewriteRequestPath(r):r);e.isDir&&await e.isDir(i)&&(i=s(i,to));const c=e.getContent;let l=await c(i,o);if(l instanceof Response)return o.newResponse(l.body,l);if(l){const g=e.mimes&&Gn(i,e.mimes)||Gn(i);if(o.header("Content-Type",g||"application/octet-stream"),e.precompressed&&(!g||Zs.test(g))){const v=new Set((p=o.req.header("Accept-Encoding"))==null?void 0:p.split(",").map(h=>h.trim()));for(const h of eo){if(!v.has(h))continue;const b=await c(i+Pa[h],o);if(b){l=b,o.header("Content-Encoding",h),o.header("Vary","Accept-Encoding",{append:!0});break}}}return await((m=e.onFound)==null?void 0:m.call(e,i,o)),o.body(l)}await((u=e.onNotFound)==null?void 0:u.call(e,i,o)),await a()}},ao=async(e,t)=>{let n;t&&t.manifest?typeof t.manifest=="string"?n=JSON.parse(t.manifest):n=t.manifest:typeof __STATIC_CONTENT_MANIFEST=="string"?n=JSON.parse(__STATIC_CONTENT_MANIFEST):n=__STATIC_CONTENT_MANIFEST;let s;t&&t.namespace?s=t.namespace:s=__STATIC_CONTENT;const o=n[e]||e;if(!o)return null;const a=await s.get(o,{type:"stream"});return a||null},so=e=>async function(n,s){return no({...e,getContent:async a=>ao(a,{manifest:e.manifest,namespace:e.namespace?e.namespace:n.env?n.env.__STATIC_CONTENT:void 0})})(n,s)},oo=e=>so(e);const et=[{no:175,name:"Finance Montreal",keys:["finance-montreal","finance-montreal-noza"],socialId:"cmp0eqm9o000rbqj3ayeto7zp",promote:!1,campaigns:["Steve","Noza"]},{no:200,name:"MAbSilico",keys:["mabsilico"],socialId:"cmnzg13dn0000j4oeke3nh3ko"},{no:212,name:"Wallix",keys:["wallix"],socialId:"cmp0eqlsx000dbqj3hmvwldbe"},{no:229,name:"Altavia",keys:["altavia"],socialId:"cmp0eqm3y000mbqj321j14ksw",promote:!1,campaigns:["Anne","Alexandre"]},{no:233,name:"Valos",keys:["valos"],socialId:"cmp0eqlp4000abqj325ow1eyf"},{no:245,name:"PhiTech Bioinformatics",keys:["phitech-bioinformatics"],socialId:"cmoda8pxb000pmayx7fbslr0j"},{no:246,name:"Enzymicals AG",keys:["enzymicals-ag"],socialId:"cmrumcbd6000011b111l8s53r"},{no:247,name:"Flying Secoya",keys:["flying-secoya"],socialId:"cmrnknd4e0000q7qo69o3193g"},{no:248,name:"Meteor Biotech",keys:["meteor-biotech"],socialId:"cmrumd4gb000c11b193zq0t2h"},{no:250,name:"Amphasys",keys:[],socialId:"cmv6rya4i0001nh4l1a92cf48"}];function dn(e){return et.find(t=>String(t.no)===String(e))||null}const pn=e=>`#${e.no} ${e.name}`,Vn={promoteTarget:5,promoteUnit:"day",promoteTargets:{},acceptTarget:20,leadsPerMonth:10,internalEmail:"report@gershonconsulting.com",straightinEmail:"",clientEmails:{},autoSendClients:!1};async function Pe(e){try{const t=await e.get("v3:settings");if(t)return{...Vn,...JSON.parse(t)}}catch{}return{...Vn}}async function ro(e,t){const s={...await Pe(e),...t};return s.promoteTarget=Math.max(.1,Math.min(50,Number(s.promoteTarget)||5)),s.promoteUnit=s.promoteUnit==="week"?"week":"day",s.acceptTarget=Math.max(1,Math.min(100,Number(s.acceptTarget)||20)),s.leadsPerMonth=Math.max(1,Math.min(500,Number(s.leadsPerMonth)||10)),await e.put("v3:settings",JSON.stringify(s)),s}const zn=["January","February","March","April","May","June","July","August","September","October","November","December"];function nt(){return new Date().toLocaleDateString("en-CA",{timeZone:"America/New_York"})}const mn=(e,t)=>{const n=new Date(e+"T12:00:00Z");return n.setUTCDate(n.getUTCDate()+t),n.toISOString().slice(0,10)},Wt=(e,t)=>Math.round((new Date(t+"T12:00:00Z").getTime()-new Date(e+"T12:00:00Z").getTime())/864e5);function io(e,t){let n=0;for(let s=e;s<=t;s=mn(s,1)){const o=new Date(s+"T12:00:00Z").getUTCDay();o!==0&&o!==6&&n++}return n}function rt(){const e=nt(),t=+e.slice(0,4),n=+e.slice(5,7);return n===1?`${t-1}-12`:`${t}-${String(n-1).padStart(2,"0")}`}function Ke(e){const t=nt(),n=e&&/^\d{4}-\d{2}$/.test(e)?e:t.slice(0,7),s=+n.slice(0,4),o=+n.slice(5,7),a=`${n}-01`,r=new Date(Date.UTC(s,o,0)).toISOString().slice(0,10),i=t.slice(0,7)===n,c=i?t:r,l=o===1?`${s-1}-12`:`${s}-${String(o-1).padStart(2,"0")}`;return{key:n,label:`${zn[o-1]} ${s}`,short:`${zn[o-1].slice(0,3)} ${s}`,start:a,end:c,monthEnd:r,isCurrent:i,days:Wt(a,c)+1,workingDays:io(a,c),prevKey:l}}const Kt=e=>Math.round(e*10)/10,ve=(e,t)=>t>0?Math.round(e/t*100):0;function lo(e,t,n){var o;const s=Number((o=e.promoteTargets)==null?void 0:o[String(t)])||e.promoteTarget;return e.promoteUnit==="week"?{target:Math.max(1,Math.round(s*n.days/7)),label:`${s} posts / week`,perUnit:s}:{target:Math.max(1,Math.round(s*n.workingDays)),label:`${s} posts / working day`,perUnit:s}}function co(e){return e.replace(/&#(\d+);/g,(t,n)=>{try{return String.fromCodePoint(+n)}catch{return""}}).replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#39;|&apos;/g,"'").replace(/\uFFFD/g,"'").replace(/[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}\u{FE0F}]/gu,"").replace(/\s+/g," ").trim()}async function nn(e,t){try{const n=await e.socialFetch(t);return n.ok?await n.json():null}catch{return null}}async function po(e,t,n,s,o){var N,M,G,W,te,P,ae,ge,Q,Z,ne,Y;if(!t.socialId||t.promote===!1)return null;const a=nt(),r=Wt(n.start,a)+1,i=Math.min(365,Wt(s.start,a)+1),c=n.isCurrent?0:Wt(mn(n.monthEnd,1),a)+1,l=t.socialId,[d,p,m,u]=await Promise.all([nn(e,`/api/analytics/summary?clientId=${l}&days=${i}`),nn(e,`/api/analytics/summary?clientId=${l}&days=${Math.min(365,r)}`),c>0?nn(e,`/api/analytics/summary?clientId=${l}&days=${Math.min(365,c)}`):Promise.resolve(null),nn(e,`/api/followers?clientId=${l}`)]);if(!d&&!p||!(((N=d==null?void 0:d.data)==null?void 0:N.postsByDay)||[]).reduce((L,J)=>L+(J.total||0),0)&&!Object.keys(((M=d==null?void 0:d.data)==null?void 0:M.byPlatform)||{}).length)return null;const v=((G=d==null?void 0:d.data)==null?void 0:G.postsByDay)||[],h=L=>L>=n.start&&L<=n.end,b=L=>L>=s.start&&L<=s.end,k=[];for(let L=n.start;L<=n.end;L=mn(L,1)){const J=v.find(re=>re.date===L);k.push({date:L,posts:J&&J.total||0})}const C=v.filter(L=>h(L.date)).reduce((L,J)=>L+(J.total||0),0),E=v.filter(L=>b(L.date)).reduce((L,J)=>L+(J.total||0),0),w=((W=p==null?void 0:p.data)==null?void 0:W.totals)||{},S=((te=m==null?void 0:m.data)==null?void 0:te.totals)||{},R=L=>Math.max(0,(w[L]||0)-(S[L]||0)),U=R("likes"),T=R("comments"),f=R("shares"),I=Object.keys(((P=p==null?void 0:p.data)==null?void 0:P.byPlatform)||((ae=d==null?void 0:d.data)==null?void 0:ae.byPlatform)||{}).map(L=>L==="TWITTER"?"X":L==="LINKEDIN"?"LinkedIn":L.charAt(0)+L.slice(1).toLowerCase());let A=0,H=0;const B=((ge=u==null?void 0:u.data)==null?void 0:ge.snapshots)||[],ee=((Q=u==null?void 0:u.data)==null?void 0:Q.summary)||{},me=new Set([...Object.keys(ee),...B.map(L=>L.platform)]);for(const L of me){const J=B.filter(Oe=>Oe.platform===L).sort((Oe,bt)=>String(Oe.snapshotDateLocal).localeCompare(String(bt.snapshotDateLocal))),re=Oe=>{let bt=null;for(const en of J)en.snapshotDateLocal<=Oe&&(bt=en.followerCount||0);return bt},yt=re(n.end)??(((Z=ee[L])==null?void 0:Z.count)||0),Jt=re(mn(n.start,-1))??((ne=J.find(Oe=>Oe.snapshotDateLocal>=n.start))==null?void 0:ne.followerCount)??yt;A+=yt||0,H+=(yt||0)-(Jt||0)}const F=(((Y=p==null?void 0:p.data)==null?void 0:Y.topPosts)||[]).filter(L=>h(String(L.publishedDateLocal||"")))[0],y=lo(o,t.no,n);return{posts:C,prevPosts:E,target:y.target,pct:ve(C,y.target),perDay:n.workingDays?Kt(C/n.workingDays):0,targetLabel:y.label,likes:U,comments:T,shares:f,engagement:U+T+f,followers:A,followersGrowth:H,platforms:I,daily:k,topPost:F?{snippet:co(String(F.textSnippet||F.postTextSnippet||"")).slice(0,220),url:F.postUrl||"",engagement:F.totalEngagement||(F.likeCount||0)+(F.commentCount||0)+(F.shareCount||0),date:F.publishedDateLocal||"",platform:F.platform||""}:null}}async function mo(e){var t;try{const n=await fetch(`https://prospecthub.straight-in.com/api/retain/public/campaign-reports/${e}`);if(!n.ok)return null;const s=await n.json(),o=(s==null?void 0:s.snapshot)||{};return{traj:Array.isArray(o.trajectory)?o.trajectory:[],opps:Array.isArray(o.opportunities)?o.opportunities:[],period:o.periodLabel||`${(s==null?void 0:s.periodStart)||""} – ${(s==null?void 0:s.periodEnd)||""}`,account:Array.isArray(o.accounts)&&((t=o.accounts[0])==null?void 0:t.account_name)||(String((s==null?void 0:s.title)||"").match(/—\s*(.+?)\s*\(/)||[])[1]||""}}catch{return null}}async function go(e,t,n,s,o=[]){const a=(await Promise.all(e.map(async T=>({r:T,d:await mo(T.reportId)})))).filter(T=>T.d);if(!a.length)return null;const r=T=>f=>String(f.weekStart||"")>=T.start&&String(f.weekStart||"")<=T.monthEnd,i=(T,f)=>T.reduce((I,A)=>I+(Number(A[f])||0),0),c={};let l=0,d=0,p=0,m=0,u=0,g=0;const v=[],h=[];let b="";const k=[];let C="";for(const{r:T,d:f}of a){const I=f.traj.filter(r(t)),A=f.traj.filter(r(n)),H=i(I,"connectionsSent"),B=i(I,"accepted"),ee=i(I,"opportunities");l+=H,d+=B,p+=i(I,"messages"),m+=ee,u+=i(A,"connectionsSent"),g+=i(A,"accepted");const me=f.traj.map(F=>String(F.weekStart||"")).sort().pop()||"";me&&me<t.start&&k.push(f.account||T.label),v.push({label:f.account||T.label,sent:H,accepted:B,rate:H?Kt(B/H*100):0,opportunities:ee});for(const F of I){const y=c[F.weekStart]||(c[F.weekStart]={weekStart:F.weekStart,sent:0,accepted:0,messages:0,opportunities:0});y.sent+=F.connectionsSent||0,y.accepted+=F.accepted||0,y.messages+=F.messages||0,y.opportunities+=F.opportunities||0}for(const F of f.opps){const y=String(F.loggedAt||"").slice(0,10);y>=t.start&&y<=t.end&&h.push({name:F.name||"",company:F.company||"",title:String(F.jobTitle||"").trim(),type:String(F.opportunityType||"").replace(/_/g," "),date:y})}const he=f.traj.map(F=>String(F.weekStart||"")).sort().pop()||"";he>C&&(C=he,b=f.period)}const E=l?Kt(d/l*100):0,w=u?Kt(g/u*100):0,S=Object.keys(c).length===0,R=v.map(T=>T.label.toLowerCase()),U=o.filter(T=>!R.some(f=>f.includes(T.toLowerCase())));return{pending:S,missingCampaigns:U,staleCampaigns:k,sent:l,accepted:d,rate:E,messages:p,opportunities:m,prevSent:u,prevAccepted:g,prevRate:w,pct:S?null:ve(E,s.acceptTarget),weeks:Object.values(c).sort((T,f)=>T.weekStart.localeCompare(f.weekStart)),namedOpps:h,lastReport:b,campaigns:v}}async function uo(e,t,n){const s=new Map;try{const a=(await e.list({prefix:"straightin:week:"})).keys.map(r=>r.name).sort().pop();if(a){const r=JSON.parse(await e.get(a)||"{}");for(const i of r.entries||[])i.reportId&&i.companyKey&&t.keys.includes(i.companyKey)&&s.set(i.reportId,{reportId:i.reportId,label:i.label||i.companyKey})}}catch{}for(const o of n)o!=null&&o.straightInReportId&&!s.has(o.straightInReportId)&&s.set(o.straightInReportId,{reportId:o.straightInReportId,label:o.name||o.key});return[...s.values()]}const ho=["meeting","proposal","won"];async function fo(e,t,n,s,o,a=1){const r=o.leadsPerMonth*Math.max(1,a),i=Date.parse(n.start+"T00:00:00-04:00"),c=Date.parse(n.end+"T23:59:59-04:00"),l=Date.parse(s.start+"T00:00:00-04:00"),d=Date.parse(s.monthEnd+"T23:59:59-04:00");let p=0,m=0,u=0,g=0,v=0,h=0,b=0;const k={contacted:0,connected:0,meeting:0,proposal:0,won:0,recycled:0};let C=!1;for(const S of t){if(!(S!=null&&S.pipelineKey))continue;const[R,U]=await Promise.all([e.callStreakAPI(`/pipelines/${S.pipelineKey}`).catch(()=>null),e.callStreakAPI(`/pipelines/${S.pipelineKey}/boxes`).catch(()=>null)]);if(!Array.isArray(U))continue;C=!0;const T=f=>{var I,A;return((A=(I=R==null?void 0:R.stages)==null?void 0:I[f])==null?void 0:A.name)||""};for(const f of U){v++;const I=f.creationTimestamp||0;I>=i&&I<=c&&p++,I>=l&&I<=d&&m++;const A=e.classifyStage(T(f.stageKey));if(k[A]=(k[A]||0)+1,A==="recycled"&&h++,A==="won"&&b++,ho.includes(A)){g++;const H=f.lastStageChangeTimestamp||0;H>=i&&H<=c&&u++}}}if(!C)return null;const E=Wt(n.start,n.monthEnd)+1,w=n.isCurrent?r*n.days/E:r;return{newLeads:p,prevNewLeads:m,target:r,pct:ve(p,w),meetings:u,meetingsTotal:g,activeLeads:v-h,totalLeads:v,funnel:k,won:b}}async function yo(e,t,n,s,o){const a=o||await Pe(e.COMPANIES_KV),r=Ke(s),i=Ke(r.prevKey),c=(await Promise.all(n.keys.map(g=>t.getCompany(e.COMPANIES_KV,g).catch(()=>null)))).filter(Boolean),l=await uo(e.COMPANIES_KV,n,c),d=[],[p,m,u]=await Promise.all([po(t,n,r,i,a).catch(g=>(d.push("promote: "+g.message),null)),l.length?go(l,r,i,a,n.campaigns||[]).catch(g=>(d.push("network: "+g.message),null)):Promise.resolve(null),fo(t,c,r,i,a,(n.campaigns||[]).length||1).catch(g=>(d.push("engage: "+g.message),null))]);return{no:n.no,name:n.name,keys:n.keys,promoteInPlan:n.promote!==!1,campaigns:n.campaigns||[],month:r.key,generatedAt:new Date().toISOString(),promote:p,network:m,engage:u,errors:d}}async function gn(e,t,n,s,o={}){const a=Ke(s),r=`v3:cm6:${a.key}:${n.no}`;if(!o.fresh)try{const c=await e.COMPANIES_KV.get(r);if(c)return JSON.parse(c)}catch{}const i=await yo(e,t,n,a.key,o.settings);try{await e.COMPANIES_KV.put(r,JSON.stringify(i),{expirationTtl:a.isCurrent?1800:43200})}catch{}return i}const bo=e=>e==null?"none":e>=80?"good":e>=40?"warn":"crit";function jt(e){var n,s,o;const t=[(n=e.promote)==null?void 0:n.pct,(s=e.network)==null?void 0:s.pct,(o=e.engage)==null?void 0:o.pct].filter(a=>a!=null);return t.length?Math.round(t.map(a=>Math.min(100,a)).reduce((a,r)=>a+r,0)/t.length):null}function xo(e,t,n){const s=t.filter(g=>g.promote),o=t.filter(g=>g.network&&!g.network.pending),a=t.filter(g=>g.engage),r=s.reduce((g,v)=>g+v.promote.posts,0),i=s.reduce((g,v)=>g+v.promote.target,0),c=o.reduce((g,v)=>g+v.network.sent,0),l=o.reduce((g,v)=>g+v.network.accepted,0),d=c?Kt(l/c*100):0,p=a.reduce((g,v)=>g+v.engage.newLeads,0),m=a.reduce((g,v)=>g+v.engage.target,0),u=t.map(jt).filter(g=>g!=null);return{month:e,clients:t,totals:{posts:r,postsTarget:i,postsPct:ve(r,i),engagement:s.reduce((g,v)=>g+v.promote.engagement,0),sent:c,accepted:l,rate:d,ratePct:ve(d,n.acceptTarget),opportunities:o.reduce((g,v)=>g+v.network.opportunities,0),newLeads:p,leadsTarget:m,leadsPct:ve(p,m),meetings:a.reduce((g,v)=>g+v.engage.meetings,0),score:u.length?Math.round(u.reduce((g,v)=>g+v,0)/u.length):null}}}const Ce={asOf:"2026-10-13",source:"Straight-in weekly sheet (Mar 2021 to Jun 2026), client.gershonCRM Straight-in reports (Jul to Sep 2026) and the Gershon finance roster (Invoices 2026, Old Clients)",clientsRun:71,totalOpportunities:5669,lifetimeMeanMonths:16.3,lifetimeMedianMonths:9.3,campaignMeanMonths:8.7,campaignMedianMonths:4.8,oppsPerClientMean:80,oppsPerClientMedian:25,oppsPerClientMonthMean:6.9,oppsPerClientMonthMedian:5,acceptanceRate:31.1,invitesPerClientMonth:579,retention:{1:1,2:.971,3:.956,6:.719,9:.554,12:.379,18:.274,24:.183,36:.133,48:.089,60:.089},survivalCurve:[[0,1],[1.63,.9853],[1.71,.9706],[2.93,.9557],[3.26,.94],[3.98,.9246],[4.1,.9089],[4.11,.8935],[4.13,.8781],[4.16,.8627],[4.21,.847],[4.74,.831],[4.77,.815],[4.93,.7994],[5,.7837],[5.43,.7674],[5.56,.751],[5.76,.7347],[5.94,.7187],[6.05,.7028],[6.17,.6868],[6.38,.6708],[6.45,.6545],[6.97,.6385],[7.01,.6221],[7.24,.6058],[7.78,.5889],[7.96,.5721],[8.38,.5542],[9.07,.5364],[9.13,.5017],[9.31,.4838],[9.49,.4665],[9.84,.4486],[10.76,.4307],[10.97,.4134],[11.05,.3962],[11.97,.379],[13.59,.3609],[14.57,.3437],[14.67,.3266],[15.97,.3094],[16.35,.2912],[16.51,.274],[19.13,.2569],[20.03,.2398],[21.02,.2213],[21.09,.2029],[23.09,.1826],[28.68,.1598],[30.71,.1332],[40.89,.0888]],rampOppsByMonth:[4.4,7.2,7.6,7.9,8.7,7.8,7.8,5.8,4,6.9,5.5,8.5],rampClients:[71,69,64,58,44,37,28,28,23,14,12,11],retentionSample:68,signingsByYear:{2021:9,2022:24,2023:17,2024:16,2025:10,2026:8}},vo={200:{name:"MAbSilico",start:"2020-05",campaignStart:"2021-04",months:[["2021-04",700,125,6],["2021-05",613,310,4],["2021-06",245,121,18],["2021-07",393,184,11],["2021-08",447,223,20],["2021-09",398,174,17],["2021-10",448,179,13],["2021-11",525,223,20],["2021-12",200,79,6],["2022-01",484,209,30],["2022-02",400,260,21],["2022-03",509,167,28],["2022-04",325,156,12],["2022-05",200,0,0],["2022-06",375,200,8],["2022-07",475,219,14],["2022-08",553,202,7],["2022-09",522,243,6],["2022-10",860,336,70],["2022-11",709,297,52],["2022-12",449,204,38],["2023-01",772,461,25],["2023-02",625,278,41],["2023-03",600,277,28],["2023-04",702,378,27],["2023-05",866,444,23],["2023-06",672,240,5],["2023-07",713,332,76],["2023-08",556,251,27],["2023-09",483,305,48],["2023-10",655,357,40],["2023-11",525,277,29],["2023-12",480,205,15],["2024-01",600,266,27],["2024-02",550,247,23],["2024-03",525,283,28],["2024-04",661,284,20],["2024-05",500,240,18],["2024-06",500,292,39],["2024-07",603,305,26],["2024-08",500,245,37],["2024-09",625,410,26],["2024-10",516,265,27],["2024-11",501,236,21],["2024-12",521,202,29],["2025-01",500,244,24],["2025-02",500,178,22],["2025-03",605,241,15],["2025-04",364,120,14],["2025-05",519,161,13],["2025-06",365,176,20],["2025-07",551,149,16],["2025-08",582,130,16],["2025-09",907,259,25],["2025-10",606,251,20],["2025-11",533,166,12],["2025-12",502,123,6],["2026-01",635,225,10],["2026-02",729,222,16],["2026-03",959,270,13],["2026-04",548,108,8],["2026-05",569,117,2],["2026-06",633,156,5]]},175:{name:"Finance Montreal",start:"2023-01",campaignStart:"2023-02",months:[["2023-02",481,0,0],["2023-03",608,225,0],["2023-04",451,540,35],["2023-05",600,319,41],["2023-06",400,215,18],["2023-07",648,310,31],["2023-08",526,188,27],["2023-09",472,186,8],["2023-10",625,327,3],["2023-11",525,269,3],["2023-12",450,229,2],["2024-01",625,302,4],["2024-02",606,280,4],["2024-03",570,293,7],["2024-04",595,268,10],["2024-05",475,250,4],["2024-06",500,201,4],["2024-07",551,269,9],["2024-08",875,306,13],["2024-09",1321,491,29],["2024-10",1047,330,19],["2024-11",1104,350,22],["2024-12",1220,386,26],["2025-01",1073,403,14],["2025-02",548,147,9],["2025-03",676,162,13],["2025-04",876,295,14],["2025-05",1007,377,15],["2025-06",1150,481,20],["2025-07",1001,358,9],["2025-08",1039,386,12],["2025-09",1411,293,14],["2025-10",1197,390,10],["2025-11",1101,441,12],["2025-12",1032,366,10],["2026-01",1484,379,13],["2026-02",1512,515,22],["2026-03",1633,539,34],["2026-04",1128,404,12],["2026-05",1225,429,14],["2026-06",1475,481,25]]},233:{name:"Valos",start:"2025-01",campaignStart:"2025-01",months:[["2025-01",250,49,0],["2025-02",525,131,2],["2025-03",650,232,11],["2025-04",500,174,13],["2025-05",560,178,11],["2025-06",470,130,3],["2025-07",494,99,8],["2025-08",469,53,3],["2025-09",526,189,9],["2025-10",606,127,11],["2025-11",596,160,6],["2025-12",474,151,8],["2026-01",650,143,14],["2026-02",529,163,12],["2026-03",787,236,14],["2026-04",559,98,11],["2026-05",479,80,6],["2026-06",469,92,4]]},229:{name:"Altavia",start:"2025-03",campaignStart:"2025-03",months:[["2025-03",625,168,3],["2025-04",500,135,8],["2025-05",500,186,7],["2025-06",626,256,8],["2025-07",500,168,8],["2025-08",500,188,8],["2025-09",570,157,5],["2025-10",666,209,0],["2025-11",551,150,4],["2025-12",539,86,2],["2026-01",692,145,0],["2026-02",428,171,5],["2026-03",500,110,5],["2026-04",550,157,2],["2026-05",600,195,4],["2026-06",750,222,4]]},212:{name:"WALLIX",start:"2024-05",campaignStart:"2024-06",months:[["2024-06",500,144,6],["2024-07",602,207,5],["2024-08",500,155,7],["2024-09",721,224,4],["2024-10",501,152,7],["2024-11",610,113,2],["2024-12",610,258,5],["2025-01",500,239,4],["2025-02",506,73,1],["2025-03",573,99,2]]},246:{name:"Enzymicals AG",start:"2026-07",campaignStart:"2026-07",months:[]},245:{name:"PhiTech Bioinformatics",start:"2026-06",campaignStart:"2026-06",months:[["2026-06",259,50,5]]},248:{name:"Meteor Biotech",start:"2026-07",campaignStart:"2026-07",months:[]},247:{name:"Flying Secoya",start:"2026-07",campaignStart:"2026-07",months:[]},250:{name:"Amphasys",start:null,campaignStart:null,months:[]}},wo="2026-07";function mt(e){let t=1;for(const[n,s]of Ce.survivalCurve)if(n<=e)t=s;else break;return t}const ko=(()=>{const e=mt(12),t=mt(36);return e>0&&t>0?1-Math.pow(t/e,1/24):.03})();function Ut(e,t){const n=Math.max(0,e),s=mt(n);if(s<=0)return 0;const o=Math.min(1,mt(n+t)/s),a=Math.pow(1-ko,t);return n>=12?Math.min(o,a):o}function Ra(e,t=12){let n=0;for(let s=1;s<=t;s++)n+=Ut(e,s);return Math.round(n*10)/10}function Eo(e,t=60){return Math.round((e+Ra(e,t))*10)/10}const Yn=(e,t)=>{const[n,s]=e.split("-").map(Number),[o,a]=t.split("-").map(Number);return(o-n)*12+(a-s)},un=e=>Math.round(e*10)/10;function So(e,t,n){const s=n.slice(0,7),o=e?Math.max(0,Yn(e.slice(0,7),s)+(Number(n.slice(8,10))-1)/30):null,a=t.filter(E=>E.sent>0||E.accepted>0||E.opportunities>0),r=a.filter(E=>!E.partial),i=a.reduce((E,w)=>E+w.opportunities,0),c=r.slice(-3),l=c.length?c.reduce((E,w)=>E+w.opportunities,0)/c.length:null,d=r.length,p=E=>Ce.rampOppsByMonth[Math.min(Ce.rampOppsByMonth.length-1,E)]??Ce.oppsPerClientMonthMean,m=E=>{const w=Math.min(1,r.length/3);return w*(l??0)+(1-w)*p(d+E-1)},u=a.length?a[a.length-1].month:null,v=u!=null&&Yn(u,s)>3?"inactive":o==null&&!a.length?"none":r.length>=3?"run-rate":r.length===0?"ramp":"blend",h=o??0;let b=0,k=0,C=0;for(let E=1;E<=12&&v!=="inactive"&&v!=="none";E++){const w=m(E),S=Ut(h,E);E<=3&&(b+=w,k+=w*S),C+=w*S}return{tenureMonths:o==null?null:un(o),monthsWithData:a.length,totalOpportunities:i,avgPerMonth:a.length?un(i/a.length):0,last3Avg:l==null?null:un(l),vsBenchmarkPct:l==null?null:Math.round(l/Ce.oppsPerClientMonthMean*100),stay3:o==null?null:Math.round(Ut(h,3)*100),stay6:o==null?null:Math.round(Ut(h,6)*100),stay12:o==null?null:Math.round(Ut(h,12)*100),expectedMonthsNext12:o==null?null:Ra(h,12),expectedLifetime:o==null?null:Eo(h),next3RunRate:Math.round(b),next3Expected:Math.round(k),next12Expected:Math.round(C),basis:v,lastDataMonth:u,series:t}}function qn(){let e=0,t=0;for(let s=1;s<=60;s++){const o=mt(s-1);e+=o,t+=o*(Ce.rampOppsByMonth[Math.min(Ce.rampOppsByMonth.length-1,s-1)]??Ce.oppsPerClientMonthMean)}const n=Ce.rampOppsByMonth.slice(0,3).reduce((s,o)=>s+o,0);return{expectedMonths:un(e),expectedOpportunities:Math.round(t),firstQuarterOpps:Math.round(n),stay6:Math.round(mt(6)*100),stay12:Math.round(mt(12)*100)}}const Co=(e,t)=>{const[n,s]=e.split("-").map(Number);return new Date(Date.UTC(n,s-1+t,15)).toISOString().slice(0,7)};async function Zn(e,t,n,s){var l;const o=vo[n.no],a=((o==null?void 0:o.months)||[]).map(([d,p,m,u])=>({month:d,sent:p,accepted:m,opportunities:u,live:!1})),r=nt().slice(0,7);for(let d=wo;d<=r;d=Co(d,1))try{const m=(await gn(e,t,n,d,{settings:s})).network;m&&!m.pending&&(m.sent||m.accepted||m.opportunities)&&a.push({month:d,sent:m.sent,accepted:m.accepted,opportunities:m.opportunities,live:!0,partial:d===r||Ke(d).isCurrent})}catch{}const i=((l=a.find(d=>d.sent||d.accepted||d.opportunities))==null?void 0:l.month)||null,c=(o==null?void 0:o.start)||i;return{no:n.no,name:n.name,start:c,...So(c,a,nt())}}function Io(e,t){e.get("/api/v3/history",async n=>{const s=await Pe(n.env.COMPANIES_KV),o=`v3:hist1:${nt()}`;if(n.req.query("fresh")!=="1")try{const l=await n.env.COMPANIES_KV.get(o);if(l)return n.json(JSON.parse(l))}catch{}const a=[];for(const l of et)a.push(await Zn(n.env,t,l,s));const r=a.filter(l=>l.monthsWithData>0&&l.basis!=="inactive"&&l.basis!=="none"),i={clients:r.length,next3Expected:r.reduce((l,d)=>l+d.next3Expected,0),next3RunRate:r.reduce((l,d)=>l+d.next3RunRate,0),next12Expected:r.reduce((l,d)=>l+d.next12Expected,0),expectedClientsIn6:Math.round(r.reduce((l,d)=>l+(d.stay6??0),0)/100*10)/10,expectedClientsIn12:Math.round(r.reduce((l,d)=>l+(d.stay12??0),0)/100*10)/10,paceVsHistoryPct:(()=>{const l=r.filter(d=>d.last3Avg!=null);return l.length?Math.round(l.reduce((d,p)=>d+p.last3Avg,0)/l.length/Ce.oppsPerClientMonthMean*100):null})()},c={benchmarks:Ce,newClient:qn(),portfolio:i,clients:a.map(l=>({...l,series:l.series.slice(-24)})),generatedAt:new Date().toISOString()};try{await n.env.COMPANIES_KV.put(o,JSON.stringify(c),{expirationTtl:1800})}catch{}return n.json(c)}),e.get("/api/v3/history/:no",async n=>{const s=dn(n.req.param("no"));if(!s)return n.json({error:"Unknown client number"},404);const o=await Pe(n.env.COMPANIES_KV),a=await Zn(n.env,t,s,o);return n.json({benchmarks:Ce,newClient:qn(),client:a})})}const Mo=[278,278,355,556,556,889,667,191,333,333,389,584,278,333,278,278,556,556,556,556,556,556,556,556,556,556,278,278,584,584,584,556,1015,667,667,722,722,667,611,778,722,278,500,667,556,833,722,778,667,778,722,667,611,722,667,944,667,667,611,278,278,278,469,556,333,556,556,500,556,556,278,556,556,222,222,500,222,833,556,556,556,556,333,500,278,556,500,722,500,500,500,334,260,334,584,350,556,350,222,556,333,1e3,556,556,333,1e3,667,333,1e3,350,611,350,350,222,222,333,333,350,556,1e3,333,1e3,500,333,944,350,500,667,278,333,556,556,556,556,260,556,333,737,370,556,584,333,737,333,400,584,333,333,333,556,537,278,333,333,365,556,834,834,834,611,667,667,667,667,667,667,1e3,722,667,667,667,667,278,278,278,278,722,722,778,778,778,778,778,584,778,722,722,722,722,667,667,611,556,556,556,556,556,556,889,500,556,556,556,556,278,278,278,278,556,556,556,556,556,556,556,584,611,556,556,556,556,500,556,500],Ao=[278,333,474,556,556,889,722,238,333,333,389,584,278,333,278,278,556,556,556,556,556,556,556,556,556,556,333,333,584,584,584,611,975,722,722,722,722,667,611,778,722,278,556,722,611,833,722,778,667,778,722,667,611,722,667,944,667,667,611,333,278,333,584,556,333,556,611,556,611,556,333,611,611,278,278,556,278,889,611,611,611,611,389,556,333,611,556,778,556,556,500,389,280,389,584,350,556,350,278,556,500,1e3,556,556,333,1e3,667,333,1e3,350,611,350,350,278,278,500,500,350,556,1e3,333,1e3,556,333,944,350,500,667,278,333,556,556,556,556,280,556,333,737,370,556,584,333,737,333,400,584,333,333,333,611,556,278,333,333,365,556,834,834,834,611,722,722,722,722,722,722,1e3,722,667,667,667,667,278,278,278,278,722,722,778,778,778,778,778,584,778,722,722,722,722,667,667,611,556,556,556,556,556,556,889,556,556,556,556,556,278,278,278,278,611,611,611,611,611,611,611,584,611,611,611,611,611,556,611,556],Xn={8211:150,8212:151,8216:145,8217:146,8220:147,8221:148,8226:149,8230:133,8722:45,8776:126,183:183,8594:45};function Da(e){return e<32?32:e<127?e:Xn[e]!=null?Xn[e]:e>=160&&e<=255?e:63}function Lo(e){let t="";for(const n of String(e))t+=String.fromCharCode(Da(n.codePointAt(0)||32));return t}function ht(e,t,n){const s=t?Ao:Mo;let o=0;for(const a of String(e)){const r=Da(a.codePointAt(0)||32);o+=s[r-32]!=null?s[r-32]:500}return o*n/1e3}function To(e){let t="";for(const n of Lo(e))(n==="("||n===")"||n==="\\")&&(t+="\\"),t+=n;return t}const Re=e=>(Math.round(e*100)/100).toString();class $o{constructor(t,n){D(this,"w");D(this,"h");D(this,"ops",[]);D(this,"pages",[]);D(this,"c",null);this.w=t,this.h=n}col(t){const n=t.join(",");this.c!==n&&(this.ops.push(`${Re(t[0])} ${Re(t[1])} ${Re(t[2])} rg`),this.c=n)}rect(t,n,s,o,a){s<=0||o<=0||(this.col(a),this.ops.push(`${Re(t)} ${Re(n)} ${Re(s)} ${Re(o)} re f`))}line(t,n,s,o,a){this.rect(t,n,s-t,a||.5,o)}text(t,n,s,o,a,r){s==null||s===""||(this.col(r),this.ops.push(`BT ${a?"/F2":"/F1"} ${Re(o)} Tf 1 0 0 1 ${Re(t)} ${Re(n)} Tm (${To(s)}) Tj ET`),this.c=null)}rtext(t,n,s,o,a,r){this.text(t-ht(s,a,o),n,s,o,a,r)}ctext(t,n,s,o,a,r){this.text(t-ht(s,a,o)/2,n,s,o,a,r)}addPage(){this.pages.push(this.ops),this.ops=[],this.c=null}bytes(){const t=this.pages.concat([this.ops]),n=3,s=4,o=5,a=[null,"<</Type/Catalog/Pages 2 0 R>>",`<</Type/Pages/Kids[${t.map((p,m)=>`${o+2*m} 0 R`).join(" ")}]/Count ${t.length}>>`,"<</Type/Font/Subtype/Type1/BaseFont/Helvetica/Encoding/WinAnsiEncoding>>","<</Type/Font/Subtype/Type1/BaseFont/Helvetica-Bold/Encoding/WinAnsiEncoding>>"];t.forEach((p,m)=>{const u=p.join(`
`);a.push(`<</Type/Page/Parent 2 0 R/MediaBox[0 0 ${this.w} ${this.h}]/Resources<</Font<</F1 ${n} 0 R/F2 ${s} 0 R>>>>/Contents ${o+2*m+1} 0 R>>`),a.push(`<</Length ${u.length}>>
stream
${u}
endstream`)});let r=`%PDF-1.4
%âãÏÓ
`;const i=[];for(let p=1;p<a.length;p++)i[p]=r.length,r+=`${p} 0 obj
${a[p]}
endobj
`;const c=r.length;let l=`xref
0 ${a.length}
0000000000 65535 f 
`;for(let p=1;p<a.length;p++)l+=String(i[p]).padStart(10,"0")+` 00000 n 
`;r+=l+`trailer
<</Size ${a.length}/Root 1 0 R>>
startxref
${c}
%%EOF
`;const d=new Uint8Array(r.length);for(let p=0;p<r.length;p++)d[p]=r.charCodeAt(p)&255;return d}base64(){const t=this.bytes();let n="";for(let s=0;s<t.length;s++)n+=String.fromCharCode(t[s]);return btoa(n)}}const ce="#FE1B04",Ct="#1d1d1f",Le="#6e6e73",vt="#e5e7eb",No="#fafafa",Bt="#057642",Oa="#b76b00",V=e=>e==null?"—":Math.round(e).toLocaleString("en-US"),ie=e=>String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"),ye=(e,t)=>`${V(e)} ${t}${Math.round(e)===1?"":"s"}`,tt=e=>({good:Bt,warn:Oa,crit:ce,none:Le})[bo(e)];function Po(e,t){var s,o;const n=[];for(const a of e.clients){const r=pn(a);a.promoteInPlan===!1||(a.promote?a.promote.posts===0?n.push({w:85,t:`${r} — Promote: 0 posts this month (target ${a.promote.target}). Restart the posting schedule.`}):a.promote.pct<40&&n.push({w:60-a.promote.pct/2,t:`${r} — Promote: ${a.promote.posts} of ${a.promote.target} posts (${a.promote.pct}%). Add ${Math.max(0,a.promote.target-a.promote.posts)} posts to reach target.`}):n.push({w:90,t:`${r} — Promote: no social account is collecting in social.gershon.ai. Connect LinkedIn/X so posts count.`}));for(const i of((s=a.network)==null?void 0:s.missingCampaigns)||[])n.push({w:78,t:`${r} — Network: no Straight-in report linked for the ${i} campaign. Add its link on the Straight-in page.`});for(const i of((o=a.network)==null?void 0:o.staleCampaigns)||[])n.push({w:76,t:`${r} — Network: the ${i} campaign report has no week in this month (stale link or campaign paused).`});!a.network&&a.keys.length?n.push({w:70,t:`${r} — Network: no Straight-in campaign report linked. Paste this week's link on the Straight-in page.`}):a.network&&a.network.sent===0?n.push({w:75,t:`${r} — Network: no invitations sent this month. Check the Straight-in campaign is running.`}):a.network&&!a.network.pending&&a.network.rate<t.acceptTarget&&n.push({w:74-a.network.rate,t:`${r} — Network: acceptance ${a.network.rate}% vs ${t.acceptTarget}% target. Review targeting and the connection note with Straight-in.`}),!a.engage&&a.keys.length?n.push({w:65,t:`${r} — Engage: Streak pipeline could not be read.`}):a.keys.length?a.engage&&a.engage.newLeads===0?n.push({w:72,t:`${r} — Engage: 0 new leads this month (goal ${a.engage.target}). Push accepted connections into the pipeline.`}):a.engage&&a.engage.pct<50&&n.push({w:50,t:`${r} — Engage: ${a.engage.newLeads} new leads (${a.engage.pct}% of goal).`}):n.push({w:80,t:`${r} — Engage: no Streak pipeline configured in this platform yet.`})}return n.sort((a,r)=>r.w-a.w).map(a=>a.t)}function Ro(e){const t=[],n=[...e.clients].filter(a=>a.promote&&a.promote.posts>0).sort((a,r)=>r.promote.posts-a.promote.posts)[0];n&&t.push(`Promote: ${pn(n)} published ${ye(n.promote.posts,"post")} (${n.promote.pct}% of target).`);const s=[...e.clients].filter(a=>a.network&&a.network.sent>=20).sort((a,r)=>r.network.rate-a.network.rate)[0];s&&t.push(`Network: ${pn(s)} reached ${s.network.rate}% acceptance on ${V(s.network.sent)} invitations.`);const o=[...e.clients].filter(a=>a.engage&&a.engage.newLeads>0).sort((a,r)=>r.engage.newLeads-a.engage.newLeads)[0];return o&&t.push(`Engage: ${pn(o)} added ${ye(o.engage.newLeads,"new lead")}.`),t}function Do(e,t){const n=e.totals,s=[...e.clients].sort((a,r)=>(jt(r)??-1)-(jt(a)??-1)).map(a=>[`#${a.no}`,a.name,a.promote?`${a.promote.posts}/${a.promote.target} · ${a.promote.pct}%`:a.promoteInPlan===!1?"not in plan":"—",a.network?a.network.pending?"pending":`${a.network.rate}%${a.network.rate>=t.acceptTarget?"":" (low)"} · ${V(a.network.accepted)}/${V(a.network.sent)}`:"—",a.engage?`${a.engage.newLeads} · ${a.engage.pct}%`:"—",jt(a)==null?"—":`${jt(a)}%`]),o=Po(e,t);return{kind:"internal",eyebrow:"GC · Internal monthly review",title:"Our results",month:e.month.label,headline:n.score==null?"No data collected this month":`Portfolio at ${n.score}% of plan`,subline:`${e.clients.length} clients · Promote ${n.postsPct}% · Network ${n.ratePct}% · Engage ${n.leadsPct}% of target · ${e.clients.filter(a=>a.network&&!a.network.pending&&a.network.rate>=t.acceptTarget).length} of ${e.clients.filter(a=>a.network&&!a.network.pending).length} clients at ${t.acceptTarget}%+ acceptance`,tiles:[{label:"PROMOTE",value:`${n.postsPct}%`,sub:`${V(n.posts)} of ${V(n.postsTarget)} posts`,color:tt(n.postsPct)},{label:"NETWORK",value:`${n.rate}%`,sub:`acceptance · target ${t.acceptTarget}% · ${V(n.sent)} sent`,color:tt(n.ratePct)},{label:"ENGAGE",value:V(n.newLeads),sub:`new leads · goal ${V(n.leadsTarget)} (${n.leadsPct}%)`,color:tt(n.leadsPct)},{label:"MEETINGS",value:V(n.meetings),sub:`moved to meeting+ · ${V(n.opportunities)} Straight-in opps`,color:Ct}],sections:[{title:"Results by client",table:{head:["#","Client","Promote","Accept (>="+t.acceptTarget+"%)","Engage","Score"],rows:s,align:["l","l","r","r","r","r"]}},{title:"Sources for improvement (highest impact first)",lines:o.length?o.slice(0,12):["Every channel is on plan this month."]},{title:"What worked",lines:Ro(e)}],footer:`client.gershoncrm.com · targets: ${t.promoteTarget} posts/${t.promoteUnit==="day"?"working day":"week"}, ${t.acceptTarget}% acceptance, ${t.leadsPerMonth} leads/user/month`,subject:`GC Monthly review — ${e.month.label} — ${n.score??0}% of plan`,filename:`GC-internal-review-${e.month.key}.pdf`}}function Oo(e,t){const n=t.leadsPerMonth,s=t.acceptTarget,o=e.clients.filter(f=>f.network&&f.engage),a=f=>f.engage.target,r=o.reduce((f,I)=>f+I.engage.newLeads,0),i=o.reduce((f,I)=>f+a(I),0),c=ve(r,i),l=f=>f.engage.newLeads>=a(f),d=f=>!f.network.pending&&f.network.sent>0,p=f=>d(f)&&f.network.rate>=s,m=o.filter(l).length,u=o.filter(d),g=u.filter(p).length,v=o.filter(f=>l(f)&&p(f)).length,h=u.reduce((f,I)=>f+I.network.sent,0),b=u.reduce((f,I)=>f+I.network.accepted,0),k=h?Math.round(b/h*1e3)/10:0,C=[...o].sort((f,I)=>I.engage.newLeads-f.engage.newLeads),E=f=>(f.campaigns||[]).length>1?` (${f.campaigns.length} users)`:"",w=C.map(f=>({label:`#${f.no} ${f.name}${E(f)}`,value:`${f.engage.newLeads} / ${a(f)} · ${ve(f.engage.newLeads,a(f))}%`,pct:ve(f.engage.newLeads,a(f))})),S=[...o].sort((f,I)=>(d(I)?I.network.rate:-1)-(d(f)?f.network.rate:-1)).map(f=>({label:`#${f.no} ${f.name}${E(f)}`,value:d(f)?`${f.network.rate}% / ${s}%${p(f)?" OK":""}`:"no data",pct:d(f)?ve(f.network.rate,s):0,color:d(f)?p(f)?Bt:f.network.rate>=s*.75?Oa:ce:Le})),R=C.map(f=>{const I=f.network,A=f.engage;return[`#${f.no}`,f.name,`${V(A.newLeads)}/${a(f)}`,`${ve(A.newLeads,a(f))}%`,I.pending?"—":V(I.sent),d(f)?`${I.rate}%`:"—",d(f)?`${ve(I.rate,s)}%`:"—",`${l(f)&&p(f)?"both OK":l(f)?"accept miss":p(f)?"leads miss":d(f)?"both miss":"leads miss"}`]}),U=e.clients.flatMap(f=>{var I;return(((I=f.network)==null?void 0:I.namedOpps)||[]).map(A=>`#${f.no} ${f.name} — ${A.name}${A.title?", "+A.title:""}${A.company?" at "+A.company:""} (${A.type}, ${A.date})`)}),T=[];for(const f of C){const I=a(f)-f.engage.newLeads;if(I>0&&T.push(`#${f.no} ${f.name}: ${I} qualified lead${I===1?"":"s"} short of the ${a(f)} (${ve(f.engage.newLeads,a(f))}%).`),d(f)&&!p(f)){const A=(f.network.campaigns||[]).filter(B=>B.sent>0&&B.rate<s),H=(f.network.campaigns||[]).length>1&&A.length?` (${A.map(B=>`${B.label} ${B.rate}%`).join(", ")})`:"";T.push(`#${f.no} ${f.name}: acceptance ${f.network.rate}%, below the ${s}% goal${H} — please refresh targeting and the connection note.`)}for(const A of f.network.missingCampaigns||[])T.push(`#${f.no} ${f.name}: please send the weekly report for the ${A} campaign.`);for(const A of f.network.staleCampaigns||[])T.push(`#${f.no} ${f.name}: the ${A} campaign has no report this month — is it still running?`)}return{kind:"straightin",eyebrow:"Gershon Consulting · Monthly report for Straight-in",title:"Qualified leads & acceptance vs goal",month:e.month.label,headline:`Leads ${c}% of goal (${V(r)} of ${V(i)}) · acceptance ${k}% vs ${s}% goal`,subline:`Two equal goals: ${n} leads/user/month AND ${s}%+ acceptance · leads goal ${m}/${o.length} clients · acceptance goal ${g}/${u.length} · both ${v}`,tiles:[{label:"LEADS · % OF GOAL",value:`${c}%`,sub:`${V(r)} of ${V(i)} qualified leads`,color:tt(c)},{label:"ACCEPTANCE RATE",value:`${k}%`,sub:`goal ${s}% · ${V(b)} of ${V(h)} invites`,color:k>=s?Bt:tt(ve(k,s))},{label:"CLIENTS AT LEADS GOAL",value:`${m} / ${o.length}`,sub:`${n} leads per user`,color:m===o.length?Bt:ce},{label:`CLIENTS AT ${s}%+ ACCEPT`,value:`${g} / ${u.length}`,sub:`${v} client${v===1?"":"s"} on both goals`,color:u.length&&g===u.length?Bt:ce}],sections:[{title:`Goal 1 — ${n} qualified leads per user per month`,bars:w},{title:`Goal 2 — acceptance rate above ${s}%`,bars:S},{title:"Requests for next month",lines:T.length?T.slice(0,12):["Every client reached both goals — keep the same pace."]},{title:"Detail by client (Gershon client number)",table:{head:["#","Client","Leads","% goal","Invites","Accept",`% of ${s}%`,"Goals"],rows:R,align:["l","l","r","r","r","r","r","r"]}},{title:"Opportunities logged this month",lines:U.length?U.slice(0,8):["None logged in the weekly reports this month."]}],footer:`Gershon Consulting · goals: ${n} qualified leads / LinkedIn user / month and >${s}% acceptance · client numbers are shared across all Gershon platforms`,subject:`Gershon × Straight-in — ${e.month.label}: leads ${c}% of goal · acceptance ${k}% (goal ${s}%)`,filename:`Gershon-Straight-in-${e.month.key}.pdf`}}function jo(e,t,n){const s=[],o=e.promote,a=e.network,r=e.engage;o&&o.posts>0&&s.push({label:"POSTS PUBLISHED",value:V(o.posts),sub:o.platforms.join(" + ")||"social",color:ce}),o&&o.engagement>0&&s.push({label:"ENGAGEMENTS",value:V(o.engagement),sub:`${V(o.likes)} likes · ${V(o.comments)} comments`,color:ce}),a&&a.accepted>0&&s.push({label:"NEW CONNECTIONS",value:V(a.accepted),sub:"decision-makers in your network",color:ce}),a&&a.messages>0&&s.length<4&&s.push({label:"CONVERSATIONS",value:V(a.messages),sub:"personal messages sent",color:ce}),r&&r.newLeads>0&&s.length<4&&s.push({label:"NEW LEADS",value:V(r.newLeads),sub:"added to your pipeline",color:ce}),r&&r.meetings>0&&s.length<4&&s.push({label:"MEETINGS",value:V(r.meetings),sub:"prospects moved to meeting",color:ce}),o&&o.followersGrowth>0&&s.length<4&&s.push({label:"NEW FOLLOWERS",value:`+${V(o.followersGrowth)}`,sub:`${V(o.followers)} total`,color:ce}),a&&a.sent>0&&s.length<4&&s.push({label:"INVITATIONS",value:V(a.sent),sub:"targeted US prospects reached",color:ce});let i=`Your US presence kept growing in ${t}`;r&&r.meetings>0?i=`${ye(r.meetings,"prospect")} moved to a meeting in ${t}`:r&&r.newLeads>0?i=`${ye(r.newLeads,"new lead")} added to your US pipeline`:a&&a.accepted>0?i=`${ye(a.accepted,"new US connection")} in ${t}`:o&&o.posts>0&&(i=`${ye(o.posts,"post")} kept your brand visible in the US`);const c=[];o&&o.posts>0&&c.push(`${ye(o.posts,"post")}`),a&&a.accepted>0&&c.push(`${ye(a.accepted,"new connection")}`),r&&r.newLeads>0&&c.push(`${ye(r.newLeads,"new lead")}`);const l=c.length?`This month: ${c.join(" · ")}. Every action builds on the last.`:"Your campaign foundations are in place and the momentum is building.",d=[];o&&o.prevPosts>0&&o.posts>o.prevPosts&&d.push(`Posting up ${V(o.posts-o.prevPosts)} vs last month — more visibility for your brand.`),o&&o.engagement>0&&d.push(`Your content earned ${ye(o.engagement,"engagement")} (likes, comments and shares).`),o&&o.followersGrowth>0&&d.push(`Your audience grew by ${ye(o.followersGrowth,"follower")}.`),a&&a.accepted>0&&d.push(`${ye(a.accepted,"decision-maker")} accepted your invitation${a.rate>=15?` — a ${a.rate}% acceptance rate`:""}.`),a&&a.accepted>a.prevAccepted&&a.prevAccepted>0&&d.push(`More new connections than last month (+${V(a.accepted-a.prevAccepted)}).`),a&&a.opportunities>0&&d.push(`${ye(a.opportunities,"conversation")} turned into a concrete opportunity.`);for(const m of((a==null?void 0:a.namedOpps)||[]).slice(0,3))d.push(`Opportunity: ${m.title||"decision-maker"}${m.company?" at "+m.company:""} (${m.type}).`);r&&r.newLeads>0&&d.push(`${ye(r.newLeads,"qualified prospect")} added to your pipeline, ${V(r.activeLeads)} active in total.`),r&&r.meetingsTotal>0&&d.push(`${ye(r.meetingsTotal,"prospect")} now at meeting stage or beyond.`),o!=null&&o.topPost&&o.topPost.engagement>0&&d.push(`Top post (${o.topPost.engagement} engagements): "${o.topPost.snippet.slice(0,110)}${o.topPost.snippet.length>110?"…":""}"`),d.length||d.push("Campaign set-up, targeting and content are in place — results build from here.");const p=["Keep the publishing rhythm so your brand stays visible to US buyers.","Turn new connections into conversations with personal follow-ups.","Book qualified prospects into calls — we will keep you posted as they move."];return{kind:"client",eyebrow:`Gershon Consulting · Monthly report · Client #${e.no}`,title:e.name,month:t,headline:i,subline:l,tiles:s.slice(0,4),daily:o&&o.posts>0?o.daily:void 0,dailyCaption:"Posts published per day",sections:[{title:"Highlights",lines:d.slice(0,7)},{title:"Next month",lines:p}],footer:"Gershon Consulting · US market entry · gershonconsulting.com",subject:`${e.name} — your ${t} results with Gershon`,filename:`Gershon-${e.name.replace(/[^A-Za-z0-9]+/g,"-")}-${n}.pdf`}}function ja(e){const t=o=>`<td valign="top" style="width:25%;padding:0 5px 0 0;"><div style="border:1px solid ${vt};border-top:3px solid ${o.color||Ct};border-radius:10px;padding:12px 12px 10px;background:#fff;">
    <div style="font-size:10px;font-weight:700;color:${Le};letter-spacing:.06em;">${ie(o.label)}</div>
    <div style="font-size:24px;font-weight:800;color:${o.color||Ct};margin-top:4px;line-height:1.1;">${ie(o.value)}</div>
    <div style="font-size:11px;color:${Le};margin-top:4px;">${ie(o.sub)}</div></div></td>`,n=o=>{let a="";return o.bars&&(a+=o.bars.map(r=>`<table style="width:100%;border-collapse:collapse;margin:0 0 8px;"><tr>
        <td style="width:34%;font-size:12px;font-weight:600;padding-right:8px;">${ie(r.label)}</td>
        <td><div style="height:10px;background:#eef0f3;border-radius:99px;overflow:hidden;"><div style="height:10px;width:${Math.max(2,Math.min(100,r.pct))}%;background:${r.color||tt(r.pct)};border-radius:99px;"></div></div></td>
        <td style="width:24%;text-align:right;font-size:12px;font-weight:700;color:${r.color||tt(r.pct)};padding-left:8px;white-space:nowrap;">${ie(r.value)}</td></tr></table>`).join("")),o.table&&(a=`<table style="width:100%;border-collapse:collapse;font-size:12px;">
        <tr>${o.table.head.map((r,i)=>{var c;return`<th style="text-align:${((c=o.table.align)==null?void 0:c[i])==="r"?"right":"left"};font-size:10px;color:${Le};text-transform:uppercase;letter-spacing:.05em;padding:7px 8px;border-bottom:1px solid ${vt};background:${No};">${ie(r)}</th>`}).join("")}</tr>
        ${o.table.rows.map(r=>`<tr>${r.map((i,c)=>{var l;return`<td style="padding:8px;border-bottom:1px solid ${vt};text-align:${((l=o.table.align)==null?void 0:l[c])==="r"?"right":"left"};${c===0?`color:${ce};font-weight:800;`:""}${c===1?"font-weight:600;":""}">${ie(i)}</td>`}).join("")}</tr>`).join("")}
      </table>`),o.lines&&(a+=`<ul style="margin:0;padding:0 0 0 18px;">${o.lines.map(r=>`<li style="margin:0 0 6px;font-size:13px;line-height:1.5;color:${Ct};">${ie(r)}</li>`).join("")}</ul>`),`<div style="margin:22px 0 0;"><div style="font-size:11px;font-weight:800;color:${Le};text-transform:uppercase;letter-spacing:.08em;border-bottom:1px solid ${vt};padding-bottom:6px;margin-bottom:10px;">${ie(o.title)}</div>${a}</div>`},s=e.daily?(()=>{const o=Math.max(1,...e.daily.map(a=>a.posts));return`<div style="margin:22px 0 0;"><div style="font-size:11px;font-weight:800;color:${Le};text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px;">${ie(e.dailyCaption||"")}</div>
      <table style="width:100%;border-collapse:collapse;height:70px;"><tr>${e.daily.map(a=>`<td valign="bottom" style="padding:0 1px;"><div style="height:${Math.max(2,Math.round(a.posts/o*64))}px;background:${a.posts?ce:"#e7e8eb"};border-radius:2px 2px 0 0;"></div></td>`).join("")}</tr></table>
      <table style="width:100%;font-size:10px;color:${Le};"><tr><td>${ie(e.daily[0].date.slice(5))}</td><td style="text-align:right;">${ie(e.daily[e.daily.length-1].date.slice(5))}</td></tr></table></div>`})():"";return`<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${ie(e.subject)}</title></head>
<body style="margin:0;padding:0;background:#f3f3f1;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:${Ct};">
<div style="max-width:720px;margin:0 auto;padding:22px 14px 34px;">
 <div style="background:#fff;border:1px solid ${vt};border-radius:14px;padding:24px 24px 20px;">
  <table style="width:100%;border-collapse:collapse;"><tr>
   <td style="border-left:4px solid ${ce};padding-left:12px;"><div style="font-size:11px;font-weight:700;color:${Le};letter-spacing:.04em;">${ie(e.eyebrow)}</div>
     <div style="font-size:22px;font-weight:800;margin-top:2px;">${ie(e.title)}</div></td>
   <td style="text-align:right;vertical-align:top;"><div style="font-size:18px;font-weight:800;color:${ce};">${ie(e.month)}</div><div style="font-size:10px;font-weight:800;color:${ce};letter-spacing:.12em;">GERSHON.AI</div></td>
  </tr></table>
  <div style="margin:18px 0 16px;padding:14px 16px;background:#fff5f5;border-left:4px solid ${ce};border-radius:8px;">
   <div style="font-size:16px;font-weight:800;">${ie(e.headline)}</div><div style="font-size:13px;color:${Ct};margin-top:4px;">${ie(e.subline)}</div></div>
  ${e.tiles.length?`<table style="width:100%;border-collapse:collapse;"><tr>${e.tiles.map(t).join("")}</tr></table>`:""}
  ${s}
  ${e.sections.map(n).join("")}
  <div style="margin-top:22px;padding-top:10px;border-top:1px solid ${vt};font-size:10px;color:${Le};">${ie(e.footer)}${e.kind==="client"?" · The full one-page report is attached as a PDF.":" · PDF attached."}</div>
 </div>
</div></body></html>`}const Ue=e=>[1,3,5].map(t=>parseInt(e.slice(t,t+2),16)/255),_={RED:Ue(ce),INK:Ue("#111317"),MUT:Ue(Le),RULE:Ue("#E4E2DC"),TINT:Ue("#FFF5F5"),WHITE:[1,1,1],BG:Ue("#F5F4F0"),ZERO:Ue("#E7E8EB")},ke=612,Qn=792,j=40,je=ke-2*j;function Ae(e,t,n,s){if(e=String(e??""),ht(e,n,t)<=s)return e;for(;e.length&&ht(e+"…",n,t)>s;)e=e.slice(0,-1);return e+"…"}function Uo(e,t,n,s,o){const a=String(e).split(/\s+/),r=[];let i="";for(const c of a){const l=i?i+" "+c:c;if(ht(l,n,t)<=s?i=l:(i&&r.push(i),i=c),r.length>=o)break}return i&&r.length<o&&r.push(i),r.length===o&&(r[o-1]=Ae(r[o-1],t,n,s)),r}function Ua(e){const t=new $o(ke,Qn);let n=Qn-j;if(t.rect(j,n-6,4,36,_.RED),t.text(j+14,n+16,Ae(e.title,18,!0,330),18,!0,_.INK),t.text(j+14,n+2,Ae(e.eyebrow,8.5,!1,330),8.5,!1,_.MUT),t.rtext(ke-j,n+16,e.month,15,!0,_.RED),t.rtext(ke-j,n+3,"GERSHON.AI",8,!0,_.RED),n-=22,t.line(j,n,ke-j,_.INK,1.2),n-=50,t.rect(j,n,je,42,_.TINT),t.rect(j,n,3,42,_.RED),t.text(j+14,n+25,Ae(e.headline,12.5,!0,je-26),12.5,!0,_.INK),t.text(j+14,n+10,Ae(e.subline,8.4,!1,je-26),8.4,!1,_.INK),e.tiles.length){const s=e.tiles.length,o=9,a=(je-(s-1)*o)/s,r=60;n-=r+12,e.tiles.forEach((i,c)=>{const l=j+c*(a+o),d=i.color?Ue(i.color):_.INK;t.rect(l,n,a,r,_.WHITE),t.line(l,n,l+a,_.RULE,.6),t.line(l,n+r,l+a,_.RULE,.6),t.rect(l,n,.6,r,_.RULE),t.rect(l+a-.6,n,.6,r,_.RULE),t.rect(l,n+r-3,a,3,d),t.text(l+10,n+r-17,Ae(i.label,6.6,!0,a-16),6.6,!0,_.MUT),t.text(l+10,n+r-39,Ae(i.value,20,!0,a-16),20,!0,d),t.text(l+10,n+9,Ae(i.sub,6.6,!1,a-16),6.6,!1,_.MUT)})}if(e.daily&&e.daily.length){n-=22;const s=(e.dailyCaption||"").toUpperCase();t.text(j,n,s,7.5,!0,_.MUT),t.line(j+ht(s,!0,7.5)+8,n+2.5,ke-j,_.RULE,.5);const o=64,a=n-10-o,r=e.daily.length,i=je/r,c=Math.max(1,...e.daily.map(l=>l.posts));e.daily.forEach((l,d)=>{const p=l.posts?Math.max(2,l.posts/c*o):1.5;t.rect(j+d*i+1,a,Math.max(1,i-2),p,l.posts?_.RED:_.ZERO)}),t.text(j,a-10,e.daily[0].date.slice(5),6.5,!1,_.MUT),t.rtext(ke-j,a-10,e.daily[r-1].date.slice(5),6.5,!1,_.MUT),t.rtext(ke-j,a+o+2,`max ${c}/day`,6.5,!1,_.MUT),n=a-12}for(const s of e.sections){if(n<j+70)break;n-=22;const o=s.title.toUpperCase();if(t.text(j,n,o,7.5,!0,_.MUT),t.line(j+ht(o,!0,7.5)+8,n+2.5,ke-j,_.RULE,.5),n-=6,s.bars)for(const a of s.bars){if(n<j+40)break;n-=15;const r=Ue(a.color||tt(a.pct)),i=j+175,c=je-175-110;t.text(j,n,Ae(a.label,8,!0,168),8,!0,_.INK),t.rect(i,n-1,c,7,_.ZERO),t.rect(i,n-1,Math.max(2,Math.min(100,a.pct)/100*c),7,r),t.rtext(ke-j,n,a.value,8,!0,r)}if(s.table){const a=s.table.head.length,r=s.table.head.map((d,p)=>p===0?34:p===1?150:(je-184)/(a-2)),i=[];let c=j;r.forEach(d=>{i.push(c),c+=d});const l=(d,p,m,u,g)=>{n-=15,g&&t.rect(j,n-4,je,15,g),d.forEach((v,h)=>{var E;const b=((E=s.table.align)==null?void 0:E[h])==="r",k=Ae(v,m,p||h<=1,r[h]-6),C=h===0&&!g?_.RED:u;b?t.rtext(i[h]+r[h]-4,n,k,m,p||h<=1,C):t.text(i[h]+2,n,k,m,p||h<=1,C)}),t.line(j,n-4,ke-j,_.RULE,.4)};l(s.table.head.map(d=>d.toUpperCase()),!0,6.6,_.MUT,_.BG);for(const d of s.table.rows){if(n<j+40)break;l(d,!1,7.8,_.INK)}}if(s.lines)for(const a of s.lines){const r=Uo(a,8.4,!1,je-14,2);if(n-r.length*11<j+24)break;n-=13,t.rect(j+2,n+2.2,3.2,3.2,_.RED),r.forEach((i,c)=>{c&&(n-=11),t.text(j+12,n,i,8.4,!1,_.INK)})}}return t.line(j,j+6,ke-j,_.RULE,.5),t.text(j,j-4,Ae(e.footer,6.6,!1,420),6.6,!1,_.MUT),t.rtext(ke-j,j-4,`Generated ${new Date().toISOString().slice(0,10)}`,6.6,!1,_.MUT),t.base64()}function Bo(e){const t=atob(e),n=new Uint8Array(t.length);for(let s=0;s<t.length;s++)n[s]=t.charCodeAt(s);return n}const Ee=e=>String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");function Qt(e){const t=(o,a,r,i)=>`<a class="nav-item${e.active===i?" active":""}" href="${o}"><i class="fas ${a}"></i><span>${r}</span></a>`,n=et.map(o=>`<a class="nav-item${e.active==="c"+o.no?" active":""}" href="/client/${o.no}" style="padding:6px 12px;font-size:13px"><span class="cno" style="min-width:30px;${e.active==="c"+o.no?"color:#fff":""}">${o.no}</span><span>${Ee(o.name)}</span></a>`).join(""),s=Object.entries(e.data||{}).map(([o,a])=>` data-${o}="${Ee(a)}"`).join("");return`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow"><title>${Ee(e.title)} · client.gershonCRM</title>
<link rel="icon" type="image/svg+xml" href="/static/clients-icon.svg"><link rel="apple-touch-icon" href="/static/clients-icon.svg">
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
<link rel="stylesheet" href="/static/gershon.css?v=4"></head>
<body${s}><div class="app">
<aside class="sidebar" id="sidebar">
  <a class="brand" href="/dashboard"><span class="brand-mark">G</span><span>Gershon<span class="tag">Client results</span></span></a>
  <div class="nav-group">${t("/dashboard","fa-gauge-high","Dashboard","dashboard")}${t("/reports","fa-file-lines","Monthly reports","reports")}</div>
  <div class="nav-group"><div class="nav-group-label">Clients</div>${n}</div>
  <div class="nav-group"><div class="nav-group-label">Data</div>${t("/straightin","fa-link","Straight-in links","straightin")}${t("/settings","fa-sliders","Targets & recipients","settings")}${t("/admin","fa-gear","Admin","admin")}${t("/users","fa-user-shield","Users","users")}</div>
  <div class="nav-spacer"></div>
  <a class="nav-item" href="/api/auth/logout"><i class="fas fa-right-from-bracket"></i><span>Sign out</span></a>
  <div class="sidebar-footer">Promote · social.gershon.ai<br>Network · Straight-in<br>Engage · Streak</div>
</aside>
<main>
  <header class="topbar"><div style="display:flex;align-items:center;gap:10px"><button class="btn menu-toggle" onclick="document.getElementById('sidebar').classList.toggle('open')"><i class="fas fa-bars"></i></button><h1>${e.h1}</h1></div><div class="topbar-right">${e.right||""}</div></header>
  <div class="content">${e.body}</div>
</main></div>
<div id="toast"></div>
<script src="/static/v3.js?v=8"><\/script></body></html>`}function Ba(){return'<div class="seg" id="monthSeg"><button data-m="cur" class="active">This month</button><button data-m="last">Last month</button></div>'}function Fo(){return Qt({title:"Dashboard",active:"dashboard",h1:"Dashboard",right:Ba(),data:{page:"dashboard"},body:`
<div class="summary" id="summary"><div class="summary-text" id="summaryText"><span class="skeleton">Loading the portfolio…………………………</span></div><a class="btn primary" href="/reports"><i class="fas fa-file-lines"></i> Monthly reports</a></div>
<div class="kpi-row" id="kpis"></div>
<div id="track"></div>
<div class="card" style="padding:0;overflow:auto">
  <table class="ctable"><thead><tr><th>Client</th><th>Promote <span class="muted" id="thP" style="text-transform:none;font-weight:500"></span></th><th>Network <span class="muted" id="thN" style="text-transform:none;font-weight:500"></span></th><th>Engage <span class="muted" id="thE" style="text-transform:none;font-weight:500"></span></th><th class="hide-sm" style="text-align:center">Score</th></tr></thead>
  <tbody id="rows"></tbody></table>
</div>
<p class="muted" style="font-size:12px;margin-top:12px">Each channel is measured against its target; the score averages the channels the client has, each capped at 100%. Green ≥ 80% · amber 40–79% · red &lt; 40%. Clients are identified by their Gershon number on every platform.</p>`})}function _o(e,t,n){const s=n[0]?`<a class="btn" href="/?company=${encodeURIComponent(n[0])}"><i class="fas fa-table-list"></i> Detailed view</a>`:"";return Qt({title:`#${e} ${t}`,active:"c"+e,h1:`<span class="cno">#${e}</span> ${Ee(t)}`,data:{page:"client",no:String(e)},right:`${Ba()}<a class="btn" id="pdfBtn" href="#" target="_blank"><i class="fas fa-file-pdf"></i> Client report</a>${s}`,body:`
<div class="summary" id="summary"><div class="summary-text" id="summaryText"><span class="skeleton">Loading…………………………………</span></div><div id="scoreBox"></div></div>
<div class="grid cols-3" id="channels"></div>
<div class="grid cols-2" id="details"></div>
<div id="history"></div>`})}function Wo(e){const t=et.map(s=>`<option value="${s.no}">#${s.no} ${Ee(s.name)}</option>`).join(""),n=(s,o,a,r,i,c="")=>`
<div class="card report-card"><div class="card-header" style="margin:0"><h3><i class="fas ${o}" style="color:var(--brand)"></i> ${a}</h3></div>
<p>${r}</p><p style="font-size:12px"><b>Sent to:</b> ${i}</p>${c}
<div class="actions"><button class="btn" data-preview="${s}"><i class="fas fa-eye"></i> Preview</button><button class="btn" data-pdf="${s}"><i class="fas fa-file-pdf"></i> PDF</button><button class="btn primary" data-send="${s}"><i class="fas fa-paper-plane"></i> Send now</button></div></div>`;return Qt({title:"Monthly reports",active:"reports",h1:"Monthly reports",data:{page:"reports",lastmonth:rt()},right:`<div class="field" style="margin:0"><input type="month" id="month" value="${rt()}" max="${nt().slice(0,7)}"></div>`,body:`
<div class="summary"><div class="summary-text">Three reports are built from the same live data on the <b>1st of every month</b> for the month just closed. Each email carries the report in its body and as a one-page PDF.</div><a class="btn" href="/settings"><i class="fas fa-sliders"></i> Recipients</a></div>
<div class="grid cols-3">
${n("straightin","fa-handshake","Straight-in — leads goal & acceptance goal","For our LinkedIn provider: two equally important goals per client — "+e.leadsPerMonth+" qualified leads per LinkedIn user per month (Finance Montreal and Altavia run 2 users) and an acceptance rate above "+e.acceptTarget+"%. Shows how far each client is from each goal, in %, and ends with concrete requests for next month.",Ee(e.straightinEmail||e.internalEmail+" (to forward — add Straight-in's email in Settings)"))}
${n("internal","fa-chart-line","Gershon — our results","Portfolio score, every client against target on Promote, Network and Engage, and the sources of improvement ranked by impact.",Ee(e.internalEmail))}
${n("client","fa-star","Client — one-pager","Always positive and encouraging: wins, highlights and what comes next. One-page summary in the email, PDF attached.",e.autoSendClients?"each client's address (Settings), copy to "+Ee(e.internalEmail):Ee(e.internalEmail)+" for review before forwarding",`<div class="field" style="margin:0"><select id="clientSel">${t}</select></div>`)}
</div>
<div class="card" id="previewCard" style="display:none"><div class="card-header"><h3 id="previewTitle">Preview</h3><button class="btn" onclick="document.getElementById('previewCard').style.display='none'">Close</button></div><iframe class="preview" id="previewFrame"></iframe></div>`})}function Ko(e,t){const n=et.map(s=>`<tr><td><span class="cno">#${s.no}</span> ${Ee(s.name)}</td>
    <td><input name="pt_${s.no}" type="number" step="0.5" min="0" placeholder="${e.promoteTarget}" value="${e.promoteTargets[String(s.no)]??""}" style="width:90px;border:1px solid var(--border);border-radius:8px;padding:7px"></td>
    <td><input name="ce_${s.no}" type="text" placeholder="client@company.com" value="${Ee(e.clientEmails[String(s.no)]||"")}" style="width:100%;border:1px solid var(--border);border-radius:8px;padding:7px"></td></tr>`).join("");return Qt({title:"Targets & recipients",active:"settings",h1:"Targets & recipients",data:{page:"settings"},body:`
${t?"":'<div class="summary" style="border-left-color:var(--warn)"><div class="summary-text"><b>Email sending is not switched on yet.</b> Reports can be previewed and downloaded as PDF; sending needs the Resend key on the Cloudflare project (handoff for Charles).</div></div>'}
<form id="settingsForm">
<div class="grid cols-2">
 <div class="card"><div class="card-header"><h3>Targets</h3></div>
  <div class="field"><label>Promote — posts target</label><div style="display:flex;gap:8px"><input name="promoteTarget" type="number" step="0.5" min="0.5" value="${e.promoteTarget}" style="width:110px"><select name="promoteUnit"><option value="day"${e.promoteUnit==="day"?" selected":""}>per working day</option><option value="week"${e.promoteUnit==="week"?" selected":""}>per week</option></select></div><div class="hint">Counted from social.gershon.ai — every post published on LinkedIn or X.</div></div>
  <div class="field"><label>Network — acceptance-rate target (%)</label><input name="acceptTarget" type="number" min="1" max="100" value="${e.acceptTarget}"></div>
  <div class="field"><label>Engage — new qualified leads per LinkedIn user per month</label><input name="leadsPerMonth" type="number" min="1" value="${e.leadsPerMonth}"></div>
 </div>
 <div class="card"><div class="card-header"><h3>Report recipients</h3></div>
  <div class="field"><label>Our monthly review (internal)</label><input name="internalEmail" type="text" value="${Ee(e.internalEmail)}"></div>
  <div class="field"><label>Straight-in report</label><input name="straightinEmail" type="text" placeholder="contact@straight-in.com" value="${Ee(e.straightinEmail)}"><div class="hint">Empty = sent to the internal address so you can forward it.</div></div>
  <div class="field"><label><input name="autoSendClients" type="checkbox"${e.autoSendClients?" checked":""}> Send client reports directly to clients on the 1st</label><div class="hint">Off = client reports come to the internal address first, ready to forward.</div></div>
 </div>
</div>
<div class="card" style="padding:0;overflow:auto"><table class="ctable"><thead><tr><th>Client</th><th>Posts target (override)</th><th>Client report recipients</th></tr></thead><tbody>${n}</tbody></table></div>
<div style="margin-top:16px;display:flex;gap:10px"><button class="btn primary" type="submit"><i class="fas fa-check"></i> Save</button></div>
</form>`})}async function Jn(e,t,n,s=[]){if(!e.RESEND_API_KEY)return{ok:!1,error:"RESEND_API_KEY not configured on the Cloudflare project"};const o=((e.REPORT_FROM_EMAIL||"").match(/<([^>]+)>/)||[])[1]||(e.REPORT_FROM_EMAIL&&e.REPORT_FROM_EMAIL.includes("@")?e.REPORT_FROM_EMAIL:"reports@gershon.ai"),a=t.kind==="internal"?`GC Client Reports <${o}>`:`Gershon Consulting <${o}>`,r=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${e.RESEND_API_KEY}`,"Content-Type":"application/json"},body:JSON.stringify({from:a,to:n,bcc:s.length?s:void 0,subject:t.subject,html:ja(t),attachments:[{filename:t.filename,content:Ua(t)}]})}),i=await r.text().catch(()=>"");return r.ok?{ok:!0,id:(i.match(/"id"\s*:\s*"([^"]+)"/)||[])[1]}:{ok:!1,error:i.slice(0,300)}}const De=e=>String(e||"").split(/[,;\s]+/).map(t=>t.trim()).filter(t=>/.+@.+\..+/.test(t));function Ho(e,t){e.use("*",async(a,r)=>{if(await r(),!(a.res.headers.get("content-type")||"").includes("text/html")||a.res.headers.get("x-gc-v3"))return;const c=new URL(a.req.url).pathname;let l=await a.res.text();const d='<link rel="icon" type="image/svg+xml" href="/static/clients-icon.svg"><link rel="apple-touch-icon" href="/static/clients-icon.svg">';if(l=l.replace(/<link[^>]+rel=["'](?:shortcut )?icon["'][^>]*>/gi,""),l=l.includes("</head>")?l.replace("</head>",d+"</head>"):d+l,l.includes("/static/gershon.css")){const g=new Headers(a.res.headers);g.delete("content-length"),a.res=new Response(l,{status:a.res.status,headers:g});return}const p='<link rel="stylesheet" href="/static/gershon-theme.css?v=3">';if(l=l.includes("</head>")?l.replace("</head>",p+"</head>"):p+l,c!=="/login"&&!(c==="/"&&!new URL(a.req.url).searchParams.get("company"))){const g='<div id="gc-topnav"><span class="b">Gershon</span><a href="/dashboard">Dashboard</a><a href="/reports">Monthly reports</a><a href="/straightin">Straight-in links</a><a href="/settings">Settings</a><a href="/admin">Admin</a><a href="/users">Users</a></div>';l=l.replace(/<body([^>]*)>/i,v=>v+g)}const u=new Headers(a.res.headers);u.delete("content-length"),a.res=new Response(l,{status:a.res.status,headers:u})}),Io(e,t);const n=(a,r)=>(a.header("x-gc-v3","1"),a.html(r));e.get("/dashboard",a=>n(a,Fo())),e.get("/overview",a=>a.redirect("/dashboard",302)),e.get("/client/:no",a=>{const r=dn(a.req.param("no"));return r?n(a,_o(r.no,r.name,r.keys)):a.redirect("/dashboard",302)}),e.get("/reports",async a=>n(a,Wo(await Pe(a.env.COMPANIES_KV)))),e.get("/settings",async a=>n(a,Ko(await Pe(a.env.COMPANIES_KV),!!a.env.RESEND_API_KEY))),e.get("/api/v3/registry",async a=>{const r=await Pe(a.env.COMPANIES_KV);return a.json({clients:et,settings:r,today:nt(),lastMonth:rt(),resend:!!a.env.RESEND_API_KEY})}),e.post("/api/v3/settings",async a=>{const r=await a.req.json().catch(()=>({})),i=await ro(a.env.COMPANIES_KV,r);return await Promise.all([Ke().key,rt()].flatMap(c=>et.map(l=>a.env.COMPANIES_KV.delete(`v3:cm6:${c}:${l.no}`).catch(()=>null)))),a.json({ok:!0,settings:i})}),e.get("/api/v3/client/:no",async a=>{const r=dn(a.req.param("no"));if(!r)return a.json({error:"Unknown client number"},404);const i=Ke(a.req.query("month")).key,c=await Pe(a.env.COMPANIES_KV),l=await gn(a.env,t,r,i,{fresh:a.req.query("fresh")==="1",settings:c});return a.json({client:l,month:Ke(i),settings:c})});async function s(a,r,i,c){const l=await Pe(a.env.COMPANIES_KV),d=Ke(i);if(r==="client"){const u=dn(c||"");if(!u)return{error:"client number required"};const g=await gn(a.env,t,u,d.key,{settings:l});return jo(g,d.label,d.key)}const p=[];for(const u of et)p.push(await gn(a.env,t,u,d.key,{settings:l}));const m=xo(d,p,l);return r==="internal"?Do(m,l):Oo(m,l)}const o=a=>["straightin","internal","client"].includes(a)?a:null;e.get("/api/v3/report/:kind",async a=>{const r=o(a.req.param("kind"));if(!r)return a.json({error:"kind must be straightin, internal or client"},400);const i=await s(a,r,a.req.query("month")||rt(),a.req.query("client"));return"error"in i?a.json(i,400):a.req.query("format")==="pdf"?new Response(Bo(Ua(i)),{headers:{"Content-Type":"application/pdf","Content-Disposition":`inline; filename="${i.filename}"`}}):(a.header("x-gc-v3","1"),a.html(ja(i)))}),e.post("/api/v3/report/:kind/send",async a=>{const r=o(a.req.param("kind"));if(!r)return a.json({error:"bad kind"},400);const i=await Pe(a.env.COMPANIES_KV),c=a.req.query("client"),l=await s(a,r,a.req.query("month")||rt(),c);if("error"in l)return a.json(l,400);const d=De(i.internalEmail);let p=d,m=[];r==="straightin"&&De(i.straightinEmail).length&&(p=De(i.straightinEmail),m=d),r==="client"&&a.req.query("direct")==="1"&&c&&De(i.clientEmails[c]||"").length&&(p=De(i.clientEmails[c]),m=d);const u=await Jn(a.env,l,p,m);return a.json({...u,to:p,subject:l.subject},u.ok?200:500)}),e.post("/api/v3/monthly/run",async a=>{const r=Ke(a.req.query("month")||rt());if(r.isCurrent)return a.json({error:"month not closed yet"},400);const i=await Pe(a.env.COMPANIES_KV),c=a.req.query("no"),l=a.req.query("part"),d=c?`client-${c}`:l;if(!d||l&&!["internal","straightin"].includes(l))return a.json({error:"pass ?no=<client> or ?part=internal|straightin"},400);const p=`v3:sent:${r.key}:${d}`,m=await a.env.COMPANIES_KV.get(p);if(m&&a.req.query("force")!=="1")return a.json({ok:!0,skipped:!0,already:m});const u=c?"client":l,g=await s(a,u,r.key,c);if("error"in g)return a.json(g,400);const v=De(i.internalEmail);let h=v,b=[];if(u==="straightin"&&De(i.straightinEmail).length&&(h=De(i.straightinEmail),b=v),u==="client"&&i.autoSendClients&&c&&De(i.clientEmails[c]||"").length&&(h=De(i.clientEmails[c]),b=v),u==="client"&&!g.tiles.length)return a.json({ok:!0,skipped:!0,reason:"no activity to report"});const k=await Jn(a.env,g,h,b);return k.ok&&await a.env.COMPANIES_KV.put(p,`${new Date().toISOString()} ${k.id||""} → ${h.join(",")}`,{expirationTtl:3600*24*400}),a.json({...k,item:d,to:h,subject:g.subject},k.ok?200:500)})}const Fa="__app_users__",En="78up2kwkdki2kh",Go="https://client.gershon.ai",Ie=["olivier@attia.com","oattia@gmail.com","olivier@gershonconsulting.com","admin@gershonconsulting","admin@gershonconsulting.com"],Vo=[{id:"olivier",name:"Olivier Attia",email:"olivier@attia.com",role:"admin",linkedinEmail:"oattia@gmail.com"}],Sn=e=>String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"),oe=e=>String(e??"").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase().replace(/[^a-z0-9@.]+/g," ").trim(),Cn=()=>crypto.randomUUID().replace(/-/g,"");function Me(e){const t=new URL(e.req.url).host;return t.endsWith("gershon.ai")?Go:`https://${t}`}function hn(e){return!!e.LINKEDIN_CLIENT_SECRET}function An(e){const t=String(e??"").trim().match(/linkedin\.com\/in\/([^/?#\s]+)/i);if(!t)return null;let n=t[1];try{n=decodeURIComponent(n)}catch{}return`https://www.linkedin.com/in/${n.toLowerCase()}/`}const ea=e=>(An(e)||"").slice(28,-1);async function ze(e){try{const t=await e.get(Fa),n=t?JSON.parse(t):null;if(Array.isArray(n)&&n.length)return n}catch{}return Vo}async function Ot(e,t){await e.put(Fa,JSON.stringify(t))}function ta(e,t){const n=oe(e);if(!n)return!1;if(Ie.includes(n))return!0;const s=t.find(o=>oe(o.email)===n);return!!s&&s.role==="admin"&&(Ie.includes(oe(s.email))||Ie.includes(oe(s.linkedinEmail)))}function zo(e,t){const n=e.find(a=>a.linkedinSub&&a.linkedinSub===t.sub);if(n)return n;const s=oe(t.email);if(s){const a=e.find(r=>oe(r.email)===s||r.linkedinEmail&&oe(r.linkedinEmail)===s);if(a)return a;if(Ie.includes(s))return e.find(r=>Ie.includes(oe(r.email))||Ie.includes(oe(r.linkedinEmail)))??{id:"olivier",name:t.name||"Olivier Attia",email:s,role:"admin"}}const o=oe(t.name||[t.given_name,t.family_name].filter(Boolean).join(" "));if(o){const a=e.filter(r=>!r.linkedinSub&&!!r.linkedin&&oe(r.name)===o);if(a.length===1)return a[0]}return null}function an(e,t){const{linkedinSub:n,inviteToken:s,...o}=e;return{...o,linkedinLinked:!!n,inviteUrl:s&&!n?`${t}/login?invite=${s}`:void 0,owner:Ie.includes(oe(e.email))||Ie.includes(oe(e.linkedinEmail))}}const at=(e,t,n)=>`${e}=${t}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${n}`;function na(e,t){if(!e)return null;for(const n of e.split(";")){const[s,...o]=n.trim().split("=");if(s===t)return o.join("=")}return null}function Yo(e,t){return`<!doctype html><html><body style="margin:0;background:#fafafa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1d1d1f;">
<div style="max-width:560px;margin:0 auto;padding:28px 16px;">
  <div style="margin-bottom:18px;font-weight:800;font-size:18px;color:#FE1B04;">Gershon <span style="color:#6e6e73;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;">Client results</span></div>
  <div style="background:#fff;border:1px solid #e5e7eb;border-radius:14px;padding:24px;">
    <h1 style="margin:0 0 10px;font-size:20px;">Hi ${Sn(e.split(" ")[0])}, your access is ready</h1>
    <p style="margin:0 0 18px;font-size:15px;line-height:1.5;color:#3a3a3c;">Olivier Attia gave you access to <strong>client.gershon.ai</strong>, the Gershon Consulting client results dashboard. Sign in once with your LinkedIn account through the button below — after that, the normal “Sign in with LinkedIn” button works.</p>
    <a href="${Sn(t)}" style="display:inline-block;background:#0a66c2;color:#fff;text-decoration:none;font-weight:700;padding:12px 22px;border-radius:8px;font-size:15px;">Sign in with LinkedIn</a>
    <p style="margin:18px 0 0;font-size:12px;color:#6e6e73;">This link is personal and works once. If the button does not work, open: ${Sn(t)}</p>
  </div>
</div></body></html>`}function qo(){return`
<style>
 .u-kpis{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-bottom:18px}
 @media(max-width:700px){.u-kpis{grid-template-columns:repeat(2,minmax(0,1fr))}}
 .u-kpi{background:#fff;border:1px solid var(--border);border-radius:12px;padding:12px 16px}
 .u-kpi .l{font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--text-muted)}
 .u-kpi .v{font-size:24px;font-weight:800;letter-spacing:-.02em}
 .u-form{display:grid;grid-template-columns:1fr 1fr;gap:12px}
 @media(max-width:700px){.u-form{grid-template-columns:1fr}}
 .u-form .full{grid-column:1/-1}
 .u-form label{display:block;font-size:11px;font-weight:700;color:var(--text-muted);margin-bottom:5px}
 .u-in{width:100%;border:1px solid var(--border);border-radius:8px;padding:9px 11px;font:inherit;font-size:14px;background:#fff;box-sizing:border-box}
 .u-in:focus{outline:none;border-color:var(--brand);box-shadow:0 0 0 3px rgba(254,27,4,.12)}
 .u-row{display:flex;flex-wrap:wrap;align-items:center;gap:14px;padding:14px 18px;border-top:1px solid #f0f0f2}
 .u-av{width:40px;height:40px;border-radius:50%;object-fit:cover;flex-shrink:0;background:var(--brand);color:#fff;display:inline-flex;align-items:center;justify-content:center;font-weight:800;font-size:14px}
 .u-main{flex:1;min-width:220px}
 .u-meta{font-size:13px;color:var(--text-muted);display:flex;flex-wrap:wrap;gap:4px 14px;margin-top:2px}
 .u-pill{font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;padding:2px 8px;border-radius:999px;border:1px solid var(--border);color:var(--text-muted);background:#fff}
 .u-pill.admin{color:#a80f02;background:#fff5f5;border-color:#ffc9c2}
 .u-pill.owner{background:#1d1d1f;color:#fff;border-color:#1d1d1f}
 .u-pill.ok{color:#057642;background:#effaf3;border-color:#bfe6cd;text-transform:none;letter-spacing:0}
 .u-pill.wait{color:#8a5300;background:#fff8eb;border-color:#f5d9a6;text-transform:none;letter-spacing:0}
 .u-act{display:flex;flex-wrap:wrap;gap:6px}
 .u-act .btn{font-size:12.5px;padding:6px 10px}
 .u-msg{border-radius:8px;padding:10px 14px;font-size:14px;margin:0 0 14px;display:none}
 .u-msg.ok{display:block;background:#effaf3;border:1px solid #bfe6cd;color:#05532f}
 .u-msg.err{display:block;background:#fff5f5;border:1px solid #ffc9c2;color:#a80f02}
 .u-edit{width:100%;display:grid;grid-template-columns:1fr 1fr;gap:10px}
 @media(max-width:700px){.u-edit{grid-template-columns:1fr}}
</style>
<div id="cfgNote"></div>
<div class="u-kpis" id="kpis"></div>
<div class="card" style="margin-bottom:18px">
  <h2 style="margin:0 0 4px;font-size:16px">Create a user</h2>
  <p class="muted" style="margin:0 0 14px;font-size:13px">Paste their LinkedIn profile. They get a personal invite link — their first LinkedIn sign-in through it binds their account; after that the normal “Sign in with LinkedIn” button works.</p>
  <form id="createForm" class="u-form">
    <div class="full"><label>LinkedIn profile link *</label><input class="u-in" name="linkedin" required placeholder="https://www.linkedin.com/in/…"></div>
    <div><label>Full name *</label><input class="u-in" name="name" required placeholder="Jane Doe"></div>
    <div><label>E-mail (the invite goes here)</label><input class="u-in" name="email" type="email" placeholder="name@company.com"></div>
    <div><label>LinkedIn login e-mail, if different (optional)</label><input class="u-in" name="linkedinEmail" type="email" placeholder="optional"></div>
    <div><label>Role</label><select class="u-in" name="role"><option value="team">Team</option><option value="admin">Admin</option></select></div>
    <div class="full" style="display:flex;flex-wrap:wrap;align-items:center;gap:16px;margin-top:4px">
      <button class="btn primary" type="submit" id="createBtn"><i class="fas fa-user-plus"></i> Create user</button>
      <label style="display:inline-flex;align-items:center;gap:8px;margin:0;font-size:13px;font-weight:500;color:var(--text)"><input type="checkbox" name="send" checked style="accent-color:#FE1B04"> E-mail the invite</label>
    </div>
  </form>
</div>
<div class="u-msg" id="msg"></div>
<div class="card" style="padding:0">
  <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px;padding:14px 18px">
    <h2 style="margin:0;font-size:16px">Users</h2>
    <input class="u-in" id="q" placeholder="Search name, e-mail, LinkedIn…" style="max-width:280px">
  </div>
  <div id="list"><div class="u-row muted">Loading…</div></div>
</div>
<script>
(function(){
  var users=[], configured=true, editing=null;
  var $=function(id){return document.getElementById(id)};
  var esc=function(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
  var day=function(d){return d?new Date(d).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}):''};
  function msg(kind,text){var m=$('msg');m.className='u-msg '+kind;m.textContent=text;window.scrollTo({top:m.offsetTop-90,behavior:'smooth'})}
  function nameFromUrl(u){var m=String(u).match(/linkedin\\.com\\/in\\/([^/?#\\s]+)/i);if(!m)return'';var s=m[1];try{s=decodeURIComponent(s)}catch(e){}
    return s.split('-').filter(function(p){return p&&!/\\d/.test(p)}).map(function(p){return p[0].toUpperCase()+p.slice(1)}).join(' ')}
  function api(method,url,body){return fetch(url,{method:method,headers:{'Content-Type':'application/json'},body:body?JSON.stringify(body):undefined}).then(function(r){return r.json().then(function(d){if(!r.ok)throw new Error(d.error||'Request failed');return d})})}
  function load(){return api('GET','/api/users').then(function(d){users=d.users||[];configured=d.linkedinConfigured;render()}).catch(function(e){msg('err',e.message)})}
  function render(){
    $('cfgNote').innerHTML=configured?'':'<div class="u-msg err" style="display:block"><b>LinkedIn sign-in is not switched on yet.</b> One last setting (the LinkedIn password of this app) must be added in Cloudflare by Charles. Until then the LinkedIn button is grey. You can already add people here — their invite will work the moment it is switched on.</div>';
    var c={t:users.length,a:users.filter(function(u){return u.linkedinLinked}).length,ad:users.filter(function(u){return u.role==='admin'}).length};
    $('kpis').innerHTML=[['Users',c.t],['Signed in',c.a],['Waiting for first sign-in',c.t-c.a],['Admins',c.ad]].map(function(k){return '<div class="u-kpi"><div class="l">'+k[0]+'</div><div class="v">'+k[1]+'</div></div>'}).join('');
    var q=$('q').value.trim().toLowerCase();
    var list=users.filter(function(u){return !q||[u.name,u.email,u.linkedin,u.linkedinEmail].some(function(x){return String(x||'').toLowerCase().indexOf(q)>=0})})
      .sort(function(a,b){return (b.owner-a.owner)||a.name.localeCompare(b.name)});
    $('list').innerHTML=list.length?list.map(row).join(''):'<div class="u-row muted">No user matches.</div>';
  }
  function row(u){
    if(editing===u.id){return '<div class="u-row"><div class="u-edit" data-id="'+esc(u.id)+'">'+
      ['name','email','linkedin','linkedinEmail'].map(function(f){return '<div><label style="font-size:11px;font-weight:700;color:var(--text-muted)">'+{name:'Full name',email:'E-mail',linkedin:'LinkedIn profile link',linkedinEmail:'LinkedIn login e-mail'}[f]+'</label><input class="u-in" data-f="'+f+'" value="'+esc(u[f]||'')+'"></div>'}).join('')+
      '<div><label style="font-size:11px;font-weight:700;color:var(--text-muted)">Role</label><select class="u-in" data-f="role"><option value="team"'+(u.role==='team'?' selected':'')+'>Team</option><option value="admin"'+(u.role==='admin'?' selected':'')+'>Admin</option></select></div>'+
      '<div style="display:flex;align-items:flex-end;gap:8px"><button class="btn primary" data-a="save" data-id="'+esc(u.id)+'">Save</button><button class="btn" data-a="cancel">Cancel</button></div></div></div>'}
    var ini=(u.name||'?').split(/\\s+/).slice(0,2).map(function(p){return p[0]}).join('').toUpperCase();
    var av=u.picture?'<img class="u-av" src="'+esc(u.picture)+'" referrerpolicy="no-referrer" alt="">':'<span class="u-av">'+esc(ini)+'</span>';
    var st=u.linkedinLinked?'<span class="u-pill ok">Active'+(u.lastLogin?' · last sign-in '+day(u.lastLogin):'')+'</span>':'<span class="u-pill wait">'+(u.invitedAt?'Invited '+day(u.invitedAt)+' · ':'')+'not signed in yet</span>';
    var acts='';
    if(!u.linkedinLinked){acts+='<button class="btn" data-a="copy" data-id="'+esc(u.id)+'"><i class="fas fa-link"></i> Copy invite link</button>';if(u.email)acts+='<button class="btn" data-a="mail" data-id="'+esc(u.id)+'"><i class="fas fa-envelope"></i> E-mail invite</button>'}
    else if(!u.owner)acts+='<button class="btn" data-a="reset" data-id="'+esc(u.id)+'">Reset LinkedIn</button>';
    acts+='<button class="btn" data-a="edit" data-id="'+esc(u.id)+'">Edit</button>';
    if(!u.owner)acts+='<button class="btn" data-a="del" data-id="'+esc(u.id)+'" style="color:var(--text-muted)">Remove</button>';
    return '<div class="u-row">'+av+'<div class="u-main"><div style="display:flex;flex-wrap:wrap;align-items:center;gap:6px"><b>'+esc(u.name)+'</b><span class="u-pill '+(u.role==='admin'?'admin':'')+'">'+u.role+'</span>'+(u.owner?'<span class="u-pill owner">owner</span>':'')+st+'</div>'+
      '<div class="u-meta">'+(u.email?'<span>'+esc(u.email)+'</span>':'')+(u.linkedin?'<a href="'+esc(u.linkedin)+'" target="_blank" rel="noreferrer" style="color:#0a66c2">LinkedIn profile ↗</a>':'<span style="color:#8a5300">No LinkedIn profile</span>')+(u.linkedinEmail&&u.linkedinEmail!==u.email?'<span>LinkedIn: '+esc(u.linkedinEmail)+'</span>':'')+'</div></div><div class="u-act">'+acts+'</div></div>';
  }
  function copy(t){(navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(function(){msg('ok','Invite link copied.')},function(){window.prompt('Copy this invite link',t)})}
  function byId(id){return users.find(function(u){return u.id===id})}
  $('q').addEventListener('input',render);
  $('createForm').linkedin.addEventListener('input',function(e){var f=$('createForm');if(!f.name.dataset.touched)f.name.value=nameFromUrl(e.target.value)});
  $('createForm').name.addEventListener('input',function(e){e.target.dataset.touched='1'});
  $('createForm').addEventListener('submit',function(e){e.preventDefault();var f=e.target,b=$('createBtn');b.disabled=true;
    var body={linkedin:f.linkedin.value,name:f.name.value,email:f.email.value,linkedinEmail:f.linkedinEmail.value,role:f.role.value};
    api('POST','/api/users',body).then(function(d){
      if(f.send.checked&&body.email){return api('POST','/api/users/invite',{id:d.user.id,send:true}).then(function(){return d.user.name+' created — invite e-mailed to '+body.email+'.'},function(er){return d.user.name+' created — e-mail not sent ('+er.message+'). Copy the invite link below.'})}
      return d.user.name+' created — copy the invite link below and send it to them.'
    }).then(function(t){msg('ok',t);f.reset();delete f.name.dataset.touched;return load()}).catch(function(er){msg('err',er.message)}).then(function(){b.disabled=false})});
  $('list').addEventListener('click',function(e){var b=e.target.closest('[data-a]');if(!b)return;var a=b.dataset.a,id=b.dataset.id,u=byId(id);
    if(a==='copy'){if(u.inviteUrl)copy(u.inviteUrl);else api('POST','/api/users/invite',{id:id}).then(function(d){copy(d.inviteUrl);load()}).catch(function(er){msg('err',er.message)})}
    if(a==='mail')api('POST','/api/users/invite',{id:id,send:true}).then(function(){msg('ok','Invite e-mailed to '+u.email+'.');load()}).catch(function(er){msg('err',er.message)});
    if(a==='reset'&&confirm('Reset '+u.name+"'s LinkedIn link? They will need a new invite to sign in."))api('PATCH','/api/users',{id:id,unlink:true}).then(function(){msg('ok',u.name+"'s LinkedIn link reset — a new invite link is ready.");load()}).catch(function(er){msg('err',er.message)});
    if(a==='del'&&confirm('Remove '+u.name+'? They will no longer be able to sign in.'))api('DELETE','/api/users?id='+encodeURIComponent(id)).then(function(){msg('ok',u.name+' removed.');load()}).catch(function(er){msg('err',er.message)});
    if(a==='edit'){editing=id;render()}
    if(a==='cancel'){editing=null;render()}
    if(a==='save'){var box=b.closest('.u-edit'),body={id:id};box.querySelectorAll('[data-f]').forEach(function(i){body[i.dataset.f]=i.value});
      api('PATCH','/api/users',body).then(function(){editing=null;msg('ok','Saved.');load()}).catch(function(er){msg('err',er.message)})}
  });
  load();
})();
<\/script>`}function Zo(e,t,n){const s=(a,r,i)=>{const c=new URL("/login",Me(a));c.searchParams.set("li_error",r),i&&c.searchParams.set("detail",i.slice(0,160));const l=new Headers({Location:c.toString()});return l.append("Set-Cookie",at("li_state","",0)),l.append("Set-Cookie",at("li_invite","",0)),new Response(null,{status:302,headers:l})};e.get("/api/auth/linkedin/health",a=>a.json({site:Me(a),redirectUri:`${Me(a)}/api/auth/linkedin/callback`,clientId:a.env.LINKEDIN_CLIENT_ID||`${En} (default)`,clientSecretConfigured:hn(a.env)})),e.get("/api/auth/linkedin/login",a=>{if(!hn(a.env))return s(a,"not_configured");const r=crypto.randomUUID(),i=a.req.query("next")||"/dashboard",c=i.startsWith("/")&&!i.startsWith("//")?i:"/dashboard",l=(a.req.query("invite")||"").replace(/[^a-zA-Z0-9-]/g,"").slice(0,64),d=new URL("https://www.linkedin.com/oauth/v2/authorization");d.searchParams.set("response_type","code"),d.searchParams.set("client_id",a.env.LINKEDIN_CLIENT_ID||En),d.searchParams.set("redirect_uri",`${Me(a)}/api/auth/linkedin/callback`),d.searchParams.set("scope","openid profile email"),d.searchParams.set("state",r);const p=new Headers({Location:d.toString()});return p.append("Set-Cookie",at("li_state",r+"|"+encodeURIComponent(c),600)),l&&p.append("Set-Cookie",at("li_invite",l,600)),new Response(null,{status:302,headers:p})}),e.get("/api/auth/linkedin/callback",async a=>{if(a.req.query("error"))return s(a,"cancelled",a.req.query("error_description")||"");const r=a.req.query("code"),i=a.req.query("state"),c=a.req.header("Cookie"),[l,d]=(na(c,"li_state")||"").split("|");if(!r||!i||!l||i!==l)return s(a,"state");const p=a.env.LINKEDIN_CLIENT_SECRET;if(!p)return s(a,"not_configured");const m=await fetch("https://www.linkedin.com/oauth/v2/accessToken",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({grant_type:"authorization_code",code:r,redirect_uri:`${Me(a)}/api/auth/linkedin/callback`,client_id:a.env.LINKEDIN_CLIENT_ID||En,client_secret:p})});if(!m.ok)return s(a,"token",await m.text().catch(()=>""));const{access_token:u}=await m.json();if(!u)return s(a,"token");const g=await fetch("https://api.linkedin.com/v2/userinfo",{headers:{Authorization:`Bearer ${u}`}});if(!g.ok)return s(a,"userinfo",await g.text().catch(()=>""));const v=await g.json();if(!v.sub)return s(a,"userinfo");const h=a.env.COMPANIES_KV,b=await ze(h),k=na(c,"li_invite"),C=k?b.find(f=>f.inviteToken&&f.inviteToken===k&&(!f.linkedinSub||f.linkedinSub===v.sub)):void 0,E=b.find(f=>f.linkedinSub===v.sub),w=(C&&(!E||E.id===C.id)?C:null)??zo(b,v);if(!w)return s(a,"not_registered",v.name||v.email||"");try{const f=new Date().toISOString(),I={...w,linkedinSub:v.sub,linkedinEmail:w.linkedinEmail||v.email||void 0,lastLogin:f,picture:v.picture||w.picture,inviteToken:void 0},A=b.some(H=>H.id===w.id);await Ot(h,A?b.map(H=>H.id===w.id?I:H):[...b,I])}catch{}const S=w.email||v.email||w.id,R=await t.createSessionToken(a.env,S);let U="/dashboard";try{const f=decodeURIComponent(d||"");f.startsWith("/")&&!f.startsWith("//")&&(U=f)}catch{}const T=new Headers({Location:new URL(U,Me(a)).toString()});return T.append("Set-Cookie",at(t.sessionCookie,R,t.sessionTtl)),T.append("Set-Cookie",at("li_state","",0)),T.append("Set-Cookie",at("li_invite","",0)),new Response(null,{status:302,headers:T})});const o=async a=>{const r=await t.sessionUser(a);return r?ta(r,await ze(a.env.COMPANIES_KV))?r:a.json({error:"Only Olivier (owner) can manage users"},403):a.json({error:"Not signed in"},401)};e.get("/users",async a=>{const r=await t.sessionUser(a);return!r||!ta(r,await ze(a.env.COMPANIES_KV))?a.redirect("/dashboard",302):(a.header("x-gc-v3","1"),a.html(n(qo())))}),e.get("/api/users",async a=>{const r=await o(a);if(r instanceof Response)return r;const i=await ze(a.env.COMPANIES_KV);return a.json({users:i.map(c=>an(c,Me(a))),linkedinConfigured:hn(a.env)})}),e.post("/api/users",async a=>{const r=await o(a);if(r instanceof Response)return r;const i=await a.req.json().catch(()=>({})),c=An(i.linkedin);if(!c)return a.json({error:"Paste the LinkedIn profile link (https://www.linkedin.com/in/…)"},400);const l=String(i.name??"").trim();if(!l)return a.json({error:"Full name is required"},400);const d=String(i.email??"").trim().toLowerCase();if(d&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d))return a.json({error:"E-mail looks wrong"},400);const p=a.env.COMPANIES_KV,m=await ze(p),u=m.find(h=>h.linkedin&&ea(h.linkedin)===ea(c)||d&&oe(h.email)===d);if(u)return a.json({error:`${u.name} already has this ${d&&oe(u.email)===d?"e-mail":"LinkedIn profile"}`},409);const g=new Date().toISOString(),v={id:(oe(l).replace(/[^a-z0-9]+/g,"-")||"user")+"-"+Date.now().toString(36),name:l,email:d,role:i.role==="admin"?"admin":"team",linkedin:c,linkedinEmail:String(i.linkedinEmail??"").trim().toLowerCase()||void 0,inviteToken:Cn(),invitedAt:g,createdAt:g};return await Ot(p,[...m,v]),a.json({ok:!0,user:an(v,Me(a))})}),e.patch("/api/users",async a=>{const r=await o(a);if(r instanceof Response)return r;const i=await a.req.json().catch(()=>({})),c=a.env.COMPANIES_KV,l=await ze(c),d=l.findIndex(g=>g.id===i.id);if(d<0)return a.json({error:"User not found"},404);const p={...l[d]};if(i.name!==void 0){const g=String(i.name).trim();if(!g)return a.json({error:"Name cannot be empty"},400);p.name=g}if(i.email!==void 0&&(p.email=String(i.email).trim().toLowerCase()),i.linkedinEmail!==void 0&&(p.linkedinEmail=String(i.linkedinEmail).trim().toLowerCase()||void 0),i.linkedin!==void 0&&String(i.linkedin).trim()){const g=An(i.linkedin);if(!g)return a.json({error:"Not a LinkedIn profile link"},400);p.linkedin=g}if(i.role!==void 0&&(p.role=i.role==="admin"?"admin":"team"),i.unlink&&(p.linkedinSub=void 0,p.inviteToken=Cn(),p.invitedAt=new Date().toISOString()),(Ie.includes(oe(l[d].email))||Ie.includes(oe(l[d].linkedinEmail)))&&p.role!=="admin")return a.json({error:"The owner stays admin"},400);const u=[...l];return u[d]=p,await Ot(c,u),a.json({ok:!0,user:an(p,Me(a))})}),e.delete("/api/users",async a=>{const r=await o(a);if(r instanceof Response)return r;const i=a.req.query("id"),c=a.env.COMPANIES_KV,l=await ze(c),d=l.find(p=>p.id===i);return d?Ie.includes(oe(d.email))||Ie.includes(oe(d.linkedinEmail))?a.json({error:"The owner cannot be removed"},400):(await Ot(c,l.filter(p=>p.id!==i)),a.json({ok:!0})):a.json({error:"User not found"},404)}),e.post("/api/users/invite",async a=>{const r=await o(a);if(r instanceof Response)return r;const i=await a.req.json().catch(()=>({})),c=a.env.COMPANIES_KV,l=await ze(c),d=l.findIndex(g=>g.id===i.id);if(d<0)return a.json({error:"User not found"},404);const p={...l[d]};if(p.linkedinSub)return a.json({error:`${p.name} already signs in with LinkedIn — use "Reset LinkedIn" first`},409);(!p.inviteToken||i.regenerate)&&(p.inviteToken=Cn(),p.invitedAt=new Date().toISOString());const m=[...l];m[d]=p,await Ot(c,m);const u=`${Me(a)}/login?invite=${p.inviteToken}`;if(i.send){if(!p.email)return a.json({error:"This user has no e-mail — copy the link instead"},400);if(!a.env.RESEND_API_KEY)return a.json({error:"E-mail is not configured — copy the link instead"},500);const g=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${a.env.RESEND_API_KEY}`,"Content-Type":"application/json"},body:JSON.stringify({from:"Gershon Consulting <reports@gershon.ai>",to:[p.email],reply_to:"olivier@gershonconsulting.com",subject:"Your access to Gershon client results",html:Yo(p.name,u)})});if(!g.ok)return a.json({error:"E-mail failed: "+(await g.text()).slice(0,200)},502)}return a.json({ok:!0,sent:!!i.send,inviteUrl:u,user:an(p,Me(a))})})}const $=new Na;let Ln="";$.use("*",async(e,t)=>{Ln=e.env.SOCIAL_PROMOTE_KEY||"",await t()});$.use("/api/*",qs());$.use("*",async(e,t)=>{try{const n=await e.env.COMPANIES_KV.get("__streak_api_key__");n&&e.env.ENCRYPTION_KEY?fn=await za(n,e.env.ENCRYPTION_KEY):e.env.STREAK_API_KEY&&(fn=e.env.STREAK_API_KEY)}catch{e.env.STREAK_API_KEY&&(fn=e.env.STREAK_API_KEY)}await t()});$.use("*",async(e,t)=>{const n=new URL(e.req.url).pathname;if(ar(n))return t();const s=Rn(e.req.header("Cookie"),Pt),o=s?await Pn(e.env,s):null;if(!o){if(n.startsWith("/api/"))return e.json({error:"Unauthorized"},401);const a=encodeURIComponent(n+(new URL(e.req.url).search||""));return e.redirect(`/login?next=${a}`,302)}e.set("authUser",o),await t()});const Xo={not_registered:"This LinkedIn account has no access yet. Ask Olivier to add you — he will send you an invite link.",cancelled:"LinkedIn sign-in was cancelled.",state:"The sign-in took too long or was opened in another tab. Please try again.",token:"LinkedIn refused the sign-in. Please try again.",userinfo:"LinkedIn did not return your profile. Please try again.",not_configured:"LinkedIn sign-in is being activated. Use your e-mail and password for now."};$.get("/login",e=>{const t=e.req.query("next")||"/",n=e.req.query("li_error"),s=e.req.query("error")==="1"?"Incorrect email or password.":n?(Xo[n]||"Sign-in failed. Please try again.")+(n==="not_registered"&&e.req.query("detail")?` (LinkedIn account: ${String(e.req.query("detail")).replace(/[<>&"]/g,"")})`:""):void 0,o=(e.req.query("invite")||"").replace(/[^a-zA-Z0-9-]/g,"").slice(0,64);return e.html(ir(t,s,o,hn(e.env)))});$.get("/favicon.ico",e=>e.redirect("/static/clients-icon.svg",301));$.post("/api/auth/login",async e=>{let t="",n="",s="/",o=!1;if((e.req.header("Content-Type")||"").includes("application/json")){o=!0;const g=await e.req.json().catch(()=>({}));t=String(g.email||""),n=String(g.password||""),s=String(g.next||"/")}else{const g=await e.req.parseBody();t=String(g.email||""),n=String(g.password||""),s=String(g.next||"/")}const r=sr(e.env),i=r[0],c=(e.env.AUTH_PASSWORD_HASH||_a).toLowerCase(),l=await or(n);if(!(r.includes(t.trim().toLowerCase())&&Ha(l,c)))return o?e.json({error:"Invalid credentials"},401):e.redirect(`/login?error=1&next=${encodeURIComponent(s)}`,302);const m=await Ga(e.env,i);e.header("Set-Cookie",`${Pt}=${m}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${Nn}`);const u=s.startsWith("/")&&!s.startsWith("//")?s:"/";return o?e.json({ok:!0,redirect:u}):e.redirect(u,302)});$.all("/api/auth/logout",e=>(e.header("Set-Cookie",`${Pt}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`),e.redirect("/login",302)));$.use("/static/*",oo({root:"./public"}));Ho($,{callStreakAPI:e=>z(e),socialFetch:e=>gt(e),getCompany:(e,t)=>Ge(e,t),classifyStage:e=>Tn(e)});let fn="";const Qo="https://www.streak.com/api/v1",aa="https://social.gershoncrm.com";function gt(e){const[t,n=""]=e.split("?"),s=t.endsWith("/api/clients")?"clients":t.endsWith("/api/analytics/summary")?"summary":t.endsWith("/api/followers")?"followers":"";if(!s||!Ln)return fetch(`${aa}${e}`);const o=new URLSearchParams(n);return o.delete("light"),o.set("resource",s),fetch(`${aa}/api/report/promote?${o.toString()}`,{headers:{Authorization:`Bearer ${Ln}`}})}const Jo=["oattia@gmail.com","olivier@gershonconsulting.com","aina.andriamangason@gmail.com","winnielauren3@gmail.com","zakaria.omahdi@mabsilico.com"],er="admin@gershonconsulting",_a="08a8efbf4b670e4792692a590ef3096e0365b793d9c13cb6f24fcea9c41200f5",Pt="gcrm_session",Nn=3600*12,tr=["/login","/api/auth/","/static/","/favicon","/api/chat/"],nr=["/","/api/reports/weekly/send","/api/reports/monthly/send","/api/v3/monthly/run"];function ar(e){return nr.includes(e)?!0:tr.some(t=>e.startsWith(t))}function sr(e){const t=(e.AUTH_USER||er).trim().toLowerCase(),n=[t],s=t.lastIndexOf("@");if(s>0){const o=t.slice(0,s),a=t.slice(s+1);a.includes(".")?a.endsWith(".com")&&n.push(`${o}@${a.slice(0,-4)}`):n.push(`${o}@${a}.com`)}return n}async function or(e){const t=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(e));return Array.from(new Uint8Array(t)).map(n=>n.toString(16).padStart(2,"0")).join("")}function Wa(e){return e.SESSION_SECRET||e.ENCRYPTION_KEY||e.AUTH_PASSWORD_HASH||_a}async function Ka(e,t){const n=new TextEncoder,s=await crypto.subtle.importKey("raw",n.encode(e),{name:"HMAC",hash:"SHA-256"},!1,["sign"]),o=await crypto.subtle.sign("HMAC",s,n.encode(t));return Array.from(new Uint8Array(o)).map(a=>a.toString(16).padStart(2,"0")).join("")}function Ha(e,t){if(e.length!==t.length)return!1;let n=0;for(let s=0;s<e.length;s++)n|=e.charCodeAt(s)^t.charCodeAt(s);return n===0}async function Ga(e,t){const s=`${Date.now()+Nn*1e3}|${t}`,o=await Ka(Wa(e),s);return`${btoa(s).replace(/=+$/,"")}.${o}`}async function Pn(e,t){try{const[n,s]=t.split(".");if(!n||!s)return null;const o=atob(n),a=await Ka(Wa(e),o);if(!Ha(s,a))return null;const[r,i]=o.split("|");return!r||Number(r)<Date.now()?null:i||null}catch{return null}}function Rn(e,t){if(!e)return null;for(const n of e.split(";")){const[s,...o]=n.trim().split("=");if(s===t)return o.join("=")}return null}Zo($,{createSessionToken:(e,t)=>Ga(e,t),sessionUser:async e=>{const t=Rn(e.req.header("Cookie"),Pt);return t?Pn(e.env,t):null},sessionCookie:Pt,sessionTtl:Nn},e=>Qt({title:"Users",active:"users",h1:'Users <span class="muted" style="font-size:13px;font-weight:500">who can sign in with LinkedIn</span>',body:e}));function rr(){const e=(n,s,o,a)=>`
    <div class="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div class="w-11 h-11 rounded-xl ${s} flex items-center justify-center mb-4">
        <i class="fas ${n} text-white"></i>
      </div>
      <h3 class="font-bold text-gray-900 mb-2">${o}</h3>
      <p class="text-sm text-gray-600 leading-relaxed">${a}</p>
    </div>`,t=(n,s,o)=>`
    <div class="relative">
      <div class="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center mb-4">${n}</div>
      <h3 class="font-bold text-gray-900 mb-2">${s}</h3>
      <p class="text-sm text-gray-600 leading-relaxed">${o}</p>
    </div>`;return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex, nofollow">
  <title>client.gershonCRM — Client Performance Dashboard</title>
  <meta name="description" content="One live view of every campaign Gershon Consulting runs for a client: social reach, LinkedIn network growth, and meetings booked.">
  <script src="https://cdn.tailwindcss.com"><\/script>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
</head>
<body class="bg-white text-gray-900 antialiased">

  <!-- Nav -->
  <header class="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-gray-100">
    <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
      <div class="flex items-center gap-2.5">
        <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
          <i class="fas fa-chart-line text-white text-sm"></i>
        </div>
        <span class="font-bold tracking-tight">client.gershonCRM</span>
      </div>
      <nav class="flex items-center gap-6 text-sm">
        <a href="#how" class="hidden sm:block text-gray-600 hover:text-gray-900">How it works</a>
        <a href="#channels" class="hidden sm:block text-gray-600 hover:text-gray-900">Channels</a>
        <a href="/login" class="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-medium transition-colors">Sign in</a>
      </nav>
    </div>
  </header>

  <!-- Hero -->
  <section class="relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50"></div>
    <div class="relative max-w-6xl mx-auto px-6 pt-20 pb-24 text-center">
      <span class="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 bg-blue-100 px-3 py-1.5 rounded-full mb-6">
        <i class="fas fa-lock text-[10px]"></i>Gershon Consulting — client reporting
      </span>
      <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.1] max-w-3xl mx-auto">
        Every campaign you run for a client — on one page.
      </h1>
      <p class="mt-6 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Social reach, LinkedIn network growth and meetings booked all live in different tools.
        This dashboard pulls the three together, per client, and answers the only question that
        matters on a review call: is it working?
      </p>
      <div class="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
        <a href="/login" class="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-7 py-3.5 rounded-xl shadow-lg transition-all">
          Open your dashboard
        </a>
        <a href="#how" class="bg-white border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold px-7 py-3.5 rounded-xl transition-colors">
          See what's inside →
        </a>
      </div>
      <p class="mt-5 text-xs text-gray-400">Private platform — access is by account only.</p>
    </div>
  </section>

  <!-- Channels -->
  <section id="channels" class="py-20 border-t border-gray-100">
    <div class="max-w-6xl mx-auto px-6">
      <h2 class="text-3xl font-extrabold tracking-tight text-center">Three channels, one scoreboard</h2>
      <p class="mt-4 text-gray-600 text-center max-w-2xl mx-auto">
        Each client campaign runs across three motions. The dashboard scores all three side by side,
        so a channel that has gone quiet is obvious at a glance.
      </p>
      <div class="mt-12 grid md:grid-cols-3 gap-6">
        ${e("fa-bullhorn","bg-orange-500","Promote","Posts published, impressions, reach and follower growth — the top of the funnel. Measured as posts per day against target.")}
        ${e("fa-users","bg-blue-500","Network","Connection requests sent and accepted, messages, InMails, page invites and profile visits. Measured as acceptance rate.")}
        ${e("fa-handshake","bg-green-500","Engage","Leads and meetings landing in the pipeline — the outcome the client actually pays for. Measured against the monthly meetings goal.")}
      </div>
    </div>
  </section>

  <!-- How it works -->
  <section id="how" class="py-20 bg-gray-50 border-y border-gray-100">
    <div class="max-w-6xl mx-auto px-6">
      <h2 class="text-3xl font-extrabold tracking-tight text-center">How it works</h2>
      <div class="mt-12 grid md:grid-cols-3 gap-10">
        ${t("1","Connect the sources","Each client is configured once with its pipeline and its reporting links. No manual data entry after that.")}
        ${t("2","Data refreshes itself","The platform reads each source directly and recomputes every metric on load — no stale spreadsheet, no copy-paste.")}
        ${t("3","Report and decide","Open one client for the full breakdown, or the overview for every client at once. Export or email the weekly and monthly reports.")}
      </div>
    </div>
  </section>

  <!-- Where the data comes from -->
  <section class="py-20">
    <div class="max-w-6xl mx-auto px-6">
      <h2 class="text-3xl font-extrabold tracking-tight text-center">Where the numbers come from</h2>
      <p class="mt-4 text-gray-600 text-center max-w-2xl mx-auto">Every figure traces back to a named source. Nothing is estimated.</p>
      <div class="mt-12 max-w-3xl mx-auto divide-y divide-gray-100 border border-gray-200 rounded-2xl overflow-hidden">
        <div class="flex items-center gap-4 p-5 bg-white">
          <div class="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center shrink-0"><i class="fas fa-bullhorn text-orange-500"></i></div>
          <div><p class="font-semibold">Promote</p><p class="text-sm text-gray-600">Collected from social.gershonCRM.com</p></div>
        </div>
        <div class="flex items-center gap-4 p-5 bg-white">
          <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0"><i class="fas fa-users text-blue-500"></i></div>
          <div><p class="font-semibold">Network</p><p class="text-sm text-gray-600">Campaign reports supplied each week, per client</p></div>
        </div>
        <div class="flex items-center gap-4 p-5 bg-white">
          <div class="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center shrink-0"><i class="fas fa-handshake text-green-500"></i></div>
          <div><p class="font-semibold">Engage</p><p class="text-sm text-gray-600">Read live from the Streak CRM pipeline</p></div>
        </div>
      </div>
    </div>
  </section>

  <!-- Also inside -->
  <section class="py-20 bg-gray-50 border-y border-gray-100">
    <div class="max-w-6xl mx-auto px-6">
      <h2 class="text-3xl font-extrabold tracking-tight text-center">Also inside</h2>
      <div class="mt-12 grid md:grid-cols-3 gap-6">
        ${e("fa-th-large","bg-indigo-500","Cross-client overview","Every client as a scored card — leads against goal, plus the three channel columns. Spot the account that needs attention before the client calls.")}
        ${e("fa-rocket","bg-purple-500","Onboarding tracker","Where each new client sits in setup, so nothing stalls silently between signature and first campaign.")}
        ${e("fa-envelope-open-text","bg-teal-500","Weekly & monthly reports","Generated from the same live data and sent by email — the client review writes itself.")}
      </div>
    </div>
  </section>

  <!-- Access -->
  <section class="py-20">
    <div class="max-w-3xl mx-auto px-6 text-center">
      <div class="w-14 h-14 rounded-2xl bg-gray-900 flex items-center justify-center mx-auto mb-6">
        <i class="fas fa-shield-halved text-white text-xl"></i>
      </div>
      <h2 class="text-3xl font-extrabold tracking-tight">Client data, kept in-house</h2>
      <p class="mt-4 text-gray-600 leading-relaxed">
        This platform holds live commercial data for every client on the books. It sits behind a
        sign-in, sessions expire, and it is excluded from search engines. Access is granted per person —
        there is no public sign-up.
      </p>
      <a href="/login" class="inline-block mt-8 bg-gray-900 hover:bg-gray-800 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors">
        Sign in →
      </a>
    </div>
  </section>

  <!-- Footer -->
  <footer class="border-t border-gray-100 py-10">
    <div class="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
      <p>Client performance reporting for Gershon Consulting.</p>
      <div class="flex items-center gap-6">
        <a href="mailto:tools@gershonconsulting.com" class="hover:text-gray-900">tools@gershonconsulting.com</a>
        <a href="/login" class="hover:text-gray-900">Sign in</a>
      </div>
    </div>
    <p class="text-center text-xs text-gray-400 mt-6">Gershon Consulting — Internal Use Only</p>
  </footer>

</body>
</html>`}function ir(e,t,n="",s=!0){const o="/api/auth/linkedin/login?next="+encodeURIComponent(e==="/"?"/dashboard":e)+(n?"&invite="+n:"");return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex, nofollow">
  <title>Sign in — client.gershonCRM</title>
  <link rel="icon" type="image/svg+xml" href="/static/clients-icon.svg">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
  <link rel="stylesheet" href="/static/gershon.css?v=3">
  <style>
    .login-wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;background:linear-gradient(135deg,#fff5f5,#fafafa 55%)}
    .login{width:100%;max-width:400px}
    .login .card{padding:28px}
    .login input{width:100%;border:1px solid var(--border);border-radius:8px;padding:11px 12px;font:inherit;background:#fff}
    .login input:focus{outline:none;border-color:var(--brand);box-shadow:0 0 0 3px rgba(254,27,4,.12)}
    .login label{display:block;font-size:12px;font-weight:700;margin:0 0 6px}
    .login .btn.primary{width:100%;justify-content:center;padding:12px;font-size:14px;margin-top:6px}
    .login .li-btn{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;box-sizing:border-box;background:#0a66c2;color:#fff;font-weight:700;font-size:15px;padding:12px;border-radius:8px;text-decoration:none}
    .login .li-btn:hover{background:#004182}
    .login .li-btn.off{background:#9bb7d4;pointer-events:none}
    .login .or{display:flex;align-items:center;gap:10px;color:var(--text-muted);font-size:12px;margin:18px 0}
    .login .or:before,.login .or:after{content:"";flex:1;height:1px;background:var(--border)}
    .login .inv{background:#eef5fc;border:1px solid #c7dcf2;color:#0a4a8c;border-radius:8px;padding:10px 12px;font-size:13px;margin-bottom:14px}
    .login .err{background:var(--error-light);color:var(--error);border-radius:8px;padding:10px 12px;font-size:13px;margin-bottom:14px}
  </style>
</head>
<body>
  <div class="login-wrap"><div class="login">
    <div style="display:flex;align-items:center;gap:10px;justify-content:center;margin-bottom:22px">
      <img src="/static/clients-icon.svg" alt="" width="42" height="42">
      <div><div style="font-weight:800;font-size:21px;color:var(--brand);letter-spacing:-.02em;line-height:1">Gershon</div><div style="font-size:11px;font-weight:700;color:var(--text-muted);letter-spacing:.08em;text-transform:uppercase">Client results</div></div>
    </div>
    <div class="card">
      ${t?`<div class="err"><i class="fas fa-circle-exclamation"></i> ${t}</div>`:""}
      ${n?'<div class="inv"><b>You have been invited.</b> Sign in with LinkedIn once on this page to activate your access.</div>':""}
      <a class="li-btn${s?"":" off"}" href="${o}"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><rect width="24" height="24" rx="4" fill="#fff"/><path fill="#0a66c2" d="M6.94 8.5H4.3V19h2.64zM5.62 4.5a1.53 1.53 0 1 0 0 3.06 1.53 1.53 0 0 0 0-3.06zM19.7 13.1c0-2.83-1.5-4.15-3.52-4.15a3.04 3.04 0 0 0-2.75 1.51V8.5h-2.53V19h2.64v-5.2c0-1.37.26-2.7 1.96-2.7 1.67 0 1.7 1.57 1.7 2.79V19h2.5z"/></svg>${s?"Sign in with LinkedIn":"LinkedIn sign-in — being activated"}</a>
      <div class="or">or with e-mail and password</div>
      <form method="POST" action="/api/auth/login">
        <input type="hidden" name="next" value="${e.replace(/"/g,"&quot;")}" />
        <div style="margin-bottom:14px"><label for="email">Email address</label>
          <input id="email" name="email" type="text" inputmode="email" autocapitalize="none" spellcheck="false" autocomplete="username" required autofocus /></div>
        <div style="margin-bottom:16px"><label for="password">Password</label>
          <input id="password" name="password" type="password" autocomplete="current-password" required /></div>
        <button type="submit" class="btn primary">Sign in</button>
      </form>
    </div>
    <p style="text-align:center;font-size:12px;color:var(--text-muted);margin-top:16px">Gershon Consulting — internal use only</p>
  </div></div>
</body>
</html>`}async function Va(e){const t=new TextEncoder,n=await crypto.subtle.digest("SHA-256",t.encode(e));return crypto.subtle.importKey("raw",n,{name:"AES-GCM"},!1,["encrypt","decrypt"])}async function lr(e,t){const n=new TextEncoder,s=await Va(t),o=crypto.getRandomValues(new Uint8Array(12)),a=await crypto.subtle.encrypt({name:"AES-GCM",iv:o},s,n.encode(e)),r=new Uint8Array(o.length+new Uint8Array(a).length);r.set(o),r.set(new Uint8Array(a),o.length);let i="";for(let c=0;c<r.length;c++)i+=String.fromCharCode(r[c]);return btoa(i)}async function za(e,t){const n=atob(e),s=new Uint8Array(n.length);for(let c=0;c<n.length;c++)s[c]=n.charCodeAt(c);const o=s.slice(0,12),a=s.slice(12),r=await Va(t),i=await crypto.subtle.decrypt({name:"AES-GCM",iv:o},r,a);return new TextDecoder().decode(i)}async function cr(e,t){try{const n=await fetch("https://oauth2.googleapis.com/tokeninfo?id_token="+encodeURIComponent(e));if(!n.ok)return null;const s=await n.json();return s.aud!==t||!s.email||s.email_verified!=="true"?null:{email:s.email,name:s.name||s.email}}catch{return null}}const Ht={mabsilico:{name:"MabSilico",pipelineKey:"agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgOqI26zZCAw",url:"https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgOqI26zZCAw",networkSheetGid:"910674612",sources:{promote:"",network:"https://docs.google.com/spreadsheets/d/1NzUlKfHTW6v7i-S59GjtBFlzQwTX2AaeK4gQ4fVSAsw/edit?gid=910674612#gid=910674612",engage:"https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgOqI26zZCAw"}},"finance-montreal":{name:"Finance Montreal (Steve)",pipelineKey:"agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgI7YkpykCQw",url:"https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgI7YkpykCQw"},"apm-music":{name:"APM Music",pipelineKey:"agxzfm1haWxmb29nYWVyRAsSDE9yZ2FuaXphdGlvbiIdYWluYS5hbmRyaWFtYW5nYXNvbkBnbWFpbC5jb20MCxIIV29ya2Zsb3cYgIClnNb8gwsM",url:"https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyRAsSDE9yZ2FuaXphdGlvbiIdYWluYS5hbmRyaWFtYW5nYXNvbkBnbWFpbC5jb20MCxIIV29ya2Zsb3cYgIClnNb8gwsM"},ducrocq:{name:"Ducrocq",pipelineKey:"agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgNaSl4OGCww",url:"https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgNaSl4OGCww"},milvue:{name:"Milvue",pipelineKey:"agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgMX-7baZCgw",url:"https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgMX-7baZCgw"},seekyo:{name:"Seekyo Therapeutics",pipelineKey:"agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgLnYo_uUCww",url:"https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgLnYo_uUCww"},altavia:{name:"Altavia",pipelineKey:"agxzfm1haWxmb29nYWVyRAsSDE9yZ2FuaXphdGlvbiIdYWluYS5hbmRyaWFtYW5nYXNvbkBnbWFpbC5jb20MCxIIV29ya2Zsb3cYgICFz_elmwgM",url:"https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyRAsSDE9yZ2FuaXphdGlvbiIdYWluYS5hbmRyaWFtYW5nYXNvbkBnbWFpbC5jb20MCxIIV29ya2Zsb3cYgICFz_elmwgM"},valos:{name:"Valos",pipelineKey:"agxzfm1haWxmb29nYWVyRAsSDE9yZ2FuaXphdGlvbiIdYWluYS5hbmRyaWFtYW5nYXNvbkBnbWFpbC5jb20MCxIIV29ya2Zsb3cYgICF5ei7lgkM",url:"https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyRAsSDE9yZ2FuaXphdGlvbiIdYWluYS5hbmRyaWFtYW5nYXNvbkBnbWFpbC5jb20MCxIIV29ya2Zsb3cYgICF5ei7lgkM"},"dab-embedded":{name:"DAB-Embedded",pipelineKey:"agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgKWyqIboCww",url:"https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgKWyqIboCww"},"finance-montreal-noza":{name:"Finance Montreal (Noza)",pipelineKey:"agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgKWVvvDkCgw",url:"https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgKWVvvDkCgw"}},we=Ht.mabsilico.pipelineKey,Dn="Fit",On="Interest",sa="1NzUlKfHTW6v7i-S59GjtBFlzQwTX2AaeK4gQ4fVSAsw";async function z(e){const t=btoa(`${fn}:`),n=await fetch(`${Qo}${e}`,{headers:{Authorization:`Basic ${t}`,"Content-Type":"application/json"}});if(!n.ok)throw new Error(`Streak API error: ${n.statusText}`);return n.json()}async function Ya(e,t){const n=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({from:t.from,to:t.to,subject:t.subject,html:t.html})});if(!n.ok){const s=await n.text();throw new Error(`Resend API error: ${s}`)}return n.json()}async function Rt(e){const t=await ft(e),n=[];for(const s of t){if(s.archived||!s.pipelineKey)continue;const o=s.services||{promote:!0,network:!0,engage:!0};try{const[a,r]=await Promise.all([z(`/pipelines/${s.pipelineKey}`),z(`/pipelines/${s.pipelineKey}/boxes`)]),i=Array.isArray(r)?r:[],c=Date.now(),l=c-10080*60*1e3,d=c-720*60*60*1e3,p=i.filter(M=>(M.creationTimestamp||0)>l).length,m=i.filter(M=>(M.creationTimestamp||0)>d).length,u=a.stageOrder||[],g=Array.isArray(u)?u.map(M=>{var G,W;return{key:M,name:((W=(G=a.stages)==null?void 0:G[M])==null?void 0:W.name)||"Unknown"}}):[],v=Array.isArray(a.fields)?a.fields:[],h=v.find(M=>M&&M.name===Dn),b=v.find(M=>M&&M.name===On),k={},C={contacted:0,connected:0,meeting:0,proposal:0,won:0,recycled:0},E={},w={},S=(M,G)=>{var P;if(!M||!G.fields||!G.fields[M.key])return null;const W=(P=M.dropdownSettings)==null?void 0:P.items,te=Array.isArray(W)?W.find(ae=>ae&&ae.key===G.fields[M.key]):null;return te?te.name:null};i.forEach(M=>{const G=g.find(ae=>ae.key===M.stageKey),W=G?G.name:"Unknown";k[W]=(k[W]||0)+1,C[Tn(W)]=(C[Tn(W)]||0)+1;const te=S(h,M)||"Not Set";E[te]=(E[te]||0)+1;const P=S(b,M)||"Not Set";w[P]=(w[P]||0)+1});const R=i.length-(C.recycled||0),U=(C.meeting||0)+(C.proposal||0)+(C.won||0),T=i.length-(C.recycled||0),f=T>0?Math.round(U/T*1e3)/10:0,I=E.High||0,A=w.High||0,H=i.map(M=>M.creationTimestamp).filter(M=>M),B=H.length?Math.min(...H):c,ee=Math.max(1,Math.round((c-B)/(30.44*24*60*60*1e3))),me=i.filter(M=>(M.freshness||0)>.5).length,he=i.filter(M=>(M.freshness||0)>=.2&&(M.freshness||0)<=.5).length,F=i.filter(M=>(M.freshness||0)<.2).length;let y=null;if(o.network!==!1&&s.straightInReportId){const M=await Un(s.straightInReportId).catch(()=>null);M&&M.configured&&(y={configured:!0,invitations:M.connectionsSent||0,accepted:M.accepted||0,acceptanceRate:Math.round((M.acceptanceRate||0)*10)/10,messages:M.messages||0,opportunities:M.opportunityCount||0,followUps:M.followUps||0,profileVisits:M.profileVisits||0,prevInvitations:M.prevConnectionsSent||0,prevAccepted:M.prevAccepted||0,prevAcceptanceRate:Math.round((M.prevAcceptanceRate||0)*10)/10,periodLabel:M.periodLabel||""})}let N=null;o.promote!==!1&&(N=await br(s).catch(()=>null)),n.push({key:s.key,name:s.name,services:o,totalLeads:i.length,activeLeads:R,newThisWeek:p,newThisMonth:m,avgLeadsPerMonth:Math.round(i.length/ee*10)/10,campaignMonths:ee,stageDistribution:k,funnel:C,convToMeeting:f,meetingsPlus:U,highFit:I,highInterest:A,fitDistribution:E,interestDistribution:w,freshness:{high:me,medium:he,low:F},pipelineUrl:s.url||`https://www.streak.com/a/pipelines/${s.pipelineKey}`,network:y,promote:N})}catch(a){n.push({key:s.key,name:s.name,services:o,error:a.message,totalLeads:0,activeLeads:0,newThisWeek:0,newThisMonth:0,avgLeadsPerMonth:0,campaignMonths:0,stageDistribution:{},funnel:{contacted:0,connected:0,meeting:0,proposal:0,won:0,recycled:0},convToMeeting:0,meetingsPlus:0,highFit:0,highInterest:0,fitDistribution:{},interestDistribution:{},freshness:{high:0,medium:0,low:0},pipelineUrl:"",network:null,promote:null})}}return n}const X=e=>e==null?"0":Number(e).toLocaleString("en-US"),qa=e=>e>=100?"#16a34a":e>=60?"#ca8a04":"#dc2626",oa=(e,t)=>{const n=(e||0)-(t||0);if(!t&&!e)return"";const s=n>=0;return`<span style="font-size:11px;color:${s?"#16a34a":"#dc2626"};font-weight:600;">${s?"▲":"▼"} ${X(Math.abs(n))}</span>`};function dr(e){const t=In.reduce((a,r)=>a+(e[r]||0),0)||1,n={contacted:"#93c5fd",connected:"#60a5fa",meeting:"#6366f1",proposal:"#8b5cf6",won:"#22c55e",recycled:"#e2e8f0"},s=In.filter(a=>(e[a]||0)>0).map(a=>`<td style="width:${Math.max(2,Math.round((e[a]||0)/t*100))}%;background:${n[a]};height:22px;text-align:center;font-size:10px;color:${a==="recycled"?"#64748b":"#fff"};font-weight:700;" title="${ra[a]}">${e[a]}</td>`).join(""),o=In.filter(a=>(e[a]||0)>0).map(a=>`<span style="font-size:10px;color:#64748b;margin-right:10px;"><span style="display:inline-block;width:8px;height:8px;background:${n[a]};border-radius:2px;margin-right:3px;"></span>${ra[a]}</span>`).join("");return`<table style="width:100%;border-collapse:collapse;border-radius:5px;overflow:hidden;"><tr>${s}</tr></table><div style="margin-top:6px;">${o}</div>`}function xe(e,t,n,s){return`<div style="flex:1;min-width:78px;padding:8px 6px;">
    <div style="font-size:19px;font-weight:800;color:${s||"#1e293b"};line-height:1.1;">${t}</div>
    <div style="font-size:10px;color:#64748b;text-transform:uppercase;letter-spacing:.4px;margin-top:2px;">${e}</div>
    ${n?`<div style="font-size:10px;color:#94a3b8;margin-top:1px;">${n}</div>`:""}
  </div>`}function Gt(e,t,n,s){return`<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:${s?"#f1f5f9":"#f8fafc"};border-bottom:1px solid #e2e8f0;">
    <div style="font-size:13px;font-weight:700;color:#334155;">${e} ${t}</div>
    <div style="font-size:9px;color:#94a3b8;text-transform:uppercase;letter-spacing:.5px;">${n}</div>
  </div>`}function pr(e,t){if(!e||!e.configured)return Gt("📣","Promote","social",!1)+'<div style="padding:14px 12px;font-size:12px;color:#94a3b8;">No social account tracked for this client.</div>';const n=t==="week"?e.postsThisWeek:e.posts30,s=t==="week"?e.engagement7:e.engagement30,o=t==="week"?"last 7d":"last 30d",a=t==="week"?e.followersGrowth7:e.followersGrowth30,r=e.platformNames.map(c=>c.charAt(0)+c.slice(1).toLowerCase()).join(" + "),i=e.topPosts&&e.topPosts[0]?e.topPosts[0]:null;return Gt("📣","Promote","social",!0)+`<div style="display:flex;flex-wrap:wrap;padding:6px 6px;">
      ${xe("Posts",X(n),o,"#0ea5e9")}
      ${xe("Engagement",X(s),"likes+comments+shares","#0ea5e9")}
      ${xe("Followers",X(e.followersTotal),`${a>=0?"+":""}${X(a)} ${o}`,"#0ea5e9")}
      ${xe("Posts/wk",String(e.avgPostsPerWeek),"avg","#0ea5e9")}
    </div>
    ${r?`<div style="padding:0 12px 6px;font-size:10px;color:#94a3b8;">${r}</div>`:""}
    ${i?`<div style="margin:0 12px 10px;padding:8px 10px;background:#f0f9ff;border-radius:6px;">
        <div style="font-size:9px;color:#0369a1;text-transform:uppercase;letter-spacing:.5px;font-weight:700;">Top post · ${X(i.engagement)} eng</div>
        <div style="font-size:11px;color:#334155;margin-top:3px;">${(i.snippet||"").replace(/</g,"&lt;").slice(0,120)}${(i.snippet||"").length>120?"…":""}</div>
      </div>`:""}`}function mr(e,t){if(!e||!e.configured)return Gt("🤝","Network","Straight-in",!1)+'<div style="padding:14px 12px;font-size:12px;color:#94a3b8;">No Straight-in campaign report connected.</div>';const n=20,s=Math.round(e.acceptanceRate/n*100);return Gt("🤝","Network","Straight-in",!0)+`<div style="display:flex;flex-wrap:wrap;padding:6px 6px;">
      ${xe("Invitations",X(e.invitations),oa(e.invitations,e.prevInvitations)||"sent","#6366f1")}
      ${xe("Accepted",X(e.accepted),oa(e.accepted,e.prevAccepted)||"","#6366f1")}
      ${xe("Accept rate",`${e.acceptanceRate}%`,`vs ${n}% goal`,qa(s))}
      ${xe("Messages",X(e.messages),"","#6366f1")}
    </div>
    <div style="display:flex;flex-wrap:wrap;padding:0 6px 6px;">
      ${xe("Opportunities",X(e.opportunities),"","#8b5cf6")}
      ${xe("Follow-ups",X(e.followUps),"","#94a3b8")}
      ${xe("Profile visits",X(e.profileVisits),"","#94a3b8")}
      ${e.periodLabel?`<div style="flex:1;min-width:120px;padding:8px 6px;"><div style="font-size:10px;color:#94a3b8;">Period</div><div style="font-size:11px;color:#64748b;font-weight:600;">${e.periodLabel}</div></div>`:'<div style="flex:1;min-width:78px;"></div>'}
    </div>`}function gr(e,t){const n=t==="week"?e.newThisWeek:e.newThisMonth,s=t==="week"?2.5:10,o=Math.round(n/s*100),a=t==="week"?"this week":"this month";return Gt("💬","Engage","Streak CRM",!0)+`<div style="display:flex;flex-wrap:wrap;padding:6px 6px;">
      ${xe("New leads",X(n),`${a} · ${o}% of ${s}`,qa(o))}
      ${xe("Active",X(e.activeLeads),`${X(e.totalLeads)} total`,"#334155")}
      ${xe("→ Meeting",`${e.convToMeeting}%`,`${X(e.meetingsPlus)} in play`,"#22c55e")}
      ${xe("High fit/int",`${X(e.highFit)}/${X(e.highInterest)}`,"","#7c3aed")}
    </div>
    <div style="padding:4px 12px 12px;">
      <div style="font-size:9px;color:#94a3b8;text-transform:uppercase;letter-spacing:.5px;margin-bottom:5px;">Pipeline funnel</div>
      ${dr(e.funnel)}
    </div>`}function ur(e,t){if(e.error)return`<div style="background:#fff;border:1px solid #fecaca;border-radius:10px;padding:16px;margin-bottom:16px;">
      <div style="font-weight:700;color:#334155;font-size:15px;">${e.name}</div>
      <div style="color:#dc2626;font-size:12px;margin-top:4px;">⚠️ ${e.error}</div>
    </div>`;const n=e.services||{},s=(r,i)=>`<span style="display:inline-block;padding:2px 8px;border-radius:10px;font-size:9px;font-weight:700;letter-spacing:.3px;margin-left:5px;background:${r?"#eef2ff":"#f1f5f9"};color:${r?"#4f46e5":"#cbd5e1"};">${i}</span>`,o=r=>`<td valign="top" style="width:33.33%;background:#fff;border:1px solid #e2e8f0;border-radius:8px;">${r}</td>`,a='<td style="width:10px;"></td>';return`<div style="margin-bottom:18px;">
    <div style="display:flex;align-items:center;justify-content:space-between;padding:0 2px 8px;">
      <div>
        <span style="font-size:16px;font-weight:800;color:#1e293b;">${e.name}</span>
        ${s(n.promote!==!1,"Promote")}${s(n.network!==!1,"Network")}${s(n.engage!==!1,"Engage")}
      </div>
      <div style="font-size:11px;color:#94a3b8;">${e.campaignMonths}mo · ${X(e.totalLeads)} leads · ${e.avgLeadsPerMonth}/mo avg</div>
    </div>
    <table style="width:100%;border-collapse:separate;border-spacing:0;"><tr>
      ${o(pr(e.promote,t))}
      ${a}
      ${o(mr(e.network))}
      ${a}
      ${o(gr(e,t))}
    </tr></table>
  </div>`}function jn(e,t){var E;const n=t.period,s=t.only?e.filter(w=>w.key===t.only):e,o=s.filter(w=>!w.error),a=o.reduce((w,S)=>w+(n==="week"?S.newThisWeek:S.newThisMonth),0),r=o.reduce((w,S)=>{var R;return w+(((R=S.network)==null?void 0:R.invitations)||0)},0),i=o.reduce((w,S)=>{var R;return w+(((R=S.network)==null?void 0:R.accepted)||0)},0),c=r>0?Math.round(i/r*1e3)/10:0,l=o.reduce((w,S)=>w+(S.promote?n==="week"?S.promote.postsThisWeek:S.promote.posts30:0),0),d=o.reduce((w,S)=>w+(S.promote?n==="week"?S.promote.engagement7:S.promote.engagement30:0),0),p=o.reduce((w,S)=>{var R;return w+(((R=S.network)==null?void 0:R.opportunities)||0)},0),m=o.reduce((w,S)=>w+(S.meetingsPlus||0),0),u=o.length*(n==="week"?2.5:10),g=u>0?Math.round(a/u*100):0,v=g>=100?"🟢":g>=60?"🟡":"🔴",h=[...s].sort((w,S)=>(S.totalLeads||0)-(w.totalLeads||0)),b=o.map(w=>({d:w,pct:Math.round((n==="week"?w.newThisWeek:w.newThisMonth)/(n==="week"?2.5:10)*100)})).filter(w=>w.pct<60).sort((w,S)=>w.pct-S.pct).slice(0,8),k=t.title||(t.only?`${((E=s[0])==null?void 0:E.name)||"Client"} — Full Report`:"Client Performance Report"),C=(w,S,R,U,T)=>`<td valign="top" style="width:33.33%;padding:14px 12px;background:#fff;border:1px solid #e2e8f0;border-radius:10px;">
      <div style="font-size:10px;color:#94a3b8;text-transform:uppercase;letter-spacing:.6px;">${w} ${S}</div>
      <div style="font-size:26px;font-weight:800;color:${T};margin-top:4px;line-height:1;">${R}</div>
      <div style="font-size:11px;color:#64748b;margin-top:4px;">${U}</div>
    </td>`;return`<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${k}</title></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1e293b;">
<div style="max-width:960px;margin:0 auto;padding:20px 16px 40px;">

  <div style="background:linear-gradient(135deg,#4f46e5,#7c3aed);border-radius:14px;padding:26px 28px;color:#fff;">
    <div style="font-size:12px;color:rgba(255,255,255,.75);letter-spacing:2px;text-transform:uppercase;">Gershon.AI · Promote · Network · Engage</div>
    <h1 style="margin:6px 0 2px;font-size:24px;font-weight:800;">${k}</h1>
    <div style="font-size:13px;color:rgba(255,255,255,.85);">${t.label} · ${v} ${g}% of lead target</div>
  </div>

  ${t.only?"":`<table style="width:100%;border-collapse:separate;border-spacing:10px 14px;margin:2px 0 6px;"><tr>
    ${C("📣","Promote",X(l),`${X(d)} engagements`,"#0ea5e9")}
    ${C("🤝","Network",X(r),`${X(i)} accepted · ${c}% · ${X(p)} opps`,"#6366f1")}
    ${C("💬","Engage",X(a),`new leads · ${X(m)} in meeting+`,"#22c55e")}
  </tr></table>
  <div style="font-size:11px;color:#94a3b8;padding:0 4px 14px;">${o.length} active clients${n==="week"?" · last 7 days":" · last 30 days"}</div>`}

  ${h.map(w=>ur(w,n)).join("")}

  ${!t.only&&b.length?`<div style="background:#fff;border:1px solid #fecaca;border-radius:10px;padding:16px 18px;margin-top:6px;">
    <div style="font-size:14px;font-weight:800;color:#b91c1c;margin-bottom:8px;">🔴 Needs attention (${n==="week"?"weekly":"monthly"} lead target)</div>
    ${b.map(w=>`<div style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid #fef2f2;font-size:12px;">
      <span style="color:#334155;font-weight:600;">${w.d.name}</span>
      <span style="color:#dc2626;">${w.pct}% · ${X(n==="week"?w.d.newThisWeek:w.d.newThisMonth)} new lead${(n==="week"?w.d.newThisWeek:w.d.newThisMonth)===1?"":"s"}</span>
    </div>`).join("")}
  </div>`:""}

  <div style="text-align:center;padding:24px 0 0;font-size:11px;color:#94a3b8;">
    <p style="margin:0;">Client by <strong>Gershon.AI</strong> · Promote (social.gershoncrm.com) · Network (Straight-in) · Engage (Streak)</p>
    <p style="margin:4px 0 0;">Generated ${new Date().toLocaleString("en-US",{dateStyle:"medium",timeStyle:"short"})}</p>
  </div>

</div></body></html>`}function Za(e,t){return jn(e,{label:t,period:"week",title:"Weekly Performance Report"})}function Xa(e,t){return jn(e,{label:t,period:"month",title:"Monthly Performance Report"})}function Qa(e){if(e.includes("docs.google.com")){const t=e.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/),n=e.match(/[?&#]gid=(\d+)/),s=t?t[1]:sa,o=n?n[1]:"0";return{sheetId:s,gid:o}}return{sheetId:sa,gid:e}}async function Ja(e){try{const{sheetId:t,gid:n}=Qa(e),s=`https://docs.google.com/spreadsheets/d/${t}/export?format=csv&gid=${n}`,o=await fetch(s);if(!o.ok)throw new Error(`Google Sheets error: ${o.statusText}`);const r=(await o.text()).split(`
`).filter(E=>E.trim()),i=[];if(r.length<2)return{totalInvitations:0,totalAccepted:0,avgAcceptanceRate:0,thisWeek:{invitations:0,acceptance:0},lastWeek:{invitations:0,acceptance:0},recentWeeks:[],allData:[]};const c=r[0].split(",").map(E=>E.trim().toLowerCase()),l=c[0]==="w"||c[0]==="week",d=l?0:-1;for(let E=1;E<r.length;E++){const S=r[E].split(","),R=3+d,U=4+d,T=7+d,f=8+d,I=1+d,A=2+d;if(S.length>=(l?9:8)&&S[R]&&S[R].trim()){const H=parseInt(S[R])||0,B=parseInt(S[U])||0,ee=S[T]?S[T].replace("%","").trim():"0",me=parseFloat(ee)||0;i.push({week:l?S[0]:String(E),from:S[I],to:S[A],invitations:H,messages:B,acceptance:me,opportunities:f<S.length&&parseInt(S[f])||0})}}const p=i.reduce((E,w)=>E+w.invitations,0),m=i.reduce((E,w)=>{const S=Math.min(w.acceptance,100);return E+Math.round(w.invitations*S/100)},0),u=i.map(E=>Math.min(E.acceptance,100)),g=u.length>0?u.reduce((E,w)=>E+w,0)/u.length:0,v=20,h=g>0?g/v*100:0,b=i.slice(-4),k=i[i.length-1]||{invitations:0,acceptance:0},C=i[i.length-2]||{invitations:0,acceptance:0};return{totalInvitations:p,totalAccepted:m,avgAcceptanceRate:Math.round(g*10)/10,networkObjective:v,objectiveAchievement:Math.round(h*10)/10,thisWeek:{invitations:k.invitations,acceptance:Math.min(k.acceptance,100)},lastWeek:{invitations:C.invitations,acceptance:Math.min(C.acceptance,100)},recentWeeks:b.map(E=>({...E,acceptance:Math.min(E.acceptance,100)})),allData:i}}catch(t){return console.error("Error fetching network data:",t),{totalInvitations:0,totalAccepted:0,avgAcceptanceRate:0,thisWeek:{invitations:0,acceptance:0},lastWeek:{invitations:0,acceptance:0},recentWeeks:[],allData:[]}}}async function Un(e){var t,n,s,o,a,r,i,c;try{const l=`https://prospecthub.straight-in.com/api/retain/public/campaign-reports/${e}`,d=await fetch(l);if(!d.ok)throw new Error(`Straight-in API error: ${d.statusText}`);const p=await d.json(),m=((t=p==null?void 0:p.snapshot)==null?void 0:t.totals)||{},u=((n=p==null?void 0:p.snapshot)==null?void 0:n.previousTotals)||{},g=((s=p==null?void 0:p.snapshot)==null?void 0:s.deltas)||{},v=((o=p==null?void 0:p.snapshot)==null?void 0:o.funnel)||{},h=((a=p==null?void 0:p.snapshot)==null?void 0:a.opportunities)||[];return{connectionsSent:m.connectionsSent||0,accepted:m.accepted||0,acceptanceRate:m.acceptanceRate||0,messages:m.messages||0,opportunityCount:m.opportunityCount||0,followUps:m.followUps||0,openProfileInmails:m.openProfileInmails||0,pageInvites:m.pageInvites||0,profileVisits:m.openProfileVisits||0,prevConnectionsSent:u.connectionsSent||0,prevAccepted:u.accepted||0,prevMessages:u.messages||0,prevOpportunityCount:u.opportunityCount||0,prevAcceptanceRate:u.acceptanceRate||0,periodStart:(p==null?void 0:p.periodStart)||((r=p==null?void 0:p.snapshot)==null?void 0:r.periodStart)||"",periodEnd:(p==null?void 0:p.periodEnd)||((i=p==null?void 0:p.snapshot)==null?void 0:i.periodEnd)||"",periodLabel:((c=p==null?void 0:p.snapshot)==null?void 0:c.periodLabel)||"",deltas:g,funnel:v,opportunities:h,configured:!0}}catch(l){return console.error("Error fetching Straight-in data:",l),null}}function hr(e){if(!e)return null;const t=20,n=Number(e.acceptanceRate)||0,s=Number(e.prevAcceptanceRate)||0,o=c=>{if(!c)return"";const l=new Date(c);return isNaN(l.getTime())?"":l.toLocaleDateString("en-US",{month:"short",day:"numeric"})},a=o(e.periodStart),r=o(e.periodEnd),i=e.periodLabel||(a?r?a+" – "+r:a:"Current");return{source:"straightin",totalInvitations:e.connectionsSent||0,totalAccepted:e.accepted||0,avgAcceptanceRate:n,networkObjective:t,objectiveAchievement:Math.round(n/t*1e3)/10,totalMessages:e.messages||0,totalFollowUps:e.followUps||0,totalOpportunities:e.opportunityCount||0,thisWeek:{invitations:e.connectionsSent||0,acceptance:n},lastWeek:{invitations:e.prevConnectionsSent||0,acceptance:s},thisWeekLabel:"Current Report",lastWeekLabel:"Previous Report",recentWeeks:[{week:"1",from:"Previous",to:"report",invitations:e.prevConnectionsSent||0,messages:e.prevMessages||0,acceptance:s,opportunities:e.prevOpportunityCount||0},{week:"2",from:a||"Current",to:r||"report",invitations:e.connectionsSent||0,messages:e.messages||0,acceptance:n,opportunities:e.opportunityCount||0}],periodLabel:i,allData:[1,2]}}$.get("/api/pipeline",async e=>{try{const t=await z(`/pipelines/${we}`);return e.json(t)}catch(t){return e.json({error:t.message},500)}});$.get("/api/boxes",async e=>{try{const t=await z(`/pipelines/${we}/boxes`);return e.json(t)}catch(t){return e.json({error:t.message},500)}});$.get("/api/boxes/:boxKey",async e=>{try{const t=e.req.param("boxKey"),n=await z(`/boxes/${t}`);return e.json(n)}catch(t){return e.json({error:t.message},500)}});$.get("/api/sheets/stage/:stageName/count",async e=>{try{const t=e.req.param("stageName"),[n,s]=await Promise.all([z(`/pipelines/${we}`),z(`/pipelines/${we}/boxes`)]),o=n.stageOrder||[],a=Array.isArray(o)?o.map(i=>{var c,l;return{key:i,name:((l=(c=n.stages)==null?void 0:c[i])==null?void 0:l.name)||"Unknown"}}):[],r=Array.isArray(s)?s.filter(i=>{const c=a.find(l=>l&&l.key===i.stageKey);return c&&c.name.toLowerCase()===t.toLowerCase()}).length:0;return e.text(r.toString())}catch{return e.text("ERROR")}});$.get("/api/sheets/priority/:priorityName/count",async e=>{try{const t=e.req.param("priorityName"),[n,s]=await Promise.all([z(`/pipelines/${we}`),z(`/pipelines/${we}/boxes`)]),a=(Array.isArray(n.fields)?n.fields:[]).find(i=>i&&i.name==="Priority"),r=Array.isArray(s)?s.filter(i=>{var m;if(!a||!i.fields||!i.fields[a.key])return t.toLowerCase()==="no priority";const c=i.fields[a.key],l=(m=a.dropdownSettings)==null?void 0:m.items,d=Array.isArray(l)?l.find(u=>u&&u.key===c):null;return(d?d.name:"No Priority").toLowerCase().includes(t.toLowerCase())}).length:0;return e.text(r.toString())}catch{return e.text("ERROR")}});$.get("/api/sheets/country/:countryName/count",async e=>{try{const t=e.req.param("countryName"),[n,s]=await Promise.all([z(`/pipelines/${we}`),z(`/pipelines/${we}/boxes`)]),a=(Array.isArray(n.fields)?n.fields:[]).find(i=>i&&i.name==="Country"),r=Array.isArray(s)?s.filter(i=>{var m;if(!a||!i.fields||!i.fields[a.key])return t.toLowerCase()==="unknown";const c=i.fields[a.key],l=(m=a.dropdownSettings)==null?void 0:m.items,d=Array.isArray(l)?l.find(u=>u&&u.key===c):null;return(d?d.name:"Unknown").toLowerCase()===t.toLowerCase()}).length:0;return e.text(r.toString())}catch{return e.text("ERROR")}});$.get("/api/sheets/total",async e=>{try{const t=await z(`/pipelines/${we}/boxes`),n=Array.isArray(t)?t.length:0;return e.text(n.toString())}catch{return e.text("ERROR")}});$.get("/api/sheets/freshness/:level/count",async e=>{try{const t=e.req.param("level").toLowerCase(),n=await z(`/pipelines/${we}/boxes`),s=Array.isArray(n)?n.filter(o=>{const a=o.freshness||0;return t==="high"?a>.5:t==="medium"?a>=.2&&a<=.5:t==="low"?a<.2:!1}).length:0;return e.text(s.toString())}catch{return e.text("ERROR")}});$.get("/api/sheets/fit/:fitLevel/count",async e=>{try{const t=e.req.param("fitLevel"),[n,s]=await Promise.all([z(`/pipelines/${we}`),z(`/pipelines/${we}/boxes`)]),a=(Array.isArray(n.fields)?n.fields:[]).find(i=>i&&i.name===Dn),r=Array.isArray(s)?s.filter(i=>{var m;if(!a||!i.fields||!i.fields[a.key])return t.toLowerCase()==="not set";const c=i.fields[a.key],l=(m=a.dropdownSettings)==null?void 0:m.items,d=Array.isArray(l)?l.find(u=>u&&u.key===c):null;return(d?d.name:"Not Set").toLowerCase()===t.toLowerCase()}).length:0;return e.text(r.toString())}catch{return e.text("ERROR")}});$.get("/api/sheets/interest/:interestLevel/count",async e=>{try{const t=e.req.param("interestLevel"),[n,s]=await Promise.all([z(`/pipelines/${we}`),z(`/pipelines/${we}/boxes`)]),a=(Array.isArray(n.fields)?n.fields:[]).find(i=>i&&i.name===On),r=Array.isArray(s)?s.filter(i=>{var m;if(!a||!i.fields||!i.fields[a.key])return t.toLowerCase()==="not set";const c=i.fields[a.key],l=(m=a.dropdownSettings)==null?void 0:m.items,d=Array.isArray(l)?l.find(u=>u&&u.key===c):null;return(d?d.name:"Not Set").toLowerCase()===t.toLowerCase()}).length:0;return e.text(r.toString())}catch{return e.text("ERROR")}});function es(e,t){if(e&&e.startsWith("strk_")&&t){const n=t.match(/\/pipelines\/([a-zA-Z0-9_-]{20,})/);if(n)return n[1]}if(e&&e.includes("/pipelines/")){const n=e.match(/\/pipelines\/([a-zA-Z0-9_-]{20,})/);if(n)return n[1]}return e}async function Ge(e,t){const n=await e.get(`company:${t}`);if(n)return JSON.parse(n);if(Ht[t]){const s=Ht[t];return{key:t,name:s.name,pipelineKey:s.pipelineKey,url:s.url||"",networkSheetGid:s.networkSheetGid||"",sources:s.sources||{}}}return null}async function ft(e,t=!1){const n={};for(const a of Object.keys(Ht)){const r=Ht[a];n[a]={key:a,name:r.name,pipelineKey:r.pipelineKey,url:r.url||"",networkSheetGid:r.networkSheetGid||"",sources:r.sources||{},archived:!1}}const s=await e.list({prefix:"company:"});for(const a of s.keys){const r=await e.get(a.name);if(r){const i=JSON.parse(r);n[i.key]=i}}const o=Object.values(n);return t?o:o.filter(a=>!a.archived)}$.get("/api/companies",async e=>{const t=e.req.query("includeArchived")==="true",n=await ft(e.env.COMPANIES_KV,t);return e.json({companies:n,count:n.length})});$.post("/api/companies",async e=>{try{const t=await e.req.json(),{name:n,pipelineKey:s,networkUrl:o,promoteUrl:a,engageUrl:r,notionUrl:i,networkGid:c,key:l,googleChatUrl:d,googleChatWebhookUrl:p,straightInReportId:m,messages:u,services:g}=t;if(!n||!s)return e.json({error:"name and pipelineKey are required"},400);const v=l||n.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""),h=es(s,r),b={key:v,name:n,pipelineKey:h,url:r||`https://www.streak.com/a/pipelines/${s}`,sources:{promote:a||"",network:o||"",engage:r||`https://www.streak.com/a/pipelines/${s}`,notion:i||""}};return c&&(b.networkSheetGid=c),d&&(b.googleChatUrl=d),p&&(b.googleChatWebhookUrl=p),u&&u.length>0&&(b.messages=u),m&&(b.straightInReportId=m),b.services=g||{promote:!0,network:!0,engage:!0},await e.env.COMPANIES_KV.put(`company:${v}`,JSON.stringify(b)),e.json({success:!0,company:b})}catch{return e.json({error:"Failed to save company"},500)}});async function ts(e,t){var l,d;const n=/\[leads:([^\]]+)\]/gi,s=[...e.matchAll(n)];if(s.length===0)return e;const[o,a]=await Promise.all([z(`/pipelines/${t}`),z(`/pipelines/${t}/boxes`)]),r=o.stageOrder||[],i={};for(const p of r)i[p]=((d=(l=o.stages)==null?void 0:l[p])==null?void 0:d.name)||"Unknown";let c=e;for(const p of s){const m=p[1],u=Array.isArray(a)?a.filter(g=>(i[g.stageKey]||"").toLowerCase()===m.toLowerCase()).length:0;c=c.replace(p[0],u.toString())}return c}function fr(){const e=new Date,t=-300;e.getUTCHours()*60+e.getUTCMinutes();const n=new Date(e);return n.setUTCMinutes(n.getUTCMinutes()+t),["sunday","monday","tuesday","wednesday","thursday","friday","saturday"][n.getUTCDay()]}$.get("/api/chat/send-messages",async e=>{try{const t=[],n=await ft(e.env.COMPANIES_KV),s=fr();for(const o of n){if(!o.googleChatWebhookUrl||!o.messages||!o.pipelineKey)continue;const a=o.messages.filter(r=>r.enabled&&r.dayOfWeek===s);for(const r of a)try{const i=await ts(r.text,o.pipelineKey),c=await fetch(o.googleChatWebhookUrl,{method:"POST",headers:{"Content-Type":"application/json; charset=UTF-8"},body:JSON.stringify({text:i})});t.push({company:o.name,messageId:r.id,sent:c.ok,status:c.status,resolvedText:i})}catch(i){t.push({company:o.name,messageId:r.id,error:i.message,sent:!1})}}return e.json({success:!0,day:s,results:t,timestamp:new Date().toISOString()})}catch(t){return e.json({error:t.message},500)}});$.get("/api/chat/weekly-reminder",async e=>{var t,n;try{const s=[],o=await ft(e.env.COMPANIES_KV);for(const a of o)if(!(!a.googleChatWebhookUrl||!a.pipelineKey))try{const[r,i]=await Promise.all([z(`/pipelines/${a.pipelineKey}`),z(`/pipelines/${a.pipelineKey}/boxes`)]),c=r.stageOrder||[],l={};for(const u of c)l[u]=((n=(t=r.stages)==null?void 0:t[u])==null?void 0:n.name)||"Unknown";const d=Array.isArray(i)?i.filter(u=>(l[u.stageKey]||"").toLowerCase()==="lead").length:0,p=`As a reminder, you still have ${d} leads in your Streak that are still at the stage of LEAD, they should be CONTACTED or better. Also, a FIT would be important to share for future campaigns. Thanks.`,m=await fetch(a.googleChatWebhookUrl,{method:"POST",headers:{"Content-Type":"application/json; charset=UTF-8"},body:JSON.stringify({text:p})});s.push({company:a.name,leadCount:d,sent:m.ok,status:m.status})}catch(r){s.push({company:a.name,error:r.message,sent:!1})}return e.json({success:!0,results:s,timestamp:new Date().toISOString()})}catch(s){return e.json({error:s.message},500)}});$.get("/api/chat/send-messages/:companyKey",async e=>{try{const t=e.req.param("companyKey").toLowerCase(),n=await Ge(e.env.COMPANIES_KV,t);if(!n)return e.json({error:"Company not found"},404);if(!n.googleChatWebhookUrl)return e.json({error:`No Google Chat webhook configured for ${n.name}`},400);if(!n.pipelineKey)return e.json({error:`No pipeline key configured for ${n.name}`},400);if(!n.messages||n.messages.length===0)return e.json({error:`No messages configured for ${n.name}`},400);const s=[];for(const o of n.messages)if(o.enabled)try{const a=await ts(o.text,n.pipelineKey),r=await fetch(n.googleChatWebhookUrl,{method:"POST",headers:{"Content-Type":"application/json; charset=UTF-8"},body:JSON.stringify({text:a})});s.push({messageId:o.id,dayOfWeek:o.dayOfWeek,time:o.time,sent:r.ok,resolvedText:a})}catch(a){s.push({messageId:o.id,error:a.message,sent:!1})}return e.json({success:!0,company:n.name,results:s,timestamp:new Date().toISOString()})}catch(t){return e.json({error:t.message},500)}});$.delete("/api/companies/:key",async e=>{try{const t=e.req.param("key");return await e.env.COMPANIES_KV.delete(`company:${t}`),e.json({success:!0})}catch{return e.json({error:"Failed to delete company"},500)}});$.put("/api/companies/:key",async e=>{var t,n,s;try{const o=e.req.param("key"),a=await e.req.json(),{name:r,pipelineKey:i,networkUrl:c,promoteUrl:l,engageUrl:d,networkGid:p,googleChatUrl:m,googleChatWebhookUrl:u,straightInReportId:g,messages:v,services:h}=a,k=(await ft(e.env.COMPANIES_KV,!0)).find(S=>S.key===o);if(!k)return e.json({error:"Company not found"},404);const{archived:C}=a,E=i?es(i,d||k.url):k.pipelineKey,w={...k,key:o,name:r||k.name,pipelineKey:E,sources:{promote:l!==void 0?l:((t=k.sources)==null?void 0:t.promote)||"",network:c!==void 0?c:((n=k.sources)==null?void 0:n.network)||"",engage:d!==void 0?d:((s=k.sources)==null?void 0:s.engage)||k.url||""}};return p!==void 0&&(p?w.networkSheetGid=p:delete w.networkSheetGid),d&&(w.url=d),C!==void 0&&(w.archived=C),m!==void 0&&(w.googleChatUrl=m),u!==void 0&&(w.googleChatWebhookUrl=u),v!==void 0&&(w.messages=v),g!==void 0&&(g?w.straightInReportId=g:delete w.straightInReportId),h!==void 0&&(w.services=h),await e.env.COMPANIES_KV.put(`company:${o}`,JSON.stringify(w)),e.json({success:!0,company:w})}catch{return e.json({error:"Failed to update company"},500)}});$.get("/api/sheets/:companyName/total",async e=>{try{const t=e.req.param("companyName").toLowerCase(),n=await Ge(e.env.COMPANIES_KV,t);if(!n)return e.text("COMPANY_NOT_FOUND");const s=await z(`/pipelines/${n.pipelineKey}/boxes`),o=Array.isArray(s)?s.length:0;return e.text(o.toString())}catch{return e.text("ERROR")}});$.get("/api/sheets/:companyName/month/:yearMonth/count",async e=>{try{const t=e.req.param("companyName").toLowerCase(),n=e.req.param("yearMonth"),s=await Ge(e.env.COMPANIES_KV,t);if(!s)return e.text("COMPANY_NOT_FOUND");const o=await z(`/pipelines/${s.pipelineKey}/boxes`),[a,r]=n.split("-").map(Number),i=Array.isArray(o)?o.filter(c=>{const l=new Date(c.creationTimestamp);return l.getFullYear()===a&&l.getMonth()+1===r}).length:0;return e.text(i.toString())}catch{return e.text("ERROR")}});$.get("/api/sheets/:companyName/week/count",async e=>{try{const t=e.req.param("companyName").toLowerCase(),n=await Ge(e.env.COMPANIES_KV,t);if(!n)return e.text("ERROR");const s=await z(`/pipelines/${n.pipelineKey}/boxes`);if(!Array.isArray(s))return e.text("0");const a=Date.now()-10080*60*1e3,r=s.filter(i=>(i.creationTimestamp||0)>=a).length;return e.text(r.toString())}catch{return e.text("ERROR")}});$.get("/api/sheets/:companyName/duration/total",async e=>{try{const t=e.req.param("companyName").toLowerCase(),n=await Ge(e.env.COMPANIES_KV,t);if(!n)return e.text("0");const s=await z(`/pipelines/${n.pipelineKey}/boxes`);if(!Array.isArray(s)||s.length===0)return e.text("0");const o=s.map(p=>p.creationTimestamp).filter(p=>p);if(o.length===0)return e.text("0");const a=Math.min(...o),r=new Date(a),i=new Date,c=i.getFullYear()-r.getFullYear(),l=i.getMonth()-r.getMonth(),d=c*12+l+1;return e.text(d.toString())}catch{return e.text("0")}});$.get("/api/sheets/:companyName/monthly-stats",async e=>{try{const t=e.req.param("companyName").toLowerCase(),n=await Ge(e.env.COMPANIES_KV,t);if(!n)return e.json({error:"Company not found"},404);const s=await z(`/pipelines/${n.pipelineKey}/boxes`),o=Array.isArray(s)?s:[],a=new Date,r=[];for(let d=11;d>=0;d--){const p=new Date(a.getFullYear(),a.getMonth()-d,1),m=p.getFullYear(),u=p.getMonth()+1,g=o.filter(h=>{const b=new Date(h.creationTimestamp);return b.getFullYear()===m&&b.getMonth()+1===u}).length,v=(g/10*100).toFixed(1);r.push({month:`${m}-${String(u).padStart(2,"0")}`,count:g,objective:10,percentage:parseFloat(v)})}const i=r.reduce((d,p)=>d+p.count,0),c=(i/12).toFixed(1),l=(parseFloat(c)/10*100).toFixed(1);return e.json({company:n.name,companyKey:t,objective:10,monthlyStats:r,summary:{totalLeads:i,average:parseFloat(c),averagePercentage:parseFloat(l)}})}catch(t){return e.json({error:t.message},500)}});$.get("/api/analytics",async e=>{var t;try{const n=e.req.query("company")||"mabsilico",s=await Ge(e.env.COMPANIES_KV,n);if(!s)return e.json({error:"Invalid company key"},400);const o=s.pipelineKey;if(!o)return e.json({error:`No Streak pipeline key configured for "${s.name}". Please set it in the Admin Panel.`},400);const[a,r]=await Promise.all([z(`/pipelines/${o}`),z(`/pipelines/${o}/boxes`)]),i=Array.isArray(r)?r.length:0,c={},l={},d={},p={},m={},u={},g={"High (>0.5)":0,"Medium (0.2-0.5)":0,"Low (<0.2)":0},v=a.stageOrder||[],h=Array.isArray(v)?v.map(y=>{var N,M;return{key:y,name:((M=(N=a.stages)==null?void 0:N[y])==null?void 0:M.name)||"Unknown"}}):[],b=Array.isArray(a.fields)?a.fields:[],k=b.find(y=>y&&y.name==="Origin"),C=b.find(y=>y&&y.name===Dn),E=b.find(y=>y&&y.name===On),w=b.find(y=>y&&y.name==="Est Start Date"),S=b.find(y=>y&&y.name==="Country"),R=b.find(y=>y&&y.name==="Language");Array.isArray(r)&&r.forEach(y=>{var W,te,P,ae,ge;if(!y)return;const N=h.find(Q=>Q&&Q.key===y.stageKey),M=N?N.name:"Unknown";if(c[M]=(c[M]||0)+1,k&&y.fields&&y.fields[k.key]){const Q=y.fields[k.key],Z=(W=k.dropdownSettings)==null?void 0:W.items,ne=Array.isArray(Z)?Z.find(L=>L&&L.key===Q):null,Y=ne?ne.name:"Unknown";l[Y]=(l[Y]||0)+1}if(C&&y.fields&&y.fields[C.key]){const Q=y.fields[C.key],Z=(te=C.dropdownSettings)==null?void 0:te.items,ne=Array.isArray(Z)?Z.find(L=>L&&L.key===Q):null,Y=ne?ne.name:"Not Set";d[Y]=(d[Y]||0)+1}else d["Not Set"]=(d["Not Set"]||0)+1;if(E&&y.fields&&y.fields[E.key]){const Q=y.fields[E.key],Z=(P=E.dropdownSettings)==null?void 0:P.items,ne=Array.isArray(Z)?Z.find(L=>L&&L.key===Q):null,Y=ne?ne.name:"Not Set";p[Y]=(p[Y]||0)+1}else p["Not Set"]=(p["Not Set"]||0)+1;if(S&&y.fields&&y.fields[S.key]){const Q=y.fields[S.key],Z=(ae=S.dropdownSettings)==null?void 0:ae.items,ne=Array.isArray(Z)?Z.find(L=>L&&L.key===Q):null,Y=ne?ne.name:"Unknown";m[Y]=(m[Y]||0)+1}else m.Unknown=(m.Unknown||0)+1;if(R&&y.fields&&y.fields[R.key]){const Q=y.fields[R.key],Z=(ge=R.dropdownSettings)==null?void 0:ge.items,ne=Array.isArray(Z)?Z.find(L=>L&&L.key===Q):null,Y=ne?ne.name:"Unknown";u[Y]=(u[Y]||0)+1}else u.Unknown=(u.Unknown||0)+1;const G=y.freshness||0;G>.5?g["High (>0.5)"]++:G>=.2?g["Medium (0.2-0.5)"]++:g["Low (<0.2)"]++});const U={};Object.keys(d).forEach(y=>{U[y]=i>0?(d[y]/i*100).toFixed(1):0});const T={};Object.keys(p).forEach(y=>{T[y]=i>0?(p[y]/i*100).toFixed(1):0});const f=new Date,I=[],A=10;for(let y=11;y>=0;y--){const N=new Date(f.getFullYear(),f.getMonth()-y,1),M=N.getFullYear(),G=N.getMonth()+1,W=Array.isArray(r)?r.filter(P=>{const ae=new Date(P.creationTimestamp);return ae.getFullYear()===M&&ae.getMonth()+1===G}).length:0,te=(W/A*100).toFixed(1);I.push({month:`${M}-${String(G).padStart(2,"0")}`,monthName:N.toLocaleString("en-US",{month:"short",year:"numeric"}),count:W,objective:A,percentage:parseFloat(te),status:W>=A?"achieved":"pending"})}const B=(I.reduce((y,N)=>y+N.count,0)/12).toFixed(1),ee=(parseFloat(B)/A*100).toFixed(1);let me=0,he=null;if(Array.isArray(r)&&r.length>0){const y=r.map(N=>N.creationTimestamp).filter(N=>N);if(y.length>0){const N=Math.min(...y);he=new Date(N);const M=f.getFullYear()-he.getFullYear(),G=f.getMonth()-he.getMonth();me=M*12+G+1}}let F=null;if(s.straightInReportId){const y=await Un(s.straightInReportId).catch(()=>null);y&&(F=hr(y))}if(!F){const y=s.networkSheetGid||((t=s.sources)==null?void 0:t.network);y&&(F=await Ja(y))}return e.json({company:s.name,companyKey:n,services:s.services||{promote:!0,network:!0,engage:!0},totalBoxes:i,campaignDurationMonths:me,firstLeadDate:he?he.toISOString():null,networkData:F,stageDistribution:c,originDistribution:l,fitDistribution:d,fitPercentages:U,interestDistribution:p,interestPercentages:T,countryDistribution:m,languageDistribution:u,freshnessDistribution:g,monthlyLeads:I,leadObjective:A,averageLeadsPerMonth:parseFloat(B),averagePercentage:parseFloat(ee),recentBoxes:Array.isArray(r)?r.filter(y=>{var te,P;const N=C&&y.fields&&y.fields[C.key],M=E&&y.fields&&y.fields[E.key];let G="Not Set";if(N){const ae=y.fields[C.key],ge=(te=C.dropdownSettings)==null?void 0:te.items,Q=Array.isArray(ge)?ge.find(Z=>Z&&Z.key===ae):null;G=Q?Q.name:"Not Set"}let W="Not Set";if(M){const ae=y.fields[E.key],ge=(P=E.dropdownSettings)==null?void 0:P.items,Q=Array.isArray(ge)?ge.find(Z=>Z&&Z.key===ae):null;W=Q?Q.name:"Not Set"}return G==="High"||W==="High"}).slice(0,10).map(y=>{var ge,Q,Z,ne;const N=h.find(Y=>Y&&Y.key===y.stageKey);let M="Not Set";if(C&&y.fields&&y.fields[C.key]){const Y=y.fields[C.key],L=(ge=C.dropdownSettings)==null?void 0:ge.items,J=Array.isArray(L)?L.find(re=>re&&re.key===Y):null;M=J?J.name:"Not Set"}let G="Not Set";if(E&&y.fields&&y.fields[E.key]){const Y=y.fields[E.key],L=(Q=E.dropdownSettings)==null?void 0:Q.items,J=Array.isArray(L)?L.find(re=>re&&re.key===Y):null;G=J?J.name:"Not Set"}let W=null;w&&y.fields&&y.fields[w.key]&&(W=new Date(y.fields[w.key]).toISOString());let te="Unknown";if(S&&y.fields&&y.fields[S.key]){const Y=y.fields[S.key],L=(Z=S.dropdownSettings)==null?void 0:Z.items,J=Array.isArray(L)?L.find(re=>re&&re.key===Y):null;te=J?J.name:"Unknown"}let P="Unknown";if(R&&y.fields&&y.fields[R.key]){const Y=y.fields[R.key],L=(ne=R.dropdownSettings)==null?void 0:ne.items,J=Array.isArray(L)?L.find(re=>re&&re.key===Y):null;P=J?J.name:"Unknown"}const ae=y.freshness||0;return{name:y.name||"Unnamed",key:y.boxKey,stage:N?N.name:"Unknown",fit:M,interest:G,dueDate:W,country:te,language:P,freshness:ae.toFixed(3),lastUpdated:new Date(y.lastUpdatedTimestamp).toISOString()}}):[]})}catch(n){return e.json({error:n.message},500)}});async function ns(e){var m,u;const{sheetId:t,gid:n}=Qa(e),s=`https://docs.google.com/spreadsheets/d/${t}/export?format=csv&gid=${n}`,o=await fetch(s);if(!o.ok)throw new Error(`Google Sheets error: ${o.statusText}`);const r=(await o.text()).split(`
`).filter(g=>g.trim());if(r.length<2)return{platforms:{}};const i=r[0].split(",").map(g=>g.trim().toLowerCase().replace(/\s+/g,"_")),c=g=>i.indexOf(g),l=[];for(let g=1;g<r.length;g++){const v=r[g].split(",");v.length<5||l.push({date:((m=v[c("date")])==null?void 0:m.trim())||"",platform:(((u=v[c("platform")])==null?void 0:u.trim())||"linkedin").toLowerCase(),followers:parseInt(v[c("follower_count")])||0,impressions:parseFloat(v[c("impressions")])||0,reach:parseInt(v[c("reach")])||0,likes:parseInt(v[c("like_count")])||0,comments:parseInt(v[c("comment_count")])||0,shares:parseInt(v[c("share_count")])||0,clicks:parseInt(v[c("click_count")])||0,engagements:parseInt(v[c("overall_engagements")])||0,engRate:parseFloat(v[c("engagement_rate")])||0,netGrowth:parseInt(v[c("net_audience_growth")])||0,posts:parseInt(v[c("post_count")])||0})}const d={};l.forEach(g=>{d[g.platform]||(d[g.platform]=[]),d[g.platform].push(g)});const p={};for(const[g,v]of Object.entries(d)){const h=[...v].sort((y,N)=>y.date.localeCompare(N.date)),b=h[0].followers,k=h[h.length-1].followers,C=k-b,E=b>0?+(C/b*100).toFixed(1):0,w=h.reduce((y,N)=>y+N.posts,0),S=Math.round(h.reduce((y,N)=>y+N.impressions,0)),R=h.reduce((y,N)=>y+N.reach,0),U=h.reduce((y,N)=>y+N.engagements,0),T=h.reduce((y,N)=>y+N.likes,0),f=h.reduce((y,N)=>y+N.comments,0),I=h.reduce((y,N)=>y+N.shares,0),A=h.filter(y=>y.impressions>0&&y.engRate>0).map(y=>y.engRate),H=A.length>0?+(A.reduce((y,N)=>y+N,0)/A.length*100).toFixed(2):0,B={};h.forEach(y=>{const N=new Date(y.date),M=N.getDay(),G=new Date(N);G.setDate(N.getDate()-(M===0?6:M-1));const W=G.toISOString().split("T")[0];B[W]||(B[W]={week:W,posts:0,impressions:0,engagements:0,reach:0,netGrowth:0}),B[W].posts+=y.posts,B[W].impressions+=Math.round(y.impressions),B[W].engagements+=y.engagements,B[W].reach+=y.reach,B[W].netGrowth+=y.netGrowth});const ee=Object.values(B).sort((y,N)=>y.week.localeCompare(N.week)),me=ee.length||1,he=+(w/me).toFixed(1),F=h.map(y=>({date:y.date,followers:y.followers,posts:y.posts,impressions:Math.round(y.impressions),engagements:y.engagements,reach:y.reach}));p[g]={followersStart:b,followersEnd:k,followersGrowth:C,followersGrowthPct:E,totalPosts:w,avgPostsPerWeek:he,totalImpressions:S,totalReach:R,totalEngagements:U,totalLikes:T,totalComments:f,totalShares:I,avgEngRate:H,weeklyBreakdown:ee,dailyData:F,dateRange:{from:h[0].date,to:h[h.length-1].date}}}return{platforms:p}}let sn=null;async function yr(){const e=Date.now();if(sn&&e-sn.at<300*1e3)return sn.list;try{const t=await gt("/api/clients?light=1");if(!t.ok)throw new Error(`social /api/clients ${t.status}`);const n=await t.json(),s=Array.isArray(n)?n:n.clients||n.data||[];return sn={at:e,list:s},s}catch{return[]}}function wt(e){return String(e||"").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/\b(sarl|sas|sa|ag|inc|llc|ltd|corp|gmbh|group|north america|na)\b/g,"").replace(/[^a-z0-9]+/g,"").trim()}async function as(e){const t=await yr();if(!t.length)return null;if(e.socialClientId){const a=t.find(r=>r.id===e.socialClientId);if(a)return a}if(e.socialSlug){const a=t.find(r=>r.slug===e.socialSlug);if(a)return a}const n=wt(e.name);let s=t.find(a=>wt(a.name)===n);return s||(s=t.find(a=>wt(a.slug)===n),s)?s:t.filter(a=>{const r=wt(a.name);return n.length>=4&&(r.startsWith(n)||n.startsWith(r))}).sort((a,r)=>wt(r.name).length-wt(a.name).length)[0]||null}async function br(e){const t=await as(e);if(!t)return null;try{const[n,s,o]=await Promise.all([gt(`/api/analytics/summary?clientId=${t.id}&days=30`).then(b=>b.ok?b.json():null).catch(()=>null),gt(`/api/analytics/summary?clientId=${t.id}&days=7`).then(b=>b.ok?b.json():null).catch(()=>null),gt(`/api/followers?clientId=${t.id}`).then(b=>b.ok?b.json():null).catch(()=>null)]),a=n&&n.data||{},r=s&&s.data||{},i=a.totals||{posts:0,likes:0,comments:0,shares:0,engagement:0},c=r.totals||{posts:0,likes:0,comments:0,shares:0,engagement:0},l=o&&o.data&&o.data.summary||{};let d=0,p=0,m=0;const u=[];for(const[b,k]of Object.entries(l)){const C=k.count||0;d+=C,typeof k.previous30=="number"&&(p+=C-k.previous30),typeof k.previous7=="number"&&(m+=C-k.previous7),u.push({platform:b,count:C,growth7:typeof k.previous7=="number"?C-k.previous7:null,growth30:typeof k.previous30=="number"?C-k.previous30:null,date:k.date||""})}const g={};for(const[b,k]of Object.entries(a.byPlatform||{}))g[b]={posts:k.posts||0,likes:k.likes||0,comments:k.comments||0,shares:k.shares||0,engagement:(k.likes||0)+(k.comments||0)+(k.shares||0)};const v=c.posts||0,h=Math.round((i.posts||0)/30*7*10)/10;return{configured:!0,clientId:t.id,clientName:t.name,clientSlug:t.slug,posts30:i.posts||0,likes30:i.likes||0,comments30:i.comments||0,shares30:i.shares||0,engagement30:i.engagement||(i.likes||0)+(i.comments||0)+(i.shares||0),postsThisWeek:v,engagement7:c.engagement||(c.likes||0)+(c.comments||0)+(c.shares||0),avgPostsPerWeek:h,platforms:g,platformNames:Object.keys(g),followersTotal:d,followersGrowth7:m,followersGrowth30:p,followerPlatforms:u,topPosts:(a.topPosts||[]).slice(0,3).map(b=>({platform:b.platform,url:b.postUrl,snippet:b.textSnippet||"",engagement:b.totalEngagement||0,date:b.publishedDateLocal||""}))}}catch{return null}}async function ss(e){const t=await as(e);if(!t)return null;try{const[n,s]=await Promise.all([gt(`/api/analytics/summary?clientId=${t.id}&days=30`).then(m=>m.ok?m.json():null).catch(()=>null),gt(`/api/followers?clientId=${t.id}`).then(m=>m.ok?m.json():null).catch(()=>null)]),o=n&&n.data||{},a=o.byPlatform||{},r=o.postsByDay||[],i=s&&s.data&&s.data.snapshots||[],c=s&&s.data&&s.data.summary||{},l={};for(const m of i)l[m.platform]||(l[m.platform]=[]),l[m.platform].push({date:m.snapshotDateLocal,followers:m.followerCount||0});const d={},p=new Set([...Object.keys(a),...Object.keys(c)]);for(const m of p){const u=m.toLowerCase(),g=a[m]||{posts:0,likes:0,comments:0,shares:0},v=(g.likes||0)+(g.comments||0)+(g.shares||0),h=(l[m]||[]).sort((I,A)=>I.date.localeCompare(A.date)),b=I=>{let A=0;for(const H of h)if(H.date<=I)A=H.followers;else break;return A},k=r.map(I=>({date:I.date,followers:b(I.date),posts:I.byPlatform&&I.byPlatform[m]||0,impressions:0,engagements:0,reach:0})),C={};k.forEach(I=>{const A=new Date(I.date),H=A.getDay(),B=new Date(A);B.setDate(A.getDate()-(H===0?6:H-1));const ee=B.toISOString().split("T")[0];C[ee]||(C[ee]={week:ee,posts:0,impressions:0,engagements:0,reach:0,netGrowth:0}),C[ee].posts+=I.posts});const E=Object.values(C).sort((I,A)=>I.week.localeCompare(A.week)),w=E.length||1,S=c[m]||{},R=S.count||(h.length?h[h.length-1].followers:0),U=typeof S.previous30=="number"?S.previous30:h.length?h[0].followers:0,T=R-U,f=U>0?+(T/U*100).toFixed(1):0;d[u]={followersStart:U,followersEnd:R,followersGrowth:T,followersGrowthPct:f,latestFollowers:R,totalPosts:g.posts||0,avgPostsPerWeek:+((g.posts||0)/w).toFixed(1),totalImpressions:0,totalReach:0,totalEngagements:v,totalLikes:g.likes||0,totalComments:g.comments||0,totalShares:g.shares||0,avgEngRate:0,weeklyBreakdown:E,dailyData:k,dateRange:k.length?{from:k[0].date,to:k[k.length-1].date}:{from:"",to:""},source:"social"}}return{platforms:d,source:"social",socialClient:{id:t.id,name:t.name}}}catch{return null}}const xr=[{step:"won",match:/\b(won|client|signed|closed won|nda signed)\b/i},{step:"proposal",match:/\b(proposal|quote|negotiat|contract|offer)\b/i},{step:"meeting",match:/\b(call scheduled|meeting|demo|engaged|call booked|scheduled)\b/i},{step:"connected",match:/\b(connected|replied|responded|reconnect|later stage|lead\b|interested)\b/i},{step:"contacted",match:/\b(contacted|reached out|invited|outreach|messaged|sent)\b/i},{step:"recycled",match:/\b(recycl|declined|lost|not interested|dead|closed lost|dnc)\b/i}];function Tn(e){const t=e||"";for(const n of xr)if(n.match.test(t))return n.step;return"contacted"}const In=["contacted","connected","meeting","proposal","won","recycled"],ra={contacted:"Contacted",connected:"Connected",meeting:"Meeting",proposal:"Proposal",won:"Won",recycled:"Recycled"};$.get("/api/promote",async e=>{var t;try{const n=e.req.query("company")||"mabsilico",s=await Ge(e.env.COMPANIES_KV,n);if(!s)return e.json({error:"Company not found"},404);const o=await ss(s).catch(()=>null);if(o&&Object.keys(o.platforms||{}).length)return e.json(o);const a=((t=s.sources)==null?void 0:t.promote)||"";if(a){const r=await ns(a);return e.json(r)}return e.json({error:`No social account tracked for "${s.name}" on social.gershoncrm.com, and no Promote sheet configured.`},404)}catch(n){return e.json({error:n.message},500)}});$.get("/api/overview",async e=>{try{let t=function(h){let b=0,k=s;return h==="week"?b=s-6048e5:h==="last-month"?(b=new Date(o.getFullYear(),o.getMonth()-1,1).getTime(),k=new Date(o.getFullYear(),o.getMonth(),1).getTime()):h==="this-month"?b=new Date(o.getFullYear(),o.getMonth(),1).getTime():h==="year"&&(b=new Date(o.getFullYear(),0,1).getTime()),{start:b,end:k}};const n=e.req.query("period")||"this-month",s=Date.now(),o=new Date,a={start:s-10080*60*1e3,end:s},r={start:new Date(o.getFullYear(),o.getMonth()-1,1).getTime(),end:new Date(o.getFullYear(),o.getMonth(),1).getTime()},i=t(n),c=await ft(e.env.COMPANIES_KV),l=await Promise.all(c.map(async h=>{var b,k;try{let C=function(se,fe){return B.filter(Ve=>{const Bn=Ve.creationTimestamp||0;return Bn>=se&&Bn<fe}).length};const E=((b=h.sources)==null?void 0:b.promote)||"",w=h.networkSheetGid||((k=h.sources)==null?void 0:k.network)||"",S=h.straightInReportId||"",[R,U,T,f,I]=await Promise.all([z(`/pipelines/${h.pipelineKey}/boxes`).catch(()=>[]),ss(h).catch(()=>null),E?ns(E).catch(()=>({platforms:{}})):Promise.resolve({platforms:{}}),w?Ja(w).catch(()=>({avgAcceptanceRate:0,totalInvitations:0,totalAccepted:0})):Promise.resolve({avgAcceptanceRate:0,totalInvitations:0,totalAccepted:0}),S?Un(S).catch(()=>null):Promise.resolve(null)]),A=U&&Object.keys(U.platforms||{}).length?U:T,H=!!(A&&A.platforms&&Object.keys(A.platforms).length),B=Array.isArray(R)?R:[],ee=B.length,me=C(i.start,i.end),he=C(a.start,a.end),F=C(r.start,r.end),y={};B.forEach(se=>{const fe=se.stageKey||"Unknown";y[fe]=(y[fe]||0)+1});const N=B.filter(se=>(se.lastUpdatedTimestamp||0)>=a.start).length,M=10;let G=M;if(n==="week")G=Math.round(M/30*7);else if(n==="year")G=M*12;else if(n==="all"){const se=B.map(fe=>fe.creationTimestamp).filter(Boolean);if(se.length>0){const fe=new Date(Math.min(...se)),Ve=(o.getFullYear()-fe.getFullYear())*12+(o.getMonth()-fe.getMonth())+1;G=M*Math.max(Ve,1)}}let W=0,te=!1;if(H){te=!0;let se=0,fe=0;for(const Ve of Object.values(A.platforms))se+=Ve.totalPosts||0,Ve.dailyData&&Ve.dailyData.length>fe&&(fe=Ve.dailyData.length);W=fe>0?Math.round(se/fe*10)/10:0}const P=I,ae=!!(P&&P.configured)||!!w,ge=P!=null&&P.configured?P.acceptanceRate||0:f.avgAcceptanceRate||0,Q=new Date(o.getFullYear(),o.getMonth(),1).getTime(),Z=B.filter(se=>(se.creationTimestamp||0)>=Q).length,ne=Math.round(Z/10*100),Y=B.map(se=>se.creationTimestamp).filter(Boolean),L=Y.length>0?Math.min(...Y):0,J=L>0?Math.max(1,Math.round((s-L)/(30.44*24*60*60*1e3))):0;let re=0,yt=0,Jt=0;if(H)for(const se of Object.values(A.platforms))re+=se.totalPosts||0,yt+=se.totalImpressions||0,Jt+=se.latestFollowers||se.totalFollowers||0;const Oe=P!=null&&P.configured?P.connectionsSent||0:f.totalInvitations||0,bt=P!=null&&P.configured?P.accepted||0:f.totalAccepted||0,en=(P==null?void 0:P.messages)||0,is=(P==null?void 0:P.opportunityCount)||0,ls=(P==null?void 0:P.followUps)||0,cs=(P==null?void 0:P.openProfileInmails)||0,ds=(P==null?void 0:P.pageInvites)||0,ps=(P==null?void 0:P.profileVisits)||0,ms=!!(P&&P.configured);return{key:h.key,name:h.name,periodLeads:me,totalLeads:ee,weekLeads:he,lastMonthLeads:F,recentActivity:N,stageCount:Object.keys(y).length,goalPct:G>0?Math.round(me/G*100):0,promotePostsPerDay:W,promoteConfigured:te,promoteTotalPosts:re,promoteTotalImpressions:yt,promoteFollowers:Jt,networkAcceptanceRate:ge,networkConfigured:ae,networkInvitations:Oe,networkAccepted:bt,networkMessages:en,networkOpportunities:is,networkFollowUps:ls,networkInmails:cs,networkPageInvites:ds,networkProfileVisits:ps,networkStraightInConfigured:ms,engageMeetingsPct:ne,engageThisMonthLeads:Z,campaignMonths:J,firstLeadTs:L,services:h.services||{promote:!0,network:!0,engage:!0},error:!1}}catch{return{key:h.key,name:h.name,periodLeads:0,totalLeads:0,weekLeads:0,lastMonthLeads:0,recentActivity:0,stageCount:0,goalPct:0,promotePostsPerDay:0,promoteConfigured:!1,promoteTotalPosts:0,promoteTotalImpressions:0,promoteFollowers:0,networkAcceptanceRate:0,networkConfigured:!1,networkInvitations:0,networkAccepted:0,networkMessages:0,networkOpportunities:0,networkFollowUps:0,networkInmails:0,networkPageInvites:0,networkProfileVisits:0,networkStraightInConfigured:!1,engageMeetingsPct:0,engageThisMonthLeads:0,campaignMonths:0,firstLeadTs:0,services:h.services||{promote:!0,network:!0,engage:!0},error:!0}}}));l.sort((h,b)=>b.periodLeads-h.periodLeads);const d=l.filter(h=>!h.error).length||1,p=Math.round(l.reduce((h,b)=>h+b.weekLeads,0)/d*10)/10,m=Math.round(l.reduce((h,b)=>h+b.lastMonthLeads,0)/d*10)/10,u=Math.round(l.reduce((h,b)=>h+b.periodLeads,0)/d*10)/10,g=Math.round(l.reduce((h,b)=>h+b.totalLeads,0)/d*10)/10,v=Math.round(l.reduce((h,b)=>h+b.recentActivity,0)/d*10)/10;return e.json({period:n,totalPeriodLeads:l.reduce((h,b)=>h+b.periodLeads,0),totalAllLeads:l.reduce((h,b)=>h+b.totalLeads,0),totalWeekLeads:l.reduce((h,b)=>h+b.weekLeads,0),totalLastMonthLeads:l.reduce((h,b)=>h+b.lastMonthLeads,0),averages:{weekLeads:p,lastMonthLeads:m,periodLeads:u,totalLeads:g,recentActivity:v},companies:l})}catch(t){return e.json({error:t.message},500)}});$.post("/api/admin/verify-google",async e=>{try{const t=await e.req.json();if(!t.token)return e.json({authorized:!1,error:"No token provided"},400);const n=await cr(t.token,e.env.GOOGLE_CLIENT_ID);if(!n)return e.json({authorized:!1,error:"Invalid token"},401);const s=Jo.includes(n.email.toLowerCase());return e.json({authorized:s,email:n.email,name:n.name})}catch{return e.json({authorized:!1,error:"Verification failed"},500)}});$.get("/api/admin/streak-key/status",async e=>{try{const t=await e.env.COMPANIES_KV.get("__streak_api_key__");if(t&&e.env.ENCRYPTION_KEY){const n=await za(t,e.env.ENCRYPTION_KEY),s=n.length>8?n.substring(0,4)+"****"+n.substring(n.length-4):"****";return e.json({configured:!0,maskedKey:s})}else if(e.env.STREAK_API_KEY){const n=e.env.STREAK_API_KEY,s=n.length>8?n.substring(0,4)+"****"+n.substring(n.length-4):"****";return e.json({configured:!0,maskedKey:s,source:"env"})}return e.json({configured:!1,maskedKey:null})}catch{return e.json({configured:!1,maskedKey:null,error:"Failed to check status"})}});$.post("/api/admin/streak-key",async e=>{try{const t=await e.req.json();if(!t.key)return e.json({success:!1,error:"API key is required"},400);if(!e.env.ENCRYPTION_KEY)return e.json({success:!1,error:"Encryption key not configured on server"},500);const n=await lr(t.key,e.env.ENCRYPTION_KEY);return await e.env.COMPANIES_KV.put("__streak_api_key__",n),e.json({success:!0,message:"Streak API key saved successfully"})}catch{return e.json({success:!1,error:"Failed to save key"},500)}});$.get("/api/admin/streak-health",async e=>{try{const t=Date.now(),n=await z("/users/me"),s=Date.now()-t;return e.json({ok:!0,email:n.email||n.lowercaseEmail||"unknown",latency:s})}catch(t){return e.json({ok:!1,error:t.message||"Connection failed"},200)}});$.get("/api/admin/streak-pipelines",async e=>{try{const t=await z("/pipelines"),n=Array.isArray(t)?t.map(s=>({name:s.name,key:s.pipelineKey||s.key,boxCount:s.boxCount})):[];return e.json(n)}catch{return e.json({error:"Failed to fetch pipelines"},500)}});$.get("/api/reports/comprehensive",async e=>{try{const t=e.req.query("period")==="week"?"week":"month",n=e.req.query("company")||null,s=await Rt(e.env.COMPANIES_KV),o=new Date,a=t==="week"?`Week of ${new Date(o.getTime()-7*864e5).toLocaleDateString("en-US",{month:"short",day:"numeric"})} — ${o.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}`:o.toLocaleDateString("en-US",{month:"long",year:"numeric"}),r=jn(s,{label:a,period:t,only:n});return e.html(r)}catch(t){return e.json({error:t.message},500)}});$.get("/api/reports/weekly",async e=>{try{const t=await Rt(e.env.COMPANIES_KV),n=new Date,o=`Week of ${new Date(n.getTime()-10080*60*1e3).toLocaleDateString("en-US",{month:"short",day:"numeric"})} — ${n.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}`,a=Za(t,o);return e.html(a)}catch(t){return e.json({error:t.message},500)}});$.get("/api/reports/monthly",async e=>{try{const t=await Rt(e.env.COMPANIES_KV),s=new Date().toLocaleDateString("en-US",{month:"long",year:"numeric"}),o=Xa(t,s);return e.html(o)}catch(t){return e.json({error:t.message},500)}});$.post("/api/reports/weekly/send",async e=>{try{if(!e.env.RESEND_API_KEY)return e.json({error:"RESEND_API_KEY not configured"},500);const t=await Rt(e.env.COMPANIES_KV),n=new Date,o=`Week of ${new Date(n.getTime()-10080*60*1e3).toLocaleDateString("en-US",{month:"short",day:"numeric"})} — ${n.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}`,a=t.reduce((p,m)=>p+m.newThisWeek,0),r=t.filter(p=>!p.error).length,i=r>0?Math.round(a/(r*2.5)*100):0,c=i>=100?"🟢":i>=75?"🟡":"🔴",l=Za(t,o),d=await Ya(e.env.RESEND_API_KEY,{from:e.env.REPORT_FROM_EMAIL||"Gershon.AI Reports <reports@gershoncrm.com>",to:(e.env.REPORT_TO_EMAIL||"report@gershonconsulting.com").split(",").map(p=>p.trim()),subject:`${c} Weekly Report — ${i}% of target · ${a} new leads — ${o}`,html:l});return e.json({success:!0,message:"Weekly report sent",emailId:d.id,stats:{totalNewLeads:a,overallPct:i,companies:t.length}})}catch(t){return e.json({error:t.message},500)}});$.post("/api/reports/monthly/send",async e=>{try{if(!e.env.RESEND_API_KEY)return e.json({error:"RESEND_API_KEY not configured"},500);const t=await Rt(e.env.COMPANIES_KV),s=new Date().toLocaleDateString("en-US",{month:"long",year:"numeric"}),o=t.reduce((d,p)=>d+p.newThisMonth,0),a=t.filter(d=>!d.error).length,r=a>0?Math.round(o/(a*10)*100):0,i=r>=100?"🟢":r>=75?"🟡":"🔴",c=Xa(t,s),l=await Ya(e.env.RESEND_API_KEY,{from:e.env.REPORT_FROM_EMAIL||"Gershon.AI Reports <reports@gershoncrm.com>",to:(e.env.REPORT_TO_EMAIL||"report@gershonconsulting.com").split(",").map(d=>d.trim()),subject:`${i} Monthly Report — ${r}% of target · ${o} leads — ${s}`,html:c});return e.json({success:!0,message:"Monthly report sent",emailId:l.id,stats:{totalNewLeads:o,overallPct:r,companies:t.length}})}catch(t){return e.json({error:t.message},500)}});$.get("/api/reports/data",async e=>{try{const t=await Rt(e.env.COMPANIES_KV);return e.json({companies:t,generated:new Date().toISOString()})}catch(t){return e.json({error:t.message},500)}});const vr=`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Straight-in Week Drop | client.gershonCRM</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap">
<style>
  :root{--ground:#f2f4f2;--surface:#fff;--surface2:#fafbfa;--ink:#141a18;--ink2:#4a5754;--ink3:#7c8a86;--line:#dde3e0;--line2:#eaefec;--accent:#0f6b5f;--good:#16704a;--good-soft:#e2f1e9;--warn:#8a5410;--warn-soft:#f7edda;--idle:#5a6866;--idle-soft:#edf0ef}
  *{box-sizing:border-box}
  body{margin:0;background:var(--ground);color:var(--ink);font-family:"IBM Plex Sans",system-ui,-apple-system,"Segoe UI",sans-serif;font-size:15px;line-height:1.5;-webkit-font-smoothing:antialiased}
  .wrap{max-width:1060px;margin:0 auto;padding:28px 20px 56px}
  a.back{color:var(--ink3);text-decoration:none;font-size:13px}
  a.back:hover{color:var(--accent)}
  header.top{display:flex;flex-wrap:wrap;gap:16px 24px;align-items:flex-end;justify-content:space-between;margin:10px 0 26px}
  .eyebrow{font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink3);font-weight:500}
  h1{font-size:26px;font-weight:600;margin:4px 0 0;letter-spacing:-.015em}
  .sub{color:var(--ink2);font-size:14px;max-width:62ch;margin:6px 0 0}
  .chip{background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:10px 14px;min-width:210px}
  .chip .k{font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--ink3)}
  .chip .v{font-family:"IBM Plex Mono",monospace;font-size:18px;font-weight:500}
  .chip .d{font-size:12.5px;color:var(--ink2)}
  .grid{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(0,1fr);gap:20px;align-items:start}
  @media(max-width:860px){.grid{grid-template-columns:minmax(0,1fr)}}
  .panel{background:var(--surface);border:1px solid var(--line);border-radius:12px}
  .panel>.head{padding:14px 18px;border-bottom:1px solid var(--line2);display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
  .panel>.head h2{font-size:14px;font-weight:600;margin:0}
  .panel>.body{padding:18px}
  label.field{display:block;font-size:12px;font-weight:500;letter-spacing:.06em;text-transform:uppercase;color:var(--ink3);margin-bottom:6px}
  textarea,input[type=date]{width:100%;background:var(--surface2);color:var(--ink);border:1px solid var(--line);border-radius:8px;padding:10px 12px;font-family:"IBM Plex Mono",monospace;font-size:12.5px;line-height:1.6}
  textarea{min-height:200px;resize:vertical}
  textarea:focus,input:focus,button:focus-visible{outline:2px solid var(--accent);outline-offset:1px}
  button{font:inherit;font-weight:500;border-radius:8px;padding:9px 16px;cursor:pointer;border:1px solid var(--line);background:var(--surface2);color:var(--ink)}
  button.primary{background:var(--accent);border-color:var(--accent);color:#fff}
  button:disabled{opacity:.5;cursor:not-allowed}
  .actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:14px;align-items:center}
  .status{font-size:12.5px;color:var(--ink2);min-height:1.4em}
  .status.err{color:var(--warn)}
  table{width:100%;border-collapse:collapse;font-size:13px}
  .tablewrap{overflow-x:auto}
  th{text-align:left;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--ink3);font-weight:500;padding:0 10px 8px 0;white-space:nowrap}
  td{padding:8px 10px 8px 0;border-top:1px solid var(--line2);vertical-align:top}
  .mono{font-family:"IBM Plex Mono",monospace;font-size:12px}
  td.id{color:var(--ink2);word-break:break-all}
  .pill{display:inline-block;font-size:11px;font-weight:500;padding:2px 8px;border-radius:999px;white-space:nowrap}
  .pill.up{background:var(--good-soft);color:var(--good)}
  .pill.same{background:var(--idle-soft);color:var(--idle)}
  .pill.none{background:var(--warn-soft);color:var(--warn)}
  ul.weeks{list-style:none;margin:0;padding:0}
  ul.weeks li{border-top:1px solid var(--line2)}
  ul.weeks li:first-child{border-top:none}
  ul.weeks button{width:100%;text-align:left;border:none;background:none;border-radius:0;padding:12px 4px;display:flex;justify-content:space-between;gap:12px;align-items:baseline}
  ul.weeks button:hover{background:var(--surface2)}
  ul.weeks .wk{font-family:"IBM Plex Mono",monospace;font-weight:500}
  ul.weeks .meta{font-size:12px;color:var(--ink3);text-align:right}
  .empty{color:var(--ink3);font-size:13px;padding:18px 0;text-align:center}
  .howto ol{margin:0;padding-left:20px;color:var(--ink2);font-size:13.5px}
  .howto li{margin-bottom:6px}
  h3.mini{font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:var(--ink3);font-weight:500;margin:22px 0 8px}
</style>
</head>
<body>
<div class="wrap">
  <a class="back" href="/admin">&larr; Admin</a>
  <header class="top">
    <div>
      <div class="eyebrow">Straight-in</div>
      <h1>Week Drop</h1>
      <p class="sub">Paste Monday's campaign-report links. Each week is filed under its week number, and the report IDs go straight onto the matching companies so Network and Engage pull fresh numbers.</p>
    </div>
    <div class="chip">
      <div class="k">Current week</div>
      <div class="v" id="chipWeek">&mdash;</div>
      <div class="d" id="chipDates">&mdash;</div>
    </div>
  </header>

  <div class="grid">
    <section class="panel">
      <div class="head"><h2>Paste this week's links</h2><span class="status" id="count"></span></div>
      <div class="body">
        <div style="margin-bottom:14px;max-width:210px">
          <label class="field" for="weekDate">Any date in the week</label>
          <input type="date" id="weekDate">
        </div>
        <label class="field" for="paste">Links &mdash; one per line</label>
        <textarea id="paste" spellcheck="false" placeholder="Enzym - https://prospecthub.straight-in.com/r/campaign-report/crp_..."></textarea>
        <div class="actions">
          <button class="primary" id="save">Save week &amp; update companies</button>
          <button id="clear">Clear</button>
          <span class="status" id="status"></span>
        </div>

        <div id="resultWrap" style="display:none">
          <h3 class="mini">Result</h3>
          <div class="tablewrap">
            <table><thead><tr><th>Campaign</th><th>Company</th><th>Report ID</th><th></th></tr></thead>
            <tbody id="result"></tbody></table>
          </div>
        </div>

        <div class="howto">
          <h3 class="mini">How this works</h3>
          <ol>
            <li>The week is stored under its own week number &mdash; nothing overwrites an earlier week.</li>
            <li>Every campaign that matches a company has its report ID written immediately.</li>
            <li>Campaigns with no company on the platform are kept with the week and attach as soon as the company exists.</li>
          </ol>
        </div>
      </div>
    </section>

    <section class="panel">
      <div class="head"><h2>Weeks on file</h2><span class="status" id="histCount"></span></div>
      <div class="body" style="padding:6px 18px 12px">
        <ul class="weeks" id="history"></ul>
        <div class="empty" id="histEmpty">No weeks saved yet.</div>
      </div>
    </section>
  </div>
</div>

<script>
(function(){
  var MONTHS=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  function isoParts(d){var t=new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate()));var day=t.getUTCDay()||7;t.setUTCDate(t.getUTCDate()+4-day);var y=t.getUTCFullYear();var j=new Date(Date.UTC(y,0,1));return{year:y,week:Math.ceil(((t-j)/86400000+1)/7)};}
  function weekKey(d){var p=isoParts(d);return p.year+'-W'+(p.week<10?'0'+p.week:String(p.week));}
  function monday(d){var t=new Date(d.getFullYear(),d.getMonth(),d.getDate());var day=t.getDay()||7;t.setDate(t.getDate()-(day-1));return t;}
  function range(d){var m=monday(d);var s=new Date(m.getFullYear(),m.getMonth(),m.getDate()+6);return m.getDate()+' '+MONTHS[m.getMonth()]+' – '+s.getDate()+' '+MONTHS[s.getMonth()]+' '+s.getFullYear();}
  function isoDate(d){var m=d.getMonth()+1,day=d.getDate();return d.getFullYear()+'-'+(m<10?'0'+m:m)+'-'+(day<10?'0'+day:day);}
  function $(id){return document.getElementById(id);}

  var today=new Date();
  $('weekDate').value=isoDate(today);
  $('chipWeek').textContent=weekKey(today);
  $('chipDates').textContent=range(today);

  function countLinks(){
    var n=0,lines=$('paste').value.split(/\\r?\\n/);
    for(var i=0;i<lines.length;i++){if(/crp_[A-Za-z0-9_-]+/.test(lines[i]))n++;}
    $('count').textContent=n?n+' link'+(n===1?'':'s')+' ready':'';
    $('save').disabled=!n;
    return n;
  }
  $('paste').addEventListener('input',countLinks);
  $('clear').addEventListener('click',function(){$('paste').value='';$('status').textContent='';$('status').className='status';$('resultWrap').style.display='none';countLinks();});
  countLinks();

  function pill(status){
    var s=document.createElement('span');
    if(status==='updated'){s.className='pill up';s.textContent='updated';}
    else if(status==='unchanged'){s.className='pill same';s.textContent='already current';}
    else{s.className='pill none';s.textContent='no company yet';}
    return s;
  }

  function showResult(week,summary){
    var tb=$('result');tb.innerHTML='';
    (week.entries||[]).forEach(function(e){
      var tr=document.createElement('tr');
      var a=document.createElement('td');a.textContent=e.label;tr.appendChild(a);
      var b=document.createElement('td');
      if(e.companyKey){var sp=document.createElement('span');sp.className='mono';sp.textContent=e.companyKey;b.appendChild(sp);}
      else{b.textContent='—';}
      tr.appendChild(b);
      var cc=document.createElement('td');cc.className='mono id';cc.textContent=e.reportId;tr.appendChild(cc);
      var d=document.createElement('td');d.appendChild(pill(e.status));tr.appendChild(d);
      tb.appendChild(tr);
    });
    $('resultWrap').style.display='';
    var msg=week.weekKey+' saved — '+summary.updated+' compan'+(summary.updated===1?'y':'ies')+' updated';
    if(summary.unchanged)msg+=', '+summary.unchanged+' already current';
    if(summary.unmatched)msg+=', '+summary.unmatched+' with no company yet';
    $('status').className='status';$('status').textContent=msg+'.';
  }

  $('save').addEventListener('click',function(){
    if(!countLinks())return;
    $('save').disabled=true;
    $('status').className='status';$('status').textContent='Saving…';
    fetch('/api/straightin/weeks',{method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({raw:$('paste').value,date:$('weekDate').value})})
      .then(function(r){return r.json().then(function(j){return{ok:r.ok,j:j};});})
      .then(function(res){
        if(!res.ok||res.j.error){throw new Error(res.j.error||'Save failed');}
        showResult(res.j.week,res.j.summary);
        loadHistory();
      })
      .catch(function(e){$('status').className='status err';$('status').textContent=e.message;})
      .then(function(){$('save').disabled=false;});
  });

  function loadHistory(){
    fetch('/api/straightin/weeks').then(function(r){return r.json();}).then(function(j){
      var ul=$('history');ul.innerHTML='';
      var weeks=j.weeks||[];
      if(!weeks.length){$('histEmpty').style.display='';$('histCount').textContent='';return;}
      $('histEmpty').style.display='none';
      $('histCount').textContent=weeks.length+' saved';
      weeks.forEach(function(w){
        var li=document.createElement('li');
        var b=document.createElement('button');
        var l=document.createElement('span');l.className='wk';l.textContent=w.weekKey;
        var r=document.createElement('span');r.className='meta';
        var n=(w.entries||[]).length;
        r.textContent=(w.range||'')+' · '+n+' campaign'+(n===1?'':'s');
        b.appendChild(l);b.appendChild(r);
        b.addEventListener('click',function(){
          $('paste').value=w.raw||'';
          if(w.mondayDate)$('weekDate').value=w.mondayDate;
          countLinks();
          showResult(w,{updated:0,unchanged:0,unmatched:0});
          $('status').className='status';
          $('status').textContent='Showing '+w.weekKey+' as it was saved. Press save to re-apply it.';
          window.scrollTo({top:0,behavior:'smooth'});
        });
        li.appendChild(b);ul.appendChild(li);
      });
    }).catch(function(){$('histEmpty').textContent='Saved weeks could not be loaded.';});
  }
  loadHistory();
})();
<\/script>
</body>
</html>
`,ia={enzym:"enzymicals-ag",enzymicals:"enzymicals-ag",phitech:"phitech-bioinformatics",urban:"urban-factory",mab:"mabsilico",valos:"valos",altavia:"altavia",apm:"apm-music","finance steve":"finance-montreal","finance noza":"finance-montreal-noza"};function on(e){return String(e||"").toLowerCase().replace(/[^a-z0-9]+/g,"")}function wr(e){const t=new Date(Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate())),n=t.getUTCDay()||7;t.setUTCDate(t.getUTCDate()+4-n);const s=t.getUTCFullYear(),o=new Date(Date.UTC(s,0,1)),a=Math.ceil(((t.getTime()-o.getTime())/864e5+1)/7);return{year:s,week:a}}function os(e){const t=new Date(Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate())),n=t.getUTCDay()||7;return t.setUTCDate(t.getUTCDate()-(n-1)),t}function la(e){return e.toISOString().slice(0,10)}function kr(e){const t=wr(e);return t.year+"-W"+(t.week<10?"0"+t.week:String(t.week))}const ca=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function Er(e){const t=os(e),n=new Date(t.getTime()+6*864e5);return t.getUTCDate()+" "+ca[t.getUTCMonth()]+" – "+n.getUTCDate()+" "+ca[n.getUTCMonth()]+" "+n.getUTCFullYear()}function Sr(e){const t=[],n=String(e||"").split(/\r?\n/);for(const s of n){const o=s.trim();if(!o)continue;const a=o.match(/https?:\/\/\S+/);if(!a||a.index===void 0)continue;const r=a[0].replace(/[),.]+$/,""),i=r.match(/crp_[A-Za-z0-9_\-]+/);if(!i)continue;let c=o.slice(0,a.index).replace(/[\s\-–—:|]+$/,"").trim();c||(c=i[0]),t.push({label:c,url:r,reportId:i[0]})}return t}function Cr(e,t){const n=on(e);if(!n)return null;const s={};for(const a of t)s[a.key]=a;for(const a of Object.keys(ia)){const r=on(a);if(n.indexOf(r)===0||r.indexOf(n)===0){const i=ia[a];if(s[i])return i}}const o=t.filter(a=>{const r=on(a.key),i=on(a.name);return r&&(r.indexOf(n)===0||n.indexOf(r)===0)||i&&(i.indexOf(n)===0||n.indexOf(i)===0)});return o.length===1?o[0].key:null}$.get("/api/straightin/weeks",async e=>{try{const t=await e.env.COMPANIES_KV.list({prefix:"straightin:week:"}),n=[];for(const s of t.keys){const o=await e.env.COMPANIES_KV.get(s.name);o&&n.push(JSON.parse(o))}return n.sort((s,o)=>String(o.weekKey).localeCompare(String(s.weekKey))),e.json({weeks:n,count:n.length})}catch{return e.json({error:"Failed to load saved weeks"},500)}});$.get("/api/straightin/weeks/:weekKey",async e=>{try{const t=await e.env.COMPANIES_KV.get("straightin:week:"+e.req.param("weekKey"));return t?e.json({week:JSON.parse(t)}):e.json({error:"Week not found"},404)}catch{return e.json({error:"Failed to load week"},500)}});$.post("/api/straightin/weeks",async e=>{try{const t=await e.req.json(),n=String(t.raw||""),s=Sr(n);if(!s.length)return e.json({error:"No campaign report links found in that text. Each line needs a campaign name and its prospecthub link."},400);const o=t.date?new Date(String(t.date)+"T12:00:00Z"):new Date;if(isNaN(o.getTime()))return e.json({error:"That date could not be read."},400);const a=kr(o),r=os(o),i=new Date(r.getTime()+6*864e5),c=await ft(e.env.COMPANIES_KV,!0),l=[];let d=0,p=0,m=0;for(const g of s){const v=Cr(g.label,c);if(!v){m++,l.push({...g,companyKey:null,previous:null,status:"no-company"});continue}const h=c.find(C=>C.key===v)||{key:v},b=h.straightInReportId||"";if(b===g.reportId){p++,l.push({...g,companyKey:v,previous:b,status:"unchanged"});continue}const k={...h,key:v,straightInReportId:g.reportId};await e.env.COMPANIES_KV.put("company:"+v,JSON.stringify(k)),h.straightInReportId=g.reportId,d++,l.push({...g,companyKey:v,previous:b,status:"updated"})}const u={weekKey:a,mondayDate:la(r),sundayDate:la(i),range:Er(o),savedAt:new Date().toISOString(),raw:n,entries:l};return await e.env.COMPANIES_KV.put("straightin:week:"+a,JSON.stringify(u)),e.json({success:!0,week:u,summary:{updated:d,unchanged:p,unmatched:m,total:l.length}})}catch(t){return e.json({error:"Failed to save week: "+(t&&t.message?t.message:"unknown error")},500)}});$.get("/straightin",e=>e.html(vr));$.get("/admin",e=>e.html(`
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
                        <span class="text-sm text-gray-600">Version <strong>1.3.69</strong></span>
                        <a href="/" class="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all">
                            <i class="fas fa-arrow-left mr-2"></i>
                            Back to Dashboard
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div class="max-w-7xl mx-auto px-6 py-8">
            <!-- Streak API Health + Key Management -->
            <div class="bg-white rounded-lg shadow-lg p-8 mb-8 border-l-4 border-red-500">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-2xl font-bold text-gray-800 flex items-center">
                        <i class="fas fa-key text-red-600 mr-3"></i>
                        Streak API Key Management
                    </h2>
                    <div id="streak-health" class="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-500 text-sm">
                        <i class="fas fa-spinner fa-spin"></i> Checking API...
                    </div>
                </div>
                <p class="text-gray-600 mb-4">Manage the Streak API key. Enter your key from Streak Settings &rarr; Integrations &rarr; API.</p>

                <!-- Google Sign-In (disabled — direct key entry enabled) -->
                <!--
                <div id="google-signin-section">
                    <div id="g_id_onload"
                        data-client_id="${e.env.GOOGLE_CLIENT_ID||"122652289881-c1tl6o48nvebuskflujembp28qfgvv36.apps.googleusercontent.com"}"
                        data-callback="handleGoogleSignIn"
                        data-auto_prompt="false">
                    </div>
                    <div class="g_id_signin"
                        data-type="standard"
                        data-size="large"
                        data-theme="outline"
                        data-text="sign_in_with"
                        data-shape="rectangular"
                        data-logo_alignment="left">
                    </div>
                    <div id="signin-status" class="mt-3 text-sm text-gray-500"></div>
                </div>
                -->

                <!-- Key Management (visible by default — no sign-in required) -->
                <div id="streak-key-section" class="mt-6 pt-6 border-t border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-700">Current Key Status</h3>
                        <div id="streak-key-status">
                            <span class="text-gray-400">Checking...</span>
                        </div>
                    </div>
                    <div class="flex gap-3">
                        <input type="password" id="streak-key-input" placeholder="Enter new Streak API key (e.g., strk_...)"
                            class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 font-mono text-sm" />
                        <button id="streak-key-save" onclick="saveStreakKey()"
                            class="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all shadow-lg">
                            <i class="fas fa-save mr-2"></i>Save Key
                        </button>
                    </div>
                    <div id="streak-key-message" class="mt-2 text-sm"></div>
                </div>
            </div>

            <!-- <script src="https://accounts.google.com/gsi/client" async defer><\/script> -->
            <script>
                // Auto-check Streak API health on page load
                (function checkStreakHealth() {
                    fetch('/api/admin/streak-health')
                    .then(function(r) { return r.json(); })
                    .then(function(data) {
                        var el = document.getElementById('streak-health');
                        if (data.ok) {
                            el.className = 'flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium';
                            el.innerHTML = '<i class="fas fa-check-circle text-green-600"></i> API Connected (' + data.latency + 'ms) — ' + data.email;
                        } else {
                            el.className = 'flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 text-red-700 text-sm font-medium';
                            el.innerHTML = '<i class="fas fa-times-circle text-red-600"></i> API Error: ' + (data.error || 'Connection failed');
                        }
                    })
                    .catch(function() {
                        var el = document.getElementById('streak-health');
                        el.className = 'flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 text-red-700 text-sm font-medium';
                        el.innerHTML = '<i class="fas fa-times-circle text-red-600"></i> Cannot reach server';
                    });
                })();

                // Google Sign-In disabled — direct key entry enabled
                // var googleIdToken = null;

                // function handleGoogleSignIn(response) {
                //     googleIdToken = response.credential;
                //     var statusEl = document.getElementById('signin-status');
                //     statusEl.innerHTML = '<span class="text-yellow-600"><i class="fas fa-spinner fa-spin mr-1"></i>Verifying...</span>';
                //
                //     fetch('/api/admin/verify-google', {
                //         method: 'POST',
                //         headers: { 'Content-Type': 'application/json' },
                //         body: JSON.stringify({ token: googleIdToken })
                //     })
                //     .then(function(r) { return r.json(); })
                //     .then(function(data) {
                //         if (data.authorized) {
                //             statusEl.innerHTML = '<span class="text-green-600"><i class="fas fa-check-circle mr-1"></i>Signed in as ' + data.email + '</span>';
                //             document.getElementById('streak-key-section').style.display = 'block';
                //             loadStreakKeyStatus();
                //         } else {
                //             statusEl.innerHTML = '<span class="text-red-600"><i class="fas fa-times-circle mr-1"></i>Access denied for ' + (data.email || 'this account') + '</span>';
                //             googleIdToken = null;
                //         }
                //     })
                //     .catch(function() {
                //         statusEl.innerHTML = '<span class="text-red-600">Verification failed. Try again.</span>';
                //         googleIdToken = null;
                //     });
                // }

                // Load key status immediately (no sign-in required)
                loadStreakKeyStatus();

                function loadStreakKeyStatus() {
                    fetch('/api/admin/streak-key/status')
                    .then(function(r) { return r.json(); })
                    .then(function(data) {
                        var el = document.getElementById('streak-key-status');
                        if (data.configured) {
                            var sourceNote = data.source === 'env' ? ' <span class="text-yellow-600 text-xs">(env var)</span>' : ' <span class="text-green-600 text-xs">(encrypted in KV)</span>';
                            el.innerHTML = '<span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"><i class="fas fa-check mr-1"></i>Configured</span>' + sourceNote + '<br/><span class="text-gray-500 font-mono text-sm mt-1 inline-block">' + data.maskedKey + '</span>';
                        } else {
                            el.innerHTML = '<span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800"><i class="fas fa-times mr-1"></i>Not configured</span>';
                        }
                    })
                    .catch(function() {
                        document.getElementById('streak-key-status').innerHTML = '<span class="text-red-600">Failed to check</span>';
                    });
                }

                function saveStreakKey() {
                    var keyInput = document.getElementById('streak-key-input');
                    var key = keyInput.value.trim();
                    if (!key) { alert('Please enter a Streak API key.'); return; }
                    var msgEl = document.getElementById('streak-key-message');
                    var saveBtn = document.getElementById('streak-key-save');
                    saveBtn.disabled = true;
                    saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Saving...';
                    msgEl.innerHTML = '';

                    fetch('/api/admin/streak-key', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ key: key })
                    })
                    .then(function(r) { return r.json(); })
                    .then(function(data) {
                        saveBtn.disabled = false;
                        saveBtn.innerHTML = '<i class="fas fa-save mr-2"></i>Save Key';
                        if (data.success) {
                            msgEl.innerHTML = '<span class="text-green-600"><i class="fas fa-check-circle mr-1"></i>Key saved and encrypted successfully!</span>';
                            keyInput.value = '';
                            loadStreakKeyStatus();
                        } else {
                            msgEl.innerHTML = '<span class="text-red-600"><i class="fas fa-exclamation-circle mr-1"></i>' + (data.error || 'Unknown error') + '</span>';
                        }
                    })
                    .catch(function() {
                        saveBtn.disabled = false;
                        saveBtn.innerHTML = '<i class="fas fa-save mr-2"></i>Save Key';
                        msgEl.innerHTML = '<span class="text-red-600">Network error. Please try again.</span>';
                    });
                }
            <\/script>

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
                    <div class="md:col-span-2">
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



                    <!-- Streak Pipeline Key (ENGAGE) -->
                    <div class="md:col-span-2">
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-handshake text-green-600 mr-1"></i>
                            ENGAGE — Streak API Key <span class="text-red-500">*</span>
                        </label>
                        <textarea
                            id="pipeline-key"
                            rows="2"
                            placeholder="e.g., agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlh..."
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 font-mono text-sm"
                            required
                        ></textarea>
                    </div>

                    <!-- NETWORK URL -->
                    <div class="md:col-span-2">
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-users text-blue-600 mr-1"></i>
                            NETWORK — Google Sheets Link
                        </label>
                        <input
                            type="url"
                            id="network-url"
                            placeholder="https://docs.google.com/spreadsheets/..."
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                        />
                    </div>

                    <!-- PROMOTE URL -->
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-bullhorn text-yellow-600 mr-1"></i>
                            PROMOTE URL
                        </label>
                        <input
                            type="url"
                            id="promote-url"
                            placeholder="https://..."
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 font-mono text-sm"
                        />
                    </div>

                    <!-- Notion OnBoarding -->
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-book text-purple-600 mr-1"></i>
                            OnBoarding — Notion Link
                        </label>
                        <input
                            type="url"
                            id="notion-url"
                            placeholder="https://notion.so/..."
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-mono text-sm"
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
                    const response = await fetch('/api/companies?includeArchived=true');
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

            function companyCard(company, isArchived) {
                const sources = company.sources || {};
                const cardStyle = isArchived ? 'border-gray-200 bg-gray-50 opacity-75' : 'border-gray-200 hover:shadow-lg';
                const nameBadge = isArchived ? '<span class="ml-2 text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full font-normal">Archived</span>' : '';
                const iconColor = isArchived ? 'text-gray-400' : 'text-blue-600';
                return \`
                <div class="border rounded-lg p-6 transition-all \${cardStyle}">
                    <div class="flex items-start justify-between mb-4">
                        <div class="flex-1">
                            <h3 class="text-lg font-bold text-gray-800 mb-3">
                                <i class="fas fa-building \${iconColor} mr-2"></i>
                                \${company.name}\${nameBadge}
                            </h3>
                            <div class="mb-3">
                                <span class="text-gray-600 font-medium text-sm">Key:</span>
                                <code class="ml-2 bg-gray-100 px-2 py-1 rounded text-xs font-mono">\${company.key}</code>
                            </div>
                            <div class="space-y-2 mt-4">
                                <h4 class="text-sm font-semibold text-gray-700 mb-2">Data Sources:</h4>
                                <div class="flex items-start space-x-2 text-sm">
                                    <i class="fas fa-bullhorn text-yellow-600 mt-0.5"></i>
                                    <div class="flex-1"><span class="font-medium text-gray-700">PROMOTE:</span>
                                        \${sources.promote ? \`<a href="\${sources.promote}" target="_blank" class="text-blue-600 hover:underline text-xs ml-2 break-all">\${sources.promote.substring(0,50)}...</a>\` : '<span class="text-gray-400 text-xs ml-2">Not configured</span>'}
                                    </div>
                                </div>
                                <div class="flex items-start space-x-2 text-sm">
                                    <i class="fas fa-users text-blue-600 mt-0.5"></i>
                                    <div class="flex-1"><span class="font-medium text-gray-700">NETWORK:</span>
                                        \${sources.network ? \`<a href="\${sources.network}" target="_blank" class="text-blue-600 hover:underline text-xs ml-2 break-all">\${sources.network.substring(0,50)}...</a>\` : '<span class="text-gray-400 text-xs ml-2">Not configured</span>'}
                                        \${company.networkSheetGid ? \`<span class="text-gray-500 text-xs ml-2">(GID: \${company.networkSheetGid})</span>\` : ''}
                                    </div>
                                </div>
                                <div class="flex items-start space-x-2 text-sm">
                                    <i class="fas fa-handshake text-green-600 mt-0.5"></i>
                                    <div class="flex-1"><span class="font-medium text-gray-700">ENGAGE:</span>
                                        \${sources.engage || company.url ? \`<a href="\${sources.engage || company.url}" target="_blank" class="text-blue-600 hover:underline text-xs ml-2 break-all">\${(sources.engage || company.url).substring(0,50)}...</a>\` : '<span class="text-gray-400 text-xs ml-2">Not configured</span>'}
                                    </div>
                                </div>
                                <div class="flex items-start space-x-2 text-sm">
                                    <i class="fas fa-key text-purple-600 mt-0.5"></i>
                                    <div class="flex-1"><span class="font-medium text-gray-700">Pipeline Key:</span>
                                        <code class="text-xs ml-2 bg-gray-100 px-2 py-1 rounded break-all">\${company.pipelineKey || 'Not set'}</code>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="ml-6 flex flex-col space-y-2">
                            \${!isArchived ? \`
                            <a href="/?company=\${company.key}" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all text-sm text-center whitespace-nowrap">
                                <i class="fas fa-external-link-alt mr-1"></i>View
                            </a>
                            <button onclick="openEditModal('\${company.key}')" class="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-all text-sm whitespace-nowrap">
                                <i class="fas fa-pencil-alt mr-1"></i>Edit
                            </button>
                            <button onclick="archiveCompany('\${company.key}', '\${company.name}')" class="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all text-sm whitespace-nowrap">
                                <i class="fas fa-archive mr-1"></i>Archive
                            </button>
                            \` : \`
                            <button onclick="openEditModal('\${company.key}')" class="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-all text-sm whitespace-nowrap">
                                <i class="fas fa-pencil-alt mr-1"></i>Edit
                            </button>
                            <button onclick="restoreCompany('\${company.key}', '\${company.name}')" class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all text-sm whitespace-nowrap">
                                <i class="fas fa-undo mr-1"></i>Restore
                            </button>
                            \`}
                        </div>
                    </div>
                </div>\`;
            }

            function displayCompanies(companiesList) {
                const container = document.getElementById('companies-list');
                const active = companiesList.filter(c => !c.archived);
                const archived = companiesList.filter(c => c.archived);

                let html = '';

                if (active.length === 0 && archived.length === 0) {
                    container.innerHTML = '<p class="text-gray-500 text-center py-8">No companies found</p>';
                    return;
                }

                // Active section
                html += \`<div class="mb-2">
                    <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                        <i class="fas fa-circle text-green-500 mr-2 text-xs"></i>Active Clients (\${active.length})
                    </h3>
                    <div class="space-y-4">\${active.map(c => companyCard(c, false)).join('')}</div>
                </div>\`;

                // Archived section (collapsible)
                if (archived.length > 0) {
                    html += \`<div class="mt-8">
                        <button onclick="toggleArchived()" class="flex items-center text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 hover:text-gray-700">
                            <i class="fas fa-circle text-gray-400 mr-2 text-xs"></i>
                            Archived Clients (\${archived.length})
                            <i id="archived-chevron" class="fas fa-chevron-down ml-2 text-xs transition-transform"></i>
                        </button>
                        <div id="archived-section" class="hidden space-y-4">
                            \${archived.map(c => companyCard(c, true)).join('')}
                        </div>
                    </div>\`;
                }

                container.innerHTML = html;
            }

            function toggleArchived() {
                const section = document.getElementById('archived-section');
                const chevron = document.getElementById('archived-chevron');
                const hidden = section.classList.toggle('hidden');
                chevron.style.transform = hidden ? '' : 'rotate(180deg)';
            }

            // Archive Company Function
            async function archiveCompany(companyKey, companyName) {
                if (!confirm(\`Archive "\${companyName}"?\\n\\nThe client will be hidden from the dashboard and overview but all data is preserved. You can restore them at any time.\`)) return;
                try {
                    const response = await fetch(\`/api/companies/\${companyKey}\`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ archived: true })
                    });
                    const data = await response.json();
                    if (data.success) {
                        // Update local state immediately — do NOT re-fetch from KV
                        // (KV has eventual consistency and would return stale data)
                        if (companies[companyKey]) companies[companyKey].archived = true;
                        displayCompanies(Object.values(companies));
                        // Auto-expand the archived section so user sees the move
                        const section = document.getElementById('archived-section');
                        const chevron = document.getElementById('archived-chevron');
                        if (section && section.classList.contains('hidden')) {
                            section.classList.remove('hidden');
                            if (chevron) chevron.style.transform = 'rotate(180deg)';
                        }
                        showMessage('success', \`"\${companyName}" archived. Visible in the Archived section below — data fully preserved.\`);
                    } else {
                        showMessage('error', data.error || 'Failed to archive company');
                    }
                } catch (err) {
                    showMessage('error', 'Network error: ' + err.message);
                }
            }

            // Restore Company Function
            async function restoreCompany(companyKey, companyName) {
                try {
                    const response = await fetch(\`/api/companies/\${companyKey}\`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ archived: false })
                    });
                    const data = await response.json();
                    if (data.success) {
                        // Update local state immediately — do NOT re-fetch from KV
                        if (companies[companyKey]) companies[companyKey].archived = false;
                        displayCompanies(Object.values(companies));
                        showMessage('success', \`"\${companyName}" restored and now visible in the dashboard and overview.\`);
                    } else {
                        showMessage('error', data.error || 'Failed to restore company');
                    }
                } catch (err) {
                    showMessage('error', 'Network error: ' + err.message);
                }
            }

            // Handle form submission
            document.getElementById('add-company-form').addEventListener('submit', async (e) => {
                e.preventDefault();

                const name = document.getElementById('company-name').value.trim();
                const pipelineKey = document.getElementById('pipeline-key').value.trim();
                const networkUrl = document.getElementById('network-url').value.trim();
                const promoteUrl = document.getElementById('promote-url').value.trim();
                const notionUrl = document.getElementById('notion-url').value.trim();

                try {
                    const response = await fetch('/api/companies', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ name, pipelineKey, networkUrl, promoteUrl, notionUrl })
                    });
                    const data = await response.json();
                    if (data.success) {
                        showMessage('success', \`Company "\${name}" added successfully!\`);
                        loadCompanies();
                        e.target.reset();
                        document.getElementById('form-message').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    } else {
                        showMessage('error', data.error || 'Failed to add company');
                    }
                } catch (err) {
                    showMessage('error', 'Network error: ' + err.message);
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

            // ── Edit Company Modal ──────────────────────────────────────────
            function openEditModal(companyKey) {
                const company = companies[companyKey];
                if (!company) return;
                const sources = company.sources || {};

                document.getElementById('edit-modal-title').textContent = company.name;
                document.getElementById('modal-edit-name').value = company.name || '';
                document.getElementById('modal-edit-pipeline').value = company.pipelineKey || '';
                document.getElementById('modal-edit-promote').value = sources.promote || '';
                document.getElementById('modal-edit-network').value = sources.network || '';
                document.getElementById('modal-edit-engage').value = sources.engage || company.url || '';
                document.getElementById('modal-edit-key').value = companyKey;
                document.getElementById('modal-msg').classList.add('hidden');
                document.getElementById('edit-modal').classList.remove('hidden');
            }

            function closeEditModal() {
                document.getElementById('edit-modal').classList.add('hidden');
            }

            async function saveEditModal(e) {
                e.preventDefault();
                const key = document.getElementById('modal-edit-key').value;
                const name = document.getElementById('modal-edit-name').value.trim();
                const pipelineKey = document.getElementById('modal-edit-pipeline').value.trim();
                const promoteUrl = document.getElementById('modal-edit-promote').value.trim();
                const networkUrl = document.getElementById('modal-edit-network').value.trim();
                const engageUrl = document.getElementById('modal-edit-engage').value.trim();
                const btn = document.getElementById('modal-save-btn');
                btn.disabled = true;
                btn.textContent = 'Saving...';
                try {
                    const res = await fetch(\`/api/companies/\${key}\`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ name, pipelineKey, promoteUrl, networkUrl, engageUrl })
                    });
                    const data = await res.json();
                    if (data.success) {
                        companies[key] = { ...companies[key], name, pipelineKey, sources: { promote: promoteUrl, network: networkUrl, engage: engageUrl } };
                        displayCompanies(Object.values(companies));
                        closeEditModal();
                        showMessage('success', \`"\${name}" updated successfully.\`);
                    } else {
                        const msgEl = document.getElementById('modal-msg');
                        msgEl.textContent = data.error || 'Failed to save';
                        msgEl.classList.remove('hidden');
                    }
                } catch (err) {
                    const msgEl = document.getElementById('modal-msg');
                    msgEl.textContent = 'Network error: ' + err.message;
                    msgEl.classList.remove('hidden');
                } finally {
                    btn.disabled = false;
                    btn.textContent = 'Save Changes';
                }
            }

            // Load on page load
            loadCompanies();
        <\/script>

        <!-- Edit Company Modal — placed after script so onclick handlers can reference functions defined above -->
        <div id="edit-modal" onclick="if(event.target===this)closeEditModal()" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div class="bg-white rounded-xl shadow-2xl w-full max-w-lg">
                <div class="flex items-center justify-between px-6 py-4 border-b">
                    <h3 class="text-lg font-bold text-gray-800 flex items-center">
                        <i class="fas fa-pencil-alt text-indigo-600 mr-2"></i>
                        Edit: <span id="edit-modal-title" class="ml-2"></span>
                    </h3>
                    <button onclick="closeEditModal()" class="text-gray-400 hover:text-gray-600 text-xl font-bold">&times;</button>
                </div>
                <form onsubmit="saveEditModal(event)" class="px-6 py-5 space-y-4">
                    <input type="hidden" id="modal-edit-key" />
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-1">Company Name</label>
                        <input id="modal-edit-name" type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-400" />
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-1">
                            <i class="fas fa-key text-purple-500 mr-1"></i>Streak Pipeline Key
                        </label>
                        <input id="modal-edit-pipeline" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-purple-400" placeholder="agxzfm1haWxmb29n..." />
                        <p class="text-xs text-gray-500 mt-1">Found in your Streak pipeline URL. Required for CRM data to load.</p>
                    </div>
                    <div class="border-t pt-3">
                        <p class="text-xs font-semibold text-gray-500 uppercase mb-3">Data Source URLs</p>
                        <div class="space-y-3">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1"><i class="fas fa-bullhorn text-yellow-500 mr-1"></i>PROMOTE URL</label>
                                <input id="modal-edit-promote" type="url" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-yellow-400" placeholder="https://docs.google.com/spreadsheets/..." />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1"><i class="fas fa-users text-blue-500 mr-1"></i>NETWORK URL</label>
                                <input id="modal-edit-network" type="url" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-400" placeholder="https://docs.google.com/spreadsheets/..." />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1"><i class="fas fa-handshake text-green-500 mr-1"></i>ENGAGE URL</label>
                                <input id="modal-edit-engage" type="url" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-green-400" placeholder="https://..." />
                            </div>
                        </div>
                    </div>
                    <p id="modal-msg" class="hidden text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2"></p>
                    <div class="flex justify-end space-x-3 pt-2">
                        <button type="button" onclick="closeEditModal()" class="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
                        <button type="submit" id="modal-save-btn" class="px-5 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    </div><!-- end ml-56 -->
    </body>
    </html>
  `));$.get("/overview",e=>e.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="robots" content="noindex, nofollow">
        <title>Campaign Effectiveness — client.gershonCRM</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
        <style>
            body { font-family: system-ui, -apple-system, 'Segoe UI', sans-serif; background: #f9f9f7; }
            /* Status palette — fixed, never themed. Paired with icon + label everywhere. */
            :root {
                --good: #0ca30c; --warn: #fab219; --crit: #d03b3b; --none: #c3c2b7;
                --good-ink: #006300; --warn-ink: #7a5300; --crit-ink: #a32a2a; --none-ink: #6b6a65;
                --good-wash: #e8f6e8; --warn-wash: #fdf3dc; --crit-wash: #fbeaea; --none-wash: #f1f1ee;
                --ink: #0b0b0b; --ink2: #52514e; --muted: #898781;
                --grid: #e1e0d9; --axis: #c3c2b7;
            }
            .skeleton { animation: pulse 1.5s cubic-bezier(0.4,0,0.6,1) infinite; background:#e5e7eb; border-radius:.375rem; }
            @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
            .period-btn { transition: all .15s ease; cursor: pointer; }
            .period-btn.active { background:#fff; color:#1e40af; box-shadow:0 1px 4px rgba(0,0,0,.15); font-weight:700; }
            .nav-item { transition: background .15s ease; }
            .nav-item.active { background: rgba(255,255,255,.15); color:#fff; font-weight:600; }
            /* 2px surface gap between adjacent fills, never a border */
            .seg + .seg { margin-left: 2px; }
            .rowbar { transition: opacity .12s ease; }
            .cli-row:hover .rowbar { opacity: .85; }
            .tip { position: fixed; z-index: 60; pointer-events: none; background:#0b0b0b; color:#fff;
                   font-size:12px; line-height:1.35; padding:8px 10px; border-radius:8px; max-width:280px;
                   box-shadow:0 6px 20px rgba(0,0,0,.25); opacity:0; transition:opacity .1s ease; }
            .tip.on { opacity:1; }
            th.sortable { cursor:pointer; user-select:none; }
            th.sortable:hover { color:#0b0b0b; }
            .refetching { opacity:.45; transition:opacity .15s ease; }
            @media print { .no-print { display:none !important; } }
        </style>
    </head>
    <body class="min-h-screen">
    <div class="flex min-h-screen">

      <!-- ============ LEFT SIDEBAR ============ -->
      <div class="no-print w-60 shrink-0 bg-gradient-to-b from-blue-800 to-indigo-900">
      <aside class="w-60 text-white flex flex-col sticky top-0 h-screen">
        <div class="px-5 py-5 border-b border-white/10">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center"><i class="fas fa-chart-line text-sm"></i></div>
            <div>
              <p class="font-bold text-sm leading-tight">client.gershonCRM</p>
              <p class="text-[10px] text-blue-200">v1.3.69</p>
            </div>
          </div>
        </div>

        <nav class="flex-1 overflow-y-auto py-4 px-2.5">
          <p class="px-3 mb-1.5 text-[10px] uppercase tracking-wider font-semibold text-blue-300/70">Analytics</p>
          <button onclick="switchView('effectiveness')" id="nav-effectiveness"
                  class="nav-item active w-full flex items-center px-3 py-2.5 rounded-lg text-sm text-blue-100 hover:bg-white/10 mb-1">
            <i class="fas fa-gauge-high w-5 mr-2.5 text-center"></i>Effectiveness
          </button>
          <button onclick="switchView('summary')" id="nav-summary"
                  class="nav-item w-full flex items-center px-3 py-2.5 rounded-lg text-sm text-blue-100 hover:bg-white/10 mb-1">
            <i class="fas fa-th-large w-5 mr-2.5 text-center"></i>Summary
          </button>

          <p class="px-3 mt-5 mb-1.5 text-[10px] uppercase tracking-wider font-semibold text-blue-300/70">Clients</p>
          <div class="px-3 mb-2">
            <select id="client-jump" onchange="if(this.value) window.location.href='/?company='+this.value"
                    class="w-full bg-blue-700/50 border border-blue-500/40 text-white text-xs rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300">
              <option value="">Open a client…</option>
            </select>
          </div>

          <p class="px-3 mt-5 mb-1.5 text-[10px] uppercase tracking-wider font-semibold text-blue-300/70">Manage</p>
          <a href="/admin" class="nav-item w-full flex items-center px-3 py-2.5 rounded-lg text-sm text-blue-100 hover:bg-white/10 mb-1">
            <i class="fas fa-shield-halved w-5 mr-2.5 text-center"></i>Admin Panel
          </a>
        </nav>

        <div class="px-3 py-3 border-t border-white/10 space-y-1">
          <button onclick="loadOverview(currentPeriod)" class="w-full flex items-center px-3 py-1.5 rounded-lg text-[11px] text-blue-200 hover:bg-white/10">
            <i class="fas fa-sync-alt w-4 mr-2 text-center"></i>Refresh
          </button>
          <button onclick="window.print()" class="w-full flex items-center px-3 py-1.5 rounded-lg text-[11px] text-blue-200 hover:bg-white/10">
            <i class="fas fa-file-export w-4 mr-2 text-center"></i>Print / PDF
          </button>
          <a href="/api/auth/logout" class="flex items-center px-3 py-1.5 rounded-lg text-[11px] text-blue-200 hover:bg-white/10">
            <i class="fas fa-right-from-bracket w-4 mr-2 text-center"></i>Sign out
          </a>
        </div>
      </aside>
      </div>

      <!-- ============ MAIN ============ -->
      <main class="flex-1 min-w-0">
        <div class="max-w-[1400px] mx-auto px-8 py-8">

          <header class="mb-6">
            <h1 id="view-title" class="text-2xl font-extrabold tracking-tight" style="color:var(--ink)">Campaign Effectiveness</h1>
            <p id="view-sub" class="text-sm mt-1" style="color:var(--ink2)">How every client campaign is performing against its targets.</p>
          </header>

          <!-- ONE filter row, above everything it scopes -->
          <div class="no-print bg-white rounded-xl border border-gray-200 p-3 mb-6 flex flex-wrap items-center gap-3">
            <span class="text-xs font-semibold uppercase tracking-wide ml-1" style="color:var(--muted)">Period</span>
            <div class="flex bg-gray-100 rounded-lg p-1 gap-1">
              <button class="period-btn px-3 py-1.5 rounded-md text-sm text-gray-600" data-period="week">Last Week</button>
              <button class="period-btn px-3 py-1.5 rounded-md text-sm text-gray-600" data-period="last-month">Last Month</button>
              <button class="period-btn active px-3 py-1.5 rounded-md text-sm" data-period="this-month">This Month</button>
              <button class="period-btn px-3 py-1.5 rounded-md text-sm text-gray-600" data-period="year">This Year</button>
              <button class="period-btn px-3 py-1.5 rounded-md text-sm text-gray-600" data-period="all">All Time</button>
            </div>
            <span id="updated-at" class="ml-auto text-xs" style="color:var(--muted)"></span>
          </div>

          <div id="error-state" class="hidden bg-red-50 border border-red-200 rounded-xl p-5 mb-6">
            <div class="flex items-center">
              <i class="fas fa-circle-exclamation text-xl mr-3" style="color:var(--crit)"></i>
              <div><h3 class="font-semibold" style="color:var(--crit-ink)">Couldn't load the data</h3>
                   <p id="error-message" class="text-sm mt-0.5" style="color:var(--ink2)"></p></div>
            </div>
          </div>

          <!-- ============ VIEW: EFFECTIVENESS ============ -->
          <section id="view-effectiveness">

            <div id="hero-tiles" class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div class="bg-white rounded-xl border border-gray-200 p-5"><div class="skeleton h-3 w-24 mb-3"></div><div class="skeleton h-9 w-20"></div></div>
              <div class="bg-white rounded-xl border border-gray-200 p-5"><div class="skeleton h-3 w-24 mb-3"></div><div class="skeleton h-9 w-20"></div></div>
              <div class="bg-white rounded-xl border border-gray-200 p-5"><div class="skeleton h-3 w-24 mb-3"></div><div class="skeleton h-9 w-20"></div></div>
              <div class="bg-white rounded-xl border border-gray-200 p-5"><div class="skeleton h-3 w-24 mb-3"></div><div class="skeleton h-9 w-20"></div></div>
            </div>

            <!-- Channel health -->
            <div class="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <div class="flex items-start justify-between mb-1">
                <h2 class="font-bold" style="color:var(--ink)">Channel health across the portfolio</h2>
                <div id="rag-legend" class="flex items-center gap-4 text-xs"></div>
              </div>
              <p class="text-xs mb-5" style="color:var(--muted)">How many clients are hitting target in each channel. Hover a band for the client names.</p>
              <div id="channel-health"></div>
            </div>

            <!-- Client effectiveness matrix -->
            <div class="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <div class="flex flex-wrap items-start justify-between gap-3 mb-1">
                <div>
                  <h2 class="font-bold" style="color:var(--ink)">Effectiveness by client</h2>
                  <p class="text-xs mt-1" style="color:var(--muted)">
                    Score is actual ÷ target. Promote and Network are campaign-to-date; Engage follows the period above.
                  </p>
                </div>
                <div class="no-print flex items-center gap-2">
                  <div class="flex bg-gray-100 rounded-lg p-1 gap-1 text-xs">
                    <button id="mode-chart" onclick="setMatrixMode('chart')" class="px-3 py-1.5 rounded-md font-semibold bg-white shadow-sm">Chart</button>
                    <button id="mode-table" onclick="setMatrixMode('table')" class="px-3 py-1.5 rounded-md text-gray-600">Table</button>
                  </div>
                </div>
              </div>
              <div id="matrix-chart" class="mt-5"></div>
              <div id="matrix-table" class="mt-5 hidden overflow-x-auto"></div>
            </div>

            <!-- Momentum -->
            <div class="bg-white rounded-xl border border-gray-200 p-6">
              <h2 class="font-bold" style="color:var(--ink)">Momentum — this month vs last month</h2>
              <p class="text-xs mt-1 mb-5" style="color:var(--muted)">Pace-adjusted: last month is scaled to the same number of days elapsed, so a mid-month reading is a fair comparison. Arrow and value carry the meaning; colour reinforces it.</p>
              <div id="momentum"></div>
            </div>

          </section>

          <!-- ============ VIEW: SUMMARY ============ -->
          <section id="view-summary" class="hidden">
            <div id="summary-row" class="bg-white rounded-xl border border-gray-200 p-5 mb-6"></div>
            <div id="cards-grid" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"></div>
          </section>

        </div>
      </main>
    </div>

    <div id="tip" class="tip"></div>

    <script>
      // ---------- state ----------
      var currentPeriod = 'this-month';
      var currentView = 'effectiveness';
      var matrixMode = 'chart';
      var matrixSort = 'overall';
      var matrixDir = -1;
      var lastData = null;
      var overviewAverages = {};

      var PERIOD_GOAL = { week: 2.5, 'last-month': 10, 'this-month': 10, year: 120, all: 10 };
      var TARGET_POSTS_PER_DAY = 1;
      var TARGET_ACCEPTANCE = 20;
      var TARGET_INVITES_PER_WEEK = 100;

      // ---------- helpers ----------
      function periodLabel(p) {
        return { week:'Last Week', 'last-month':'Last Month', 'this-month':'This Month', year:'This Year', all:'All Time' }[p] || p;
      }
      function fmtNum(n) { n = n || 0; return n >= 1000 ? (n/1000).toFixed(1).replace(/\\.0$/,'') + 'k' : String(Math.round(n)); }
      function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function(m){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]; }); }

      // RAG banding — the one place the thresholds live
      function band(score) {
        if (score === null || score === undefined) return 'none';
        if (score >= 80) return 'good';
        if (score >= 40) return 'warn';
        return 'crit';
      }
      var BAND_META = {
        good: { label: 'Good',      icon: 'fa-circle-check',        color: 'var(--good)', ink: 'var(--good-ink)', wash: 'var(--good-wash)' },
        warn: { label: 'OK',        icon: 'fa-triangle-exclamation',color: 'var(--warn)', ink: 'var(--warn-ink)', wash: 'var(--warn-wash)' },
        crit: { label: 'Off track', icon: 'fa-circle-xmark',        color: 'var(--crit)', ink: 'var(--crit-ink)', wash: 'var(--crit-wash)' },
        none: { label: 'Not set up',icon: 'fa-circle-minus',        color: 'var(--none)', ink: 'var(--none-ink)', wash: 'var(--none-wash)' }
      };
      var BAND_ORDER = ['good','warn','crit','none'];

      function svcOf(co) {
        var s = co.services || {};
        return {
          promote: s.promote !== false,
          network: s.network !== false,
          engage: s.engage !== false
        };
      }
      function scoreCompany(co) {
        var goal = PERIOD_GOAL[currentPeriod] || 10;
        var sel = svcOf(co);
        // A service scores only when the client subscribed to it (selected).
        // Unselected services are excluded entirely from the efficiency average.
        var promote = sel.promote ? (co.promoteConfigured ? (co.promotePostsPerDay / TARGET_POSTS_PER_DAY) * 100 : null) : null;
        var network = sel.network ? (co.networkConfigured ? (co.networkAcceptanceRate / TARGET_ACCEPTANCE) * 100 : null) : null;
        var engage  = sel.engage ? (co.periodLeads / goal) * 100 : null;
        var parts = [promote, network, engage].filter(function(v){ return v !== null; });
        var overall = parts.length ? parts.reduce(function(a,b){ return a+b; }, 0) / parts.length : null;
        return { promote: promote, network: network, engage: engage, overall: overall, goal: goal, sel: sel };
      }

      // status chip — icon + label + value, never colour alone
      function chip(scoreBand, text) {
        var m = BAND_META[scoreBand];
        return '<span class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap"'
             + ' style="background:' + m.wash + ';color:' + m.ink + '">'
             + '<i class="fas ' + m.icon + '" style="color:' + m.color + '"></i>' + esc(text) + '</span>';
      }

      // ---------- tooltip layer ----------
      var tipEl = document.getElementById('tip');
      function showTip(html, ev) {
        tipEl.innerHTML = html; tipEl.classList.add('on');
        var x = ev.clientX + 14, y = ev.clientY + 14;
        var r = tipEl.getBoundingClientRect();
        if (x + r.width > window.innerWidth - 8) x = ev.clientX - r.width - 14;
        if (y + r.height > window.innerHeight - 8) y = ev.clientY - r.height - 14;
        tipEl.style.left = x + 'px'; tipEl.style.top = y + 'px';
      }
      function hideTip() { tipEl.classList.remove('on'); }
      document.addEventListener('mouseover', function(e) {
        var t = e.target.closest('[data-tip]');
        if (t) showTip(t.getAttribute('data-tip'), e);
      });
      document.addEventListener('mousemove', function(e) {
        var t = e.target.closest('[data-tip]');
        if (t) showTip(t.getAttribute('data-tip'), e); else hideTip();
      });
      document.addEventListener('focusin', function(e) {
        var t = e.target.closest('[data-tip]');
        if (t) { var r = t.getBoundingClientRect(); showTip(t.getAttribute('data-tip'), { clientX: r.left, clientY: r.bottom }); }
      });
      document.addEventListener('focusout', hideTip);

      // ---------- view switching ----------
      function switchView(v) {
        currentView = v;
        ['effectiveness','summary'].forEach(function(name) {
          document.getElementById('view-' + name).classList.toggle('hidden', name !== v);
          var nav = document.getElementById('nav-' + name);
          if (nav) { nav.classList.toggle('active', name === v); nav.classList.toggle('text-blue-100', name !== v); }
        });
        var t = document.getElementById('view-title'), s = document.getElementById('view-sub');
        if (v === 'effectiveness') {
          t.textContent = 'Campaign Effectiveness';
          s.textContent = 'How every client campaign is performing against its targets.';
        } else {
          t.textContent = 'Summary';
          s.textContent = 'One card per client, with the raw numbers behind each channel.';
        }
        if (lastData) render(lastData);
      }

      document.querySelectorAll('.period-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
          document.querySelectorAll('.period-btn').forEach(function(b) { b.classList.remove('active'); b.classList.add('text-gray-600'); });
          btn.classList.add('active'); btn.classList.remove('text-gray-600');
          currentPeriod = btn.dataset.period;
          loadOverview(currentPeriod);
        });
      });

      function setMatrixMode(m) {
        matrixMode = m;
        document.getElementById('matrix-chart').classList.toggle('hidden', m !== 'chart');
        document.getElementById('matrix-table').classList.toggle('hidden', m !== 'table');
        document.getElementById('mode-chart').className = m === 'chart'
          ? 'px-3 py-1.5 rounded-md font-semibold bg-white shadow-sm' : 'px-3 py-1.5 rounded-md text-gray-600';
        document.getElementById('mode-table').className = m === 'table'
          ? 'px-3 py-1.5 rounded-md font-semibold bg-white shadow-sm' : 'px-3 py-1.5 rounded-md text-gray-600';
      }
      function setSort(key) {
        if (matrixSort === key) matrixDir = -matrixDir; else { matrixSort = key; matrixDir = -1; }
        if (lastData) render(lastData);
      }

      // ---------- renderers ----------
      function renderLegend() {
        document.getElementById('rag-legend').innerHTML = BAND_ORDER.map(function(b) {
          var m = BAND_META[b];
          return '<span class="inline-flex items-center gap-1.5" style="color:var(--ink2)">'
               + '<i class="fas ' + m.icon + '" style="color:' + m.color + '"></i>' + m.label + '</span>';
        }).join('');
      }

      function renderHero(rows, data) {
        var scored = rows.filter(function(r){ return r.s.overall !== null; });
        var avg = scored.length ? Math.round(scored.reduce(function(a,r){ return a + r.s.overall; }, 0) / scored.length) : 0;
        var counts = { good:0, warn:0, crit:0, none:0 };
        rows.forEach(function(r){ counts[band(r.s.overall)]++; });
        var goal = PERIOD_GOAL[currentPeriod] || 10;
        var portfolioGoal = Math.round(goal * rows.length);
        var leads = data.totalPeriodLeads || 0;
        var leadsBand = band(portfolioGoal ? (leads / portfolioGoal) * 100 : null);

        function tile(label, value, sub, b, tip) {
          var m = BAND_META[b];
          return '<div class="bg-white rounded-xl border border-gray-200 p-5" ' + (tip ? 'data-tip="' + esc(tip) + '" tabindex="0"' : '') + '>'
            + '<p class="text-[11px] uppercase tracking-wider font-semibold mb-2" style="color:var(--muted)">' + esc(label) + '</p>'
            + '<p class="text-4xl font-extrabold leading-none" style="color:var(--ink)">' + value + '</p>'
            + '<div class="mt-3 flex items-center gap-1.5 text-xs font-semibold" style="color:' + m.ink + '">'
            + '<i class="fas ' + m.icon + '" style="color:' + m.color + '"></i>' + esc(sub) + '</div>'
            + '</div>';
        }

        document.getElementById('hero-tiles').innerHTML =
            tile('Portfolio effectiveness', avg + '<span class="text-xl font-bold" style="color:var(--muted)">%</span>',
                 BAND_META[band(avg)].label + ' overall', band(avg),
                 'Average of all client scores. 100% means every channel is hitting its target.')
          + tile('Clients on track', counts.good + '<span class="text-xl font-bold" style="color:var(--muted)">/' + rows.length + '</span>',
                 counts.good === rows.length ? 'All clients good' : (rows.length - counts.good) + ' below target',
                 counts.good === 0 ? 'crit' : (counts.good >= rows.length / 2 ? 'good' : 'warn'),
                 'Clients whose overall score is 80% or better.')
          + tile('Need attention', String(counts.crit),
                 counts.crit === 0 ? 'Nothing off track' : 'Below 40% of target', counts.crit === 0 ? 'good' : 'crit',
                 'Clients scoring under 40% of target — the ones to talk about first.')
          + tile('Leads — ' + periodLabel(currentPeriod), fmtNum(leads),
                 'Target ' + portfolioGoal + ' across ' + rows.length + ' clients', leadsBand,
                 'Total leads in the selected period against the combined target.');
      }

      function renderChannelHealth(rows) {
        var channels = [
          { key:'promote', name:'Promote', icon:'fa-bullhorn', target:'1 post / day' },
          { key:'network', name:'Network', icon:'fa-users',    target:'20% acceptance · 100 invites/wk' },
          { key:'engage',  name:'Engage',  icon:'fa-handshake',target:(PERIOD_GOAL[currentPeriod]||10) + ' meetings' }
        ];
        var html = '';
        channels.forEach(function(ch) {
          var buckets = { good:[], warn:[], crit:[], none:[] };
          rows.forEach(function(r) { buckets[band(r.s[ch.key])].push(r.co.name); });
          var total = rows.length || 1;

          html += '<div class="mb-5 last:mb-0">'
               + '<div class="flex items-baseline justify-between mb-2">'
               + '<span class="text-sm font-semibold" style="color:var(--ink)"><i class="fas ' + ch.icon + ' mr-2" style="color:var(--muted)"></i>' + ch.name + '</span>'
               + '<span class="text-xs" style="color:var(--muted)">target ' + esc(ch.target) + '</span>'
               + '</div>'
               + '<div class="flex items-stretch h-7">';

          BAND_ORDER.forEach(function(b) {
            var n = buckets[b].length;
            if (!n) return;
            var m = BAND_META[b];
            var pct = (n / total) * 100;
            var names = buckets[b].slice(0, 8).map(esc).join('<br>') + (buckets[b].length > 8 ? '<br>+' + (buckets[b].length - 8) + ' more' : '');
            var showLabel = pct >= 12;
            html += '<div class="seg rounded-[4px] flex items-center justify-center overflow-hidden" tabindex="0"'
                 + ' style="width:' + pct + '%;background:' + m.color + '"'
                 + ' data-tip="<b>' + m.label + ' — ' + n + ' client' + (n>1?'s':'') + '</b><br>' + names + '">'
                 + (showLabel ? '<span class="text-[11px] font-bold" style="color:' + (b==='warn'?'#3d2900':'#fff') + '">' + n + '</span>' : '')
                 + '</div>';
          });

          html += '</div></div>';
        });
        document.getElementById('channel-health').innerHTML = html;
      }

      function renderMatrix(rows) {
        var sorted = rows.slice().sort(function(a, b) {
          if (matrixSort === 'name') return a.co.name.localeCompare(b.co.name) * -matrixDir;
          var av, bv;
          if (matrixSort === 'leads') { av = a.co.periodLeads; bv = b.co.periodLeads; }
          else { av = a.s[matrixSort]; bv = b.s[matrixSort]; }
          av = (av === null || av === undefined) ? -1 : av;
          bv = (bv === null || bv === undefined) ? -1 : bv;
          return (av - bv) * matrixDir;
        });

        // --- chart view: one row per client, bar length = overall score, chips = per channel ---
        var chartHtml = '<div class="space-y-1">';
        sorted.forEach(function(r) {
          var b = band(r.s.overall);
          var m = BAND_META[b];
          var pct = r.s.overall === null ? 0 : Math.max(2, Math.min(100, r.s.overall));
          var scoreTxt = r.s.overall === null ? 'n/a' : Math.round(r.s.overall) + '%';
          var sel = svcOf(r.co);

          function cell(k, label, valueTxt, tip) {
            var cb = band(r.s[k]);
            var cm = BAND_META[cb];
            return '<div class="flex items-center gap-1.5 justify-center" tabindex="0" data-tip="' + esc(tip) + '">'
                 + '<i class="fas ' + cm.icon + ' text-[13px]" style="color:' + cm.color + '"></i>'
                 + '<span class="text-xs font-semibold tabular-nums" style="color:var(--ink2)">' + esc(valueTxt) + '</span></div>';
          }

          chartHtml += '<a href="/?company=' + encodeURIComponent(r.co.key) + '" class="cli-row grid items-center gap-3 rounded-lg px-2 py-2.5 hover:bg-gray-50"'
            + ' style="grid-template-columns: minmax(140px,1.6fr) 1fr 1fr 1fr minmax(150px,1.4fr)">'
            + '<div class="min-w-0"><p class="text-sm font-semibold truncate" style="color:var(--ink)">' + esc(r.co.name) + '</p>'
            + '<p class="text-[11px]" style="color:var(--muted)">' + r.co.periodLeads + ' leads · ' + (r.co.campaignMonths||0) + ' mo</p></div>'
            + cell('promote','Promote', !sel.promote ? 'not in plan' : (r.co.promoteConfigured ? (r.co.promotePostsPerDay||0).toFixed(1) + '/d' : 'n/a'),
                   r.co.name + ' — Promote: ' + (!sel.promote ? 'not part of this client plan' : (r.co.promoteConfigured ? (r.co.promotePostsPerDay||0).toFixed(1) + ' posts/day against a target of 1/day (' + Math.round(r.s.promote) + '%)' : 'not set up')))
            + cell('network','Network', !sel.network ? 'not in plan' : (r.co.networkConfigured ? Math.round(r.co.networkAcceptanceRate) + '%' : 'n/a'),
                   r.co.name + ' — Network: ' + (!sel.network ? 'not part of this client plan' : (r.co.networkConfigured ? Math.round(r.co.networkAcceptanceRate) + '% acceptance against a ' + TARGET_ACCEPTANCE + '% target (' + Math.round(r.s.network) + '%). ' + r.co.networkInvitations + ' sent, ' + r.co.networkAccepted + ' accepted' : 'not set up')))
            + cell('engage','Engage', !sel.engage ? 'not in plan' : String(r.co.periodLeads),
                   r.co.name + ' — Engage: ' + (!sel.engage ? 'not part of this client plan' : r.co.periodLeads + ' leads against a target of ' + r.s.goal + ' for ' + periodLabel(currentPeriod) + ' (' + Math.round(r.s.engage) + '%)'))
            + '<div class="flex items-center gap-2" tabindex="0" data-tip="' + esc(r.co.name + ' — overall ' + scoreTxt + ' (' + m.label + '), the average of its configured channels') + '">'
            + '<div class="flex-1 h-2.5 rounded-full" style="background:#f0efec">'
            + '<div class="rowbar h-2.5 rounded-full" style="width:' + pct + '%;background:' + m.color + '"></div></div>'
            + '<span class="text-sm font-bold tabular-nums w-12 text-right" style="color:' + m.ink + '">' + scoreTxt + '</span>'
            + '</div>'
            + '</a>';
        });
        chartHtml += '</div>';

        // header row
        var head = '<div class="grid gap-3 px-2 pb-2 mb-1 border-b" style="border-color:var(--grid);grid-template-columns: minmax(140px,1.6fr) 1fr 1fr 1fr minmax(150px,1.4fr)">'
          + '<button onclick="setSort(\\'name\\')" class="text-left text-[11px] uppercase tracking-wider font-semibold hover:underline" style="color:var(--muted)">Client</button>'
          + '<button onclick="setSort(\\'promote\\')" class="text-[11px] uppercase tracking-wider font-semibold hover:underline" style="color:var(--muted)">Promote</button>'
          + '<button onclick="setSort(\\'network\\')" class="text-[11px] uppercase tracking-wider font-semibold hover:underline" style="color:var(--muted)">Network</button>'
          + '<button onclick="setSort(\\'engage\\')" class="text-[11px] uppercase tracking-wider font-semibold hover:underline" style="color:var(--muted)">Engage</button>'
          + '<button onclick="setSort(\\'overall\\')" class="text-right text-[11px] uppercase tracking-wider font-semibold hover:underline" style="color:var(--muted)">Overall score</button>'
          + '</div>';

        document.getElementById('matrix-chart').innerHTML = head + chartHtml;

        // --- table view (the WCAG-clean twin) ---
        var t = '<table class="w-full text-sm"><thead><tr class="border-b" style="border-color:var(--grid)">'
          + ['Client','Promote (posts/day)','Network (acceptance)','Engage (leads)','Overall','Status']
              .map(function(h,i){ return '<th class="' + (i? 'text-right':'text-left') + ' py-2 px-3 text-[11px] uppercase tracking-wider font-semibold" style="color:var(--muted)">' + h + '</th>'; }).join('')
          + '</tr></thead><tbody>';
        sorted.forEach(function(r) {
          var b = band(r.s.overall), m = BAND_META[b];
          var sel = svcOf(r.co);
          t += '<tr class="border-b" style="border-color:var(--grid)">'
            + '<td class="py-2 px-3 font-medium" style="color:var(--ink)">' + esc(r.co.name) + '</td>'
            + '<td class="py-2 px-3 text-right tabular-nums" style="color:var(--ink2)">' + (!sel.promote ? 'n/a' : (r.co.promoteConfigured ? (r.co.promotePostsPerDay||0).toFixed(1) : '—')) + '</td>'
            + '<td class="py-2 px-3 text-right tabular-nums" style="color:var(--ink2)">' + (!sel.network ? 'n/a' : (r.co.networkConfigured ? Math.round(r.co.networkAcceptanceRate) + '%' : '—')) + '</td>'
            + '<td class="py-2 px-3 text-right tabular-nums" style="color:var(--ink2)">' + (!sel.engage ? 'n/a' : (r.co.periodLeads + ' / ' + r.s.goal)) + '</td>'
            + '<td class="py-2 px-3 text-right tabular-nums font-semibold" style="color:var(--ink)">' + (r.s.overall === null ? '—' : Math.round(r.s.overall) + '%') + '</td>'
            + '<td class="py-2 px-3 text-right">' + chip(b, m.label) + '</td>'
            + '</tr>';
        });
        t += '</tbody></table>';
        document.getElementById('matrix-table').innerHTML = t;
      }

      // Always this-month vs last-month — both are period-independent on the API,
      // so this panel stays honest whatever the period filter says.
      // Month-to-date against a FULL previous month would make every client look
      // like it is collapsing on the 5th, so last month is scaled to the same
      // number of elapsed days before comparing.
      function pacedPrev(co) {
        var now = new Date();
        var elapsed = now.getDate();
        var daysLastMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        var factor = Math.min(1, elapsed / daysLastMonth);
        return (co.lastMonthLeads || 0) * factor;
      }
      function momentumDelta(co) { return (co.engageThisMonthLeads || 0) - pacedPrev(co); }

      function renderMomentum(rows) {
        var items = rows.slice().sort(function(a,b) { return momentumDelta(b.co) - momentumDelta(a.co); });
        var max = Math.max.apply(null, items.map(function(r){ return Math.abs(momentumDelta(r.co)); }).concat([1]));
        var html = '<div class="grid sm:grid-cols-2 gap-x-8 gap-y-1">';
        items.forEach(function(r) {
          var now = r.co.engageThisMonthLeads || 0;
          var prev = Math.round(pacedPrev(r.co) * 10) / 10;
          var d = Math.round((now - prev) * 10) / 10;
          var dir = d > 0 ? 'up' : (d < 0 ? 'down' : 'flat');
          var color = d > 0 ? 'var(--good)' : (d < 0 ? 'var(--crit)' : 'var(--none)');
          var ink   = d > 0 ? 'var(--good-ink)' : (d < 0 ? 'var(--crit-ink)' : 'var(--none-ink)');
          var icon  = d > 0 ? 'fa-arrow-trend-up' : (d < 0 ? 'fa-arrow-trend-down' : 'fa-minus');
          var w = (Math.abs(d) / max) * 50;
          html += '<div class="flex items-center gap-3 py-1.5" tabindex="0" data-tip="' + esc(r.co.name + ': ' + now + ' leads so far this month vs ' + prev + ' expected at last month\\u2019s pace (' + (r.co.lastMonthLeads||0) + ' over the full month)') + '">'
            + '<span class="text-sm truncate flex-1 min-w-0" style="color:var(--ink)">' + esc(r.co.name) + '</span>'
            + '<div class="flex items-center w-32 shrink-0">'
            + '<div class="w-1/2 flex justify-end"><div class="h-2 rounded-l-[4px]" style="width:' + (d<0?w*2:0) + '%;background:' + color + '"></div></div>'
            + '<div class="w-px h-3" style="background:var(--axis)"></div>'
            + '<div class="w-1/2"><div class="h-2 rounded-r-[4px]" style="width:' + (d>0?w*2:0) + '%;background:' + color + '"></div></div>'
            + '</div>'
            + '<span class="text-xs font-bold tabular-nums w-14 text-right shrink-0" style="color:' + ink + '">'
            + '<i class="fas ' + icon + ' mr-1"></i>' + (d>0?'+':'') + d + '</span>'
            + '</div>';
        });
        html += '</div>';
        document.getElementById('momentum').innerHTML = html;
      }

      function renderClientPicker(rows) {
        var sel = document.getElementById('client-jump');
        if (sel.options.length > 1) return;
        rows.slice().sort(function(a,b){ return a.co.name.localeCompare(b.co.name); }).forEach(function(r) {
          var o = document.createElement('option');
          o.value = r.co.key; o.textContent = r.co.name;
          sel.appendChild(o);
        });
      }

      function render(data) {
        var rows = data.companies.map(function(co) { return { co: co, s: scoreCompany(co) }; });
        renderClientPicker(rows);
        if (currentView === 'effectiveness') {
          renderLegend();
          renderHero(rows, data);
          renderChannelHealth(rows);
          renderMatrix(rows);
          renderMomentum(rows);
        } else {
          renderSummary(data);
          renderCards(data.companies);
        }
        document.getElementById('updated-at').innerHTML = '<i class="fas fa-clock mr-1"></i>Updated ' + new Date().toLocaleTimeString();
      }
            function renderSummary(data) {
                var avg = data.averages || {};
                document.getElementById('summary-row').innerHTML = '<div class="flex flex-wrap gap-8">'
                    + '<div>'
                    + '<p class="text-xs text-gray-500 uppercase font-semibold tracking-wide mb-1">Leads — ' + periodLabel(data.period) + '</p>'
                    + '<p class="text-4xl font-extrabold text-gray-900">' + data.totalPeriodLeads + '</p>'
                    + '</div>'
                    + '<div class="border-l border-gray-200 pl-8">'
                    + '<p class="text-xs text-gray-500 uppercase font-semibold tracking-wide mb-1">Last 7 Days</p>'
                    + '<p class="text-4xl font-extrabold text-gray-900">' + (data.totalWeekLeads || 0) + '</p>'
                    + '<p class="text-xs text-gray-400">avg ' + (avg.weekLeads || 0) + '/client</p>'
                    + '</div>'
                    + '<div class="border-l border-gray-200 pl-8">'
                    + '<p class="text-xs text-gray-500 uppercase font-semibold tracking-wide mb-1">Last Month</p>'
                    + '<p class="text-4xl font-extrabold text-gray-900">' + (data.totalLastMonthLeads || 0) + '</p>'
                    + '<p class="text-xs text-gray-400">avg ' + (avg.lastMonthLeads || 0) + '/client</p>'
                    + '</div>'
                    + '<div class="border-l border-gray-200 pl-8">'
                    + '<p class="text-xs text-gray-500 uppercase font-semibold tracking-wide mb-1">All-Time</p>'
                    + '<p class="text-4xl font-extrabold text-gray-900">' + data.totalAllLeads + '</p>'
                    + '</div>'
                    + '<div class="border-l border-gray-200 pl-8">'
                    + '<p class="text-xs text-gray-500 uppercase font-semibold tracking-wide mb-1">Active Clients</p>'
                    + '<p class="text-4xl font-extrabold text-gray-900">' + data.companies.length + '</p>'
                    + '</div>'
                    + '</div>'
                    + '<p class="text-xs text-gray-400 mt-2 sm:mt-0">'
                    + '<i class="fas fa-clock mr-1"></i>Updated ' + new Date().toLocaleTimeString()
                    + '</p>';
            }

            function renderCards(companies) {
                var grid = document.getElementById('cards-grid');
                if (!companies.length) {
                    grid.innerHTML = '<p class="col-span-3 text-center text-gray-400 py-16 text-lg">No company data available.</p>';
                    return;
                }
                var avg = overviewAverages;

                grid.innerHTML = companies.map(function(co) {
                    return renderSingleCard(co, avg);
                }).join('');
            }

            function renderSingleCard(co, avg) {
                    var errBadge = co.error ? '<span class="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full ml-2">API Error</span>' : '';

                    function kpiColor(val, target) {
                        var pct = target > 0 ? (val / target) * 100 : 0;
                        if (pct >= 100) return { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', bar: 'bg-green-500', icon: 'text-green-500' };
                        if (pct >= 50)  return { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', bar: 'bg-yellow-400', icon: 'text-yellow-500' };
                        return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-600', bar: 'bg-red-400', icon: 'text-red-500' };
                    }

                    function fmtNum(n) { return n >= 1000 ? (n/1000).toFixed(1).replace(/.0$/,'') + 'k' : String(n); }

                    var durationBadge = co.campaignMonths > 0
                        ? '<span class="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full"><i class="fas fa-clock mr-1"></i>' + co.campaignMonths + ' mo</span>'
                        : '';

                    var periodGoalVal = { week: 2.5, 'last-month': 10, 'this-month': 10, year: 120, all: 10 }[currentPeriod] || 10;
                    var engageVal = co.periodLeads || 0;
                    var engageC = kpiColor(engageVal, periodGoalVal);
                    var engagePct = Math.min(Math.round((engageVal / periodGoalVal) * 100), 100);

                    var html = '<div class="bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow flex flex-col overflow-hidden">';

                    // Header
                    html += '<div class="px-5 pt-5 pb-3 flex items-center justify-between">'
                        + '<h3 class="text-base font-bold text-gray-800 leading-tight truncate">' + co.name + errBadge + '</h3>'
                        + durationBadge
                        + '</div>';

                    // Main KPI: Leads for selected period
                    html += '<div class="px-5 pb-3">'
                        + '<div class="flex items-end justify-between mb-1">'
                        + '<span class="text-xs text-gray-400 uppercase font-semibold">' + periodLabel(currentPeriod) + '</span>'
                        + '<span class="text-lg font-extrabold ' + engageC.text + '">' + engageVal + '<span class="text-xs font-normal text-gray-400">/' + periodGoalVal + '</span></span>'
                        + '</div>'
                        + '<div class="w-full bg-gray-100 rounded-full h-2"><div class="' + engageC.bar + ' h-2 rounded-full transition-all" style="width:' + engagePct + '%"></div></div>'
                        + '</div>';

                    // 3-column channel stats
                    html += '<div class="grid grid-cols-3 divide-x divide-gray-100 border-t border-gray-100">';

                    // PROMOTE
                    html += '<div class="px-3 py-3">'
                        + '<p class="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2 text-center"><i class="fas fa-bullhorn text-orange-400 mr-1"></i>Promote</p>';
                    if (co.promoteConfigured) {
                        html += '<div class="space-y-0.5 text-center">'
                            + '<p class="text-lg font-bold text-gray-800">' + (co.promotePostsPerDay || 0) + '<span class="text-[10px] text-gray-400">/day</span></p>'
                            + '<p class="text-[10px] text-gray-400">' + fmtNum(co.promoteTotalPosts || 0) + ' posts</p>'
                            + '<p class="text-[10px] text-gray-400">' + fmtNum(co.promoteTotalImpressions || 0) + ' impr.</p>'
                            + '<p class="text-[10px] text-gray-400">' + fmtNum(co.promoteFollowers || 0) + ' followers</p>'
                            + '</div>';
                    } else {
                        html += '<p class="text-sm text-gray-300 text-center mt-2">N/A</p>';
                    }
                    html += '</div>';

                    // NETWORK
                    html += '<div class="px-3 py-3">'
                        + '<p class="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2 text-center"><i class="fas fa-user-plus text-blue-400 mr-1"></i>Network</p>';
                    if (co.networkStraightInConfigured) {
                        html += '<div class="space-y-0.5 text-center">'
                            + '<p class="text-lg font-bold text-gray-800">' + (co.networkAcceptanceRate || 0) + '<span class="text-[10px] text-gray-400">%</span></p>'
                            + '<p class="text-[10px] text-gray-400">' + fmtNum(co.networkInvitations || 0) + ' conn. sent</p>'
                            + '<p class="text-[10px] text-gray-400">' + fmtNum(co.networkAccepted || 0) + ' accepted</p>'
                            + '<p class="text-[10px] text-gray-400">' + fmtNum(co.networkMessages || 0) + ' messages</p>'
                            + '<p class="text-[10px] text-gray-400">' + fmtNum(co.networkOpportunities || 0) + ' opportunities</p>'
                            + '<p class="text-[10px] text-gray-400">' + fmtNum(co.networkFollowUps || 0) + ' follow-ups</p>'
                            + '<p class="text-[10px] text-gray-400">' + fmtNum(co.networkInmails || 0) + ' InMails</p>'
                            + '<p class="text-[10px] text-gray-400">' + fmtNum(co.networkPageInvites || 0) + ' page inv.</p>'
                            + '<p class="text-[10px] text-gray-400">' + fmtNum(co.networkProfileVisits || 0) + ' profile visits</p>'
                            + '</div>';
                    } else if (co.networkConfigured) {
                        html += '<div class="space-y-0.5 text-center">'
                            + '<p class="text-lg font-bold text-gray-800">' + (co.networkAcceptanceRate || 0) + '<span class="text-[10px] text-gray-400">%</span></p>'
                            + '<p class="text-[10px] text-gray-400">' + fmtNum(co.networkInvitations || 0) + ' sent</p>'
                            + '<p class="text-[10px] text-gray-400">' + fmtNum(co.networkAccepted || 0) + ' accepted</p>'
                            + '</div>';
                    } else {
                        html += '<p class="text-sm text-gray-300 text-center mt-2">N/A</p>';
                    }
                    html += '</div>';

                    // ENGAGE (Streak pipeline)
                    html += '<div class="px-3 py-3">'
                        + '<p class="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2 text-center"><i class="fas fa-handshake text-green-400 mr-1"></i>Engage</p>';
                    if (co.totalLeads > 0 || co.engageThisMonthLeads > 0) {
                        html += '<div class="space-y-0.5 text-center">'
                            + '<p class="text-lg font-bold text-gray-800">' + (co.engageMeetingsPct || 0) + '<span class="text-[10px] text-gray-400">%</span></p>'
                            + '<p class="text-[10px] text-gray-400">' + fmtNum(co.engageThisMonthLeads || 0) + ' this month</p>'
                            + '<p class="text-[10px] text-gray-400">' + fmtNum(co.weekLeads || 0) + ' this week</p>'
                            + '<p class="text-[10px] text-gray-400">' + fmtNum(co.totalLeads || 0) + ' total leads</p>'
                            + '</div>';
                    } else {
                        html += '<p class="text-sm text-gray-300 text-center mt-2">N/A</p>';
                    }
                    html += '</div>';
                    html += '</div>';

                    // Footer
                    html += '<div class="px-5 py-3 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between mt-auto">'
                        + '<div class="flex items-center gap-3">'
                        + '<span class="text-xs text-gray-500"><i class="fas fa-database text-gray-300 mr-1"></i>' + fmtNum(co.totalLeads) + ' leads</span>'
                        + '<span class="text-xs text-gray-500"><i class="fas fa-bolt text-yellow-400 mr-1"></i>' + co.recentActivity + ' this week</span>'
                        + '</div>'
                        + '<a href="/?company=' + co.key + '" class="inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg px-4 py-2 text-xs font-semibold transition-all shadow">'
                        + '<i class="fas fa-chart-line mr-1.5"></i>Dashboard'
                        + '</a>'
                        + '</div>';

                    html += '</div>';
                    return html;
            }

      // ---------- data ----------
      async function loadOverview(period) {
        document.getElementById('error-state').classList.add('hidden');
        var main = document.querySelector('main');
        if (lastData) { main.classList.add('refetching'); }   // hold previous render, no skeleton flash
        try {
          var res = await fetch('/api/overview?period=' + period);
          if (res.status === 401) { window.location.href = '/login?next=' + encodeURIComponent('/overview'); return; }
          if (!res.ok) throw new Error('HTTP ' + res.status);
          var data = await res.json();
          overviewAverages = data.averages || {};
          data.companies.sort(function(a, b) {
            if (a.error && !b.error) return 1;
            if (!a.error && b.error) return -1;
            return (b.firstLeadTs || 0) - (a.firstLeadTs || 0);
          });
          lastData = data;
          render(data);
        } catch (err) {
          document.getElementById('error-message').textContent = err.message;
          document.getElementById('error-state').classList.remove('hidden');
        } finally {
          main.classList.remove('refetching');
        }
      }

      loadOverview(currentPeriod);
    <\/script>
    <script src="/static/overview-v2.js"><\/script>
    </body>
    </html>
  `));$.get("/",async e=>{const t=Rn(e.req.header("Cookie"),Pt);return(t?await Pn(e.env,t):null)?e.req.query("company")?e.html(`
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
        <!-- Fixed Left Sidebar -->
        <aside id="sidebar" class="fixed top-0 left-0 h-full w-56 bg-gradient-to-b from-blue-700 to-indigo-800 text-white flex flex-col z-50 shadow-xl">
            <!-- Brand -->
            <div class="px-5 pt-6 pb-4 border-b border-blue-600/40">
                <div class="flex items-center mb-1">
                    <i class="fas fa-chart-line text-xl mr-2"></i>
                    <span class="font-bold text-lg">Gershon CRM</span>
                </div>
                <h1 id="dashboard-title" class="text-xs text-blue-200 font-medium">Client Dashboard</h1>
                <span class="inline-block bg-white/15 text-blue-100 font-semibold text-[10px] px-2 py-0.5 rounded-full mt-1 tracking-wide">
                    v1.3.69
                </span>
            </div>

            <!-- Company Selector -->
            <div class="px-4 py-3 border-b border-blue-600/40">
                <label class="text-blue-200 text-[10px] uppercase tracking-wider font-semibold block mb-1">Company</label>
                <select id="company-selector" onchange="switchCompany(this.value)" class="w-full bg-blue-600/50 text-white rounded px-2 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 border border-blue-500/40">
                    <!-- Populated dynamically -->
                </select>
            </div>

            <!-- Navigation -->
            <nav class="flex-1 overflow-y-auto py-3 px-2">
                <button onclick="switchView('executive')" id="tab-executive" class="sidebar-nav active w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-white bg-white/15 mb-0.5 transition-colors">
                    <i class="fas fa-tachometer-alt w-5 mr-2.5 text-center"></i>Dashboard
                </button>

                <div class="mt-3 mb-1 px-3">
                    <span class="text-blue-300/60 text-[10px] uppercase tracking-wider font-semibold">Channels</span>
                </div>
                <button onclick="switchView('promote')" id="tab-promote" class="sidebar-nav w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-blue-100 hover:bg-white/10 mb-0.5 transition-colors">
                    <i class="fas fa-bullhorn w-5 mr-2.5 text-center"></i>Promote
                </button>
                <button onclick="switchView('network')" id="tab-network" class="sidebar-nav w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium text-blue-100 hover:bg-white/10 mb-0.5 transition-colors">
                    <i class="fas fa-users w-5 mr-2.5 text-center"></i>Network
                </button>
                <div class="pl-9 space-y-0.5 mb-1">
                    <button onclick="switchView('network')" class="sidebar-sub w-full flex items-center px-2 py-1.5 rounded text-xs text-blue-200 hover:bg-white/10 transition-colors">
                        <i class="fas fa-paper-plane w-4 mr-2 text-center text-[10px]"></i>Messaging
                    </button>
                </div>
                <button onclick="switchView('engage')" id="tab-engage" class="sidebar-nav w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-blue-100 hover:bg-white/10 mb-0.5 transition-colors">
                    <i class="fas fa-handshake w-5 mr-2.5 text-center"></i>Engage
                </button>

                <div class="mt-3 mb-1 px-3">
                    <span class="text-blue-300/60 text-[10px] uppercase tracking-wider font-semibold">Tools</span>
                </div>
                <button onclick="switchView('onboarding')" id="tab-onboarding" class="sidebar-nav w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-blue-100 hover:bg-white/10 mb-0.5 transition-colors">
                    <i class="fas fa-rocket w-5 mr-2.5 text-center"></i>Onboarding
                </button>
                <button onclick="switchView('print')" id="tab-print" class="sidebar-nav w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-blue-100 hover:bg-white/10 mb-0.5 transition-colors">
                    <i class="fas fa-file-export w-5 mr-2.5 text-center"></i>Export
                </button>
                <button onclick="switchView('report')" id="tab-report" class="sidebar-nav w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-blue-100 hover:bg-white/10 mb-0.5 transition-colors">
                    <i class="fas fa-chart-bar w-5 mr-2.5 text-center"></i>Report
                </button>
                <button onclick="switchView('settings')" id="tab-settings" class="sidebar-nav w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-blue-100 hover:bg-white/10 mb-0.5 transition-colors">
                    <i class="fas fa-cog w-5 mr-2.5 text-center"></i>Settings
                </button>
            </nav>

            <!-- Sidebar Bottom Actions -->
            <div class="px-3 py-2 border-t border-blue-600/40 space-y-1">
                <button onclick="refreshDashboard()" class="w-full flex items-center px-3 py-1.5 rounded-lg text-[11px] font-medium text-blue-200 hover:bg-white/10 transition-colors">
                    <i class="fas fa-sync-alt w-4 mr-2 text-center"></i>Refresh
                </button>
                <a href="/overview" class="flex items-center px-3 py-1.5 rounded-lg text-[11px] font-medium text-blue-200 hover:bg-white/10 transition-colors">
                    <i class="fas fa-th-large w-4 mr-2 text-center"></i>Overview
                </a>
                <a href="/admin" class="flex items-center px-3 py-1.5 rounded-lg text-[11px] font-medium text-blue-200 hover:bg-white/10 transition-colors">
                    <i class="fas fa-shield-alt w-4 mr-2 text-center"></i>Admin
                </a>
                <a id="open-chat-btn" href="#" target="_blank" class="hidden items-center px-3 py-1.5 rounded-lg text-[11px] font-medium text-blue-200 hover:bg-white/10 transition-colors">
                    <i class="fas fa-comments w-4 mr-2 text-center"></i>Chat
                </a>
                <a href="/api/auth/logout" class="flex items-center px-3 py-1.5 rounded-lg text-[11px] font-medium text-blue-200 hover:bg-white/10 transition-colors">
                    <i class="fas fa-right-from-bracket w-4 mr-2 text-center"></i>Sign out
                </a>
            </div>

            <!-- Demo + Logout -->
            <div class="px-3 py-3 border-t border-blue-600/40">
                <button onclick="toggleDemoMode()" id="demo-mode-btn" class="w-full flex items-center justify-center px-3 py-2 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-white mb-2 transition-colors shadow">
                    <i class="fas fa-play-circle mr-2"></i>Demo Mode
                </button>
                <div class="flex items-center justify-between">
                    <p class="text-blue-300/50 text-[9px]">
                        <span id="last-updated" class="font-semibold">Loading...</span>
                    </p>
                    <button onclick="window.location.href='/overview'" class="text-blue-200 hover:text-white text-[11px] font-medium transition-colors">
                        <i class="fas fa-sign-out-alt mr-1"></i>Logout
                    </button>
                </div>
            </div>
        </aside>

        <!-- Main Content Area -->
        <div class="ml-56 min-h-screen">
        <div class="container mx-auto px-6 py-6">

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

                <!-- EXECUTIVE DASHBOARD View -->
                <div id="view-executive" class="view-content">
                    <div class="mb-6">
                        <h2 class="text-2xl font-bold text-gray-800 mb-2 flex items-center">
                            <i class="fas fa-tachometer-alt text-blue-600 mr-3"></i>
                            <span id="exec-company-name">Company</span> — Campaign Dashboard
                        </h2>
                        <p class="text-gray-500 text-sm">Executive summary of campaign performance vs targets</p>
                    </div>

                    <!-- KPI Cards Row -->
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <!-- Acceptance Rate -->
                        <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
                            <div class="flex items-center justify-between mb-2">
                                <span class="text-sm font-medium text-gray-500 uppercase tracking-wide">Acceptance Rate</span>
                                <i class="fas fa-user-plus text-blue-400 text-lg"></i>
                            </div>
                            <div class="text-3xl font-bold text-gray-900 mb-1" id="exec-acceptance-rate">—</div>
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-400">Target: 20%</span>
                                <span id="exec-acceptance-badge" class="text-xs font-semibold px-2 py-1 rounded-full bg-gray-100 text-gray-500">—</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2 mt-3">
                                <div id="exec-acceptance-bar" class="h-2 rounded-full bg-blue-500 transition-all" style="width:0%"></div>
                            </div>
                        </div>

                        <!-- Leads per Month -->
                        <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
                            <div class="flex items-center justify-between mb-2">
                                <span class="text-sm font-medium text-gray-500 uppercase tracking-wide">Leads / Month</span>
                                <i class="fas fa-chart-line text-green-400 text-lg"></i>
                            </div>
                            <div class="text-3xl font-bold text-gray-900 mb-1" id="exec-leads-month">—</div>
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-400">Target: 10/mo</span>
                                <span id="exec-leads-badge" class="text-xs font-semibold px-2 py-1 rounded-full bg-gray-100 text-gray-500">—</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2 mt-3">
                                <div id="exec-leads-bar" class="h-2 rounded-full bg-green-500 transition-all" style="width:0%"></div>
                            </div>
                        </div>

                        <!-- Followers per Month -->
                        <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
                            <div class="flex items-center justify-between mb-2">
                                <span class="text-sm font-medium text-gray-500 uppercase tracking-wide">Followers / Month</span>
                                <i class="fas fa-users text-purple-400 text-lg"></i>
                            </div>
                            <div class="text-3xl font-bold text-gray-900 mb-1" id="exec-followers-month">—</div>
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-400">Target: 100/mo</span>
                                <span id="exec-followers-badge" class="text-xs font-semibold px-2 py-1 rounded-full bg-gray-100 text-gray-500">—</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2 mt-3">
                                <div id="exec-followers-bar" class="h-2 rounded-full bg-purple-500 transition-all" style="width:0%"></div>
                            </div>
                        </div>

                        <!-- Posts per Day -->
                        <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
                            <div class="flex items-center justify-between mb-2">
                                <span class="text-sm font-medium text-gray-500 uppercase tracking-wide">Posts / Day</span>
                                <i class="fas fa-pen-fancy text-orange-400 text-lg"></i>
                            </div>
                            <div class="text-3xl font-bold text-gray-900 mb-1" id="exec-posts-day">Coming Soon</div>
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-400">Target: 1/day</span>
                                <span id="exec-posts-badge" class="text-xs font-semibold px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">Pending</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2 mt-3">
                                <div id="exec-posts-bar" class="h-2 rounded-full bg-orange-500 transition-all" style="width:0%"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Channel Summary Row -->
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        <!-- NETWORK Summary -->
                        <div class="bg-white rounded-xl shadow p-6">
                            <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                <i class="fas fa-project-diagram text-blue-500 mr-2"></i>Network (LinkedIn)
                            </h3>
                            <div id="exec-network-summary" class="space-y-3">
                                <div class="flex justify-between"><span class="text-gray-500">Total Invitations</span><span class="font-semibold" id="exec-net-invitations">—</span></div>
                                <div class="flex justify-between"><span class="text-gray-500">Accepted</span><span class="font-semibold" id="exec-net-accepted">—</span></div>
                                <div class="flex justify-between"><span class="text-gray-500">Avg Rate</span><span class="font-semibold" id="exec-net-rate">—</span></div>
                            </div>
                        </div>

                        <!-- ENGAGE Summary -->
                        <div class="bg-white rounded-xl shadow p-6">
                            <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                <i class="fas fa-handshake text-green-500 mr-2"></i>Engage (Pipeline)
                            </h3>
                            <div id="exec-engage-summary" class="space-y-3">
                                <div class="flex justify-between"><span class="text-gray-500">Total Leads</span><span class="font-semibold" id="exec-eng-leads">—</span></div>
                                <div class="flex justify-between"><span class="text-gray-500">Campaign Duration</span><span class="font-semibold" id="exec-eng-duration">—</span></div>
                                <div class="flex justify-between"><span class="text-gray-500">Avg Leads/Month</span><span class="font-semibold" id="exec-eng-avg">—</span></div>
                            </div>
                        </div>
                    </div>
                </div>


                                <!-- PROMOTE View -->
                <div id="view-promote" class="view-content hidden">
                    <!-- Platform tabs -->
                    <div class="flex space-x-2 mb-6">
                        <button onclick="switchPlatform('linkedin')" id="ptab-linkedin"
                            class="platform-tab flex items-center px-5 py-2.5 rounded-lg text-sm font-semibold border-2 border-blue-600 bg-blue-600 text-white transition-all">
                            <i class="fab fa-linkedin mr-2"></i>LinkedIn
                        </button>
                        <button onclick="switchPlatform('twitter')" id="ptab-twitter"
                            class="platform-tab flex items-center px-5 py-2.5 rounded-lg text-sm font-semibold border-2 border-gray-300 text-gray-400 bg-white cursor-not-allowed transition-all" disabled>
                            <i class="fab fa-x-twitter mr-2"></i>Twitter / X
                            <span class="ml-2 text-xs bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full">Soon</span>
                        </button>
                        <button onclick="switchPlatform('gmb')" id="ptab-gmb"
                            class="platform-tab flex items-center px-5 py-2.5 rounded-lg text-sm font-semibold border-2 border-gray-300 text-gray-400 bg-white cursor-not-allowed transition-all" disabled>
                            <i class="fab fa-google mr-2"></i>Google My Business
                            <span class="ml-2 text-xs bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full">Soon</span>
                        </button>
                    </div>

                    <!-- Loading / Error states -->
                    <div id="promote-loading" class="hidden text-center py-16">
                        <i class="fas fa-spinner fa-spin text-4xl text-blue-500 mb-4"></i>
                        <p class="text-gray-500">Loading promote data...</p>
                    </div>
                    <div id="promote-error" class="hidden bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
                        <p class="font-semibold text-red-800"><i class="fas fa-exclamation-circle mr-2"></i>Could not load promote data</p>
                        <p id="promote-error-msg" class="text-red-600 text-sm mt-1"></p>
                        <p class="text-xs text-red-500 mt-2">Make sure the PROMOTE URL is set in Settings for this company.</p>
                    </div>

                    <!-- LinkedIn content -->
                    <div id="promote-linkedin" class="hidden">
                        <!-- KPI highlight cards -->
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <!-- Followers -->
                            <div class="bg-white rounded-xl shadow p-5 border-t-4 border-blue-500">
                                <p class="text-xs font-semibold text-gray-500 uppercase mb-1">Followers Now</p>
                                <p id="p-followers-now" class="text-3xl font-bold text-gray-800">—</p>
                                <p id="p-followers-growth" class="text-sm text-green-600 font-medium mt-1">—</p>
                                <p id="p-followers-start" class="text-xs text-gray-400 mt-0.5">—</p>
                            </div>
                            <!-- Posts / week -->
                            <div class="bg-white rounded-xl shadow p-5 border-t-4 border-yellow-500">
                                <p class="text-xs font-semibold text-gray-500 uppercase mb-1">Avg Posts / Week</p>
                                <p id="p-posts-per-week" class="text-3xl font-bold text-gray-800">—</p>
                                <div id="p-posts-goal-bar" class="mt-2"></div>
                                <p id="p-posts-total" class="text-xs text-gray-400 mt-1">—</p>
                            </div>
                            <!-- Engagement rate -->
                            <div class="bg-white rounded-xl shadow p-5 border-t-4 border-purple-500">
                                <p class="text-xs font-semibold text-gray-500 uppercase mb-1">Avg Engagement</p>
                                <p id="p-eng-rate" class="text-3xl font-bold text-gray-800">—</p>
                                <p id="p-eng-total" class="text-sm text-gray-500 mt-1">—</p>
                                <p id="p-eng-breakdown" class="text-xs text-gray-400 mt-0.5">—</p>
                            </div>
                            <!-- Impressions -->
                            <div class="bg-white rounded-xl shadow p-5 border-t-4 border-green-500">
                                <p class="text-xs font-semibold text-gray-500 uppercase mb-1">Total Impressions</p>
                                <p id="p-impressions" class="text-3xl font-bold text-gray-800">—</p>
                                <p id="p-reach" class="text-sm text-gray-500 mt-1">—</p>
                                <p id="p-date-range" class="text-xs text-gray-400 mt-0.5">—</p>
                            </div>
                        </div>

                        <!-- Charts row 1 -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <!-- Followers growth -->
                            <div class="bg-white rounded-xl shadow p-5">
                                <h3 class="text-sm font-bold text-gray-700 mb-4 flex items-center">
                                    <i class="fas fa-user-plus text-blue-500 mr-2"></i>Follower Growth
                                </h3>
                                <div class="relative h-48">
                                    <canvas id="p-chart-followers"></canvas>
                                </div>
                            </div>
                            <!-- Weekly posts vs goal -->
                            <div class="bg-white rounded-xl shadow p-5">
                                <h3 class="text-sm font-bold text-gray-700 mb-1 flex items-center">
                                    <i class="fas fa-calendar-check text-yellow-500 mr-2"></i>Weekly Posts vs Goal
                                    <span class="ml-auto text-xs font-normal text-gray-400">Goal: 5/week</span>
                                </h3>
                                <div class="relative h-48 mt-3">
                                    <canvas id="p-chart-posts"></canvas>
                                </div>
                            </div>
                        </div>

                        <!-- Charts row 2 -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <!-- Weekly engagements -->
                            <div class="bg-white rounded-xl shadow p-5">
                                <h3 class="text-sm font-bold text-gray-700 mb-4 flex items-center">
                                    <i class="fas fa-heart text-purple-500 mr-2"></i>Weekly Engagements
                                </h3>
                                <div class="relative h-48">
                                    <canvas id="p-chart-engagements"></canvas>
                                </div>
                            </div>
                            <!-- Weekly impressions -->
                            <div class="bg-white rounded-xl shadow p-5">
                                <h3 class="text-sm font-bold text-gray-700 mb-4 flex items-center">
                                    <i class="fas fa-eye text-green-500 mr-2"></i>Weekly Impressions &amp; Reach
                                </h3>
                                <div class="relative h-48">
                                    <canvas id="p-chart-impressions"></canvas>
                                </div>
                            </div>
                        </div>

                        <!-- Weekly posting consistency table -->
                        <div class="bg-white rounded-xl shadow p-5">
                            <h3 class="text-sm font-bold text-gray-700 mb-4 flex items-center">
                                <i class="fas fa-table text-indigo-500 mr-2"></i>Weekly Publishing Consistency
                                <span class="ml-auto text-xs font-normal text-gray-400">
                                    <span class="inline-block w-3 h-3 rounded-full bg-green-400 mr-1"></span>≥5
                                    <span class="inline-block w-3 h-3 rounded-full bg-yellow-400 mr-1 ml-2"></span>3–4
                                    <span class="inline-block w-3 h-3 rounded-full bg-red-400 mr-1 ml-2"></span>&lt;3
                                </span>
                            </h3>
                            <div id="p-weekly-table" class="overflow-x-auto"></div>
                        </div>
                    </div>
                </div>

                <!-- NETWORK View -->
                <div id="view-network" class="view-content hidden">
                    <div id="network-content">
                        <!-- Network content will be populated by JavaScript -->
                    </div>
                </div>

                <!-- ENGAGE View (formerly Overview) --><div id="view-engage" class="view-content hidden">
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

                    <!-- Lead Velocity & Conversion Analysis -->
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                        <!-- Monthly Lead Velocity -->
                        <div class="bg-white rounded-lg shadow p-6">
                            <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                <i class="fas fa-tachometer-alt text-blue-500 mr-2"></i>Monthly Lead Velocity
                            </h3>
                            <div id="lead-velocity-chart" class="space-y-2">
                                <p class="text-gray-400 text-sm">Loading...</p>
                            </div>
                        </div>

                        <!-- Stage Conversion Rates -->
                        <div class="bg-white rounded-lg shadow p-6">
                            <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                <i class="fas fa-filter text-green-500 mr-2"></i>Stage-to-Stage Conversion
                            </h3>
                            <div id="stage-conversion-chart" class="space-y-2">
                                <p class="text-gray-400 text-sm">Loading...</p>
                            </div>
                        </div>
                    </div>

                    <!-- Time in Stage Analysis -->
                    <div class="bg-white rounded-lg shadow p-6 mt-6">
                        <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                            <i class="fas fa-clock text-purple-500 mr-2"></i>Average Time in Stage
                        </h3>
                        <div id="time-in-stage-chart" class="space-y-2">
                            <p class="text-gray-400 text-sm">Loading...</p>
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

                <!-- Comprehensive Report View -->
                <div id="view-report" class="view-content hidden">
                    <div class="bg-white rounded-lg shadow p-4 mb-4">
                        <div class="flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <h2 class="text-xl font-bold text-gray-800"><i class="fas fa-chart-bar mr-2 text-indigo-600"></i>Comprehensive Report</h2>
                                <p class="text-sm text-gray-500 mt-0.5">Promote · Network · Engage — every number pulled in, per client.</p>
                            </div>
                            <div class="flex flex-wrap items-center gap-2">
                                <div class="inline-flex rounded-lg border border-gray-300 overflow-hidden text-sm">
                                    <button id="rpt-scope-client" onclick="setReportScope('client')" class="px-3 py-1.5 font-medium bg-indigo-600 text-white">This client</button>
                                    <button id="rpt-scope-all" onclick="setReportScope('all')" class="px-3 py-1.5 font-medium bg-white text-gray-600">All clients</button>
                                </div>
                                <div class="inline-flex rounded-lg border border-gray-300 overflow-hidden text-sm">
                                    <button id="rpt-period-month" onclick="setReportPeriod('month')" class="px-3 py-1.5 font-medium bg-indigo-600 text-white">Monthly</button>
                                    <button id="rpt-period-week" onclick="setReportPeriod('week')" class="px-3 py-1.5 font-medium bg-white text-gray-600">Weekly</button>
                                </div>
                                <button onclick="openReportNewTab()" class="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium"><i class="fas fa-external-link-alt mr-1"></i>Open</button>
                                <button onclick="printReportFrame()" class="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium"><i class="fas fa-print mr-1"></i>Print</button>
                            </div>
                        </div>
                    </div>
                    <div id="report-loading" class="text-center py-16 text-gray-400"><i class="fas fa-spinner fa-spin text-2xl"></i><p class="mt-2 text-sm">Pulling Promote, Network and Engage data…</p></div>
                    <iframe id="report-frame" class="w-full rounded-lg border border-gray-200 bg-white hidden" style="height:calc(100vh - 180px);min-height:600px;" title="Comprehensive report"></iframe>
                </div>

            <!-- Settings View -->
            <div id="view-settings" class="view-content hidden">
                <!-- Streak API Key (shared across all companies) -->
                <div class="bg-white rounded-lg shadow p-6 mb-6 border-l-4 border-red-500">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-bold text-gray-800 flex items-center">
                            <i class="fas fa-key text-red-600 mr-3"></i>
                            Streak API Key
                        </h3>
                        <div id="streak-key-badge" class="text-sm text-gray-400">Checking...</div>
                    </div>
                    <p class="text-gray-600 text-sm mb-4">The Streak API key is shared across all companies. Enter your key from Streak Settings &rarr; Integrations &rarr; API.</p>
                    <div class="flex items-center justify-between mb-3">
                        <span class="text-sm font-medium text-gray-700">Current Key Status</span>
                        <span id="streak-key-masked" class="text-sm font-mono text-gray-500"></span>
                    </div>
                    <div class="flex gap-3">
                        <input type="password" id="streak-key-input-settings"
                            placeholder="Enter new Streak API key (e.g., strk_...)"
                            class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 font-mono text-sm" />
                        <button onclick="saveStreakKeyFromSettings()"
                            class="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all shadow-lg flex items-center">
                            <i class="fas fa-save mr-2"></i>Save Key
                        </button>
                    </div>
                    <div id="streak-key-msg" class="mt-2 text-sm"></div>
                </div>

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
                            <h3 class="text-lg font-semibold text-gray-800 mb-3 flex items-center justify-between">
                                <span><i class="fas fa-bullhorn text-yellow-600 mr-2"></i>PROMOTE Data Source</span>
                                <span id="status-promote" class="hidden text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-700"><i class="fas fa-check-circle mr-1"></i>URL saved</span>
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
                            <h3 class="text-lg font-semibold text-gray-800 mb-3 flex items-center justify-between">
                                <span><i class="fas fa-users text-blue-600 mr-2"></i>NETWORK Data Source</span>
                                <span id="status-network" class="hidden text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-700"><i class="fas fa-check-circle mr-1"></i>URL saved</span>
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
                                    <label class="text-sm font-medium text-gray-700">Sheet GID (optional — extracted from URL automatically):</label>
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
                                    LinkedIn networking data from Google Sheets — paste the full URL, GID is auto-extracted
                                </p>
                            </div>
                        </div>

                        <!-- STRAIGHT-IN (LinkedIn Outreach) -->
                        <div class="p-6 bg-cyan-50 border border-cyan-200 rounded-lg">
                            <h3 class="text-lg font-semibold text-gray-800 mb-3 flex items-center justify-between">
                                <span><i class="fab fa-linkedin text-cyan-600 mr-2"></i>Straight-in LinkedIn Outreach</span>
                                <span id="status-straightin" class="hidden text-xs font-semibold px-2 py-1 rounded-full bg-cyan-100 text-cyan-700"><i class="fas fa-check-circle mr-1"></i>Configured</span>
                            </h3>
                            <div class="space-y-2">
                                <label class="text-sm font-medium text-gray-700">Report ID:</label>
                                <input
                                    type="text"
                                    id="edit-straightin-report-id"
                                    placeholder="e.g., crp_q0CBl-1utF3wWfppyIX8SgVJo1mWOBB1"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 font-mono text-sm"
                                />
                                <p class="text-xs text-gray-500">
                                    <i class="fas fa-link mr-1"></i>
                                    From the Straight-in weekly report URL: prospecthub.straight-in.com/r/campaign-report/<strong>REPORT_ID</strong>
                                </p>
                            </div>
                        </div>

                        <!-- SERVICES AGREED -->
                        <div class="p-6 bg-slate-50 border border-slate-200 rounded-lg">
                            <h3 class="text-lg font-semibold text-gray-800 mb-1 flex items-center">
                                <i class="fas fa-list-check text-slate-600 mr-2"></i>Services agreed
                            </h3>
                            <p class="text-xs text-gray-500 mb-3">Only selected services count toward this client's efficiency score, and only their tabs show on the client dashboard.</p>
                            <div class="flex flex-wrap gap-4">
                                <label class="inline-flex items-center gap-2 text-sm font-medium text-gray-700"><input type="checkbox" id="edit-svc-promote" class="w-4 h-4">Promote</label>
                                <label class="inline-flex items-center gap-2 text-sm font-medium text-gray-700"><input type="checkbox" id="edit-svc-network" class="w-4 h-4">Network</label>
                                <label class="inline-flex items-center gap-2 text-sm font-medium text-gray-700"><input type="checkbox" id="edit-svc-engage" class="w-4 h-4">Engage</label>
                            </div>
                        </div>

                        <!-- ENGAGE Source -->
                        <div class="p-6 bg-green-50 border border-green-200 rounded-lg">
                            <h3 class="text-lg font-semibold text-gray-800 mb-3 flex items-center justify-between">
                                <span><i class="fas fa-handshake text-green-600 mr-2"></i>ENGAGE Data Source</span>
                                <span id="status-engage" class="hidden text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-700"><i class="fas fa-check-circle mr-1"></i>URL saved</span>
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

                        <!-- GOOGLE CHAT Integration -->
                        <div class="p-6 bg-indigo-50 border border-indigo-200 rounded-lg">
                            <h3 class="text-lg font-semibold text-gray-800 mb-3 flex items-center justify-between">
                                <span><i class="fas fa-comments text-indigo-600 mr-2"></i>Google Chat Integration</span>
                                <span id="status-googlechat" class="hidden text-xs font-semibold px-2 py-1 rounded-full bg-indigo-100 text-indigo-700"><i class="fas fa-check-circle mr-1"></i>Configured</span>
                            </h3>
                            <div class="space-y-4">
                                <div>
                                    <label class="text-sm font-medium text-gray-700">Chat Space URL:</label>
                                    <input
                                        type="url"
                                        id="edit-googlechat-url"
                                        placeholder="https://chat.google.com/app/chat/AAAA-..."
                                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
                                    />
                                    <p class="text-xs text-gray-500 mt-1">
                                        <i class="fas fa-external-link-alt mr-1"></i>
                                        Link to the Google Chat space — used for the "Open Chat" button
                                    </p>
                                </div>
                                <div>
                                    <label class="text-sm font-medium text-gray-700">Webhook URL:</label>
                                    <input
                                        type="url"
                                        id="edit-googlechat-webhook"
                                        placeholder="https://chat.googleapis.com/v1/spaces/..."
                                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
                                    />
                                    <p class="text-xs text-gray-500 mt-1">
                                        <i class="fas fa-robot mr-1"></i>
                                        Webhook endpoint for automated messages (weekly reminders)
                                    </p>
                                </div>
                            </div>
                        </div>


                        <!-- SCHEDULED MESSAGES -->
                        <div class="p-6 bg-orange-50 border border-orange-200 rounded-lg">
                            <h3 class="text-lg font-semibold text-gray-800 mb-3 flex items-center justify-between">
                                <span><i class="fas fa-paper-plane text-orange-600 mr-2"></i>Scheduled Messages</span>
                                <button type="button" onclick="addMessageRow()" class="text-sm bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-lg transition-colors">
                                    <i class="fas fa-plus mr-1"></i>Add Message
                                </button>
                            </h3>
                            <p class="text-xs text-gray-600 mb-4">
                                <i class="fas fa-info-circle mr-1"></i>
                                Configure automated messages sent to this company's Google Chat. Use dynamic variables: <code class="bg-orange-100 px-1 rounded">[leads:Lead]</code>, <code class="bg-orange-100 px-1 rounded">[leads:Contacted]</code>, <code class="bg-orange-100 px-1 rounded">[leads:Qualified]</code> etc. to insert live Streak counts.
                            </p>
                            <div id="messages-list" class="space-y-4">
                                <!-- Messages populated dynamically -->
                            </div>
                            <div id="no-messages" class="text-center py-6 text-gray-400">
                                <i class="fas fa-envelope-open text-3xl mb-2"></i>
                                <p class="text-sm">No scheduled messages yet. Click "Add Message" to create one.</p>
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

                            <!-- Group -->
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

                            <!-- Straight-in Report ID (Optional) -->
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fab fa-linkedin text-cyan-600 mr-2"></i>
                                    Straight-in Report ID
                                    <span class="text-gray-400 text-xs ml-2">(Optional)</span>
                                </label>
                                <input
                                    type="text"
                                    id="new-straightin-report-id"
                                    placeholder="e.g., crp_q0CBl-1utF3wWfppyIX8SgVJo1mWOBB1"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 font-mono text-sm"
                                />
                                <p class="text-xs text-gray-500 mt-1">From the Straight-in weekly report URL</p>
                            </div>

                            <!-- Services agreed -->
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-list-check text-slate-600 mr-2"></i>Services agreed
                                </label>
                                <div class="flex flex-wrap gap-4">
                                    <label class="inline-flex items-center gap-2 text-sm font-medium text-gray-700"><input type="checkbox" id="new-svc-promote" class="w-4 h-4" checked>Promote</label>
                                    <label class="inline-flex items-center gap-2 text-sm font-medium text-gray-700"><input type="checkbox" id="new-svc-network" class="w-4 h-4" checked>Network</label>
                                    <label class="inline-flex items-center gap-2 text-sm font-medium text-gray-700"><input type="checkbox" id="new-svc-engage" class="w-4 h-4" checked>Engage</label>
                                </div>
                                <p class="text-xs text-gray-500 mt-1">Unchecked services are excluded from the efficiency score and hidden on the client dashboard.</p>
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

                            <!-- Google Chat Webhook URL (Optional) -->
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-comments text-indigo-600 mr-2"></i>
                                    Google Chat Space URL
                                    <span class="text-gray-400 text-xs ml-2">(Optional)</span>
                                </label>
                                <input
                                    type="url"
                                    id="new-googlechat-url"
                                    placeholder="https://chat.google.com/app/chat/AAAA-..."
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
                                />
                                <p class="text-xs text-gray-500 mt-1">Link to the Google Chat space for this company</p>
                            </div>

                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-robot text-indigo-600 mr-2"></i>
                                    Google Chat Webhook URL
                                    <span class="text-gray-400 text-xs ml-2">(Optional)</span>
                                </label>
                                <input
                                    type="url"
                                    id="new-googlechat-webhook"
                                    placeholder="https://chat.googleapis.com/v1/spaces/..."
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
                                />
                                <p class="text-xs text-gray-500 mt-1">Webhook endpoint for sending automated messages</p>
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
                        <span><span id="onboarding-company-name">Company</span> Onboarding Status</span>
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
            let isDemoMode = false;
            let realData = null;

            function generateDemoData() {
                const now = new Date();
                const monthlyLeads = [];
                const counts = [8, 12, 15, 11, 18, 22, 14, 19, 25, 21, 28, 32];
                for (let i = 11; i >= 0; i--) {
                    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
                    const y = d.getFullYear();
                    const m = d.getMonth() + 1;
                    const count = counts[11 - i];
                    monthlyLeads.push({
                        month: y + '-' + String(m).padStart(2, '0'),
                        monthName: d.toLocaleString('en-US', { month: 'short', year: 'numeric' }),
                        count: count,
                        objective: 10,
                        percentage: parseFloat(((count / 10) * 100).toFixed(1)),
                        status: count >= 10 ? 'achieved' : 'pending'
                    });
                }
                return {
                    company: 'Acme Corporation',
                    companyKey: 'demo',
                    totalBoxes: 247,
                    campaignDurationMonths: 12,
                    firstLeadDate: new Date(now.getFullYear() - 1, now.getMonth(), 1).toISOString(),
                    networkData: {
                        totalInvitations: 8420,
                        totalAccepted: 3650,
                        avgAcceptanceRate: 43.3,
                        weeklyData: Array.from({length: 52}, (_, i) => ({
                            week: 'W' + (i+1),
                            sent: Math.floor(120 + Math.random() * 80),
                            accepted: Math.floor(45 + Math.random() * 40),
                            rate: parseFloat((35 + Math.random() * 20).toFixed(1))
                        })),
                        monthlyData: Array.from({length: 12}, (_, i) => {
                            const d = new Date(now.getFullYear(), now.getMonth() - 11 + i, 1);
                            const sent = Math.floor(450 + i * 30 + Math.random() * 100);
                            const accepted = Math.floor(sent * (0.38 + i * 0.008));
                            return {
                                month: d.toLocaleString('en-US', { month: 'short', year: 'numeric' }),
                                sent: sent,
                                accepted: accepted,
                                rate: parseFloat(((accepted/sent)*100).toFixed(1))
                            };
                        })
                    },
                    stageDistribution: { 'Lead': 52, 'Contacted': 68, 'Engaged': 45, 'Call Scheduled': 38, 'Proposal Sent': 22, 'Negotiation': 14, 'Won': 8 },
                    originDistribution: { 'LinkedIn': 112, 'Referral': 48, 'Email Campaign': 42, 'Website': 28, 'Event': 17 },
                    fitDistribution: { 'High': 98, 'Medium': 87, 'Low': 35, 'Not Set': 27 },
                    fitPercentages: { 'High': '39.7', 'Medium': '35.2', 'Low': '14.2', 'Not Set': '10.9' },
                    interestDistribution: { 'High': 82, 'Medium': 95, 'Low': 42, 'Not Set': 28 },
                    interestPercentages: { 'High': '33.2', 'Medium': '38.5', 'Low': '17.0', 'Not Set': '11.3' },
                    countryDistribution: { 'United States': 98, 'United Kingdom': 42, 'France': 35, 'Germany': 28, 'Canada': 24, 'Other': 20 },
                    languageDistribution: { 'English': 172, 'French': 40, 'German': 20, 'Spanish': 15 },
                    freshnessDistribution: { 'High (>0.5)': 85, 'Medium (0.2-0.5)': 102, 'Low (<0.2)': 60 },
                    monthlyLeads: monthlyLeads,
                    leadObjective: 10,
                    averageLeadsPerMonth: 18.8,
                    averagePercentage: 188.0,
                    recentBoxes: [
                        { name: 'Microsoft Corp', stage: 'Negotiation', fit: 'High', interest: 'High', country: 'United States', lastUpdated: new Date(Date.now() - 86400000).toISOString() },
                        { name: 'Salesforce Inc', stage: 'Proposal Sent', fit: 'High', interest: 'High', country: 'United States', lastUpdated: new Date(Date.now() - 172800000).toISOString() },
                        { name: 'SAP SE', stage: 'Call Scheduled', fit: 'High', interest: 'Medium', country: 'Germany', lastUpdated: new Date(Date.now() - 259200000).toISOString() },
                        { name: 'Oracle Corp', stage: 'Engaged', fit: 'High', interest: 'High', country: 'United States', lastUpdated: new Date(Date.now() - 345600000).toISOString() },
                        { name: 'ServiceNow', stage: 'Proposal Sent', fit: 'High', interest: 'High', country: 'United States', lastUpdated: new Date(Date.now() - 432000000).toISOString() },
                        { name: 'Workday Inc', stage: 'Negotiation', fit: 'Medium', interest: 'High', country: 'United States', lastUpdated: new Date(Date.now() - 518400000).toISOString() },
                        { name: 'HubSpot', stage: 'Call Scheduled', fit: 'High', interest: 'Medium', country: 'United States', lastUpdated: new Date(Date.now() - 604800000).toISOString() },
                        { name: 'Datadog', stage: 'Engaged', fit: 'High', interest: 'High', country: 'France', lastUpdated: new Date(Date.now() - 691200000).toISOString() }
                    ]
                };
            }

            function toggleDemoMode() {
                isDemoMode = !isDemoMode;
                var btn = document.getElementById('demo-mode-btn');
                if (isDemoMode) {
                    realData = currentData;
                    currentData = generateDemoData();
                    btn.innerHTML = '<i class="fas fa-stop-circle mr-2"></i>Exit Demo';
                    btn.classList.remove('bg-amber-500', 'hover:bg-amber-400');
                    btn.classList.add('bg-red-500', 'hover:bg-red-400');
                    document.getElementById('dashboard-title').textContent = 'Acme Corporation - Pipeline Report';
                    document.getElementById('loading').classList.add('hidden');
                    document.getElementById('dashboard').classList.remove('hidden');
                    updateDashboard(currentData);
                    updateExecutiveDashboard();
                    updateEngageAnalytics();
                    switchView('executive');
                } else {
                    currentData = realData;
                    btn.innerHTML = '<i class="fas fa-play-circle mr-2"></i>Demo Mode';
                    btn.classList.remove('bg-red-500', 'hover:bg-red-400');
                    btn.classList.add('bg-amber-500', 'hover:bg-amber-400');
                    if (currentData) {
                        var cn = currentData.company || 'Company';
                        document.getElementById('dashboard-title').textContent = cn + ' - Pipeline Report';
                        updateDashboard(currentData);
                        updateExecutiveDashboard();
                        updateEngageAnalytics();
                    }
                    switchView('executive');
                }
            }

            // Company configuration
            const COMPANIES = {
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
                // Reset promote cache so new company loads fresh data
                promoteDataCache = null;
                Object.values(promoteCharts).forEach((c) => c.destroy());
                promoteCharts = {};

                // Immediately update header title from dropdown text (before data loads)
                const selector = document.getElementById('company-selector');
                selector.value = companyKey;
                const selectedOption = selector.options[selector.selectedIndex];
                const displayName = selectedOption ? selectedOption.textContent.trim() : companyKey;
                document.getElementById('dashboard-title').innerHTML = \`
                    <i class="fas fa-chart-line mr-3"></i>
                    \${displayName} - Pipeline Report
                \`;

                // Show loading state
                document.getElementById('dashboard').classList.add('hidden');
                document.getElementById('loading').classList.remove('hidden');
                document.getElementById('error').classList.add('hidden');

                // Update Google Sheets formulas for this company
                updateSheetsFormulas();

                // Update Open Chat button visibility
                updateOpenChatButton();

                // Update Settings view
                updateSettingsView();


                // Update Executive Dashboard and Onboarding view
                updateExecutiveDashboard();
                updateOnboardingView();
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
                    const response = await fetch(\`/api/analytics?company=\${companyKey}\`);

                    if (!response.ok) {
                        // Surface the actual server error (Streak API issue, missing pipeline key, etc.)
                        let detail = 'Failed to fetch company data';
                        try {
                            const errData = await response.json();
                            detail = errData.error || detail;
                        } catch (_) {}
                        throw new Error(detail);
                    }

                    const data = await response.json();
                    currentData = data;

                    // Use company name from API response (works for both hardcoded and KV companies)
                    const companyName = data.company || (COMPANIES[companyKey] && COMPANIES[companyKey].name) || companyKey;

                    // Update page title with company name
                    document.getElementById('dashboard-title').innerHTML = \`
                        <i class="fas fa-chart-line mr-3"></i>
                        \${companyName} - Pipeline Report
                    \`;
                    
                    // Hide loading, show dashboard
                    document.getElementById('loading').classList.add('hidden');
                    document.getElementById('dashboard').classList.remove('hidden');
                    updateTimestamp();
                    
                    // Update summary cards and charts
                    updateDashboard(data);

                    // Update executive dashboard and engage analytics
                    updateExecutiveDashboard();
                    updateEngageAnalytics();
                    
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
                document.querySelectorAll('.sidebar-nav').forEach(tab => {
                    tab.classList.remove('active', 'bg-white/15', 'text-white');
                    tab.classList.add('text-blue-100');
                });
                
                // Show selected view
                document.getElementById('view-' + viewName).classList.remove('hidden');
                
                // Add active class to selected tab
                const activeTab = document.getElementById('tab-' + viewName);
                activeTab.classList.add('active', 'bg-white/15', 'text-white');
                activeTab.classList.remove('text-blue-100');
                
                // The comprehensive report loads its own data via iframe — no
                // dependency on currentData (the per-client analytics payload).
                if (viewName === 'report') {
                    renderReportView();
                }

                // Render view-specific content
                if (currentData) {
                    if (viewName === 'print') {
                        renderPrintView(currentData);
                    } else if (viewName === 'network' || viewName === 'stage' || viewName === 'fit' || viewName === 'interest') {
                        renderView(viewName, currentData);
                    } else if (viewName === 'executive') {
                        updateExecutiveDashboard();
                    } else if (viewName === 'engage') {
                        updateEngageAnalytics();
                    } else if (viewName === 'onboarding') {
                        updateOnboardingView();
                    } else if (viewName === 'promote') {
                        loadPromoteData();
                    }
                }
            }

            // ── Comprehensive Report View ─────────────────────────────────────
            let reportScope = 'client';   // 'client' | 'all'
            let reportPeriod = 'month';   // 'month' | 'week'
            function reportUrl() {
                let u = '/api/reports/comprehensive?period=' + reportPeriod;
                if (reportScope === 'client' && currentCompany) u += '&company=' + encodeURIComponent(currentCompany);
                return u;
            }
            function renderReportView() {
                const frame = document.getElementById('report-frame');
                const loading = document.getElementById('report-loading');
                if (!frame) return;
                loading.classList.remove('hidden');
                frame.classList.add('hidden');
                frame.onload = () => { loading.classList.add('hidden'); frame.classList.remove('hidden'); };
                frame.src = reportUrl();
            }
            function setReportScope(s) {
                reportScope = s;
                document.getElementById('rpt-scope-client').className = 'px-3 py-1.5 font-medium ' + (s==='client'?'bg-indigo-600 text-white':'bg-white text-gray-600');
                document.getElementById('rpt-scope-all').className = 'px-3 py-1.5 font-medium ' + (s==='all'?'bg-indigo-600 text-white':'bg-white text-gray-600');
                renderReportView();
            }
            function setReportPeriod(p) {
                reportPeriod = p;
                document.getElementById('rpt-period-month').className = 'px-3 py-1.5 font-medium ' + (p==='month'?'bg-indigo-600 text-white':'bg-white text-gray-600');
                document.getElementById('rpt-period-week').className = 'px-3 py-1.5 font-medium ' + (p==='week'?'bg-indigo-600 text-white':'bg-white text-gray-600');
                renderReportView();
            }
            function openReportNewTab() { window.open(reportUrl(), '_blank'); }
            function printReportFrame() {
                const f = document.getElementById('report-frame');
                if (f && f.contentWindow) { f.contentWindow.focus(); f.contentWindow.print(); }
            }

            // ── PROMOTE Section ───────────────────────────────────────────────
            let promoteCharts = {};
            let currentPlatform = 'linkedin';
            let promoteDataCache = null;

            function switchPlatform(platform) {
                currentPlatform = platform;
                // Update tab styles
                ['linkedin','twitter','gmb'].forEach(p => {
                    const tab = document.getElementById('ptab-' + p);
                    if (!tab) return;
                    if (p === platform) {
                        tab.classList.add('border-blue-600','bg-blue-600','text-white');
                        tab.classList.remove('border-gray-300','text-gray-400','bg-white');
                    } else {
                        tab.classList.remove('border-blue-600','bg-blue-600','text-white');
                        tab.classList.add('border-gray-300','text-gray-400','bg-white');
                    }
                });
                if (promoteDataCache) renderPromoteData(promoteDataCache);
            }

            async function loadPromoteData() {
                if (promoteDataCache) { renderPromoteData(promoteDataCache); return; }
                document.getElementById('promote-loading').classList.remove('hidden');
                document.getElementById('promote-error').classList.add('hidden');
                document.getElementById('promote-linkedin').classList.add('hidden');
                try {
                    const res = await fetch(\`/api/promote?company=\${currentCompany}\`);
                    if (!res.ok) {
                        const e = await res.json();
                        throw new Error(e.error || 'Failed to load');
                    }
                    promoteDataCache = await res.json();
                    renderPromoteData(promoteDataCache);
                } catch(err) {
                    document.getElementById('promote-loading').classList.add('hidden');
                    document.getElementById('promote-error').classList.remove('hidden');
                    document.getElementById('promote-error-msg').textContent = err.message;
                }
            }

            function fmtNum(n) {
                if (n >= 1000000) return (n/1000000).toFixed(1) + 'M';
                if (n >= 1000) return (n/1000).toFixed(1) + 'K';
                return n.toString();
            }

            function renderPromoteData(data) {
                document.getElementById('promote-loading').classList.add('hidden');
                const pd = data.platforms && data.platforms[currentPlatform];

                if (!pd) {
                    document.getElementById('promote-linkedin').classList.add('hidden');
                    document.getElementById('promote-error').classList.remove('hidden');
                    document.getElementById('promote-error-msg').textContent =
                        currentPlatform === 'linkedin'
                        ? 'No LinkedIn data in this sheet.'
                        : 'No data available for this platform yet.';
                    return;
                }

                document.getElementById('promote-error').classList.add('hidden');
                document.getElementById('promote-linkedin').classList.remove('hidden');

                // KPI cards
                const growthSign = pd.followersGrowth >= 0 ? '+' : '';
                document.getElementById('p-followers-now').textContent = fmtNum(pd.followersEnd);
                document.getElementById('p-followers-growth').innerHTML =
                    \`<i class="fas fa-\${pd.followersGrowth >= 0 ? 'arrow-up text-green-600' : 'arrow-down text-red-500'}"></i> \${growthSign}\${pd.followersGrowth} (\${growthSign}\${pd.followersGrowthPct}%)\`;
                document.getElementById('p-followers-start').textContent =
                    \`Started at \${fmtNum(pd.followersStart)} · \${pd.dateRange.from} → \${pd.dateRange.to}\`;

                const postColor = pd.avgPostsPerWeek >= 5 ? 'text-green-600' : pd.avgPostsPerWeek >= 3 ? 'text-yellow-600' : 'text-red-500';
                document.getElementById('p-posts-per-week').innerHTML =
                    \`<span class="\${postColor}">\${pd.avgPostsPerWeek}</span><span class="text-base font-normal text-gray-400"> / 5</span>\`;
                const goalPct = Math.min(100, (pd.avgPostsPerWeek / 5) * 100);
                const barColor = pd.avgPostsPerWeek >= 5 ? 'bg-green-500' : pd.avgPostsPerWeek >= 3 ? 'bg-yellow-400' : 'bg-red-400';
                document.getElementById('p-posts-goal-bar').innerHTML =
                    \`<div class="w-full bg-gray-100 rounded-full h-2"><div class="\${barColor} h-2 rounded-full" style="width:\${goalPct}%"></div></div>\`;
                document.getElementById('p-posts-total').textContent = \`\${pd.totalPosts} posts total · \${pd.weeklyBreakdown.length} weeks\`;

                document.getElementById('p-eng-rate').textContent = pd.avgEngRate + '%';
                document.getElementById('p-eng-total').textContent = fmtNum(pd.totalEngagements) + ' total engagements';
                document.getElementById('p-eng-breakdown').textContent =
                    \`\${fmtNum(pd.totalLikes)} likes · \${fmtNum(pd.totalComments)} comments · \${fmtNum(pd.totalShares)} shares\`;

                document.getElementById('p-impressions').textContent = fmtNum(pd.totalImpressions);
                document.getElementById('p-reach').textContent = fmtNum(pd.totalReach) + ' unique reach';
                document.getElementById('p-date-range').textContent = \`\${pd.dateRange.from} → \${pd.dateRange.to}\`;

                // Destroy old charts
                Object.values(promoteCharts).forEach((c) => c.destroy());
                promoteCharts = {};

                const weeks = pd.weeklyBreakdown;
                const weekLabels = weeks.map((w) => {
                    const d = new Date(w.week);
                    return \`\${d.getDate()}/\${d.getMonth()+1}\`;
                });

                // Chart 1 — Follower Growth
                const followerDates = pd.dailyData.map((d) => {
                    const dt = new Date(d.date);
                    return \`\${dt.getDate()}/\${dt.getMonth()+1}\`;
                });
                promoteCharts.followers = new Chart(document.getElementById('p-chart-followers'), {
                    type: 'line',
                    data: {
                        labels: followerDates,
                        datasets: [{
                            label: 'Followers',
                            data: pd.dailyData.map((d) => d.followers),
                            borderColor: '#3b82f6', backgroundColor: 'rgba(59,130,246,0.08)',
                            fill: true, tension: 0.3, pointRadius: 0, borderWidth: 2
                        }]
                    },
                    options: {
                        responsive: true, maintainAspectRatio: false,
                        plugins: { legend: { display: false }, datalabels: { display: false } },
                        scales: {
                            x: { ticks: { maxTicksLimit: 8, font: { size: 10 } }, grid: { display: false } },
                            y: { ticks: { font: { size: 10 } }, grid: { color: 'rgba(0,0,0,0.05)' } }
                        }
                    }
                });

                // Chart 2 — Weekly Posts vs Goal
                const postColors = weeks.map((w) =>
                    w.posts >= 5 ? 'rgba(34,197,94,0.8)' : w.posts >= 3 ? 'rgba(234,179,8,0.8)' : 'rgba(239,68,68,0.8)');
                promoteCharts.posts = new Chart(document.getElementById('p-chart-posts'), {
                    type: 'bar',
                    data: {
                        labels: weekLabels,
                        datasets: [
                            {
                                label: 'Posts',
                                data: weeks.map((w) => w.posts),
                                backgroundColor: postColors, borderRadius: 4
                            },
                            {
                                label: 'Goal (5)',
                                data: weeks.map(() => 5),
                                type: 'line',
                                borderColor: '#ef4444', borderDash: [6,3],
                                borderWidth: 2, pointRadius: 0,
                                backgroundColor: 'transparent'
                            }
                        ]
                    },
                    options: {
                        responsive: true, maintainAspectRatio: false,
                        plugins: { legend: { display: false }, datalabels: { display: false } },
                        scales: {
                            x: { ticks: { font: { size: 10 } }, grid: { display: false } },
                            y: { beginAtZero: true, ticks: { stepSize: 1, font: { size: 10 } }, grid: { color: 'rgba(0,0,0,0.05)' } }
                        }
                    }
                });

                // Chart 3 — Weekly Engagements
                promoteCharts.eng = new Chart(document.getElementById('p-chart-engagements'), {
                    type: 'bar',
                    data: {
                        labels: weekLabels,
                        datasets: [{
                            label: 'Engagements',
                            data: weeks.map((w) => w.engagements),
                            backgroundColor: 'rgba(168,85,247,0.7)', borderRadius: 4
                        }]
                    },
                    options: {
                        responsive: true, maintainAspectRatio: false,
                        plugins: { legend: { display: false }, datalabels: { display: false } },
                        scales: {
                            x: { ticks: { font: { size: 10 } }, grid: { display: false } },
                            y: { beginAtZero: true, ticks: { font: { size: 10 } }, grid: { color: 'rgba(0,0,0,0.05)' } }
                        }
                    }
                });

                // Chart 4 — Impressions & Reach
                promoteCharts.imp = new Chart(document.getElementById('p-chart-impressions'), {
                    type: 'line',
                    data: {
                        labels: weekLabels,
                        datasets: [
                            {
                                label: 'Impressions',
                                data: weeks.map((w) => w.impressions),
                                borderColor: '#22c55e', backgroundColor: 'rgba(34,197,94,0.1)',
                                fill: true, tension: 0.3, pointRadius: 3, borderWidth: 2
                            },
                            {
                                label: 'Reach',
                                data: weeks.map((w) => w.reach),
                                borderColor: '#f59e0b', backgroundColor: 'transparent',
                                tension: 0.3, pointRadius: 3, borderWidth: 2, borderDash: [4,3]
                            }
                        ]
                    },
                    options: {
                        responsive: true, maintainAspectRatio: false,
                        plugins: {
                            legend: { position: 'bottom', labels: { font: { size: 10 }, boxWidth: 12 } },
                            datalabels: { display: false }
                        },
                        scales: {
                            x: { ticks: { font: { size: 10 } }, grid: { display: false } },
                            y: { beginAtZero: true, ticks: { font: { size: 10 } }, grid: { color: 'rgba(0,0,0,0.05)' } }
                        }
                    }
                });

                // Weekly consistency table
                const tableRows = weeks.map((w) => {
                    const dot = w.posts >= 5
                        ? '<span class="inline-block w-3 h-3 rounded-full bg-green-400 mr-2"></span>'
                        : w.posts >= 3
                        ? '<span class="inline-block w-3 h-3 rounded-full bg-yellow-400 mr-2"></span>'
                        : '<span class="inline-block w-3 h-3 rounded-full bg-red-400 mr-2"></span>';
                    const bgRow = w.posts >= 5 ? 'bg-green-50' : w.posts >= 3 ? 'bg-yellow-50' : 'bg-red-50';
                    const d = new Date(w.week);
                    const weekLabel = \`Week of \${d.toLocaleDateString('en-US',{month:'short',day:'numeric'})}\`;
                    return \`<tr class="\${bgRow}">
                        <td class="px-4 py-2 text-sm font-medium text-gray-700">\${dot}\${weekLabel}</td>
                        <td class="px-4 py-2 text-center font-bold \${w.posts >= 5 ? 'text-green-700' : w.posts >= 3 ? 'text-yellow-700' : 'text-red-600'}">\${w.posts} / 5</td>
                        <td class="px-4 py-2 text-center text-sm text-gray-600">\${fmtNum(w.impressions)}</td>
                        <td class="px-4 py-2 text-center text-sm text-gray-600">\${fmtNum(w.engagements)}</td>
                        <td class="px-4 py-2 text-center text-sm text-gray-600">\${fmtNum(w.reach)}</td>
                    </tr>\`;
                }).join('');

                document.getElementById('p-weekly-table').innerHTML = \`
                    <table class="w-full text-left border-collapse text-sm">
                        <thead><tr class="border-b border-gray-200">
                            <th class="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">Week</th>
                            <th class="px-4 py-2 text-xs font-semibold text-gray-500 uppercase text-center">Posts</th>
                            <th class="px-4 py-2 text-xs font-semibold text-gray-500 uppercase text-center">Impressions</th>
                            <th class="px-4 py-2 text-xs font-semibold text-gray-500 uppercase text-center">Engagements</th>
                            <th class="px-4 py-2 text-xs font-semibold text-gray-500 uppercase text-center">Reach</th>
                        </tr></thead>
                        <tbody>\${tableRows}</tbody>
                    </table>\`;
            }



            // Update Engage Analytics (velocity + conversion)
            function updateEngageAnalytics() {
                if (!currentData) return;

                // --- Monthly Lead Velocity Bar Chart ---
                const monthly = currentData.monthlyLeads || [];
                const maxCount = Math.max(...monthly.map(m => m.count), 1);
                let velocityHtml = '';
                monthly.forEach(function(m) {
                    const pct = (m.count / maxCount) * 100;
                    const barColor = m.count >= 10 ? 'bg-green-500' : (m.count >= 5 ? 'bg-yellow-500' : 'bg-red-400');
                    velocityHtml += '<div class="flex items-center gap-3">';
                    velocityHtml += '<span class="text-xs text-gray-500 w-16 text-right flex-shrink-0">' + m.month + '</span>';
                    velocityHtml += '<div class="flex-1 bg-gray-100 rounded-full h-5 relative">';
                    velocityHtml += '<div class="' + barColor + ' h-5 rounded-full transition-all flex items-center justify-end pr-2" style="width:' + Math.max(pct, 8) + '%">';
                    velocityHtml += '<span class="text-xs text-white font-semibold">' + m.count + '</span>';
                    velocityHtml += '</div></div></div>';
                });
                if (velocityHtml) {
                    velocityHtml += '<div class="flex items-center gap-2 mt-3 text-xs text-gray-400">';
                    velocityHtml += '<span class="inline-block w-3 h-3 rounded bg-green-500"></span> ≥10';
                    velocityHtml += '<span class="inline-block w-3 h-3 rounded bg-yellow-500 ml-2"></span> 5-9';
                    velocityHtml += '<span class="inline-block w-3 h-3 rounded bg-red-400 ml-2"></span> <5';
                    velocityHtml += '<span class="ml-auto">Target: 10/mo</span></div>';
                    document.getElementById('lead-velocity-chart').innerHTML = velocityHtml;
                }

                // --- Stage Conversion Funnel ---
                const stages = currentData.stageDistribution || {};
                const stageNames = Object.keys(stages);
                const stageCounts = Object.values(stages);
                const firstStageCount = stageCounts.length > 0 ? Math.max(stageCounts[0], 1) : 1;
                let conversionHtml = '';
                for (let i = 0; i < stageNames.length; i++) {
                    const count = stageCounts[i];
                    const pct = (count / firstStageCount) * 100;
                    const convRate = i > 0 && stageCounts[i-1] > 0 ? ((count / stageCounts[i-1]) * 100).toFixed(0) : '100';
                    const barColor = pct > 60 ? 'bg-blue-500' : (pct > 30 ? 'bg-blue-400' : 'bg-blue-300');
                    conversionHtml += '<div class="flex items-center gap-3">';
                    conversionHtml += '<span class="text-xs text-gray-600 w-28 text-right flex-shrink-0 truncate" title="' + stageNames[i] + '">' + stageNames[i] + '</span>';
                    conversionHtml += '<div class="flex-1 bg-gray-100 rounded-full h-5 relative">';
                    conversionHtml += '<div class="' + barColor + ' h-5 rounded-full transition-all flex items-center justify-end pr-2" style="width:' + Math.max(pct, 8) + '%">';
                    conversionHtml += '<span class="text-xs text-white font-semibold">' + count + '</span>';
                    conversionHtml += '</div></div>';
                    if (i > 0) {
                        conversionHtml += '<span class="text-xs text-gray-400 w-12 flex-shrink-0">' + convRate + '%</span>';
                    } else {
                        conversionHtml += '<span class="text-xs text-gray-400 w-12 flex-shrink-0">entry</span>';
                    }
                    conversionHtml += '</div>';
                }
                if (conversionHtml) {
                    document.getElementById('stage-conversion-chart').innerHTML = conversionHtml;
                }

                // --- Time in Stage (estimated from box data) ---
                // We use stageDistribution counts and campaign duration to estimate average time
                const totalBoxes = currentData.totalBoxes || 0;
                const durationDays = (currentData.campaignDurationMonths || 1) * 30;
                let timeHtml = '';
                const stageColors = ['bg-indigo-500', 'bg-blue-500', 'bg-cyan-500', 'bg-teal-500', 'bg-green-500', 'bg-yellow-500', 'bg-orange-500', 'bg-red-500'];
                for (let i = 0; i < stageNames.length; i++) {
                    const count = stageCounts[i];
                    // Rough estimate: time in stage proportional to count relative to total throughput
                    const estimatedDays = totalBoxes > 0 ? Math.round((count / totalBoxes) * durationDays) : 0;
                    const maxDays = durationDays;
                    const pct = maxDays > 0 ? (estimatedDays / maxDays) * 100 : 0;
                    const color = stageColors[i % stageColors.length];
                    timeHtml += '<div class="flex items-center gap-3">';
                    timeHtml += '<span class="text-xs text-gray-600 w-28 text-right flex-shrink-0 truncate" title="' + stageNames[i] + '">' + stageNames[i] + '</span>';
                    timeHtml += '<div class="flex-1 bg-gray-100 rounded-full h-5 relative">';
                    timeHtml += '<div class="' + color + ' h-5 rounded-full transition-all flex items-center justify-end pr-2" style="width:' + Math.max(pct, 8) + '%">';
                    timeHtml += '<span class="text-xs text-white font-semibold">~' + estimatedDays + 'd</span>';
                    timeHtml += '</div></div></div>';
                }
                if (timeHtml) {
                    document.getElementById('time-in-stage-chart').innerHTML = timeHtml;
                }
            }

            // Update Executive Dashboard
            function updateExecutiveDashboard() {
                const company = COMPANIES[currentCompany];
                document.getElementById('exec-company-name').textContent = company.name;

                if (!currentData) return;

                // --- Acceptance Rate (from Network) ---
                const network = currentData.networkData;
                const acceptRate = network ? network.avgAcceptanceRate : 0;
                const acceptTarget = 20;
                const acceptPct = Math.min((acceptRate / acceptTarget) * 100, 150);
                document.getElementById('exec-acceptance-rate').textContent = acceptRate.toFixed(1) + '%';
                document.getElementById('exec-acceptance-bar').style.width = Math.min(acceptPct, 100) + '%';
                const acceptBadge = document.getElementById('exec-acceptance-badge');
                if (acceptRate >= acceptTarget) {
                    acceptBadge.textContent = Math.round(acceptPct) + '% achieved';
                    acceptBadge.className = 'text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-700';
                    document.getElementById('exec-acceptance-bar').className = 'h-2 rounded-full bg-green-500 transition-all';
                } else {
                    acceptBadge.textContent = Math.round(acceptPct) + '% achieved';
                    acceptBadge.className = 'text-xs font-semibold px-2 py-1 rounded-full bg-yellow-100 text-yellow-700';
                    document.getElementById('exec-acceptance-bar').className = 'h-2 rounded-full bg-blue-500 transition-all';
                }

                // --- Leads per Month (from Streak) ---
                const avgLeads = currentData.averageLeadsPerMonth || 0;
                const leadsTarget = 10;
                const leadsPct = Math.min((avgLeads / leadsTarget) * 100, 150);
                document.getElementById('exec-leads-month').textContent = avgLeads.toFixed(1);
                document.getElementById('exec-leads-bar').style.width = Math.min(leadsPct, 100) + '%';
                const leadsBadge = document.getElementById('exec-leads-badge');
                if (avgLeads >= leadsTarget) {
                    leadsBadge.textContent = Math.round(leadsPct) + '% achieved';
                    leadsBadge.className = 'text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-700';
                    document.getElementById('exec-leads-bar').className = 'h-2 rounded-full bg-green-500 transition-all';
                } else {
                    leadsBadge.textContent = Math.round(leadsPct) + '% achieved';
                    leadsBadge.className = 'text-xs font-semibold px-2 py-1 rounded-full bg-yellow-100 text-yellow-700';
                }

                // --- Followers per Month (from Network accepted connections) ---
                const totalAccepted = network ? (network.totalAccepted || 0) : 0;
                const durationMonths = currentData.campaignDurationMonths || 1;
                const followersPerMonth = durationMonths > 0 ? totalAccepted / durationMonths : 0;
                const followersTarget = 100;
                const followersPct = Math.min((followersPerMonth / followersTarget) * 100, 150);
                document.getElementById('exec-followers-month').textContent = Math.round(followersPerMonth);
                document.getElementById('exec-followers-bar').style.width = Math.min(followersPct, 100) + '%';
                const followersBadge = document.getElementById('exec-followers-badge');
                if (followersPerMonth >= followersTarget) {
                    followersBadge.textContent = Math.round(followersPct) + '% achieved';
                    followersBadge.className = 'text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-700';
                    document.getElementById('exec-followers-bar').className = 'h-2 rounded-full bg-green-500 transition-all';
                } else {
                    followersBadge.textContent = Math.round(followersPct) + '% achieved';
                    followersBadge.className = 'text-xs font-semibold px-2 py-1 rounded-full bg-yellow-100 text-yellow-700';
                }

                // --- Network Summary ---
                document.getElementById('exec-net-invitations').textContent = network ? network.totalInvitations.toLocaleString() : 'N/A';
                document.getElementById('exec-net-accepted').textContent = network ? (network.totalAccepted || 0).toLocaleString() : 'N/A';
                document.getElementById('exec-net-rate').textContent = network ? network.avgAcceptanceRate.toFixed(1) + '%' : 'N/A';

                // --- Engage Summary ---
                document.getElementById('exec-eng-leads').textContent = currentData.totalBoxes || 0;
                document.getElementById('exec-eng-duration').textContent = (currentData.campaignDurationMonths || 0) + ' months';
                document.getElementById('exec-eng-avg').textContent = (currentData.averageLeadsPerMonth || 0).toFixed(1);
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
            function saveNotionConfig() {
                const notionUrl = document.getElementById('notion-url').value.trim();
                
                if (!notionUrl) {
                    alert('Please enter a Notion.so URL');
                    return;
                }
                
                if (!notionUrl.includes('notion.so')) {
                    alert('Please enter a valid Notion.so URL');
                    return;
                }
                
                // Save to company
                const company = COMPANIES[currentCompany];
                company.notionUrl = notionUrl;
                
                // Show success message
                const statusDiv = document.getElementById('notion-status');
                statusDiv.innerHTML = \`
                    <div class="bg-green-50 border-l-4 border-green-500 p-4">
                        <p class="text-sm text-green-800">
                            <i class="fas fa-check-circle mr-2"></i>
                            <strong>Configuration Saved!</strong> Notion URL has been configured. Fetching data...
                        </p>
                    </div>
                \`;
                
                // In a real implementation, you would fetch data from Notion API here
                setTimeout(() => {
                    displayPlaceholderOnboardingData();
                }, 1000);
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
                                \${network.thisWeekLabel || 'This Week'}
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
                                \${network.lastWeekLabel || 'Last Week'}
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
            
            // Show/hide the Promote, Network, Engage tabs based on the services this client subscribed to.
            function applyServiceTabs(services) {
                var svc = services || {};
                var map = { promote: svc.promote !== false, network: svc.network !== false, engage: svc.engage !== false };
                Object.keys(map).forEach(function(k) {
                    var tab = document.getElementById('tab-' + k);
                    if (tab) tab.style.display = map[k] ? '' : 'none';
                });
                // If the active tab was just hidden, fall back to the Executive view.
                var active = document.querySelector('.sidebar-nav.active');
                if (active && active.id && /^tab-(promote|network|engage)$/.test(active.id)) {
                    var key = active.id.replace('tab-', '');
                    if (!map[key]) switchView('executive');
                }
            }

            // Update dashboard with new data
            function updateDashboard(data) {
                currentData = data;
                applyServiceTabs(data.services);

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

            // Update the green check badges for saved URLs
            function updateSourceStatusBadges(sources, company) {
                const badges = {
                    'status-promote': sources.promote,
                    'status-network': sources.network,
                    'status-engage': sources.engage || company.url
                };
                for (const [id, value] of Object.entries(badges)) {
                    const el = document.getElementById(id);
                    if (el) {
                        if (value) { el.classList.remove('hidden'); }
                        else { el.classList.add('hidden'); }
                    }
                }
            }

            // --- Scheduled Messages Management ---
            let messageCounter = 0;

            function addMessageRow(msg) {
                const list = document.getElementById('messages-list');
                const noMsg = document.getElementById('no-messages');
                if (noMsg) noMsg.classList.add('hidden');

                messageCounter++;
                const id = msg ? msg.id : \`msg_\${Date.now()}_\${messageCounter}\`;
                const text = msg ? msg.text : '';
                const day = msg ? msg.dayOfWeek : 'friday';
                const time = msg ? msg.time : '17:00';
                const enabled = msg ? msg.enabled !== false : true;

                const days = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'];
                const dayOptions = days.map(d => \`<option value="\${d}" \${d === day ? 'selected' : ''}>\${d.charAt(0).toUpperCase() + d.slice(1)}</option>\`).join('');

                const row = document.createElement('div');
                row.className = 'bg-white border border-orange-200 rounded-lg p-4 space-y-3';
                row.dataset.messageId = id;
                row.innerHTML = \`
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-3">
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" class="sr-only peer msg-enabled" \${enabled ? 'checked' : ''}>
                                <div class="w-9 h-5 bg-gray-200 peer-focus:ring-2 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-500"></div>
                            </label>
                            <span class="text-sm font-medium text-gray-700">\${enabled ? 'Active' : 'Paused'}</span>
                        </div>
                        <button type="button" onclick="removeMessageRow(this)" class="text-red-400 hover:text-red-600 transition-colors">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                    <textarea class="msg-text w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500" rows="3" placeholder="As a reminder, you still have [leads:Lead] leads at the stage of LEAD...">\${text}</textarea>
                    <div class="flex items-center space-x-3">
                        <div class="flex-1">
                            <label class="text-xs font-medium text-gray-600">Day</label>
                            <select class="msg-day w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500">
                                \${dayOptions}
                            </select>
                        </div>
                        <div class="flex-1">
                            <label class="text-xs font-medium text-gray-600">Time (EST)</label>
                            <input type="time" class="msg-time w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500" value="\${time}">
                        </div>
                    </div>
                \`;

                // Toggle label update
                const toggle = row.querySelector('.msg-enabled');
                toggle.addEventListener('change', function() {
                    this.closest('.flex').querySelector('span').textContent = this.checked ? 'Active' : 'Paused';
                });

                list.appendChild(row);
            }

            function removeMessageRow(btn) {
                const row = btn.closest('[data-message-id]');
                row.remove();
                const list = document.getElementById('messages-list');
                if (list.children.length === 0) {
                    document.getElementById('no-messages').classList.remove('hidden');
                }
            }

            function collectMessages() {
                const rows = document.querySelectorAll('#messages-list [data-message-id]');
                const messages = [];
                rows.forEach(row => {
                    messages.push({
                        id: row.dataset.messageId,
                        text: row.querySelector('.msg-text').value.trim(),
                        dayOfWeek: row.querySelector('.msg-day').value,
                        time: row.querySelector('.msg-time').value,
                        enabled: row.querySelector('.msg-enabled').checked
                    });
                });
                return messages;
            }

            function renderMessages(messages) {
                const list = document.getElementById('messages-list');
                const noMsg = document.getElementById('no-messages');
                list.innerHTML = '';
                if (!messages || messages.length === 0) {
                    noMsg.classList.remove('hidden');
                    return;
                }
                noMsg.classList.add('hidden');
                messages.forEach(msg => addMessageRow(msg));
            }

            function updateOpenChatButton() {
                const company = COMPANIES[currentCompany];
                const btn = document.getElementById('open-chat-btn');
                if (!btn) return;
                if (company && company.googleChatUrl) {
                    btn.href = company.googleChatUrl;
                    btn.classList.remove('hidden');
                } else {
                    btn.classList.add('hidden');
                }
            }

            // Streak API Key management in Settings (no Google Sign-In required)
            function checkStreakKeyStatus() {
                fetch('/api/admin/streak-health')
                .then(function(r) { return r.json(); })
                .then(function(data) {
                    var badge = document.getElementById('streak-key-badge');
                    if (badge) {
                        if (data.ok) {
                            badge.className = 'text-sm font-medium px-3 py-1 rounded-full bg-green-100 text-green-700';
                            badge.innerHTML = '<i class="fas fa-check-circle mr-1"></i>Connected (' + data.latency + 'ms)';
                        } else {
                            badge.className = 'text-sm font-medium px-3 py-1 rounded-full bg-red-100 text-red-700';
                            badge.innerHTML = '<i class="fas fa-times-circle mr-1"></i>Disconnected';
                        }
                    }
                });
                fetch('/api/admin/streak-key/status')
                .then(function(r) { return r.json(); })
                .then(function(data) {
                    var el = document.getElementById('streak-key-masked');
                    if (el) {
                        if (data.configured) {
                            el.textContent = data.maskedKey;
                        } else {
                            el.innerHTML = '<span class="text-red-500">Not configured</span>';
                        }
                    }
                });
            }

            function saveStreakKeyFromSettings() {
                var keyInput = document.getElementById('streak-key-input-settings');
                var key = keyInput.value.trim();
                if (!key) { alert('Please enter a Streak API key.'); return; }
                var msgEl = document.getElementById('streak-key-msg');
                msgEl.innerHTML = '<span class="text-yellow-600"><i class="fas fa-spinner fa-spin mr-1"></i>Saving...</span>';
                fetch('/api/admin/streak-key', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ key: key })
                })
                .then(function(r) { return r.json(); })
                .then(function(data) {
                    if (data.success) {
                        msgEl.innerHTML = '<span class="text-green-600"><i class="fas fa-check-circle mr-1"></i>Key saved successfully! Reload the page to use the new key.</span>';
                        keyInput.value = '';
                        checkStreakKeyStatus();
                    } else {
                        msgEl.innerHTML = '<span class="text-red-600"><i class="fas fa-exclamation-circle mr-1"></i>' + (data.error || 'Failed to save') + '</span>';
                    }
                })
                .catch(function() {
                    msgEl.innerHTML = '<span class="text-red-600">Network error. Try again.</span>';
                });
            }

            setTimeout(checkStreakKeyStatus, 500);

            function updateSettingsView() {
                const company = COMPANIES[currentCompany];
                const sources = company.sources || { promote: '', network: '', engage: '' };

                // Update company name in settings header
                document.getElementById('settings-company-name').textContent = company.name;

                // Populate input fields with current values
                document.getElementById('edit-promote-url').value = sources.promote || '';
                document.getElementById('edit-network-url').value = sources.network || '';
                document.getElementById('edit-network-gid').value = company.networkSheetGid || '';
                document.getElementById('edit-straightin-report-id').value = company.straightInReportId || '';
                document.getElementById('edit-engage-url').value = sources.engage || company.url || '';

                // Populate services-agreed checkboxes (from live data; default all on)
                var svcCfg = (currentData && currentData.services) || company.services || {};
                document.getElementById('edit-svc-promote').checked = svcCfg.promote !== false;
                document.getElementById('edit-svc-network').checked = svcCfg.network !== false;
                document.getElementById('edit-svc-engage').checked = svcCfg.engage !== false;

                // Populate Google Chat fields
                document.getElementById('edit-googlechat-url').value = company.googleChatUrl || '';
                document.getElementById('edit-googlechat-webhook').value = company.googleChatWebhookUrl || '';

                // Show Google Chat status badge
                const gcBadge = document.getElementById('status-googlechat');
                if (company.googleChatUrl || company.googleChatWebhookUrl) {
                    gcBadge.classList.remove('hidden');
                } else {
                    gcBadge.classList.add('hidden');
                }

                // Render scheduled messages
                renderMessages(company.messages || []);

                // Show green badges for already-saved URLs
                updateSourceStatusBadges(sources, company);

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
                const googleChatUrl = document.getElementById('edit-googlechat-url').value.trim();
                const googleChatWebhookUrl = document.getElementById('edit-googlechat-webhook').value.trim();
                const straightInReportId = document.getElementById('edit-straightin-report-id').value.trim();
                const services = {
                    promote: document.getElementById('edit-svc-promote').checked,
                    network: document.getElementById('edit-svc-network').checked,
                    engage: document.getElementById('edit-svc-engage').checked
                };

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
                if (googleChatUrl && !isValidURL(googleChatUrl)) {
                    showEditMessage('error', 'Google Chat Space URL is not valid.');
                    return;
                }
                if (googleChatWebhookUrl && !isValidURL(googleChatWebhookUrl)) {
                    showEditMessage('error', 'Google Chat Webhook URL is not valid.');
                    return;
                }

                // Collect scheduled messages
                const messages = collectMessages();

                try {
                    const res = await fetch(\`/api/companies/\${currentCompany}\`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ promoteUrl, networkUrl, networkGid, engageUrl, googleChatUrl, googleChatWebhookUrl, straightInReportId, messages, services })
                    });
                    const data = await res.json();
                    if (!res.ok) throw new Error(data.error || 'Save failed');

                    // Update local object so dashboard reflects immediately
                    if (!company.sources) company.sources = {};
                    company.sources.promote = promoteUrl;
                    company.sources.network = networkUrl;
                    company.sources.engage = engageUrl || company.url;
                    company.straightInReportId = straightInReportId;
                    company.services = services;
                    if (currentData) currentData.services = services;
                    applyServiceTabs(services);
                    if (networkGid) { company.networkSheetGid = networkGid; } else { delete company.networkSheetGid; }
                    if (engageUrl) company.url = engageUrl;
                    company.googleChatUrl = googleChatUrl || '';
                    company.googleChatWebhookUrl = googleChatWebhookUrl || '';
                    company.messages = messages;

                    // Refresh status badges
                    updateSourceStatusBadges(company.sources, company);
                    showEditMessage('success', \`Source URLs for \${company.name} saved and persisted successfully!\`);
                    loadDashboard();
                } catch (err) {
                    showEditMessage('error', \`Failed to save: \${err.message}\`);
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
            async function addNewCompany() {
                // Get form values
                const name = document.getElementById('new-company-name').value.trim();
                const key = document.getElementById('new-company-key').value.trim();
                const pipelineKey = document.getElementById('new-pipeline-key').value.trim();
                const engageUrl = document.getElementById('new-engage-url').value.trim();
                const networkUrl = document.getElementById('new-network-url').value.trim();
                const networkGid = document.getElementById('new-network-gid').value.trim();
                const straightInReportId = document.getElementById('new-straightin-report-id').value.trim();
                const promoteUrl = document.getElementById('new-promote-url').value.trim();
                const googleChatUrl = document.getElementById('new-googlechat-url').value.trim();
                const googleChatWebhookUrl = document.getElementById('new-googlechat-webhook').value.trim();
                const services = {
                    promote: document.getElementById('new-svc-promote').checked,
                    network: document.getElementById('new-svc-network').checked,
                    engage: document.getElementById('new-svc-engage').checked
                };

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

                // Add optional fields
                if (networkGid) newCompany.networkSheetGid = networkGid;
                if (straightInReportId) newCompany.straightInReportId = straightInReportId;
                if (googleChatUrl) newCompany.googleChatUrl = googleChatUrl;
                if (googleChatWebhookUrl) newCompany.googleChatWebhookUrl = googleChatWebhookUrl;

                try {
                    const res = await fetch('/api/companies', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ name, pipelineKey, networkUrl, promoteUrl, engageUrl, networkGid, key, googleChatUrl, googleChatWebhookUrl, straightInReportId, services })
                    });
                    const data = await res.json();
                    if (!res.ok) throw new Error(data.error || 'Failed to add company');

                    // Add company to local COMPANIES object
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

                    updateSheetsFormulas();
                    updateSettingsView();
                    updateOpenChatButton();
                    loadDashboard();

                    showMessage('success', \`Company "\${name}" added and saved permanently!\`);
                    resetAddCompanyForm();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } catch (err) {
                    showMessage('error', \`Failed to add company: \${err.message}\`);
                }
            }

            // Reset Add Company Form
            function resetAddCompanyForm() {
                document.getElementById('new-company-name').value = '';
                document.getElementById('new-company-key').value = '';
                document.getElementById('new-pipeline-key').value = '';
                document.getElementById('new-engage-url').value = '';
                document.getElementById('new-network-url').value = '';
                document.getElementById('new-network-gid').value = '';
                document.getElementById('new-straightin-report-id').value = '';
                document.getElementById('new-promote-url').value = '';
                document.getElementById('new-googlechat-url').value = '';
                document.getElementById('new-googlechat-webhook').value = '';

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

            // Load KV companies on startup and merge into COMPANIES + dropdown
            async function loadKVCompanies() {
                try {
                    const res = await fetch('/api/companies');
                    const data = await res.json();
                    if (!data.companies) return;
                    var selector = document.getElementById('company-selector');
                    // Clear any existing options
                    if (selector) selector.innerHTML = '';
                    data.companies.forEach(function(company) {
                        // Merge into COMPANIES object
                        if (!COMPANIES[company.key]) {
                            COMPANIES[company.key] = company;
                        } else {
                            // Override hardcoded entry with KV version (has saved URLs)
                            COMPANIES[company.key] = { ...COMPANIES[company.key], ...company };
                        }
                        // Always add to dropdown (all companies, not just KV-only)
                        if (selector) {
                            var option = document.createElement('option');
                            option.value = company.key;
                            option.textContent = company.name;
                            selector.appendChild(option);
                        }
                    });
                    // Sync currentCompany and dropdown to URL param
                    var urlParams = new URLSearchParams(window.location.search);
                    var urlCompany = urlParams.get('company');
                    if (urlCompany && COMPANIES[urlCompany]) {
                        currentCompany = urlCompany;
                        if (selector) selector.value = urlCompany;
                    } else if (selector && selector.options.length > 0) {
                        currentCompany = selector.options[0].value;
                    }
                } catch (e) {
                    console.warn('Could not load KV companies:', e);
                }
            }

            // Load dashboard on page load and setup auto-refresh
            loadKVCompanies().then(function() {
                updateSheetsFormulas();
                updateSettingsView();
                updateOnboardingView();
                updateOpenChatButton();
                loadDashboard();
            });
            setupAutoRefresh();
        <\/script>
    </body>
    </html>
  `):e.redirect("/dashboard"):e.html(rr())});const da=new Na,Ir=Object.assign({"/src/index.tsx":$});let rs=!1;for(const[,e]of Object.entries(Ir))e&&(da.route("/",e),da.notFound(e.notFoundHandler),rs=!0);if(!rs)throw new Error("Can't import modules from ['/src/index.tsx','/app/server.ts']");export{da as default};
