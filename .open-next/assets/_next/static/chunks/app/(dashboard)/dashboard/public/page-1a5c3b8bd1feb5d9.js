(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3001,8286,3326],{75391:function(e,t,a){Promise.resolve().then(a.bind(a,11538))},43861:function(e,t,a){"use strict";var c=a(57437),r=a(2265),l=a(51352);a(20703);var o=a(88148);a(22810);var s=a(42362),i=a(19239),p=a(75266),d=a(84353),n=a(71399);t.Z=e=>{let{title:t,url:a,cover:u,category:v,source:f,id:m,className:h}=e,[b,x]=(0,r.useState)(!1),{toast:g}=(0,i.pm)(),S=async e=>{console.log("clipboard : ",e);try{await navigator.clipboard.writeText(e),g({title:"Copied to clipboard",variant:"default",action:(0,c.jsx)("div",{className:"!bg-[#3faa56] p-1 flex items-center justify-center rounded-full",children:(0,c.jsx)(n.l_A,{className:"!text-[#FDFFFF]"})})})}catch(e){console.error("Failed to copy text:",e)}};return(0,c.jsx)("div",{className:(0,d.cn)("h-[400px]",h),children:(0,c.jsxs)(l.Vq,{open:b,onOpenChange:x,children:[(0,c.jsx)(l.hg,{asChild:!0,children:(0,c.jsx)("div",{className:"w-full h-full rounded-2xl cursor-pointer relative",style:{background:'url("'.concat(u,'") rgba(0,0,0,0.3)'),backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundBlendMode:"darken"},children:(0,c.jsx)("div",{className:"absolute bottom-0 left-0 w-full z-50 bg-transparent rounded-b-2xl py-4",children:(0,c.jsx)("p",{className:"text-white text-xs px-4",children:t})})})}),(0,c.jsxs)(l.cZ,{className:"sm:max-w-[425px] md:max-w-[500px] min-h-[85vh] bg-black/95 border border-white/10 backdrop-blur-sm text-white",children:[(0,c.jsx)(l.fK,{}),(0,c.jsx)("div",{className:"w-full",children:(0,c.jsx)(o.DefaultPlayer,{className:"w-full h-[400px] rounded-3xl mt-4",children:(0,c.jsx)("source",{src:"".concat(a),type:"video/mp4",className:""})})}),(0,c.jsx)("div",{className:"w-full flex items-end justify-end mt-2",children:(0,c.jsx)("div",{className:"flex items-center gap-x-2 flex-wrap sm:flex-nowrap justify-end",children:(0,c.jsxs)("div",{className:"flex items-center gap-x-2 text-sm text-neutral-200 pt-2",children:[(0,c.jsx)("div",{onClick:()=>S(m),className:"cursor-pointer bg-gray-500/40 hover:bg-gray-500/30 rounded-md flex items-center justify-center p-2",children:(0,c.jsx)(s.VD6,{})}),(null==m?void 0:m.length)>10?(null==m?void 0:m.slice(0,10))+"...":m]})})}),(0,c.jsxs)("div",{className:"mt-4 px-2",children:[(0,c.jsxs)("div",{className:"mt-4",children:[(0,c.jsx)("h4",{className:"text-xs text-neutral-500",children:"Title"}),(0,c.jsx)("p",{className:"text-neutral-200 text-sm mt-2",children:t})]}),(0,c.jsxs)("div",{className:"mt-4",children:[(0,c.jsx)("h4",{className:"text-xs text-neutral-500",children:"Source"}),(0,c.jsxs)("p",{className:"text-neutral-200 text-sm mt-2",children:["FEATURED_ASSETS"===f&&"#featured-assets","PUBLIC_ASSETS"===f&&"#community-creations"]})]}),(0,c.jsx)(p.Z,{asset_url:a,public_thumbnail:u,className:"!bg-[#4F46E5] hover:!bg-[#4F46E5]/30",isPublicClip:!0})]}),(0,c.jsx)(l.cN,{})]})]})})}},11538:function(e,t,a){"use strict";a.r(t);var c=a(57437),r=a(682),l=a(2265),o=a(56767),s=a(43861),i=a(52840);t.default=()=>{var e;let{user:t,isLoaded:a}=(0,r.aF)(),[p,d]=(0,l.useState)(""),[n,u]=(0,l.useState)(""),[v,f]=(0,l.useState)([]),[m,h]=(0,l.useState)([]),b=async e=>{try{let t=RegExp(e,"i"),a=o.L.filter(e=>t.test(e.title));h(o.L),f(a)}catch(e){console.error("Invalid regex pattern:",e.message),h(o.L),f([])}};return(0,l.useEffect)(()=>{f(o.L)},[o.L]),(0,c.jsxs)("div",{children:[(0,c.jsx)("div",{className:"w-full flex items-center gap-x-4 justify-end mt-10 mb-10",children:(0,c.jsxs)("div",{className:"flex items-center gap-x-2 border-b border-neutral-400/80 pb-2",children:[(0,c.jsx)(i.xue,{className:"text-neutral-400/80"}),(0,c.jsx)("input",{type:"text",placeholder:"Search",className:"bg-transparent text-neutral-400 placeholder:text-neutral-400/80 focus:!ring-0 !outline-none",value:p,onChange:e=>{var t;(null===(t=e.target.value)||void 0===t?void 0:t.length)===0&&f(m),d(e.target.value),b(e.target.value)}})]})}),(0,c.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-x-4 gap-y-4 mt-6 mb-6",children:[(null==v?void 0:v.length)>0&&a&&(null==v?void 0:v.map((e,t)=>(0,c.jsx)(s.Z,{title:null==e?void 0:e.title,url:null==e?void 0:e.url,cover:null==e?void 0:e.cover,category:null==e?void 0:e.category,source:null==e?void 0:e.source,id:null==e?void 0:e.id},t))),a?a&&(null==v?void 0:v.length)===0&&(0,c.jsx)("div",{className:"",children:(0,c.jsx)("p",{className:"text-neutral-200 text-xl",children:"No Clips Found"})}):null===(e=Array.from(Array(18)))||void 0===e?void 0:e.map((e,t)=>(0,c.jsx)("div",{className:"h-[350px] bg-[#0F1117] rounded-2xl"},t))]})]})}},56767:function(e,t,a){"use strict";a.d(t,{L:function(){return c}});let c=[{id:"p-df9f9e0f-a3b1-4d0a-92b7-6c655a85bd9f",category:"minecraft",source:"PUBLIC_ASSETS",title:"TENZ teach a way to play good",url:"".concat("http://23.176.184.83:5000/api/v1","/uploads/public/1.mp4"),cover:"".concat("http://23.176.184.83:5000/api/v1","/uploads/covers/1.jpg")},{id:"p-31853b92-1fa8-409c-a552-0ece4f2c939f",category:"minecraft",source:"PUBLIC_ASSETS",title:"Encounter with a smurf reyna",url:"".concat("http://23.176.184.83:5000/api/v1","/uploads/public/2.mp4"),cover:"".concat("http://23.176.184.83:5000/api/v1","/uploads/covers/2.jpg")},{id:"p-f28d1faa-5d49-4d73-a865-9b63f8498765",category:"minecraft",source:"PUBLIC_ASSETS",title:"Sunset Map new changes",url:"".concat("http://23.176.184.83:5000/api/v1","/uploads/public/3.mp4"),cover:"".concat("http://23.176.184.83:5000/api/v1","/uploads/covers/3.jpg")},{id:"p-ca1bc359-0d7f-4503-80eb-56748d7c8560",category:"minecraft",source:"PUBLIC_ASSETS",title:"Valorant has a problem",url:"".concat("http://23.176.184.83:5000/api/v1","/uploads/public/4.mp4"),cover:"".concat("http://23.176.184.83:5000/api/v1","/uploads/covers/4.jpg")},{id:"p-38085d61-120a-4664-aef6-36715f9e1b12",category:"minecraft",source:"PUBLIC_ASSETS",title:"Who clutches here?",url:"".concat("http://23.176.184.83:5000/api/v1","/uploads/public/5.mp4"),cover:"".concat("http://23.176.184.83:5000/api/v1","/uploads/covers/5.jpg")},{id:"p-5fbc343d-75e2-48b6-9a27-c520be9e482d",category:"minecraft",source:"PUBLIC_ASSETS",title:"Pulled this variants out of the drafts",url:"".concat("http://23.176.184.83:5000/api/v1","/uploads/public/6.mp4"),cover:"".concat("http://23.176.184.83:5000/api/v1","/uploads/covers/6.jpg")},{id:"p-847614dd-93d9-4b52-ae19-a10f2343d1d5",category:"minecraft",source:"PUBLIC_ASSETS",title:"This is why valorant is a horror game",url:"".concat("http://23.176.184.83:5000/api/v1","/uploads/public/7.mp4"),cover:"".concat("http://23.176.184.83:5000/api/v1","/uploads/covers/7.jpg")},{id:"p-488b55c8-d18f-490e-927a-11ebd754c57b",category:"minecraft",source:"PUBLIC_ASSETS",title:"Bro is cooked for this game",url:"".concat("http://23.176.184.83:5000/api/v1","/uploads/public/8.mp4"),cover:"".concat("http://23.176.184.83:5000/api/v1","/uploads/covers/8.jpg")},{id:"p-36d3c912-f476-4ec3-bc1f-09202c8a47a6",category:"minecraft",source:"PUBLIC_ASSETS",title:"IShowSpeed Minecraft chase",url:"".concat("http://23.176.184.83:5000/api/v1","/uploads/public/9.mp4"),cover:"".concat("http://23.176.184.83:5000/api/v1","/uploads/covers/9.jpg")},{id:"p-36f1a3ed-3961-4293-a3a4-f839ad3da5dd",category:"minecraft",source:"PUBLIC_ASSETS",title:"I found temple of notch",url:"".concat("http://23.176.184.83:5000/api/v1","/uploads/public/10.mp4"),cover:"".concat("http://23.176.184.83:5000/api/v1","/uploads/covers/10.jpg")},{id:"p-5109709e-ac84-4db3-98ff-a9e99b1cced1",category:"minecraft",source:"PUBLIC_ASSETS",title:"Minecraft Meme",url:"".concat("http://23.176.184.83:5000/api/v1","/uploads/public/11.mp4"),cover:"".concat("http://23.176.184.83:5000/api/v1","/uploads/covers/11.jpg")},{id:"p-544e212f-7542-4332-acaa-5dcf3a68de37",category:"minecraft",source:"PUBLIC_ASSETS",title:"Minecraft Oddly Satisfying",url:"".concat("http://23.176.184.83:5000/api/v1","/uploads/public/12.mp4"),cover:"".concat("http://23.176.184.83:5000/api/v1","/uploads/covers/12.jpg")},{id:"p-151c0ea9-bcdc-4f2e-ae4a-d536ba5ac5f0",category:"minecraft",source:"PUBLIC_ASSETS",title:"Would you win?",url:"".concat("http://23.176.184.83:5000/api/v1","/uploads/public/13.mp4"),cover:"".concat("http://23.176.184.83:5000/api/v1","/uploads/covers/13.jpg")},{id:"p-407400dd-bfef-477a-99d1-1de06cbf0911",category:"minecraft",source:"PUBLIC_ASSETS",title:"The Architect",url:"".concat("http://23.176.184.83:5000/api/v1","/uploads/public/14.mp4"),cover:"".concat("http://23.176.184.83:5000/api/v1","/uploads/covers/14.jpg")},{id:"p-254b081c-63b2-45b1-813b-4514adfe85a4",category:"minecraft",source:"PUBLIC_ASSETS",title:"In hardcore playing 14 hours",url:"".concat("http://23.176.184.83:5000/api/v1","/uploads/public/15.mp4"),cover:"".concat("http://23.176.184.83:5000/api/v1","/uploads/covers/15.jpg")},{id:"p-13e5439d-4d6f-4318-9f46-2bbdad52e19f",category:"minecraft",source:"FEATURED_ASSETS",title:"Noob VS Pro | Funny Moments 101 | Caught live | 4k Live",url:"".concat("http://23.176.184.83:5000/api/v1","/uploads/public/p-13e5439d-4d6f-4318-9f46-2bbdad52e19f.mp4"),cover:"".concat("http://23.176.184.83:5000/api/v1","/uploads/covers/p-cf525eee-03bd-4deb-a4ec-98d158be7911.jpg")},{id:"p-544e212f-7542-4332-acaa-5dcf3a68de37",category:"minecraft",source:"FEATURED_ASSETS",title:"How to build a indestructible house in minecraft",url:"".concat("http://23.176.184.83:5000/api/v1","/uploads/public/p-544e212f-7542-4332-acaa-5dcf3a68de37.mp4"),cover:"".concat("http://23.176.184.83:5000/api/v1","/uploads/covers/p-6bb07356-be55-425d-851a-26fa12d37269.jpg")},{id:"p-2cdbb438-10f1-40d4-9774-982b73504f34",category:"minecraft",source:"FEATURED_ASSETS",title:"Minecraft Gaming -969 IQ | Hot shot | Brain Dead Moment",url:"".concat("http://23.176.184.83:5000/api/v1","/uploads/public/p-2cdbb438-10f1-40d4-9774-982b73504f34.mp4"),cover:"".concat("http://23.176.184.83:5000/api/v1","/uploads/covers/p-478e616f-ed25-40a9-8ad9-4a56fa01d348.png")}]},46993:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"RouterContext",{enumerable:!0,get:function(){return c}});let c=a(86921)._(a(2265)).default.createContext(null)}},function(e){e.O(0,[8310,7240,7699,7259,614,5706,682,477,9033,6896,9015,5266,2971,8069,1744],function(){return e(e.s=75391)}),_N_E=e.O()}]);