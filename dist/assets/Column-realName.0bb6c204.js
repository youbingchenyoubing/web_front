import{bh as t,cn as i,_ as l,o as s,a8 as r}from"./index.41bf9c1b.js";import{E as o}from"./el-table-column.4b985531.js";const k=e=>t({url:"/system/unit/list",loading:!0,data:e}),v=e=>t({url:"/system/unit/tree",loading:!0,data:e}),A=e=>i({url:"/system/unit/add",loading:!0,data:e}),U=e=>i({url:"/system/unit/update",loading:!0,data:e}),g=e=>t({url:"/system/unit/delete/"+e.id,loading:!0}),$=e=>t({url:"/system/unit/get/"+e.id,loading:!0}),h={0:"\u666E\u901A\u8D26\u53F7",1:"\u8D85\u7EA7\u7BA1\u7406\u5458"},E=[{visible:!0,title:"\u9009\u4E2D\u5217",key:"ColumnCheckbox"},{visible:!0,title:"\u7528\u6237\u540D\u79F0",key:"ColumnUsername"},{visible:!0,title:"\u771F\u5B9E\u59D3\u540D",key:"ColumnRealName"},{visible:!0,title:"\u7528\u6237\u7C7B\u578B",key:"ColumnUserType"},{visible:!1,title:"\u7528\u6237\u90AE\u7BB1",key:"ColumnEmail"},{visible:!0,title:"\u7535\u8BDD\u53F7\u7801",key:"ColumnPhone"},{visible:!0,title:"\u7528\u6237\u6027\u522B",key:"ColumnGender"},{visible:!1,title:"\u5934\u50CF\u8DEF\u5F84",key:"ColumnAvatar"},{visible:!0,title:"\u8D26\u53F7\u72B6\u6001",key:"ColumnEnabled"},{visible:!1,title:"\u6700\u540E\u767B\u5F55ip",key:"ColumnLoginIp"},{visible:!1,title:"\u6700\u540E\u767B\u5F55\u65F6\u95F4",key:"ColumnLoginDate"},{visible:!1,title:"\u521B\u5EFA\u65F6\u95F4",key:"ColumnCreateTime"},{visible:!1,title:"\u7528\u6237\u5907\u6CE8",key:"ColumnRemark"},{visible:!0,title:"\u64CD\u4F5C",key:"ColumnAction"}],d={inheritAttrs:!1};function _(e,a,u,m,c,p){const n=o;return s(),r(n,{prop:"username",label:"\u7528\u6237\u540D\u79F0",align:"center","min-width":"120"})}const T=l(d,[["render",_]]),b={inheritAttrs:!1};function y(e,a,u,m,c,p){const n=o;return s(),r(n,{prop:"realName",label:"\u771F\u5B9E\u59D3\u540D",align:"center","min-width":"120"})}const R=l(b,[["render",y]]);export{v as A,T as C,E as T,h as U,R as a,$ as b,A as c,U as d,k as e,g as f};
