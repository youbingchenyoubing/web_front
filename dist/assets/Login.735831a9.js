import{_ as S,A as P,u as x,a as E,E as k,r as K,b as U,c as z,o as B,d as A,e as n,f as o,w as r,F as N,g as d,h as p,p as D,i as F,j as L,k as M,l as T}from"./index.41bf9c1b.js";import{e as _}from"./crypto.5e1df963.js";import{C as W}from"./Copyright.32883f58.js";import{E as j,a as q}from"./index.39967f43.js";import{E as J}from"./index.f21014bc.js";import{E as O}from"./index.6f6ffc3e.js";import"./castArray.422477ef.js";import"./isEqual.f69c734a.js";import"./debounce.917afbd5.js";const R="/assets/logo_title_2.f53e85b7.png",G="/assets/banner_3.65019264.jpeg",H={name:"Login",data(){return{logoTitle:R,banner:G,rules:{username:[{required:!0,message:"\u7528\u6237\u540D\u662F\u5FC5\u586B\u9879",trigger:"blur"}],password:[{required:!0,message:"\u7528\u6237\u5BC6\u7801\u662F\u5FC5\u586B\u9879",trigger:"blur"}],captcha:[{required:!0,message:"\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801",trigger:"blur"}]},form:{username:"",password:"",captcha:""},verificationCode:{src:"default",curKey:""},memoPassword:localStorage.getItem("memoPassword")==="true"}},methods:{init(){this.loadVerificationCodeImg()},async loadVerificationCodeImg(){const e=new Date().getTime(),s=await P({key:e});this.verificationCode.src=s,this.verificationCode.curKey=e},async onSubmit(){try{await this.$refs.formRef.validate();const e=x(),{username:s,password:a,captcha:u}=this.form,t={username:_(s),password:_(a),key:this.verificationCode.curKey,captcha:u},i=await E(t);localStorage.setItem("token",i),await e.initUserInfoAndConfig(),this.setMemoPassword(),this.$router.push("/")}catch(e){typeof e=="object"&&["10013","10022"].includes(e.code)&&this.loadVerificationCodeImg();return}},setMemoPassword(){this.memoPassword?localStorage.setItem("user-pwd",JSON.stringify({name:this.form.username,pwd:this.form.password})):localStorage.removeItem("user-pwd")},onMemoPasswordChange(e){localStorage.setItem("memoPassword",this.memoPassword=e)},recoverPwd(){if(!this.memoPassword)return;const e=localStorage.getItem("user-pwd");if(!e)return;const{name:s,pwd:a}=JSON.parse(e);this.form.username=s,this.form.password=a}},components:{Copyright:W},mounted(){this.recoverPwd(),this.init();var e=window.innerWidth,s=1920,a=e/s;document.getElementById("mainContainer").style.transform="scale("+a+","+a+")",window.onresize=function(){e=window.innerWidth,a=e/s,document.getElementById("mainContainer").style.transform="scale("+a+","+a+")"}}},f=e=>(D("data-v-23f7126e"),e=e(),F(),e),Q={class:"Login"},X={id:"mainContainer",class:"container"},Y={class:"logo-title"},Z=["src"],$={class:"login-content"},ee=["src"],oe=f(()=>n("div",{class:"login-h3"},[n("h2",{class:"login-title"},"\u6B22\u8FCE\u767B\u5F55"),n("div",{class:"bline"})],-1)),se={class:"form-code"},te=f(()=>n("div",{class:"Copyright"},"\xA9 2024 \u8282\u80FD\u76D1\u6D4B\u7EFC\u5408\u4FE1\u606F\u5E73\u53F0",-1));function re(e,s,a,u,t,i){const m=j,g=L,c=k,h=M,w=T,C=K("Picture"),y=U,I=J,v=O,b=z,V=q;return B(),A(N,null,[n("div",Q,[n("div",X,[n("div",Y,[n("img",{src:t.logoTitle,style:{width:"559px",height:"75px"}},null,8,Z)]),n("div",$,[n("img",{src:t.banner,style:{width:"814px",height:"620px"}},null,8,ee),o(V,{class:"login-form",ref:"formRef",model:t.form,rules:t.rules},{default:r(()=>[o(m,null,{default:r(()=>[oe]),_:1}),o(m,{prop:"username"},{default:r(()=>[o(c,{size:"large",modelValue:t.form.username,"onUpdate:modelValue":s[0]||(s[0]=l=>t.form.username=l),placeholder:"\u7528\u6237\u540D",onKeyup:d(i.onSubmit,["enter"]),class:"inputDeep"},{prefix:r(()=>[o(g)]),_:1},8,["modelValue","onKeyup"])]),_:1}),o(m,{prop:"password"},{default:r(()=>[o(c,{size:"large",modelValue:t.form.password,"onUpdate:modelValue":s[1]||(s[1]=l=>t.form.password=l),placeholder:"\u5BC6\u7801","show-password":"",onKeyup:d(i.onSubmit,["enter"]),class:"inputDeep"},{prefix:r(()=>[o(h)]),_:1},8,["modelValue","onKeyup"])]),_:1}),o(m,{prop:"captcha"},{default:r(()=>[n("div",se,[o(c,{class:"code-input inputDeep",size:"large",modelValue:t.form.captcha,"onUpdate:modelValue":s[2]||(s[2]=l=>t.form.captcha=l),maxlength:4,"show-word-limit":"",placeholder:"\u9A8C\u8BC1\u7801",onKeyup:d(i.onSubmit,["enter"])},{prefix:r(()=>[o(w)]),_:1},8,["modelValue","onKeyup"]),o(I,{src:t.verificationCode.src,class:"code-img",onClick:i.loadVerificationCodeImg},{error:r(()=>[o(y,null,{default:r(()=>[o(C)]),_:1})]),_:1},8,["src","onClick"])])]),_:1}),o(m,null,{default:r(()=>[o(v,{modelValue:t.memoPassword,"onUpdate:modelValue":s[3]||(s[3]=l=>t.memoPassword=l),onChange:i.onMemoPasswordChange},{default:r(()=>[p(" \u8BB0\u4F4F\u5BC6\u7801 ")]),_:1},8,["modelValue","onChange"])]),_:1}),o(m,null,{default:r(()=>[o(b,{size:"large",type:"primary",class:"form-submit",onClick:i.onSubmit},{default:r(()=>[p(" \u767B\u5F55 ")]),_:1},8,["onClick"])]),_:1})]),_:1},8,["model","rules"])])])]),te],64)}const _e=S(H,[["render",re],["__scopeId","data-v-23f7126e"]]);export{_e as default};