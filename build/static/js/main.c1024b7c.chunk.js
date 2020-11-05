(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{18:function(e,n,t){e.exports=t(40)},40:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(16),u=t.n(o),c=t(6),l=t(2),i=function(e){var n=e.value,t=e.onChange;return r.a.createElement("form",null,r.a.createElement("div",null,"filter shown with: ",r.a.createElement("input",{value:n,onChange:t})))},m=function(e){return r.a.createElement("form",{onSubmit:e.addPerson},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:e.newName,onChange:e.handleNameChange})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:e.newNumber,onChange:e.handleNumberChange})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},s=t(17),d=function(e){var n=e.persons,t=e.searchCon,a=e.removePerson,o=function(e){var n=e.person;return r.a.createElement("div",null,n.name," ",n.number," ",r.a.createElement("button",{onClick:function(){return a(n)}},"delete"))};return Object(s.a)(n).filter((function(e){return e.name.toUpperCase().includes(t.toUpperCase())})).map((function(e){return r.a.createElement(o,{key:e.name,person:e})}))},f=t(4),h=t.n(f),b=function(){return h.a.get("/api/persons").then((function(e){return e.data}))},p=function(e){return h.a.post("/api/persons",e).then((function(e){return e.data}))},v=function(e){var n=e.id,t="http://localhost:3001/api/persons/".concat(n);return h.a.delete(t)},E=function(e){return h.a.put("http://localhost:3001/api/persons/".concat(e.id),e).then((function(e){return e.data}))},g=function(e){var n=e.message;if(null===n)return null;var t={color:"red",background:"white",fontSize:22,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10};return n.includes("ERROR:")||n.includes("Person validation failed")?r.a.createElement("div",{style:t},n):r.a.createElement("div",{style:{color:"green",background:"white",fontSize:22,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10}},n)},w=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],o=n[1],u=Object(a.useState)(""),s=Object(l.a)(u,2),f=s[0],h=s[1],w=Object(a.useState)(""),O=Object(l.a)(w,2),j=O[0],C=O[1],k=Object(a.useState)(""),y=Object(l.a)(k,2),S=y[0],N=y[1],R=Object(a.useState)(null),T=Object(l.a)(R,2),P=T[0],B=T[1];Object(a.useEffect)((function(){b().then((function(e){o(e)}))}),[]);return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(g,{message:P}),r.a.createElement(i,{value:S,onChange:function(e){N(e.target.value)}}),r.a.createElement("h2",null,"Add new"),r.a.createElement(m,{addPerson:function(e){if(e.preventDefault(),t.some((function(e){return e.name===f.trim()})))window.confirm("".concat(f," is already added to phonebook, replace the old number with a new one?"))?(!function(e,n){var a=t.filter((function(n){return n.name===e.trim()}))[0],r=Object(c.a)(Object(c.a)({},a),{},{number:n}),u=a.id;E(r).then((function(e){o(t.map((function(n){return n.id===u?e:n})))})).catch((function(e){B("ERROR: The person ".concat(a.name," has already been removed from the server.")),setTimeout((function(){B(null)}),5e3)}))}(f,j),B("The number for ".concat(f," has been changed.")),setTimeout((function(){B(null)}),5e3),h(""),C("")):alert("Did not modify number for ".concat(f.trim(),"."));else{var n={name:f,number:j};p(n).then((function(e){o(t.concat(e)),h(""),C(""),B("".concat(n.name," has been added to the phonebook.")),setTimeout((function(){B(null)}),5e3)})).catch((function(e){B(e.response.data.error),setTimeout((function(){B(null)}),5e3)}))}},newName:f,handleNameChange:function(e){h(e.target.value)},newNumber:j,handleNumberChange:function(e){C(e.target.value)}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(d,{persons:t,searchCon:S,removePerson:function(e){window.confirm("Delete ".concat(e.name,"?"))&&v(e).then(o(t.filter((function(n){return n.id!==e.id}))),B("".concat(e.name," has been removed from the phonebook.")),setTimeout((function(){B(null)}),5e3))}}))};u.a.render(r.a.createElement(w,null),document.getElementById("root"))}},[[18,1,2]]]);
//# sourceMappingURL=main.c1024b7c.chunk.js.map