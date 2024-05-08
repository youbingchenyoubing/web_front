import{J as o,L as n,o as l,a8 as r,w as p,T as g,aK as m,cs as f,V as y,aD as c,W as h}from"./index.41bf9c1b.js";const v=o({name:"ElCollapseTransition"}),x=o({...v,setup(e){const d=n("collapse-transition"),s=t=>{t.style.maxHeight="",t.style.overflow=t.dataset.oldOverflow,t.style.paddingTop=t.dataset.oldPaddingTop,t.style.paddingBottom=t.dataset.oldPaddingBottom},i={beforeEnter(t){t.dataset||(t.dataset={}),t.dataset.oldPaddingTop=t.style.paddingTop,t.dataset.oldPaddingBottom=t.style.paddingBottom,t.style.height&&(t.dataset.elExistsHeight=t.style.height),t.style.maxHeight=0,t.style.paddingTop=0,t.style.paddingBottom=0},enter(t){requestAnimationFrame(()=>{t.dataset.oldOverflow=t.style.overflow,t.dataset.elExistsHeight?t.style.maxHeight=t.dataset.elExistsHeight:t.scrollHeight!==0?t.style.maxHeight=`${t.scrollHeight}px`:t.style.maxHeight=0,t.style.paddingTop=t.dataset.oldPaddingTop,t.style.paddingBottom=t.dataset.oldPaddingBottom,t.style.overflow="hidden"})},afterEnter(t){t.style.maxHeight="",t.style.overflow=t.dataset.oldOverflow},enterCancelled(t){s(t)},beforeLeave(t){t.dataset||(t.dataset={}),t.dataset.oldPaddingTop=t.style.paddingTop,t.dataset.oldPaddingBottom=t.style.paddingBottom,t.dataset.oldOverflow=t.style.overflow,t.style.maxHeight=`${t.scrollHeight}px`,t.style.overflow="hidden"},leave(t){t.scrollHeight!==0&&(t.style.maxHeight=0,t.style.paddingTop=0,t.style.paddingBottom=0)},afterLeave(t){s(t)},leaveCancelled(t){s(t)}};return(t,T)=>(l(),r(c,m({name:y(d).b()},f(i)),{default:p(()=>[g(t.$slots,"default")]),_:3},16,["name"]))}});var a=h(x,[["__file","collapse-transition.vue"]]);a.install=e=>{e.component(a.name,a)};const H=a,w=H;export{w as E,H as _};