import{y as m,bj as y,J as f,L as b,I as h,o as n,d as o,a8 as r,w as g,a9 as v,V as l,b as C,ac as i,U as d,T as c,W as E,ag as B}from"./index.41bf9c1b.js";const L=m({type:{type:String,values:["primary","success","warning","info","danger","default"],default:"default"},underline:{type:Boolean,default:!0},disabled:{type:Boolean,default:!1},href:{type:String,default:""},target:{type:String,default:"_self"},icon:{type:y}}),w={click:t=>t instanceof MouseEvent},S=["href","target"],_=f({name:"ElLink"}),$=f({..._,props:L,emits:w,setup(t,{emit:u}){const s=t,a=b("link"),p=h(()=>[a.b(),a.m(s.type),a.is("disabled",s.disabled),a.is("underline",s.underline&&!s.disabled)]);function k(e){s.disabled||u("click",e)}return(e,P)=>(n(),o("a",{class:d(l(p)),href:e.disabled||!e.href?void 0:e.href,target:e.disabled||!e.href?void 0:e.target,onClick:k},[e.icon?(n(),r(l(C),{key:0},{default:g(()=>[(n(),r(v(e.icon)))]),_:1})):i("v-if",!0),e.$slots.default?(n(),o("span",{key:1,class:d(l(a).e("inner"))},[c(e.$slots,"default")],2)):i("v-if",!0),e.$slots.icon?c(e.$slots,"icon",{key:2}):i("v-if",!0)],10,S))}});var I=E($,[["__file","link.vue"]]);const T=B(I);export{T as E};
