import{a as d}from"./axios-L6U4YIEh.js";import{_ as c,c as m,a as s,h as u,g as i,v as l,F as p,o as _}from"./index-EW9bZN52.js";var h={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_PATH:"joychiang",BASE_URL:"/joychiang/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:f}=h,g={data(){return{user:{username:"",password:""}}},methods:{login(){d.post(`${f}/admin/signin`,this.user).then(o=>{const{token:e,expired:r}=o.data;document.cookie=`joyToken=${e}; expires=${new Date(r)}; path=/`,this.$router.push("admin/product")}).catch(o=>{console.log(o),alert(o.response.data.message)})}}},w=s("h2",null,"用戶登入頁面",-1),v={class:"container"},b={class:"row justify-content-center"},x=s("h1",{class:"h3 mb-3 font-weight-normal"},"請先登入",-1),y={class:"col-8"},E={class:"form-floating mb-3"},V=s("label",{for:"username"},"Email address",-1),T={class:"form-floating"},k=s("label",{for:"password"},"Password",-1),D=s("button",{class:"btn btn-lg btn-primary w-100 mt-3",type:"submit"},"登入",-1),R=s("p",{class:"mt-5 mb-3 text-muted"},"© 2021~∞ - 六角學院",-1);function U(o,e,r,j,n,a){return _(),m(p,null,[w,s("div",v,[s("div",b,[x,s("div",y,[s("form",{id:"form",class:"form-signin",onSubmit:e[2]||(e[2]=u((...t)=>a.login&&a.login(...t),["prevent"]))},[s("div",E,[i(s("input",{type:"email",class:"form-control",id:"username","onUpdate:modelValue":e[0]||(e[0]=t=>n.user.username=t),placeholder:"name@example.com",required:"",autofocus:""},null,512),[[l,n.user.username]]),V]),s("div",T,[i(s("input",{type:"password",class:"form-control",id:"password","onUpdate:modelValue":e[1]||(e[1]=t=>n.user.password=t),placeholder:"Password",required:""},null,512),[[l,n.user.password]]),k]),D],32)])]),R])],64)}const P=c(g,[["render",U]]);export{P as default};
