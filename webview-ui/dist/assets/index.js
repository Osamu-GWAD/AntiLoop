(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))l(r);new MutationObserver(r=>{for(const c of r)if(c.type==="childList")for(const f of c.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&l(f)}).observe(document,{childList:!0,subtree:!0});function s(r){const c={};return r.integrity&&(c.integrity=r.integrity),r.referrerPolicy&&(c.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?c.credentials="include":r.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function l(r){if(r.ep)return;r.ep=!0;const c=s(r);fetch(r.href,c)}})();function gv(o){return o&&o.__esModule&&Object.prototype.hasOwnProperty.call(o,"default")?o.default:o}var Cu={exports:{}},Fl={};var lg;function b0(){if(lg)return Fl;lg=1;var o=Symbol.for("react.transitional.element"),n=Symbol.for("react.fragment");function s(l,r,c){var f=null;if(c!==void 0&&(f=""+c),r.key!==void 0&&(f=""+r.key),"key"in r){c={};for(var p in r)p!=="key"&&(c[p]=r[p])}else c=r;return r=c.ref,{$$typeof:o,type:l,key:f,ref:r!==void 0?r:null,props:c}}return Fl.Fragment=n,Fl.jsx=s,Fl.jsxs=s,Fl}var og;function y0(){return og||(og=1,Cu.exports=b0()),Cu.exports}var d=y0(),Eu={exports:{}},je={};var rg;function x0(){if(rg)return je;rg=1;var o=Symbol.for("react.transitional.element"),n=Symbol.for("react.portal"),s=Symbol.for("react.fragment"),l=Symbol.for("react.strict_mode"),r=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),f=Symbol.for("react.context"),p=Symbol.for("react.forward_ref"),b=Symbol.for("react.suspense"),g=Symbol.for("react.memo"),_=Symbol.for("react.lazy"),v=Symbol.for("react.activity"),k=Symbol.iterator;function E(w){return w===null||typeof w!="object"?null:(w=k&&w[k]||w["@@iterator"],typeof w=="function"?w:null)}var O={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},V=Object.assign,se={};function ee(w,H,U){this.props=w,this.context=H,this.refs=se,this.updater=U||O}ee.prototype.isReactComponent={},ee.prototype.setState=function(w,H){if(typeof w!="object"&&typeof w!="function"&&w!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,w,H,"setState")},ee.prototype.forceUpdate=function(w){this.updater.enqueueForceUpdate(this,w,"forceUpdate")};function oe(){}oe.prototype=ee.prototype;function ae(w,H,U){this.props=w,this.context=H,this.refs=se,this.updater=U||O}var de=ae.prototype=new oe;de.constructor=ae,V(de,ee.prototype),de.isPureReactComponent=!0;var J=Array.isArray;function $(){}var S={H:null,A:null,T:null,S:null},I=Object.prototype.hasOwnProperty;function z(w,H,U){var Z=U.ref;return{$$typeof:o,type:w,key:H,ref:Z!==void 0?Z:null,props:U}}function W(w,H){return z(w.type,H,w.props)}function Q(w){return typeof w=="object"&&w!==null&&w.$$typeof===o}function ue(w){var H={"=":"=0",":":"=2"};return"$"+w.replace(/[=:]/g,function(U){return H[U]})}var ce=/\/+/g;function pe(w,H){return typeof w=="object"&&w!==null&&w.key!=null?ue(""+w.key):H.toString(36)}function ne(w){switch(w.status){case"fulfilled":return w.value;case"rejected":throw w.reason;default:switch(typeof w.status=="string"?w.then($,$):(w.status="pending",w.then(function(H){w.status==="pending"&&(w.status="fulfilled",w.value=H)},function(H){w.status==="pending"&&(w.status="rejected",w.reason=H)})),w.status){case"fulfilled":return w.value;case"rejected":throw w.reason}}throw w}function A(w,H,U,Z,re){var me=typeof w;(me==="undefined"||me==="boolean")&&(w=null);var _e=!1;if(w===null)_e=!0;else switch(me){case"bigint":case"string":case"number":_e=!0;break;case"object":switch(w.$$typeof){case o:case n:_e=!0;break;case _:return _e=w._init,A(_e(w._payload),H,U,Z,re)}}if(_e)return re=re(w),_e=Z===""?"."+pe(w,0):Z,J(re)?(U="",_e!=null&&(U=_e.replace(ce,"$&/")+"/"),A(re,H,U,"",function(zt){return zt})):re!=null&&(Q(re)&&(re=W(re,U+(re.key==null||w&&w.key===re.key?"":(""+re.key).replace(ce,"$&/")+"/")+_e)),H.push(re)),1;_e=0;var ye=Z===""?".":Z+":";if(J(w))for(var Ae=0;Ae<w.length;Ae++)Z=w[Ae],me=ye+pe(Z,Ae),_e+=A(Z,H,U,me,re);else if(Ae=E(w),typeof Ae=="function")for(w=Ae.call(w),Ae=0;!(Z=w.next()).done;)Z=Z.value,me=ye+pe(Z,Ae++),_e+=A(Z,H,U,me,re);else if(me==="object"){if(typeof w.then=="function")return A(ne(w),H,U,Z,re);throw H=String(w),Error("Objects are not valid as a React child (found: "+(H==="[object Object]"?"object with keys {"+Object.keys(w).join(", ")+"}":H)+"). If you meant to render a collection of children, use an array instead.")}return _e}function Y(w,H,U){if(w==null)return w;var Z=[],re=0;return A(w,Z,"","",function(me){return H.call(U,me,re++)}),Z}function le(w){if(w._status===-1){var H=w._result;H=H(),H.then(function(U){(w._status===0||w._status===-1)&&(w._status=1,w._result=U)},function(U){(w._status===0||w._status===-1)&&(w._status=2,w._result=U)}),w._status===-1&&(w._status=0,w._result=H)}if(w._status===1)return w._result.default;throw w._result}var ve=typeof reportError=="function"?reportError:function(w){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var H=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof w=="object"&&w!==null&&typeof w.message=="string"?String(w.message):String(w),error:w});if(!window.dispatchEvent(H))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",w);return}console.error(w)},be={map:Y,forEach:function(w,H,U){Y(w,function(){H.apply(this,arguments)},U)},count:function(w){var H=0;return Y(w,function(){H++}),H},toArray:function(w){return Y(w,function(H){return H})||[]},only:function(w){if(!Q(w))throw Error("React.Children.only expected to receive a single React element child.");return w}};return je.Activity=v,je.Children=be,je.Component=ee,je.Fragment=s,je.Profiler=r,je.PureComponent=ae,je.StrictMode=l,je.Suspense=b,je.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=S,je.__COMPILER_RUNTIME={__proto__:null,c:function(w){return S.H.useMemoCache(w)}},je.cache=function(w){return function(){return w.apply(null,arguments)}},je.cacheSignal=function(){return null},je.cloneElement=function(w,H,U){if(w==null)throw Error("The argument must be a React element, but you passed "+w+".");var Z=V({},w.props),re=w.key;if(H!=null)for(me in H.key!==void 0&&(re=""+H.key),H)!I.call(H,me)||me==="key"||me==="__self"||me==="__source"||me==="ref"&&H.ref===void 0||(Z[me]=H[me]);var me=arguments.length-2;if(me===1)Z.children=U;else if(1<me){for(var _e=Array(me),ye=0;ye<me;ye++)_e[ye]=arguments[ye+2];Z.children=_e}return z(w.type,re,Z)},je.createContext=function(w){return w={$$typeof:f,_currentValue:w,_currentValue2:w,_threadCount:0,Provider:null,Consumer:null},w.Provider=w,w.Consumer={$$typeof:c,_context:w},w},je.createElement=function(w,H,U){var Z,re={},me=null;if(H!=null)for(Z in H.key!==void 0&&(me=""+H.key),H)I.call(H,Z)&&Z!=="key"&&Z!=="__self"&&Z!=="__source"&&(re[Z]=H[Z]);var _e=arguments.length-2;if(_e===1)re.children=U;else if(1<_e){for(var ye=Array(_e),Ae=0;Ae<_e;Ae++)ye[Ae]=arguments[Ae+2];re.children=ye}if(w&&w.defaultProps)for(Z in _e=w.defaultProps,_e)re[Z]===void 0&&(re[Z]=_e[Z]);return z(w,me,re)},je.createRef=function(){return{current:null}},je.forwardRef=function(w){return{$$typeof:p,render:w}},je.isValidElement=Q,je.lazy=function(w){return{$$typeof:_,_payload:{_status:-1,_result:w},_init:le}},je.memo=function(w,H){return{$$typeof:g,type:w,compare:H===void 0?null:H}},je.startTransition=function(w){var H=S.T,U={};S.T=U;try{var Z=w(),re=S.S;re!==null&&re(U,Z),typeof Z=="object"&&Z!==null&&typeof Z.then=="function"&&Z.then($,ve)}catch(me){ve(me)}finally{H!==null&&U.types!==null&&(H.types=U.types),S.T=H}},je.unstable_useCacheRefresh=function(){return S.H.useCacheRefresh()},je.use=function(w){return S.H.use(w)},je.useActionState=function(w,H,U){return S.H.useActionState(w,H,U)},je.useCallback=function(w,H){return S.H.useCallback(w,H)},je.useContext=function(w){return S.H.useContext(w)},je.useDebugValue=function(){},je.useDeferredValue=function(w,H){return S.H.useDeferredValue(w,H)},je.useEffect=function(w,H){return S.H.useEffect(w,H)},je.useEffectEvent=function(w){return S.H.useEffectEvent(w)},je.useId=function(){return S.H.useId()},je.useImperativeHandle=function(w,H,U){return S.H.useImperativeHandle(w,H,U)},je.useInsertionEffect=function(w,H){return S.H.useInsertionEffect(w,H)},je.useLayoutEffect=function(w,H){return S.H.useLayoutEffect(w,H)},je.useMemo=function(w,H){return S.H.useMemo(w,H)},je.useOptimistic=function(w,H){return S.H.useOptimistic(w,H)},je.useReducer=function(w,H,U){return S.H.useReducer(w,H,U)},je.useRef=function(w){return S.H.useRef(w)},je.useState=function(w){return S.H.useState(w)},je.useSyncExternalStore=function(w,H,U){return S.H.useSyncExternalStore(w,H,U)},je.useTransition=function(){return S.H.useTransition()},je.version="19.2.4",je}var cg;function oc(){return cg||(cg=1,Eu.exports=x0()),Eu.exports}var x=oc();const F=gv(x);var Nu={exports:{}},Xl={},ju={exports:{}},Au={};var dg;function _0(){return dg||(dg=1,(function(o){function n(A,Y){var le=A.length;A.push(Y);e:for(;0<le;){var ve=le-1>>>1,be=A[ve];if(0<r(be,Y))A[ve]=Y,A[le]=be,le=ve;else break e}}function s(A){return A.length===0?null:A[0]}function l(A){if(A.length===0)return null;var Y=A[0],le=A.pop();if(le!==Y){A[0]=le;e:for(var ve=0,be=A.length,w=be>>>1;ve<w;){var H=2*(ve+1)-1,U=A[H],Z=H+1,re=A[Z];if(0>r(U,le))Z<be&&0>r(re,U)?(A[ve]=re,A[Z]=le,ve=Z):(A[ve]=U,A[H]=le,ve=H);else if(Z<be&&0>r(re,le))A[ve]=re,A[Z]=le,ve=Z;else break e}}return Y}function r(A,Y){var le=A.sortIndex-Y.sortIndex;return le!==0?le:A.id-Y.id}if(o.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;o.unstable_now=function(){return c.now()}}else{var f=Date,p=f.now();o.unstable_now=function(){return f.now()-p}}var b=[],g=[],_=1,v=null,k=3,E=!1,O=!1,V=!1,se=!1,ee=typeof setTimeout=="function"?setTimeout:null,oe=typeof clearTimeout=="function"?clearTimeout:null,ae=typeof setImmediate<"u"?setImmediate:null;function de(A){for(var Y=s(g);Y!==null;){if(Y.callback===null)l(g);else if(Y.startTime<=A)l(g),Y.sortIndex=Y.expirationTime,n(b,Y);else break;Y=s(g)}}function J(A){if(V=!1,de(A),!O)if(s(b)!==null)O=!0,$||($=!0,ue());else{var Y=s(g);Y!==null&&ne(J,Y.startTime-A)}}var $=!1,S=-1,I=5,z=-1;function W(){return se?!0:!(o.unstable_now()-z<I)}function Q(){if(se=!1,$){var A=o.unstable_now();z=A;var Y=!0;try{e:{O=!1,V&&(V=!1,oe(S),S=-1),E=!0;var le=k;try{t:{for(de(A),v=s(b);v!==null&&!(v.expirationTime>A&&W());){var ve=v.callback;if(typeof ve=="function"){v.callback=null,k=v.priorityLevel;var be=ve(v.expirationTime<=A);if(A=o.unstable_now(),typeof be=="function"){v.callback=be,de(A),Y=!0;break t}v===s(b)&&l(b),de(A)}else l(b);v=s(b)}if(v!==null)Y=!0;else{var w=s(g);w!==null&&ne(J,w.startTime-A),Y=!1}}break e}finally{v=null,k=le,E=!1}Y=void 0}}finally{Y?ue():$=!1}}}var ue;if(typeof ae=="function")ue=function(){ae(Q)};else if(typeof MessageChannel<"u"){var ce=new MessageChannel,pe=ce.port2;ce.port1.onmessage=Q,ue=function(){pe.postMessage(null)}}else ue=function(){ee(Q,0)};function ne(A,Y){S=ee(function(){A(o.unstable_now())},Y)}o.unstable_IdlePriority=5,o.unstable_ImmediatePriority=1,o.unstable_LowPriority=4,o.unstable_NormalPriority=3,o.unstable_Profiling=null,o.unstable_UserBlockingPriority=2,o.unstable_cancelCallback=function(A){A.callback=null},o.unstable_forceFrameRate=function(A){0>A||125<A?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):I=0<A?Math.floor(1e3/A):5},o.unstable_getCurrentPriorityLevel=function(){return k},o.unstable_next=function(A){switch(k){case 1:case 2:case 3:var Y=3;break;default:Y=k}var le=k;k=Y;try{return A()}finally{k=le}},o.unstable_requestPaint=function(){se=!0},o.unstable_runWithPriority=function(A,Y){switch(A){case 1:case 2:case 3:case 4:case 5:break;default:A=3}var le=k;k=A;try{return Y()}finally{k=le}},o.unstable_scheduleCallback=function(A,Y,le){var ve=o.unstable_now();switch(typeof le=="object"&&le!==null?(le=le.delay,le=typeof le=="number"&&0<le?ve+le:ve):le=ve,A){case 1:var be=-1;break;case 2:be=250;break;case 5:be=1073741823;break;case 4:be=1e4;break;default:be=5e3}return be=le+be,A={id:_++,callback:Y,priorityLevel:A,startTime:le,expirationTime:be,sortIndex:-1},le>ve?(A.sortIndex=le,n(g,A),s(b)===null&&A===s(g)&&(V?(oe(S),S=-1):V=!0,ne(J,le-ve))):(A.sortIndex=be,n(b,A),O||E||(O=!0,$||($=!0,ue()))),A},o.unstable_shouldYield=W,o.unstable_wrapCallback=function(A){var Y=k;return function(){var le=k;k=Y;try{return A.apply(this,arguments)}finally{k=le}}}})(Au)),Au}var ug;function S0(){return ug||(ug=1,ju.exports=_0()),ju.exports}var ku={exports:{}},vn={};var hg;function w0(){if(hg)return vn;hg=1;var o=oc();function n(b){var g="https://react.dev/errors/"+b;if(1<arguments.length){g+="?args[]="+encodeURIComponent(arguments[1]);for(var _=2;_<arguments.length;_++)g+="&args[]="+encodeURIComponent(arguments[_])}return"Minified React error #"+b+"; visit "+g+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function s(){}var l={d:{f:s,r:function(){throw Error(n(522))},D:s,C:s,L:s,m:s,X:s,S:s,M:s},p:0,findDOMNode:null},r=Symbol.for("react.portal");function c(b,g,_){var v=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:r,key:v==null?null:""+v,children:b,containerInfo:g,implementation:_}}var f=o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function p(b,g){if(b==="font")return"";if(typeof g=="string")return g==="use-credentials"?g:""}return vn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=l,vn.createPortal=function(b,g){var _=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!g||g.nodeType!==1&&g.nodeType!==9&&g.nodeType!==11)throw Error(n(299));return c(b,g,null,_)},vn.flushSync=function(b){var g=f.T,_=l.p;try{if(f.T=null,l.p=2,b)return b()}finally{f.T=g,l.p=_,l.d.f()}},vn.preconnect=function(b,g){typeof b=="string"&&(g?(g=g.crossOrigin,g=typeof g=="string"?g==="use-credentials"?g:"":void 0):g=null,l.d.C(b,g))},vn.prefetchDNS=function(b){typeof b=="string"&&l.d.D(b)},vn.preinit=function(b,g){if(typeof b=="string"&&g&&typeof g.as=="string"){var _=g.as,v=p(_,g.crossOrigin),k=typeof g.integrity=="string"?g.integrity:void 0,E=typeof g.fetchPriority=="string"?g.fetchPriority:void 0;_==="style"?l.d.S(b,typeof g.precedence=="string"?g.precedence:void 0,{crossOrigin:v,integrity:k,fetchPriority:E}):_==="script"&&l.d.X(b,{crossOrigin:v,integrity:k,fetchPriority:E,nonce:typeof g.nonce=="string"?g.nonce:void 0})}},vn.preinitModule=function(b,g){if(typeof b=="string")if(typeof g=="object"&&g!==null){if(g.as==null||g.as==="script"){var _=p(g.as,g.crossOrigin);l.d.M(b,{crossOrigin:_,integrity:typeof g.integrity=="string"?g.integrity:void 0,nonce:typeof g.nonce=="string"?g.nonce:void 0})}}else g==null&&l.d.M(b)},vn.preload=function(b,g){if(typeof b=="string"&&typeof g=="object"&&g!==null&&typeof g.as=="string"){var _=g.as,v=p(_,g.crossOrigin);l.d.L(b,_,{crossOrigin:v,integrity:typeof g.integrity=="string"?g.integrity:void 0,nonce:typeof g.nonce=="string"?g.nonce:void 0,type:typeof g.type=="string"?g.type:void 0,fetchPriority:typeof g.fetchPriority=="string"?g.fetchPriority:void 0,referrerPolicy:typeof g.referrerPolicy=="string"?g.referrerPolicy:void 0,imageSrcSet:typeof g.imageSrcSet=="string"?g.imageSrcSet:void 0,imageSizes:typeof g.imageSizes=="string"?g.imageSizes:void 0,media:typeof g.media=="string"?g.media:void 0})}},vn.preloadModule=function(b,g){if(typeof b=="string")if(g){var _=p(g.as,g.crossOrigin);l.d.m(b,{as:typeof g.as=="string"&&g.as!=="script"?g.as:void 0,crossOrigin:_,integrity:typeof g.integrity=="string"?g.integrity:void 0})}else l.d.m(b)},vn.requestFormReset=function(b){l.d.r(b)},vn.unstable_batchedUpdates=function(b,g){return b(g)},vn.useFormState=function(b,g,_){return f.H.useFormState(b,g,_)},vn.useFormStatus=function(){return f.H.useHostTransitionStatus()},vn.version="19.2.4",vn}var fg;function vv(){if(fg)return ku.exports;fg=1;function o(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o)}catch(n){console.error(n)}}return o(),ku.exports=w0(),ku.exports}var pg;function C0(){if(pg)return Xl;pg=1;var o=S0(),n=oc(),s=vv();function l(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var i=2;i<arguments.length;i++)t+="&args[]="+encodeURIComponent(arguments[i])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function r(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function c(e){var t=e,i=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(i=t.return),e=t.return;while(e)}return t.tag===3?i:null}function f(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function p(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function b(e){if(c(e)!==e)throw Error(l(188))}function g(e){var t=e.alternate;if(!t){if(t=c(e),t===null)throw Error(l(188));return t!==e?null:e}for(var i=e,a=t;;){var u=i.return;if(u===null)break;var h=u.alternate;if(h===null){if(a=u.return,a!==null){i=a;continue}break}if(u.child===h.child){for(h=u.child;h;){if(h===i)return b(u),e;if(h===a)return b(u),t;h=h.sibling}throw Error(l(188))}if(i.return!==a.return)i=u,a=h;else{for(var m=!1,y=u.child;y;){if(y===i){m=!0,i=u,a=h;break}if(y===a){m=!0,a=u,i=h;break}y=y.sibling}if(!m){for(y=h.child;y;){if(y===i){m=!0,i=h,a=u;break}if(y===a){m=!0,a=h,i=u;break}y=y.sibling}if(!m)throw Error(l(189))}}if(i.alternate!==a)throw Error(l(190))}if(i.tag!==3)throw Error(l(188));return i.stateNode.current===i?e:t}function _(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=_(e),t!==null)return t;e=e.sibling}return null}var v=Object.assign,k=Symbol.for("react.element"),E=Symbol.for("react.transitional.element"),O=Symbol.for("react.portal"),V=Symbol.for("react.fragment"),se=Symbol.for("react.strict_mode"),ee=Symbol.for("react.profiler"),oe=Symbol.for("react.consumer"),ae=Symbol.for("react.context"),de=Symbol.for("react.forward_ref"),J=Symbol.for("react.suspense"),$=Symbol.for("react.suspense_list"),S=Symbol.for("react.memo"),I=Symbol.for("react.lazy"),z=Symbol.for("react.activity"),W=Symbol.for("react.memo_cache_sentinel"),Q=Symbol.iterator;function ue(e){return e===null||typeof e!="object"?null:(e=Q&&e[Q]||e["@@iterator"],typeof e=="function"?e:null)}var ce=Symbol.for("react.client.reference");function pe(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===ce?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case V:return"Fragment";case ee:return"Profiler";case se:return"StrictMode";case J:return"Suspense";case $:return"SuspenseList";case z:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case O:return"Portal";case ae:return e.displayName||"Context";case oe:return(e._context.displayName||"Context")+".Consumer";case de:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case S:return t=e.displayName||null,t!==null?t:pe(e.type)||"Memo";case I:t=e._payload,e=e._init;try{return pe(e(t))}catch{}}return null}var ne=Array.isArray,A=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Y=s.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,le={pending:!1,data:null,method:null,action:null},ve=[],be=-1;function w(e){return{current:e}}function H(e){0>be||(e.current=ve[be],ve[be]=null,be--)}function U(e,t){be++,ve[be]=e.current,e.current=t}var Z=w(null),re=w(null),me=w(null),_e=w(null);function ye(e,t){switch(U(me,t),U(re,e),U(Z,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?km(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=km(t),e=Tm(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}H(Z),U(Z,e)}function Ae(){H(Z),H(re),H(me)}function zt(e){e.memoizedState!==null&&U(_e,e);var t=Z.current,i=Tm(t,e.type);t!==i&&(U(re,e),U(Z,i))}function Ft(e){re.current===e&&(H(Z),H(re)),_e.current===e&&(H(_e),Pl._currentValue=le)}var Vt,pn;function $t(e){if(Vt===void 0)try{throw Error()}catch(i){var t=i.stack.trim().match(/\n( *(at )?)/);Vt=t&&t[1]||"",pn=-1<i.stack.indexOf(`
    at`)?" (<anonymous>)":-1<i.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Vt+e+pn}var ie=!1;function Et(e,t){if(!e||ie)return"";ie=!0;var i=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var a={DetermineComponentFrameRoot:function(){try{if(t){var X=function(){throw Error()};if(Object.defineProperty(X.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(X,[])}catch(B){var M=B}Reflect.construct(e,[],X)}else{try{X.call()}catch(B){M=B}e.call(X.prototype)}}else{try{throw Error()}catch(B){M=B}(X=e())&&typeof X.catch=="function"&&X.catch(function(){})}}catch(B){if(B&&M&&typeof B.stack=="string")return[B.stack,M.stack]}return[null,null]}};a.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var u=Object.getOwnPropertyDescriptor(a.DetermineComponentFrameRoot,"name");u&&u.configurable&&Object.defineProperty(a.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var h=a.DetermineComponentFrameRoot(),m=h[0],y=h[1];if(m&&y){var C=m.split(`
`),D=y.split(`
`);for(u=a=0;a<C.length&&!C[a].includes("DetermineComponentFrameRoot");)a++;for(;u<D.length&&!D[u].includes("DetermineComponentFrameRoot");)u++;if(a===C.length||u===D.length)for(a=C.length-1,u=D.length-1;1<=a&&0<=u&&C[a]!==D[u];)u--;for(;1<=a&&0<=u;a--,u--)if(C[a]!==D[u]){if(a!==1||u!==1)do if(a--,u--,0>u||C[a]!==D[u]){var P=`
`+C[a].replace(" at new "," at ");return e.displayName&&P.includes("<anonymous>")&&(P=P.replace("<anonymous>",e.displayName)),P}while(1<=a&&0<=u);break}}}finally{ie=!1,Error.prepareStackTrace=i}return(i=e?e.displayName||e.name:"")?$t(i):""}function ft(e,t){switch(e.tag){case 26:case 27:case 5:return $t(e.type);case 16:return $t("Lazy");case 13:return e.child!==t&&t!==null?$t("Suspense Fallback"):$t("Suspense");case 19:return $t("SuspenseList");case 0:case 15:return Et(e.type,!1);case 11:return Et(e.type.render,!1);case 1:return Et(e.type,!0);case 31:return $t("Activity");default:return""}}function _t(e){try{var t="",i=null;do t+=ft(e,i),i=e,e=e.return;while(e);return t}catch(a){return`
Error generating stack: `+a.message+`
`+a.stack}}var at=Object.prototype.hasOwnProperty,yn=o.unstable_scheduleCallback,sn=o.unstable_cancelCallback,pt=o.unstable_shouldYield,G=o.unstable_requestPaint,Oe=o.unstable_now,xn=o.unstable_getCurrentPriorityLevel,mt=o.unstable_ImmediatePriority,En=o.unstable_UserBlockingPriority,an=o.unstable_NormalPriority,ci=o.unstable_LowPriority,mn=o.unstable_IdlePriority,Oi=o.log,lt=o.unstable_setDisableYieldValue,gn=null,St=null;function gt(e){if(typeof Oi=="function"&&lt(e),St&&typeof St.setStrictMode=="function")try{St.setStrictMode(gn,e)}catch{}}var Nt=Math.clz32?Math.clz32:Nn,qn=Math.log,di=Math.LN2;function Nn(e){return e>>>=0,e===0?32:31-(qn(e)/di|0)|0}var bi=256,yi=262144,ui=4194304;function _n(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function we(e,t,i){var a=e.pendingLanes;if(a===0)return 0;var u=0,h=e.suspendedLanes,m=e.pingedLanes;e=e.warmLanes;var y=a&134217727;return y!==0?(a=y&~h,a!==0?u=_n(a):(m&=y,m!==0?u=_n(m):i||(i=y&~e,i!==0&&(u=_n(i))))):(y=a&~h,y!==0?u=_n(y):m!==0?u=_n(m):i||(i=a&~e,i!==0&&(u=_n(i)))),u===0?0:t!==0&&t!==u&&(t&h)===0&&(h=u&-u,i=t&-t,h>=i||h===32&&(i&4194048)!==0)?t:u}function Xe(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function jt(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function It(){var e=ui;return ui<<=1,(ui&62914560)===0&&(ui=4194304),e}function Pn(e){for(var t=[],i=0;31>i;i++)t.push(e);return t}function ot(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function At(e,t,i,a,u,h){var m=e.pendingLanes;e.pendingLanes=i,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=i,e.entangledLanes&=i,e.errorRecoveryDisabledLanes&=i,e.shellSuspendCounter=0;var y=e.entanglements,C=e.expirationTimes,D=e.hiddenUpdates;for(i=m&~i;0<i;){var P=31-Nt(i),X=1<<P;y[P]=0,C[P]=-1;var M=D[P];if(M!==null)for(D[P]=null,P=0;P<M.length;P++){var B=M[P];B!==null&&(B.lane&=-536870913)}i&=~X}a!==0&&q(e,a,0),h!==0&&u===0&&e.tag!==0&&(e.suspendedLanes|=h&~(m&~t))}function q(e,t,i){e.pendingLanes|=t,e.suspendedLanes&=~t;var a=31-Nt(t);e.entangledLanes|=t,e.entanglements[a]=e.entanglements[a]|1073741824|i&261930}function Ue(e,t){var i=e.entangledLanes|=t;for(e=e.entanglements;i;){var a=31-Nt(i),u=1<<a;u&t|e[a]&t&&(e[a]|=t),i&=~u}}function Ze(e,t){var i=t&-t;return i=(i&42)!==0?1:wt(i),(i&(e.suspendedLanes|t))!==0?0:i}function wt(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function ln(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function Gn(){var e=Y.p;return e!==0?e:(e=window.event,e===void 0?32:Wm(e.type))}function xi(e,t){var i=Y.p;try{return Y.p=e,t()}finally{Y.p=i}}var Yn=Math.random().toString(36).slice(2),L="__reactFiber$"+Yn,he="__reactProps$"+Yn,kt="__reactContainer$"+Yn,Sn="__reactEvents$"+Yn,No="__reactListeners$"+Yn,jo="__reactHandles$"+Yn,mh="__reactResources$"+Yn,al="__reactMarker$"+Yn;function gc(e){delete e[L],delete e[he],delete e[Sn],delete e[No],delete e[jo]}function ua(e){var t=e[L];if(t)return t;for(var i=e.parentNode;i;){if(t=i[kt]||i[L]){if(i=t.alternate,t.child!==null||i!==null&&i.child!==null)for(e=Lm(e);e!==null;){if(i=e[L])return i;e=Lm(e)}return t}e=i,i=e.parentNode}return null}function ha(e){if(e=e[L]||e[kt]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function ll(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(l(33))}function fa(e){var t=e[mh];return t||(t=e[mh]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function Qt(e){e[al]=!0}var gh=new Set,vh={};function Os(e,t){pa(e,t),pa(e+"Capture",t)}function pa(e,t){for(vh[e]=t,e=0;e<t.length;e++)gh.add(t[e])}var cb=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),bh={},yh={};function db(e){return at.call(yh,e)?!0:at.call(bh,e)?!1:cb.test(e)?yh[e]=!0:(bh[e]=!0,!1)}function Ao(e,t,i){if(db(t))if(i===null)e.removeAttribute(t);else{switch(typeof i){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var a=t.toLowerCase().slice(0,5);if(a!=="data-"&&a!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+i)}}function ko(e,t,i){if(i===null)e.removeAttribute(t);else{switch(typeof i){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+i)}}function Ri(e,t,i,a){if(a===null)e.removeAttribute(i);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(i);return}e.setAttributeNS(t,i,""+a)}}function Kn(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function xh(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function ub(e,t,i){var a=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var u=a.get,h=a.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return u.call(this)},set:function(m){i=""+m,h.call(this,m)}}),Object.defineProperty(e,t,{enumerable:a.enumerable}),{getValue:function(){return i},setValue:function(m){i=""+m},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function vc(e){if(!e._valueTracker){var t=xh(e)?"checked":"value";e._valueTracker=ub(e,t,""+e[t])}}function _h(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var i=t.getValue(),a="";return e&&(a=xh(e)?e.checked?"true":"false":e.value),e=a,e!==i?(t.setValue(e),!0):!1}function To(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var hb=/[\n"\\]/g;function Fn(e){return e.replace(hb,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function bc(e,t,i,a,u,h,m,y){e.name="",m!=null&&typeof m!="function"&&typeof m!="symbol"&&typeof m!="boolean"?e.type=m:e.removeAttribute("type"),t!=null?m==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+Kn(t)):e.value!==""+Kn(t)&&(e.value=""+Kn(t)):m!=="submit"&&m!=="reset"||e.removeAttribute("value"),t!=null?yc(e,m,Kn(t)):i!=null?yc(e,m,Kn(i)):a!=null&&e.removeAttribute("value"),u==null&&h!=null&&(e.defaultChecked=!!h),u!=null&&(e.checked=u&&typeof u!="function"&&typeof u!="symbol"),y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"?e.name=""+Kn(y):e.removeAttribute("name")}function Sh(e,t,i,a,u,h,m,y){if(h!=null&&typeof h!="function"&&typeof h!="symbol"&&typeof h!="boolean"&&(e.type=h),t!=null||i!=null){if(!(h!=="submit"&&h!=="reset"||t!=null)){vc(e);return}i=i!=null?""+Kn(i):"",t=t!=null?""+Kn(t):i,y||t===e.value||(e.value=t),e.defaultValue=t}a=a??u,a=typeof a!="function"&&typeof a!="symbol"&&!!a,e.checked=y?e.checked:!!a,e.defaultChecked=!!a,m!=null&&typeof m!="function"&&typeof m!="symbol"&&typeof m!="boolean"&&(e.name=m),vc(e)}function yc(e,t,i){t==="number"&&To(e.ownerDocument)===e||e.defaultValue===""+i||(e.defaultValue=""+i)}function ma(e,t,i,a){if(e=e.options,t){t={};for(var u=0;u<i.length;u++)t["$"+i[u]]=!0;for(i=0;i<e.length;i++)u=t.hasOwnProperty("$"+e[i].value),e[i].selected!==u&&(e[i].selected=u),u&&a&&(e[i].defaultSelected=!0)}else{for(i=""+Kn(i),t=null,u=0;u<e.length;u++){if(e[u].value===i){e[u].selected=!0,a&&(e[u].defaultSelected=!0);return}t!==null||e[u].disabled||(t=e[u])}t!==null&&(t.selected=!0)}}function wh(e,t,i){if(t!=null&&(t=""+Kn(t),t!==e.value&&(e.value=t),i==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=i!=null?""+Kn(i):""}function Ch(e,t,i,a){if(t==null){if(a!=null){if(i!=null)throw Error(l(92));if(ne(a)){if(1<a.length)throw Error(l(93));a=a[0]}i=a}i==null&&(i=""),t=i}i=Kn(t),e.defaultValue=i,a=e.textContent,a===i&&a!==""&&a!==null&&(e.value=a),vc(e)}function ga(e,t){if(t){var i=e.firstChild;if(i&&i===e.lastChild&&i.nodeType===3){i.nodeValue=t;return}}e.textContent=t}var fb=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Eh(e,t,i){var a=t.indexOf("--")===0;i==null||typeof i=="boolean"||i===""?a?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":a?e.setProperty(t,i):typeof i!="number"||i===0||fb.has(t)?t==="float"?e.cssFloat=i:e[t]=(""+i).trim():e[t]=i+"px"}function Nh(e,t,i){if(t!=null&&typeof t!="object")throw Error(l(62));if(e=e.style,i!=null){for(var a in i)!i.hasOwnProperty(a)||t!=null&&t.hasOwnProperty(a)||(a.indexOf("--")===0?e.setProperty(a,""):a==="float"?e.cssFloat="":e[a]="");for(var u in t)a=t[u],t.hasOwnProperty(u)&&i[u]!==a&&Eh(e,u,a)}else for(var h in t)t.hasOwnProperty(h)&&Eh(e,h,t[h])}function xc(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var pb=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),mb=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Oo(e){return mb.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Di(){}var _c=null;function Sc(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var va=null,ba=null;function jh(e){var t=ha(e);if(t&&(e=t.stateNode)){var i=e[he]||null;e:switch(e=t.stateNode,t.type){case"input":if(bc(e,i.value,i.defaultValue,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name),t=i.name,i.type==="radio"&&t!=null){for(i=e;i.parentNode;)i=i.parentNode;for(i=i.querySelectorAll('input[name="'+Fn(""+t)+'"][type="radio"]'),t=0;t<i.length;t++){var a=i[t];if(a!==e&&a.form===e.form){var u=a[he]||null;if(!u)throw Error(l(90));bc(a,u.value,u.defaultValue,u.defaultValue,u.checked,u.defaultChecked,u.type,u.name)}}for(t=0;t<i.length;t++)a=i[t],a.form===e.form&&_h(a)}break e;case"textarea":wh(e,i.value,i.defaultValue);break e;case"select":t=i.value,t!=null&&ma(e,!!i.multiple,t,!1)}}}var wc=!1;function Ah(e,t,i){if(wc)return e(t,i);wc=!0;try{var a=e(t);return a}finally{if(wc=!1,(va!==null||ba!==null)&&(br(),va&&(t=va,e=ba,ba=va=null,jh(t),e)))for(t=0;t<e.length;t++)jh(e[t])}}function ol(e,t){var i=e.stateNode;if(i===null)return null;var a=i[he]||null;if(a===null)return null;i=a[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(a=!a.disabled)||(e=e.type,a=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!a;break e;default:e=!1}if(e)return null;if(i&&typeof i!="function")throw Error(l(231,t,typeof i));return i}var Mi=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Cc=!1;if(Mi)try{var rl={};Object.defineProperty(rl,"passive",{get:function(){Cc=!0}}),window.addEventListener("test",rl,rl),window.removeEventListener("test",rl,rl)}catch{Cc=!1}var ts=null,Ec=null,Ro=null;function kh(){if(Ro)return Ro;var e,t=Ec,i=t.length,a,u="value"in ts?ts.value:ts.textContent,h=u.length;for(e=0;e<i&&t[e]===u[e];e++);var m=i-e;for(a=1;a<=m&&t[i-a]===u[h-a];a++);return Ro=u.slice(e,1<a?1-a:void 0)}function Do(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Mo(){return!0}function Th(){return!1}function jn(e){function t(i,a,u,h,m){this._reactName=i,this._targetInst=u,this.type=a,this.nativeEvent=h,this.target=m,this.currentTarget=null;for(var y in e)e.hasOwnProperty(y)&&(i=e[y],this[y]=i?i(h):h[y]);return this.isDefaultPrevented=(h.defaultPrevented!=null?h.defaultPrevented:h.returnValue===!1)?Mo:Th,this.isPropagationStopped=Th,this}return v(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var i=this.nativeEvent;i&&(i.preventDefault?i.preventDefault():typeof i.returnValue!="unknown"&&(i.returnValue=!1),this.isDefaultPrevented=Mo)},stopPropagation:function(){var i=this.nativeEvent;i&&(i.stopPropagation?i.stopPropagation():typeof i.cancelBubble!="unknown"&&(i.cancelBubble=!0),this.isPropagationStopped=Mo)},persist:function(){},isPersistent:Mo}),t}var Rs={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},zo=jn(Rs),cl=v({},Rs,{view:0,detail:0}),gb=jn(cl),Nc,jc,dl,$o=v({},cl,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:kc,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==dl&&(dl&&e.type==="mousemove"?(Nc=e.screenX-dl.screenX,jc=e.screenY-dl.screenY):jc=Nc=0,dl=e),Nc)},movementY:function(e){return"movementY"in e?e.movementY:jc}}),Oh=jn($o),vb=v({},$o,{dataTransfer:0}),bb=jn(vb),yb=v({},cl,{relatedTarget:0}),Ac=jn(yb),xb=v({},Rs,{animationName:0,elapsedTime:0,pseudoElement:0}),_b=jn(xb),Sb=v({},Rs,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),wb=jn(Sb),Cb=v({},Rs,{data:0}),Rh=jn(Cb),Eb={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Nb={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},jb={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Ab(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=jb[e])?!!t[e]:!1}function kc(){return Ab}var kb=v({},cl,{key:function(e){if(e.key){var t=Eb[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Do(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Nb[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:kc,charCode:function(e){return e.type==="keypress"?Do(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Do(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Tb=jn(kb),Ob=v({},$o,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Dh=jn(Ob),Rb=v({},cl,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:kc}),Db=jn(Rb),Mb=v({},Rs,{propertyName:0,elapsedTime:0,pseudoElement:0}),zb=jn(Mb),$b=v({},$o,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Lb=jn($b),Bb=v({},Rs,{newState:0,oldState:0}),Hb=jn(Bb),Vb=[9,13,27,32],Tc=Mi&&"CompositionEvent"in window,ul=null;Mi&&"documentMode"in document&&(ul=document.documentMode);var Ib=Mi&&"TextEvent"in window&&!ul,Mh=Mi&&(!Tc||ul&&8<ul&&11>=ul),zh=" ",$h=!1;function Lh(e,t){switch(e){case"keyup":return Vb.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Bh(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var ya=!1;function Ub(e,t){switch(e){case"compositionend":return Bh(t);case"keypress":return t.which!==32?null:($h=!0,zh);case"textInput":return e=t.data,e===zh&&$h?null:e;default:return null}}function qb(e,t){if(ya)return e==="compositionend"||!Tc&&Lh(e,t)?(e=kh(),Ro=Ec=ts=null,ya=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Mh&&t.locale!=="ko"?null:t.data;default:return null}}var Pb={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Hh(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Pb[e.type]:t==="textarea"}function Vh(e,t,i,a){va?ba?ba.push(a):ba=[a]:va=a,t=Er(t,"onChange"),0<t.length&&(i=new zo("onChange","change",null,i,a),e.push({event:i,listeners:t}))}var hl=null,fl=null;function Gb(e){wm(e,0)}function Lo(e){var t=ll(e);if(_h(t))return e}function Ih(e,t){if(e==="change")return t}var Uh=!1;if(Mi){var Oc;if(Mi){var Rc="oninput"in document;if(!Rc){var qh=document.createElement("div");qh.setAttribute("oninput","return;"),Rc=typeof qh.oninput=="function"}Oc=Rc}else Oc=!1;Uh=Oc&&(!document.documentMode||9<document.documentMode)}function Ph(){hl&&(hl.detachEvent("onpropertychange",Gh),fl=hl=null)}function Gh(e){if(e.propertyName==="value"&&Lo(fl)){var t=[];Vh(t,fl,e,Sc(e)),Ah(Gb,t)}}function Yb(e,t,i){e==="focusin"?(Ph(),hl=t,fl=i,hl.attachEvent("onpropertychange",Gh)):e==="focusout"&&Ph()}function Kb(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Lo(fl)}function Fb(e,t){if(e==="click")return Lo(t)}function Xb(e,t){if(e==="input"||e==="change")return Lo(t)}function Qb(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Mn=typeof Object.is=="function"?Object.is:Qb;function pl(e,t){if(Mn(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var i=Object.keys(e),a=Object.keys(t);if(i.length!==a.length)return!1;for(a=0;a<i.length;a++){var u=i[a];if(!at.call(t,u)||!Mn(e[u],t[u]))return!1}return!0}function Yh(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Kh(e,t){var i=Yh(e);e=0;for(var a;i;){if(i.nodeType===3){if(a=e+i.textContent.length,e<=t&&a>=t)return{node:i,offset:t-e};e=a}e:{for(;i;){if(i.nextSibling){i=i.nextSibling;break e}i=i.parentNode}i=void 0}i=Yh(i)}}function Fh(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Fh(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Xh(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=To(e.document);t instanceof e.HTMLIFrameElement;){try{var i=typeof t.contentWindow.location.href=="string"}catch{i=!1}if(i)e=t.contentWindow;else break;t=To(e.document)}return t}function Dc(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var Zb=Mi&&"documentMode"in document&&11>=document.documentMode,xa=null,Mc=null,ml=null,zc=!1;function Qh(e,t,i){var a=i.window===i?i.document:i.nodeType===9?i:i.ownerDocument;zc||xa==null||xa!==To(a)||(a=xa,"selectionStart"in a&&Dc(a)?a={start:a.selectionStart,end:a.selectionEnd}:(a=(a.ownerDocument&&a.ownerDocument.defaultView||window).getSelection(),a={anchorNode:a.anchorNode,anchorOffset:a.anchorOffset,focusNode:a.focusNode,focusOffset:a.focusOffset}),ml&&pl(ml,a)||(ml=a,a=Er(Mc,"onSelect"),0<a.length&&(t=new zo("onSelect","select",null,t,i),e.push({event:t,listeners:a}),t.target=xa)))}function Ds(e,t){var i={};return i[e.toLowerCase()]=t.toLowerCase(),i["Webkit"+e]="webkit"+t,i["Moz"+e]="moz"+t,i}var _a={animationend:Ds("Animation","AnimationEnd"),animationiteration:Ds("Animation","AnimationIteration"),animationstart:Ds("Animation","AnimationStart"),transitionrun:Ds("Transition","TransitionRun"),transitionstart:Ds("Transition","TransitionStart"),transitioncancel:Ds("Transition","TransitionCancel"),transitionend:Ds("Transition","TransitionEnd")},$c={},Zh={};Mi&&(Zh=document.createElement("div").style,"AnimationEvent"in window||(delete _a.animationend.animation,delete _a.animationiteration.animation,delete _a.animationstart.animation),"TransitionEvent"in window||delete _a.transitionend.transition);function Ms(e){if($c[e])return $c[e];if(!_a[e])return e;var t=_a[e],i;for(i in t)if(t.hasOwnProperty(i)&&i in Zh)return $c[e]=t[i];return e}var Jh=Ms("animationend"),Wh=Ms("animationiteration"),ef=Ms("animationstart"),Jb=Ms("transitionrun"),Wb=Ms("transitionstart"),ey=Ms("transitioncancel"),tf=Ms("transitionend"),nf=new Map,Lc="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Lc.push("scrollEnd");function hi(e,t){nf.set(e,t),Os(t,[e])}var Bo=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},Xn=[],Sa=0,Bc=0;function Ho(){for(var e=Sa,t=Bc=Sa=0;t<e;){var i=Xn[t];Xn[t++]=null;var a=Xn[t];Xn[t++]=null;var u=Xn[t];Xn[t++]=null;var h=Xn[t];if(Xn[t++]=null,a!==null&&u!==null){var m=a.pending;m===null?u.next=u:(u.next=m.next,m.next=u),a.pending=u}h!==0&&sf(i,u,h)}}function Vo(e,t,i,a){Xn[Sa++]=e,Xn[Sa++]=t,Xn[Sa++]=i,Xn[Sa++]=a,Bc|=a,e.lanes|=a,e=e.alternate,e!==null&&(e.lanes|=a)}function Hc(e,t,i,a){return Vo(e,t,i,a),Io(e)}function zs(e,t){return Vo(e,null,null,t),Io(e)}function sf(e,t,i){e.lanes|=i;var a=e.alternate;a!==null&&(a.lanes|=i);for(var u=!1,h=e.return;h!==null;)h.childLanes|=i,a=h.alternate,a!==null&&(a.childLanes|=i),h.tag===22&&(e=h.stateNode,e===null||e._visibility&1||(u=!0)),e=h,h=h.return;return e.tag===3?(h=e.stateNode,u&&t!==null&&(u=31-Nt(i),e=h.hiddenUpdates,a=e[u],a===null?e[u]=[t]:a.push(t),t.lane=i|536870912),h):null}function Io(e){if(50<Ll)throw Ll=0,Fd=null,Error(l(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var wa={};function ty(e,t,i,a){this.tag=e,this.key=i,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=a,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function zn(e,t,i,a){return new ty(e,t,i,a)}function Vc(e){return e=e.prototype,!(!e||!e.isReactComponent)}function zi(e,t){var i=e.alternate;return i===null?(i=zn(e.tag,t,e.key,e.mode),i.elementType=e.elementType,i.type=e.type,i.stateNode=e.stateNode,i.alternate=e,e.alternate=i):(i.pendingProps=t,i.type=e.type,i.flags=0,i.subtreeFlags=0,i.deletions=null),i.flags=e.flags&65011712,i.childLanes=e.childLanes,i.lanes=e.lanes,i.child=e.child,i.memoizedProps=e.memoizedProps,i.memoizedState=e.memoizedState,i.updateQueue=e.updateQueue,t=e.dependencies,i.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},i.sibling=e.sibling,i.index=e.index,i.ref=e.ref,i.refCleanup=e.refCleanup,i}function af(e,t){e.flags&=65011714;var i=e.alternate;return i===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=i.childLanes,e.lanes=i.lanes,e.child=i.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=i.memoizedProps,e.memoizedState=i.memoizedState,e.updateQueue=i.updateQueue,e.type=i.type,t=i.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Uo(e,t,i,a,u,h){var m=0;if(a=e,typeof e=="function")Vc(e)&&(m=1);else if(typeof e=="string")m=l0(e,i,Z.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case z:return e=zn(31,i,t,u),e.elementType=z,e.lanes=h,e;case V:return $s(i.children,u,h,t);case se:m=8,u|=24;break;case ee:return e=zn(12,i,t,u|2),e.elementType=ee,e.lanes=h,e;case J:return e=zn(13,i,t,u),e.elementType=J,e.lanes=h,e;case $:return e=zn(19,i,t,u),e.elementType=$,e.lanes=h,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case ae:m=10;break e;case oe:m=9;break e;case de:m=11;break e;case S:m=14;break e;case I:m=16,a=null;break e}m=29,i=Error(l(130,e===null?"null":typeof e,"")),a=null}return t=zn(m,i,t,u),t.elementType=e,t.type=a,t.lanes=h,t}function $s(e,t,i,a){return e=zn(7,e,a,t),e.lanes=i,e}function Ic(e,t,i){return e=zn(6,e,null,t),e.lanes=i,e}function lf(e){var t=zn(18,null,null,0);return t.stateNode=e,t}function Uc(e,t,i){return t=zn(4,e.children!==null?e.children:[],e.key,t),t.lanes=i,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var of=new WeakMap;function Qn(e,t){if(typeof e=="object"&&e!==null){var i=of.get(e);return i!==void 0?i:(t={value:e,source:t,stack:_t(t)},of.set(e,t),t)}return{value:e,source:t,stack:_t(t)}}var Ca=[],Ea=0,qo=null,gl=0,Zn=[],Jn=0,ns=null,_i=1,Si="";function $i(e,t){Ca[Ea++]=gl,Ca[Ea++]=qo,qo=e,gl=t}function rf(e,t,i){Zn[Jn++]=_i,Zn[Jn++]=Si,Zn[Jn++]=ns,ns=e;var a=_i;e=Si;var u=32-Nt(a)-1;a&=~(1<<u),i+=1;var h=32-Nt(t)+u;if(30<h){var m=u-u%5;h=(a&(1<<m)-1).toString(32),a>>=m,u-=m,_i=1<<32-Nt(t)+u|i<<u|a,Si=h+e}else _i=1<<h|i<<u|a,Si=e}function qc(e){e.return!==null&&($i(e,1),rf(e,1,0))}function Pc(e){for(;e===qo;)qo=Ca[--Ea],Ca[Ea]=null,gl=Ca[--Ea],Ca[Ea]=null;for(;e===ns;)ns=Zn[--Jn],Zn[Jn]=null,Si=Zn[--Jn],Zn[Jn]=null,_i=Zn[--Jn],Zn[Jn]=null}function cf(e,t){Zn[Jn++]=_i,Zn[Jn++]=Si,Zn[Jn++]=ns,_i=t.id,Si=t.overflow,ns=e}var on=null,dt=null,qe=!1,is=null,Wn=!1,Gc=Error(l(519));function ss(e){var t=Error(l(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw vl(Qn(t,e)),Gc}function df(e){var t=e.stateNode,i=e.type,a=e.memoizedProps;switch(t[L]=e,t[he]=a,i){case"dialog":Le("cancel",t),Le("close",t);break;case"iframe":case"object":case"embed":Le("load",t);break;case"video":case"audio":for(i=0;i<Hl.length;i++)Le(Hl[i],t);break;case"source":Le("error",t);break;case"img":case"image":case"link":Le("error",t),Le("load",t);break;case"details":Le("toggle",t);break;case"input":Le("invalid",t),Sh(t,a.value,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name,!0);break;case"select":Le("invalid",t);break;case"textarea":Le("invalid",t),Ch(t,a.value,a.defaultValue,a.children)}i=a.children,typeof i!="string"&&typeof i!="number"&&typeof i!="bigint"||t.textContent===""+i||a.suppressHydrationWarning===!0||jm(t.textContent,i)?(a.popover!=null&&(Le("beforetoggle",t),Le("toggle",t)),a.onScroll!=null&&Le("scroll",t),a.onScrollEnd!=null&&Le("scrollend",t),a.onClick!=null&&(t.onclick=Di),t=!0):t=!1,t||ss(e,!0)}function uf(e){for(on=e.return;on;)switch(on.tag){case 5:case 31:case 13:Wn=!1;return;case 27:case 3:Wn=!0;return;default:on=on.return}}function Na(e){if(e!==on)return!1;if(!qe)return uf(e),qe=!0,!1;var t=e.tag,i;if((i=t!==3&&t!==27)&&((i=t===5)&&(i=e.type,i=!(i!=="form"&&i!=="button")||cu(e.type,e.memoizedProps)),i=!i),i&&dt&&ss(e),uf(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(l(317));dt=$m(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(l(317));dt=$m(e)}else t===27?(t=dt,bs(e.type)?(e=pu,pu=null,dt=e):dt=t):dt=on?ti(e.stateNode.nextSibling):null;return!0}function Ls(){dt=on=null,qe=!1}function Yc(){var e=is;return e!==null&&(On===null?On=e:On.push.apply(On,e),is=null),e}function vl(e){is===null?is=[e]:is.push(e)}var Kc=w(null),Bs=null,Li=null;function as(e,t,i){U(Kc,t._currentValue),t._currentValue=i}function Bi(e){e._currentValue=Kc.current,H(Kc)}function Fc(e,t,i){for(;e!==null;){var a=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,a!==null&&(a.childLanes|=t)):a!==null&&(a.childLanes&t)!==t&&(a.childLanes|=t),e===i)break;e=e.return}}function Xc(e,t,i,a){var u=e.child;for(u!==null&&(u.return=e);u!==null;){var h=u.dependencies;if(h!==null){var m=u.child;h=h.firstContext;e:for(;h!==null;){var y=h;h=u;for(var C=0;C<t.length;C++)if(y.context===t[C]){h.lanes|=i,y=h.alternate,y!==null&&(y.lanes|=i),Fc(h.return,i,e),a||(m=null);break e}h=y.next}}else if(u.tag===18){if(m=u.return,m===null)throw Error(l(341));m.lanes|=i,h=m.alternate,h!==null&&(h.lanes|=i),Fc(m,i,e),m=null}else m=u.child;if(m!==null)m.return=u;else for(m=u;m!==null;){if(m===e){m=null;break}if(u=m.sibling,u!==null){u.return=m.return,m=u;break}m=m.return}u=m}}function ja(e,t,i,a){e=null;for(var u=t,h=!1;u!==null;){if(!h){if((u.flags&524288)!==0)h=!0;else if((u.flags&262144)!==0)break}if(u.tag===10){var m=u.alternate;if(m===null)throw Error(l(387));if(m=m.memoizedProps,m!==null){var y=u.type;Mn(u.pendingProps.value,m.value)||(e!==null?e.push(y):e=[y])}}else if(u===_e.current){if(m=u.alternate,m===null)throw Error(l(387));m.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(e!==null?e.push(Pl):e=[Pl])}u=u.return}e!==null&&Xc(t,e,i,a),t.flags|=262144}function Po(e){for(e=e.firstContext;e!==null;){if(!Mn(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Hs(e){Bs=e,Li=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function rn(e){return hf(Bs,e)}function Go(e,t){return Bs===null&&Hs(e),hf(e,t)}function hf(e,t){var i=t._currentValue;if(t={context:t,memoizedValue:i,next:null},Li===null){if(e===null)throw Error(l(308));Li=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Li=Li.next=t;return i}var ny=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(i,a){e.push(a)}};this.abort=function(){t.aborted=!0,e.forEach(function(i){return i()})}},iy=o.unstable_scheduleCallback,sy=o.unstable_NormalPriority,Ut={$$typeof:ae,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Qc(){return{controller:new ny,data:new Map,refCount:0}}function bl(e){e.refCount--,e.refCount===0&&iy(sy,function(){e.controller.abort()})}var yl=null,Zc=0,Aa=0,ka=null;function ay(e,t){if(yl===null){var i=yl=[];Zc=0,Aa=eu(),ka={status:"pending",value:void 0,then:function(a){i.push(a)}}}return Zc++,t.then(ff,ff),t}function ff(){if(--Zc===0&&yl!==null){ka!==null&&(ka.status="fulfilled");var e=yl;yl=null,Aa=0,ka=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function ly(e,t){var i=[],a={status:"pending",value:null,reason:null,then:function(u){i.push(u)}};return e.then(function(){a.status="fulfilled",a.value=t;for(var u=0;u<i.length;u++)(0,i[u])(t)},function(u){for(a.status="rejected",a.reason=u,u=0;u<i.length;u++)(0,i[u])(void 0)}),a}var pf=A.S;A.S=function(e,t){Zp=Oe(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&ay(e,t),pf!==null&&pf(e,t)};var Vs=w(null);function Jc(){var e=Vs.current;return e!==null?e:rt.pooledCache}function Yo(e,t){t===null?U(Vs,Vs.current):U(Vs,t.pool)}function mf(){var e=Jc();return e===null?null:{parent:Ut._currentValue,pool:e}}var Ta=Error(l(460)),Wc=Error(l(474)),Ko=Error(l(542)),Fo={then:function(){}};function gf(e){return e=e.status,e==="fulfilled"||e==="rejected"}function vf(e,t,i){switch(i=e[i],i===void 0?e.push(t):i!==t&&(t.then(Di,Di),t=i),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,yf(e),e;default:if(typeof t.status=="string")t.then(Di,Di);else{if(e=rt,e!==null&&100<e.shellSuspendCounter)throw Error(l(482));e=t,e.status="pending",e.then(function(a){if(t.status==="pending"){var u=t;u.status="fulfilled",u.value=a}},function(a){if(t.status==="pending"){var u=t;u.status="rejected",u.reason=a}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,yf(e),e}throw Us=t,Ta}}function Is(e){try{var t=e._init;return t(e._payload)}catch(i){throw i!==null&&typeof i=="object"&&typeof i.then=="function"?(Us=i,Ta):i}}var Us=null;function bf(){if(Us===null)throw Error(l(459));var e=Us;return Us=null,e}function yf(e){if(e===Ta||e===Ko)throw Error(l(483))}var Oa=null,xl=0;function Xo(e){var t=xl;return xl+=1,Oa===null&&(Oa=[]),vf(Oa,e,t)}function _l(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function Qo(e,t){throw t.$$typeof===k?Error(l(525)):(e=Object.prototype.toString.call(t),Error(l(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function xf(e){function t(T,j){if(e){var R=T.deletions;R===null?(T.deletions=[j],T.flags|=16):R.push(j)}}function i(T,j){if(!e)return null;for(;j!==null;)t(T,j),j=j.sibling;return null}function a(T){for(var j=new Map;T!==null;)T.key!==null?j.set(T.key,T):j.set(T.index,T),T=T.sibling;return j}function u(T,j){return T=zi(T,j),T.index=0,T.sibling=null,T}function h(T,j,R){return T.index=R,e?(R=T.alternate,R!==null?(R=R.index,R<j?(T.flags|=67108866,j):R):(T.flags|=67108866,j)):(T.flags|=1048576,j)}function m(T){return e&&T.alternate===null&&(T.flags|=67108866),T}function y(T,j,R,K){return j===null||j.tag!==6?(j=Ic(R,T.mode,K),j.return=T,j):(j=u(j,R),j.return=T,j)}function C(T,j,R,K){var xe=R.type;return xe===V?P(T,j,R.props.children,K,R.key):j!==null&&(j.elementType===xe||typeof xe=="object"&&xe!==null&&xe.$$typeof===I&&Is(xe)===j.type)?(j=u(j,R.props),_l(j,R),j.return=T,j):(j=Uo(R.type,R.key,R.props,null,T.mode,K),_l(j,R),j.return=T,j)}function D(T,j,R,K){return j===null||j.tag!==4||j.stateNode.containerInfo!==R.containerInfo||j.stateNode.implementation!==R.implementation?(j=Uc(R,T.mode,K),j.return=T,j):(j=u(j,R.children||[]),j.return=T,j)}function P(T,j,R,K,xe){return j===null||j.tag!==7?(j=$s(R,T.mode,K,xe),j.return=T,j):(j=u(j,R),j.return=T,j)}function X(T,j,R){if(typeof j=="string"&&j!==""||typeof j=="number"||typeof j=="bigint")return j=Ic(""+j,T.mode,R),j.return=T,j;if(typeof j=="object"&&j!==null){switch(j.$$typeof){case E:return R=Uo(j.type,j.key,j.props,null,T.mode,R),_l(R,j),R.return=T,R;case O:return j=Uc(j,T.mode,R),j.return=T,j;case I:return j=Is(j),X(T,j,R)}if(ne(j)||ue(j))return j=$s(j,T.mode,R,null),j.return=T,j;if(typeof j.then=="function")return X(T,Xo(j),R);if(j.$$typeof===ae)return X(T,Go(T,j),R);Qo(T,j)}return null}function M(T,j,R,K){var xe=j!==null?j.key:null;if(typeof R=="string"&&R!==""||typeof R=="number"||typeof R=="bigint")return xe!==null?null:y(T,j,""+R,K);if(typeof R=="object"&&R!==null){switch(R.$$typeof){case E:return R.key===xe?C(T,j,R,K):null;case O:return R.key===xe?D(T,j,R,K):null;case I:return R=Is(R),M(T,j,R,K)}if(ne(R)||ue(R))return xe!==null?null:P(T,j,R,K,null);if(typeof R.then=="function")return M(T,j,Xo(R),K);if(R.$$typeof===ae)return M(T,j,Go(T,R),K);Qo(T,R)}return null}function B(T,j,R,K,xe){if(typeof K=="string"&&K!==""||typeof K=="number"||typeof K=="bigint")return T=T.get(R)||null,y(j,T,""+K,xe);if(typeof K=="object"&&K!==null){switch(K.$$typeof){case E:return T=T.get(K.key===null?R:K.key)||null,C(j,T,K,xe);case O:return T=T.get(K.key===null?R:K.key)||null,D(j,T,K,xe);case I:return K=Is(K),B(T,j,R,K,xe)}if(ne(K)||ue(K))return T=T.get(R)||null,P(j,T,K,xe,null);if(typeof K.then=="function")return B(T,j,R,Xo(K),xe);if(K.$$typeof===ae)return B(T,j,R,Go(j,K),xe);Qo(j,K)}return null}function fe(T,j,R,K){for(var xe=null,Ke=null,ge=j,Re=j=0,Ve=null;ge!==null&&Re<R.length;Re++){ge.index>Re?(Ve=ge,ge=null):Ve=ge.sibling;var Fe=M(T,ge,R[Re],K);if(Fe===null){ge===null&&(ge=Ve);break}e&&ge&&Fe.alternate===null&&t(T,ge),j=h(Fe,j,Re),Ke===null?xe=Fe:Ke.sibling=Fe,Ke=Fe,ge=Ve}if(Re===R.length)return i(T,ge),qe&&$i(T,Re),xe;if(ge===null){for(;Re<R.length;Re++)ge=X(T,R[Re],K),ge!==null&&(j=h(ge,j,Re),Ke===null?xe=ge:Ke.sibling=ge,Ke=ge);return qe&&$i(T,Re),xe}for(ge=a(ge);Re<R.length;Re++)Ve=B(ge,T,Re,R[Re],K),Ve!==null&&(e&&Ve.alternate!==null&&ge.delete(Ve.key===null?Re:Ve.key),j=h(Ve,j,Re),Ke===null?xe=Ve:Ke.sibling=Ve,Ke=Ve);return e&&ge.forEach(function(ws){return t(T,ws)}),qe&&$i(T,Re),xe}function Se(T,j,R,K){if(R==null)throw Error(l(151));for(var xe=null,Ke=null,ge=j,Re=j=0,Ve=null,Fe=R.next();ge!==null&&!Fe.done;Re++,Fe=R.next()){ge.index>Re?(Ve=ge,ge=null):Ve=ge.sibling;var ws=M(T,ge,Fe.value,K);if(ws===null){ge===null&&(ge=Ve);break}e&&ge&&ws.alternate===null&&t(T,ge),j=h(ws,j,Re),Ke===null?xe=ws:Ke.sibling=ws,Ke=ws,ge=Ve}if(Fe.done)return i(T,ge),qe&&$i(T,Re),xe;if(ge===null){for(;!Fe.done;Re++,Fe=R.next())Fe=X(T,Fe.value,K),Fe!==null&&(j=h(Fe,j,Re),Ke===null?xe=Fe:Ke.sibling=Fe,Ke=Fe);return qe&&$i(T,Re),xe}for(ge=a(ge);!Fe.done;Re++,Fe=R.next())Fe=B(ge,T,Re,Fe.value,K),Fe!==null&&(e&&Fe.alternate!==null&&ge.delete(Fe.key===null?Re:Fe.key),j=h(Fe,j,Re),Ke===null?xe=Fe:Ke.sibling=Fe,Ke=Fe);return e&&ge.forEach(function(v0){return t(T,v0)}),qe&&$i(T,Re),xe}function it(T,j,R,K){if(typeof R=="object"&&R!==null&&R.type===V&&R.key===null&&(R=R.props.children),typeof R=="object"&&R!==null){switch(R.$$typeof){case E:e:{for(var xe=R.key;j!==null;){if(j.key===xe){if(xe=R.type,xe===V){if(j.tag===7){i(T,j.sibling),K=u(j,R.props.children),K.return=T,T=K;break e}}else if(j.elementType===xe||typeof xe=="object"&&xe!==null&&xe.$$typeof===I&&Is(xe)===j.type){i(T,j.sibling),K=u(j,R.props),_l(K,R),K.return=T,T=K;break e}i(T,j);break}else t(T,j);j=j.sibling}R.type===V?(K=$s(R.props.children,T.mode,K,R.key),K.return=T,T=K):(K=Uo(R.type,R.key,R.props,null,T.mode,K),_l(K,R),K.return=T,T=K)}return m(T);case O:e:{for(xe=R.key;j!==null;){if(j.key===xe)if(j.tag===4&&j.stateNode.containerInfo===R.containerInfo&&j.stateNode.implementation===R.implementation){i(T,j.sibling),K=u(j,R.children||[]),K.return=T,T=K;break e}else{i(T,j);break}else t(T,j);j=j.sibling}K=Uc(R,T.mode,K),K.return=T,T=K}return m(T);case I:return R=Is(R),it(T,j,R,K)}if(ne(R))return fe(T,j,R,K);if(ue(R)){if(xe=ue(R),typeof xe!="function")throw Error(l(150));return R=xe.call(R),Se(T,j,R,K)}if(typeof R.then=="function")return it(T,j,Xo(R),K);if(R.$$typeof===ae)return it(T,j,Go(T,R),K);Qo(T,R)}return typeof R=="string"&&R!==""||typeof R=="number"||typeof R=="bigint"?(R=""+R,j!==null&&j.tag===6?(i(T,j.sibling),K=u(j,R),K.return=T,T=K):(i(T,j),K=Ic(R,T.mode,K),K.return=T,T=K),m(T)):i(T,j)}return function(T,j,R,K){try{xl=0;var xe=it(T,j,R,K);return Oa=null,xe}catch(ge){if(ge===Ta||ge===Ko)throw ge;var Ke=zn(29,ge,null,T.mode);return Ke.lanes=K,Ke.return=T,Ke}}}var qs=xf(!0),_f=xf(!1),ls=!1;function ed(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function td(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function os(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function rs(e,t,i){var a=e.updateQueue;if(a===null)return null;if(a=a.shared,(Qe&2)!==0){var u=a.pending;return u===null?t.next=t:(t.next=u.next,u.next=t),a.pending=t,t=Io(e),sf(e,null,i),t}return Vo(e,a,t,i),Io(e)}function Sl(e,t,i){if(t=t.updateQueue,t!==null&&(t=t.shared,(i&4194048)!==0)){var a=t.lanes;a&=e.pendingLanes,i|=a,t.lanes=i,Ue(e,i)}}function nd(e,t){var i=e.updateQueue,a=e.alternate;if(a!==null&&(a=a.updateQueue,i===a)){var u=null,h=null;if(i=i.firstBaseUpdate,i!==null){do{var m={lane:i.lane,tag:i.tag,payload:i.payload,callback:null,next:null};h===null?u=h=m:h=h.next=m,i=i.next}while(i!==null);h===null?u=h=t:h=h.next=t}else u=h=t;i={baseState:a.baseState,firstBaseUpdate:u,lastBaseUpdate:h,shared:a.shared,callbacks:a.callbacks},e.updateQueue=i;return}e=i.lastBaseUpdate,e===null?i.firstBaseUpdate=t:e.next=t,i.lastBaseUpdate=t}var id=!1;function wl(){if(id){var e=ka;if(e!==null)throw e}}function Cl(e,t,i,a){id=!1;var u=e.updateQueue;ls=!1;var h=u.firstBaseUpdate,m=u.lastBaseUpdate,y=u.shared.pending;if(y!==null){u.shared.pending=null;var C=y,D=C.next;C.next=null,m===null?h=D:m.next=D,m=C;var P=e.alternate;P!==null&&(P=P.updateQueue,y=P.lastBaseUpdate,y!==m&&(y===null?P.firstBaseUpdate=D:y.next=D,P.lastBaseUpdate=C))}if(h!==null){var X=u.baseState;m=0,P=D=C=null,y=h;do{var M=y.lane&-536870913,B=M!==y.lane;if(B?(He&M)===M:(a&M)===M){M!==0&&M===Aa&&(id=!0),P!==null&&(P=P.next={lane:0,tag:y.tag,payload:y.payload,callback:null,next:null});e:{var fe=e,Se=y;M=t;var it=i;switch(Se.tag){case 1:if(fe=Se.payload,typeof fe=="function"){X=fe.call(it,X,M);break e}X=fe;break e;case 3:fe.flags=fe.flags&-65537|128;case 0:if(fe=Se.payload,M=typeof fe=="function"?fe.call(it,X,M):fe,M==null)break e;X=v({},X,M);break e;case 2:ls=!0}}M=y.callback,M!==null&&(e.flags|=64,B&&(e.flags|=8192),B=u.callbacks,B===null?u.callbacks=[M]:B.push(M))}else B={lane:M,tag:y.tag,payload:y.payload,callback:y.callback,next:null},P===null?(D=P=B,C=X):P=P.next=B,m|=M;if(y=y.next,y===null){if(y=u.shared.pending,y===null)break;B=y,y=B.next,B.next=null,u.lastBaseUpdate=B,u.shared.pending=null}}while(!0);P===null&&(C=X),u.baseState=C,u.firstBaseUpdate=D,u.lastBaseUpdate=P,h===null&&(u.shared.lanes=0),fs|=m,e.lanes=m,e.memoizedState=X}}function Sf(e,t){if(typeof e!="function")throw Error(l(191,e));e.call(t)}function wf(e,t){var i=e.callbacks;if(i!==null)for(e.callbacks=null,e=0;e<i.length;e++)Sf(i[e],t)}var Ra=w(null),Zo=w(0);function Cf(e,t){e=Ki,U(Zo,e),U(Ra,t),Ki=e|t.baseLanes}function sd(){U(Zo,Ki),U(Ra,Ra.current)}function ad(){Ki=Zo.current,H(Ra),H(Zo)}var $n=w(null),ei=null;function cs(e){var t=e.alternate;U(Lt,Lt.current&1),U($n,e),ei===null&&(t===null||Ra.current!==null||t.memoizedState!==null)&&(ei=e)}function ld(e){U(Lt,Lt.current),U($n,e),ei===null&&(ei=e)}function Ef(e){e.tag===22?(U(Lt,Lt.current),U($n,e),ei===null&&(ei=e)):ds()}function ds(){U(Lt,Lt.current),U($n,$n.current)}function Ln(e){H($n),ei===e&&(ei=null),H(Lt)}var Lt=w(0);function Jo(e){for(var t=e;t!==null;){if(t.tag===13){var i=t.memoizedState;if(i!==null&&(i=i.dehydrated,i===null||hu(i)||fu(i)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder==="forwards"||t.memoizedProps.revealOrder==="backwards"||t.memoizedProps.revealOrder==="unstable_legacy-backwards"||t.memoizedProps.revealOrder==="together")){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Hi=0,ke=null,tt=null,qt=null,Wo=!1,Da=!1,Ps=!1,er=0,El=0,Ma=null,oy=0;function Tt(){throw Error(l(321))}function od(e,t){if(t===null)return!1;for(var i=0;i<t.length&&i<e.length;i++)if(!Mn(e[i],t[i]))return!1;return!0}function rd(e,t,i,a,u,h){return Hi=h,ke=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,A.H=e===null||e.memoizedState===null?rp:wd,Ps=!1,h=i(a,u),Ps=!1,Da&&(h=jf(t,i,a,u)),Nf(e),h}function Nf(e){A.H=Al;var t=tt!==null&&tt.next!==null;if(Hi=0,qt=tt=ke=null,Wo=!1,El=0,Ma=null,t)throw Error(l(300));e===null||Pt||(e=e.dependencies,e!==null&&Po(e)&&(Pt=!0))}function jf(e,t,i,a){ke=e;var u=0;do{if(Da&&(Ma=null),El=0,Da=!1,25<=u)throw Error(l(301));if(u+=1,qt=tt=null,e.updateQueue!=null){var h=e.updateQueue;h.lastEffect=null,h.events=null,h.stores=null,h.memoCache!=null&&(h.memoCache.index=0)}A.H=cp,h=t(i,a)}while(Da);return h}function ry(){var e=A.H,t=e.useState()[0];return t=typeof t.then=="function"?Nl(t):t,e=e.useState()[0],(tt!==null?tt.memoizedState:null)!==e&&(ke.flags|=1024),t}function cd(){var e=er!==0;return er=0,e}function dd(e,t,i){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i}function ud(e){if(Wo){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}Wo=!1}Hi=0,qt=tt=ke=null,Da=!1,El=er=0,Ma=null}function wn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return qt===null?ke.memoizedState=qt=e:qt=qt.next=e,qt}function Bt(){if(tt===null){var e=ke.alternate;e=e!==null?e.memoizedState:null}else e=tt.next;var t=qt===null?ke.memoizedState:qt.next;if(t!==null)qt=t,tt=e;else{if(e===null)throw ke.alternate===null?Error(l(467)):Error(l(310));tt=e,e={memoizedState:tt.memoizedState,baseState:tt.baseState,baseQueue:tt.baseQueue,queue:tt.queue,next:null},qt===null?ke.memoizedState=qt=e:qt=qt.next=e}return qt}function tr(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Nl(e){var t=El;return El+=1,Ma===null&&(Ma=[]),e=vf(Ma,e,t),t=ke,(qt===null?t.memoizedState:qt.next)===null&&(t=t.alternate,A.H=t===null||t.memoizedState===null?rp:wd),e}function nr(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return Nl(e);if(e.$$typeof===ae)return rn(e)}throw Error(l(438,String(e)))}function hd(e){var t=null,i=ke.updateQueue;if(i!==null&&(t=i.memoCache),t==null){var a=ke.alternate;a!==null&&(a=a.updateQueue,a!==null&&(a=a.memoCache,a!=null&&(t={data:a.data.map(function(u){return u.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),i===null&&(i=tr(),ke.updateQueue=i),i.memoCache=t,i=t.data[t.index],i===void 0)for(i=t.data[t.index]=Array(e),a=0;a<e;a++)i[a]=W;return t.index++,i}function Vi(e,t){return typeof t=="function"?t(e):t}function ir(e){var t=Bt();return fd(t,tt,e)}function fd(e,t,i){var a=e.queue;if(a===null)throw Error(l(311));a.lastRenderedReducer=i;var u=e.baseQueue,h=a.pending;if(h!==null){if(u!==null){var m=u.next;u.next=h.next,h.next=m}t.baseQueue=u=h,a.pending=null}if(h=e.baseState,u===null)e.memoizedState=h;else{t=u.next;var y=m=null,C=null,D=t,P=!1;do{var X=D.lane&-536870913;if(X!==D.lane?(He&X)===X:(Hi&X)===X){var M=D.revertLane;if(M===0)C!==null&&(C=C.next={lane:0,revertLane:0,gesture:null,action:D.action,hasEagerState:D.hasEagerState,eagerState:D.eagerState,next:null}),X===Aa&&(P=!0);else if((Hi&M)===M){D=D.next,M===Aa&&(P=!0);continue}else X={lane:0,revertLane:D.revertLane,gesture:null,action:D.action,hasEagerState:D.hasEagerState,eagerState:D.eagerState,next:null},C===null?(y=C=X,m=h):C=C.next=X,ke.lanes|=M,fs|=M;X=D.action,Ps&&i(h,X),h=D.hasEagerState?D.eagerState:i(h,X)}else M={lane:X,revertLane:D.revertLane,gesture:D.gesture,action:D.action,hasEagerState:D.hasEagerState,eagerState:D.eagerState,next:null},C===null?(y=C=M,m=h):C=C.next=M,ke.lanes|=X,fs|=X;D=D.next}while(D!==null&&D!==t);if(C===null?m=h:C.next=y,!Mn(h,e.memoizedState)&&(Pt=!0,P&&(i=ka,i!==null)))throw i;e.memoizedState=h,e.baseState=m,e.baseQueue=C,a.lastRenderedState=h}return u===null&&(a.lanes=0),[e.memoizedState,a.dispatch]}function pd(e){var t=Bt(),i=t.queue;if(i===null)throw Error(l(311));i.lastRenderedReducer=e;var a=i.dispatch,u=i.pending,h=t.memoizedState;if(u!==null){i.pending=null;var m=u=u.next;do h=e(h,m.action),m=m.next;while(m!==u);Mn(h,t.memoizedState)||(Pt=!0),t.memoizedState=h,t.baseQueue===null&&(t.baseState=h),i.lastRenderedState=h}return[h,a]}function Af(e,t,i){var a=ke,u=Bt(),h=qe;if(h){if(i===void 0)throw Error(l(407));i=i()}else i=t();var m=!Mn((tt||u).memoizedState,i);if(m&&(u.memoizedState=i,Pt=!0),u=u.queue,vd(Of.bind(null,a,u,e),[e]),u.getSnapshot!==t||m||qt!==null&&qt.memoizedState.tag&1){if(a.flags|=2048,za(9,{destroy:void 0},Tf.bind(null,a,u,i,t),null),rt===null)throw Error(l(349));h||(Hi&127)!==0||kf(a,t,i)}return i}function kf(e,t,i){e.flags|=16384,e={getSnapshot:t,value:i},t=ke.updateQueue,t===null?(t=tr(),ke.updateQueue=t,t.stores=[e]):(i=t.stores,i===null?t.stores=[e]:i.push(e))}function Tf(e,t,i,a){t.value=i,t.getSnapshot=a,Rf(t)&&Df(e)}function Of(e,t,i){return i(function(){Rf(t)&&Df(e)})}function Rf(e){var t=e.getSnapshot;e=e.value;try{var i=t();return!Mn(e,i)}catch{return!0}}function Df(e){var t=zs(e,2);t!==null&&Rn(t,e,2)}function md(e){var t=wn();if(typeof e=="function"){var i=e;if(e=i(),Ps){gt(!0);try{i()}finally{gt(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Vi,lastRenderedState:e},t}function Mf(e,t,i,a){return e.baseState=i,fd(e,tt,typeof a=="function"?a:Vi)}function cy(e,t,i,a,u){if(lr(e))throw Error(l(485));if(e=t.action,e!==null){var h={payload:u,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(m){h.listeners.push(m)}};A.T!==null?i(!0):h.isTransition=!1,a(h),i=t.pending,i===null?(h.next=t.pending=h,zf(t,h)):(h.next=i.next,t.pending=i.next=h)}}function zf(e,t){var i=t.action,a=t.payload,u=e.state;if(t.isTransition){var h=A.T,m={};A.T=m;try{var y=i(u,a),C=A.S;C!==null&&C(m,y),$f(e,t,y)}catch(D){gd(e,t,D)}finally{h!==null&&m.types!==null&&(h.types=m.types),A.T=h}}else try{h=i(u,a),$f(e,t,h)}catch(D){gd(e,t,D)}}function $f(e,t,i){i!==null&&typeof i=="object"&&typeof i.then=="function"?i.then(function(a){Lf(e,t,a)},function(a){return gd(e,t,a)}):Lf(e,t,i)}function Lf(e,t,i){t.status="fulfilled",t.value=i,Bf(t),e.state=i,t=e.pending,t!==null&&(i=t.next,i===t?e.pending=null:(i=i.next,t.next=i,zf(e,i)))}function gd(e,t,i){var a=e.pending;if(e.pending=null,a!==null){a=a.next;do t.status="rejected",t.reason=i,Bf(t),t=t.next;while(t!==a)}e.action=null}function Bf(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Hf(e,t){return t}function Vf(e,t){if(qe){var i=rt.formState;if(i!==null){e:{var a=ke;if(qe){if(dt){t:{for(var u=dt,h=Wn;u.nodeType!==8;){if(!h){u=null;break t}if(u=ti(u.nextSibling),u===null){u=null;break t}}h=u.data,u=h==="F!"||h==="F"?u:null}if(u){dt=ti(u.nextSibling),a=u.data==="F!";break e}}ss(a)}a=!1}a&&(t=i[0])}}return i=wn(),i.memoizedState=i.baseState=t,a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Hf,lastRenderedState:t},i.queue=a,i=ap.bind(null,ke,a),a.dispatch=i,a=md(!1),h=Sd.bind(null,ke,!1,a.queue),a=wn(),u={state:t,dispatch:null,action:e,pending:null},a.queue=u,i=cy.bind(null,ke,u,h,i),u.dispatch=i,a.memoizedState=e,[t,i,!1]}function If(e){var t=Bt();return Uf(t,tt,e)}function Uf(e,t,i){if(t=fd(e,t,Hf)[0],e=ir(Vi)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var a=Nl(t)}catch(m){throw m===Ta?Ko:m}else a=t;t=Bt();var u=t.queue,h=u.dispatch;return i!==t.memoizedState&&(ke.flags|=2048,za(9,{destroy:void 0},dy.bind(null,u,i),null)),[a,h,e]}function dy(e,t){e.action=t}function qf(e){var t=Bt(),i=tt;if(i!==null)return Uf(t,i,e);Bt(),t=t.memoizedState,i=Bt();var a=i.queue.dispatch;return i.memoizedState=e,[t,a,!1]}function za(e,t,i,a){return e={tag:e,create:i,deps:a,inst:t,next:null},t=ke.updateQueue,t===null&&(t=tr(),ke.updateQueue=t),i=t.lastEffect,i===null?t.lastEffect=e.next=e:(a=i.next,i.next=e,e.next=a,t.lastEffect=e),e}function Pf(){return Bt().memoizedState}function sr(e,t,i,a){var u=wn();ke.flags|=e,u.memoizedState=za(1|t,{destroy:void 0},i,a===void 0?null:a)}function ar(e,t,i,a){var u=Bt();a=a===void 0?null:a;var h=u.memoizedState.inst;tt!==null&&a!==null&&od(a,tt.memoizedState.deps)?u.memoizedState=za(t,h,i,a):(ke.flags|=e,u.memoizedState=za(1|t,h,i,a))}function Gf(e,t){sr(8390656,8,e,t)}function vd(e,t){ar(2048,8,e,t)}function uy(e){ke.flags|=4;var t=ke.updateQueue;if(t===null)t=tr(),ke.updateQueue=t,t.events=[e];else{var i=t.events;i===null?t.events=[e]:i.push(e)}}function Yf(e){var t=Bt().memoizedState;return uy({ref:t,nextImpl:e}),function(){if((Qe&2)!==0)throw Error(l(440));return t.impl.apply(void 0,arguments)}}function Kf(e,t){return ar(4,2,e,t)}function Ff(e,t){return ar(4,4,e,t)}function Xf(e,t){if(typeof t=="function"){e=e();var i=t(e);return function(){typeof i=="function"?i():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Qf(e,t,i){i=i!=null?i.concat([e]):null,ar(4,4,Xf.bind(null,t,e),i)}function bd(){}function Zf(e,t){var i=Bt();t=t===void 0?null:t;var a=i.memoizedState;return t!==null&&od(t,a[1])?a[0]:(i.memoizedState=[e,t],e)}function Jf(e,t){var i=Bt();t=t===void 0?null:t;var a=i.memoizedState;if(t!==null&&od(t,a[1]))return a[0];if(a=e(),Ps){gt(!0);try{e()}finally{gt(!1)}}return i.memoizedState=[a,t],a}function yd(e,t,i){return i===void 0||(Hi&1073741824)!==0&&(He&261930)===0?e.memoizedState=t:(e.memoizedState=i,e=Wp(),ke.lanes|=e,fs|=e,i)}function Wf(e,t,i,a){return Mn(i,t)?i:Ra.current!==null?(e=yd(e,i,a),Mn(e,t)||(Pt=!0),e):(Hi&42)===0||(Hi&1073741824)!==0&&(He&261930)===0?(Pt=!0,e.memoizedState=i):(e=Wp(),ke.lanes|=e,fs|=e,t)}function ep(e,t,i,a,u){var h=Y.p;Y.p=h!==0&&8>h?h:8;var m=A.T,y={};A.T=y,Sd(e,!1,t,i);try{var C=u(),D=A.S;if(D!==null&&D(y,C),C!==null&&typeof C=="object"&&typeof C.then=="function"){var P=ly(C,a);jl(e,t,P,Vn(e))}else jl(e,t,a,Vn(e))}catch(X){jl(e,t,{then:function(){},status:"rejected",reason:X},Vn())}finally{Y.p=h,m!==null&&y.types!==null&&(m.types=y.types),A.T=m}}function hy(){}function xd(e,t,i,a){if(e.tag!==5)throw Error(l(476));var u=tp(e).queue;ep(e,u,t,le,i===null?hy:function(){return np(e),i(a)})}function tp(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:le,baseState:le,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Vi,lastRenderedState:le},next:null};var i={};return t.next={memoizedState:i,baseState:i,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Vi,lastRenderedState:i},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function np(e){var t=tp(e);t.next===null&&(t=e.alternate.memoizedState),jl(e,t.next.queue,{},Vn())}function _d(){return rn(Pl)}function ip(){return Bt().memoizedState}function sp(){return Bt().memoizedState}function fy(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var i=Vn();e=os(i);var a=rs(t,e,i);a!==null&&(Rn(a,t,i),Sl(a,t,i)),t={cache:Qc()},e.payload=t;return}t=t.return}}function py(e,t,i){var a=Vn();i={lane:a,revertLane:0,gesture:null,action:i,hasEagerState:!1,eagerState:null,next:null},lr(e)?lp(t,i):(i=Hc(e,t,i,a),i!==null&&(Rn(i,e,a),op(i,t,a)))}function ap(e,t,i){var a=Vn();jl(e,t,i,a)}function jl(e,t,i,a){var u={lane:a,revertLane:0,gesture:null,action:i,hasEagerState:!1,eagerState:null,next:null};if(lr(e))lp(t,u);else{var h=e.alternate;if(e.lanes===0&&(h===null||h.lanes===0)&&(h=t.lastRenderedReducer,h!==null))try{var m=t.lastRenderedState,y=h(m,i);if(u.hasEagerState=!0,u.eagerState=y,Mn(y,m))return Vo(e,t,u,0),rt===null&&Ho(),!1}catch{}if(i=Hc(e,t,u,a),i!==null)return Rn(i,e,a),op(i,t,a),!0}return!1}function Sd(e,t,i,a){if(a={lane:2,revertLane:eu(),gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},lr(e)){if(t)throw Error(l(479))}else t=Hc(e,i,a,2),t!==null&&Rn(t,e,2)}function lr(e){var t=e.alternate;return e===ke||t!==null&&t===ke}function lp(e,t){Da=Wo=!0;var i=e.pending;i===null?t.next=t:(t.next=i.next,i.next=t),e.pending=t}function op(e,t,i){if((i&4194048)!==0){var a=t.lanes;a&=e.pendingLanes,i|=a,t.lanes=i,Ue(e,i)}}var Al={readContext:rn,use:nr,useCallback:Tt,useContext:Tt,useEffect:Tt,useImperativeHandle:Tt,useLayoutEffect:Tt,useInsertionEffect:Tt,useMemo:Tt,useReducer:Tt,useRef:Tt,useState:Tt,useDebugValue:Tt,useDeferredValue:Tt,useTransition:Tt,useSyncExternalStore:Tt,useId:Tt,useHostTransitionStatus:Tt,useFormState:Tt,useActionState:Tt,useOptimistic:Tt,useMemoCache:Tt,useCacheRefresh:Tt};Al.useEffectEvent=Tt;var rp={readContext:rn,use:nr,useCallback:function(e,t){return wn().memoizedState=[e,t===void 0?null:t],e},useContext:rn,useEffect:Gf,useImperativeHandle:function(e,t,i){i=i!=null?i.concat([e]):null,sr(4194308,4,Xf.bind(null,t,e),i)},useLayoutEffect:function(e,t){return sr(4194308,4,e,t)},useInsertionEffect:function(e,t){sr(4,2,e,t)},useMemo:function(e,t){var i=wn();t=t===void 0?null:t;var a=e();if(Ps){gt(!0);try{e()}finally{gt(!1)}}return i.memoizedState=[a,t],a},useReducer:function(e,t,i){var a=wn();if(i!==void 0){var u=i(t);if(Ps){gt(!0);try{i(t)}finally{gt(!1)}}}else u=t;return a.memoizedState=a.baseState=u,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:u},a.queue=e,e=e.dispatch=py.bind(null,ke,e),[a.memoizedState,e]},useRef:function(e){var t=wn();return e={current:e},t.memoizedState=e},useState:function(e){e=md(e);var t=e.queue,i=ap.bind(null,ke,t);return t.dispatch=i,[e.memoizedState,i]},useDebugValue:bd,useDeferredValue:function(e,t){var i=wn();return yd(i,e,t)},useTransition:function(){var e=md(!1);return e=ep.bind(null,ke,e.queue,!0,!1),wn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,i){var a=ke,u=wn();if(qe){if(i===void 0)throw Error(l(407));i=i()}else{if(i=t(),rt===null)throw Error(l(349));(He&127)!==0||kf(a,t,i)}u.memoizedState=i;var h={value:i,getSnapshot:t};return u.queue=h,Gf(Of.bind(null,a,h,e),[e]),a.flags|=2048,za(9,{destroy:void 0},Tf.bind(null,a,h,i,t),null),i},useId:function(){var e=wn(),t=rt.identifierPrefix;if(qe){var i=Si,a=_i;i=(a&~(1<<32-Nt(a)-1)).toString(32)+i,t="_"+t+"R_"+i,i=er++,0<i&&(t+="H"+i.toString(32)),t+="_"}else i=oy++,t="_"+t+"r_"+i.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:_d,useFormState:Vf,useActionState:Vf,useOptimistic:function(e){var t=wn();t.memoizedState=t.baseState=e;var i={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=i,t=Sd.bind(null,ke,!0,i),i.dispatch=t,[e,t]},useMemoCache:hd,useCacheRefresh:function(){return wn().memoizedState=fy.bind(null,ke)},useEffectEvent:function(e){var t=wn(),i={impl:e};return t.memoizedState=i,function(){if((Qe&2)!==0)throw Error(l(440));return i.impl.apply(void 0,arguments)}}},wd={readContext:rn,use:nr,useCallback:Zf,useContext:rn,useEffect:vd,useImperativeHandle:Qf,useInsertionEffect:Kf,useLayoutEffect:Ff,useMemo:Jf,useReducer:ir,useRef:Pf,useState:function(){return ir(Vi)},useDebugValue:bd,useDeferredValue:function(e,t){var i=Bt();return Wf(i,tt.memoizedState,e,t)},useTransition:function(){var e=ir(Vi)[0],t=Bt().memoizedState;return[typeof e=="boolean"?e:Nl(e),t]},useSyncExternalStore:Af,useId:ip,useHostTransitionStatus:_d,useFormState:If,useActionState:If,useOptimistic:function(e,t){var i=Bt();return Mf(i,tt,e,t)},useMemoCache:hd,useCacheRefresh:sp};wd.useEffectEvent=Yf;var cp={readContext:rn,use:nr,useCallback:Zf,useContext:rn,useEffect:vd,useImperativeHandle:Qf,useInsertionEffect:Kf,useLayoutEffect:Ff,useMemo:Jf,useReducer:pd,useRef:Pf,useState:function(){return pd(Vi)},useDebugValue:bd,useDeferredValue:function(e,t){var i=Bt();return tt===null?yd(i,e,t):Wf(i,tt.memoizedState,e,t)},useTransition:function(){var e=pd(Vi)[0],t=Bt().memoizedState;return[typeof e=="boolean"?e:Nl(e),t]},useSyncExternalStore:Af,useId:ip,useHostTransitionStatus:_d,useFormState:qf,useActionState:qf,useOptimistic:function(e,t){var i=Bt();return tt!==null?Mf(i,tt,e,t):(i.baseState=e,[e,i.queue.dispatch])},useMemoCache:hd,useCacheRefresh:sp};cp.useEffectEvent=Yf;function Cd(e,t,i,a){t=e.memoizedState,i=i(a,t),i=i==null?t:v({},t,i),e.memoizedState=i,e.lanes===0&&(e.updateQueue.baseState=i)}var Ed={enqueueSetState:function(e,t,i){e=e._reactInternals;var a=Vn(),u=os(a);u.payload=t,i!=null&&(u.callback=i),t=rs(e,u,a),t!==null&&(Rn(t,e,a),Sl(t,e,a))},enqueueReplaceState:function(e,t,i){e=e._reactInternals;var a=Vn(),u=os(a);u.tag=1,u.payload=t,i!=null&&(u.callback=i),t=rs(e,u,a),t!==null&&(Rn(t,e,a),Sl(t,e,a))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var i=Vn(),a=os(i);a.tag=2,t!=null&&(a.callback=t),t=rs(e,a,i),t!==null&&(Rn(t,e,i),Sl(t,e,i))}};function dp(e,t,i,a,u,h,m){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(a,h,m):t.prototype&&t.prototype.isPureReactComponent?!pl(i,a)||!pl(u,h):!0}function up(e,t,i,a){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(i,a),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(i,a),t.state!==e&&Ed.enqueueReplaceState(t,t.state,null)}function Gs(e,t){var i=t;if("ref"in t){i={};for(var a in t)a!=="ref"&&(i[a]=t[a])}if(e=e.defaultProps){i===t&&(i=v({},i));for(var u in e)i[u]===void 0&&(i[u]=e[u])}return i}function hp(e){Bo(e)}function fp(e){console.error(e)}function pp(e){Bo(e)}function or(e,t){try{var i=e.onUncaughtError;i(t.value,{componentStack:t.stack})}catch(a){setTimeout(function(){throw a})}}function mp(e,t,i){try{var a=e.onCaughtError;a(i.value,{componentStack:i.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(u){setTimeout(function(){throw u})}}function Nd(e,t,i){return i=os(i),i.tag=3,i.payload={element:null},i.callback=function(){or(e,t)},i}function gp(e){return e=os(e),e.tag=3,e}function vp(e,t,i,a){var u=i.type.getDerivedStateFromError;if(typeof u=="function"){var h=a.value;e.payload=function(){return u(h)},e.callback=function(){mp(t,i,a)}}var m=i.stateNode;m!==null&&typeof m.componentDidCatch=="function"&&(e.callback=function(){mp(t,i,a),typeof u!="function"&&(ps===null?ps=new Set([this]):ps.add(this));var y=a.stack;this.componentDidCatch(a.value,{componentStack:y!==null?y:""})})}function my(e,t,i,a,u){if(i.flags|=32768,a!==null&&typeof a=="object"&&typeof a.then=="function"){if(t=i.alternate,t!==null&&ja(t,i,u,!0),i=$n.current,i!==null){switch(i.tag){case 31:case 13:return ei===null?yr():i.alternate===null&&Ot===0&&(Ot=3),i.flags&=-257,i.flags|=65536,i.lanes=u,a===Fo?i.flags|=16384:(t=i.updateQueue,t===null?i.updateQueue=new Set([a]):t.add(a),Zd(e,a,u)),!1;case 22:return i.flags|=65536,a===Fo?i.flags|=16384:(t=i.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([a])},i.updateQueue=t):(i=t.retryQueue,i===null?t.retryQueue=new Set([a]):i.add(a)),Zd(e,a,u)),!1}throw Error(l(435,i.tag))}return Zd(e,a,u),yr(),!1}if(qe)return t=$n.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=u,a!==Gc&&(e=Error(l(422),{cause:a}),vl(Qn(e,i)))):(a!==Gc&&(t=Error(l(423),{cause:a}),vl(Qn(t,i))),e=e.current.alternate,e.flags|=65536,u&=-u,e.lanes|=u,a=Qn(a,i),u=Nd(e.stateNode,a,u),nd(e,u),Ot!==4&&(Ot=2)),!1;var h=Error(l(520),{cause:a});if(h=Qn(h,i),$l===null?$l=[h]:$l.push(h),Ot!==4&&(Ot=2),t===null)return!0;a=Qn(a,i),i=t;do{switch(i.tag){case 3:return i.flags|=65536,e=u&-u,i.lanes|=e,e=Nd(i.stateNode,a,e),nd(i,e),!1;case 1:if(t=i.type,h=i.stateNode,(i.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||h!==null&&typeof h.componentDidCatch=="function"&&(ps===null||!ps.has(h))))return i.flags|=65536,u&=-u,i.lanes|=u,u=gp(u),vp(u,e,i,a),nd(i,u),!1}i=i.return}while(i!==null);return!1}var jd=Error(l(461)),Pt=!1;function cn(e,t,i,a){t.child=e===null?_f(t,null,i,a):qs(t,e.child,i,a)}function bp(e,t,i,a,u){i=i.render;var h=t.ref;if("ref"in a){var m={};for(var y in a)y!=="ref"&&(m[y]=a[y])}else m=a;return Hs(t),a=rd(e,t,i,m,h,u),y=cd(),e!==null&&!Pt?(dd(e,t,u),Ii(e,t,u)):(qe&&y&&qc(t),t.flags|=1,cn(e,t,a,u),t.child)}function yp(e,t,i,a,u){if(e===null){var h=i.type;return typeof h=="function"&&!Vc(h)&&h.defaultProps===void 0&&i.compare===null?(t.tag=15,t.type=h,xp(e,t,h,a,u)):(e=Uo(i.type,null,a,t,t.mode,u),e.ref=t.ref,e.return=t,t.child=e)}if(h=e.child,!zd(e,u)){var m=h.memoizedProps;if(i=i.compare,i=i!==null?i:pl,i(m,a)&&e.ref===t.ref)return Ii(e,t,u)}return t.flags|=1,e=zi(h,a),e.ref=t.ref,e.return=t,t.child=e}function xp(e,t,i,a,u){if(e!==null){var h=e.memoizedProps;if(pl(h,a)&&e.ref===t.ref)if(Pt=!1,t.pendingProps=a=h,zd(e,u))(e.flags&131072)!==0&&(Pt=!0);else return t.lanes=e.lanes,Ii(e,t,u)}return Ad(e,t,i,a,u)}function _p(e,t,i,a){var u=a.children,h=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),a.mode==="hidden"){if((t.flags&128)!==0){if(h=h!==null?h.baseLanes|i:i,e!==null){for(a=t.child=e.child,u=0;a!==null;)u=u|a.lanes|a.childLanes,a=a.sibling;a=u&~h}else a=0,t.child=null;return Sp(e,t,h,i,a)}if((i&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&Yo(t,h!==null?h.cachePool:null),h!==null?Cf(t,h):sd(),Ef(t);else return a=t.lanes=536870912,Sp(e,t,h!==null?h.baseLanes|i:i,i,a)}else h!==null?(Yo(t,h.cachePool),Cf(t,h),ds(),t.memoizedState=null):(e!==null&&Yo(t,null),sd(),ds());return cn(e,t,u,i),t.child}function kl(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function Sp(e,t,i,a,u){var h=Jc();return h=h===null?null:{parent:Ut._currentValue,pool:h},t.memoizedState={baseLanes:i,cachePool:h},e!==null&&Yo(t,null),sd(),Ef(t),e!==null&&ja(e,t,a,!0),t.childLanes=u,null}function rr(e,t){return t=dr({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function wp(e,t,i){return qs(t,e.child,null,i),e=rr(t,t.pendingProps),e.flags|=2,Ln(t),t.memoizedState=null,e}function gy(e,t,i){var a=t.pendingProps,u=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(qe){if(a.mode==="hidden")return e=rr(t,a),t.lanes=536870912,kl(null,e);if(ld(t),(e=dt)?(e=zm(e,Wn),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:ns!==null?{id:_i,overflow:Si}:null,retryLane:536870912,hydrationErrors:null},i=lf(e),i.return=t,t.child=i,on=t,dt=null)):e=null,e===null)throw ss(t);return t.lanes=536870912,null}return rr(t,a)}var h=e.memoizedState;if(h!==null){var m=h.dehydrated;if(ld(t),u)if(t.flags&256)t.flags&=-257,t=wp(e,t,i);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(l(558));else if(Pt||ja(e,t,i,!1),u=(i&e.childLanes)!==0,Pt||u){if(a=rt,a!==null&&(m=Ze(a,i),m!==0&&m!==h.retryLane))throw h.retryLane=m,zs(e,m),Rn(a,e,m),jd;yr(),t=wp(e,t,i)}else e=h.treeContext,dt=ti(m.nextSibling),on=t,qe=!0,is=null,Wn=!1,e!==null&&cf(t,e),t=rr(t,a),t.flags|=4096;return t}return e=zi(e.child,{mode:a.mode,children:a.children}),e.ref=t.ref,t.child=e,e.return=t,e}function cr(e,t){var i=t.ref;if(i===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof i!="function"&&typeof i!="object")throw Error(l(284));(e===null||e.ref!==i)&&(t.flags|=4194816)}}function Ad(e,t,i,a,u){return Hs(t),i=rd(e,t,i,a,void 0,u),a=cd(),e!==null&&!Pt?(dd(e,t,u),Ii(e,t,u)):(qe&&a&&qc(t),t.flags|=1,cn(e,t,i,u),t.child)}function Cp(e,t,i,a,u,h){return Hs(t),t.updateQueue=null,i=jf(t,a,i,u),Nf(e),a=cd(),e!==null&&!Pt?(dd(e,t,h),Ii(e,t,h)):(qe&&a&&qc(t),t.flags|=1,cn(e,t,i,h),t.child)}function Ep(e,t,i,a,u){if(Hs(t),t.stateNode===null){var h=wa,m=i.contextType;typeof m=="object"&&m!==null&&(h=rn(m)),h=new i(a,h),t.memoizedState=h.state!==null&&h.state!==void 0?h.state:null,h.updater=Ed,t.stateNode=h,h._reactInternals=t,h=t.stateNode,h.props=a,h.state=t.memoizedState,h.refs={},ed(t),m=i.contextType,h.context=typeof m=="object"&&m!==null?rn(m):wa,h.state=t.memoizedState,m=i.getDerivedStateFromProps,typeof m=="function"&&(Cd(t,i,m,a),h.state=t.memoizedState),typeof i.getDerivedStateFromProps=="function"||typeof h.getSnapshotBeforeUpdate=="function"||typeof h.UNSAFE_componentWillMount!="function"&&typeof h.componentWillMount!="function"||(m=h.state,typeof h.componentWillMount=="function"&&h.componentWillMount(),typeof h.UNSAFE_componentWillMount=="function"&&h.UNSAFE_componentWillMount(),m!==h.state&&Ed.enqueueReplaceState(h,h.state,null),Cl(t,a,h,u),wl(),h.state=t.memoizedState),typeof h.componentDidMount=="function"&&(t.flags|=4194308),a=!0}else if(e===null){h=t.stateNode;var y=t.memoizedProps,C=Gs(i,y);h.props=C;var D=h.context,P=i.contextType;m=wa,typeof P=="object"&&P!==null&&(m=rn(P));var X=i.getDerivedStateFromProps;P=typeof X=="function"||typeof h.getSnapshotBeforeUpdate=="function",y=t.pendingProps!==y,P||typeof h.UNSAFE_componentWillReceiveProps!="function"&&typeof h.componentWillReceiveProps!="function"||(y||D!==m)&&up(t,h,a,m),ls=!1;var M=t.memoizedState;h.state=M,Cl(t,a,h,u),wl(),D=t.memoizedState,y||M!==D||ls?(typeof X=="function"&&(Cd(t,i,X,a),D=t.memoizedState),(C=ls||dp(t,i,C,a,M,D,m))?(P||typeof h.UNSAFE_componentWillMount!="function"&&typeof h.componentWillMount!="function"||(typeof h.componentWillMount=="function"&&h.componentWillMount(),typeof h.UNSAFE_componentWillMount=="function"&&h.UNSAFE_componentWillMount()),typeof h.componentDidMount=="function"&&(t.flags|=4194308)):(typeof h.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=a,t.memoizedState=D),h.props=a,h.state=D,h.context=m,a=C):(typeof h.componentDidMount=="function"&&(t.flags|=4194308),a=!1)}else{h=t.stateNode,td(e,t),m=t.memoizedProps,P=Gs(i,m),h.props=P,X=t.pendingProps,M=h.context,D=i.contextType,C=wa,typeof D=="object"&&D!==null&&(C=rn(D)),y=i.getDerivedStateFromProps,(D=typeof y=="function"||typeof h.getSnapshotBeforeUpdate=="function")||typeof h.UNSAFE_componentWillReceiveProps!="function"&&typeof h.componentWillReceiveProps!="function"||(m!==X||M!==C)&&up(t,h,a,C),ls=!1,M=t.memoizedState,h.state=M,Cl(t,a,h,u),wl();var B=t.memoizedState;m!==X||M!==B||ls||e!==null&&e.dependencies!==null&&Po(e.dependencies)?(typeof y=="function"&&(Cd(t,i,y,a),B=t.memoizedState),(P=ls||dp(t,i,P,a,M,B,C)||e!==null&&e.dependencies!==null&&Po(e.dependencies))?(D||typeof h.UNSAFE_componentWillUpdate!="function"&&typeof h.componentWillUpdate!="function"||(typeof h.componentWillUpdate=="function"&&h.componentWillUpdate(a,B,C),typeof h.UNSAFE_componentWillUpdate=="function"&&h.UNSAFE_componentWillUpdate(a,B,C)),typeof h.componentDidUpdate=="function"&&(t.flags|=4),typeof h.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof h.componentDidUpdate!="function"||m===e.memoizedProps&&M===e.memoizedState||(t.flags|=4),typeof h.getSnapshotBeforeUpdate!="function"||m===e.memoizedProps&&M===e.memoizedState||(t.flags|=1024),t.memoizedProps=a,t.memoizedState=B),h.props=a,h.state=B,h.context=C,a=P):(typeof h.componentDidUpdate!="function"||m===e.memoizedProps&&M===e.memoizedState||(t.flags|=4),typeof h.getSnapshotBeforeUpdate!="function"||m===e.memoizedProps&&M===e.memoizedState||(t.flags|=1024),a=!1)}return h=a,cr(e,t),a=(t.flags&128)!==0,h||a?(h=t.stateNode,i=a&&typeof i.getDerivedStateFromError!="function"?null:h.render(),t.flags|=1,e!==null&&a?(t.child=qs(t,e.child,null,u),t.child=qs(t,null,i,u)):cn(e,t,i,u),t.memoizedState=h.state,e=t.child):e=Ii(e,t,u),e}function Np(e,t,i,a){return Ls(),t.flags|=256,cn(e,t,i,a),t.child}var kd={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Td(e){return{baseLanes:e,cachePool:mf()}}function Od(e,t,i){return e=e!==null?e.childLanes&~i:0,t&&(e|=Hn),e}function jp(e,t,i){var a=t.pendingProps,u=!1,h=(t.flags&128)!==0,m;if((m=h)||(m=e!==null&&e.memoizedState===null?!1:(Lt.current&2)!==0),m&&(u=!0,t.flags&=-129),m=(t.flags&32)!==0,t.flags&=-33,e===null){if(qe){if(u?cs(t):ds(),(e=dt)?(e=zm(e,Wn),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:ns!==null?{id:_i,overflow:Si}:null,retryLane:536870912,hydrationErrors:null},i=lf(e),i.return=t,t.child=i,on=t,dt=null)):e=null,e===null)throw ss(t);return fu(e)?t.lanes=32:t.lanes=536870912,null}var y=a.children;return a=a.fallback,u?(ds(),u=t.mode,y=dr({mode:"hidden",children:y},u),a=$s(a,u,i,null),y.return=t,a.return=t,y.sibling=a,t.child=y,a=t.child,a.memoizedState=Td(i),a.childLanes=Od(e,m,i),t.memoizedState=kd,kl(null,a)):(cs(t),Rd(t,y))}var C=e.memoizedState;if(C!==null&&(y=C.dehydrated,y!==null)){if(h)t.flags&256?(cs(t),t.flags&=-257,t=Dd(e,t,i)):t.memoizedState!==null?(ds(),t.child=e.child,t.flags|=128,t=null):(ds(),y=a.fallback,u=t.mode,a=dr({mode:"visible",children:a.children},u),y=$s(y,u,i,null),y.flags|=2,a.return=t,y.return=t,a.sibling=y,t.child=a,qs(t,e.child,null,i),a=t.child,a.memoizedState=Td(i),a.childLanes=Od(e,m,i),t.memoizedState=kd,t=kl(null,a));else if(cs(t),fu(y)){if(m=y.nextSibling&&y.nextSibling.dataset,m)var D=m.dgst;m=D,a=Error(l(419)),a.stack="",a.digest=m,vl({value:a,source:null,stack:null}),t=Dd(e,t,i)}else if(Pt||ja(e,t,i,!1),m=(i&e.childLanes)!==0,Pt||m){if(m=rt,m!==null&&(a=Ze(m,i),a!==0&&a!==C.retryLane))throw C.retryLane=a,zs(e,a),Rn(m,e,a),jd;hu(y)||yr(),t=Dd(e,t,i)}else hu(y)?(t.flags|=192,t.child=e.child,t=null):(e=C.treeContext,dt=ti(y.nextSibling),on=t,qe=!0,is=null,Wn=!1,e!==null&&cf(t,e),t=Rd(t,a.children),t.flags|=4096);return t}return u?(ds(),y=a.fallback,u=t.mode,C=e.child,D=C.sibling,a=zi(C,{mode:"hidden",children:a.children}),a.subtreeFlags=C.subtreeFlags&65011712,D!==null?y=zi(D,y):(y=$s(y,u,i,null),y.flags|=2),y.return=t,a.return=t,a.sibling=y,t.child=a,kl(null,a),a=t.child,y=e.child.memoizedState,y===null?y=Td(i):(u=y.cachePool,u!==null?(C=Ut._currentValue,u=u.parent!==C?{parent:C,pool:C}:u):u=mf(),y={baseLanes:y.baseLanes|i,cachePool:u}),a.memoizedState=y,a.childLanes=Od(e,m,i),t.memoizedState=kd,kl(e.child,a)):(cs(t),i=e.child,e=i.sibling,i=zi(i,{mode:"visible",children:a.children}),i.return=t,i.sibling=null,e!==null&&(m=t.deletions,m===null?(t.deletions=[e],t.flags|=16):m.push(e)),t.child=i,t.memoizedState=null,i)}function Rd(e,t){return t=dr({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function dr(e,t){return e=zn(22,e,null,t),e.lanes=0,e}function Dd(e,t,i){return qs(t,e.child,null,i),e=Rd(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Ap(e,t,i){e.lanes|=t;var a=e.alternate;a!==null&&(a.lanes|=t),Fc(e.return,t,i)}function Md(e,t,i,a,u,h){var m=e.memoizedState;m===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:a,tail:i,tailMode:u,treeForkCount:h}:(m.isBackwards=t,m.rendering=null,m.renderingStartTime=0,m.last=a,m.tail=i,m.tailMode=u,m.treeForkCount=h)}function kp(e,t,i){var a=t.pendingProps,u=a.revealOrder,h=a.tail;a=a.children;var m=Lt.current,y=(m&2)!==0;if(y?(m=m&1|2,t.flags|=128):m&=1,U(Lt,m),cn(e,t,a,i),a=qe?gl:0,!y&&e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Ap(e,i,t);else if(e.tag===19)Ap(e,i,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(u){case"forwards":for(i=t.child,u=null;i!==null;)e=i.alternate,e!==null&&Jo(e)===null&&(u=i),i=i.sibling;i=u,i===null?(u=t.child,t.child=null):(u=i.sibling,i.sibling=null),Md(t,!1,u,i,h,a);break;case"backwards":case"unstable_legacy-backwards":for(i=null,u=t.child,t.child=null;u!==null;){if(e=u.alternate,e!==null&&Jo(e)===null){t.child=u;break}e=u.sibling,u.sibling=i,i=u,u=e}Md(t,!0,i,null,h,a);break;case"together":Md(t,!1,null,null,void 0,a);break;default:t.memoizedState=null}return t.child}function Ii(e,t,i){if(e!==null&&(t.dependencies=e.dependencies),fs|=t.lanes,(i&t.childLanes)===0)if(e!==null){if(ja(e,t,i,!1),(i&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(l(153));if(t.child!==null){for(e=t.child,i=zi(e,e.pendingProps),t.child=i,i.return=t;e.sibling!==null;)e=e.sibling,i=i.sibling=zi(e,e.pendingProps),i.return=t;i.sibling=null}return t.child}function zd(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&Po(e)))}function vy(e,t,i){switch(t.tag){case 3:ye(t,t.stateNode.containerInfo),as(t,Ut,e.memoizedState.cache),Ls();break;case 27:case 5:zt(t);break;case 4:ye(t,t.stateNode.containerInfo);break;case 10:as(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,ld(t),null;break;case 13:var a=t.memoizedState;if(a!==null)return a.dehydrated!==null?(cs(t),t.flags|=128,null):(i&t.child.childLanes)!==0?jp(e,t,i):(cs(t),e=Ii(e,t,i),e!==null?e.sibling:null);cs(t);break;case 19:var u=(e.flags&128)!==0;if(a=(i&t.childLanes)!==0,a||(ja(e,t,i,!1),a=(i&t.childLanes)!==0),u){if(a)return kp(e,t,i);t.flags|=128}if(u=t.memoizedState,u!==null&&(u.rendering=null,u.tail=null,u.lastEffect=null),U(Lt,Lt.current),a)break;return null;case 22:return t.lanes=0,_p(e,t,i,t.pendingProps);case 24:as(t,Ut,e.memoizedState.cache)}return Ii(e,t,i)}function Tp(e,t,i){if(e!==null)if(e.memoizedProps!==t.pendingProps)Pt=!0;else{if(!zd(e,i)&&(t.flags&128)===0)return Pt=!1,vy(e,t,i);Pt=(e.flags&131072)!==0}else Pt=!1,qe&&(t.flags&1048576)!==0&&rf(t,gl,t.index);switch(t.lanes=0,t.tag){case 16:e:{var a=t.pendingProps;if(e=Is(t.elementType),t.type=e,typeof e=="function")Vc(e)?(a=Gs(e,a),t.tag=1,t=Ep(null,t,e,a,i)):(t.tag=0,t=Ad(null,t,e,a,i));else{if(e!=null){var u=e.$$typeof;if(u===de){t.tag=11,t=bp(null,t,e,a,i);break e}else if(u===S){t.tag=14,t=yp(null,t,e,a,i);break e}}throw t=pe(e)||e,Error(l(306,t,""))}}return t;case 0:return Ad(e,t,t.type,t.pendingProps,i);case 1:return a=t.type,u=Gs(a,t.pendingProps),Ep(e,t,a,u,i);case 3:e:{if(ye(t,t.stateNode.containerInfo),e===null)throw Error(l(387));a=t.pendingProps;var h=t.memoizedState;u=h.element,td(e,t),Cl(t,a,null,i);var m=t.memoizedState;if(a=m.cache,as(t,Ut,a),a!==h.cache&&Xc(t,[Ut],i,!0),wl(),a=m.element,h.isDehydrated)if(h={element:a,isDehydrated:!1,cache:m.cache},t.updateQueue.baseState=h,t.memoizedState=h,t.flags&256){t=Np(e,t,a,i);break e}else if(a!==u){u=Qn(Error(l(424)),t),vl(u),t=Np(e,t,a,i);break e}else for(e=t.stateNode.containerInfo,e.nodeType===9?e=e.body:e=e.nodeName==="HTML"?e.ownerDocument.body:e,dt=ti(e.firstChild),on=t,qe=!0,is=null,Wn=!0,i=_f(t,null,a,i),t.child=i;i;)i.flags=i.flags&-3|4096,i=i.sibling;else{if(Ls(),a===u){t=Ii(e,t,i);break e}cn(e,t,a,i)}t=t.child}return t;case 26:return cr(e,t),e===null?(i=Im(t.type,null,t.pendingProps,null))?t.memoizedState=i:qe||(i=t.type,e=t.pendingProps,a=Nr(me.current).createElement(i),a[L]=t,a[he]=e,dn(a,i,e),Qt(a),t.stateNode=a):t.memoizedState=Im(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return zt(t),e===null&&qe&&(a=t.stateNode=Bm(t.type,t.pendingProps,me.current),on=t,Wn=!0,u=dt,bs(t.type)?(pu=u,dt=ti(a.firstChild)):dt=u),cn(e,t,t.pendingProps.children,i),cr(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&qe&&((u=a=dt)&&(a=Ky(a,t.type,t.pendingProps,Wn),a!==null?(t.stateNode=a,on=t,dt=ti(a.firstChild),Wn=!1,u=!0):u=!1),u||ss(t)),zt(t),u=t.type,h=t.pendingProps,m=e!==null?e.memoizedProps:null,a=h.children,cu(u,h)?a=null:m!==null&&cu(u,m)&&(t.flags|=32),t.memoizedState!==null&&(u=rd(e,t,ry,null,null,i),Pl._currentValue=u),cr(e,t),cn(e,t,a,i),t.child;case 6:return e===null&&qe&&((e=i=dt)&&(i=Fy(i,t.pendingProps,Wn),i!==null?(t.stateNode=i,on=t,dt=null,e=!0):e=!1),e||ss(t)),null;case 13:return jp(e,t,i);case 4:return ye(t,t.stateNode.containerInfo),a=t.pendingProps,e===null?t.child=qs(t,null,a,i):cn(e,t,a,i),t.child;case 11:return bp(e,t,t.type,t.pendingProps,i);case 7:return cn(e,t,t.pendingProps,i),t.child;case 8:return cn(e,t,t.pendingProps.children,i),t.child;case 12:return cn(e,t,t.pendingProps.children,i),t.child;case 10:return a=t.pendingProps,as(t,t.type,a.value),cn(e,t,a.children,i),t.child;case 9:return u=t.type._context,a=t.pendingProps.children,Hs(t),u=rn(u),a=a(u),t.flags|=1,cn(e,t,a,i),t.child;case 14:return yp(e,t,t.type,t.pendingProps,i);case 15:return xp(e,t,t.type,t.pendingProps,i);case 19:return kp(e,t,i);case 31:return gy(e,t,i);case 22:return _p(e,t,i,t.pendingProps);case 24:return Hs(t),a=rn(Ut),e===null?(u=Jc(),u===null&&(u=rt,h=Qc(),u.pooledCache=h,h.refCount++,h!==null&&(u.pooledCacheLanes|=i),u=h),t.memoizedState={parent:a,cache:u},ed(t),as(t,Ut,u)):((e.lanes&i)!==0&&(td(e,t),Cl(t,null,null,i),wl()),u=e.memoizedState,h=t.memoizedState,u.parent!==a?(u={parent:a,cache:a},t.memoizedState=u,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=u),as(t,Ut,a)):(a=h.cache,as(t,Ut,a),a!==u.cache&&Xc(t,[Ut],i,!0))),cn(e,t,t.pendingProps.children,i),t.child;case 29:throw t.pendingProps}throw Error(l(156,t.tag))}function Ui(e){e.flags|=4}function $d(e,t,i,a,u){if((t=(e.mode&32)!==0)&&(t=!1),t){if(e.flags|=16777216,(u&335544128)===u)if(e.stateNode.complete)e.flags|=8192;else if(im())e.flags|=8192;else throw Us=Fo,Wc}else e.flags&=-16777217}function Op(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!Ym(t))if(im())e.flags|=8192;else throw Us=Fo,Wc}function ur(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?It():536870912,e.lanes|=t,Ha|=t)}function Tl(e,t){if(!qe)switch(e.tailMode){case"hidden":t=e.tail;for(var i=null;t!==null;)t.alternate!==null&&(i=t),t=t.sibling;i===null?e.tail=null:i.sibling=null;break;case"collapsed":i=e.tail;for(var a=null;i!==null;)i.alternate!==null&&(a=i),i=i.sibling;a===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:a.sibling=null}}function ut(e){var t=e.alternate!==null&&e.alternate.child===e.child,i=0,a=0;if(t)for(var u=e.child;u!==null;)i|=u.lanes|u.childLanes,a|=u.subtreeFlags&65011712,a|=u.flags&65011712,u.return=e,u=u.sibling;else for(u=e.child;u!==null;)i|=u.lanes|u.childLanes,a|=u.subtreeFlags,a|=u.flags,u.return=e,u=u.sibling;return e.subtreeFlags|=a,e.childLanes=i,t}function by(e,t,i){var a=t.pendingProps;switch(Pc(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return ut(t),null;case 1:return ut(t),null;case 3:return i=t.stateNode,a=null,e!==null&&(a=e.memoizedState.cache),t.memoizedState.cache!==a&&(t.flags|=2048),Bi(Ut),Ae(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(e===null||e.child===null)&&(Na(t)?Ui(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,Yc())),ut(t),null;case 26:var u=t.type,h=t.memoizedState;return e===null?(Ui(t),h!==null?(ut(t),Op(t,h)):(ut(t),$d(t,u,null,a,i))):h?h!==e.memoizedState?(Ui(t),ut(t),Op(t,h)):(ut(t),t.flags&=-16777217):(e=e.memoizedProps,e!==a&&Ui(t),ut(t),$d(t,u,e,a,i)),null;case 27:if(Ft(t),i=me.current,u=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==a&&Ui(t);else{if(!a){if(t.stateNode===null)throw Error(l(166));return ut(t),null}e=Z.current,Na(t)?df(t):(e=Bm(u,a,i),t.stateNode=e,Ui(t))}return ut(t),null;case 5:if(Ft(t),u=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==a&&Ui(t);else{if(!a){if(t.stateNode===null)throw Error(l(166));return ut(t),null}if(h=Z.current,Na(t))df(t);else{var m=Nr(me.current);switch(h){case 1:h=m.createElementNS("http://www.w3.org/2000/svg",u);break;case 2:h=m.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;default:switch(u){case"svg":h=m.createElementNS("http://www.w3.org/2000/svg",u);break;case"math":h=m.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;case"script":h=m.createElement("div"),h.innerHTML="<script><\/script>",h=h.removeChild(h.firstChild);break;case"select":h=typeof a.is=="string"?m.createElement("select",{is:a.is}):m.createElement("select"),a.multiple?h.multiple=!0:a.size&&(h.size=a.size);break;default:h=typeof a.is=="string"?m.createElement(u,{is:a.is}):m.createElement(u)}}h[L]=t,h[he]=a;e:for(m=t.child;m!==null;){if(m.tag===5||m.tag===6)h.appendChild(m.stateNode);else if(m.tag!==4&&m.tag!==27&&m.child!==null){m.child.return=m,m=m.child;continue}if(m===t)break e;for(;m.sibling===null;){if(m.return===null||m.return===t)break e;m=m.return}m.sibling.return=m.return,m=m.sibling}t.stateNode=h;e:switch(dn(h,u,a),u){case"button":case"input":case"select":case"textarea":a=!!a.autoFocus;break e;case"img":a=!0;break e;default:a=!1}a&&Ui(t)}}return ut(t),$d(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,i),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==a&&Ui(t);else{if(typeof a!="string"&&t.stateNode===null)throw Error(l(166));if(e=me.current,Na(t)){if(e=t.stateNode,i=t.memoizedProps,a=null,u=on,u!==null)switch(u.tag){case 27:case 5:a=u.memoizedProps}e[L]=t,e=!!(e.nodeValue===i||a!==null&&a.suppressHydrationWarning===!0||jm(e.nodeValue,i)),e||ss(t,!0)}else e=Nr(e).createTextNode(a),e[L]=t,t.stateNode=e}return ut(t),null;case 31:if(i=t.memoizedState,e===null||e.memoizedState!==null){if(a=Na(t),i!==null){if(e===null){if(!a)throw Error(l(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(l(557));e[L]=t}else Ls(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;ut(t),e=!1}else i=Yc(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=i),e=!0;if(!e)return t.flags&256?(Ln(t),t):(Ln(t),null);if((t.flags&128)!==0)throw Error(l(558))}return ut(t),null;case 13:if(a=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(u=Na(t),a!==null&&a.dehydrated!==null){if(e===null){if(!u)throw Error(l(318));if(u=t.memoizedState,u=u!==null?u.dehydrated:null,!u)throw Error(l(317));u[L]=t}else Ls(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;ut(t),u=!1}else u=Yc(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=u),u=!0;if(!u)return t.flags&256?(Ln(t),t):(Ln(t),null)}return Ln(t),(t.flags&128)!==0?(t.lanes=i,t):(i=a!==null,e=e!==null&&e.memoizedState!==null,i&&(a=t.child,u=null,a.alternate!==null&&a.alternate.memoizedState!==null&&a.alternate.memoizedState.cachePool!==null&&(u=a.alternate.memoizedState.cachePool.pool),h=null,a.memoizedState!==null&&a.memoizedState.cachePool!==null&&(h=a.memoizedState.cachePool.pool),h!==u&&(a.flags|=2048)),i!==e&&i&&(t.child.flags|=8192),ur(t,t.updateQueue),ut(t),null);case 4:return Ae(),e===null&&su(t.stateNode.containerInfo),ut(t),null;case 10:return Bi(t.type),ut(t),null;case 19:if(H(Lt),a=t.memoizedState,a===null)return ut(t),null;if(u=(t.flags&128)!==0,h=a.rendering,h===null)if(u)Tl(a,!1);else{if(Ot!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(h=Jo(e),h!==null){for(t.flags|=128,Tl(a,!1),e=h.updateQueue,t.updateQueue=e,ur(t,e),t.subtreeFlags=0,e=i,i=t.child;i!==null;)af(i,e),i=i.sibling;return U(Lt,Lt.current&1|2),qe&&$i(t,a.treeForkCount),t.child}e=e.sibling}a.tail!==null&&Oe()>gr&&(t.flags|=128,u=!0,Tl(a,!1),t.lanes=4194304)}else{if(!u)if(e=Jo(h),e!==null){if(t.flags|=128,u=!0,e=e.updateQueue,t.updateQueue=e,ur(t,e),Tl(a,!0),a.tail===null&&a.tailMode==="hidden"&&!h.alternate&&!qe)return ut(t),null}else 2*Oe()-a.renderingStartTime>gr&&i!==536870912&&(t.flags|=128,u=!0,Tl(a,!1),t.lanes=4194304);a.isBackwards?(h.sibling=t.child,t.child=h):(e=a.last,e!==null?e.sibling=h:t.child=h,a.last=h)}return a.tail!==null?(e=a.tail,a.rendering=e,a.tail=e.sibling,a.renderingStartTime=Oe(),e.sibling=null,i=Lt.current,U(Lt,u?i&1|2:i&1),qe&&$i(t,a.treeForkCount),e):(ut(t),null);case 22:case 23:return Ln(t),ad(),a=t.memoizedState!==null,e!==null?e.memoizedState!==null!==a&&(t.flags|=8192):a&&(t.flags|=8192),a?(i&536870912)!==0&&(t.flags&128)===0&&(ut(t),t.subtreeFlags&6&&(t.flags|=8192)):ut(t),i=t.updateQueue,i!==null&&ur(t,i.retryQueue),i=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(i=e.memoizedState.cachePool.pool),a=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),a!==i&&(t.flags|=2048),e!==null&&H(Vs),null;case 24:return i=null,e!==null&&(i=e.memoizedState.cache),t.memoizedState.cache!==i&&(t.flags|=2048),Bi(Ut),ut(t),null;case 25:return null;case 30:return null}throw Error(l(156,t.tag))}function yy(e,t){switch(Pc(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Bi(Ut),Ae(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return Ft(t),null;case 31:if(t.memoizedState!==null){if(Ln(t),t.alternate===null)throw Error(l(340));Ls()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(Ln(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(l(340));Ls()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return H(Lt),null;case 4:return Ae(),null;case 10:return Bi(t.type),null;case 22:case 23:return Ln(t),ad(),e!==null&&H(Vs),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Bi(Ut),null;case 25:return null;default:return null}}function Rp(e,t){switch(Pc(t),t.tag){case 3:Bi(Ut),Ae();break;case 26:case 27:case 5:Ft(t);break;case 4:Ae();break;case 31:t.memoizedState!==null&&Ln(t);break;case 13:Ln(t);break;case 19:H(Lt);break;case 10:Bi(t.type);break;case 22:case 23:Ln(t),ad(),e!==null&&H(Vs);break;case 24:Bi(Ut)}}function Ol(e,t){try{var i=t.updateQueue,a=i!==null?i.lastEffect:null;if(a!==null){var u=a.next;i=u;do{if((i.tag&e)===e){a=void 0;var h=i.create,m=i.inst;a=h(),m.destroy=a}i=i.next}while(i!==u)}}catch(y){We(t,t.return,y)}}function us(e,t,i){try{var a=t.updateQueue,u=a!==null?a.lastEffect:null;if(u!==null){var h=u.next;a=h;do{if((a.tag&e)===e){var m=a.inst,y=m.destroy;if(y!==void 0){m.destroy=void 0,u=t;var C=i,D=y;try{D()}catch(P){We(u,C,P)}}}a=a.next}while(a!==h)}}catch(P){We(t,t.return,P)}}function Dp(e){var t=e.updateQueue;if(t!==null){var i=e.stateNode;try{wf(t,i)}catch(a){We(e,e.return,a)}}}function Mp(e,t,i){i.props=Gs(e.type,e.memoizedProps),i.state=e.memoizedState;try{i.componentWillUnmount()}catch(a){We(e,t,a)}}function Rl(e,t){try{var i=e.ref;if(i!==null){switch(e.tag){case 26:case 27:case 5:var a=e.stateNode;break;case 30:a=e.stateNode;break;default:a=e.stateNode}typeof i=="function"?e.refCleanup=i(a):i.current=a}}catch(u){We(e,t,u)}}function wi(e,t){var i=e.ref,a=e.refCleanup;if(i!==null)if(typeof a=="function")try{a()}catch(u){We(e,t,u)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof i=="function")try{i(null)}catch(u){We(e,t,u)}else i.current=null}function zp(e){var t=e.type,i=e.memoizedProps,a=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":i.autoFocus&&a.focus();break e;case"img":i.src?a.src=i.src:i.srcSet&&(a.srcset=i.srcSet)}}catch(u){We(e,e.return,u)}}function Ld(e,t,i){try{var a=e.stateNode;Iy(a,e.type,i,t),a[he]=t}catch(u){We(e,e.return,u)}}function $p(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&bs(e.type)||e.tag===4}function Bd(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||$p(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&bs(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Hd(e,t,i){var a=e.tag;if(a===5||a===6)e=e.stateNode,t?(i.nodeType===9?i.body:i.nodeName==="HTML"?i.ownerDocument.body:i).insertBefore(e,t):(t=i.nodeType===9?i.body:i.nodeName==="HTML"?i.ownerDocument.body:i,t.appendChild(e),i=i._reactRootContainer,i!=null||t.onclick!==null||(t.onclick=Di));else if(a!==4&&(a===27&&bs(e.type)&&(i=e.stateNode,t=null),e=e.child,e!==null))for(Hd(e,t,i),e=e.sibling;e!==null;)Hd(e,t,i),e=e.sibling}function hr(e,t,i){var a=e.tag;if(a===5||a===6)e=e.stateNode,t?i.insertBefore(e,t):i.appendChild(e);else if(a!==4&&(a===27&&bs(e.type)&&(i=e.stateNode),e=e.child,e!==null))for(hr(e,t,i),e=e.sibling;e!==null;)hr(e,t,i),e=e.sibling}function Lp(e){var t=e.stateNode,i=e.memoizedProps;try{for(var a=e.type,u=t.attributes;u.length;)t.removeAttributeNode(u[0]);dn(t,a,i),t[L]=e,t[he]=i}catch(h){We(e,e.return,h)}}var qi=!1,Gt=!1,Vd=!1,Bp=typeof WeakSet=="function"?WeakSet:Set,Zt=null;function xy(e,t){if(e=e.containerInfo,ou=Dr,e=Xh(e),Dc(e)){if("selectionStart"in e)var i={start:e.selectionStart,end:e.selectionEnd};else e:{i=(i=e.ownerDocument)&&i.defaultView||window;var a=i.getSelection&&i.getSelection();if(a&&a.rangeCount!==0){i=a.anchorNode;var u=a.anchorOffset,h=a.focusNode;a=a.focusOffset;try{i.nodeType,h.nodeType}catch{i=null;break e}var m=0,y=-1,C=-1,D=0,P=0,X=e,M=null;t:for(;;){for(var B;X!==i||u!==0&&X.nodeType!==3||(y=m+u),X!==h||a!==0&&X.nodeType!==3||(C=m+a),X.nodeType===3&&(m+=X.nodeValue.length),(B=X.firstChild)!==null;)M=X,X=B;for(;;){if(X===e)break t;if(M===i&&++D===u&&(y=m),M===h&&++P===a&&(C=m),(B=X.nextSibling)!==null)break;X=M,M=X.parentNode}X=B}i=y===-1||C===-1?null:{start:y,end:C}}else i=null}i=i||{start:0,end:0}}else i=null;for(ru={focusedElem:e,selectionRange:i},Dr=!1,Zt=t;Zt!==null;)if(t=Zt,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,Zt=e;else for(;Zt!==null;){switch(t=Zt,h=t.alternate,e=t.flags,t.tag){case 0:if((e&4)!==0&&(e=t.updateQueue,e=e!==null?e.events:null,e!==null))for(i=0;i<e.length;i++)u=e[i],u.ref.impl=u.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&h!==null){e=void 0,i=t,u=h.memoizedProps,h=h.memoizedState,a=i.stateNode;try{var fe=Gs(i.type,u);e=a.getSnapshotBeforeUpdate(fe,h),a.__reactInternalSnapshotBeforeUpdate=e}catch(Se){We(i,i.return,Se)}}break;case 3:if((e&1024)!==0){if(e=t.stateNode.containerInfo,i=e.nodeType,i===9)uu(e);else if(i===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":uu(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(l(163))}if(e=t.sibling,e!==null){e.return=t.return,Zt=e;break}Zt=t.return}}function Hp(e,t,i){var a=i.flags;switch(i.tag){case 0:case 11:case 15:Gi(e,i),a&4&&Ol(5,i);break;case 1:if(Gi(e,i),a&4)if(e=i.stateNode,t===null)try{e.componentDidMount()}catch(m){We(i,i.return,m)}else{var u=Gs(i.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(u,t,e.__reactInternalSnapshotBeforeUpdate)}catch(m){We(i,i.return,m)}}a&64&&Dp(i),a&512&&Rl(i,i.return);break;case 3:if(Gi(e,i),a&64&&(e=i.updateQueue,e!==null)){if(t=null,i.child!==null)switch(i.child.tag){case 27:case 5:t=i.child.stateNode;break;case 1:t=i.child.stateNode}try{wf(e,t)}catch(m){We(i,i.return,m)}}break;case 27:t===null&&a&4&&Lp(i);case 26:case 5:Gi(e,i),t===null&&a&4&&zp(i),a&512&&Rl(i,i.return);break;case 12:Gi(e,i);break;case 31:Gi(e,i),a&4&&Up(e,i);break;case 13:Gi(e,i),a&4&&qp(e,i),a&64&&(e=i.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(i=ky.bind(null,i),Xy(e,i))));break;case 22:if(a=i.memoizedState!==null||qi,!a){t=t!==null&&t.memoizedState!==null||Gt,u=qi;var h=Gt;qi=a,(Gt=t)&&!h?Yi(e,i,(i.subtreeFlags&8772)!==0):Gi(e,i),qi=u,Gt=h}break;case 30:break;default:Gi(e,i)}}function Vp(e){var t=e.alternate;t!==null&&(e.alternate=null,Vp(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&gc(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var vt=null,An=!1;function Pi(e,t,i){for(i=i.child;i!==null;)Ip(e,t,i),i=i.sibling}function Ip(e,t,i){if(St&&typeof St.onCommitFiberUnmount=="function")try{St.onCommitFiberUnmount(gn,i)}catch{}switch(i.tag){case 26:Gt||wi(i,t),Pi(e,t,i),i.memoizedState?i.memoizedState.count--:i.stateNode&&(i=i.stateNode,i.parentNode.removeChild(i));break;case 27:Gt||wi(i,t);var a=vt,u=An;bs(i.type)&&(vt=i.stateNode,An=!1),Pi(e,t,i),Il(i.stateNode),vt=a,An=u;break;case 5:Gt||wi(i,t);case 6:if(a=vt,u=An,vt=null,Pi(e,t,i),vt=a,An=u,vt!==null)if(An)try{(vt.nodeType===9?vt.body:vt.nodeName==="HTML"?vt.ownerDocument.body:vt).removeChild(i.stateNode)}catch(h){We(i,t,h)}else try{vt.removeChild(i.stateNode)}catch(h){We(i,t,h)}break;case 18:vt!==null&&(An?(e=vt,Dm(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,i.stateNode),Ka(e)):Dm(vt,i.stateNode));break;case 4:a=vt,u=An,vt=i.stateNode.containerInfo,An=!0,Pi(e,t,i),vt=a,An=u;break;case 0:case 11:case 14:case 15:us(2,i,t),Gt||us(4,i,t),Pi(e,t,i);break;case 1:Gt||(wi(i,t),a=i.stateNode,typeof a.componentWillUnmount=="function"&&Mp(i,t,a)),Pi(e,t,i);break;case 21:Pi(e,t,i);break;case 22:Gt=(a=Gt)||i.memoizedState!==null,Pi(e,t,i),Gt=a;break;default:Pi(e,t,i)}}function Up(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Ka(e)}catch(i){We(t,t.return,i)}}}function qp(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Ka(e)}catch(i){We(t,t.return,i)}}function _y(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new Bp),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new Bp),t;default:throw Error(l(435,e.tag))}}function fr(e,t){var i=_y(e);t.forEach(function(a){if(!i.has(a)){i.add(a);var u=Ty.bind(null,e,a);a.then(u,u)}})}function kn(e,t){var i=t.deletions;if(i!==null)for(var a=0;a<i.length;a++){var u=i[a],h=e,m=t,y=m;e:for(;y!==null;){switch(y.tag){case 27:if(bs(y.type)){vt=y.stateNode,An=!1;break e}break;case 5:vt=y.stateNode,An=!1;break e;case 3:case 4:vt=y.stateNode.containerInfo,An=!0;break e}y=y.return}if(vt===null)throw Error(l(160));Ip(h,m,u),vt=null,An=!1,h=u.alternate,h!==null&&(h.return=null),u.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)Pp(t,e),t=t.sibling}var fi=null;function Pp(e,t){var i=e.alternate,a=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:kn(t,e),Tn(e),a&4&&(us(3,e,e.return),Ol(3,e),us(5,e,e.return));break;case 1:kn(t,e),Tn(e),a&512&&(Gt||i===null||wi(i,i.return)),a&64&&qi&&(e=e.updateQueue,e!==null&&(a=e.callbacks,a!==null&&(i=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=i===null?a:i.concat(a))));break;case 26:var u=fi;if(kn(t,e),Tn(e),a&512&&(Gt||i===null||wi(i,i.return)),a&4){var h=i!==null?i.memoizedState:null;if(a=e.memoizedState,i===null)if(a===null)if(e.stateNode===null){e:{a=e.type,i=e.memoizedProps,u=u.ownerDocument||u;t:switch(a){case"title":h=u.getElementsByTagName("title")[0],(!h||h[al]||h[L]||h.namespaceURI==="http://www.w3.org/2000/svg"||h.hasAttribute("itemprop"))&&(h=u.createElement(a),u.head.insertBefore(h,u.querySelector("head > title"))),dn(h,a,i),h[L]=e,Qt(h),a=h;break e;case"link":var m=Pm("link","href",u).get(a+(i.href||""));if(m){for(var y=0;y<m.length;y++)if(h=m[y],h.getAttribute("href")===(i.href==null||i.href===""?null:i.href)&&h.getAttribute("rel")===(i.rel==null?null:i.rel)&&h.getAttribute("title")===(i.title==null?null:i.title)&&h.getAttribute("crossorigin")===(i.crossOrigin==null?null:i.crossOrigin)){m.splice(y,1);break t}}h=u.createElement(a),dn(h,a,i),u.head.appendChild(h);break;case"meta":if(m=Pm("meta","content",u).get(a+(i.content||""))){for(y=0;y<m.length;y++)if(h=m[y],h.getAttribute("content")===(i.content==null?null:""+i.content)&&h.getAttribute("name")===(i.name==null?null:i.name)&&h.getAttribute("property")===(i.property==null?null:i.property)&&h.getAttribute("http-equiv")===(i.httpEquiv==null?null:i.httpEquiv)&&h.getAttribute("charset")===(i.charSet==null?null:i.charSet)){m.splice(y,1);break t}}h=u.createElement(a),dn(h,a,i),u.head.appendChild(h);break;default:throw Error(l(468,a))}h[L]=e,Qt(h),a=h}e.stateNode=a}else Gm(u,e.type,e.stateNode);else e.stateNode=qm(u,a,e.memoizedProps);else h!==a?(h===null?i.stateNode!==null&&(i=i.stateNode,i.parentNode.removeChild(i)):h.count--,a===null?Gm(u,e.type,e.stateNode):qm(u,a,e.memoizedProps)):a===null&&e.stateNode!==null&&Ld(e,e.memoizedProps,i.memoizedProps)}break;case 27:kn(t,e),Tn(e),a&512&&(Gt||i===null||wi(i,i.return)),i!==null&&a&4&&Ld(e,e.memoizedProps,i.memoizedProps);break;case 5:if(kn(t,e),Tn(e),a&512&&(Gt||i===null||wi(i,i.return)),e.flags&32){u=e.stateNode;try{ga(u,"")}catch(fe){We(e,e.return,fe)}}a&4&&e.stateNode!=null&&(u=e.memoizedProps,Ld(e,u,i!==null?i.memoizedProps:u)),a&1024&&(Vd=!0);break;case 6:if(kn(t,e),Tn(e),a&4){if(e.stateNode===null)throw Error(l(162));a=e.memoizedProps,i=e.stateNode;try{i.nodeValue=a}catch(fe){We(e,e.return,fe)}}break;case 3:if(kr=null,u=fi,fi=jr(t.containerInfo),kn(t,e),fi=u,Tn(e),a&4&&i!==null&&i.memoizedState.isDehydrated)try{Ka(t.containerInfo)}catch(fe){We(e,e.return,fe)}Vd&&(Vd=!1,Gp(e));break;case 4:a=fi,fi=jr(e.stateNode.containerInfo),kn(t,e),Tn(e),fi=a;break;case 12:kn(t,e),Tn(e);break;case 31:kn(t,e),Tn(e),a&4&&(a=e.updateQueue,a!==null&&(e.updateQueue=null,fr(e,a)));break;case 13:kn(t,e),Tn(e),e.child.flags&8192&&e.memoizedState!==null!=(i!==null&&i.memoizedState!==null)&&(mr=Oe()),a&4&&(a=e.updateQueue,a!==null&&(e.updateQueue=null,fr(e,a)));break;case 22:u=e.memoizedState!==null;var C=i!==null&&i.memoizedState!==null,D=qi,P=Gt;if(qi=D||u,Gt=P||C,kn(t,e),Gt=P,qi=D,Tn(e),a&8192)e:for(t=e.stateNode,t._visibility=u?t._visibility&-2:t._visibility|1,u&&(i===null||C||qi||Gt||Ys(e)),i=null,t=e;;){if(t.tag===5||t.tag===26){if(i===null){C=i=t;try{if(h=C.stateNode,u)m=h.style,typeof m.setProperty=="function"?m.setProperty("display","none","important"):m.display="none";else{y=C.stateNode;var X=C.memoizedProps.style,M=X!=null&&X.hasOwnProperty("display")?X.display:null;y.style.display=M==null||typeof M=="boolean"?"":(""+M).trim()}}catch(fe){We(C,C.return,fe)}}}else if(t.tag===6){if(i===null){C=t;try{C.stateNode.nodeValue=u?"":C.memoizedProps}catch(fe){We(C,C.return,fe)}}}else if(t.tag===18){if(i===null){C=t;try{var B=C.stateNode;u?Mm(B,!0):Mm(C.stateNode,!1)}catch(fe){We(C,C.return,fe)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;i===t&&(i=null),t=t.return}i===t&&(i=null),t.sibling.return=t.return,t=t.sibling}a&4&&(a=e.updateQueue,a!==null&&(i=a.retryQueue,i!==null&&(a.retryQueue=null,fr(e,i))));break;case 19:kn(t,e),Tn(e),a&4&&(a=e.updateQueue,a!==null&&(e.updateQueue=null,fr(e,a)));break;case 30:break;case 21:break;default:kn(t,e),Tn(e)}}function Tn(e){var t=e.flags;if(t&2){try{for(var i,a=e.return;a!==null;){if($p(a)){i=a;break}a=a.return}if(i==null)throw Error(l(160));switch(i.tag){case 27:var u=i.stateNode,h=Bd(e);hr(e,h,u);break;case 5:var m=i.stateNode;i.flags&32&&(ga(m,""),i.flags&=-33);var y=Bd(e);hr(e,y,m);break;case 3:case 4:var C=i.stateNode.containerInfo,D=Bd(e);Hd(e,D,C);break;default:throw Error(l(161))}}catch(P){We(e,e.return,P)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Gp(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;Gp(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function Gi(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)Hp(e,t.alternate,t),t=t.sibling}function Ys(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:us(4,t,t.return),Ys(t);break;case 1:wi(t,t.return);var i=t.stateNode;typeof i.componentWillUnmount=="function"&&Mp(t,t.return,i),Ys(t);break;case 27:Il(t.stateNode);case 26:case 5:wi(t,t.return),Ys(t);break;case 22:t.memoizedState===null&&Ys(t);break;case 30:Ys(t);break;default:Ys(t)}e=e.sibling}}function Yi(e,t,i){for(i=i&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var a=t.alternate,u=e,h=t,m=h.flags;switch(h.tag){case 0:case 11:case 15:Yi(u,h,i),Ol(4,h);break;case 1:if(Yi(u,h,i),a=h,u=a.stateNode,typeof u.componentDidMount=="function")try{u.componentDidMount()}catch(D){We(a,a.return,D)}if(a=h,u=a.updateQueue,u!==null){var y=a.stateNode;try{var C=u.shared.hiddenCallbacks;if(C!==null)for(u.shared.hiddenCallbacks=null,u=0;u<C.length;u++)Sf(C[u],y)}catch(D){We(a,a.return,D)}}i&&m&64&&Dp(h),Rl(h,h.return);break;case 27:Lp(h);case 26:case 5:Yi(u,h,i),i&&a===null&&m&4&&zp(h),Rl(h,h.return);break;case 12:Yi(u,h,i);break;case 31:Yi(u,h,i),i&&m&4&&Up(u,h);break;case 13:Yi(u,h,i),i&&m&4&&qp(u,h);break;case 22:h.memoizedState===null&&Yi(u,h,i),Rl(h,h.return);break;case 30:break;default:Yi(u,h,i)}t=t.sibling}}function Id(e,t){var i=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(i=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==i&&(e!=null&&e.refCount++,i!=null&&bl(i))}function Ud(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&bl(e))}function pi(e,t,i,a){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Yp(e,t,i,a),t=t.sibling}function Yp(e,t,i,a){var u=t.flags;switch(t.tag){case 0:case 11:case 15:pi(e,t,i,a),u&2048&&Ol(9,t);break;case 1:pi(e,t,i,a);break;case 3:pi(e,t,i,a),u&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&bl(e)));break;case 12:if(u&2048){pi(e,t,i,a),e=t.stateNode;try{var h=t.memoizedProps,m=h.id,y=h.onPostCommit;typeof y=="function"&&y(m,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(C){We(t,t.return,C)}}else pi(e,t,i,a);break;case 31:pi(e,t,i,a);break;case 13:pi(e,t,i,a);break;case 23:break;case 22:h=t.stateNode,m=t.alternate,t.memoizedState!==null?h._visibility&2?pi(e,t,i,a):Dl(e,t):h._visibility&2?pi(e,t,i,a):(h._visibility|=2,$a(e,t,i,a,(t.subtreeFlags&10256)!==0||!1)),u&2048&&Id(m,t);break;case 24:pi(e,t,i,a),u&2048&&Ud(t.alternate,t);break;default:pi(e,t,i,a)}}function $a(e,t,i,a,u){for(u=u&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var h=e,m=t,y=i,C=a,D=m.flags;switch(m.tag){case 0:case 11:case 15:$a(h,m,y,C,u),Ol(8,m);break;case 23:break;case 22:var P=m.stateNode;m.memoizedState!==null?P._visibility&2?$a(h,m,y,C,u):Dl(h,m):(P._visibility|=2,$a(h,m,y,C,u)),u&&D&2048&&Id(m.alternate,m);break;case 24:$a(h,m,y,C,u),u&&D&2048&&Ud(m.alternate,m);break;default:$a(h,m,y,C,u)}t=t.sibling}}function Dl(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var i=e,a=t,u=a.flags;switch(a.tag){case 22:Dl(i,a),u&2048&&Id(a.alternate,a);break;case 24:Dl(i,a),u&2048&&Ud(a.alternate,a);break;default:Dl(i,a)}t=t.sibling}}var Ml=8192;function La(e,t,i){if(e.subtreeFlags&Ml)for(e=e.child;e!==null;)Kp(e,t,i),e=e.sibling}function Kp(e,t,i){switch(e.tag){case 26:La(e,t,i),e.flags&Ml&&e.memoizedState!==null&&o0(i,fi,e.memoizedState,e.memoizedProps);break;case 5:La(e,t,i);break;case 3:case 4:var a=fi;fi=jr(e.stateNode.containerInfo),La(e,t,i),fi=a;break;case 22:e.memoizedState===null&&(a=e.alternate,a!==null&&a.memoizedState!==null?(a=Ml,Ml=16777216,La(e,t,i),Ml=a):La(e,t,i));break;default:La(e,t,i)}}function Fp(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function zl(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var i=0;i<t.length;i++){var a=t[i];Zt=a,Qp(a,e)}Fp(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Xp(e),e=e.sibling}function Xp(e){switch(e.tag){case 0:case 11:case 15:zl(e),e.flags&2048&&us(9,e,e.return);break;case 3:zl(e);break;case 12:zl(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,pr(e)):zl(e);break;default:zl(e)}}function pr(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var i=0;i<t.length;i++){var a=t[i];Zt=a,Qp(a,e)}Fp(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:us(8,t,t.return),pr(t);break;case 22:i=t.stateNode,i._visibility&2&&(i._visibility&=-3,pr(t));break;default:pr(t)}e=e.sibling}}function Qp(e,t){for(;Zt!==null;){var i=Zt;switch(i.tag){case 0:case 11:case 15:us(8,i,t);break;case 23:case 22:if(i.memoizedState!==null&&i.memoizedState.cachePool!==null){var a=i.memoizedState.cachePool.pool;a!=null&&a.refCount++}break;case 24:bl(i.memoizedState.cache)}if(a=i.child,a!==null)a.return=i,Zt=a;else e:for(i=e;Zt!==null;){a=Zt;var u=a.sibling,h=a.return;if(Vp(a),a===i){Zt=null;break e}if(u!==null){u.return=h,Zt=u;break e}Zt=h}}}var Sy={getCacheForType:function(e){var t=rn(Ut),i=t.data.get(e);return i===void 0&&(i=e(),t.data.set(e,i)),i},cacheSignal:function(){return rn(Ut).controller.signal}},wy=typeof WeakMap=="function"?WeakMap:Map,Qe=0,rt=null,$e=null,He=0,Je=0,Bn=null,hs=!1,Ba=!1,qd=!1,Ki=0,Ot=0,fs=0,Ks=0,Pd=0,Hn=0,Ha=0,$l=null,On=null,Gd=!1,mr=0,Zp=0,gr=1/0,vr=null,ps=null,Xt=0,ms=null,Va=null,Fi=0,Yd=0,Kd=null,Jp=null,Ll=0,Fd=null;function Vn(){return(Qe&2)!==0&&He!==0?He&-He:A.T!==null?eu():Gn()}function Wp(){if(Hn===0)if((He&536870912)===0||qe){var e=yi;yi<<=1,(yi&3932160)===0&&(yi=262144),Hn=e}else Hn=536870912;return e=$n.current,e!==null&&(e.flags|=32),Hn}function Rn(e,t,i){(e===rt&&(Je===2||Je===9)||e.cancelPendingCommit!==null)&&(Ia(e,0),gs(e,He,Hn,!1)),ot(e,i),((Qe&2)===0||e!==rt)&&(e===rt&&((Qe&2)===0&&(Ks|=i),Ot===4&&gs(e,He,Hn,!1)),Ci(e))}function em(e,t,i){if((Qe&6)!==0)throw Error(l(327));var a=!i&&(t&127)===0&&(t&e.expiredLanes)===0||Xe(e,t),u=a?Ny(e,t):Qd(e,t,!0),h=a;do{if(u===0){Ba&&!a&&gs(e,t,0,!1);break}else{if(i=e.current.alternate,h&&!Cy(i)){u=Qd(e,t,!1),h=!1;continue}if(u===2){if(h=t,e.errorRecoveryDisabledLanes&h)var m=0;else m=e.pendingLanes&-536870913,m=m!==0?m:m&536870912?536870912:0;if(m!==0){t=m;e:{var y=e;u=$l;var C=y.current.memoizedState.isDehydrated;if(C&&(Ia(y,m).flags|=256),m=Qd(y,m,!1),m!==2){if(qd&&!C){y.errorRecoveryDisabledLanes|=h,Ks|=h,u=4;break e}h=On,On=u,h!==null&&(On===null?On=h:On.push.apply(On,h))}u=m}if(h=!1,u!==2)continue}}if(u===1){Ia(e,0),gs(e,t,0,!0);break}e:{switch(a=e,h=u,h){case 0:case 1:throw Error(l(345));case 4:if((t&4194048)!==t)break;case 6:gs(a,t,Hn,!hs);break e;case 2:On=null;break;case 3:case 5:break;default:throw Error(l(329))}if((t&62914560)===t&&(u=mr+300-Oe(),10<u)){if(gs(a,t,Hn,!hs),we(a,0,!0)!==0)break e;Fi=t,a.timeoutHandle=Om(tm.bind(null,a,i,On,vr,Gd,t,Hn,Ks,Ha,hs,h,"Throttled",-0,0),u);break e}tm(a,i,On,vr,Gd,t,Hn,Ks,Ha,hs,h,null,-0,0)}}break}while(!0);Ci(e)}function tm(e,t,i,a,u,h,m,y,C,D,P,X,M,B){if(e.timeoutHandle=-1,X=t.subtreeFlags,X&8192||(X&16785408)===16785408){X={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Di},Kp(t,h,X);var fe=(h&62914560)===h?mr-Oe():(h&4194048)===h?Zp-Oe():0;if(fe=r0(X,fe),fe!==null){Fi=h,e.cancelPendingCommit=fe(cm.bind(null,e,t,h,i,a,u,m,y,C,P,X,null,M,B)),gs(e,h,m,!D);return}}cm(e,t,h,i,a,u,m,y,C)}function Cy(e){for(var t=e;;){var i=t.tag;if((i===0||i===11||i===15)&&t.flags&16384&&(i=t.updateQueue,i!==null&&(i=i.stores,i!==null)))for(var a=0;a<i.length;a++){var u=i[a],h=u.getSnapshot;u=u.value;try{if(!Mn(h(),u))return!1}catch{return!1}}if(i=t.child,t.subtreeFlags&16384&&i!==null)i.return=t,t=i;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function gs(e,t,i,a){t&=~Pd,t&=~Ks,e.suspendedLanes|=t,e.pingedLanes&=~t,a&&(e.warmLanes|=t),a=e.expirationTimes;for(var u=t;0<u;){var h=31-Nt(u),m=1<<h;a[h]=-1,u&=~m}i!==0&&q(e,i,t)}function br(){return(Qe&6)===0?(Bl(0),!1):!0}function Xd(){if($e!==null){if(Je===0)var e=$e.return;else e=$e,Li=Bs=null,ud(e),Oa=null,xl=0,e=$e;for(;e!==null;)Rp(e.alternate,e),e=e.return;$e=null}}function Ia(e,t){var i=e.timeoutHandle;i!==-1&&(e.timeoutHandle=-1,Py(i)),i=e.cancelPendingCommit,i!==null&&(e.cancelPendingCommit=null,i()),Fi=0,Xd(),rt=e,$e=i=zi(e.current,null),He=t,Je=0,Bn=null,hs=!1,Ba=Xe(e,t),qd=!1,Ha=Hn=Pd=Ks=fs=Ot=0,On=$l=null,Gd=!1,(t&8)!==0&&(t|=t&32);var a=e.entangledLanes;if(a!==0)for(e=e.entanglements,a&=t;0<a;){var u=31-Nt(a),h=1<<u;t|=e[u],a&=~h}return Ki=t,Ho(),i}function nm(e,t){ke=null,A.H=Al,t===Ta||t===Ko?(t=bf(),Je=3):t===Wc?(t=bf(),Je=4):Je=t===jd?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,Bn=t,$e===null&&(Ot=1,or(e,Qn(t,e.current)))}function im(){var e=$n.current;return e===null?!0:(He&4194048)===He?ei===null:(He&62914560)===He||(He&536870912)!==0?e===ei:!1}function sm(){var e=A.H;return A.H=Al,e===null?Al:e}function am(){var e=A.A;return A.A=Sy,e}function yr(){Ot=4,hs||(He&4194048)!==He&&$n.current!==null||(Ba=!0),(fs&134217727)===0&&(Ks&134217727)===0||rt===null||gs(rt,He,Hn,!1)}function Qd(e,t,i){var a=Qe;Qe|=2;var u=sm(),h=am();(rt!==e||He!==t)&&(vr=null,Ia(e,t)),t=!1;var m=Ot;e:do try{if(Je!==0&&$e!==null){var y=$e,C=Bn;switch(Je){case 8:Xd(),m=6;break e;case 3:case 2:case 9:case 6:$n.current===null&&(t=!0);var D=Je;if(Je=0,Bn=null,Ua(e,y,C,D),i&&Ba){m=0;break e}break;default:D=Je,Je=0,Bn=null,Ua(e,y,C,D)}}Ey(),m=Ot;break}catch(P){nm(e,P)}while(!0);return t&&e.shellSuspendCounter++,Li=Bs=null,Qe=a,A.H=u,A.A=h,$e===null&&(rt=null,He=0,Ho()),m}function Ey(){for(;$e!==null;)lm($e)}function Ny(e,t){var i=Qe;Qe|=2;var a=sm(),u=am();rt!==e||He!==t?(vr=null,gr=Oe()+500,Ia(e,t)):Ba=Xe(e,t);e:do try{if(Je!==0&&$e!==null){t=$e;var h=Bn;t:switch(Je){case 1:Je=0,Bn=null,Ua(e,t,h,1);break;case 2:case 9:if(gf(h)){Je=0,Bn=null,om(t);break}t=function(){Je!==2&&Je!==9||rt!==e||(Je=7),Ci(e)},h.then(t,t);break e;case 3:Je=7;break e;case 4:Je=5;break e;case 7:gf(h)?(Je=0,Bn=null,om(t)):(Je=0,Bn=null,Ua(e,t,h,7));break;case 5:var m=null;switch($e.tag){case 26:m=$e.memoizedState;case 5:case 27:var y=$e;if(m?Ym(m):y.stateNode.complete){Je=0,Bn=null;var C=y.sibling;if(C!==null)$e=C;else{var D=y.return;D!==null?($e=D,xr(D)):$e=null}break t}}Je=0,Bn=null,Ua(e,t,h,5);break;case 6:Je=0,Bn=null,Ua(e,t,h,6);break;case 8:Xd(),Ot=6;break e;default:throw Error(l(462))}}jy();break}catch(P){nm(e,P)}while(!0);return Li=Bs=null,A.H=a,A.A=u,Qe=i,$e!==null?0:(rt=null,He=0,Ho(),Ot)}function jy(){for(;$e!==null&&!pt();)lm($e)}function lm(e){var t=Tp(e.alternate,e,Ki);e.memoizedProps=e.pendingProps,t===null?xr(e):$e=t}function om(e){var t=e,i=t.alternate;switch(t.tag){case 15:case 0:t=Cp(i,t,t.pendingProps,t.type,void 0,He);break;case 11:t=Cp(i,t,t.pendingProps,t.type.render,t.ref,He);break;case 5:ud(t);default:Rp(i,t),t=$e=af(t,Ki),t=Tp(i,t,Ki)}e.memoizedProps=e.pendingProps,t===null?xr(e):$e=t}function Ua(e,t,i,a){Li=Bs=null,ud(t),Oa=null,xl=0;var u=t.return;try{if(my(e,u,t,i,He)){Ot=1,or(e,Qn(i,e.current)),$e=null;return}}catch(h){if(u!==null)throw $e=u,h;Ot=1,or(e,Qn(i,e.current)),$e=null;return}t.flags&32768?(qe||a===1?e=!0:Ba||(He&536870912)!==0?e=!1:(hs=e=!0,(a===2||a===9||a===3||a===6)&&(a=$n.current,a!==null&&a.tag===13&&(a.flags|=16384))),rm(t,e)):xr(t)}function xr(e){var t=e;do{if((t.flags&32768)!==0){rm(t,hs);return}e=t.return;var i=by(t.alternate,t,Ki);if(i!==null){$e=i;return}if(t=t.sibling,t!==null){$e=t;return}$e=t=e}while(t!==null);Ot===0&&(Ot=5)}function rm(e,t){do{var i=yy(e.alternate,e);if(i!==null){i.flags&=32767,$e=i;return}if(i=e.return,i!==null&&(i.flags|=32768,i.subtreeFlags=0,i.deletions=null),!t&&(e=e.sibling,e!==null)){$e=e;return}$e=e=i}while(e!==null);Ot=6,$e=null}function cm(e,t,i,a,u,h,m,y,C){e.cancelPendingCommit=null;do _r();while(Xt!==0);if((Qe&6)!==0)throw Error(l(327));if(t!==null){if(t===e.current)throw Error(l(177));if(h=t.lanes|t.childLanes,h|=Bc,At(e,i,h,m,y,C),e===rt&&($e=rt=null,He=0),Va=t,ms=e,Fi=i,Yd=h,Kd=u,Jp=a,(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,Oy(an,function(){return pm(),null})):(e.callbackNode=null,e.callbackPriority=0),a=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||a){a=A.T,A.T=null,u=Y.p,Y.p=2,m=Qe,Qe|=4;try{xy(e,t,i)}finally{Qe=m,Y.p=u,A.T=a}}Xt=1,dm(),um(),hm()}}function dm(){if(Xt===1){Xt=0;var e=ms,t=Va,i=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||i){i=A.T,A.T=null;var a=Y.p;Y.p=2;var u=Qe;Qe|=4;try{Pp(t,e);var h=ru,m=Xh(e.containerInfo),y=h.focusedElem,C=h.selectionRange;if(m!==y&&y&&y.ownerDocument&&Fh(y.ownerDocument.documentElement,y)){if(C!==null&&Dc(y)){var D=C.start,P=C.end;if(P===void 0&&(P=D),"selectionStart"in y)y.selectionStart=D,y.selectionEnd=Math.min(P,y.value.length);else{var X=y.ownerDocument||document,M=X&&X.defaultView||window;if(M.getSelection){var B=M.getSelection(),fe=y.textContent.length,Se=Math.min(C.start,fe),it=C.end===void 0?Se:Math.min(C.end,fe);!B.extend&&Se>it&&(m=it,it=Se,Se=m);var T=Kh(y,Se),j=Kh(y,it);if(T&&j&&(B.rangeCount!==1||B.anchorNode!==T.node||B.anchorOffset!==T.offset||B.focusNode!==j.node||B.focusOffset!==j.offset)){var R=X.createRange();R.setStart(T.node,T.offset),B.removeAllRanges(),Se>it?(B.addRange(R),B.extend(j.node,j.offset)):(R.setEnd(j.node,j.offset),B.addRange(R))}}}}for(X=[],B=y;B=B.parentNode;)B.nodeType===1&&X.push({element:B,left:B.scrollLeft,top:B.scrollTop});for(typeof y.focus=="function"&&y.focus(),y=0;y<X.length;y++){var K=X[y];K.element.scrollLeft=K.left,K.element.scrollTop=K.top}}Dr=!!ou,ru=ou=null}finally{Qe=u,Y.p=a,A.T=i}}e.current=t,Xt=2}}function um(){if(Xt===2){Xt=0;var e=ms,t=Va,i=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||i){i=A.T,A.T=null;var a=Y.p;Y.p=2;var u=Qe;Qe|=4;try{Hp(e,t.alternate,t)}finally{Qe=u,Y.p=a,A.T=i}}Xt=3}}function hm(){if(Xt===4||Xt===3){Xt=0,G();var e=ms,t=Va,i=Fi,a=Jp;(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?Xt=5:(Xt=0,Va=ms=null,fm(e,e.pendingLanes));var u=e.pendingLanes;if(u===0&&(ps=null),ln(i),t=t.stateNode,St&&typeof St.onCommitFiberRoot=="function")try{St.onCommitFiberRoot(gn,t,void 0,(t.current.flags&128)===128)}catch{}if(a!==null){t=A.T,u=Y.p,Y.p=2,A.T=null;try{for(var h=e.onRecoverableError,m=0;m<a.length;m++){var y=a[m];h(y.value,{componentStack:y.stack})}}finally{A.T=t,Y.p=u}}(Fi&3)!==0&&_r(),Ci(e),u=e.pendingLanes,(i&261930)!==0&&(u&42)!==0?e===Fd?Ll++:(Ll=0,Fd=e):Ll=0,Bl(0)}}function fm(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,bl(t)))}function _r(){return dm(),um(),hm(),pm()}function pm(){if(Xt!==5)return!1;var e=ms,t=Yd;Yd=0;var i=ln(Fi),a=A.T,u=Y.p;try{Y.p=32>i?32:i,A.T=null,i=Kd,Kd=null;var h=ms,m=Fi;if(Xt=0,Va=ms=null,Fi=0,(Qe&6)!==0)throw Error(l(331));var y=Qe;if(Qe|=4,Xp(h.current),Yp(h,h.current,m,i),Qe=y,Bl(0,!1),St&&typeof St.onPostCommitFiberRoot=="function")try{St.onPostCommitFiberRoot(gn,h)}catch{}return!0}finally{Y.p=u,A.T=a,fm(e,t)}}function mm(e,t,i){t=Qn(i,t),t=Nd(e.stateNode,t,2),e=rs(e,t,2),e!==null&&(ot(e,2),Ci(e))}function We(e,t,i){if(e.tag===3)mm(e,e,i);else for(;t!==null;){if(t.tag===3){mm(t,e,i);break}else if(t.tag===1){var a=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof a.componentDidCatch=="function"&&(ps===null||!ps.has(a))){e=Qn(i,e),i=gp(2),a=rs(t,i,2),a!==null&&(vp(i,a,t,e),ot(a,2),Ci(a));break}}t=t.return}}function Zd(e,t,i){var a=e.pingCache;if(a===null){a=e.pingCache=new wy;var u=new Set;a.set(t,u)}else u=a.get(t),u===void 0&&(u=new Set,a.set(t,u));u.has(i)||(qd=!0,u.add(i),e=Ay.bind(null,e,t,i),t.then(e,e))}function Ay(e,t,i){var a=e.pingCache;a!==null&&a.delete(t),e.pingedLanes|=e.suspendedLanes&i,e.warmLanes&=~i,rt===e&&(He&i)===i&&(Ot===4||Ot===3&&(He&62914560)===He&&300>Oe()-mr?(Qe&2)===0&&Ia(e,0):Pd|=i,Ha===He&&(Ha=0)),Ci(e)}function gm(e,t){t===0&&(t=It()),e=zs(e,t),e!==null&&(ot(e,t),Ci(e))}function ky(e){var t=e.memoizedState,i=0;t!==null&&(i=t.retryLane),gm(e,i)}function Ty(e,t){var i=0;switch(e.tag){case 31:case 13:var a=e.stateNode,u=e.memoizedState;u!==null&&(i=u.retryLane);break;case 19:a=e.stateNode;break;case 22:a=e.stateNode._retryCache;break;default:throw Error(l(314))}a!==null&&a.delete(t),gm(e,i)}function Oy(e,t){return yn(e,t)}var Sr=null,qa=null,Jd=!1,wr=!1,Wd=!1,vs=0;function Ci(e){e!==qa&&e.next===null&&(qa===null?Sr=qa=e:qa=qa.next=e),wr=!0,Jd||(Jd=!0,Dy())}function Bl(e,t){if(!Wd&&wr){Wd=!0;do for(var i=!1,a=Sr;a!==null;){if(e!==0){var u=a.pendingLanes;if(u===0)var h=0;else{var m=a.suspendedLanes,y=a.pingedLanes;h=(1<<31-Nt(42|e)+1)-1,h&=u&~(m&~y),h=h&201326741?h&201326741|1:h?h|2:0}h!==0&&(i=!0,xm(a,h))}else h=He,h=we(a,a===rt?h:0,a.cancelPendingCommit!==null||a.timeoutHandle!==-1),(h&3)===0||Xe(a,h)||(i=!0,xm(a,h));a=a.next}while(i);Wd=!1}}function Ry(){vm()}function vm(){wr=Jd=!1;var e=0;vs!==0&&qy()&&(e=vs);for(var t=Oe(),i=null,a=Sr;a!==null;){var u=a.next,h=bm(a,t);h===0?(a.next=null,i===null?Sr=u:i.next=u,u===null&&(qa=i)):(i=a,(e!==0||(h&3)!==0)&&(wr=!0)),a=u}Xt!==0&&Xt!==5||Bl(e),vs!==0&&(vs=0)}function bm(e,t){for(var i=e.suspendedLanes,a=e.pingedLanes,u=e.expirationTimes,h=e.pendingLanes&-62914561;0<h;){var m=31-Nt(h),y=1<<m,C=u[m];C===-1?((y&i)===0||(y&a)!==0)&&(u[m]=jt(y,t)):C<=t&&(e.expiredLanes|=y),h&=~y}if(t=rt,i=He,i=we(e,e===t?i:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),a=e.callbackNode,i===0||e===t&&(Je===2||Je===9)||e.cancelPendingCommit!==null)return a!==null&&a!==null&&sn(a),e.callbackNode=null,e.callbackPriority=0;if((i&3)===0||Xe(e,i)){if(t=i&-i,t===e.callbackPriority)return t;switch(a!==null&&sn(a),ln(i)){case 2:case 8:i=En;break;case 32:i=an;break;case 268435456:i=mn;break;default:i=an}return a=ym.bind(null,e),i=yn(i,a),e.callbackPriority=t,e.callbackNode=i,t}return a!==null&&a!==null&&sn(a),e.callbackPriority=2,e.callbackNode=null,2}function ym(e,t){if(Xt!==0&&Xt!==5)return e.callbackNode=null,e.callbackPriority=0,null;var i=e.callbackNode;if(_r()&&e.callbackNode!==i)return null;var a=He;return a=we(e,e===rt?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),a===0?null:(em(e,a,t),bm(e,Oe()),e.callbackNode!=null&&e.callbackNode===i?ym.bind(null,e):null)}function xm(e,t){if(_r())return null;em(e,t,!0)}function Dy(){Gy(function(){(Qe&6)!==0?yn(mt,Ry):vm()})}function eu(){if(vs===0){var e=Aa;e===0&&(e=bi,bi<<=1,(bi&261888)===0&&(bi=256)),vs=e}return vs}function _m(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Oo(""+e)}function Sm(e,t){var i=t.ownerDocument.createElement("input");return i.name=t.name,i.value=t.value,e.id&&i.setAttribute("form",e.id),t.parentNode.insertBefore(i,t),e=new FormData(e),i.parentNode.removeChild(i),e}function My(e,t,i,a,u){if(t==="submit"&&i&&i.stateNode===u){var h=_m((u[he]||null).action),m=a.submitter;m&&(t=(t=m[he]||null)?_m(t.formAction):m.getAttribute("formAction"),t!==null&&(h=t,m=null));var y=new zo("action","action",null,a,u);e.push({event:y,listeners:[{instance:null,listener:function(){if(a.defaultPrevented){if(vs!==0){var C=m?Sm(u,m):new FormData(u);xd(i,{pending:!0,data:C,method:u.method,action:h},null,C)}}else typeof h=="function"&&(y.preventDefault(),C=m?Sm(u,m):new FormData(u),xd(i,{pending:!0,data:C,method:u.method,action:h},h,C))},currentTarget:u}]})}}for(var tu=0;tu<Lc.length;tu++){var nu=Lc[tu],zy=nu.toLowerCase(),$y=nu[0].toUpperCase()+nu.slice(1);hi(zy,"on"+$y)}hi(Jh,"onAnimationEnd"),hi(Wh,"onAnimationIteration"),hi(ef,"onAnimationStart"),hi("dblclick","onDoubleClick"),hi("focusin","onFocus"),hi("focusout","onBlur"),hi(Jb,"onTransitionRun"),hi(Wb,"onTransitionStart"),hi(ey,"onTransitionCancel"),hi(tf,"onTransitionEnd"),pa("onMouseEnter",["mouseout","mouseover"]),pa("onMouseLeave",["mouseout","mouseover"]),pa("onPointerEnter",["pointerout","pointerover"]),pa("onPointerLeave",["pointerout","pointerover"]),Os("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Os("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Os("onBeforeInput",["compositionend","keypress","textInput","paste"]),Os("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Os("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Os("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Hl="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Ly=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Hl));function wm(e,t){t=(t&4)!==0;for(var i=0;i<e.length;i++){var a=e[i],u=a.event;a=a.listeners;e:{var h=void 0;if(t)for(var m=a.length-1;0<=m;m--){var y=a[m],C=y.instance,D=y.currentTarget;if(y=y.listener,C!==h&&u.isPropagationStopped())break e;h=y,u.currentTarget=D;try{h(u)}catch(P){Bo(P)}u.currentTarget=null,h=C}else for(m=0;m<a.length;m++){if(y=a[m],C=y.instance,D=y.currentTarget,y=y.listener,C!==h&&u.isPropagationStopped())break e;h=y,u.currentTarget=D;try{h(u)}catch(P){Bo(P)}u.currentTarget=null,h=C}}}}function Le(e,t){var i=t[Sn];i===void 0&&(i=t[Sn]=new Set);var a=e+"__bubble";i.has(a)||(Cm(t,e,2,!1),i.add(a))}function iu(e,t,i){var a=0;t&&(a|=4),Cm(i,e,a,t)}var Cr="_reactListening"+Math.random().toString(36).slice(2);function su(e){if(!e[Cr]){e[Cr]=!0,gh.forEach(function(i){i!=="selectionchange"&&(Ly.has(i)||iu(i,!1,e),iu(i,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Cr]||(t[Cr]=!0,iu("selectionchange",!1,t))}}function Cm(e,t,i,a){switch(Wm(t)){case 2:var u=u0;break;case 8:u=h0;break;default:u=yu}i=u.bind(null,t,i,e),u=void 0,!Cc||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(u=!0),a?u!==void 0?e.addEventListener(t,i,{capture:!0,passive:u}):e.addEventListener(t,i,!0):u!==void 0?e.addEventListener(t,i,{passive:u}):e.addEventListener(t,i,!1)}function au(e,t,i,a,u){var h=a;if((t&1)===0&&(t&2)===0&&a!==null)e:for(;;){if(a===null)return;var m=a.tag;if(m===3||m===4){var y=a.stateNode.containerInfo;if(y===u)break;if(m===4)for(m=a.return;m!==null;){var C=m.tag;if((C===3||C===4)&&m.stateNode.containerInfo===u)return;m=m.return}for(;y!==null;){if(m=ua(y),m===null)return;if(C=m.tag,C===5||C===6||C===26||C===27){a=h=m;continue e}y=y.parentNode}}a=a.return}Ah(function(){var D=h,P=Sc(i),X=[];e:{var M=nf.get(e);if(M!==void 0){var B=zo,fe=e;switch(e){case"keypress":if(Do(i)===0)break e;case"keydown":case"keyup":B=Tb;break;case"focusin":fe="focus",B=Ac;break;case"focusout":fe="blur",B=Ac;break;case"beforeblur":case"afterblur":B=Ac;break;case"click":if(i.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":B=Oh;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":B=bb;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":B=Db;break;case Jh:case Wh:case ef:B=_b;break;case tf:B=zb;break;case"scroll":case"scrollend":B=gb;break;case"wheel":B=Lb;break;case"copy":case"cut":case"paste":B=wb;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":B=Dh;break;case"toggle":case"beforetoggle":B=Hb}var Se=(t&4)!==0,it=!Se&&(e==="scroll"||e==="scrollend"),T=Se?M!==null?M+"Capture":null:M;Se=[];for(var j=D,R;j!==null;){var K=j;if(R=K.stateNode,K=K.tag,K!==5&&K!==26&&K!==27||R===null||T===null||(K=ol(j,T),K!=null&&Se.push(Vl(j,K,R))),it)break;j=j.return}0<Se.length&&(M=new B(M,fe,null,i,P),X.push({event:M,listeners:Se}))}}if((t&7)===0){e:{if(M=e==="mouseover"||e==="pointerover",B=e==="mouseout"||e==="pointerout",M&&i!==_c&&(fe=i.relatedTarget||i.fromElement)&&(ua(fe)||fe[kt]))break e;if((B||M)&&(M=P.window===P?P:(M=P.ownerDocument)?M.defaultView||M.parentWindow:window,B?(fe=i.relatedTarget||i.toElement,B=D,fe=fe?ua(fe):null,fe!==null&&(it=c(fe),Se=fe.tag,fe!==it||Se!==5&&Se!==27&&Se!==6)&&(fe=null)):(B=null,fe=D),B!==fe)){if(Se=Oh,K="onMouseLeave",T="onMouseEnter",j="mouse",(e==="pointerout"||e==="pointerover")&&(Se=Dh,K="onPointerLeave",T="onPointerEnter",j="pointer"),it=B==null?M:ll(B),R=fe==null?M:ll(fe),M=new Se(K,j+"leave",B,i,P),M.target=it,M.relatedTarget=R,K=null,ua(P)===D&&(Se=new Se(T,j+"enter",fe,i,P),Se.target=R,Se.relatedTarget=it,K=Se),it=K,B&&fe)t:{for(Se=By,T=B,j=fe,R=0,K=T;K;K=Se(K))R++;K=0;for(var xe=j;xe;xe=Se(xe))K++;for(;0<R-K;)T=Se(T),R--;for(;0<K-R;)j=Se(j),K--;for(;R--;){if(T===j||j!==null&&T===j.alternate){Se=T;break t}T=Se(T),j=Se(j)}Se=null}else Se=null;B!==null&&Em(X,M,B,Se,!1),fe!==null&&it!==null&&Em(X,it,fe,Se,!0)}}e:{if(M=D?ll(D):window,B=M.nodeName&&M.nodeName.toLowerCase(),B==="select"||B==="input"&&M.type==="file")var Ke=Ih;else if(Hh(M))if(Uh)Ke=Xb;else{Ke=Kb;var ge=Yb}else B=M.nodeName,!B||B.toLowerCase()!=="input"||M.type!=="checkbox"&&M.type!=="radio"?D&&xc(D.elementType)&&(Ke=Ih):Ke=Fb;if(Ke&&(Ke=Ke(e,D))){Vh(X,Ke,i,P);break e}ge&&ge(e,M,D),e==="focusout"&&D&&M.type==="number"&&D.memoizedProps.value!=null&&yc(M,"number",M.value)}switch(ge=D?ll(D):window,e){case"focusin":(Hh(ge)||ge.contentEditable==="true")&&(xa=ge,Mc=D,ml=null);break;case"focusout":ml=Mc=xa=null;break;case"mousedown":zc=!0;break;case"contextmenu":case"mouseup":case"dragend":zc=!1,Qh(X,i,P);break;case"selectionchange":if(Zb)break;case"keydown":case"keyup":Qh(X,i,P)}var Re;if(Tc)e:{switch(e){case"compositionstart":var Ve="onCompositionStart";break e;case"compositionend":Ve="onCompositionEnd";break e;case"compositionupdate":Ve="onCompositionUpdate";break e}Ve=void 0}else ya?Lh(e,i)&&(Ve="onCompositionEnd"):e==="keydown"&&i.keyCode===229&&(Ve="onCompositionStart");Ve&&(Mh&&i.locale!=="ko"&&(ya||Ve!=="onCompositionStart"?Ve==="onCompositionEnd"&&ya&&(Re=kh()):(ts=P,Ec="value"in ts?ts.value:ts.textContent,ya=!0)),ge=Er(D,Ve),0<ge.length&&(Ve=new Rh(Ve,e,null,i,P),X.push({event:Ve,listeners:ge}),Re?Ve.data=Re:(Re=Bh(i),Re!==null&&(Ve.data=Re)))),(Re=Ib?Ub(e,i):qb(e,i))&&(Ve=Er(D,"onBeforeInput"),0<Ve.length&&(ge=new Rh("onBeforeInput","beforeinput",null,i,P),X.push({event:ge,listeners:Ve}),ge.data=Re)),My(X,e,D,i,P)}wm(X,t)})}function Vl(e,t,i){return{instance:e,listener:t,currentTarget:i}}function Er(e,t){for(var i=t+"Capture",a=[];e!==null;){var u=e,h=u.stateNode;if(u=u.tag,u!==5&&u!==26&&u!==27||h===null||(u=ol(e,i),u!=null&&a.unshift(Vl(e,u,h)),u=ol(e,t),u!=null&&a.push(Vl(e,u,h))),e.tag===3)return a;e=e.return}return[]}function By(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Em(e,t,i,a,u){for(var h=t._reactName,m=[];i!==null&&i!==a;){var y=i,C=y.alternate,D=y.stateNode;if(y=y.tag,C!==null&&C===a)break;y!==5&&y!==26&&y!==27||D===null||(C=D,u?(D=ol(i,h),D!=null&&m.unshift(Vl(i,D,C))):u||(D=ol(i,h),D!=null&&m.push(Vl(i,D,C)))),i=i.return}m.length!==0&&e.push({event:t,listeners:m})}var Hy=/\r\n?/g,Vy=/\u0000|\uFFFD/g;function Nm(e){return(typeof e=="string"?e:""+e).replace(Hy,`
`).replace(Vy,"")}function jm(e,t){return t=Nm(t),Nm(e)===t}function nt(e,t,i,a,u,h){switch(i){case"children":typeof a=="string"?t==="body"||t==="textarea"&&a===""||ga(e,a):(typeof a=="number"||typeof a=="bigint")&&t!=="body"&&ga(e,""+a);break;case"className":ko(e,"class",a);break;case"tabIndex":ko(e,"tabindex",a);break;case"dir":case"role":case"viewBox":case"width":case"height":ko(e,i,a);break;case"style":Nh(e,a,h);break;case"data":if(t!=="object"){ko(e,"data",a);break}case"src":case"href":if(a===""&&(t!=="a"||i!=="href")){e.removeAttribute(i);break}if(a==null||typeof a=="function"||typeof a=="symbol"||typeof a=="boolean"){e.removeAttribute(i);break}a=Oo(""+a),e.setAttribute(i,a);break;case"action":case"formAction":if(typeof a=="function"){e.setAttribute(i,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof h=="function"&&(i==="formAction"?(t!=="input"&&nt(e,t,"name",u.name,u,null),nt(e,t,"formEncType",u.formEncType,u,null),nt(e,t,"formMethod",u.formMethod,u,null),nt(e,t,"formTarget",u.formTarget,u,null)):(nt(e,t,"encType",u.encType,u,null),nt(e,t,"method",u.method,u,null),nt(e,t,"target",u.target,u,null)));if(a==null||typeof a=="symbol"||typeof a=="boolean"){e.removeAttribute(i);break}a=Oo(""+a),e.setAttribute(i,a);break;case"onClick":a!=null&&(e.onclick=Di);break;case"onScroll":a!=null&&Le("scroll",e);break;case"onScrollEnd":a!=null&&Le("scrollend",e);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(l(61));if(i=a.__html,i!=null){if(u.children!=null)throw Error(l(60));e.innerHTML=i}}break;case"multiple":e.multiple=a&&typeof a!="function"&&typeof a!="symbol";break;case"muted":e.muted=a&&typeof a!="function"&&typeof a!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(a==null||typeof a=="function"||typeof a=="boolean"||typeof a=="symbol"){e.removeAttribute("xlink:href");break}i=Oo(""+a),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",i);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":a!=null&&typeof a!="function"&&typeof a!="symbol"?e.setAttribute(i,""+a):e.removeAttribute(i);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":a&&typeof a!="function"&&typeof a!="symbol"?e.setAttribute(i,""):e.removeAttribute(i);break;case"capture":case"download":a===!0?e.setAttribute(i,""):a!==!1&&a!=null&&typeof a!="function"&&typeof a!="symbol"?e.setAttribute(i,a):e.removeAttribute(i);break;case"cols":case"rows":case"size":case"span":a!=null&&typeof a!="function"&&typeof a!="symbol"&&!isNaN(a)&&1<=a?e.setAttribute(i,a):e.removeAttribute(i);break;case"rowSpan":case"start":a==null||typeof a=="function"||typeof a=="symbol"||isNaN(a)?e.removeAttribute(i):e.setAttribute(i,a);break;case"popover":Le("beforetoggle",e),Le("toggle",e),Ao(e,"popover",a);break;case"xlinkActuate":Ri(e,"http://www.w3.org/1999/xlink","xlink:actuate",a);break;case"xlinkArcrole":Ri(e,"http://www.w3.org/1999/xlink","xlink:arcrole",a);break;case"xlinkRole":Ri(e,"http://www.w3.org/1999/xlink","xlink:role",a);break;case"xlinkShow":Ri(e,"http://www.w3.org/1999/xlink","xlink:show",a);break;case"xlinkTitle":Ri(e,"http://www.w3.org/1999/xlink","xlink:title",a);break;case"xlinkType":Ri(e,"http://www.w3.org/1999/xlink","xlink:type",a);break;case"xmlBase":Ri(e,"http://www.w3.org/XML/1998/namespace","xml:base",a);break;case"xmlLang":Ri(e,"http://www.w3.org/XML/1998/namespace","xml:lang",a);break;case"xmlSpace":Ri(e,"http://www.w3.org/XML/1998/namespace","xml:space",a);break;case"is":Ao(e,"is",a);break;case"innerText":case"textContent":break;default:(!(2<i.length)||i[0]!=="o"&&i[0]!=="O"||i[1]!=="n"&&i[1]!=="N")&&(i=pb.get(i)||i,Ao(e,i,a))}}function lu(e,t,i,a,u,h){switch(i){case"style":Nh(e,a,h);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(l(61));if(i=a.__html,i!=null){if(u.children!=null)throw Error(l(60));e.innerHTML=i}}break;case"children":typeof a=="string"?ga(e,a):(typeof a=="number"||typeof a=="bigint")&&ga(e,""+a);break;case"onScroll":a!=null&&Le("scroll",e);break;case"onScrollEnd":a!=null&&Le("scrollend",e);break;case"onClick":a!=null&&(e.onclick=Di);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!vh.hasOwnProperty(i))e:{if(i[0]==="o"&&i[1]==="n"&&(u=i.endsWith("Capture"),t=i.slice(2,u?i.length-7:void 0),h=e[he]||null,h=h!=null?h[i]:null,typeof h=="function"&&e.removeEventListener(t,h,u),typeof a=="function")){typeof h!="function"&&h!==null&&(i in e?e[i]=null:e.hasAttribute(i)&&e.removeAttribute(i)),e.addEventListener(t,a,u);break e}i in e?e[i]=a:a===!0?e.setAttribute(i,""):Ao(e,i,a)}}}function dn(e,t,i){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Le("error",e),Le("load",e);var a=!1,u=!1,h;for(h in i)if(i.hasOwnProperty(h)){var m=i[h];if(m!=null)switch(h){case"src":a=!0;break;case"srcSet":u=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(l(137,t));default:nt(e,t,h,m,i,null)}}u&&nt(e,t,"srcSet",i.srcSet,i,null),a&&nt(e,t,"src",i.src,i,null);return;case"input":Le("invalid",e);var y=h=m=u=null,C=null,D=null;for(a in i)if(i.hasOwnProperty(a)){var P=i[a];if(P!=null)switch(a){case"name":u=P;break;case"type":m=P;break;case"checked":C=P;break;case"defaultChecked":D=P;break;case"value":h=P;break;case"defaultValue":y=P;break;case"children":case"dangerouslySetInnerHTML":if(P!=null)throw Error(l(137,t));break;default:nt(e,t,a,P,i,null)}}Sh(e,h,y,C,D,m,u,!1);return;case"select":Le("invalid",e),a=m=h=null;for(u in i)if(i.hasOwnProperty(u)&&(y=i[u],y!=null))switch(u){case"value":h=y;break;case"defaultValue":m=y;break;case"multiple":a=y;default:nt(e,t,u,y,i,null)}t=h,i=m,e.multiple=!!a,t!=null?ma(e,!!a,t,!1):i!=null&&ma(e,!!a,i,!0);return;case"textarea":Le("invalid",e),h=u=a=null;for(m in i)if(i.hasOwnProperty(m)&&(y=i[m],y!=null))switch(m){case"value":a=y;break;case"defaultValue":u=y;break;case"children":h=y;break;case"dangerouslySetInnerHTML":if(y!=null)throw Error(l(91));break;default:nt(e,t,m,y,i,null)}Ch(e,a,u,h);return;case"option":for(C in i)i.hasOwnProperty(C)&&(a=i[C],a!=null)&&(C==="selected"?e.selected=a&&typeof a!="function"&&typeof a!="symbol":nt(e,t,C,a,i,null));return;case"dialog":Le("beforetoggle",e),Le("toggle",e),Le("cancel",e),Le("close",e);break;case"iframe":case"object":Le("load",e);break;case"video":case"audio":for(a=0;a<Hl.length;a++)Le(Hl[a],e);break;case"image":Le("error",e),Le("load",e);break;case"details":Le("toggle",e);break;case"embed":case"source":case"link":Le("error",e),Le("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(D in i)if(i.hasOwnProperty(D)&&(a=i[D],a!=null))switch(D){case"children":case"dangerouslySetInnerHTML":throw Error(l(137,t));default:nt(e,t,D,a,i,null)}return;default:if(xc(t)){for(P in i)i.hasOwnProperty(P)&&(a=i[P],a!==void 0&&lu(e,t,P,a,i,void 0));return}}for(y in i)i.hasOwnProperty(y)&&(a=i[y],a!=null&&nt(e,t,y,a,i,null))}function Iy(e,t,i,a){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var u=null,h=null,m=null,y=null,C=null,D=null,P=null;for(B in i){var X=i[B];if(i.hasOwnProperty(B)&&X!=null)switch(B){case"checked":break;case"value":break;case"defaultValue":C=X;default:a.hasOwnProperty(B)||nt(e,t,B,null,a,X)}}for(var M in a){var B=a[M];if(X=i[M],a.hasOwnProperty(M)&&(B!=null||X!=null))switch(M){case"type":h=B;break;case"name":u=B;break;case"checked":D=B;break;case"defaultChecked":P=B;break;case"value":m=B;break;case"defaultValue":y=B;break;case"children":case"dangerouslySetInnerHTML":if(B!=null)throw Error(l(137,t));break;default:B!==X&&nt(e,t,M,B,a,X)}}bc(e,m,y,C,D,P,h,u);return;case"select":B=m=y=M=null;for(h in i)if(C=i[h],i.hasOwnProperty(h)&&C!=null)switch(h){case"value":break;case"multiple":B=C;default:a.hasOwnProperty(h)||nt(e,t,h,null,a,C)}for(u in a)if(h=a[u],C=i[u],a.hasOwnProperty(u)&&(h!=null||C!=null))switch(u){case"value":M=h;break;case"defaultValue":y=h;break;case"multiple":m=h;default:h!==C&&nt(e,t,u,h,a,C)}t=y,i=m,a=B,M!=null?ma(e,!!i,M,!1):!!a!=!!i&&(t!=null?ma(e,!!i,t,!0):ma(e,!!i,i?[]:"",!1));return;case"textarea":B=M=null;for(y in i)if(u=i[y],i.hasOwnProperty(y)&&u!=null&&!a.hasOwnProperty(y))switch(y){case"value":break;case"children":break;default:nt(e,t,y,null,a,u)}for(m in a)if(u=a[m],h=i[m],a.hasOwnProperty(m)&&(u!=null||h!=null))switch(m){case"value":M=u;break;case"defaultValue":B=u;break;case"children":break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(l(91));break;default:u!==h&&nt(e,t,m,u,a,h)}wh(e,M,B);return;case"option":for(var fe in i)M=i[fe],i.hasOwnProperty(fe)&&M!=null&&!a.hasOwnProperty(fe)&&(fe==="selected"?e.selected=!1:nt(e,t,fe,null,a,M));for(C in a)M=a[C],B=i[C],a.hasOwnProperty(C)&&M!==B&&(M!=null||B!=null)&&(C==="selected"?e.selected=M&&typeof M!="function"&&typeof M!="symbol":nt(e,t,C,M,a,B));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var Se in i)M=i[Se],i.hasOwnProperty(Se)&&M!=null&&!a.hasOwnProperty(Se)&&nt(e,t,Se,null,a,M);for(D in a)if(M=a[D],B=i[D],a.hasOwnProperty(D)&&M!==B&&(M!=null||B!=null))switch(D){case"children":case"dangerouslySetInnerHTML":if(M!=null)throw Error(l(137,t));break;default:nt(e,t,D,M,a,B)}return;default:if(xc(t)){for(var it in i)M=i[it],i.hasOwnProperty(it)&&M!==void 0&&!a.hasOwnProperty(it)&&lu(e,t,it,void 0,a,M);for(P in a)M=a[P],B=i[P],!a.hasOwnProperty(P)||M===B||M===void 0&&B===void 0||lu(e,t,P,M,a,B);return}}for(var T in i)M=i[T],i.hasOwnProperty(T)&&M!=null&&!a.hasOwnProperty(T)&&nt(e,t,T,null,a,M);for(X in a)M=a[X],B=i[X],!a.hasOwnProperty(X)||M===B||M==null&&B==null||nt(e,t,X,M,a,B)}function Am(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function Uy(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,i=performance.getEntriesByType("resource"),a=0;a<i.length;a++){var u=i[a],h=u.transferSize,m=u.initiatorType,y=u.duration;if(h&&y&&Am(m)){for(m=0,y=u.responseEnd,a+=1;a<i.length;a++){var C=i[a],D=C.startTime;if(D>y)break;var P=C.transferSize,X=C.initiatorType;P&&Am(X)&&(C=C.responseEnd,m+=P*(C<y?1:(y-D)/(C-D)))}if(--a,t+=8*(h+m)/(u.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var ou=null,ru=null;function Nr(e){return e.nodeType===9?e:e.ownerDocument}function km(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Tm(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function cu(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var du=null;function qy(){var e=window.event;return e&&e.type==="popstate"?e===du?!1:(du=e,!0):(du=null,!1)}var Om=typeof setTimeout=="function"?setTimeout:void 0,Py=typeof clearTimeout=="function"?clearTimeout:void 0,Rm=typeof Promise=="function"?Promise:void 0,Gy=typeof queueMicrotask=="function"?queueMicrotask:typeof Rm<"u"?function(e){return Rm.resolve(null).then(e).catch(Yy)}:Om;function Yy(e){setTimeout(function(){throw e})}function bs(e){return e==="head"}function Dm(e,t){var i=t,a=0;do{var u=i.nextSibling;if(e.removeChild(i),u&&u.nodeType===8)if(i=u.data,i==="/$"||i==="/&"){if(a===0){e.removeChild(u),Ka(t);return}a--}else if(i==="$"||i==="$?"||i==="$~"||i==="$!"||i==="&")a++;else if(i==="html")Il(e.ownerDocument.documentElement);else if(i==="head"){i=e.ownerDocument.head,Il(i);for(var h=i.firstChild;h;){var m=h.nextSibling,y=h.nodeName;h[al]||y==="SCRIPT"||y==="STYLE"||y==="LINK"&&h.rel.toLowerCase()==="stylesheet"||i.removeChild(h),h=m}}else i==="body"&&Il(e.ownerDocument.body);i=u}while(i);Ka(t)}function Mm(e,t){var i=e;e=0;do{var a=i.nextSibling;if(i.nodeType===1?t?(i._stashedDisplay=i.style.display,i.style.display="none"):(i.style.display=i._stashedDisplay||"",i.getAttribute("style")===""&&i.removeAttribute("style")):i.nodeType===3&&(t?(i._stashedText=i.nodeValue,i.nodeValue=""):i.nodeValue=i._stashedText||""),a&&a.nodeType===8)if(i=a.data,i==="/$"){if(e===0)break;e--}else i!=="$"&&i!=="$?"&&i!=="$~"&&i!=="$!"||e++;i=a}while(i)}function uu(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var i=t;switch(t=t.nextSibling,i.nodeName){case"HTML":case"HEAD":case"BODY":uu(i),gc(i);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(i.rel.toLowerCase()==="stylesheet")continue}e.removeChild(i)}}function Ky(e,t,i,a){for(;e.nodeType===1;){var u=i;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!a&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(a){if(!e[al])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(h=e.getAttribute("rel"),h==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(h!==u.rel||e.getAttribute("href")!==(u.href==null||u.href===""?null:u.href)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin)||e.getAttribute("title")!==(u.title==null?null:u.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(h=e.getAttribute("src"),(h!==(u.src==null?null:u.src)||e.getAttribute("type")!==(u.type==null?null:u.type)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin))&&h&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var h=u.name==null?null:""+u.name;if(u.type==="hidden"&&e.getAttribute("name")===h)return e}else return e;if(e=ti(e.nextSibling),e===null)break}return null}function Fy(e,t,i){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!i||(e=ti(e.nextSibling),e===null))return null;return e}function zm(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=ti(e.nextSibling),e===null))return null;return e}function hu(e){return e.data==="$?"||e.data==="$~"}function fu(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function Xy(e,t){var i=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||i.readyState!=="loading")t();else{var a=function(){t(),i.removeEventListener("DOMContentLoaded",a)};i.addEventListener("DOMContentLoaded",a),e._reactRetry=a}}function ti(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var pu=null;function $m(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var i=e.data;if(i==="/$"||i==="/&"){if(t===0)return ti(e.nextSibling);t--}else i!=="$"&&i!=="$!"&&i!=="$?"&&i!=="$~"&&i!=="&"||t++}e=e.nextSibling}return null}function Lm(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var i=e.data;if(i==="$"||i==="$!"||i==="$?"||i==="$~"||i==="&"){if(t===0)return e;t--}else i!=="/$"&&i!=="/&"||t++}e=e.previousSibling}return null}function Bm(e,t,i){switch(t=Nr(i),e){case"html":if(e=t.documentElement,!e)throw Error(l(452));return e;case"head":if(e=t.head,!e)throw Error(l(453));return e;case"body":if(e=t.body,!e)throw Error(l(454));return e;default:throw Error(l(451))}}function Il(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);gc(e)}var ni=new Map,Hm=new Set;function jr(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var Xi=Y.d;Y.d={f:Qy,r:Zy,D:Jy,C:Wy,L:e0,m:t0,X:i0,S:n0,M:s0};function Qy(){var e=Xi.f(),t=br();return e||t}function Zy(e){var t=ha(e);t!==null&&t.tag===5&&t.type==="form"?np(t):Xi.r(e)}var Pa=typeof document>"u"?null:document;function Vm(e,t,i){var a=Pa;if(a&&typeof t=="string"&&t){var u=Fn(t);u='link[rel="'+e+'"][href="'+u+'"]',typeof i=="string"&&(u+='[crossorigin="'+i+'"]'),Hm.has(u)||(Hm.add(u),e={rel:e,crossOrigin:i,href:t},a.querySelector(u)===null&&(t=a.createElement("link"),dn(t,"link",e),Qt(t),a.head.appendChild(t)))}}function Jy(e){Xi.D(e),Vm("dns-prefetch",e,null)}function Wy(e,t){Xi.C(e,t),Vm("preconnect",e,t)}function e0(e,t,i){Xi.L(e,t,i);var a=Pa;if(a&&e&&t){var u='link[rel="preload"][as="'+Fn(t)+'"]';t==="image"&&i&&i.imageSrcSet?(u+='[imagesrcset="'+Fn(i.imageSrcSet)+'"]',typeof i.imageSizes=="string"&&(u+='[imagesizes="'+Fn(i.imageSizes)+'"]')):u+='[href="'+Fn(e)+'"]';var h=u;switch(t){case"style":h=Ga(e);break;case"script":h=Ya(e)}ni.has(h)||(e=v({rel:"preload",href:t==="image"&&i&&i.imageSrcSet?void 0:e,as:t},i),ni.set(h,e),a.querySelector(u)!==null||t==="style"&&a.querySelector(Ul(h))||t==="script"&&a.querySelector(ql(h))||(t=a.createElement("link"),dn(t,"link",e),Qt(t),a.head.appendChild(t)))}}function t0(e,t){Xi.m(e,t);var i=Pa;if(i&&e){var a=t&&typeof t.as=="string"?t.as:"script",u='link[rel="modulepreload"][as="'+Fn(a)+'"][href="'+Fn(e)+'"]',h=u;switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":h=Ya(e)}if(!ni.has(h)&&(e=v({rel:"modulepreload",href:e},t),ni.set(h,e),i.querySelector(u)===null)){switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(i.querySelector(ql(h)))return}a=i.createElement("link"),dn(a,"link",e),Qt(a),i.head.appendChild(a)}}}function n0(e,t,i){Xi.S(e,t,i);var a=Pa;if(a&&e){var u=fa(a).hoistableStyles,h=Ga(e);t=t||"default";var m=u.get(h);if(!m){var y={loading:0,preload:null};if(m=a.querySelector(Ul(h)))y.loading=5;else{e=v({rel:"stylesheet",href:e,"data-precedence":t},i),(i=ni.get(h))&&mu(e,i);var C=m=a.createElement("link");Qt(C),dn(C,"link",e),C._p=new Promise(function(D,P){C.onload=D,C.onerror=P}),C.addEventListener("load",function(){y.loading|=1}),C.addEventListener("error",function(){y.loading|=2}),y.loading|=4,Ar(m,t,a)}m={type:"stylesheet",instance:m,count:1,state:y},u.set(h,m)}}}function i0(e,t){Xi.X(e,t);var i=Pa;if(i&&e){var a=fa(i).hoistableScripts,u=Ya(e),h=a.get(u);h||(h=i.querySelector(ql(u)),h||(e=v({src:e,async:!0},t),(t=ni.get(u))&&gu(e,t),h=i.createElement("script"),Qt(h),dn(h,"link",e),i.head.appendChild(h)),h={type:"script",instance:h,count:1,state:null},a.set(u,h))}}function s0(e,t){Xi.M(e,t);var i=Pa;if(i&&e){var a=fa(i).hoistableScripts,u=Ya(e),h=a.get(u);h||(h=i.querySelector(ql(u)),h||(e=v({src:e,async:!0,type:"module"},t),(t=ni.get(u))&&gu(e,t),h=i.createElement("script"),Qt(h),dn(h,"link",e),i.head.appendChild(h)),h={type:"script",instance:h,count:1,state:null},a.set(u,h))}}function Im(e,t,i,a){var u=(u=me.current)?jr(u):null;if(!u)throw Error(l(446));switch(e){case"meta":case"title":return null;case"style":return typeof i.precedence=="string"&&typeof i.href=="string"?(t=Ga(i.href),i=fa(u).hoistableStyles,a=i.get(t),a||(a={type:"style",instance:null,count:0,state:null},i.set(t,a)),a):{type:"void",instance:null,count:0,state:null};case"link":if(i.rel==="stylesheet"&&typeof i.href=="string"&&typeof i.precedence=="string"){e=Ga(i.href);var h=fa(u).hoistableStyles,m=h.get(e);if(m||(u=u.ownerDocument||u,m={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},h.set(e,m),(h=u.querySelector(Ul(e)))&&!h._p&&(m.instance=h,m.state.loading=5),ni.has(e)||(i={rel:"preload",as:"style",href:i.href,crossOrigin:i.crossOrigin,integrity:i.integrity,media:i.media,hrefLang:i.hrefLang,referrerPolicy:i.referrerPolicy},ni.set(e,i),h||a0(u,e,i,m.state))),t&&a===null)throw Error(l(528,""));return m}if(t&&a!==null)throw Error(l(529,""));return null;case"script":return t=i.async,i=i.src,typeof i=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=Ya(i),i=fa(u).hoistableScripts,a=i.get(t),a||(a={type:"script",instance:null,count:0,state:null},i.set(t,a)),a):{type:"void",instance:null,count:0,state:null};default:throw Error(l(444,e))}}function Ga(e){return'href="'+Fn(e)+'"'}function Ul(e){return'link[rel="stylesheet"]['+e+"]"}function Um(e){return v({},e,{"data-precedence":e.precedence,precedence:null})}function a0(e,t,i,a){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?a.loading=1:(t=e.createElement("link"),a.preload=t,t.addEventListener("load",function(){return a.loading|=1}),t.addEventListener("error",function(){return a.loading|=2}),dn(t,"link",i),Qt(t),e.head.appendChild(t))}function Ya(e){return'[src="'+Fn(e)+'"]'}function ql(e){return"script[async]"+e}function qm(e,t,i){if(t.count++,t.instance===null)switch(t.type){case"style":var a=e.querySelector('style[data-href~="'+Fn(i.href)+'"]');if(a)return t.instance=a,Qt(a),a;var u=v({},i,{"data-href":i.href,"data-precedence":i.precedence,href:null,precedence:null});return a=(e.ownerDocument||e).createElement("style"),Qt(a),dn(a,"style",u),Ar(a,i.precedence,e),t.instance=a;case"stylesheet":u=Ga(i.href);var h=e.querySelector(Ul(u));if(h)return t.state.loading|=4,t.instance=h,Qt(h),h;a=Um(i),(u=ni.get(u))&&mu(a,u),h=(e.ownerDocument||e).createElement("link"),Qt(h);var m=h;return m._p=new Promise(function(y,C){m.onload=y,m.onerror=C}),dn(h,"link",a),t.state.loading|=4,Ar(h,i.precedence,e),t.instance=h;case"script":return h=Ya(i.src),(u=e.querySelector(ql(h)))?(t.instance=u,Qt(u),u):(a=i,(u=ni.get(h))&&(a=v({},i),gu(a,u)),e=e.ownerDocument||e,u=e.createElement("script"),Qt(u),dn(u,"link",a),e.head.appendChild(u),t.instance=u);case"void":return null;default:throw Error(l(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(a=t.instance,t.state.loading|=4,Ar(a,i.precedence,e));return t.instance}function Ar(e,t,i){for(var a=i.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),u=a.length?a[a.length-1]:null,h=u,m=0;m<a.length;m++){var y=a[m];if(y.dataset.precedence===t)h=y;else if(h!==u)break}h?h.parentNode.insertBefore(e,h.nextSibling):(t=i.nodeType===9?i.head:i,t.insertBefore(e,t.firstChild))}function mu(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function gu(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var kr=null;function Pm(e,t,i){if(kr===null){var a=new Map,u=kr=new Map;u.set(i,a)}else u=kr,a=u.get(i),a||(a=new Map,u.set(i,a));if(a.has(e))return a;for(a.set(e,null),i=i.getElementsByTagName(e),u=0;u<i.length;u++){var h=i[u];if(!(h[al]||h[L]||e==="link"&&h.getAttribute("rel")==="stylesheet")&&h.namespaceURI!=="http://www.w3.org/2000/svg"){var m=h.getAttribute(t)||"";m=e+m;var y=a.get(m);y?y.push(h):a.set(m,[h])}}return a}function Gm(e,t,i){e=e.ownerDocument||e,e.head.insertBefore(i,t==="title"?e.querySelector("head > title"):null)}function l0(e,t,i){if(i===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;return t.rel==="stylesheet"?(e=t.disabled,typeof t.precedence=="string"&&e==null):!0;case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function Ym(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function o0(e,t,i,a){if(i.type==="stylesheet"&&(typeof a.media!="string"||matchMedia(a.media).matches!==!1)&&(i.state.loading&4)===0){if(i.instance===null){var u=Ga(a.href),h=t.querySelector(Ul(u));if(h){t=h._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=Tr.bind(e),t.then(e,e)),i.state.loading|=4,i.instance=h,Qt(h);return}h=t.ownerDocument||t,a=Um(a),(u=ni.get(u))&&mu(a,u),h=h.createElement("link"),Qt(h);var m=h;m._p=new Promise(function(y,C){m.onload=y,m.onerror=C}),dn(h,"link",a),i.instance=h}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(i,t),(t=i.state.preload)&&(i.state.loading&3)===0&&(e.count++,i=Tr.bind(e),t.addEventListener("load",i),t.addEventListener("error",i))}}var vu=0;function r0(e,t){return e.stylesheets&&e.count===0&&Rr(e,e.stylesheets),0<e.count||0<e.imgCount?function(i){var a=setTimeout(function(){if(e.stylesheets&&Rr(e,e.stylesheets),e.unsuspend){var h=e.unsuspend;e.unsuspend=null,h()}},6e4+t);0<e.imgBytes&&vu===0&&(vu=62500*Uy());var u=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Rr(e,e.stylesheets),e.unsuspend)){var h=e.unsuspend;e.unsuspend=null,h()}},(e.imgBytes>vu?50:800)+t);return e.unsuspend=i,function(){e.unsuspend=null,clearTimeout(a),clearTimeout(u)}}:null}function Tr(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Rr(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Or=null;function Rr(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Or=new Map,t.forEach(c0,e),Or=null,Tr.call(e))}function c0(e,t){if(!(t.state.loading&4)){var i=Or.get(e);if(i)var a=i.get(null);else{i=new Map,Or.set(e,i);for(var u=e.querySelectorAll("link[data-precedence],style[data-precedence]"),h=0;h<u.length;h++){var m=u[h];(m.nodeName==="LINK"||m.getAttribute("media")!=="not all")&&(i.set(m.dataset.precedence,m),a=m)}a&&i.set(null,a)}u=t.instance,m=u.getAttribute("data-precedence"),h=i.get(m)||a,h===a&&i.set(null,u),i.set(m,u),this.count++,a=Tr.bind(this),u.addEventListener("load",a),u.addEventListener("error",a),h?h.parentNode.insertBefore(u,h.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(u,e.firstChild)),t.state.loading|=4}}var Pl={$$typeof:ae,Provider:null,Consumer:null,_currentValue:le,_currentValue2:le,_threadCount:0};function d0(e,t,i,a,u,h,m,y,C){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Pn(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Pn(0),this.hiddenUpdates=Pn(null),this.identifierPrefix=a,this.onUncaughtError=u,this.onCaughtError=h,this.onRecoverableError=m,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=C,this.incompleteTransitions=new Map}function Km(e,t,i,a,u,h,m,y,C,D,P,X){return e=new d0(e,t,i,m,C,D,P,X,y),t=1,h===!0&&(t|=24),h=zn(3,null,null,t),e.current=h,h.stateNode=e,t=Qc(),t.refCount++,e.pooledCache=t,t.refCount++,h.memoizedState={element:a,isDehydrated:i,cache:t},ed(h),e}function Fm(e){return e?(e=wa,e):wa}function Xm(e,t,i,a,u,h){u=Fm(u),a.context===null?a.context=u:a.pendingContext=u,a=os(t),a.payload={element:i},h=h===void 0?null:h,h!==null&&(a.callback=h),i=rs(e,a,t),i!==null&&(Rn(i,e,t),Sl(i,e,t))}function Qm(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var i=e.retryLane;e.retryLane=i!==0&&i<t?i:t}}function bu(e,t){Qm(e,t),(e=e.alternate)&&Qm(e,t)}function Zm(e){if(e.tag===13||e.tag===31){var t=zs(e,67108864);t!==null&&Rn(t,e,67108864),bu(e,67108864)}}function Jm(e){if(e.tag===13||e.tag===31){var t=Vn();t=wt(t);var i=zs(e,t);i!==null&&Rn(i,e,t),bu(e,t)}}var Dr=!0;function u0(e,t,i,a){var u=A.T;A.T=null;var h=Y.p;try{Y.p=2,yu(e,t,i,a)}finally{Y.p=h,A.T=u}}function h0(e,t,i,a){var u=A.T;A.T=null;var h=Y.p;try{Y.p=8,yu(e,t,i,a)}finally{Y.p=h,A.T=u}}function yu(e,t,i,a){if(Dr){var u=xu(a);if(u===null)au(e,t,a,Mr,i),eg(e,a);else if(p0(u,e,t,i,a))a.stopPropagation();else if(eg(e,a),t&4&&-1<f0.indexOf(e)){for(;u!==null;){var h=ha(u);if(h!==null)switch(h.tag){case 3:if(h=h.stateNode,h.current.memoizedState.isDehydrated){var m=_n(h.pendingLanes);if(m!==0){var y=h;for(y.pendingLanes|=2,y.entangledLanes|=2;m;){var C=1<<31-Nt(m);y.entanglements[1]|=C,m&=~C}Ci(h),(Qe&6)===0&&(gr=Oe()+500,Bl(0))}}break;case 31:case 13:y=zs(h,2),y!==null&&Rn(y,h,2),br(),bu(h,2)}if(h=xu(a),h===null&&au(e,t,a,Mr,i),h===u)break;u=h}u!==null&&a.stopPropagation()}else au(e,t,a,null,i)}}function xu(e){return e=Sc(e),_u(e)}var Mr=null;function _u(e){if(Mr=null,e=ua(e),e!==null){var t=c(e);if(t===null)e=null;else{var i=t.tag;if(i===13){if(e=f(t),e!==null)return e;e=null}else if(i===31){if(e=p(t),e!==null)return e;e=null}else if(i===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return Mr=e,null}function Wm(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(xn()){case mt:return 2;case En:return 8;case an:case ci:return 32;case mn:return 268435456;default:return 32}default:return 32}}var Su=!1,ys=null,xs=null,_s=null,Gl=new Map,Yl=new Map,Ss=[],f0="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function eg(e,t){switch(e){case"focusin":case"focusout":ys=null;break;case"dragenter":case"dragleave":xs=null;break;case"mouseover":case"mouseout":_s=null;break;case"pointerover":case"pointerout":Gl.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Yl.delete(t.pointerId)}}function Kl(e,t,i,a,u,h){return e===null||e.nativeEvent!==h?(e={blockedOn:t,domEventName:i,eventSystemFlags:a,nativeEvent:h,targetContainers:[u]},t!==null&&(t=ha(t),t!==null&&Zm(t)),e):(e.eventSystemFlags|=a,t=e.targetContainers,u!==null&&t.indexOf(u)===-1&&t.push(u),e)}function p0(e,t,i,a,u){switch(t){case"focusin":return ys=Kl(ys,e,t,i,a,u),!0;case"dragenter":return xs=Kl(xs,e,t,i,a,u),!0;case"mouseover":return _s=Kl(_s,e,t,i,a,u),!0;case"pointerover":var h=u.pointerId;return Gl.set(h,Kl(Gl.get(h)||null,e,t,i,a,u)),!0;case"gotpointercapture":return h=u.pointerId,Yl.set(h,Kl(Yl.get(h)||null,e,t,i,a,u)),!0}return!1}function tg(e){var t=ua(e.target);if(t!==null){var i=c(t);if(i!==null){if(t=i.tag,t===13){if(t=f(i),t!==null){e.blockedOn=t,xi(e.priority,function(){Jm(i)});return}}else if(t===31){if(t=p(i),t!==null){e.blockedOn=t,xi(e.priority,function(){Jm(i)});return}}else if(t===3&&i.stateNode.current.memoizedState.isDehydrated){e.blockedOn=i.tag===3?i.stateNode.containerInfo:null;return}}}e.blockedOn=null}function zr(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var i=xu(e.nativeEvent);if(i===null){i=e.nativeEvent;var a=new i.constructor(i.type,i);_c=a,i.target.dispatchEvent(a),_c=null}else return t=ha(i),t!==null&&Zm(t),e.blockedOn=i,!1;t.shift()}return!0}function ng(e,t,i){zr(e)&&i.delete(t)}function m0(){Su=!1,ys!==null&&zr(ys)&&(ys=null),xs!==null&&zr(xs)&&(xs=null),_s!==null&&zr(_s)&&(_s=null),Gl.forEach(ng),Yl.forEach(ng)}function $r(e,t){e.blockedOn===t&&(e.blockedOn=null,Su||(Su=!0,o.unstable_scheduleCallback(o.unstable_NormalPriority,m0)))}var Lr=null;function ig(e){Lr!==e&&(Lr=e,o.unstable_scheduleCallback(o.unstable_NormalPriority,function(){Lr===e&&(Lr=null);for(var t=0;t<e.length;t+=3){var i=e[t],a=e[t+1],u=e[t+2];if(typeof a!="function"){if(_u(a||i)===null)continue;break}var h=ha(i);h!==null&&(e.splice(t,3),t-=3,xd(h,{pending:!0,data:u,method:i.method,action:a},a,u))}}))}function Ka(e){function t(C){return $r(C,e)}ys!==null&&$r(ys,e),xs!==null&&$r(xs,e),_s!==null&&$r(_s,e),Gl.forEach(t),Yl.forEach(t);for(var i=0;i<Ss.length;i++){var a=Ss[i];a.blockedOn===e&&(a.blockedOn=null)}for(;0<Ss.length&&(i=Ss[0],i.blockedOn===null);)tg(i),i.blockedOn===null&&Ss.shift();if(i=(e.ownerDocument||e).$$reactFormReplay,i!=null)for(a=0;a<i.length;a+=3){var u=i[a],h=i[a+1],m=u[he]||null;if(typeof h=="function")m||ig(i);else if(m){var y=null;if(h&&h.hasAttribute("formAction")){if(u=h,m=h[he]||null)y=m.formAction;else if(_u(u)!==null)continue}else y=m.action;typeof y=="function"?i[a+1]=y:(i.splice(a,3),a-=3),ig(i)}}}function sg(){function e(h){h.canIntercept&&h.info==="react-transition"&&h.intercept({handler:function(){return new Promise(function(m){return u=m})},focusReset:"manual",scroll:"manual"})}function t(){u!==null&&(u(),u=null),a||setTimeout(i,20)}function i(){if(!a&&!navigation.transition){var h=navigation.currentEntry;h&&h.url!=null&&navigation.navigate(h.url,{state:h.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var a=!1,u=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(i,100),function(){a=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),u!==null&&(u(),u=null)}}}function wu(e){this._internalRoot=e}Br.prototype.render=wu.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(l(409));var i=t.current,a=Vn();Xm(i,a,e,t,null,null)},Br.prototype.unmount=wu.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Xm(e.current,2,null,e,null,null),br(),t[kt]=null}};function Br(e){this._internalRoot=e}Br.prototype.unstable_scheduleHydration=function(e){if(e){var t=Gn();e={blockedOn:null,target:e,priority:t};for(var i=0;i<Ss.length&&t!==0&&t<Ss[i].priority;i++);Ss.splice(i,0,e),i===0&&tg(e)}};var ag=n.version;if(ag!=="19.2.4")throw Error(l(527,ag,"19.2.4"));Y.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(l(188)):(e=Object.keys(e).join(","),Error(l(268,e)));return e=g(t),e=e!==null?_(e):null,e=e===null?null:e.stateNode,e};var g0={bundleType:0,version:"19.2.4",rendererPackageName:"react-dom",currentDispatcherRef:A,reconcilerVersion:"19.2.4"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Hr=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Hr.isDisabled&&Hr.supportsFiber)try{gn=Hr.inject(g0),St=Hr}catch{}}return Xl.createRoot=function(e,t){if(!r(e))throw Error(l(299));var i=!1,a="",u=hp,h=fp,m=pp;return t!=null&&(t.unstable_strictMode===!0&&(i=!0),t.identifierPrefix!==void 0&&(a=t.identifierPrefix),t.onUncaughtError!==void 0&&(u=t.onUncaughtError),t.onCaughtError!==void 0&&(h=t.onCaughtError),t.onRecoverableError!==void 0&&(m=t.onRecoverableError)),t=Km(e,1,!1,null,null,i,a,null,u,h,m,sg),e[kt]=t.current,su(e),new wu(t)},Xl.hydrateRoot=function(e,t,i){if(!r(e))throw Error(l(299));var a=!1,u="",h=hp,m=fp,y=pp,C=null;return i!=null&&(i.unstable_strictMode===!0&&(a=!0),i.identifierPrefix!==void 0&&(u=i.identifierPrefix),i.onUncaughtError!==void 0&&(h=i.onUncaughtError),i.onCaughtError!==void 0&&(m=i.onCaughtError),i.onRecoverableError!==void 0&&(y=i.onRecoverableError),i.formState!==void 0&&(C=i.formState)),t=Km(e,1,!0,t,i??null,a,u,C,h,m,y,sg),t.context=Fm(null),i=t.current,a=Vn(),a=wt(a),u=os(a),u.callback=null,rs(i,u,a),i=a,t.current.lanes=i,ot(t,i),Ci(t),e[kt]=t.current,su(e),new Br(t)},Xl.version="19.2.4",Xl}var mg;function E0(){if(mg)return Nu.exports;mg=1;function o(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o)}catch(n){console.error(n)}}return o(),Nu.exports=C0(),Nu.exports}var gg=E0();const Ne=o=>typeof o=="string",Ql=()=>{let o,n;const s=new Promise((l,r)=>{o=l,n=r});return s.resolve=o,s.reject=n,s},vg=o=>o==null?"":""+o,N0=(o,n,s)=>{o.forEach(l=>{n[l]&&(s[l]=n[l])})},j0=/###/g,bg=o=>o&&o.indexOf("###")>-1?o.replace(j0,"."):o,yg=o=>!o||Ne(o),lo=(o,n,s)=>{const l=Ne(n)?n.split("."):n;let r=0;for(;r<l.length-1;){if(yg(o))return{};const c=bg(l[r]);!o[c]&&s&&(o[c]=new s),Object.prototype.hasOwnProperty.call(o,c)?o=o[c]:o={},++r}return yg(o)?{}:{obj:o,k:bg(l[r])}},xg=(o,n,s)=>{const{obj:l,k:r}=lo(o,n,Object);if(l!==void 0||n.length===1){l[r]=s;return}let c=n[n.length-1],f=n.slice(0,n.length-1),p=lo(o,f,Object);for(;p.obj===void 0&&f.length;)c=`${f[f.length-1]}.${c}`,f=f.slice(0,f.length-1),p=lo(o,f,Object),p?.obj&&typeof p.obj[`${p.k}.${c}`]<"u"&&(p.obj=void 0);p.obj[`${p.k}.${c}`]=s},A0=(o,n,s,l)=>{const{obj:r,k:c}=lo(o,n,Object);r[c]=r[c]||[],r[c].push(s)},Zr=(o,n)=>{const{obj:s,k:l}=lo(o,n);if(s&&Object.prototype.hasOwnProperty.call(s,l))return s[l]},k0=(o,n,s)=>{const l=Zr(o,s);return l!==void 0?l:Zr(n,s)},bv=(o,n,s)=>{for(const l in n)l!=="__proto__"&&l!=="constructor"&&(l in o?Ne(o[l])||o[l]instanceof String||Ne(n[l])||n[l]instanceof String?s&&(o[l]=n[l]):bv(o[l],n[l],s):o[l]=n[l]);return o},Fs=o=>o.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&");var T0={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"};const O0=o=>Ne(o)?o.replace(/[&<>"'\/]/g,n=>T0[n]):o;class R0{constructor(n){this.capacity=n,this.regExpMap=new Map,this.regExpQueue=[]}getRegExp(n){const s=this.regExpMap.get(n);if(s!==void 0)return s;const l=new RegExp(n);return this.regExpQueue.length===this.capacity&&this.regExpMap.delete(this.regExpQueue.shift()),this.regExpMap.set(n,l),this.regExpQueue.push(n),l}}const D0=[" ",",","?","!",";"],M0=new R0(20),z0=(o,n,s)=>{n=n||"",s=s||"";const l=D0.filter(f=>n.indexOf(f)<0&&s.indexOf(f)<0);if(l.length===0)return!0;const r=M0.getRegExp(`(${l.map(f=>f==="?"?"\\?":f).join("|")})`);let c=!r.test(o);if(!c){const f=o.indexOf(s);f>0&&!r.test(o.substring(0,f))&&(c=!0)}return c},qu=(o,n,s=".")=>{if(!o)return;if(o[n])return Object.prototype.hasOwnProperty.call(o,n)?o[n]:void 0;const l=n.split(s);let r=o;for(let c=0;c<l.length;){if(!r||typeof r!="object")return;let f,p="";for(let b=c;b<l.length;++b)if(b!==c&&(p+=s),p+=l[b],f=r[p],f!==void 0){if(["string","number","boolean"].indexOf(typeof f)>-1&&b<l.length-1)continue;c+=b-c+1;break}r=f}return r},ho=o=>o?.replace(/_/g,"-"),$0={type:"logger",log(o){this.output("log",o)},warn(o){this.output("warn",o)},error(o){this.output("error",o)},output(o,n){console?.[o]?.apply?.(console,n)}};class Jr{constructor(n,s={}){this.init(n,s)}init(n,s={}){this.prefix=s.prefix||"i18next:",this.logger=n||$0,this.options=s,this.debug=s.debug}log(...n){return this.forward(n,"log","",!0)}warn(...n){return this.forward(n,"warn","",!0)}error(...n){return this.forward(n,"error","")}deprecate(...n){return this.forward(n,"warn","WARNING DEPRECATED: ",!0)}forward(n,s,l,r){return r&&!this.debug?null:(Ne(n[0])&&(n[0]=`${l}${this.prefix} ${n[0]}`),this.logger[s](n))}create(n){return new Jr(this.logger,{prefix:`${this.prefix}:${n}:`,...this.options})}clone(n){return n=n||this.options,n.prefix=n.prefix||this.prefix,new Jr(this.logger,n)}}var Ni=new Jr;class rc{constructor(){this.observers={}}on(n,s){return n.split(" ").forEach(l=>{this.observers[l]||(this.observers[l]=new Map);const r=this.observers[l].get(s)||0;this.observers[l].set(s,r+1)}),this}off(n,s){if(this.observers[n]){if(!s){delete this.observers[n];return}this.observers[n].delete(s)}}emit(n,...s){this.observers[n]&&Array.from(this.observers[n].entries()).forEach(([r,c])=>{for(let f=0;f<c;f++)r(...s)}),this.observers["*"]&&Array.from(this.observers["*"].entries()).forEach(([r,c])=>{for(let f=0;f<c;f++)r.apply(r,[n,...s])})}}class _g extends rc{constructor(n,s={ns:["translation"],defaultNS:"translation"}){super(),this.data=n||{},this.options=s,this.options.keySeparator===void 0&&(this.options.keySeparator="."),this.options.ignoreJSONStructure===void 0&&(this.options.ignoreJSONStructure=!0)}addNamespaces(n){this.options.ns.indexOf(n)<0&&this.options.ns.push(n)}removeNamespaces(n){const s=this.options.ns.indexOf(n);s>-1&&this.options.ns.splice(s,1)}getResource(n,s,l,r={}){const c=r.keySeparator!==void 0?r.keySeparator:this.options.keySeparator,f=r.ignoreJSONStructure!==void 0?r.ignoreJSONStructure:this.options.ignoreJSONStructure;let p;n.indexOf(".")>-1?p=n.split("."):(p=[n,s],l&&(Array.isArray(l)?p.push(...l):Ne(l)&&c?p.push(...l.split(c)):p.push(l)));const b=Zr(this.data,p);return!b&&!s&&!l&&n.indexOf(".")>-1&&(n=p[0],s=p[1],l=p.slice(2).join(".")),b||!f||!Ne(l)?b:qu(this.data?.[n]?.[s],l,c)}addResource(n,s,l,r,c={silent:!1}){const f=c.keySeparator!==void 0?c.keySeparator:this.options.keySeparator;let p=[n,s];l&&(p=p.concat(f?l.split(f):l)),n.indexOf(".")>-1&&(p=n.split("."),r=s,s=p[1]),this.addNamespaces(s),xg(this.data,p,r),c.silent||this.emit("added",n,s,l,r)}addResources(n,s,l,r={silent:!1}){for(const c in l)(Ne(l[c])||Array.isArray(l[c]))&&this.addResource(n,s,c,l[c],{silent:!0});r.silent||this.emit("added",n,s,l)}addResourceBundle(n,s,l,r,c,f={silent:!1,skipCopy:!1}){let p=[n,s];n.indexOf(".")>-1&&(p=n.split("."),r=l,l=s,s=p[1]),this.addNamespaces(s);let b=Zr(this.data,p)||{};f.skipCopy||(l=JSON.parse(JSON.stringify(l))),r?bv(b,l,c):b={...b,...l},xg(this.data,p,b),f.silent||this.emit("added",n,s,l)}removeResourceBundle(n,s){this.hasResourceBundle(n,s)&&delete this.data[n][s],this.removeNamespaces(s),this.emit("removed",n,s)}hasResourceBundle(n,s){return this.getResource(n,s)!==void 0}getResourceBundle(n,s){return s||(s=this.options.defaultNS),this.getResource(n,s)}getDataByLanguage(n){return this.data[n]}hasLanguageSomeTranslations(n){const s=this.getDataByLanguage(n);return!!(s&&Object.keys(s)||[]).find(r=>s[r]&&Object.keys(s[r]).length>0)}toJSON(){return this.data}}var yv={processors:{},addPostProcessor(o){this.processors[o.name]=o},handle(o,n,s,l,r){return o.forEach(c=>{n=this.processors[c]?.process(n,s,l,r)??n}),n}};const xv=Symbol("i18next/PATH_KEY");function L0(){const o=[],n=Object.create(null);let s;return n.get=(l,r)=>(s?.revoke?.(),r===xv?o:(o.push(r),s=Proxy.revocable(l,n),s.proxy)),Proxy.revocable(Object.create(null),n).proxy}function oo(o,n){const{[xv]:s}=o(L0()),l=n?.keySeparator??".",r=n?.nsSeparator??":";if(s.length>1&&r){const c=n?.ns;if((c?Array.isArray(c)?c:[c]:[]).includes(s[0]))return`${s[0]}${r}${s.slice(1).join(l)}`}return s.join(l)}const Sg={},Tu=o=>!Ne(o)&&typeof o!="boolean"&&typeof o!="number";class Wr extends rc{constructor(n,s={}){super(),N0(["resourceStore","languageUtils","pluralResolver","interpolator","backendConnector","i18nFormat","utils"],n,this),this.options=s,this.options.keySeparator===void 0&&(this.options.keySeparator="."),this.logger=Ni.create("translator")}changeLanguage(n){n&&(this.language=n)}exists(n,s={interpolation:{}}){const l={...s};if(n==null)return!1;const r=this.resolve(n,l);if(r?.res===void 0)return!1;const c=Tu(r.res);return!(l.returnObjects===!1&&c)}extractFromKey(n,s){let l=s.nsSeparator!==void 0?s.nsSeparator:this.options.nsSeparator;l===void 0&&(l=":");const r=s.keySeparator!==void 0?s.keySeparator:this.options.keySeparator;let c=s.ns||this.options.defaultNS||[];const f=l&&n.indexOf(l)>-1,p=!this.options.userDefinedKeySeparator&&!s.keySeparator&&!this.options.userDefinedNsSeparator&&!s.nsSeparator&&!z0(n,l,r);if(f&&!p){const b=n.match(this.interpolator.nestingRegexp);if(b&&b.length>0)return{key:n,namespaces:Ne(c)?[c]:c};const g=n.split(l);(l!==r||l===r&&this.options.ns.indexOf(g[0])>-1)&&(c=g.shift()),n=g.join(r)}return{key:n,namespaces:Ne(c)?[c]:c}}translate(n,s,l){let r=typeof s=="object"?{...s}:s;if(typeof r!="object"&&this.options.overloadTranslationOptionHandler&&(r=this.options.overloadTranslationOptionHandler(arguments)),typeof r=="object"&&(r={...r}),r||(r={}),n==null)return"";typeof n=="function"&&(n=oo(n,{...this.options,...r})),Array.isArray(n)||(n=[String(n)]),n=n.map(ce=>typeof ce=="function"?oo(ce,{...this.options,...r}):String(ce));const c=r.returnDetails!==void 0?r.returnDetails:this.options.returnDetails,f=r.keySeparator!==void 0?r.keySeparator:this.options.keySeparator,{key:p,namespaces:b}=this.extractFromKey(n[n.length-1],r),g=b[b.length-1];let _=r.nsSeparator!==void 0?r.nsSeparator:this.options.nsSeparator;_===void 0&&(_=":");const v=r.lng||this.language,k=r.appendNamespaceToCIMode||this.options.appendNamespaceToCIMode;if(v?.toLowerCase()==="cimode")return k?c?{res:`${g}${_}${p}`,usedKey:p,exactUsedKey:p,usedLng:v,usedNS:g,usedParams:this.getUsedParamsDetails(r)}:`${g}${_}${p}`:c?{res:p,usedKey:p,exactUsedKey:p,usedLng:v,usedNS:g,usedParams:this.getUsedParamsDetails(r)}:p;const E=this.resolve(n,r);let O=E?.res;const V=E?.usedKey||p,se=E?.exactUsedKey||p,ee=["[object Number]","[object Function]","[object RegExp]"],oe=r.joinArrays!==void 0?r.joinArrays:this.options.joinArrays,ae=!this.i18nFormat||this.i18nFormat.handleAsObject,de=r.count!==void 0&&!Ne(r.count),J=Wr.hasDefaultValue(r),$=de?this.pluralResolver.getSuffix(v,r.count,r):"",S=r.ordinal&&de?this.pluralResolver.getSuffix(v,r.count,{ordinal:!1}):"",I=de&&!r.ordinal&&r.count===0,z=I&&r[`defaultValue${this.options.pluralSeparator}zero`]||r[`defaultValue${$}`]||r[`defaultValue${S}`]||r.defaultValue;let W=O;ae&&!O&&J&&(W=z);const Q=Tu(W),ue=Object.prototype.toString.apply(W);if(ae&&W&&Q&&ee.indexOf(ue)<0&&!(Ne(oe)&&Array.isArray(W))){if(!r.returnObjects&&!this.options.returnObjects){this.options.returnedObjectHandler||this.logger.warn("accessing an object - but returnObjects options is not enabled!");const ce=this.options.returnedObjectHandler?this.options.returnedObjectHandler(V,W,{...r,ns:b}):`key '${p} (${this.language})' returned an object instead of string.`;return c?(E.res=ce,E.usedParams=this.getUsedParamsDetails(r),E):ce}if(f){const ce=Array.isArray(W),pe=ce?[]:{},ne=ce?se:V;for(const A in W)if(Object.prototype.hasOwnProperty.call(W,A)){const Y=`${ne}${f}${A}`;J&&!O?pe[A]=this.translate(Y,{...r,defaultValue:Tu(z)?z[A]:void 0,joinArrays:!1,ns:b}):pe[A]=this.translate(Y,{...r,joinArrays:!1,ns:b}),pe[A]===Y&&(pe[A]=W[A])}O=pe}}else if(ae&&Ne(oe)&&Array.isArray(O))O=O.join(oe),O&&(O=this.extendTranslation(O,n,r,l));else{let ce=!1,pe=!1;!this.isValidLookup(O)&&J&&(ce=!0,O=z),this.isValidLookup(O)||(pe=!0,O=p);const A=(r.missingKeyNoValueFallbackToKey||this.options.missingKeyNoValueFallbackToKey)&&pe?void 0:O,Y=J&&z!==O&&this.options.updateMissing;if(pe||ce||Y){if(this.logger.log(Y?"updateKey":"missingKey",v,g,p,Y?z:O),f){const w=this.resolve(p,{...r,keySeparator:!1});w&&w.res&&this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.")}let le=[];const ve=this.languageUtils.getFallbackCodes(this.options.fallbackLng,r.lng||this.language);if(this.options.saveMissingTo==="fallback"&&ve&&ve[0])for(let w=0;w<ve.length;w++)le.push(ve[w]);else this.options.saveMissingTo==="all"?le=this.languageUtils.toResolveHierarchy(r.lng||this.language):le.push(r.lng||this.language);const be=(w,H,U)=>{const Z=J&&U!==O?U:A;this.options.missingKeyHandler?this.options.missingKeyHandler(w,g,H,Z,Y,r):this.backendConnector?.saveMissing&&this.backendConnector.saveMissing(w,g,H,Z,Y,r),this.emit("missingKey",w,g,H,O)};this.options.saveMissing&&(this.options.saveMissingPlurals&&de?le.forEach(w=>{const H=this.pluralResolver.getSuffixes(w,r);I&&r[`defaultValue${this.options.pluralSeparator}zero`]&&H.indexOf(`${this.options.pluralSeparator}zero`)<0&&H.push(`${this.options.pluralSeparator}zero`),H.forEach(U=>{be([w],p+U,r[`defaultValue${U}`]||z)})}):be(le,p,z))}O=this.extendTranslation(O,n,r,E,l),pe&&O===p&&this.options.appendNamespaceToMissingKey&&(O=`${g}${_}${p}`),(pe||ce)&&this.options.parseMissingKeyHandler&&(O=this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey?`${g}${_}${p}`:p,ce?O:void 0,r))}return c?(E.res=O,E.usedParams=this.getUsedParamsDetails(r),E):O}extendTranslation(n,s,l,r,c){if(this.i18nFormat?.parse)n=this.i18nFormat.parse(n,{...this.options.interpolation.defaultVariables,...l},l.lng||this.language||r.usedLng,r.usedNS,r.usedKey,{resolved:r});else if(!l.skipInterpolation){l.interpolation&&this.interpolator.init({...l,interpolation:{...this.options.interpolation,...l.interpolation}});const b=Ne(n)&&(l?.interpolation?.skipOnVariables!==void 0?l.interpolation.skipOnVariables:this.options.interpolation.skipOnVariables);let g;if(b){const v=n.match(this.interpolator.nestingRegexp);g=v&&v.length}let _=l.replace&&!Ne(l.replace)?l.replace:l;if(this.options.interpolation.defaultVariables&&(_={...this.options.interpolation.defaultVariables,..._}),n=this.interpolator.interpolate(n,_,l.lng||this.language||r.usedLng,l),b){const v=n.match(this.interpolator.nestingRegexp),k=v&&v.length;g<k&&(l.nest=!1)}!l.lng&&r&&r.res&&(l.lng=this.language||r.usedLng),l.nest!==!1&&(n=this.interpolator.nest(n,(...v)=>c?.[0]===v[0]&&!l.context?(this.logger.warn(`It seems you are nesting recursively key: ${v[0]} in key: ${s[0]}`),null):this.translate(...v,s),l)),l.interpolation&&this.interpolator.reset()}const f=l.postProcess||this.options.postProcess,p=Ne(f)?[f]:f;return n!=null&&p?.length&&l.applyPostProcessor!==!1&&(n=yv.handle(p,n,s,this.options&&this.options.postProcessPassResolved?{i18nResolved:{...r,usedParams:this.getUsedParamsDetails(l)},...l}:l,this)),n}resolve(n,s={}){let l,r,c,f,p;return Ne(n)&&(n=[n]),Array.isArray(n)&&(n=n.map(b=>typeof b=="function"?oo(b,{...this.options,...s}):b)),n.forEach(b=>{if(this.isValidLookup(l))return;const g=this.extractFromKey(b,s),_=g.key;r=_;let v=g.namespaces;this.options.fallbackNS&&(v=v.concat(this.options.fallbackNS));const k=s.count!==void 0&&!Ne(s.count),E=k&&!s.ordinal&&s.count===0,O=s.context!==void 0&&(Ne(s.context)||typeof s.context=="number")&&s.context!=="",V=s.lngs?s.lngs:this.languageUtils.toResolveHierarchy(s.lng||this.language,s.fallbackLng);v.forEach(se=>{this.isValidLookup(l)||(p=se,!Sg[`${V[0]}-${se}`]&&this.utils?.hasLoadedNamespace&&!this.utils?.hasLoadedNamespace(p)&&(Sg[`${V[0]}-${se}`]=!0,this.logger.warn(`key "${r}" for languages "${V.join(", ")}" won't get resolved as namespace "${p}" was not yet loaded`,"This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")),V.forEach(ee=>{if(this.isValidLookup(l))return;f=ee;const oe=[_];if(this.i18nFormat?.addLookupKeys)this.i18nFormat.addLookupKeys(oe,_,ee,se,s);else{let de;k&&(de=this.pluralResolver.getSuffix(ee,s.count,s));const J=`${this.options.pluralSeparator}zero`,$=`${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;if(k&&(s.ordinal&&de.indexOf($)===0&&oe.push(_+de.replace($,this.options.pluralSeparator)),oe.push(_+de),E&&oe.push(_+J)),O){const S=`${_}${this.options.contextSeparator||"_"}${s.context}`;oe.push(S),k&&(s.ordinal&&de.indexOf($)===0&&oe.push(S+de.replace($,this.options.pluralSeparator)),oe.push(S+de),E&&oe.push(S+J))}}let ae;for(;ae=oe.pop();)this.isValidLookup(l)||(c=ae,l=this.getResource(ee,se,ae,s))}))})}),{res:l,usedKey:r,exactUsedKey:c,usedLng:f,usedNS:p}}isValidLookup(n){return n!==void 0&&!(!this.options.returnNull&&n===null)&&!(!this.options.returnEmptyString&&n==="")}getResource(n,s,l,r={}){return this.i18nFormat?.getResource?this.i18nFormat.getResource(n,s,l,r):this.resourceStore.getResource(n,s,l,r)}getUsedParamsDetails(n={}){const s=["defaultValue","ordinal","context","replace","lng","lngs","fallbackLng","ns","keySeparator","nsSeparator","returnObjects","returnDetails","joinArrays","postProcess","interpolation"],l=n.replace&&!Ne(n.replace);let r=l?n.replace:n;if(l&&typeof n.count<"u"&&(r.count=n.count),this.options.interpolation.defaultVariables&&(r={...this.options.interpolation.defaultVariables,...r}),!l){r={...r};for(const c of s)delete r[c]}return r}static hasDefaultValue(n){const s="defaultValue";for(const l in n)if(Object.prototype.hasOwnProperty.call(n,l)&&s===l.substring(0,s.length)&&n[l]!==void 0)return!0;return!1}}class wg{constructor(n){this.options=n,this.supportedLngs=this.options.supportedLngs||!1,this.logger=Ni.create("languageUtils")}getScriptPartFromCode(n){if(n=ho(n),!n||n.indexOf("-")<0)return null;const s=n.split("-");return s.length===2||(s.pop(),s[s.length-1].toLowerCase()==="x")?null:this.formatLanguageCode(s.join("-"))}getLanguagePartFromCode(n){if(n=ho(n),!n||n.indexOf("-")<0)return n;const s=n.split("-");return this.formatLanguageCode(s[0])}formatLanguageCode(n){if(Ne(n)&&n.indexOf("-")>-1){let s;try{s=Intl.getCanonicalLocales(n)[0]}catch{}return s&&this.options.lowerCaseLng&&(s=s.toLowerCase()),s||(this.options.lowerCaseLng?n.toLowerCase():n)}return this.options.cleanCode||this.options.lowerCaseLng?n.toLowerCase():n}isSupportedCode(n){return(this.options.load==="languageOnly"||this.options.nonExplicitSupportedLngs)&&(n=this.getLanguagePartFromCode(n)),!this.supportedLngs||!this.supportedLngs.length||this.supportedLngs.indexOf(n)>-1}getBestMatchFromCodes(n){if(!n)return null;let s;return n.forEach(l=>{if(s)return;const r=this.formatLanguageCode(l);(!this.options.supportedLngs||this.isSupportedCode(r))&&(s=r)}),!s&&this.options.supportedLngs&&n.forEach(l=>{if(s)return;const r=this.getScriptPartFromCode(l);if(this.isSupportedCode(r))return s=r;const c=this.getLanguagePartFromCode(l);if(this.isSupportedCode(c))return s=c;s=this.options.supportedLngs.find(f=>{if(f===c)return f;if(!(f.indexOf("-")<0&&c.indexOf("-")<0)&&(f.indexOf("-")>0&&c.indexOf("-")<0&&f.substring(0,f.indexOf("-"))===c||f.indexOf(c)===0&&c.length>1))return f})}),s||(s=this.getFallbackCodes(this.options.fallbackLng)[0]),s}getFallbackCodes(n,s){if(!n)return[];if(typeof n=="function"&&(n=n(s)),Ne(n)&&(n=[n]),Array.isArray(n))return n;if(!s)return n.default||[];let l=n[s];return l||(l=n[this.getScriptPartFromCode(s)]),l||(l=n[this.formatLanguageCode(s)]),l||(l=n[this.getLanguagePartFromCode(s)]),l||(l=n.default),l||[]}toResolveHierarchy(n,s){const l=this.getFallbackCodes((s===!1?[]:s)||this.options.fallbackLng||[],n),r=[],c=f=>{f&&(this.isSupportedCode(f)?r.push(f):this.logger.warn(`rejecting language code not found in supportedLngs: ${f}`))};return Ne(n)&&(n.indexOf("-")>-1||n.indexOf("_")>-1)?(this.options.load!=="languageOnly"&&c(this.formatLanguageCode(n)),this.options.load!=="languageOnly"&&this.options.load!=="currentOnly"&&c(this.getScriptPartFromCode(n)),this.options.load!=="currentOnly"&&c(this.getLanguagePartFromCode(n))):Ne(n)&&c(this.formatLanguageCode(n)),l.forEach(f=>{r.indexOf(f)<0&&c(this.formatLanguageCode(f))}),r}}const Cg={zero:0,one:1,two:2,few:3,many:4,other:5},Eg={select:o=>o===1?"one":"other",resolvedOptions:()=>({pluralCategories:["one","other"]})};class B0{constructor(n,s={}){this.languageUtils=n,this.options=s,this.logger=Ni.create("pluralResolver"),this.pluralRulesCache={}}clearCache(){this.pluralRulesCache={}}getRule(n,s={}){const l=ho(n==="dev"?"en":n),r=s.ordinal?"ordinal":"cardinal",c=JSON.stringify({cleanedCode:l,type:r});if(c in this.pluralRulesCache)return this.pluralRulesCache[c];let f;try{f=new Intl.PluralRules(l,{type:r})}catch{if(typeof Intl>"u")return this.logger.error("No Intl support, please use an Intl polyfill!"),Eg;if(!n.match(/-|_/))return Eg;const b=this.languageUtils.getLanguagePartFromCode(n);f=this.getRule(b,s)}return this.pluralRulesCache[c]=f,f}needsPlural(n,s={}){let l=this.getRule(n,s);return l||(l=this.getRule("dev",s)),l?.resolvedOptions().pluralCategories.length>1}getPluralFormsOfKey(n,s,l={}){return this.getSuffixes(n,l).map(r=>`${s}${r}`)}getSuffixes(n,s={}){let l=this.getRule(n,s);return l||(l=this.getRule("dev",s)),l?l.resolvedOptions().pluralCategories.sort((r,c)=>Cg[r]-Cg[c]).map(r=>`${this.options.prepend}${s.ordinal?`ordinal${this.options.prepend}`:""}${r}`):[]}getSuffix(n,s,l={}){const r=this.getRule(n,l);return r?`${this.options.prepend}${l.ordinal?`ordinal${this.options.prepend}`:""}${r.select(s)}`:(this.logger.warn(`no plural rule found for: ${n}`),this.getSuffix("dev",s,l))}}const Ng=(o,n,s,l=".",r=!0)=>{let c=k0(o,n,s);return!c&&r&&Ne(s)&&(c=qu(o,s,l),c===void 0&&(c=qu(n,s,l))),c},Ou=o=>o.replace(/\$/g,"$$$$");class jg{constructor(n={}){this.logger=Ni.create("interpolator"),this.options=n,this.format=n?.interpolation?.format||(s=>s),this.init(n)}init(n={}){n.interpolation||(n.interpolation={escapeValue:!0});const{escape:s,escapeValue:l,useRawValueToEscape:r,prefix:c,prefixEscaped:f,suffix:p,suffixEscaped:b,formatSeparator:g,unescapeSuffix:_,unescapePrefix:v,nestingPrefix:k,nestingPrefixEscaped:E,nestingSuffix:O,nestingSuffixEscaped:V,nestingOptionsSeparator:se,maxReplaces:ee,alwaysFormat:oe}=n.interpolation;this.escape=s!==void 0?s:O0,this.escapeValue=l!==void 0?l:!0,this.useRawValueToEscape=r!==void 0?r:!1,this.prefix=c?Fs(c):f||"{{",this.suffix=p?Fs(p):b||"}}",this.formatSeparator=g||",",this.unescapePrefix=_?"":v||"-",this.unescapeSuffix=this.unescapePrefix?"":_||"",this.nestingPrefix=k?Fs(k):E||Fs("$t("),this.nestingSuffix=O?Fs(O):V||Fs(")"),this.nestingOptionsSeparator=se||",",this.maxReplaces=ee||1e3,this.alwaysFormat=oe!==void 0?oe:!1,this.resetRegExp()}reset(){this.options&&this.init(this.options)}resetRegExp(){const n=(s,l)=>s?.source===l?(s.lastIndex=0,s):new RegExp(l,"g");this.regexp=n(this.regexp,`${this.prefix}(.+?)${this.suffix}`),this.regexpUnescape=n(this.regexpUnescape,`${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`),this.nestingRegexp=n(this.nestingRegexp,`${this.nestingPrefix}((?:[^()"']+|"[^"]*"|'[^']*'|\\((?:[^()]|"[^"]*"|'[^']*')*\\))*?)${this.nestingSuffix}`)}interpolate(n,s,l,r){let c,f,p;const b=this.options&&this.options.interpolation&&this.options.interpolation.defaultVariables||{},g=E=>{if(E.indexOf(this.formatSeparator)<0){const ee=Ng(s,b,E,this.options.keySeparator,this.options.ignoreJSONStructure);return this.alwaysFormat?this.format(ee,void 0,l,{...r,...s,interpolationkey:E}):ee}const O=E.split(this.formatSeparator),V=O.shift().trim(),se=O.join(this.formatSeparator).trim();return this.format(Ng(s,b,V,this.options.keySeparator,this.options.ignoreJSONStructure),se,l,{...r,...s,interpolationkey:V})};this.resetRegExp();const _=r?.missingInterpolationHandler||this.options.missingInterpolationHandler,v=r?.interpolation?.skipOnVariables!==void 0?r.interpolation.skipOnVariables:this.options.interpolation.skipOnVariables;return[{regex:this.regexpUnescape,safeValue:E=>Ou(E)},{regex:this.regexp,safeValue:E=>this.escapeValue?Ou(this.escape(E)):Ou(E)}].forEach(E=>{for(p=0;c=E.regex.exec(n);){const O=c[1].trim();if(f=g(O),f===void 0)if(typeof _=="function"){const se=_(n,c,r);f=Ne(se)?se:""}else if(r&&Object.prototype.hasOwnProperty.call(r,O))f="";else if(v){f=c[0];continue}else this.logger.warn(`missed to pass in variable ${O} for interpolating ${n}`),f="";else!Ne(f)&&!this.useRawValueToEscape&&(f=vg(f));const V=E.safeValue(f);if(n=n.replace(c[0],V),v?(E.regex.lastIndex+=f.length,E.regex.lastIndex-=c[0].length):E.regex.lastIndex=0,p++,p>=this.maxReplaces)break}}),n}nest(n,s,l={}){let r,c,f;const p=(b,g)=>{const _=this.nestingOptionsSeparator;if(b.indexOf(_)<0)return b;const v=b.split(new RegExp(`${Fs(_)}[ ]*{`));let k=`{${v[1]}`;b=v[0],k=this.interpolate(k,f);const E=k.match(/'/g),O=k.match(/"/g);((E?.length??0)%2===0&&!O||(O?.length??0)%2!==0)&&(k=k.replace(/'/g,'"'));try{f=JSON.parse(k),g&&(f={...g,...f})}catch(V){return this.logger.warn(`failed parsing options string in nesting for key ${b}`,V),`${b}${_}${k}`}return f.defaultValue&&f.defaultValue.indexOf(this.prefix)>-1&&delete f.defaultValue,b};for(;r=this.nestingRegexp.exec(n);){let b=[];f={...l},f=f.replace&&!Ne(f.replace)?f.replace:f,f.applyPostProcessor=!1,delete f.defaultValue;const g=/{.*}/.test(r[1])?r[1].lastIndexOf("}")+1:r[1].indexOf(this.formatSeparator);if(g!==-1&&(b=r[1].slice(g).split(this.formatSeparator).map(_=>_.trim()).filter(Boolean),r[1]=r[1].slice(0,g)),c=s(p.call(this,r[1].trim(),f),f),c&&r[0]===n&&!Ne(c))return c;Ne(c)||(c=vg(c)),c||(this.logger.warn(`missed to resolve ${r[1]} for nesting ${n}`),c=""),b.length&&(c=b.reduce((_,v)=>this.format(_,v,l.lng,{...l,interpolationkey:r[1].trim()}),c.trim())),n=n.replace(r[0],c),this.regexp.lastIndex=0}return n}}const H0=o=>{let n=o.toLowerCase().trim();const s={};if(o.indexOf("(")>-1){const l=o.split("(");n=l[0].toLowerCase().trim();const r=l[1].substring(0,l[1].length-1);n==="currency"&&r.indexOf(":")<0?s.currency||(s.currency=r.trim()):n==="relativetime"&&r.indexOf(":")<0?s.range||(s.range=r.trim()):r.split(";").forEach(f=>{if(f){const[p,...b]=f.split(":"),g=b.join(":").trim().replace(/^'+|'+$/g,""),_=p.trim();s[_]||(s[_]=g),g==="false"&&(s[_]=!1),g==="true"&&(s[_]=!0),isNaN(g)||(s[_]=parseInt(g,10))}})}return{formatName:n,formatOptions:s}},Ag=o=>{const n={};return(s,l,r)=>{let c=r;r&&r.interpolationkey&&r.formatParams&&r.formatParams[r.interpolationkey]&&r[r.interpolationkey]&&(c={...c,[r.interpolationkey]:void 0});const f=l+JSON.stringify(c);let p=n[f];return p||(p=o(ho(l),r),n[f]=p),p(s)}},V0=o=>(n,s,l)=>o(ho(s),l)(n);class I0{constructor(n={}){this.logger=Ni.create("formatter"),this.options=n,this.init(n)}init(n,s={interpolation:{}}){this.formatSeparator=s.interpolation.formatSeparator||",";const l=s.cacheInBuiltFormats?Ag:V0;this.formats={number:l((r,c)=>{const f=new Intl.NumberFormat(r,{...c});return p=>f.format(p)}),currency:l((r,c)=>{const f=new Intl.NumberFormat(r,{...c,style:"currency"});return p=>f.format(p)}),datetime:l((r,c)=>{const f=new Intl.DateTimeFormat(r,{...c});return p=>f.format(p)}),relativetime:l((r,c)=>{const f=new Intl.RelativeTimeFormat(r,{...c});return p=>f.format(p,c.range||"day")}),list:l((r,c)=>{const f=new Intl.ListFormat(r,{...c});return p=>f.format(p)})}}add(n,s){this.formats[n.toLowerCase().trim()]=s}addCached(n,s){this.formats[n.toLowerCase().trim()]=Ag(s)}format(n,s,l,r={}){const c=s.split(this.formatSeparator);if(c.length>1&&c[0].indexOf("(")>1&&c[0].indexOf(")")<0&&c.find(p=>p.indexOf(")")>-1)){const p=c.findIndex(b=>b.indexOf(")")>-1);c[0]=[c[0],...c.splice(1,p)].join(this.formatSeparator)}return c.reduce((p,b)=>{const{formatName:g,formatOptions:_}=H0(b);if(this.formats[g]){let v=p;try{const k=r?.formatParams?.[r.interpolationkey]||{},E=k.locale||k.lng||r.locale||r.lng||l;v=this.formats[g](p,E,{..._,...r,...k})}catch(k){this.logger.warn(k)}return v}else this.logger.warn(`there was no format function for ${g}`);return p},n)}}const U0=(o,n)=>{o.pending[n]!==void 0&&(delete o.pending[n],o.pendingCount--)};class q0 extends rc{constructor(n,s,l,r={}){super(),this.backend=n,this.store=s,this.services=l,this.languageUtils=l.languageUtils,this.options=r,this.logger=Ni.create("backendConnector"),this.waitingReads=[],this.maxParallelReads=r.maxParallelReads||10,this.readingCalls=0,this.maxRetries=r.maxRetries>=0?r.maxRetries:5,this.retryTimeout=r.retryTimeout>=1?r.retryTimeout:350,this.state={},this.queue=[],this.backend?.init?.(l,r.backend,r)}queueLoad(n,s,l,r){const c={},f={},p={},b={};return n.forEach(g=>{let _=!0;s.forEach(v=>{const k=`${g}|${v}`;!l.reload&&this.store.hasResourceBundle(g,v)?this.state[k]=2:this.state[k]<0||(this.state[k]===1?f[k]===void 0&&(f[k]=!0):(this.state[k]=1,_=!1,f[k]===void 0&&(f[k]=!0),c[k]===void 0&&(c[k]=!0),b[v]===void 0&&(b[v]=!0)))}),_||(p[g]=!0)}),(Object.keys(c).length||Object.keys(f).length)&&this.queue.push({pending:f,pendingCount:Object.keys(f).length,loaded:{},errors:[],callback:r}),{toLoad:Object.keys(c),pending:Object.keys(f),toLoadLanguages:Object.keys(p),toLoadNamespaces:Object.keys(b)}}loaded(n,s,l){const r=n.split("|"),c=r[0],f=r[1];s&&this.emit("failedLoading",c,f,s),!s&&l&&this.store.addResourceBundle(c,f,l,void 0,void 0,{skipCopy:!0}),this.state[n]=s?-1:2,s&&l&&(this.state[n]=0);const p={};this.queue.forEach(b=>{A0(b.loaded,[c],f),U0(b,n),s&&b.errors.push(s),b.pendingCount===0&&!b.done&&(Object.keys(b.loaded).forEach(g=>{p[g]||(p[g]={});const _=b.loaded[g];_.length&&_.forEach(v=>{p[g][v]===void 0&&(p[g][v]=!0)})}),b.done=!0,b.errors.length?b.callback(b.errors):b.callback())}),this.emit("loaded",p),this.queue=this.queue.filter(b=>!b.done)}read(n,s,l,r=0,c=this.retryTimeout,f){if(!n.length)return f(null,{});if(this.readingCalls>=this.maxParallelReads){this.waitingReads.push({lng:n,ns:s,fcName:l,tried:r,wait:c,callback:f});return}this.readingCalls++;const p=(g,_)=>{if(this.readingCalls--,this.waitingReads.length>0){const v=this.waitingReads.shift();this.read(v.lng,v.ns,v.fcName,v.tried,v.wait,v.callback)}if(g&&_&&r<this.maxRetries){setTimeout(()=>{this.read.call(this,n,s,l,r+1,c*2,f)},c);return}f(g,_)},b=this.backend[l].bind(this.backend);if(b.length===2){try{const g=b(n,s);g&&typeof g.then=="function"?g.then(_=>p(null,_)).catch(p):p(null,g)}catch(g){p(g)}return}return b(n,s,p)}prepareLoading(n,s,l={},r){if(!this.backend)return this.logger.warn("No backend was added via i18next.use. Will not load resources."),r&&r();Ne(n)&&(n=this.languageUtils.toResolveHierarchy(n)),Ne(s)&&(s=[s]);const c=this.queueLoad(n,s,l,r);if(!c.toLoad.length)return c.pending.length||r(),null;c.toLoad.forEach(f=>{this.loadOne(f)})}load(n,s,l){this.prepareLoading(n,s,{},l)}reload(n,s,l){this.prepareLoading(n,s,{reload:!0},l)}loadOne(n,s=""){const l=n.split("|"),r=l[0],c=l[1];this.read(r,c,"read",void 0,void 0,(f,p)=>{f&&this.logger.warn(`${s}loading namespace ${c} for language ${r} failed`,f),!f&&p&&this.logger.log(`${s}loaded namespace ${c} for language ${r}`,p),this.loaded(n,f,p)})}saveMissing(n,s,l,r,c,f={},p=()=>{}){if(this.services?.utils?.hasLoadedNamespace&&!this.services?.utils?.hasLoadedNamespace(s)){this.logger.warn(`did not save key "${l}" as the namespace "${s}" was not yet loaded`,"This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");return}if(!(l==null||l==="")){if(this.backend?.create){const b={...f,isUpdate:c},g=this.backend.create.bind(this.backend);if(g.length<6)try{let _;g.length===5?_=g(n,s,l,r,b):_=g(n,s,l,r),_&&typeof _.then=="function"?_.then(v=>p(null,v)).catch(p):p(null,_)}catch(_){p(_)}else g(n,s,l,r,p,b)}!n||!n[0]||this.store.addResource(n[0],s,l,r)}}}const Ru=()=>({debug:!1,initAsync:!0,ns:["translation"],defaultNS:["translation"],fallbackLng:["dev"],fallbackNS:!1,supportedLngs:!1,nonExplicitSupportedLngs:!1,load:"all",preload:!1,simplifyPluralSuffix:!0,keySeparator:".",nsSeparator:":",pluralSeparator:"_",contextSeparator:"_",partialBundledLanguages:!1,saveMissing:!1,updateMissing:!1,saveMissingTo:"fallback",saveMissingPlurals:!0,missingKeyHandler:!1,missingInterpolationHandler:!1,postProcess:!1,postProcessPassResolved:!1,returnNull:!1,returnEmptyString:!0,returnObjects:!1,joinArrays:!1,returnedObjectHandler:!1,parseMissingKeyHandler:!1,appendNamespaceToMissingKey:!1,appendNamespaceToCIMode:!1,overloadTranslationOptionHandler:o=>{let n={};if(typeof o[1]=="object"&&(n=o[1]),Ne(o[1])&&(n.defaultValue=o[1]),Ne(o[2])&&(n.tDescription=o[2]),typeof o[2]=="object"||typeof o[3]=="object"){const s=o[3]||o[2];Object.keys(s).forEach(l=>{n[l]=s[l]})}return n},interpolation:{escapeValue:!0,format:o=>o,prefix:"{{",suffix:"}}",formatSeparator:",",unescapePrefix:"-",nestingPrefix:"$t(",nestingSuffix:")",nestingOptionsSeparator:",",maxReplaces:1e3,skipOnVariables:!0},cacheInBuiltFormats:!0}),kg=o=>(Ne(o.ns)&&(o.ns=[o.ns]),Ne(o.fallbackLng)&&(o.fallbackLng=[o.fallbackLng]),Ne(o.fallbackNS)&&(o.fallbackNS=[o.fallbackNS]),o.supportedLngs?.indexOf?.("cimode")<0&&(o.supportedLngs=o.supportedLngs.concat(["cimode"])),typeof o.initImmediate=="boolean"&&(o.initAsync=o.initImmediate),o),Vr=()=>{},P0=o=>{Object.getOwnPropertyNames(Object.getPrototypeOf(o)).forEach(s=>{typeof o[s]=="function"&&(o[s]=o[s].bind(o))})},_v="__i18next_supportNoticeShown",G0=()=>typeof globalThis<"u"&&!!globalThis[_v],Y0=()=>{typeof globalThis<"u"&&(globalThis[_v]=!0)},K0=o=>!!(o?.modules?.backend?.name?.indexOf("Locize")>0||o?.modules?.backend?.constructor?.name?.indexOf("Locize")>0||o?.options?.backend?.backends&&o.options.backend.backends.some(n=>n?.name?.indexOf("Locize")>0||n?.constructor?.name?.indexOf("Locize")>0)||o?.options?.backend?.projectId||o?.options?.backend?.backendOptions&&o.options.backend.backendOptions.some(n=>n?.projectId));class ro extends rc{constructor(n={},s){if(super(),this.options=kg(n),this.services={},this.logger=Ni,this.modules={external:[]},P0(this),s&&!this.isInitialized&&!n.isClone){if(!this.options.initAsync)return this.init(n,s),this;setTimeout(()=>{this.init(n,s)},0)}}init(n={},s){this.isInitializing=!0,typeof n=="function"&&(s=n,n={}),n.defaultNS==null&&n.ns&&(Ne(n.ns)?n.defaultNS=n.ns:n.ns.indexOf("translation")<0&&(n.defaultNS=n.ns[0]));const l=Ru();this.options={...l,...this.options,...kg(n)},this.options.interpolation={...l.interpolation,...this.options.interpolation},n.keySeparator!==void 0&&(this.options.userDefinedKeySeparator=n.keySeparator),n.nsSeparator!==void 0&&(this.options.userDefinedNsSeparator=n.nsSeparator),typeof this.options.overloadTranslationOptionHandler!="function"&&(this.options.overloadTranslationOptionHandler=l.overloadTranslationOptionHandler),this.options.showSupportNotice!==!1&&!K0(this)&&!G0()&&(typeof console<"u"&&typeof console.info<"u"&&console.info("🌐 i18next is made possible by our own product, Locize — consider powering your project with managed localization (AI, CDN, integrations): https://locize.com 💙"),Y0());const r=g=>g?typeof g=="function"?new g:g:null;if(!this.options.isClone){this.modules.logger?Ni.init(r(this.modules.logger),this.options):Ni.init(null,this.options);let g;this.modules.formatter?g=this.modules.formatter:g=I0;const _=new wg(this.options);this.store=new _g(this.options.resources,this.options);const v=this.services;v.logger=Ni,v.resourceStore=this.store,v.languageUtils=_,v.pluralResolver=new B0(_,{prepend:this.options.pluralSeparator,simplifyPluralSuffix:this.options.simplifyPluralSuffix}),this.options.interpolation.format&&this.options.interpolation.format!==l.interpolation.format&&this.logger.deprecate("init: you are still using the legacy format function, please use the new approach: https://www.i18next.com/translation-function/formatting"),g&&(!this.options.interpolation.format||this.options.interpolation.format===l.interpolation.format)&&(v.formatter=r(g),v.formatter.init&&v.formatter.init(v,this.options),this.options.interpolation.format=v.formatter.format.bind(v.formatter)),v.interpolator=new jg(this.options),v.utils={hasLoadedNamespace:this.hasLoadedNamespace.bind(this)},v.backendConnector=new q0(r(this.modules.backend),v.resourceStore,v,this.options),v.backendConnector.on("*",(E,...O)=>{this.emit(E,...O)}),this.modules.languageDetector&&(v.languageDetector=r(this.modules.languageDetector),v.languageDetector.init&&v.languageDetector.init(v,this.options.detection,this.options)),this.modules.i18nFormat&&(v.i18nFormat=r(this.modules.i18nFormat),v.i18nFormat.init&&v.i18nFormat.init(this)),this.translator=new Wr(this.services,this.options),this.translator.on("*",(E,...O)=>{this.emit(E,...O)}),this.modules.external.forEach(E=>{E.init&&E.init(this)})}if(this.format=this.options.interpolation.format,s||(s=Vr),this.options.fallbackLng&&!this.services.languageDetector&&!this.options.lng){const g=this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);g.length>0&&g[0]!=="dev"&&(this.options.lng=g[0])}!this.services.languageDetector&&!this.options.lng&&this.logger.warn("init: no languageDetector is used and no lng is defined"),["getResource","hasResourceBundle","getResourceBundle","getDataByLanguage"].forEach(g=>{this[g]=(..._)=>this.store[g](..._)}),["addResource","addResources","addResourceBundle","removeResourceBundle"].forEach(g=>{this[g]=(..._)=>(this.store[g](..._),this)});const p=Ql(),b=()=>{const g=(_,v)=>{this.isInitializing=!1,this.isInitialized&&!this.initializedStoreOnce&&this.logger.warn("init: i18next is already initialized. You should call init just once!"),this.isInitialized=!0,this.options.isClone||this.logger.log("initialized",this.options),this.emit("initialized",this.options),p.resolve(v),s(_,v)};if(this.languages&&!this.isInitialized)return g(null,this.t.bind(this));this.changeLanguage(this.options.lng,g)};return this.options.resources||!this.options.initAsync?b():setTimeout(b,0),p}loadResources(n,s=Vr){let l=s;const r=Ne(n)?n:this.language;if(typeof n=="function"&&(l=n),!this.options.resources||this.options.partialBundledLanguages){if(r?.toLowerCase()==="cimode"&&(!this.options.preload||this.options.preload.length===0))return l();const c=[],f=p=>{if(!p||p==="cimode")return;this.services.languageUtils.toResolveHierarchy(p).forEach(g=>{g!=="cimode"&&c.indexOf(g)<0&&c.push(g)})};r?f(r):this.services.languageUtils.getFallbackCodes(this.options.fallbackLng).forEach(b=>f(b)),this.options.preload?.forEach?.(p=>f(p)),this.services.backendConnector.load(c,this.options.ns,p=>{!p&&!this.resolvedLanguage&&this.language&&this.setResolvedLanguage(this.language),l(p)})}else l(null)}reloadResources(n,s,l){const r=Ql();return typeof n=="function"&&(l=n,n=void 0),typeof s=="function"&&(l=s,s=void 0),n||(n=this.languages),s||(s=this.options.ns),l||(l=Vr),this.services.backendConnector.reload(n,s,c=>{r.resolve(),l(c)}),r}use(n){if(!n)throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");if(!n.type)throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");return n.type==="backend"&&(this.modules.backend=n),(n.type==="logger"||n.log&&n.warn&&n.error)&&(this.modules.logger=n),n.type==="languageDetector"&&(this.modules.languageDetector=n),n.type==="i18nFormat"&&(this.modules.i18nFormat=n),n.type==="postProcessor"&&yv.addPostProcessor(n),n.type==="formatter"&&(this.modules.formatter=n),n.type==="3rdParty"&&this.modules.external.push(n),this}setResolvedLanguage(n){if(!(!n||!this.languages)&&!(["cimode","dev"].indexOf(n)>-1)){for(let s=0;s<this.languages.length;s++){const l=this.languages[s];if(!(["cimode","dev"].indexOf(l)>-1)&&this.store.hasLanguageSomeTranslations(l)){this.resolvedLanguage=l;break}}!this.resolvedLanguage&&this.languages.indexOf(n)<0&&this.store.hasLanguageSomeTranslations(n)&&(this.resolvedLanguage=n,this.languages.unshift(n))}}changeLanguage(n,s){this.isLanguageChangingTo=n;const l=Ql();this.emit("languageChanging",n);const r=p=>{this.language=p,this.languages=this.services.languageUtils.toResolveHierarchy(p),this.resolvedLanguage=void 0,this.setResolvedLanguage(p)},c=(p,b)=>{b?this.isLanguageChangingTo===n&&(r(b),this.translator.changeLanguage(b),this.isLanguageChangingTo=void 0,this.emit("languageChanged",b),this.logger.log("languageChanged",b)):this.isLanguageChangingTo=void 0,l.resolve((...g)=>this.t(...g)),s&&s(p,(...g)=>this.t(...g))},f=p=>{!n&&!p&&this.services.languageDetector&&(p=[]);const b=Ne(p)?p:p&&p[0],g=this.store.hasLanguageSomeTranslations(b)?b:this.services.languageUtils.getBestMatchFromCodes(Ne(p)?[p]:p);g&&(this.language||r(g),this.translator.language||this.translator.changeLanguage(g),this.services.languageDetector?.cacheUserLanguage?.(g)),this.loadResources(g,_=>{c(_,g)})};return!n&&this.services.languageDetector&&!this.services.languageDetector.async?f(this.services.languageDetector.detect()):!n&&this.services.languageDetector&&this.services.languageDetector.async?this.services.languageDetector.detect.length===0?this.services.languageDetector.detect().then(f):this.services.languageDetector.detect(f):f(n),l}getFixedT(n,s,l){const r=(c,f,...p)=>{let b;typeof f!="object"?b=this.options.overloadTranslationOptionHandler([c,f].concat(p)):b={...f},b.lng=b.lng||r.lng,b.lngs=b.lngs||r.lngs,b.ns=b.ns||r.ns,b.keyPrefix!==""&&(b.keyPrefix=b.keyPrefix||l||r.keyPrefix);const g=this.options.keySeparator||".";let _;return b.keyPrefix&&Array.isArray(c)?_=c.map(v=>(typeof v=="function"&&(v=oo(v,{...this.options,...f})),`${b.keyPrefix}${g}${v}`)):(typeof c=="function"&&(c=oo(c,{...this.options,...f})),_=b.keyPrefix?`${b.keyPrefix}${g}${c}`:c),this.t(_,b)};return Ne(n)?r.lng=n:r.lngs=n,r.ns=s,r.keyPrefix=l,r}t(...n){return this.translator?.translate(...n)}exists(...n){return this.translator?.exists(...n)}setDefaultNamespace(n){this.options.defaultNS=n}hasLoadedNamespace(n,s={}){if(!this.isInitialized)return this.logger.warn("hasLoadedNamespace: i18next was not initialized",this.languages),!1;if(!this.languages||!this.languages.length)return this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty",this.languages),!1;const l=s.lng||this.resolvedLanguage||this.languages[0],r=this.options?this.options.fallbackLng:!1,c=this.languages[this.languages.length-1];if(l.toLowerCase()==="cimode")return!0;const f=(p,b)=>{const g=this.services.backendConnector.state[`${p}|${b}`];return g===-1||g===0||g===2};if(s.precheck){const p=s.precheck(this,f);if(p!==void 0)return p}return!!(this.hasResourceBundle(l,n)||!this.services.backendConnector.backend||this.options.resources&&!this.options.partialBundledLanguages||f(l,n)&&(!r||f(c,n)))}loadNamespaces(n,s){const l=Ql();return this.options.ns?(Ne(n)&&(n=[n]),n.forEach(r=>{this.options.ns.indexOf(r)<0&&this.options.ns.push(r)}),this.loadResources(r=>{l.resolve(),s&&s(r)}),l):(s&&s(),Promise.resolve())}loadLanguages(n,s){const l=Ql();Ne(n)&&(n=[n]);const r=this.options.preload||[],c=n.filter(f=>r.indexOf(f)<0&&this.services.languageUtils.isSupportedCode(f));return c.length?(this.options.preload=r.concat(c),this.loadResources(f=>{l.resolve(),s&&s(f)}),l):(s&&s(),Promise.resolve())}dir(n){if(n||(n=this.resolvedLanguage||(this.languages?.length>0?this.languages[0]:this.language)),!n)return"rtl";try{const r=new Intl.Locale(n);if(r&&r.getTextInfo){const c=r.getTextInfo();if(c&&c.direction)return c.direction}}catch{}const s=["ar","shu","sqr","ssh","xaa","yhd","yud","aao","abh","abv","acm","acq","acw","acx","acy","adf","ads","aeb","aec","afb","ajp","apc","apd","arb","arq","ars","ary","arz","auz","avl","ayh","ayl","ayn","ayp","bbz","pga","he","iw","ps","pbt","pbu","pst","prp","prd","ug","ur","ydd","yds","yih","ji","yi","hbo","men","xmn","fa","jpr","peo","pes","prs","dv","sam","ckb"],l=this.services?.languageUtils||new wg(Ru());return n.toLowerCase().indexOf("-latn")>1?"ltr":s.indexOf(l.getLanguagePartFromCode(n))>-1||n.toLowerCase().indexOf("-arab")>1?"rtl":"ltr"}static createInstance(n={},s){const l=new ro(n,s);return l.createInstance=ro.createInstance,l}cloneInstance(n={},s=Vr){const l=n.forkResourceStore;l&&delete n.forkResourceStore;const r={...this.options,...n,isClone:!0},c=new ro(r);if((n.debug!==void 0||n.prefix!==void 0)&&(c.logger=c.logger.clone(n)),["store","services","language"].forEach(p=>{c[p]=this[p]}),c.services={...this.services},c.services.utils={hasLoadedNamespace:c.hasLoadedNamespace.bind(c)},l){const p=Object.keys(this.store.data).reduce((b,g)=>(b[g]={...this.store.data[g]},b[g]=Object.keys(b[g]).reduce((_,v)=>(_[v]={...b[g][v]},_),b[g]),b),{});c.store=new _g(p,r),c.services.resourceStore=c.store}if(n.interpolation){const b={...Ru().interpolation,...this.options.interpolation,...n.interpolation},g={...r,interpolation:b};c.services.interpolator=new jg(g)}return c.translator=new Wr(c.services,r),c.translator.on("*",(p,...b)=>{c.emit(p,...b)}),c.init(r,s),c.translator.options=r,c.translator.backendConnector.services.utils={hasLoadedNamespace:c.hasLoadedNamespace.bind(c)},c}toJSON(){return{options:this.options,store:this.store,language:this.language,languages:this.languages,resolvedLanguage:this.resolvedLanguage}}}const Jt=ro.createInstance();Jt.createInstance;Jt.dir;Jt.init;Jt.loadResources;Jt.reloadResources;Jt.use;Jt.changeLanguage;Jt.getFixedT;Jt.t;Jt.exists;Jt.setDefaultNamespace;Jt.hasLoadedNamespace;Jt.loadNamespaces;Jt.loadLanguages;const F0=(o,n,s,l)=>{const r=[s,{code:n,...l||{}}];if(o?.services?.logger?.forward)return o.services.logger.forward(r,"warn","react-i18next::",!0);ea(r[0])&&(r[0]=`react-i18next:: ${r[0]}`),o?.services?.logger?.warn?o.services.logger.warn(...r):console?.warn&&console.warn(...r)},Tg={},Sv=(o,n,s,l)=>{ea(s)&&Tg[s]||(ea(s)&&(Tg[s]=new Date),F0(o,n,s,l))},wv=(o,n)=>()=>{if(o.isInitialized)n();else{const s=()=>{setTimeout(()=>{o.off("initialized",s)},0),n()};o.on("initialized",s)}},Pu=(o,n,s)=>{o.loadNamespaces(n,wv(o,s))},Og=(o,n,s,l)=>{if(ea(s)&&(s=[s]),o.options.preload&&o.options.preload.indexOf(n)>-1)return Pu(o,s,l);s.forEach(r=>{o.options.ns.indexOf(r)<0&&o.options.ns.push(r)}),o.loadLanguages(n,wv(o,l))},X0=(o,n,s={})=>!n.languages||!n.languages.length?(Sv(n,"NO_LANGUAGES","i18n.languages were undefined or empty",{languages:n.languages}),!0):n.hasLoadedNamespace(o,{lng:s.lng,precheck:(l,r)=>{if(s.bindI18n&&s.bindI18n.indexOf("languageChanging")>-1&&l.services.backendConnector.backend&&l.isLanguageChangingTo&&!r(l.isLanguageChangingTo,o))return!1}}),ea=o=>typeof o=="string",Q0=o=>typeof o=="object"&&o!==null,Z0=/&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g,J0={"&amp;":"&","&#38;":"&","&lt;":"<","&#60;":"<","&gt;":">","&#62;":">","&apos;":"'","&#39;":"'","&quot;":'"',"&#34;":'"',"&nbsp;":" ","&#160;":" ","&copy;":"©","&#169;":"©","&reg;":"®","&#174;":"®","&hellip;":"…","&#8230;":"…","&#x2F;":"/","&#47;":"/"},W0=o=>J0[o],ex=o=>o.replace(Z0,W0);let Gu={bindI18n:"languageChanged",bindI18nStore:"",transEmptyNodeValue:"",transSupportBasicHtmlNodes:!0,transWrapTextNodes:"",transKeepBasicHtmlNodesFor:["br","strong","i","p"],useSuspense:!0,unescape:ex,transDefaultProps:void 0};const tx=(o={})=>{Gu={...Gu,...o}},nx=()=>Gu;let Cv;const ix=o=>{Cv=o},sx=()=>Cv,ax={type:"3rdParty",init(o){tx(o.options.react),ix(o)}},lx=x.createContext();class ox{constructor(){this.usedNamespaces={}}addUsedNamespaces(n){n.forEach(s=>{this.usedNamespaces[s]||(this.usedNamespaces[s]=!0)})}getUsedNamespaces(){return Object.keys(this.usedNamespaces)}}var Du={exports:{}},Mu={};var Rg;function rx(){if(Rg)return Mu;Rg=1;var o=oc();function n(v,k){return v===k&&(v!==0||1/v===1/k)||v!==v&&k!==k}var s=typeof Object.is=="function"?Object.is:n,l=o.useState,r=o.useEffect,c=o.useLayoutEffect,f=o.useDebugValue;function p(v,k){var E=k(),O=l({inst:{value:E,getSnapshot:k}}),V=O[0].inst,se=O[1];return c(function(){V.value=E,V.getSnapshot=k,b(V)&&se({inst:V})},[v,E,k]),r(function(){return b(V)&&se({inst:V}),v(function(){b(V)&&se({inst:V})})},[v]),f(E),E}function b(v){var k=v.getSnapshot;v=v.value;try{var E=k();return!s(v,E)}catch{return!0}}function g(v,k){return k()}var _=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?g:p;return Mu.useSyncExternalStore=o.useSyncExternalStore!==void 0?o.useSyncExternalStore:_,Mu}var Dg;function cx(){return Dg||(Dg=1,Du.exports=rx()),Du.exports}var dx=cx();const ux=(o,n)=>{if(ea(n))return n;if(Q0(n)&&ea(n.defaultValue))return n.defaultValue;if(typeof o=="function")return"";if(Array.isArray(o)){const s=o[o.length-1];return typeof s=="function"?"":s}return o},hx={t:ux,ready:!1},fx=()=>()=>{},tn=(o,n={})=>{const{i18n:s}=n,{i18n:l,defaultNS:r}=x.useContext(lx)||{},c=s||l||sx();c&&!c.reportNamespaces&&(c.reportNamespaces=new ox),c||Sv(c,"NO_I18NEXT_INSTANCE","useTranslation: You will need to pass in an i18next instance by using initReactI18next");const f=x.useMemo(()=>({...nx(),...c?.options?.react,...n}),[c,n]),{useSuspense:p,keyPrefix:b}=f,g=r||c?.options?.defaultNS,_=ea(g)?[g]:g||["translation"],v=x.useMemo(()=>_,_);c?.reportNamespaces?.addUsedNamespaces?.(v);const k=x.useRef(0),E=x.useCallback(z=>{if(!c)return fx;const{bindI18n:W,bindI18nStore:Q}=f,ue=()=>{k.current+=1,z()};return W&&c.on(W,ue),Q&&c.store.on(Q,ue),()=>{W&&W.split(" ").forEach(ce=>c.off(ce,ue)),Q&&Q.split(" ").forEach(ce=>c.store.off(ce,ue))}},[c,f]),O=x.useRef(),V=x.useCallback(()=>{if(!c)return hx;const z=!!(c.isInitialized||c.initializedStoreOnce)&&v.every(ne=>X0(ne,c,f)),W=n.lng||c.language,Q=k.current,ue=O.current;if(ue&&ue.ready===z&&ue.lng===W&&ue.keyPrefix===b&&ue.revision===Q)return ue;const pe={t:c.getFixedT(W,f.nsMode==="fallback"?v:v[0],b),ready:z,lng:W,keyPrefix:b,revision:Q};return O.current=pe,pe},[c,v,b,f,n.lng]),[se,ee]=x.useState(0),{t:oe,ready:ae}=dx.useSyncExternalStore(E,V,V);x.useEffect(()=>{if(c&&!ae&&!p){const z=()=>ee(W=>W+1);n.lng?Og(c,n.lng,v,z):Pu(c,v,z)}},[c,n.lng,v,ae,p,se]);const de=c||{},J=x.useRef(null),$=x.useRef(),S=z=>{const W=Object.getOwnPropertyDescriptors(z);W.__original&&delete W.__original;const Q=Object.create(Object.getPrototypeOf(z),W);if(!Object.prototype.hasOwnProperty.call(Q,"__original"))try{Object.defineProperty(Q,"__original",{value:z,writable:!1,enumerable:!1,configurable:!1})}catch{}return Q},I=x.useMemo(()=>{const z=de,W=z?.language;let Q=z;z&&(J.current&&J.current.__original===z?$.current!==W?(Q=S(z),J.current=Q,$.current=W):Q=J.current:(Q=S(z),J.current=Q,$.current=W));const ue=[oe,Q,ae];return ue.t=oe,ue.i18n=Q,ue.ready=ae,ue},[oe,de,ae,de.resolvedLanguage,de.language,de.languages]);if(c&&p&&!ae)throw new Promise(z=>{const W=()=>z();n.lng?Og(c,n.lng,v,W):Pu(c,v,W)});return I},px={search:"Search",cancel:"Cancel",close:"Close",done:"Done",save:"Save",delete:"Delete",yes:"Yes",no:"No",loading:"Loading...",processing:"Processing...",saving:"Saving...",creating:"Creating...",removing:"Removing..."},mx={rotating:"Rotating",off:"Off",restartBackend:"Restart Backend",options:"Options",restarting:"Restarting..."},gx={local:"Local",static:"Static",pool:"Dynamic",remote:"Remote"},vx={label:"Plugin",desc:"Enable or disable the plugin",on:"Enabled",off:"Disabled"},bx={tenantId:"Tenant ID",userId:"User ID (Client Key)",saved:"✓ saved",hideKey:"Hide",showKey:"Show",enterKey:"Enter your client key",saveConfig:"Save Configuration",deviceLimitError:"Device limit reached. This key is already in use on another device.",deviceLimitHint:"Please contact your administrator to reset the device binding.",serverError:"Cannot connect to remote server",serverErrorHint:"Click Save Configuration to retry, or restart the IDE backend.",serverConnected:"Server connected",retry:"↻ Retry Connection",retrying:"Connecting..."},yx={title:"Accounts",titleAssigned:"Assigned Accounts",initializing:"Initializing...",syncing:"Syncing...",syncRemote:"Sync Remote Accounts",noRemoteAccounts:"No remote accounts — configure server above",noAssignedAccounts:"No assigned accounts",noLocalAccounts:"No accounts added yet",addingAccount:"Adding Account...",waitingOAuth:"Waiting for OAuth...",addAccount:"+ Add Account",cancelAddAccount:"Cancel adding account",addAccountTip:"Add a new account via OAuth login",moveUp:"Move Up",moveDown:"Move Down",switching:"Switching...",reapplying:"Re-applying...",currentAccount:"Current Account (click to re-apply)",useThisAccount:"Use This Account",expired:"Expired",refreshing:"Refreshing...",refreshAccount:"Refresh Account",moreActions:"More Actions",includeRotation:"Include in Rotation",excludeRotation:"Exclude from Rotation",removeAccount:"Remove Account",setAlias:"Set Alias",editAlias:"Edit Alias",noQuotaData:"No quota data — click ↻ to refresh"},xx={label:"Dynamic Pool",desc:"Auto-assigned from shared pool",acquiring:"Acquiring...",leaseExpiring:"expiring...",leaseMinutes:"{{min}}m remaining",leaseHoursMinutes:"{{h}}h {{m}}m remaining",leaseHours:"{{h}}h remaining",leasePrefix:"Lease",retry:"Retry",denialNoPool:"No pool assigned to this client",denialExhausted:"All tokens are currently in use. Waiting...",denialNetwork:"Unable to reach server. Check your connection.",denialExpired:"Service has expired. Contact admin.",denialForbidden:"Access denied. Contact admin."},_x={title:"Settings",language:"Language",accountRotation:"Account Rotation",stoppingRotation:"Stopping rotation...",startingRotation:"Starting rotation...",activeAccount:"Active — {{email}}",activePool:"Active — pool account",offDefault:"Off — using default account",disable:"Disable",enable:"Enable",rotationBenchmark:"Rotation Benchmark",benchmarkDesc:"Model family that triggers account switching",rotateBased:"Rotate based on {{family}} quota",switchThreshold:"Switch Threshold",thresholdDesc:"Switch to next account when quota drops below this level",thresholdExhausted:"Switch only after quota is fully exhausted",thresholdBelow:"Switch when quota drops below {{val}}%",thresholdWarning:"Quota stats update with a delay (~5 min). At 0% threshold, the account may be fully exhausted before rotation kicks in, causing brief interruptions.",statusBarQuota:"Status Bar Quota",visible:"Visible in status bar",hidden:"Hidden",showRemoteModes:"Remote Modes",remoteModesOn:"Showing Local / Static / Dynamic mode tabs",remoteModesOff:"Hidden — local mode only",networkEnhance:"Network Enhancement",networkEnhanceOn:"Optimizes network interruptions for a smoother experience",networkEnhanceOff:"Disabled — no network optimization",maxRetries:"Max Retries",openaiProxy:"Reverse Proxy (API)",openaiProxyOn:"OpenAI-compatible API is active on port {{port}}",openaiProxyOff:"Expose an OpenAI-compatible endpoint for external tools",openaiEmail:"Account Email",openaiEmailPlaceholder:"Same as current IDE account",openaiEmailHint:"Leave empty to use the current active account, or enter a specific email",openaiEndpoint:"Endpoint",openaiModels:"Available Models",openaiCopied:"✓ Copied!"},Sx={title:"System Logs",clear:"Clear",clearAll:"Clear all logs"},wx={loginBtn:"Admin Login",loggingIn:"Logging in...",loginHint:"Sign in with Google to manage tokens and tenants",logout:"Logout",manageTokens:"Manage Tokens"},Cx={title:"Admin Panel",loginHeading:"Admin Authentication",loginDesc:"Sign in with your Google account to manage tenants, tokens, and clients.",signingIn:"Signing in...",signInWithGoogle:"Sign in with Google",signOut:"Sign out",loadingAdmin:"Loading admin data...",noTenants:"No tenants yet. Create one to get started.",tenantPlaceholder:"Tenant name (e.g. My Organization)",createTenant:"+ Create Tenant",tenant:"Tenant:",clients:"Clients",tokens:"Tokens",searchTokens:"Search by email or token ID...",searchClients:"Search by name, email or client ID...",found:"{{count}} found",noTokens:"No tokens in this tenant.",noTokensHint:"Upload local accounts to add tokens.",noTokensMatch:'No tokens match "{{query}}"',noClientsMatch:'No clients match "{{query}}"',loginAndUpload:"Login & Upload to Remote",hideLocal:"▾ Hide local accounts",uploadLocal:"⬆ Upload local token",noLocalAccounts:"No local accounts found. Add accounts in the sidebar first.",install:"🔑 Install",installTip:"Install this account into the IDE",upload:"⬆ Upload",uploaded:"Uploaded",noClients:"No clients yet. Create one below.",newClientPlaceholder:"New client name...",create:"+ Create",members:"Admins"},Ex={clientCreated:"Client Created",clientDetails:"Client Details",name:"Name",email:"Email",emailPlaceholder:"client@example.com",addEmail:"Add email...",notes:"Notes",notesPlaceholder:"Any notes...",addNotes:"Add notes...",heartbeat:"Heartbeat",notConnected:"Not connected",using:"Using: {{email}}",recentlyActive:"Recently active",neverHeartbeat:"Never reported heartbeat",expiry:"Expiry",permanent:"∞ Permanent",duration:"📅 Duration",date:"🗓 Date",days:"days",expiresOn:"Expires on {{date}}",daysFromNow:"{{days}} day from now",daysFromNow_plural:"{{days}} days from now",neverExpire:"This client will never expire",dateInPast:"⚠ Date is in the past",daysMustBePositive:"Days must be a positive number",selectDate:"Please select a date",dateMustBeFuture:"Date must be in the future",durationMustBePositive:"Duration must be positive",tenantId:"Tenant ID",clientKey:"Client Key",copyCredentials:"📋 Copy Credentials",copied:"✓ Copied!",saveWarning:"⚠ Save these credentials — the key is shown only once",assignedTokens:"Assigned Tokens ({{count}})",assignedTokensLoading:"Assigned Tokens (...)",noTokensAssigned:"No tokens assigned yet",addToken:"Add Token",all:"All",searchByEmail:"Search by email...",noMatchingTokens:"No matching tokens",noAvailableTokens:"No available tokens",permanentHint:"Permanent — never expires",assignFailed:"Assign failed",failedToUpdate:"Failed to update",failedToUpdateExpiry:"Failed to update expiry",deleteClient:"Delete Client",deleteConfirm:"Delete this client?",deleteConfirmWithTokens:"{{count}} token(s) assigned. Delete?",noExpiration:"No expiration",devices:"Devices",devicesUnlimited:"0 = unlimited",resetDevices:"🔄 Reset All Devices",resetDevicesConfirm:"Clear all registered devices?"},Nx={uploadedOn:"Uploaded on {{date}}",refreshTier:"Refresh tier from Google",disableToken:"Disable Token",enableToken:"Enable Token",deleteToken:"Delete Token",working:"Working...",deleteConfirm:"Delete?",deleteConfirmClients:"⚠ {{count}} client(s)",heartbeat:"Heartbeat",noTokens:"No tokens",viewClient:"View client: {{name}}",installToIDE:"Install this token into IDE (temporary)"},jx={info:"{{start}}–{{end}} of {{total}}",previous:"Previous page",next:"Next page"},Ax={justNow:"just now",minutesAgo:"{{n}}m ago",hoursAgo:"{{n}}h ago",daysAgo:"{{n}}d ago"},kx={permanent:"∞ Permanent",noExpiration:"No expiration",expiredHoursAgo:"Expired {{hours}}h ago",expiredDaysAgo:"Expired {{days}}d ago",expiresSoon:"Expires soon",hoursLeft:"{{hours}}h left",daysLeft:"{{days}}d left"},Tx={title:"⚠️ Account Verification Required",installDesc:"This account needs Google verification before it can receive a project ID. Click <strong>Install to IDE</strong> below to sign in as this account in the current IDE. The IDE will then prompt you to complete verification.",installToIDE:"🔑 Install to IDE",installed:"✅ Account has been installed into the IDE. Please complete the Google verification dialog that appears in the IDE.",afterVerify:"After completing verification, click the button below to retry resolving the project ID and uploading.",retryUpload:"✅ I've Completed Verification — Retry Upload",resolving:"Resolving project ID and uploading...",retryDesc:"You can try installing the account again, completing verification, and then retrying.",reinstall:"🔑 Re-install to IDE",retryResolve:"🔄 Retry Resolve"},Ox={you:"(you)",remove:"Remove from tenant",invite:"+ Invite",invitePlaceholder:"Enter Google email to invite...",inviteHint:"The invited person can log in with this Google account to access this tenant.",invited:"{{email}} has been invited",invalidEmail:"Please enter a valid email address"},Rx={trigger:"🐛 Have a bug or suggestion?",prefix:"Feedback or suggestions:",email:"📧 Email",github:"🐙 GitHub Issue"},Dx={title:"Incompatible IDE Version",message:"The current IDE version ({{version}}) is not compatible with this plugin. The plugin has been disabled. Please wait for a plugin update before using it.",warnTitle:"Untested IDE Version",warnMessage:"The current IDE version ({{version}}) is newer than the last tested version ({{tested}}). Some features may not work as expected. A plugin update is recommended."},Mx={title:"External Providers",addProvider:"Add Provider",editProvider:"Edit Provider",deleteProvider:"Delete Provider",emptyState:"No external providers configured.",emptyHint:"Route IDE traffic through OpenAI, Anthropic, or compatible APIs.",activateTip:"Activate — route all traffic here",deactivateTip:"Deactivate — resume Google flow",edit:"Edit",activeHint:"Custom provider is active:",activeDesc:"{{name}}{{model}} is currently handling IDE model traffic. Switching models in the IDE will not change the actual upstream model until you turn this provider off.",formName:"Name",formApiType:"API Type",formBaseUrl:"Base URL",formApiKey:"API Key",formModel:"Model",apiKeyUnchanged:"(unchanged if empty)",contextWarning:"The model must support ≥200K context input to work properly with the IDE agent.",update:"Update",add:"Add",addMore:"+ Add Provider"},zx={title:"Restart Required",message:"AntiLoop has been installed. Please quit and reopen the IDE to fully activate all features."},$x={common:px,header:mx,modeSwitcher:gx,proxy:vx,remoteConfig:bx,accounts:yx,pool:xx,settings:_x,logs:Sx,adminSection:wx,admin:Cx,clientModal:Ex,tokenRow:Nx,pagination:jx,time:Ax,expiry:kx,verify:Tx,members:Ox,feedback:Rx,versionWarning:Dx,providers:Mx,restartBanner:zx},Lx={search:"搜索",cancel:"取消",close:"关闭",done:"完成",save:"保存",delete:"删除",yes:"是",no:"否",loading:"加载中...",processing:"处理中...",saving:"保存中...",creating:"创建中...",removing:"移除中..."},Bx={rotating:"轮换中",off:"已关闭",restartBackend:"重启后端",options:"选项",restarting:"重启中..."},Hx={local:"本地",static:"静态分配",pool:"动态分配",remote:"远程"},Vx={label:"插件",desc:"启用或停用插件",on:"已启用",off:"已停用"},Ix={tenantId:"租户 ID",userId:"用户 ID（客户端密钥）",saved:"✓ 已保存",hideKey:"隐藏",showKey:"显示",enterKey:"输入你的客户端密钥",saveConfig:"保存配置",deviceLimitError:"设备数量已达上限，该密钥已在其他设备上使用。",deviceLimitHint:"请联系管理员重置设备绑定。",serverError:"无法连接远程服务器",serverErrorHint:"点击「保存配置」重试，或重启 IDE 后端。",serverConnected:"服务器已连接",retry:"↻ 重试连接",retrying:"连接中..."},Ux={title:"账号",titleAssigned:"指定账号",initializing:"初始化中...",syncing:"同步中...",syncRemote:"同步远程账号",noRemoteAccounts:"暂无远程账号 — 请先配置上方的服务器",noAssignedAccounts:"暂无指定账号",noLocalAccounts:"还没有添加账号",addingAccount:"添加账号中...",waitingOAuth:"等待 OAuth...",addAccount:"+ 添加账号",cancelAddAccount:"取消添加账号",addAccountTip:"通过 OAuth 登录添加新账号",moveUp:"上移",moveDown:"下移",switching:"切换中...",reapplying:"重新应用中...",currentAccount:"当前账号（点击重新应用）",useThisAccount:"使用此账号",expired:"已过期",refreshing:"刷新中...",refreshAccount:"刷新账号",moreActions:"更多操作",includeRotation:"加入轮换",excludeRotation:"排除轮换",removeAccount:"移除账号",setAlias:"设置别名",editAlias:"编辑别名",noQuotaData:"暂无额度数据 — 点击 ↻ 刷新"},qx={label:"动态分配",desc:"从共享池自动分配账号",acquiring:"分配中...",leaseExpiring:"即将到期...",leaseMinutes:"剩余 {{min}} 分钟",leaseHoursMinutes:"剩余 {{h}} 小时 {{m}} 分钟",leaseHours:"剩余 {{h}} 小时",leasePrefix:"租约",retry:"重试",denialNoPool:"未分配共享池",denialExhausted:"所有账号正在使用中，请等待...",denialNetwork:"无法连接服务器，请检查网络。",denialExpired:"服务已过期，请联系管理员。",denialForbidden:"访问被拒绝，请联系管理员。"},Px={title:"设置",language:"语言",accountRotation:"账号轮换",stoppingRotation:"正在停止轮换...",startingRotation:"正在启动轮换...",activeAccount:"活跃 — {{email}}",activePool:"活跃 — 轮换池账号",offDefault:"关闭 — 使用默认账号",disable:"禁用",enable:"启用",rotationBenchmark:"轮换基准",benchmarkDesc:"触发账号切换的模型系列",rotateBased:"基于 {{family}} 配额进行轮换",switchThreshold:"切换阈值",thresholdDesc:"当配额低于此水平时切换到下一个账号",thresholdExhausted:"仅在配额完全耗尽后切换",thresholdBelow:"当配额低于 {{val}}% 时切换",thresholdWarning:"配额统计更新有延迟（约5分钟）。在0%阈值下，账号可能在轮换生效前就已耗尽，导致短暂中断。",statusBarQuota:"状态栏配额",visible:"在状态栏显示",hidden:"已隐藏",showRemoteModes:"远程模式",remoteModesOn:"显示本地 / 静态 / 动态模式切换",remoteModesOff:"已隐藏 — 仅显示本地模式",networkEnhance:"网络增强",networkEnhanceOn:"优化网络中断，提供更流畅的使用体验",networkEnhanceOff:"已关闭 — 不进行网络优化",maxRetries:"最大重试次数",openaiProxy:"反向代理 (API)",openaiProxyOn:"OpenAI 兼容接口已在端口 {{port}} 上启用",openaiProxyOff:"为外部工具暴露 OpenAI 兼容端点",openaiEmail:"使用账号",openaiEmailPlaceholder:"与当前 IDE 账号相同",openaiEmailHint:"留空则使用当前活跃账号，或输入指定邮箱",openaiEndpoint:"端点地址",openaiModels:"可用模型",openaiCopied:"✓ 已复制!"},Gx={title:"系统日志",clear:"清除",clearAll:"清除所有日志"},Yx={loginBtn:"管理员登录",loggingIn:"登录中...",loginHint:"使用 Google 账号登录以管理令牌和租户",logout:"退出",manageTokens:"管理令牌"},Kx={title:"管理面板",loginHeading:"管理员认证",loginDesc:"使用 Google 账号登录以管理租户、令牌和客户端。",signingIn:"登录中...",signInWithGoogle:"使用 Google 登录",signOut:"退出",loadingAdmin:"加载管理数据...",noTenants:"暂无租户。创建一个来开始使用。",tenantPlaceholder:"租户名称（例如 我的组织）",createTenant:"+ 创建租户",tenant:"租户：",clients:"客户端",tokens:"令牌",searchTokens:"按邮箱或令牌 ID 搜索...",searchClients:"按名称、邮箱或客户端 ID 搜索...",found:"找到 {{count}} 个",noTokens:"该租户下暂无令牌。",noTokensHint:"上传本地账号以添加令牌。",noTokensMatch:'没有匹配 "{{query}}" 的令牌',noClientsMatch:'没有匹配 "{{query}}" 的客户端',loginAndUpload:"登录并上传到远程",hideLocal:"▾ 隐藏本地账号",uploadLocal:"⬆ 上传本地令牌",noLocalAccounts:"未找到本地账号。请先在侧边栏添加账号。",install:"🔑 安装",installTip:"将此账号安装到 IDE 中",upload:"⬆ 上传",uploaded:"已上传",noClients:"暂无客户端。在下方创建一个。",newClientPlaceholder:"新客户端名称...",create:"+ 创建",members:"管理员"},Fx={clientCreated:"客户端已创建",clientDetails:"客户端详情",name:"名称",email:"邮箱",emailPlaceholder:"client@example.com",addEmail:"添加邮箱...",notes:"备注",notesPlaceholder:"任何备注...",addNotes:"添加备注...",heartbeat:"心跳",notConnected:"未连接",using:"使用中: {{email}}",recentlyActive:"最近活跃",neverHeartbeat:"从未上报心跳",expiry:"到期时间",permanent:"∞ 永不过期",duration:"📅 时长",date:"🗓 日期",days:"天",expiresOn:"到期于 {{date}}",daysFromNow:"距今 {{days}} 天",daysFromNow_plural:"距今 {{days}} 天",neverExpire:"此客户端永不过期",dateInPast:"⚠ 日期已过",daysMustBePositive:"天数必须为正数",selectDate:"请选择日期",dateMustBeFuture:"日期必须在未来",durationMustBePositive:"时长必须为正",tenantId:"租户 ID",clientKey:"客户端密钥",copyCredentials:"📋 复制凭证",copied:"✓ 已复制！",saveWarning:"⚠ 请保存这些凭证 — 密钥仅显示一次",assignedTokens:"已分配令牌（{{count}}）",assignedTokensLoading:"已分配令牌（...）",noTokensAssigned:"尚未分配令牌",addToken:"添加令牌",all:"全部",searchByEmail:"按邮箱搜索...",noMatchingTokens:"没有匹配的令牌",noAvailableTokens:"没有可用的令牌",permanentHint:"永不过期",assignFailed:"分配失败",failedToUpdate:"更新失败",failedToUpdateExpiry:"更新到期时间失败",deleteClient:"删除客户端",deleteConfirm:"删除此客户端？",deleteConfirmWithTokens:"{{count}} 个令牌已分配。确认删除？",noExpiration:"无过期时间",devices:"设备",devicesUnlimited:"0 = 不限制",resetDevices:"🔄 重置所有设备",resetDevicesConfirm:"清除所有已注册设备？"},Xx={uploadedOn:"上传于 {{date}}",refreshTier:"从 Google 刷新等级",disableToken:"禁用令牌",enableToken:"启用令牌",deleteToken:"删除令牌",working:"处理中...",deleteConfirm:"删除？",deleteConfirmClients:"⚠ {{count}} 个客户端",heartbeat:"心跳",noTokens:"无令牌",viewClient:"查看客户端: {{name}}",installToIDE:"将此令牌安装到 IDE（临时）"},Qx={info:"{{start}}–{{end}} / {{total}}",previous:"上一页",next:"下一页"},Zx={justNow:"刚刚",minutesAgo:"{{n}}分钟前",hoursAgo:"{{n}}小时前",daysAgo:"{{n}}天前"},Jx={permanent:"∞ 永不过期",noExpiration:"无过期时间",expiredHoursAgo:"已过期 {{hours}}小时",expiredDaysAgo:"已过期 {{days}}天",expiresSoon:"即将到期",hoursLeft:"还剩 {{hours}}小时",daysLeft:"还剩 {{days}}天"},Wx={title:"⚠️ 需要账号验证",installDesc:"此账号需要 Google 验证才能获取项目 ID。点击下方<strong>安装到 IDE</strong>以在当前 IDE 中登录此账号。IDE 将提示您完成验证。",installToIDE:"🔑 安装到 IDE",installed:"✅ 账号已安装到 IDE 中。请完成 IDE 中弹出的 Google 验证对话框。",afterVerify:"完成验证后，点击下方按钮重试解析项目 ID 并上传。",retryUpload:"✅ 已完成验证 — 重试上传",resolving:"正在解析项目 ID 并上传...",retryDesc:"您可以尝试重新安装账号、完成验证，然后重试。",reinstall:"🔑 重新安装到 IDE",retryResolve:"🔄 重试解析"},e1={you:"（你）",remove:"从租户中移除",invite:"+ 邀请",invitePlaceholder:"输入要邀请的 Google 邮箱...",inviteHint:"被邀请的人可以用该 Google 账号登录来访问此租户。",invited:"已邀请 {{email}}",invalidEmail:"请输入有效的邮箱地址"},t1={trigger:"🐛 发现 Bug 或有建议？",prefix:"反馈或建议：",email:"📧 发送邮件",github:"🐙 提交 Issue"},n1={title:"IDE 版本不兼容",message:"当前 IDE 版本（{{version}}）与此插件不兼容，插件已自动关闭。请等待插件更新后再使用。",warnTitle:"IDE 版本未经测试",warnMessage:"当前 IDE 版本（{{version}}）比最后测试版本（{{tested}}）更新，部分功能可能不正常。建议等待插件更新。"},i1={title:"外部供应商",addProvider:"添加供应商",editProvider:"编辑供应商",deleteProvider:"删除供应商",emptyState:"尚未配置外部供应商。",emptyHint:"将 IDE 流量路由到 OpenAI、Anthropic 或兼容的 API。",activateTip:"激活 — 将所有流量路由到此处",deactivateTip:"停用 — 恢复 Google 流量",edit:"编辑",activeHint:"自定义供应商已激活：",activeDesc:"{{name}}{{model}} 正在处理 IDE 模型流量。在 IDE 中切换模型不会更改实际的上游模型，除非你关闭此供应商。",formName:"名称",formApiType:"API 类型",formBaseUrl:"Base URL",formApiKey:"API 密钥",formModel:"模型",apiKeyUnchanged:"（留空则不修改）",contextWarning:"模型必须支持 ≥200K 上下文输入才能正常配合 IDE Agent 工作。",update:"更新",add:"添加",addMore:"+ 添加供应商"},s1={title:"需要重启 IDE",message:"AntiLoop 安装成功！请退出并重新打开 IDE 以完整激活所有功能。"},a1={common:Lx,header:Bx,modeSwitcher:Hx,proxy:Vx,remoteConfig:Ix,accounts:Ux,pool:qx,settings:Px,logs:Gx,adminSection:Yx,admin:Kx,clientModal:Fx,tokenRow:Xx,pagination:Qx,time:Zx,expiry:Jx,verify:Wx,members:e1,feedback:t1,versionWarning:n1,providers:i1,restartBanner:s1},Ev="antiloop-lang";function l1(){try{const s=localStorage.getItem(Ev);if(s==="zh-CN"||s==="en")return s}catch{}return document.documentElement.lang?.toLowerCase()?.startsWith("zh")||navigator.language?.toLowerCase()?.startsWith("zh")?"zh-CN":"en"}Jt.use(ax).init({resources:{en:{translation:$x},"zh-CN":{translation:a1}},lng:l1(),fallbackLng:"en",interpolation:{escapeValue:!1}});Jt.on("languageChanged",o=>{try{localStorage.setItem(Ev,o)}catch{}});var o1=vv();const r1=gv(o1);function c1(o){if(typeof document>"u")return;let n=document.head||document.getElementsByTagName("head")[0],s=document.createElement("style");s.type="text/css",n.appendChild(s),s.styleSheet?s.styleSheet.cssText=o:s.appendChild(document.createTextNode(o))}const d1=o=>{switch(o){case"success":return f1;case"info":return m1;case"warning":return p1;case"error":return g1;default:return null}},u1=Array(12).fill(0),h1=({visible:o,className:n})=>F.createElement("div",{className:["sonner-loading-wrapper",n].filter(Boolean).join(" "),"data-visible":o},F.createElement("div",{className:"sonner-spinner"},u1.map((s,l)=>F.createElement("div",{className:"sonner-loading-bar",key:`spinner-bar-${l}`})))),f1=F.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",height:"20",width:"20"},F.createElement("path",{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",clipRule:"evenodd"})),p1=F.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",height:"20",width:"20"},F.createElement("path",{fillRule:"evenodd",d:"M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",clipRule:"evenodd"})),m1=F.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",height:"20",width:"20"},F.createElement("path",{fillRule:"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",clipRule:"evenodd"})),g1=F.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",height:"20",width:"20"},F.createElement("path",{fillRule:"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",clipRule:"evenodd"})),v1=F.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"},F.createElement("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),F.createElement("line",{x1:"6",y1:"6",x2:"18",y2:"18"})),b1=()=>{const[o,n]=F.useState(document.hidden);return F.useEffect(()=>{const s=()=>{n(document.hidden)};return document.addEventListener("visibilitychange",s),()=>window.removeEventListener("visibilitychange",s)},[]),o};let Yu=1;class y1{constructor(){this.subscribe=n=>(this.subscribers.push(n),()=>{const s=this.subscribers.indexOf(n);this.subscribers.splice(s,1)}),this.publish=n=>{this.subscribers.forEach(s=>s(n))},this.addToast=n=>{this.publish(n),this.toasts=[...this.toasts,n]},this.create=n=>{var s;const{message:l,...r}=n,c=typeof n?.id=="number"||((s=n.id)==null?void 0:s.length)>0?n.id:Yu++,f=this.toasts.find(b=>b.id===c),p=n.dismissible===void 0?!0:n.dismissible;return this.dismissedToasts.has(c)&&this.dismissedToasts.delete(c),f?this.toasts=this.toasts.map(b=>b.id===c?(this.publish({...b,...n,id:c,title:l}),{...b,...n,id:c,dismissible:p,title:l}):b):this.addToast({title:l,...r,dismissible:p,id:c}),c},this.dismiss=n=>(n?(this.dismissedToasts.add(n),requestAnimationFrame(()=>this.subscribers.forEach(s=>s({id:n,dismiss:!0})))):this.toasts.forEach(s=>{this.subscribers.forEach(l=>l({id:s.id,dismiss:!0}))}),n),this.message=(n,s)=>this.create({...s,message:n}),this.error=(n,s)=>this.create({...s,message:n,type:"error"}),this.success=(n,s)=>this.create({...s,type:"success",message:n}),this.info=(n,s)=>this.create({...s,type:"info",message:n}),this.warning=(n,s)=>this.create({...s,type:"warning",message:n}),this.loading=(n,s)=>this.create({...s,type:"loading",message:n}),this.promise=(n,s)=>{if(!s)return;let l;s.loading!==void 0&&(l=this.create({...s,promise:n,type:"loading",message:s.loading,description:typeof s.description!="function"?s.description:void 0}));const r=Promise.resolve(n instanceof Function?n():n);let c=l!==void 0,f;const p=r.then(async g=>{if(f=["resolve",g],F.isValidElement(g))c=!1,this.create({id:l,type:"default",message:g});else if(_1(g)&&!g.ok){c=!1;const v=typeof s.error=="function"?await s.error(`HTTP error! status: ${g.status}`):s.error,k=typeof s.description=="function"?await s.description(`HTTP error! status: ${g.status}`):s.description,O=typeof v=="object"&&!F.isValidElement(v)?v:{message:v};this.create({id:l,type:"error",description:k,...O})}else if(g instanceof Error){c=!1;const v=typeof s.error=="function"?await s.error(g):s.error,k=typeof s.description=="function"?await s.description(g):s.description,O=typeof v=="object"&&!F.isValidElement(v)?v:{message:v};this.create({id:l,type:"error",description:k,...O})}else if(s.success!==void 0){c=!1;const v=typeof s.success=="function"?await s.success(g):s.success,k=typeof s.description=="function"?await s.description(g):s.description,O=typeof v=="object"&&!F.isValidElement(v)?v:{message:v};this.create({id:l,type:"success",description:k,...O})}}).catch(async g=>{if(f=["reject",g],s.error!==void 0){c=!1;const _=typeof s.error=="function"?await s.error(g):s.error,v=typeof s.description=="function"?await s.description(g):s.description,E=typeof _=="object"&&!F.isValidElement(_)?_:{message:_};this.create({id:l,type:"error",description:v,...E})}}).finally(()=>{c&&(this.dismiss(l),l=void 0),s.finally==null||s.finally.call(s)}),b=()=>new Promise((g,_)=>p.then(()=>f[0]==="reject"?_(f[1]):g(f[1])).catch(_));return typeof l!="string"&&typeof l!="number"?{unwrap:b}:Object.assign(l,{unwrap:b})},this.custom=(n,s)=>{const l=s?.id||Yu++;return this.create({jsx:n(l),id:l,...s}),l},this.getActiveToasts=()=>this.toasts.filter(n=>!this.dismissedToasts.has(n.id)),this.subscribers=[],this.toasts=[],this.dismissedToasts=new Set}}const Dn=new y1,x1=(o,n)=>{const s=n?.id||Yu++;return Dn.addToast({title:o,...n,id:s}),s},_1=o=>o&&typeof o=="object"&&"ok"in o&&typeof o.ok=="boolean"&&"status"in o&&typeof o.status=="number",S1=x1,w1=()=>Dn.toasts,C1=()=>Dn.getActiveToasts(),Nv=Object.assign(S1,{success:Dn.success,info:Dn.info,warning:Dn.warning,error:Dn.error,custom:Dn.custom,message:Dn.message,promise:Dn.promise,dismiss:Dn.dismiss,loading:Dn.loading},{getHistory:w1,getToasts:C1});c1("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");function Ir(o){return o.label!==void 0}const E1=3,N1="24px",j1="16px",Mg=4e3,A1=356,k1=14,T1=45,O1=200;function Ei(...o){return o.filter(Boolean).join(" ")}function R1(o){const[n,s]=o.split("-"),l=[];return n&&l.push(n),s&&l.push(s),l}const D1=o=>{var n,s,l,r,c,f,p,b,g;const{invert:_,toast:v,unstyled:k,interacting:E,setHeights:O,visibleToasts:V,heights:se,index:ee,toasts:oe,expanded:ae,removeToast:de,defaultRichColors:J,closeButton:$,style:S,cancelButtonStyle:I,actionButtonStyle:z,className:W="",descriptionClassName:Q="",duration:ue,position:ce,gap:pe,expandByDefault:ne,classNames:A,icons:Y,closeButtonAriaLabel:le="Close toast"}=o,[ve,be]=F.useState(null),[w,H]=F.useState(null),[U,Z]=F.useState(!1),[re,me]=F.useState(!1),[_e,ye]=F.useState(!1),[Ae,zt]=F.useState(!1),[Ft,Vt]=F.useState(!1),[pn,$t]=F.useState(0),[ie,Et]=F.useState(0),ft=F.useRef(v.duration||ue||Mg),_t=F.useRef(null),at=F.useRef(null),yn=ee===0,sn=ee+1<=V,pt=v.type,G=v.dismissible!==!1,Oe=v.className||"",xn=v.descriptionClassName||"",mt=F.useMemo(()=>se.findIndex(we=>we.toastId===v.id)||0,[se,v.id]),En=F.useMemo(()=>{var we;return(we=v.closeButton)!=null?we:$},[v.closeButton,$]),an=F.useMemo(()=>v.duration||ue||Mg,[v.duration,ue]),ci=F.useRef(0),mn=F.useRef(0),Oi=F.useRef(0),lt=F.useRef(null),[gn,St]=ce.split("-"),gt=F.useMemo(()=>se.reduce((we,Xe,jt)=>jt>=mt?we:we+Xe.height,0),[se,mt]),Nt=b1(),qn=v.invert||_,di=pt==="loading";mn.current=F.useMemo(()=>mt*pe+gt,[mt,gt]),F.useEffect(()=>{ft.current=an},[an]),F.useEffect(()=>{Z(!0)},[]),F.useEffect(()=>{const we=at.current;if(we){const Xe=we.getBoundingClientRect().height;return Et(Xe),O(jt=>[{toastId:v.id,height:Xe,position:v.position},...jt]),()=>O(jt=>jt.filter(It=>It.toastId!==v.id))}},[O,v.id]),F.useLayoutEffect(()=>{if(!U)return;const we=at.current,Xe=we.style.height;we.style.height="auto";const jt=we.getBoundingClientRect().height;we.style.height=Xe,Et(jt),O(It=>It.find(ot=>ot.toastId===v.id)?It.map(ot=>ot.toastId===v.id?{...ot,height:jt}:ot):[{toastId:v.id,height:jt,position:v.position},...It])},[U,v.title,v.description,O,v.id,v.jsx,v.action,v.cancel]);const Nn=F.useCallback(()=>{me(!0),$t(mn.current),O(we=>we.filter(Xe=>Xe.toastId!==v.id)),setTimeout(()=>{de(v)},O1)},[v,de,O,mn]);F.useEffect(()=>{if(v.promise&&pt==="loading"||v.duration===1/0||v.type==="loading")return;let we;return ae||E||Nt?(()=>{if(Oi.current<ci.current){const It=new Date().getTime()-ci.current;ft.current=ft.current-It}Oi.current=new Date().getTime()})():ft.current!==1/0&&(ci.current=new Date().getTime(),we=setTimeout(()=>{v.onAutoClose==null||v.onAutoClose.call(v,v),Nn()},ft.current)),()=>clearTimeout(we)},[ae,E,v,pt,Nt,Nn]),F.useEffect(()=>{v.delete&&(Nn(),v.onDismiss==null||v.onDismiss.call(v,v))},[Nn,v.delete]);function bi(){var we;if(Y?.loading){var Xe;return F.createElement("div",{className:Ei(A?.loader,v==null||(Xe=v.classNames)==null?void 0:Xe.loader,"sonner-loader"),"data-visible":pt==="loading"},Y.loading)}return F.createElement(h1,{className:Ei(A?.loader,v==null||(we=v.classNames)==null?void 0:we.loader),visible:pt==="loading"})}const yi=v.icon||Y?.[pt]||d1(pt);var ui,_n;return F.createElement("li",{tabIndex:0,ref:at,className:Ei(W,Oe,A?.toast,v==null||(n=v.classNames)==null?void 0:n.toast,A?.default,A?.[pt],v==null||(s=v.classNames)==null?void 0:s[pt]),"data-sonner-toast":"","data-rich-colors":(ui=v.richColors)!=null?ui:J,"data-styled":!(v.jsx||v.unstyled||k),"data-mounted":U,"data-promise":!!v.promise,"data-swiped":Ft,"data-removed":re,"data-visible":sn,"data-y-position":gn,"data-x-position":St,"data-index":ee,"data-front":yn,"data-swiping":_e,"data-dismissible":G,"data-type":pt,"data-invert":qn,"data-swipe-out":Ae,"data-swipe-direction":w,"data-expanded":!!(ae||ne&&U),"data-testid":v.testId,style:{"--index":ee,"--toasts-before":ee,"--z-index":oe.length-ee,"--offset":`${re?pn:mn.current}px`,"--initial-height":ne?"auto":`${ie}px`,...S,...v.style},onDragEnd:()=>{ye(!1),be(null),lt.current=null},onPointerDown:we=>{we.button!==2&&(di||!G||(_t.current=new Date,$t(mn.current),we.target.setPointerCapture(we.pointerId),we.target.tagName!=="BUTTON"&&(ye(!0),lt.current={x:we.clientX,y:we.clientY})))},onPointerUp:()=>{var we,Xe,jt;if(Ae||!G)return;lt.current=null;const It=Number(((we=at.current)==null?void 0:we.style.getPropertyValue("--swipe-amount-x").replace("px",""))||0),Pn=Number(((Xe=at.current)==null?void 0:Xe.style.getPropertyValue("--swipe-amount-y").replace("px",""))||0),ot=new Date().getTime()-((jt=_t.current)==null?void 0:jt.getTime()),At=ve==="x"?It:Pn,q=Math.abs(At)/ot;if(Math.abs(At)>=T1||q>.11){$t(mn.current),v.onDismiss==null||v.onDismiss.call(v,v),H(ve==="x"?It>0?"right":"left":Pn>0?"down":"up"),Nn(),zt(!0);return}else{var Ue,Ze;(Ue=at.current)==null||Ue.style.setProperty("--swipe-amount-x","0px"),(Ze=at.current)==null||Ze.style.setProperty("--swipe-amount-y","0px")}Vt(!1),ye(!1),be(null)},onPointerMove:we=>{var Xe,jt,It;if(!lt.current||!G||((Xe=window.getSelection())==null?void 0:Xe.toString().length)>0)return;const ot=we.clientY-lt.current.y,At=we.clientX-lt.current.x;var q;const Ue=(q=o.swipeDirections)!=null?q:R1(ce);!ve&&(Math.abs(At)>1||Math.abs(ot)>1)&&be(Math.abs(At)>Math.abs(ot)?"x":"y");let Ze={x:0,y:0};const wt=ln=>1/(1.5+Math.abs(ln)/20);if(ve==="y"){if(Ue.includes("top")||Ue.includes("bottom"))if(Ue.includes("top")&&ot<0||Ue.includes("bottom")&&ot>0)Ze.y=ot;else{const ln=ot*wt(ot);Ze.y=Math.abs(ln)<Math.abs(ot)?ln:ot}}else if(ve==="x"&&(Ue.includes("left")||Ue.includes("right")))if(Ue.includes("left")&&At<0||Ue.includes("right")&&At>0)Ze.x=At;else{const ln=At*wt(At);Ze.x=Math.abs(ln)<Math.abs(At)?ln:At}(Math.abs(Ze.x)>0||Math.abs(Ze.y)>0)&&Vt(!0),(jt=at.current)==null||jt.style.setProperty("--swipe-amount-x",`${Ze.x}px`),(It=at.current)==null||It.style.setProperty("--swipe-amount-y",`${Ze.y}px`)}},En&&!v.jsx&&pt!=="loading"?F.createElement("button",{"aria-label":le,"data-disabled":di,"data-close-button":!0,onClick:di||!G?()=>{}:()=>{Nn(),v.onDismiss==null||v.onDismiss.call(v,v)},className:Ei(A?.closeButton,v==null||(l=v.classNames)==null?void 0:l.closeButton)},(_n=Y?.close)!=null?_n:v1):null,(pt||v.icon||v.promise)&&v.icon!==null&&(Y?.[pt]!==null||v.icon)?F.createElement("div",{"data-icon":"",className:Ei(A?.icon,v==null||(r=v.classNames)==null?void 0:r.icon)},v.promise||v.type==="loading"&&!v.icon?v.icon||bi():null,v.type!=="loading"?yi:null):null,F.createElement("div",{"data-content":"",className:Ei(A?.content,v==null||(c=v.classNames)==null?void 0:c.content)},F.createElement("div",{"data-title":"",className:Ei(A?.title,v==null||(f=v.classNames)==null?void 0:f.title)},v.jsx?v.jsx:typeof v.title=="function"?v.title():v.title),v.description?F.createElement("div",{"data-description":"",className:Ei(Q,xn,A?.description,v==null||(p=v.classNames)==null?void 0:p.description)},typeof v.description=="function"?v.description():v.description):null),F.isValidElement(v.cancel)?v.cancel:v.cancel&&Ir(v.cancel)?F.createElement("button",{"data-button":!0,"data-cancel":!0,style:v.cancelButtonStyle||I,onClick:we=>{Ir(v.cancel)&&G&&(v.cancel.onClick==null||v.cancel.onClick.call(v.cancel,we),Nn())},className:Ei(A?.cancelButton,v==null||(b=v.classNames)==null?void 0:b.cancelButton)},v.cancel.label):null,F.isValidElement(v.action)?v.action:v.action&&Ir(v.action)?F.createElement("button",{"data-button":!0,"data-action":!0,style:v.actionButtonStyle||z,onClick:we=>{Ir(v.action)&&(v.action.onClick==null||v.action.onClick.call(v.action,we),!we.defaultPrevented&&Nn())},className:Ei(A?.actionButton,v==null||(g=v.classNames)==null?void 0:g.actionButton)},v.action.label):null)};function zg(){if(typeof window>"u"||typeof document>"u")return"ltr";const o=document.documentElement.getAttribute("dir");return o==="auto"||!o?window.getComputedStyle(document.documentElement).direction:o}function M1(o,n){const s={};return[o,n].forEach((l,r)=>{const c=r===1,f=c?"--mobile-offset":"--offset",p=c?j1:N1;function b(g){["top","right","bottom","left"].forEach(_=>{s[`${f}-${_}`]=typeof g=="number"?`${g}px`:g})}typeof l=="number"||typeof l=="string"?b(l):typeof l=="object"?["top","right","bottom","left"].forEach(g=>{l[g]===void 0?s[`${f}-${g}`]=p:s[`${f}-${g}`]=typeof l[g]=="number"?`${l[g]}px`:l[g]}):b(p)}),s}const z1=F.forwardRef(function(n,s){const{id:l,invert:r,position:c="bottom-right",hotkey:f=["altKey","KeyT"],expand:p,closeButton:b,className:g,offset:_,mobileOffset:v,theme:k="light",richColors:E,duration:O,style:V,visibleToasts:se=E1,toastOptions:ee,dir:oe=zg(),gap:ae=k1,icons:de,containerAriaLabel:J="Notifications"}=n,[$,S]=F.useState([]),I=F.useMemo(()=>l?$.filter(U=>U.toasterId===l):$.filter(U=>!U.toasterId),[$,l]),z=F.useMemo(()=>Array.from(new Set([c].concat(I.filter(U=>U.position).map(U=>U.position)))),[I,c]),[W,Q]=F.useState([]),[ue,ce]=F.useState(!1),[pe,ne]=F.useState(!1),[A,Y]=F.useState(k!=="system"?k:typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"),le=F.useRef(null),ve=f.join("+").replace(/Key/g,"").replace(/Digit/g,""),be=F.useRef(null),w=F.useRef(!1),H=F.useCallback(U=>{S(Z=>{var re;return(re=Z.find(me=>me.id===U.id))!=null&&re.delete||Dn.dismiss(U.id),Z.filter(({id:me})=>me!==U.id)})},[]);return F.useEffect(()=>Dn.subscribe(U=>{if(U.dismiss){requestAnimationFrame(()=>{S(Z=>Z.map(re=>re.id===U.id?{...re,delete:!0}:re))});return}setTimeout(()=>{r1.flushSync(()=>{S(Z=>{const re=Z.findIndex(me=>me.id===U.id);return re!==-1?[...Z.slice(0,re),{...Z[re],...U},...Z.slice(re+1)]:[U,...Z]})})})}),[$]),F.useEffect(()=>{if(k!=="system"){Y(k);return}if(k==="system"&&(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?Y("dark"):Y("light")),typeof window>"u")return;const U=window.matchMedia("(prefers-color-scheme: dark)");try{U.addEventListener("change",({matches:Z})=>{Y(Z?"dark":"light")})}catch{U.addListener(({matches:re})=>{try{Y(re?"dark":"light")}catch(me){console.error(me)}})}},[k]),F.useEffect(()=>{$.length<=1&&ce(!1)},[$]),F.useEffect(()=>{const U=Z=>{var re;if(f.every(ye=>Z[ye]||Z.code===ye)){var _e;ce(!0),(_e=le.current)==null||_e.focus()}Z.code==="Escape"&&(document.activeElement===le.current||(re=le.current)!=null&&re.contains(document.activeElement))&&ce(!1)};return document.addEventListener("keydown",U),()=>document.removeEventListener("keydown",U)},[f]),F.useEffect(()=>{if(le.current)return()=>{be.current&&(be.current.focus({preventScroll:!0}),be.current=null,w.current=!1)}},[le.current]),F.createElement("section",{ref:s,"aria-label":`${J} ${ve}`,tabIndex:-1,"aria-live":"polite","aria-relevant":"additions text","aria-atomic":"false",suppressHydrationWarning:!0},z.map((U,Z)=>{var re;const[me,_e]=U.split("-");return I.length?F.createElement("ol",{key:U,dir:oe==="auto"?zg():oe,tabIndex:-1,ref:le,className:g,"data-sonner-toaster":!0,"data-sonner-theme":A,"data-y-position":me,"data-x-position":_e,style:{"--front-toast-height":`${((re=W[0])==null?void 0:re.height)||0}px`,"--width":`${A1}px`,"--gap":`${ae}px`,...V,...M1(_,v)},onBlur:ye=>{w.current&&!ye.currentTarget.contains(ye.relatedTarget)&&(w.current=!1,be.current&&(be.current.focus({preventScroll:!0}),be.current=null))},onFocus:ye=>{ye.target instanceof HTMLElement&&ye.target.dataset.dismissible==="false"||w.current||(w.current=!0,be.current=ye.relatedTarget)},onMouseEnter:()=>ce(!0),onMouseMove:()=>ce(!0),onMouseLeave:()=>{pe||ce(!1)},onDragEnd:()=>ce(!1),onPointerDown:ye=>{ye.target instanceof HTMLElement&&ye.target.dataset.dismissible==="false"||ne(!0)},onPointerUp:()=>ne(!1)},I.filter(ye=>!ye.position&&Z===0||ye.position===U).map((ye,Ae)=>{var zt,Ft;return F.createElement(D1,{key:ye.id,icons:de,index:Ae,toast:ye,defaultRichColors:E,duration:(zt=ee?.duration)!=null?zt:O,className:ee?.className,descriptionClassName:ee?.descriptionClassName,invert:r,visibleToasts:se,closeButton:(Ft=ee?.closeButton)!=null?Ft:b,interacting:pe,position:U,style:ee?.style,unstyled:ee?.unstyled,classNames:ee?.classNames,cancelButtonStyle:ee?.cancelButtonStyle,actionButtonStyle:ee?.actionButtonStyle,closeButtonAriaLabel:ee?.closeButtonAriaLabel,removeToast:H,toasts:I.filter(Vt=>Vt.position==ye.position),heights:W.filter(Vt=>Vt.position==ye.position),setHeights:Q,expandByDefault:p,gap:ae,expanded:ue,swipeDirections:n.swipeDirections})})):null}))});const jv=(...o)=>o.filter((n,s,l)=>!!n&&n.trim()!==""&&l.indexOf(n)===s).join(" ").trim();const $1=o=>o.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();const L1=o=>o.replace(/^([A-Z])|[\s-_]+(\w)/g,(n,s,l)=>l?l.toUpperCase():s.toLowerCase());const $g=o=>{const n=L1(o);return n.charAt(0).toUpperCase()+n.slice(1)};var zu={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const B1=o=>{for(const n in o)if(n.startsWith("aria-")||n==="role"||n==="title")return!0;return!1},H1=x.createContext({}),V1=()=>x.useContext(H1),I1=x.forwardRef(({color:o,size:n,strokeWidth:s,absoluteStrokeWidth:l,className:r="",children:c,iconNode:f,...p},b)=>{const{size:g=24,strokeWidth:_=2,absoluteStrokeWidth:v=!1,color:k="currentColor",className:E=""}=V1()??{},O=l??v?Number(s??_)*24/Number(n??g):s??_;return x.createElement("svg",{ref:b,...zu,width:n??g??zu.width,height:n??g??zu.height,stroke:o??k,strokeWidth:O,className:jv("lucide",E,r),...!c&&!B1(p)&&{"aria-hidden":"true"},...p},[...f.map(([V,se])=>x.createElement(V,se)),...Array.isArray(c)?c:[c]])});const Pe=(o,n)=>{const s=x.forwardRef(({className:l,...r},c)=>x.createElement(I1,{ref:c,iconNode:n,className:jv(`lucide-${$1($g(o))}`,`lucide-${o}`,l),...r}));return s.displayName=$g(o),s};const U1=[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]],Lg=Pe("activity",U1);const q1=[["path",{d:"M12 20v-9",key:"1qisl0"}],["path",{d:"M14 7a4 4 0 0 1 4 4v3a6 6 0 0 1-12 0v-3a4 4 0 0 1 4-4z",key:"uouzyp"}],["path",{d:"M14.12 3.88 16 2",key:"qol33r"}],["path",{d:"M21 21a4 4 0 0 0-3.81-4",key:"1b0z45"}],["path",{d:"M21 5a4 4 0 0 1-3.55 3.97",key:"5cxbf6"}],["path",{d:"M22 13h-4",key:"1jl80f"}],["path",{d:"M3 21a4 4 0 0 1 3.81-4",key:"1fjd4g"}],["path",{d:"M3 5a4 4 0 0 0 3.55 3.97",key:"1d7oge"}],["path",{d:"M6 13H2",key:"82j7cp"}],["path",{d:"m8 2 1.88 1.88",key:"fmnt4t"}],["path",{d:"M9 7.13V6a3 3 0 1 1 6 0v1.13",key:"1vgav8"}]],P1=Pe("bug",q1);const G1=[["path",{d:"M16 14v2.2l1.6 1",key:"fo4ql5"}],["path",{d:"M16 2v4",key:"4m81vk"}],["path",{d:"M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5",key:"1osxxc"}],["path",{d:"M3 10h5",key:"r794hk"}],["path",{d:"M8 2v4",key:"1cmpym"}],["circle",{cx:"16",cy:"16",r:"6",key:"qoo3c4"}]],Y1=Pe("calendar-clock",G1);const K1=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]],F1=Pe("calendar",K1);const X1=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],Fa=Pe("check",X1);const Q1=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]],Z1=Pe("circle-alert",Q1);const J1=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],W1=Pe("circle-check",J1);const e_=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 6v6l4 2",key:"mmk7yg"}]],Av=Pe("clock",e_);const t_=[["path",{d:"M10.94 5.274A7 7 0 0 1 15.71 10h1.79a4.5 4.5 0 0 1 4.222 6.057",key:"1uxyv8"}],["path",{d:"M18.796 18.81A4.5 4.5 0 0 1 17.5 19H9A7 7 0 0 1 5.79 5.78",key:"99tcn7"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]],n_=Pe("cloud-off",t_);const i_=[["path",{d:"M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z",key:"p7xjir"}]],Zs=Pe("cloud",i_);const s_=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]],kv=Pe("copy",s_);const a_=[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"12",cy:"5",r:"1",key:"gxeob9"}],["circle",{cx:"12",cy:"19",r:"1",key:"lyex9k"}]],l_=Pe("ellipsis-vertical",a_);const o_=[["path",{d:"M10 16h.01",key:"1bzywj"}],["path",{d:"M2.212 11.577a2 2 0 0 0-.212.896V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5.527a2 2 0 0 0-.212-.896L18.55 5.11A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",key:"18tbho"}],["path",{d:"M21.946 12.013H2.054",key:"zqlbp7"}],["path",{d:"M6 16h.01",key:"1pmjb7"}]],r_=Pe("hard-drive",o_);const c_=[["path",{d:"M6 16c5 0 7-8 12-8a4 4 0 0 1 0 8c-5 0-7-8-12-8a4 4 0 1 0 0 8",key:"18ogeb"}]],d_=Pe("infinity",c_);const u_=[["path",{d:"m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4",key:"g0fldk"}],["path",{d:"m21 2-9.6 9.6",key:"1j0ho8"}],["circle",{cx:"7.5",cy:"15.5",r:"5.5",key:"yqb3hr"}]],Ku=Pe("key",u_);const h_=[["path",{d:"m5 8 6 6",key:"1wu5hv"}],["path",{d:"m4 14 6-6 2-3",key:"1k1g8d"}],["path",{d:"M2 5h12",key:"or177f"}],["path",{d:"M7 2h1",key:"1t2jsx"}],["path",{d:"m22 22-5-10-5 10",key:"don7ne"}],["path",{d:"M14 18h6",key:"1m8k6r"}]],f_=Pe("languages",h_);const p_=[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]],m_=Pe("layout-dashboard",p_);const g_=[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]],v_=Pe("log-out",g_);const b_=[["path",{d:"M12 13V7",key:"h0r20n"}],["path",{d:"m15 10-3 3-3-3",key:"lzhmyn"}],["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}],["path",{d:"M12 17v4",key:"1riwvh"}],["path",{d:"M8 21h8",key:"1ev6f3"}]],y_=Pe("monitor-down",b_);const x_=[["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}],["line",{x1:"8",x2:"16",y1:"21",y2:"21",key:"1svkeh"}],["line",{x1:"12",x2:"12",y1:"17",y2:"21",key:"vw1qmm"}]],__=Pe("monitor",x_);const S_=[["rect",{x:"14",y:"3",width:"5",height:"18",rx:"1",key:"kaeet6"}],["rect",{x:"5",y:"3",width:"5",height:"18",rx:"1",key:"1wsw3u"}]],w_=Pe("pause",S_);const C_=[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}],["path",{d:"m15 5 4 4",key:"1mk7zo"}]],Zl=Pe("pencil",C_);const E_=[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]],N_=Pe("play",E_);const j_=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],Bg=Pe("plus",j_);const A_=[["path",{d:"M12 2v10",key:"mnfbl"}],["path",{d:"M18.4 6.6a9 9 0 1 1-12.77.04",key:"obofu9"}]],k_=Pe("power",A_);const T_=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]],O_=Pe("refresh-cw",T_);const R_=[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]],D_=Pe("search",R_);const M_=[["path",{d:"m10.852 14.772-.383.923",key:"11vil6"}],["path",{d:"M13.148 14.772a3 3 0 1 0-2.296-5.544l-.383-.923",key:"1v3clb"}],["path",{d:"m13.148 9.228.383-.923",key:"t2zzyc"}],["path",{d:"m13.53 15.696-.382-.924a3 3 0 1 1-2.296-5.544",key:"1bxfiv"}],["path",{d:"m14.772 10.852.923-.383",key:"k9m8cz"}],["path",{d:"m14.772 13.148.923.383",key:"1xvhww"}],["path",{d:"M4.5 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-.5",key:"tn8das"}],["path",{d:"M4.5 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-.5",key:"1g2pve"}],["path",{d:"M6 18h.01",key:"uhywen"}],["path",{d:"M6 6h.01",key:"1utrut"}],["path",{d:"m9.228 10.852-.923-.383",key:"1wtb30"}],["path",{d:"m9.228 13.148-.923.383",key:"1a830x"}]],z_=Pe("server-cog",M_);const $_=[["rect",{width:"20",height:"8",x:"2",y:"2",rx:"2",ry:"2",key:"ngkwjq"}],["rect",{width:"20",height:"8",x:"2",y:"14",rx:"2",ry:"2",key:"iecqi9"}],["line",{x1:"6",x2:"6.01",y1:"6",y2:"6",key:"16zg32"}],["line",{x1:"6",x2:"6.01",y1:"18",y2:"18",key:"nzw8ys"}]],Fu=Pe("server",$_);const L_=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"M12 8v4",key:"1got3b"}],["path",{d:"M12 16h.01",key:"1drbdi"}]],B_=Pe("shield-alert",L_);const H_=[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],V_=Pe("trash-2",H_);const I_=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]],U_=Pe("user",I_);const q_=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744",key:"16gr8j"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]],P_=Pe("users",q_);const G_=[["path",{d:"M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",key:"knzxuh"}],["path",{d:"M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",key:"2jd2cc"}],["path",{d:"M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",key:"rd2r6e"}]],Y_=Pe("waves",G_);const K_=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],Xa=Pe("x",K_);let F_=0,Jl=null;function X_(){return Jl||(typeof window.acquireVsCodeApi=="function"?Jl=window.acquireVsCodeApi():Jl={postMessage:()=>{}},Jl)}function Q_(){if(typeof window<"u"&&window.location&&window.location.port&&!Z_())return window.location.origin;const o=window.__adminHttpPort;return o?`http://127.0.0.1:${o}`:""}function Z_(){return typeof window.acquireVsCodeApi=="function"}function Ee(o,n){const s=Q_();return s?J_(s,o,n):W_(o,n)}async function J_(o,n,s){const r=await(await fetch(`${o}/rpc`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({method:n,params:s})})).json();if(r.error)throw new Error(r.error);return r.result}function W_(o,n){return new Promise((s,l)=>{const r=++F_,c=f=>{const p=f.data;p.type==="response"&&p.id===r&&(window.removeEventListener("message",c),p.error?l(new Error(p.error)):s(p.result))};window.addEventListener("message",c),X_().postMessage({method:o,params:n,id:r})})}function ec(o){const n=Jt.t.bind(Jt);if(!o)return{label:n("expiry.permanent"),className:"cm-expiry-permanent",fullDate:n("clientModal.noExpiration"),isExpired:!1,remainingDays:null};const s=new Date,l=new Date(o),r=l.getTime()-s.getTime(),c=Math.ceil(r/(1e3*60*60)),f=Math.ceil(r/(1e3*60*60*24)),p=l.toLocaleString(void 0,{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",timeZoneName:"short"});if(r<0){const b=Math.abs(c);return{label:b<48?n("expiry.expiredHoursAgo",{hours:b}):n("expiry.expiredDaysAgo",{days:Math.abs(f)}),className:"cm-expiry-expired",fullDate:p,isExpired:!0,remainingDays:f}}return c<=0?{label:n("expiry.expiresSoon"),className:"cm-expiry-danger",fullDate:p,isExpired:!1,remainingDays:0}:c<48?{label:n("expiry.hoursLeft",{hours:c}),className:c<=6?"cm-expiry-danger":"cm-expiry-warn",fullDate:p,isExpired:!1,remainingDays:f}:f<=7?{label:n("expiry.daysLeft",{days:f}),className:"cm-expiry-danger",fullDate:p,isExpired:!1,remainingDays:f}:f<=30?{label:n("expiry.daysLeft",{days:f}),className:"cm-expiry-warn",fullDate:p,isExpired:!1,remainingDays:f}:{label:n("expiry.daysLeft",{days:f}),className:"cm-expiry-ok",fullDate:p,isExpired:!1,remainingDays:f}}function $u(o){return new Date(o).toISOString()}function Lu(o){const n=new Date(o),s=n.getFullYear(),l=String(n.getMonth()+1).padStart(2,"0"),r=String(n.getDate()).padStart(2,"0"),c=String(n.getHours()).padStart(2,"0"),f=String(n.getMinutes()).padStart(2,"0");return`${s}-${l}-${r}T${c}:${f}`}const eS=({client:o,tokens:n,tenantSlug:s,mode:l,onClose:r,onRefresh:c})=>{const{t:f}=tn(),[p,b]=x.useState([]),[g,_]=x.useState(!0),[v,k]=x.useState(""),[E,O]=x.useState(""),[V,se]=x.useState("all"),[ee,oe]=x.useState(""),[ae,de]=x.useState(!1),[J,$]=x.useState(!1),[S,I]=x.useState(!1),[z,W]=x.useState(null),[Q,ue]=x.useState(null),[ce,pe]=x.useState("permanent"),[ne,A]=x.useState(0),[Y,le]=x.useState(0),[ve,be]=x.useState(""),[w,H]=x.useState(!1),[U,Z]=x.useState(""),[re,me]=x.useState(!1),[_e,ye]=x.useState(!1),[Ae,zt]=x.useState(o.contact_email||""),[Ft,Vt]=x.useState(o.notes||""),[pn,$t]=x.useState(!1),[ie,Et]=x.useState(!1),[ft,_t]=x.useState(o.expires_at?"date":"permanent"),[at,yn]=x.useState(30),[sn,pt]=x.useState(o.expires_at?Lu(o.expires_at):""),[G,Oe]=x.useState(!1),[xn,mt]=x.useState(""),[En,an]=x.useState(!1),[ci,mn]=x.useState(o.max_devices??1),[Oi,lt]=x.useState(!1),[gn,St]=x.useState(!1),[gt,Nt]=x.useState(!1),qn=x.useCallback(async()=>{_(!0);try{const L=await Ee("adminListAssignments",{tenantSlug:s,clientId:o.id});b(L.assignments||[])}catch(L){console.error("Load assignments failed:",L)}finally{_(!1)}},[s,o.id]);x.useEffect(()=>{qn()},[qn]);const di=L=>{W(L),pe("duration"),A(30),le(0),be(""),Z("")},Nn=async()=>{if(!z)return;Z("");const L={tenantSlug:s,clientId:o.id,tokenId:z};if(ce==="permanent")L.expiryMode="permanent";else if(ce==="duration"){const he=(ne||0)*24+(Y||0);if(he<=0){Z(f("clientModal.durationMustBePositive"));return}const kt=new Date(Date.now()+he*36e5).toISOString();L.expiryMode="date",L.expiresAt=kt}else if(ce==="date"){if(!ve){Z(f("clientModal.selectDate"));return}const he=$u(ve);if(new Date(he)<=new Date){Z(f("clientModal.dateMustBeFuture"));return}L.expiryMode="date",L.expiresAt=he}k(z);try{await Ee("adminAssignToken",L),await qn(),W(null)}catch(he){console.error("Assign failed:",he),Z(he.message||f("clientModal.assignFailed"))}finally{k("")}},bi=async L=>{O(L);try{await Ee("adminUnassignToken",{tenantSlug:s,clientId:o.id,assignmentId:L}),await qn()}catch(he){console.error("Unassign failed:",he)}finally{O("")}},yi=L=>{ue(L.id),Z(""),L.expires_at?(pe("date"),be(Lu(L.expires_at))):(pe("permanent"),be("")),A(1),le(0)},ui=async L=>{H(!0),Z("");try{const he={tenantSlug:s,clientId:o.id,assignmentId:L,expiryMode:ce};if(ce==="duration"){const kt=(ne||0)*24+(Y||0);if(kt<=0){Z(f("clientModal.durationMustBePositive")),H(!1);return}const Sn=new Date(Date.now()+kt*36e5).toISOString();he.expiryMode="date",he.expiresAt=Sn}else if(ce==="date"){if(!ve){Z(f("clientModal.selectDate")),H(!1);return}const kt=$u(ve);if(new Date(kt)<=new Date){Z(f("clientModal.dateMustBeFuture")),H(!1);return}he.expiresAt=kt}await Ee("adminUpdateAssignment",he),await qn(),ue(null)}catch(he){Z(he.message||f("clientModal.failedToUpdate"))}finally{H(!1)}},_n=async()=>{I(!0);try{await Ee("adminDeleteClient",{tenantSlug:s,clientId:o.id}),c(),r()}catch(L){console.error("Delete client failed:",L)}finally{I(!1)}},we=()=>{const L=`Tenant ID: ${s}
User ID: ${o.client_key}`;navigator.clipboard.writeText(L),de(!0),setTimeout(()=>de(!1),2e3)},Xe=async L=>{$t(!0);try{const he={tenantSlug:s,clientId:o.id};L==="email"&&(he.contactEmail=Ae.trim()),L==="notes"&&(he.notes=Ft.trim()),await Ee("adminUpdateClient",he),c(),L==="email"&&me(!1),L==="notes"&&ye(!1)}catch(he){console.error("Save failed:",he)}finally{$t(!1)}},jt=async()=>{Oe(!0),mt("");try{const L={tenantSlug:s,clientId:o.id,expiryMode:ft};if(ft==="duration"){if(!at||at<=0){mt(f("clientModal.daysMustBePositive")),Oe(!1);return}L.expiryDays=at}else if(ft==="date"){if(!sn){mt(f("clientModal.selectDate")),Oe(!1);return}const he=$u(sn);if(new Date(he)<=new Date){mt(f("clientModal.dateMustBeFuture")),Oe(!1);return}L.expiresAt=he}await Ee("adminUpdateClient",L),c(),Et(!1)}catch(L){mt(L.message||f("clientModal.failedToUpdateExpiry"))}finally{Oe(!1)}},It=()=>{Et(!1),mt(""),_t(o.expires_at?"date":"permanent"),pt(o.expires_at?Lu(o.expires_at):""),yn(30)},Pn=async()=>{lt(!0);try{await Ee("adminUpdateClient",{tenantSlug:s,clientId:o.id,maxDevices:ci}),c(),an(!1)}catch(L){console.error("Save max_devices failed:",L)}finally{lt(!1)}},ot=async()=>{Nt(!0);try{await Ee("adminResetDevices",{tenantSlug:s,clientId:o.id}),c(),St(!1)}catch(L){console.error("Reset devices failed:",L)}finally{Nt(!1)}},At=(()=>{if(ft!=="duration"||!at||at<=0)return null;const L=new Date;return L.setDate(L.getDate()+at),L.toLocaleString(void 0,{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})})(),q=(()=>{if(ft!=="date"||!sn)return null;const he=new Date(sn).getTime()-Date.now();return Math.ceil(he/(1e3*60*60*24))})(),Ue=new Set(p.map(L=>L.token_id)),Ze=n.filter(L=>!Ue.has(L.id));let wt=Ze;if(V!=="all"&&(wt=wt.filter(L=>(L.tier||"free")===V)),ee.trim()){const L=ee.trim().toLowerCase();wt=wt.filter(he=>he.email.toLowerCase().includes(L))}const ln={all:Ze.length,ultra:Ze.filter(L=>(L.tier||"free")==="ultra").length,pro:Ze.filter(L=>(L.tier||"free")==="pro").length,free:Ze.filter(L=>(L.tier||"free")==="free").length},Gn=()=>{c(),r()},xi=ec(o.expires_at),Yn=L=>{const he=new Date(L.replace(" ","T")+"Z").getTime();if(isNaN(he))return L;const kt=Date.now()-he,Sn=Math.floor(kt/6e4),No=Math.floor(kt/36e5),jo=Math.floor(kt/864e5);return Sn<1?f("time.justNow"):Sn<60?f("time.minutesAgo",{n:Sn}):No<24?f("time.hoursAgo",{n:No}):jo<30?f("time.daysAgo",{n:jo}):new Date(he).toLocaleDateString()};return d.jsx("div",{className:"cm-overlay",onClick:Gn,children:d.jsxs("div",{className:"cm-card",onClick:L=>L.stopPropagation(),children:[d.jsxs("div",{className:"cm-header",children:[d.jsx("span",{className:"cm-title",children:f(l==="created"?"clientModal.clientCreated":"clientModal.clientDetails")}),d.jsx("button",{className:"cm-close",onClick:Gn,children:d.jsx(Xa,{size:14})})]}),d.jsxs("div",{className:"cm-body",children:[d.jsxs("div",{className:"cm-info-section",children:[d.jsxs("div",{className:"cm-info-row",children:[d.jsx("span",{className:"cm-label",children:f("clientModal.name")}),d.jsx("span",{className:"cm-value",children:o.name})]}),d.jsxs("div",{className:"cm-info-row",children:[d.jsx("span",{className:"cm-label",children:f("clientModal.email")}),re?d.jsxs("div",{className:"cm-edit-row",children:[d.jsx("input",{className:"admin-input cm-edit-input",value:Ae,onChange:L=>zt(L.target.value),placeholder:f("clientModal.emailPlaceholder"),autoFocus:!0,onKeyDown:L=>L.key==="Enter"&&Xe("email")}),d.jsx("button",{className:"cm-edit-save",onClick:()=>Xe("email"),disabled:pn,children:pn?d.jsx("span",{className:"btn-spinner"}):d.jsx(Fa,{size:14})}),d.jsx("button",{className:"cm-edit-cancel",onClick:()=>{me(!1),zt(o.contact_email||"")},children:d.jsx(Xa,{size:14})})]}):d.jsxs("span",{className:"cm-value cm-value-editable",onClick:()=>me(!0),children:[o.contact_email||d.jsx("span",{className:"cm-placeholder",children:f("clientModal.addEmail")}),d.jsx("span",{className:"cm-edit-icon",children:d.jsx(Zl,{size:12})})]})]}),d.jsxs("div",{className:"cm-info-row",children:[d.jsx("span",{className:"cm-label",children:f("clientModal.notes")}),_e?d.jsxs("div",{className:"cm-edit-row",children:[d.jsx("input",{className:"admin-input cm-edit-input",value:Ft,onChange:L=>Vt(L.target.value),placeholder:f("clientModal.notesPlaceholder"),autoFocus:!0,onKeyDown:L=>L.key==="Enter"&&Xe("notes")}),d.jsx("button",{className:"cm-edit-save",onClick:()=>Xe("notes"),disabled:pn,children:pn?d.jsx("span",{className:"btn-spinner"}):d.jsx(Fa,{size:14})}),d.jsx("button",{className:"cm-edit-cancel",onClick:()=>{ye(!1),Vt(o.notes||"")},children:d.jsx(Xa,{size:14})})]}):d.jsxs("span",{className:"cm-value cm-value-editable",onClick:()=>ye(!0),children:[o.notes||d.jsx("span",{className:"cm-placeholder",children:f("clientModal.addNotes")}),d.jsx("span",{className:"cm-edit-icon",children:d.jsx(Zl,{size:12})})]})]}),d.jsxs("div",{className:"cm-info-row",children:[d.jsx("span",{className:"cm-label",children:f("clientModal.heartbeat")}),d.jsx("span",{className:"cm-value",children:o.last_heartbeat_at?d.jsxs(d.Fragment,{children:[Yn(o.last_heartbeat_at),o.heartbeat_email&&d.jsxs("span",{className:"cm-heartbeat-detail-email",children:[" · ",o.heartbeat_email]})]}):d.jsx("span",{className:"cm-placeholder",children:f("clientModal.notConnected")})})]}),d.jsxs("div",{className:"cm-info-row",children:[d.jsx("span",{className:"cm-label",children:f("clientModal.devices")}),En?d.jsxs("div",{className:"cm-edit-row",children:[d.jsxs("div",{className:"cm-device-stepper",children:[d.jsx("button",{className:"cm-device-step-btn",onClick:()=>mn(L=>Math.max(0,L-1)),children:"−"}),d.jsx("input",{type:"number",className:"admin-input cm-device-input",value:ci,onChange:L=>mn(parseInt(L.target.value)||0),min:"0",autoFocus:!0}),d.jsx("button",{className:"cm-device-step-btn",onClick:()=>mn(L=>L+1),children:"+"})]}),d.jsx("span",{className:"cm-device-hint",children:ci===0?f("clientModal.devicesUnlimited"):""}),d.jsx("button",{className:"cm-edit-save",onClick:Pn,disabled:Oi,children:Oi?d.jsx("span",{className:"btn-spinner"}):d.jsx(Fa,{size:14})}),d.jsx("button",{className:"cm-edit-cancel",onClick:()=>{an(!1),mn(o.max_devices??1)},children:d.jsx(Xa,{size:14})})]}):d.jsxs("div",{className:"cm-device-row",children:[d.jsxs("span",{className:"cm-value cm-value-editable",onClick:()=>an(!0),children:[d.jsxs("span",{className:"cm-device-count",children:[o.device_count??0," / ",(o.max_devices??1)===0?"∞":o.max_devices??1]}),d.jsx("span",{className:"cm-edit-icon",children:d.jsx(Zl,{size:12})})]}),(o.device_count??0)>0&&(gn?d.jsxs("span",{className:"cm-reset-confirm-inline",children:[d.jsx("span",{className:"cm-reset-confirm-text",children:f("clientModal.resetDevicesConfirm")}),d.jsx("button",{className:"cm-reset-confirm-yes",onClick:ot,disabled:gt,children:gt?d.jsx("span",{className:"btn-spinner"}):f("common.yes")}),d.jsx("button",{className:"cm-reset-confirm-no",onClick:()=>St(!1),children:f("common.no")})]}):d.jsx("button",{className:"cm-reset-devices-btn",onClick:()=>St(!0),children:f("clientModal.resetDevices")}))]})]}),d.jsxs("div",{className:"cm-info-row cm-info-row-expiry",children:[d.jsx("span",{className:"cm-label",children:f("clientModal.expiry")}),ie?d.jsxs("div",{className:"cm-expiry-editor",children:[d.jsxs("div",{className:"cm-expiry-mode-tabs",children:[d.jsx("button",{className:`cm-expiry-tab ${ft==="permanent"?"cm-expiry-tab-active":""}`,onClick:()=>_t("permanent"),children:f("clientModal.permanent")}),d.jsx("button",{className:`cm-expiry-tab ${ft==="duration"?"cm-expiry-tab-active":""}`,onClick:()=>_t("duration"),children:f("clientModal.duration")}),d.jsx("button",{className:`cm-expiry-tab ${ft==="date"?"cm-expiry-tab-active":""}`,onClick:()=>_t("date"),children:f("clientModal.date")})]}),ft==="duration"&&d.jsxs("div",{className:"cm-expiry-input-group",children:[d.jsxs("div",{className:"cm-expiry-duration-row",children:[d.jsx("input",{type:"number",className:"admin-input cm-expiry-days-input",value:at,onChange:L=>yn(parseInt(L.target.value)||0),min:"1",autoFocus:!0}),d.jsx("span",{className:"cm-expiry-days-label",children:f("clientModal.days")})]}),At&&d.jsx("div",{className:"cm-expiry-preview",children:f("clientModal.expiresOn",{date:At})})]}),ft==="date"&&d.jsxs("div",{className:"cm-expiry-input-group",children:[d.jsx("input",{type:"datetime-local",className:"admin-input cm-expiry-date-input",value:sn,onChange:L=>pt(L.target.value),min:new Date().toISOString().slice(0,16)}),q!==null&&q>0&&d.jsx("div",{className:"cm-expiry-preview",children:f("clientModal.daysFromNow",{days:q})}),q!==null&&q<=0&&d.jsx("div",{className:"cm-expiry-preview cm-expiry-preview-warn",children:f("clientModal.dateInPast")})]}),ft==="permanent"&&d.jsx("div",{className:"cm-expiry-preview",children:f("clientModal.neverExpire")}),xn&&d.jsx("div",{className:"cm-expiry-error",children:xn}),d.jsxs("div",{className:"cm-expiry-actions",children:[d.jsx("button",{className:"cm-edit-save",onClick:jt,disabled:G,children:G?d.jsx("span",{className:"btn-spinner"}):d.jsx(Fa,{size:14})}),d.jsx("button",{className:"cm-edit-cancel",onClick:It,children:d.jsx(Xa,{size:14})})]})]}):d.jsxs("span",{className:"cm-value cm-value-editable",onClick:()=>Et(!0),children:[xi&&d.jsx("span",{className:`cm-expiry-badge ${xi.className}`,title:xi.fullDate,children:xi.label}),d.jsx("span",{className:"cm-edit-icon",children:d.jsx(Zl,{size:12})})]})]})]}),d.jsxs("div",{className:"cm-credentials",children:[d.jsxs("div",{className:"cm-cred-row",children:[d.jsx("span",{className:"cm-cred-label",children:f("clientModal.tenantId")}),d.jsx("code",{className:"cm-cred-value",children:s})]}),d.jsxs("div",{className:"cm-cred-row",children:[d.jsx("span",{className:"cm-cred-label",children:f("clientModal.clientKey")}),d.jsx("code",{className:"cm-cred-value",children:o.client_key})]}),d.jsx("button",{className:"cm-copy-btn",onClick:we,children:f(ae?"clientModal.copied":"clientModal.copyCredentials")}),l==="created"&&d.jsx("div",{className:"cm-key-warning",children:f("clientModal.saveWarning")})]}),d.jsxs("div",{className:"cm-section",children:[d.jsx("div",{className:"cm-section-header",children:d.jsx("span",{className:"cm-section-title",children:g?f("clientModal.assignedTokensLoading"):f("clientModal.assignedTokens",{count:p.length})})}),g?d.jsx("div",{className:"cm-loading",children:d.jsx("div",{className:"admin-spinner",style:{width:18,height:18}})}):p.length===0?d.jsx("div",{className:"cm-empty",children:f("clientModal.noTokensAssigned")}):d.jsx("div",{className:"cm-token-list",children:p.map(L=>{const he=ec(L.expires_at),kt=he?.isExpired??!1;return d.jsxs("div",{className:`cm-token-item cm-token-assigned ${kt?"cm-token-expired":""}`,children:[d.jsxs("div",{className:"cm-token-main-row",children:[d.jsx("span",{className:`admin-dot ${kt?"admin-dot-expired":"admin-dot-active"}`}),d.jsx("span",{className:"cm-token-email",children:L.email}),d.jsx("span",{className:`admin-tier admin-tier-${L.tier||"free"}`,children:L.tier||"free"}),L.full_access?d.jsx("span",{className:"admin-badge admin-badge-full",children:"FULL"}):null,kt&&d.jsx("span",{className:"admin-badge admin-badge-expired",children:"EXPIRED"}),d.jsx("button",{className:"cm-token-btn cm-token-remove",onClick:()=>bi(L.id),disabled:E===L.id,children:E===L.id?d.jsx("span",{className:"btn-spinner"}):"✕"})]}),Q===L.id?d.jsxs("div",{className:"cm-assign-expiry-editor",children:[d.jsxs("div",{className:"cm-expiry-mode-tabs",children:[d.jsx("button",{className:`cm-expiry-tab ${ce==="permanent"?"cm-expiry-tab-active":""}`,onClick:()=>pe("permanent"),children:d.jsx(d_,{size:14})}),d.jsx("button",{className:`cm-expiry-tab ${ce==="duration"?"cm-expiry-tab-active":""}`,onClick:()=>pe("duration"),children:d.jsx(F1,{size:14})}),d.jsx("button",{className:`cm-expiry-tab ${ce==="date"?"cm-expiry-tab-active":""}`,onClick:()=>pe("date"),children:d.jsx(Y1,{size:14})})]}),ce==="duration"&&d.jsxs("div",{className:"cm-expiry-duration-row",children:[d.jsx("input",{type:"number",className:"admin-input cm-expiry-days-input",value:ne,onChange:Sn=>A(parseInt(Sn.target.value)||0),min:"0",autoFocus:!0}),d.jsx("span",{className:"cm-expiry-days-label",children:"d"}),d.jsx("input",{type:"number",className:"admin-input cm-expiry-days-input",value:Y,onChange:Sn=>le(parseInt(Sn.target.value)||0),min:"0",max:"23"}),d.jsx("span",{className:"cm-expiry-days-label",children:"h"})]}),ce==="date"&&d.jsx("input",{type:"datetime-local",className:"admin-input cm-expiry-date-input",value:ve,onChange:Sn=>be(Sn.target.value),min:new Date().toISOString().slice(0,16)}),U&&d.jsx("div",{className:"cm-expiry-error",children:U}),d.jsxs("div",{className:"cm-expiry-actions",children:[d.jsx("button",{className:"cm-edit-save",onClick:()=>ui(L.id),disabled:w,children:w?d.jsx("span",{className:"btn-spinner"}):d.jsx(Fa,{size:14})}),d.jsx("button",{className:"cm-edit-cancel",onClick:()=>ue(null),children:d.jsx(Xa,{size:14})})]})]}):d.jsxs("div",{className:"cm-assign-expiry-badge",onClick:()=>yi(L),children:[he&&d.jsx("span",{className:`cm-expiry-badge ${he.className}`,title:he.fullDate,children:he.label}),d.jsx("span",{className:"cm-edit-icon",children:d.jsx(Zl,{size:12})})]})]},L.id)})})]}),d.jsxs("div",{className:"cm-section",children:[d.jsx("div",{className:"cm-section-header",children:d.jsx("span",{className:"cm-section-title",children:f("clientModal.addToken")})}),d.jsx("div",{className:"admin-tier-filter",children:["all","ultra","pro","free"].map(L=>{const he=ln[L];return d.jsxs("button",{className:`admin-tier-tab ${V===L?"admin-tier-tab-active":""} ${he===0?"admin-tier-tab-empty":""}`,onClick:()=>{se(L),oe("")},disabled:he===0,children:[L==="all"?f("clientModal.all"):L.charAt(0).toUpperCase()+L.slice(1),d.jsx("span",{className:"admin-tier-tab-count",children:he})]},L)})}),ln.all>5&&d.jsx("input",{className:"admin-input cm-search",placeholder:f("clientModal.searchByEmail"),value:ee,onChange:L=>oe(L.target.value)}),wt.length===0?d.jsx("div",{className:"cm-empty",children:ee.trim()?f("clientModal.noMatchingTokens"):f("clientModal.noAvailableTokens")}):d.jsx("div",{className:"cm-token-list",children:wt.map(L=>d.jsxs("div",{className:`cm-token-item cm-token-available ${z===L.id?"cm-token-pending":""}`,children:[d.jsxs("div",{className:"cm-token-main-row",children:[d.jsx("span",{className:"cm-token-email",children:L.email}),d.jsx("span",{className:`admin-tier admin-tier-${L.tier||"free"}`,children:L.tier||"free"}),L.full_access===1&&d.jsx("span",{className:"admin-badge admin-badge-full",children:"Full"}),z===L.id?d.jsx("button",{className:"cm-token-btn cm-token-cancel",onClick:()=>W(null),children:"✕"}):d.jsx("button",{className:"cm-token-btn cm-token-add",onClick:()=>di(L.id),disabled:!!z||v===L.id,children:v===L.id?d.jsx("span",{className:"btn-spinner"}):"+"})]}),z===L.id&&d.jsxs("div",{className:"cm-assign-picker",children:[d.jsxs("div",{className:"cm-assign-presets",children:[d.jsx("button",{className:`cm-assign-preset ${ce==="permanent"?"cm-assign-preset-active":""}`,onClick:()=>pe("permanent"),children:"∞"}),d.jsx("button",{className:`cm-assign-preset ${ce==="duration"&&ne===0&&Y===1?"cm-assign-preset-active":""}`,onClick:()=>{pe("duration"),A(0),le(1)},children:"1h"}),d.jsx("button",{className:`cm-assign-preset ${ce==="duration"&&ne===1&&Y===0?"cm-assign-preset-active":""}`,onClick:()=>{pe("duration"),A(1),le(0)},children:"1d"}),d.jsx("button",{className:`cm-assign-preset ${ce==="duration"&&ne===30&&Y===0?"cm-assign-preset-active":""}`,onClick:()=>{pe("duration"),A(30),le(0)},children:"30d"}),d.jsx("button",{className:`cm-assign-preset ${ce==="date"?"cm-assign-preset-active":""}`,onClick:()=>pe("date"),children:"📅"})]}),d.jsxs("div",{className:"cm-assign-input-row",children:[ce==="permanent"&&d.jsx("span",{className:"cm-assign-input-hint",children:f("clientModal.permanentHint")}),ce==="duration"&&d.jsxs(d.Fragment,{children:[d.jsx("input",{type:"number",className:"admin-input cm-assign-days-input",value:ne,onChange:he=>A(parseInt(he.target.value)||0),min:"0"}),d.jsx("span",{className:"cm-expiry-days-label",children:"d"}),d.jsx("input",{type:"number",className:"admin-input cm-assign-days-input",value:Y,onChange:he=>le(parseInt(he.target.value)||0),min:"0",max:"23"}),d.jsx("span",{className:"cm-expiry-days-label",children:"h"})]}),ce==="date"&&d.jsx("input",{type:"datetime-local",className:"admin-input cm-assign-date-input",value:ve,onChange:he=>be(he.target.value),min:new Date().toISOString().slice(0,16)}),d.jsx("button",{className:"cm-assign-confirm",onClick:Nn,disabled:v===L.id,children:v===L.id?d.jsx("span",{className:"btn-spinner"}):d.jsx(Fa,{size:14})})]}),U&&d.jsx("div",{className:"cm-expiry-error",children:U})]})]},L.id))})]}),l==="edit"&&d.jsx("div",{className:"cm-danger-zone",children:J?d.jsxs("div",{className:"cm-danger-confirm",children:[d.jsx("span",{className:"cm-danger-text",children:p.length>0?f("clientModal.deleteConfirmWithTokens",{count:p.length}):f("clientModal.deleteConfirm")}),d.jsx("button",{className:"admin-btn-danger-sm",onClick:_n,disabled:S,children:S?d.jsx("span",{className:"btn-spinner"}):f("common.yes")}),d.jsx("button",{className:"admin-btn-cancel-sm",onClick:()=>$(!1),children:f("common.no")})]}):d.jsx("button",{className:"cm-delete-btn",onClick:()=>$(!0),children:f("clientModal.deleteClient")})})]}),d.jsx("div",{className:"cm-footer",children:d.jsx("button",{className:"cm-done-btn",onClick:Gn,children:f(l==="created"?"common.done":"common.close")})})]})})},tS=({width:o="100%",height:n="14px",count:s=1})=>d.jsx(d.Fragment,{children:Array.from({length:s}).map((l,r)=>d.jsx("div",{className:"admin-skeleton",style:{width:o,height:n,borderRadius:"4px"}},r))}),Wl=[{key:"claude",label:"Claude",short:"C",match:o=>(o||"").toLowerCase().indexOf("claude")>=0},{key:"flash",label:"Gemini Flash",short:"GF",match:o=>{const n=(o||"").toLowerCase();return n.indexOf("gemini")>=0&&n.indexOf("flash")>=0}},{key:"pro",label:"Gemini Pro",short:"GP",match:o=>{const n=(o||"").toLowerCase();return n.indexOf("gemini")>=0&&n.indexOf("pro")>=0}}];function nS(o){return o?new Date(o).getTime()<=Date.now():!1}function iS(o){if(!o||o.length===0)return[];const n={};return Wl.forEach(s=>{n[s.key]={label:s.label,models:[]}}),o.forEach(s=>{for(let l=0;l<Wl.length;l++)if(Wl[l].match(s.displayName)){n[Wl[l].key].models.push(s);return}}),Wl.map(s=>{const l=n[s.key];if(l.models.length===0)return null;let r=100,c=!0,f="";l.models.forEach(b=>{const g=nS(b.resetTime);let _=b.remainingPercent,v=!1;g&&_<100&&(_=100,v=!0),v||(c=!1),_<r&&(r=_),b.resetTime&&(!f||b.resetTime<f)&&(f=b.resetTime)});const p=c&&l.models.length>0;return{label:l.label,short:s.short,percent:r,resetTime:f,inferred:p}}).filter(Boolean)}function Hg(o,n){const s=String(o);return s.length>=n?s:" ".repeat(n-s.length)+s}function sS(o){if(!o)return"";const n=new Date(o).getTime()-Date.now();if(n<=0)return"now";const s=Math.floor(n/6e4),l=Math.floor(s/60),r=s%60;return`${Hg(l,3)} h ${Hg(r,2)} m`}const aS="rgba(78, 201, 176, 0.25)";function lS(o,n){return n?aS:o>=40?"rgba(100, 180, 130, 0.55)":o>10?"rgba(220, 170, 60, 0.6)":"rgba(220, 80, 70, 0.6)"}const Tv=({models:o,isDisabled:n})=>{const s=iS(o);return n&&s.length===0?d.jsx("div",{className:"quota-section quota-skeleton",children:[{label:"Claude",short:"C"},{label:"Gemini Flash",short:"GF"},{label:"Gemini Pro",short:"GP"}].map(l=>d.jsxs("div",{className:"quota-row",children:[d.jsxs("span",{className:"quota-label",children:[d.jsx("span",{className:"quota-label-full",children:l.label}),d.jsx("span",{className:"quota-label-short",children:l.short})]}),d.jsx("span",{className:"quota-reset"}),d.jsx("span",{className:"quota-pct skeleton-text",children:"--%"}),d.jsx("div",{className:"quota-bar-bg",children:d.jsx("div",{className:"quota-bar-fill skeleton-bar"})})]},l.label))}):s.length===0?null:d.jsx("div",{className:"quota-section",style:n?{opacity:.55}:void 0,children:s.map(l=>{const r=sS(l.resetTime);return d.jsxs("div",{className:"quota-row",children:[d.jsxs("span",{className:"quota-label",children:[d.jsx("span",{className:"quota-label-full",children:l.label}),d.jsx("span",{className:"quota-label-short",children:l.short})]}),d.jsx("span",{className:"quota-reset",children:r||""}),d.jsxs("span",{className:"quota-pct",children:[l.inferred?"≈":"",l.percent,"%"]}),d.jsx("div",{className:"quota-bar-bg",children:d.jsx("div",{className:"quota-bar-fill",style:{width:`${l.percent}%`,backgroundColor:lS(l.percent,l.inferred)}})})]},l.label)})})};function oS(o,n){if(!o)return null;const s=new Date(o.replace(" ","T")+"Z").getTime();if(isNaN(s))return null;const l=Date.now()-s,r=Math.floor(l/6e4),c=Math.floor(l/36e5),f=Math.floor(l/864e5);return r<1?n("time.justNow"):r<60?n("time.minutesAgo",{n:r}):c<24?n("time.hoursAgo",{n:c}):f<30?n("time.daysAgo",{n:f}):new Date(s).toLocaleDateString()}const rS=({token:o,tenantSlug:n,onRefresh:s,allClients:l,onClientClick:r,quotas:c})=>{const{t:f}=tn(),[p,b]=x.useState(!1),[g,_]=x.useState(!1),[v,k]=x.useState(!1),[E,O]=x.useState(null),[V,se]=x.useState(!1),[ee,oe]=x.useState(null),[ae,de]=x.useState(!1),[J,$]=x.useState(!1),S=x.useRef(null);x.useEffect(()=>{if(!ae)return;const ne=A=>{S.current&&!S.current.contains(A.target)&&(de(!1),$(!1))};return document.addEventListener("mousedown",ne),()=>document.removeEventListener("mousedown",ne)},[ae]),x.useEffect(()=>{if(!E)return;const ne=setTimeout(()=>O(null),3e3);return()=>clearTimeout(ne)},[E]),x.useEffect(()=>{if(!ee)return;const ne=setTimeout(()=>oe(null),3e3);return()=>clearTimeout(ne)},[ee]);const I=async()=>{b(!0);try{await Ee("adminToggleToken",{tenantSlug:n,tokenId:o.id,isActive:!o.is_active}),s()}catch(ne){console.error("Toggle failed:",ne)}finally{b(!1),de(!1)}},z=async()=>{_(!0);try{await Ee("adminDeleteToken",{tenantSlug:n,tokenId:o.id}),s()}catch(ne){console.error("Delete failed:",ne)}finally{_(!1),$(!1),de(!1)}},W=async()=>{k(!0),O(null);try{const ne=await Ee("adminRefreshTokenTier",{tenantSlug:n,tokenId:o.id}),A=ne.hasQuota?" +quota":"";ne.tierChanged?O(`${ne.oldTier} → ${ne.newTier}${A}`):O(`✓ ${ne.newTier}${A}`),s()}catch(ne){console.error("Refresh tier failed:",ne),O("✗ failed")}finally{k(!1)}},Q=async()=>{se(!0),oe(null);try{const ne=await Ee("adminInstallRemoteToken",{tenantSlug:n,tokenId:o.id});oe(`✓ ${ne.email}`)}catch(ne){console.error("Install failed:",ne),oe("✗ failed")}finally{se(!1)}},ue=()=>{navigator.clipboard.writeText(o.email),Nv.success(f("common.copied","Copied")+": "+o.email)},ce=`admin-tier admin-tier-${o.tier||"free"}`,pe=o.is_active?"admin-dot-active":"admin-dot-inactive";return d.jsxs("div",{className:`admin-token-row ${o.is_active?"":"admin-token-disabled"} ${ae?"has-open-menu":""}`,style:ae?{zIndex:9999,position:"relative",borderColor:"var(--accent)"}:void 0,children:[d.jsxs("div",{className:"admin-token-main",children:[d.jsxs("div",{className:"admin-token-header",children:[d.jsx("span",{className:`admin-dot ${pe}`,title:o.is_active?"Active":"Disabled"}),d.jsxs("span",{className:"admin-token-email",onClick:ue,title:"Copy Email",style:{cursor:"pointer",display:"flex",alignItems:"center",gap:6},children:[o.email,d.jsx(kv,{size:12,className:"copy-icon",style:{opacity:.5}})]}),d.jsx("span",{className:ce,style:{marginLeft:4},children:o.tier||"free"}),o.full_access===1&&d.jsx("span",{className:"admin-badge admin-badge-full",children:"Full"}),d.jsx("button",{className:"admin-btn-icon-soft",onClick:W,disabled:v,title:f("tokenRow.refreshTier"),style:{marginLeft:8},children:v?d.jsx("span",{className:"btn-spinner",style:{width:14,height:14}}):d.jsx(O_,{size:14})}),d.jsx("button",{className:"admin-btn-icon-soft",onClick:Q,disabled:V,title:f("tokenRow.installToIDE"),children:V?d.jsx("span",{className:"btn-spinner",style:{width:14,height:14}}):d.jsx(y_,{size:14})}),E&&d.jsx("span",{className:`admin-tier-result ${E.startsWith("✗")?"admin-tier-error":"admin-tier-ok"}`,children:E}),ee&&d.jsx("span",{className:`admin-tier-result ${ee.startsWith("✗")?"admin-tier-error":"admin-tier-ok"}`,children:ee})]}),o.display_name&&d.jsx("div",{className:"admin-token-name",style:{marginTop:4,color:"var(--muted)",fontSize:"0.9em"},children:o.display_name}),o.last_error&&d.jsxs("div",{className:"admin-token-error",style:{display:"flex",alignItems:"center",gap:6,marginTop:8,padding:"8px 12px",background:"rgba(241, 76, 76, 0.1)",borderRadius:6,color:"var(--danger)"},children:[d.jsx(B_,{size:14}),o.last_error]}),c&&c.length>0&&d.jsx("div",{style:{marginTop:12,marginBottom:-4},children:d.jsx(Tv,{isDisabled:!o.is_active,models:c.map(ne=>({id:ne.model_family,displayName:ne.model_family==="claude"?"Claude":ne.model_family==="flash"?"Gemini Flash":"Gemini Pro",family:ne.model_family,quotaUsed:ne.quota_used,quotaLimit:ne.quota_limit,remainingPercent:ne.quota_limit>0?Math.max(0,Math.floor((ne.quota_limit-ne.quota_used)/ne.quota_limit*100)):0,remainingFraction:ne.quota_limit>0?Math.max(0,(ne.quota_limit-ne.quota_used)/ne.quota_limit):0,resetTime:ne.reset_time}))})}),d.jsxs("div",{className:"admin-token-meta",style:{marginTop:8,fontSize:"0.85em",color:"var(--muted)",display:"flex",gap:16},children:[d.jsx("span",{children:f("tokenRow.uploadedOn",{date:new Date(o.created_at).toLocaleDateString()})}),d.jsxs("span",{children:["ID: ",o.id.substring(0,8),"..."]})]}),o.assigned_clients&&o.assigned_clients.length>0&&d.jsxs("div",{className:"admin-token-clients",style:{marginTop:12,display:"flex",flexWrap:"wrap",gap:8,alignItems:"center"},children:[d.jsx(__,{size:14,style:{opacity:.6}}),o.assigned_clients.map(ne=>d.jsx("button",{className:"admin-client-badge-soft",onClick:A=>{A.stopPropagation(),r?.(ne.id)},title:f("tokenRow.viewClient",{name:ne.name}),style:{background:"var(--input-bg)",border:"1px solid var(--border)",padding:"2px 8px",borderRadius:12,fontSize:"0.8em",cursor:"pointer",display:"flex",alignItems:"center",transition:"all 0.2s",color:"var(--fg)"},children:ne.name},ne.id))]}),o.assigned_clients&&o.assigned_clients.length>0&&l&&(()=>{const ne=o.assigned_clients.map(A=>l.find(Y=>Y.id===A.id)).filter(A=>!!A&&!!A.last_heartbeat_at&&A.active_token_id===o.id);return ne.length===0?null:d.jsx("div",{className:"admin-token-heartbeat-info",style:{marginTop:8,background:"rgba(74, 222, 128, 0.05)",padding:"8px 12px",borderRadius:6,border:"1px solid rgba(74, 222, 128, 0.2)"},children:ne.map(A=>d.jsxs("div",{className:"admin-token-hb-row",style:{display:"flex",alignItems:"center",gap:6,fontSize:"0.85em"},children:[d.jsx(W1,{size:12,color:"#4ade80"}),d.jsx("span",{style:{color:"var(--muted)"},children:f("tokenRow.heartbeat")}),d.jsx("span",{style:{fontWeight:500,color:"#4ade80"},children:oS(A.last_heartbeat_at,f)}),d.jsxs("span",{style:{color:"var(--muted)"},children:["(",A.name,")"]})]},A.id))})})()]}),d.jsxs("div",{className:"admin-client-menu-wrap",ref:S,children:[d.jsx("button",{className:"admin-btn-icon-soft",onClick:()=>{de(!ae),$(!1)},children:d.jsx(l_,{size:16})}),ae&&d.jsxs("div",{className:"admin-client-menu",children:[d.jsxs("button",{className:"admin-menu-item",onClick:I,disabled:p,style:{display:"flex",alignItems:"center",gap:6},children:[p?d.jsx("span",{className:"btn-spinner",style:{width:14,height:14}}):o.is_active?d.jsx(w_,{size:14}):d.jsx(N_,{size:14}),p?f("tokenRow.working"):o.is_active?f("tokenRow.disableToken"):f("tokenRow.enableToken")]}),J?d.jsxs("div",{className:"admin-menu-confirm",children:[d.jsx("span",{className:"admin-menu-confirm-text",children:(o.assigned_count??0)>0?f("tokenRow.deleteConfirmClients",{count:o.assigned_count}):f("tokenRow.deleteConfirm")}),d.jsx("button",{className:"admin-btn-danger-sm",onClick:z,disabled:g,children:g?d.jsx("span",{className:"btn-spinner"}):f("common.yes")}),d.jsx("button",{className:"admin-btn-cancel-sm",onClick:()=>$(!1),children:f("common.no")})]}):d.jsxs("button",{className:"admin-menu-item admin-menu-item-danger",onClick:()=>$(!0),style:{display:"flex",alignItems:"center",gap:6},children:[d.jsx(V_,{size:14}),f("tokenRow.deleteToken")]})]})]})]})};function cS(o,n){if(!o)return null;const s=Date.now(),l=new Date(o.replace(" ","T")+"Z").getTime();if(isNaN(l))return null;const r=s-l,c=Math.floor(r/6e4),f=Math.floor(r/36e5),p=Math.floor(r/864e5);let b,g;return c<1?(b=n("time.justNow"),g="online"):c<10?(b=n("time.minutesAgo",{n:c}),g="online"):c<60?(b=n("time.minutesAgo",{n:c}),g="recent"):f<24?(b=n("time.hoursAgo",{n:f}),g="offline"):p<30?(b=n("time.daysAgo",{n:p}),g="offline"):(b=new Date(l).toLocaleDateString(),g="offline"),{label:b,status:g}}const dS=({client:o,tenantSlug:n,onClick:s})=>{const{t:l}=tn(),[r,c]=x.useState({}),[f,p]=x.useState(!1);x.useEffect(()=>{Ee("adminListAssignments",{tenantSlug:n,clientId:o.id}).then(O=>{const V={};for(const se of O.assignments||[]){const ee=se.tier||"free";V[ee]=(V[ee]||0)+1}c(V),p(!0)}).catch(()=>p(!0))},[n,o.id]);const b=o.contact_email||o.name,g=o.contact_email?o.name:null,_=Object.keys(r).length>0,v=ec(o.expires_at),k=cS(o.last_heartbeat_at,l),E=O=>{O.stopPropagation(),navigator.clipboard.writeText(o.client_key||""),Nv.success(l("common.copied","Copied")+": "+o.name)};return d.jsx("div",{className:`admin-token-row cm-clickable-row ${o.is_active?"":"admin-token-disabled"}`,onClick:s,children:d.jsxs("div",{className:"admin-token-main",children:[d.jsxs("div",{className:"admin-token-header",style:{marginBottom:4},children:[d.jsx("span",{className:`admin-dot ${o.is_active?"admin-dot-active":"admin-dot-inactive"}`}),d.jsxs("span",{className:"admin-token-email",style:{display:"flex",alignItems:"center",gap:6},children:[d.jsx(U_,{size:14,style:{opacity:.6}}),b]}),g&&d.jsx("span",{style:{fontSize:"0.85em",color:"var(--muted)",background:"var(--input-bg)",padding:"2px 8px",borderRadius:12},children:g}),d.jsx("div",{className:"spacer",style:{flex:1}}),d.jsx("button",{className:"admin-btn-icon-soft",onClick:E,title:"Copy Auth Token",style:{padding:4},children:d.jsx(kv,{size:14})})]}),d.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:12,alignItems:"center",marginTop:12},children:[_&&Object.entries(r).map(([O,V])=>d.jsxs("span",{className:`admin-tier admin-tier-${O}`,style:{display:"flex",alignItems:"center",gap:4},children:[O," ",d.jsxs("b",{children:["×",V]})]},O)),f&&!_&&d.jsx("span",{className:"cm-no-tokens",style:{fontSize:"0.85em",color:"var(--muted)"},children:l("tokenRow.noTokens")}),k?d.jsxs("span",{className:`cm-heartbeat-badge cm-heartbeat-${k.status}`,title:o.heartbeat_email?l("clientModal.using",{email:o.heartbeat_email}):l("clientModal.recentlyActive"),style:{display:"flex",alignItems:"center",gap:6,padding:"2px 8px",borderRadius:12,background:"rgba(74, 222, 128, 0.1)",color:"#4ade80",fontSize:"0.8em"},children:[d.jsx(Lg,{size:12}),k.label]}):d.jsxs("span",{className:"cm-heartbeat-badge cm-heartbeat-never",title:l("clientModal.neverHeartbeat"),style:{display:"flex",alignItems:"center",gap:6,padding:"2px 8px",borderRadius:12,background:"var(--input-bg)",color:"var(--muted)",fontSize:"0.8em"},children:[d.jsx(Lg,{size:12,style:{opacity:.5}}),l("clientModal.notConnected")]}),v&&d.jsxs("span",{className:`cm-expiry-badge ${v.className}`,title:v.fullDate,style:{display:"flex",alignItems:"center",gap:6,padding:"2px 8px",borderRadius:12,fontSize:"0.8em"},children:[d.jsx(Av,{size:12}),v.label]})]}),d.jsxs("div",{className:"admin-token-meta",style:{marginTop:12,fontSize:"0.85em",color:"var(--muted)",display:"flex",gap:16},children:[d.jsxs("span",{children:[l("clientModal.created","Created:")," ",new Date(o.created_at).toLocaleDateString()]}),d.jsxs("span",{children:["ID: ",o.id.substring(0,8),"..."]})]})]})})},Vg=({currentPage:o,totalPages:n,totalItems:s,pageSize:l,onPageChange:r})=>{const{t:c}=tn();if(n<=1)return null;const f=(o-1)*l+1,p=Math.min(o*l,s),b=()=>{const g=[];g.push(1);const v=Math.max(2,o-1),k=Math.min(n-1,o+1);v>2&&g.push("...");for(let E=v;E<=k;E++)g.push(E);return k<n-1&&g.push("..."),n>1&&g.push(n),g};return d.jsxs("div",{className:"admin-pagination",children:[d.jsx("span",{className:"admin-pagination-info",children:c("pagination.info",{start:f,end:p,total:s})}),d.jsxs("div",{className:"admin-pagination-controls",children:[d.jsx("button",{className:"admin-pagination-btn",disabled:o<=1,onClick:()=>r(o-1),title:c("pagination.previous"),children:"‹"}),b().map((g,_)=>g==="..."?d.jsx("span",{className:"admin-pagination-ellipsis",children:"…"},`ellipsis-${_}`):d.jsx("button",{className:`admin-pagination-btn admin-pagination-num ${g===o?"admin-pagination-active":""}`,onClick:()=>r(g),children:g},g)),d.jsx("button",{className:"admin-pagination-btn",disabled:o>=n,onClick:()=>r(o+1),title:c("pagination.next"),children:"›"})]})]})},uS=({tenantSlug:o,currentAdminEmail:n})=>{const{t:s}=tn(),[l,r]=x.useState([]),[c,f]=x.useState(!0),[p,b]=x.useState(""),[g,_]=x.useState(""),[v,k]=x.useState(!1),[E,O]=x.useState(""),[V,se]=x.useState(null),[ee,oe]=x.useState(null),ae=x.useCallback(async()=>{try{const $=await Ee("adminListMembers",{tenantSlug:o});r($.members||[])}catch($){b($.message)}finally{f(!1)}},[o]);x.useEffect(()=>{f(!0),b(""),O(""),ae()},[ae]);const de=async()=>{const $=g.trim();if($){if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($)){b(s("members.invalidEmail"));return}k(!0),b(""),O("");try{await Ee("adminInviteMember",{tenantSlug:o,email:$}),_(""),O(s("members.invited",{email:$})),await ae(),setTimeout(()=>O(""),4e3)}catch(S){b(S.message)}finally{k(!1)}}},J=async $=>{oe($),b("");try{await Ee("adminRemoveMember",{tenantSlug:o,adminId:$}),se(null),await ae()}catch(S){b(S.message)}finally{oe(null)}};return c?d.jsx("div",{className:"admin-loading-center",style:{padding:"40px 0"},children:d.jsx("div",{className:"admin-spinner",style:{width:24,height:24}})}):d.jsxs("div",{className:"admin-members-section",children:[p&&d.jsxs("div",{className:"admin-error",children:[d.jsxs("span",{children:["⚠ ",p]}),d.jsx("button",{className:"admin-error-dismiss",onClick:()=>b(""),children:"✕"})]}),E&&d.jsx("div",{className:"admin-members-success",children:d.jsxs("span",{children:["✓ ",E]})}),d.jsx("div",{className:"admin-list",children:l.map($=>{const S=$.email===n,I=$.name||$.email,z=$.name?$.email:null;return d.jsxs("div",{className:"admin-member-row",children:[d.jsxs("div",{className:"admin-member-info",children:[d.jsxs("div",{className:"admin-member-name",children:[I,S&&d.jsx("span",{className:"admin-member-you",children:s("members.you")})]}),z&&d.jsx("div",{className:"admin-member-email",children:z})]}),d.jsx("span",{className:`admin-member-role admin-member-role-${$.role}`,children:$.role}),!S&&d.jsx("div",{className:"admin-member-actions",children:V===$.id?d.jsxs("div",{className:"admin-confirm-row",children:[d.jsx("button",{className:"admin-btn-danger-sm",onClick:()=>J($.id),disabled:ee===$.id,children:ee===$.id?d.jsx("span",{className:"btn-spinner"}):s("common.yes")}),d.jsx("button",{className:"admin-btn-cancel-sm",onClick:()=>se(null),children:s("common.no")})]}):d.jsx("button",{className:"admin-btn-icon admin-btn-delete",onClick:()=>se($.id),title:s("members.remove"),children:"✕"})})]},$.id)})}),d.jsxs("div",{className:"admin-members-invite",children:[d.jsx("input",{className:"admin-input",type:"email",value:g,onChange:$=>_($.target.value),placeholder:s("members.invitePlaceholder"),onKeyDown:$=>$.key==="Enter"&&de(),disabled:v}),d.jsx("button",{className:"admin-btn-create",onClick:de,disabled:v||!g.trim(),children:v?d.jsx("span",{className:"btn-spinner"}):s("members.invite")})]}),d.jsx("p",{className:"admin-members-hint",children:s("members.inviteHint")})]})},hS=({tenantSlug:o})=>{const[n,s]=x.useState([]),[l,r]=x.useState(!0),[c,f]=x.useState(""),[p,b]=x.useState("list"),[g,_]=x.useState(null),[v,k]=x.useState(!1),[E,O]=x.useState(""),[V,se]=x.useState(""),[ee,oe]=x.useState(55),[ae,de]=x.useState(1),[J,$]=x.useState(!1),[S,I]=x.useState([]),[z,W]=x.useState([]),[Q,ue]=x.useState(!1),[ce,pe]=x.useState(""),[ne,A]=x.useState(!1),[Y,le]=x.useState([]),[ve,be]=x.useState([]),[w,H]=x.useState([]),[U,Z]=x.useState(""),[re,me]=x.useState(!1),_e=x.useCallback(async()=>{if(o){f("");try{const G=await Ee("adminListPools",{tenantSlug:o});s(G.pools||[])}catch(G){f(G.message)}finally{r(!1)}}},[o]);x.useEffect(()=>{_e()},[_e]);const ye=x.useCallback(async()=>{try{const G=await Ee("adminListAvailableTokens",{tenantSlug:o});le(G.tokens||[])}catch{}},[o]),Ae=x.useCallback(async G=>{ue(!0),f("");try{const[Oe,xn,mt,En]=await Promise.all([Ee("adminListPoolMembers",{tenantSlug:o,poolId:G.id}),Ee("adminListPoolLeases",{tenantSlug:o,poolId:G.id}),Ee("adminListPoolClients",{tenantSlug:o,poolId:G.id}),Ee("adminListClients",{tenantSlug:o})]);I(Oe.members||[]),W(xn.leases||[]),be(mt.clients||[]),H(En.clients||[]),ye()}catch(Oe){f(Oe.message)}finally{ue(!1)}},[o,ye]),zt=G=>{_(G),b("detail"),Ae(G)},Ft=()=>{b("list"),_(null),I([]),W([]),be([]),_e()},Vt=async()=>{if(E.trim()){$(!0),f("");try{await Ee("adminCreatePool",{tenantSlug:o,name:E.trim(),description:V.trim()||void 0,leaseDurationMinutes:ee,maxLeasesPerToken:ae}),O(""),se(""),k(!1),await _e()}catch(G){f(G.message)}finally{$(!1)}}},pn=async G=>{if(confirm("Delete this pool? All members and leases will be removed."))try{await Ee("adminDeletePool",{tenantSlug:o,poolId:G}),g?.id===G?Ft():await _e()}catch(Oe){f(Oe.message)}},$t=async G=>{try{await Ee("adminUpdatePool",{tenantSlug:o,poolId:G.id,fields:{is_active:!G.is_active}}),await _e(),g?.id===G.id&&_({...G,is_active:G.is_active?0:1})}catch(Oe){f(Oe.message)}},ie=async()=>{if(!(!ce||!g)){A(!0),f("");try{await Ee("adminAddPoolMember",{tenantSlug:o,poolId:g.id,tokenId:ce}),pe(""),await Promise.all([Ae(g),ye()])}catch(G){f(G.message)}finally{A(!1)}}},Et=async G=>{if(g)try{await Ee("adminRemovePoolMember",{tenantSlug:o,poolId:g.id,tokenId:G}),await Promise.all([Ae(g),ye()])}catch(Oe){f(Oe.message)}},ft=async G=>{if(g&&confirm("Force-release this lease?"))try{await Ee("adminRevokePoolLease",{tenantSlug:o,poolId:g.id,leaseId:G}),await Ae(g)}catch(Oe){f(Oe.message)}},_t=async()=>{if(!(!U||!g)){me(!0),f("");try{await Ee("adminBindClientToPool",{tenantSlug:o,clientId:U,poolId:g.id}),Z(""),await Ae(g)}catch(G){f(G.message)}finally{me(!1)}}},at=async G=>{if(g)try{await Ee("adminUnbindClientFromPool",{tenantSlug:o,clientId:G}),await Ae(g)}catch(Oe){f(Oe.message)}},yn=new Set(ve.map(G=>G.client_id)),sn=w.filter(G=>!yn.has(G.id)),pt=G=>{const Oe=new Date(G),xn=new Date,mt=Oe.getTime()-xn.getTime(),En=Math.round(mt/6e4);return En<0?`${Math.abs(En)}m ago`:`in ${En}m`};return l?d.jsx("div",{className:"admin-loading-center",style:{padding:"40px 0"},children:d.jsx("div",{className:"admin-spinner"})}):p==="detail"&&g?d.jsxs("div",{className:"admin-pool-detail",children:[d.jsxs("div",{className:"admin-pool-detail-header",children:[d.jsx("button",{className:"admin-btn-back",onClick:Ft,children:"← Back"}),d.jsxs("h3",{className:"admin-pool-detail-title",children:[d.jsx("span",{className:`admin-pool-status-dot ${g.is_active?"active":"inactive"}`}),g.name]}),d.jsxs("div",{className:"admin-pool-detail-actions",children:[d.jsx("button",{className:`admin-btn-sm ${g.is_active?"admin-btn-warn":"admin-btn-success"}`,onClick:()=>$t(g),children:g.is_active?"Pause":"Activate"}),d.jsx("button",{className:"admin-btn-sm admin-btn-danger",onClick:()=>pn(g.id),children:"Delete"})]})]}),d.jsxs("div",{className:"admin-pool-info-grid",children:[d.jsxs("div",{className:"admin-pool-info-item",children:[d.jsx("span",{className:"admin-pool-info-label",children:"Lease Duration"}),d.jsxs("span",{className:"admin-pool-info-value",children:[g.lease_duration_minutes,"m"]})]}),d.jsxs("div",{className:"admin-pool-info-item",children:[d.jsx("span",{className:"admin-pool-info-label",children:"Max Leases/Token"}),d.jsx("span",{className:"admin-pool-info-value",children:g.max_leases_per_token})]}),g.description&&d.jsxs("div",{className:"admin-pool-info-item",style:{gridColumn:"1 / -1"},children:[d.jsx("span",{className:"admin-pool-info-label",children:"Description"}),d.jsx("span",{className:"admin-pool-info-value",children:g.description})]})]}),c&&d.jsxs("div",{className:"admin-error",style:{margin:"8px 0"},children:[d.jsxs("span",{children:["⚠ ",c]}),d.jsx("button",{className:"admin-error-dismiss",onClick:()=>f(""),children:"✕"})]}),Q?d.jsx("div",{className:"admin-loading-center",style:{padding:"20px 0"},children:d.jsx("div",{className:"admin-spinner",style:{width:20,height:20}})}):d.jsxs(d.Fragment,{children:[d.jsxs("div",{className:"admin-pool-section",children:[d.jsx("div",{className:"admin-pool-section-header",children:d.jsxs("h4",{children:["Token Members (",S.length,")"]})}),d.jsx("div",{className:"admin-pool-members-list",children:S.length===0?d.jsx("div",{className:"admin-pool-empty",children:"No tokens in this pool yet"}):S.map(G=>d.jsxs("div",{className:"admin-pool-member-row",children:[d.jsxs("div",{className:"admin-pool-member-info",children:[d.jsx("span",{className:"admin-pool-member-email",children:G.email}),G.tier&&d.jsx("span",{className:`admin-tier admin-tier-${G.tier}`,children:G.tier}),d.jsx("span",{className:`admin-pool-member-status ${G.is_active?"active":"inactive"}`,children:G.is_active?"●":"○"})]}),d.jsx("button",{className:"admin-btn-sm admin-btn-danger",onClick:()=>Et(G.token_id),children:"Remove"})]},G.id))}),d.jsxs("div",{className:"admin-pool-add-member",children:[d.jsxs("select",{className:"admin-select admin-select-sm",value:ce,onChange:G=>pe(G.target.value),children:[d.jsx("option",{value:"",children:"Add token…"}),Y.map(G=>d.jsxs("option",{value:G.id,children:[G.email," (",G.tier,")"]},G.id))]}),d.jsx("button",{className:"admin-btn-sm admin-btn-create",onClick:ie,disabled:!ce||ne,children:ne?"…":"Add"})]})]}),d.jsxs("div",{className:"admin-pool-section",children:[d.jsx("div",{className:"admin-pool-section-header",children:d.jsxs("h4",{children:["Client Access (",ve.length,")"]})}),d.jsx("div",{className:"admin-pool-members-list",children:ve.length===0?d.jsx("div",{className:"admin-pool-empty",children:"No clients bound to this pool yet"}):ve.map(G=>d.jsxs("div",{className:"admin-pool-member-row",children:[d.jsxs("div",{className:"admin-pool-member-info",children:[d.jsx("span",{className:"admin-pool-member-email",children:G.client_name}),G.active_token_email&&d.jsxs("span",{className:"admin-pool-lease-meta",style:{marginLeft:8},children:["→ ",G.active_token_email]})]}),d.jsx("button",{className:"admin-btn-sm admin-btn-danger",onClick:()=>at(G.client_id),children:"Remove"})]},G.access_id))}),d.jsxs("div",{className:"admin-pool-add-member",children:[d.jsxs("select",{className:"admin-select admin-select-sm",value:U,onChange:G=>Z(G.target.value),children:[d.jsx("option",{value:"",children:"Add client…"}),sn.map(G=>d.jsx("option",{value:G.id,children:G.name},G.id))]}),d.jsx("button",{className:"admin-btn-sm admin-btn-create",onClick:_t,disabled:!U||re,children:re?"…":"Add"})]})]}),d.jsxs("div",{className:"admin-pool-section",children:[d.jsxs("div",{className:"admin-pool-section-header",children:[d.jsxs("h4",{children:["Active Leases (",z.filter(G=>!G.released_at).length,")"]}),d.jsx("button",{className:"admin-btn-refresh admin-btn-sm",onClick:()=>g&&Ae(g),children:"↻"})]}),d.jsx("div",{className:"admin-pool-leases-list",children:z.filter(G=>!G.released_at).length===0?d.jsx("div",{className:"admin-pool-empty",children:"No active leases"}):z.filter(G=>!G.released_at).map(G=>d.jsxs("div",{className:"admin-pool-lease-row",children:[d.jsxs("div",{className:"admin-pool-lease-info",children:[d.jsx("span",{className:"admin-pool-lease-client",children:G.client_name}),d.jsx("span",{className:"admin-pool-lease-arrow",children:"→"}),d.jsx("span",{className:"admin-pool-lease-email",children:G.email}),d.jsxs("span",{className:"admin-pool-lease-meta",children:["expires ",pt(G.expires_at),G.renew_count>0&&` · ${G.renew_count}x renewed`]})]}),d.jsx("button",{className:"admin-btn-sm admin-btn-warn",onClick:()=>ft(G.id),children:"Revoke"})]},G.id))})]})]})]}):d.jsxs("div",{className:"admin-pool-list",children:[c&&d.jsxs("div",{className:"admin-error",style:{margin:"0 0 8px 0"},children:[d.jsxs("span",{children:["⚠ ",c]}),d.jsx("button",{className:"admin-error-dismiss",onClick:()=>f(""),children:"✕"})]}),n.length===0&&!v?d.jsxs("div",{className:"admin-empty-state",style:{padding:"60px 20px",background:"rgba(0,0,0,0.02)",borderRadius:12,border:"1px dashed var(--border)",textAlign:"center"},children:[d.jsx("div",{style:{marginBottom:16,opacity:.3},children:d.jsx(Zs,{size:48})}),d.jsx("p",{style:{color:"var(--fg)",fontSize:"1.1em",marginBottom:8},children:"No token pools created yet"}),d.jsx("p",{style:{color:"var(--muted)",fontSize:"0.9em",marginBottom:24},children:"Create a pool to dynamically distribute tokens to clients"}),d.jsx("button",{className:"admin-btn-create",onClick:()=>k(!0),style:{padding:"8px 20px",borderRadius:8},children:"Create Pool"})]}):d.jsxs(d.Fragment,{children:[d.jsx("div",{className:"admin-overview-grid",children:n.map(G=>d.jsxs("div",{className:"admin-stat-card cm-clickable-row",onClick:()=>zt(G),style:{cursor:"pointer",position:"relative",overflow:"hidden"},children:[d.jsx("div",{style:{position:"absolute",top:0,left:0,width:4,height:"100%",background:G.is_active?"var(--success)":"var(--danger)"}}),d.jsx("div",{className:"admin-stat-header",style:{color:G.is_active?"var(--fg)":"var(--muted)",display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%"},children:d.jsxs("span",{style:{display:"flex",alignItems:"center",gap:8},children:[G.is_active?d.jsx(Zs,{size:18}):d.jsx(n_,{size:18}),d.jsx("span",{style:{fontWeight:600,fontSize:"1.1em"},children:G.name})]})}),G.description&&d.jsx("div",{style:{fontSize:"0.85em",color:"var(--muted)",marginTop:-2,marginBottom:8},children:G.description}),d.jsxs("div",{style:{display:"flex",gap:16,marginTop:8},children:[d.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,fontSize:"0.9em"},children:[d.jsx(Ku,{size:14,style:{opacity:.6}}),d.jsx("span",{style:{fontWeight:500},children:G.member_count??0})]}),d.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,fontSize:"0.9em"},children:[d.jsx(Fu,{size:14,style:{opacity:.6}}),d.jsx("span",{style:{fontWeight:500},children:G.active_lease_count??0})]})]}),d.jsxs("div",{style:{marginTop:12,display:"flex",alignItems:"center",gap:16,fontSize:"0.8em",color:"var(--muted)",background:"var(--input-bg)",padding:"6px 12px",borderRadius:6,border:"1px solid var(--border)"},children:[d.jsxs("span",{style:{display:"flex",alignItems:"center",gap:4},children:[d.jsx(Av,{size:12})," ",G.lease_duration_minutes,"m lease"]}),d.jsxs("span",{children:["Max ",G.max_leases_per_token,"/token"]})]})]},G.id))}),d.jsx("div",{style:{marginTop:24,textAlign:"center"},children:d.jsx("button",{className:"admin-btn-create",onClick:()=>k(!v),style:{background:v?"var(--input-bg)":"",color:v?"var(--fg)":""},children:v?"Cancel":"+ Create Another Pool"})})]}),v&&d.jsxs("div",{className:"admin-pool-create-form",children:[d.jsx("input",{className:"admin-input",placeholder:"Pool name",value:E,onChange:G=>O(G.target.value),onKeyDown:G=>G.key==="Enter"&&Vt()}),d.jsx("input",{className:"admin-input",placeholder:"Description (optional)",value:V,onChange:G=>se(G.target.value)}),d.jsxs("div",{className:"admin-pool-create-options",children:[d.jsxs("label",{children:["Lease (min):",d.jsx("input",{type:"number",className:"admin-input admin-input-sm",value:ee,onChange:G=>oe(parseInt(G.target.value)||55),min:5,max:1440,style:{width:70}})]}),d.jsxs("label",{children:["Max leases/token:",d.jsx("input",{type:"number",className:"admin-input admin-input-sm",value:ae,onChange:G=>de(parseInt(G.target.value)||1),min:1,max:5,style:{width:50}})]})]}),d.jsx("button",{className:"admin-btn-create",onClick:Vt,disabled:J||!E.trim(),children:J?d.jsxs(d.Fragment,{children:[d.jsx("span",{className:"btn-spinner"})," Creating…"]}):"Create Pool"})]})]})},fS=({size:o=16})=>d.jsxs("svg",{width:o,height:o,viewBox:"0 0 48 48",children:[d.jsx("path",{fill:"#4285F4",d:"M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"}),d.jsx("path",{fill:"#34A853",d:"M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"}),d.jsx("path",{fill:"#FBBC05",d:"M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"}),d.jsx("path",{fill:"#EA4335",d:"M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"})]}),Ur=30,pS=()=>{const{t:o,i18n:n}=tn(),[s,l]=x.useState("overview"),[r,c]=x.useState(240),f=x.useRef(!1);x.useEffect(()=>{const q=Ze=>{if(!f.current)return;let wt=Ze.clientX;wt<180&&(wt=180),wt>500&&(wt=500),c(wt)},Ue=()=>{f.current&&(f.current=!1,document.body.style.cursor="",document.body.style.userSelect="")};return document.addEventListener("mousemove",q),document.addEventListener("mouseup",Ue),()=>{document.removeEventListener("mousemove",q),document.removeEventListener("mouseup",Ue)}},[]);const p=x.useCallback(q=>{q.preventDefault(),f.current=!0,document.body.style.cursor="col-resize",document.body.style.userSelect="none"},[]),[b,g]=x.useState([]),[_,v]=x.useState(""),[k,E]=x.useState([]),[O,V]=x.useState([]),[se,ee]=x.useState([]),[oe,ae]=x.useState(!0),[de,J]=x.useState(!1),[$,S]=x.useState(""),[I,z]=x.useState(""),[W,Q]=x.useState(""),[ue,ce]=x.useState(!1),[pe,ne]=x.useState(!1),[A,Y]=x.useState(""),[le,ve]=x.useState(!1),[be,w]=x.useState(null),[H,U]=x.useState("edit"),[Z,re]=x.useState(""),[me,_e]=x.useState(!1),[ye,Ae]=x.useState(!1),[zt,Ft]=x.useState([]),[Vt,pn]=x.useState(!1),[$t,ie]=x.useState(null),[Et,ft]=x.useState(!1),[_t,at]=x.useState(""),[yn,sn]=x.useState(""),[pt,G]=x.useState(1),[Oe,xn]=x.useState(1),[mt,En]=x.useState(0),[an,ci]=x.useState(0),[mn,Oi]=x.useState([]),[lt,gn]=x.useState(null),St=x.useCallback(async()=>{try{const q=await Ee("adminStatus");if(!q.loggedIn){ce(!1),ae(!1);return}ce(!0),z(q.email||""),Q(q.name||""),g(q.tenants||[]),q.tenants?.length>0&&!_&&v(q.tenants[0].id)}catch(q){S(q.message)}finally{ae(!1)}},[_]);x.useEffect(()=>{St()},[St]);const gt=x.useCallback(async(q=!1,Ue)=>{if(!_)return;q||J(!0),S("");const Ze=Ue?.tPage??pt,wt=Ue?.cPage??Oe,ln=Ue?.q??_t;try{const[Gn,xi,Yn,L]=await Promise.all([Ee("adminListTokens",{tenantSlug:_,page:Ze,q:ln}),Ee("adminListClients",{tenantSlug:_,page:wt,q:ln}),Ee("adminListPools",{tenantSlug:_}).catch(()=>({pools:[]})),Ee("adminListQuotaReports",{tenantSlug:_}).catch(()=>[])]);E(Gn.tokens||[]),En(Gn.total??0),V(xi.clients||[]),ci(xi.total??0),ee(Yn.pools||[]),Oi(Array.isArray(L)?L:L.reports||[])}catch(Gn){S(Gn.message)}finally{J(!1)}},[_,pt,Oe,_t]),Nt=x.useCallback(()=>gt(!0),[gt]);x.useEffect(()=>{gt()},[gt]);const[qn,di]=x.useState(!1);x.useEffect(()=>{const q=setTimeout(()=>{_t!==yn&&(at(yn),G(1),xn(1))},300);return()=>clearTimeout(q)},[yn,_t]),x.useEffect(()=>{sn(""),at(""),G(1),xn(1)},[s]),x.useEffect(()=>{sn(""),at(""),G(1),xn(1)},[_]);const Nn=Math.max(1,Math.ceil(mt/Ur)),bi=Math.max(1,Math.ceil(an/Ur)),yi=async()=>{if(!pe){ne(!0),S("");try{const q=await Ee("adminLogin");q?.ok?await St():S(q?.error||"Login failed")}catch(q){S(q.message)}finally{ne(!1)}}},ui=async()=>{try{await Ee("adminLogout"),ce(!1),z(""),Q(""),g([]),v(""),E([]),V([])}catch(q){S(q.message)}},_n=async()=>{if(!(!A.trim()||!_)){ve(!0);try{const q=await Ee("adminCreateClient",{tenantSlug:_,name:A.trim()});q?.client&&(w(q.client),U("created")),Y(""),gt(!0)}catch(q){S(q.message)}finally{ve(!1)}}},we=async()=>{if(Z.trim()){_e(!0),S("");try{await Ee("adminCreateTenant",{name:Z.trim()});const q=await Ee("adminStatus");g(q.tenants||[]),q.tenants?.length>0&&v(q.tenants[0].id),re("")}catch(q){S(q.message)}finally{_e(!1)}}},Xe=async()=>{ft(!0),S("");try{const q=await Ee("adminLoginAndUpload",{tenantSlug:_});q?.ok?q.needsVerification&&q.accountId&&q.email?(gn({accountId:q.accountId,email:q.email,step:"verify",validationUrl:q.validationUrl||""}),q.validationUrl&&Ee("openExternal",{url:q.validationUrl}).catch(()=>{try{window.vscodeApi?.postMessage({type:"openUrl",url:q.validationUrl})}catch{}})):(await gt(!0),q.uploadError&&S(`Saved locally but upload failed: ${q.uploadError}`)):S(q?.error||"Login & Upload failed")}catch(q){S(q.message)}finally{ft(!1)}},jt=()=>{lt?.validationUrl&&Ee("openExternal",{url:lt.validationUrl}).catch(()=>{try{window.vscodeApi?.postMessage({type:"openUrl",url:lt.validationUrl})}catch{}})},It=async()=>{if(lt){gn({...lt,step:"resolving"});try{const q=await Ee("adminResolveProject",{accountId:lt.accountId,tenantSlug:_});q?.ok?(gn(null),await gt(!0),q.uploadError&&S(`Project resolved but upload failed: ${q.uploadError}`)):gn({...lt,step:"failed",errorMsg:q?.error||"Project ID is still not available.",validationUrl:q?.validationUrl||lt.validationUrl})}catch(q){gn({...lt,step:"failed",errorMsg:q.message})}}},Pn=async()=>{if(Ae(!ye),!ye&&zt.length===0){pn(!0);try{const q=await Ee("adminListLocalAccounts");Ft(q.accounts||[])}catch(q){S(q.message)}finally{pn(!1)}}},ot=async q=>{ie(q);try{await Ee("adminUploadLocalToken",{accountId:q,tenantSlug:_}),gt(!0)}catch(Ue){S(Ue.message)}finally{ie(null)}},At=x.useCallback(q=>{n.changeLanguage(q)},[n]);return oe?d.jsxs("div",{className:"admin-panel",children:[d.jsx("div",{className:"admin-panel-header",children:d.jsx("h1",{className:"admin-panel-title",children:o("admin.title")})}),d.jsx("div",{className:"admin-panel-body",children:d.jsxs("div",{className:"admin-loading-center",children:[d.jsx("div",{className:"admin-spinner"}),d.jsx("p",{children:o("admin.loadingAdmin")})]})})]}):ue?b.length===0&&!$?d.jsxs("div",{className:"admin-panel",children:[d.jsxs("div",{className:"admin-panel-header",children:[d.jsx("h1",{className:"admin-panel-title",children:o("admin.title")}),d.jsx("span",{className:"admin-panel-email",children:I})]}),d.jsxs("div",{className:"admin-panel-body",children:[d.jsxs("div",{className:"admin-empty-state",children:[d.jsx("div",{className:"admin-empty-icon",children:"🏢"}),d.jsx("p",{children:o("admin.noTenants")}),d.jsxs("div",{className:"admin-create-tenant-form",children:[d.jsx("input",{className:"admin-input",value:Z,onChange:q=>re(q.target.value),placeholder:o("admin.tenantPlaceholder")}),d.jsx("button",{className:"admin-btn-create",onClick:we,disabled:me||!Z.trim(),children:me?d.jsxs(d.Fragment,{children:[d.jsx("span",{className:"btn-spinner"})," ",o("common.creating")]}):o("admin.createTenant")})]})]}),$&&d.jsxs("div",{className:"admin-error",style:{marginTop:12},children:[d.jsxs("span",{children:["⚠ ",$]}),d.jsx("button",{className:"admin-error-dismiss",onClick:()=>S(""),children:"✕"})]})]})]}):d.jsxs("div",{className:"admin-dashboard-layout",children:[d.jsx(z1,{position:"top-right",theme:"dark",richColors:!0}),d.jsxs("nav",{className:"admin-sidebar",style:{width:r},children:[d.jsx("div",{className:"admin-sidebar-resizer",onMouseDown:p}),d.jsxs("div",{className:"admin-sidebar-header",children:[d.jsx("h2",{children:"🔄 AntiLoop"}),d.jsx("span",{className:"admin-sidebar-email",children:W||I})]}),b.length>1&&d.jsx("div",{className:"admin-sidebar-tenant",children:d.jsx("select",{value:_,onChange:q=>v(q.target.value),className:"admin-select",children:b.map(q=>d.jsx("option",{value:q.id,children:q.name},q.id))})}),d.jsxs("div",{className:"admin-sidebar-menu",children:[d.jsxs("button",{className:`admin-menu-item ${s==="overview"?"active":""}`,onClick:()=>l("overview"),children:[d.jsx(m_,{})," ",o("admin.overview","Overview")]}),d.jsxs("button",{className:`admin-menu-item ${s==="clients"?"active":""}`,onClick:()=>l("clients"),children:[d.jsx(Fu,{})," ",o("admin.clients"),!de&&an>0&&d.jsx("span",{className:"admin-badge-count",children:an})]}),d.jsxs("button",{className:`admin-menu-item ${s==="tokens"?"active":""}`,onClick:()=>l("tokens"),children:[d.jsx(Ku,{})," ",o("admin.tokens"),!de&&mt>0&&d.jsx("span",{className:"admin-badge-count",children:mt})]}),d.jsxs("button",{className:`admin-menu-item ${s==="pools"?"active":""}`,onClick:()=>l("pools"),children:[d.jsx(Zs,{})," Pools"]}),d.jsxs("button",{className:`admin-menu-item ${s==="members"?"active":""}`,onClick:()=>l("members"),children:[d.jsx(P_,{})," ",o("admin.members")]})]}),d.jsxs("div",{className:"admin-sidebar-footer",children:[d.jsxs("div",{className:"admin-lang-switcher",style:{margin:"0 0 12px 0"},children:[d.jsx("button",{className:`admin-lang-btn ${n.language==="zh-CN"?"admin-lang-active":""}`,onClick:()=>At("zh-CN"),children:"中"}),d.jsx("button",{className:`admin-lang-btn ${n.language==="en"?"admin-lang-active":""}`,onClick:()=>At("en"),children:"EN"})]}),d.jsxs("button",{className:"admin-btn-logout",onClick:ui,title:o("admin.signOut"),children:[d.jsx(v_,{size:16})," ",o("admin.signOut")]})]})]}),d.jsxs("main",{className:"admin-main",children:[d.jsxs("header",{className:"admin-topbar",children:[d.jsx("div",{className:"admin-topbar-title",children:d.jsx("h1",{children:s==="overview"?o("admin.overview","Overview"):s==="clients"?o("admin.clients"):s==="tokens"?o("admin.tokens"):s==="pools"?"Pools":o("admin.members")})}),!de&&(s==="tokens"||s==="clients")&&d.jsxs("div",{className:"admin-search-box",children:[d.jsx(D_,{}),d.jsx("input",{placeholder:o(s==="tokens"?"admin.searchTokens":"admin.searchClients"),value:yn,onChange:q=>sn(q.target.value)})]}),d.jsxs("div",{className:"admin-topbar-actions",children:[s==="tokens"&&d.jsxs(d.Fragment,{children:[d.jsxs("button",{className:"admin-btn-primary",onClick:Pn,style:{background:"transparent",border:"1px solid var(--border)",color:"var(--fg)"},children:[d.jsx(Zs,{})," ",o("admin.localUpload","Local Upload")]}),d.jsxs("button",{className:"admin-btn-primary",onClick:Xe,disabled:Et,children:[Et?d.jsx("span",{className:"btn-spinner"}):d.jsx(Bg,{}),o("admin.addToken","Add Token")]})]}),s==="clients"&&d.jsxs("button",{className:"admin-btn-primary",onClick:()=>di(!qn),children:[d.jsx(Bg,{})," ",o("admin.newClient","New Client")]})]})]}),d.jsxs("div",{className:"admin-content-scroll",children:[$&&d.jsxs("div",{className:"admin-error",children:[d.jsx(Z1,{size:16})," ",$,d.jsx("button",{className:"admin-error-dismiss",onClick:()=>S(""),children:"✕"})]}),de?d.jsx("div",{className:"admin-skeleton-list",children:d.jsx(tS,{height:"80px",count:4})}):d.jsxs(d.Fragment,{children:[s==="overview"&&d.jsxs("div",{className:"fade-in",children:[d.jsx("div",{className:"section-title",style:{marginBottom:12,opacity:.8,fontSize:"0.9em",textTransform:"uppercase",letterSpacing:"1px"},children:"Global Stats"}),d.jsxs("div",{className:"admin-overview-grid",children:[d.jsxs("div",{className:"admin-stat-card",children:[d.jsxs("div",{className:"admin-stat-header",children:[d.jsx(Fu,{})," ",o("admin.clients")]}),d.jsx("div",{className:"admin-stat-value",children:an}),d.jsxs("div",{className:"admin-stat-footer success",children:[O.filter(q=>q.active_token_id).length," Active"]})]}),d.jsxs("div",{className:"admin-stat-card",children:[d.jsxs("div",{className:"admin-stat-header",children:[d.jsx(Ku,{})," ",o("admin.tokens")]}),d.jsx("div",{className:"admin-stat-value",children:mt}),d.jsxs("div",{className:"admin-stat-footer",children:[k.filter(q=>q.is_active).length," Enabled"]})]}),d.jsxs("div",{className:"admin-stat-card",children:[d.jsxs("div",{className:"admin-stat-header",children:[d.jsx(Zs,{})," Total Pools"]}),d.jsx("div",{className:"admin-stat-value",children:se.length}),d.jsx("div",{className:"admin-stat-footer",children:"Currently running"})]})]}),d.jsx("div",{className:"section-title",style:{marginTop:32,marginBottom:16,opacity:.8,fontSize:"0.9em",textTransform:"uppercase",letterSpacing:"1px"},children:"Pool Usage"}),se.length>0?d.jsx("div",{className:"admin-overview-grid",children:se.map(q=>d.jsxs("div",{className:"admin-stat-card",style:{borderColor:q.is_active?"var(--border)":"var(--danger-border, #f14c4c40)"},children:[d.jsxs("div",{className:"admin-stat-header",style:{color:q.is_active?"var(--fg)":"var(--danger)"},children:[d.jsx(Zs,{size:18})," ",q.name]}),d.jsxs("div",{className:"admin-stat-value",style:{display:"flex",alignItems:"baseline",gap:8},children:[d.jsx("span",{children:q.active_lease_count||0}),d.jsxs("span",{style:{fontSize:"0.5em",color:"var(--muted)",fontWeight:500},children:["/ ",q.member_count||0," tokens"]})]}),d.jsx("div",{className:"admin-stat-footer",style:{marginTop:4},children:d.jsx("div",{style:{width:"100%",background:"var(--input-bg)",height:6,borderRadius:3,overflow:"hidden",marginTop:8},children:d.jsx("div",{style:{width:`${q.member_count?Math.min(100,Math.round((q.active_lease_count||0)/q.member_count*100)):0}%`,background:"var(--accent)",height:"100%",transition:"width 0.3s"}})})})]},q.id))}):d.jsxs("div",{className:"admin-empty-state",style:{padding:"40px 20px",background:"rgba(0,0,0,0.02)",borderRadius:8,border:"1px dashed var(--border)"},children:[d.jsx(Zs,{size:32,style:{opacity:.3,marginBottom:16}}),d.jsx("p",{style:{color:"var(--muted)"},children:"No pools configured yet."})]})]}),s==="tokens"&&d.jsxs("div",{className:"fade-in",children:[ye&&d.jsxs("div",{className:"section fade-in",style:{marginBottom:20},children:[d.jsx("div",{className:"section-title",children:"Local Tokens"}),Vt?d.jsx("div",{className:"admin-spinner"}):zt.length===0?d.jsx("p",{className:"admin-upload-empty",children:o("admin.noLocalAccounts")}):d.jsx("div",{className:"admin-upload-list",children:zt.map(q=>{const Ue=k.some(Ze=>Ze.email===q.email);return d.jsxs("div",{className:`admin-upload-item ${Ue?"admin-upload-done":""}`,children:[d.jsxs("div",{className:"admin-upload-info",children:[d.jsx("span",{className:"admin-upload-email",children:q.email}),d.jsx("span",{className:`admin-tier admin-tier-${q.tier||"free"}`,children:q.tier||"free"}),Ue&&d.jsx("span",{className:"admin-upload-check",children:"✓"})]}),d.jsx("div",{className:"admin-upload-actions",children:d.jsx("button",{className:"admin-btn-upload-go",disabled:Ue||$t===q.id,onClick:()=>ot(q.id),children:$t===q.id?d.jsx("span",{className:"btn-spinner"}):o(Ue?"admin.uploaded":"admin.upload")})})]},q.id)})})]}),k.length===0&&!_t?d.jsxs("div",{className:"admin-empty-state",children:[d.jsx("div",{className:"admin-empty-icon",children:"🔑"}),d.jsx("p",{children:o("admin.noTokens")})]}):k.length===0&&_t?d.jsxs("div",{className:"admin-empty-state",children:[d.jsx("div",{className:"admin-empty-icon",children:"🔍"}),d.jsx("p",{children:o("admin.noTokensMatch",{query:_t})})]}):d.jsxs(d.Fragment,{children:[d.jsx("div",{className:"admin-list",children:k.map(q=>d.jsx(rS,{token:q,tenantSlug:_,quotas:mn.filter(Ue=>Ue.token_id===q.id),onRefresh:Nt,allClients:O,onClientClick:Ue=>{const Ze=O.find(wt=>wt.id===Ue);Ze&&(l("clients"),w(Ze),U("edit"))}},q.id))}),d.jsx(Vg,{currentPage:pt,totalPages:Nn,totalItems:mt,pageSize:Ur,onPageChange:G})]})]}),s==="clients"&&d.jsxs("div",{className:"fade-in",children:[qn&&d.jsxs("div",{className:"section fade-in",style:{marginBottom:20},children:[d.jsx("div",{className:"section-title",children:"Create New Client"}),d.jsxs("div",{className:"admin-create-client",style:{display:"flex",gap:10},children:[d.jsx("input",{className:"admin-search-box",style:{flex:1},value:A,onChange:q=>Y(q.target.value),placeholder:o("admin.newClientPlaceholder"),onKeyDown:q=>{q.key==="Enter"&&_n().then(()=>di(!1))}}),d.jsx("button",{className:"admin-btn-primary",onClick:()=>{_n().then(()=>di(!1))},disabled:le&&!A.trim(),children:o("common.create","Create")})]})]}),O.length===0&&!_t?d.jsxs("div",{className:"admin-empty-state",children:[d.jsx("div",{className:"admin-empty-icon",children:"🖥️"}),d.jsx("p",{children:o("admin.noClients")})]}):O.length===0&&_t?d.jsxs("div",{className:"admin-empty-state",children:[d.jsx("div",{className:"admin-empty-icon",children:"🔍"}),d.jsx("p",{children:o("admin.noClientsMatch",{query:_t})})]}):d.jsxs(d.Fragment,{children:[d.jsx("div",{className:"admin-list",children:O.map(q=>d.jsx(dS,{client:q,tenantSlug:_,onClick:()=>{w(q),U("edit")}},q.id))}),d.jsx(Vg,{currentPage:Oe,totalPages:bi,totalItems:an,pageSize:Ur,onPageChange:xn})]})]}),s==="pools"&&d.jsx(hS,{tenantSlug:_}),s==="members"&&d.jsx(uS,{tenantSlug:_,currentAdminEmail:I})]})]})]}),be&&d.jsx(eS,{client:be,tenantSlug:_,mode:H,onClose:()=>w(null),onRefresh:Nt,tokens:k}),lt&&d.jsx("div",{className:"admin-modal-overlay",children:d.jsxs("div",{className:"admin-modal",style:{maxWidth:460},children:[d.jsxs("div",{className:"admin-modal-header",children:[d.jsx("h2",{children:o("admin.verifyRequired")}),d.jsx("button",{className:"icon-btn",onClick:()=>{gn(null),gt()},children:"✕"})]}),d.jsxs("div",{className:"admin-modal-body",children:[d.jsx("p",{style:{marginBottom:16},children:o("admin.verifyDesc",{email:lt.email})}),lt.errorMsg&&d.jsxs("div",{className:"admin-error",style:{marginBottom:16},children:["⚠ ",lt.errorMsg]}),lt.step==="resolving"?d.jsxs("div",{className:"admin-loading-center",children:[d.jsx("span",{className:"admin-spinner",style:{marginBottom:8}}),d.jsx("p",{children:o("admin.resolving")})]}):d.jsxs("div",{style:{display:"flex",gap:12,justifyContent:"flex-end"},children:[lt.validationUrl&&d.jsx("button",{className:"admin-btn-secondary",onClick:jt,children:o("admin.openValidationPage")}),d.jsx("button",{className:"admin-btn-primary",onClick:It,children:o("admin.iHaveVerified")})]})]})]})})]}):d.jsxs("div",{className:"admin-panel",children:[d.jsxs("div",{className:"admin-panel-header",children:[d.jsx("h1",{className:"admin-panel-title",children:o("admin.title")}),d.jsx("div",{className:"admin-panel-header-spacer"}),d.jsxs("div",{className:"admin-lang-switcher",children:[d.jsx("button",{className:`admin-lang-btn ${n.language==="zh-CN"?"admin-lang-active":""}`,onClick:()=>At("zh-CN"),children:"中"}),d.jsx("button",{className:`admin-lang-btn ${n.language==="en"?"admin-lang-active":""}`,onClick:()=>At("en"),children:"EN"})]})]}),d.jsx("div",{className:"admin-panel-body",children:d.jsxs("div",{className:"admin-login-screen",children:[d.jsx("div",{className:"admin-login-icon",children:"🔐"}),d.jsx("h2",{className:"admin-login-heading",children:o("admin.loginHeading")}),d.jsx("p",{className:"admin-login-desc",children:o("admin.loginDesc")}),$&&d.jsxs("div",{className:"admin-error",style:{marginBottom:16},children:[d.jsxs("span",{children:["⚠ ",$]}),d.jsx("button",{className:"admin-error-dismiss",onClick:()=>S(""),children:"✕"})]}),d.jsx("button",{className:"admin-login-google-btn",onClick:yi,disabled:pe,children:pe?d.jsxs(d.Fragment,{children:[d.jsx("span",{className:"btn-spinner"})," ",o("admin.signingIn")]}):d.jsxs(d.Fragment,{children:[d.jsx(fS,{}),o("admin.signInWithGoogle")]})})]})})]})};let eo=null;function Bu(){return eo||(typeof window.acquireVsCodeApi=="function"?eo=window.acquireVsCodeApi():eo={postMessage:()=>{},getState:()=>({}),setState:()=>{}},eo)}const Ov=x.createContext(null),qr=new Set(["getNetworkEnhance","setNetworkEnhance","getNetworkMode","setNetworkMode","setMaxRetries","getOpenAI","setOpenAI"]),mS=({children:o})=>{const[n,s]=x.useState(()=>{let J=!1;try{localStorage.getItem("antiloop:showRemoteModes")==="true"&&(J=!0)}catch{}return{enabled:!1,accounts:[],currentEmail:"",activeSource:"local",viewingTab:"local",activeFamily:"claude",quotaSettings:{display:!0,claude:!0,flash:!0,pro:!0},quotaThreshold:20,remoteConfig:{tenantSlug:"",hasKey:!1},admin:{loggedIn:!1},deviceError:null,remoteServerError:null,proxyEnabled:!0,proxyPort:0,poolState:"off",poolDenied:null,showRemoteModes:J,networkEnhance:!1,networkMode:2,maxRetries:10,devMode:!1,ideVersion:"",pluginVersion:"",credits:null,providers:[],activeProviderID:0,openaiEnabled:!1,openaiEmail:"",openaiModels:[],needsRestart:!1}}),l=x.useRef({local:null,static:null,pool:null}),[r,c]=x.useState([]),[f,p]=x.useState(!1),b=x.useRef(!1),g=x.useRef(0),_=x.useRef(1),v=x.useRef({}),k=x.useRef({}),E=x.useCallback((J,$="info")=>{const S=new Date().toLocaleTimeString("en-US",{hour12:!1});g.current+=1,c(I=>[...I,{id:g.current,time:S,text:J,level:$}])},[]),O=x.useCallback(()=>{c([])},[]),V=x.useCallback((J,$)=>{const S=_.current++;v.current[S]=J,qr.has(J)||E(`→ ${J}${$?" "+JSON.stringify($):""}`,"info"),Bu().postMessage({id:S,method:J,params:$})},[E]),se=x.useCallback((J,$)=>new Promise((S,I)=>{const z=_.current++;v.current[z]=J,k.current[z]={resolve:S,reject:I},qr.has(J)||E(`→ ${J}${$?" "+JSON.stringify($):""}`,"info"),Bu().postMessage({id:z,method:J,params:$})}),[E]),ee=x.useCallback(()=>{p(J=>J||!0)},[]),oe=x.useCallback(()=>{b.current||(b.current=!0,V("getStatus"),V("listAccountsWithQuota"),V("getActiveModelFamily"),V("getQuotaSettings"),V("getNetworkEnhance"),V("getNetworkMode"),V("getOpenAI"),V("adminStatus"))},[V]);x.useEffect(()=>{const J=setTimeout(oe,1500),$=setTimeout(()=>{f||ee()},8e3);return()=>{clearTimeout(J),clearTimeout($)}},[oe,ee]),x.useEffect(()=>{const J=$=>{const S=$.data;if(S.type==="state"){console.log("[startup] ← state push:",{activeSource:S.data.activeSource,accounts:S.data.accounts?.length,enabled:S.data.enabled,currentEmail:S.data.currentEmail}),ee(),b.current=!0,s(I=>{const z={...I,...S.data},W=S.data.activeSource||I.activeSource;return S.data.accounts&&(l.current[W]=S.data.accounts,I.viewingTab===W?z.accounts=S.data.accounts:z.accounts=I.accounts),S.data.activeFamily&&(z.activeFamily=S.data.activeFamily),S.data.quotaSettings&&(z.quotaSettings=S.data.quotaSettings),S.data.activeSource&&(z.activeSource=S.data.activeSource,I.viewingTab===I.activeSource?(z.viewingTab=S.data.activeSource,console.log(`[startup] viewingTab synced: ${I.viewingTab} → ${S.data.activeSource} (was viewing activeSource)`)):(z.viewingTab=I.viewingTab,console.log(`[startup] viewingTab kept: ${I.viewingTab} (was browsing different tab, activeSource=${S.data.activeSource})`))),S.data.remoteConfig&&(z.remoteConfig=S.data.remoteConfig),S.data.admin&&(z.admin=S.data.admin),z});return}if(S.type==="response"){const I=v.current[S.id]||"?";delete v.current[S.id];const z=k.current[S.id];if(delete k.current[S.id],ee(),I==="restartBackend"){S.error?E(`← restartBackend: ERROR — ${S.error}`,"error"):E("← restartBackend: OK — backend restarted","info"),z?.resolve(S.result);return}S.result&&(qr.has(I)||E(`← ${I}: OK`,"info"),s(W=>{const Q={...W};if(S.result.accounts&&I==="listAccountsWithQuota"){const ue=S.result.source||Q.activeSource;l.current[ue]=S.result.accounts,Q.viewingTab===ue&&(Q.accounts=S.result.accounts)}if(S.result.accounts&&I==="listAccountsForSource"){const ue=S.result.source;l.current[ue]=S.result.accounts,Q.viewingTab===ue&&(Q.accounts=S.result.accounts)}return S.result.enabled!==void 0&&(Q.enabled=S.result.enabled),S.result.currentEmail&&(Q.currentEmail=S.result.currentEmail),S.result.family&&(Q.activeFamily=S.result.family),S.result.display!==void 0&&(Q.quotaSettings={display:S.result.display,claude:S.result.claude!==!1,flash:S.result.flash!==!1,pro:S.result.pro!==!1}),S.result.threshold!==void 0&&(Q.quotaThreshold=S.result.threshold),S.result.networkEnhance!==void 0&&(Q.networkEnhance=S.result.networkEnhance),S.result.networkMode!==void 0&&(Q.networkMode=S.result.networkMode),S.result.maxRetries!==void 0&&(Q.maxRetries=S.result.maxRetries),S.result.openaiEnabled!==void 0&&(Q.openaiEnabled=S.result.openaiEnabled),S.result.openaiEmail!==void 0&&(Q.openaiEmail=S.result.openaiEmail),S.result.openaiModels!==void 0&&(Q.openaiModels=S.result.openaiModels),I==="getStatus"&&(console.log("[startup] ← getStatus response:",{activeSource:S.result.activeSource,enabled:S.result.enabled,currentEmail:S.result.currentEmail,remoteConfig:S.result.remoteConfig}),S.result.activeSource&&(Q.activeSource=S.result.activeSource,W.viewingTab===W.activeSource&&(Q.viewingTab=S.result.activeSource,console.log(`[startup] viewingTab synced: ${W.viewingTab} → ${S.result.activeSource} (via getStatus response)`))),S.result.remoteConfig&&(Q.remoteConfig={tenantSlug:S.result.remoteConfig.tenantSlug||"",hasKey:S.result.remoteConfig.hasKey||!1,clientKey:S.result.remoteConfig.clientKey||""}),S.result.remoteServerError!==void 0&&S.result.remoteServerError!==null&&(Q.remoteServerError=S.result.remoteServerError),S.result.proxyEnabled!==void 0&&(Q.proxyEnabled=S.result.proxyEnabled),S.result.proxyPort!==void 0&&(Q.proxyPort=S.result.proxyPort)),I==="switchMode"&&S.result.ok&&(S.result.activeSource&&(Q.activeSource=S.result.activeSource,Q.viewingTab=S.result.activeSource),S.result.currentEmail!==void 0&&(Q.currentEmail=S.result.currentEmail),S.result.accounts&&(Q.accounts=S.result.accounts,l.current[Q.activeSource]=S.result.accounts)),I==="adminStatus"&&(Q.admin={loggedIn:S.result.loggedIn||!1,email:S.result.email,name:S.result.name,tenants:S.result.tenants}),I==="adminLogin"&&S.result.ok&&(Q.admin={loggedIn:!0,email:S.result.email,name:S.result.name,tenants:S.result.tenants}),I==="adminLogout"&&S.result.ok&&(Q.admin={loggedIn:!1}),S.result.providers!==void 0&&(Q.providers=S.result.providers),S.result.activeProviderID!==void 0&&(Q.activeProviderID=S.result.activeProviderID),Q}),(S.result.ok!==void 0||I==="addAccount")&&(V("getStatus"),V("listAccountsWithQuota")),I==="addAccount"&&V("listAccountsForSource",{source:"local"}),z?.resolve(S.result)),S.error&&(qr.has(I)||E(`← ${I}: ERROR - ${S.error}`,"error"),I==="enable"&&s(W=>({...W,enabled:!1})),z?.reject(new Error(S.error)));return}if(S.type==="notification"){if(S.method==="ready")b.current=!1,oe();else if(S.method==="injectToken")E(`Token injected: ${S.params.email} (expires in ${S.params.expiresIn}s)`,"info");else if(S.method==="updateStatus"){const I=S.params,z=`Status: ${I.enabled?"ON → "+(I.currentEmail||""):"OFF"}`+(I.nextRotation?` | next: ${new Date(I.nextRotation).toLocaleTimeString()}`:"")+(I.error?` | WARNING: ${I.error}`:"");E(z,I.error?"error":"info"),s(W=>{const Q={...W,enabled:I.enabled,currentEmail:I.currentEmail||"",...I.activeSource?{activeSource:I.activeSource}:{}};return I.activeSource&&W.viewingTab===W.activeSource&&(Q.viewingTab=I.activeSource),Q})}else if(S.method==="quotaUpdate"){const I=S.params?.models,z=S.params?.credits||null;s(W=>{const Q={...W};if(z&&(Q.credits=z),I&&I.length>0){const ue=S.params?.email||W.currentEmail;if(ue){const ce=I.map(pe=>({displayName:pe.name,remainingPercent:pe.percent,remainingFraction:pe.percent/100,resetTime:pe.resetTime}));Q.accounts=W.accounts.map(pe=>pe.email===ue?{...pe,models:ce}:pe)}}return Q})}else E(`[notification] ${S.method}`,"warn");if(S.method==="deviceLimitReached"){const I=S.params?.message||"Device limit reached";s(z=>({...z,deviceError:I})),E(`DEVICE LIMIT: ${I}`,"error")}if(S.method==="remoteServerError"){const I=S.params?.error??"";s(z=>({...z,remoteServerError:I})),I?E(`SERVER: ${I}`,"error"):E("SERVER: connected","info")}if((S.method==="updateStatus"||S.method==="injectToken")&&V("getStatus"),S.method==="stateChanged"&&(V("getNetworkEnhance"),V("getNetworkMode"),V("getOpenAI")),S.method==="proxyError"){const I=S.params,z=I.source==="upstream"?`⚡ ${I.provider}`:"🌐 Google",W=I.statusCode?` [${I.statusCode}]`:"",Q=I.body?`
${I.body.substring(0,500)}`:"";E(`${z}${W} ${I.error}${I.endpoint?" → "+I.endpoint:""}${Q}`,"error")}if(S.method==="poolStateChanged"){const I=S.params;E(`[pool] state → ${I.state}${I.lease?" ("+I.lease.email+")":""}`,"info"),s(z=>({...z,poolState:I.state,poolDenied:I.denied||null})),V("listAccountsForSource",{source:"pool"})}}};return window.addEventListener("message",J),Bu().postMessage({method:"webviewReady"}),()=>{window.removeEventListener("message",J)}},[E,oe,ee,V]),x.useEffect(()=>{const J=setInterval(()=>{V("listAccountsWithQuota")},3e5);return()=>clearInterval(J)},[V]);const ae=x.useCallback(J=>{s($=>{if($.viewingTab===J)return $;const S=l.current[J];return{...$,viewingTab:J,accounts:S??[]}}),l.current[J]===null&&V("listAccountsForSource",{source:J})},[V]),de=x.useCallback(J=>{try{localStorage.setItem("antiloop:showRemoteModes",String(J))}catch{}s($=>{const S={...$,showRemoteModes:J};if(!J&&$.viewingTab!=="local"){const I=l.current.local;S.viewingTab="local",S.accounts=I??[]}return S}),J||s($=>($.activeSource!=="local"&&V("switchMode",{mode:"local"}),$))},[V]);return x.useEffect(()=>{E("Panel opened","info")},[E]),d.jsx(Ov.Provider,{value:{state:n,logs:r,sendToExt:V,sendToExtAsync:se,addLog:E,clearLogs:O,initialized:f,setViewingTab:ae,setShowRemoteModes:de},children:o})},ri=()=>{const o=x.useContext(Ov);if(!o)throw new Error("useVSCodeApi must be used within VSCodeProvider");return o},gS=()=>d.jsx("svg",{viewBox:"0 0 1699 1699",fill:"currentColor",children:d.jsxs("g",{transform:"translate(-430,2129) scale(1,-1)",children:[d.jsx("path",{d:"M1910 2039 l-205 -89 -218 -218 c-213 -212 -217 -217 -186 -220 30 -3 47 11 235 199 l202 202 158 68 c88 37 160 67 161 66 1 -1 -15 -62 -36 -135 l-38 -134 -214 -214 c-168 -168 -215 -210 -220 -196 -4 9 -14 54 -24 100 l-18 84 133 133 c94 94 131 138 127 149 -4 9 -12 16 -19 16 -7 0 -76 -63 -154 -141 l-141 -140 23 -102 c12 -56 26 -130 30 -165 l9 -63 256 258 256 258 48 170 c26 94 50 178 53 188 2 9 0 17 -4 16 -5 0 -101 -41 -214 -90z"}),d.jsx("path",{d:"M812 1087 l-382 -382 0 -60 0 -60 78 -78 77 -77 55 0 55 0 383 383 382 382 0 75 0 76 -63 62 -63 62 -69 0 -70 0 -383 -383z m502 227 c31 -30 9 -84 -34 -84 -24 0 -50 26 -50 50 0 24 26 50 50 50 10 0 26 -7 34 -16z m-201 -142 c15 -7 13 -12 -18 -42 -19 -19 -35 -40 -35 -47 0 -25 48 -14 75 18 29 36 34 35 41 -12 5 -29 1 -39 -28 -67 -34 -32 -35 -32 -86 -21 -50 12 -51 13 -63 61 -11 49 -11 50 22 84 32 33 56 40 92 26z m-443 -521 c0 -28 -28 -47 -48 -34 -24 15 -27 44 -7 59 22 17 55 1 55 -25z"}),d.jsx("path",{d:"M1000 675 l-23 -25 159 0 c89 0 201 -7 254 -15 52 -8 100 -15 105 -15 6 0 -28 -25 -75 -55 l-85 -55 -251 0 -251 0 -23 -25 -23 -25 279 0 279 0 143 91 c78 51 141 93 139 95 -14 14 -367 54 -476 54 -123 0 -128 -1 -151 -25z"}),d.jsx("path",{d:"M1105 576 c-95 -30 -86 -35 60 -35 l140 1 -41 18 c-56 26 -112 32 -159 16z"})]})}),th=()=>d.jsx("svg",{viewBox:"0 0 16 16",className:"iconSvg",children:d.jsx("path",{d:"M8 4.5L2.5 10l.7.7L8 5.9l4.8 4.8.7-.7L8 4.5z"})}),nh=()=>d.jsx("svg",{viewBox:"0 0 16 16",className:"iconSvg",children:d.jsx("path",{d:"M8 11.5l5.5-5.5-.7-.7L8 10.1 3.2 5.3l-.7.7L8 11.5z"})}),Rv=()=>d.jsx("svg",{viewBox:"0 0 16 16",className:"iconSvg",children:d.jsx("path",{d:"M13.5 2v4h-4l1.6-1.6A4.5 4.5 0 0 0 3.5 8a4.5 4.5 0 0 0 4.5 4.5A4.5 4.5 0 0 0 12.1 10h1.1A5.5 5.5 0 0 1 8 13.5 5.5 5.5 0 0 1 2.5 8 5.5 5.5 0 0 1 8 2.5c1.4 0 2.7.5 3.7 1.5L13.5 2z"})}),vS=()=>d.jsxs("svg",{viewBox:"0 0 16 16",className:"iconSvg",children:[d.jsx("circle",{cx:"4",cy:"8",r:"1.2"}),d.jsx("circle",{cx:"8",cy:"8",r:"1.2"}),d.jsx("circle",{cx:"12",cy:"8",r:"1.2"})]}),bS=()=>d.jsx("svg",{viewBox:"0 0 16 16",className:"iconSvg",children:d.jsx("path",{d:"M10 3h3v1h-1v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4H3V3h3V2h4v1zM5 4v9h6V4H5zm1 1h1v7H6V5zm3 0h1v7H9V5z"})}),yS=()=>d.jsx("svg",{viewBox:"0 0 16 16",className:"iconSvg",children:d.jsx("path",{d:"M4 2l10 6-10 6V2z"})}),Dv=()=>d.jsx("svg",{viewBox:"0 0 16 16",className:"iconSvg",children:d.jsx("path",{d:"M13.23 1h-1.46L3.52 9.25l-.16.22L1 13.59 2.41 15l4.12-2.36.22-.16L15 4.23V2.77L13.23 1zM2.41 13.59l1.51-3 1.45 1.45-2.96 1.55zm3.83-2.06L4.47 9.76l8-8 1.77 1.77-8 8z"})}),xS=()=>{const{t:o}=tn(),{sendToExtAsync:n,state:s}=ri(),[l,r]=x.useState(!1),c=x.useRef(!1),f=x.useCallback(async()=>{if(!c.current){c.current=!0,r(!0);try{await n("restartBackend")}catch{}finally{c.current=!1,r(!1)}}},[n]);return d.jsxs("div",{className:"header-container",children:[d.jsx("div",{className:"header-icon",children:d.jsx(gS,{})}),d.jsxs("div",{className:"header-title-group",children:[d.jsx("h2",{children:"AntiLoop"}),s.pluginVersion&&d.jsxs("span",{className:"header-version",children:["v",s.pluginVersion]})]}),d.jsx("div",{className:"header-actions",children:d.jsxs("button",{className:`header-restart-btn ${l?"busy":""}`,onClick:f,disabled:l,title:o("header.restartBackend"),children:[l?d.jsx("span",{className:"btn-spinner"}):d.jsx(Rv,{}),d.jsx("span",{className:"header-restart-label",children:o("header.restartBackend")})]})})]})},Ig={switching:!1,refreshing:!1,movingUp:!1,movingDown:!1,toggling:!1,removing:!1},_S=({account:o,isFirst:n,isLast:s,prevId:l,nextId:r,externalRefreshing:c})=>{const{t:f}=tn(),{state:p,sendToExtAsync:b}=ri(),[g,_]=x.useState(!1),[v,k]=x.useState(Ig),E=x.useRef(Ig),O=p.viewingTab==="local",V=o.email===p.currentEmail&&p.viewingTab===p.activeSource,se=o.status==="excluded",ee=o.tier&&o.tier!=="unknown"?o.tier:null,oe=O?null:ec(o.expiresAt),ae=oe?.isExpired??!1,de=se||ae,J=O&&!!o.alias,$=Object.values(v).some(Boolean)||!!c,S=v.refreshing||!!c,I=x.useCallback(async(z,W,Q)=>{if(!E.current[z]){E.current={...E.current,[z]:!0},k(ue=>({...ue,[z]:!0}));try{W==="selectAccount"&&p.viewingTab!==p.activeSource&&await b("switchMode",{mode:p.viewingTab}),await b(W,Q)}catch{}finally{E.current={...E.current,[z]:!1},k(ue=>({...ue,[z]:!1}))}}},[b,p.viewingTab,p.activeSource]);return d.jsx("div",{className:`account-card ${de?"account-disabled":""} ${V?"account-active":""} ${v.switching?"account-switching":""}`,children:d.jsx("div",{className:"account-card-inner",children:d.jsxs("div",{className:"account-content",children:[d.jsxs("div",{className:"account-top-row",children:[V?d.jsx("button",{className:`icon-btn active-indicator ${ae||$?"disabled":""} ${v.switching?"busy":""}`,onClick:()=>!ae&&!$&&I("switching","selectAccount",{id:o.id}),"data-tip":ae?f("accounts.expired"):v.switching?f("accounts.reapplying"):f("accounts.currentAccount"),children:v.switching?d.jsx("span",{className:"btn-spinner accent"}):d.jsx("span",{className:"active-dot"})}):d.jsx("button",{className:`icon-btn use-btn-primary ${de||$?"disabled":""} ${v.switching?"busy":""}`,onClick:()=>!de&&I("switching","selectAccount",{id:o.id}),"data-tip":ae?f("accounts.expired"):v.switching?f("accounts.switching"):f("accounts.useThisAccount"),children:v.switching?d.jsx("span",{className:"btn-spinner accent"}):d.jsx(yS,{})}),d.jsxs("span",{className:"account-email",title:o.email,children:[J?o.alias:o.email,J&&d.jsx("span",{className:"account-alias-email",children:o.email})]}),O&&d.jsx("button",{className:"icon-btn alias-edit-btn",onClick:async()=>{try{await b("promptAccountAlias",{id:o.id,currentAlias:o.alias||"",email:o.email})}catch{}},"data-tip":f(J?"accounts.editAlias":"accounts.setAlias"),children:d.jsx(Dv,{})}),oe&&oe.label!=="∞ Permanent"&&d.jsx("span",{className:`cm-expiry-badge ${oe.className}`,title:oe.fullDate,style:{fontSize:"0.7em",padding:"1px 5px"},children:oe.label}),ee&&d.jsx("span",{className:`badge badge-tier-${o.tier}`,children:ee}),d.jsx("span",{className:"account-spacer"}),d.jsxs("div",{className:"account-actions",style:{position:"relative"},children:[d.jsx("button",{className:`icon-btn action-btn ${ae||$?"disabled":""} ${S?"busy":""}`,onClick:()=>!ae&&I("refreshing","refreshAccount",{id:o.id,source:p.viewingTab}),"data-tip":f(ae?"accounts.expired":S?"accounts.refreshing":"accounts.refreshAccount"),children:S?d.jsx("span",{className:"btn-spinner"}):d.jsx(Rv,{})}),O&&d.jsxs(d.Fragment,{children:[d.jsx("button",{className:`icon-btn action-btn ${n||$?"disabled":""} ${v.movingUp?"busy":""}`,onClick:()=>!n&&I("movingUp","swapAccountOrder",{id1:o.id,id2:l}),"data-tip":f("accounts.moveUp"),children:v.movingUp?d.jsx("span",{className:"btn-spinner"}):d.jsx(th,{})}),d.jsx("button",{className:`icon-btn action-btn ${s||$?"disabled":""} ${v.movingDown?"busy":""}`,onClick:()=>!s&&I("movingDown","swapAccountOrder",{id1:o.id,id2:r}),"data-tip":f("accounts.moveDown"),children:v.movingDown?d.jsx("span",{className:"btn-spinner"}):d.jsx(nh,{})}),d.jsx("button",{className:`icon-btn action-btn ${$?"disabled":""}`,onClick:()=>!$&&_(!g),"data-tip":f("accounts.moreActions"),"data-tip-align":"right",children:d.jsx(vS,{})})]}),g&&O&&d.jsx("div",{className:"context-menu",children:d.jsx("button",{className:`menu-item danger ${v.removing?"menu-item-busy":""}`,onClick:()=>{v.removing||(_(!1),I("removing","removeAccount",{id:o.id}))},children:v.removing?d.jsxs(d.Fragment,{children:[d.jsx("span",{className:"btn-spinner"})," ",f("common.removing")]}):d.jsxs(d.Fragment,{children:[d.jsx(bS,{})," ",f("accounts.removeAccount")]})})}),g&&O&&d.jsx("div",{className:"context-menu-backdrop",onClick:()=>_(!1)})]})]}),d.jsx(Tv,{models:o.models||[],isDisabled:se}),d.jsx("div",{className:"account-credits",children:o.credits!=null&&o.credits>0?d.jsxs(d.Fragment,{children:[d.jsx("span",{className:"credits-icon",children:"✦"}),d.jsx("span",{className:"credits-label",children:"AI Credits:"}),d.jsx("span",{className:"credits-value",children:o.credits.toLocaleString()}),d.jsxs("label",{className:"credits-toggle","data-tip":o.useAICredits?"Click to disable credit consumption":"Click to enable credit consumption",children:[d.jsx("input",{type:"checkbox",checked:!!o.useAICredits,onChange:()=>b("toggleAccountAICredits",{id:o.id,enabled:!o.useAICredits})}),d.jsx("span",{className:"credits-toggle-slider"})]})]}):d.jsx("span",{className:"credits-spacer"})}),!se&&!o.warning&&(!o.models||o.models.length===0)&&d.jsx("div",{className:"account-empty-hint",children:d.jsx("span",{className:"account-empty-hint-text",children:f("accounts.noQuotaData","No quota data — click ↻ to refresh")})}),o.lease&&d.jsxs("div",{className:"pool-lease-timer",children:[f("pool.leasePrefix","Lease"),": ",SS(o.lease.expiresAt,f)]}),o.warning&&!se&&d.jsxs("div",{className:"account-warning",children:[d.jsx("span",{className:"account-warning-icon",children:"⚠️"}),d.jsxs("span",{className:"account-warning-text",children:[o.warning,o.warningUrl&&d.jsxs(d.Fragment,{children:[" ",d.jsxs("a",{className:"account-warning-link",href:o.warningUrl,target:"_blank",rel:"noopener noreferrer",title:o.warningUrl,children:[o.warningUrlText||o.warningUrl,d.jsx("svg",{viewBox:"0 0 16 16",width:"11",height:"11",fill:"currentColor",style:{marginLeft:"3px",verticalAlign:"-1px"},children:d.jsx("path",{d:"M1.5 1H6v1H2v12h12v-4h1v5H1V1h.5zM8.5 1H15v6.5h-1V2.707L8.354 8.354l-.708-.708L13.293 2H8.5V1z"})})]})]})]})]})]})})})};function SS(o,n){const s=Math.max(0,new Date(o).getTime()-Date.now()),l=Math.floor(s/6e4);if(l<=0)return n("pool.leaseExpiring",{defaultValue:"Expiring..."});if(l<60)return n("pool.leaseMinutes",{min:l})||`${l}m`;const r=Math.floor(l/60),c=l%60;return c>0?n("pool.leaseHoursMinutes",{h:r,m:c})||`${r}h ${c}m`:n("pool.leaseHours",{h:r})||`${r}h`}const wS=new Set(["children","localName","ref","style","className"]),Ug=new WeakMap,qg=(o,n,s,l,r)=>{const c=r?.[n];c===void 0?(o[n]=s,s==null&&n in HTMLElement.prototype&&o.removeAttribute(n)):s!==l&&((f,p,b)=>{let g=Ug.get(f);g===void 0&&Ug.set(f,g=new Map);let _=g.get(p);b!==void 0?_===void 0?(g.set(p,_={handleEvent:b}),f.addEventListener(p,_)):_.handleEvent=b:_!==void 0&&(g.delete(p),f.removeEventListener(p,_))})(o,c,s)},De=({react:o,tagName:n,elementClass:s,events:l,displayName:r})=>{const c=new Set(Object.keys(l??{})),f=o.forwardRef(((p,b)=>{const g=o.useRef(new Map),_=o.useRef(null),v={},k={};for(const[E,O]of Object.entries(p))wS.has(E)?v[E==="className"?"class":E]=O:c.has(E)||E in s.prototype?k[E]=O:v[E]=O;return o.useLayoutEffect((()=>{if(_.current===null)return;const E=new Map;for(const O in k)qg(_.current,O,p[O],g.current.get(O),l),g.current.delete(O),E.set(O,p[O]);for(const[O,V]of g.current)qg(_.current,O,void 0,V,l);g.current=E})),o.useLayoutEffect((()=>{_.current?.removeAttribute("defer-hydration")}),[]),v.suppressHydrationWarning=!0,o.createElement(n,{...v,ref:o.useCallback((E=>{_.current=E,typeof b=="function"?b(E):b!==null&&(b.current=E)}),[b])})}));return f.displayName=r??s.name,f};const Xr=globalThis,ih=Xr.ShadowRoot&&(Xr.ShadyCSS===void 0||Xr.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,sh=Symbol(),Pg=new WeakMap;let Mv=class{constructor(n,s,l){if(this._$cssResult$=!0,l!==sh)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=n,this.t=s}get styleSheet(){let n=this.o;const s=this.t;if(ih&&n===void 0){const l=s!==void 0&&s.length===1;l&&(n=Pg.get(s)),n===void 0&&((this.o=n=new CSSStyleSheet).replaceSync(this.cssText),l&&Pg.set(s,n))}return n}toString(){return this.cssText}};const cc=o=>new Mv(typeof o=="string"?o:o+"",void 0,sh),Me=(o,...n)=>{const s=o.length===1?o[0]:n.reduce((l,r,c)=>l+(f=>{if(f._$cssResult$===!0)return f.cssText;if(typeof f=="number")return f;throw Error("Value passed to 'css' function must be a 'css' function result: "+f+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+o[c+1],o[0]);return new Mv(s,o,sh)},CS=(o,n)=>{if(ih)o.adoptedStyleSheets=n.map(s=>s instanceof CSSStyleSheet?s:s.styleSheet);else for(const s of n){const l=document.createElement("style"),r=Xr.litNonce;r!==void 0&&l.setAttribute("nonce",r),l.textContent=s.cssText,o.appendChild(l)}},Gg=ih?o=>o:o=>o instanceof CSSStyleSheet?(n=>{let s="";for(const l of n.cssRules)s+=l.cssText;return cc(s)})(o):o;const{is:ES,defineProperty:NS,getOwnPropertyDescriptor:jS,getOwnPropertyNames:AS,getOwnPropertySymbols:kS,getPrototypeOf:TS}=Object,dc=globalThis,Yg=dc.trustedTypes,OS=Yg?Yg.emptyScript:"",RS=dc.reactiveElementPolyfillSupport,co=(o,n)=>o,tc={toAttribute(o,n){switch(n){case Boolean:o=o?OS:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,n){let s=o;switch(n){case Boolean:s=o!==null;break;case Number:s=o===null?null:Number(o);break;case Object:case Array:try{s=JSON.parse(o)}catch{s=null}}return s}},ah=(o,n)=>!ES(o,n),Kg={attribute:!0,type:String,converter:tc,reflect:!1,useDefault:!1,hasChanged:ah};Symbol.metadata??=Symbol("metadata"),dc.litPropertyMetadata??=new WeakMap;let Qa=class extends HTMLElement{static addInitializer(n){this._$Ei(),(this.l??=[]).push(n)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(n,s=Kg){if(s.state&&(s.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(n)&&((s=Object.create(s)).wrapped=!0),this.elementProperties.set(n,s),!s.noAccessor){const l=Symbol(),r=this.getPropertyDescriptor(n,l,s);r!==void 0&&NS(this.prototype,n,r)}}static getPropertyDescriptor(n,s,l){const{get:r,set:c}=jS(this.prototype,n)??{get(){return this[s]},set(f){this[s]=f}};return{get:r,set(f){const p=r?.call(this);c?.call(this,f),this.requestUpdate(n,p,l)},configurable:!0,enumerable:!0}}static getPropertyOptions(n){return this.elementProperties.get(n)??Kg}static _$Ei(){if(this.hasOwnProperty(co("elementProperties")))return;const n=TS(this);n.finalize(),n.l!==void 0&&(this.l=[...n.l]),this.elementProperties=new Map(n.elementProperties)}static finalize(){if(this.hasOwnProperty(co("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(co("properties"))){const s=this.properties,l=[...AS(s),...kS(s)];for(const r of l)this.createProperty(r,s[r])}const n=this[Symbol.metadata];if(n!==null){const s=litPropertyMetadata.get(n);if(s!==void 0)for(const[l,r]of s)this.elementProperties.set(l,r)}this._$Eh=new Map;for(const[s,l]of this.elementProperties){const r=this._$Eu(s,l);r!==void 0&&this._$Eh.set(r,s)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(n){const s=[];if(Array.isArray(n)){const l=new Set(n.flat(1/0).reverse());for(const r of l)s.unshift(Gg(r))}else n!==void 0&&s.push(Gg(n));return s}static _$Eu(n,s){const l=s.attribute;return l===!1?void 0:typeof l=="string"?l:typeof n=="string"?n.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(n=>this.enableUpdating=n),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(n=>n(this))}addController(n){(this._$EO??=new Set).add(n),this.renderRoot!==void 0&&this.isConnected&&n.hostConnected?.()}removeController(n){this._$EO?.delete(n)}_$E_(){const n=new Map,s=this.constructor.elementProperties;for(const l of s.keys())this.hasOwnProperty(l)&&(n.set(l,this[l]),delete this[l]);n.size>0&&(this._$Ep=n)}createRenderRoot(){const n=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return CS(n,this.constructor.elementStyles),n}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(n=>n.hostConnected?.())}enableUpdating(n){}disconnectedCallback(){this._$EO?.forEach(n=>n.hostDisconnected?.())}attributeChangedCallback(n,s,l){this._$AK(n,l)}_$ET(n,s){const l=this.constructor.elementProperties.get(n),r=this.constructor._$Eu(n,l);if(r!==void 0&&l.reflect===!0){const c=(l.converter?.toAttribute!==void 0?l.converter:tc).toAttribute(s,l.type);this._$Em=n,c==null?this.removeAttribute(r):this.setAttribute(r,c),this._$Em=null}}_$AK(n,s){const l=this.constructor,r=l._$Eh.get(n);if(r!==void 0&&this._$Em!==r){const c=l.getPropertyOptions(r),f=typeof c.converter=="function"?{fromAttribute:c.converter}:c.converter?.fromAttribute!==void 0?c.converter:tc;this._$Em=r;const p=f.fromAttribute(s,c.type);this[r]=p??this._$Ej?.get(r)??p,this._$Em=null}}requestUpdate(n,s,l,r=!1,c){if(n!==void 0){const f=this.constructor;if(r===!1&&(c=this[n]),l??=f.getPropertyOptions(n),!((l.hasChanged??ah)(c,s)||l.useDefault&&l.reflect&&c===this._$Ej?.get(n)&&!this.hasAttribute(f._$Eu(n,l))))return;this.C(n,s,l)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(n,s,{useDefault:l,reflect:r,wrapped:c},f){l&&!(this._$Ej??=new Map).has(n)&&(this._$Ej.set(n,f??s??this[n]),c!==!0||f!==void 0)||(this._$AL.has(n)||(this.hasUpdated||l||(s=void 0),this._$AL.set(n,s)),r===!0&&this._$Em!==n&&(this._$Eq??=new Set).add(n))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(s){Promise.reject(s)}const n=this.scheduleUpdate();return n!=null&&await n,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[r,c]of this._$Ep)this[r]=c;this._$Ep=void 0}const l=this.constructor.elementProperties;if(l.size>0)for(const[r,c]of l){const{wrapped:f}=c,p=this[r];f!==!0||this._$AL.has(r)||p===void 0||this.C(r,void 0,c,p)}}let n=!1;const s=this._$AL;try{n=this.shouldUpdate(s),n?(this.willUpdate(s),this._$EO?.forEach(l=>l.hostUpdate?.()),this.update(s)):this._$EM()}catch(l){throw n=!1,this._$EM(),l}n&&this._$AE(s)}willUpdate(n){}_$AE(n){this._$EO?.forEach(s=>s.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(n)),this.updated(n)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(n){return!0}update(n){this._$Eq&&=this._$Eq.forEach(s=>this._$ET(s,this[s])),this._$EM()}updated(n){}firstUpdated(n){}};Qa.elementStyles=[],Qa.shadowRootOptions={mode:"open"},Qa[co("elementProperties")]=new Map,Qa[co("finalized")]=new Map,RS?.({ReactiveElement:Qa}),(dc.reactiveElementVersions??=[]).push("2.1.2");const lh=globalThis,Fg=o=>o,nc=lh.trustedTypes,Xg=nc?nc.createPolicy("lit-html",{createHTML:o=>o}):void 0,zv="$lit$",Cs=`lit$${Math.random().toFixed(9).slice(2)}$`,$v="?"+Cs,DS=`<${$v}>`,ta=document,fo=()=>ta.createComment(""),po=o=>o===null||typeof o!="object"&&typeof o!="function",oh=Array.isArray,MS=o=>oh(o)||typeof o?.[Symbol.iterator]=="function",Hu=`[ 	
\f\r]`,to=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Qg=/-->/g,Zg=/>/g,Xs=RegExp(`>|${Hu}(?:([^\\s"'>=/]+)(${Hu}*=${Hu}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Jg=/'/g,Wg=/"/g,Lv=/^(?:script|style|textarea|title)$/i,Bv=o=>(n,...s)=>({_$litType$:o,strings:n,values:s}),te=Bv(1),zS=Bv(2),ji=Symbol.for("lit-noChange"),Ce=Symbol.for("lit-nothing"),ev=new WeakMap,Ws=ta.createTreeWalker(ta,129);function Hv(o,n){if(!oh(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return Xg!==void 0?Xg.createHTML(n):n}const $S=(o,n)=>{const s=o.length-1,l=[];let r,c=n===2?"<svg>":n===3?"<math>":"",f=to;for(let p=0;p<s;p++){const b=o[p];let g,_,v=-1,k=0;for(;k<b.length&&(f.lastIndex=k,_=f.exec(b),_!==null);)k=f.lastIndex,f===to?_[1]==="!--"?f=Qg:_[1]!==void 0?f=Zg:_[2]!==void 0?(Lv.test(_[2])&&(r=RegExp("</"+_[2],"g")),f=Xs):_[3]!==void 0&&(f=Xs):f===Xs?_[0]===">"?(f=r??to,v=-1):_[1]===void 0?v=-2:(v=f.lastIndex-_[2].length,g=_[1],f=_[3]===void 0?Xs:_[3]==='"'?Wg:Jg):f===Wg||f===Jg?f=Xs:f===Qg||f===Zg?f=to:(f=Xs,r=void 0);const E=f===Xs&&o[p+1].startsWith("/>")?" ":"";c+=f===to?b+DS:v>=0?(l.push(g),b.slice(0,v)+zv+b.slice(v)+Cs+E):b+Cs+(v===-2?p:E)}return[Hv(o,c+(o[s]||"<?>")+(n===2?"</svg>":n===3?"</math>":"")),l]};class mo{constructor({strings:n,_$litType$:s},l){let r;this.parts=[];let c=0,f=0;const p=n.length-1,b=this.parts,[g,_]=$S(n,s);if(this.el=mo.createElement(g,l),Ws.currentNode=this.el.content,s===2||s===3){const v=this.el.content.firstChild;v.replaceWith(...v.childNodes)}for(;(r=Ws.nextNode())!==null&&b.length<p;){if(r.nodeType===1){if(r.hasAttributes())for(const v of r.getAttributeNames())if(v.endsWith(zv)){const k=_[f++],E=r.getAttribute(v).split(Cs),O=/([.?@])?(.*)/.exec(k);b.push({type:1,index:c,name:O[2],strings:E,ctor:O[1]==="."?BS:O[1]==="?"?HS:O[1]==="@"?VS:uc}),r.removeAttribute(v)}else v.startsWith(Cs)&&(b.push({type:6,index:c}),r.removeAttribute(v));if(Lv.test(r.tagName)){const v=r.textContent.split(Cs),k=v.length-1;if(k>0){r.textContent=nc?nc.emptyScript:"";for(let E=0;E<k;E++)r.append(v[E],fo()),Ws.nextNode(),b.push({type:2,index:++c});r.append(v[k],fo())}}}else if(r.nodeType===8)if(r.data===$v)b.push({type:2,index:c});else{let v=-1;for(;(v=r.data.indexOf(Cs,v+1))!==-1;)b.push({type:7,index:c}),v+=Cs.length-1}c++}}static createElement(n,s){const l=ta.createElement("template");return l.innerHTML=n,l}}function Za(o,n,s=o,l){if(n===ji)return n;let r=l!==void 0?s._$Co?.[l]:s._$Cl;const c=po(n)?void 0:n._$litDirective$;return r?.constructor!==c&&(r?._$AO?.(!1),c===void 0?r=void 0:(r=new c(o),r._$AT(o,s,l)),l!==void 0?(s._$Co??=[])[l]=r:s._$Cl=r),r!==void 0&&(n=Za(o,r._$AS(o,n.values),r,l)),n}class LS{constructor(n,s){this._$AV=[],this._$AN=void 0,this._$AD=n,this._$AM=s}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(n){const{el:{content:s},parts:l}=this._$AD,r=(n?.creationScope??ta).importNode(s,!0);Ws.currentNode=r;let c=Ws.nextNode(),f=0,p=0,b=l[0];for(;b!==void 0;){if(f===b.index){let g;b.type===2?g=new Wa(c,c.nextSibling,this,n):b.type===1?g=new b.ctor(c,b.name,b.strings,this,n):b.type===6&&(g=new IS(c,this,n)),this._$AV.push(g),b=l[++p]}f!==b?.index&&(c=Ws.nextNode(),f++)}return Ws.currentNode=ta,r}p(n){let s=0;for(const l of this._$AV)l!==void 0&&(l.strings!==void 0?(l._$AI(n,l,s),s+=l.strings.length-2):l._$AI(n[s])),s++}}class Wa{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(n,s,l,r){this.type=2,this._$AH=Ce,this._$AN=void 0,this._$AA=n,this._$AB=s,this._$AM=l,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let n=this._$AA.parentNode;const s=this._$AM;return s!==void 0&&n?.nodeType===11&&(n=s.parentNode),n}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(n,s=this){n=Za(this,n,s),po(n)?n===Ce||n==null||n===""?(this._$AH!==Ce&&this._$AR(),this._$AH=Ce):n!==this._$AH&&n!==ji&&this._(n):n._$litType$!==void 0?this.$(n):n.nodeType!==void 0?this.T(n):MS(n)?this.k(n):this._(n)}O(n){return this._$AA.parentNode.insertBefore(n,this._$AB)}T(n){this._$AH!==n&&(this._$AR(),this._$AH=this.O(n))}_(n){this._$AH!==Ce&&po(this._$AH)?this._$AA.nextSibling.data=n:this.T(ta.createTextNode(n)),this._$AH=n}$(n){const{values:s,_$litType$:l}=n,r=typeof l=="number"?this._$AC(n):(l.el===void 0&&(l.el=mo.createElement(Hv(l.h,l.h[0]),this.options)),l);if(this._$AH?._$AD===r)this._$AH.p(s);else{const c=new LS(r,this),f=c.u(this.options);c.p(s),this.T(f),this._$AH=c}}_$AC(n){let s=ev.get(n.strings);return s===void 0&&ev.set(n.strings,s=new mo(n)),s}k(n){oh(this._$AH)||(this._$AH=[],this._$AR());const s=this._$AH;let l,r=0;for(const c of n)r===s.length?s.push(l=new Wa(this.O(fo()),this.O(fo()),this,this.options)):l=s[r],l._$AI(c),r++;r<s.length&&(this._$AR(l&&l._$AB.nextSibling,r),s.length=r)}_$AR(n=this._$AA.nextSibling,s){for(this._$AP?.(!1,!0,s);n!==this._$AB;){const l=Fg(n).nextSibling;Fg(n).remove(),n=l}}setConnected(n){this._$AM===void 0&&(this._$Cv=n,this._$AP?.(n))}}class uc{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(n,s,l,r,c){this.type=1,this._$AH=Ce,this._$AN=void 0,this.element=n,this.name=s,this._$AM=r,this.options=c,l.length>2||l[0]!==""||l[1]!==""?(this._$AH=Array(l.length-1).fill(new String),this.strings=l):this._$AH=Ce}_$AI(n,s=this,l,r){const c=this.strings;let f=!1;if(c===void 0)n=Za(this,n,s,0),f=!po(n)||n!==this._$AH&&n!==ji,f&&(this._$AH=n);else{const p=n;let b,g;for(n=c[0],b=0;b<c.length-1;b++)g=Za(this,p[l+b],s,b),g===ji&&(g=this._$AH[b]),f||=!po(g)||g!==this._$AH[b],g===Ce?n=Ce:n!==Ce&&(n+=(g??"")+c[b+1]),this._$AH[b]=g}f&&!r&&this.j(n)}j(n){n===Ce?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,n??"")}}class BS extends uc{constructor(){super(...arguments),this.type=3}j(n){this.element[this.name]=n===Ce?void 0:n}}class HS extends uc{constructor(){super(...arguments),this.type=4}j(n){this.element.toggleAttribute(this.name,!!n&&n!==Ce)}}class VS extends uc{constructor(n,s,l,r,c){super(n,s,l,r,c),this.type=5}_$AI(n,s=this){if((n=Za(this,n,s,0)??Ce)===ji)return;const l=this._$AH,r=n===Ce&&l!==Ce||n.capture!==l.capture||n.once!==l.once||n.passive!==l.passive,c=n!==Ce&&(l===Ce||r);r&&this.element.removeEventListener(this.name,this,l),c&&this.element.addEventListener(this.name,this,n),this._$AH=n}handleEvent(n){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,n):this._$AH.handleEvent(n)}}class IS{constructor(n,s,l){this.element=n,this.type=6,this._$AN=void 0,this._$AM=s,this.options=l}get _$AU(){return this._$AM._$AU}_$AI(n){Za(this,n)}}const US={I:Wa},qS=lh.litHtmlPolyfillSupport;qS?.(mo,Wa),(lh.litHtmlVersions??=[]).push("3.3.2");const Vv=(o,n,s)=>{const l=s?.renderBefore??n;let r=l._$litPart$;if(r===void 0){const c=s?.renderBefore??null;l._$litPart$=r=new Wa(n.insertBefore(fo(),c),c,void 0,s??{})}return r._$AI(o),r};const rh=globalThis;let gi=class extends Qa{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const n=super.createRenderRoot();return this.renderOptions.renderBefore??=n.firstChild,n}update(n){const s=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(n),this._$Do=Vv(s,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return ji}};gi._$litElement$=!0,gi.finalized=!0,rh.litElementHydrateSupport?.({LitElement:gi});const PS=rh.litElementPolyfillSupport;PS?.({LitElement:gi});(rh.litElementVersions??=[]).push("4.2.2");const GS={attribute:!0,type:String,converter:tc,reflect:!1,hasChanged:ah},YS=(o=GS,n,s)=>{const{kind:l,metadata:r}=s;let c=globalThis.litPropertyMetadata.get(r);if(c===void 0&&globalThis.litPropertyMetadata.set(r,c=new Map),l==="setter"&&((o=Object.create(o)).wrapped=!0),c.set(s.name,o),l==="accessor"){const{name:f}=s;return{set(p){const b=n.get.call(this);n.set.call(this,p),this.requestUpdate(f,b,o,!0,p)},init(p){return p!==void 0&&this.C(f,void 0,o,p),p}}}if(l==="setter"){const{name:f}=s;return function(p){const b=this[f];n.call(this,p),this.requestUpdate(f,b,o,!0,p)}}throw Error("Unsupported decorator location: "+l)};function N(o){return(n,s)=>typeof s=="object"?YS(o,n,s):((l,r,c)=>{const f=r.hasOwnProperty(c);return r.constructor.createProperty(c,l),f?Object.getOwnPropertyDescriptor(r,c):void 0})(o,n,s)}function Te(o){return N({...o,state:!0,attribute:!1})}const go=(o,n,s)=>(s.configurable=!0,s.enumerable=!0,Reflect.decorate&&typeof n!="object"&&Object.defineProperty(o,n,s),s);function bn(o,n){return(s,l,r)=>{const c=f=>f.renderRoot?.querySelector(o)??null;if(n){const{get:f,set:p}=typeof l=="object"?s:r??(()=>{const b=Symbol();return{get(){return this[b]},set(g){this[b]=g}}})();return go(s,l,{get(){let b=f.call(this);return b===void 0&&(b=c(this),(b!==null||this.hasUpdated)&&p.call(this,b)),b}})}return go(s,l,{get(){return c(this)}})}}let KS;function FS(o){return(n,s)=>go(n,s,{get(){return(this.renderRoot??(KS??=document.createDocumentFragment())).querySelectorAll(o)}})}function hn(o){return(n,s)=>{const{slot:l,selector:r}=o??{},c="slot"+(l?`[name=${l}]`:":not([name])");return go(n,s,{get(){const f=this.renderRoot?.querySelector(c),p=f?.assignedElements(o)??[];return r===void 0?p:p.filter(b=>b.matches(r))}})}}function XS(o){return(n,s)=>{const{slot:l}={},r="slot"+(l?`[name=${l}]`:":not([name])");return go(n,s,{get(){return this.renderRoot?.querySelector(r)?.assignedNodes(o)??[]}})}}const Qr="2.5.1",tv="__vscodeElements_disableRegistryWarning__",Iv=(o,n)=>{console.warn(n?`[VSCode Elements] ${o}
%o`:`${o}
%o`,n)};class Ie extends gi{get version(){return Qr}warn(n){Iv(n,this)}}const ze=o=>n=>{if(!customElements.get(o)){customElements.define(o,n);return}if(tv in window)return;const r=document.createElement(o)?.version;let c="";r?r!==Qr?(c+="is already registered by a different version of VSCode Elements. ",c+=`This version is "${Qr}", while the other one is "${r}".`):c+=`is already registered by the same version of VSCode Elements (${Qr}).`:c+="is already registered by an unknown custom element handler class.",Iv(`The custom element "${o}" ${c}
To suppress this warning, set window.${tv} to true`)},Be=Me`
  :host([hidden]) {
    display: none;
  }

  :host([disabled]),
  :host(:disabled) {
    cursor: not-allowed;
    opacity: 0.4;
    pointer-events: none;
  }
`,QS=16,ZS=13,JS=QS/ZS;function ch(){return navigator.userAgent.indexOf("Linux")>-1?'system-ui, "Ubuntu", "Droid Sans", sans-serif':navigator.userAgent.indexOf("Mac")>-1?"-apple-system, BlinkMacSystemFont, sans-serif":navigator.userAgent.indexOf("Windows")>-1?'"Segoe WPC", "Segoe UI", sans-serif':"sans-serif"}const WS=cc(ch()),ew=[Be,Me`
    :host {
      display: inline-block;
    }

    .root {
      background-color: var(--vscode-badge-background, #616161);
      border: 1px solid var(--vscode-contrastBorder, transparent);
      border-radius: 2px;
      box-sizing: border-box;
      color: var(--vscode-badge-foreground, #f8f8f8);
      display: block;
      font-family: var(--vscode-font-family, ${WS});
      font-size: 11px;
      font-weight: 400;
      line-height: 14px;
      min-width: 18px;
      padding: 2px 3px;
      text-align: center;
      white-space: nowrap;
    }

    :host([variant='counter']) .root {
      border-radius: 11px;
      line-height: 11px;
      min-height: 18px;
      min-width: 18px;
      padding: 3px 6px;
    }

    :host([variant='activity-bar-counter']) .root {
      background-color: var(--vscode-activityBarBadge-background, #0078d4);
      border-radius: 20px;
      color: var(--vscode-activityBarBadge-foreground, #ffffff);
      font-size: 9px;
      font-weight: 600;
      line-height: 16px;
      padding: 0 4px;
    }

    :host([variant='tab-header-counter']) .root {
      background-color: var(--vscode-activityBarBadge-background, #0078d4);
      border-radius: 10px;
      color: var(--vscode-activityBarBadge-foreground, #ffffff);
      line-height: 10px;
      min-height: 16px;
      min-width: 16px;
      padding: 3px 5px;
    }
  `];var Uv=function(o,n,s,l){var r=arguments.length,c=r<3?n:l===null?l=Object.getOwnPropertyDescriptor(n,s):l,f;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(o,n,s,l);else for(var p=o.length-1;p>=0;p--)(f=o[p])&&(c=(r<3?f(c):r>3?f(n,s,c):f(n,s))||c);return r>3&&c&&Object.defineProperty(n,s,c),c};let vo=class extends Ie{constructor(){super(...arguments),this.variant="default"}render(){return te`<div class="root"><slot></slot></div>`}};vo.styles=ew;Uv([N({reflect:!0})],vo.prototype,"variant",void 0);vo=Uv([ze("vscode-badge")],vo);De({tagName:"vscode-badge",elementClass:vo,react:F,displayName:"VscodeBadge"});const dh={ATTRIBUTE:1,CHILD:2,PROPERTY:3},uh=o=>(...n)=>({_$litDirective$:o,values:n});let hh=class{constructor(n){}get _$AU(){return this._$AM._$AU}_$AT(n,s,l){this._$Ct=n,this._$AM=s,this._$Ci=l}_$AS(n,s){return this.update(n,s)}update(n,s){return this.render(...s)}};const Ye=uh(class extends hh{constructor(o){if(super(o),o.type!==dh.ATTRIBUTE||o.name!=="class"||o.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(o){return" "+Object.keys(o).filter(n=>o[n]).join(" ")+" "}update(o,[n]){if(this.st===void 0){this.st=new Set,o.strings!==void 0&&(this.nt=new Set(o.strings.join(" ").split(/\s/).filter(l=>l!=="")));for(const l in n)n[l]&&!this.nt?.has(l)&&this.st.add(l);return this.render(n)}const s=o.element.classList;for(const l of this.st)l in n||(s.remove(l),this.st.delete(l));for(const l in n){const r=!!n[l];r===this.st.has(l)||this.nt?.has(l)||(r?(s.add(l),this.st.add(l)):(s.remove(l),this.st.delete(l)))}return ji}});const Ge=o=>o??Ce;class tw extends hh{constructor(n){if(super(n),this._prevProperties={},n.type!==dh.PROPERTY||n.name!=="style")throw new Error("The `stylePropertyMap` directive must be used in the `style` property")}update(n,[s]){return Object.entries(s).forEach(([l,r])=>{this._prevProperties[l]!==r&&(l.startsWith("--")?n.element.style.setProperty(l,r):n.element.style[l]=r,this._prevProperties[l]=r)}),ji}render(n){return ji}}const Cn=uh(tw),nw=[Be,Me`
    :host {
      color: var(--vscode-icon-foreground, #cccccc);
      display: inline-block;
    }

    .codicon[class*='codicon-'] {
      display: block;
    }

    .icon,
    .button {
      background-color: transparent;
      display: block;
      padding: 0;
    }

    .button {
      border-color: transparent;
      border-style: solid;
      border-width: 1px;
      border-radius: 5px;
      color: currentColor;
      cursor: pointer;
      padding: 2px;
    }

    .button:hover {
      background-color: var(
        --vscode-toolbar-hoverBackground,
        rgba(90, 93, 94, 0.31)
      );
    }

    .button:active {
      background-color: var(
        --vscode-toolbar-activeBackground,
        rgba(99, 102, 103, 0.31)
      );
    }

    .button:focus {
      outline: none;
    }

    .button:focus-visible {
      border-color: var(--vscode-focusBorder, #0078d4);
    }

    @keyframes icon-spin {
      100% {
        transform: rotate(360deg);
      }
    }

    .spin {
      animation-name: icon-spin;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
    }
  `];var la=function(o,n,s,l){var r=arguments.length,c=r<3?n:l===null?l=Object.getOwnPropertyDescriptor(n,s):l,f;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(o,n,s,l);else for(var p=o.length-1;p>=0;p--)(f=o[p])&&(c=(r<3?f(c):r>3?f(n,s,c):f(n,s))||c);return r>3&&c&&Object.defineProperty(n,s,c),c},ao;let si=ao=class extends Ie{constructor(){super(...arguments),this.label="",this.name="",this.size=16,this.spin=!1,this.spinDuration=1.5,this.actionIcon=!1,this._onButtonClick=n=>{this.dispatchEvent(new CustomEvent("vsc-click",{detail:{originalEvent:n}}))}}connectedCallback(){super.connectedCallback();const{href:n,nonce:s}=this._getStylesheetConfig();ao.stylesheetHref=n,ao.nonce=s}_getStylesheetConfig(){if(typeof document>"u")return{nonce:void 0,href:void 0};const n=document.getElementById("vscode-codicon-stylesheet"),s=n?.getAttribute("href")||void 0,l=n?.nonce||void 0;if(!n){let r='To use the Icon component, the codicons.css file must be included in the page with the id "vscode-codicon-stylesheet"! ';r+="See https://vscode-elements.github.io/components/icon/ for more details.",this.warn(r)}return{nonce:l,href:s}}render(){const{stylesheetHref:n,nonce:s}=ao,l=te`<span
      class=${Ye({codicon:!0,["codicon-"+this.name]:!0,spin:this.spin})}
      .style=${Cn({animationDuration:String(this.spinDuration)+"s",fontSize:this.size+"px",height:this.size+"px",width:this.size+"px"})}
    ></span>`,r=this.actionIcon?te` <button
          class="button"
          @click=${this._onButtonClick}
          aria-label=${this.label}
        >
          ${l}
        </button>`:te` <span class="icon" aria-hidden="true" role="presentation"
          >${l}</span
        >`;return te`
      <link
        rel="stylesheet"
        href=${Ge(n)}
        nonce=${Ge(s)}
      />
      ${r}
    `}};si.styles=nw;si.stylesheetHref="";si.nonce="";la([N()],si.prototype,"label",void 0);la([N({type:String})],si.prototype,"name",void 0);la([N({type:Number})],si.prototype,"size",void 0);la([N({type:Boolean,reflect:!0})],si.prototype,"spin",void 0);la([N({type:Number,attribute:"spin-duration"})],si.prototype,"spinDuration",void 0);la([N({type:Boolean,reflect:!0,attribute:"action-icon"})],si.prototype,"actionIcon",void 0);si=ao=la([ze("vscode-icon")],si);const iw=cc(ch()),sw=[Be,Me`
    :host {
      cursor: pointer;
      display: inline-block;
      width: auto;
    }

    :host([block]) {
      display: block;
      width: 100%;
    }

    .base {
      align-items: center;
      background-color: var(--vscode-button-background, #0078d4);
      border-bottom-left-radius: var(--vsc-border-left-radius, 4px);
      border-bottom-right-radius: var(--vsc-border-right-radius, 4px);
      border-bottom-width: 1px;
      border-color: var(--vscode-button-border, transparent);
      border-left-width: var(--vsc-border-left-width, 1px);
      border-right-width: var(--vsc-border-right-width, 1px);
      border-style: solid;
      border-top-left-radius: var(--vsc-border-left-radius, 4px);
      border-top-right-radius: var(--vsc-border-right-radius, 4px);
      border-top-width: 1px;
      box-sizing: border-box;
      color: var(--vscode-button-foreground, #ffffff);
      display: flex;
      font-family: var(--vscode-font-family, ${iw});
      font-size: var(--vscode-font-size, 13px);
      font-weight: var(--vscode-font-weight, normal);
      height: 100%;
      justify-content: center;
      line-height: 22px;
      overflow: hidden;
      padding: 1px calc(13px + var(--vsc-base-additional-right-padding, 0px))
        1px 13px;
      position: relative;
      user-select: none;
      white-space: nowrap;
      width: 100%;
    }

    :host([block]) .base {
      min-height: 28px;
      text-align: center;
      width: 100%;
    }

    .base:after {
      background-color: var(
        --vscode-button-separator,
        rgba(255, 255, 255, 0.4)
      );
      content: var(--vsc-base-after-content);
      display: var(--vsc-divider-display, none);
      position: absolute;
      right: 0;
      top: 4px;
      bottom: 4px;
      width: 1px;
    }

    :host([secondary]) .base:after {
      background-color: var(--vscode-button-secondaryForeground, #cccccc);
      opacity: 0.4;
    }

    :host([secondary]) .base {
      color: var(--vscode-button-secondaryForeground, #cccccc);
      background-color: var(--vscode-button-secondaryBackground, #313131);
      border-color: var(
        --vscode-button-border,
        var(--vscode-button-secondaryBackground, rgba(255, 255, 255, 0.07))
      );
    }

    :host([disabled]) {
      cursor: default;
      opacity: 0.4;
      pointer-events: none;
    }

    :host(:hover) .base {
      background-color: var(--vscode-button-hoverBackground, #026ec1);
    }

    :host([disabled]:hover) .base {
      background-color: var(--vscode-button-background, #0078d4);
    }

    :host([secondary]:hover) .base {
      background-color: var(--vscode-button-secondaryHoverBackground, #3c3c3c);
    }

    :host([secondary][disabled]:hover) .base {
      background-color: var(--vscode-button-secondaryBackground, #313131);
    }

    :host(:focus),
    :host(:active) {
      outline: none;
    }

    :host(:focus) .base {
      background-color: var(--vscode-button-hoverBackground, #026ec1);
      outline: 1px solid var(--vscode-focusBorder, #0078d4);
      outline-offset: 2px;
    }

    :host([disabled]:focus) .base {
      background-color: var(--vscode-button-background, #0078d4);
      outline: 0;
    }

    :host([secondary]:focus) .base {
      background-color: var(--vscode-button-secondaryHoverBackground, #3c3c3c);
    }

    :host([secondary][disabled]:focus) .base {
      background-color: var(--vscode-button-secondaryBackground, #313131);
    }

    ::slotted(*) {
      display: inline-block;
      margin-left: 4px;
      margin-right: 4px;
    }

    ::slotted(*:first-child) {
      margin-left: 0;
    }

    ::slotted(*:last-child) {
      margin-right: 0;
    }

    ::slotted(vscode-icon) {
      color: inherit;
    }

    .content {
      display: flex;
      position: relative;
      width: 100%;
      height: 100%;
      padding: 1px 13px;
    }

    :host(:empty) .base,
    .base.icon-only {
      min-height: 24px;
      min-width: 26px;
      padding: 1px 4px;
    }

    slot {
      align-items: center;
      display: flex;
      height: 100%;
    }

    .has-content-before slot[name='content-before'] {
      margin-right: 4px;
    }

    .has-content-after slot[name='content-after'] {
      margin-left: 4px;
    }

    .icon,
    .icon-after {
      color: inherit;
      display: block;
    }

    :host(:not(:empty)) .icon {
      margin-right: 3px;
    }

    :host(:not(:empty)) .icon-after,
    :host([icon]) .icon-after {
      margin-left: 3px;
    }
  `];var Kt=function(o,n,s,l){var r=arguments.length,c=r<3?n:l===null?l=Object.getOwnPropertyDescriptor(n,s):l,f;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(o,n,s,l);else for(var p=o.length-1;p>=0;p--)(f=o[p])&&(c=(r<3?f(c):r>3?f(n,s,c):f(n,s))||c);return r>3&&c&&Object.defineProperty(n,s,c),c};let bt=class extends Ie{get form(){return this._internals.form}constructor(){super(),this.autofocus=!1,this.tabIndex=0,this.secondary=!1,this.block=!1,this.role="button",this.disabled=!1,this.icon="",this.iconSpin=!1,this.iconAfter="",this.iconAfterSpin=!1,this.focused=!1,this.name=void 0,this.iconOnly=!1,this.type="button",this.value="",this._prevTabindex=0,this._hasContentBefore=!1,this._hasContentAfter=!1,this._handleFocus=()=>{this.focused=!0},this._handleBlur=()=>{this.focused=!1},this.addEventListener("keydown",this._handleKeyDown.bind(this)),this.addEventListener("click",this._handleClick.bind(this)),this._internals=this.attachInternals()}connectedCallback(){super.connectedCallback(),this.autofocus&&(this.tabIndex<0&&(this.tabIndex=0),this.updateComplete.then(()=>{this.focus(),this.requestUpdate()})),this.addEventListener("focus",this._handleFocus),this.addEventListener("blur",this._handleBlur)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("focus",this._handleFocus),this.removeEventListener("blur",this._handleBlur)}update(n){super.update(n),n.has("value")&&this._internals.setFormValue(this.value),n.has("disabled")&&(this.disabled?(this._prevTabindex=this.tabIndex,this.tabIndex=-1):this.tabIndex=this._prevTabindex)}_executeAction(){this.type==="submit"&&this._internals.form&&this._internals.form.requestSubmit(),this.type==="reset"&&this._internals.form&&this._internals.form.reset()}_handleKeyDown(n){if((n.key==="Enter"||n.key===" ")&&!this.hasAttribute("disabled")){const s=new MouseEvent("click",{bubbles:!0,cancelable:!0});s.synthetic=!0,this.dispatchEvent(s),this._executeAction()}}_handleClick(n){n.synthetic||this.hasAttribute("disabled")||this._executeAction()}_handleSlotChange(n){const s=n.target;s.name==="content-before"&&(this._hasContentBefore=s.assignedElements().length>0),s.name==="content-after"&&(this._hasContentAfter=s.assignedElements().length>0)}render(){const n=this.icon!=="",s=this.iconAfter!=="",l={base:!0,"icon-only":this.iconOnly,"has-content-before":this._hasContentBefore,"has-content-after":this._hasContentAfter},r=n?te`<vscode-icon
          name=${this.icon}
          ?spin=${this.iconSpin}
          spin-duration=${Ge(this.iconSpinDuration)}
          class="icon"
        ></vscode-icon>`:Ce,c=s?te`<vscode-icon
          name=${this.iconAfter}
          ?spin=${this.iconAfterSpin}
          spin-duration=${Ge(this.iconAfterSpinDuration)}
          class="icon-after"
        ></vscode-icon>`:Ce;return te`
      <div
        class=${Ye(l)}
        part="base"
        @slotchange=${this._handleSlotChange}
      >
        <slot name="content-before"></slot>
        ${r}
        <slot></slot>
        ${c}
        <slot name="content-after"></slot>
      </div>
    `}};bt.styles=sw;bt.formAssociated=!0;Kt([N({type:Boolean,reflect:!0})],bt.prototype,"autofocus",void 0);Kt([N({type:Number,reflect:!0})],bt.prototype,"tabIndex",void 0);Kt([N({type:Boolean,reflect:!0})],bt.prototype,"secondary",void 0);Kt([N({type:Boolean,reflect:!0})],bt.prototype,"block",void 0);Kt([N({reflect:!0})],bt.prototype,"role",void 0);Kt([N({type:Boolean,reflect:!0})],bt.prototype,"disabled",void 0);Kt([N()],bt.prototype,"icon",void 0);Kt([N({type:Boolean,reflect:!0,attribute:"icon-spin"})],bt.prototype,"iconSpin",void 0);Kt([N({type:Number,reflect:!0,attribute:"icon-spin-duration"})],bt.prototype,"iconSpinDuration",void 0);Kt([N({attribute:"icon-after"})],bt.prototype,"iconAfter",void 0);Kt([N({type:Boolean,reflect:!0,attribute:"icon-after-spin"})],bt.prototype,"iconAfterSpin",void 0);Kt([N({type:Number,reflect:!0,attribute:"icon-after-spin-duration"})],bt.prototype,"iconAfterSpinDuration",void 0);Kt([N({type:Boolean,reflect:!0})],bt.prototype,"focused",void 0);Kt([N({type:String,reflect:!0})],bt.prototype,"name",void 0);Kt([N({type:Boolean,reflect:!0,attribute:"icon-only"})],bt.prototype,"iconOnly",void 0);Kt([N({reflect:!0})],bt.prototype,"type",void 0);Kt([N()],bt.prototype,"value",void 0);Kt([Te()],bt.prototype,"_hasContentBefore",void 0);Kt([Te()],bt.prototype,"_hasContentAfter",void 0);bt=Kt([ze("vscode-button")],bt);const Es=De({tagName:"vscode-button",elementClass:bt,react:F,displayName:"VscodeButton"}),aw=[Be,Me`
    :host {
      display: inline-block;
    }

    .root {
      align-items: stretch;
      display: flex;
      width: 100%;
    }

    ::slotted(vscode-button:not(:first-child)) {
      --vsc-border-left-width: 0;
      --vsc-border-left-radius: 0;
      --vsc-border-left-width: 0;
    }

    ::slotted(vscode-button:not(:last-child)) {
      --vsc-divider-display: block;
      --vsc-base-additional-right-padding: 1px;
      --vsc-base-after-content: '';
      --vsc-border-right-width: 0;
      --vsc-border-right-radius: 0;
      --vsc-border-right-width: 0;
    }

    ::slotted(vscode-button:focus) {
      z-index: 1;
    }

    ::slotted(vscode-button:not(:empty)) {
      width: 100%;
    }
  `];var lw=function(o,n,s,l){var r=arguments.length,c=r<3?n:l===null?l=Object.getOwnPropertyDescriptor(n,s):l,f;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(o,n,s,l);else for(var p=o.length-1;p>=0;p--)(f=o[p])&&(c=(r<3?f(c):r>3?f(n,s,c):f(n,s))||c);return r>3&&c&&Object.defineProperty(n,s,c),c};let ic=class extends Ie{render(){return te`<div class="root"><slot></slot></div>`}};ic.styles=aw;ic=lw([ze("vscode-button-group")],ic);De({tagName:"vscode-button-group",elementClass:ic,react:F,displayName:"VscodeButtonGroup"});var ow=function(o,n,s,l){var r=arguments.length,c=r<3?n:l===null?l=Object.getOwnPropertyDescriptor(n,s):l,f;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(o,n,s,l);else for(var p=o.length-1;p>=0;p--)(f=o[p])&&(c=(r<3?f(c):r>3?f(n,s,c):f(n,s))||c);return r>3&&c&&Object.defineProperty(n,s,c),c};class fh extends Ie{constructor(){super(),this.focused=!1,this._prevTabindex=0,this._handleFocus=()=>{this.focused=!0},this._handleBlur=()=>{this.focused=!1}}connectedCallback(){super.connectedCallback(),this.addEventListener("focus",this._handleFocus),this.addEventListener("blur",this._handleBlur)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("focus",this._handleFocus),this.removeEventListener("blur",this._handleBlur)}attributeChangedCallback(n,s,l){super.attributeChangedCallback(n,s,l),n==="disabled"&&this.hasAttribute("disabled")?(this._prevTabindex=this.tabIndex,this.tabIndex=-1):n==="disabled"&&!this.hasAttribute("disabled")&&(this.tabIndex=this._prevTabindex)}}ow([N({type:Boolean,reflect:!0})],fh.prototype,"focused",void 0);var rw=function(o,n,s,l){var r=arguments.length,c=r<3?n:l===null?l=Object.getOwnPropertyDescriptor(n,s):l,f;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(o,n,s,l);else for(var p=o.length-1;p>=0;p--)(f=o[p])&&(c=(r<3?f(c):r>3?f(n,s,c):f(n,s))||c);return r>3&&c&&Object.defineProperty(n,s,c),c};const qv=o=>{class n extends o{constructor(){super(...arguments),this._label="",this._slottedText=""}set label(l){this._label=l,this._slottedText===""&&this.setAttribute("aria-label",l)}get label(){return this._label}_handleSlotChange(){this._slottedText=this.textContent?this.textContent.trim():"",this._slottedText!==""&&this.setAttribute("aria-label",this._slottedText)}_renderLabelAttribute(){return this._slottedText===""?te`<span class="label-attr">${this._label}</span>`:te`${Ce}`}}return rw([N()],n.prototype,"label",null),n},Pv=[Me`
    :host {
      display: inline-block;
    }

    :host(:focus) {
      outline: none;
    }

    :host([disabled]) {
      opacity: 0.4;
    }

    .wrapper {
      color: var(--vscode-foreground, #cccccc);
      cursor: pointer;
      display: block;
      font-family: var(--vscode-font-family, sans-serif);
      font-size: var(--vscode-font-size, 13px);
      font-weight: var(--vscode-font-weight, normal);
      line-height: 18px;
      margin-bottom: 4px;
      margin-top: 4px;
      min-height: 18px;
      position: relative;
      user-select: none;
    }

    :host([disabled]) .wrapper {
      cursor: default;
    }

    input {
      clip: rect(1px, 1px, 1px, 1px);
      height: 1px;
      left: 9px;
      margin: 0;
      overflow: hidden;
      position: absolute;
      top: 17px;
      white-space: nowrap;
      width: 1px;
    }

    .icon {
      align-items: center;
      background-color: var(--vscode-settings-checkboxBackground, #313131);
      background-size: 16px;
      border: 1px solid var(--vscode-settings-checkboxBorder, #3c3c3c);
      box-sizing: border-box;
      color: var(--vscode-settings-checkboxForeground, #cccccc);
      display: flex;
      height: 18px;
      justify-content: center;
      left: 0;
      margin-left: 0;
      margin-right: 9px;
      padding: 0;
      pointer-events: none;
      position: absolute;
      top: 0;
      width: 18px;
    }

    .icon.before-empty-label {
      margin-right: 0;
    }

    .label {
      cursor: pointer;
      display: block;
      min-height: 18px;
      min-width: 18px;
    }

    .label-inner {
      display: block;
      opacity: 0.9;
      padding-left: 27px;
    }

    .label-inner.empty {
      padding-left: 0;
    }

    :host([disabled]) .label {
      cursor: default;
    }
  `],cw=[Be,Pv,Me`
    :host(:invalid) .icon,
    :host([invalid]) .icon {
      background-color: var(--vscode-inputValidation-errorBackground, #5a1d1d);
      border-color: var(--vscode-inputValidation-errorBorder, #be1100);
    }

    .icon {
      border-radius: 3px;
    }

    .indeterminate-icon {
      background-color: currentColor;
      position: absolute;
      height: 1px;
      width: 12px;
    }

    :host(:focus):host(:not([disabled])) .icon {
      outline: 1px solid var(--vscode-focusBorder, #0078d4);
      outline-offset: -1px;
    }

    
    :host([toggle]) .icon {
      
      width: 36px;
      height: 20px;
      border-radius: 999px;
      background-color: var(--vscode-button-secondaryBackground, #313131);
      border-color: var(--vscode-button-border, transparent);
      justify-content: flex-start;
      position: absolute;
    }

    :host(:focus):host([toggle]):host(:not([disabled])) .icon {
      outline-offset: 2px;
    }

    
    :host([toggle]) .label-inner {
      padding-left: 45px; 
    }

    :host([toggle]) .label {
      min-height: 20px;
    }

    :host([toggle]) .wrapper {
      min-height: 20px;
      line-height: 20px;
    }

    :host([toggle]) .thumb {
      
      box-sizing: border-box;
      display: block;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background-color: var(--vscode-button-secondaryForeground, #cccccc);
      margin-left: 1px;
      transition: transform 120ms ease-in-out;
    }

    :host([toggle][checked]) .icon {
      background-color: var(--vscode-button-background, #04395e);
      border-color: var(--vscode-button-border, transparent);
    }

    :host([toggle][checked]) .thumb {
      transform: translateX(16px);
      background-color: var(--vscode-button-foreground, #ffffff);
    }

    :host([toggle]):host(:invalid) .icon {
      background-color: var(--vscode-inputValidation-errorBackground, #5a1d1d);
      border-color: var(--vscode-inputValidation-errorBorder, #be1100);
    }

    :host([toggle]):host(:invalid) .thumb {
      background-color: var(--vscode-inputValidation-errorBorder, #be1100);
    }

    :host([toggle]) .check-icon,
    :host([toggle]) .indeterminate-icon {
      display: none;
    }

    :host([toggle]:focus):host(:not([disabled])) .icon {
      outline: 1px solid var(--vscode-focusBorder, #0078d4);
      outline-offset: -1px;
    }
  `];var In=function(o,n,s,l){var r=arguments.length,c=r<3?n:l===null?l=Object.getOwnPropertyDescriptor(n,s):l,f;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(o,n,s,l);else for(var p=o.length-1;p>=0;p--)(f=o[p])&&(c=(r<3?f(c):r>3?f(n,s,c):f(n,s))||c);return r>3&&c&&Object.defineProperty(n,s,c),c};let Wt=class extends qv(fh){set checked(n){this._checked=n,this._manageRequired(),this.requestUpdate()}get checked(){return this._checked}set required(n){this._required=n,this._manageRequired(),this.requestUpdate()}get required(){return this._required}get form(){return this._internals.form}get validity(){return this._internals.validity}get validationMessage(){return this._internals.validationMessage}get willValidate(){return this._internals.willValidate}checkValidity(){return this._internals.checkValidity()}reportValidity(){return this._internals.reportValidity()}constructor(){super(),this.autofocus=!1,this._checked=!1,this.defaultChecked=!1,this.invalid=!1,this.name=void 0,this.toggle=!1,this.value="",this.disabled=!1,this.indeterminate=!1,this._required=!1,this.type="checkbox",this._handleClick=n=>{n.preventDefault(),!this.disabled&&this._toggleState()},this._handleKeyDown=n=>{!this.disabled&&(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),n.key===" "&&this._toggleState(),n.key==="Enter"&&this._internals.form?.requestSubmit())},this._internals=this.attachInternals()}connectedCallback(){super.connectedCallback(),this.addEventListener("keydown",this._handleKeyDown),this.updateComplete.then(()=>{this._manageRequired(),this._setActualFormValue()})}disconnectedCallback(){this.removeEventListener("keydown",this._handleKeyDown)}formResetCallback(){this.checked=this.defaultChecked}formStateRestoreCallback(n,s){n&&(this.checked=!0)}_setActualFormValue(){let n="";this.checked?n=this.value?this.value:"on":n=null,this._internals.setFormValue(n)}_toggleState(){this.checked=!this.checked,this.indeterminate=!1,this._setActualFormValue(),this._manageRequired(),this.dispatchEvent(new Event("change",{bubbles:!0}))}_manageRequired(){!this.checked&&this.required?this._internals.setValidity({valueMissing:!0},"Please check this box if you want to proceed.",this._inputEl??void 0):this._internals.setValidity({})}render(){const n=Ye({icon:!0,checked:this.checked,indeterminate:this.indeterminate}),s=Ye({"label-inner":!0}),l=te`<svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      class="check-icon"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14.431 3.323l-8.47 10-.79-.036-3.35-4.77.818-.574 2.978 4.24 8.051-9.506.764.646z"
      />
    </svg>`,r=this.checked&&!this.indeterminate?l:Ce,c=this.indeterminate?te`<span class="indeterminate-icon"></span>`:Ce,f=this.toggle?te`<span class="thumb"></span>`:te`${c}${r}`;return te`
      <div class="wrapper">
        <input
          ?autofocus=${this.autofocus}
          id="input"
          class="checkbox"
          type="checkbox"
          ?checked=${this.checked}
          role=${Ge(this.toggle?"switch":void 0)}
          aria-checked=${Ge(this.toggle?this.checked?"true":"false":void 0)}
          value=${this.value}
        />
        <div class=${n}>${f}</div>
        <label for="input" class="label" @click=${this._handleClick}>
          <span class=${s}>
            ${this._renderLabelAttribute()}
            <slot @slotchange=${this._handleSlotChange}></slot>
          </span>
        </label>
      </div>
    `}};Wt.styles=cw;Wt.formAssociated=!0;Wt.shadowRootOptions={...gi.shadowRootOptions,delegatesFocus:!0};In([N({type:Boolean,reflect:!0})],Wt.prototype,"autofocus",void 0);In([N({type:Boolean,reflect:!0})],Wt.prototype,"checked",null);In([N({type:Boolean,reflect:!0,attribute:"default-checked"})],Wt.prototype,"defaultChecked",void 0);In([N({type:Boolean,reflect:!0})],Wt.prototype,"invalid",void 0);In([N({reflect:!0})],Wt.prototype,"name",void 0);In([N({type:Boolean,reflect:!0})],Wt.prototype,"toggle",void 0);In([N()],Wt.prototype,"value",void 0);In([N({type:Boolean,reflect:!0})],Wt.prototype,"disabled",void 0);In([N({type:Boolean,reflect:!0})],Wt.prototype,"indeterminate",void 0);In([N({type:Boolean,reflect:!0})],Wt.prototype,"required",null);In([N()],Wt.prototype,"type",void 0);In([bn("#input")],Wt.prototype,"_inputEl",void 0);Wt=In([ze("vscode-checkbox")],Wt);const Vu=De({tagName:"vscode-checkbox",elementClass:Wt,react:F,displayName:"VscodeCheckbox",events:{onChange:"change"}}),dw=[Be,Me`
    :host {
      display: block;
    }

    .wrapper {
      display: flex;
      flex-wrap: wrap;
    }

    :host([variant='vertical']) .wrapper {
      display: block;
    }

    ::slotted(vscode-checkbox) {
      margin-right: 20px;
    }

    ::slotted(vscode-checkbox:last-child) {
      margin-right: 0;
    }

    :host([variant='vertical']) ::slotted(vscode-checkbox) {
      display: block;
      margin-bottom: 15px;
    }

    :host([variant='vertical']) ::slotted(vscode-checkbox:last-child) {
      margin-bottom: 0;
    }
  `];var ph=function(o,n,s,l){var r=arguments.length,c=r<3?n:l===null?l=Object.getOwnPropertyDescriptor(n,s):l,f;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(o,n,s,l);else for(var p=o.length-1;p>=0;p--)(f=o[p])&&(c=(r<3?f(c):r>3?f(n,s,c):f(n,s))||c);return r>3&&c&&Object.defineProperty(n,s,c),c};let Ja=class extends Ie{constructor(){super(...arguments),this.role="group",this.variant="horizontal"}render(){return te`
      <div class="wrapper">
        <slot></slot>
      </div>
    `}};Ja.styles=dw;ph([N({reflect:!0})],Ja.prototype,"role",void 0);ph([N({reflect:!0})],Ja.prototype,"variant",void 0);Ja=ph([ze("vscode-checkbox-group")],Ja);De({tagName:"vscode-checkbox-group",elementClass:Ja,react:F,displayName:"VscodeCheckboxGroup"});const uw=[Be,Me`
    :host {
      display: block;
    }

    .collapsible {
      background-color: var(--vscode-sideBar-background, #181818);
    }

    .collapsible-header {
      align-items: center;
      background-color: var(--vscode-sideBarSectionHeader-background, #181818);
      cursor: pointer;
      display: flex;
      height: 22px;
      line-height: 22px;
      user-select: none;
    }

    .collapsible-header:focus {
      opacity: 1;
      outline-offset: -1px;
      outline-style: solid;
      outline-width: 1px;
      outline-color: var(--vscode-focusBorder, #0078d4);
    }

    .title {
      color: var(--vscode-sideBarTitle-foreground, #cccccc);
      display: block;
      font-family: var(--vscode-font-family, sans-serif);
      font-size: 11px;
      font-weight: 700;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      text-transform: uppercase;
      white-space: nowrap;
    }

    .title .description {
      font-weight: 400;
      margin-left: 10px;
      text-transform: none;
      opacity: 0.6;
    }

    .header-icon {
      color: var(--vscode-icon-foreground, #cccccc);
      display: block;
      flex-shrink: 0;
      margin: 0 3px;
    }

    .collapsible.open .header-icon {
      transform: rotate(90deg);
    }

    .header-slots {
      align-items: center;
      display: flex;
      height: 22px;
      margin-left: auto;
      margin-right: 4px;
    }

    .actions {
      display: none;
    }

    .collapsible.open .actions.always-visible,
    .collapsible.open:hover .actions {
      display: block;
    }

    .header-slots slot {
      display: flex;
      max-height: 22px;
      overflow: hidden;
    }

    .header-slots slot::slotted(div) {
      align-items: center;
      display: flex;
    }

    .collapsible-body {
      display: none;
      overflow: hidden;
    }

    .collapsible.open .collapsible-body {
      display: block;
    }
  `];var el=function(o,n,s,l){var r=arguments.length,c=r<3?n:l===null?l=Object.getOwnPropertyDescriptor(n,s):l,f;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(o,n,s,l);else for(var p=o.length-1;p>=0;p--)(f=o[p])&&(c=(r<3?f(c):r>3?f(n,s,c):f(n,s))||c);return r>3&&c&&Object.defineProperty(n,s,c),c};let Zi=class extends Ie{constructor(){super(...arguments),this.alwaysShowHeaderActions=!1,this.title="",this.heading="",this.description="",this.open=!1}_emitToggleEvent(){this.dispatchEvent(new CustomEvent("vsc-collapsible-toggle",{detail:{open:this.open}}))}_onHeaderClick(){this.open=!this.open,this._emitToggleEvent()}_onHeaderKeyDown(n){n.key==="Enter"&&(this.open=!this.open,this._emitToggleEvent())}_onHeaderSlotClick(n){n.stopPropagation()}render(){const n={collapsible:!0,open:this.open},s={actions:!0,"always-visible":this.alwaysShowHeaderActions},l=this.heading?this.heading:this.title,r=te`<svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      class="header-icon"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.072 8.024L5.715 3.667l.618-.62L11 7.716v.618L6.333 13l-.618-.619 4.357-4.357z"
      />
    </svg>`,c=this.description?te`<span class="description">${this.description}</span>`:Ce;return te`
      <div class=${Ye(n)}>
        <div
          class="collapsible-header"
          tabindex="0"
          @click=${this._onHeaderClick}
          @keydown=${this._onHeaderKeyDown}
        >
          ${r}
          <h3 class="title">${l}${c}</h3>
          <div class="header-slots">
            <div class=${Ye(s)}>
              <slot name="actions" @click=${this._onHeaderSlotClick}></slot>
            </div>
            <div class="decorations">
              <slot name="decorations" @click=${this._onHeaderSlotClick}></slot>
            </div>
          </div>
        </div>
        <div class="collapsible-body" part="body">
          <slot></slot>
        </div>
      </div>
    `}};Zi.styles=uw;el([N({type:Boolean,reflect:!0,attribute:"always-show-header-actions"})],Zi.prototype,"alwaysShowHeaderActions",void 0);el([N({type:String})],Zi.prototype,"title",void 0);el([N()],Zi.prototype,"heading",void 0);el([N()],Zi.prototype,"description",void 0);el([N({type:Boolean,reflect:!0})],Zi.prototype,"open",void 0);Zi=el([ze("vscode-collapsible")],Zi);De({tagName:"vscode-collapsible",elementClass:Zi,react:F,displayName:"VscodeCollapsible"});const hw=[Be,Me`
    :host {
      display: block;
      outline: none;
      position: relative;
    }

    .context-menu-item {
      background-color: var(--vscode-menu-background, #1f1f1f);
      color: var(--vscode-menu-foreground, #cccccc);
      display: flex;
      font-family: var(--vscode-font-family, sans-serif);
      font-size: var(--vscode-font-size, 13px);
      font-weight: var(--vscode-font-weight, normal);
      line-height: 1.4em;
      user-select: none;
      white-space: nowrap;
    }

    .ruler {
      border-bottom: 1px solid var(--vscode-menu-separatorBackground, #454545);
      display: block;
      margin: 0 0 4px;
      padding-top: 4px;
      width: 100%;
    }

    .context-menu-item a {
      align-items: center;
      border-color: transparent;
      border-radius: 3px;
      border-style: solid;
      border-width: 1px;
      box-sizing: border-box;
      color: var(--vscode-menu-foreground, #cccccc);
      cursor: pointer;
      display: flex;
      flex: 1 1 auto;
      height: 2em;
      margin-left: 4px;
      margin-right: 4px;
      outline: none;
      position: relative;
      text-decoration: inherit;
    }

    :host([selected]) .context-menu-item a {
      background-color: var(--vscode-menu-selectionBackground, #0078d4);
      border-color: var(--vscode-menu-selectionBorder, transparent);
      color: var(--vscode-menu-selectionForeground, #ffffff);
    }

    .label {
      background: none;
      display: flex;
      flex: 1 1 auto;
      font-size: 12px;
      line-height: 1;
      padding: 0 22px;
      text-decoration: none;
    }

    .keybinding {
      display: block;
      flex: 2 1 auto;
      line-height: 1;
      padding: 0 22px;
      text-align: right;
    }
  `];var tl=function(o,n,s,l){var r=arguments.length,c=r<3?n:l===null?l=Object.getOwnPropertyDescriptor(n,s):l,f;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(o,n,s,l);else for(var p=o.length-1;p>=0;p--)(f=o[p])&&(c=(r<3?f(c):r>3?f(n,s,c):f(n,s))||c);return r>3&&c&&Object.defineProperty(n,s,c),c};let Ji=class extends Ie{constructor(){super(...arguments),this.label="",this.keybinding="",this.value="",this.separator=!1,this.tabindex=0}onItemClick(){this.dispatchEvent(new CustomEvent("vsc-click",{detail:{label:this.label,keybinding:this.keybinding,value:this.value||this.label,separator:this.separator,tabindex:this.tabindex},bubbles:!0,composed:!0}))}render(){return te`
      ${this.separator?te`
            <div class="context-menu-item separator">
              <span class="ruler"></span>
            </div>
          `:te`
            <div class="context-menu-item">
              <a @click=${this.onItemClick}>
                ${this.label?te`<span class="label">${this.label}</span>`:Ce}
                ${this.keybinding?te`<span class="keybinding">${this.keybinding}</span>`:Ce}
              </a>
            </div>
          `}
    `}};Ji.styles=hw;tl([N({type:String})],Ji.prototype,"label",void 0);tl([N({type:String})],Ji.prototype,"keybinding",void 0);tl([N({type:String})],Ji.prototype,"value",void 0);tl([N({type:Boolean,reflect:!0})],Ji.prototype,"separator",void 0);tl([N({type:Number})],Ji.prototype,"tabindex",void 0);Ji=tl([ze("vscode-context-menu-item")],Ji);const fw=[Be,Me`
    :host {
      display: block;
      position: relative;
    }

    .context-menu {
      background-color: var(--vscode-menu-background, #1f1f1f);
      border-color: var(--vscode-menu-border, #454545);
      border-radius: 5px;
      border-style: solid;
      border-width: 1px;
      box-shadow: 0 2px 8px var(--vscode-widget-shadow, rgba(0, 0, 0, 0.36));
      color: var(--vscode-menu-foreground, #cccccc);
      font-family: var(--vscode-font-family, sans-serif);
      font-size: var(--vscode-font-size, 13px);
      font-weight: var(--vscode-font-weight, normal);
      line-height: 1.4em;
      padding: 4px 0;
      white-space: nowrap;
    }

    .context-menu:focus {
      outline: 0;
    }
  `];var Ts=function(o,n,s,l){var r=arguments.length,c=r<3?n:l===null?l=Object.getOwnPropertyDescriptor(n,s):l,f;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(o,n,s,l);else for(var p=o.length-1;p>=0;p--)(f=o[p])&&(c=(r<3?f(c):r>3?f(n,s,c):f(n,s))||c);return r>3&&c&&Object.defineProperty(n,s,c),c};let vi=class extends Ie{set data(n){this._data=n;const s=[];n.forEach((l,r)=>{l.separator||s.push(r)}),this._clickableItemIndexes=s}get data(){return this._data}set show(n){this._show=n,this._selectedClickableItemIndex=-1,n&&this.updateComplete.then(()=>{this._wrapperEl&&this._wrapperEl.focus(),requestAnimationFrame(()=>{document.addEventListener("click",this._onClickOutsideBound,{once:!0})})})}get show(){return this._show}constructor(){super(),this.preventClose=!1,this.tabIndex=0,this._selectedClickableItemIndex=-1,this._show=!1,this._data=[],this._clickableItemIndexes=[],this._onClickOutsideBound=this._onClickOutside.bind(this),this.addEventListener("keydown",this._onKeyDown)}_onClickOutside(n){n.composedPath().includes(this)||(this.show=!1)}_onKeyDown(n){const{key:s}=n;switch((s==="ArrowUp"||s==="ArrowDown"||s==="Escape"||s==="Enter")&&n.preventDefault(),s){case"ArrowUp":this._handleArrowUp();break;case"ArrowDown":this._handleArrowDown();break;case"Escape":this._handleEscape();break;case"Enter":this._handleEnter();break}}_handleArrowUp(){this._selectedClickableItemIndex===0?this._selectedClickableItemIndex=this._clickableItemIndexes.length-1:this._selectedClickableItemIndex-=1}_handleArrowDown(){this._selectedClickableItemIndex+1<this._clickableItemIndexes.length?this._selectedClickableItemIndex+=1:this._selectedClickableItemIndex=0}_handleEscape(){this.show=!1,document.removeEventListener("click",this._onClickOutsideBound)}_dispatchSelectEvent(n){const{keybinding:s,label:l,value:r,separator:c,tabindex:f}=n;this.dispatchEvent(new CustomEvent("vsc-context-menu-select",{detail:{keybinding:s,label:l,separator:c,tabindex:f,value:r}}))}_handleEnter(){if(this._selectedClickableItemIndex===-1)return;const n=this._clickableItemIndexes[this._selectedClickableItemIndex],l=this._wrapperEl.querySelectorAll("vscode-context-menu-item")[n];this._dispatchSelectEvent(l),this.preventClose||(this.show=!1,document.removeEventListener("click",this._onClickOutsideBound))}_onItemClick(n){const s=n.currentTarget;this._dispatchSelectEvent(s),this.preventClose||(this.show=!1)}_onItemMouseOver(n){const s=n.target,l=s.dataset.index?+s.dataset.index:-1,r=this._clickableItemIndexes.findIndex(c=>c===l);r!==-1&&(this._selectedClickableItemIndex=r)}_onItemMouseOut(){this._selectedClickableItemIndex=-1}render(){if(!this._show)return te`${Ce}`;const n=this._clickableItemIndexes[this._selectedClickableItemIndex];return te`
      <div class="context-menu" tabindex="0">
        ${this.data?this.data.map(({label:s="",keybinding:l="",value:r="",separator:c=!1,tabindex:f=0},p)=>te`
                <vscode-context-menu-item
                  label=${s}
                  keybinding=${l}
                  value=${r}
                  ?separator=${c}
                  ?selected=${p===n}
                  tabindex=${f}
                  @vsc-click=${this._onItemClick}
                  @mouseover=${this._onItemMouseOver}
                  @mouseout=${this._onItemMouseOut}
                  data-index=${p}
                ></vscode-context-menu-item>
              `):te`<slot></slot>`}
      </div>
    `}};vi.styles=fw;Ts([N({type:Array,attribute:!1})],vi.prototype,"data",null);Ts([N({type:Boolean,reflect:!0,attribute:"prevent-close"})],vi.prototype,"preventClose",void 0);Ts([N({type:Boolean,reflect:!0})],vi.prototype,"show",null);Ts([N({type:Number,reflect:!0})],vi.prototype,"tabIndex",void 0);Ts([Te()],vi.prototype,"_selectedClickableItemIndex",void 0);Ts([Te()],vi.prototype,"_show",void 0);Ts([bn(".context-menu")],vi.prototype,"_wrapperEl",void 0);vi=Ts([ze("vscode-context-menu")],vi);De({tagName:"vscode-context-menu",elementClass:vi,react:F,displayName:"VscodeContextMenu",events:{onVscContextMenuSelect:"vsc-context-menu-select"}});De({tagName:"vscode-context-menu-item",elementClass:Ji,react:F,displayName:"VscodeContextMenuItem"});const pw=[Be,Me`
    :host {
      display: block;
      margin-bottom: 10px;
      margin-top: 10px;
    }

    div {
      background-color: var(--vscode-foreground, #cccccc);
      height: 1px;
      opacity: 0.4;
    }
  `];var Gv=function(o,n,s,l){var r=arguments.length,c=r<3?n:l===null?l=Object.getOwnPropertyDescriptor(n,s):l,f;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(o,n,s,l);else for(var p=o.length-1;p>=0;p--)(f=o[p])&&(c=(r<3?f(c):r>3?f(n,s,c):f(n,s))||c);return r>3&&c&&Object.defineProperty(n,s,c),c};let bo=class extends Ie{constructor(){super(...arguments),this.role="separator"}render(){return te`<div></div>`}};bo.styles=pw;Gv([N({reflect:!0})],bo.prototype,"role",void 0);bo=Gv([ze("vscode-divider")],bo);De({tagName:"vscode-divider",elementClass:bo,react:F,displayName:"VscodeDivider"});const mw=[Be,Me`
    :host {
      display: block;
      max-width: 727px;
    }
  `];var wo=function(o,n,s,l){var r=arguments.length,c=r<3?n:l===null?l=Object.getOwnPropertyDescriptor(n,s):l,f;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(o,n,s,l);else for(var p=o.length-1;p>=0;p--)(f=o[p])&&(c=(r<3?f(c):r>3?f(n,s,c):f(n,s))||c);return r>3&&c&&Object.defineProperty(n,s,c),c},Js;(function(o){o.HORIZONTAL="horizontal",o.VERTICAL="vertical"})(Js||(Js={}));let js=class extends Ie{constructor(){super(...arguments),this.breakpoint=490,this._responsive=!1,this._firstUpdateComplete=!1,this._resizeObserverCallbackBound=this._resizeObserverCallback.bind(this)}set responsive(n){this._responsive=n,this._firstUpdateComplete&&(n?this._activateResponsiveLayout():this._deactivateResizeObserver())}get responsive(){return this._responsive}_toggleCompactLayout(n){this._assignedFormGroups.forEach(s=>{s.dataset.originalVariant||(s.dataset.originalVariant=s.variant);const l=s.dataset.originalVariant;n===Js.VERTICAL&&l==="horizontal"?s.variant="vertical":s.variant=l,s.querySelectorAll("vscode-checkbox-group, vscode-radio-group").forEach(c=>{c.dataset.originalVariant||(c.dataset.originalVariant=c.variant);const f=c.dataset.originalVariant;n===Js.HORIZONTAL&&f===Js.HORIZONTAL?c.variant="horizontal":c.variant="vertical"})})}_resizeObserverCallback(n){let s=0;for(const r of n)s=r.contentRect.width;const l=s<this.breakpoint?Js.VERTICAL:Js.HORIZONTAL;l!==this._currentFormGroupLayout&&(this._toggleCompactLayout(l),this._currentFormGroupLayout=l)}_activateResponsiveLayout(){this._resizeObserver=new ResizeObserver(this._resizeObserverCallbackBound),this._resizeObserver.observe(this._wrapperElement)}_deactivateResizeObserver(){this._resizeObserver?.disconnect(),this._resizeObserver=null}firstUpdated(){this._firstUpdateComplete=!0,this._responsive&&this._activateResponsiveLayout()}render(){return te`
      <div class="wrapper">
        <slot></slot>
      </div>
    `}};js.styles=mw;wo([N({type:Boolean,reflect:!0})],js.prototype,"responsive",null);wo([N({type:Number})],js.prototype,"breakpoint",void 0);wo([bn(".wrapper")],js.prototype,"_wrapperElement",void 0);wo([hn({selector:"vscode-form-group"})],js.prototype,"_assignedFormGroups",void 0);js=wo([ze("vscode-form-container")],js);De({tagName:"vscode-form-container",elementClass:js,react:F,displayName:"VscodeFormContainer"});const gw=[Be,Me`
    :host {
      --label-right-margin: 14px;
      --label-width: 150px;

      display: block;
      margin: 15px 0;
    }

    :host([variant='settings-group']) {
      margin: 0;
      padding: 12px 14px 18px;
      max-width: 727px;
    }

    .wrapper {
      display: flex;
      flex-wrap: wrap;
    }

    :host([variant='vertical']) .wrapper,
    :host([variant='settings-group']) .wrapper {
      display: block;
    }

    :host([variant='horizontal']) ::slotted(vscode-checkbox-group),
    :host([variant='horizontal']) ::slotted(vscode-radio-group) {
      width: calc(100% - calc(var(--label-width) + var(--label-right-margin)));
    }

    :host([variant='horizontal']) ::slotted(vscode-label) {
      margin-right: var(--label-right-margin);
      text-align: right;
      width: var(--label-width);
    }

    :host([variant='settings-group']) ::slotted(vscode-label) {
      height: 18px;
      line-height: 18px;
      margin-bottom: 4px;
      margin-right: 0;
      padding: 0;
    }

    ::slotted(vscode-form-helper) {
      margin-left: calc(var(--label-width) + var(--label-right-margin));
    }

    :host([variant='vertical']) ::slotted(vscode-form-helper),
    :host([variant='settings-group']) ::slotted(vscode-form-helper) {
      display: block;
      margin-left: 0;
    }

    :host([variant='settings-group']) ::slotted(vscode-form-helper) {
      margin-bottom: 0;
      margin-top: 0;
    }

    :host([variant='vertical']) ::slotted(vscode-label),
    :host([variant='settings-group']) ::slotted(vscode-label) {
      display: block;
      margin-left: 0;
      text-align: left;
    }

    :host([variant='settings-group']) ::slotted(vscode-inputbox),
    :host([variant='settings-group']) ::slotted(vscode-textfield),
    :host([variant='settings-group']) ::slotted(vscode-textarea),
    :host([variant='settings-group']) ::slotted(vscode-single-select),
    :host([variant='settings-group']) ::slotted(vscode-multi-select) {
      margin-top: 9px;
    }

    ::slotted(vscode-button:first-child) {
      margin-left: calc(var(--label-width) + var(--label-right-margin));
    }

    :host([variant='vertical']) ::slotted(vscode-button) {
      margin-left: 0;
    }

    ::slotted(vscode-button) {
      margin-right: 4px;
    }
  `];var Yv=function(o,n,s,l){var r=arguments.length,c=r<3?n:l===null?l=Object.getOwnPropertyDescriptor(n,s):l,f;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(o,n,s,l);else for(var p=o.length-1;p>=0;p--)(f=o[p])&&(c=(r<3?f(c):r>3?f(n,s,c):f(n,s))||c);return r>3&&c&&Object.defineProperty(n,s,c),c};let yo=class extends Ie{constructor(){super(...arguments),this.variant="horizontal"}render(){return te`
      <div class="wrapper">
        <slot></slot>
      </div>
    `}};yo.styles=gw;Yv([N({reflect:!0})],yo.prototype,"variant",void 0);yo=Yv([ze("vscode-form-group")],yo);De({tagName:"vscode-form-group",elementClass:yo,react:F,displayName:"VscodeFormGroup"});const vw=[Be,Me`
    :host {
      display: block;
      line-height: 1.4em;
      margin-bottom: 4px;
      margin-top: 4px;
      max-width: 720px;
      opacity: 0.9;
    }

    :host([vertical]) {
      margin-left: 0;
    }
  `];var bw=function(o,n,s,l){var r=arguments.length,c=r<3?n:l===null?l=Object.getOwnPropertyDescriptor(n,s):l,f;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(o,n,s,l);else for(var p=o.length-1;p>=0;p--)(f=o[p])&&(c=(r<3?f(c):r>3?f(n,s,c):f(n,s))||c);return r>3&&c&&Object.defineProperty(n,s,c),c};let uo;typeof CSSStyleSheet<"u"&&(uo=new CSSStyleSheet,uo.replaceSync(`
    vscode-form-helper * {
      margin: 0;
    }

    vscode-form-helper *:not(:last-child) {
      margin-bottom: 8px;
    }
  `));let sc=class extends Ie{constructor(){super(),this._injectLightDOMStyles()}_injectLightDOMStyles(){if(typeof document>"u"||!uo)return;document.adoptedStyleSheets.find(s=>s===uo)||document.adoptedStyleSheets.push(uo)}render(){return te`<slot></slot>`}};sc.styles=vw;sc=bw([ze("vscode-form-helper")],sc);De({tagName:"vscode-form-helper",elementClass:sc,react:F,displayName:"VscodeFormHelper"});De({tagName:"vscode-icon",elementClass:si,react:F,displayName:"VscodeIcon"});let nv=0;const Kv=(o="")=>(nv++,`${o}${nv}`),yw=[Be,Me`
    :host {
      display: block;
    }

    .wrapper {
      color: var(--vscode-foreground, #cccccc);
      cursor: default;
      display: block;
      font-family: var(--vscode-font-family, sans-serif);
      font-size: var(--vscode-font-size, 13px);
      font-weight: 600;
      line-height: ${JS};
      padding: 5px 0;
    }

    .wrapper.required:after {
      content: ' *';
    }

    ::slotted(.normal) {
      font-weight: normal;
    }

    ::slotted(.lightened) {
      color: var(--vscode-foreground, #cccccc);
      opacity: 0.9;
    }
  `];var hc=function(o,n,s,l){var r=arguments.length,c=r<3?n:l===null?l=Object.getOwnPropertyDescriptor(n,s):l,f;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(o,n,s,l);else for(var p=o.length-1;p>=0;p--)(f=o[p])&&(c=(r<3?f(c):r>3?f(n,s,c):f(n,s))||c);return r>3&&c&&Object.defineProperty(n,s,c),c};let na=class extends Ie{constructor(){super(...arguments),this.required=!1,this._id="",this._htmlFor="",this._connected=!1}set htmlFor(n){this._htmlFor=n,this.setAttribute("for",n),this._connected&&this._connectWithTarget()}get htmlFor(){return this._htmlFor}set id(n){this._id=n}get id(){return this._id}attributeChangedCallback(n,s,l){super.attributeChangedCallback(n,s,l)}connectedCallback(){super.connectedCallback(),this._connected=!0,this._id===""&&(this._id=Kv("vscode-label-"),this.setAttribute("id",this._id)),this._connectWithTarget()}_getTarget(){let n=null;if(this._htmlFor){const s=this.getRootNode({composed:!1});s&&(n=s.querySelector(`#${this._htmlFor}`))}return n}async _connectWithTarget(){await this.updateComplete;const n=this._getTarget();["vscode-radio-group","vscode-checkbox-group"].includes(n?.tagName.toLowerCase()??"")&&n.setAttribute("aria-labelledby",this._id);let s="";this.textContent&&(s=this.textContent.trim()),n&&"label"in n&&["vscode-textfield","vscode-textarea","vscode-single-select","vscode-multi-select"].includes(n?.tagName.toLowerCase()??"")&&(n.label=s)}_handleClick(){const n=this._getTarget();n&&"focus"in n&&n.focus()}render(){return te`
      <label
        class=${Ye({wrapper:!0,required:this.required})}
        @click=${this._handleClick}
        ><slot></slot
      ></label>
    `}};na.styles=yw;hc([N({reflect:!0,attribute:"for"})],na.prototype,"htmlFor",null);hc([N()],na.prototype,"id",null);hc([N({type:Boolean,reflect:!0})],na.prototype,"required",void 0);na=hc([ze("vscode-label")],na);De({tagName:"vscode-label",elementClass:na,react:F,displayName:"VscodeLabel"});const ac=te`
  <span class="icon">
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.976 10.072l4.357-4.357.62.618L8.284 11h-.618L3 6.333l.619-.618 4.357 4.357z"
      />
    </svg>
  </span>
`,xw=zS`<svg
  width="16"
  height="16"
  viewBox="0 0 16 16"
  xmlns="http://www.w3.org/2000/svg"
  fill="currentColor"
>
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M14.431 3.323l-8.47 10-.79-.036-3.35-4.77.818-.574 2.978 4.24 8.051-9.506.764.646z"
  />
</svg>`;const{I:_w}=US,iv=o=>o,sv=()=>document.createComment(""),no=(o,n,s)=>{const l=o._$AA.parentNode,r=n===void 0?o._$AB:n._$AA;if(s===void 0){const c=l.insertBefore(sv(),r),f=l.insertBefore(sv(),r);s=new _w(c,f,o,o.options)}else{const c=s._$AB.nextSibling,f=s._$AM,p=f!==o;if(p){let b;s._$AQ?.(o),s._$AM=o,s._$AP!==void 0&&(b=o._$AU)!==f._$AU&&s._$AP(b)}if(c!==r||p){let b=s._$AA;for(;b!==c;){const g=iv(b).nextSibling;iv(l).insertBefore(b,r),b=g}}}return s},Qs=(o,n,s=o)=>(o._$AI(n,s),o),Sw={},ww=(o,n=Sw)=>o._$AH=n,Cw=o=>o._$AH,Iu=o=>{o._$AR(),o._$AA.remove()};const av=(o,n,s)=>{const l=new Map;for(let r=n;r<=s;r++)l.set(o[r],r);return l},Ew=uh(class extends hh{constructor(o){if(super(o),o.type!==dh.CHILD)throw Error("repeat() can only be used in text expressions")}dt(o,n,s){let l;s===void 0?s=n:n!==void 0&&(l=n);const r=[],c=[];let f=0;for(const p of o)r[f]=l?l(p,f):f,c[f]=s(p,f),f++;return{values:c,keys:r}}render(o,n,s){return this.dt(o,n,s).values}update(o,[n,s,l]){const r=Cw(o),{values:c,keys:f}=this.dt(n,s,l);if(!Array.isArray(r))return this.ut=f,c;const p=this.ut??=[],b=[];let g,_,v=0,k=r.length-1,E=0,O=c.length-1;for(;v<=k&&E<=O;)if(r[v]===null)v++;else if(r[k]===null)k--;else if(p[v]===f[E])b[E]=Qs(r[v],c[E]),v++,E++;else if(p[k]===f[O])b[O]=Qs(r[k],c[O]),k--,O--;else if(p[v]===f[O])b[O]=Qs(r[v],c[O]),no(o,b[O+1],r[v]),v++,O--;else if(p[k]===f[E])b[E]=Qs(r[k],c[E]),no(o,r[v],r[k]),k--,E++;else if(g===void 0&&(g=av(f,E,O),_=av(p,v,k)),g.has(p[v]))if(g.has(p[k])){const V=_.get(f[E]),se=V!==void 0?r[V]:null;if(se===null){const ee=no(o,r[v]);Qs(ee,c[E]),b[E]=ee}else b[E]=Qs(se,c[E]),no(o,r[v],se),r[V]=null;E++}else Iu(r[k]),k--;else Iu(r[v]),v++;for(;E<=O;){const V=no(o,b[O+1]);Qs(V,c[E]),b[E++]=V}for(;v<=k;){const V=r[v++];V!==null&&Iu(V)}return this.ut=f,ww(o,b),ji}});function Nw(o,n,s){return o?n(o):s?.(o)}var Co=function(o,n,s,l){var r=arguments.length,c=r<3?n:l===null?l=Object.getOwnPropertyDescriptor(n,s):l,f;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(o,n,s,l);else for(var p=o.length-1;p>=0;p--)(f=o[p])&&(c=(r<3?f(c):r>3?f(n,s,c):f(n,s))||c);return r>3&&c&&Object.defineProperty(n,s,c),c};let As=class extends Ie{constructor(){super(...arguments),this.description="",this.selected=!1,this.disabled=!1,this._initialized=!1,this._handleSlotChange=()=>{this._initialized&&this.dispatchEvent(new Event("vsc-option-state-change",{bubbles:!0}))}}connectedCallback(){super.connectedCallback(),this.updateComplete.then(()=>{this._initialized=!0})}willUpdate(n){this._initialized&&(n.has("description")||n.has("value")||n.has("selected")||n.has("disabled"))&&this.dispatchEvent(new Event("vsc-option-state-change",{bubbles:!0}))}render(){return te`<slot @slotchange=${this._handleSlotChange}></slot>`}};As.styles=Be;Co([N({type:String})],As.prototype,"value",void 0);Co([N({type:String})],As.prototype,"description",void 0);Co([N({type:Boolean,reflect:!0})],As.prototype,"selected",void 0);Co([N({type:Boolean,reflect:!0})],As.prototype,"disabled",void 0);As=Co([ze("vscode-option")],As);const Fv=(o,n)=>{const s={match:!1,ranges:[]},l=o.toLowerCase(),r=n.toLowerCase(),c=l.split(" ");let f=0;return c.forEach((p,b)=>{if(b>0&&(f+=c[b-1].length+1),s.match)return;const g=p.indexOf(r),_=r.length;g===0&&(s.match=!0,s.ranges.push([f+g,Math.min(f+g+_,o.length)]))}),s},Xv=(o,n)=>{const s={match:!1,ranges:[]};return o.toLowerCase().indexOf(n.toLowerCase())===0&&(s.match=!0,s.ranges=[[0,n.length]]),s},Qv=(o,n)=>{const s={match:!1,ranges:[]},l=o.toLowerCase().indexOf(n.toLowerCase());return l>-1&&(s.match=!0,s.ranges=[[l,l+n.length]]),s},Zv=(o,n)=>{const s={match:!1,ranges:[]};let l=0,r=0;const c=n.length-1,f=o.toLowerCase(),p=n.toLowerCase();for(let b=0;b<=c;b++){if(r=f.indexOf(p[b],l),r===-1)return{match:!1,ranges:[]};s.match=!0,s.ranges.push([r,r+1]),l=r+1}return s},jw=(o,n,s)=>{const l=[];return o.forEach(r=>{let c;switch(s){case"startsWithPerTerm":c=Fv(r.label,n);break;case"startsWith":c=Xv(r.label,n);break;case"contains":c=Qv(r.label,n);break;default:c=Zv(r.label,n)}c.match&&l.push({...r,ranges:c.ranges})}),l},Pr=o=>{const n=[];return o===" "?(n.push(te`&nbsp;`),n):(o.indexOf(" ")===0&&n.push(te`&nbsp;`),n.push(te`${o.trimStart().trimEnd()}`),o.lastIndexOf(" ")===o.length-1&&n.push(te`&nbsp;`),n)},Aw=(o,n)=>{const s=[],l=n.length;return l<1?te`${o}`:(n.forEach((r,c)=>{const f=o.substring(r[0],r[1]);c===0&&r[0]!==0&&s.push(...Pr(o.substring(0,n[0][0]))),c>0&&c<l&&r[0]-n[c-1][1]!==0&&s.push(...Pr(o.substring(n[c-1][1],r[0]))),s.push(te`<b>${Pr(f)}</b>`),c===l-1&&r[1]<o.length&&s.push(...Pr(o.substring(r[1],o.length)))}),s)};class kw{constructor(n){this._activeIndex=-1,this._options=[],this._filterPattern="",this._filterMethod="fuzzy",this._combobox=!1,this._indexByValue=new Map,this._indexByLabel=new Map,this._selectedIndex=-1,this._selectedIndexes=new Set,this._multiSelect=!1,this._numOfVisibleOptions=0,(this._host=n).addController(this)}hostConnected(){}get activeIndex(){return this._activeIndex}set activeIndex(n){this._activeIndex=n,this._host.requestUpdate()}get relativeActiveIndex(){return this._options[this._activeIndex]?.filteredIndex??-1}set comboboxMode(n){this._combobox=n,this._host.requestUpdate()}get comboboxMode(){return this._combobox}get multiSelect(){return this._multiSelect}set multiSelect(n){this._selectedIndex=-1,this._selectedIndexes.clear(),this._multiSelect=n,this._host.requestUpdate()}get selectedIndex(){return this._selectedIndex}set selectedIndex(n){this._selectedIndex!==-1&&this._options[this._selectedIndex]&&(this._options[this._selectedIndex].selected??=!1);const s=this.getOptionByIndex(n);this._selectedIndex=s?n:-1,this._host.requestUpdate()}get selectedIndexes(){return Array.from(this._selectedIndexes)}set selectedIndexes(n){this._selectedIndexes.forEach(s=>{this._options[s].selected=!1}),this._selectedIndexes=new Set(n),n.forEach(s=>{this._options[s]!==void 0&&(this._options[s].selected=!0)}),this._host.requestUpdate()}set value(n){if(this._multiSelect){const s=n.map(l=>this._indexByValue.get(l)).filter(l=>l!==void 0);this._selectedIndexes=new Set(s)}else this._selectedIndex=this._indexByValue.get(n)??-1;this._host.requestUpdate()}get value(){return this._multiSelect?this._selectedIndexes.size>0?Array.from(this._selectedIndexes).filter(n=>n>=0&&n<this._options.length).map(n=>this._options[n].value):[]:this._selectedIndex>-1&&this._selectedIndex<this._options.length?this._options[this._selectedIndex].value:""}set multiSelectValue(n){const s=n.map(l=>this._indexByValue.get(l)).filter(l=>l!==void 0);this._selectedIndexes=new Set(s)}get multiSelectValue(){return this._selectedIndexes.size>0?Array.from(this._selectedIndexes).map(n=>this._options[n].value):[]}get filterPattern(){return this._filterPattern}set filterPattern(n){n!==this._filterPattern&&(this._filterPattern=n,this._updateState())}get filterMethod(){return this._filterMethod}set filterMethod(n){n!==this._filterMethod&&(this._filterMethod=n,this._updateState())}get options(){return this._options}get numOfVisibleOptions(){return this._numOfVisibleOptions}get numOptions(){return this._options.length}populate(n){this._indexByValue.clear(),this._indexByLabel.clear(),this._options=n.map((s,l)=>(this._indexByValue.set(s.value??"",l),this._indexByLabel.set(s.label??"",l),{description:s.description??"",disabled:s.disabled??!1,label:s.label??"",selected:s.selected??!1,value:s.value??"",index:l,filteredIndex:l,ranges:[],visible:!0})),this._numOfVisibleOptions=this._options.length}add(n){const s=this._options.length,{description:l,disabled:r,label:c,selected:f,value:p}=n;let b=!0,g=[];if(this._combobox&&this._filterPattern!==""){const _=this._searchByPattern(c??"");b=_.match,g=_.ranges}this._indexByValue.set(p??"",s),this._indexByLabel.set(c??"",s),f&&(this._selectedIndex=s,this._selectedIndexes.add(s),this._activeIndex=s),this._options.push({index:s,filteredIndex:s,description:l??"",disabled:r??!1,label:c??"",selected:f??!1,value:p??"",visible:b,ranges:g}),b&&(this._numOfVisibleOptions+=1)}clear(){this._options=[],this._indexByValue.clear(),this._indexByLabel.clear(),this._numOfVisibleOptions=0,this._selectedIndex=-1,this._selectedIndexes.clear(),this._activeIndex=-1}getIsIndexSelected(n){return this._multiSelect?this._selectedIndexes.has(n):this._selectedIndex===n}expandMultiSelection(n){n.forEach(s=>{const l=this._indexByValue.get(s)??-1;l!==-1&&this._selectedIndexes.add(l)}),this._host.requestUpdate()}toggleActiveMultiselectOption(){const n=this._options[this._activeIndex]??null;if(!n)return;this._selectedIndexes.has(n.index)?this._selectedIndexes.delete(n.index):this._selectedIndexes.add(n.index),this._host.requestUpdate()}toggleOptionSelected(n){const s=this._selectedIndexes.has(n);this._options[n].selected=!this._options[n].selected,s?this._selectedIndexes.delete(n):this._selectedIndexes.add(n),this._host.requestUpdate()}getActiveOption(){return this._options[this._activeIndex]??null}getSelectedOption(){return this._options[this._selectedIndex]??null}getOptionByIndex(n){return this._options[n]??null}findOptionIndex(n){return this._indexByValue.get(n)??-1}getOptionByValue(n,s=!1){const l=this._indexByValue.get(n)??-1;return l===-1?null:s?this._options[l]:this._options[l].visible?this._options[l]:null}getOptionByLabel(n){const s=this._indexByLabel.get(n)??-1;return s===-1?null:this._options[s]}next(n){const s=n??this._activeIndex;let l=-1;for(let r=s+1;r<this._options.length;r++)if(this._options[r]&&!this._options[r].disabled&&this._options[r].visible){l=r;break}return l>-1?this._options[l]:null}prev(n){const s=n??this._activeIndex;let l=-1;for(let r=s-1;r>=0;r--)if(this._options[r]&&!this._options[r].disabled&&this._options[r].visible){l=r;break}return l>-1?this._options[l]:null}activateDefault(){if(this._multiSelect){if(this._selectedIndexes.size>0){const s=this._selectedIndexes.values().next();this._activeIndex=s.value?s.value:0}}else this._selectedIndex>-1?this._activeIndex=this._selectedIndex:this._activeIndex=0;this._host.requestUpdate()}selectAll(){this._multiSelect&&(this._options.forEach((n,s)=>{this._options[s].selected=!0,this._selectedIndexes.add(s)}),this._host.requestUpdate())}selectNone(){this._multiSelect&&(this._options.forEach((n,s)=>{this._options[s].selected=!1}),this._selectedIndexes.clear(),this._host.requestUpdate())}_searchByPattern(n){let s;switch(this._filterMethod){case"startsWithPerTerm":s=Fv(n,this._filterPattern);break;case"startsWith":s=Xv(n,this._filterPattern);break;case"contains":s=Qv(n,this._filterPattern);break;default:s=Zv(n,this._filterPattern)}return s}_updateState(){if(!this._combobox||this._filterPattern==="")this._options.forEach((n,s)=>{this._options[s].visible=!0,this._options[s].ranges=[]}),this._numOfVisibleOptions=this._options.length;else{let n=-1;this._numOfVisibleOptions=0,this._options.forEach(({label:s},l)=>{const r=this._searchByPattern(s);this._options[l].visible=r.match,this._options[l].ranges=r.ranges,this._options[l].filteredIndex=r.match?++n:-1,r.match&&(this._numOfVisibleOptions+=1)})}this._host.requestUpdate()}}const Tw=[Be,Me`
    :host {
      display: block;
      position: relative;
    }

    .scrollable-container {
      height: 100%;
      overflow: auto;
    }

    .scrollable-container::-webkit-scrollbar {
      cursor: default;
      width: 0;
    }

    .scrollable-container {
      scrollbar-width: none;
    }

    .shadow {
      box-shadow: var(--vscode-scrollbar-shadow, #000000) 0 6px 6px -6px inset;
      display: none;
      height: 3px;
      left: 0;
      pointer-events: none;
      position: absolute;
      top: 0;
      z-index: 1;
      width: 100%;
    }

    .shadow.visible {
      display: block;
    }

    .scrollbar-track {
      height: 100%;
      position: absolute;
      right: 0;
      top: 0;
      width: 10px;
      z-index: 100;
    }

    .scrollbar-track.hidden {
      display: none;
    }

    .scrollbar-thumb {
      background-color: transparent;
      min-height: var(--min-thumb-height, 20px);
      opacity: 0;
      position: absolute;
      right: 0;
      width: 10px;
    }

    .scrollbar-thumb.visible {
      background-color: var(
        --vscode-scrollbarSlider-background,
        rgba(121, 121, 121, 0.4)
      );
      opacity: 1;
      transition: opacity 100ms;
    }

    .scrollbar-thumb.fade {
      background-color: var(
        --vscode-scrollbarSlider-background,
        rgba(121, 121, 121, 0.4)
      );
      opacity: 0;
      transition: opacity 800ms;
    }

    .scrollbar-thumb.visible:hover {
      background-color: var(
        --vscode-scrollbarSlider-hoverBackground,
        rgba(100, 100, 100, 0.7)
      );
    }

    .scrollbar-thumb.visible.active,
    .scrollbar-thumb.visible.active:hover {
      background-color: var(
        --vscode-scrollbarSlider-activeBackground,
        rgba(191, 191, 191, 0.4)
      );
    }

    .prevent-interaction {
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;
      position: absolute;
      z-index: 99;
    }

    .content {
      overflow: hidden;
    }
  `];var nn=function(o,n,s,l){var r=arguments.length,c=r<3?n:l===null?l=Object.getOwnPropertyDescriptor(n,s):l,f;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(o,n,s,l);else for(var p=o.length-1;p>=0;p--)(f=o[p])&&(c=(r<3?f(c):r>3?f(n,s,c):f(n,s))||c);return r>3&&c&&Object.defineProperty(n,s,c),c};let Ht=class extends Ie{set scrollPos(n){this._scrollPos=this._limitScrollPos(n),this._updateScrollbar(),this._updateThumbPosition(),this.requestUpdate()}get scrollPos(){return this._scrollPos}get scrollMax(){return this._scrollableContainer?this._scrollableContainer.scrollHeight-this._scrollableContainer.clientHeight:0}constructor(){super(),this.alwaysVisible=!1,this.fastScrollSensitivity=5,this.minThumbSize=20,this.mouseWheelScrollSensitivity=1,this.shadow=!0,this.scrolled=!1,this._scrollPos=0,this._isDragging=!1,this._thumbHeight=0,this._thumbY=0,this._thumbVisible=!1,this._thumbFade=!1,this._thumbActive=!1,this._componentHeight=0,this._contentHeight=0,this._scrollThumbStartY=0,this._mouseStartY=0,this._scrollbarVisible=!0,this._scrollbarTrackZ=0,this._resizeObserverCallback=()=>{this._componentHeight=this.offsetHeight,this._contentHeight=this._contentElement.offsetHeight,this._updateScrollbar(),this._updateThumbPosition()},this._handleSlotChange=()=>{this._updateScrollbar(),this._updateThumbPosition(),this._zIndexFix()},this._handleScrollThumbMouseMove=n=>{const s=this._scrollThumbStartY+(n.screenY-this._mouseStartY);this._thumbY=this._limitThumbPos(s),this.scrollPos=this._calculateScrollPosFromThumbPos(this._thumbY),this.dispatchEvent(new CustomEvent("vsc-scrollable-scroll",{detail:this.scrollPos}))},this._handleScrollThumbMouseUp=n=>{this._isDragging=!1,this._thumbActive=!1;const s=this.getBoundingClientRect(),{x:l,y:r,width:c,height:f}=s,{pageX:p,pageY:b}=n;(p>l+c||p<l||b>r+f||b<r)&&(this._thumbFade=!0,this._thumbVisible=!1),document.removeEventListener("mousemove",this._handleScrollThumbMouseMove),document.removeEventListener("mouseup",this._handleScrollThumbMouseUp)},this._handleComponentMouseOver=()=>{this._thumbVisible=!0,this._thumbFade=!1},this._handleComponentMouseOut=()=>{this._thumbActive||(this._thumbVisible=!1,this._thumbFade=!0)},this._handleComponentWheel=n=>{if(this._contentHeight<=this._componentHeight)return;n.preventDefault();const s=n.altKey?this.mouseWheelScrollSensitivity*this.fastScrollSensitivity:this.mouseWheelScrollSensitivity;this.scrollPos=this._limitScrollPos(this.scrollPos+n.deltaY*s),this.dispatchEvent(new CustomEvent("vsc-scrollable-scroll",{detail:this.scrollPos}))},this._handleScrollableContainerScroll=n=>{n.currentTarget&&(this.scrollPos=n.currentTarget.scrollTop)},this.addEventListener("mouseover",this._handleComponentMouseOver),this.addEventListener("mouseout",this._handleComponentMouseOut),this.addEventListener("wheel",this._handleComponentWheel)}connectedCallback(){super.connectedCallback(),this._hostResizeObserver=new ResizeObserver(this._resizeObserverCallback),this._contentResizeObserver=new ResizeObserver(this._resizeObserverCallback),this.requestUpdate(),this.updateComplete.then(()=>{this._hostResizeObserver.observe(this),this._contentResizeObserver.observe(this._contentElement),this._updateThumbPosition()})}disconnectedCallback(){super.disconnectedCallback(),this._hostResizeObserver.unobserve(this),this._hostResizeObserver.disconnect(),this._contentResizeObserver.unobserve(this._contentElement),this._contentResizeObserver.disconnect()}firstUpdated(n){this._updateThumbPosition()}_calcThumbHeight(){const n=this.offsetHeight,s=this._contentElement?.offsetHeight??0,l=n*(n/s);return Math.max(this.minThumbSize,l)}_updateScrollbar(){const n=this._contentElement?.offsetHeight??0;this.offsetHeight>=n?this._scrollbarVisible=!1:(this._scrollbarVisible=!0,this._thumbHeight=this._calcThumbHeight()),this.requestUpdate()}_zIndexFix(){let n=0;this._assignedElements.forEach(s=>{if("style"in s){const l=window.getComputedStyle(s).zIndex;/([0-9-])+/g.test(l)&&(n=Number(l)>n?Number(l):n)}}),this._scrollbarTrackZ=n+1,this.requestUpdate()}_updateThumbPosition(){if(!this._scrollableContainer)return;this.scrolled=this.scrollPos>0;const n=this.offsetHeight,s=this._thumbHeight,r=this._contentElement.offsetHeight-n,c=this.scrollPos/r,f=n-s;this._thumbY=Math.min(c*(n-s),f)}_calculateScrollPosFromThumbPos(n){const s=this.getBoundingClientRect().height,l=this._scrollThumbElement.getBoundingClientRect().height,r=this._contentElement.getBoundingClientRect().height,c=n/(s-l)*(r-s);return this._limitScrollPos(c)}_limitScrollPos(n){return n<0?0:n>this.scrollMax?this.scrollMax:n}_limitThumbPos(n){const s=this.getBoundingClientRect().height,l=this._scrollThumbElement.getBoundingClientRect().height;return n<0?0:n>s-l?s-l:n}_handleScrollThumbMouseDown(n){const s=this.getBoundingClientRect(),l=this._scrollThumbElement.getBoundingClientRect();this._mouseStartY=n.screenY,this._scrollThumbStartY=l.top-s.top,this._isDragging=!0,this._thumbActive=!0,document.addEventListener("mousemove",this._handleScrollThumbMouseMove),document.addEventListener("mouseup",this._handleScrollThumbMouseUp)}_handleScrollbarTrackPress(n){n.target===n.currentTarget&&(this._thumbY=n.offsetY-this._thumbHeight/2,this.scrollPos=this._calculateScrollPosFromThumbPos(this._thumbY))}render(){return te`
      <div
        class="scrollable-container"
        .style=${Cn({userSelect:this._isDragging?"none":"auto"})}
        .scrollTop=${this.scrollPos}
        @scroll=${this._handleScrollableContainerScroll}
      >
        <div
          class=${Ye({shadow:!0,visible:this.scrolled})}
          .style=${Cn({zIndex:String(this._scrollbarTrackZ)})}
        ></div>
        ${this._isDragging?te`<div class="prevent-interaction"></div>`:Ce}
        <div
          class=${Ye({"scrollbar-track":!0,hidden:!this._scrollbarVisible})}
          @mousedown=${this._handleScrollbarTrackPress}
        >
          <div
            class=${Ye({"scrollbar-thumb":!0,visible:this.alwaysVisible?!0:this._thumbVisible,fade:this.alwaysVisible?!1:this._thumbFade,active:this._thumbActive})}
            .style=${Cn({height:`${this._thumbHeight}px`,top:`${this._thumbY}px`})}
            @mousedown=${this._handleScrollThumbMouseDown}
          ></div>
        </div>
        <div class="content">
          <slot @slotchange=${this._handleSlotChange}></slot>
        </div>
      </div>
    `}};Ht.styles=Tw;nn([N({type:Boolean,reflect:!0,attribute:"always-visible"})],Ht.prototype,"alwaysVisible",void 0);nn([N({type:Number,attribute:"fast-scroll-sensitivity"})],Ht.prototype,"fastScrollSensitivity",void 0);nn([N({type:Number,attribute:"min-thumb-size"})],Ht.prototype,"minThumbSize",void 0);nn([N({type:Number,attribute:"mouse-wheel-scroll-sensitivity"})],Ht.prototype,"mouseWheelScrollSensitivity",void 0);nn([N({type:Boolean,reflect:!0})],Ht.prototype,"shadow",void 0);nn([N({type:Boolean,reflect:!0})],Ht.prototype,"scrolled",void 0);nn([N({type:Number,attribute:"scroll-pos"})],Ht.prototype,"scrollPos",null);nn([Te()],Ht.prototype,"_isDragging",void 0);nn([Te()],Ht.prototype,"_thumbHeight",void 0);nn([Te()],Ht.prototype,"_thumbY",void 0);nn([Te()],Ht.prototype,"_thumbVisible",void 0);nn([Te()],Ht.prototype,"_thumbFade",void 0);nn([Te()],Ht.prototype,"_thumbActive",void 0);nn([bn(".content")],Ht.prototype,"_contentElement",void 0);nn([bn(".scrollbar-thumb",!0)],Ht.prototype,"_scrollThumbElement",void 0);nn([bn(".scrollable-container")],Ht.prototype,"_scrollableContainer",void 0);nn([hn()],Ht.prototype,"_assignedElements",void 0);Ht=nn([ze("vscode-scrollable")],Ht);var Rt=function(o,n,s,l){var r=arguments.length,c=r<3?n:l===null?l=Object.getOwnPropertyDescriptor(n,s):l,f;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(o,n,s,l);else for(var p=o.length-1;p>=0;p--)(f=o[p])&&(c=(r<3?f(c):r>3?f(n,s,c):f(n,s))||c);return r>3&&c&&Object.defineProperty(n,s,c),c};const Gr=10,Qi=22;class yt extends Ie{set combobox(n){this._opts.comboboxMode=n}get combobox(){return this._opts.comboboxMode}set disabled(n){this._disabled=n,this.ariaDisabled=n?"true":"false",n===!0?(this._originalTabIndex=this.tabIndex,this.tabIndex=-1):(this.tabIndex=this._originalTabIndex??0,this._originalTabIndex=void 0),this.requestUpdate()}get disabled(){return this._disabled}set filter(n){const s=["contains","fuzzy","startsWith","startsWithPerTerm"];let l;s.includes(n)?l=n:(this.warn(`Invalid filter: "${n}", fallback to default. Valid values are: "contains", "fuzzy", "startsWith", "startsWithPerm".`),l="fuzzy"),this._opts.filterMethod=l}get filter(){return this._opts.filterMethod}set options(n){this._opts.populate(n)}get options(){return this._opts.options.map(({label:n,value:s,description:l,selected:r,disabled:c})=>({label:n,value:s,description:l,selected:r,disabled:c}))}constructor(){super(),this.creatable=!1,this.label="",this.invalid=!1,this.focused=!1,this.open=!1,this.position="below",this._prevXPos=0,this._prevYPos=0,this._opts=new kw(this),this._firstUpdateCompleted=!1,this._currentDescription="",this._filter="fuzzy",this._selectedIndexes=[],this._options=[],this._value="",this._values=[],this._isPlaceholderOptionActive=!1,this._isBeingFiltered=!1,this._optionListScrollPos=0,this._isHoverForbidden=!1,this._disabled=!1,this._originalTabIndex=void 0,this._onMouseMove=()=>{this._isHoverForbidden=!1,window.removeEventListener("mousemove",this._onMouseMove)},this._onOptionListScroll=n=>{this._optionListScrollPos=n.detail},this._onComponentKeyDown=n=>{[" ","ArrowUp","ArrowDown","Escape"].includes(n.key)&&(n.stopPropagation(),n.preventDefault()),n.key==="Enter"&&this._onEnterKeyDown(n),n.key===" "&&this._onSpaceKeyDown(),n.key==="Escape"&&this._onEscapeKeyDown(),n.key==="ArrowUp"&&this._onArrowUpKeyDown(),n.key==="ArrowDown"&&this._onArrowDownKeyDown()},this._onComponentFocus=()=>{this.focused=!0},this._onComponentBlur=()=>{this.focused=!1},this._handleWindowScroll=()=>{const{x:n,y:s}=this.getBoundingClientRect();(n!==this._prevXPos||s!==this._prevYPos)&&(this.open=!1)},this.addEventListener("vsc-option-state-change",n=>{n.stopPropagation(),this._setStateFromSlottedElements(),this.requestUpdate()})}connectedCallback(){super.connectedCallback(),this.addEventListener("keydown",this._onComponentKeyDown),this.addEventListener("focus",this._onComponentFocus),this.addEventListener("blur",this._onComponentBlur),this._setAutoFocus()}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("keydown",this._onComponentKeyDown),this.removeEventListener("focus",this._onComponentFocus),this.removeEventListener("blur",this._onComponentBlur)}firstUpdated(n){this._firstUpdateCompleted=!0}willUpdate(n){if(n.has("required")&&this._firstUpdateCompleted&&this._manageRequired(),n.has("open")&&this._firstUpdateCompleted)if(this.open){this._dropdownEl.showPopover();const{x:s,y:l}=this.getBoundingClientRect();this._prevXPos=s,this._prevYPos=l,window.addEventListener("scroll",this._handleWindowScroll,{capture:!0}),this._opts.activateDefault(),this._scrollActiveElementToTop()}else this._dropdownEl.hidePopover(),window.removeEventListener("scroll",this._handleWindowScroll)}get _filteredOptions(){return!this.combobox||this._opts.filterPattern===""?this._options:jw(this._options,this._opts.filterPattern,this._filter)}_setAutoFocus(){this.hasAttribute("autofocus")&&(this.tabIndex<0&&(this.tabIndex=0),this.combobox?this.updateComplete.then(()=>{this.shadowRoot?.querySelector(".combobox-input").focus()}):this.updateComplete.then(()=>{this.shadowRoot?.querySelector(".select-face").focus()}))}get _isSuggestedOptionVisible(){if(!(this.combobox&&this.creatable))return!1;const n=this._opts.getOptionByValue(this._opts.filterPattern)!==null,s=this._opts.filterPattern.length>0;return!n&&s}_manageRequired(){}_setStateFromSlottedElements(){const n=this._assignedOptions??[];this._opts.clear(),n.forEach(s=>{const{innerText:l,description:r,disabled:c}=s,f=typeof s.value=="string"?s.value:l.trim(),p=s.selected??!1,b={label:l.trim(),value:f,description:r,selected:p,disabled:c};this._opts.add(b)})}_createSuggestedOption(){const n=this._opts.numOptions,s=document.createElement("vscode-option");return s.value=this._opts.filterPattern,Vv(this._opts.filterPattern,s),this.appendChild(s),n}_dispatchChangeEvent(){this.dispatchEvent(new Event("change")),this.dispatchEvent(new Event("input"))}async _createAndSelectSuggestedOption(){}_toggleComboboxDropdown(){this._opts.filterPattern="",this.open=!this.open}_scrollActiveElementToTop(){this._optionListScrollPos=Math.floor(this._opts.relativeActiveIndex*Qi)}async _adjustOptionListScrollPos(n,s){let l=this._opts.numOfVisibleOptions;if(this._isSuggestedOptionVisible&&(l+=1),l<=Gr)return;this._isHoverForbidden=!0,window.addEventListener("mousemove",this._onMouseMove);const c=this._optionListScrollPos,f=s*Qi,p=f>=c&&f<=c+Gr*Qi-Qi;n==="down"&&(p||(this._optionListScrollPos=s*Qi-(Gr-1)*Qi)),n==="up"&&(p||(this._optionListScrollPos=Math.floor(this._opts.relativeActiveIndex*Qi)))}_onFaceClick(){this.open=!this.open}_handleDropdownToggle(n){this.open=n.newState==="open"}_onComboboxButtonClick(){this._toggleComboboxDropdown()}_onComboboxButtonKeyDown(n){n.key==="Enter"&&this._toggleComboboxDropdown()}_onOptionMouseOver(n){if(this._isHoverForbidden)return;const s=n.target;s.matches(".option")&&(s.matches(".placeholder")?(this._isPlaceholderOptionActive=!0,this._opts.activeIndex=-1):(this._isPlaceholderOptionActive=!1,this._opts.activeIndex=+s.dataset.index))}_onPlaceholderOptionMouseOut(){this._isPlaceholderOptionActive=!1}_onNoOptionsClick(n){n.stopPropagation()}_onEnterKeyDown(n){this._isBeingFiltered=!1,n?.composedPath&&n.composedPath().find(l=>l.matches?l.matches("vscode-button.button-accept"):!1)}_onSpaceKeyDown(){if(!this.open){this.open=!0;return}}_onArrowUpKeyDown(){if(this.open){if(this._opts.activeIndex<=0&&!(this.combobox&&this.creatable))return;if(this._isPlaceholderOptionActive){const n=this._opts.numOfVisibleOptions-1;this._opts.activeIndex=n,this._isPlaceholderOptionActive=!1}else{const n=this._opts.prev();if(n!==null){this._opts.activeIndex=n?.index??-1;const s=n?.filteredIndex??-1;s>-1&&this._adjustOptionListScrollPos("up",s)}}}else this.open=!0,this._opts.activateDefault()}_onArrowDownKeyDown(){let n=this._opts.numOfVisibleOptions;const s=this._isSuggestedOptionVisible;if(s&&(n+=1),this.open){if(this._isPlaceholderOptionActive&&this._opts.activeIndex===-1)return;const l=this._opts.next();if(s&&l===null)this._isPlaceholderOptionActive=!0,this._adjustOptionListScrollPos("down",n-1),this._opts.activeIndex=-1;else if(l!==null){const r=l?.filteredIndex??-1;this._opts.activeIndex=l?.index??-1,r>-1&&this._adjustOptionListScrollPos("down",r)}}else this.open=!0,this._opts.activateDefault()}_onEscapeKeyDown(){this.open=!1}_onSlotChange(){this._setStateFromSlottedElements(),this.requestUpdate()}_onComboboxInputFocus(n){n.target.select(),this._isBeingFiltered=!1,this._opts.filterPattern=""}_onComboboxInputBlur(){this._isBeingFiltered=!1}_onComboboxInputInput(n){this._isBeingFiltered=!0,this._opts.filterPattern=n.target.value,this._opts.activeIndex=-1,this.open=!0}_onComboboxInputClick(){this._isBeingFiltered=this._opts.filterPattern!=="",this.open=!0}_onComboboxInputSpaceKeyDown(n){n.key===" "&&n.stopPropagation()}_onOptionClick(n){this._isBeingFiltered=!1}_renderCheckbox(n,s){return te`<span class=${Ye({"checkbox-icon":!0,checked:n})}>${xw}</span
      ><span class="option-label">${s}</span>`}_renderOptions(){const n=this._opts.options;return te`
      <ul
        aria-label=${Ge(this.label??void 0)}
        aria-multiselectable=${Ge(this._opts.multiSelect?"true":void 0)}
        class="options"
        id="select-listbox"
        role="listbox"
        tabindex="-1"
        @click=${this._onOptionClick}
        @mouseover=${this._onOptionMouseOver}
      >
        ${Ew(n,s=>s.index,(s,l)=>{if(!s.visible)return Ce;const r=s.index===this._opts.activeIndex&&!s.disabled,c=this._opts.getIsIndexSelected(s.index),f={active:r,disabled:s.disabled,option:!0,"single-select":!this._opts.multiSelect,"multi-select":this._opts.multiSelect,selected:c},p=s.ranges?.length??!1?Aw(s.label,s.ranges??[]):s.label;return te`
              <li
                aria-selected=${c?"true":"false"}
                class=${Ye(f)}
                data-index=${s.index}
                data-filtered-index=${l}
                id=${`op-${s.index}`}
                role="option"
                tabindex="-1"
              >
                ${Nw(this._opts.multiSelect,()=>this._renderCheckbox(c,p),()=>p)}
              </li>
            `})}
        ${this._renderPlaceholderOption(this._opts.numOfVisibleOptions<1)}
      </ul>
    `}_renderPlaceholderOption(n){return!this.combobox||this._opts.getOptionByLabel(this._opts.filterPattern)?Ce:this.creatable&&this._opts.filterPattern.length>0?te`<li
        class=${Ye({option:!0,placeholder:!0,active:this._isPlaceholderOptionActive})}
        @mouseout=${this._onPlaceholderOptionMouseOut}
      >
        Add "${this._opts.filterPattern}"
      </li>`:n?te`<li class="no-options" @click=${this._onNoOptionsClick}>
            No options
          </li>`:Ce}_renderDescription(){const n=this._opts.getActiveOption();if(!n)return Ce;const{description:s}=n;return s?te`<div class="description">${s}</div>`:Ce}_renderSelectFace(){return te`${Ce}`}_renderComboboxFace(){return te`${Ce}`}_renderDropdownControls(){return te`${Ce}`}_renderDropdown(){const n={dropdown:!0,multiple:this._opts.multiSelect,open:this.open},s=this._isSuggestedOptionVisible||this._opts.numOfVisibleOptions===0?this._opts.numOfVisibleOptions+1:this._opts.numOfVisibleOptions,l=Math.min(s*Qi,Gr*Qi),r=this.getBoundingClientRect(),c={width:`${r.width}px`,left:`${r.left}px`,top:this.position==="below"?`${r.top+r.height}px`:"unset",bottom:this.position==="below"?"unset":`${document.documentElement.clientHeight-r.top}px`};return te`
      <div
        class=${Ye(n)}
        popover="auto"
        @toggle=${this._handleDropdownToggle}
        .style=${Cn(c)}
      >
        ${this.position==="above"?this._renderDescription():Ce}
        <vscode-scrollable
          always-visible
          class="scrollable"
          min-thumb-size="40"
          tabindex="-1"
          @vsc-scrollable-scroll=${this._onOptionListScroll}
          .scrollPos=${this._optionListScrollPos}
          .style=${Cn({height:`${l}px`})}
        >
          ${this._renderOptions()} ${this._renderDropdownControls()}
        </vscode-scrollable>
        ${this.position==="below"?this._renderDescription():Ce}
      </div>
    `}}Rt([N({type:Boolean,reflect:!0})],yt.prototype,"creatable",void 0);Rt([N({type:Boolean,reflect:!0})],yt.prototype,"combobox",null);Rt([N({reflect:!0})],yt.prototype,"label",void 0);Rt([N({type:Boolean,reflect:!0})],yt.prototype,"disabled",null);Rt([N({type:Boolean,reflect:!0})],yt.prototype,"invalid",void 0);Rt([N()],yt.prototype,"filter",null);Rt([N({type:Boolean,reflect:!0})],yt.prototype,"focused",void 0);Rt([N({type:Boolean,reflect:!0})],yt.prototype,"open",void 0);Rt([N({type:Array})],yt.prototype,"options",null);Rt([N({reflect:!0})],yt.prototype,"position",void 0);Rt([hn({flatten:!0,selector:"vscode-option"})],yt.prototype,"_assignedOptions",void 0);Rt([bn(".dropdown",!0)],yt.prototype,"_dropdownEl",void 0);Rt([Te()],yt.prototype,"_currentDescription",void 0);Rt([Te()],yt.prototype,"_filter",void 0);Rt([Te()],yt.prototype,"_filteredOptions",null);Rt([Te()],yt.prototype,"_selectedIndexes",void 0);Rt([Te()],yt.prototype,"_options",void 0);Rt([Te()],yt.prototype,"_value",void 0);Rt([Te()],yt.prototype,"_values",void 0);Rt([Te()],yt.prototype,"_isPlaceholderOptionActive",void 0);Rt([Te()],yt.prototype,"_isBeingFiltered",void 0);Rt([Te()],yt.prototype,"_optionListScrollPos",void 0);const Jv=[Be,Me`
    :host {
      display: inline-block;
      max-width: 100%;
      outline: none;
      position: relative;
      width: 320px;
    }

    .main-slot {
      display: none;
    }

    .select-face,
    .combobox-face {
      background-color: var(--vscode-settings-dropdownBackground, #313131);
      border-color: var(--vscode-settings-dropdownBorder, #3c3c3c);
      border-radius: 4px;
      border-style: solid;
      border-width: 1px;
      box-sizing: border-box;
      color: var(--vscode-settings-dropdownForeground, #cccccc);
      font-family: var(--vscode-font-family, sans-serif);
      font-size: var(--vscode-font-size, 13px);
      font-weight: var(--vscode-font-weight, normal);
      line-height: 18px;
      position: relative;
      user-select: none;
      width: 100%;
    }

    :host([invalid]) .select-face,
    :host(:invalid) .select-face,
    :host([invalid]) .combobox-face,
    :host(:invalid) .combobox-face {
      background-color: var(--vscode-inputValidation-errorBackground, #5a1d1d);
      border-color: var(--vscode-inputValidation-errorBorder, #be1100);
    }

    .select-face {
      cursor: pointer;
      display: block;
      padding: 3px 4px;
    }

    .select-face .text {
      display: block;
      height: 18px;
      overflow: hidden;
      padding-right: 20px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .select-face.multiselect {
      padding: 0;
    }

    .select-face-badge {
      background-color: var(--vscode-badge-background, #616161);
      border-radius: 2px;
      color: var(--vscode-badge-foreground, #f8f8f8);
      display: inline-block;
      flex-shrink: 0;
      font-size: 11px;
      line-height: 16px;
      margin: 2px;
      padding: 2px 3px;
      white-space: nowrap;
    }

    .select-face-badge.no-item {
      background-color: transparent;
      color: inherit;
    }

    .combobox-face {
      display: flex;
    }

    :host(:focus) .select-face,
    :host(:focus) .combobox-face,
    :host([focused]) .select-face,
    :host([focused]) .combobox-face {
      outline: none;
    }

    :host(:focus:not([open])) .select-face,
    :host(:focus:not([open])) .combobox-face,
    :host([focused]:not([open])) .select-face,
    :host([focused]:not([open])) .combobox-face {
      border-color: var(--vscode-focusBorder, #0078d4);
    }

    .combobox-input {
      background-color: transparent;
      box-sizing: border-box;
      border: 0;
      color: var(--vscode-foreground, #cccccc);
      display: block;
      font-family: var(--vscode-font-family, sans-serif);
      font-size: var(--vscode-font-size, 13px);
      line-height: 16px;
      padding: 4px;
      width: 100%;
    }

    .combobox-input:focus {
      outline: none;
    }

    .combobox-button {
      align-items: center;
      background-color: transparent;
      border: 0;
      border-radius: 2px;
      box-sizing: content-box;
      color: var(--vscode-foreground, #cccccc);
      cursor: pointer;
      display: flex;
      flex-shrink: 0;
      height: 16px;
      justify-content: center;
      margin: 1px 1px 0 0;
      padding: 3px;
      width: 22px;
    }

    .combobox-button:hover,
    .combobox-button:focus-visible {
      background-color: var(
        --vscode-toolbar-hoverBackground,
        rgba(90, 93, 94, 0.31)
      );
      outline-style: dashed;
      outline-color: var(--vscode-toolbar-hoverOutline, transparent);
    }

    .combobox-button:focus-visible {
      outline: none;
    }

    .icon {
      color: var(--vscode-foreground, #cccccc);
      display: block;
      height: 14px;
      pointer-events: none;
      width: 14px;
    }

    .select-face .icon {
      position: absolute;
      right: 6px;
      top: 5px;
    }

    .icon svg {
      color: var(--vscode-foreground, #cccccc);
      height: 100%;
      width: 100%;
    }

    .dropdown {
      background-color: var(--vscode-settings-dropdownBackground, #313131);
      border-color: var(--vscode-settings-dropdownListBorder, #454545);
      border-radius: 4px;
      border-style: solid;
      border-width: 1px;
      bottom: unset;
      box-shadow: 0 2px 8px var(--vscode-widget-shadow, rgba(0, 0, 0, 0.36));
      box-sizing: border-box;
      display: none;
      padding: 0;
      right: unset;
    }

    .dropdown.open {
      display: block;
    }

    :host([position='above']) .dropdown {
      bottom: 26px;
      padding-bottom: 0;
      padding-top: 2px;
      top: unset;
    }

    .scrollable {
      display: block;
      max-height: 222px;
      margin: 0;
      outline: none;
      overflow: hidden;
    }

    .options {
      box-sizing: border-box;
      cursor: pointer;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .option {
      box-sizing: border-box;
      color: var(--vscode-foreground, #cccccc);
      cursor: pointer;
      font-family: var(--vscode-font-family, sans-serif);
      font-size: var(--vscode-font-size, 13px);
      font-weight: var(--vscode-font-weight, normal);
      height: 22px;
      line-height: 20px;
      min-height: calc(var(--vscode-font-size) * 1.3);
      padding: 1px 3px;
      user-select: none;
      outline-color: transparent;
      outline-offset: -1px;
      outline-style: solid;
      outline-width: 1px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .option.single-select {
      display: block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .option.multi-select {
      align-items: center;
      display: flex;
    }

    .option b {
      color: var(--vscode-list-highlightForeground, #2aaaff);
    }

    .option.active b {
      color: var(--vscode-list-focusHighlightForeground, #2aaaff);
    }

    .option:not(.disabled):hover {
      background-color: var(--vscode-list-hoverBackground, #2a2d2e);
      color: var(--vscode-list-hoverForeground, #ffffff);
    }

    :host-context(body[data-vscode-theme-kind='vscode-high-contrast'])
      .option:hover,
    :host-context(body[data-vscode-theme-kind='vscode-high-contrast-light'])
      .option:hover {
      outline-style: dotted;
      outline-color: var(--vscode-list-focusOutline, #0078d4);
      outline-width: 1px;
    }

    .option.disabled {
      cursor: not-allowed;
      opacity: 0.4;
    }

    .option.active,
    .option.active:hover {
      background-color: var(--vscode-list-activeSelectionBackground, #04395e);
      color: var(--vscode-list-activeSelectionForeground, #ffffff);
      outline-color: var(--vscode-list-activeSelectionBackground, #04395e);
      outline-style: solid;
      outline-width: 1px;
    }

    .no-options {
      align-items: center;
      border-color: transparent;
      border-style: solid;
      border-width: 1px;
      color: var(--vscode-foreground, #cccccc);
      cursor: default;
      display: flex;
      font-family: var(--vscode-font-family, sans-serif);
      font-size: var(--vscode-font-size, 13px);
      font-weight: var(--vscode-font-weight, normal);
      line-height: 18px;
      min-height: calc(var(--vscode-font-size) * 1.3);
      opacity: 0.85;
      padding: 1px 3px;
      user-select: none;
    }

    .placeholder {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .placeholder span {
      font-weight: bold;
    }

    .placeholder:not(.disabled):hover {
      color: var(--vscode-list-activeSelectionForeground, #ffffff);
    }

    :host-context(body[data-vscode-theme-kind='vscode-high-contrast'])
      .option.active,
    :host-context(body[data-vscode-theme-kind='vscode-high-contrast-light'])
      .option.active:hover {
      outline-color: var(--vscode-list-focusOutline, #0078d4);
      outline-style: dashed;
    }

    .option-label {
      display: block;
      overflow: hidden;
      pointer-events: none;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
    }

    .dropdown.multiple .option.selected {
      background-color: var(--vscode-list-hoverBackground, #2a2d2e);
      outline-color: var(--vscode-list-hoverBackground, #2a2d2e);
    }

    .dropdown.multiple .option.selected.active {
      background-color: var(--vscode-list-activeSelectionBackground, #04395e);
      color: var(--vscode-list-activeSelectionForeground, #ffffff);
      outline-color: var(--vscode-list-activeSelectionBackground, #04395e);
    }

    .checkbox-icon {
      align-items: center;
      background-color: var(--vscode-checkbox-background, #313131);
      border-radius: 2px;
      border: 1px solid var(--vscode-checkbox-border);
      box-sizing: border-box;
      color: var(--vscode-checkbox-foreground);
      display: flex;
      flex-basis: 15px;
      flex-shrink: 0;
      height: 15px;
      justify-content: center;
      margin-right: 5px;
      overflow: hidden;
      position: relative;
      width: 15px;
    }

    .checkbox-icon svg {
      display: none;
      height: 13px;
      width: 13px;
    }

    .checkbox-icon.checked svg {
      display: block;
    }

    .dropdown-controls {
      display: flex;
      justify-content: flex-end;
      padding: 4px;
    }

    .dropdown-controls :not(:last-child) {
      margin-right: 4px;
    }

    .action-icon {
      align-items: center;
      background-color: transparent;
      border: 0;
      color: var(--vscode-foreground, #cccccc);
      cursor: pointer;
      display: flex;
      height: 24px;
      justify-content: center;
      padding: 0;
      width: 24px;
    }

    .action-icon:focus {
      outline: none;
    }

    .action-icon:focus-visible {
      outline: 1px solid var(--vscode-focusBorder, #0078d4);
      outline-offset: -1px;
    }

    .description {
      border-color: var(--vscode-settings-dropdownBorder, #3c3c3c);
      border-style: solid;
      border-width: 1px 0 0;
      color: var(--vscode-foreground, #cccccc);
      font-family: var(--vscode-font-family, sans-serif);
      font-size: var(--vscode-font-size, 13px);
      font-weight: var(--vscode-font-weight, normal);
      line-height: 1.3;
      padding: 6px 4px;
      word-wrap: break-word;
    }

    :host([position='above']) .description {
      border-width: 0 0 1px;
    }
  `];var oa=function(o,n,s,l){var r=arguments.length,c=r<3?n:l===null?l=Object.getOwnPropertyDescriptor(n,s):l,f;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(o,n,s,l);else for(var p=o.length-1;p>=0;p--)(f=o[p])&&(c=(r<3?f(c):r>3?f(n,s,c):f(n,s))||c);return r>3&&c&&Object.defineProperty(n,s,c),c};let ai=class extends yt{set selectedIndexes(n){this._opts.selectedIndexes=n}get selectedIndexes(){return this._opts.selectedIndexes}set value(n){this._opts.multiSelectValue=n,this._opts.selectedIndexes.length>0?this._requestedValueToSetLater=[]:this._requestedValueToSetLater=Array.isArray(n)?n:[n],this._setFormValue(),this._manageRequired()}get value(){return this._opts.multiSelectValue}get form(){return this._internals.form}get type(){return"select-multiple"}get validity(){return this._internals.validity}get validationMessage(){return this._internals.validationMessage}get willValidate(){return this._internals.willValidate}checkValidity(){return this._internals.checkValidity()}reportValidity(){return this._internals.reportValidity()}selectAll(){this._opts.selectAll()}selectNone(){this._opts.selectNone()}constructor(){super(),this.defaultValue=[],this.required=!1,this.name=void 0,this._requestedValueToSetLater=[],this._onOptionClick=n=>{const l=n.composedPath().find(f=>"matches"in f?f.matches("li.option"):!1);if(!l)return;if(l.classList.contains("placeholder")){this._createAndSelectSuggestedOption();return}const c=Number(l.dataset.index);this._opts.toggleOptionSelected(c),this._setFormValue(),this._manageRequired(),this._dispatchChangeEvent()},this._opts.multiSelect=!0,this._internals=this.attachInternals()}connectedCallback(){super.connectedCallback(),this.updateComplete.then(()=>{this._setDefaultValue(),this._manageRequired()})}formResetCallback(){this.updateComplete.then(()=>{this.value=this.defaultValue})}formStateRestoreCallback(n,s){const l=Array.from(n.entries()).map(r=>String(r[1]));this.updateComplete.then(()=>{this.value=l})}_setDefaultValue(){if(Array.isArray(this.defaultValue)&&this.defaultValue.length>0){const n=this.defaultValue.map(s=>String(s));this.value=n}}_dispatchChangeEvent(){super._dispatchChangeEvent()}_onFaceClick(){super._onFaceClick(),this._opts.activeIndex=0}_toggleComboboxDropdown(){super._toggleComboboxDropdown(),this._opts.activeIndex=-1}_manageRequired(){const{value:n}=this;n.length===0&&this.required?this._internals.setValidity({valueMissing:!0},"Please select an item in the list.",this._faceElement):this._internals.setValidity({})}_setFormValue(){const n=new FormData;this._values.forEach(s=>{n.append(this.name??"",s)}),this._internals.setFormValue(n)}async _createAndSelectSuggestedOption(){super._createAndSelectSuggestedOption();const n=this._createSuggestedOption();await this.updateComplete,this.selectedIndexes=[...this.selectedIndexes,n],this._dispatchChangeEvent();const s=new CustomEvent("vsc-multi-select-create-option",{detail:{value:this._opts.getOptionByIndex(n)?.value??""}});this.dispatchEvent(s),this.open=!1,this._isPlaceholderOptionActive=!1}_onSlotChange(){super._onSlotChange(),this._requestedValueToSetLater.length>0&&(this._opts.expandMultiSelection(this._requestedValueToSetLater),this._requestedValueToSetLater=this._requestedValueToSetLater.filter(n=>this._opts.findOptionIndex(n)===-1))}_onEnterKeyDown(n){super._onEnterKeyDown(n),this.open?this._isPlaceholderOptionActive?this._createAndSelectSuggestedOption():(this._opts.toggleActiveMultiselectOption(),this._setFormValue(),this._manageRequired(),this._dispatchChangeEvent()):(this._opts.filterPattern="",this.open=!0)}_onMultiAcceptClick(){this.open=!1}_onMultiDeselectAllClick(){this._opts.selectedIndexes=[],this._values=[],this._options=this._options.map(n=>({...n,selected:!1})),this._manageRequired(),this._dispatchChangeEvent()}_onMultiSelectAllClick(){this._opts.selectedIndexes=[],this._values=[],this._options=this._options.map(n=>({...n,selected:!0})),this._options.forEach((n,s)=>{this._selectedIndexes.push(s),this._values.push(n.value),this._dispatchChangeEvent()}),this._setFormValue(),this._manageRequired()}_onComboboxInputBlur(){super._onComboboxInputBlur(),this._opts.filterPattern=""}_renderLabel(){return this._opts.selectedIndexes.length===0?te`<span class="select-face-badge no-item">0 Selected</span>`:te`<span class="select-face-badge"
          >${this._opts.selectedIndexes.length} Selected</span
        >`}_renderComboboxFace(){const n=this._opts.activeIndex>-1?`op-${this._opts.activeIndex}`:"",s=this.open?"true":"false";return te`
      <div class="combobox-face face">
        ${this._opts.multiSelect?this._renderLabel():Ce}
        <input
          aria-activedescendant=${n}
          aria-autocomplete="list"
          aria-controls="select-listbox"
          aria-expanded=${s}
          aria-haspopup="listbox"
          aria-label=${Ge(this.label)}
          class="combobox-input"
          role="combobox"
          spellcheck="false"
          type="text"
          autocomplete="off"
          .value=${this._opts.filterPattern}
          @focus=${this._onComboboxInputFocus}
          @blur=${this._onComboboxInputBlur}
          @input=${this._onComboboxInputInput}
          @click=${this._onComboboxInputClick}
          @keydown=${this._onComboboxInputSpaceKeyDown}
        />
        <button
          aria-label="Open the list of options"
          class="combobox-button"
          type="button"
          @click=${this._onComboboxButtonClick}
          @keydown=${this._onComboboxButtonKeyDown}
          tabindex="-1"
        >
          ${ac}
        </button>
      </div>
    `}_renderSelectFace(){const n=this._opts.activeIndex>-1?`op-${this._opts.activeIndex}`:"",s=this.open?"true":"false";return te`
      <div
        aria-activedescendant=${Ge(this._opts.multiSelect?void 0:n)}
        aria-controls="select-listbox"
        aria-expanded=${Ge(this._opts.multiSelect?void 0:s)}
        aria-haspopup="listbox"
        aria-label=${Ge(this.label??void 0)}
        class="select-face face multiselect"
        @click=${this._onFaceClick}
        .tabIndex=${this.disabled?-1:0}
      >
        ${this._renderLabel()} ${ac}
      </div>
    `}_renderDropdownControls(){return this._filteredOptions.length>0?te`
          <div class="dropdown-controls">
            <button
              type="button"
              @click=${this._onMultiSelectAllClick}
              title="Select all"
              class="action-icon"
              id="select-all"
            >
              <vscode-icon name="checklist"></vscode-icon>
            </button>
            <button
              type="button"
              @click=${this._onMultiDeselectAllClick}
              title="Deselect all"
              class="action-icon"
              id="select-none"
            >
              <vscode-icon name="clear-all"></vscode-icon>
            </button>
            <vscode-button
              class="button-accept"
              @click=${this._onMultiAcceptClick}
              >OK</vscode-button
            >
          </div>
        `:te`${Ce}`}render(){return te`
      <div class="multi-select">
        <slot class="main-slot" @slotchange=${this._onSlotChange}></slot>
        ${this.combobox?this._renderComboboxFace():this._renderSelectFace()}
        ${this._renderDropdown()}
      </div>
    `}};ai.styles=Jv;ai.shadowRootOptions={...gi.shadowRootOptions,delegatesFocus:!0};ai.formAssociated=!0;oa([N({type:Array,attribute:"default-value"})],ai.prototype,"defaultValue",void 0);oa([N({type:Boolean,reflect:!0})],ai.prototype,"required",void 0);oa([N({reflect:!0})],ai.prototype,"name",void 0);oa([N({type:Array,attribute:!1})],ai.prototype,"selectedIndexes",null);oa([N({type:Array})],ai.prototype,"value",null);oa([bn(".face")],ai.prototype,"_faceElement",void 0);ai=oa([ze("vscode-multi-select")],ai);De({tagName:"vscode-multi-select",elementClass:ai,react:F,displayName:"VscodeMultiSelect",events:{onChange:"change",onInvalid:"invalid",onVscMultiSelectCreateOption:"vsc-multi-select-create-option"}});De({tagName:"vscode-option",elementClass:As,react:F,displayName:"VscodeOption"});const Ow=[Be,Me`
    :host {
      display: block;
      height: 2px;
      width: 100%;
      outline: none;
    }

    .container {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    .track {
      position: absolute;
      inset: 0;
      background: transparent;
    }

    .indicator {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      height: 100%;
      background: var(--vscode-progressBar-background, #0078d4);
      will-change: transform, width, left;
    }

    
    .discrete .indicator {
      transition: width 100ms linear;
    }

    
    .infinite .indicator {
      width: 2%;
      animation-name: progress;
      animation-duration: 4s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
      transform: translate3d(0px, 0px, 0px);
    }

    
    .infinite.infinite-long-running .indicator {
      animation-timing-function: steps(100);
    }

    
    @keyframes progress {
      from {
        transform: translateX(0%) scaleX(1);
      }
      50% {
        transform: translateX(2500%) scaleX(3);
      }
      to {
        transform: translateX(4900%) scaleX(1);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .discrete .indicator {
        transition: none;
      }
      .infinite .indicator,
      .infinite-long-running .indicator {
        animation: none;
        width: 100%;
      }
    }
  `];var ra=function(o,n,s,l){var r=arguments.length,c=r<3?n:l===null?l=Object.getOwnPropertyDescriptor(n,s):l,f;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(o,n,s,l);else for(var p=o.length-1;p>=0;p--)(f=o[p])&&(c=(r<3?f(c):r>3?f(n,s,c):f(n,s))||c);return r>3&&c&&Object.defineProperty(n,s,c),c};let Ai=class extends Ie{constructor(){super(...arguments),this.ariaLabel="Loading",this.max=100,this.indeterminate=!1,this.longRunningThreshold=15e3,this._longRunning=!1}get _isDeterminate(){return!this.indeterminate&&typeof this.value=="number"&&isFinite(this.value)}connectedCallback(){super.connectedCallback(),this._maybeStartLongRunningTimer()}disconnectedCallback(){super.disconnectedCallback(),this._clearLongRunningTimer()}willUpdate(){this._maybeStartLongRunningTimer()}render(){const n=this.max>0?this.max:100,s=this._isDeterminate?Math.min(Math.max(this.value??0,0),n):0,l=this._isDeterminate?s/n*100:0,r={container:!0,discrete:this._isDeterminate,infinite:!this._isDeterminate,"infinite-long-running":this._longRunning&&!this._isDeterminate};return te`
      <div
        class=${Ye(r)}
        part="container"
        role="progressbar"
        aria-label=${this.ariaLabel}
        aria-valuemin="0"
        aria-valuemax=${String(n)}
        aria-valuenow=${Ge(this._isDeterminate?String(Math.round(s)):void 0)}
      >
        <div class="track" part="track"></div>
        <div
          class="indicator"
          part="indicator"
          .style=${Cn({width:this._isDeterminate?`${l}%`:void 0})}
        ></div>
      </div>
    `}_maybeStartLongRunningTimer(){if(!(!this._isDeterminate&&this.longRunningThreshold>0&&this.isConnected)){this._clearLongRunningTimer(),this._longRunning=!1;return}this._longRunningHandle||(this._longRunningHandle=setTimeout(()=>{this._longRunning=!0,this._longRunningHandle=void 0,this.requestUpdate()},this.longRunningThreshold))}_clearLongRunningTimer(){this._longRunningHandle&&(clearTimeout(this._longRunningHandle),this._longRunningHandle=void 0)}};Ai.styles=Ow;ra([N({reflect:!0,attribute:"aria-label"})],Ai.prototype,"ariaLabel",void 0);ra([N({type:Number,reflect:!0})],Ai.prototype,"value",void 0);ra([N({type:Number,reflect:!0})],Ai.prototype,"max",void 0);ra([N({type:Boolean,reflect:!0})],Ai.prototype,"indeterminate",void 0);ra([N({type:Number,attribute:"long-running-threshold"})],Ai.prototype,"longRunningThreshold",void 0);ra([Te()],Ai.prototype,"_longRunning",void 0);Ai=ra([ze("vscode-progress-bar")],Ai);De({tagName:"vscode-progress-bar",elementClass:Ai,react:F,displayName:"VscodeProgressBar"});const Rw=[Be,Me`
    :host {
      display: block;
      height: 28px;
      margin: 0;
      outline: none;
      width: 28px;
    }

    .progress {
      height: 100%;
      width: 100%;
    }

    .background {
      fill: none;
      stroke: transparent;
      stroke-width: 2px;
    }

    .indeterminate-indicator-1 {
      fill: none;
      stroke: var(--vscode-progressBar-background, #0078d4);
      stroke-width: 2px;
      stroke-linecap: square;
      transform-origin: 50% 50%;
      transform: rotate(-90deg);
      transition: all 0.2s ease-in-out;
      animation: spin-infinite 2s linear infinite;
    }

    @keyframes spin-infinite {
      0% {
        stroke-dasharray: 0.01px 43.97px;
        transform: rotate(0deg);
      }
      50% {
        stroke-dasharray: 21.99px 21.99px;
        transform: rotate(450deg);
      }
      100% {
        stroke-dasharray: 0.01px 43.97px;
        transform: rotate(1080deg);
      }
    }
  `];var fc=function(o,n,s,l){var r=arguments.length,c=r<3?n:l===null?l=Object.getOwnPropertyDescriptor(n,s):l,f;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(o,n,s,l);else for(var p=o.length-1;p>=0;p--)(f=o[p])&&(c=(r<3?f(c):r>3?f(n,s,c):f(n,s))||c);return r>3&&c&&Object.defineProperty(n,s,c),c};let ia=class extends Ie{constructor(){super(...arguments),this.ariaLabel="Loading",this.ariaLive="assertive",this.role="alert"}render(){return te`<svg class="progress" part="progress" viewBox="0 0 16 16">
      <circle
        class="background"
        part="background"
        cx="8px"
        cy="8px"
        r="7px"
      ></circle>
      <circle
        class="indeterminate-indicator-1"
        part="indeterminate-indicator-1"
        cx="8px"
        cy="8px"
        r="7px"
      ></circle>
    </svg>`}};ia.styles=Rw;fc([N({reflect:!0,attribute:"aria-label"})],ia.prototype,"ariaLabel",void 0);fc([N({reflect:!0,attribute:"aria-live"})],ia.prototype,"ariaLive",void 0);fc([N({reflect:!0})],ia.prototype,"role",void 0);ia=fc([ze("vscode-progress-ring")],ia);De({tagName:"vscode-progress-ring",elementClass:ia,react:F,displayName:"VscodeProgressRing"});const Dw=[Be,Pv,Me`
    :host(:invalid) .icon,
    :host([invalid]) .icon {
      background-color: var(--vscode-inputValidation-errorBackground, #5a1d1d);
      border-color: var(--vscode-inputValidation-errorBorder, #be1100);
    }

    .icon {
      border-radius: 9px;
    }

    .icon.checked:before {
      background-color: currentColor;
      border-radius: 4px;
      content: '';
      height: 8px;
      left: 50%;
      margin: -4px 0 0 -4px;
      position: absolute;
      top: 50%;
      width: 8px;
    }

    :host(:focus):host(:not([disabled])) .icon {
      outline: 1px solid var(--vscode-focusBorder, #0078d4);
      outline-offset: -1px;
    }
  `];var Un=function(o,n,s,l){var r=arguments.length,c=r<3?n:l===null?l=Object.getOwnPropertyDescriptor(n,s):l,f;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(o,n,s,l);else for(var p=o.length-1;p>=0;p--)(f=o[p])&&(c=(r<3?f(c):r>3?f(n,s,c):f(n,s))||c);return r>3&&c&&Object.defineProperty(n,s,c),c};let en=class extends qv(fh){get form(){return this._internals.form}get validity(){return this._internals.validity}get validationMessage(){return this._internals.validationMessage}get willValidate(){return this._internals.willValidate}constructor(){super(),this.autofocus=!1,this.checked=!1,this.defaultChecked=!1,this.invalid=!1,this.name="",this.type="radio",this.value="",this.disabled=!1,this.required=!1,this.tabIndex=0,this._slottedText="",this._handleClick=()=>{this.disabled||this.checked||(this._checkButton(),this._handleValueChange(),this.dispatchEvent(new Event("change",{bubbles:!0})))},this._handleKeyDown=n=>{!this.disabled&&(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),n.key===" "&&!this.checked&&(this.checked=!0,this._handleValueChange(),this.dispatchEvent(new Event("change",{bubbles:!0}))),n.key==="Enter"&&this._internals.form?.requestSubmit())},this._internals=this.attachInternals(),this.addEventListener("keydown",this._handleKeyDown),this.addEventListener("click",this._handleClick)}connectedCallback(){super.connectedCallback(),this._handleValueChange()}update(n){super.update(n),n.has("checked")&&this._handleValueChange(),n.has("required")&&this._handleValueChange()}checkValidity(){return this._internals.checkValidity()}reportValidity(){return this._internals.reportValidity()}formResetCallback(){this._getRadios().forEach(s=>{s.checked=s.defaultChecked}),this.updateComplete.then(()=>{this._handleValueChange()})}formStateRestoreCallback(n,s){this.value===n&&n!==""&&(this.checked=!0)}setComponentValidity(n){n?this._internals.setValidity({}):this._internals.setValidity({valueMissing:!0},"Please select one of these options.",this._inputEl)}_getRadios(){const n=this.getRootNode({composed:!1});if(!n)return[];const s=n.querySelectorAll(`vscode-radio[name="${this.name}"]`);return Array.from(s)}_uncheckOthers(n){n.forEach(s=>{s!==this&&(s.checked=!1)})}_checkButton(){const n=this._getRadios();this.checked=!0,n.forEach(s=>{s!==this&&(s.checked=!1)})}_setGroupValidity(n,s){this.updateComplete.then(()=>{n.forEach(l=>{l.setComponentValidity(s)})})}_setActualFormValue(){let n="";this.checked?n=this.value?this.value:"on":n=null,this._internals.setFormValue(n)}_handleValueChange(){const n=this._getRadios(),s=n.some(l=>l.required);if(this._setActualFormValue(),this.checked)this._uncheckOthers(n),this._setGroupValidity(n,!0);else{const l=!!n.find(c=>c.checked),r=s&&!l;this._setGroupValidity(n,!r)}}render(){const n=Ye({icon:!0,checked:this.checked}),s=Ye({"label-inner":!0,"is-slot-empty":this._slottedText===""});return te`
      <div class="wrapper">
        <input
          ?autofocus=${this.autofocus}
          id="input"
          class="radio"
          type="checkbox"
          ?checked=${this.checked}
          value=${this.value}
          tabindex=${this.tabIndex}
        />
        <div class=${n}></div>
        <label for="input" class="label" @click=${this._handleClick}>
          <span class=${s}>
            ${this._renderLabelAttribute()}
            <slot @slotchange=${this._handleSlotChange}></slot>
          </span>
        </label>
      </div>
    `}};en.styles=Dw;en.formAssociated=!0;en.shadowRootOptions={...gi.shadowRootOptions,delegatesFocus:!0};Un([N({type:Boolean,reflect:!0})],en.prototype,"autofocus",void 0);Un([N({type:Boolean,reflect:!0})],en.prototype,"checked",void 0);Un([N({type:Boolean,reflect:!0,attribute:"default-checked"})],en.prototype,"defaultChecked",void 0);Un([N({type:Boolean,reflect:!0})],en.prototype,"invalid",void 0);Un([N({reflect:!0})],en.prototype,"name",void 0);Un([N()],en.prototype,"type",void 0);Un([N()],en.prototype,"value",void 0);Un([N({type:Boolean,reflect:!0})],en.prototype,"disabled",void 0);Un([N({type:Boolean,reflect:!0})],en.prototype,"required",void 0);Un([N({type:Number,reflect:!0})],en.prototype,"tabIndex",void 0);Un([Te()],en.prototype,"_slottedText",void 0);Un([bn("#input")],en.prototype,"_inputEl",void 0);en=Un([ze("vscode-radio")],en);De({tagName:"vscode-radio",elementClass:en,react:F,displayName:"VscodeRadio",events:{onChange:"change",onInvalid:"invalid"}});const Mw=[Be,Me`
    :host {
      display: block;
    }

    .wrapper {
      display: flex;
      flex-wrap: wrap;
    }

    :host([variant='vertical']) .wrapper {
      display: block;
    }

    ::slotted(vscode-radio) {
      margin-right: 20px;
    }

    ::slotted(vscode-radio:last-child) {
      margin-right: 0;
    }

    :host([variant='vertical']) ::slotted(vscode-radio) {
      display: block;
      margin-bottom: 15px;
    }

    :host([variant='vertical']) ::slotted(vscode-radio:last-child) {
      margin-bottom: 0;
    }
  `];var nl=function(o,n,s,l){var r=arguments.length,c=r<3?n:l===null?l=Object.getOwnPropertyDescriptor(n,s):l,f;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(o,n,s,l);else for(var p=o.length-1;p>=0;p--)(f=o[p])&&(c=(r<3?f(c):r>3?f(n,s,c):f(n,s))||c);return r>3&&c&&Object.defineProperty(n,s,c),c};let Wi=class extends Ie{constructor(){super(),this.variant="horizontal",this.role="radiogroup",this._focusedRadio=-1,this._checkedRadio=-1,this._firstContentLoaded=!1,this._handleKeyDown=n=>{const{key:s}=n;["ArrowLeft","ArrowUp","ArrowRight","ArrowDown"].includes(s)&&n.preventDefault(),(s==="ArrowRight"||s==="ArrowDown")&&this._checkNext(),(s==="ArrowLeft"||s==="ArrowUp")&&this._checkPrev()},this.addEventListener("keydown",this._handleKeyDown)}_uncheckPreviousChecked(n,s){n!==-1&&(this._radios[n].checked=!1),s!==-1&&(this._radios[s].tabIndex=-1)}_afterCheck(){this._focusedRadio=this._checkedRadio,this._radios[this._checkedRadio].checked=!0,this._radios[this._checkedRadio].tabIndex=0,this._radios[this._checkedRadio].focus()}_checkPrev(){const n=this._radios.findIndex(r=>r.checked),s=this._radios.findIndex(r=>r.focused),l=s!==-1?s:n;this._uncheckPreviousChecked(n,s),l===-1?this._checkedRadio=this._radios.length-1:l-1>=0?this._checkedRadio=l-1:this._checkedRadio=this._radios.length-1,this._afterCheck()}_checkNext(){const n=this._radios.findIndex(r=>r.checked),s=this._radios.findIndex(r=>r.focused),l=s!==-1?s:n;this._uncheckPreviousChecked(n,s),l===-1?this._checkedRadio=0:l+1<this._radios.length?this._checkedRadio=l+1:this._checkedRadio=0,this._afterCheck()}_handleChange(n){const s=this._radios.findIndex(l=>l===n.target);s!==-1&&(this._focusedRadio!==-1&&(this._radios[this._focusedRadio].tabIndex=-1),this._checkedRadio!==-1&&this._checkedRadio!==s&&(this._radios[this._checkedRadio].checked=!1),this._focusedRadio=s,this._checkedRadio=s,this._radios[s].tabIndex=0)}_handleSlotChange(){if(!this._firstContentLoaded){const s=this._radios.findIndex(l=>l.autofocus);s>-1&&(this._focusedRadio=s),this._firstContentLoaded=!0}let n=-1;this._radios.forEach((s,l)=>{this._focusedRadio>-1?s.tabIndex=l===this._focusedRadio?0:-1:s.tabIndex=l===0?0:-1,s.defaultChecked&&(n>-1&&(this._radios[n].defaultChecked=!1),n=l)}),n>-1&&(this._radios[n].checked=!0)}render(){return te`
      <div class="wrapper">
        <slot
          @slotchange=${this._handleSlotChange}
          @change=${this._handleChange}
        ></slot>
      </div>
    `}};Wi.styles=Mw;nl([N({reflect:!0})],Wi.prototype,"variant",void 0);nl([N({reflect:!0})],Wi.prototype,"role",void 0);nl([hn({selector:"vscode-radio"})],Wi.prototype,"_radios",void 0);nl([Te()],Wi.prototype,"_focusedRadio",void 0);nl([Te()],Wi.prototype,"_checkedRadio",void 0);Wi=nl([ze("vscode-radio-group")],Wi);De({tagName:"vscode-radio-group",elementClass:Wi,react:F,displayName:"VscodeRadioGroup",events:{onChange:"change"}});De({tagName:"vscode-scrollable",elementClass:Ht,react:F,displayName:"VscodeScrollable"});var ca=function(o,n,s,l){var r=arguments.length,c=r<3?n:l===null?l=Object.getOwnPropertyDescriptor(n,s):l,f;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(o,n,s,l);else for(var p=o.length-1;p>=0;p--)(f=o[p])&&(c=(r<3?f(c):r>3?f(n,s,c):f(n,s))||c);return r>3&&c&&Object.defineProperty(n,s,c),c};let li=class extends yt{set selectedIndex(n){this._opts.selectedIndex=n;const s=this._opts.getOptionByIndex(n);s?(this._opts.activeIndex=n,this._value=s.value,this._internals.setFormValue(this._value),this._manageRequired()):(this._value="",this._internals.setFormValue(""),this._manageRequired())}get selectedIndex(){return this._opts.selectedIndex}set value(n){this._opts.value=n,this._opts.selectedIndex>-1?this._requestedValueToSetLater="":this._requestedValueToSetLater=n,this._internals.setFormValue(this._value),this._manageRequired()}get value(){return this._opts.value}get validity(){return this._internals.validity}get validationMessage(){return this._internals.validationMessage}get willValidate(){return this._internals.willValidate}checkValidity(){return this._internals.checkValidity()}reportValidity(){return this._internals.reportValidity()}updateInputValue(){if(!this.combobox)return;const n=this.renderRoot.querySelector(".combobox-input");if(n){const s=this._opts.getSelectedOption();n.value=s?.label??""}}constructor(){super(),this.defaultValue="",this.name=void 0,this.required=!1,this._requestedValueToSetLater="",this._opts.multiSelect=!1,this._internals=this.attachInternals()}connectedCallback(){super.connectedCallback(),this.updateComplete.then(()=>{this._manageRequired()})}formResetCallback(){this.value=this.defaultValue}formStateRestoreCallback(n,s){this.updateComplete.then(()=>{this.value=n})}get type(){return"select-one"}get form(){return this._internals.form}async _createAndSelectSuggestedOption(){const n=this._createSuggestedOption();await this.updateComplete,this._opts.selectedIndex=n,this._dispatchChangeEvent();const s=new CustomEvent("vsc-single-select-create-option",{detail:{value:this._opts.getOptionByIndex(n)?.value??""}});this.dispatchEvent(s),this.open=!1,this._isPlaceholderOptionActive=!1}_setStateFromSlottedElements(){super._setStateFromSlottedElements(),!this.combobox&&this._opts.selectedIndexes.length===0&&(this._opts.selectedIndex=this._opts.options.length>0?0:-1)}_onSlotChange(){if(super._onSlotChange(),this._requestedValueToSetLater){const n=this._opts.getOptionByValue(this._requestedValueToSetLater);n&&(this._opts.selectedIndex=n.index,this._requestedValueToSetLater="")}this._opts.selectedIndex>-1&&this._opts.numOptions>0?(this._internals.setFormValue(this._opts.value),this._manageRequired()):(this._internals.setFormValue(null),this._manageRequired())}_onEnterKeyDown(n){super._onEnterKeyDown(n);let s=!1;this.combobox?this.open?this._isPlaceholderOptionActive?this._createAndSelectSuggestedOption():(s=this._opts.activeIndex!==this._opts.selectedIndex,this._opts.selectedIndex=this._opts.activeIndex,this.open=!1):(this.open=!0,this._scrollActiveElementToTop()):this.open?(s=this._opts.activeIndex!==this._opts.selectedIndex,this._opts.selectedIndex=this._opts.activeIndex,this.open=!1):(this.open=!0,this._scrollActiveElementToTop()),s&&(this._dispatchChangeEvent(),this.updateInputValue(),this._internals.setFormValue(this._opts.value),this._manageRequired())}_onOptionClick(n){super._onOptionClick(n);const l=n.composedPath().find(c=>{const f=c;if("matches"in f)return f.matches("li.option")});if(!l||l.matches(".disabled"))return;l.classList.contains("placeholder")?this.creatable&&this._createAndSelectSuggestedOption():(this._opts.selectedIndex=Number(l.dataset.index),this.open=!1,this._internals.setFormValue(this._opts.value),this._manageRequired(),this._dispatchChangeEvent())}_manageRequired(){const{value:n}=this;n===""&&this.required?this._internals.setValidity({valueMissing:!0},"Please select an item in the list.",this._face):this._internals.setValidity({})}_renderSelectFace(){const s=this._opts.getSelectedOption()?.label??"",l=this._opts.activeIndex>-1?`op-${this._opts.activeIndex}`:"";return te`
      <div
        aria-activedescendant=${l}
        aria-controls="select-listbox"
        aria-expanded=${this.open?"true":"false"}
        aria-haspopup="listbox"
        aria-label=${Ge(this.label)}
        class="select-face face"
        @click=${this._onFaceClick}
        role="combobox"
        tabindex="0"
      >
        <span class="text">${s}</span> ${ac}
      </div>
    `}_renderComboboxFace(){let n="";this._isBeingFiltered?n=this._opts.filterPattern:n=this._opts.getSelectedOption()?.label??"";const s=this._opts.activeIndex>-1?`op-${this._opts.activeIndex}`:"",l=this.open?"true":"false";return te`
      <div class="combobox-face face">
        <input
          aria-activedescendant=${s}
          aria-autocomplete="list"
          aria-controls="select-listbox"
          aria-expanded=${l}
          aria-haspopup="listbox"
          aria-label=${Ge(this.label)}
          class="combobox-input"
          role="combobox"
          spellcheck="false"
          type="text"
          autocomplete="off"
          .value=${n}
          @focus=${this._onComboboxInputFocus}
          @blur=${this._onComboboxInputBlur}
          @input=${this._onComboboxInputInput}
          @click=${this._onComboboxInputClick}
          @keydown=${this._onComboboxInputSpaceKeyDown}
        />
        <button
          aria-label="Open the list of options"
          class="combobox-button"
          type="button"
          @click=${this._onComboboxButtonClick}
          @keydown=${this._onComboboxButtonKeyDown}
          tabindex="-1"
        >
          ${ac}
        </button>
      </div>
    `}render(){return te`
      <div class="single-select">
        <slot class="main-slot" @slotchange=${this._onSlotChange}></slot>
        ${this.combobox?this._renderComboboxFace():this._renderSelectFace()}
        ${this._renderDropdown()}
      </div>
    `}};li.styles=Jv;li.shadowRootOptions={...gi.shadowRootOptions,delegatesFocus:!0};li.formAssociated=!0;ca([N({attribute:"default-value"})],li.prototype,"defaultValue",void 0);ca([N({reflect:!0})],li.prototype,"name",void 0);ca([N({type:Number,attribute:"selected-index"})],li.prototype,"selectedIndex",null);ca([N({type:String})],li.prototype,"value",null);ca([N({type:Boolean,reflect:!0})],li.prototype,"required",void 0);ca([bn(".face")],li.prototype,"_face",void 0);li=ca([ze("vscode-single-select")],li);De({tagName:"vscode-single-select",elementClass:li,react:F,displayName:"VscodeSingleSelect",events:{onChange:"change",onInvalid:"invalid",onVscSingleSelectCreateOption:"vsc-single-select-create-option"}});const zw=[Be,Me`
    :host {
      --separator-border: var(--vscode-editorWidget-border, #454545);

      border: 1px solid var(--vscode-editorWidget-border, #454545);
      display: block;
      overflow: hidden;
      position: relative;
    }

    ::slotted(*) {
      height: 100%;
      width: 100%;
    }

    ::slotted(vscode-split-layout) {
      border: 0;
    }

    .wrapper {
      display: flex;
      height: 100%;
      width: 100%;
    }

    .wrapper.horizontal {
      flex-direction: column;
    }

    .start {
      box-sizing: border-box;
      flex: 1;
      min-height: 0;
      min-width: 0;
    }

    :host([split='vertical']) .start {
      border-right: 1px solid var(--separator-border);
    }

    :host([split='horizontal']) .start {
      border-bottom: 1px solid var(--separator-border);
    }

    .end {
      flex: 1;
      min-height: 0;
      min-width: 0;
    }

    :host([split='vertical']) .start,
    :host([split='vertical']) .end {
      height: 100%;
    }

    :host([split='horizontal']) .start,
    :host([split='horizontal']) .end {
      width: 100%;
    }

    .handle-overlay {
      display: none;
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
      z-index: 1;
    }

    .handle-overlay.active {
      display: block;
    }

    .handle-overlay.split-vertical {
      cursor: ew-resize;
    }

    .handle-overlay.split-horizontal {
      cursor: ns-resize;
    }

    .handle {
      background-color: transparent;
      position: absolute;
      z-index: 2;
    }

    .handle.hover {
      transition: background-color 0.1s ease-out 0.3s;
      background-color: var(--vscode-sash-hoverBorder, #0078d4);
    }

    .handle.hide {
      background-color: transparent;
      transition: background-color 0.1s ease-out;
    }

    .handle.split-vertical {
      cursor: ew-resize;
      height: 100%;
    }

    .handle.split-horizontal {
      cursor: ns-resize;
      width: 100%;
    }
  `];var fn=function(o,n,s,l){var r=arguments.length,c=r<3?n:l===null?l=Object.getOwnPropertyDescriptor(n,s):l,f;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(o,n,s,l);else for(var p=o.length-1;p>=0;p--)(f=o[p])&&(c=(r<3?f(c):r>3?f(n,s,c):f(n,s))||c);return r>3&&c&&Object.defineProperty(n,s,c),c},Xu;const lv="50%",$w=4,io=o=>{if(!o)return{value:0,unit:"pixel"};let n,s;o.endsWith("%")?(n="percent",s=+o.substring(0,o.length-1)):o.endsWith("px")?(n="pixel",s=+o.substring(0,o.length-2)):(n="pixel",s=+o);const l=isNaN(s)?0:s;return{unit:n,value:l}},Yr=(o,n)=>n===0?0:Math.min(100,o/n*100),Uu=(o,n)=>n*(o/100);let Yt=Xu=class extends Ie{set split(n){this._split!==n&&(this._split=n,this.resetHandlePosition())}get split(){return this._split}set handlePosition(n){this._rawHandlePosition=n,this._handlePositionPropChanged()}get handlePosition(){return this._rawHandlePosition}set fixedPane(n){this._fixedPane=n,this._fixedPanePropChanged()}get fixedPane(){return this._fixedPane}set minStart(n){const s=n??void 0;this._minStart!==s&&(this._minStart=s,this._applyMinSizeConstraints())}get minStart(){return this._minStart}set minEnd(n){const s=n??void 0;this._minEnd!==s&&(this._minEnd=s,this._applyMinSizeConstraints())}get minEnd(){return this._minEnd}constructor(){super(),this._split="vertical",this.resetOnDblClick=!1,this.handleSize=4,this.initialHandlePosition=lv,this._fixedPane="none",this._handlePosition=0,this._isDragActive=!1,this._hover=!1,this._hide=!1,this._boundRect=new DOMRect,this._handleOffset=0,this._wrapperObserved=!1,this._fixedPaneSize=0,this._handleResize=n=>{const s=n[0].contentRect,{width:l,height:r}=s;this._boundRect=s;const c=this.split==="vertical"?l:r;this.fixedPane==="start"&&(this._handlePosition=this._fixedPaneSize),this.fixedPane==="end"&&(this._handlePosition=c-this._fixedPaneSize),this._handlePosition=this._clampHandlePosition(this._handlePosition,c),this._updateFixedPaneSize(c)},this._handleMouseUp=n=>{this._isDragActive=!1,n.target!==this&&(this._hover=!1,this._hide=!0),window.removeEventListener("mouseup",this._handleMouseUp),window.removeEventListener("mousemove",this._handleMouseMove);const{width:s,height:l}=this._boundRect,r=this.split==="vertical"?s:l,c=Yr(this._handlePosition,r);this.dispatchEvent(new CustomEvent("vsc-split-layout-change",{detail:{position:this._handlePosition,positionInPercentage:c},composed:!0}))},this._handleMouseMove=n=>{const{clientX:s,clientY:l}=n,{left:r,top:c,height:f,width:p}=this._boundRect,b=this.split==="vertical",g=b?p:f,v=(b?s-r:l-c)-this._handleOffset+this.handleSize/2;this._handlePosition=this._clampHandlePosition(v,g),this._updateFixedPaneSize(g)},this._resizeObserver=new ResizeObserver(this._handleResize)}resetHandlePosition(){if(!this._wrapperEl){this._handlePosition=0;return}const{width:n,height:s}=this._wrapperEl.getBoundingClientRect(),l=this.split==="vertical"?n:s,{value:r,unit:c}=io(this.initialHandlePosition??lv),f=c==="percent"?Uu(r,l):r;this._handlePosition=this._clampHandlePosition(f,l),this._updateFixedPaneSize(l)}connectedCallback(){super.connectedCallback()}firstUpdated(n){this.fixedPane!=="none"&&(this._resizeObserver.observe(this._wrapperEl),this._wrapperObserved=!0),this._boundRect=this._wrapperEl.getBoundingClientRect();const{value:s,unit:l}=this.handlePosition?io(this.handlePosition):io(this.initialHandlePosition);this._setPosition(s,l),this._initFixedPane()}_handlePositionPropChanged(){if(this.handlePosition&&this._wrapperEl){this._boundRect=this._wrapperEl.getBoundingClientRect();const{value:n,unit:s}=io(this.handlePosition);this._setPosition(n,s)}}_fixedPanePropChanged(){this._wrapperEl&&this._initFixedPane()}_initFixedPane(){if(this.fixedPane==="none")this._wrapperObserved&&(this._resizeObserver.unobserve(this._wrapperEl),this._wrapperObserved=!1);else{const{width:n,height:s}=this._boundRect,l=this.split==="vertical"?n:s;this._fixedPaneSize=this.fixedPane==="start"?this._handlePosition:l-this._handlePosition,this._wrapperObserved||(this._resizeObserver.observe(this._wrapperEl),this._wrapperObserved=!0)}}_applyMinSizeConstraints(){if(!this._wrapperEl)return;this._boundRect=this._wrapperEl.getBoundingClientRect();const{width:n,height:s}=this._boundRect,l=this.split==="vertical"?n:s;this._handlePosition=this._clampHandlePosition(this._handlePosition,l),this._updateFixedPaneSize(l)}_resolveMinSizePx(n,s){if(!n)return 0;const{unit:l,value:r}=io(n),c=l==="percent"?Uu(r,s):r;return isFinite(c)?Math.max(0,Math.min(c,s)):0}_clampHandlePosition(n,s){if(!isFinite(s)||s<=0)return 0;const l=this._resolveMinSizePx(this._minStart,s),r=this._resolveMinSizePx(this._minEnd,s),c=Math.min(l,s),f=Math.max(c,s-r),p=Math.max(c,Math.min(n,f));return Math.max(0,Math.min(p,s))}_updateFixedPaneSize(n){this.fixedPane==="start"?this._fixedPaneSize=this._handlePosition:this.fixedPane==="end"&&(this._fixedPaneSize=n-this._handlePosition)}_setPosition(n,s){const{width:l,height:r}=this._boundRect,c=this.split==="vertical"?l:r,f=s==="percent"?Uu(n,c):n;this._handlePosition=this._clampHandlePosition(f,c),this._updateFixedPaneSize(c)}_handleMouseOver(){this._hover=!0,this._hide=!1}_handleMouseOut(n){n.buttons!==1&&(this._hover=!1,this._hide=!0)}_handleMouseDown(n){n.stopPropagation(),n.preventDefault(),this._boundRect=this._wrapperEl.getBoundingClientRect();const{left:s,top:l}=this._boundRect,{left:r,top:c}=this._handleEl.getBoundingClientRect(),f=n.clientX-s,p=n.clientY-l;this.split==="vertical"&&(this._handleOffset=f-(r-s)),this.split==="horizontal"&&(this._handleOffset=p-(c-l)),this._isDragActive=!0,window.addEventListener("mouseup",this._handleMouseUp),window.addEventListener("mousemove",this._handleMouseMove)}_handleDblClick(){this.resetOnDblClick&&this.resetHandlePosition()}_handleSlotChange(){[...this._nestedLayoutsAtStart,...this._nestedLayoutsAtEnd].forEach(s=>{s instanceof Xu&&s.resetHandlePosition()})}render(){const{width:n,height:s}=this._boundRect,l=this.split==="vertical"?n:s,r=this.fixedPane!=="none"?`${this._handlePosition}px`:`${Yr(this._handlePosition,l)}%`;let c="";this.fixedPane==="start"?c=`0 0 ${this._fixedPaneSize}px`:c=`1 1 ${Yr(this._handlePosition,l)}%`;let f="";this.fixedPane==="end"?f=`0 0 ${this._fixedPaneSize}px`:f=`1 1 ${Yr(l-this._handlePosition,l)}%`;const p={left:this.split==="vertical"?r:"0",top:this.split==="vertical"?"0":r},b=this.handleSize??$w;this.split==="vertical"&&(p.marginLeft=`${0-b/2}px`,p.width=`${b}px`),this.split==="horizontal"&&(p.height=`${b}px`,p.marginTop=`${0-b/2}px`);const g=Ye({"handle-overlay":!0,active:this._isDragActive,"split-vertical":this.split==="vertical","split-horizontal":this.split==="horizontal"}),_=Ye({handle:!0,hover:this._hover,hide:this._hide,"split-vertical":this.split==="vertical","split-horizontal":this.split==="horizontal"}),v={wrapper:!0,horizontal:this.split==="horizontal"};return te`
      <div class=${Ye(v)}>
        <div class="start" .style=${Cn({flex:c})}>
          <slot name="start" @slotchange=${this._handleSlotChange}></slot>
        </div>
        <div class="end" .style=${Cn({flex:f})}>
          <slot name="end" @slotchange=${this._handleSlotChange}></slot>
        </div>
        <div class=${g}></div>
        <div
          class=${_}
          .style=${Cn(p)}
          @mouseover=${this._handleMouseOver}
          @mouseout=${this._handleMouseOut}
          @mousedown=${this._handleMouseDown}
          @dblclick=${this._handleDblClick}
        ></div>
      </div>
    `}};Yt.styles=zw;fn([N({reflect:!0})],Yt.prototype,"split",null);fn([N({type:Boolean,reflect:!0,attribute:"reset-on-dbl-click"})],Yt.prototype,"resetOnDblClick",void 0);fn([N({type:Number,reflect:!0,attribute:"handle-size"})],Yt.prototype,"handleSize",void 0);fn([N({reflect:!0,attribute:"initial-handle-position"})],Yt.prototype,"initialHandlePosition",void 0);fn([N({attribute:"handle-position"})],Yt.prototype,"handlePosition",null);fn([N({attribute:"fixed-pane"})],Yt.prototype,"fixedPane",null);fn([N({attribute:"min-start"})],Yt.prototype,"minStart",null);fn([N({attribute:"min-end"})],Yt.prototype,"minEnd",null);fn([Te()],Yt.prototype,"_handlePosition",void 0);fn([Te()],Yt.prototype,"_isDragActive",void 0);fn([Te()],Yt.prototype,"_hover",void 0);fn([Te()],Yt.prototype,"_hide",void 0);fn([bn(".wrapper")],Yt.prototype,"_wrapperEl",void 0);fn([bn(".handle")],Yt.prototype,"_handleEl",void 0);fn([hn({slot:"start",selector:"vscode-split-layout"})],Yt.prototype,"_nestedLayoutsAtStart",void 0);fn([hn({slot:"end",selector:"vscode-split-layout"})],Yt.prototype,"_nestedLayoutsAtEnd",void 0);Yt=Xu=fn([ze("vscode-split-layout")],Yt);De({tagName:"vscode-split-layout",elementClass:Yt,react:F,displayName:"VscodeSplitLayout",events:{onVscSplitLayoutChange:"vsc-split-layout-change"}});const Lw=[Be,Me`
    :host {
      cursor: pointer;
      display: block;
      user-select: none;
    }

    .wrapper {
      align-items: center;
      border-bottom: 1px solid transparent;
      color: var(--vscode-foreground, #cccccc);
      display: flex;
      min-height: 20px;
      overflow: hidden;
      padding: 7px 8px;
      position: relative;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    :host([active]) .wrapper {
      border-bottom-color: var(--vscode-panelTitle-activeForeground, #cccccc);
      color: var(--vscode-panelTitle-activeForeground, #cccccc);
    }

    :host([panel]) .wrapper {
      border-bottom: 0;
      margin-bottom: 0;
      padding: 0;
    }

    :host(:focus-visible) {
      outline: none;
    }

    .wrapper {
      align-items: center;
      color: var(--vscode-foreground, #cccccc);
      display: flex;
      min-height: 20px;
      overflow: inherit;
      text-overflow: inherit;
      position: relative;
    }

    .wrapper.panel {
      color: var(--vscode-panelTitle-inactiveForeground, #9d9d9d);
    }

    .wrapper.panel.active,
    .wrapper.panel:hover {
      color: var(--vscode-panelTitle-activeForeground, #cccccc);
    }

    :host([panel]) .wrapper {
      display: flex;
      font-size: 11px;
      height: 31px;
      padding: 2px 10px;
      text-transform: uppercase;
    }

    .main {
      overflow: inherit;
      text-overflow: inherit;
    }

    .active-indicator {
      display: none;
    }

    .active-indicator.panel.active {
      border-top: 1px solid var(--vscode-panelTitle-activeBorder, #0078d4);
      bottom: 4px;
      display: block;
      left: 8px;
      pointer-events: none;
      position: absolute;
      right: 8px;
    }

    :host(:focus-visible) .wrapper {
      outline-color: var(--vscode-focusBorder, #0078d4);
      outline-offset: 3px;
      outline-style: solid;
      outline-width: 1px;
    }

    :host(:focus-visible) .wrapper.panel {
      outline-offset: -2px;
    }

    slot[name='content-before']::slotted(vscode-badge) {
      margin-right: 8px;
    }

    slot[name='content-after']::slotted(vscode-badge) {
      margin-left: 8px;
    }
  `];var il=function(o,n,s,l){var r=arguments.length,c=r<3?n:l===null?l=Object.getOwnPropertyDescriptor(n,s):l,f;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(o,n,s,l);else for(var p=o.length-1;p>=0;p--)(f=o[p])&&(c=(r<3?f(c):r>3?f(n,s,c):f(n,s))||c);return r>3&&c&&Object.defineProperty(n,s,c),c};let ii=class extends Ie{constructor(){super(...arguments),this.active=!1,this.ariaControls="",this.panel=!1,this.role="tab",this.tabId=-1}attributeChangedCallback(n,s,l){if(super.attributeChangedCallback(n,s,l),n==="active"){const r=l!==null;this.ariaSelected=r?"true":"false",this.tabIndex=r?0:-1}}render(){return te`
      <div
        class=${Ye({wrapper:!0,active:this.active,panel:this.panel})}
      >
        <div class="before"><slot name="content-before"></slot></div>
        <div class="main"><slot></slot></div>
        <div class="after"><slot name="content-after"></slot></div>
        <span
          class=${Ye({"active-indicator":!0,active:this.active,panel:this.panel})}
        ></span>
      </div>
    `}};ii.styles=Lw;il([N({type:Boolean,reflect:!0})],ii.prototype,"active",void 0);il([N({reflect:!0,attribute:"aria-controls"})],ii.prototype,"ariaControls",void 0);il([N({type:Boolean,reflect:!0})],ii.prototype,"panel",void 0);il([N({reflect:!0})],ii.prototype,"role",void 0);il([N({type:Number,reflect:!0,attribute:"tab-id"})],ii.prototype,"tabId",void 0);ii=il([ze("vscode-tab-header")],ii);De({tagName:"vscode-tab-header",elementClass:ii,react:F,displayName:"VscTabHeader"});const mi=o=>o,un=o=>o,Bw=(o,n)=>un(o/n*100),Hw=(o,n)=>mi(o/100*n),Vw=[{test:o=>/^-?\d+(\.\d+)?%$/.test(o),parse:o=>Number(o.slice(0,-1))},{test:o=>/^-?\d+(\.\d+)?px$/.test(o),parse:(o,n)=>Number(o.slice(0,-2))/n*100},{test:o=>/^-?\d+(\.\d+)?$/.test(o),parse:(o,n)=>Number(o)/n*100}],Kr=(o,n)=>{if(!Number.isFinite(n)||n===0)return null;if(typeof o=="number")return Number.isFinite(o)?un(o/n*100):null;const s=o.trim(),l=Vw.find(r=>r.test(s));return l?un(l.parse(s,n)):null},ov=5,rv=1,Iw=[Be,Me`
    :host {
      display: block;
      --vsc-row-even-background: transparent;
      --vsc-row-odd-background: transparent;
      --vsc-row-border-bottom-width: 0;
      --vsc-row-border-top-width: 0;
      --vsc-row-display: table-row;
    }

    :host([bordered]),
    :host([bordered-rows]) {
      --vsc-row-border-bottom-width: 1px;
    }

    :host([compact]) {
      --vsc-row-display: block;
    }

    :host([bordered][compact]),
    :host([bordered-rows][compact]) {
      --vsc-row-border-bottom-width: 0;
      --vsc-row-border-top-width: 1px;
    }

    :host([zebra]) {
      --vsc-row-even-background: var(
        --vscode-keybindingTable-rowsBackground,
        rgba(204, 204, 204, 0.04)
      );
    }

    :host([zebra-odd]) {
      --vsc-row-odd-background: var(
        --vscode-keybindingTable-rowsBackground,
        rgba(204, 204, 204, 0.04)
      );
    }

    ::slotted(vscode-table-row) {
      width: 100%;
    }

    .wrapper {
      height: 100%;
      max-width: 100%;
      overflow: hidden;
      position: relative;
      width: 100%;
    }

    .wrapper.select-disabled {
      user-select: none;
    }

    .wrapper.resize-cursor {
      cursor: ew-resize;
    }

    .wrapper.compact-view .header-slot-wrapper {
      height: 0;
      overflow: hidden;
    }

    .scrollable {
      height: 100%;
    }

    .scrollable:before {
      background-color: transparent;
      content: '';
      display: block;
      height: 1px;
      position: absolute;
      width: 100%;
    }

    .wrapper:not(.compact-view) .scrollable:not([scrolled]):before {
      background-color: var(
        --vscode-editorGroup-border,
        rgba(255, 255, 255, 0.09)
      );
    }

    .sash {
      visibility: hidden;
    }

    :host([bordered-columns]) .sash,
    :host([bordered]) .sash {
      visibility: visible;
    }

    :host([resizable]) .wrapper:hover .sash {
      visibility: visible;
    }

    .sash {
      height: 100%;
      position: absolute;
      top: 0;
      width: 1px;
    }

    .wrapper.compact-view .sash {
      display: none;
    }

    .sash.resizable {
      cursor: ew-resize;
    }

    .sash-visible {
      background-color: var(
        --vscode-editorGroup-border,
        rgba(255, 255, 255, 0.09)
      );
      height: calc(100% - 30px);
      position: absolute;
      top: 30px;
      width: ${rv}px;
    }

    .sash.hover .sash-visible {
      background-color: var(--vscode-sash-hoverBorder, #0078d4);
      transition: background-color 50ms linear 300ms;
    }

    .sash .sash-clickable {
      height: 100%;
      left: ${0-(ov-rv)/2}px;
      position: absolute;
      width: ${ov}px;
    }
  `];function Uw(o,n,s,l){const r=[...o];if(s===0||n<0||n>=o.length-1)return r;const c=Math.abs(s);let f=un(c);const p=[],b=[];for(let E=n;E>=0;E--)p.push(E);for(let E=n+1;E<o.length;E++)b.push(E);const g=s>0?b:p,_=s>0?p:b;let v=un(0);for(const E of g){const O=Math.max(0,r[E]-(l.get(E)??0));v=un(v+O)}if(v<f)return r;for(const E of g){if(f===0)break;const O=Math.max(0,r[E]-(l.get(E)??0)),V=Math.min(O,f);r[E]=un(r[E]-V),f=un(f-V)}let k=un(c);for(const E of _){if(k===0)break;r[E]=un(r[E]+k),k=un(0)}return r}class qw{constructor(n){this._hostWidth=mi(0),this._hostX=mi(0),this._activeSplitter=null,this._columnMinWidths=new Map,this._columnWidths=[],this._dragState=null,this._cachedSplitterPositions=null,(this._host=n).addController(this)}hostConnected(){this.saveHostDimensions()}get isDragging(){return this._dragState!==null}get splitterPositions(){if(this._cachedSplitterPositions)return this._cachedSplitterPositions;const n=[];let s=un(0);for(let l=0;l<this._columnWidths.length-1;l++)s=un(s+this._columnWidths[l]),n.push(s);return this._cachedSplitterPositions=n,n}getActiveSplitterCalculatedPosition(){const n=this.splitterPositions;if(!this._dragState)return mi(0);const s=n[this._dragState.splitterIndex];return this._toPx(s)}get columnWidths(){return this._columnWidths}get columnMinWidths(){return new Map(this._columnMinWidths)}saveHostDimensions(){const n=this._host.getBoundingClientRect(),{width:s,x:l}=n;return this._hostWidth=mi(s),this._hostX=mi(l),this}setActiveSplitter(n){return this._activeSplitter=n,this}getActiveSplitter(){return this._activeSplitter}setColumnMinWidthAt(n,s){return this._columnMinWidths.set(n,s),this._host.requestUpdate(),this}setColumWidths(n){return this._columnWidths=n,this._cachedSplitterPositions=null,this._host.requestUpdate(),this}shouldDrag(n){return+n.currentTarget.dataset.index===this._dragState?.splitterIndex}startDrag(n){if(n.stopPropagation(),this._dragState)return;this._activeSplitter?.setPointerCapture(n.pointerId);const s=n.pageX,l=n.currentTarget,r=l.getBoundingClientRect().x,c=mi(s-r);this._dragState={dragOffset:mi(c),pointerId:n.pointerId,splitterIndex:+l.dataset.index,prevX:mi(s-c)},this._host.requestUpdate()}drag(n){if(n.stopPropagation(),!n?.currentTarget?.hasPointerCapture?.(n.pointerId)||!this._dragState||n.pointerId!==this._dragState.pointerId||!this.shouldDrag(n))return;const s=n.pageX,l=mi(s-this._dragState.dragOffset),r=mi(l-this._dragState.prevX),c=this._toPercent(r);this._dragState.prevX=l;const f=this.getActiveSplitterCalculatedPosition();r<=0&&s>f+this._hostX||r>0&&s<f+this._hostX||(this._columnWidths=Uw(this._columnWidths,this._dragState.splitterIndex,c,this._columnMinWidths),this._cachedSplitterPositions=null,this._host.requestUpdate())}stopDrag(n){if(n.stopPropagation(),!this._dragState)return;const s=n.currentTarget;try{s.releasePointerCapture(this._dragState.pointerId)}catch{}this._dragState=null,this._activeSplitter=null,this._host.requestUpdate()}_toPercent(n){return Bw(n,this._hostWidth)}_toPx(n){return Hw(n,this._hostWidth)}}var Dt=function(o,n,s,l){var r=arguments.length,c=r<3?n:l===null?l=Object.getOwnPropertyDescriptor(n,s):l,f;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(o,n,s,l);else for(var p=o.length-1;p>=0;p--)(f=o[p])&&(c=(r<3?f(c):r>3?f(n,s,c):f(n,s))||c);return r>3&&c&&Object.defineProperty(n,s,c),c};let ht=class extends Ie{set columns(n){if(!Array.isArray(n)){this.warn('Invalid value for "columns": expected an array.'),this._columns=[];return}this._columns=n,this.isConnected&&this._initDefaultColumnSizes()}get columns(){return this._columns}constructor(){super(),this.role="table",this.resizable=!1,this.responsive=!1,this.bordered=!1,this.borderedColumns=!1,this.borderedRows=!1,this.breakpoint=300,this.minColumnWidth="50px",this.delayedResizing=!1,this.compact=!1,this.zebra=!1,this.zebraOdd=!1,this._sashPositions=[],this._isDragging=!1,this._sashHovers=[],this._columns=[],this._activeSashElementIndex=-1,this._componentH=0,this._componentW=0,this._headerCells=[],this._cellsOfFirstRow=[],this._prevHeaderHeight=0,this._prevComponentHeight=0,this._columnResizeController=new qw(this),this._componentResizeObserverCallback=()=>{this._memoizeComponentDimensions(),this._updateResizeHandlersSize(),this.responsive&&this._toggleCompactView(),this._resizeTableBody()},this._headerResizeObserverCallback=()=>{this._updateResizeHandlersSize()},this._bodyResizeObserverCallback=()=>{this._resizeTableBody()},this._handleSplitterPointerMove=n=>{this._columnResizeController.shouldDrag(n)&&(this._columnResizeController.drag(n),this.delayedResizing?this._resizeColumns(!1):this._resizeColumns(!0))},this._handleSplitterPointerUp=n=>{this._stopDrag(n)},this._handleSplitterPointerCancel=n=>{this._stopDrag(n)},this._handleMinColumnWidthChange=n=>{const{columnIndex:s,propertyValue:l}=n.detail,r=Kr(l,this._componentW);r&&this._columnResizeController.setColumnMinWidthAt(s,r)},this.addEventListener("vsc-table-change-min-column-width",this._handleMinColumnWidthChange)}connectedCallback(){super.connectedCallback(),this._memoizeComponentDimensions(),this._initDefaultColumnSizes()}disconnectedCallback(){super.disconnectedCallback(),this._componentResizeObserver?.unobserve(this),this._componentResizeObserver?.disconnect(),this._bodyResizeObserver?.disconnect()}willUpdate(n){if(n.has("minColumnWidth")){const s=un(Kr(this.minColumnWidth,this._componentW)??0),l=this._columnResizeController.columnMinWidths,r=this._columnResizeController.columnWidths;for(let c=0;c<r.length;c++)l.has(c)||this._columnResizeController.setColumnMinWidthAt(c,s)}}_memoizeComponentDimensions(){const n=this.getBoundingClientRect();this._componentH=n.height,this._componentW=n.width}_queryHeaderCells(){const n=this._assignedHeaderElements;return n&&n[0]?Array.from(n[0].querySelectorAll("vscode-table-header-cell")):[]}_getHeaderCells(){return this._headerCells.length||(this._headerCells=this._queryHeaderCells()),this._headerCells}_queryCellsOfFirstRow(){const n=this._assignedBodyElements;return n&&n[0]?Array.from(n[0].querySelectorAll("vscode-table-row:first-child vscode-table-cell")):[]}_getCellsOfFirstRow(){return this._cellsOfFirstRow.length||(this._cellsOfFirstRow=this._queryCellsOfFirstRow()),this._cellsOfFirstRow}_resizeTableBody(){let n=0,s=0;const l=this.getBoundingClientRect().height;this._assignedHeaderElements&&this._assignedHeaderElements.length&&(n=this._assignedHeaderElements[0].getBoundingClientRect().height),this._assignedBodyElements&&this._assignedBodyElements.length&&(s=this._assignedBodyElements[0].getBoundingClientRect().height);const r=s-n-l;this._scrollableElement.style.height=r>0?`${l-n}px`:"auto"}_initResizeObserver(){this._componentResizeObserver=new ResizeObserver(this._componentResizeObserverCallback),this._componentResizeObserver.observe(this),this._headerResizeObserver=new ResizeObserver(this._headerResizeObserverCallback),this._headerResizeObserver.observe(this._headerElement)}_calculateInitialColumnWidths(){const n=this._getHeaderCells().length;let s=this.columns.slice(0,n);const l=s.filter(c=>c==="auto").length+n-s.length;let r=100;if(s=s.map(c=>{const f=Kr(c,this._componentW);return f===null?"auto":(r-=f,f)}),s.length<n)for(let c=s.length;c<n;c++)s.push("auto");return s=s.map(c=>c==="auto"?r/l:c),s}_initHeaderCellSizes(n){this._getHeaderCells().forEach((s,l)=>{s.style.width=`${n[l]}%`})}_initBodyColumnSizes(n){this._getCellsOfFirstRow().forEach((s,l)=>{s.style.width=`${n[l]}%`})}_initSashes(n){const s=n.length;let l=0;this._sashPositions=[],n.forEach((r,c)=>{if(c<s-1){const f=l+r;this._sashPositions.push(f),l=f}})}_initDefaultColumnSizes(){const n=this._calculateInitialColumnWidths();this._columnResizeController.setColumWidths(n.map(s=>un(s))),this._initHeaderCellSizes(n),this._initBodyColumnSizes(n),this._initSashes(n)}_updateResizeHandlersSize(){const n=this._headerElement.getBoundingClientRect();if(n.height===this._prevHeaderHeight&&this._componentH===this._prevComponentHeight)return;this._prevHeaderHeight=n.height,this._prevComponentHeight=this._componentH;const s=this._componentH-n.height;this._sashVisibleElements.forEach(l=>{l.style.height=`${s}px`,l.style.top=`${n.height}px`})}_applyCompactViewColumnLabels(){const s=this._getHeaderCells().map(r=>r.innerText);this.querySelectorAll("vscode-table-row").forEach(r=>{r.querySelectorAll("vscode-table-cell").forEach((f,p)=>{f.columnLabel=s[p],f.compact=!0})})}_clearCompactViewColumnLabels(){this.querySelectorAll("vscode-table-cell").forEach(n=>{n.columnLabel="",n.compact=!1})}_toggleCompactView(){const s=this.getBoundingClientRect().width<this.breakpoint;this.compact!==s&&(this.compact=s,s?this._applyCompactViewColumnLabels():this._clearCompactViewColumnLabels())}_stopDrag(n){const s=this._columnResizeController.getActiveSplitter();s&&(s.removeEventListener("pointermove",this._handleSplitterPointerMove),s.removeEventListener("pointerup",this._handleSplitterPointerUp),s.removeEventListener("pointercancel",this._handleSplitterPointerCancel)),this._columnResizeController.stopDrag(n),this._resizeColumns(!0),this._sashHovers[this._activeSashElementIndex]=!1,this._isDragging=!1,this._activeSashElementIndex=-1}_onDefaultSlotChange(){this._assignedElements.forEach(n=>{if(n.tagName.toLowerCase()==="vscode-table-header"){n.slot="header";return}if(n.tagName.toLowerCase()==="vscode-table-body"){n.slot="body";return}})}_onHeaderSlotChange(){this._headerCells=this._queryHeaderCells(),[].fill(un(0),0,this._headerCells.length-1),this._headerCells.forEach((s,l)=>{if(s.index=l,s.minWidth){const r=Kr(s.minWidth,this._componentW)??un(0);this._columnResizeController.setColumnMinWidthAt(l,r)}})}_onBodySlotChange(){if(this._initDefaultColumnSizes(),this._initResizeObserver(),this._updateResizeHandlersSize(),!this._bodyResizeObserver){const n=this._assignedBodyElements[0]??null;n&&(this._bodyResizeObserver=new ResizeObserver(this._bodyResizeObserverCallback),this._bodyResizeObserver.observe(n))}}_onSashMouseOver(n){if(this._isDragging)return;const s=n.currentTarget,l=Number(s.dataset.index);this._sashHovers[l]=!0,this.requestUpdate()}_onSashMouseOut(n){if(n.stopPropagation(),this._isDragging)return;const s=n.currentTarget,l=Number(s.dataset.index);this._sashHovers[l]=!1,this.requestUpdate()}_resizeColumns(n=!0){const s=this._columnResizeController.columnWidths;this._getHeaderCells().forEach((r,c)=>r.style.width=`${s[c]}%`),n&&this._getCellsOfFirstRow().forEach((c,f)=>c.style.width=`${s[f]}%`)}_handleSplitterPointerDown(n){n.stopPropagation();const s=n.currentTarget;this._columnResizeController.saveHostDimensions().setActiveSplitter(s).startDrag(n),s.addEventListener("pointermove",this._handleSplitterPointerMove),s.addEventListener("pointerup",this._handleSplitterPointerUp),s.addEventListener("pointercancel",this._handleSplitterPointerCancel)}render(){const s=this._columnResizeController.splitterPositions.map((r,c)=>{const f=Ye({sash:!0,hover:this._sashHovers[c],resizable:this.resizable}),p=`${r}%`;return this.resizable?te`
            <div
              class=${f}
              data-index=${c}
              .style=${Cn({left:p})}
              @pointerdown=${this._handleSplitterPointerDown}
              @mouseover=${this._onSashMouseOver}
              @mouseout=${this._onSashMouseOut}
            >
              <div class="sash-visible"></div>
              <div class="sash-clickable"></div>
            </div>
          `:te`<div
            class=${f}
            data-index=${c}
            .style=${Cn({left:p})}
          >
            <div class="sash-visible"></div>
          </div>`}),l=Ye({wrapper:!0,"select-disabled":this._columnResizeController.isDragging,"resize-cursor":this._columnResizeController.isDragging,"compact-view":this.compact});return te`
      <div class=${l}>
        <div class="header">
          <slot name="caption"></slot>
          <div class="header-slot-wrapper">
            <slot name="header" @slotchange=${this._onHeaderSlotChange}></slot>
          </div>
        </div>
        <vscode-scrollable class="scrollable">
          <div>
            <slot name="body" @slotchange=${this._onBodySlotChange}></slot>
          </div>
        </vscode-scrollable>
        ${s}
        <slot @slotchange=${this._onDefaultSlotChange}></slot>
      </div>
    `}};ht.styles=Iw;Dt([N({reflect:!0})],ht.prototype,"role",void 0);Dt([N({type:Boolean,reflect:!0})],ht.prototype,"resizable",void 0);Dt([N({type:Boolean,reflect:!0})],ht.prototype,"responsive",void 0);Dt([N({type:Boolean,reflect:!0})],ht.prototype,"bordered",void 0);Dt([N({type:Boolean,reflect:!0,attribute:"bordered-columns"})],ht.prototype,"borderedColumns",void 0);Dt([N({type:Boolean,reflect:!0,attribute:"bordered-rows"})],ht.prototype,"borderedRows",void 0);Dt([N({type:Number})],ht.prototype,"breakpoint",void 0);Dt([N({type:Array})],ht.prototype,"columns",null);Dt([N({attribute:"min-column-width"})],ht.prototype,"minColumnWidth",void 0);Dt([N({type:Boolean,reflect:!0,attribute:"delayed-resizing"})],ht.prototype,"delayedResizing",void 0);Dt([N({type:Boolean,reflect:!0})],ht.prototype,"compact",void 0);Dt([N({type:Boolean,reflect:!0})],ht.prototype,"zebra",void 0);Dt([N({type:Boolean,reflect:!0,attribute:"zebra-odd"})],ht.prototype,"zebraOdd",void 0);Dt([bn(".header")],ht.prototype,"_headerElement",void 0);Dt([bn(".scrollable")],ht.prototype,"_scrollableElement",void 0);Dt([FS(".sash-visible")],ht.prototype,"_sashVisibleElements",void 0);Dt([hn({flatten:!0,selector:"vscode-table-header, vscode-table-body"})],ht.prototype,"_assignedElements",void 0);Dt([hn({slot:"header",flatten:!0,selector:"vscode-table-header"})],ht.prototype,"_assignedHeaderElements",void 0);Dt([hn({slot:"body",flatten:!0,selector:"vscode-table-body"})],ht.prototype,"_assignedBodyElements",void 0);Dt([Te()],ht.prototype,"_sashPositions",void 0);Dt([Te()],ht.prototype,"_isDragging",void 0);ht=Dt([ze("vscode-table")],ht);De({tagName:"vscode-table",elementClass:ht,react:F,displayName:"VscodeTable"});const Pw=[Be,Me`
    :host {
      display: table;
      table-layout: fixed;
      width: 100%;
    }

    ::slotted(vscode-table-row:nth-child(even)) {
      background-color: var(--vsc-row-even-background);
    }

    ::slotted(vscode-table-row:nth-child(odd)) {
      background-color: var(--vsc-row-odd-background);
    }
  `];var Wv=function(o,n,s,l){var r=arguments.length,c=r<3?n:l===null?l=Object.getOwnPropertyDescriptor(n,s):l,f;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(o,n,s,l);else for(var p=o.length-1;p>=0;p--)(f=o[p])&&(c=(r<3?f(c):r>3?f(n,s,c):f(n,s))||c);return r>3&&c&&Object.defineProperty(n,s,c),c};let xo=class extends Ie{constructor(){super(...arguments),this.role="rowgroup"}render(){return te` <slot></slot> `}};xo.styles=Pw;Wv([N({reflect:!0})],xo.prototype,"role",void 0);xo=Wv([ze("vscode-table-body")],xo);De({tagName:"vscode-table-body",elementClass:xo,react:F,displayName:"VscodeTableBody"});const Gw=[Be,Me`
    :host {
      border-bottom-color: var(
        --vscode-editorGroup-border,
        rgba(255, 255, 255, 0.09)
      );
      border-bottom-style: solid;
      border-bottom-width: var(--vsc-row-border-bottom-width);
      box-sizing: border-box;
      color: var(--vscode-foreground, #cccccc);
      display: table-cell;
      font-family: var(--vscode-font-family, sans-serif);
      font-size: var(--vscode-font-size, 13px);
      height: 24px;
      overflow: hidden;
      padding-left: 10px;
      text-overflow: ellipsis;
      vertical-align: middle;
      white-space: nowrap;
    }

    :host([compact]) {
      display: block;
      height: auto;
      padding-bottom: 5px;
      width: 100% !important;
    }

    :host([compact]:first-child) {
      padding-top: 10px;
    }

    :host([compact]:last-child) {
      padding-bottom: 10px;
    }

    .wrapper {
      overflow: inherit;
      text-overflow: inherit;
      white-space: inherit;
      width: 100%;
    }

    .column-label {
      font-weight: bold;
    }
  `];var pc=function(o,n,s,l){var r=arguments.length,c=r<3?n:l===null?l=Object.getOwnPropertyDescriptor(n,s):l,f;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(o,n,s,l);else for(var p=o.length-1;p>=0;p--)(f=o[p])&&(c=(r<3?f(c):r>3?f(n,s,c):f(n,s))||c);return r>3&&c&&Object.defineProperty(n,s,c),c};let sa=class extends Ie{constructor(){super(...arguments),this.role="cell",this.columnLabel="",this.compact=!1}render(){const n=this.columnLabel?te`<div class="column-label" role="presentation">
          ${this.columnLabel}
        </div>`:Ce;return te`
      <div class="wrapper">
        ${n}
        <slot></slot>
      </div>
    `}};sa.styles=Gw;pc([N({reflect:!0})],sa.prototype,"role",void 0);pc([N({attribute:"column-label"})],sa.prototype,"columnLabel",void 0);pc([N({type:Boolean,reflect:!0})],sa.prototype,"compact",void 0);sa=pc([ze("vscode-table-cell")],sa);De({tagName:"vscode-table-cell",elementClass:sa,react:F,displayName:"VscodeTableCell"});const Yw=[Be,Me`
    :host {
      background-color: var(
        --vscode-keybindingTable-headerBackground,
        rgba(204, 204, 204, 0.04)
      );
      display: table;
      table-layout: fixed;
      width: 100%;
    }
  `];var eb=function(o,n,s,l){var r=arguments.length,c=r<3?n:l===null?l=Object.getOwnPropertyDescriptor(n,s):l,f;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(o,n,s,l);else for(var p=o.length-1;p>=0;p--)(f=o[p])&&(c=(r<3?f(c):r>3?f(n,s,c):f(n,s))||c);return r>3&&c&&Object.defineProperty(n,s,c),c};let _o=class extends Ie{constructor(){super(...arguments),this.role="rowgroup"}render(){return te` <slot></slot> `}};_o.styles=Yw;eb([N({reflect:!0})],_o.prototype,"role",void 0);_o=eb([ze("vscode-table-header")],_o);De({tagName:"vscode-table-header",elementClass:_o,react:F,displayName:"VscodeTableHeader"});const Kw=[Be,Me`
    :host {
      box-sizing: border-box;
      color: var(--vscode-foreground, #cccccc);
      display: table-cell;
      font-family: var(--vscode-font-family, sans-serif);
      font-size: var(--vscode-font-size, 13px);
      font-weight: bold;
      line-height: 20px;
      overflow: hidden;
      padding-bottom: 5px;
      padding-left: 10px;
      padding-right: 0;
      padding-top: 5px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .wrapper {
      box-sizing: inherit;
      overflow: inherit;
      text-overflow: inherit;
      white-space: inherit;
      width: 100%;
    }
  `];var mc=function(o,n,s,l){var r=arguments.length,c=r<3?n:l===null?l=Object.getOwnPropertyDescriptor(n,s):l,f;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(o,n,s,l);else for(var p=o.length-1;p>=0;p--)(f=o[p])&&(c=(r<3?f(c):r>3?f(n,s,c):f(n,s))||c);return r>3&&c&&Object.defineProperty(n,s,c),c};let aa=class extends Ie{constructor(){super(...arguments),this.minWidth="0",this.index=-1,this.role="columnheader"}willUpdate(n){n.has("minWidth")&&this.index>-1&&this.dispatchEvent(new CustomEvent("vsc-table-change-min-column-width",{detail:{columnIndex:this.index,propertyValue:this.minWidth},bubbles:!0}))}render(){return te`
      <div class="wrapper">
        <slot></slot>
      </div>
    `}};aa.styles=Kw;mc([N({attribute:"min-width"})],aa.prototype,"minWidth",void 0);mc([N({type:Number})],aa.prototype,"index",void 0);mc([N({reflect:!0})],aa.prototype,"role",void 0);aa=mc([ze("vscode-table-header-cell")],aa);De({tagName:"vscode-table-header-cell",elementClass:aa,react:F,displayName:"VscodeTableHeaderCell"});const Fw=[Be,Me`
    :host {
      border-top-color: var(
        --vscode-editorGroup-border,
        rgba(255, 255, 255, 0.09)
      );
      border-top-style: solid;
      border-top-width: var(--vsc-row-border-top-width);
      display: var(--vsc-row-display);
      width: 100%;
    }
  `];var tb=function(o,n,s,l){var r=arguments.length,c=r<3?n:l===null?l=Object.getOwnPropertyDescriptor(n,s):l,f;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(o,n,s,l);else for(var p=o.length-1;p>=0;p--)(f=o[p])&&(c=(r<3?f(c):r>3?f(n,s,c):f(n,s))||c);return r>3&&c&&Object.defineProperty(n,s,c),c};let So=class extends Ie{constructor(){super(...arguments),this.role="row"}render(){return te` <slot></slot> `}};So.styles=Fw;tb([N({reflect:!0})],So.prototype,"role",void 0);So=tb([ze("vscode-table-row")],So);De({tagName:"vscode-table-row",elementClass:So,react:F,displayName:"VscodeTableRow"});const Xw=[Be,Me`
    :host {
      display: block;
      overflow: hidden;
    }

    :host(:focus-visible) {
      outline-color: var(--vscode-focusBorder, #0078d4);
      outline-offset: 3px;
      outline-style: solid;
      outline-width: 1px;
    }

    :host([panel]) {
      background-color: var(--vscode-panel-background, #181818);
    }
  `];var sl=function(o,n,s,l){var r=arguments.length,c=r<3?n:l===null?l=Object.getOwnPropertyDescriptor(n,s):l,f;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(o,n,s,l);else for(var p=o.length-1;p>=0;p--)(f=o[p])&&(c=(r<3?f(c):r>3?f(n,s,c):f(n,s))||c);return r>3&&c&&Object.defineProperty(n,s,c),c};let ki=class extends Ie{constructor(){super(...arguments),this.hidden=!1,this.ariaLabelledby="",this.panel=!1,this.role="tabpanel",this.tabIndex=0}render(){return te` <slot></slot> `}};ki.styles=Xw;sl([N({type:Boolean,reflect:!0})],ki.prototype,"hidden",void 0);sl([N({reflect:!0,attribute:"aria-labelledby"})],ki.prototype,"ariaLabelledby",void 0);sl([N({type:Boolean,reflect:!0})],ki.prototype,"panel",void 0);sl([N({reflect:!0})],ki.prototype,"role",void 0);sl([N({type:Number,reflect:!0})],ki.prototype,"tabIndex",void 0);ki=sl([ze("vscode-tab-panel")],ki);De({tagName:"vscode-tab-panel",elementClass:ki,react:F,displayName:"VscodeTabPanel"});const Qw=[Be,Me`
    :host {
      display: block;
    }

    .header {
      align-items: center;
      display: flex;
      font-family: var(--vscode-font-family, sans-serif);
      font-size: var(--vscode-font-size, 13px);
      font-weight: var(--vscode-font-weight, normal);
      width: 100%;
    }

    .header {
      border-bottom-color: var(--vscode-settings-headerBorder, #2b2b2b);
      border-bottom-style: solid;
      border-bottom-width: 1px;
    }

    .header.panel {
      background-color: var(--vscode-panel-background, #181818);
      border-bottom-width: 0;
      box-sizing: border-box;
      padding-left: 8px;
      padding-right: 8px;
    }

    .tablist {
      display: flex;
      margin-bottom: -1px;
    }

    slot[name='addons'] {
      display: block;
      margin-left: auto;
    }
  `];var Eo=function(o,n,s,l){var r=arguments.length,c=r<3?n:l===null?l=Object.getOwnPropertyDescriptor(n,s):l,f;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(o,n,s,l);else for(var p=o.length-1;p>=0;p--)(f=o[p])&&(c=(r<3?f(c):r>3?f(n,s,c):f(n,s))||c);return r>3&&c&&Object.defineProperty(n,s,c),c};let ks=class extends Ie{constructor(){super(),this.panel=!1,this.selectedIndex=0,this._tabHeaders=[],this._tabPanels=[],this._componentId="",this._tabFocus=0,this._componentId=Kv()}attributeChangedCallback(n,s,l){super.attributeChangedCallback(n,s,l),n==="selected-index"&&this._setActiveTab(),n==="panel"&&(this._tabHeaders.forEach(r=>r.panel=l!==null),this._tabPanels.forEach(r=>r.panel=l!==null))}_dispatchSelectEvent(){this.dispatchEvent(new CustomEvent("vsc-tabs-select",{detail:{selectedIndex:this.selectedIndex},composed:!0}))}_setActiveTab(){this._tabFocus=this.selectedIndex,this._tabPanels.forEach((n,s)=>{n.hidden=s!==this.selectedIndex}),this._tabHeaders.forEach((n,s)=>{n.active=s===this.selectedIndex})}_focusPrevTab(){this._tabFocus===0?this._tabFocus=this._tabHeaders.length-1:this._tabFocus-=1}_focusNextTab(){this._tabFocus===this._tabHeaders.length-1?this._tabFocus=0:this._tabFocus+=1}_onHeaderKeyDown(n){(n.key==="ArrowLeft"||n.key==="ArrowRight")&&(n.preventDefault(),this._tabHeaders[this._tabFocus].setAttribute("tabindex","-1"),n.key==="ArrowLeft"?this._focusPrevTab():n.key==="ArrowRight"&&this._focusNextTab(),this._tabHeaders[this._tabFocus].setAttribute("tabindex","0"),this._tabHeaders[this._tabFocus].focus()),n.key==="Enter"&&(n.preventDefault(),this.selectedIndex=this._tabFocus,this._dispatchSelectEvent())}_moveHeadersToHeaderSlot(){const n=this._mainSlotElements.filter(s=>s instanceof ii);n.length>0&&n.forEach(s=>s.setAttribute("slot","header"))}_onMainSlotChange(){this._moveHeadersToHeaderSlot(),this._tabPanels=this._mainSlotElements.filter(n=>n instanceof ki),this._tabPanels.forEach((n,s)=>{n.ariaLabelledby=`t${this._componentId}-h${s}`,n.id=`t${this._componentId}-p${s}`,n.panel=this.panel}),this._setActiveTab()}_onHeaderSlotChange(){this._tabHeaders=this._headerSlotElements.filter(n=>n instanceof ii),this._tabHeaders.forEach((n,s)=>{n.tabId=s,n.id=`t${this._componentId}-h${s}`,n.ariaControls=`t${this._componentId}-p${s}`,n.panel=this.panel,n.active=s===this.selectedIndex})}_onHeaderClick(n){const l=n.composedPath().find(r=>r instanceof ii);l&&(this.selectedIndex=l.tabId,this._setActiveTab(),this._dispatchSelectEvent())}render(){return te`
      <div
        class=${Ye({header:!0,panel:this.panel})}
        @click=${this._onHeaderClick}
        @keydown=${this._onHeaderKeyDown}
      >
        <div role="tablist" class="tablist">
          <slot
            name="header"
            @slotchange=${this._onHeaderSlotChange}
            role="tablist"
          ></slot>
        </div>
        <slot name="addons"></slot>
      </div>
      <slot @slotchange=${this._onMainSlotChange}></slot>
    `}};ks.styles=Qw;Eo([N({type:Boolean,reflect:!0})],ks.prototype,"panel",void 0);Eo([N({type:Number,reflect:!0,attribute:"selected-index"})],ks.prototype,"selectedIndex",void 0);Eo([hn({slot:"header"})],ks.prototype,"_headerSlotElements",void 0);Eo([hn()],ks.prototype,"_mainSlotElements",void 0);ks=Eo([ze("vscode-tabs")],ks);De({tagName:"vscode-tabs",elementClass:ks,react:F,events:{onVscTabsSelect:"vsc-tabs-select"},displayName:"VscodeTabs"});const Zw=[Be,Me`
    :host {
      display: inline-block;
      height: auto;
      position: relative;
      width: 320px;
    }

    :host([cols]) {
      width: auto;
    }

    :host([rows]) {
      height: auto;
    }

    .shadow {
      box-shadow: var(--vscode-scrollbar-shadow, #000000) 0 6px 6px -6px inset;
      display: none;
      inset: 0 0 auto 0;
      height: 6px;
      pointer-events: none;
      position: absolute;
      width: 100%;
    }

    .shadow.visible {
      display: block;
    }

    textarea {
      background-color: var(--vscode-settings-textInputBackground, #313131);
      border-color: var(--vscode-settings-textInputBorder, transparent);
      border-radius: 4px;
      border-style: solid;
      border-width: 1px;
      box-sizing: border-box;
      color: var(--vscode-settings-textInputForeground, #cccccc);
      display: block;
      font-family: var(--vscode-font-family, sans-serif);
      font-size: var(--vscode-font-size, 13px);
      font-weight: var(--vscode-font-weight, normal);
      height: 100%;
      width: 100%;
    }

    :host([cols]) textarea {
      width: auto;
    }

    :host([rows]) textarea {
      height: auto;
    }

    :host([invalid]) textarea,
    :host(:invalid) textarea {
      background-color: var(--vscode-inputValidation-errorBackground, #5a1d1d);
      border-color: var(--vscode-inputValidation-errorBorder, #be1100);
    }

    textarea.monospace {
      background-color: var(--vscode-editor-background, #1f1f1f);
      color: var(--vscode-editor-foreground, #cccccc);
      font-family: var(--vscode-editor-font-family, monospace);
      font-size: var(--vscode-editor-font-size, 14px);
      font-weight: var(--vscode-editor-font-weight, normal);
    }

    .textarea.monospace::placeholder {
      color: var(
        --vscode-editor-inlineValuesForeground,
        rgba(255, 255, 255, 0.5)
      );
    }

    textarea.cursor-pointer {
      cursor: pointer;
    }

    textarea:focus {
      border-color: var(--vscode-focusBorder, #0078d4);
      outline: none;
    }

    textarea::placeholder {
      color: var(--vscode-input-placeholderForeground, #989898);
      opacity: 1;
    }

    textarea::-webkit-scrollbar-track {
      background-color: transparent;
    }

    textarea::-webkit-scrollbar {
      width: 14px;
    }

    textarea::-webkit-scrollbar-thumb {
      background-color: transparent;
    }

    textarea:hover::-webkit-scrollbar-thumb {
      background-color: var(
        --vscode-scrollbarSlider-background,
        rgba(121, 121, 121, 0.4)
      );
    }

    textarea::-webkit-scrollbar-thumb:hover {
      background-color: var(
        --vscode-scrollbarSlider-hoverBackground,
        rgba(100, 100, 100, 0.7)
      );
    }

    textarea::-webkit-scrollbar-thumb:active {
      background-color: var(
        --vscode-scrollbarSlider-activeBackground,
        rgba(191, 191, 191, 0.4)
      );
    }

    textarea::-webkit-scrollbar-corner {
      background-color: transparent;
    }

    textarea::-webkit-resizer {
      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAACJJREFUeJxjYMAOZuIQZ5j5//9/rJJESczEKYGsG6cEXgAAsEEefMxkua4AAAAASUVORK5CYII=');
      background-repeat: no-repeat;
      background-position: right bottom;
    }
  `];var Ct=function(o,n,s,l){var r=arguments.length,c=r<3?n:l===null?l=Object.getOwnPropertyDescriptor(n,s):l,f;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(o,n,s,l);else for(var p=o.length-1;p>=0;p--)(f=o[p])&&(c=(r<3?f(c):r>3?f(n,s,c):f(n,s))||c);return r>3&&c&&Object.defineProperty(n,s,c),c};let st=class extends Ie{set value(n){this._value=n,this._internals.setFormValue(n)}get value(){return this._value}get wrappedElement(){return this._textareaEl}get form(){return this._internals.form}get type(){return"textarea"}get validity(){return this._internals.validity}get validationMessage(){return this._internals.validationMessage}get willValidate(){return this._internals.willValidate}set minlength(n){this.minLength=n}get minlength(){return this.minLength}set maxlength(n){this.maxLength=n}get maxlength(){return this.maxLength}constructor(){super(),this.autocomplete=void 0,this.autofocus=!1,this.defaultValue="",this.disabled=!1,this.invalid=!1,this.label="",this.maxLength=void 0,this.minLength=void 0,this.rows=void 0,this.cols=void 0,this.name=void 0,this.placeholder=void 0,this.readonly=!1,this.resize="none",this.required=!1,this.spellcheck=!1,this.monospace=!1,this._value="",this._textareaPointerCursor=!1,this._shadow=!1,this._internals=this.attachInternals()}connectedCallback(){super.connectedCallback(),this.updateComplete.then(()=>{this._textareaEl.checkValidity(),this._setValidityFromInput(),this._internals.setFormValue(this._textareaEl.value)})}updated(n){const s=["maxLength","minLength","required"];for(const l of n.keys())if(s.includes(String(l))){this.updateComplete.then(()=>{this._setValidityFromInput()});break}}formResetCallback(){this.value=this.defaultValue}formStateRestoreCallback(n,s){this.updateComplete.then(()=>{this._value=n})}checkValidity(){return this._internals.checkValidity()}reportValidity(){return this._internals.reportValidity()}_setValidityFromInput(){this._internals.setValidity(this._textareaEl.validity,this._textareaEl.validationMessage,this._textareaEl)}_dataChanged(){this._value=this._textareaEl.value,this._internals.setFormValue(this._textareaEl.value)}_handleChange(){this._dataChanged(),this._setValidityFromInput(),this.dispatchEvent(new Event("change"))}_handleInput(){this._dataChanged(),this._setValidityFromInput()}_handleMouseMove(n){if(this._textareaEl.clientHeight>=this._textareaEl.scrollHeight){this._textareaPointerCursor=!1;return}const s=14,l=1,r=this._textareaEl.getBoundingClientRect(),c=n.clientX;this._textareaPointerCursor=c>=r.left+r.width-s-l*2}_handleScroll(){this._shadow=this._textareaEl.scrollTop>0}render(){return te`
      <div
        class=${Ye({shadow:!0,visible:this._shadow})}
      ></div>
      <textarea
        autocomplete=${Ge(this.autocomplete)}
        ?autofocus=${this.autofocus}
        ?disabled=${this.disabled}
        aria-label=${this.label}
        id="textarea"
        class=${Ye({monospace:this.monospace,"cursor-pointer":this._textareaPointerCursor})}
        maxlength=${Ge(this.maxLength)}
        minlength=${Ge(this.minLength)}
        rows=${Ge(this.rows)}
        cols=${Ge(this.cols)}
        name=${Ge(this.name)}
        placeholder=${Ge(this.placeholder)}
        ?readonly=${this.readonly}
        .style=${Cn({resize:this.resize})}
        ?required=${this.required}
        spellcheck=${this.spellcheck}
        @change=${this._handleChange}
        @input=${this._handleInput}
        @mousemove=${this._handleMouseMove}
        @scroll=${this._handleScroll}
        .value=${this._value}
      ></textarea>
    `}};st.styles=Zw;st.formAssociated=!0;st.shadowRootOptions={...gi.shadowRootOptions,delegatesFocus:!0};Ct([N()],st.prototype,"autocomplete",void 0);Ct([N({type:Boolean,reflect:!0})],st.prototype,"autofocus",void 0);Ct([N({attribute:"default-value"})],st.prototype,"defaultValue",void 0);Ct([N({type:Boolean,reflect:!0})],st.prototype,"disabled",void 0);Ct([N({type:Boolean,reflect:!0})],st.prototype,"invalid",void 0);Ct([N({attribute:!1})],st.prototype,"label",void 0);Ct([N({type:Number})],st.prototype,"maxLength",void 0);Ct([N({type:Number})],st.prototype,"minLength",void 0);Ct([N({type:Number})],st.prototype,"rows",void 0);Ct([N({type:Number})],st.prototype,"cols",void 0);Ct([N()],st.prototype,"name",void 0);Ct([N()],st.prototype,"placeholder",void 0);Ct([N({type:Boolean,reflect:!0})],st.prototype,"readonly",void 0);Ct([N()],st.prototype,"resize",void 0);Ct([N({type:Boolean,reflect:!0})],st.prototype,"required",void 0);Ct([N({type:Boolean})],st.prototype,"spellcheck",void 0);Ct([N({type:Boolean,reflect:!0})],st.prototype,"monospace",void 0);Ct([N()],st.prototype,"value",null);Ct([bn("#textarea")],st.prototype,"_textareaEl",void 0);Ct([Te()],st.prototype,"_value",void 0);Ct([Te()],st.prototype,"_textareaPointerCursor",void 0);Ct([Te()],st.prototype,"_shadow",void 0);st=Ct([ze("vscode-textarea")],st);De({tagName:"vscode-textarea",elementClass:st,react:F,displayName:"VscodeTextarea",events:{onChange:"change",onInput:"input",onInvalid:"invalid"}});const cv=cc(ch()),Jw=[Be,Me`
    :host {
      display: inline-block;
      width: 320px;
    }

    .root {
      align-items: center;
      background-color: var(--vscode-settings-textInputBackground, #313131);
      border-color: var(
        --vscode-settings-textInputBorder,
        var(--vscode-settings-textInputBackground, #3c3c3c)
      );
      border-radius: 4px;
      border-style: solid;
      border-width: 1px;
      box-sizing: border-box;
      color: var(--vscode-settings-textInputForeground, #cccccc);
      display: flex;
      max-width: 100%;
      position: relative;
      width: 100%;
    }

    :host([focused]) .root {
      border-color: var(--vscode-focusBorder, #0078d4);
    }

    :host([invalid]),
    :host(:invalid) {
      border-color: var(--vscode-inputValidation-errorBorder, #be1100);
    }

    :host([invalid]) input,
    :host(:invalid) input {
      background-color: var(--vscode-inputValidation-errorBackground, #5a1d1d);
    }

    ::slotted([slot='content-before']) {
      display: block;
      margin-left: 2px;
    }

    ::slotted([slot='content-after']) {
      display: block;
      margin-right: 2px;
    }

    slot[name='content-before'],
    slot[name='content-after'] {
      align-items: center;
      display: flex;
    }

    input {
      background-color: var(--vscode-settings-textInputBackground, #313131);
      border: 0;
      box-sizing: border-box;
      color: var(--vscode-settings-textInputForeground, #cccccc);
      display: block;
      font-family: var(--vscode-font-family, ${cv});
      font-size: var(--vscode-font-size, 13px);
      font-weight: var(--vscode-font-weight, 'normal');
      line-height: 18px;
      outline: none;
      padding-bottom: 3px;
      padding-left: 4px;
      padding-right: 4px;
      padding-top: 3px;
      width: 100%;
    }

    input:read-only:not([type='file']) {
      cursor: not-allowed;
    }

    input::placeholder {
      color: var(--vscode-input-placeholderForeground, #989898);
      opacity: 1;
    }

    input[type='file'] {
      line-height: 24px;
      padding-bottom: 0;
      padding-left: 2px;
      padding-top: 0;
    }

    input[type='file']::file-selector-button {
      background-color: var(--vscode-button-background, #0078d4);
      border: 0;
      border-radius: 2px;
      color: var(--vscode-button-foreground, #ffffff);
      cursor: pointer;
      font-family: var(--vscode-font-family, ${cv});
      font-size: var(--vscode-font-size, 13px);
      font-weight: var(--vscode-font-weight, 'normal');
      line-height: 20px;
      padding: 0 14px;
    }

    input[type='file']::file-selector-button:hover {
      background-color: var(--vscode-button-hoverBackground, #026ec1);
    }
  `];var xt=function(o,n,s,l){var r=arguments.length,c=r<3?n:l===null?l=Object.getOwnPropertyDescriptor(n,s):l,f;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(o,n,s,l);else for(var p=o.length-1;p>=0;p--)(f=o[p])&&(c=(r<3?f(c):r>3?f(n,s,c):f(n,s))||c);return r>3&&c&&Object.defineProperty(n,s,c),c};let et=class extends Ie{set type(n){const s=["color","date","datetime-local","email","file","month","number","password","search","tel","text","time","url","week"];this._type=s.includes(n)?n:"text"}get type(){return this._type}set value(n){this.type!=="file"&&(this._value=n,this._internals.setFormValue(n)),this.updateComplete.then(()=>{this._setValidityFromInput()})}get value(){return this._value}set minlength(n){this.minLength=n}get minlength(){return this.minLength}set maxlength(n){this.maxLength=n}get maxlength(){return this.maxLength}get form(){return this._internals.form}get validity(){return this._internals.validity}get validationMessage(){return this._internals.validationMessage}get willValidate(){return this._internals.willValidate}checkValidity(){return this._setValidityFromInput(),this._internals.checkValidity()}reportValidity(){return this._setValidityFromInput(),this._internals.reportValidity()}get wrappedElement(){return this._inputEl}constructor(){super(),this.autocomplete=void 0,this.autofocus=!1,this.defaultValue="",this.disabled=!1,this.focused=!1,this.invalid=!1,this.label="",this.max=void 0,this.maxLength=void 0,this.min=void 0,this.minLength=void 0,this.multiple=!1,this.name=void 0,this.pattern=void 0,this.placeholder=void 0,this.readonly=!1,this.required=!1,this.step=void 0,this._value="",this._type="text",this._internals=this.attachInternals()}connectedCallback(){super.connectedCallback(),this.updateComplete.then(()=>{this._inputEl.checkValidity(),this._setValidityFromInput(),this._internals.setFormValue(this._inputEl.value)})}attributeChangedCallback(n,s,l){super.attributeChangedCallback(n,s,l),["max","maxlength","min","minlength","pattern","required","step"].includes(n)&&this.updateComplete.then(()=>{this._setValidityFromInput()})}formResetCallback(){this.value=this.defaultValue,this.requestUpdate()}formStateRestoreCallback(n,s){this.value=n}_dataChanged(){if(this._value=this._inputEl.value,this.type==="file"&&this._inputEl.files)for(const n of this._inputEl.files)this._internals.setFormValue(n);else this._internals.setFormValue(this._inputEl.value)}_setValidityFromInput(){this._inputEl&&this._internals.setValidity(this._inputEl.validity,this._inputEl.validationMessage,this._inputEl)}_onInput(){this._dataChanged(),this._setValidityFromInput()}_onChange(){this._dataChanged(),this._setValidityFromInput(),this.dispatchEvent(new Event("change"))}_onFocus(){this.focused=!0}_onBlur(){this.focused=!1}_onKeyDown(n){n.key==="Enter"&&this._internals.form&&this._internals.form?.requestSubmit()}render(){return te`
      <div class="root">
        <slot name="content-before"></slot>
        <input
          id="input"
          type=${this.type}
          ?autofocus=${this.autofocus}
          autocomplete=${Ge(this.autocomplete)}
          aria-label=${this.label}
          ?disabled=${this.disabled}
          max=${Ge(this.max)}
          maxlength=${Ge(this.maxLength)}
          min=${Ge(this.min)}
          minlength=${Ge(this.minLength)}
          ?multiple=${this.multiple}
          name=${Ge(this.name)}
          pattern=${Ge(this.pattern)}
          placeholder=${Ge(this.placeholder)}
          ?readonly=${this.readonly}
          ?required=${this.required}
          step=${Ge(this.step)}
          .value=${this._value}
          @blur=${this._onBlur}
          @change=${this._onChange}
          @focus=${this._onFocus}
          @input=${this._onInput}
          @keydown=${this._onKeyDown}
        />
        <slot name="content-after"></slot>
      </div>
    `}};et.styles=Jw;et.formAssociated=!0;et.shadowRootOptions={...gi.shadowRootOptions,delegatesFocus:!0};xt([N()],et.prototype,"autocomplete",void 0);xt([N({type:Boolean,reflect:!0})],et.prototype,"autofocus",void 0);xt([N({attribute:"default-value"})],et.prototype,"defaultValue",void 0);xt([N({type:Boolean,reflect:!0})],et.prototype,"disabled",void 0);xt([N({type:Boolean,reflect:!0})],et.prototype,"focused",void 0);xt([N({type:Boolean,reflect:!0})],et.prototype,"invalid",void 0);xt([N({attribute:!1})],et.prototype,"label",void 0);xt([N({type:Number})],et.prototype,"max",void 0);xt([N({type:Number})],et.prototype,"maxLength",void 0);xt([N({type:Number})],et.prototype,"min",void 0);xt([N({type:Number})],et.prototype,"minLength",void 0);xt([N({type:Boolean,reflect:!0})],et.prototype,"multiple",void 0);xt([N({reflect:!0})],et.prototype,"name",void 0);xt([N()],et.prototype,"pattern",void 0);xt([N()],et.prototype,"placeholder",void 0);xt([N({type:Boolean,reflect:!0})],et.prototype,"readonly",void 0);xt([N({type:Boolean,reflect:!0})],et.prototype,"required",void 0);xt([N({type:Number})],et.prototype,"step",void 0);xt([N({reflect:!0})],et.prototype,"type",null);xt([N()],et.prototype,"value",null);xt([bn("#input")],et.prototype,"_inputEl",void 0);xt([Te()],et.prototype,"_value",void 0);xt([Te()],et.prototype,"_type",void 0);et=xt([ze("vscode-textfield")],et);De({tagName:"vscode-textfield",elementClass:et,react:F,displayName:"VscodeTextfield",events:{onChange:"change",onInput:"input",onInvalid:"invalid"}});const Ww=[Be,Me`
    :host {
      display: inline-flex;
    }

    button {
      align-items: center;
      background-color: transparent;
      border: 0;
      border-radius: 5px;
      color: var(--vscode-foreground, #cccccc);
      cursor: pointer;
      display: flex;
      outline-offset: -1px;
      outline-width: 1px;
      padding: 0;
      user-select: none;
    }

    button:focus-visible {
      outline-color: var(--vscode-focusBorder, #0078d4);
      outline-style: solid;
    }

    button:hover {
      background-color: var(
        --vscode-toolbar-hoverBackground,
        rgba(90, 93, 94, 0.31)
      );
      outline-style: dashed;
      outline-color: var(--vscode-toolbar-hoverOutline, transparent);
    }

    button:active {
      background-color: var(
        --vscode-toolbar-activeBackground,
        rgba(99, 102, 103, 0.31)
      );
    }

    button.checked {
      background-color: var(
        --vscode-inputOption-activeBackground,
        rgba(36, 137, 219, 0.51)
      );
      outline-color: var(--vscode-inputOption-activeBorder, #2488db);
      outline-style: solid;
      color: var(--vscode-inputOption-activeForeground, #ffffff);
    }

    button.checked vscode-icon {
      color: var(--vscode-inputOption-activeForeground, #ffffff);
    }

    vscode-icon {
      display: block;
      padding: 3px;
    }

    slot:not(.empty) {
      align-items: center;
      display: flex;
      height: 22px;
      padding: 0 5px 0 2px;
    }

    slot.textOnly:not(.empty) {
      padding: 0 5px;
    }
  `];var da=function(o,n,s,l){var r=arguments.length,c=r<3?n:l===null?l=Object.getOwnPropertyDescriptor(n,s):l,f;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(o,n,s,l);else for(var p=o.length-1;p>=0;p--)(f=o[p])&&(c=(r<3?f(c):r>3?f(n,s,c):f(n,s))||c);return r>3&&c&&Object.defineProperty(n,s,c),c};let Ti=class extends Ie{constructor(){super(...arguments),this.icon="",this.label=void 0,this.toggleable=!1,this.checked=!1,this._isSlotEmpty=!0}_handleSlotChange(){this._isSlotEmpty=!((this._assignedNodes?.length??0)>0)}_handleButtonClick(){this.toggleable&&(this.checked=!this.checked,this.dispatchEvent(new Event("change")))}render(){const n=this.checked?"true":"false";return te`
      <button
        type="button"
        aria-label=${Ge(this.label)}
        role=${Ge(this.toggleable?"switch":void 0)}
        aria-checked=${Ge(this.toggleable?n:void 0)}
        class=${Ye({checked:this.toggleable&&this.checked})}
        @click=${this._handleButtonClick}
      >
        ${this.icon?te`<vscode-icon name=${this.icon}></vscode-icon>`:Ce}
        <slot
          @slotchange=${this._handleSlotChange}
          class=${Ye({empty:this._isSlotEmpty,textOnly:!this.icon})}
        ></slot>
      </button>
    `}};Ti.styles=Ww;da([N({reflect:!0})],Ti.prototype,"icon",void 0);da([N()],Ti.prototype,"label",void 0);da([N({type:Boolean,reflect:!0})],Ti.prototype,"toggleable",void 0);da([N({type:Boolean,reflect:!0})],Ti.prototype,"checked",void 0);da([Te()],Ti.prototype,"_isSlotEmpty",void 0);da([XS()],Ti.prototype,"_assignedNodes",void 0);Ti=da([ze("vscode-toolbar-button")],Ti);De({tagName:"vscode-toolbar-button",elementClass:Ti,react:F,displayName:"VscodeToolbarButton",events:{onChange:"change"}});const e2=[Be,Me`
    :host {
      display: block;
    }

    div {
      gap: 4px;
      display: flex;
      align-items: center;
    }
  `];var t2=function(o,n,s,l){var r=arguments.length,c=r<3?n:l===null?l=Object.getOwnPropertyDescriptor(n,s):l,f;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(o,n,s,l);else for(var p=o.length-1;p>=0;p--)(f=o[p])&&(c=(r<3?f(c):r>3?f(n,s,c):f(n,s))||c);return r>3&&c&&Object.defineProperty(n,s,c),c};let lc=class extends Ie{render(){return te`<div><slot></slot></div>`}};lc.styles=e2;lc=t2([ze("vscode-toolbar-container")],lc);De({tagName:"vscode-toolbar-container",elementClass:lc,react:F,displayName:"VscodeToolbarContainer"});let nb=class extends Event{constructor(n,s,l,r){super("context-request",{bubbles:!0,composed:!0}),this.context=n,this.contextTarget=s,this.callback=l,this.subscribe=r??!1}};let dv=class{constructor(n,s,l,r){if(this.subscribe=!1,this.provided=!1,this.value=void 0,this.t=(c,f)=>{this.unsubscribe&&(this.unsubscribe!==f&&(this.provided=!1,this.unsubscribe()),this.subscribe||this.unsubscribe()),this.value=c,this.host.requestUpdate(),this.provided&&!this.subscribe||(this.provided=!0,this.callback&&this.callback(c,f)),this.unsubscribe=f},this.host=n,s.context!==void 0){const c=s;this.context=c.context,this.callback=c.callback,this.subscribe=c.subscribe??!1}else this.context=s,this.callback=l,this.subscribe=r??!1;this.host.addController(this)}hostConnected(){this.dispatchRequest()}hostDisconnected(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=void 0)}dispatchRequest(){this.host.dispatchEvent(new nb(this.context,this.host,this.t,this.subscribe))}};class n2{get value(){return this.o}set value(n){this.setValue(n)}setValue(n,s=!1){const l=s||!Object.is(n,this.o);this.o=n,l&&this.updateObservers()}constructor(n){this.subscriptions=new Map,this.updateObservers=()=>{for(const[s,{disposer:l}]of this.subscriptions)s(this.o,l)},n!==void 0&&(this.value=n)}addCallback(n,s,l){if(!l)return void n(this.value);this.subscriptions.has(n)||this.subscriptions.set(n,{disposer:()=>{this.subscriptions.delete(n)},consumerHost:s});const{disposer:r}=this.subscriptions.get(n);n(this.value,r)}clearCallbacks(){this.subscriptions.clear()}}let i2=class extends Event{constructor(n,s){super("context-provider",{bubbles:!0,composed:!0}),this.context=n,this.contextTarget=s}};class uv extends n2{constructor(n,s,l){super(s.context!==void 0?s.initialValue:l),this.onContextRequest=r=>{if(r.context!==this.context)return;const c=r.contextTarget??r.composedPath()[0];c!==this.host&&(r.stopPropagation(),this.addCallback(r.callback,c,r.subscribe))},this.onProviderRequest=r=>{if(r.context!==this.context||(r.contextTarget??r.composedPath()[0])===this.host)return;const c=new Set;for(const[f,{consumerHost:p}]of this.subscriptions)c.has(f)||(c.add(f),p.dispatchEvent(new nb(this.context,p,f,!0)));r.stopPropagation()},this.host=n,s.context!==void 0?this.context=s.context:this.context=s,this.attachListeners(),this.host.addController?.(this)}attachListeners(){this.host.addEventListener("context-request",this.onContextRequest),this.host.addEventListener("context-provider",this.onProviderRequest)}hostConnected(){this.host.dispatchEvent(new i2(this.context,this.host))}}function ib({context:o}){return(n,s)=>{const l=new WeakMap;if(typeof s=="object")return{get(){return n.get.call(this)},set(r){return l.get(this).setValue(r),n.set.call(this,r)},init(r){return l.set(this,new uv(this,{context:o,initialValue:r})),r}};{n.constructor.addInitializer((f=>{l.set(f,new uv(f,{context:o}))}));const r=Object.getOwnPropertyDescriptor(n,s);let c;if(r===void 0){const f=new WeakMap;c={get(){return f.get(this)},set(p){l.get(this).setValue(p),f.set(this,p)},configurable:!0,enumerable:!0}}else{const f=r.set;c={...r,set(p){l.get(this).setValue(p),f?.call(this,p)}}}return void Object.defineProperty(n,s,c)}}}function sb({context:o,subscribe:n}){return(s,l)=>{typeof l=="object"?l.addInitializer((function(){new dv(this,{context:o,callback:r=>{s.set.call(this,r)},subscribe:n})})):s.constructor.addInitializer((r=>{new dv(r,{context:o,callback:c=>{r[l]=c},subscribe:n})}))}}const s2=[Be,Me`
    :host {
      --vsc-tree-item-arrow-display: flex;
      --internal-selectionBackground: var(
        --vscode-list-inactiveSelectionBackground,
        #37373d
      );
      --internal-selectionForeground: var(--vscode-foreground, #cccccc);
      --internal-selectionIconForeground: var(
        --vscode-icon-foreground,
        #cccccc
      );
      --internal-defaultIndentGuideDisplay: none;
      --internal-highlightedIndentGuideDisplay: block;

      display: block;
    }

    :host(:hover) {
      --internal-defaultIndentGuideDisplay: block;
      --internal-highlightedIndentGuideDisplay: block;
    }

    :host(:focus-within) {
      --internal-selectionBackground: var(
        --vscode-list-activeSelectionBackground,
        #04395e
      );
      --internal-selectionForeground: var(
        --vscode-list-activeSelectionForeground,
        #ffffff
      );
      --internal-selectionIconForeground: var(
        --vscode-list-activeSelectionIconForeground,
        #ffffff
      );
    }

    :host([hide-arrows]) {
      --vsc-tree-item-arrow-display: none;
    }

    :host([indent-guides='none']),
    :host([indent-guides='none']:hover) {
      --internal-defaultIndentGuideDisplay: none;
      --internal-highlightedIndentGuideDisplay: none;
    }

    :host([indent-guides='always']),
    :host([indent-guides='always']:hover) {
      --internal-defaultIndentGuideDisplay: block;
      --internal-highlightedIndentGuideDisplay: block;
    }
  `],ab="vscode-list",lb=Symbol("configContext"),Ns=o=>o instanceof Element&&o.matches("vscode-tree-item"),a2=o=>o instanceof Element&&o.matches("vscode-tree"),ob=(o,n)=>{const s=n.length,l=a2(o)?-1:o.level;"branch"in o&&(o.branch=s>0),n.forEach((r,c)=>{"path"in o?r.path=[...o.path,c]:r.path=[c],r.level=l+1,r.dataset.path=r.path.join(".")})},rb=o=>{const n=o.lastElementChild;return!n||!Ns(n)?o:n.branch&&n.open?rb(n):n},Qu=o=>{if(!o.parentElement||!Ns(o.parentElement))return null;const n=Zu(o.parentElement);return n||Qu(o.parentElement)},Zu=o=>{let n=o.nextElementSibling;for(;n&&!Ns(n);)n=n.nextElementSibling;return n},l2=o=>{const{parentElement:n}=o;if(!n||!Ns(o))return null;let s;if(o.branch&&o.open){const l=o.querySelector("vscode-tree-item");l?s=l:(s=Zu(o),s||(s=Qu(o)))}else s=Zu(o),s||(s=Qu(o));return s||o},o2=o=>{const{parentElement:n}=o;if(!n||!Ns(o))return null;let s=o.previousElementSibling;for(;s&&!Ns(s);)s=s.previousElementSibling;return!s&&Ns(n)?n:s&&s.branch&&s.open?rb(s):s};function hv(o){return!o.parentElement||!Ns(o.parentElement)?null:o.parentElement}var es=function(o,n,s,l){var r=arguments.length,c=r<3?n:l===null?l=Object.getOwnPropertyDescriptor(n,s):l,f;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(o,n,s,l);else for(var p=o.length-1;p>=0;p--)(f=o[p])&&(c=(r<3?f(c):r>3?f(n,s,c):f(n,s))||c);return r>3&&c&&Object.defineProperty(n,s,c),c};const fv={singleClick:"singleClick",doubleClick:"doubleClick"},Ju={none:"none"},r2=[" ","ArrowDown","ArrowUp","ArrowLeft","ArrowRight","Enter","Escape","Shift"];let oi=class extends Ie{constructor(){super(),this.expandMode="singleClick",this.hideArrows=!1,this.indent=8,this.indentGuides="onHover",this.multiSelect=!1,this._treeContextState={isShiftPressed:!1,activeItem:null,selectedItems:new Set,hoveredItem:null,allItems:null,itemListUpToDate:!1,focusedItem:null,prevFocusedItem:null,hasBranchItem:!1,rootElement:this,highlightedItems:new Set,highlightIndentGuides:()=>{this._highlightIndentGuides()},emitSelectEvent:()=>{this._emitSelectEvent()}},this._configContext={hideArrows:this.hideArrows,expandMode:this.expandMode,indent:this.indent,indentGuides:this.indentGuides,multiSelect:this.multiSelect},this._handleComponentKeyDown=n=>{const s=n.key;switch(r2.includes(s)&&(n.stopPropagation(),n.preventDefault()),s){case" ":case"Enter":this._handleEnterPress();break;case"ArrowDown":this._handleArrowDownPress();break;case"ArrowLeft":this._handleArrowLeftPress(n);break;case"ArrowRight":this._handleArrowRightPress();break;case"ArrowUp":this._handleArrowUpPress();break;case"Shift":this._handleShiftPress();break}},this._handleComponentKeyUp=n=>{n.key==="Shift"&&(this._treeContextState.isShiftPressed=!1)},this._handleSlotChange=()=>{this._treeContextState.itemListUpToDate=!1,ob(this,this._assignedTreeItems),this.updateComplete.then(()=>{if(this._treeContextState.activeItem===null){const n=this.querySelector(":scope > vscode-tree-item");n&&(n.active=!0)}})},this.addEventListener("keyup",this._handleComponentKeyUp),this.addEventListener("keydown",this._handleComponentKeyDown)}connectedCallback(){super.connectedCallback(),this.role="tree"}willUpdate(n){this._updateConfigContext(n),n.has("multiSelect")&&(this.ariaMultiSelectable=this.multiSelect?"true":"false")}expandAll(){this.querySelectorAll("vscode-tree-item").forEach(s=>{s.branch&&(s.open=!0)})}collapseAll(){this.querySelectorAll("vscode-tree-item").forEach(s=>{s.branch&&(s.open=!1)})}updateHasBranchItemFlag(){const n=this._assignedTreeItems.some(s=>s.branch);this._treeContextState={...this._treeContextState,hasBranchItem:n}}_emitSelectEvent(){const n=new CustomEvent("vsc-tree-select",{detail:Array.from(this._treeContextState.selectedItems)});this.dispatchEvent(n)}_highlightIndentGuideOfItem(n){if(n.branch&&n.open)n.highlightedGuides=!0,this._treeContextState.highlightedItems?.add(n);else{const s=hv(n);s&&(s.highlightedGuides=!0,this._treeContextState.highlightedItems?.add(s))}}_highlightIndentGuides(){this.indentGuides!==Ju.none&&(this._treeContextState.highlightedItems?.forEach(n=>n.highlightedGuides=!1),this._treeContextState.highlightedItems?.clear(),this._treeContextState.activeItem&&this._highlightIndentGuideOfItem(this._treeContextState.activeItem),this._treeContextState.selectedItems.forEach(n=>{this._highlightIndentGuideOfItem(n)}))}_updateConfigContext(n){const{hideArrows:s,expandMode:l,indent:r,indentGuides:c,multiSelect:f}=this;n.has("hideArrows")&&(this._configContext={...this._configContext,hideArrows:s}),n.has("expandMode")&&(this._configContext={...this._configContext,expandMode:l}),n.has("indent")&&(this._configContext={...this._configContext,indent:r}),n.has("indentGuides")&&(this._configContext={...this._configContext,indentGuides:c}),n.has("multiSelect")&&(this._configContext={...this._configContext,multiSelect:f})}_focusItem(n){n.active=!0,n.updateComplete.then(()=>{n.focus(),this._highlightIndentGuides()})}_focusPrevItem(){if(this._treeContextState.focusedItem){const n=o2(this._treeContextState.focusedItem);n&&(this._focusItem(n),this._treeContextState.isShiftPressed&&this.multiSelect&&(n.selected=!n.selected,this._emitSelectEvent()))}}_focusNextItem(){if(this._treeContextState.focusedItem){const n=l2(this._treeContextState.focusedItem);n&&(this._focusItem(n),this._treeContextState.isShiftPressed&&this.multiSelect&&(n.selected=!n.selected,this._emitSelectEvent()))}}_handleArrowRightPress(){if(!this._treeContextState.focusedItem)return;const{focusedItem:n}=this._treeContextState;n.branch&&(n.open?this._focusNextItem():n.open=!0)}_handleArrowLeftPress(n){if(n.ctrlKey){this.collapseAll();return}if(!this._treeContextState.focusedItem)return;const{focusedItem:s}=this._treeContextState,l=hv(s);s.branch?s.open?s.open=!1:l&&l.branch&&this._focusItem(l):l&&l.branch&&this._focusItem(l)}_handleArrowDownPress(){this._treeContextState.focusedItem?this._focusNextItem():this._focusItem(this._assignedTreeItems[0])}_handleArrowUpPress(){this._treeContextState.focusedItem?this._focusPrevItem():this._focusItem(this._assignedTreeItems[0])}_handleEnterPress(){const{focusedItem:n}=this._treeContextState;n&&(this._treeContextState.selectedItems.forEach(s=>s.selected=!1),this._treeContextState.selectedItems.clear(),this._highlightIndentGuides(),n.selected=!0,this._emitSelectEvent(),n.branch&&(n.open=!n.open))}_handleShiftPress(){this._treeContextState.isShiftPressed=!0}render(){return te`<div>
      <slot @slotchange=${this._handleSlotChange}></slot>
    </div>`}};oi.styles=s2;es([N({type:String,attribute:"expand-mode"})],oi.prototype,"expandMode",void 0);es([N({type:Boolean,reflect:!0,attribute:"hide-arrows"})],oi.prototype,"hideArrows",void 0);es([N({type:Number,reflect:!0})],oi.prototype,"indent",void 0);es([N({type:String,attribute:"indent-guides",useDefault:!0,reflect:!0})],oi.prototype,"indentGuides",void 0);es([N({type:Boolean,reflect:!0,attribute:"multi-select"})],oi.prototype,"multiSelect",void 0);es([ib({context:ab})],oi.prototype,"_treeContextState",void 0);es([ib({context:lb})],oi.prototype,"_configContext",void 0);es([hn({selector:"vscode-tree-item"})],oi.prototype,"_assignedTreeItems",void 0);oi=es([ze("vscode-tree")],oi);De({tagName:"vscode-tree",elementClass:oi,react:F,displayName:"VscodeTree",events:{onVscTreeSelect:"vsc-tree-select"}});const c2=[Be,Me`
    :host {
      --hover-outline-color: transparent;
      --hover-outline-style: solid;
      --hover-outline-width: 0;

      --selected-outline-color: transparent;
      --selected-outline-style: solid;
      --selected-outline-width: 0;

      cursor: pointer;
      display: block;
      user-select: none;
    }

    ::slotted(vscode-icon) {
      display: block;
    }

    .root {
      display: block;
    }

    .wrapper {
      align-items: flex-start;
      color: var(--vscode-foreground, #cccccc);
      display: flex;
      flex-wrap: nowrap;
      font-family: var(--vscode-font-family, sans-serif);
      font-size: var(--vscode-font-size, 13px);
      font-weight: var(--vscode-font-weight, normal);
      line-height: 22px;
      min-height: 22px;
      outline-offset: -1px;
      padding-right: 12px;
    }

    .wrapper:hover {
      background-color: var(--vscode-list-hoverBackground, #2a2d2e);
      color: var(
        --vscode-list-hoverForeground,
        var(--vscode-foreground, #cccccc)
      );
    }

    :host([selected]) .wrapper {
      color: var(--internal-selectionForeground);
      background-color: var(--internal-selectionBackground);
    }

    :host([selected]) ::slotted(vscode-icon) {
      color: var(--internal-selectionForeground);
    }

    :host(:focus) {
      outline: none;
    }

    :host(:focus) .wrapper.active {
      outline-color: var(
        --vscode-list-focusAndSelectionOutline,
        var(--vscode-list-focusOutline, #0078d4)
      );
      outline-style: solid;
      outline-width: 1px;
    }

    .arrow-container {
      align-items: center;
      display: var(--vsc-tree-item-arrow-display);
      height: 22px;
      justify-content: center;
      padding-left: 8px;
      padding-right: 6px;
      width: 16px;
    }

    .arrow-container svg {
      display: block;
      fill: var(--vscode-icon-foreground, #cccccc);
    }

    .arrow-container.icon-rotated svg {
      transform: rotate(90deg);
    }

    :host([selected]) .arrow-container svg {
      fill: var(--internal-selectionIconForeground);
    }

    .icon-container {
      align-items: center;
      display: flex;
      justify-content: center;
      margin-right: 3px;
      min-height: 22px;
      overflow: hidden;
    }

    .icon-container slot {
      display: block;
    }

    .icon-container.has-icon {
      min-width: 22px;
      max-width: 22px;
      max-height: 22px;
    }

    :host(:is(:--show-actions, :state(show-actions))) .icon-container {
      overflow: visible;
    }

    .children {
      position: relative;
    }

    .children.guide:before {
      background-color: var(
        --vscode-tree-inactiveIndentGuidesStroke,
        rgba(88, 88, 88, 0.4)
      );
      content: '';
      display: none;
      height: 100%;
      left: var(--indentation-guide-left);
      pointer-events: none;
      position: absolute;
      width: 1px;
      z-index: 1;
    }

    .children.guide.default-guide:before {
      display: var(--internal-defaultIndentGuideDisplay);
    }

    .children.guide.highlighted-guide:before {
      display: var(--internal-highlightedIndentGuideDisplay);
      background-color: var(--vscode-tree-indentGuidesStroke, #585858);
    }

    .content {
      display: flex;
      align-items: center;
      flex-wrap: nowrap; 
      min-width: 0;
      width: 100%;
      line-height: 22px;
    }

    .label {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      flex: 0 1 auto;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .description {
      color: var(--vscode-foreground, #cccccc);
      opacity: 0.7;
      display: none;
      flex: 0 1 auto;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .content.has-description .description {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex: 1 1 0%; 
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-left: 0.5em;
    }

    .content.has-description .label {
      flex: 0 1 auto; 
    }

    .content:not(.has-description) .label {
      flex: 1 1 auto;
    }

    .label ::slotted(*) {
      display: inline-block;
      max-width: 100%;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .description ::slotted(*) {
      display: inline-block;
      max-width: 100%;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .actions {
      align-items: center;
      align-self: center;
      display: none;
      flex: 0 0 auto;
      gap: 2px;
      margin-left: auto;
      min-height: 22px;
      color: inherit;
    }

    .actions ::slotted(*) {
      align-items: center;
      display: inline-flex;
      height: 22px;
    }

    .actions ::slotted(button) {
      cursor: pointer;
    }

    .actions ::slotted([hidden]) {
      display: none !important;
    }

    :host(
        :is(
          :--has-actions:--show-actions,
          :--has-actions:state(show-actions),
          :state(has-actions):--show-actions,
          :state(has-actions):state(show-actions)
        )
      )
      .actions {
      display: inline-flex;
    }

    .decoration {
      align-items: center;
      align-self: center;
      color: inherit;
      display: none;
      flex: 0 0 auto;
      gap: 4px;
      margin-left: auto;
      min-height: 22px;
    }

    :host(:is(:--has-decoration, :state(has-decoration))) .decoration {
      display: inline-flex;
    }

    :host(:is(:--show-actions, :state(show-actions))) .decoration {
      margin-left: 6px;
    }

    :host([selected]) ::slotted([slot='decoration']),
    :host([selected]) ::slotted([slot='decoration']) * {
      color: inherit !important;
    }

    :host([selected]) .description {
      color: var(--internal-selectionForeground, #ffffff);
      opacity: 0.8;
    }

    :host([selected]) :is(:state(focus-visible), :--focus-visible) .description,
    :host([selected]:focus-within) .description {
      opacity: 0.95;
    }

    :host([branch]) ::slotted(vscode-tree-item) {
      display: none;
    }

    :host([branch][open]) ::slotted(vscode-tree-item) {
      display: block;
    }
  `];var Mt=function(o,n,s,l){var r=arguments.length,c=r<3?n:l===null?l=Object.getOwnPropertyDescriptor(n,s):l,f;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(o,n,s,l);else for(var p=o.length-1;p>=0;p--)(f=o[p])&&(c=(r<3?f(c):r>3?f(n,s,c):f(n,s))||c);return r>3&&c&&Object.defineProperty(n,s,c),c},Wu;const pv=3,d2=30,u2=te`<svg
  width="16"
  height="16"
  viewBox="0 0 16 16"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M10.072 8.024L5.715 3.667l.618-.62L11 7.716v.618L6.333 13l-.618-.619 4.357-4.357z"
  />
</svg>`;function h2(o){return!o.parentElement||!(o.parentElement instanceof ct)?null:o.parentElement}let ct=Wu=class extends Ie{set selected(n){this._selected=n,n?this._treeContextState.selectedItems.add(this):this._treeContextState.selectedItems.delete(this),this.ariaSelected=n?"true":"false",this._updateActionsVisibility()}get selected(){return this._selected}set path(n){this._path=n}get path(){return this._path}constructor(){super(),this.active=!1,this.branch=!1,this.hasActiveItem=!1,this.hasSelectedItem=!1,this.highlightedGuides=!1,this.open=!1,this.level=0,this._selected=!1,this._path=[],this._hasBranchIcon=!1,this._hasBranchOpenedIcon=!1,this._hasLeafIcon=!1,this._hasDescriptionSlotContent=!1,this._hasActionsSlotContent=!1,this._hasDecorationSlotContent=!1,this._treeContextState={isShiftPressed:!1,selectedItems:new Set,hoveredItem:null,allItems:null,itemListUpToDate:!1,focusedItem:null,prevFocusedItem:null,hasBranchItem:!1,rootElement:null,activeItem:null},this._isPointerInside=!1,this._hasKeyboardFocus=!1,this._handleMainSlotChange=()=>{this._mainSlotChange(),this._treeContextState.itemListUpToDate=!1},this._handleComponentFocus=()=>{this._treeContextState.focusedItem&&this._treeContextState.focusedItem!==this&&(this._treeContextState.isShiftPressed||(this._treeContextState.prevFocusedItem=this._treeContextState.focusedItem),this._treeContextState.focusedItem=null),this._treeContextState.focusedItem=this},this._handlePointerEnter=()=>{this._isPointerInside=!0,this._claimHover()},this._handlePointerLeave=n=>{this._isPointerInside=!1,this._treeContextState.hoveredItem===this&&(this._treeContextState.hoveredItem=null),this._clearHoverState();const s=n.relatedTarget;if(s instanceof Element){const l=s.closest("vscode-tree-item");l&&l!==this&&l.isConnected&&l._adoptHoverFromSibling()}},this._handleFocusIn=()=>{this._updateFocusState()},this._handleFocusOut=()=>{this._updateFocusState()},this._internals=this.attachInternals(),this.addEventListener("focus",this._handleComponentFocus),this.addEventListener("pointerenter",this._handlePointerEnter),this.addEventListener("pointerleave",this._handlePointerLeave),this.addEventListener("focusin",this._handleFocusIn),this.addEventListener("focusout",this._handleFocusOut)}connectedCallback(){super.connectedCallback(),this._mainSlotChange(),this.role="treeitem",this.ariaDisabled="false"}firstUpdated(n){super.firstUpdated(n),this._refreshDescriptionSlotState(),this._refreshActionsSlotState(),this._refreshDecorationSlotState(),this.matches(":hover")?(this._isPointerInside=!0,this._claimHover()):this._updateActionsVisibility()}willUpdate(n){n.has("active")&&this._toggleActiveState(),(n.has("open")||n.has("branch"))&&this._setAriaExpanded()}_setAriaExpanded(){this.branch?this.ariaExpanded=this.open?"true":"false":this.ariaExpanded=null}_setHasActiveItemFlagOnParent(n,s){const l=h2(n);l&&(l.hasActiveItem=s)}_refreshDescriptionSlotState(){const n=(this._descriptionSlotElements?.length??0)>0;this._hasDescriptionSlotContent=n,this._setCustomState("has-description",n)}_refreshActionsSlotState(){const n=(this._actionsSlotElements?.length??0)>0;this._hasActionsSlotContent=n,this._setCustomState("has-actions",n),this._updateActionsVisibility()}_refreshDecorationSlotState(){const n=(this._decorationSlotElements?.length??0)>0,s=this._hasDecorationSlotContent;this._hasDecorationSlotContent=n,this._setCustomState("has-decoration",n),s!==n&&this.requestUpdate()}_setCustomState(n,s){if(this._internals?.states)try{s?this._internals.states.add(n):this._internals.states.delete(n)}catch{s?this._internals.states.add(`--${n}`):this._internals.states.delete(`--${n}`)}}_getActiveElement(){const n=this.getRootNode({composed:!0});return(n instanceof Document||n instanceof ShadowRoot)&&n.activeElement instanceof Element?n.activeElement:null}_isActiveElementInActions(n){return n?(this._actionsSlotElements??[]).some(s=>s===n||s.contains(n)):!1}_updateActionsVisibility(){if(!this._hasActionsSlotContent){this._setCustomState("show-actions",!1);return}const n=this._getActiveElement(),s=this._isActiveElementInActions(n),l=this.selected||this._isPointerInside||this._hasKeyboardFocus||s;this._setCustomState("show-actions",l)}_updateFocusState(){const n=this.matches(":focus-visible");this._setCustomState("focus-visible",n);const s=this._getActiveElement();let l=null;if(s instanceof Element&&(l=s.closest("vscode-tree-item"),!l)){const c=s.getRootNode();c instanceof ShadowRoot&&c.host instanceof Wu&&(l=c.host)}const r=l===this;this._hasKeyboardFocus=r,this._setCustomState("keyboard-focus",r),this._updateActionsVisibility()}_clearHoverState(){this._isPointerInside=!1,this._setCustomState("hover",!1),this._updateActionsVisibility()}_adoptHoverFromSibling(){this._isPointerInside=!0,this._claimHover()}_claimHover(){const n=this._treeContextState;n.hoveredItem&&n.hoveredItem!==this&&n.hoveredItem._clearHoverState(),n.hoveredItem=this,this._setCustomState("hover",!0),this._updateActionsVisibility()}_toggleActiveState(){this.active?(this._treeContextState.activeItem&&(this._treeContextState.activeItem.active=!1,this._setHasActiveItemFlagOnParent(this._treeContextState.activeItem,!1)),this._treeContextState.activeItem=this,this._setHasActiveItemFlagOnParent(this,!0),this.tabIndex=0,this._setCustomState("active",!0)):(this._treeContextState.activeItem===this&&(this._treeContextState.activeItem=null,this._setHasActiveItemFlagOnParent(this,!1)),this.tabIndex=-1,this._setCustomState("active",!1))}_selectItem(n){const{selectedItems:s}=this._treeContextState,{multiSelect:l}=this._configContext,r=new Set(s);l&&n?this.selected=!this.selected:(Array.from(s).forEach(f=>{f!==this&&(f.selected=!1)}),s.clear(),this.selected=!0);const c=new Set([...r,...s]);c.add(this),c.forEach(f=>f._updateActionsVisibility())}_selectRange(){const n=this._treeContextState.prevFocusedItem;if(!n||n===this)return;const s=new Set(this._treeContextState.selectedItems);this._treeContextState.itemListUpToDate||(this._treeContextState.allItems=this._treeContextState.rootElement.querySelectorAll("vscode-tree-item"),this._treeContextState.allItems&&this._treeContextState.allItems.forEach((f,p)=>{f.dataset.score=p.toString()}),this._treeContextState.itemListUpToDate=!0);let l=+(n.dataset.score??-1),r=+(this.dataset.score??-1);l>r&&([l,r]=[r,l]),Array.from(this._treeContextState.selectedItems).forEach(f=>f.selected=!1),this._treeContextState.selectedItems.clear(),this._selectItemsAndAllVisibleDescendants(l,r);const c=new Set([...s,...this._treeContextState.selectedItems]);c.add(this),c.forEach(f=>f._updateActionsVisibility())}_selectItemsAndAllVisibleDescendants(n,s){let l=n;for(;l<=s;)if(this._treeContextState.allItems){const r=this._treeContextState.allItems[l];if(r.branch&&!r.open){r.selected=!0;const c=r.querySelectorAll("vscode-tree-item").length;l+=c}else r.branch&&r.open?(r.selected=!0,l+=this._selectItemsAndAllVisibleDescendants(l+1,s)):(r.selected=!0,l+=1)}return l}_mainSlotChange(){this._initiallyAssignedTreeItems.forEach(n=>{n.setAttribute("slot","children")})}_handleChildrenSlotChange(){ob(this,this._childrenTreeItems),this._treeContextState.rootElement&&this._treeContextState.rootElement.updateHasBranchItemFlag()}_handleDescriptionSlotChange(){this._refreshDescriptionSlotState()}_handleActionsSlotChange(){this._refreshActionsSlotState()}_handleDecorationSlotChange(){this._refreshDecorationSlotState()}_handleContentClick(n){n.stopPropagation();const s=n.ctrlKey||n.metaKey,l=n.shiftKey;l&&this._configContext.multiSelect?(this._selectRange(),this._treeContextState.emitSelectEvent?.(),this.updateComplete.then(()=>{this._treeContextState.highlightIndentGuides?.()})):(this._selectItem(s),this._treeContextState.emitSelectEvent?.(),this.updateComplete.then(()=>{this._treeContextState.highlightIndentGuides?.()}),this._configContext.expandMode===fv.singleClick&&this.branch&&!(this._configContext.multiSelect&&s)&&(this.open=!this.open)),this.active=!0,l||(this._treeContextState.prevFocusedItem=this)}_handleDoubleClick(n){this._configContext.expandMode===fv.doubleClick&&this.branch&&!(this._configContext.multiSelect&&(n.ctrlKey||n.metaKey))&&(this.open=!this.open)}_handleIconSlotChange(n){const s=n.target,l=s.assignedElements().length>0;switch(s.name){case"icon-branch":this._hasBranchIcon=l;break;case"icon-branch-opened":this._hasBranchOpenedIcon=l;break;case"icon-leaf":this._hasLeafIcon=l;break}}render(){const{hideArrows:n,indent:s,indentGuides:l}=this._configContext,{hasBranchItem:r}=this._treeContextState;let c=pv+this.level*s;const f=n?3:13,p=pv+this.level*s+f;!this.branch&&!n&&r&&(c+=d2);const b=this._hasBranchIcon&&this.branch||this._hasBranchOpenedIcon&&this.branch&&this.open||this._hasLeafIcon&&!this.branch,g={wrapper:!0,active:this.active,"has-description":this._hasDescriptionSlotContent,"has-actions":this._hasActionsSlotContent,"has-decoration":this._hasDecorationSlotContent},_={children:!0,guide:l!==Ju.none,"default-guide":l!==Ju.none,"highlighted-guide":this.highlightedGuides},v={"icon-container":!0,"has-icon":b},k={content:!0,"has-description":this._hasDescriptionSlotContent,"has-decoration":this._hasDecorationSlotContent};return te` <div class="root">
      <div
        class=${Ye(g)}
        part="wrapper"
        @click=${this._handleContentClick}
        @dblclick=${this._handleDoubleClick}
        .style=${Cn({paddingLeft:`${c}px`})}
      >
        ${this.branch&&!n?te`<div
              class=${Ye({"arrow-container":!0,"icon-rotated":this.open})}
              part="arrow-icon-container"
            >
              ${u2}
            </div>`:Ce}
        <div class=${Ye(v)} part="icon-container">
          ${this.branch&&!this.open?te`<slot
                name="icon-branch"
                @slotchange=${this._handleIconSlotChange}
              ></slot>`:Ce}
          ${this.branch&&this.open?te`<slot
                name="icon-branch-opened"
                @slotchange=${this._handleIconSlotChange}
              ></slot>`:Ce}
          ${this.branch?Ce:te`<slot
                name="icon-leaf"
                @slotchange=${this._handleIconSlotChange}
              ></slot>`}
        </div>
        <div class=${Ye(k)} part="content">
          <span class="label" part="label">
            <slot @slotchange=${this._handleMainSlotChange}></slot>
          </span>
          <span
            class="description"
            part="description"
            ?hidden=${!this._hasDescriptionSlotContent}
          >
            <slot
              name="description"
              @slotchange=${this._handleDescriptionSlotChange}
            ></slot>
          </span>
          <div class="actions" part="actions">
            <slot
              name="actions"
              @slotchange=${this._handleActionsSlotChange}
            ></slot>
          </div>
          <div class="decoration" part="decoration">
            <slot
              name="decoration"
              @slotchange=${this._handleDecorationSlotChange}
            ></slot>
          </div>
        </div>
      </div>
      <div
        class=${Ye(_)}
        .style=${Cn({"--indentation-guide-left":`${p}px`})}
        role="group"
        part="children"
      >
        <slot
          name="children"
          @slotchange=${this._handleChildrenSlotChange}
        ></slot>
      </div>
    </div>`}};ct.styles=c2;Mt([N({type:Boolean})],ct.prototype,"active",void 0);Mt([N({type:Boolean,reflect:!0})],ct.prototype,"branch",void 0);Mt([N({type:Boolean})],ct.prototype,"hasActiveItem",void 0);Mt([N({type:Boolean})],ct.prototype,"hasSelectedItem",void 0);Mt([N({type:Boolean})],ct.prototype,"highlightedGuides",void 0);Mt([N({type:Boolean,reflect:!0})],ct.prototype,"open",void 0);Mt([N({type:Number,reflect:!0})],ct.prototype,"level",void 0);Mt([N({type:Boolean,reflect:!0})],ct.prototype,"selected",null);Mt([Te()],ct.prototype,"_hasBranchIcon",void 0);Mt([Te()],ct.prototype,"_hasBranchOpenedIcon",void 0);Mt([Te()],ct.prototype,"_hasLeafIcon",void 0);Mt([Te()],ct.prototype,"_hasDescriptionSlotContent",void 0);Mt([Te()],ct.prototype,"_hasActionsSlotContent",void 0);Mt([Te()],ct.prototype,"_hasDecorationSlotContent",void 0);Mt([sb({context:ab,subscribe:!0})],ct.prototype,"_treeContextState",void 0);Mt([sb({context:lb,subscribe:!0})],ct.prototype,"_configContext",void 0);Mt([hn({selector:"vscode-tree-item"})],ct.prototype,"_initiallyAssignedTreeItems",void 0);Mt([hn({selector:"vscode-tree-item",slot:"children"})],ct.prototype,"_childrenTreeItems",void 0);Mt([hn({slot:"description",flatten:!0})],ct.prototype,"_descriptionSlotElements",void 0);Mt([hn({slot:"actions",flatten:!0})],ct.prototype,"_actionsSlotElements",void 0);Mt([hn({slot:"decoration",flatten:!0})],ct.prototype,"_decorationSlotElements",void 0);ct=Wu=Mt([ze("vscode-tree-item")],ct);De({tagName:"vscode-tree-item",elementClass:ct,react:F,displayName:"VscodeTreeItem"});const f2=()=>{const{t:o}=tn(),{state:n,sendToExtAsync:s,initialized:l}=ri(),r=n.viewingTab==="local",c=n.viewingTab==="pool",f=n.activeSource==="pool"&&n.poolState==="active",p=n.accounts,[b,g]=x.useState(!1),_=x.useRef(!1),[v,k]=x.useState(!1),E=x.useRef(!1),[O,V]=x.useState(null),[se,ee]=x.useState(!1),oe=x.useRef(!1),[ae,de]=x.useState(()=>{try{return localStorage.getItem("ag.accounts.collapsed")==="1"}catch{return!1}}),J=x.useCallback(()=>{de(W=>{const Q=!W;try{localStorage.setItem("ag.accounts.collapsed",Q?"1":"0")}catch{}return Q})},[]),$=x.useCallback(async()=>{if(!_.current){_.current=!0,g(!0);try{await s("addAccount")}catch(W){W?.message}finally{_.current=!1,g(!1)}}},[s]),S=x.useCallback(async()=>{try{await s("cancelAddAccount")}catch{}},[s]),I=x.useCallback(async()=>{if(!E.current){E.current=!0,k(!0);try{r||await s("syncRemoteAccounts");let W;if(n.viewingTab===n.activeSource?W=(await s("listAccountsWithQuota"))?.accounts||[]:W=(await s("listAccountsForSource",{source:n.viewingTab}))?.accounts||[],r&&W.length>0){for(const Q of W)if(Q.status!=="excluded")try{V(Q.id),await s("refreshAccount",{id:Q.id,source:"local"})}catch{}V(null)}}catch{}finally{E.current=!1,k(!1)}}},[s,r,n.viewingTab,n.activeSource]),z=x.useCallback(async()=>{if(!oe.current){oe.current=!0,ee(!0);try{f?await s("switchMode",{mode:"static"}):await s("switchMode",{mode:"pool"})}catch{}finally{oe.current=!1,ee(!1)}}},[s,f]);return l?d.jsxs("div",{className:"section",style:{marginBottom:"16px"},children:[d.jsxs("div",{className:"title-actions",children:[d.jsxs("div",{className:"section-title",style:{marginBottom:0,cursor:"pointer",userSelect:"none"},onClick:J,children:[d.jsx("span",{style:{display:"inline-block",width:"12px",fontSize:"10px",opacity:.7},children:ae?"▶":"▼"})," ",c?o("accounts.titlePool","Pool Account"):o(r?"accounts.title":"accounts.titleAssigned"),p.length>0&&d.jsxs("span",{style:{opacity:.5,fontWeight:400,marginLeft:"6px"},children:["(",p.length,")"]})]}),!ae&&d.jsx("div",{style:{marginLeft:"auto",opacity:v?1:.6,cursor:v?"wait":"pointer"},onClick:I,"data-tip":v?o("accounts.syncing"):r?o("accounts.refresh","Refresh"):o("accounts.syncRemote"),"data-tip-pos":"below",children:v?d.jsx("span",{className:"btn-spinner"}):d.jsx("svg",{viewBox:"0 0 16 16",width:"16",height:"16",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round",children:d.jsx("path",{d:"M13.5 2v4h-4l1.6-1.6A4.5 4.5 0 0 0 3.5 8a4.5 4.5 0 0 0 4.5 4.5A4.5 4.5 0 0 0 12.1 10h1.1A5.5 5.5 0 0 1 8 13.5 5.5 5.5 0 0 1 2.5 8 5.5 5.5 0 0 1 8 2.5c1.4 0 2.7.5 3.7 1.5L13.5 2z"})})})]}),!ae&&d.jsxs(d.Fragment,{children:[c&&d.jsxs("div",{style:{marginTop:"8px",marginBottom:"8px"},children:[d.jsx(Es,{style:{width:"100%"},onClick:z,disabled:se,children:se?d.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:"8px"},children:[d.jsx("span",{className:"btn-spinner"})," ",f?o("pool.disabling","Disabling..."):o("pool.enabling","Enabling...")]}):f?o("pool.disable","⏹ Disable Pool"):o("pool.enable","▶ Enable Pool")}),n.poolState==="stopped"&&n.poolDenied&&d.jsxs("div",{style:{marginTop:"8px",padding:"8px 12px",borderRadius:"4px",backgroundColor:"var(--vscode-inputValidation-warningBackground, rgba(255,204,0,0.1))",border:"1px solid var(--vscode-inputValidation-warningBorder, #ffcc00)",fontSize:"0.85em",color:"var(--vscode-foreground)"},children:["⚠️ ",n.poolDenied.message||n.poolDenied.reason]})]}),d.jsx("div",{id:"accountList",children:!p||p.length===0?d.jsx("div",{style:{color:"var(--vscode-descriptionForeground)",textAlign:"center",padding:"20px",fontSize:"0.9em"},children:c?f?o("pool.acquiring","Acquiring pool account..."):o("pool.notEnabled",'Pool is not enabled. Click "Enable Pool" to start.'):o(r?"accounts.noLocalAccounts":"accounts.noAssignedAccounts")}):p.map((W,Q)=>d.jsx(_S,{account:W,isFirst:Q===0,isLast:Q===p.length-1,prevId:Q>0?p[Q-1].id:0,nextId:Q<p.length-1?p[Q+1].id:0,externalRefreshing:O===W.id},W.id))}),r&&(b?d.jsxs("div",{style:{display:"flex",gap:"6px",marginTop:"12px"},children:[d.jsx(Es,{style:{flex:1},disabled:!0,title:o("accounts.waitingOAuth"),children:d.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:"8px"},children:[d.jsx("span",{className:"btn-spinner"})," ",o("accounts.addingAccount")]})}),d.jsx(Es,{style:{flexShrink:0},onClick:S,title:o("accounts.cancelAddAccount"),children:o("common.cancel")})]}):d.jsx(Es,{style:{width:"100%",marginTop:"12px"},onClick:$,title:o("accounts.addAccountTip"),children:o("accounts.addAccount")}))]})]}):d.jsxs("div",{className:"init-overlay",children:[d.jsx("div",{className:"init-spinner"}),o("accounts.initializing")]})},p2=[0,20,40,60,80],m2=[3,2,4],g2=[5,10,15,20,30],v2=()=>{const{t:o,i18n:n}=tn(),{state:s,sendToExtAsync:l,initialized:r,setShowRemoteModes:c}=ri(),{enabled:f,currentEmail:p,activeFamily:b,quotaSettings:g,quotaThreshold:_,viewingTab:v,proxyPort:k}=s,E=v==="local",[O,V]=x.useState(!0),[se,ee]=x.useState(!1),oe=x.useRef(!1),[ae,de]=x.useState(null),J=x.useRef(!1),[$,S]=x.useState(!1),I=x.useRef(!1),[z,W]=x.useState(!1),Q=x.useRef(!1),[ue,ce]=x.useState(!1),pe=x.useRef(!1),[ne,A]=x.useState(!1),Y=x.useRef(!1),[le,ve]=x.useState(s.openaiEmail||""),be=x.useRef(null),[w,H]=x.useState(!1),U=x.useCallback(async ie=>{if(s.networkMode!==ie)try{await l("setNetworkMode",{mode:ie})}catch{}},[s.networkMode,l]),Z=x.useCallback(async ie=>{if(oe.current)return;oe.current=!0;const Et=ie.target.checked;ee(!0);try{await l(Et?"enable":"disable")}catch{}finally{oe.current=!1,ee(!1)}},[l]),re=x.useCallback(async ie=>{if(!J.current&&ie!==b){J.current=!0,de(ie);try{await l("setActiveModelFamily",{family:ie})}catch{}finally{J.current=!1,de(null)}}},[b,l]),me=x.useCallback(async ie=>{if(!Q.current&&ie!==_){Q.current=!0,W(!0);try{await l("setQuotaThreshold",{threshold:ie})}catch{}finally{Q.current=!1,W(!1)}}},[_,l]),_e=x.useCallback(async(ie,Et)=>{if(!I.current){I.current=!0,S(!0);try{await l("setQuotaSettings",{[ie]:Et})}catch{}finally{I.current=!1,S(!1)}}},[l]),ye=x.useCallback(ie=>{n.changeLanguage(ie)},[n]),Ae=x.useCallback(async ie=>{if(!pe.current){pe.current=!0,ce(!0);try{await l("setNetworkEnhance",{enabled:ie.target.checked})}catch{}finally{pe.current=!1,ce(!1)}}},[l]),zt=x.useCallback(async ie=>{if(!Y.current){Y.current=!0,A(!0);try{await l("setOpenAI",{enabled:ie.target.checked})}catch{}finally{Y.current=!1,A(!1)}}},[l]),Ft=x.useCallback(ie=>{const Et=ie.target.value;ve(Et),be.current&&clearTimeout(be.current),be.current=setTimeout(()=>{l("setOpenAI",{email:Et})},800)},[l]);x.useEffect(()=>{ve(s.openaiEmail||"")},[s.openaiEmail]);const Vt=x.useCallback(()=>{const ie=`http://127.0.0.1:${k}/v1/chat/completions`;navigator.clipboard.writeText(ie),H(!0),setTimeout(()=>H(!1),1500)},[k]),pn=x.useCallback(async ie=>{if(s.maxRetries!==ie)try{await l("setMaxRetries",{maxRetries:ie})}catch{}},[s.maxRetries,l]),$t=ie=>n.language==="zh-CN"?ie===2?"极速":ie===3?"稳定":"兜底":ie===2?"Fast":ie===3?"Stable":"Fallback";return r?d.jsxs("div",{className:"settings-panel",children:[d.jsxs("button",{className:"settings-toggle",onClick:()=>V(!O),children:[d.jsx("span",{className:"settings-toggle-label",children:o("settings.title")}),d.jsx("span",{className:`settings-chevron ${O?"expanded":""}`,children:O?d.jsx(th,{}):d.jsx(nh,{})})]}),O&&d.jsxs("div",{className:"settings-content",children:[d.jsxs("div",{className:"settings-group",children:[d.jsxs("div",{className:"settings-row",children:[d.jsxs("div",{children:[d.jsx("div",{className:"settings-group-title",children:o("settings.networkEnhance")}),d.jsx("div",{className:"settings-group-desc",children:s.networkEnhance?o("settings.networkEnhanceOn"):o("settings.networkEnhanceOff")})]}),d.jsxs("label",{className:`switch switch-sm ${ue?"switch-busy":""}`,"data-tip-pos":"below","data-tip-align":"right",children:[d.jsx("input",{type:"checkbox",checked:s.networkEnhance,onChange:Ae,disabled:ue}),d.jsx("span",{className:"slider"})]})]}),s.networkEnhance&&d.jsxs("div",{className:"settings-row settings-sub-row",style:{flexDirection:"column",alignItems:"stretch"},children:[d.jsx("div",{className:"settings-seg-row",style:{marginTop:0,gap:"4px"},children:m2.map(ie=>d.jsx("button",{className:`seg-btn ${s.networkMode===ie?"seg-active":""}`,onClick:()=>U(ie),style:{flex:1,padding:"4px 0"},children:$t(ie)},ie))}),d.jsxs("div",{style:{marginTop:"8px"},children:[d.jsx("div",{className:"settings-group-desc",style:{marginBottom:"4px"},children:o("settings.maxRetries")}),d.jsx("div",{className:"settings-seg-row",style:{gap:"4px"},children:g2.map(ie=>d.jsx("button",{className:`seg-btn ${s.maxRetries===ie?"seg-active":""}`,onClick:()=>pn(ie),style:{flex:1,padding:"4px 0"},children:ie},ie))})]})]})]}),s.devMode&&d.jsxs("div",{className:"settings-group",children:[d.jsxs("div",{className:"settings-row",children:[d.jsxs("div",{children:[d.jsx("div",{className:"settings-group-title",children:o("settings.openaiProxy")}),d.jsx("div",{className:"settings-group-desc",children:s.openaiEnabled?o("settings.openaiProxyOn",{port:k}):o("settings.openaiProxyOff")})]}),d.jsxs("label",{className:`switch switch-sm ${ne?"switch-busy":""}`,"data-tip-pos":"below","data-tip-align":"right",children:[d.jsx("input",{type:"checkbox",checked:s.openaiEnabled,onChange:zt,disabled:ne}),d.jsx("span",{className:"slider"})]})]}),s.openaiEnabled&&d.jsxs("div",{className:"settings-row settings-sub-row",style:{flexDirection:"column",alignItems:"stretch"},children:[d.jsx("div",{className:"settings-group-desc",style:{marginBottom:"4px"},children:o("settings.openaiEmail")}),d.jsx("input",{type:"email",className:"settings-input",value:le,onChange:Ft,placeholder:o("settings.openaiEmailPlaceholder")}),d.jsx("div",{className:"settings-group-desc",style:{marginTop:"4px",fontSize:"11px",opacity:.7},children:o("settings.openaiEmailHint")}),d.jsxs("div",{style:{marginTop:"8px"},children:[d.jsx("div",{className:"settings-group-desc",style:{marginBottom:"4px"},children:o("settings.openaiEndpoint")}),d.jsxs("div",{className:"settings-endpoint-row",children:[d.jsxs("code",{className:"settings-endpoint-url",children:["http://127.0.0.1:",k,"/v1/chat/completions"]}),d.jsx("button",{className:"settings-copy-btn",onClick:Vt,children:w?o("settings.openaiCopied"):"📋"})]})]}),s.openaiModels.length>0&&d.jsxs("div",{style:{marginTop:"10px"},children:[d.jsx("div",{className:"settings-group-desc",style:{marginBottom:"6px"},children:o("settings.openaiModels")}),d.jsx("div",{className:"openai-models-list",children:s.openaiModels.map(ie=>d.jsx("div",{className:"openai-model-item",children:d.jsx("code",{className:"openai-model-id",children:ie.id})},ie.id))})]})]})]}),E&&d.jsxs("div",{className:"settings-group",children:[d.jsxs("div",{className:"settings-row",children:[d.jsxs("div",{children:[d.jsx("div",{className:"settings-group-title",children:o("settings.accountRotation")}),d.jsx("div",{className:"settings-group-desc",children:se?o(f?"settings.stoppingRotation":"settings.startingRotation"):f?p?o("settings.activeAccount",{email:p}):o("settings.activePool"):o("settings.offDefault")})]}),d.jsxs("label",{className:`switch switch-sm ${se?"switch-busy":""}`,"data-tip":o(se?"common.processing":f?"settings.disable":"settings.enable"),"data-tip-pos":"below","data-tip-align":"right",children:[d.jsx("input",{type:"checkbox",checked:f,onChange:Z,disabled:se}),d.jsx("span",{className:"slider"})]})]}),d.jsxs("div",{className:"settings-group-inner",children:[d.jsx("div",{className:"settings-group-title",children:o("settings.rotationBenchmark")}),d.jsx("div",{className:"settings-group-desc",children:o("settings.benchmarkDesc")}),d.jsx("div",{className:"settings-seg-row",children:["claude","flash","pro"].map(ie=>d.jsx("button",{className:`seg-btn ${b===ie?"seg-active":""}`,onClick:()=>re(ie),disabled:!!ae,style:{opacity:ae&&ae!==ie?.5:1},title:o("settings.rotateBased",{family:ie.charAt(0).toUpperCase()+ie.slice(1)}),children:ae===ie?"...":ie.charAt(0).toUpperCase()+ie.slice(1)},ie))})]}),d.jsxs("div",{className:"settings-group-inner",children:[d.jsx("div",{className:"settings-group-title",children:o("settings.switchThreshold")}),d.jsx("div",{className:"settings-group-desc",children:o("settings.thresholdDesc")}),d.jsx("div",{className:"settings-seg-row",children:p2.map(ie=>d.jsxs("button",{className:`seg-btn ${_===ie?"seg-active":""}`,onClick:()=>me(ie),disabled:z,style:{opacity:z&&_!==ie?.5:1},title:ie===0?o("settings.thresholdExhausted"):o("settings.thresholdBelow",{val:ie}),children:[ie,"%"]},ie))}),_===0&&d.jsxs("div",{className:"threshold-warning",children:[d.jsx("span",{className:"threshold-warning-icon",children:"⚠️"}),d.jsx("span",{children:o("settings.thresholdWarning")})]})]})]}),d.jsxs("div",{className:"settings-group",children:[d.jsxs("div",{className:"settings-row",children:[d.jsxs("div",{children:[d.jsx("div",{className:"settings-group-title",children:o("settings.statusBarQuota")}),d.jsx("div",{className:"settings-group-desc",children:g.display?o("settings.visible"):o("settings.hidden")})]}),d.jsxs("label",{className:`switch switch-sm ${$?"switch-busy":""}`,"data-tip":$?o("common.saving"):g.display?o("remoteConfig.hideKey"):o("remoteConfig.showKey"),"data-tip-pos":"below","data-tip-align":"right",children:[d.jsx("input",{type:"checkbox",checked:g.display,onChange:ie=>_e("display",ie.target.checked),disabled:$}),d.jsx("span",{className:"slider"})]})]}),g.display&&d.jsxs("div",{className:"settings-checkbox-row",children:[d.jsx(Vu,{checked:g.claude,onChange:ie=>_e("claude",ie.target.checked),label:"Claude",disabled:$}),d.jsx(Vu,{checked:g.flash,onChange:ie=>_e("flash",ie.target.checked),label:"Flash",disabled:$}),d.jsx(Vu,{checked:g.pro,onChange:ie=>_e("pro",ie.target.checked),label:"Pro",disabled:$})]})]}),d.jsx("div",{className:"settings-group",children:d.jsxs("div",{className:"settings-row",children:[d.jsxs("div",{children:[d.jsx("div",{className:"settings-group-title",children:o("settings.showRemoteModes")}),d.jsx("div",{className:"settings-group-desc",children:s.showRemoteModes?o("settings.remoteModesOn"):o("settings.remoteModesOff")})]}),d.jsxs("label",{className:"switch switch-sm",children:[d.jsx("input",{type:"checkbox",checked:s.showRemoteModes,onChange:ie=>c(ie.target.checked)}),d.jsx("span",{className:"slider"})]})]})}),d.jsxs("div",{className:"settings-lang-footer",children:[d.jsx(f_,{size:13,strokeWidth:1.8,className:"settings-lang-icon"}),d.jsx("button",{className:`settings-lang-pill ${n.language==="zh-CN"?"settings-lang-active":""}`,onClick:()=>ye("zh-CN"),children:"中文"}),d.jsx("button",{className:`settings-lang-pill ${n.language==="en"?"settings-lang-active":""}`,onClick:()=>ye("en"),children:"EN"})]})]})]}):null},b2=()=>{const{t:o}=tn(),{logs:n,clearLogs:s}=ri(),l=x.useRef(null);return x.useEffect(()=>{l.current&&(l.current.scrollTop=l.current.scrollHeight)},[n]),d.jsxs("div",{className:"section",style:{padding:"10px"},children:[d.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"},children:[d.jsx("span",{style:{fontWeight:600,fontSize:"0.9em"},children:o("logs.title")}),d.jsx(Es,{secondary:!0,onClick:s,style:{transform:"scale(0.85)",transformOrigin:"right"},title:o("logs.clearAll"),children:o("logs.clear")})]}),d.jsx("div",{ref:l,style:{background:"var(--vscode-input-background, rgba(128, 128, 128, 0.08))",border:"1px solid var(--border)",borderRadius:"6px",padding:"10px",height:"180px",overflowY:"auto",fontFamily:"var(--vscode-editor-font-family, monospace)",fontSize:"0.8em",lineHeight:1.5,color:"var(--vscode-editor-foreground)"},children:n.map(r=>d.jsxs("div",{style:{whiteSpace:"pre-wrap",wordBreak:"break-all",marginBottom:"2px"},children:[d.jsx("span",{className:"log-time",children:r.time}),d.jsx("span",{className:`log-${r.level}`,children:r.text})]},r.id))})]})},y2=()=>{const{t:o}=tn(),{state:n,setViewingTab:s}=ri(),l=c=>{s(c)},r=n.viewingTab==="local"?"mode-pos-0":n.viewingTab==="static"?"mode-pos-1":"mode-pos-2";return d.jsx("div",{className:"mode-switcher",children:d.jsxs("div",{className:"mode-switcher-track mode-switcher-3",children:[d.jsx("div",{className:`mode-switcher-indicator ${r}`}),d.jsxs("button",{className:`mode-tab ${n.viewingTab==="local"?"mode-tab-active":""}`,onClick:()=>l("local"),children:[d.jsx(r_,{size:13,strokeWidth:2.2}),o("modeSwitcher.local")]}),d.jsxs("button",{className:`mode-tab ${n.viewingTab==="static"?"mode-tab-active":""}`,onClick:()=>l("static"),children:[d.jsx(z_,{size:13,strokeWidth:2.2}),o("modeSwitcher.static")]}),d.jsxs("button",{className:`mode-tab ${n.viewingTab==="pool"?"mode-tab-active":""}`,onClick:()=>l("pool"),children:[d.jsx(Y_,{size:13,strokeWidth:2.2}),o("modeSwitcher.pool")]})]})})},x2=()=>{const{t:o}=tn(),{state:n,sendToExtAsync:s}=ri(),[l,r]=x.useState(!1),c=async()=>{if(!l){r(!0);try{await s("setProxyEnabled",{enabled:!n.proxyEnabled})}catch{}r(!1)}};return d.jsxs("div",{className:`proxy-toggle-row ${n.proxyEnabled?"proxy-on":"proxy-off"}`,children:[d.jsxs("div",{className:"proxy-toggle-left",children:[d.jsx(k_,{size:13,strokeWidth:2.2,className:"proxy-toggle-icon"}),d.jsx("span",{className:"proxy-toggle-label",children:o("proxy.label")})]}),d.jsxs("div",{className:"proxy-toggle-right",children:[d.jsxs("span",{className:`proxy-toggle-status ${n.proxyEnabled?"proxy-status-on":"proxy-status-off"}`,children:[d.jsx("span",{className:"proxy-toggle-dot"}),n.proxyEnabled?o("proxy.on"):o("proxy.off")]}),d.jsxs("label",{className:`switch switch-sm ${l?"switch-busy":""}`,children:[d.jsx("input",{type:"checkbox",checked:n.proxyEnabled,onChange:c,disabled:l}),d.jsx("span",{className:"slider"})]})]})]})},_2=()=>{const{t:o}=tn(),{state:n,sendToExtAsync:s,addLog:l}=ri(),[r,c]=x.useState(n.remoteConfig.tenantSlug),[f,p]=x.useState(""),[b,g]=x.useState(!1),[_,v]=x.useState(!1),[k,E]=x.useState(!1),[O,V]=x.useState(!1),[se,ee]=x.useState(!1),oe=x.useRef(!1);x.useEffect(()=>{c(n.remoteConfig.tenantSlug)},[n.remoteConfig.tenantSlug]);const ae=async()=>{if(!oe.current){oe.current=!0,g(!0),V(!1);try{const J={tenantSlug:r};f&&(J.clientKey=f);const $=await s("setRemoteConfig",J);$?.deviceLimited?(V(!0),l(`WARNING: ${$.error}`,"warning")):$?.ok&&!$?.error?l("Remote config saved & connected","info"):$?.ok&&$?.error?l(`WARNING: ${$.error}`,"warning"):l(`Save failed: ${$?.error||"unknown error"}`,"error"),v(!1),p("")}catch(J){l(`Save failed: ${J.message}`,"error")}finally{oe.current=!1,g(!1)}}},de=()=>{v(!0),V(!1)};return d.jsxs("div",{className:"remote-config",children:[O&&d.jsxs("div",{className:"remote-config-device-error",children:[d.jsx("span",{className:"remote-config-device-error-icon",children:"⚠️"}),d.jsxs("div",{children:[d.jsx("div",{className:"remote-config-device-error-title",children:o("remoteConfig.deviceLimitError")}),d.jsx("div",{className:"remote-config-device-error-hint",children:o("remoteConfig.deviceLimitHint")})]})]}),n.remoteServerError===""&&d.jsxs("div",{className:"remote-config-server-ok",children:[d.jsx("span",{className:"remote-config-server-ok-dot"}),d.jsx("span",{children:o("remoteConfig.serverConnected")})]}),n.remoteServerError!=null&&n.remoteServerError!==""&&d.jsxs("div",{className:"remote-config-server-error",children:[d.jsx("span",{className:"remote-config-server-error-icon",children:"🔴"}),d.jsxs("div",{style:{flex:1},children:[d.jsx("div",{className:"remote-config-server-error-title",children:o("remoteConfig.serverError")}),d.jsx("div",{className:"remote-config-server-error-detail",children:n.remoteServerError}),d.jsx("button",{className:"remote-config-server-retry",disabled:se,onClick:async()=>{ee(!0);try{const J=await s("setRemoteConfig",{});J?.ok&&!J?.error?l("Reconnected to remote server","info"):J?.error&&l(`Retry failed: ${J.error}`,"error")}catch(J){l(`Retry failed: ${J.message}`,"error")}finally{ee(!1)}},children:se?d.jsxs(d.Fragment,{children:[d.jsx("span",{className:"btn-spinner"})," ",o("remoteConfig.retrying")]}):o("remoteConfig.retry")})]})]}),d.jsxs("div",{className:"remote-config-field",children:[d.jsx("label",{className:"remote-config-label",children:o("remoteConfig.tenantId")}),d.jsx("input",{className:"remote-config-input",type:"text",value:r,onChange:J=>{c(J.target.value),de()},placeholder:"my-org",spellCheck:!1})]}),d.jsxs("div",{className:"remote-config-field",children:[d.jsxs("label",{className:"remote-config-label",children:[o("remoteConfig.userId"),n.remoteConfig.hasKey&&!f&&d.jsx("span",{className:"remote-config-saved",children:o("remoteConfig.saved")})]}),d.jsxs("div",{className:"remote-config-key-row",children:[d.jsx("input",{className:"remote-config-input",type:k?"text":"password",value:f||k&&n.remoteConfig.clientKey||"",onChange:J=>{p(J.target.value),de()},placeholder:n.remoteConfig.hasKey?"••••••••":o("remoteConfig.enterKey"),spellCheck:!1,readOnly:!f&&k&&!!n.remoteConfig.clientKey}),d.jsx("button",{className:"icon-btn remote-config-eye",onClick:()=>E(!k),"data-tip":o(k?"remoteConfig.hideKey":"remoteConfig.showKey"),type:"button",children:d.jsx("svg",{width:"14",height:"14",viewBox:"0 0 16 16",fill:"currentColor",children:k?d.jsx("path",{d:"M10.79 12.912l-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089zM.646 1.354l14 14 .708-.708-14-14-.708.708z"}):d.jsx("path",{d:"M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"})})})]})]}),d.jsx("button",{className:`remote-config-save ${_?"remote-config-save-dirty":""}`,onClick:ae,disabled:b||!_,children:b?d.jsxs(d.Fragment,{children:[d.jsx("span",{className:"btn-spinner accent"})," ",o("common.saving")]}):o("remoteConfig.saveConfig")})]})},S2=()=>{const{t:o}=tn(),{state:n,sendToExtAsync:s,addLog:l}=ri(),[r,c]=x.useState(!1),[f,p]=x.useState(!1),b=x.useRef(!1),g=x.useRef(!1),_=async()=>{if(!b.current){b.current=!0,c(!0);try{l("Starting admin Google login...","info");const E=await s("adminLogin");E?.ok?l("Admin login successful","info"):l(`Admin login failed: ${E?.error||"unknown error"}`,"error")}catch(E){l(`Admin login failed: ${E.message}`,"error")}finally{b.current=!1,c(!1)}}},v=async()=>{if(!g.current){g.current=!0,p(!0);try{await s("adminLogout"),l("Admin logged out","info")}catch(E){l(`Logout failed: ${E.message}`,"error")}finally{g.current=!1,p(!1)}}},k=()=>{l("Opening admin panel...","info"),s("openAdminPanel").catch(()=>{})};return n.admin.loggedIn?d.jsxs("div",{className:"admin-section admin-section-logged-in",children:[d.jsx("div",{className:"admin-section-divider"}),d.jsx("div",{className:"admin-info",children:d.jsxs("div",{className:"admin-info-row",children:[d.jsx("span",{className:"admin-avatar",children:d.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"currentColor",children:[d.jsx("path",{d:"M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"}),d.jsx("path",{d:"M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"})]})}),d.jsxs("div",{className:"admin-details",children:[d.jsx("span",{className:"admin-name",children:n.admin.name||n.admin.email||"Admin"}),n.admin.email&&d.jsx("span",{className:"admin-email",children:n.admin.email})]}),d.jsx("button",{className:"icon-btn admin-logout-btn",onClick:v,disabled:f,"data-tip":o("adminSection.logout"),children:f?d.jsx("span",{className:"btn-spinner"}):d.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 16 16",fill:"currentColor",children:[d.jsx("path",{fillRule:"evenodd",d:"M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"}),d.jsx("path",{fillRule:"evenodd",d:"M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"})]})})]})}),d.jsx("div",{className:"admin-actions",children:d.jsxs("button",{className:"admin-manage-btn",onClick:k,children:[d.jsx("svg",{width:"13",height:"13",viewBox:"0 0 16 16",fill:"currentColor",children:d.jsx("path",{d:"M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"})}),o("adminSection.manageTokens")]})})]}):d.jsxs("div",{className:"admin-section",children:[d.jsx("div",{className:"admin-section-divider"}),d.jsx("button",{className:"admin-login-btn",onClick:_,disabled:r,children:r?d.jsxs(d.Fragment,{children:[d.jsx("span",{className:"btn-spinner"})," ",o("adminSection.loggingIn")]}):d.jsxs(d.Fragment,{children:[d.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 16 16",fill:"currentColor",children:[d.jsx("path",{d:"M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"}),d.jsx("path",{d:"M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z"})]}),o("adminSection.loginBtn")]})}),d.jsx("p",{className:"admin-hint",children:o("adminSection.loginHint")})]})},mv=[{value:"openai_chat",label:"OpenAI"},{value:"anthropic",label:"Anthropic"}],Fr={apiType:"openai_chat",baseUrl:"",apiKey:"",modelId:""},w2=()=>{const{state:o,sendToExtAsync:n}=ri(),{t:s}=tn(),l=o.providers||[],r=o.activeProviderID||0,[c,f]=x.useState(!1),[p,b]=x.useState(null),[g,_]=x.useState(Fr),[v,k]=x.useState(!1),[E,O]=x.useState(!1),V=(z,W)=>{_(Q=>({...Q,[z]:W}))},se=x.useCallback(()=>{b(null),_(Fr),f(!0)},[]),ee=x.useCallback(z=>{b(z.id),_({apiType:z.apiType,baseUrl:z.baseUrl,apiKey:"",modelId:z.modelId}),f(!0)},[]),oe=x.useCallback(()=>{f(!1),b(null),_(Fr)},[]),ae=x.useCallback(async()=>{if(g.baseUrl){k(!0);try{p?await n("updateProvider",{id:p,...g}):await n("addProvider",g),f(!1),b(null),_(Fr)}catch{}finally{k(!1)}}},[g,p,n]),de=x.useCallback(async z=>{try{await n("removeProvider",{id:z})}catch{}},[n]),J=x.useCallback(async z=>{const W=r!==z;try{await n("selectProvider",{id:z,enabled:W})}catch{}},[n,r]),$={width:"100%",padding:"4px 8px",background:"var(--vscode-input-background)",color:"var(--vscode-input-foreground)",border:"1px solid var(--vscode-input-border, transparent)",borderRadius:"2px",fontSize:"12px",outline:"none",boxSizing:"border-box"},S={fontSize:"11px",color:"var(--vscode-descriptionForeground)",marginBottom:"2px",display:"block"},I=z=>mv.find(W=>W.value===z)?.label||z;return d.jsxs("div",{className:"section",style:{marginBottom:"16px"},children:[d.jsxs("div",{className:"title-actions",children:[d.jsxs("div",{className:"section-title",style:{marginBottom:0,cursor:"pointer",userSelect:"none"},onClick:()=>O(!E),children:[d.jsx("span",{style:{display:"inline-block",width:"12px",fontSize:"10px",opacity:.7},children:E?"▶":"▼"})," ",s("providers.title"),l.length>0&&d.jsxs("span",{style:{opacity:.5,fontWeight:400,marginLeft:"6px"},children:["(",l.length,")"]})]}),!E&&d.jsx("div",{style:{marginLeft:"auto",opacity:.6,cursor:"pointer"},onClick:se,"data-tip":s("providers.addProvider"),"data-tip-pos":"below",children:d.jsxs("svg",{viewBox:"0 0 16 16",width:"16",height:"16",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",children:[d.jsx("line",{x1:"8",y1:"3",x2:"8",y2:"13"}),d.jsx("line",{x1:"3",y1:"8",x2:"13",y2:"8"})]})})]}),!E&&d.jsxs(d.Fragment,{children:[l.length===0&&!c&&d.jsxs("div",{style:{color:"var(--vscode-descriptionForeground)",textAlign:"center",padding:"16px",fontSize:"0.85em"},children:[s("providers.emptyState"),d.jsx("br",{}),d.jsx("span",{style:{opacity:.7,fontSize:"0.9em"},children:s("providers.emptyHint")})]}),l.map(z=>{const W=r===z.id;return p===z.id&&c?null:d.jsxs("div",{className:`provider-card ${W?"provider-active":""}`,children:[d.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[d.jsxs("label",{className:"credits-toggle","data-tip":s(W?"providers.deactivateTip":"providers.activateTip"),children:[d.jsx("input",{type:"checkbox",checked:W,onChange:()=>J(z.id)}),d.jsx("span",{className:"credits-toggle-slider"})]}),d.jsxs("div",{style:{flex:1,minWidth:0},children:[d.jsx("div",{style:{fontWeight:500,fontSize:"12px",display:"flex",alignItems:"center",gap:"5px"},children:d.jsx("span",{style:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:z.modelId||"—"})}),d.jsxs("div",{style:{fontSize:"11px",opacity:.5,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:[I(z.apiType),z.baseUrl?` · ${z.baseUrl}`:""]})]}),d.jsx("button",{style:{background:"none",border:"none",cursor:"pointer",padding:"2px",display:"flex",alignItems:"center",color:"var(--vscode-descriptionForeground)",opacity:.5},onClick:()=>ee(z),"data-tip":s("providers.edit"),"data-tip-pos":"below",children:d.jsx(Dv,{})})]}),W&&d.jsxs("div",{className:"provider-hint provider-hint-warning",role:"status","aria-live":"polite",children:[d.jsx("strong",{children:s("providers.activeHint")})," ",s("providers.activeDesc",{name:z.modelId||"—",model:""})]})]},z.id)}),c&&d.jsxs("div",{style:{marginTop:"8px",padding:"10px",borderRadius:"4px",border:"1px solid var(--vscode-focusBorder)",background:"var(--vscode-editor-background)"},children:[d.jsx("div",{style:{marginBottom:"8px",fontWeight:500,fontSize:"12px"},children:s(p?"providers.editProvider":"providers.addProvider")}),d.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"6px"},children:[d.jsxs("div",{children:[d.jsx("label",{style:S,children:s("providers.formApiType")}),d.jsx("select",{style:{...$,padding:"4px 6px"},value:g.apiType,onChange:z=>V("apiType",z.target.value),children:mv.map(z=>d.jsx("option",{value:z.value,children:z.label},z.value))})]}),d.jsxs("div",{children:[d.jsx("label",{style:S,children:s("providers.formBaseUrl")}),d.jsx("input",{style:$,placeholder:g.apiType==="anthropic"?"https://api.anthropic.com":"https://api.openai.com/v1",value:g.baseUrl,onChange:z=>V("baseUrl",z.target.value)})]}),d.jsxs("div",{children:[d.jsx("label",{style:S,children:s("providers.formApiKey")}),d.jsx("input",{style:$,type:"password",placeholder:p?s("providers.apiKeyUnchanged"):"sk-...",value:g.apiKey,onChange:z=>V("apiKey",z.target.value)})]}),d.jsxs("div",{children:[d.jsx("label",{style:S,children:s("providers.formModel")}),d.jsx("input",{style:$,placeholder:"e.g. gpt-4o, claude-sonnet-4-20250514",value:g.modelId,onChange:z=>V("modelId",z.target.value),autoFocus:!0})]}),d.jsxs("div",{style:{marginTop:"4px",fontSize:"11px",lineHeight:"1.45",color:"var(--vscode-descriptionForeground)",opacity:.75},children:["⚠ ",s("providers.contextWarning")]})]}),d.jsxs("div",{style:{display:"flex",gap:"6px",marginTop:"10px"},children:[d.jsx(Es,{style:{flex:1},onClick:ae,disabled:v||!g.baseUrl||!g.modelId,children:v?d.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:"6px"},children:[d.jsx("span",{className:"btn-spinner"})," ",s("common.saving")]}):s(p?"providers.update":"providers.add")}),d.jsx(Es,{style:{flexShrink:0},onClick:oe,children:s("common.cancel")})]}),p&&d.jsx("div",{style:{marginTop:"8px",paddingTop:"8px",borderTop:"1px solid var(--vscode-widget-border, rgba(255,255,255,0.08))"},children:d.jsx("button",{style:{width:"100%",padding:"4px 0",fontSize:"11px",background:"transparent",color:"var(--vscode-descriptionForeground)",border:"1px solid var(--vscode-widget-border, rgba(255,255,255,0.1))",borderRadius:"3px",cursor:"pointer",opacity:.6,transition:"opacity 0.15s"},onClick:()=>{de(p),oe()},onMouseEnter:z=>z.currentTarget.style.opacity="1",onMouseLeave:z=>z.currentTarget.style.opacity="0.6",children:s("providers.deleteProvider")})})]}),!c&&l.length>0&&d.jsx(Es,{style:{width:"100%",marginTop:"8px"},onClick:se,children:s("providers.addMore")})]})]})};function C2(){const{t:o}=tn(),[n,s]=x.useState(!1);return d.jsx("div",{className:"feedback-container",children:n?d.jsxs("div",{className:"feedback-options fade-in",children:[d.jsx("span",{className:"feedback-prefix",children:o("feedback.prefix")}),d.jsxs("div",{className:"feedback-links",children:[d.jsxs("a",{href:"https://github.com/Osamu-GWAD/AntiLoop/issues",target:"_blank",rel:"noreferrer",className:"feedback-link",children:[o("feedback.email")," (k9812974@gmail.com)"]}),d.jsx("span",{className:"feedback-divider",children:"·"}),d.jsx("a",{href:"https://github.com/Osamu-GWAD/AntiLoop/issues/new",target:"_blank",rel:"noreferrer",className:"feedback-link",children:o("feedback.github")})]})]}):d.jsx("button",{className:"feedback-trigger",onClick:()=>s(!0),children:o("feedback.trigger")})})}const E2=[{id:"workbench.action.loginWithRedirect",label:"✅ loginWithRedirect",desc:"Opens browser login"},{id:"workbench.action.manageAccounts",label:"manageAccounts",desc:"Account manager dialog"},{id:"workbench.activity.showAccounts",label:"showAccounts",desc:"Activity bar accounts"},{id:"workbench.actions.accounts.signIn",label:"accounts.signIn",desc:"Sign in action"},{id:"workbench.editSessions.actions.signIn",label:"editSessions.signIn",desc:"Edit sessions sign in"}],N2=()=>{const{state:o,sendToExtAsync:n,addLog:s}=ri(),[l,r]=x.useState(!1),[c,f]=x.useState(null),p=x.useCallback(async()=>{if(!c){f("checkToken");try{const g=await n("checkIdeToken");g.hasToken?s(`🔑 IDE Token: ${g.accessTokenPreview} | Expiry: ${g.expiry||"N/A"} | Refresh: ${g.hasRefreshToken?"YES":"NO"}`,"info"):s("🔑 IDE Token: NONE — user is signed out","warn")}catch(g){s(`🔑 Check failed: ${g.message}`,"error")}finally{f(null)}}},[c,n,s]),b=x.useCallback(async g=>{if(!c){f(g),s(`▶ Executing: ${g}`,"info");try{const _=await n("executeIdeCommand",{command:g});_.ok?s(`✅ ${g}: OK (result=${JSON.stringify(_.result)})`,"info"):s(`❌ ${g}: ${_.error}`,"error")}catch(_){s(`❌ ${g}: ${_.message}`,"error")}finally{f(null)}}},[c,n,s]);return o.devMode?d.jsxs("div",{className:"debug-panel",children:[d.jsxs("button",{className:"debug-toggle",onClick:()=>r(!l),children:[d.jsxs("span",{className:"debug-toggle-label",children:[d.jsx(P1,{size:13,strokeWidth:1.8,style:{marginRight:4,opacity:.7}}),"Debug"]}),d.jsx("span",{className:`settings-chevron ${l?"expanded":""}`,children:l?d.jsx(th,{}):d.jsx(nh,{})})]}),l&&d.jsxs("div",{className:"debug-content",children:[d.jsx("button",{className:"debug-btn debug-btn-primary",onClick:p,disabled:!!c,children:c==="checkToken"?"...":"🔑 Check IDE Token"}),d.jsx("div",{className:"debug-section-title",children:"IDE Login Commands"}),d.jsx("div",{className:"debug-cmd-grid",children:E2.map(g=>d.jsx("button",{className:"debug-btn",onClick:()=>b(g.id),disabled:!!c,title:g.id,children:c===g.id?"...":g.label},g.id))})]})]}):null},j2=!1,so="99.99.99";function A2(o,n){return!1}function k2(){const{state:o,initialized:n,sendToExtAsync:s}=ri(),{t:l}=tn(),r=o.viewingTab!=="local",[c,f]=x.useState(()=>{try{return localStorage.getItem("antiloop:restartDismissed")==="true"}catch{return!1}}),p=o.needsRestart&&!c,b=()=>{f(!0);try{localStorage.setItem("antiloop:restartDismissed","true")}catch{}},g=o.ideVersion,_=j2,[v,k]=x.useState(()=>{try{return localStorage.getItem("antiloop:versionWarnDismissed")===so}catch{return!1}}),E=g&&g!==so&&A2(g,so)&&!v,O=x.useCallback(()=>{k(!0);try{localStorage.setItem("antiloop:versionWarnDismissed",so)}catch{}},[]);return x.useRef(!1),x.useEffect(()=>{},[_,o.proxyEnabled,s]),n?d.jsxs("div",{className:"container fade-in",children:[d.jsx(xS,{}),p&&d.jsxs("div",{className:"restart-banner",children:[d.jsx("span",{className:"restart-banner-icon",children:"⚠️"}),d.jsxs("div",{className:"restart-banner-body",children:[d.jsx("div",{className:"restart-banner-title",children:l("restartBanner.title")}),d.jsx("div",{className:"restart-banner-message",children:l("restartBanner.message")})]}),d.jsx("button",{className:"restart-banner-dismiss",onClick:b,title:l("common.close"),children:"✕"})]}),_,E&&d.jsxs("div",{className:"version-warning-banner",children:[d.jsx("span",{className:"version-warning-banner-icon",children:"⚠️"}),d.jsxs("div",{className:"version-warning-banner-body",children:[d.jsx("div",{className:"version-warning-banner-title",children:l("versionWarning.warnTitle")}),d.jsx("div",{className:"version-warning-banner-message",children:l("versionWarning.warnMessage",{version:g,tested:so})})]}),d.jsx("button",{className:"restart-banner-dismiss",onClick:O,title:l("common.close"),children:"✕"})]}),o.deviceError&&d.jsxs("div",{className:"device-limit-banner",children:[d.jsx("span",{className:"device-limit-banner-icon",children:"🚫"}),d.jsxs("div",{children:[d.jsx("div",{className:"device-limit-banner-title",children:l("remoteConfig.deviceLimitError")}),d.jsx("div",{className:"device-limit-banner-hint",children:l("remoteConfig.deviceLimitHint")})]})]}),d.jsxs(d.Fragment,{children:[d.jsx(x2,{}),d.jsxs("div",{className:`plugin-body ${o.proxyEnabled?"":"plugin-disabled"}`,children:[o.showRemoteModes&&d.jsx(y2,{}),o.showRemoteModes&&r&&d.jsx(_2,{}),d.jsx(f2,{}),o.viewingTab==="local"&&d.jsx(w2,{}),d.jsx(v2,{}),o.showRemoteModes&&r&&d.jsx(S2,{}),d.jsx(b2,{}),d.jsx(N2,{}),d.jsx(C2,{})]})]})]}):d.jsxs("div",{className:"loading-screen",children:[d.jsx("div",{className:"loading-logo",children:"🔄"}),d.jsx("div",{className:"loading-title",children:"AntiLoop"}),d.jsxs("div",{className:"loading-dots",children:[d.jsx("span",{className:"loading-dot"}),d.jsx("span",{className:"loading-dot"}),d.jsx("span",{className:"loading-dot"})]})]})}function T2(){return d.jsx(mS,{children:d.jsx(k2,{})})}const eh=document.getElementById("root"),O2=eh.getAttribute("data-view");O2==="admin"?gg.createRoot(eh).render(d.jsx(x.StrictMode,{children:d.jsx(pS,{})})):gg.createRoot(eh).render(d.jsx(x.StrictMode,{children:d.jsx(T2,{})}));
