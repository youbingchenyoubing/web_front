import{aO as X,aP as Z,aQ as U,D as q,ak as Q,G as P,Y as F,I as k,aR as T,aS as pe,aT as A,M as _,N as ee,a4 as le,aU as ae,H as O,C as N,aV as M,aW as ke,aX as Y,K as H,aY as te,aZ as $,J as L,a5 as ne,L as K,o as y,a8 as oe,w as se,e as J,U as x,V as t,aB as G,d as V,a_ as z,as as D,a$ as w,T as j,F as he,h as ue,ab as ie,ac as R,a9 as re,W,aa as ge,y as Ce,B as xe,O as ye,b0 as Ve,Q as Se,ag as Le,ah as de}from"./index.41bf9c1b.js";import{q as Be}from"./isEqual.f69c734a.js";const be={modelValue:{type:[Number,String,Boolean],default:void 0},label:{type:[String,Boolean,Number,Object],default:void 0},value:{type:[String,Boolean,Number,Object],default:void 0},indeterminate:Boolean,disabled:Boolean,checked:Boolean,name:{type:String,default:void 0},trueValue:{type:[String,Number],default:void 0},falseValue:{type:[String,Number],default:void 0},trueLabel:{type:[String,Number],default:void 0},falseLabel:{type:[String,Number],default:void 0},id:{type:String,default:void 0},controls:{type:String,default:void 0},border:Boolean,size:X,tabindex:[String,Number],validateEvent:{type:Boolean,default:!0},...Z(["ariaControls"])},ce={[U]:e=>q(e)||Q(e)||P(e),change:e=>q(e)||Q(e)||P(e)},B=Symbol("checkboxGroupContextKey"),Ee=({model:e,isChecked:c})=>{const d=F(B,void 0),n=k(()=>{var b,v;const o=(b=d==null?void 0:d.max)==null?void 0:b.value,f=(v=d==null?void 0:d.min)==null?void 0:v.value;return!T(o)&&e.value.length>=o&&!c.value||!T(f)&&e.value.length<=f&&c.value});return{isDisabled:pe(k(()=>(d==null?void 0:d.disabled.value)||n.value)),isLimitDisabled:n}},Ie=(e,{model:c,isLimitExceeded:d,hasOwnLabel:n,isDisabled:m,isLabeledByFormItem:b})=>{const v=F(B,void 0),{formItem:o}=A(),{emit:f}=ae();function r(l){var u,h,i,a;return[!0,e.trueValue,e.trueLabel].includes(l)?(h=(u=e.trueValue)!=null?u:e.trueLabel)!=null?h:!0:(a=(i=e.falseValue)!=null?i:e.falseLabel)!=null?a:!1}function s(l,u){f("change",r(l),u)}function p(l){if(d.value)return;const u=l.target;f("change",r(u.checked),l)}async function g(l){d.value||!n.value&&!m.value&&b.value&&(l.composedPath().some(i=>i.tagName==="LABEL")||(c.value=r([!1,e.falseValue,e.falseLabel].includes(c.value)),await le(),s(c.value,l)))}const S=k(()=>(v==null?void 0:v.validateEvent)||e.validateEvent);return _(()=>e.modelValue,()=>{S.value&&(o==null||o.validate("change").catch(l=>ee()))}),{handleChange:p,onClickRoot:g}},$e=e=>{const c=O(!1),{emit:d}=ae(),n=F(B,void 0),m=k(()=>T(n)===!1),b=O(!1),v=k({get(){var o,f;return m.value?(o=n==null?void 0:n.modelValue)==null?void 0:o.value:(f=e.modelValue)!=null?f:c.value},set(o){var f,r;m.value&&N(o)?(b.value=((f=n==null?void 0:n.max)==null?void 0:f.value)!==void 0&&o.length>(n==null?void 0:n.max.value)&&o.length>v.value.length,b.value===!1&&((r=n==null?void 0:n.changeEvent)==null||r.call(n,o))):(d(U,o),c.value=o)}});return{model:v,isGroup:m,isLimitExceeded:b}},Ne=(e,c,{model:d})=>{const n=F(B,void 0),m=O(!1),b=k(()=>M(e.value)?e.label:e.value),v=k(()=>{const s=d.value;return P(s)?s:N(s)?ke(b.value)?s.map(Y).some(p=>Be(p,b.value)):s.map(Y).includes(b.value):s!=null?s===e.trueValue||s===e.trueLabel:!!s}),o=H(k(()=>{var s;return(s=n==null?void 0:n.size)==null?void 0:s.value}),{prop:!0}),f=H(k(()=>{var s;return(s=n==null?void 0:n.size)==null?void 0:s.value})),r=k(()=>!!c.default||!M(b.value));return{checkboxButtonSize:o,isChecked:v,isFocused:m,checkboxSize:f,hasOwnLabel:r,actualValue:b}},ve=(e,c)=>{const{formItem:d}=A(),{model:n,isGroup:m,isLimitExceeded:b}=$e(e),{isFocused:v,isChecked:o,checkboxButtonSize:f,checkboxSize:r,hasOwnLabel:s,actualValue:p}=Ne(e,c,{model:n}),{isDisabled:g}=Ee({model:n,isChecked:o}),{inputId:S,isLabeledByFormItem:l}=te(e,{formItemContext:d,disableIdGeneration:s,disableIdManagement:m}),{handleChange:u,onClickRoot:h}=Ie(e,{model:n,isLimitExceeded:b,hasOwnLabel:s,isDisabled:g,isLabeledByFormItem:l});return(()=>{function a(){var E,I;N(n.value)&&!n.value.includes(p.value)?n.value.push(p.value):n.value=(I=(E=e.trueValue)!=null?E:e.trueLabel)!=null?I:!0}e.checked&&a()})(),$({from:"controls",replacement:"aria-controls",version:"2.8.0",scope:"el-checkbox",ref:"https://element-plus.org/en-US/component/checkbox.html"},k(()=>!!e.controls)),$({from:"label act as value",replacement:"value",version:"3.0.0",scope:"el-checkbox",ref:"https://element-plus.org/en-US/component/checkbox.html"},k(()=>m.value&&M(e.value))),$({from:"true-label",replacement:"true-value",version:"3.0.0",scope:"el-checkbox",ref:"https://element-plus.org/en-US/component/checkbox.html"},k(()=>!!e.trueLabel)),$({from:"false-label",replacement:"false-value",version:"3.0.0",scope:"el-checkbox",ref:"https://element-plus.org/en-US/component/checkbox.html"},k(()=>!!e.falseLabel)),{inputId:S,isLabeledByFormItem:l,isChecked:o,isDisabled:g,isFocused:v,checkboxButtonSize:f,checkboxSize:r,hasOwnLabel:s,model:n,actualValue:p,handleChange:u,onClickRoot:h}},Fe=["id","indeterminate","name","tabindex","disabled","true-value","false-value"],Ge=["id","indeterminate","disabled","value","name","tabindex"],ze=L({name:"ElCheckbox"}),De=L({...ze,props:be,emits:ce,setup(e){const c=e,d=ne(),{inputId:n,isLabeledByFormItem:m,isChecked:b,isDisabled:v,isFocused:o,checkboxSize:f,hasOwnLabel:r,model:s,actualValue:p,handleChange:g,onClickRoot:S}=ve(c,d),l=K("checkbox"),u=k(()=>[l.b(),l.m(f.value),l.is("disabled",v.value),l.is("bordered",c.border),l.is("checked",b.value)]),h=k(()=>[l.e("input"),l.is("disabled",v.value),l.is("checked",b.value),l.is("indeterminate",c.indeterminate),l.is("focus",o.value)]);return(i,a)=>(y(),oe(re(!t(r)&&t(m)?"span":"label"),{class:x(t(u)),"aria-controls":i.indeterminate?i.controls||i.ariaControls:null,onClick:t(S)},{default:se(()=>{var E,I;return[J("span",{class:x(t(h))},[i.trueValue||i.falseValue||i.trueLabel||i.falseLabel?G((y(),V("input",{key:0,id:t(n),"onUpdate:modelValue":a[0]||(a[0]=C=>z(s)?s.value=C:null),class:x(t(l).e("original")),type:"checkbox",indeterminate:i.indeterminate,name:i.name,tabindex:i.tabindex,disabled:t(v),"true-value":(E=i.trueValue)!=null?E:i.trueLabel,"false-value":(I=i.falseValue)!=null?I:i.falseLabel,onChange:a[1]||(a[1]=(...C)=>t(g)&&t(g)(...C)),onFocus:a[2]||(a[2]=C=>o.value=!0),onBlur:a[3]||(a[3]=C=>o.value=!1),onClick:a[4]||(a[4]=D(()=>{},["stop"]))},null,42,Fe)),[[w,t(s)]]):G((y(),V("input",{key:1,id:t(n),"onUpdate:modelValue":a[5]||(a[5]=C=>z(s)?s.value=C:null),class:x(t(l).e("original")),type:"checkbox",indeterminate:i.indeterminate,disabled:t(v),value:t(p),name:i.name,tabindex:i.tabindex,onChange:a[6]||(a[6]=(...C)=>t(g)&&t(g)(...C)),onFocus:a[7]||(a[7]=C=>o.value=!0),onBlur:a[8]||(a[8]=C=>o.value=!1),onClick:a[9]||(a[9]=D(()=>{},["stop"]))},null,42,Ge)),[[w,t(s)]]),J("span",{class:x(t(l).e("inner"))},null,2)],2),t(r)?(y(),V("span",{key:0,class:x(t(l).e("label"))},[j(i.$slots,"default"),i.$slots.default?R("v-if",!0):(y(),V(he,{key:0},[ue(ie(i.label),1)],64))],2)):R("v-if",!0)]}),_:3},8,["class","aria-controls","onClick"]))}});var we=W(De,[["__file","checkbox.vue"]]);const Ue=["name","tabindex","disabled","true-value","false-value"],Pe=["name","tabindex","disabled","value"],Te=L({name:"ElCheckboxButton"}),Oe=L({...Te,props:be,emits:ce,setup(e){const c=e,d=ne(),{isFocused:n,isChecked:m,isDisabled:b,checkboxButtonSize:v,model:o,actualValue:f,handleChange:r}=ve(c,d),s=F(B,void 0),p=K("checkbox"),g=k(()=>{var l,u,h,i;const a=(u=(l=s==null?void 0:s.fill)==null?void 0:l.value)!=null?u:"";return{backgroundColor:a,borderColor:a,color:(i=(h=s==null?void 0:s.textColor)==null?void 0:h.value)!=null?i:"",boxShadow:a?`-1px 0 0 0 ${a}`:void 0}}),S=k(()=>[p.b("button"),p.bm("button",v.value),p.is("disabled",b.value),p.is("checked",m.value),p.is("focus",n.value)]);return(l,u)=>{var h,i;return y(),V("label",{class:x(t(S))},[l.trueValue||l.falseValue||l.trueLabel||l.falseLabel?G((y(),V("input",{key:0,"onUpdate:modelValue":u[0]||(u[0]=a=>z(o)?o.value=a:null),class:x(t(p).be("button","original")),type:"checkbox",name:l.name,tabindex:l.tabindex,disabled:t(b),"true-value":(h=l.trueValue)!=null?h:l.trueLabel,"false-value":(i=l.falseValue)!=null?i:l.falseLabel,onChange:u[1]||(u[1]=(...a)=>t(r)&&t(r)(...a)),onFocus:u[2]||(u[2]=a=>n.value=!0),onBlur:u[3]||(u[3]=a=>n.value=!1),onClick:u[4]||(u[4]=D(()=>{},["stop"]))},null,42,Ue)),[[w,t(o)]]):G((y(),V("input",{key:1,"onUpdate:modelValue":u[5]||(u[5]=a=>z(o)?o.value=a:null),class:x(t(p).be("button","original")),type:"checkbox",name:l.name,tabindex:l.tabindex,disabled:t(b),value:t(f),onChange:u[6]||(u[6]=(...a)=>t(r)&&t(r)(...a)),onFocus:u[7]||(u[7]=a=>n.value=!0),onBlur:u[8]||(u[8]=a=>n.value=!1),onClick:u[9]||(u[9]=D(()=>{},["stop"]))},null,42,Pe)),[[w,t(o)]]),l.$slots.default||l.label?(y(),V("span",{key:2,class:x(t(p).be("button","inner")),style:ge(t(m)?t(g):void 0)},[j(l.$slots,"default",{},()=>[ue(ie(l.label),1)])],6)):R("v-if",!0)],2)}}});var me=W(Oe,[["__file","checkbox-button.vue"]]);const Me=Ce({modelValue:{type:xe(Array),default:()=>[]},disabled:Boolean,min:Number,max:Number,size:X,label:String,fill:String,textColor:String,tag:{type:String,default:"div"},validateEvent:{type:Boolean,default:!0},...Z(["ariaLabel"])}),Re={[U]:e=>N(e),change:e=>N(e)},Ae=L({name:"ElCheckboxGroup"}),Ke=L({...Ae,props:Me,emits:Re,setup(e,{emit:c}){const d=e,n=K("checkbox"),{formItem:m}=A(),{inputId:b,isLabeledByFormItem:v}=te(d,{formItemContext:m}),o=async r=>{c(U,r),await le(),c("change",r)},f=k({get(){return d.modelValue},set(r){o(r)}});return ye(B,{...Ve(Se(d),["size","min","max","disabled","validateEvent","fill","textColor"]),modelValue:f,changeEvent:o}),$({from:"label",replacement:"aria-label",version:"2.8.0",scope:"el-checkbox-group",ref:"https://element-plus.org/en-US/component/checkbox.html"},k(()=>!!d.label)),_(()=>d.modelValue,()=>{d.validateEvent&&(m==null||m.validate("change").catch(r=>ee()))}),(r,s)=>{var p;return y(),oe(re(r.tag),{id:t(b),class:x(t(n).b("group")),role:"group","aria-label":t(v)?void 0:r.label||r.ariaLabel||"checkbox-group","aria-labelledby":t(v)?(p=t(m))==null?void 0:p.labelId:void 0},{default:se(()=>[j(r.$slots,"default")]),_:3},8,["id","class","aria-label","aria-labelledby"])}}});var fe=W(Ke,[["__file","checkbox-group.vue"]]);const qe=Le(we,{CheckboxButton:me,CheckboxGroup:fe});de(me);const Qe=de(fe);export{qe as E,Qe as a};
