import{r as i,j as t,N as l}from"./index-CXFHqG3B.js";import{a as o}from"./axios-CCb-kr4I.js";import{S as r}from"./sweetalert2.esm.all-DOYwHpwi.js";function h(){const[s,n]=i.useState([]);i.useEffect(()=>{o.get("https://project-apiif-3-b.vercel.app/api/api/fakultas").then(e=>{console.log(e.data.result),n(e.data.result)}).catch(e=>{console.log("Error: ",e)})},[]);const c=(e,u)=>{r.fire({title:"Are you sure?",text:`You won't be able to revert this! Fakultas: ${u}`,icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete it!"}).then(d=>{d.isConfirmed&&o.delete(`https://project-apiif-3-b.vercel.app/api/api/fakultas/${e}`).then(()=>{n(s.filter(a=>a.id!==e)),r.fire("Deleted!","Your data has been deleted.","success")}).catch(a=>{console.error("Error deleting data:",a),r.fire("Error","There was an issue deleting the data.","error")})})};return t.jsxs(t.Fragment,{children:[t.jsx("h2",{children:"List Fakultas"}),t.jsx(l,{to:"/fakultas/create",className:"btn btn-primary my-4",children:"Create"}),t.jsx("ul",{className:"list-group",children:s.map(e=>t.jsxs("li",{className:"list-group-item d-flex justify-content-between align-items-center",children:[t.jsx("span",{children:e.nama}),t.jsxs("div",{className:"btn-group",role:"group","aria-label":"Action buttons",children:[t.jsx(l,{to:`/fakultas/edit/${e.id}`,className:"btn btn-warning",children:"Edit"}),t.jsx("button",{onClick:()=>c(e.id,e.nama),className:"btn btn-danger",children:"Delete"})]})]},e.id))})]})}export{h as default};
