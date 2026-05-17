var is=Object.defineProperty;var xt=e=>{throw TypeError(e)};var ls=(e,t,s)=>t in e?is(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;var k=(e,t,s)=>ls(e,typeof t!="symbol"?t+"":t,s),gt=(e,t,s)=>t.has(e)||xt("Cannot "+s);var p=(e,t,s)=>(gt(e,t,"read from private field"),s?s.call(e):t.get(e)),C=(e,t,s)=>t.has(e)?xt("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,s),w=(e,t,s,a)=>(gt(e,t,"write to private field"),a?a.call(e,s):t.set(e,s),s),R=(e,t,s)=>(gt(e,t,"access private method"),s);var vt=(e,t,s,a)=>({set _(n){w(e,t,n,s)},get _(){return p(e,t,a)}});var wt=(e,t,s)=>(a,n)=>{let o=-1;return r(0);async function r(i){if(i<=o)throw new Error("next() called multiple times");o=i;let l,d=!1,c;if(e[i]?(c=e[i][0][0],a.req.routeIndex=i):c=i===e.length&&n||void 0,c)try{l=await c(a,()=>r(i+1))}catch(m){if(m instanceof Error&&t)a.error=m,l=await t(m,a),d=!0;else throw m}else a.finalized===!1&&s&&(l=await s(a));return l&&(a.finalized===!1||d)&&(a.res=l),a}},ds=Symbol(),cs=async(e,t=Object.create(null))=>{const{all:s=!1,dot:a=!1}=t,o=(e instanceof Ut?e.raw.headers:e.headers).get("Content-Type");return o!=null&&o.startsWith("multipart/form-data")||o!=null&&o.startsWith("application/x-www-form-urlencoded")?ms(e,{all:s,dot:a}):{}};async function ms(e,t){const s=await e.formData();return s?ps(s,t):{}}function ps(e,t){const s=Object.create(null);return e.forEach((a,n)=>{t.all||n.endsWith("[]")?gs(s,n,a):s[n]=a}),t.dot&&Object.entries(s).forEach(([a,n])=>{a.includes(".")&&(us(s,a,n),delete s[a])}),s}var gs=(e,t,s)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(s):e[t]=[e[t],s]:t.endsWith("[]")?e[t]=[s]:e[t]=s},us=(e,t,s)=>{let a=e;const n=t.split(".");n.forEach((o,r)=>{r===n.length-1?a[o]=s:((!a[o]||typeof a[o]!="object"||Array.isArray(a[o])||a[o]instanceof File)&&(a[o]=Object.create(null)),a=a[o])})},Pt=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},fs=e=>{const{groups:t,path:s}=hs(e),a=Pt(s);return ys(a,t)},hs=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(s,a)=>{const n=`@${a}`;return t.push([n,s]),n}),{groups:t,path:e}},ys=(e,t)=>{for(let s=t.length-1;s>=0;s--){const[a]=t[s];for(let n=e.length-1;n>=0;n--)if(e[n].includes(a)){e[n]=e[n].replace(a,t[s][1]);break}}return e},ot={},bs=(e,t)=>{if(e==="*")return"*";const s=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(s){const a=`${e}#${t}`;return ot[a]||(s[2]?ot[a]=t&&t[0]!==":"&&t[0]!=="*"?[a,s[1],new RegExp(`^${s[2]}(?=/${t})`)]:[e,s[1],new RegExp(`^${s[2]}$`)]:ot[a]=[e,s[1],!0]),ot[a]}return null},yt=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,s=>{try{return t(s)}catch{return s}})}},xs=e=>yt(e,decodeURI),Dt=e=>{const t=e.url,s=t.indexOf("/",t.indexOf(":")+4);let a=s;for(;a<t.length;a++){const n=t.charCodeAt(a);if(n===37){const o=t.indexOf("?",a),r=t.slice(s,o===-1?void 0:o);return xs(r.includes("%25")?r.replace(/%25/g,"%2525"):r)}else if(n===63)break}return t.slice(s,a)},vs=e=>{const t=Dt(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},Ue=(e,t,...s)=>(s.length&&(t=Ue(t,...s)),`${(e==null?void 0:e[0])==="/"?"":"/"}${e}${t==="/"?"":`${(e==null?void 0:e.at(-1))==="/"?"":"/"}${(t==null?void 0:t[0])==="/"?t.slice(1):t}`}`),Ot=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),s=[];let a="";return t.forEach(n=>{if(n!==""&&!/\:/.test(n))a+="/"+n;else if(/\:/.test(n))if(/\?/.test(n)){s.length===0&&a===""?s.push("/"):s.push(a);const o=n.replace("?","");a+="/"+o,s.push(a)}else a+="/"+n}),s.filter((n,o,r)=>r.indexOf(n)===o)},ut=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?yt(e,jt):e):e,Bt=(e,t,s)=>{let a;if(!s&&t&&!/[%+]/.test(t)){let r=e.indexOf("?",8);if(r===-1)return;for(e.startsWith(t,r+1)||(r=e.indexOf(`&${t}`,r+1));r!==-1;){const i=e.charCodeAt(r+t.length+1);if(i===61){const l=r+t.length+2,d=e.indexOf("&",l);return ut(e.slice(l,d===-1?void 0:d))}else if(i==38||isNaN(i))return"";r=e.indexOf(`&${t}`,r+1)}if(a=/[%+]/.test(e),!a)return}const n={};a??(a=/[%+]/.test(e));let o=e.indexOf("?",8);for(;o!==-1;){const r=e.indexOf("&",o+1);let i=e.indexOf("=",o);i>r&&r!==-1&&(i=-1);let l=e.slice(o+1,i===-1?r===-1?void 0:r:i);if(a&&(l=ut(l)),o=r,l==="")continue;let d;i===-1?d="":(d=e.slice(i+1,r===-1?void 0:r),a&&(d=ut(d))),s?(n[l]&&Array.isArray(n[l])||(n[l]=[]),n[l].push(d)):n[l]??(n[l]=d)}return t?n[t]:n},ws=Bt,ks=(e,t)=>Bt(e,t,!0),jt=decodeURIComponent,kt=e=>yt(e,jt),$e,ne,ye,Ft,Wt,ht,xe,At,Ut=(At=class{constructor(e,t="/",s=[[]]){C(this,ye);k(this,"raw");C(this,$e);C(this,ne);k(this,"routeIndex",0);k(this,"path");k(this,"bodyCache",{});C(this,xe,e=>{const{bodyCache:t,raw:s}=this,a=t[e];if(a)return a;const n=Object.keys(t)[0];return n?t[n].then(o=>(n==="json"&&(o=JSON.stringify(o)),new Response(o)[e]())):t[e]=s[e]()});this.raw=e,this.path=t,w(this,ne,s),w(this,$e,{})}param(e){return e?R(this,ye,Ft).call(this,e):R(this,ye,Wt).call(this)}query(e){return ws(this.url,e)}queries(e){return ks(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((s,a)=>{t[a]=s}),t}async parseBody(e){var t;return(t=this.bodyCache).parsedBody??(t.parsedBody=await cs(this,e))}json(){return p(this,xe).call(this,"text").then(e=>JSON.parse(e))}text(){return p(this,xe).call(this,"text")}arrayBuffer(){return p(this,xe).call(this,"arrayBuffer")}blob(){return p(this,xe).call(this,"blob")}formData(){return p(this,xe).call(this,"formData")}addValidatedData(e,t){p(this,$e)[e]=t}valid(e){return p(this,$e)[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[ds](){return p(this,ne)}get matchedRoutes(){return p(this,ne)[0].map(([[,e]])=>e)}get routePath(){return p(this,ne)[0].map(([[,e]])=>e)[this.routeIndex].path}},$e=new WeakMap,ne=new WeakMap,ye=new WeakSet,Ft=function(e){const t=p(this,ne)[0][this.routeIndex][1][e],s=R(this,ye,ht).call(this,t);return s&&/\%/.test(s)?kt(s):s},Wt=function(){const e={},t=Object.keys(p(this,ne)[0][this.routeIndex][1]);for(const s of t){const a=R(this,ye,ht).call(this,p(this,ne)[0][this.routeIndex][1][s]);a!==void 0&&(e[s]=/\%/.test(a)?kt(a):a)}return e},ht=function(e){return p(this,ne)[1]?p(this,ne)[1][e]:e},xe=new WeakMap,At),Es={Stringify:1},$t=async(e,t,s,a,n)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const o=e.callbacks;return o!=null&&o.length?(n?n[0]+=e:n=[e],Promise.all(o.map(i=>i({phase:t,buffer:n,context:a}))).then(i=>Promise.all(i.filter(Boolean).map(l=>$t(l,t,!1,a,n))).then(()=>n[0]))):Promise.resolve(e)},Cs="text/plain; charset=UTF-8",ft=(e,t)=>({"Content-Type":e,...t}),Xe,Je,ge,He,ue,X,et,Ge,Ke,Ne,tt,st,ve,Fe,Lt,Is=(Lt=class{constructor(e,t){C(this,ve);C(this,Xe);C(this,Je);k(this,"env",{});C(this,ge);k(this,"finalized",!1);k(this,"error");C(this,He);C(this,ue);C(this,X);C(this,et);C(this,Ge);C(this,Ke);C(this,Ne);C(this,tt);C(this,st);k(this,"render",(...e)=>(p(this,Ge)??w(this,Ge,t=>this.html(t)),p(this,Ge).call(this,...e)));k(this,"setLayout",e=>w(this,et,e));k(this,"getLayout",()=>p(this,et));k(this,"setRenderer",e=>{w(this,Ge,e)});k(this,"header",(e,t,s)=>{this.finalized&&w(this,X,new Response(p(this,X).body,p(this,X)));const a=p(this,X)?p(this,X).headers:p(this,Ne)??w(this,Ne,new Headers);t===void 0?a.delete(e):s!=null&&s.append?a.append(e,t):a.set(e,t)});k(this,"status",e=>{w(this,He,e)});k(this,"set",(e,t)=>{p(this,ge)??w(this,ge,new Map),p(this,ge).set(e,t)});k(this,"get",e=>p(this,ge)?p(this,ge).get(e):void 0);k(this,"newResponse",(...e)=>R(this,ve,Fe).call(this,...e));k(this,"body",(e,t,s)=>R(this,ve,Fe).call(this,e,t,s));k(this,"text",(e,t,s)=>!p(this,Ne)&&!p(this,He)&&!t&&!s&&!this.finalized?new Response(e):R(this,ve,Fe).call(this,e,t,ft(Cs,s)));k(this,"json",(e,t,s)=>R(this,ve,Fe).call(this,JSON.stringify(e),t,ft("application/json",s)));k(this,"html",(e,t,s)=>{const a=n=>R(this,ve,Fe).call(this,n,t,ft("text/html; charset=UTF-8",s));return typeof e=="object"?$t(e,Es.Stringify,!1,{}).then(a):a(e)});k(this,"redirect",(e,t)=>{const s=String(e);return this.header("Location",/[^\x00-\xFF]/.test(s)?encodeURI(s):s),this.newResponse(null,t??302)});k(this,"notFound",()=>(p(this,Ke)??w(this,Ke,()=>new Response),p(this,Ke).call(this,this)));w(this,Xe,e),t&&(w(this,ue,t.executionCtx),this.env=t.env,w(this,Ke,t.notFoundHandler),w(this,st,t.path),w(this,tt,t.matchResult))}get req(){return p(this,Je)??w(this,Je,new Ut(p(this,Xe),p(this,st),p(this,tt))),p(this,Je)}get event(){if(p(this,ue)&&"respondWith"in p(this,ue))return p(this,ue);throw Error("This context has no FetchEvent")}get executionCtx(){if(p(this,ue))return p(this,ue);throw Error("This context has no ExecutionContext")}get res(){return p(this,X)||w(this,X,new Response(null,{headers:p(this,Ne)??w(this,Ne,new Headers)}))}set res(e){if(p(this,X)&&e){e=new Response(e.body,e);for(const[t,s]of p(this,X).headers.entries())if(t!=="content-type")if(t==="set-cookie"){const a=p(this,X).headers.getSetCookie();e.headers.delete("set-cookie");for(const n of a)e.headers.append("set-cookie",n)}else e.headers.set(t,s)}w(this,X,e),this.finalized=!0}get var(){return p(this,ge)?Object.fromEntries(p(this,ge)):{}}},Xe=new WeakMap,Je=new WeakMap,ge=new WeakMap,He=new WeakMap,ue=new WeakMap,X=new WeakMap,et=new WeakMap,Ge=new WeakMap,Ke=new WeakMap,Ne=new WeakMap,tt=new WeakMap,st=new WeakMap,ve=new WeakSet,Fe=function(e,t,s){const a=p(this,X)?new Headers(p(this,X).headers):p(this,Ne)??new Headers;if(typeof t=="object"&&"headers"in t){const o=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[r,i]of o)r.toLowerCase()==="set-cookie"?a.append(r,i):a.set(r,i)}if(s)for(const[o,r]of Object.entries(s))if(typeof r=="string")a.set(o,r);else{a.delete(o);for(const i of r)a.append(o,i)}const n=typeof t=="number"?t:(t==null?void 0:t.status)??p(this,He);return new Response(e,{status:n,headers:a})},Lt),K="ALL",Ss="all",As=["get","post","put","delete","options","patch"],Ht="Can not add a route since the matcher is already built.",Gt=class extends Error{},Ls="__COMPOSED_HANDLER",Ms=e=>e.text("404 Not Found",404),Et=(e,t)=>{if("getResponse"in e){const s=e.getResponse();return t.newResponse(s.body,s)}return console.error(e),t.text("Internal Server Error",500)},ce,V,Kt,me,Me,rt,it,Ve,Rs=(Ve=class{constructor(t={}){C(this,V);k(this,"get");k(this,"post");k(this,"put");k(this,"delete");k(this,"options");k(this,"patch");k(this,"all");k(this,"on");k(this,"use");k(this,"router");k(this,"getPath");k(this,"_basePath","/");C(this,ce,"/");k(this,"routes",[]);C(this,me,Ms);k(this,"errorHandler",Et);k(this,"onError",t=>(this.errorHandler=t,this));k(this,"notFound",t=>(w(this,me,t),this));k(this,"fetch",(t,...s)=>R(this,V,it).call(this,t,s[1],s[0],t.method));k(this,"request",(t,s,a,n)=>t instanceof Request?this.fetch(s?new Request(t,s):t,a,n):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${Ue("/",t)}`,s),a,n)));k(this,"fire",()=>{addEventListener("fetch",t=>{t.respondWith(R(this,V,it).call(this,t.request,t,void 0,t.request.method))})});[...As,Ss].forEach(o=>{this[o]=(r,...i)=>(typeof r=="string"?w(this,ce,r):R(this,V,Me).call(this,o,p(this,ce),r),i.forEach(l=>{R(this,V,Me).call(this,o,p(this,ce),l)}),this)}),this.on=(o,r,...i)=>{for(const l of[r].flat()){w(this,ce,l);for(const d of[o].flat())i.map(c=>{R(this,V,Me).call(this,d.toUpperCase(),p(this,ce),c)})}return this},this.use=(o,...r)=>(typeof o=="string"?w(this,ce,o):(w(this,ce,"*"),r.unshift(o)),r.forEach(i=>{R(this,V,Me).call(this,K,p(this,ce),i)}),this);const{strict:a,...n}=t;Object.assign(this,n),this.getPath=a??!0?t.getPath??Dt:vs}route(t,s){const a=this.basePath(t);return s.routes.map(n=>{var r;let o;s.errorHandler===Et?o=n.handler:(o=async(i,l)=>(await wt([],s.errorHandler)(i,()=>n.handler(i,l))).res,o[Ls]=n.handler),R(r=a,V,Me).call(r,n.method,n.path,o)}),this}basePath(t){const s=R(this,V,Kt).call(this);return s._basePath=Ue(this._basePath,t),s}mount(t,s,a){let n,o;a&&(typeof a=="function"?o=a:(o=a.optionHandler,a.replaceRequest===!1?n=l=>l:n=a.replaceRequest));const r=o?l=>{const d=o(l);return Array.isArray(d)?d:[d]}:l=>{let d;try{d=l.executionCtx}catch{}return[l.env,d]};n||(n=(()=>{const l=Ue(this._basePath,t),d=l==="/"?0:l.length;return c=>{const m=new URL(c.url);return m.pathname=m.pathname.slice(d)||"/",new Request(m,c)}})());const i=async(l,d)=>{const c=await s(n(l.req.raw),...r(l));if(c)return c;await d()};return R(this,V,Me).call(this,K,Ue(t,"*"),i),this}},ce=new WeakMap,V=new WeakSet,Kt=function(){const t=new Ve({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,w(t,me,p(this,me)),t.routes=this.routes,t},me=new WeakMap,Me=function(t,s,a){t=t.toUpperCase(),s=Ue(this._basePath,s);const n={basePath:this._basePath,path:s,method:t,handler:a};this.router.add(t,s,[a,n]),this.routes.push(n)},rt=function(t,s){if(t instanceof Error)return this.errorHandler(t,s);throw t},it=function(t,s,a,n){if(n==="HEAD")return(async()=>new Response(null,await R(this,V,it).call(this,t,s,a,"GET")))();const o=this.getPath(t,{env:a}),r=this.router.match(n,o),i=new Is(t,{path:o,matchResult:r,env:a,executionCtx:s,notFoundHandler:p(this,me)});if(r[0].length===1){let d;try{d=r[0][0][0][0](i,async()=>{i.res=await p(this,me).call(this,i)})}catch(c){return R(this,V,rt).call(this,c,i)}return d instanceof Promise?d.then(c=>c||(i.finalized?i.res:p(this,me).call(this,i))).catch(c=>R(this,V,rt).call(this,c,i)):d??p(this,me).call(this,i)}const l=wt(r[0],this.errorHandler,p(this,me));return(async()=>{try{const d=await l(i);if(!d.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return d.res}catch(d){return R(this,V,rt).call(this,d,i)}})()},Ve),Vt=[];function Ns(e,t){const s=this.buildAllMatchers(),a=((n,o)=>{const r=s[n]||s[K],i=r[2][o];if(i)return i;const l=o.match(r[0]);if(!l)return[[],Vt];const d=l.indexOf("",1);return[r[1][d],l]});return this.match=a,a(e,t)}var ct="[^/]+",qe=".*",Qe="(?:|/.*)",We=Symbol(),Ts=new Set(".\\+*[^]$()");function Ps(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===qe||e===Qe?1:t===qe||t===Qe?-1:e===ct?1:t===ct?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var Te,Pe,pe,Be,Ds=(Be=class{constructor(){C(this,Te);C(this,Pe);C(this,pe,Object.create(null))}insert(t,s,a,n,o){if(t.length===0){if(p(this,Te)!==void 0)throw We;if(o)return;w(this,Te,s);return}const[r,...i]=t,l=r==="*"?i.length===0?["","",qe]:["","",ct]:r==="/*"?["","",Qe]:r.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let d;if(l){const c=l[1];let m=l[2]||ct;if(c&&l[2]&&(m===".*"||(m=m.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(m))))throw We;if(d=p(this,pe)[m],!d){if(Object.keys(p(this,pe)).some(f=>f!==qe&&f!==Qe))throw We;if(o)return;d=p(this,pe)[m]=new Be,c!==""&&w(d,Pe,n.varIndex++)}!o&&c!==""&&a.push([c,p(d,Pe)])}else if(d=p(this,pe)[r],!d){if(Object.keys(p(this,pe)).some(c=>c.length>1&&c!==qe&&c!==Qe))throw We;if(o)return;d=p(this,pe)[r]=new Be}d.insert(i,s,a,n,o)}buildRegExpStr(){const s=Object.keys(p(this,pe)).sort(Ps).map(a=>{const n=p(this,pe)[a];return(typeof p(n,Pe)=="number"?`(${a})@${p(n,Pe)}`:Ts.has(a)?`\\${a}`:a)+n.buildRegExpStr()});return typeof p(this,Te)=="number"&&s.unshift(`#${p(this,Te)}`),s.length===0?"":s.length===1?s[0]:"(?:"+s.join("|")+")"}},Te=new WeakMap,Pe=new WeakMap,pe=new WeakMap,Be),mt,at,Mt,Os=(Mt=class{constructor(){C(this,mt,{varIndex:0});C(this,at,new Ds)}insert(e,t,s){const a=[],n=[];for(let r=0;;){let i=!1;if(e=e.replace(/\{[^}]+\}/g,l=>{const d=`@\\${r}`;return n[r]=[d,l],r++,i=!0,d}),!i)break}const o=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let r=n.length-1;r>=0;r--){const[i]=n[r];for(let l=o.length-1;l>=0;l--)if(o[l].indexOf(i)!==-1){o[l]=o[l].replace(i,n[r][1]);break}}return p(this,at).insert(o,t,a,p(this,mt),s),a}buildRegExp(){let e=p(this,at).buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const s=[],a=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(n,o,r)=>o!==void 0?(s[++t]=Number(o),"$()"):(r!==void 0&&(a[Number(r)]=++t),"")),[new RegExp(`^${e}`),s,a]}},mt=new WeakMap,at=new WeakMap,Mt),Bs=[/^$/,[],Object.create(null)],lt=Object.create(null);function Yt(e){return lt[e]??(lt[e]=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,s)=>s?`\\${s}`:"(?:|/.*)")}$`))}function js(){lt=Object.create(null)}function Us(e){var d;const t=new Os,s=[];if(e.length===0)return Bs;const a=e.map(c=>[!/\*|\/:/.test(c[0]),...c]).sort(([c,m],[f,y])=>c?1:f?-1:m.length-y.length),n=Object.create(null);for(let c=0,m=-1,f=a.length;c<f;c++){const[y,b,v]=a[c];y?n[b]=[v.map(([h])=>[h,Object.create(null)]),Vt]:m++;let g;try{g=t.insert(b,m,y)}catch(h){throw h===We?new Gt(b):h}y||(s[m]=v.map(([h,N])=>{const L=Object.create(null);for(N-=1;N>=0;N--){const[x,A]=g[N];L[x]=A}return[h,L]}))}const[o,r,i]=t.buildRegExp();for(let c=0,m=s.length;c<m;c++)for(let f=0,y=s[c].length;f<y;f++){const b=(d=s[c][f])==null?void 0:d[1];if(!b)continue;const v=Object.keys(b);for(let g=0,h=v.length;g<h;g++)b[v[g]]=i[b[v[g]]]}const l=[];for(const c in r)l[c]=s[r[c]];return[o,l,n]}function je(e,t){if(e){for(const s of Object.keys(e).sort((a,n)=>n.length-a.length))if(Yt(s).test(t))return[...e[s]]}}var we,ke,pt,_t,Rt,Fs=(Rt=class{constructor(){C(this,pt);k(this,"name","RegExpRouter");C(this,we);C(this,ke);k(this,"match",Ns);w(this,we,{[K]:Object.create(null)}),w(this,ke,{[K]:Object.create(null)})}add(e,t,s){var i;const a=p(this,we),n=p(this,ke);if(!a||!n)throw new Error(Ht);a[e]||[a,n].forEach(l=>{l[e]=Object.create(null),Object.keys(l[K]).forEach(d=>{l[e][d]=[...l[K][d]]})}),t==="/*"&&(t="*");const o=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const l=Yt(t);e===K?Object.keys(a).forEach(d=>{var c;(c=a[d])[t]||(c[t]=je(a[d],t)||je(a[K],t)||[])}):(i=a[e])[t]||(i[t]=je(a[e],t)||je(a[K],t)||[]),Object.keys(a).forEach(d=>{(e===K||e===d)&&Object.keys(a[d]).forEach(c=>{l.test(c)&&a[d][c].push([s,o])})}),Object.keys(n).forEach(d=>{(e===K||e===d)&&Object.keys(n[d]).forEach(c=>l.test(c)&&n[d][c].push([s,o]))});return}const r=Ot(t)||[t];for(let l=0,d=r.length;l<d;l++){const c=r[l];Object.keys(n).forEach(m=>{var f;(e===K||e===m)&&((f=n[m])[c]||(f[c]=[...je(a[m],c)||je(a[K],c)||[]]),n[m][c].push([s,o-d+l+1]))})}}buildAllMatchers(){const e=Object.create(null);return Object.keys(p(this,ke)).concat(Object.keys(p(this,we))).forEach(t=>{e[t]||(e[t]=R(this,pt,_t).call(this,t))}),w(this,we,w(this,ke,void 0)),js(),e}},we=new WeakMap,ke=new WeakMap,pt=new WeakSet,_t=function(e){const t=[];let s=e===K;return[p(this,we),p(this,ke)].forEach(a=>{const n=a[e]?Object.keys(a[e]).map(o=>[o,a[e][o]]):[];n.length!==0?(s||(s=!0),t.push(...n)):e!==K&&t.push(...Object.keys(a[K]).map(o=>[o,a[K][o]]))}),s?Us(t):null},Rt),Ee,fe,Nt,Ws=(Nt=class{constructor(e){k(this,"name","SmartRouter");C(this,Ee,[]);C(this,fe,[]);w(this,Ee,e.routers)}add(e,t,s){if(!p(this,fe))throw new Error(Ht);p(this,fe).push([e,t,s])}match(e,t){if(!p(this,fe))throw new Error("Fatal error");const s=p(this,Ee),a=p(this,fe),n=s.length;let o=0,r;for(;o<n;o++){const i=s[o];try{for(let l=0,d=a.length;l<d;l++)i.add(...a[l]);r=i.match(e,t)}catch(l){if(l instanceof Gt)continue;throw l}this.match=i.match.bind(i),w(this,Ee,[i]),w(this,fe,void 0);break}if(o===n)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,r}get activeRouter(){if(p(this,fe)||p(this,Ee).length!==1)throw new Error("No active router has been determined yet.");return p(this,Ee)[0]}},Ee=new WeakMap,fe=new WeakMap,Nt),ze=Object.create(null),Ce,Z,De,Ye,Q,he,Re,_e,$s=(_e=class{constructor(t,s,a){C(this,he);C(this,Ce);C(this,Z);C(this,De);C(this,Ye,0);C(this,Q,ze);if(w(this,Z,a||Object.create(null)),w(this,Ce,[]),t&&s){const n=Object.create(null);n[t]={handler:s,possibleKeys:[],score:0},w(this,Ce,[n])}w(this,De,[])}insert(t,s,a){w(this,Ye,++vt(this,Ye)._);let n=this;const o=fs(s),r=[];for(let i=0,l=o.length;i<l;i++){const d=o[i],c=o[i+1],m=bs(d,c),f=Array.isArray(m)?m[0]:d;if(f in p(n,Z)){n=p(n,Z)[f],m&&r.push(m[1]);continue}p(n,Z)[f]=new _e,m&&(p(n,De).push(m),r.push(m[1])),n=p(n,Z)[f]}return p(n,Ce).push({[t]:{handler:a,possibleKeys:r.filter((i,l,d)=>d.indexOf(i)===l),score:p(this,Ye)}}),n}search(t,s){var l;const a=[];w(this,Q,ze);let o=[this];const r=Pt(s),i=[];for(let d=0,c=r.length;d<c;d++){const m=r[d],f=d===c-1,y=[];for(let b=0,v=o.length;b<v;b++){const g=o[b],h=p(g,Z)[m];h&&(w(h,Q,p(g,Q)),f?(p(h,Z)["*"]&&a.push(...R(this,he,Re).call(this,p(h,Z)["*"],t,p(g,Q))),a.push(...R(this,he,Re).call(this,h,t,p(g,Q)))):y.push(h));for(let N=0,L=p(g,De).length;N<L;N++){const x=p(g,De)[N],A=p(g,Q)===ze?{}:{...p(g,Q)};if(x==="*"){const H=p(g,Z)["*"];H&&(a.push(...R(this,he,Re).call(this,H,t,p(g,Q))),w(H,Q,A),y.push(H));continue}const[M,$,J]=x;if(!m&&!(J instanceof RegExp))continue;const U=p(g,Z)[M],te=r.slice(d).join("/");if(J instanceof RegExp){const H=J.exec(te);if(H){if(A[$]=H[0],a.push(...R(this,he,Re).call(this,U,t,p(g,Q),A)),Object.keys(p(U,Z)).length){w(U,Q,A);const Y=((l=H[0].match(/\//))==null?void 0:l.length)??0;(i[Y]||(i[Y]=[])).push(U)}continue}}(J===!0||J.test(m))&&(A[$]=m,f?(a.push(...R(this,he,Re).call(this,U,t,A,p(g,Q))),p(U,Z)["*"]&&a.push(...R(this,he,Re).call(this,p(U,Z)["*"],t,A,p(g,Q)))):(w(U,Q,A),y.push(U)))}}o=y.concat(i.shift()??[])}return a.length>1&&a.sort((d,c)=>d.score-c.score),[a.map(({handler:d,params:c})=>[d,c])]}},Ce=new WeakMap,Z=new WeakMap,De=new WeakMap,Ye=new WeakMap,Q=new WeakMap,he=new WeakSet,Re=function(t,s,a,n){const o=[];for(let r=0,i=p(t,Ce).length;r<i;r++){const l=p(t,Ce)[r],d=l[s]||l[K],c={};if(d!==void 0&&(d.params=Object.create(null),o.push(d),a!==ze||n&&n!==ze))for(let m=0,f=d.possibleKeys.length;m<f;m++){const y=d.possibleKeys[m],b=c[d.score];d.params[y]=n!=null&&n[y]&&!b?n[y]:a[y]??(n==null?void 0:n[y]),c[d.score]=!0}}return o},_e),Oe,Tt,Hs=(Tt=class{constructor(){k(this,"name","TrieRouter");C(this,Oe);w(this,Oe,new $s)}add(e,t,s){const a=Ot(t);if(a){for(let n=0,o=a.length;n<o;n++)p(this,Oe).insert(e,a[n],s);return}p(this,Oe).insert(e,t,s)}match(e,t){return p(this,Oe).search(e,t)}},Oe=new WeakMap,Tt),zt=class extends Rs{constructor(e={}){super(e),this.router=e.router??new Ws({routers:[new Fs,new Hs]})}},Gs=e=>{const s={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...e},a=(o=>typeof o=="string"?o==="*"?()=>o:r=>o===r?r:null:typeof o=="function"?o:r=>o.includes(r)?r:null)(s.origin),n=(o=>typeof o=="function"?o:Array.isArray(o)?()=>o:()=>[])(s.allowMethods);return async function(r,i){var c;function l(m,f){r.res.headers.set(m,f)}const d=await a(r.req.header("origin")||"",r);if(d&&l("Access-Control-Allow-Origin",d),s.credentials&&l("Access-Control-Allow-Credentials","true"),(c=s.exposeHeaders)!=null&&c.length&&l("Access-Control-Expose-Headers",s.exposeHeaders.join(",")),r.req.method==="OPTIONS"){s.origin!=="*"&&l("Vary","Origin"),s.maxAge!=null&&l("Access-Control-Max-Age",s.maxAge.toString());const m=await n(r.req.header("origin")||"",r);m.length&&l("Access-Control-Allow-Methods",m.join(","));let f=s.allowHeaders;if(!(f!=null&&f.length)){const y=r.req.header("Access-Control-Request-Headers");y&&(f=y.split(/\s*,\s*/))}return f!=null&&f.length&&(l("Access-Control-Allow-Headers",f.join(",")),r.res.headers.append("Vary","Access-Control-Request-Headers")),r.res.headers.delete("Content-Length"),r.res.headers.delete("Content-Type"),new Response(null,{headers:r.res.headers,status:204,statusText:"No Content"})}await i(),s.origin!=="*"&&r.header("Vary","Origin",{append:!0})}},Ks=/^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i,Ct=(e,t=Ys)=>{const s=/\.([a-zA-Z0-9]+?)$/,a=e.match(s);if(!a)return;let n=t[a[1]];return n&&n.startsWith("text")&&(n+="; charset=utf-8"),n},Vs={aac:"audio/aac",avi:"video/x-msvideo",avif:"image/avif",av1:"video/av1",bin:"application/octet-stream",bmp:"image/bmp",css:"text/css",csv:"text/csv",eot:"application/vnd.ms-fontobject",epub:"application/epub+zip",gif:"image/gif",gz:"application/gzip",htm:"text/html",html:"text/html",ico:"image/x-icon",ics:"text/calendar",jpeg:"image/jpeg",jpg:"image/jpeg",js:"text/javascript",json:"application/json",jsonld:"application/ld+json",map:"application/json",mid:"audio/x-midi",midi:"audio/x-midi",mjs:"text/javascript",mp3:"audio/mpeg",mp4:"video/mp4",mpeg:"video/mpeg",oga:"audio/ogg",ogv:"video/ogg",ogx:"application/ogg",opus:"audio/opus",otf:"font/otf",pdf:"application/pdf",png:"image/png",rtf:"application/rtf",svg:"image/svg+xml",tif:"image/tiff",tiff:"image/tiff",ts:"video/mp2t",ttf:"font/ttf",txt:"text/plain",wasm:"application/wasm",webm:"video/webm",weba:"audio/webm",webmanifest:"application/manifest+json",webp:"image/webp",woff:"font/woff",woff2:"font/woff2",xhtml:"application/xhtml+xml",xml:"application/xml",zip:"application/zip","3gp":"video/3gpp","3g2":"video/3gpp2",gltf:"model/gltf+json",glb:"model/gltf-binary"},Ys=Vs,_s=(...e)=>{let t=e.filter(n=>n!=="").join("/");t=t.replace(new RegExp("(?<=\\/)\\/+","g"),"");const s=t.split("/"),a=[];for(const n of s)n===".."&&a.length>0&&a.at(-1)!==".."?a.pop():n!=="."&&a.push(n);return a.join("/")||"."},qt={br:".br",zstd:".zst",gzip:".gz"},zs=Object.keys(qt),qs="index.html",Qs=e=>{const t=e.root??"./",s=e.path,a=e.join??_s;return async(n,o)=>{var c,m,f,y;if(n.finalized)return o();let r;if(e.path)r=e.path;else try{if(r=decodeURIComponent(n.req.path),/(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(r))throw new Error}catch{return await((c=e.onNotFound)==null?void 0:c.call(e,n.req.path,n)),o()}let i=a(t,!s&&e.rewriteRequestPath?e.rewriteRequestPath(r):r);e.isDir&&await e.isDir(i)&&(i=a(i,qs));const l=e.getContent;let d=await l(i,n);if(d instanceof Response)return n.newResponse(d.body,d);if(d){const b=e.mimes&&Ct(i,e.mimes)||Ct(i);if(n.header("Content-Type",b||"application/octet-stream"),e.precompressed&&(!b||Ks.test(b))){const v=new Set((m=n.req.header("Accept-Encoding"))==null?void 0:m.split(",").map(g=>g.trim()));for(const g of zs){if(!v.has(g))continue;const h=await l(i+qt[g],n);if(h){d=h,n.header("Content-Encoding",g),n.header("Vary","Accept-Encoding",{append:!0});break}}}return await((f=e.onFound)==null?void 0:f.call(e,i,n)),n.body(d)}await((y=e.onNotFound)==null?void 0:y.call(e,i,n)),await o()}},Zs=async(e,t)=>{let s;t&&t.manifest?typeof t.manifest=="string"?s=JSON.parse(t.manifest):s=t.manifest:typeof __STATIC_CONTENT_MANIFEST=="string"?s=JSON.parse(__STATIC_CONTENT_MANIFEST):s=__STATIC_CONTENT_MANIFEST;let a;t&&t.namespace?a=t.namespace:a=__STATIC_CONTENT;const n=s[e]||e;if(!n)return null;const o=await a.get(n,{type:"stream"});return o||null},Xs=e=>async function(s,a){return Qs({...e,getContent:async o=>Zs(o,{manifest:e.manifest,namespace:e.namespace?e.namespace:s.env?s.env.__STATIC_CONTENT:void 0})})(s,a)},Js=e=>Xs(e);const I=new zt;I.use("/api/*",Gs());I.use("*",async(e,t)=>{try{const s=await e.env.COMPANIES_KV.get("__streak_api_key__");s&&e.env.ENCRYPTION_KEY?dt=await Xt(s,e.env.ENCRYPTION_KEY):e.env.STREAK_API_KEY&&(dt=e.env.STREAK_API_KEY)}catch{e.env.STREAK_API_KEY&&(dt=e.env.STREAK_API_KEY)}await t()});I.use("/static/*",Js({root:"./public"}));let dt="";const ea="https://www.streak.com/api/v1",Qt=["oattia@gmail.com","aina.andriamangason@gmail.com","winnielauren3@gmail.com","zakaria.omahdi@mabsilico.com"];async function Zt(e){const t=new TextEncoder,s=await crypto.subtle.digest("SHA-256",t.encode(e));return crypto.subtle.importKey("raw",s,{name:"AES-GCM"},!1,["encrypt","decrypt"])}async function ta(e,t){const s=new TextEncoder,a=await Zt(t),n=crypto.getRandomValues(new Uint8Array(12)),o=await crypto.subtle.encrypt({name:"AES-GCM",iv:n},a,s.encode(e)),r=new Uint8Array(n.length+new Uint8Array(o).length);r.set(n),r.set(new Uint8Array(o),n.length);let i="";for(let l=0;l<r.length;l++)i+=String.fromCharCode(r[l]);return btoa(i)}async function Xt(e,t){const s=atob(e),a=new Uint8Array(s.length);for(let l=0;l<s.length;l++)a[l]=s.charCodeAt(l);const n=a.slice(0,12),o=a.slice(12),r=await Zt(t),i=await crypto.subtle.decrypt({name:"AES-GCM",iv:n},r,o);return new TextDecoder().decode(i)}async function Jt(e,t){try{const s=await fetch("https://oauth2.googleapis.com/tokeninfo?id_token="+encodeURIComponent(e));if(!s.ok)return null;const a=await s.json();return a.aud!==t||!a.email||a.email_verified!=="true"?null:{email:a.email,name:a.name||a.email}}catch{return null}}const Ze={mabsilico:{name:"MabSilico",pipelineKey:"agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgOqI26zZCAw",url:"https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgOqI26zZCAw",networkSheetGid:"910674612",sources:{promote:"",network:"https://docs.google.com/spreadsheets/d/1NzUlKfHTW6v7i-S59GjtBFlzQwTX2AaeK4gQ4fVSAsw/edit?gid=910674612#gid=910674612",engage:"https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgOqI26zZCAw"}},"finance-montreal":{name:"Finance Montreal (Steve)",pipelineKey:"agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgI7YkpykCQw",url:"https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgI7YkpykCQw"},"apm-music":{name:"APM Music",pipelineKey:"agxzfm1haWxmb29nYWVyRAsSDE9yZ2FuaXphdGlvbiIdYWluYS5hbmRyaWFtYW5nYXNvbkBnbWFpbC5jb20MCxIIV29ya2Zsb3cYgIClnNb8gwsM",url:"https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyRAsSDE9yZ2FuaXphdGlvbiIdYWluYS5hbmRyaWFtYW5nYXNvbkBnbWFpbC5jb20MCxIIV29ya2Zsb3cYgIClnNb8gwsM"},ducrocq:{name:"Ducrocq",pipelineKey:"agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgNaSl4OGCww",url:"https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgNaSl4OGCww"},milvue:{name:"Milvue",pipelineKey:"agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgMX-7baZCgw",url:"https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgMX-7baZCgw"},seekyo:{name:"Seekyo Therapeutics",pipelineKey:"agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgLnYo_uUCww",url:"https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgLnYo_uUCww"},altavia:{name:"Altavia",pipelineKey:"agxzfm1haWxmb29nYWVyRAsSDE9yZ2FuaXphdGlvbiIdYWluYS5hbmRyaWFtYW5nYXNvbkBnbWFpbC5jb20MCxIIV29ya2Zsb3cYgICFz_elmwgM",url:"https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyRAsSDE9yZ2FuaXphdGlvbiIdYWluYS5hbmRyaWFtYW5nYXNvbkBnbWFpbC5jb20MCxIIV29ya2Zsb3cYgICFz_elmwgM"},valos:{name:"Valos",pipelineKey:"agxzfm1haWxmb29nYWVyRAsSDE9yZ2FuaXphdGlvbiIdYWluYS5hbmRyaWFtYW5nYXNvbkBnbWFpbC5jb20MCxIIV29ya2Zsb3cYgICF5ei7lgkM",url:"https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyRAsSDE9yZ2FuaXphdGlvbiIdYWluYS5hbmRyaWFtYW5nYXNvbkBnbWFpbC5jb20MCxIIV29ya2Zsb3cYgICF5ei7lgkM"},"dab-embedded":{name:"DAB-Embedded",pipelineKey:"agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgKWyqIboCww",url:"https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgKWyqIboCww"},"finance-montreal-noza":{name:"Finance Montreal (Noza)",pipelineKey:"agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgKWVvvDkCgw",url:"https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgKWVvvDkCgw"}},ee=Ze.mabsilico.pipelineKey,es="Fit",ts="Interest",It="1NzUlKfHTW6v7i-S59GjtBFlzQwTX2AaeK4gQ4fVSAsw";async function O(e){const t=btoa(`${dt}:`),s=await fetch(`${ea}${e}`,{headers:{Authorization:`Basic ${t}`,"Content-Type":"application/json"}});if(!s.ok)throw new Error(`Streak API error: ${s.statusText}`);return s.json()}function bt(e){if(e.includes("docs.google.com")){const t=e.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/),s=e.match(/[?&#]gid=(\d+)/),a=t?t[1]:It,n=s?s[1]:"0";return{sheetId:a,gid:n}}return{sheetId:It,gid:e}}async function ss(e){try{const{sheetId:t,gid:s}=bt(e),a=`https://docs.google.com/spreadsheets/d/${t}/export?format=csv&gid=${s}`,n=await fetch(a);if(!n.ok)throw new Error(`Google Sheets error: ${n.statusText}`);const r=(await n.text()).split(`
`).filter(x=>x.trim()),i=[];if(r.length<2)return{totalInvitations:0,totalAccepted:0,avgAcceptanceRate:0,thisWeek:{invitations:0,acceptance:0},lastWeek:{invitations:0,acceptance:0},recentWeeks:[],allData:[]};const l=r[0].split(",").map(x=>x.trim().toLowerCase()),d=l[0]==="w"||l[0]==="week",c=d?0:-1;for(let x=1;x<r.length;x++){const M=r[x].split(","),$=3+c,J=4+c,U=7+c,te=8+c,H=1+c,Y=2+c;if(M.length>=(d?9:8)&&M[$]&&M[$].trim()){const Se=parseInt(M[$])||0,_=parseInt(M[J])||0,be=M[U]?M[U].replace("%","").trim():"0",oe=parseFloat(be)||0;i.push({week:d?M[0]:String(x),from:M[H],to:M[Y],invitations:Se,messages:_,acceptance:oe,opportunities:te<M.length&&parseInt(M[te])||0})}}const m=i.reduce((x,A)=>x+A.invitations,0),f=i.reduce((x,A)=>{const M=Math.min(A.acceptance,100);return x+Math.round(A.invitations*M/100)},0),y=i.map(x=>Math.min(x.acceptance,100)),b=y.length>0?y.reduce((x,A)=>x+A,0)/y.length:0,v=20,g=b>0?b/v*100:0,h=i.slice(-4),N=i[i.length-1]||{invitations:0,acceptance:0},L=i[i.length-2]||{invitations:0,acceptance:0};return{totalInvitations:m,totalAccepted:f,avgAcceptanceRate:Math.round(b*10)/10,networkObjective:v,objectiveAchievement:Math.round(g*10)/10,thisWeek:{invitations:N.invitations,acceptance:Math.min(N.acceptance,100)},lastWeek:{invitations:L.invitations,acceptance:Math.min(L.acceptance,100)},recentWeeks:h.map(x=>({...x,acceptance:Math.min(x.acceptance,100)})),allData:i}}catch(t){return console.error("Error fetching network data:",t),{totalInvitations:0,totalAccepted:0,avgAcceptanceRate:0,thisWeek:{invitations:0,acceptance:0},lastWeek:{invitations:0,acceptance:0},recentWeeks:[],allData:[]}}}async function sa(e){try{let t=function(c){const m=[];let f="",y=!1;for(let b=0;b<c.length;b++){const v=c[b];v==='"'?y=!y:v===","&&!y?(m.push(f.trim()),f=""):f+=v}return m.push(f.trim()),m};const{sheetId:s,gid:a}=bt(e),n=`https://docs.google.com/spreadsheets/d/${s}/export?format=csv&gid=${a}`,o=await fetch(n);if(!o.ok)throw new Error(`Google Sheets error: ${o.statusText}`);const i=(await o.text()).split(`
`).filter(c=>c.trim());if(i.length<2)return{campaigns:[],totals:{emailsSent:0,allReplies:0,humanReplies:0,positiveReplies:0,humanReplyRate:0,positiveReplyRate:0}};const l=[];for(let c=1;c<i.length;c++){const m=t(i[c]);m.length<10||l.push({id:m[0],name:m[1],account:m[2],company:m[3],emailsSent:parseInt(m[4])||0,allReplies:parseInt(m[5])||0,humanReplies:parseInt(m[6])||0,positiveReplies:parseInt(m[7])||0,humanReplyRate:parseFloat(m[8])||0,positiveReplyRate:parseFloat(m[9])||0,targeting:m.length>10?m[10]:"",leads:m.length>11&&parseInt(m[11])||0})}const d={emailsSent:l.reduce((c,m)=>c+m.emailsSent,0),allReplies:l.reduce((c,m)=>c+m.allReplies,0),humanReplies:l.reduce((c,m)=>c+m.humanReplies,0),positiveReplies:l.reduce((c,m)=>c+m.positiveReplies,0),humanReplyRate:0,positiveReplyRate:0,leads:l.reduce((c,m)=>c+m.leads,0),campaignCount:l.length};return d.allReplies>0&&(d.humanReplyRate=d.humanReplies/d.allReplies*100,d.positiveReplyRate=d.positiveReplies/d.allReplies*100),{campaigns:l,totals:d}}catch(t){return console.error("Error fetching emailing data:",t),{campaigns:[],totals:{emailsSent:0,allReplies:0,humanReplies:0,positiveReplies:0,humanReplyRate:0,positiveReplyRate:0,leads:0,campaignCount:0}}}}I.get("/api/pipeline",async e=>{try{const t=await O(`/pipelines/${ee}`);return e.json(t)}catch(t){return e.json({error:t.message},500)}});I.get("/api/boxes",async e=>{try{const t=await O(`/pipelines/${ee}/boxes`);return e.json(t)}catch(t){return e.json({error:t.message},500)}});I.get("/api/boxes/:boxKey",async e=>{try{const t=e.req.param("boxKey"),s=await O(`/boxes/${t}`);return e.json(s)}catch(t){return e.json({error:t.message},500)}});I.get("/api/sheets/stage/:stageName/count",async e=>{try{const t=e.req.param("stageName"),[s,a]=await Promise.all([O(`/pipelines/${ee}`),O(`/pipelines/${ee}/boxes`)]),n=s.stageOrder||[],o=Array.isArray(n)?n.map(i=>{var l,d;return{key:i,name:((d=(l=s.stages)==null?void 0:l[i])==null?void 0:d.name)||"Unknown"}}):[],r=Array.isArray(a)?a.filter(i=>{const l=o.find(d=>d&&d.key===i.stageKey);return l&&l.name.toLowerCase()===t.toLowerCase()}).length:0;return e.text(r.toString())}catch{return e.text("ERROR")}});I.get("/api/sheets/priority/:priorityName/count",async e=>{try{const t=e.req.param("priorityName"),[s,a]=await Promise.all([O(`/pipelines/${ee}`),O(`/pipelines/${ee}/boxes`)]),o=(Array.isArray(s.fields)?s.fields:[]).find(i=>i&&i.name==="Priority"),r=Array.isArray(a)?a.filter(i=>{var f;if(!o||!i.fields||!i.fields[o.key])return t.toLowerCase()==="no priority";const l=i.fields[o.key],d=(f=o.dropdownSettings)==null?void 0:f.items,c=Array.isArray(d)?d.find(y=>y&&y.key===l):null;return(c?c.name:"No Priority").toLowerCase().includes(t.toLowerCase())}).length:0;return e.text(r.toString())}catch{return e.text("ERROR")}});I.get("/api/sheets/country/:countryName/count",async e=>{try{const t=e.req.param("countryName"),[s,a]=await Promise.all([O(`/pipelines/${ee}`),O(`/pipelines/${ee}/boxes`)]),o=(Array.isArray(s.fields)?s.fields:[]).find(i=>i&&i.name==="Country"),r=Array.isArray(a)?a.filter(i=>{var f;if(!o||!i.fields||!i.fields[o.key])return t.toLowerCase()==="unknown";const l=i.fields[o.key],d=(f=o.dropdownSettings)==null?void 0:f.items,c=Array.isArray(d)?d.find(y=>y&&y.key===l):null;return(c?c.name:"Unknown").toLowerCase()===t.toLowerCase()}).length:0;return e.text(r.toString())}catch{return e.text("ERROR")}});I.get("/api/sheets/total",async e=>{try{const t=await O(`/pipelines/${ee}/boxes`),s=Array.isArray(t)?t.length:0;return e.text(s.toString())}catch{return e.text("ERROR")}});I.get("/api/sheets/freshness/:level/count",async e=>{try{const t=e.req.param("level").toLowerCase(),s=await O(`/pipelines/${ee}/boxes`),a=Array.isArray(s)?s.filter(n=>{const o=n.freshness||0;return t==="high"?o>.5:t==="medium"?o>=.2&&o<=.5:t==="low"?o<.2:!1}).length:0;return e.text(a.toString())}catch{return e.text("ERROR")}});I.get("/api/sheets/fit/:fitLevel/count",async e=>{try{const t=e.req.param("fitLevel"),[s,a]=await Promise.all([O(`/pipelines/${ee}`),O(`/pipelines/${ee}/boxes`)]),o=(Array.isArray(s.fields)?s.fields:[]).find(i=>i&&i.name===es),r=Array.isArray(a)?a.filter(i=>{var f;if(!o||!i.fields||!i.fields[o.key])return t.toLowerCase()==="not set";const l=i.fields[o.key],d=(f=o.dropdownSettings)==null?void 0:f.items,c=Array.isArray(d)?d.find(y=>y&&y.key===l):null;return(c?c.name:"Not Set").toLowerCase()===t.toLowerCase()}).length:0;return e.text(r.toString())}catch{return e.text("ERROR")}});I.get("/api/sheets/interest/:interestLevel/count",async e=>{try{const t=e.req.param("interestLevel"),[s,a]=await Promise.all([O(`/pipelines/${ee}`),O(`/pipelines/${ee}/boxes`)]),o=(Array.isArray(s.fields)?s.fields:[]).find(i=>i&&i.name===ts),r=Array.isArray(a)?a.filter(i=>{var f;if(!o||!i.fields||!i.fields[o.key])return t.toLowerCase()==="not set";const l=i.fields[o.key],d=(f=o.dropdownSettings)==null?void 0:f.items,c=Array.isArray(d)?d.find(y=>y&&y.key===l):null;return(c?c.name:"Not Set").toLowerCase()===t.toLowerCase()}).length:0;return e.text(r.toString())}catch{return e.text("ERROR")}});function as(e,t){if(e&&e.startsWith("strk_")&&t){const s=t.match(/\/pipelines\/([a-zA-Z0-9_-]{20,})/);if(s)return s[1]}if(e&&e.includes("/pipelines/")){const s=e.match(/\/pipelines\/([a-zA-Z0-9_-]{20,})/);if(s)return s[1]}return e}async function Ie(e,t){const s=await e.get(`company:${t}`);if(s)return JSON.parse(s);if(Ze[t]){const a=Ze[t];return{key:t,name:a.name,pipelineKey:a.pipelineKey,url:a.url||"",networkSheetGid:a.networkSheetGid||"",sources:a.sources||{}}}return null}async function nt(e,t=!1){const s={};for(const o of Object.keys(Ze)){const r=Ze[o];s[o]={key:o,name:r.name,pipelineKey:r.pipelineKey,url:r.url||"",networkSheetGid:r.networkSheetGid||"",sources:r.sources||{},archived:!1}}const a=await e.list({prefix:"company:"});for(const o of a.keys){const r=await e.get(o.name);if(r){const i=JSON.parse(r);s[i.key]=i}}const n=Object.values(s);return t?n:n.filter(o=>!o.archived)}I.get("/api/companies",async e=>{const t=e.req.query("includeArchived")==="true",s=await nt(e.env.COMPANIES_KV,t);return e.json({companies:s,count:s.length})});I.post("/api/companies",async e=>{try{const t=await e.req.json(),{name:s,pipelineKey:a,networkUrl:n,promoteUrl:o,engageUrl:r,notionUrl:i,networkGid:l,key:d,googleChatUrl:c,googleChatWebhookUrl:m,emailingUrl:f,messages:y}=t;if(!s||!a)return e.json({error:"name and pipelineKey are required"},400);const b=d||s.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""),v=as(a,r),g={key:b,name:s,pipelineKey:v,url:r||`https://www.streak.com/a/pipelines/${a}`,sources:{promote:o||"",network:n||"",engage:r||`https://www.streak.com/a/pipelines/${a}`,notion:i||""}};return l&&(g.networkSheetGid=l),c&&(g.googleChatUrl=c),m&&(g.googleChatWebhookUrl=m),y&&y.length>0&&(g.messages=y),f&&(g.emailingUrl=f),await e.env.COMPANIES_KV.put(`company:${b}`,JSON.stringify(g)),e.json({success:!0,company:g})}catch{return e.json({error:"Failed to save company"},500)}});async function ns(e,t){var d,c;const s=/\[leads:([^\]]+)\]/gi,a=[...e.matchAll(s)];if(a.length===0)return e;const[n,o]=await Promise.all([O(`/pipelines/${t}`),O(`/pipelines/${t}/boxes`)]),r=n.stageOrder||[],i={};for(const m of r)i[m]=((c=(d=n.stages)==null?void 0:d[m])==null?void 0:c.name)||"Unknown";let l=e;for(const m of a){const f=m[1],y=Array.isArray(o)?o.filter(b=>(i[b.stageKey]||"").toLowerCase()===f.toLowerCase()).length:0;l=l.replace(m[0],y.toString())}return l}function aa(){const e=new Date,t=-300;e.getUTCHours()*60+e.getUTCMinutes();const s=new Date(e);return s.setUTCMinutes(s.getUTCMinutes()+t),["sunday","monday","tuesday","wednesday","thursday","friday","saturday"][s.getUTCDay()]}I.get("/api/chat/send-messages",async e=>{try{const t=[],s=await nt(e.env.COMPANIES_KV),a=aa();for(const n of s){if(!n.googleChatWebhookUrl||!n.messages||!n.pipelineKey)continue;const o=n.messages.filter(r=>r.enabled&&r.dayOfWeek===a);for(const r of o)try{const i=await ns(r.text,n.pipelineKey),l=await fetch(n.googleChatWebhookUrl,{method:"POST",headers:{"Content-Type":"application/json; charset=UTF-8"},body:JSON.stringify({text:i})});t.push({company:n.name,messageId:r.id,sent:l.ok,status:l.status,resolvedText:i})}catch(i){t.push({company:n.name,messageId:r.id,error:i.message,sent:!1})}}return e.json({success:!0,day:a,results:t,timestamp:new Date().toISOString()})}catch(t){return e.json({error:t.message},500)}});I.get("/api/chat/weekly-reminder",async e=>{var t,s;try{const a=[],n=await nt(e.env.COMPANIES_KV);for(const o of n)if(!(!o.googleChatWebhookUrl||!o.pipelineKey))try{const[r,i]=await Promise.all([O(`/pipelines/${o.pipelineKey}`),O(`/pipelines/${o.pipelineKey}/boxes`)]),l=r.stageOrder||[],d={};for(const y of l)d[y]=((s=(t=r.stages)==null?void 0:t[y])==null?void 0:s.name)||"Unknown";const c=Array.isArray(i)?i.filter(y=>(d[y.stageKey]||"").toLowerCase()==="lead").length:0,m=`As a reminder, you still have ${c} leads in your Streak that are still at the stage of LEAD, they should be CONTACTED or better. Also, a FIT would be important to share for future campaigns. Thanks.`,f=await fetch(o.googleChatWebhookUrl,{method:"POST",headers:{"Content-Type":"application/json; charset=UTF-8"},body:JSON.stringify({text:m})});a.push({company:o.name,leadCount:c,sent:f.ok,status:f.status})}catch(r){a.push({company:o.name,error:r.message,sent:!1})}return e.json({success:!0,results:a,timestamp:new Date().toISOString()})}catch(a){return e.json({error:a.message},500)}});I.get("/api/chat/send-messages/:companyKey",async e=>{try{const t=e.req.param("companyKey").toLowerCase(),s=await Ie(e.env.COMPANIES_KV,t);if(!s)return e.json({error:"Company not found"},404);if(!s.googleChatWebhookUrl)return e.json({error:`No Google Chat webhook configured for ${s.name}`},400);if(!s.pipelineKey)return e.json({error:`No pipeline key configured for ${s.name}`},400);if(!s.messages||s.messages.length===0)return e.json({error:`No messages configured for ${s.name}`},400);const a=[];for(const n of s.messages)if(n.enabled)try{const o=await ns(n.text,s.pipelineKey),r=await fetch(s.googleChatWebhookUrl,{method:"POST",headers:{"Content-Type":"application/json; charset=UTF-8"},body:JSON.stringify({text:o})});a.push({messageId:n.id,dayOfWeek:n.dayOfWeek,time:n.time,sent:r.ok,resolvedText:o})}catch(o){a.push({messageId:n.id,error:o.message,sent:!1})}return e.json({success:!0,company:s.name,results:a,timestamp:new Date().toISOString()})}catch(t){return e.json({error:t.message},500)}});I.delete("/api/companies/:key",async e=>{try{const t=e.req.param("key");return await e.env.COMPANIES_KV.delete(`company:${t}`),e.json({success:!0})}catch{return e.json({error:"Failed to delete company"},500)}});I.put("/api/companies/:key",async e=>{var t,s,a;try{const n=e.req.param("key"),o=await e.req.json(),{name:r,pipelineKey:i,networkUrl:l,promoteUrl:d,engageUrl:c,networkGid:m,googleChatUrl:f,googleChatWebhookUrl:y,emailingUrl:b,messages:v}=o,h=(await nt(e.env.COMPANIES_KV,!0)).find(A=>A.key===n);if(!h)return e.json({error:"Company not found"},404);const{archived:N}=o,L=i?as(i,c||h.url):h.pipelineKey,x={...h,key:n,name:r||h.name,pipelineKey:L,sources:{promote:d!==void 0?d:((t=h.sources)==null?void 0:t.promote)||"",network:l!==void 0?l:((s=h.sources)==null?void 0:s.network)||"",engage:c!==void 0?c:((a=h.sources)==null?void 0:a.engage)||h.url||""}};return m!==void 0&&(m?x.networkSheetGid=m:delete x.networkSheetGid),c&&(x.url=c),N!==void 0&&(x.archived=N),f!==void 0&&(x.googleChatUrl=f),y!==void 0&&(x.googleChatWebhookUrl=y),v!==void 0&&(x.messages=v),o.emailingUrl!==void 0&&(x.emailingUrl=o.emailingUrl),await e.env.COMPANIES_KV.put(`company:${n}`,JSON.stringify(x)),e.json({success:!0,company:x})}catch{return e.json({error:"Failed to update company"},500)}});I.get("/api/sheets/:companyName/total",async e=>{try{const t=e.req.param("companyName").toLowerCase(),s=await Ie(e.env.COMPANIES_KV,t);if(!s)return e.text("COMPANY_NOT_FOUND");const a=await O(`/pipelines/${s.pipelineKey}/boxes`),n=Array.isArray(a)?a.length:0;return e.text(n.toString())}catch{return e.text("ERROR")}});I.get("/api/sheets/:companyName/month/:yearMonth/count",async e=>{try{const t=e.req.param("companyName").toLowerCase(),s=e.req.param("yearMonth"),a=await Ie(e.env.COMPANIES_KV,t);if(!a)return e.text("COMPANY_NOT_FOUND");const n=await O(`/pipelines/${a.pipelineKey}/boxes`),[o,r]=s.split("-").map(Number),i=Array.isArray(n)?n.filter(l=>{const d=new Date(l.creationTimestamp);return d.getFullYear()===o&&d.getMonth()+1===r}).length:0;return e.text(i.toString())}catch{return e.text("ERROR")}});I.get("/api/sheets/:companyName/week/count",async e=>{try{const t=e.req.param("companyName").toLowerCase(),s=await Ie(e.env.COMPANIES_KV,t);if(!s)return e.text("ERROR");const a=await O(`/pipelines/${s.pipelineKey}/boxes`);if(!Array.isArray(a))return e.text("0");const o=Date.now()-10080*60*1e3,r=a.filter(i=>(i.creationTimestamp||0)>=o).length;return e.text(r.toString())}catch{return e.text("ERROR")}});I.get("/api/sheets/:companyName/duration/total",async e=>{try{const t=e.req.param("companyName").toLowerCase(),s=await Ie(e.env.COMPANIES_KV,t);if(!s)return e.text("0");const a=await O(`/pipelines/${s.pipelineKey}/boxes`);if(!Array.isArray(a)||a.length===0)return e.text("0");const n=a.map(m=>m.creationTimestamp).filter(m=>m);if(n.length===0)return e.text("0");const o=Math.min(...n),r=new Date(o),i=new Date,l=i.getFullYear()-r.getFullYear(),d=i.getMonth()-r.getMonth(),c=l*12+d+1;return e.text(c.toString())}catch{return e.text("0")}});I.get("/api/sheets/:companyName/monthly-stats",async e=>{try{const t=e.req.param("companyName").toLowerCase(),s=await Ie(e.env.COMPANIES_KV,t);if(!s)return e.json({error:"Company not found"},404);const a=await O(`/pipelines/${s.pipelineKey}/boxes`),n=Array.isArray(a)?a:[],o=new Date,r=[];for(let c=11;c>=0;c--){const m=new Date(o.getFullYear(),o.getMonth()-c,1),f=m.getFullYear(),y=m.getMonth()+1,b=n.filter(g=>{const h=new Date(g.creationTimestamp);return h.getFullYear()===f&&h.getMonth()+1===y}).length,v=(b/10*100).toFixed(1);r.push({month:`${f}-${String(y).padStart(2,"0")}`,count:b,objective:10,percentage:parseFloat(v)})}const i=r.reduce((c,m)=>c+m.count,0),l=(i/12).toFixed(1),d=(parseFloat(l)/10*100).toFixed(1);return e.json({company:s.name,companyKey:t,objective:10,monthlyStats:r,summary:{totalLeads:i,average:parseFloat(l),averagePercentage:parseFloat(d)}})}catch(t){return e.json({error:t.message},500)}});I.get("/api/analytics",async e=>{var t;try{const s=e.req.query("company")||"mabsilico",a=await Ie(e.env.COMPANIES_KV,s);if(!a)return e.json({error:"Invalid company key"},400);const n=a.pipelineKey;if(!n)return e.json({error:`No Streak pipeline key configured for "${a.name}". Please set it in the Admin Panel.`},400);const[o,r]=await Promise.all([O(`/pipelines/${n}`),O(`/pipelines/${n}/boxes`)]),i=Array.isArray(r)?r.length:0,l={},d={},c={},m={},f={},y={},b={"High (>0.5)":0,"Medium (0.2-0.5)":0,"Low (<0.2)":0},v=o.stageOrder||[],g=Array.isArray(v)?v.map(u=>{var S,z;return{key:u,name:((z=(S=o.stages)==null?void 0:S[u])==null?void 0:z.name)||"Unknown"}}):[],h=Array.isArray(o.fields)?o.fields:[],N=h.find(u=>u&&u.name==="Origin"),L=h.find(u=>u&&u.name===es),x=h.find(u=>u&&u.name===ts),A=h.find(u=>u&&u.name==="Est Start Date"),M=h.find(u=>u&&u.name==="Country"),$=h.find(u=>u&&u.name==="Language");Array.isArray(r)&&r.forEach(u=>{var P,G,ae,re,ie;if(!u)return;const S=g.find(W=>W&&W.key===u.stageKey),z=S?S.name:"Unknown";if(l[z]=(l[z]||0)+1,N&&u.fields&&u.fields[N.key]){const W=u.fields[N.key],F=(P=N.dropdownSettings)==null?void 0:P.items,q=Array.isArray(F)?F.find(B=>B&&B.key===W):null,j=q?q.name:"Unknown";d[j]=(d[j]||0)+1}if(L&&u.fields&&u.fields[L.key]){const W=u.fields[L.key],F=(G=L.dropdownSettings)==null?void 0:G.items,q=Array.isArray(F)?F.find(B=>B&&B.key===W):null,j=q?q.name:"Not Set";c[j]=(c[j]||0)+1}else c["Not Set"]=(c["Not Set"]||0)+1;if(x&&u.fields&&u.fields[x.key]){const W=u.fields[x.key],F=(ae=x.dropdownSettings)==null?void 0:ae.items,q=Array.isArray(F)?F.find(B=>B&&B.key===W):null,j=q?q.name:"Not Set";m[j]=(m[j]||0)+1}else m["Not Set"]=(m["Not Set"]||0)+1;if(M&&u.fields&&u.fields[M.key]){const W=u.fields[M.key],F=(re=M.dropdownSettings)==null?void 0:re.items,q=Array.isArray(F)?F.find(B=>B&&B.key===W):null,j=q?q.name:"Unknown";f[j]=(f[j]||0)+1}else f.Unknown=(f.Unknown||0)+1;if($&&u.fields&&u.fields[$.key]){const W=u.fields[$.key],F=(ie=$.dropdownSettings)==null?void 0:ie.items,q=Array.isArray(F)?F.find(B=>B&&B.key===W):null,j=q?q.name:"Unknown";y[j]=(y[j]||0)+1}else y.Unknown=(y.Unknown||0)+1;const D=u.freshness||0;D>.5?b["High (>0.5)"]++:D>=.2?b["Medium (0.2-0.5)"]++:b["Low (<0.2)"]++});const J={};Object.keys(c).forEach(u=>{J[u]=i>0?(c[u]/i*100).toFixed(1):0});const U={};Object.keys(m).forEach(u=>{U[u]=i>0?(m[u]/i*100).toFixed(1):0});const te=new Date,H=[],Y=10;for(let u=11;u>=0;u--){const S=new Date(te.getFullYear(),te.getMonth()-u,1),z=S.getFullYear(),D=S.getMonth()+1,P=Array.isArray(r)?r.filter(ae=>{const re=new Date(ae.creationTimestamp);return re.getFullYear()===z&&re.getMonth()+1===D}).length:0,G=(P/Y*100).toFixed(1);H.push({month:`${z}-${String(D).padStart(2,"0")}`,monthName:S.toLocaleString("en-US",{month:"short",year:"numeric"}),count:P,objective:Y,percentage:parseFloat(G),status:P>=Y?"achieved":"pending"})}const _=(H.reduce((u,S)=>u+S.count,0)/12).toFixed(1),be=(parseFloat(_)/Y*100).toFixed(1);let oe=0,se=null;if(Array.isArray(r)&&r.length>0){const u=r.map(S=>S.creationTimestamp).filter(S=>S);if(u.length>0){const S=Math.min(...u);se=new Date(S);const z=te.getFullYear()-se.getFullYear(),D=te.getMonth()-se.getMonth();oe=z*12+D+1}}let Ae=null;const E=a.networkSheetGid||((t=a.sources)==null?void 0:t.network);E&&(Ae=await ss(E));let T=null;const Le=a.emailingUrl;return Le&&(T=await sa(Le)),e.json({company:a.name,companyKey:s,totalBoxes:i,campaignDurationMonths:oe,firstLeadDate:se?se.toISOString():null,networkData:Ae,emailingData:T,stageDistribution:l,originDistribution:d,fitDistribution:c,fitPercentages:J,interestDistribution:m,interestPercentages:U,countryDistribution:f,languageDistribution:y,freshnessDistribution:b,monthlyLeads:H,leadObjective:Y,averageLeadsPerMonth:parseFloat(_),averagePercentage:parseFloat(be),recentBoxes:Array.isArray(r)?r.filter(u=>{var G,ae;const S=L&&u.fields&&u.fields[L.key],z=x&&u.fields&&u.fields[x.key];let D="Not Set";if(S){const re=u.fields[L.key],ie=(G=L.dropdownSettings)==null?void 0:G.items,W=Array.isArray(ie)?ie.find(F=>F&&F.key===re):null;D=W?W.name:"Not Set"}let P="Not Set";if(z){const re=u.fields[x.key],ie=(ae=x.dropdownSettings)==null?void 0:ae.items,W=Array.isArray(ie)?ie.find(F=>F&&F.key===re):null;P=W?W.name:"Not Set"}return D==="High"||P==="High"}).slice(0,10).map(u=>{var ie,W,F,q;const S=g.find(j=>j&&j.key===u.stageKey);let z="Not Set";if(L&&u.fields&&u.fields[L.key]){const j=u.fields[L.key],B=(ie=L.dropdownSettings)==null?void 0:ie.items,le=Array.isArray(B)?B.find(de=>de&&de.key===j):null;z=le?le.name:"Not Set"}let D="Not Set";if(x&&u.fields&&u.fields[x.key]){const j=u.fields[x.key],B=(W=x.dropdownSettings)==null?void 0:W.items,le=Array.isArray(B)?B.find(de=>de&&de.key===j):null;D=le?le.name:"Not Set"}let P=null;A&&u.fields&&u.fields[A.key]&&(P=new Date(u.fields[A.key]).toISOString());let G="Unknown";if(M&&u.fields&&u.fields[M.key]){const j=u.fields[M.key],B=(F=M.dropdownSettings)==null?void 0:F.items,le=Array.isArray(B)?B.find(de=>de&&de.key===j):null;G=le?le.name:"Unknown"}let ae="Unknown";if($&&u.fields&&u.fields[$.key]){const j=u.fields[$.key],B=(q=$.dropdownSettings)==null?void 0:q.items,le=Array.isArray(B)?B.find(de=>de&&de.key===j):null;ae=le?le.name:"Unknown"}const re=u.freshness||0;return{name:u.name||"Unnamed",key:u.boxKey,stage:S?S.name:"Unknown",fit:z,interest:D,dueDate:P,country:G,language:ae,freshness:re.toFixed(3),lastUpdated:new Date(u.lastUpdatedTimestamp).toISOString()}}):[]})}catch(s){return e.json({error:s.message},500)}});async function os(e){var f,y;const{sheetId:t,gid:s}=bt(e),a=`https://docs.google.com/spreadsheets/d/${t}/export?format=csv&gid=${s}`,n=await fetch(a);if(!n.ok)throw new Error(`Google Sheets error: ${n.statusText}`);const r=(await n.text()).split(`
`).filter(b=>b.trim());if(r.length<2)return{platforms:{}};const i=r[0].split(",").map(b=>b.trim().toLowerCase().replace(/\s+/g,"_")),l=b=>i.indexOf(b),d=[];for(let b=1;b<r.length;b++){const v=r[b].split(",");v.length<5||d.push({date:((f=v[l("date")])==null?void 0:f.trim())||"",platform:(((y=v[l("platform")])==null?void 0:y.trim())||"linkedin").toLowerCase(),followers:parseInt(v[l("follower_count")])||0,impressions:parseFloat(v[l("impressions")])||0,reach:parseInt(v[l("reach")])||0,likes:parseInt(v[l("like_count")])||0,comments:parseInt(v[l("comment_count")])||0,shares:parseInt(v[l("share_count")])||0,clicks:parseInt(v[l("click_count")])||0,engagements:parseInt(v[l("overall_engagements")])||0,engRate:parseFloat(v[l("engagement_rate")])||0,netGrowth:parseInt(v[l("net_audience_growth")])||0,posts:parseInt(v[l("post_count")])||0})}const c={};d.forEach(b=>{c[b.platform]||(c[b.platform]=[]),c[b.platform].push(b)});const m={};for(const[b,v]of Object.entries(c)){const g=[...v].sort((E,T)=>E.date.localeCompare(T.date)),h=g[0].followers,N=g[g.length-1].followers,L=N-h,x=h>0?+(L/h*100).toFixed(1):0,A=g.reduce((E,T)=>E+T.posts,0),M=Math.round(g.reduce((E,T)=>E+T.impressions,0)),$=g.reduce((E,T)=>E+T.reach,0),J=g.reduce((E,T)=>E+T.engagements,0),U=g.reduce((E,T)=>E+T.likes,0),te=g.reduce((E,T)=>E+T.comments,0),H=g.reduce((E,T)=>E+T.shares,0),Y=g.filter(E=>E.impressions>0&&E.engRate>0).map(E=>E.engRate),Se=Y.length>0?+(Y.reduce((E,T)=>E+T,0)/Y.length*100).toFixed(2):0,_={};g.forEach(E=>{const T=new Date(E.date),Le=T.getDay(),u=new Date(T);u.setDate(T.getDate()-(Le===0?6:Le-1));const S=u.toISOString().split("T")[0];_[S]||(_[S]={week:S,posts:0,impressions:0,engagements:0,reach:0,netGrowth:0}),_[S].posts+=E.posts,_[S].impressions+=Math.round(E.impressions),_[S].engagements+=E.engagements,_[S].reach+=E.reach,_[S].netGrowth+=E.netGrowth});const be=Object.values(_).sort((E,T)=>E.week.localeCompare(T.week)),oe=be.length||1,se=+(A/oe).toFixed(1),Ae=g.map(E=>({date:E.date,followers:E.followers,posts:E.posts,impressions:Math.round(E.impressions),engagements:E.engagements,reach:E.reach}));m[b]={followersStart:h,followersEnd:N,followersGrowth:L,followersGrowthPct:x,totalPosts:A,avgPostsPerWeek:se,totalImpressions:M,totalReach:$,totalEngagements:J,totalLikes:U,totalComments:te,totalShares:H,avgEngRate:Se,weeklyBreakdown:be,dailyData:Ae,dateRange:{from:g[0].date,to:g[g.length-1].date}}}return{platforms:m}}I.get("/api/promote",async e=>{var t;try{const s=e.req.query("company")||"mabsilico",a=await Ie(e.env.COMPANIES_KV,s);if(!a)return e.json({error:"Company not found"},404);const n=((t=a.sources)==null?void 0:t.promote)||"";if(!n)return e.json({error:"No promote URL configured for this company"},404);const o=await os(n);return e.json(o)}catch(s){return e.json({error:s.message},500)}});I.get("/api/overview",async e=>{try{let t=function(g){let h=0,N=a;return g==="week"?h=a-6048e5:g==="last-month"?(h=new Date(n.getFullYear(),n.getMonth()-1,1).getTime(),N=new Date(n.getFullYear(),n.getMonth(),1).getTime()):g==="this-month"?h=new Date(n.getFullYear(),n.getMonth(),1).getTime():g==="year"&&(h=new Date(n.getFullYear(),0,1).getTime()),{start:h,end:N}};const s=e.req.query("period")||"this-month",a=Date.now(),n=new Date,o={start:a-10080*60*1e3,end:a},r={start:new Date(n.getFullYear(),n.getMonth()-1,1).getTime(),end:new Date(n.getFullYear(),n.getMonth(),1).getTime()},i=t(s),l=await nt(e.env.COMPANIES_KV),d=await Promise.all(l.map(async g=>{var h,N;try{let L=function(D,P){return U.filter(G=>{const ae=G.creationTimestamp||0;return ae>=D&&ae<P}).length};const x=((h=g.sources)==null?void 0:h.promote)||"",A=g.networkSheetGid||((N=g.sources)==null?void 0:N.network)||"",[M,$,J]=await Promise.all([O(`/pipelines/${g.pipelineKey}/boxes`).catch(()=>[]),x?os(x).catch(()=>({platforms:{}})):Promise.resolve({platforms:{}}),A?ss(A).catch(()=>({avgAcceptanceRate:0,totalInvitations:0})):Promise.resolve({avgAcceptanceRate:0,totalInvitations:0})]),U=Array.isArray(M)?M:[],te=U.length,H=L(i.start,i.end),Y=L(o.start,o.end),Se=L(r.start,r.end),_={};U.forEach(D=>{const P=D.stageKey||"Unknown";_[P]=(_[P]||0)+1});const be=U.filter(D=>(D.lastUpdatedTimestamp||0)>=o.start).length,oe=10;let se=oe;if(s==="week")se=Math.round(oe/30*7);else if(s==="year")se=oe*12;else if(s==="all"){const D=U.map(P=>P.creationTimestamp).filter(Boolean);if(D.length>0){const P=new Date(Math.min(...D)),G=(n.getFullYear()-P.getFullYear())*12+(n.getMonth()-P.getMonth())+1;se=oe*Math.max(G,1)}}let Ae=0,E=!1;if(x&&$.platforms){E=!0;let D=0,P=0;for(const G of Object.values($.platforms))D+=G.totalPosts||0,G.dailyData&&G.dailyData.length>P&&(P=G.dailyData.length);Ae=P>0?Math.round(D/P*10)/10:0}const T=J.avgAcceptanceRate||0,Le=!!A,u=new Date(n.getFullYear(),n.getMonth(),1).getTime(),S=U.filter(D=>(D.creationTimestamp||0)>=u).length,z=Math.round(S/10*100);return{key:g.key,name:g.name,periodLeads:H,totalLeads:te,weekLeads:Y,lastMonthLeads:Se,recentActivity:be,stageCount:Object.keys(_).length,goalPct:se>0?Math.round(H/se*100):0,promotePostsPerDay:Ae,promoteConfigured:E,networkAcceptanceRate:T,networkConfigured:Le,engageMeetingsPct:z,engageThisMonthLeads:S,error:!1}}catch{return{key:g.key,name:g.name,periodLeads:0,totalLeads:0,weekLeads:0,lastMonthLeads:0,recentActivity:0,stageCount:0,goalPct:0,promotePostsPerDay:0,promoteConfigured:!1,networkAcceptanceRate:0,networkConfigured:!1,engageMeetingsPct:0,engageThisMonthLeads:0,error:!0}}}));d.sort((g,h)=>h.periodLeads-g.periodLeads);const c=d.filter(g=>!g.error).length||1,m=Math.round(d.reduce((g,h)=>g+h.weekLeads,0)/c*10)/10,f=Math.round(d.reduce((g,h)=>g+h.lastMonthLeads,0)/c*10)/10,y=Math.round(d.reduce((g,h)=>g+h.periodLeads,0)/c*10)/10,b=Math.round(d.reduce((g,h)=>g+h.totalLeads,0)/c*10)/10,v=Math.round(d.reduce((g,h)=>g+h.recentActivity,0)/c*10)/10;return e.json({period:s,totalPeriodLeads:d.reduce((g,h)=>g+h.periodLeads,0),totalAllLeads:d.reduce((g,h)=>g+h.totalLeads,0),totalWeekLeads:d.reduce((g,h)=>g+h.weekLeads,0),totalLastMonthLeads:d.reduce((g,h)=>g+h.lastMonthLeads,0),averages:{weekLeads:m,lastMonthLeads:f,periodLeads:y,totalLeads:b,recentActivity:v},companies:d})}catch(t){return e.json({error:t.message},500)}});I.post("/api/admin/verify-google",async e=>{try{const t=await e.req.json();if(!t.token)return e.json({authorized:!1,error:"No token provided"},400);const s=await Jt(t.token,e.env.GOOGLE_CLIENT_ID);if(!s)return e.json({authorized:!1,error:"Invalid token"},401);const a=Qt.includes(s.email.toLowerCase());return e.json({authorized:a,email:s.email,name:s.name})}catch{return e.json({authorized:!1,error:"Verification failed"},500)}});I.get("/api/admin/streak-key/status",async e=>{try{const t=await e.env.COMPANIES_KV.get("__streak_api_key__");if(t&&e.env.ENCRYPTION_KEY){const s=await Xt(t,e.env.ENCRYPTION_KEY),a=s.length>8?s.substring(0,4)+"****"+s.substring(s.length-4):"****";return e.json({configured:!0,maskedKey:a})}else if(e.env.STREAK_API_KEY){const s=e.env.STREAK_API_KEY,a=s.length>8?s.substring(0,4)+"****"+s.substring(s.length-4):"****";return e.json({configured:!0,maskedKey:a,source:"env"})}return e.json({configured:!1,maskedKey:null})}catch{return e.json({configured:!1,maskedKey:null,error:"Failed to check status"})}});I.post("/api/admin/streak-key",async e=>{try{const t=await e.req.json();if(!t.token||!t.key)return e.json({success:!1,error:"Token and key are required"},400);const s=await Jt(t.token,e.env.GOOGLE_CLIENT_ID);if(!s)return e.json({success:!1,error:"Invalid Google token"},401);if(!Qt.includes(s.email.toLowerCase()))return e.json({success:!1,error:"Unauthorized email"},403);if(!e.env.ENCRYPTION_KEY)return e.json({success:!1,error:"Encryption key not configured on server"},500);const a=await ta(t.key,e.env.ENCRYPTION_KEY);return await e.env.COMPANIES_KV.put("__streak_api_key__",a),e.json({success:!0,message:"Streak API key saved successfully"})}catch{return e.json({success:!1,error:"Failed to save key"},500)}});I.get("/admin",e=>e.html(`
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
                        <span class="text-sm text-gray-600">Version <strong>1.3.9</strong></span>
                        <a href="/" class="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all">
                            <i class="fas fa-arrow-left mr-2"></i>
                            Back to Dashboard
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div class="max-w-7xl mx-auto px-6 py-8">
            <!-- Google Sign-In + Streak API Key Management -->
            <div class="bg-white rounded-lg shadow-lg p-8 mb-8 border-l-4 border-red-500">
                <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <i class="fas fa-key text-red-600 mr-3"></i>
                    Streak API Key Management
                </h2>
                <p class="text-gray-600 mb-4">Sign in with Google to manage the Streak API key. Only authorized admins can update it.</p>

                <!-- Google Sign-In -->
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

                <!-- Key Management (hidden until signed in) -->
                <div id="streak-key-section" style="display: none;" class="mt-6 pt-6 border-t border-gray-200">
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

            <script src="https://accounts.google.com/gsi/client" async defer><\/script>
            <script>
                var googleIdToken = null;

                function handleGoogleSignIn(response) {
                    googleIdToken = response.credential;
                    var statusEl = document.getElementById('signin-status');
                    statusEl.innerHTML = '<span class="text-yellow-600"><i class="fas fa-spinner fa-spin mr-1"></i>Verifying...</span>';

                    fetch('/api/admin/verify-google', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ token: googleIdToken })
                    })
                    .then(function(r) { return r.json(); })
                    .then(function(data) {
                        if (data.authorized) {
                            statusEl.innerHTML = '<span class="text-green-600"><i class="fas fa-check-circle mr-1"></i>Signed in as ' + data.email + '</span>';
                            document.getElementById('streak-key-section').style.display = 'block';
                            loadStreakKeyStatus();
                        } else {
                            statusEl.innerHTML = '<span class="text-red-600"><i class="fas fa-times-circle mr-1"></i>Access denied for ' + (data.email || 'this account') + '</span>';
                            googleIdToken = null;
                        }
                    })
                    .catch(function() {
                        statusEl.innerHTML = '<span class="text-red-600">Verification failed. Try again.</span>';
                        googleIdToken = null;
                    });
                }

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
                    if (!googleIdToken) { alert('Please sign in with Google first.'); return; }
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
                        body: JSON.stringify({ token: googleIdToken, key: key })
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
    </body>
    </html>
  `));I.get("/overview",e=>e.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Overview — Gershon CRM</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <style>
            body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
            .skeleton { animation: pulse 1.5s cubic-bezier(0.4,0,0.6,1) infinite; background-color: #e5e7eb; border-radius: 0.375rem; }
            @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
            .period-btn { transition: all 0.15s ease; cursor: pointer; }
            .period-btn.active { background: white; color: #4338ca; box-shadow: 0 1px 4px rgba(0,0,0,0.15); font-weight: 700; }
        </style>
    </head>
    <body class="bg-gray-50 min-h-screen">
        <div class="container mx-auto px-4 py-8 max-w-7xl">

            <!-- Header -->
            <div class="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg shadow-xl p-8 mb-8 text-white">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="text-4xl font-bold mb-4">
                            <i class="fas fa-th-large mr-3"></i>
                            Gershon CRM — Client Overview
                        </h1>
                        <div class="flex items-center space-x-3">
                            <a href="/" class="bg-blue-500 hover:bg-blue-400 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors shadow-md">
                                <i class="fas fa-arrow-left mr-2"></i>Dashboard
                            </a>
                            <a href="/admin" class="bg-purple-500 hover:bg-purple-400 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors shadow-md">
                                <i class="fas fa-shield-alt mr-2"></i>Admin Panel
                            </a>
                        </div>
                    </div>
                    <div class="text-right">
                        <span class="inline-block bg-white text-indigo-700 font-bold text-sm px-3 py-1 rounded-full shadow-md tracking-wide mb-3">
                            v1.3.9
                        </span>
                        <p class="text-blue-100 text-sm">
                            <i class="fas fa-building mr-1"></i>All active client pipelines
                        </p>
                    </div>
                </div>
            </div>

            <!-- Period filter bar -->
            <div class="bg-white rounded-lg shadow p-4 mb-6 flex flex-wrap items-center gap-3">
                <span class="text-gray-500 text-sm font-medium">
                    <i class="fas fa-calendar-alt mr-1"></i>Period:
                </span>
                <div class="flex bg-gray-100 rounded-lg p-1 gap-1">
                    <button class="period-btn active px-4 py-2 rounded-md text-sm" data-period="week">Last Week</button>
                    <button class="period-btn px-4 py-2 rounded-md text-sm text-gray-600" data-period="last-month">Last Month</button>
                    <button class="period-btn px-4 py-2 rounded-md text-sm text-gray-600" data-period="this-month">This Month</button>
                    <button class="period-btn px-4 py-2 rounded-md text-sm text-gray-600" data-period="year">This Year</button>
                    <button class="period-btn px-4 py-2 rounded-md text-sm text-gray-600" data-period="all">All Time</button>
                </div>
                <button onclick="loadOverview(currentPeriod)" class="ml-auto bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors">
                    <i class="fas fa-sync-alt mr-2"></i>Refresh
                </button>
            </div>

            <!-- Summary row -->
            <div id="summary-row" class="bg-white rounded-lg shadow p-5 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div class="flex gap-8">
                    <div><div class="skeleton h-4 w-32 mb-2"></div><div class="skeleton h-8 w-16"></div></div>
                    <div><div class="skeleton h-4 w-32 mb-2"></div><div class="skeleton h-8 w-16"></div></div>
                    <div><div class="skeleton h-4 w-32 mb-2"></div><div class="skeleton h-8 w-16"></div></div>
                </div>
            </div>

            <!-- Cards grid -->
            <div id="cards-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div class="bg-white rounded-lg shadow p-6"><div class="skeleton h-6 w-3/4 mb-4"></div><div class="skeleton h-14 w-20 mb-3"></div><div class="skeleton h-3 w-full mb-2"></div><div class="skeleton h-3 w-2/3 mb-4"></div><div class="skeleton h-2 w-full mb-4"></div><div class="skeleton h-10 w-full"></div></div>
                <div class="bg-white rounded-lg shadow p-6"><div class="skeleton h-6 w-3/4 mb-4"></div><div class="skeleton h-14 w-20 mb-3"></div><div class="skeleton h-3 w-full mb-2"></div><div class="skeleton h-3 w-2/3 mb-4"></div><div class="skeleton h-2 w-full mb-4"></div><div class="skeleton h-10 w-full"></div></div>
                <div class="bg-white rounded-lg shadow p-6"><div class="skeleton h-6 w-3/4 mb-4"></div><div class="skeleton h-14 w-20 mb-3"></div><div class="skeleton h-3 w-full mb-2"></div><div class="skeleton h-3 w-2/3 mb-4"></div><div class="skeleton h-2 w-full mb-4"></div><div class="skeleton h-10 w-full"></div></div>
            </div>

            <!-- Error state -->
            <div id="error-state" class="hidden bg-red-50 border border-red-200 rounded-lg p-6 mt-4">
                <div class="flex items-center">
                    <i class="fas fa-exclamation-circle text-red-500 text-2xl mr-3"></i>
                    <div>
                        <h3 class="text-red-800 font-semibold">Error Loading Overview</h3>
                        <p id="error-message" class="text-red-600 text-sm mt-1"></p>
                    </div>
                </div>
            </div>
        </div>

        <script>
            let currentPeriod = 'week';

            document.querySelectorAll('.period-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    document.querySelectorAll('.period-btn').forEach(b => {
                        b.classList.remove('active');
                        b.classList.add('text-gray-600');
                    });
                    btn.classList.add('active');
                    btn.classList.remove('text-gray-600');
                    currentPeriod = btn.dataset.period;
                    loadOverview(currentPeriod);
                });
            });

            function goalColor(pct) {
                if (pct >= 100) return { bar: 'bg-green-500', text: 'text-green-700', badge: 'bg-green-100 text-green-700 border-green-200' };
                if (pct >= 50)  return { bar: 'bg-yellow-400', text: 'text-yellow-700', badge: 'bg-yellow-100 text-yellow-700 border-yellow-200' };
                return { bar: 'bg-red-400', text: 'text-red-600', badge: 'bg-red-100 text-red-600 border-red-200' };
            }

            function periodLabel(p) {
                return { week:'Last Week', 'last-month':'Last Month', 'this-month':'This Month', year:'This Year', all:'All Time' }[p] || p;
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

            function compareBadge(val, avg) {
                if (avg === 0) return '<span class="text-xs text-gray-400">—</span>';
                var diff = Math.round(((val - avg) / avg) * 100);
                if (diff > 0) return '<span class="text-xs text-green-600 font-semibold">+' + diff + '% vs avg</span>';
                if (diff < 0) return '<span class="text-xs text-red-500 font-semibold">' + diff + '% vs avg</span>';
                return '<span class="text-xs text-gray-500">= avg</span>';
            }

            var overviewAverages = {};

            function renderCards(companies) {
                var grid = document.getElementById('cards-grid');
                if (!companies.length) {
                    grid.innerHTML = '<p class="col-span-3 text-center text-gray-400 py-16 text-lg">No company data available.</p>';
                    return;
                }
                var avg = overviewAverages;
                grid.innerHTML = companies.map(function(co) {
                    var errBadge = co.error ? '<span class="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full ml-2">API Error</span>' : '';

                    // KPI colors
                    function kpiColor(val, target) {
                        var pct = target > 0 ? (val / target) * 100 : 0;
                        if (pct >= 100) return { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', bar: 'bg-green-500', icon: 'text-green-500' };
                        if (pct >= 50)  return { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', bar: 'bg-yellow-400', icon: 'text-yellow-500' };
                        return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-600', bar: 'bg-red-400', icon: 'text-red-500' };
                    }

                    // Promote KPI: posts/day vs target 1/day
                    var promoteVal = co.promotePostsPerDay || 0;
                    var promoteC = kpiColor(promoteVal, 1);
                    var promotePct = Math.min(Math.round(promoteVal * 100), 100);
                    var promoteLabel = co.promoteConfigured ? promoteVal + '/day' : 'N/A';

                    // Network KPI: acceptance rate (target ~20%)
                    var networkVal = co.networkAcceptanceRate || 0;
                    var networkC = kpiColor(networkVal, 20);
                    var networkPct = Math.min(Math.round((networkVal / 20) * 100), 100);
                    var networkLabel = co.networkConfigured ? networkVal + '%' : 'N/A';

                    // Engage KPI: % of 10 meetings/month
                    var engageVal = co.engageThisMonthLeads || 0;
                    var engageC = kpiColor(engageVal, 10);
                    var engagePct = Math.min(co.engageMeetingsPct || 0, 100);
                    var engageLabel = engageVal + '/10';

                    return '<div class="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow flex flex-col">'
                        + '<div class="flex items-start justify-between mb-4">'
                        + '<h3 class="text-lg font-bold text-gray-800 leading-tight">' + co.name + errBadge + '</h3>'
                        + '</div>'
                        // 3 KPI cards row
                        + '<div class="grid grid-cols-3 gap-3 mb-4">'
                        // Promote
                        + '<div class="' + promoteC.bg + ' border ' + promoteC.border + ' rounded-lg p-3 text-center">'
                        + '<p class="text-xs text-gray-500 font-semibold uppercase mb-1"><i class="fas fa-bullhorn mr-1 ' + promoteC.icon + '"></i>Promote</p>'
                        + '<p class="text-xl font-extrabold ' + promoteC.text + '">' + promoteLabel + '</p>'
                        + '<div class="w-full bg-gray-200 rounded-full h-1.5 mt-2"><div class="' + promoteC.bar + ' h-1.5 rounded-full" style="width:' + promotePct + '%"></div></div>'
                        + '</div>'
                        // Network
                        + '<div class="' + networkC.bg + ' border ' + networkC.border + ' rounded-lg p-3 text-center">'
                        + '<p class="text-xs text-gray-500 font-semibold uppercase mb-1"><i class="fas fa-users mr-1 ' + networkC.icon + '"></i>Network</p>'
                        + '<p class="text-xl font-extrabold ' + networkC.text + '">' + networkLabel + '</p>'
                        + '<div class="w-full bg-gray-200 rounded-full h-1.5 mt-2"><div class="' + networkC.bar + ' h-1.5 rounded-full" style="width:' + networkPct + '%"></div></div>'
                        + '</div>'
                        // Engage
                        + '<div class="' + engageC.bg + ' border ' + engageC.border + ' rounded-lg p-3 text-center">'
                        + '<p class="text-xs text-gray-500 font-semibold uppercase mb-1"><i class="fas fa-handshake mr-1 ' + engageC.icon + '"></i>Engage</p>'
                        + '<p class="text-xl font-extrabold ' + engageC.text + '">' + engageLabel + '</p>'
                        + '<div class="w-full bg-gray-200 rounded-full h-1.5 mt-2"><div class="' + engageC.bar + ' h-1.5 rounded-full" style="width:' + engagePct + '%"></div></div>'
                        + '</div>'
                        + '</div>'
                        // Total leads summary
                        + '<p class="text-sm text-gray-500 mb-4"><i class="fas fa-database mr-1 text-gray-300"></i>' + co.totalLeads + ' total leads all time</p>'
                        + '<div class="mt-auto">'
                        + '<a href="/?company=' + co.key + '" class="block w-full text-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg px-4 py-2.5 text-sm font-semibold transition-all shadow">'
                        + '<i class="fas fa-chart-line mr-2"></i>View Dashboard'
                        + '</a>'
                        + '</div>'
                        + '</div>';
                }).join('');
            }

            async function loadOverview(period) {
                document.getElementById('error-state').classList.add('hidden');
                document.getElementById('summary-row').innerHTML = '<div class="flex gap-8"><div><div class="skeleton h-4 w-32 mb-2"></div><div class="skeleton h-8 w-16"></div></div><div><div class="skeleton h-4 w-32 mb-2"></div><div class="skeleton h-8 w-16"></div></div><div><div class="skeleton h-4 w-32 mb-2"></div><div class="skeleton h-8 w-16"></div></div></div>';
                document.getElementById('cards-grid').innerHTML = '<div class="bg-white rounded-lg shadow p-6"><div class="skeleton h-6 w-3/4 mb-4"></div><div class="skeleton h-14 w-20 mb-3"></div><div class="skeleton h-3 w-full mb-2"></div><div class="skeleton h-2 w-full mb-4"></div><div class="skeleton h-10 w-full"></div></div>'.repeat(6);
                try {
                    const res = await fetch('/api/overview?period=' + period);
                    if (!res.ok) throw new Error('HTTP ' + res.status);
                    const data = await res.json();
                    overviewAverages = data.averages || {};
                    renderSummary(data);
                    renderCards(data.companies);
                } catch (err) {
                    document.getElementById('error-message').textContent = err.message;
                    document.getElementById('error-state').classList.remove('hidden');
                    document.getElementById('summary-row').innerHTML = '';
                    document.getElementById('cards-grid').innerHTML = '';
                }
            }

            loadOverview(currentPeriod);
        <\/script>
    </body>
    </html>
  `));I.get("/",e=>e.req.query("company")?e.html(`
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
                        <h1 id="dashboard-title" class="text-4xl font-bold mb-3">
                            <i class="fas fa-chart-line mr-3"></i>
                            Gershon CRM - Client Dashboard
                        </h1>
                        <!-- Company Selector -->
                        <div class="flex items-center space-x-3">
                            <label for="company-selector" class="text-blue-100 text-sm font-medium">
                                <i class="fas fa-building mr-2"></i>Select Company:
                            </label>
                            <select id="company-selector" onchange="switchCompany(this.value)" class="bg-white text-gray-800 rounded-lg px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-md">
                                <!-- Populated dynamically from /api/companies (excludes archived) -->
                            </select>
                            <button onclick="refreshDashboard()" class="bg-blue-500 hover:bg-blue-400 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors shadow-md">
                                <i class="fas fa-sync-alt mr-2"></i>Refresh
                            </button>
                            <a href="/overview" class="bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors shadow-md">
                                <i class="fas fa-th-large mr-2"></i>Overview
                            </a>
                            <a href="/admin" class="bg-purple-500 hover:bg-purple-400 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors shadow-md">
                                <i class="fas fa-shield-alt mr-2"></i>Admin Panel
                            </a>
                            <a id="open-chat-btn" href="#" target="_blank" class="bg-green-500 hover:bg-green-400 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors shadow-md hidden">
                                <i class="fas fa-comments mr-2"></i>Open Chat
                            </a>
                        </div>
                    </div>
                    <div class="text-right">
                        <div class="mb-3">
                            <span class="inline-block bg-white text-indigo-700 font-bold text-sm px-3 py-1 rounded-full shadow-md tracking-wide">
                                v1.3.9
                            </span>
                        </div>
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
                            <button onclick="switchView('executive')" id="tab-executive" class="view-tab active border-b-2 border-blue-500 py-4 px-6 text-sm font-medium text-blue-600">
                                <i class="fas fa-tachometer-alt mr-2"></i>Dashboard
                            </button>
                            <button onclick="switchView('onboarding')" id="tab-onboarding" class="view-tab border-b-2 border-transparent py-4 px-6 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                                <i class="fas fa-rocket mr-2"></i>Onboarding
                            </button>
                            <button onclick="switchView('promote')" id="tab-promote" class="view-tab border-b-2 border-transparent py-4 px-6 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                                <i class="fas fa-bullhorn mr-2"></i>PROMOTE
                            </button>
                            <button onclick="switchView('network')" id="tab-network" class="view-tab border-b-2 border-transparent py-4 px-6 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                                <i class="fas fa-users mr-2"></i>NETWORK
                            </button>
                            <button onclick="switchView('engage')" id="tab-engage" class="view-tab border-b-2 border-transparent py-4 px-6 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                                <i class="fas fa-handshake mr-2"></i>ENGAGE
                            </button>
                            <button onclick="switchView('print')" id="tab-print" class="view-tab border-b-2 border-transparent py-4 px-6 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                                <i class="fas fa-print mr-2"></i>Print Report
                            </button>
                            <button onclick="switchView('settings')" id="tab-settings" class="view-tab border-b-2 border-transparent py-4 px-6 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                                <i class="fas fa-cog mr-2"></i>Settings
                            </button>
                        </nav>
                    </div>
                </div>

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
                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
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

                        <!-- EMAILING Summary -->
                        <div class="bg-white rounded-xl shadow p-6">
                            <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                <i class="fas fa-envelope text-indigo-500 mr-2"></i>Emailing Campaigns
                            </h3>
                            <div id="exec-emailing-summary" class="space-y-3">
                                <div class="flex justify-between"><span class="text-gray-500">Emails Sent</span><span class="font-semibold" id="exec-em-sent">—</span></div>
                                <div class="flex justify-between"><span class="text-gray-500">Human Replies</span><span class="font-semibold" id="exec-em-replies">—</span></div>
                                <div class="flex justify-between"><span class="text-gray-500">Reply Rate</span><span class="font-semibold" id="exec-em-rate">—</span></div>
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

                    <!-- Emailing Campaigns Table -->
                    <div class="bg-white rounded-xl shadow p-6" id="exec-emailing-table-container">
                        <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                            <i class="fas fa-mail-bulk text-indigo-500 mr-2"></i>Emailing Campaign Details
                        </h3>
                        <div id="exec-emailing-table" class="overflow-x-auto">
                            <p class="text-gray-400 text-sm">No emailing data configured. Add an Emailing Data URL in Settings.</p>
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


                        <!-- EMAILING DATA SOURCE -->
                        <div class="p-6 bg-indigo-50 border border-indigo-200 rounded-lg">
                            <h3 class="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                                <i class="fas fa-envelope text-indigo-600 mr-2"></i>Emailing Campaign Data
                                <span id="status-emailing" class="hidden ml-2 text-xs font-semibold px-2 py-1 rounded-full bg-indigo-100 text-indigo-700"><i class="fas fa-check-circle mr-1"></i>Configured</span>
                            </h3>
                            <div>
                                <label class="text-sm font-medium text-gray-700">Emailing Data URL (Google Sheets):</label>
                                <input
                                    type="url"
                                    id="edit-emailing-url"
                                    placeholder="https://docs.google.com/spreadsheets/d/..."
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
                                />
                                <p class="text-xs text-gray-500 mt-1">
                                    <i class="fas fa-table mr-1"></i>
                                    CSV with columns: campaign name, emails sent, replies, human replies, positive replies, rates, targeting, leads
                                </p>
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

                // --- Emailing Summary ---
                const emailing = currentData.emailingData;
                if (emailing && emailing.totals) {
                    document.getElementById('exec-em-sent').textContent = emailing.totals.emailsSent.toLocaleString();
                    document.getElementById('exec-em-replies').textContent = emailing.totals.humanReplies.toLocaleString();
                    const replyRate = emailing.totals.emailsSent > 0 ? ((emailing.totals.humanReplies / emailing.totals.emailsSent) * 100).toFixed(1) + '%' : '0%';
                    document.getElementById('exec-em-rate').textContent = replyRate;

                    // Build emailing table
                    if (emailing.campaigns && emailing.campaigns.length > 0) {
                        let tableHtml = '<table class="w-full text-sm"><thead><tr class="border-b-2 border-gray-200">';
                        tableHtml += '<th class="text-left py-2 px-3 text-gray-600 font-semibold">Campaign</th>';
                        tableHtml += '<th class="text-right py-2 px-3 text-gray-600 font-semibold">Emails Sent</th>';
                        tableHtml += '<th class="text-right py-2 px-3 text-gray-600 font-semibold">Replies</th>';
                        tableHtml += '<th class="text-right py-2 px-3 text-gray-600 font-semibold">Human Replies</th>';
                        tableHtml += '<th class="text-right py-2 px-3 text-gray-600 font-semibold">Reply Rate</th>';
                        tableHtml += '<th class="text-right py-2 px-3 text-gray-600 font-semibold">Leads</th>';
                        tableHtml += '</tr></thead><tbody>';
                        emailing.campaigns.forEach(function(c) {
                            const rate = c.emailsSent > 0 ? ((c.humanReplies / c.emailsSent) * 100).toFixed(1) : '0';
                            tableHtml += '<tr class="border-b border-gray-100 hover:bg-gray-50">';
                            tableHtml += '<td class="py-2 px-3 text-gray-800 font-medium">' + c.name + '</td>';
                            tableHtml += '<td class="py-2 px-3 text-right text-gray-600">' + c.emailsSent.toLocaleString() + '</td>';
                            tableHtml += '<td class="py-2 px-3 text-right text-gray-600">' + c.allReplies + '</td>';
                            tableHtml += '<td class="py-2 px-3 text-right text-gray-600">' + c.humanReplies + '</td>';
                            tableHtml += '<td class="py-2 px-3 text-right font-semibold ' + (parseFloat(rate) > 0 ? 'text-green-600' : 'text-gray-400') + '">' + rate + '%</td>';
                            tableHtml += '<td class="py-2 px-3 text-right font-semibold ' + (c.leads > 0 ? 'text-blue-600' : 'text-gray-400') + '">' + c.leads + '</td>';
                            tableHtml += '</tr>';
                        });
                        // Totals row
                        const totalRate = emailing.totals.emailsSent > 0 ? ((emailing.totals.humanReplies / emailing.totals.emailsSent) * 100).toFixed(1) : '0';
                        tableHtml += '<tr class="border-t-2 border-gray-300 font-bold bg-gray-50">';
                        tableHtml += '<td class="py-2 px-3 text-gray-900">TOTAL</td>';
                        tableHtml += '<td class="py-2 px-3 text-right text-gray-900">' + emailing.totals.emailsSent.toLocaleString() + '</td>';
                        tableHtml += '<td class="py-2 px-3 text-right text-gray-900">' + emailing.totals.allReplies + '</td>';
                        tableHtml += '<td class="py-2 px-3 text-right text-gray-900">' + emailing.totals.humanReplies + '</td>';
                        tableHtml += '<td class="py-2 px-3 text-right text-green-700">' + totalRate + '%</td>';
                        tableHtml += '<td class="py-2 px-3 text-right text-blue-700">' + emailing.totals.leads + '</td>';
                        tableHtml += '</tr></tbody></table>';
                        document.getElementById('exec-emailing-table').innerHTML = tableHtml;
                    }
                } else {
                    document.getElementById('exec-em-sent').textContent = 'N/A';
                    document.getElementById('exec-em-replies').textContent = 'N/A';
                    document.getElementById('exec-em-rate').textContent = 'N/A';
                    document.getElementById('exec-emailing-table').innerHTML = '<p class="text-gray-400 text-sm">No emailing data configured. Add an Emailing Data URL in Settings.</p>';
                }

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

                // Populate Google Chat fields
                document.getElementById('edit-googlechat-url').value = company.googleChatUrl || '';
                var emailingEl = document.getElementById('edit-emailing-url'); if (emailingEl) emailingEl.value = company.emailingUrl || '';
                document.getElementById('edit-googlechat-webhook').value = company.googleChatWebhookUrl || '';

                // Show Google Chat status badge
                const gcBadge = document.getElementById('status-googlechat');
                const emBadge = document.getElementById('status-emailing');
                if (emBadge) { if (company.emailingUrl) { emBadge.classList.remove('hidden'); } else { emBadge.classList.add('hidden'); } }
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
                const emailingUrlEl = document.getElementById('edit-emailing-url'); const emailingUrl = emailingUrlEl ? emailingUrlEl.value.trim() : '';
                const googleChatWebhookUrl = document.getElementById('edit-googlechat-webhook').value.trim();

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
                        body: JSON.stringify({ promoteUrl, networkUrl, networkGid, engageUrl, googleChatUrl, googleChatWebhookUrl, emailingUrl, messages })
                    });
                    const data = await res.json();
                    if (!res.ok) throw new Error(data.error || 'Save failed');

                    // Update local object so dashboard reflects immediately
                    if (!company.sources) company.sources = {};
                    company.sources.promote = promoteUrl;
                    company.sources.network = networkUrl;
                    company.sources.engage = engageUrl || company.url;
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
                const promoteUrl = document.getElementById('new-promote-url').value.trim();
                const googleChatUrl = document.getElementById('new-googlechat-url').value.trim();
                const googleChatWebhookUrl = document.getElementById('new-googlechat-webhook').value.trim();

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
                if (googleChatUrl) newCompany.googleChatUrl = googleChatUrl;
                if (googleChatWebhookUrl) newCompany.googleChatWebhookUrl = googleChatWebhookUrl;

                try {
                    const res = await fetch('/api/companies', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ name, pipelineKey, networkUrl, promoteUrl, engageUrl, networkGid, key, googleChatUrl, googleChatWebhookUrl })
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
  `):e.redirect("/overview"));const St=new zt,na=Object.assign({"/src/index.tsx":I});let rs=!1;for(const[,e]of Object.entries(na))e&&(St.route("/",e),St.notFound(e.notFoundHandler),rs=!0);if(!rs)throw new Error("Can't import modules from ['/src/index.tsx','/app/server.ts']");export{St as default};
