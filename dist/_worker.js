var Xt=Object.defineProperty;var ft=e=>{throw TypeError(e)};var Jt=(e,t,s)=>t in e?Xt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;var w=(e,t,s)=>Jt(e,typeof t!="symbol"?t+"":t,s),dt=(e,t,s)=>t.has(e)||ft("Cannot "+s);var m=(e,t,s)=>(dt(e,t,"read from private field"),s?s.call(e):t.get(e)),C=(e,t,s)=>t.has(e)?ft("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,s),x=(e,t,s,a)=>(dt(e,t,"write to private field"),a?a.call(e,s):t.set(e,s),s),L=(e,t,s)=>(dt(e,t,"access private method"),s);var ht=(e,t,s,a)=>({set _(n){x(e,t,n,s)},get _(){return m(e,t,a)}});var yt=(e,t,s)=>(a,n)=>{let o=-1;return r(0);async function r(l){if(l<=o)throw new Error("next() called multiple times");o=l;let i,d=!1,c;if(e[l]?(c=e[l][0][0],a.req.routeIndex=l):c=l===e.length&&n||void 0,c)try{i=await c(a,()=>r(l+1))}catch(g){if(g instanceof Error&&t)a.error=g,i=await t(g,a),d=!0;else throw g}else a.finalized===!1&&s&&(i=await s(a));return i&&(a.finalized===!1||d)&&(a.res=i),a}},es=Symbol(),ts=async(e,t=Object.create(null))=>{const{all:s=!1,dot:a=!1}=t,o=(e instanceof Dt?e.raw.headers:e.headers).get("Content-Type");return o!=null&&o.startsWith("multipart/form-data")||o!=null&&o.startsWith("application/x-www-form-urlencoded")?ss(e,{all:s,dot:a}):{}};async function ss(e,t){const s=await e.formData();return s?as(s,t):{}}function as(e,t){const s=Object.create(null);return e.forEach((a,n)=>{t.all||n.endsWith("[]")?ns(s,n,a):s[n]=a}),t.dot&&Object.entries(s).forEach(([a,n])=>{a.includes(".")&&(os(s,a,n),delete s[a])}),s}var ns=(e,t,s)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(s):e[t]=[e[t],s]:t.endsWith("[]")?e[t]=[s]:e[t]=s},os=(e,t,s)=>{let a=e;const n=t.split(".");n.forEach((o,r)=>{r===n.length-1?a[o]=s:((!a[o]||typeof a[o]!="object"||Array.isArray(a[o])||a[o]instanceof File)&&(a[o]=Object.create(null)),a=a[o])})},Mt=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},rs=e=>{const{groups:t,path:s}=is(e),a=Mt(s);return ls(a,t)},is=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(s,a)=>{const n=`@${a}`;return t.push([n,s]),n}),{groups:t,path:e}},ls=(e,t)=>{for(let s=t.length-1;s>=0;s--){const[a]=t[s];for(let n=e.length-1;n>=0;n--)if(e[n].includes(a)){e[n]=e[n].replace(a,t[s][1]);break}}return e},tt={},ds=(e,t)=>{if(e==="*")return"*";const s=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(s){const a=`${e}#${t}`;return tt[a]||(s[2]?tt[a]=t&&t[0]!==":"&&t[0]!=="*"?[a,s[1],new RegExp(`^${s[2]}(?=/${t})`)]:[e,s[1],new RegExp(`^${s[2]}$`)]:tt[a]=[e,s[1],!0]),tt[a]}return null},gt=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,s=>{try{return t(s)}catch{return s}})}},cs=e=>gt(e,decodeURI),Nt=e=>{const t=e.url,s=t.indexOf("/",t.indexOf(":")+4);let a=s;for(;a<t.length;a++){const n=t.charCodeAt(a);if(n===37){const o=t.indexOf("?",a),r=t.slice(s,o===-1?void 0:o);return cs(r.includes("%25")?r.replace(/%25/g,"%2525"):r)}else if(n===63)break}return t.slice(s,a)},ms=e=>{const t=Nt(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},Te=(e,t,...s)=>(s.length&&(t=Te(t,...s)),`${(e==null?void 0:e[0])==="/"?"":"/"}${e}${t==="/"?"":`${(e==null?void 0:e.at(-1))==="/"?"":"/"}${(t==null?void 0:t[0])==="/"?t.slice(1):t}`}`),Rt=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),s=[];let a="";return t.forEach(n=>{if(n!==""&&!/\:/.test(n))a+="/"+n;else if(/\:/.test(n))if(/\?/.test(n)){s.length===0&&a===""?s.push("/"):s.push(a);const o=n.replace("?","");a+="/"+o,s.push(a)}else a+="/"+n}),s.filter((n,o,r)=>r.indexOf(n)===o)},ct=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?gt(e,Pt):e):e,Tt=(e,t,s)=>{let a;if(!s&&t&&!/[%+]/.test(t)){let r=e.indexOf("?",8);if(r===-1)return;for(e.startsWith(t,r+1)||(r=e.indexOf(`&${t}`,r+1));r!==-1;){const l=e.charCodeAt(r+t.length+1);if(l===61){const i=r+t.length+2,d=e.indexOf("&",i);return ct(e.slice(i,d===-1?void 0:d))}else if(l==38||isNaN(l))return"";r=e.indexOf(`&${t}`,r+1)}if(a=/[%+]/.test(e),!a)return}const n={};a??(a=/[%+]/.test(e));let o=e.indexOf("?",8);for(;o!==-1;){const r=e.indexOf("&",o+1);let l=e.indexOf("=",o);l>r&&r!==-1&&(l=-1);let i=e.slice(o+1,l===-1?r===-1?void 0:r:l);if(a&&(i=ct(i)),o=r,i==="")continue;let d;l===-1?d="":(d=e.slice(l+1,r===-1?void 0:r),a&&(d=ct(d))),s?(n[i]&&Array.isArray(n[i])||(n[i]=[]),n[i].push(d)):n[i]??(n[i]=d)}return t?n[t]:n},ps=Tt,gs=(e,t)=>Tt(e,t,!0),Pt=decodeURIComponent,bt=e=>gt(e,Pt),Oe,J,ue,Ot,$t,pt,fe,Et,Dt=(Et=class{constructor(e,t="/",s=[[]]){C(this,ue);w(this,"raw");C(this,Oe);C(this,J);w(this,"routeIndex",0);w(this,"path");w(this,"bodyCache",{});C(this,fe,e=>{const{bodyCache:t,raw:s}=this,a=t[e];if(a)return a;const n=Object.keys(t)[0];return n?t[n].then(o=>(n==="json"&&(o=JSON.stringify(o)),new Response(o)[e]())):t[e]=s[e]()});this.raw=e,this.path=t,x(this,J,s),x(this,Oe,{})}param(e){return e?L(this,ue,Ot).call(this,e):L(this,ue,$t).call(this)}query(e){return ps(this.url,e)}queries(e){return gs(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((s,a)=>{t[a]=s}),t}async parseBody(e){var t;return(t=this.bodyCache).parsedBody??(t.parsedBody=await ts(this,e))}json(){return m(this,fe).call(this,"text").then(e=>JSON.parse(e))}text(){return m(this,fe).call(this,"text")}arrayBuffer(){return m(this,fe).call(this,"arrayBuffer")}blob(){return m(this,fe).call(this,"blob")}formData(){return m(this,fe).call(this,"formData")}addValidatedData(e,t){m(this,Oe)[e]=t}valid(e){return m(this,Oe)[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[es](){return m(this,J)}get matchedRoutes(){return m(this,J)[0].map(([[,e]])=>e)}get routePath(){return m(this,J)[0].map(([[,e]])=>e)[this.routeIndex].path}},Oe=new WeakMap,J=new WeakMap,ue=new WeakSet,Ot=function(e){const t=m(this,J)[0][this.routeIndex][1][e],s=L(this,ue,pt).call(this,t);return s&&/\%/.test(s)?bt(s):s},$t=function(){const e={},t=Object.keys(m(this,J)[0][this.routeIndex][1]);for(const s of t){const a=L(this,ue,pt).call(this,m(this,J)[0][this.routeIndex][1][s]);a!==void 0&&(e[s]=/\%/.test(a)?bt(a):a)}return e},pt=function(e){return m(this,J)[1]?m(this,J)[1][e]:e},fe=new WeakMap,Et),us={Stringify:1},jt=async(e,t,s,a,n)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const o=e.callbacks;return o!=null&&o.length?(n?n[0]+=e:n=[e],Promise.all(o.map(l=>l({phase:t,buffer:n,context:a}))).then(l=>Promise.all(l.filter(Boolean).map(i=>jt(i,t,!1,a,n))).then(()=>n[0]))):Promise.resolve(e)},fs="text/plain; charset=UTF-8",mt=(e,t)=>({"Content-Type":e,...t}),Ve,_e,ce,$e,me,_,ze,je,Be,Ce,Qe,qe,he,Pe,Ct,hs=(Ct=class{constructor(e,t){C(this,he);C(this,Ve);C(this,_e);w(this,"env",{});C(this,ce);w(this,"finalized",!1);w(this,"error");C(this,$e);C(this,me);C(this,_);C(this,ze);C(this,je);C(this,Be);C(this,Ce);C(this,Qe);C(this,qe);w(this,"render",(...e)=>(m(this,je)??x(this,je,t=>this.html(t)),m(this,je).call(this,...e)));w(this,"setLayout",e=>x(this,ze,e));w(this,"getLayout",()=>m(this,ze));w(this,"setRenderer",e=>{x(this,je,e)});w(this,"header",(e,t,s)=>{this.finalized&&x(this,_,new Response(m(this,_).body,m(this,_)));const a=m(this,_)?m(this,_).headers:m(this,Ce)??x(this,Ce,new Headers);t===void 0?a.delete(e):s!=null&&s.append?a.append(e,t):a.set(e,t)});w(this,"status",e=>{x(this,$e,e)});w(this,"set",(e,t)=>{m(this,ce)??x(this,ce,new Map),m(this,ce).set(e,t)});w(this,"get",e=>m(this,ce)?m(this,ce).get(e):void 0);w(this,"newResponse",(...e)=>L(this,he,Pe).call(this,...e));w(this,"body",(e,t,s)=>L(this,he,Pe).call(this,e,t,s));w(this,"text",(e,t,s)=>!m(this,Ce)&&!m(this,$e)&&!t&&!s&&!this.finalized?new Response(e):L(this,he,Pe).call(this,e,t,mt(fs,s)));w(this,"json",(e,t,s)=>L(this,he,Pe).call(this,JSON.stringify(e),t,mt("application/json",s)));w(this,"html",(e,t,s)=>{const a=n=>L(this,he,Pe).call(this,n,t,mt("text/html; charset=UTF-8",s));return typeof e=="object"?jt(e,us.Stringify,!1,{}).then(a):a(e)});w(this,"redirect",(e,t)=>{const s=String(e);return this.header("Location",/[^\x00-\xFF]/.test(s)?encodeURI(s):s),this.newResponse(null,t??302)});w(this,"notFound",()=>(m(this,Be)??x(this,Be,()=>new Response),m(this,Be).call(this,this)));x(this,Ve,e),t&&(x(this,me,t.executionCtx),this.env=t.env,x(this,Be,t.notFoundHandler),x(this,qe,t.path),x(this,Qe,t.matchResult))}get req(){return m(this,_e)??x(this,_e,new Dt(m(this,Ve),m(this,qe),m(this,Qe))),m(this,_e)}get event(){if(m(this,me)&&"respondWith"in m(this,me))return m(this,me);throw Error("This context has no FetchEvent")}get executionCtx(){if(m(this,me))return m(this,me);throw Error("This context has no ExecutionContext")}get res(){return m(this,_)||x(this,_,new Response(null,{headers:m(this,Ce)??x(this,Ce,new Headers)}))}set res(e){if(m(this,_)&&e){e=new Response(e.body,e);for(const[t,s]of m(this,_).headers.entries())if(t!=="content-type")if(t==="set-cookie"){const a=m(this,_).headers.getSetCookie();e.headers.delete("set-cookie");for(const n of a)e.headers.append("set-cookie",n)}else e.headers.set(t,s)}x(this,_,e),this.finalized=!0}get var(){return m(this,ce)?Object.fromEntries(m(this,ce)):{}}},Ve=new WeakMap,_e=new WeakMap,ce=new WeakMap,$e=new WeakMap,me=new WeakMap,_=new WeakMap,ze=new WeakMap,je=new WeakMap,Be=new WeakMap,Ce=new WeakMap,Qe=new WeakMap,qe=new WeakMap,he=new WeakSet,Pe=function(e,t,s){const a=m(this,_)?new Headers(m(this,_).headers):m(this,Ce)??new Headers;if(typeof t=="object"&&"headers"in t){const o=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[r,l]of o)r.toLowerCase()==="set-cookie"?a.append(r,l):a.set(r,l)}if(s)for(const[o,r]of Object.entries(s))if(typeof r=="string")a.set(o,r);else{a.delete(o);for(const l of r)a.append(o,l)}const n=typeof t=="number"?t:(t==null?void 0:t.status)??m(this,$e);return new Response(e,{status:n,headers:a})},Ct),F="ALL",ys="all",bs=["get","post","put","delete","options","patch"],Bt="Can not add a route since the matcher is already built.",Ft=class extends Error{},xs="__COMPOSED_HANDLER",vs=e=>e.text("404 Not Found",404),xt=(e,t)=>{if("getResponse"in e){const s=e.getResponse();return t.newResponse(s.body,s)}return console.error(e),t.text("Internal Server Error",500)},oe,G,Gt,re,ke,st,at,Fe,ws=(Fe=class{constructor(t={}){C(this,G);w(this,"get");w(this,"post");w(this,"put");w(this,"delete");w(this,"options");w(this,"patch");w(this,"all");w(this,"on");w(this,"use");w(this,"router");w(this,"getPath");w(this,"_basePath","/");C(this,oe,"/");w(this,"routes",[]);C(this,re,vs);w(this,"errorHandler",xt);w(this,"onError",t=>(this.errorHandler=t,this));w(this,"notFound",t=>(x(this,re,t),this));w(this,"fetch",(t,...s)=>L(this,G,at).call(this,t,s[1],s[0],t.method));w(this,"request",(t,s,a,n)=>t instanceof Request?this.fetch(s?new Request(t,s):t,a,n):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${Te("/",t)}`,s),a,n)));w(this,"fire",()=>{addEventListener("fetch",t=>{t.respondWith(L(this,G,at).call(this,t.request,t,void 0,t.request.method))})});[...bs,ys].forEach(o=>{this[o]=(r,...l)=>(typeof r=="string"?x(this,oe,r):L(this,G,ke).call(this,o,m(this,oe),r),l.forEach(i=>{L(this,G,ke).call(this,o,m(this,oe),i)}),this)}),this.on=(o,r,...l)=>{for(const i of[r].flat()){x(this,oe,i);for(const d of[o].flat())l.map(c=>{L(this,G,ke).call(this,d.toUpperCase(),m(this,oe),c)})}return this},this.use=(o,...r)=>(typeof o=="string"?x(this,oe,o):(x(this,oe,"*"),r.unshift(o)),r.forEach(l=>{L(this,G,ke).call(this,F,m(this,oe),l)}),this);const{strict:a,...n}=t;Object.assign(this,n),this.getPath=a??!0?t.getPath??Nt:ms}route(t,s){const a=this.basePath(t);return s.routes.map(n=>{var r;let o;s.errorHandler===xt?o=n.handler:(o=async(l,i)=>(await yt([],s.errorHandler)(l,()=>n.handler(l,i))).res,o[xs]=n.handler),L(r=a,G,ke).call(r,n.method,n.path,o)}),this}basePath(t){const s=L(this,G,Gt).call(this);return s._basePath=Te(this._basePath,t),s}mount(t,s,a){let n,o;a&&(typeof a=="function"?o=a:(o=a.optionHandler,a.replaceRequest===!1?n=i=>i:n=a.replaceRequest));const r=o?i=>{const d=o(i);return Array.isArray(d)?d:[d]}:i=>{let d;try{d=i.executionCtx}catch{}return[i.env,d]};n||(n=(()=>{const i=Te(this._basePath,t),d=i==="/"?0:i.length;return c=>{const g=new URL(c.url);return g.pathname=g.pathname.slice(d)||"/",new Request(g,c)}})());const l=async(i,d)=>{const c=await s(n(i.req.raw),...r(i));if(c)return c;await d()};return L(this,G,ke).call(this,F,Te(t,"*"),l),this}},oe=new WeakMap,G=new WeakSet,Gt=function(){const t=new Fe({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,x(t,re,m(this,re)),t.routes=this.routes,t},re=new WeakMap,ke=function(t,s,a){t=t.toUpperCase(),s=Te(this._basePath,s);const n={basePath:this._basePath,path:s,method:t,handler:a};this.router.add(t,s,[a,n]),this.routes.push(n)},st=function(t,s){if(t instanceof Error)return this.errorHandler(t,s);throw t},at=function(t,s,a,n){if(n==="HEAD")return(async()=>new Response(null,await L(this,G,at).call(this,t,s,a,"GET")))();const o=this.getPath(t,{env:a}),r=this.router.match(n,o),l=new hs(t,{path:o,matchResult:r,env:a,executionCtx:s,notFoundHandler:m(this,re)});if(r[0].length===1){let d;try{d=r[0][0][0][0](l,async()=>{l.res=await m(this,re).call(this,l)})}catch(c){return L(this,G,st).call(this,c,l)}return d instanceof Promise?d.then(c=>c||(l.finalized?l.res:m(this,re).call(this,l))).catch(c=>L(this,G,st).call(this,c,l)):d??m(this,re).call(this,l)}const i=yt(r[0],this.errorHandler,m(this,re));return(async()=>{try{const d=await i(l);if(!d.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return d.res}catch(d){return L(this,G,st).call(this,d,l)}})()},Fe),Ut=[];function ks(e,t){const s=this.buildAllMatchers(),a=((n,o)=>{const r=s[n]||s[F],l=r[2][o];if(l)return l;const i=o.match(r[0]);if(!i)return[[],Ut];const d=i.indexOf("",1);return[r[1][d],i]});return this.match=a,a(e,t)}var ot="[^/]+",He=".*",Ke="(?:|/.*)",De=Symbol(),Es=new Set(".\\+*[^]$()");function Cs(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===He||e===Ke?1:t===He||t===Ke?-1:e===ot?1:t===ot?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var Ie,Se,ie,Me,Is=(Me=class{constructor(){C(this,Ie);C(this,Se);C(this,ie,Object.create(null))}insert(t,s,a,n,o){if(t.length===0){if(m(this,Ie)!==void 0)throw De;if(o)return;x(this,Ie,s);return}const[r,...l]=t,i=r==="*"?l.length===0?["","",He]:["","",ot]:r==="/*"?["","",Ke]:r.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let d;if(i){const c=i[1];let g=i[2]||ot;if(c&&i[2]&&(g===".*"||(g=g.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(g))))throw De;if(d=m(this,ie)[g],!d){if(Object.keys(m(this,ie)).some(u=>u!==He&&u!==Ke))throw De;if(o)return;d=m(this,ie)[g]=new Me,c!==""&&x(d,Se,n.varIndex++)}!o&&c!==""&&a.push([c,m(d,Se)])}else if(d=m(this,ie)[r],!d){if(Object.keys(m(this,ie)).some(c=>c.length>1&&c!==He&&c!==Ke))throw De;if(o)return;d=m(this,ie)[r]=new Me}d.insert(l,s,a,n,o)}buildRegExpStr(){const s=Object.keys(m(this,ie)).sort(Cs).map(a=>{const n=m(this,ie)[a];return(typeof m(n,Se)=="number"?`(${a})@${m(n,Se)}`:Es.has(a)?`\\${a}`:a)+n.buildRegExpStr()});return typeof m(this,Ie)=="number"&&s.unshift(`#${m(this,Ie)}`),s.length===0?"":s.length===1?s[0]:"(?:"+s.join("|")+")"}},Ie=new WeakMap,Se=new WeakMap,ie=new WeakMap,Me),rt,Ze,It,Ss=(It=class{constructor(){C(this,rt,{varIndex:0});C(this,Ze,new Is)}insert(e,t,s){const a=[],n=[];for(let r=0;;){let l=!1;if(e=e.replace(/\{[^}]+\}/g,i=>{const d=`@\\${r}`;return n[r]=[d,i],r++,l=!0,d}),!l)break}const o=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let r=n.length-1;r>=0;r--){const[l]=n[r];for(let i=o.length-1;i>=0;i--)if(o[i].indexOf(l)!==-1){o[i]=o[i].replace(l,n[r][1]);break}}return m(this,Ze).insert(o,t,a,m(this,rt),s),a}buildRegExp(){let e=m(this,Ze).buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const s=[],a=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(n,o,r)=>o!==void 0?(s[++t]=Number(o),"$()"):(r!==void 0&&(a[Number(r)]=++t),"")),[new RegExp(`^${e}`),s,a]}},rt=new WeakMap,Ze=new WeakMap,It),As=[/^$/,[],Object.create(null)],nt=Object.create(null);function Wt(e){return nt[e]??(nt[e]=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,s)=>s?`\\${s}`:"(?:|/.*)")}$`))}function Ls(){nt=Object.create(null)}function Ms(e){var d;const t=new Ss,s=[];if(e.length===0)return As;const a=e.map(c=>[!/\*|\/:/.test(c[0]),...c]).sort(([c,g],[u,f])=>c?1:u?-1:g.length-f.length),n=Object.create(null);for(let c=0,g=-1,u=a.length;c<u;c++){const[f,b,v]=a[c];f?n[b]=[v.map(([I])=>[I,Object.create(null)]),Ut]:g++;let h;try{h=t.insert(b,g,f)}catch(I){throw I===De?new Ft(b):I}f||(s[g]=v.map(([I,$])=>{const S=Object.create(null);for($-=1;$>=0;$--){const[y,E]=h[$];S[y]=E}return[I,S]}))}const[o,r,l]=t.buildRegExp();for(let c=0,g=s.length;c<g;c++)for(let u=0,f=s[c].length;u<f;u++){const b=(d=s[c][u])==null?void 0:d[1];if(!b)continue;const v=Object.keys(b);for(let h=0,I=v.length;h<I;h++)b[v[h]]=l[b[v[h]]]}const i=[];for(const c in r)i[c]=s[r[c]];return[o,i,n]}function Re(e,t){if(e){for(const s of Object.keys(e).sort((a,n)=>n.length-a.length))if(Wt(s).test(t))return[...e[s]]}}var ye,be,it,Ht,St,Ns=(St=class{constructor(){C(this,it);w(this,"name","RegExpRouter");C(this,ye);C(this,be);w(this,"match",ks);x(this,ye,{[F]:Object.create(null)}),x(this,be,{[F]:Object.create(null)})}add(e,t,s){var l;const a=m(this,ye),n=m(this,be);if(!a||!n)throw new Error(Bt);a[e]||[a,n].forEach(i=>{i[e]=Object.create(null),Object.keys(i[F]).forEach(d=>{i[e][d]=[...i[F][d]]})}),t==="/*"&&(t="*");const o=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const i=Wt(t);e===F?Object.keys(a).forEach(d=>{var c;(c=a[d])[t]||(c[t]=Re(a[d],t)||Re(a[F],t)||[])}):(l=a[e])[t]||(l[t]=Re(a[e],t)||Re(a[F],t)||[]),Object.keys(a).forEach(d=>{(e===F||e===d)&&Object.keys(a[d]).forEach(c=>{i.test(c)&&a[d][c].push([s,o])})}),Object.keys(n).forEach(d=>{(e===F||e===d)&&Object.keys(n[d]).forEach(c=>i.test(c)&&n[d][c].push([s,o]))});return}const r=Rt(t)||[t];for(let i=0,d=r.length;i<d;i++){const c=r[i];Object.keys(n).forEach(g=>{var u;(e===F||e===g)&&((u=n[g])[c]||(u[c]=[...Re(a[g],c)||Re(a[F],c)||[]]),n[g][c].push([s,o-d+i+1]))})}}buildAllMatchers(){const e=Object.create(null);return Object.keys(m(this,be)).concat(Object.keys(m(this,ye))).forEach(t=>{e[t]||(e[t]=L(this,it,Ht).call(this,t))}),x(this,ye,x(this,be,void 0)),Ls(),e}},ye=new WeakMap,be=new WeakMap,it=new WeakSet,Ht=function(e){const t=[];let s=e===F;return[m(this,ye),m(this,be)].forEach(a=>{const n=a[e]?Object.keys(a[e]).map(o=>[o,a[e][o]]):[];n.length!==0?(s||(s=!0),t.push(...n)):e!==F&&t.push(...Object.keys(a[F]).map(o=>[o,a[F][o]]))}),s?Ms(t):null},St),xe,pe,At,Rs=(At=class{constructor(e){w(this,"name","SmartRouter");C(this,xe,[]);C(this,pe,[]);x(this,xe,e.routers)}add(e,t,s){if(!m(this,pe))throw new Error(Bt);m(this,pe).push([e,t,s])}match(e,t){if(!m(this,pe))throw new Error("Fatal error");const s=m(this,xe),a=m(this,pe),n=s.length;let o=0,r;for(;o<n;o++){const l=s[o];try{for(let i=0,d=a.length;i<d;i++)l.add(...a[i]);r=l.match(e,t)}catch(i){if(i instanceof Ft)continue;throw i}this.match=l.match.bind(l),x(this,xe,[l]),x(this,pe,void 0);break}if(o===n)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,r}get activeRouter(){if(m(this,pe)||m(this,xe).length!==1)throw new Error("No active router has been determined yet.");return m(this,xe)[0]}},xe=new WeakMap,pe=new WeakMap,At),We=Object.create(null),ve,V,Ae,Ge,Y,ge,Ee,Ue,Ts=(Ue=class{constructor(t,s,a){C(this,ge);C(this,ve);C(this,V);C(this,Ae);C(this,Ge,0);C(this,Y,We);if(x(this,V,a||Object.create(null)),x(this,ve,[]),t&&s){const n=Object.create(null);n[t]={handler:s,possibleKeys:[],score:0},x(this,ve,[n])}x(this,Ae,[])}insert(t,s,a){x(this,Ge,++ht(this,Ge)._);let n=this;const o=rs(s),r=[];for(let l=0,i=o.length;l<i;l++){const d=o[l],c=o[l+1],g=ds(d,c),u=Array.isArray(g)?g[0]:d;if(u in m(n,V)){n=m(n,V)[u],g&&r.push(g[1]);continue}m(n,V)[u]=new Ue,g&&(m(n,Ae).push(g),r.push(g[1])),n=m(n,V)[u]}return m(n,ve).push({[t]:{handler:a,possibleKeys:r.filter((l,i,d)=>d.indexOf(l)===i),score:m(this,Ge)}}),n}search(t,s){var i;const a=[];x(this,Y,We);let o=[this];const r=Mt(s),l=[];for(let d=0,c=r.length;d<c;d++){const g=r[d],u=d===c-1,f=[];for(let b=0,v=o.length;b<v;b++){const h=o[b],I=m(h,V)[g];I&&(x(I,Y,m(h,Y)),u?(m(I,V)["*"]&&a.push(...L(this,ge,Ee).call(this,m(I,V)["*"],t,m(h,Y))),a.push(...L(this,ge,Ee).call(this,I,t,m(h,Y)))):f.push(I));for(let $=0,S=m(h,Ae).length;$<S;$++){const y=m(h,Ae)[$],E=m(h,Y)===We?{}:{...m(h,Y)};if(y==="*"){const z=m(h,V)["*"];z&&(a.push(...L(this,ge,Ee).call(this,z,t,m(h,Y))),x(z,Y,E),f.push(z));continue}const[A,B,H]=y;if(!g&&!(H instanceof RegExp))continue;const U=m(h,V)[A],q=r.slice(d).join("/");if(H instanceof RegExp){const z=H.exec(q);if(z){if(E[B]=z[0],a.push(...L(this,ge,Ee).call(this,U,t,m(h,Y),E)),Object.keys(m(U,V)).length){x(U,Y,E);const Z=((i=z[0].match(/\//))==null?void 0:i.length)??0;(l[Z]||(l[Z]=[])).push(U)}continue}}(H===!0||H.test(g))&&(E[B]=g,u?(a.push(...L(this,ge,Ee).call(this,U,t,E,m(h,Y))),m(U,V)["*"]&&a.push(...L(this,ge,Ee).call(this,m(U,V)["*"],t,E,m(h,Y)))):(x(U,Y,E),f.push(U)))}}o=f.concat(l.shift()??[])}return a.length>1&&a.sort((d,c)=>d.score-c.score),[a.map(({handler:d,params:c})=>[d,c])]}},ve=new WeakMap,V=new WeakMap,Ae=new WeakMap,Ge=new WeakMap,Y=new WeakMap,ge=new WeakSet,Ee=function(t,s,a,n){const o=[];for(let r=0,l=m(t,ve).length;r<l;r++){const i=m(t,ve)[r],d=i[s]||i[F],c={};if(d!==void 0&&(d.params=Object.create(null),o.push(d),a!==We||n&&n!==We))for(let g=0,u=d.possibleKeys.length;g<u;g++){const f=d.possibleKeys[g],b=c[d.score];d.params[f]=n!=null&&n[f]&&!b?n[f]:a[f]??(n==null?void 0:n[f]),c[d.score]=!0}}return o},Ue),Le,Lt,Ps=(Lt=class{constructor(){w(this,"name","TrieRouter");C(this,Le);x(this,Le,new Ts)}add(e,t,s){const a=Rt(t);if(a){for(let n=0,o=a.length;n<o;n++)m(this,Le).insert(e,a[n],s);return}m(this,Le).insert(e,t,s)}match(e,t){return m(this,Le).search(e,t)}},Le=new WeakMap,Lt),Kt=class extends ws{constructor(e={}){super(e),this.router=e.router??new Rs({routers:[new Ns,new Ps]})}},Ds=e=>{const s={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...e},a=(o=>typeof o=="string"?o==="*"?()=>o:r=>o===r?r:null:typeof o=="function"?o:r=>o.includes(r)?r:null)(s.origin),n=(o=>typeof o=="function"?o:Array.isArray(o)?()=>o:()=>[])(s.allowMethods);return async function(r,l){var c;function i(g,u){r.res.headers.set(g,u)}const d=await a(r.req.header("origin")||"",r);if(d&&i("Access-Control-Allow-Origin",d),s.credentials&&i("Access-Control-Allow-Credentials","true"),(c=s.exposeHeaders)!=null&&c.length&&i("Access-Control-Expose-Headers",s.exposeHeaders.join(",")),r.req.method==="OPTIONS"){s.origin!=="*"&&i("Vary","Origin"),s.maxAge!=null&&i("Access-Control-Max-Age",s.maxAge.toString());const g=await n(r.req.header("origin")||"",r);g.length&&i("Access-Control-Allow-Methods",g.join(","));let u=s.allowHeaders;if(!(u!=null&&u.length)){const f=r.req.header("Access-Control-Request-Headers");f&&(u=f.split(/\s*,\s*/))}return u!=null&&u.length&&(i("Access-Control-Allow-Headers",u.join(",")),r.res.headers.append("Vary","Access-Control-Request-Headers")),r.res.headers.delete("Content-Length"),r.res.headers.delete("Content-Type"),new Response(null,{headers:r.res.headers,status:204,statusText:"No Content"})}await l(),s.origin!=="*"&&r.header("Vary","Origin",{append:!0})}},Os=/^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i,vt=(e,t=js)=>{const s=/\.([a-zA-Z0-9]+?)$/,a=e.match(s);if(!a)return;let n=t[a[1]];return n&&n.startsWith("text")&&(n+="; charset=utf-8"),n},$s={aac:"audio/aac",avi:"video/x-msvideo",avif:"image/avif",av1:"video/av1",bin:"application/octet-stream",bmp:"image/bmp",css:"text/css",csv:"text/csv",eot:"application/vnd.ms-fontobject",epub:"application/epub+zip",gif:"image/gif",gz:"application/gzip",htm:"text/html",html:"text/html",ico:"image/x-icon",ics:"text/calendar",jpeg:"image/jpeg",jpg:"image/jpeg",js:"text/javascript",json:"application/json",jsonld:"application/ld+json",map:"application/json",mid:"audio/x-midi",midi:"audio/x-midi",mjs:"text/javascript",mp3:"audio/mpeg",mp4:"video/mp4",mpeg:"video/mpeg",oga:"audio/ogg",ogv:"video/ogg",ogx:"application/ogg",opus:"audio/opus",otf:"font/otf",pdf:"application/pdf",png:"image/png",rtf:"application/rtf",svg:"image/svg+xml",tif:"image/tiff",tiff:"image/tiff",ts:"video/mp2t",ttf:"font/ttf",txt:"text/plain",wasm:"application/wasm",webm:"video/webm",weba:"audio/webm",webmanifest:"application/manifest+json",webp:"image/webp",woff:"font/woff",woff2:"font/woff2",xhtml:"application/xhtml+xml",xml:"application/xml",zip:"application/zip","3gp":"video/3gpp","3g2":"video/3gpp2",gltf:"model/gltf+json",glb:"model/gltf-binary"},js=$s,Bs=(...e)=>{let t=e.filter(n=>n!=="").join("/");t=t.replace(new RegExp("(?<=\\/)\\/+","g"),"");const s=t.split("/"),a=[];for(const n of s)n===".."&&a.length>0&&a.at(-1)!==".."?a.pop():n!=="."&&a.push(n);return a.join("/")||"."},Yt={br:".br",zstd:".zst",gzip:".gz"},Fs=Object.keys(Yt),Gs="index.html",Us=e=>{const t=e.root??"./",s=e.path,a=e.join??Bs;return async(n,o)=>{var c,g,u,f;if(n.finalized)return o();let r;if(e.path)r=e.path;else try{if(r=decodeURIComponent(n.req.path),/(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(r))throw new Error}catch{return await((c=e.onNotFound)==null?void 0:c.call(e,n.req.path,n)),o()}let l=a(t,!s&&e.rewriteRequestPath?e.rewriteRequestPath(r):r);e.isDir&&await e.isDir(l)&&(l=a(l,Gs));const i=e.getContent;let d=await i(l,n);if(d instanceof Response)return n.newResponse(d.body,d);if(d){const b=e.mimes&&vt(l,e.mimes)||vt(l);if(n.header("Content-Type",b||"application/octet-stream"),e.precompressed&&(!b||Os.test(b))){const v=new Set((g=n.req.header("Accept-Encoding"))==null?void 0:g.split(",").map(h=>h.trim()));for(const h of Fs){if(!v.has(h))continue;const I=await i(l+Yt[h],n);if(I){d=I,n.header("Content-Encoding",h),n.header("Vary","Accept-Encoding",{append:!0});break}}}return await((u=e.onFound)==null?void 0:u.call(e,l,n)),n.body(d)}await((f=e.onNotFound)==null?void 0:f.call(e,l,n)),await o()}},Ws=async(e,t)=>{let s;t&&t.manifest?typeof t.manifest=="string"?s=JSON.parse(t.manifest):s=t.manifest:typeof __STATIC_CONTENT_MANIFEST=="string"?s=JSON.parse(__STATIC_CONTENT_MANIFEST):s=__STATIC_CONTENT_MANIFEST;let a;t&&t.namespace?a=t.namespace:a=__STATIC_CONTENT;const n=s[e]||e;if(!n)return null;const o=await a.get(n,{type:"stream"});return o||null},Hs=e=>async function(s,a){return Us({...e,getContent:async o=>Ws(o,{manifest:e.manifest,namespace:e.namespace?e.namespace:s.env?s.env.__STATIC_CONTENT:void 0})})(s,a)},Ks=e=>Hs(e);const M=new Kt;M.use("/api/*",Ds());M.use("/static/*",Ks({root:"./public"}));const Ys="e77554988b424c6498d85362b0367757",Vs="https://www.streak.com/api/v1",Ye={mabsilico:{name:"MabSilico",pipelineKey:"agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgOqI26zZCAw",url:"https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgOqI26zZCAw",networkSheetGid:"910674612",sources:{promote:"",network:"https://docs.google.com/spreadsheets/d/1NzUlKfHTW6v7i-S59GjtBFlzQwTX2AaeK4gQ4fVSAsw/edit?gid=910674612#gid=910674612",engage:"https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgOqI26zZCAw"}},"finance-montreal":{name:"Finance Montreal (Steve)",pipelineKey:"agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgI7YkpykCQw",url:"https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgI7YkpykCQw"},"apm-music":{name:"APM Music",pipelineKey:"agxzfm1haWxmb29nYWVyRAsSDE9yZ2FuaXphdGlvbiIdYWluYS5hbmRyaWFtYW5nYXNvbkBnbWFpbC5jb20MCxIIV29ya2Zsb3cYgIClnNb8gwsM",url:"https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyRAsSDE9yZ2FuaXphdGlvbiIdYWluYS5hbmRyaWFtYW5nYXNvbkBnbWFpbC5jb20MCxIIV29ya2Zsb3cYgIClnNb8gwsM"},ducrocq:{name:"Ducrocq",pipelineKey:"agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgNaSl4OGCww",url:"https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgNaSl4OGCww"},milvue:{name:"Milvue",pipelineKey:"agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgMX-7baZCgw",url:"https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgMX-7baZCgw"},seekyo:{name:"Seekyo Therapeutics",pipelineKey:"agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgLnYo_uUCww",url:"https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgLnYo_uUCww"},altavia:{name:"Altavia",pipelineKey:"agxzfm1haWxmb29nYWVyRAsSDE9yZ2FuaXphdGlvbiIdYWluYS5hbmRyaWFtYW5nYXNvbkBnbWFpbC5jb20MCxIIV29ya2Zsb3cYgICFz_elmwgM",url:"https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyRAsSDE9yZ2FuaXphdGlvbiIdYWluYS5hbmRyaWFtYW5nYXNvbkBnbWFpbC5jb20MCxIIV29ya2Zsb3cYgICFz_elmwgM"},valos:{name:"Valos",pipelineKey:"agxzfm1haWxmb29nYWVyRAsSDE9yZ2FuaXphdGlvbiIdYWluYS5hbmRyaWFtYW5nYXNvbkBnbWFpbC5jb20MCxIIV29ya2Zsb3cYgICF5ei7lgkM",url:"https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyRAsSDE9yZ2FuaXphdGlvbiIdYWluYS5hbmRyaWFtYW5nYXNvbkBnbWFpbC5jb20MCxIIV29ya2Zsb3cYgICF5ei7lgkM"},"dab-embedded":{name:"DAB-Embedded",pipelineKey:"agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgKWyqIboCww",url:"https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgKWyqIboCww"},"finance-montreal-noza":{name:"Finance Montreal (Noza)",pipelineKey:"agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgKWVvvDkCgw",url:"https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgKWVvvDkCgw"}},Q=Ye.mabsilico.pipelineKey,Vt="Fit",_t="Interest",wt="1NzUlKfHTW6v7i-S59GjtBFlzQwTX2AaeK4gQ4fVSAsw";async function D(e){const t=btoa(`${Ys}:`),s=await fetch(`${Vs}${e}`,{headers:{Authorization:`Basic ${t}`,"Content-Type":"application/json"}});if(!s.ok)throw new Error(`Streak API error: ${s.statusText}`);return s.json()}function zt(e){if(e.includes("docs.google.com")){const t=e.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/),s=e.match(/[?&#]gid=(\d+)/),a=t?t[1]:wt,n=s?s[1]:"0";return{sheetId:a,gid:n}}return{sheetId:wt,gid:e}}async function Qt(e){var t;try{const{sheetId:s,gid:a}=zt(e),n=`https://docs.google.com/spreadsheets/d/${s}/export?format=csv&gid=${a}`,o=await fetch(n);if(!o.ok)throw new Error(`Google Sheets error: ${o.statusText}`);const l=(await o.text()).split(`
`).filter(y=>y.trim()),i=[];for(let y=1;y<l.length;y++){const A=l[y].split(",");if(A.length>=9&&A[3]&&A[3].trim()){const B=parseInt(A[3])||0,H=parseInt(A[4])||0,U=A[7]?A[7].replace("%","").trim():"0",q=parseFloat(U)||0;i.push({week:A[0],from:A[1],to:A[2],invitations:B,messages:H,acceptance:q,opportunities:parseInt(A[8])||0})}}const d=i.reduce((y,E)=>y+E.invitations,0),c=i.reduce((y,E)=>y+E.messages,0),g=i.length>0&&((t=i[0].from)==null?void 0:t.trim())||null,u=i.reduce((y,E)=>{const A=Math.min(E.acceptance,100);return y+Math.round(E.invitations*A/100)},0),f=i.map(y=>Math.min(y.acceptance,100)),b=f.length>0?f.reduce((y,E)=>y+E,0)/f.length:0,v=20,h=b>0?b/v*100:0,I=i.slice(-4),$=i[i.length-1]||{invitations:0,acceptance:0},S=i[i.length-2]||{invitations:0,acceptance:0};return{totalInvitations:d,totalMessages:c,campaignStartDate:g,totalAccepted:u,avgAcceptanceRate:Math.round(b*10)/10,networkObjective:v,objectiveAchievement:Math.round(h*10)/10,thisWeek:{invitations:$.invitations,acceptance:Math.min($.acceptance,100)},lastWeek:{invitations:S.invitations,acceptance:Math.min(S.acceptance,100)},recentWeeks:I.map(y=>({...y,acceptance:Math.min(y.acceptance,100)})),allData:i}}catch(s){return console.error("Error fetching network data:",s),{totalInvitations:0,totalAccepted:0,avgAcceptanceRate:0,thisWeek:{invitations:0,acceptance:0},lastWeek:{invitations:0,acceptance:0},recentWeeks:[],allData:[]}}}M.get("/api/pipeline",async e=>{try{const t=await D(`/pipelines/${Q}`);return e.json(t)}catch(t){return e.json({error:t.message},500)}});M.get("/api/boxes",async e=>{try{const t=await D(`/pipelines/${Q}/boxes`);return e.json(t)}catch(t){return e.json({error:t.message},500)}});M.get("/api/boxes/:boxKey",async e=>{try{const t=e.req.param("boxKey"),s=await D(`/boxes/${t}`);return e.json(s)}catch(t){return e.json({error:t.message},500)}});M.get("/api/sheets/stage/:stageName/count",async e=>{try{const t=e.req.param("stageName"),[s,a]=await Promise.all([D(`/pipelines/${Q}`),D(`/pipelines/${Q}/boxes`)]),n=s.stageOrder||[],o=Array.isArray(n)?n.map(l=>{var i,d;return{key:l,name:((d=(i=s.stages)==null?void 0:i[l])==null?void 0:d.name)||"Unknown"}}):[],r=Array.isArray(a)?a.filter(l=>{const i=o.find(d=>d&&d.key===l.stageKey);return i&&i.name.toLowerCase()===t.toLowerCase()}).length:0;return e.text(r.toString())}catch{return e.text("ERROR")}});M.get("/api/sheets/priority/:priorityName/count",async e=>{try{const t=e.req.param("priorityName"),[s,a]=await Promise.all([D(`/pipelines/${Q}`),D(`/pipelines/${Q}/boxes`)]),o=(Array.isArray(s.fields)?s.fields:[]).find(l=>l&&l.name==="Priority"),r=Array.isArray(a)?a.filter(l=>{var u;if(!o||!l.fields||!l.fields[o.key])return t.toLowerCase()==="no priority";const i=l.fields[o.key],d=(u=o.dropdownSettings)==null?void 0:u.items,c=Array.isArray(d)?d.find(f=>f&&f.key===i):null;return(c?c.name:"No Priority").toLowerCase().includes(t.toLowerCase())}).length:0;return e.text(r.toString())}catch{return e.text("ERROR")}});M.get("/api/sheets/country/:countryName/count",async e=>{try{const t=e.req.param("countryName"),[s,a]=await Promise.all([D(`/pipelines/${Q}`),D(`/pipelines/${Q}/boxes`)]),o=(Array.isArray(s.fields)?s.fields:[]).find(l=>l&&l.name==="Country"),r=Array.isArray(a)?a.filter(l=>{var u;if(!o||!l.fields||!l.fields[o.key])return t.toLowerCase()==="unknown";const i=l.fields[o.key],d=(u=o.dropdownSettings)==null?void 0:u.items,c=Array.isArray(d)?d.find(f=>f&&f.key===i):null;return(c?c.name:"Unknown").toLowerCase()===t.toLowerCase()}).length:0;return e.text(r.toString())}catch{return e.text("ERROR")}});M.get("/api/sheets/total",async e=>{try{const t=await D(`/pipelines/${Q}/boxes`),s=Array.isArray(t)?t.length:0;return e.text(s.toString())}catch{return e.text("ERROR")}});M.get("/api/sheets/freshness/:level/count",async e=>{try{const t=e.req.param("level").toLowerCase(),s=await D(`/pipelines/${Q}/boxes`),a=Array.isArray(s)?s.filter(n=>{const o=n.freshness||0;return t==="high"?o>.5:t==="medium"?o>=.2&&o<=.5:t==="low"?o<.2:!1}).length:0;return e.text(a.toString())}catch{return e.text("ERROR")}});M.get("/api/sheets/fit/:fitLevel/count",async e=>{try{const t=e.req.param("fitLevel"),[s,a]=await Promise.all([D(`/pipelines/${Q}`),D(`/pipelines/${Q}/boxes`)]),o=(Array.isArray(s.fields)?s.fields:[]).find(l=>l&&l.name===Vt),r=Array.isArray(a)?a.filter(l=>{var u;if(!o||!l.fields||!l.fields[o.key])return t.toLowerCase()==="not set";const i=l.fields[o.key],d=(u=o.dropdownSettings)==null?void 0:u.items,c=Array.isArray(d)?d.find(f=>f&&f.key===i):null;return(c?c.name:"Not Set").toLowerCase()===t.toLowerCase()}).length:0;return e.text(r.toString())}catch{return e.text("ERROR")}});M.get("/api/sheets/interest/:interestLevel/count",async e=>{try{const t=e.req.param("interestLevel"),[s,a]=await Promise.all([D(`/pipelines/${Q}`),D(`/pipelines/${Q}/boxes`)]),o=(Array.isArray(s.fields)?s.fields:[]).find(l=>l&&l.name===_t),r=Array.isArray(a)?a.filter(l=>{var u;if(!o||!l.fields||!l.fields[o.key])return t.toLowerCase()==="not set";const i=l.fields[o.key],d=(u=o.dropdownSettings)==null?void 0:u.items,c=Array.isArray(d)?d.find(f=>f&&f.key===i):null;return(c?c.name:"Not Set").toLowerCase()===t.toLowerCase()}).length:0;return e.text(r.toString())}catch{return e.text("ERROR")}});async function Ne(e,t){const s=await e.get(`company:${t}`);if(s)return JSON.parse(s);if(Ye[t]){const a=Ye[t];return{key:t,name:a.name,pipelineKey:a.pipelineKey,url:a.url||"",networkSheetGid:a.networkSheetGid||"",sources:a.sources||{}}}return null}async function ut(e,t=!1){const s={};for(const o of Object.keys(Ye)){const r=Ye[o];s[o]={key:o,name:r.name,pipelineKey:r.pipelineKey,url:r.url||"",networkSheetGid:r.networkSheetGid||"",sources:r.sources||{},archived:!1}}const a=await e.list({prefix:"company:"});for(const o of a.keys){const r=await e.get(o.name);if(r){const l=JSON.parse(r);s[l.key]=l}}const n=Object.values(s);return t?n:n.filter(o=>!o.archived)}M.get("/api/companies",async e=>{const t=e.req.query("includeArchived")==="true",s=await ut(e.env.COMPANIES_KV,t);return e.json({companies:s,count:s.length})});M.post("/api/companies",async e=>{try{const t=await e.req.json(),{name:s,pipelineKey:a,networkUrl:n,promoteUrl:o,engageUrl:r,notionUrl:l,networkGid:i,key:d}=t;if(!s||!a)return e.json({error:"name and pipelineKey are required"},400);const c=d||s.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""),g={key:c,name:s,pipelineKey:a,url:r||`https://www.streak.com/a/pipelines/${a}`,sources:{promote:o||"",network:n||"",engage:r||`https://www.streak.com/a/pipelines/${a}`,notion:l||""}};return i&&(g.networkSheetGid=i),await e.env.COMPANIES_KV.put(`company:${c}`,JSON.stringify(g)),e.json({success:!0,company:g})}catch{return e.json({error:"Failed to save company"},500)}});M.delete("/api/companies/:key",async e=>{try{const t=e.req.param("key");return await e.env.COMPANIES_KV.delete(`company:${t}`),e.json({success:!0})}catch{return e.json({error:"Failed to delete company"},500)}});M.put("/api/companies/:key",async e=>{var t,s,a;try{const n=e.req.param("key"),o=await e.req.json(),{name:r,pipelineKey:l,networkUrl:i,promoteUrl:d,engageUrl:c,networkGid:g}=o,f=(await ut(e.env.COMPANIES_KV,!0)).find(h=>h.key===n);if(!f)return e.json({error:"Company not found"},404);const{archived:b}=o,v={...f,key:n,name:r||f.name,pipelineKey:l||f.pipelineKey,sources:{promote:d!==void 0?d:((t=f.sources)==null?void 0:t.promote)||"",network:i!==void 0?i:((s=f.sources)==null?void 0:s.network)||"",engage:c!==void 0?c:((a=f.sources)==null?void 0:a.engage)||f.url||""}};return g!==void 0&&(g?v.networkSheetGid=g:delete v.networkSheetGid),c&&(v.url=c),b!==void 0&&(v.archived=b),await e.env.COMPANIES_KV.put(`company:${n}`,JSON.stringify(v)),e.json({success:!0,company:v})}catch{return e.json({error:"Failed to update company"},500)}});M.get("/api/sheets/:companyName/total",async e=>{try{const t=e.req.param("companyName").toLowerCase(),s=await Ne(e.env.COMPANIES_KV,t);if(!s)return e.text("COMPANY_NOT_FOUND");const a=await D(`/pipelines/${s.pipelineKey}/boxes`),n=Array.isArray(a)?a.length:0;return e.text(n.toString())}catch{return e.text("ERROR")}});M.get("/api/sheets/:companyName/month/:yearMonth/count",async e=>{try{const t=e.req.param("companyName").toLowerCase(),s=e.req.param("yearMonth"),a=await Ne(e.env.COMPANIES_KV,t);if(!a)return e.text("COMPANY_NOT_FOUND");const n=await D(`/pipelines/${a.pipelineKey}/boxes`),[o,r]=s.split("-").map(Number),l=Array.isArray(n)?n.filter(i=>{const d=new Date(i.creationTimestamp);return d.getFullYear()===o&&d.getMonth()+1===r}).length:0;return e.text(l.toString())}catch{return e.text("ERROR")}});M.get("/api/sheets/:companyName/week/count",async e=>{try{const t=e.req.param("companyName").toLowerCase(),s=await Ne(e.env.COMPANIES_KV,t);if(!s)return e.text("ERROR");const a=await D(`/pipelines/${s.pipelineKey}/boxes`);if(!Array.isArray(a))return e.text("0");const o=Date.now()-10080*60*1e3,r=a.filter(l=>(l.creationTimestamp||0)>=o).length;return e.text(r.toString())}catch{return e.text("ERROR")}});M.get("/api/sheets/:companyName/duration/total",async e=>{try{const t=e.req.param("companyName").toLowerCase(),s=await Ne(e.env.COMPANIES_KV,t);if(!s)return e.text("0");const a=await D(`/pipelines/${s.pipelineKey}/boxes`);if(!Array.isArray(a)||a.length===0)return e.text("0");const n=a.map(g=>g.creationTimestamp).filter(g=>g);if(n.length===0)return e.text("0");const o=Math.min(...n),r=new Date(o),l=new Date,i=l.getFullYear()-r.getFullYear(),d=l.getMonth()-r.getMonth(),c=i*12+d+1;return e.text(c.toString())}catch{return e.text("0")}});M.get("/api/sheets/:companyName/monthly-stats",async e=>{try{const t=e.req.param("companyName").toLowerCase(),s=await Ne(e.env.COMPANIES_KV,t);if(!s)return e.json({error:"Company not found"},404);const a=await D(`/pipelines/${s.pipelineKey}/boxes`),n=Array.isArray(a)?a:[],o=new Date,r=[];for(let c=11;c>=0;c--){const g=new Date(o.getFullYear(),o.getMonth()-c,1),u=g.getFullYear(),f=g.getMonth()+1,b=n.filter(h=>{const I=new Date(h.creationTimestamp);return I.getFullYear()===u&&I.getMonth()+1===f}).length,v=(b/10*100).toFixed(1);r.push({month:`${u}-${String(f).padStart(2,"0")}`,count:b,objective:10,percentage:parseFloat(v)})}const l=r.reduce((c,g)=>c+g.count,0),i=(l/12).toFixed(1),d=(parseFloat(i)/10*100).toFixed(1);return e.json({company:s.name,companyKey:t,objective:10,monthlyStats:r,summary:{totalLeads:l,average:parseFloat(i),averagePercentage:parseFloat(d)}})}catch(t){return e.json({error:t.message},500)}});M.get("/api/analytics",async e=>{var t;try{const s=e.req.query("company")||"mabsilico",a=await Ne(e.env.COMPANIES_KV,s);if(!a)return e.json({error:"Invalid company key"},400);const n=a.pipelineKey;if(!n)return e.json({error:`No Streak pipeline key configured for "${a.name}". Please set it in the Admin Panel.`},400);const[o,r]=await Promise.all([D(`/pipelines/${n}`),D(`/pipelines/${n}/boxes`)]),l=Array.isArray(r)?r.length:0,i={},d={},c={},g={},u={},f={},b={"High (>0.5)":0,"Medium (0.2-0.5)":0,"Low (<0.2)":0},v=o.stageOrder||[],h=Array.isArray(v)?v.map(p=>{var R,W;return{key:p,name:((W=(R=o.stages)==null?void 0:R[p])==null?void 0:W.name)||"Unknown"}}):[],I=Array.isArray(o.fields)?o.fields:[],$=I.find(p=>p&&p.name==="Origin"),S=I.find(p=>p&&p.name===Vt),y=I.find(p=>p&&p.name===_t),E=I.find(p=>p&&p.name==="Est Start Date"),A=I.find(p=>p&&p.name==="Country"),B=I.find(p=>p&&p.name==="Language");Array.isArray(r)&&r.forEach(p=>{var X,le,de,te,se;if(!p)return;const R=h.find(j=>j&&j.key===p.stageKey),W=R?R.name:"Unknown";if(i[W]=(i[W]||0)+1,$&&p.fields&&p.fields[$.key]){const j=p.fields[$.key],P=(X=$.dropdownSettings)==null?void 0:X.items,K=Array.isArray(P)?P.find(N=>N&&N.key===j):null,T=K?K.name:"Unknown";d[T]=(d[T]||0)+1}if(S&&p.fields&&p.fields[S.key]){const j=p.fields[S.key],P=(le=S.dropdownSettings)==null?void 0:le.items,K=Array.isArray(P)?P.find(N=>N&&N.key===j):null,T=K?K.name:"Not Set";c[T]=(c[T]||0)+1}else c["Not Set"]=(c["Not Set"]||0)+1;if(y&&p.fields&&p.fields[y.key]){const j=p.fields[y.key],P=(de=y.dropdownSettings)==null?void 0:de.items,K=Array.isArray(P)?P.find(N=>N&&N.key===j):null,T=K?K.name:"Not Set";g[T]=(g[T]||0)+1}else g["Not Set"]=(g["Not Set"]||0)+1;if(A&&p.fields&&p.fields[A.key]){const j=p.fields[A.key],P=(te=A.dropdownSettings)==null?void 0:te.items,K=Array.isArray(P)?P.find(N=>N&&N.key===j):null,T=K?K.name:"Unknown";u[T]=(u[T]||0)+1}else u.Unknown=(u.Unknown||0)+1;if(B&&p.fields&&p.fields[B.key]){const j=p.fields[B.key],P=(se=B.dropdownSettings)==null?void 0:se.items,K=Array.isArray(P)?P.find(N=>N&&N.key===j):null,T=K?K.name:"Unknown";f[T]=(f[T]||0)+1}else f.Unknown=(f.Unknown||0)+1;const O=p.freshness||0;O>.5?b["High (>0.5)"]++:O>=.2?b["Medium (0.2-0.5)"]++:b["Low (<0.2)"]++});const H={};Object.keys(c).forEach(p=>{H[p]=l>0?(c[p]/l*100).toFixed(1):0});const U={};Object.keys(g).forEach(p=>{U[p]=l>0?(g[p]/l*100).toFixed(1):0});const q=new Date,z=[],Z=10;for(let p=11;p>=0;p--){const R=new Date(q.getFullYear(),q.getMonth()-p,1),W=R.getFullYear(),O=R.getMonth()+1,X=Array.isArray(r)?r.filter(de=>{const te=new Date(de.creationTimestamp);return te.getFullYear()===W&&te.getMonth()+1===O}).length:0,le=(X/Z*100).toFixed(1);z.push({month:`${W}-${String(O).padStart(2,"0")}`,monthName:R.toLocaleString("en-US",{month:"short",year:"numeric"}),count:X,objective:Z,percentage:parseFloat(le),status:X>=Z?"achieved":"pending"})}const ee=(z.reduce((p,R)=>p+R.count,0)/12).toFixed(1),Xe=(parseFloat(ee)/Z*100).toFixed(1);let Je=0,we=null;if(Array.isArray(r)&&r.length>0){const p=r.map(R=>R.creationTimestamp).filter(R=>R);if(p.length>0){const R=Math.min(...p);we=new Date(R);const W=q.getFullYear()-we.getFullYear(),O=q.getMonth()-we.getMonth();Je=W*12+O+1}}let et=null;const k=a.networkSheetGid||((t=a.sources)==null?void 0:t.network);return k&&(et=await Qt(k)),e.json({company:a.name,companyKey:s,totalBoxes:l,campaignDurationMonths:Je,firstLeadDate:we?we.toISOString():null,networkData:et,stageDistribution:i,originDistribution:d,fitDistribution:c,fitPercentages:H,interestDistribution:g,interestPercentages:U,countryDistribution:u,languageDistribution:f,freshnessDistribution:b,monthlyLeads:z,leadObjective:Z,averageLeadsPerMonth:parseFloat(ee),averagePercentage:parseFloat(Xe),recentBoxes:Array.isArray(r)?r.filter(p=>{var le,de;const R=S&&p.fields&&p.fields[S.key],W=y&&p.fields&&p.fields[y.key];let O="Not Set";if(R){const te=p.fields[S.key],se=(le=S.dropdownSettings)==null?void 0:le.items,j=Array.isArray(se)?se.find(P=>P&&P.key===te):null;O=j?j.name:"Not Set"}let X="Not Set";if(W){const te=p.fields[y.key],se=(de=y.dropdownSettings)==null?void 0:de.items,j=Array.isArray(se)?se.find(P=>P&&P.key===te):null;X=j?j.name:"Not Set"}return O==="High"||X==="High"}).slice(0,10).map(p=>{var se,j,P,K;const R=h.find(T=>T&&T.key===p.stageKey);let W="Not Set";if(S&&p.fields&&p.fields[S.key]){const T=p.fields[S.key],N=(se=S.dropdownSettings)==null?void 0:se.items,ae=Array.isArray(N)?N.find(ne=>ne&&ne.key===T):null;W=ae?ae.name:"Not Set"}let O="Not Set";if(y&&p.fields&&p.fields[y.key]){const T=p.fields[y.key],N=(j=y.dropdownSettings)==null?void 0:j.items,ae=Array.isArray(N)?N.find(ne=>ne&&ne.key===T):null;O=ae?ae.name:"Not Set"}let X=null;E&&p.fields&&p.fields[E.key]&&(X=new Date(p.fields[E.key]).toISOString());let le="Unknown";if(A&&p.fields&&p.fields[A.key]){const T=p.fields[A.key],N=(P=A.dropdownSettings)==null?void 0:P.items,ae=Array.isArray(N)?N.find(ne=>ne&&ne.key===T):null;le=ae?ae.name:"Unknown"}let de="Unknown";if(B&&p.fields&&p.fields[B.key]){const T=p.fields[B.key],N=(K=B.dropdownSettings)==null?void 0:K.items,ae=Array.isArray(N)?N.find(ne=>ne&&ne.key===T):null;de=ae?ae.name:"Unknown"}const te=p.freshness||0;return{name:p.name||"Unnamed",key:p.boxKey,stage:R?R.name:"Unknown",fit:W,interest:O,dueDate:X,country:le,language:de,freshness:te.toFixed(3),lastUpdated:new Date(p.lastUpdatedTimestamp).toISOString()}}):[]})}catch(s){return e.json({error:s.message},500)}});async function qt(e){var u,f;const{sheetId:t,gid:s}=zt(e),a=`https://docs.google.com/spreadsheets/d/${t}/export?format=csv&gid=${s}`,n=await fetch(a);if(!n.ok)throw new Error(`Google Sheets error: ${n.statusText}`);const r=(await n.text()).split(`
`).filter(b=>b.trim());if(r.length<2)return{platforms:{}};const l=r[0].split(",").map(b=>b.trim().toLowerCase().replace(/\s+/g,"_")),i=b=>l.indexOf(b),d=[];for(let b=1;b<r.length;b++){const v=r[b].split(",");v.length<5||d.push({date:((u=v[i("date")])==null?void 0:u.trim())||"",platform:(((f=v[i("platform")])==null?void 0:f.trim())||"linkedin").toLowerCase(),followers:parseInt(v[i("follower_count")])||0,impressions:parseFloat(v[i("impressions")])||0,reach:parseInt(v[i("reach")])||0,likes:parseInt(v[i("like_count")])||0,comments:parseInt(v[i("comment_count")])||0,shares:parseInt(v[i("share_count")])||0,clicks:parseInt(v[i("click_count")])||0,engagements:parseInt(v[i("overall_engagements")])||0,engRate:parseFloat(v[i("engagement_rate")])||0,netGrowth:parseInt(v[i("net_audience_growth")])||0,posts:parseInt(v[i("post_count")])||0})}const c={};d.forEach(b=>{c[b.platform]||(c[b.platform]=[]),c[b.platform].push(b)});const g={};for(const[b,v]of Object.entries(c)){const h=[...v].sort((k,p)=>k.date.localeCompare(p.date)),I=h[0].followers,$=h[h.length-1].followers,S=$-I,y=I>0?+(S/I*100).toFixed(1):0,E=h.reduce((k,p)=>k+p.posts,0),A=Math.round(h.reduce((k,p)=>k+p.impressions,0)),B=h.reduce((k,p)=>k+p.reach,0),H=h.reduce((k,p)=>k+p.engagements,0),U=h.reduce((k,p)=>k+p.likes,0),q=h.reduce((k,p)=>k+p.comments,0),z=h.reduce((k,p)=>k+p.shares,0),Z=h.filter(k=>k.impressions>0&&k.engRate>0).map(k=>k.engRate),lt=Z.length>0?+(Z.reduce((k,p)=>k+p,0)/Z.length*100).toFixed(2):0,ee={};h.forEach(k=>{const p=new Date(k.date),R=p.getDay(),W=new Date(p);W.setDate(p.getDate()-(R===0?6:R-1));const O=W.toISOString().split("T")[0];ee[O]||(ee[O]={week:O,posts:0,impressions:0,engagements:0,reach:0,netGrowth:0}),ee[O].posts+=k.posts,ee[O].impressions+=Math.round(k.impressions),ee[O].engagements+=k.engagements,ee[O].reach+=k.reach,ee[O].netGrowth+=k.netGrowth});const Xe=Object.values(ee).sort((k,p)=>k.week.localeCompare(p.week)),Je=Xe.length||1,we=+(E/Je).toFixed(1),et=h.map(k=>({date:k.date,followers:k.followers,posts:k.posts,impressions:Math.round(k.impressions),engagements:k.engagements,reach:k.reach}));g[b]={followersStart:I,followersEnd:$,followersGrowth:S,followersGrowthPct:y,totalPosts:E,avgPostsPerWeek:we,totalImpressions:A,totalReach:B,totalEngagements:H,totalLikes:U,totalComments:q,totalShares:z,avgEngRate:lt,weeklyBreakdown:Xe,dailyData:et,dateRange:{from:h[0].date,to:h[h.length-1].date}}}return{platforms:g}}M.get("/api/promote",async e=>{var t;try{const s=e.req.query("company")||"mabsilico",a=await Ne(e.env.COMPANIES_KV,s);if(!a)return e.json({error:"Company not found"},404);const n=((t=a.sources)==null?void 0:t.promote)||"";if(!n)return e.json({error:"No promote URL configured for this company"},404);const o=await qt(n);return e.json(o)}catch(s){return e.json({error:s.message},500)}});M.get("/api/overview",async e=>{try{const t=e.req.query("period")||"this-month",s=Date.now(),a=new Date;let n=0,o=s;t==="week"?n=s-10080*60*1e3:t==="last-month"?(n=new Date(a.getFullYear(),a.getMonth()-1,1).getTime(),o=new Date(a.getFullYear(),a.getMonth(),1).getTime()):t==="this-month"?n=new Date(a.getFullYear(),a.getMonth(),1).getTime():t==="year"&&(n=new Date(a.getFullYear(),0,1).getTime());const r=await ut(e.env.COMPANIES_KV),l=await Promise.all(r.map(async i=>{try{const d=await D(`/pipelines/${i.pipelineKey}/boxes`),c=Array.isArray(d)?d:[],g=c.length,u=c.filter(S=>{const y=S.creationTimestamp||0;return y>=n&&y<o}).length,f=10;let b=f;if(t==="week")b=Math.round(f/30*7);else if(t==="year")b=f*12;else if(t==="all"){const S=c.map(y=>y.creationTimestamp).filter(Boolean);if(S.length>0){const y=new Date(Math.min(...S)),E=(a.getFullYear()-y.getFullYear())*12+(a.getMonth()-y.getMonth())+1;b=f*Math.max(E,1)}}let v=0,h=0;if(c.length>0){const S=c.map(y=>y.creationTimestamp).filter(Boolean);if(S.length>0){const y=new Date(Math.min(...S)),E=a.getFullYear()-y.getFullYear(),A=a.getMonth()-y.getMonth();v=Math.max(1,E*12+A+1),h=Math.round(g/v*10)/10}}const[I,$]=await Promise.all([(async()=>{var y,E;const S=((y=i.sources)==null?void 0:y.promote)||"";if(!S)return{configured:!1};try{const B=(E=(await qt(S)).platforms)==null?void 0:E.linkedin;if(!B)return{configured:!0,error:!0};const H=B.dateRange,U=H?Math.max(1,Math.ceil((new Date(H.to).getTime()-new Date(H.from).getTime())/864e5)+1):1,q=Math.round(B.totalPosts/U*100)/100;return{configured:!0,totalPosts:B.totalPosts,avgPostsPerDay:q,postsGoalPct:Math.min(200,Math.round(q*100)),dateRange:H}}catch{return{configured:!0,error:!0}}})(),(async()=>{var y;const S=i.networkSheetGid||((y=i.sources)==null?void 0:y.network);if(!S)return{configured:!1};try{const E=await Qt(S);return{configured:!0,avgAcceptanceRate:E.avgAcceptanceRate,totalInvitations:E.totalInvitations,totalMessages:E.totalMessages,campaignStartDate:E.campaignStartDate}}catch{return{configured:!0,error:!0}}})()]);return{key:i.key,name:i.name,periodLeads:u,totalLeads:g,goalPct:b>0?Math.round(u/b*100):0,campaignDurationMonths:v,avgLeadsPerMonth:h,promote:I,network:$,error:!1}}catch{return{key:i.key,name:i.name,periodLeads:0,totalLeads:0,goalPct:0,campaignDurationMonths:0,avgLeadsPerMonth:0,promote:{configured:!1},network:{configured:!1},error:!0}}}));return l.sort((i,d)=>d.periodLeads-i.periodLeads),e.json({period:t,totalPeriodLeads:l.reduce((i,d)=>i+d.periodLeads,0),totalAllLeads:l.reduce((i,d)=>i+d.totalLeads,0),companies:l})}catch(t){return e.json({error:t.message},500)}});M.get("/admin",e=>e.html(`
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
                        <span class="text-sm text-gray-600">Version <strong>1.1.8</strong></span>
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
  `));M.get("/overview",e=>e.html(`
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
                            v1.1.8
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
                document.getElementById('summary-row').innerHTML = \`
                    <div class="flex flex-wrap gap-8">
                        <div>
                            <p class="text-xs text-gray-500 uppercase font-semibold tracking-wide mb-1">Leads — \${periodLabel(data.period)}</p>
                            <p class="text-4xl font-extrabold text-gray-900">\${data.totalPeriodLeads}</p>
                        </div>
                        <div class="border-l border-gray-200 pl-8">
                            <p class="text-xs text-gray-500 uppercase font-semibold tracking-wide mb-1">All-Time Leads</p>
                            <p class="text-4xl font-extrabold text-gray-900">\${data.totalAllLeads}</p>
                        </div>
                        <div class="border-l border-gray-200 pl-8">
                            <p class="text-xs text-gray-500 uppercase font-semibold tracking-wide mb-1">Active Clients</p>
                            <p class="text-4xl font-extrabold text-gray-900">\${data.companies.length}</p>
                        </div>
                    </div>
                    <p class="text-xs text-gray-400 mt-2 sm:mt-0">
                        <i class="fas fa-clock mr-1"></i>Updated \${new Date().toLocaleTimeString()}
                    </p>
                \`;
            }

            function pillarBadge(pct, naText) {
                if (pct === null || pct === undefined) return \`<span class="text-xs text-gray-400">\${naText || 'N/A'}</span>\`;
                const c = pct >= 100 ? 'bg-green-100 text-green-700' : pct >= 50 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-600';
                return \`<span class="text-xs font-bold px-2 py-0.5 rounded-full \${c}">\${pct}%</span>\`;
            }

            function renderCards(companies) {
                const grid = document.getElementById('cards-grid');
                if (!companies.length) {
                    grid.innerHTML = '<p class="col-span-3 text-center text-gray-400 py-16 text-lg">No company data available.</p>';
                    return;
                }
                grid.innerHTML = companies.map(co => {
                    const pct = Math.min(co.goalPct, 100);
                    const colors = goalColor(co.goalPct);
                    const errBadge = co.error ? '<span class="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full ml-2">API Error</span>' : '';

                    // Promote pillar
                    const pr = co.promote || {};
                    let promoteHtml = '';
                    if (!pr.configured) {
                        promoteHtml = '<p class="text-xs text-gray-400 italic">Not configured</p>';
                    } else if (pr.error) {
                        promoteHtml = '<p class="text-xs text-red-400">Error loading</p>';
                    } else {
                        const postColor = pr.postsGoalPct >= 80 ? 'text-green-600' : pr.postsGoalPct >= 50 ? 'text-yellow-600' : 'text-red-500';
                        const barColor = pr.postsGoalPct >= 80 ? 'bg-green-500' : pr.postsGoalPct >= 50 ? 'bg-yellow-400' : 'bg-red-400';
                        promoteHtml = \`
                            <div class="flex items-center justify-between mb-1">
                                <span class="text-xs text-gray-500">Posts/day</span>
                                <span class="text-sm font-bold \${postColor}">\${pr.avgPostsPerDay} <span class="font-normal text-gray-400">/ 1</span></span>
                            </div>
                            <div class="w-full bg-gray-100 rounded-full h-1.5 mb-1">
                                <div class="\${barColor} h-1.5 rounded-full" style="width:\${Math.min(pr.postsGoalPct,100)}%"></div>
                            </div>
                            <p class="text-xs text-gray-400">\${pr.totalPosts} total posts</p>\`;
                    }

                    // Network pillar
                    const nw = co.network || {};
                    let networkHtml = '';
                    if (!nw.configured) {
                        networkHtml = '<p class="text-xs text-gray-400 italic">Not configured</p>';
                    } else if (nw.error) {
                        networkHtml = '<p class="text-xs text-red-400">Error loading</p>';
                    } else {
                        const accColor = nw.avgAcceptanceRate >= 20 ? 'text-green-600' : nw.avgAcceptanceRate >= 15 ? 'text-yellow-600' : 'text-red-500';
                        const accBar = nw.avgAcceptanceRate >= 20 ? 'bg-green-500' : nw.avgAcceptanceRate >= 15 ? 'bg-yellow-400' : 'bg-red-400';
                        const startLabel = nw.campaignStartDate ? \`Since \${nw.campaignStartDate}\` : '';
                        networkHtml = \`
                            <div class="flex items-center justify-between mb-1">
                                <span class="text-xs text-gray-500">Acceptance</span>
                                <span class="text-sm font-bold \${accColor}">\${nw.avgAcceptanceRate}% <span class="font-normal text-gray-400">/ 20%</span></span>
                            </div>
                            <div class="w-full bg-gray-100 rounded-full h-1.5 mb-1">
                                <div class="\${accBar} h-1.5 rounded-full" style="width:\${Math.min((nw.avgAcceptanceRate/20)*100,100)}%"></div>
                            </div>
                            <p class="text-xs text-gray-400">\${nw.totalInvitations.toLocaleString()} invitations\${startLabel ? ' · ' + startLabel : ''}</p>\`;
                    }

                    // Engage pillar
                    const engageGoalPct = co.goalPct || 0;
                    const engColors = goalColor(engageGoalPct);
                    const engageHtml = \`
                        <div class="flex items-center justify-between mb-1">
                            <span class="text-xs text-gray-500">Avg leads/mo</span>
                            <span class="text-sm font-bold \${engColors.text}">\${co.avgLeadsPerMonth || '—'} <span class="font-normal text-gray-400">/ 10</span></span>
                        </div>
                        <div class="w-full bg-gray-100 rounded-full h-1.5 mb-1">
                            <div class="\${engColors.bar} h-1.5 rounded-full" style="width:\${pct}%"></div>
                        </div>
                        <p class="text-xs text-gray-400">\${co.totalLeads} total · \${co.campaignDurationMonths || '?'} months</p>\`;

                    return \`
                    <div class="bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow flex flex-col">
                        <!-- Card header -->
                        <div class="px-5 pt-5 pb-3 border-b border-gray-50">
                            <div class="flex items-start justify-between">
                                <h3 class="text-base font-bold text-gray-800 leading-tight">\${co.name}\${errBadge}</h3>
                                <span class="ml-2 flex-shrink-0 border text-xs font-semibold px-2 py-0.5 rounded-full \${colors.badge}">\${co.goalPct}%</span>
                            </div>
                            <p class="text-3xl font-extrabold text-gray-900 mt-1">\${co.periodLeads} <span class="text-sm font-normal text-gray-400">leads this period</span></p>
                        </div>

                        <!-- 3 pillars -->
                        <div class="grid grid-cols-3 divide-x divide-gray-100 flex-1">
                            <!-- Promote -->
                            <div class="px-3 py-3">
                                <p class="text-xs font-semibold text-yellow-600 uppercase tracking-wide mb-2 flex items-center">
                                    <i class="fas fa-bullhorn mr-1"></i>Promote
                                </p>
                                \${promoteHtml}
                            </div>
                            <!-- Network -->
                            <div class="px-3 py-3">
                                <p class="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2 flex items-center">
                                    <i class="fas fa-users mr-1"></i>Network
                                </p>
                                \${networkHtml}
                            </div>
                            <!-- Engage -->
                            <div class="px-3 py-3">
                                <p class="text-xs font-semibold text-green-600 uppercase tracking-wide mb-2 flex items-center">
                                    <i class="fas fa-handshake mr-1"></i>Engage
                                </p>
                                \${engageHtml}
                            </div>
                        </div>

                        <!-- CTA -->
                        <div class="px-5 pb-4 pt-3">
                            <a href="/?company=\${co.key}" class="block w-full text-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg px-4 py-2 text-sm font-semibold transition-all shadow">
                                <i class="fas fa-chart-line mr-2"></i>View Dashboard
                            </a>
                        </div>
                    </div>\`;
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
  `));M.get("/",e=>e.html(`
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
                            <a href="/overview" class="bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors shadow-md">
                                <i class="fas fa-th-large mr-2"></i>Overview
                            </a>
                            <a href="/admin" class="bg-purple-500 hover:bg-purple-400 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors shadow-md">
                                <i class="fas fa-shield-alt mr-2"></i>Admin Panel
                            </a>
                        </div>
                    </div>
                    <div class="text-right">
                        <div class="mb-3">
                            <span class="inline-block bg-white text-indigo-700 font-bold text-sm px-3 py-1 rounded-full shadow-md tracking-wide">
                                v1.1.8
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
                        <nav class="flex -mb-px overflow-x-auto">
                            <button onclick="switchView('campaign')" id="tab-campaign" class="view-tab active border-b-2 border-blue-500 py-4 px-6 text-sm font-medium text-blue-600 whitespace-nowrap">
                                <i class="fas fa-flag mr-2"></i>CAMPAIGN
                            </button>
                            <button onclick="switchView('promote')" id="tab-promote" class="view-tab border-b-2 border-transparent py-4 px-6 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap">
                                <i class="fas fa-bullhorn mr-2"></i>PROMOTE
                            </button>
                            <button onclick="switchView('network')" id="tab-network" class="view-tab border-b-2 border-transparent py-4 px-6 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap">
                                <i class="fas fa-users mr-2"></i>NETWORK
                            </button>
                            <button onclick="switchView('engage')" id="tab-engage" class="view-tab border-b-2 border-transparent py-4 px-6 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap">
                                <i class="fas fa-handshake mr-2"></i>ENGAGE
                            </button>
                            <button onclick="switchView('print')" id="tab-print" class="view-tab border-b-2 border-transparent py-4 px-6 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap">
                                <i class="fas fa-print mr-2"></i>Print Report
                            </button>
                            <button onclick="switchView('settings')" id="tab-settings" class="view-tab border-b-2 border-transparent py-4 px-6 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap">
                                <i class="fas fa-cog mr-2"></i>Settings
                            </button>
                            <button onclick="switchView('onboarding')" id="tab-onboarding" class="view-tab border-b-2 border-transparent py-4 px-6 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap">
                                <i class="fas fa-rocket mr-2"></i>Onboarding
                            </button>
                        </nav>
                    </div>
                </div>

                <!-- CAMPAIGN View -->
                <div id="view-campaign" class="view-content">
                    <div id="campaign-loading" class="text-center py-8">
                        <i class="fas fa-spinner fa-spin text-3xl text-blue-500 mb-3"></i>
                        <p class="text-gray-500">Loading campaign data...</p>
                    </div>
                    <div id="campaign-content" class="hidden">
                        <!-- Campaign header banner -->
                        <div class="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl p-5 mb-6 text-white flex items-center justify-between">
                            <div>
                                <h2 id="campaign-title" class="text-xl font-bold mb-1">Campaign Overview</h2>
                                <p id="campaign-meta" class="text-blue-100 text-sm"></p>
                            </div>
                            <div class="text-right">
                                <p class="text-blue-200 text-xs uppercase tracking-wide font-semibold mb-1">Objective</p>
                                <p class="text-white text-sm font-medium">10 leads/month · 1 post/day · 20% acceptance</p>
                            </div>
                        </div>

                        <!-- 3 Pillar Cards -->
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

                            <!-- PROMOTE Pillar -->
                            <div class="bg-white rounded-xl shadow border-t-4 border-yellow-400 p-6 flex flex-col">
                                <div class="flex items-center justify-between mb-4">
                                    <h3 class="text-base font-bold text-gray-800 flex items-center">
                                        <i class="fas fa-bullhorn text-yellow-500 mr-2"></i>PROMOTE
                                    </h3>
                                    <span id="campaign-promote-badge" class="text-xs font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">—</span>
                                </div>
                                <div id="campaign-promote-body">
                                    <p class="text-gray-400 text-sm italic">Loading...</p>
                                </div>
                                <div class="mt-auto pt-4">
                                    <button onclick="switchView('promote')" class="w-full text-center text-xs font-semibold text-yellow-600 hover:text-yellow-800 border border-yellow-200 hover:border-yellow-400 rounded-lg py-1.5 transition-all">
                                        View full PROMOTE →
                                    </button>
                                </div>
                            </div>

                            <!-- NETWORK Pillar -->
                            <div class="bg-white rounded-xl shadow border-t-4 border-blue-400 p-6 flex flex-col">
                                <div class="flex items-center justify-between mb-4">
                                    <h3 class="text-base font-bold text-gray-800 flex items-center">
                                        <i class="fas fa-users text-blue-500 mr-2"></i>NETWORK
                                    </h3>
                                    <span id="campaign-network-badge" class="text-xs font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">—</span>
                                </div>
                                <div id="campaign-network-body">
                                    <p class="text-gray-400 text-sm italic">Loading...</p>
                                </div>
                                <div class="mt-auto pt-4">
                                    <button onclick="switchView('network')" class="w-full text-center text-xs font-semibold text-blue-600 hover:text-blue-800 border border-blue-200 hover:border-blue-400 rounded-lg py-1.5 transition-all">
                                        View full NETWORK →
                                    </button>
                                </div>
                            </div>

                            <!-- ENGAGE Pillar -->
                            <div class="bg-white rounded-xl shadow border-t-4 border-green-400 p-6 flex flex-col">
                                <div class="flex items-center justify-between mb-4">
                                    <h3 class="text-base font-bold text-gray-800 flex items-center">
                                        <i class="fas fa-handshake text-green-500 mr-2"></i>ENGAGE
                                    </h3>
                                    <span id="campaign-engage-badge" class="text-xs font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">—</span>
                                </div>
                                <div id="campaign-engage-body">
                                    <p class="text-gray-400 text-sm italic">Loading...</p>
                                </div>
                                <div class="mt-auto pt-4">
                                    <button onclick="switchView('engage')" class="w-full text-center text-xs font-semibold text-green-600 hover:text-green-800 border border-green-200 hover:border-green-400 rounded-lg py-1.5 transition-all">
                                        View full ENGAGE →
                                    </button>
                                </div>
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
            let campaignPromoteLoaded = false;

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
                campaignPromoteLoaded = false;
                Object.values(promoteCharts).forEach((c: any) => c.destroy());
                promoteCharts = {};
                
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
                    document.querySelector('h1').innerHTML = \`
                        <i class="fas fa-chart-line mr-3"></i>
                        \${companyName} - Pipeline Report
                    \`;
                    
                    // Hide loading, show dashboard
                    document.getElementById('loading').classList.add('hidden');
                    document.getElementById('dashboard').classList.remove('hidden');
                    updateTimestamp();

                    // Update summary cards and charts
                    updateDashboard(data);

                    // Render campaign tab (default view)
                    renderCampaignEngage(data);
                    renderCampaignNetwork(data.networkData);
                    loadCampaignPromote();
                    
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
                    } else if (viewName === 'promote') {
                        loadPromoteData();
                    } else if (viewName === 'campaign') {
                        renderCampaignEngage(currentData);
                        renderCampaignNetwork(currentData.networkData);
                        loadCampaignPromote();
                    }
                }
            }

            // ── CAMPAIGN Section ──────────────────────────────────────────────

            function campaignBadgeClass(pct) {
                if (pct === null || pct === undefined) return 'bg-gray-100 text-gray-500';
                return pct >= 80 ? 'bg-green-100 text-green-700' : pct >= 50 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-600';
            }

            function campaignBar(pct, color) {
                const barColors = { green: 'bg-green-500', yellow: 'bg-yellow-400', red: 'bg-red-400', blue: 'bg-blue-500' };
                const barColor = pct >= 80 ? barColors.green : pct >= 50 ? barColors.yellow : barColors.red;
                return \`<div class="w-full bg-gray-100 rounded-full h-2 mt-1">
                    <div class="\${barColor} h-2 rounded-full transition-all duration-700" style="width:\${Math.min(pct,100)}%"></div>
                </div>\`;
            }

            function renderCampaignEngage(data) {
                // Show content, hide loading
                document.getElementById('campaign-loading').classList.add('hidden');
                document.getElementById('campaign-content').classList.remove('hidden');

                const companyName = data.company || (COMPANIES[currentCompany] && COMPANIES[currentCompany].name) || currentCompany;
                document.getElementById('campaign-title').textContent = companyName + ' — Campaign Overview';

                const startDate = data.firstLeadDate
                    ? new Date(data.firstLeadDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                    : null;
                const meta = [
                    startDate ? 'Started ' + startDate : null,
                    data.campaignDurationMonths ? data.campaignDurationMonths + ' months running' : null,
                    data.totalBoxes ? data.totalBoxes + ' total leads' : null
                ].filter(Boolean).join(' · ');
                document.getElementById('campaign-meta').textContent = meta;

                // Engage pillar
                const avgPct = Math.round((data.averageLeadsPerMonth || 0) / 10 * 100);
                document.getElementById('campaign-engage-badge').textContent = avgPct + '%';
                document.getElementById('campaign-engage-badge').className = 'text-xs font-bold px-2 py-0.5 rounded-full ' + campaignBadgeClass(avgPct);

                // Build monthly performance mini-table (last 3 months)
                const recentMonths = (data.monthlyLeads || []).slice(-3);
                const monthRows = recentMonths.map(m => {
                    const mPct = Math.round(m.percentage);
                    const pClass = mPct >= 100 ? 'text-green-600' : mPct >= 50 ? 'text-yellow-600' : 'text-red-500';
                    return \`<div class="flex items-center justify-between py-1 border-b border-gray-50 last:border-0">
                        <span class="text-xs text-gray-500">\${m.monthName}</span>
                        <span class="text-sm font-bold \${pClass}">\${m.count} <span class="font-normal text-gray-400">/ 10</span></span>
                    </div>\`;
                }).join('');

                document.getElementById('campaign-engage-body').innerHTML = \`
                    <div class="mb-3">
                        <div class="flex items-end justify-between">
                            <div>
                                <p class="text-3xl font-extrabold text-gray-900">\${data.averageLeadsPerMonth || '0.0'}</p>
                                <p class="text-xs text-gray-400">avg leads / month</p>
                            </div>
                            <p class="text-sm text-gray-500 mb-1">Goal: <strong>10 / mo</strong></p>
                        </div>
                        \${campaignBar(avgPct, 'green')}
                    </div>
                    <div class="mt-3 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Last 3 months</div>
                    \${monthRows || '<p class="text-xs text-gray-400">No monthly data</p>'}
                \`;
            }

            function renderCampaignNetwork(networkData) {
                if (!networkData || !networkData.allData || networkData.allData.length === 0) {
                    document.getElementById('campaign-network-badge').textContent = 'N/A';
                    document.getElementById('campaign-network-body').innerHTML = \`
                        <p class="text-sm text-gray-400 italic">No network data configured.</p>
                        <p class="text-xs text-gray-400 mt-1">Set a NETWORK Google Sheet URL in Settings.</p>
                    \`;
                    return;
                }
                const accRate = networkData.avgAcceptanceRate;
                const accPct = Math.round((accRate / 20) * 100);
                document.getElementById('campaign-network-badge').textContent = accRate + '%';
                document.getElementById('campaign-network-badge').className = 'text-xs font-bold px-2 py-0.5 rounded-full ' + campaignBadgeClass(accPct);

                const startLabel = networkData.campaignStartDate
                    ? \`<div class="flex items-center justify-between py-1">
                        <span class="text-xs text-gray-500">Campaign start</span>
                        <span class="text-xs font-semibold text-gray-700">\${networkData.campaignStartDate}</span>
                       </div>\`
                    : '';

                document.getElementById('campaign-network-body').innerHTML = \`
                    <div class="mb-3">
                        <div class="flex items-end justify-between">
                            <div>
                                <p class="text-3xl font-extrabold text-gray-900">\${accRate}%</p>
                                <p class="text-xs text-gray-400">acceptance rate</p>
                            </div>
                            <p class="text-sm text-gray-500 mb-1">Goal: <strong>20%</strong></p>
                        </div>
                        \${campaignBar(accPct, 'blue')}
                    </div>
                    <div class="mt-3 space-y-0.5">
                        <div class="flex items-center justify-between py-1 border-b border-gray-50">
                            <span class="text-xs text-gray-500">Invitations sent</span>
                            <span class="text-sm font-bold text-gray-800">\${networkData.totalInvitations.toLocaleString()}</span>
                        </div>
                        <div class="flex items-center justify-between py-1 border-b border-gray-50">
                            <span class="text-xs text-gray-500">Messages sent</span>
                            <span class="text-sm font-bold text-gray-800">\${(networkData.totalMessages || 0).toLocaleString()}</span>
                        </div>
                        \${startLabel}
                    </div>
                \`;
            }

            async function loadCampaignPromote() {
                if (campaignPromoteLoaded) return;
                const company = COMPANIES[currentCompany] || {};
                const promoteUrl = company.sources?.promote || '';
                if (!promoteUrl) {
                    document.getElementById('campaign-promote-badge').textContent = 'N/A';
                    document.getElementById('campaign-promote-body').innerHTML = \`
                        <p class="text-sm text-gray-400 italic">No promote data configured.</p>
                        <p class="text-xs text-gray-400 mt-1">Set a PROMOTE Google Sheet URL in Settings.</p>
                    \`;
                    campaignPromoteLoaded = true;
                    return;
                }
                document.getElementById('campaign-promote-body').innerHTML =
                    '<div class="flex items-center space-x-2"><i class="fas fa-spinner fa-spin text-gray-400"></i><span class="text-xs text-gray-400">Loading...</span></div>';
                try {
                    const res = await fetch(\`/api/promote?company=\${currentCompany}\`);
                    if (!res.ok) throw new Error('No promote data');
                    const data = await res.json();
                    const pd = data.platforms?.linkedin;
                    if (!pd) throw new Error('No LinkedIn data');

                    const dr = pd.dateRange;
                    const totalDays = dr
                        ? Math.max(1, Math.ceil((new Date(dr.to).getTime() - new Date(dr.from).getTime()) / 86400000) + 1)
                        : 1;
                    const avgPerDay = Math.round((pd.totalPosts / totalDays) * 100) / 100;
                    const postPct = Math.min(200, Math.round(avgPerDay * 100));
                    const postColor = postPct >= 80 ? 'text-green-600' : postPct >= 50 ? 'text-yellow-600' : 'text-red-500';

                    document.getElementById('campaign-promote-badge').textContent = postPct + '%';
                    document.getElementById('campaign-promote-badge').className = 'text-xs font-bold px-2 py-0.5 rounded-full ' + campaignBadgeClass(postPct);

                    // Last 3 weeks
                    const recentWeeks = pd.weeklyBreakdown.slice(-3);
                    const weekRows = recentWeeks.map(w => {
                        const wDate = new Date(w.week);
                        const label = \`\${wDate.getDate()}/\${wDate.getMonth()+1}\`;
                        const wPct = Math.round((w.posts / 7) * 100);
                        const wClass = wPct >= 80 ? 'text-green-600' : wPct >= 50 ? 'text-yellow-600' : 'text-red-500';
                        return \`<div class="flex items-center justify-between py-1 border-b border-gray-50 last:border-0">
                            <span class="text-xs text-gray-500">Wk \${label}</span>
                            <span class="text-sm font-bold \${wClass}">\${w.posts} <span class="font-normal text-gray-400">/ 7</span></span>
                        </div>\`;
                    }).join('');

                    document.getElementById('campaign-promote-body').innerHTML = \`
                        <div class="mb-3">
                            <div class="flex items-end justify-between">
                                <div>
                                    <p class="text-3xl font-extrabold \${postColor}">\${avgPerDay}</p>
                                    <p class="text-xs text-gray-400">posts / day avg</p>
                                </div>
                                <p class="text-sm text-gray-500 mb-1">Goal: <strong>1 / day</strong></p>
                            </div>
                            \${campaignBar(postPct, 'yellow')}
                        </div>
                        <div class="mt-3 space-y-0.5">
                            <div class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Last 3 weeks</div>
                            \${weekRows || '<p class="text-xs text-gray-400">No weekly data</p>'}
                        </div>
                        <p class="text-xs text-gray-400 mt-2">\${pd.totalPosts} posts · \${dr ? dr.from + ' → ' + dr.to : ''}</p>
                    \`;
                    campaignPromoteLoaded = true;
                } catch(err) {
                    document.getElementById('campaign-promote-body').innerHTML =
                        \`<p class="text-sm text-red-400 italic">Could not load promote data.</p><p class="text-xs text-gray-400 mt-1">\${err.message}</p>\`;
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
                Object.values(promoteCharts).forEach((c: any) => c.destroy());
                promoteCharts = {};

                const weeks = pd.weeklyBreakdown;
                const weekLabels = weeks.map((w: any) => {
                    const d = new Date(w.week);
                    return \`\${d.getDate()}/\${d.getMonth()+1}\`;
                });

                // Chart 1 — Follower Growth
                const followerDates = pd.dailyData.map((d: any) => {
                    const dt = new Date(d.date);
                    return \`\${dt.getDate()}/\${dt.getMonth()+1}\`;
                });
                promoteCharts.followers = new Chart(document.getElementById('p-chart-followers'), {
                    type: 'line',
                    data: {
                        labels: followerDates,
                        datasets: [{
                            label: 'Followers',
                            data: pd.dailyData.map((d: any) => d.followers),
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
                const postColors = weeks.map((w: any) =>
                    w.posts >= 5 ? 'rgba(34,197,94,0.8)' : w.posts >= 3 ? 'rgba(234,179,8,0.8)' : 'rgba(239,68,68,0.8)');
                promoteCharts.posts = new Chart(document.getElementById('p-chart-posts'), {
                    type: 'bar',
                    data: {
                        labels: weekLabels,
                        datasets: [
                            {
                                label: 'Posts',
                                data: weeks.map((w: any) => w.posts),
                                backgroundColor: postColors, borderRadius: 4
                            },
                            {
                                label: 'Goal (5)',
                                data: weeks.map(() => 5),
                                type: 'line' as any,
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
                            data: weeks.map((w: any) => w.engagements),
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
                                data: weeks.map((w: any) => w.impressions),
                                borderColor: '#22c55e', backgroundColor: 'rgba(34,197,94,0.1)',
                                fill: true, tension: 0.3, pointRadius: 3, borderWidth: 2
                            },
                            {
                                label: 'Reach',
                                data: weeks.map((w: any) => w.reach),
                                borderColor: '#f59e0b', backgroundColor: 'transparent',
                                tension: 0.3, pointRadius: 3, borderWidth: 2, borderDash: [4,3]
                            }
                        ]
                    },
                    options: {
                        responsive: true, maintainAspectRatio: false,
                        plugins: {
                            legend: { position: 'bottom' as any, labels: { font: { size: 10 }, boxWidth: 12 } },
                            datalabels: { display: false }
                        },
                        scales: {
                            x: { ticks: { font: { size: 10 } }, grid: { display: false } },
                            y: { beginAtZero: true, ticks: { font: { size: 10 } }, grid: { color: 'rgba(0,0,0,0.05)' } }
                        }
                    }
                });

                // Weekly consistency table
                const tableRows = weeks.map((w: any) => {
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

                try {
                    const res = await fetch(\`/api/companies/\${currentCompany}\`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ promoteUrl, networkUrl, networkGid, engageUrl })
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

                try {
                    const res = await fetch('/api/companies', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ name, pipelineKey, networkUrl, promoteUrl, engageUrl, networkGid, key })
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
                    const selector = document.getElementById('company-selector');
                    data.companies.forEach(company => {
                        // Merge into COMPANIES object
                        if (!COMPANIES[company.key]) {
                            COMPANIES[company.key] = company;
                            // Add to dropdown if not already there
                            if (selector && !selector.querySelector(\`option[value="\${company.key}"]\`)) {
                                const option = document.createElement('option');
                                option.value = company.key;
                                option.textContent = company.name;
                                selector.appendChild(option);
                            }
                        } else {
                            // Override hardcoded entry with KV version (has saved URLs)
                            COMPANIES[company.key] = { ...COMPANIES[company.key], ...company };
                        }
                    });
                } catch (e) {
                    console.warn('Could not load KV companies:', e);
                }
            }

            // Load dashboard on page load and setup auto-refresh
            loadKVCompanies().then(() => {
                updateSheetsFormulas();
                updateSettingsView();
                loadDashboard();
            });
            setupAutoRefresh();
        <\/script>
    </body>
    </html>
  `));const kt=new Kt,_s=Object.assign({"/src/index.tsx":M});let Zt=!1;for(const[,e]of Object.entries(_s))e&&(kt.route("/",e),kt.notFound(e.notFoundHandler),Zt=!0);if(!Zt)throw new Error("Can't import modules from ['/src/index.tsx','/app/server.ts']");export{kt as default};
