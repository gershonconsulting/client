var Yt=Object.defineProperty;var dt=e=>{throw TypeError(e)};var Kt=(e,t,s)=>t in e?Yt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;var y=(e,t,s)=>Kt(e,typeof t!="symbol"?t+"":t,s),at=(e,t,s)=>t.has(e)||dt("Cannot "+s);var d=(e,t,s)=>(at(e,t,"read from private field"),s?s.call(e):t.get(e)),v=(e,t,s)=>t.has(e)?dt("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,s),h=(e,t,s,a)=>(at(e,t,"write to private field"),a?a.call(e,s):t.set(e,s),s),E=(e,t,s)=>(at(e,t,"access private method"),s);var mt=(e,t,s,a)=>({set _(n){h(e,t,n,s)},get _(){return d(e,t,a)}});var pt=(e,t,s)=>(a,n)=>{let r=-1;return o(0);async function o(i){if(i<=r)throw new Error("next() called multiple times");r=i;let c,l=!1,m;if(e[i]?(m=e[i][0][0],a.req.routeIndex=i):m=i===e.length&&n||void 0,m)try{c=await m(a,()=>o(i+1))}catch(u){if(u instanceof Error&&t)a.error=u,c=await t(u,a),l=!0;else throw u}else a.finalized===!1&&s&&(c=await s(a));return c&&(a.finalized===!1||l)&&(a.res=c),a}},Vt=Symbol(),zt=async(e,t=Object.create(null))=>{const{all:s=!1,dot:a=!1}=t,r=(e instanceof Nt?e.raw.headers:e.headers).get("Content-Type");return r!=null&&r.startsWith("multipart/form-data")||r!=null&&r.startsWith("application/x-www-form-urlencoded")?_t(e,{all:s,dot:a}):{}};async function _t(e,t){const s=await e.formData();return s?Qt(s,t):{}}function Qt(e,t){const s=Object.create(null);return e.forEach((a,n)=>{t.all||n.endsWith("[]")?Xt(s,n,a):s[n]=a}),t.dot&&Object.entries(s).forEach(([a,n])=>{a.includes(".")&&(Zt(s,a,n),delete s[a])}),s}var Xt=(e,t,s)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(s):e[t]=[e[t],s]:t.endsWith("[]")?e[t]=[s]:e[t]=s},Zt=(e,t,s)=>{let a=e;const n=t.split(".");n.forEach((r,o)=>{o===n.length-1?a[r]=s:((!a[r]||typeof a[r]!="object"||Array.isArray(a[r])||a[r]instanceof File)&&(a[r]=Object.create(null)),a=a[r])})},kt=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},qt=e=>{const{groups:t,path:s}=Jt(e),a=kt(s);return es(a,t)},Jt=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(s,a)=>{const n=`@${a}`;return t.push([n,s]),n}),{groups:t,path:e}},es=(e,t)=>{for(let s=t.length-1;s>=0;s--){const[a]=t[s];for(let n=e.length-1;n>=0;n--)if(e[n].includes(a)){e[n]=e[n].replace(a,t[s][1]);break}}return e},Qe={},ts=(e,t)=>{if(e==="*")return"*";const s=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(s){const a=`${e}#${t}`;return Qe[a]||(s[2]?Qe[a]=t&&t[0]!==":"&&t[0]!=="*"?[a,s[1],new RegExp(`^${s[2]}(?=/${t})`)]:[e,s[1],new RegExp(`^${s[2]}$`)]:Qe[a]=[e,s[1],!0]),Qe[a]}return null},it=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,s=>{try{return t(s)}catch{return s}})}},ss=e=>it(e,decodeURI),Ct=e=>{const t=e.url,s=t.indexOf("/",t.indexOf(":")+4);let a=s;for(;a<t.length;a++){const n=t.charCodeAt(a);if(n===37){const r=t.indexOf("?",a),o=t.slice(s,r===-1?void 0:r);return ss(o.includes("%25")?o.replace(/%25/g,"%2525"):o)}else if(n===63)break}return t.slice(s,a)},as=e=>{const t=Ct(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},Ae=(e,t,...s)=>(s.length&&(t=Ae(t,...s)),`${(e==null?void 0:e[0])==="/"?"":"/"}${e}${t==="/"?"":`${(e==null?void 0:e.at(-1))==="/"?"":"/"}${(t==null?void 0:t[0])==="/"?t.slice(1):t}`}`),St=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),s=[];let a="";return t.forEach(n=>{if(n!==""&&!/\:/.test(n))a+="/"+n;else if(/\:/.test(n))if(/\?/.test(n)){s.length===0&&a===""?s.push("/"):s.push(a);const r=n.replace("?","");a+="/"+r,s.push(a)}else a+="/"+n}),s.filter((n,r,o)=>o.indexOf(n)===r)},nt=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?it(e,It):e):e,At=(e,t,s)=>{let a;if(!s&&t&&!/[%+]/.test(t)){let o=e.indexOf("?",8);if(o===-1)return;for(e.startsWith(t,o+1)||(o=e.indexOf(`&${t}`,o+1));o!==-1;){const i=e.charCodeAt(o+t.length+1);if(i===61){const c=o+t.length+2,l=e.indexOf("&",c);return nt(e.slice(c,l===-1?void 0:l))}else if(i==38||isNaN(i))return"";o=e.indexOf(`&${t}`,o+1)}if(a=/[%+]/.test(e),!a)return}const n={};a??(a=/[%+]/.test(e));let r=e.indexOf("?",8);for(;r!==-1;){const o=e.indexOf("&",r+1);let i=e.indexOf("=",r);i>o&&o!==-1&&(i=-1);let c=e.slice(r+1,i===-1?o===-1?void 0:o:i);if(a&&(c=nt(c)),r=o,c==="")continue;let l;i===-1?l="":(l=e.slice(i+1,o===-1?void 0:o),a&&(l=nt(l))),s?(n[c]&&Array.isArray(n[c])||(n[c]=[]),n[c].push(l)):n[c]??(n[c]=l)}return t?n[t]:n},ns=At,rs=(e,t)=>At(e,t,!0),It=decodeURIComponent,ut=e=>it(e,It),Te,V,ce,Tt,Lt,ot,me,yt,Nt=(yt=class{constructor(e,t="/",s=[[]]){v(this,ce);y(this,"raw");v(this,Te);v(this,V);y(this,"routeIndex",0);y(this,"path");y(this,"bodyCache",{});v(this,me,e=>{const{bodyCache:t,raw:s}=this,a=t[e];if(a)return a;const n=Object.keys(t)[0];return n?t[n].then(r=>(n==="json"&&(r=JSON.stringify(r)),new Response(r)[e]())):t[e]=s[e]()});this.raw=e,this.path=t,h(this,V,s),h(this,Te,{})}param(e){return e?E(this,ce,Tt).call(this,e):E(this,ce,Lt).call(this)}query(e){return ns(this.url,e)}queries(e){return rs(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((s,a)=>{t[a]=s}),t}async parseBody(e){var t;return(t=this.bodyCache).parsedBody??(t.parsedBody=await zt(this,e))}json(){return d(this,me).call(this,"text").then(e=>JSON.parse(e))}text(){return d(this,me).call(this,"text")}arrayBuffer(){return d(this,me).call(this,"arrayBuffer")}blob(){return d(this,me).call(this,"blob")}formData(){return d(this,me).call(this,"formData")}addValidatedData(e,t){d(this,Te)[e]=t}valid(e){return d(this,Te)[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[Vt](){return d(this,V)}get matchedRoutes(){return d(this,V)[0].map(([[,e]])=>e)}get routePath(){return d(this,V)[0].map(([[,e]])=>e)[this.routeIndex].path}},Te=new WeakMap,V=new WeakMap,ce=new WeakSet,Tt=function(e){const t=d(this,V)[0][this.routeIndex][1][e],s=E(this,ce,ot).call(this,t);return s&&/\%/.test(s)?ut(s):s},Lt=function(){const e={},t=Object.keys(d(this,V)[0][this.routeIndex][1]);for(const s of t){const a=E(this,ce,ot).call(this,d(this,V)[0][this.routeIndex][1][s]);a!==void 0&&(e[s]=/\%/.test(a)?ut(a):a)}return e},ot=function(e){return d(this,V)[1]?d(this,V)[1][e]:e},me=new WeakMap,yt),os={Stringify:1},Rt=async(e,t,s,a,n)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const r=e.callbacks;return r!=null&&r.length?(n?n[0]+=e:n=[e],Promise.all(r.map(i=>i({phase:t,buffer:n,context:a}))).then(i=>Promise.all(i.filter(Boolean).map(c=>Rt(c,t,!1,a,n))).then(()=>n[0]))):Promise.resolve(e)},is="text/plain; charset=UTF-8",rt=(e,t)=>({"Content-Type":e,...t}),$e,He,re,Le,oe,U,Ye,Re,Me,xe,Ke,Ve,pe,Ie,bt,ls=(bt=class{constructor(e,t){v(this,pe);v(this,$e);v(this,He);y(this,"env",{});v(this,re);y(this,"finalized",!1);y(this,"error");v(this,Le);v(this,oe);v(this,U);v(this,Ye);v(this,Re);v(this,Me);v(this,xe);v(this,Ke);v(this,Ve);y(this,"render",(...e)=>(d(this,Re)??h(this,Re,t=>this.html(t)),d(this,Re).call(this,...e)));y(this,"setLayout",e=>h(this,Ye,e));y(this,"getLayout",()=>d(this,Ye));y(this,"setRenderer",e=>{h(this,Re,e)});y(this,"header",(e,t,s)=>{this.finalized&&h(this,U,new Response(d(this,U).body,d(this,U)));const a=d(this,U)?d(this,U).headers:d(this,xe)??h(this,xe,new Headers);t===void 0?a.delete(e):s!=null&&s.append?a.append(e,t):a.set(e,t)});y(this,"status",e=>{h(this,Le,e)});y(this,"set",(e,t)=>{d(this,re)??h(this,re,new Map),d(this,re).set(e,t)});y(this,"get",e=>d(this,re)?d(this,re).get(e):void 0);y(this,"newResponse",(...e)=>E(this,pe,Ie).call(this,...e));y(this,"body",(e,t,s)=>E(this,pe,Ie).call(this,e,t,s));y(this,"text",(e,t,s)=>!d(this,xe)&&!d(this,Le)&&!t&&!s&&!this.finalized?new Response(e):E(this,pe,Ie).call(this,e,t,rt(is,s)));y(this,"json",(e,t,s)=>E(this,pe,Ie).call(this,JSON.stringify(e),t,rt("application/json",s)));y(this,"html",(e,t,s)=>{const a=n=>E(this,pe,Ie).call(this,n,t,rt("text/html; charset=UTF-8",s));return typeof e=="object"?Rt(e,os.Stringify,!1,{}).then(a):a(e)});y(this,"redirect",(e,t)=>{const s=String(e);return this.header("Location",/[^\x00-\xFF]/.test(s)?encodeURI(s):s),this.newResponse(null,t??302)});y(this,"notFound",()=>(d(this,Me)??h(this,Me,()=>new Response),d(this,Me).call(this,this)));h(this,$e,e),t&&(h(this,oe,t.executionCtx),this.env=t.env,h(this,Me,t.notFoundHandler),h(this,Ve,t.path),h(this,Ke,t.matchResult))}get req(){return d(this,He)??h(this,He,new Nt(d(this,$e),d(this,Ve),d(this,Ke))),d(this,He)}get event(){if(d(this,oe)&&"respondWith"in d(this,oe))return d(this,oe);throw Error("This context has no FetchEvent")}get executionCtx(){if(d(this,oe))return d(this,oe);throw Error("This context has no ExecutionContext")}get res(){return d(this,U)||h(this,U,new Response(null,{headers:d(this,xe)??h(this,xe,new Headers)}))}set res(e){if(d(this,U)&&e){e=new Response(e.body,e);for(const[t,s]of d(this,U).headers.entries())if(t!=="content-type")if(t==="set-cookie"){const a=d(this,U).headers.getSetCookie();e.headers.delete("set-cookie");for(const n of a)e.headers.append("set-cookie",n)}else e.headers.set(t,s)}h(this,U,e),this.finalized=!0}get var(){return d(this,re)?Object.fromEntries(d(this,re)):{}}},$e=new WeakMap,He=new WeakMap,re=new WeakMap,Le=new WeakMap,oe=new WeakMap,U=new WeakMap,Ye=new WeakMap,Re=new WeakMap,Me=new WeakMap,xe=new WeakMap,Ke=new WeakMap,Ve=new WeakMap,pe=new WeakSet,Ie=function(e,t,s){const a=d(this,U)?new Headers(d(this,U).headers):d(this,xe)??new Headers;if(typeof t=="object"&&"headers"in t){const r=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[o,i]of r)o.toLowerCase()==="set-cookie"?a.append(o,i):a.set(o,i)}if(s)for(const[r,o]of Object.entries(s))if(typeof o=="string")a.set(r,o);else{a.delete(r);for(const i of o)a.append(r,i)}const n=typeof t=="number"?t:(t==null?void 0:t.status)??d(this,Le);return new Response(e,{status:n,headers:a})},bt),O="ALL",cs="all",ds=["get","post","put","delete","options","patch"],Mt="Can not add a route since the matcher is already built.",Dt=class extends Error{},ms="__COMPOSED_HANDLER",ps=e=>e.text("404 Not Found",404),gt=(e,t)=>{if("getResponse"in e){const s=e.getResponse();return t.newResponse(s.body,s)}return console.error(e),t.text("Internal Server Error",500)},Z,F,Ot,q,ye,Xe,Ze,De,us=(De=class{constructor(t={}){v(this,F);y(this,"get");y(this,"post");y(this,"put");y(this,"delete");y(this,"options");y(this,"patch");y(this,"all");y(this,"on");y(this,"use");y(this,"router");y(this,"getPath");y(this,"_basePath","/");v(this,Z,"/");y(this,"routes",[]);v(this,q,ps);y(this,"errorHandler",gt);y(this,"onError",t=>(this.errorHandler=t,this));y(this,"notFound",t=>(h(this,q,t),this));y(this,"fetch",(t,...s)=>E(this,F,Ze).call(this,t,s[1],s[0],t.method));y(this,"request",(t,s,a,n)=>t instanceof Request?this.fetch(s?new Request(t,s):t,a,n):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${Ae("/",t)}`,s),a,n)));y(this,"fire",()=>{addEventListener("fetch",t=>{t.respondWith(E(this,F,Ze).call(this,t.request,t,void 0,t.request.method))})});[...ds,cs].forEach(r=>{this[r]=(o,...i)=>(typeof o=="string"?h(this,Z,o):E(this,F,ye).call(this,r,d(this,Z),o),i.forEach(c=>{E(this,F,ye).call(this,r,d(this,Z),c)}),this)}),this.on=(r,o,...i)=>{for(const c of[o].flat()){h(this,Z,c);for(const l of[r].flat())i.map(m=>{E(this,F,ye).call(this,l.toUpperCase(),d(this,Z),m)})}return this},this.use=(r,...o)=>(typeof r=="string"?h(this,Z,r):(h(this,Z,"*"),o.unshift(r)),o.forEach(i=>{E(this,F,ye).call(this,O,d(this,Z),i)}),this);const{strict:a,...n}=t;Object.assign(this,n),this.getPath=a??!0?t.getPath??Ct:as}route(t,s){const a=this.basePath(t);return s.routes.map(n=>{var o;let r;s.errorHandler===gt?r=n.handler:(r=async(i,c)=>(await pt([],s.errorHandler)(i,()=>n.handler(i,c))).res,r[ms]=n.handler),E(o=a,F,ye).call(o,n.method,n.path,r)}),this}basePath(t){const s=E(this,F,Ot).call(this);return s._basePath=Ae(this._basePath,t),s}mount(t,s,a){let n,r;a&&(typeof a=="function"?r=a:(r=a.optionHandler,a.replaceRequest===!1?n=c=>c:n=a.replaceRequest));const o=r?c=>{const l=r(c);return Array.isArray(l)?l:[l]}:c=>{let l;try{l=c.executionCtx}catch{}return[c.env,l]};n||(n=(()=>{const c=Ae(this._basePath,t),l=c==="/"?0:c.length;return m=>{const u=new URL(m.url);return u.pathname=u.pathname.slice(l)||"/",new Request(u,m)}})());const i=async(c,l)=>{const m=await s(n(c.req.raw),...o(c));if(m)return m;await l()};return E(this,F,ye).call(this,O,Ae(t,"*"),i),this}},Z=new WeakMap,F=new WeakSet,Ot=function(){const t=new De({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,h(t,q,d(this,q)),t.routes=this.routes,t},q=new WeakMap,ye=function(t,s,a){t=t.toUpperCase(),s=Ae(this._basePath,s);const n={basePath:this._basePath,path:s,method:t,handler:a};this.router.add(t,s,[a,n]),this.routes.push(n)},Xe=function(t,s){if(t instanceof Error)return this.errorHandler(t,s);throw t},Ze=function(t,s,a,n){if(n==="HEAD")return(async()=>new Response(null,await E(this,F,Ze).call(this,t,s,a,"GET")))();const r=this.getPath(t,{env:a}),o=this.router.match(n,r),i=new ls(t,{path:r,matchResult:o,env:a,executionCtx:s,notFoundHandler:d(this,q)});if(o[0].length===1){let l;try{l=o[0][0][0][0](i,async()=>{i.res=await d(this,q).call(this,i)})}catch(m){return E(this,F,Xe).call(this,m,i)}return l instanceof Promise?l.then(m=>m||(i.finalized?i.res:d(this,q).call(this,i))).catch(m=>E(this,F,Xe).call(this,m,i)):l??d(this,q).call(this,i)}const c=pt(o[0],this.errorHandler,d(this,q));return(async()=>{try{const l=await c(i);if(!l.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return l.res}catch(l){return E(this,F,Xe).call(this,l,i)}})()},De),Ft=[];function gs(e,t){const s=this.buildAllMatchers(),a=((n,r)=>{const o=s[n]||s[O],i=o[2][r];if(i)return i;const c=r.match(o[0]);if(!c)return[[],Ft];const l=c.indexOf("",1);return[o[1][l],c]});return this.match=a,a(e,t)}var Je="[^/]+",Ue=".*",Be="(?:|/.*)",Ne=Symbol(),fs=new Set(".\\+*[^]$()");function hs(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===Ue||e===Be?1:t===Ue||t===Be?-1:e===Je?1:t===Je?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var ve,we,J,Ce,ys=(Ce=class{constructor(){v(this,ve);v(this,we);v(this,J,Object.create(null))}insert(t,s,a,n,r){if(t.length===0){if(d(this,ve)!==void 0)throw Ne;if(r)return;h(this,ve,s);return}const[o,...i]=t,c=o==="*"?i.length===0?["","",Ue]:["","",Je]:o==="/*"?["","",Be]:o.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let l;if(c){const m=c[1];let u=c[2]||Je;if(m&&c[2]&&(u===".*"||(u=u.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(u))))throw Ne;if(l=d(this,J)[u],!l){if(Object.keys(d(this,J)).some(g=>g!==Ue&&g!==Be))throw Ne;if(r)return;l=d(this,J)[u]=new Ce,m!==""&&h(l,we,n.varIndex++)}!r&&m!==""&&a.push([m,d(l,we)])}else if(l=d(this,J)[o],!l){if(Object.keys(d(this,J)).some(m=>m.length>1&&m!==Ue&&m!==Be))throw Ne;if(r)return;l=d(this,J)[o]=new Ce}l.insert(i,s,a,n,r)}buildRegExpStr(){const s=Object.keys(d(this,J)).sort(hs).map(a=>{const n=d(this,J)[a];return(typeof d(n,we)=="number"?`(${a})@${d(n,we)}`:fs.has(a)?`\\${a}`:a)+n.buildRegExpStr()});return typeof d(this,ve)=="number"&&s.unshift(`#${d(this,ve)}`),s.length===0?"":s.length===1?s[0]:"(?:"+s.join("|")+")"}},ve=new WeakMap,we=new WeakMap,J=new WeakMap,Ce),et,ze,xt,bs=(xt=class{constructor(){v(this,et,{varIndex:0});v(this,ze,new ys)}insert(e,t,s){const a=[],n=[];for(let o=0;;){let i=!1;if(e=e.replace(/\{[^}]+\}/g,c=>{const l=`@\\${o}`;return n[o]=[l,c],o++,i=!0,l}),!i)break}const r=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let o=n.length-1;o>=0;o--){const[i]=n[o];for(let c=r.length-1;c>=0;c--)if(r[c].indexOf(i)!==-1){r[c]=r[c].replace(i,n[o][1]);break}}return d(this,ze).insert(r,t,a,d(this,et),s),a}buildRegExp(){let e=d(this,ze).buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const s=[],a=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(n,r,o)=>r!==void 0?(s[++t]=Number(r),"$()"):(o!==void 0&&(a[Number(o)]=++t),"")),[new RegExp(`^${e}`),s,a]}},et=new WeakMap,ze=new WeakMap,xt),xs=[/^$/,[],Object.create(null)],qe=Object.create(null);function Pt(e){return qe[e]??(qe[e]=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,s)=>s?`\\${s}`:"(?:|/.*)")}$`))}function vs(){qe=Object.create(null)}function ws(e){var l;const t=new bs,s=[];if(e.length===0)return xs;const a=e.map(m=>[!/\*|\/:/.test(m[0]),...m]).sort(([m,u],[g,f])=>m?1:g?-1:u.length-f.length),n=Object.create(null);for(let m=0,u=-1,g=a.length;m<g;m++){const[f,k,w]=a[m];f?n[k]=[w.map(([x])=>[x,Object.create(null)]),Ft]:u++;let b;try{b=t.insert(k,u,f)}catch(x){throw x===Ne?new Dt(k):x}f||(s[u]=w.map(([x,A])=>{const D=Object.create(null);for(A-=1;A>=0;A--){const[ee,R]=b[A];D[ee]=R}return[x,D]}))}const[r,o,i]=t.buildRegExp();for(let m=0,u=s.length;m<u;m++)for(let g=0,f=s[m].length;g<f;g++){const k=(l=s[m][g])==null?void 0:l[1];if(!k)continue;const w=Object.keys(k);for(let b=0,x=w.length;b<x;b++)k[w[b]]=i[k[w[b]]]}const c=[];for(const m in o)c[m]=s[o[m]];return[r,c,n]}function Se(e,t){if(e){for(const s of Object.keys(e).sort((a,n)=>n.length-a.length))if(Pt(s).test(t))return[...e[s]]}}var ue,ge,tt,jt,vt,Es=(vt=class{constructor(){v(this,tt);y(this,"name","RegExpRouter");v(this,ue);v(this,ge);y(this,"match",gs);h(this,ue,{[O]:Object.create(null)}),h(this,ge,{[O]:Object.create(null)})}add(e,t,s){var i;const a=d(this,ue),n=d(this,ge);if(!a||!n)throw new Error(Mt);a[e]||[a,n].forEach(c=>{c[e]=Object.create(null),Object.keys(c[O]).forEach(l=>{c[e][l]=[...c[O][l]]})}),t==="/*"&&(t="*");const r=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const c=Pt(t);e===O?Object.keys(a).forEach(l=>{var m;(m=a[l])[t]||(m[t]=Se(a[l],t)||Se(a[O],t)||[])}):(i=a[e])[t]||(i[t]=Se(a[e],t)||Se(a[O],t)||[]),Object.keys(a).forEach(l=>{(e===O||e===l)&&Object.keys(a[l]).forEach(m=>{c.test(m)&&a[l][m].push([s,r])})}),Object.keys(n).forEach(l=>{(e===O||e===l)&&Object.keys(n[l]).forEach(m=>c.test(m)&&n[l][m].push([s,r]))});return}const o=St(t)||[t];for(let c=0,l=o.length;c<l;c++){const m=o[c];Object.keys(n).forEach(u=>{var g;(e===O||e===u)&&((g=n[u])[m]||(g[m]=[...Se(a[u],m)||Se(a[O],m)||[]]),n[u][m].push([s,r-l+c+1]))})}}buildAllMatchers(){const e=Object.create(null);return Object.keys(d(this,ge)).concat(Object.keys(d(this,ue))).forEach(t=>{e[t]||(e[t]=E(this,tt,jt).call(this,t))}),h(this,ue,h(this,ge,void 0)),vs(),e}},ue=new WeakMap,ge=new WeakMap,tt=new WeakSet,jt=function(e){const t=[];let s=e===O;return[d(this,ue),d(this,ge)].forEach(a=>{const n=a[e]?Object.keys(a[e]).map(r=>[r,a[e][r]]):[];n.length!==0?(s||(s=!0),t.push(...n)):e!==O&&t.push(...Object.keys(a[O]).map(r=>[r,a[O][r]]))}),s?ws(t):null},vt),fe,ie,wt,ks=(wt=class{constructor(e){y(this,"name","SmartRouter");v(this,fe,[]);v(this,ie,[]);h(this,fe,e.routers)}add(e,t,s){if(!d(this,ie))throw new Error(Mt);d(this,ie).push([e,t,s])}match(e,t){if(!d(this,ie))throw new Error("Fatal error");const s=d(this,fe),a=d(this,ie),n=s.length;let r=0,o;for(;r<n;r++){const i=s[r];try{for(let c=0,l=a.length;c<l;c++)i.add(...a[c]);o=i.match(e,t)}catch(c){if(c instanceof Dt)continue;throw c}this.match=i.match.bind(i),h(this,fe,[i]),h(this,ie,void 0);break}if(r===n)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,o}get activeRouter(){if(d(this,ie)||d(this,fe).length!==1)throw new Error("No active router has been determined yet.");return d(this,fe)[0]}},fe=new WeakMap,ie=new WeakMap,wt),Ge=Object.create(null),he,W,Ee,Oe,j,le,be,Fe,Cs=(Fe=class{constructor(t,s,a){v(this,le);v(this,he);v(this,W);v(this,Ee);v(this,Oe,0);v(this,j,Ge);if(h(this,W,a||Object.create(null)),h(this,he,[]),t&&s){const n=Object.create(null);n[t]={handler:s,possibleKeys:[],score:0},h(this,he,[n])}h(this,Ee,[])}insert(t,s,a){h(this,Oe,++mt(this,Oe)._);let n=this;const r=qt(s),o=[];for(let i=0,c=r.length;i<c;i++){const l=r[i],m=r[i+1],u=ts(l,m),g=Array.isArray(u)?u[0]:l;if(g in d(n,W)){n=d(n,W)[g],u&&o.push(u[1]);continue}d(n,W)[g]=new Fe,u&&(d(n,Ee).push(u),o.push(u[1])),n=d(n,W)[g]}return d(n,he).push({[t]:{handler:a,possibleKeys:o.filter((i,c,l)=>l.indexOf(i)===c),score:d(this,Oe)}}),n}search(t,s){var c;const a=[];h(this,j,Ge);let r=[this];const o=kt(s),i=[];for(let l=0,m=o.length;l<m;l++){const u=o[l],g=l===m-1,f=[];for(let k=0,w=r.length;k<w;k++){const b=r[k],x=d(b,W)[u];x&&(h(x,j,d(b,j)),g?(d(x,W)["*"]&&a.push(...E(this,le,be).call(this,d(x,W)["*"],t,d(b,j))),a.push(...E(this,le,be).call(this,x,t,d(b,j)))):f.push(x));for(let A=0,D=d(b,Ee).length;A<D;A++){const ee=d(b,Ee)[A],R=d(b,j)===Ge?{}:{...d(b,j)};if(ee==="*"){const $=d(b,W)["*"];$&&(a.push(...E(this,le,be).call(this,$,t,d(b,j))),h($,j,R),f.push($));continue}const[te,Pe,de]=ee;if(!u&&!(de instanceof RegExp))continue;const B=d(b,W)[te],je=o.slice(l).join("/");if(de instanceof RegExp){const $=de.exec(je);if($){if(R[Pe]=$[0],a.push(...E(this,le,be).call(this,B,t,d(b,j),R)),Object.keys(d(B,W)).length){h(B,j,R);const _e=((c=$[0].match(/\//))==null?void 0:c.length)??0;(i[_e]||(i[_e]=[])).push(B)}continue}}(de===!0||de.test(u))&&(R[Pe]=u,g?(a.push(...E(this,le,be).call(this,B,t,R,d(b,j))),d(B,W)["*"]&&a.push(...E(this,le,be).call(this,d(B,W)["*"],t,R,d(b,j)))):(h(B,j,R),f.push(B)))}}r=f.concat(i.shift()??[])}return a.length>1&&a.sort((l,m)=>l.score-m.score),[a.map(({handler:l,params:m})=>[l,m])]}},he=new WeakMap,W=new WeakMap,Ee=new WeakMap,Oe=new WeakMap,j=new WeakMap,le=new WeakSet,be=function(t,s,a,n){const r=[];for(let o=0,i=d(t,he).length;o<i;o++){const c=d(t,he)[o],l=c[s]||c[O],m={};if(l!==void 0&&(l.params=Object.create(null),r.push(l),a!==Ge||n&&n!==Ge))for(let u=0,g=l.possibleKeys.length;u<g;u++){const f=l.possibleKeys[u],k=m[l.score];l.params[f]=n!=null&&n[f]&&!k?n[f]:a[f]??(n==null?void 0:n[f]),m[l.score]=!0}}return r},Fe),ke,Et,Ss=(Et=class{constructor(){y(this,"name","TrieRouter");v(this,ke);h(this,ke,new Cs)}add(e,t,s){const a=St(t);if(a){for(let n=0,r=a.length;n<r;n++)d(this,ke).insert(e,a[n],s);return}d(this,ke).insert(e,t,s)}match(e,t){return d(this,ke).search(e,t)}},ke=new WeakMap,Et),Wt=class extends us{constructor(e={}){super(e),this.router=e.router??new ks({routers:[new Es,new Ss]})}},As=e=>{const s={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...e},a=(r=>typeof r=="string"?r==="*"?()=>r:o=>r===o?o:null:typeof r=="function"?r:o=>r.includes(o)?o:null)(s.origin),n=(r=>typeof r=="function"?r:Array.isArray(r)?()=>r:()=>[])(s.allowMethods);return async function(o,i){var m;function c(u,g){o.res.headers.set(u,g)}const l=await a(o.req.header("origin")||"",o);if(l&&c("Access-Control-Allow-Origin",l),s.credentials&&c("Access-Control-Allow-Credentials","true"),(m=s.exposeHeaders)!=null&&m.length&&c("Access-Control-Expose-Headers",s.exposeHeaders.join(",")),o.req.method==="OPTIONS"){s.origin!=="*"&&c("Vary","Origin"),s.maxAge!=null&&c("Access-Control-Max-Age",s.maxAge.toString());const u=await n(o.req.header("origin")||"",o);u.length&&c("Access-Control-Allow-Methods",u.join(","));let g=s.allowHeaders;if(!(g!=null&&g.length)){const f=o.req.header("Access-Control-Request-Headers");f&&(g=f.split(/\s*,\s*/))}return g!=null&&g.length&&(c("Access-Control-Allow-Headers",g.join(",")),o.res.headers.append("Vary","Access-Control-Request-Headers")),o.res.headers.delete("Content-Length"),o.res.headers.delete("Content-Type"),new Response(null,{headers:o.res.headers,status:204,statusText:"No Content"})}await i(),s.origin!=="*"&&o.header("Vary","Origin",{append:!0})}},Is=/^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i,ft=(e,t=Ts)=>{const s=/\.([a-zA-Z0-9]+?)$/,a=e.match(s);if(!a)return;let n=t[a[1]];return n&&n.startsWith("text")&&(n+="; charset=utf-8"),n},Ns={aac:"audio/aac",avi:"video/x-msvideo",avif:"image/avif",av1:"video/av1",bin:"application/octet-stream",bmp:"image/bmp",css:"text/css",csv:"text/csv",eot:"application/vnd.ms-fontobject",epub:"application/epub+zip",gif:"image/gif",gz:"application/gzip",htm:"text/html",html:"text/html",ico:"image/x-icon",ics:"text/calendar",jpeg:"image/jpeg",jpg:"image/jpeg",js:"text/javascript",json:"application/json",jsonld:"application/ld+json",map:"application/json",mid:"audio/x-midi",midi:"audio/x-midi",mjs:"text/javascript",mp3:"audio/mpeg",mp4:"video/mp4",mpeg:"video/mpeg",oga:"audio/ogg",ogv:"video/ogg",ogx:"application/ogg",opus:"audio/opus",otf:"font/otf",pdf:"application/pdf",png:"image/png",rtf:"application/rtf",svg:"image/svg+xml",tif:"image/tiff",tiff:"image/tiff",ts:"video/mp2t",ttf:"font/ttf",txt:"text/plain",wasm:"application/wasm",webm:"video/webm",weba:"audio/webm",webmanifest:"application/manifest+json",webp:"image/webp",woff:"font/woff",woff2:"font/woff2",xhtml:"application/xhtml+xml",xml:"application/xml",zip:"application/zip","3gp":"video/3gpp","3g2":"video/3gpp2",gltf:"model/gltf+json",glb:"model/gltf-binary"},Ts=Ns,Ls=(...e)=>{let t=e.filter(n=>n!=="").join("/");t=t.replace(new RegExp("(?<=\\/)\\/+","g"),"");const s=t.split("/"),a=[];for(const n of s)n===".."&&a.length>0&&a.at(-1)!==".."?a.pop():n!=="."&&a.push(n);return a.join("/")||"."},Gt={br:".br",zstd:".zst",gzip:".gz"},Rs=Object.keys(Gt),Ms="index.html",Ds=e=>{const t=e.root??"./",s=e.path,a=e.join??Ls;return async(n,r)=>{var m,u,g,f;if(n.finalized)return r();let o;if(e.path)o=e.path;else try{if(o=decodeURIComponent(n.req.path),/(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(o))throw new Error}catch{return await((m=e.onNotFound)==null?void 0:m.call(e,n.req.path,n)),r()}let i=a(t,!s&&e.rewriteRequestPath?e.rewriteRequestPath(o):o);e.isDir&&await e.isDir(i)&&(i=a(i,Ms));const c=e.getContent;let l=await c(i,n);if(l instanceof Response)return n.newResponse(l.body,l);if(l){const k=e.mimes&&ft(i,e.mimes)||ft(i);if(n.header("Content-Type",k||"application/octet-stream"),e.precompressed&&(!k||Is.test(k))){const w=new Set((u=n.req.header("Accept-Encoding"))==null?void 0:u.split(",").map(b=>b.trim()));for(const b of Rs){if(!w.has(b))continue;const x=await c(i+Gt[b],n);if(x){l=x,n.header("Content-Encoding",b),n.header("Vary","Accept-Encoding",{append:!0});break}}}return await((g=e.onFound)==null?void 0:g.call(e,i,n)),n.body(l)}await((f=e.onNotFound)==null?void 0:f.call(e,i,n)),await r()}},Os=async(e,t)=>{let s;t&&t.manifest?typeof t.manifest=="string"?s=JSON.parse(t.manifest):s=t.manifest:typeof __STATIC_CONTENT_MANIFEST=="string"?s=JSON.parse(__STATIC_CONTENT_MANIFEST):s=__STATIC_CONTENT_MANIFEST;let a;t&&t.namespace?a=t.namespace:a=__STATIC_CONTENT;const n=s[e]||e;if(!n)return null;const r=await a.get(n,{type:"stream"});return r||null},Fs=e=>async function(s,a){return Ds({...e,getContent:async r=>Os(r,{manifest:e.manifest,namespace:e.namespace?e.namespace:s.env?s.env.__STATIC_CONTENT:void 0})})(s,a)},Ps=e=>Fs(e);const L=new Wt;L.use("/api/*",As());L.use("/static/*",Ps({root:"./public"}));const js="e77554988b424c6498d85362b0367757",Ws="https://www.streak.com/api/v1",ne={mabsilico:{name:"MabSilico",pipelineKey:"agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgOqI26zZCAw",url:"https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgOqI26zZCAw",networkSheetGid:"910674612",sources:{promote:"",network:"https://docs.google.com/spreadsheets/d/1NzUlKfHTW6v7i-S59GjtBFlzQwTX2AaeK4gQ4fVSAsw/edit?gid=910674612#gid=910674612",engage:"https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgOqI26zZCAw"}},"finance-montreal":{name:"Finance Montreal (Steve)",pipelineKey:"agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgI7YkpykCQw",url:"https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgI7YkpykCQw"},"apm-music":{name:"APM Music",pipelineKey:"agxzfm1haWxmb29nYWVyRAsSDE9yZ2FuaXphdGlvbiIdYWluYS5hbmRyaWFtYW5nYXNvbkBnbWFpbC5jb20MCxIIV29ya2Zsb3cYgIClnNb8gwsM",url:"https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyRAsSDE9yZ2FuaXphdGlvbiIdYWluYS5hbmRyaWFtYW5nYXNvbkBnbWFpbC5jb20MCxIIV29ya2Zsb3cYgIClnNb8gwsM"},ducrocq:{name:"Ducrocq",pipelineKey:"agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgNaSl4OGCww",url:"https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgNaSl4OGCww"},milvue:{name:"Milvue",pipelineKey:"agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgMX-7baZCgw",url:"https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgMX-7baZCgw"},seekyo:{name:"Seekyo Therapeutics",pipelineKey:"agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgLnYo_uUCww",url:"https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgLnYo_uUCww"},altavia:{name:"Altavia",pipelineKey:"agxzfm1haWxmb29nYWVyRAsSDE9yZ2FuaXphdGlvbiIdYWluYS5hbmRyaWFtYW5nYXNvbkBnbWFpbC5jb20MCxIIV29ya2Zsb3cYgICFz_elmwgM",url:"https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyRAsSDE9yZ2FuaXphdGlvbiIdYWluYS5hbmRyaWFtYW5nYXNvbkBnbWFpbC5jb20MCxIIV29ya2Zsb3cYgICFz_elmwgM"},valos:{name:"Valos",pipelineKey:"agxzfm1haWxmb29nYWVyRAsSDE9yZ2FuaXphdGlvbiIdYWluYS5hbmRyaWFtYW5nYXNvbkBnbWFpbC5jb20MCxIIV29ya2Zsb3cYgICF5ei7lgkM",url:"https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyRAsSDE9yZ2FuaXphdGlvbiIdYWluYS5hbmRyaWFtYW5nYXNvbkBnbWFpbC5jb20MCxIIV29ya2Zsb3cYgICF5ei7lgkM"},"dab-embedded":{name:"DAB-Embedded",pipelineKey:"agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgKWyqIboCww",url:"https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgKWyqIboCww"},"finance-montreal-noza":{name:"Finance Montreal (Noza)",pipelineKey:"agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgKWVvvDkCgw",url:"https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgKWVvvDkCgw"}},H=ne.mabsilico.pipelineKey,Ut="Fit",Bt="Interest",Gs="1NzUlKfHTW6v7i-S59GjtBFlzQwTX2AaeK4gQ4fVSAsw",Us=`https://docs.google.com/spreadsheets/d/${Gs}/export?format=csv`;async function T(e){const t=btoa(`${js}:`),s=await fetch(`${Ws}${e}`,{headers:{Authorization:`Basic ${t}`,"Content-Type":"application/json"}});if(!s.ok)throw new Error(`Streak API error: ${s.statusText}`);return s.json()}async function Bs(e){try{const t=`${Us}&gid=${e}`,s=await fetch(t);if(!s.ok)throw new Error(`Google Sheets error: ${s.statusText}`);const n=(await s.text()).split(`
`).filter(w=>w.trim()),r=[];for(let w=1;w<n.length;w++){const x=n[w].split(",");if(x.length>=9&&x[3]&&x[3].trim()){const A=parseInt(x[3])||0,D=parseInt(x[4])||0,ee=x[7]?x[7].replace("%","").trim():"0",R=parseFloat(ee)||0;r.push({week:x[0],from:x[1],to:x[2],invitations:A,messages:D,acceptance:R,opportunities:parseInt(x[8])||0})}}const o=r.reduce((w,b)=>w+b.invitations,0),i=r.reduce((w,b)=>{const x=Math.min(b.acceptance,100);return w+Math.round(b.invitations*x/100)},0),c=r.map(w=>Math.min(w.acceptance,100)),l=c.length>0?c.reduce((w,b)=>w+b,0)/c.length:0,m=20,u=l>0?l/m*100:0,g=r.slice(-4),f=r[r.length-1]||{invitations:0,acceptance:0},k=r[r.length-2]||{invitations:0,acceptance:0};return{totalInvitations:o,totalAccepted:i,avgAcceptanceRate:Math.round(l*10)/10,networkObjective:m,objectiveAchievement:Math.round(u*10)/10,thisWeek:{invitations:f.invitations,acceptance:Math.min(f.acceptance,100)},lastWeek:{invitations:k.invitations,acceptance:Math.min(k.acceptance,100)},recentWeeks:g.map(w=>({...w,acceptance:Math.min(w.acceptance,100)})),allData:r}}catch(t){return console.error("Error fetching network data:",t),{totalInvitations:0,totalAccepted:0,avgAcceptanceRate:0,thisWeek:{invitations:0,acceptance:0},lastWeek:{invitations:0,acceptance:0},recentWeeks:[],allData:[]}}}L.get("/api/pipeline",async e=>{try{const t=await T(`/pipelines/${H}`);return e.json(t)}catch(t){return e.json({error:t.message},500)}});L.get("/api/boxes",async e=>{try{const t=await T(`/pipelines/${H}/boxes`);return e.json(t)}catch(t){return e.json({error:t.message},500)}});L.get("/api/boxes/:boxKey",async e=>{try{const t=e.req.param("boxKey"),s=await T(`/boxes/${t}`);return e.json(s)}catch(t){return e.json({error:t.message},500)}});L.get("/api/sheets/stage/:stageName/count",async e=>{try{const t=e.req.param("stageName"),[s,a]=await Promise.all([T(`/pipelines/${H}`),T(`/pipelines/${H}/boxes`)]),n=s.stageOrder||[],r=Array.isArray(n)?n.map(i=>{var c,l;return{key:i,name:((l=(c=s.stages)==null?void 0:c[i])==null?void 0:l.name)||"Unknown"}}):[],o=Array.isArray(a)?a.filter(i=>{const c=r.find(l=>l&&l.key===i.stageKey);return c&&c.name.toLowerCase()===t.toLowerCase()}).length:0;return e.text(o.toString())}catch{return e.text("ERROR")}});L.get("/api/sheets/priority/:priorityName/count",async e=>{try{const t=e.req.param("priorityName"),[s,a]=await Promise.all([T(`/pipelines/${H}`),T(`/pipelines/${H}/boxes`)]),r=(Array.isArray(s.fields)?s.fields:[]).find(i=>i&&i.name==="Priority"),o=Array.isArray(a)?a.filter(i=>{var g;if(!r||!i.fields||!i.fields[r.key])return t.toLowerCase()==="no priority";const c=i.fields[r.key],l=(g=r.dropdownSettings)==null?void 0:g.items,m=Array.isArray(l)?l.find(f=>f&&f.key===c):null;return(m?m.name:"No Priority").toLowerCase().includes(t.toLowerCase())}).length:0;return e.text(o.toString())}catch{return e.text("ERROR")}});L.get("/api/sheets/country/:countryName/count",async e=>{try{const t=e.req.param("countryName"),[s,a]=await Promise.all([T(`/pipelines/${H}`),T(`/pipelines/${H}/boxes`)]),r=(Array.isArray(s.fields)?s.fields:[]).find(i=>i&&i.name==="Country"),o=Array.isArray(a)?a.filter(i=>{var g;if(!r||!i.fields||!i.fields[r.key])return t.toLowerCase()==="unknown";const c=i.fields[r.key],l=(g=r.dropdownSettings)==null?void 0:g.items,m=Array.isArray(l)?l.find(f=>f&&f.key===c):null;return(m?m.name:"Unknown").toLowerCase()===t.toLowerCase()}).length:0;return e.text(o.toString())}catch{return e.text("ERROR")}});L.get("/api/sheets/total",async e=>{try{const t=await T(`/pipelines/${H}/boxes`),s=Array.isArray(t)?t.length:0;return e.text(s.toString())}catch{return e.text("ERROR")}});L.get("/api/sheets/freshness/:level/count",async e=>{try{const t=e.req.param("level").toLowerCase(),s=await T(`/pipelines/${H}/boxes`),a=Array.isArray(s)?s.filter(n=>{const r=n.freshness||0;return t==="high"?r>.5:t==="medium"?r>=.2&&r<=.5:t==="low"?r<.2:!1}).length:0;return e.text(a.toString())}catch{return e.text("ERROR")}});L.get("/api/sheets/fit/:fitLevel/count",async e=>{try{const t=e.req.param("fitLevel"),[s,a]=await Promise.all([T(`/pipelines/${H}`),T(`/pipelines/${H}/boxes`)]),r=(Array.isArray(s.fields)?s.fields:[]).find(i=>i&&i.name===Ut),o=Array.isArray(a)?a.filter(i=>{var g;if(!r||!i.fields||!i.fields[r.key])return t.toLowerCase()==="not set";const c=i.fields[r.key],l=(g=r.dropdownSettings)==null?void 0:g.items,m=Array.isArray(l)?l.find(f=>f&&f.key===c):null;return(m?m.name:"Not Set").toLowerCase()===t.toLowerCase()}).length:0;return e.text(o.toString())}catch{return e.text("ERROR")}});L.get("/api/sheets/interest/:interestLevel/count",async e=>{try{const t=e.req.param("interestLevel"),[s,a]=await Promise.all([T(`/pipelines/${H}`),T(`/pipelines/${H}/boxes`)]),r=(Array.isArray(s.fields)?s.fields:[]).find(i=>i&&i.name===Bt),o=Array.isArray(a)?a.filter(i=>{var g;if(!r||!i.fields||!i.fields[r.key])return t.toLowerCase()==="not set";const c=i.fields[r.key],l=(g=r.dropdownSettings)==null?void 0:g.items,m=Array.isArray(l)?l.find(f=>f&&f.key===c):null;return(m?m.name:"Not Set").toLowerCase()===t.toLowerCase()}).length:0;return e.text(o.toString())}catch{return e.text("ERROR")}});L.get("/api/companies",async e=>{const t=Object.keys(ne).map(s=>({key:s,name:ne[s].name,url:ne[s].url}));return e.json({companies:t,count:t.length})});L.get("/api/sheets/:companyName/total",async e=>{try{const t=e.req.param("companyName").toLowerCase(),s=ne[t];if(!s)return e.text("COMPANY_NOT_FOUND");const a=await T(`/pipelines/${s.pipelineKey}/boxes`),n=Array.isArray(a)?a.length:0;return e.text(n.toString())}catch{return e.text("ERROR")}});L.get("/api/sheets/:companyName/month/:yearMonth/count",async e=>{try{const t=e.req.param("companyName").toLowerCase(),s=e.req.param("yearMonth"),a=ne[t];if(!a)return e.text("COMPANY_NOT_FOUND");const n=await T(`/pipelines/${a.pipelineKey}/boxes`),[r,o]=s.split("-").map(Number),i=Array.isArray(n)?n.filter(c=>{const l=new Date(c.creationTimestamp);return l.getFullYear()===r&&l.getMonth()+1===o}).length:0;return e.text(i.toString())}catch{return e.text("ERROR")}});L.get("/api/sheets/:companyName/week/count",async e=>{try{const t=e.req.param("companyName").toLowerCase(),s=ne[t];if(!s)return e.text("ERROR");const a=await T(`/pipelines/${s.pipelineKey}/boxes`);if(!Array.isArray(a))return e.text("0");const r=Date.now()-10080*60*1e3,o=a.filter(i=>(i.creationTimestamp||0)>=r).length;return e.text(o.toString())}catch{return e.text("ERROR")}});L.get("/api/sheets/:companyName/duration/total",async e=>{try{const t=e.req.param("companyName").toLowerCase(),s=ne[t];if(!s)return e.text("0");const a=await T(`/pipelines/${s.pipelineKey}/boxes`);if(!Array.isArray(a)||a.length===0)return e.text("0");const n=a.map(u=>u.creationTimestamp).filter(u=>u);if(n.length===0)return e.text("0");const r=Math.min(...n),o=new Date(r),i=new Date,c=i.getFullYear()-o.getFullYear(),l=i.getMonth()-o.getMonth(),m=c*12+l+1;return e.text(m.toString())}catch{return e.text("0")}});L.get("/api/sheets/:companyName/monthly-stats",async e=>{try{const t=e.req.param("companyName").toLowerCase(),s=ne[t];if(!s)return e.json({error:"Company not found"},404);const a=await T(`/pipelines/${s.pipelineKey}/boxes`),n=Array.isArray(a)?a:[],r=new Date,o=[];for(let m=11;m>=0;m--){const u=new Date(r.getFullYear(),r.getMonth()-m,1),g=u.getFullYear(),f=u.getMonth()+1,k=n.filter(b=>{const x=new Date(b.creationTimestamp);return x.getFullYear()===g&&x.getMonth()+1===f}).length,w=(k/10*100).toFixed(1);o.push({month:`${g}-${String(f).padStart(2,"0")}`,count:k,objective:10,percentage:parseFloat(w)})}const i=o.reduce((m,u)=>m+u.count,0),c=(i/12).toFixed(1),l=(parseFloat(c)/10*100).toFixed(1);return e.json({company:s.name,companyKey:t,objective:10,monthlyStats:o,summary:{totalLeads:i,average:parseFloat(c),averagePercentage:parseFloat(l)}})}catch(t){return e.json({error:t.message},500)}});L.get("/api/analytics",async e=>{try{const t=e.req.query("company")||"mabsilico",s=ne[t];if(!s)return e.json({error:"Invalid company key"},400);const a=s.pipelineKey,[n,r]=await Promise.all([T(`/pipelines/${a}`),T(`/pipelines/${a}/boxes`)]),o=Array.isArray(r)?r.length:0,i={},c={},l={},m={},u={},g={},f={"High (>0.5)":0,"Medium (0.2-0.5)":0,"Low (<0.2)":0},k=n.stageOrder||[],w=Array.isArray(k)?k.map(p=>{var N,G;return{key:p,name:((G=(N=n.stages)==null?void 0:N[p])==null?void 0:G.name)||"Unknown"}}):[],b=Array.isArray(n.fields)?n.fields:[],x=b.find(p=>p&&p.name==="Origin"),A=b.find(p=>p&&p.name===Ut),D=b.find(p=>p&&p.name===Bt),ee=b.find(p=>p&&p.name==="Est Start Date"),R=b.find(p=>p&&p.name==="Country"),te=b.find(p=>p&&p.name==="Language");Array.isArray(r)&&r.forEach(p=>{var K,se,ae,z,_;if(!p)return;const N=w.find(M=>M&&M.key===p.stageKey),G=N?N.name:"Unknown";if(i[G]=(i[G]||0)+1,x&&p.fields&&p.fields[x.key]){const M=p.fields[x.key],I=(K=x.dropdownSettings)==null?void 0:K.items,P=Array.isArray(I)?I.find(C=>C&&C.key===M):null,S=P?P.name:"Unknown";c[S]=(c[S]||0)+1}if(A&&p.fields&&p.fields[A.key]){const M=p.fields[A.key],I=(se=A.dropdownSettings)==null?void 0:se.items,P=Array.isArray(I)?I.find(C=>C&&C.key===M):null,S=P?P.name:"Not Set";l[S]=(l[S]||0)+1}else l["Not Set"]=(l["Not Set"]||0)+1;if(D&&p.fields&&p.fields[D.key]){const M=p.fields[D.key],I=(ae=D.dropdownSettings)==null?void 0:ae.items,P=Array.isArray(I)?I.find(C=>C&&C.key===M):null,S=P?P.name:"Not Set";m[S]=(m[S]||0)+1}else m["Not Set"]=(m["Not Set"]||0)+1;if(R&&p.fields&&p.fields[R.key]){const M=p.fields[R.key],I=(z=R.dropdownSettings)==null?void 0:z.items,P=Array.isArray(I)?I.find(C=>C&&C.key===M):null,S=P?P.name:"Unknown";u[S]=(u[S]||0)+1}else u.Unknown=(u.Unknown||0)+1;if(te&&p.fields&&p.fields[te.key]){const M=p.fields[te.key],I=(_=te.dropdownSettings)==null?void 0:_.items,P=Array.isArray(I)?I.find(C=>C&&C.key===M):null,S=P?P.name:"Unknown";g[S]=(g[S]||0)+1}else g.Unknown=(g.Unknown||0)+1;const Y=p.freshness||0;Y>.5?f["High (>0.5)"]++:Y>=.2?f["Medium (0.2-0.5)"]++:f["Low (<0.2)"]++});const Pe={};Object.keys(l).forEach(p=>{Pe[p]=o>0?(l[p]/o*100).toFixed(1):0});const de={};Object.keys(m).forEach(p=>{de[p]=o>0?(m[p]/o*100).toFixed(1):0});const B=new Date,je=[],$=10;for(let p=11;p>=0;p--){const N=new Date(B.getFullYear(),B.getMonth()-p,1),G=N.getFullYear(),Y=N.getMonth()+1,K=Array.isArray(r)?r.filter(ae=>{const z=new Date(ae.creationTimestamp);return z.getFullYear()===G&&z.getMonth()+1===Y}).length:0,se=(K/$*100).toFixed(1);je.push({month:`${G}-${String(Y).padStart(2,"0")}`,monthName:N.toLocaleString("en-US",{month:"short",year:"numeric"}),count:K,objective:$,percentage:parseFloat(se),status:K>=$?"achieved":"pending"})}const st=(je.reduce((p,N)=>p+N.count,0)/12).toFixed(1),Ht=(parseFloat(st)/$*100).toFixed(1);let lt=0,We=null;if(Array.isArray(r)&&r.length>0){const p=r.map(N=>N.creationTimestamp).filter(N=>N);if(p.length>0){const N=Math.min(...p);We=new Date(N);const G=B.getFullYear()-We.getFullYear(),Y=B.getMonth()-We.getMonth();lt=G*12+Y+1}}let ct=null;return s.networkSheetGid&&(ct=await Bs(s.networkSheetGid)),e.json({company:s.name,companyKey:t,totalBoxes:o,campaignDurationMonths:lt,firstLeadDate:We?We.toISOString():null,networkData:ct,stageDistribution:i,originDistribution:c,fitDistribution:l,fitPercentages:Pe,interestDistribution:m,interestPercentages:de,countryDistribution:u,languageDistribution:g,freshnessDistribution:f,monthlyLeads:je,leadObjective:$,averageLeadsPerMonth:parseFloat(st),averagePercentage:parseFloat(Ht),recentBoxes:Array.isArray(r)?r.filter(p=>{var se,ae;const N=A&&p.fields&&p.fields[A.key],G=D&&p.fields&&p.fields[D.key];let Y="Not Set";if(N){const z=p.fields[A.key],_=(se=A.dropdownSettings)==null?void 0:se.items,M=Array.isArray(_)?_.find(I=>I&&I.key===z):null;Y=M?M.name:"Not Set"}let K="Not Set";if(G){const z=p.fields[D.key],_=(ae=D.dropdownSettings)==null?void 0:ae.items,M=Array.isArray(_)?_.find(I=>I&&I.key===z):null;K=M?M.name:"Not Set"}return Y==="High"||K==="High"}).slice(0,10).map(p=>{var _,M,I,P;const N=w.find(S=>S&&S.key===p.stageKey);let G="Not Set";if(A&&p.fields&&p.fields[A.key]){const S=p.fields[A.key],C=(_=A.dropdownSettings)==null?void 0:_.items,Q=Array.isArray(C)?C.find(X=>X&&X.key===S):null;G=Q?Q.name:"Not Set"}let Y="Not Set";if(D&&p.fields&&p.fields[D.key]){const S=p.fields[D.key],C=(M=D.dropdownSettings)==null?void 0:M.items,Q=Array.isArray(C)?C.find(X=>X&&X.key===S):null;Y=Q?Q.name:"Not Set"}let K=null;ee&&p.fields&&p.fields[ee.key]&&(K=new Date(p.fields[ee.key]).toISOString());let se="Unknown";if(R&&p.fields&&p.fields[R.key]){const S=p.fields[R.key],C=(I=R.dropdownSettings)==null?void 0:I.items,Q=Array.isArray(C)?C.find(X=>X&&X.key===S):null;se=Q?Q.name:"Unknown"}let ae="Unknown";if(te&&p.fields&&p.fields[te.key]){const S=p.fields[te.key],C=(P=te.dropdownSettings)==null?void 0:P.items,Q=Array.isArray(C)?C.find(X=>X&&X.key===S):null;ae=Q?Q.name:"Unknown"}const z=p.freshness||0;return{name:p.name||"Unnamed",key:p.boxKey,stage:N?N.name:"Unknown",fit:G,interest:Y,dueDate:K,country:se,language:ae,freshness:z.toFixed(3),lastUpdated:new Date(p.lastUpdatedTimestamp).toISOString()}}):[]})}catch(t){return e.json({error:t.message},500)}});L.get("/admin",e=>e.html(`
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
            function deleteCompany(companyKey, companyName) {
                if (!confirm(\`Are you sure you want to delete "\${companyName}"?\\n\\nThis action cannot be undone and will only affect this session.\`)) {
                    return;
                }
                
                // Remove from companies object
                delete companies[companyKey];
                
                // Show success message
                showMessage('success', \`Company "\${companyName}" has been deleted successfully! Note: This is session-only. Refresh the page to restore.\`);
                
                // Reload companies list
                loadCompanies();
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

                if (companies[key]) {
                    showMessage('error', \`Company key "\${key}" already exists\`);
                    return;
                }

                // Success
                showMessage('success', \`Company "\${name}" added successfully! Note: This is session-only. To persist, add to source code.\`);
                
                // Add to local list
                const newCompany = {
                    key,
                    name,
                    url: engageUrl,
                    sources: {
                        promote: promoteUrl || '',
                        network: networkUrl || '',
                        engage: engageUrl
                    }
                };
                if (networkGid) {
                    newCompany.networkSheetGid = networkGid;
                }
                companies[key] = newCompany;

                // Reload display
                loadCompanies();

                // Reset form
                e.target.reset();

                // Scroll to message
                document.getElementById('form-message').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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
  `));L.get("/",e=>e.html(`
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
                            <span class="text-sm font-normal text-blue-200 ml-3">v1.0.2</span>
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
                    const company = COMPANIES[companyKey];
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
            function saveSourceURLs() {
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

                // Update company sources
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
                showEditMessage('success', \`Source URLs for \${company.name} have been saved successfully! The changes are active for this session.\`);

                // Reload dashboard to reflect changes
                loadDashboard();
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
            loadDashboard();
            setupAutoRefresh();
        <\/script>
    </body>
    </html>
  `));const ht=new Wt,$s=Object.assign({"/src/index.tsx":L});let $t=!1;for(const[,e]of Object.entries($s))e&&(ht.route("/",e),ht.notFound(e.notFoundHandler),$t=!0);if(!$t)throw new Error("Can't import modules from ['/src/index.tsx','/app/server.ts']");export{ht as default};
