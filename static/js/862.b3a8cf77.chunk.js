"use strict";(self.webpackChunkreact_lesson_1=self.webpackChunkreact_lesson_1||[]).push([[862],{862:function(s,e,n){n.r(e),n.d(e,{default:function(){return S}});var i=n(9867),a=n(2276),t="Dialogs_dialog__21RWP",o="Dialogs_dialog_body__qB-FQ",r="Dialogs_dialog_item__4O2GW",d="Dialogs_active__zbGOs",l="Dialogs_messages__Q-0MF",u="Dialogs_messages_item__x5ZtV",c="Dialogs_photo__-33Se",g=n(5644),m=n(2834),h=function(s){var e="/dialogs/"+s.id;return(0,m.jsxs)("div",{className:r+" "+d,children:[(0,m.jsx)("img",{className:c,src:s.photo,alt:""}),(0,m.jsx)(g.OL,{to:e,children:(0,m.jsx)("span",{children:s.name})})]})},_=function(s){return(0,m.jsx)("div",{className:u,children:s.message})},f=n(4670),j=n(8488),x=n(9305),p=n(6933),v=n(5014),D=(0,v.D)(50),b=(0,x.Z)({form:"dialog-add-message-form"})((function(s){return(0,m.jsxs)("form",{onSubmit:s.handleSubmit,children:[(0,m.jsx)("div",{children:(0,m.jsx)(j.Z,{component:p.gx,validate:[v.C,D],name:"newMessageBody",placeholder:"Enter your message"})}),(0,m.jsx)("div",{children:(0,m.jsx)("button",{children:"Send"})})]})})),Z=function(s){var e=s.dialogsPage,n=e.dialogData.map((function(s){return(0,m.jsx)(h,{name:s.name,id:s.id,photo:s.photo},s.id)})),i=e.messagesData.map((function(s){return(0,m.jsx)(_,{message:s.message},s.id)}));e.newMessageBody;return s.isAuth?(0,m.jsxs)("div",{className:t,children:[(0,m.jsx)("div",{className:o,children:n}),(0,m.jsx)("div",{className:l,children:(0,m.jsxs)("div",{children:["  ",i," "]})}),(0,m.jsx)(b,{onSubmit:function(e){s.sendMessage(e.newMessageBody)}})]}):(0,m.jsx)(f.Fg,{to:"/login"})},y=n(4953),M=n(8683),N=n(5671),k=n(3144),w=n(136),C=n(516),S=(0,n(2040).qC)((0,y.$j)((function(s){return{dialogsPage:s.dialogsPage}}),(function(s){return{sendMessage:function(e){s((0,a.X)(e))}}})),(function(s){var e=function(e){(0,w.Z)(i,e);var n=(0,C.Z)(i);function i(){return(0,N.Z)(this,i),n.apply(this,arguments)}return(0,k.Z)(i,[{key:"render",value:function(){return this.props.isAuth?(0,m.jsx)(s,(0,M.Z)({},this.props)):(0,m.jsx)(f.Fg,{to:"/login"})}}]),i}(i.Component);return(0,y.$j)((function(s){return{isAuth:s.auth.isAuth}}))(e)}))(Z)}}]);
//# sourceMappingURL=862.b3a8cf77.chunk.js.map