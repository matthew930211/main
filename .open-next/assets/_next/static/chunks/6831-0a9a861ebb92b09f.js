"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6831],{90825:function(e,a,t){var c=t(57437);t(2265);var l=t(43861),r=t(56767),o=t(682);a.Z=()=>{var e,a;let{user:t,isLoaded:s}=(0,o.aF)();return(0,c.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-4 mt-6",children:(null===r.L||void 0===r.L?void 0:r.L.length)>0&&s?null===r.L||void 0===r.L?void 0:null===(e=r.L.slice(0,4))||void 0===e?void 0:e.map((e,a)=>(0,c.jsx)(l.Z,{title:null==e?void 0:e.title,url:null==e?void 0:e.url,cover:null==e?void 0:e.cover,category:null==e?void 0:e.category,source:null==e?void 0:e.source,id:null==e?void 0:e.id},a)):null===(a=Array.from([,,,,]))||void 0===a?void 0:a.map((e,a)=>(0,c.jsx)("div",{className:"h-[350px] bg-[#0F1117] rounded-2xl"},a))})}},43861:function(e,a,t){var c=t(57437),l=t(2265),r=t(51352);t(20703);var o=t(88148);t(22810);var s=t(42362),i=t(19239),d=t(75266),p=t(84353),n=t(71399);a.Z=e=>{let{title:a,url:t,cover:u,category:v,source:m,id:f,className:h}=e,[x,g]=(0,l.useState)(!1),{toast:b}=(0,i.pm)(),S=async e=>{console.log("clipboard : ",e);try{await navigator.clipboard.writeText(e),b({title:"Copied to clipboard",variant:"default",action:(0,c.jsx)("div",{className:"!bg-[#3faa56] p-1 flex items-center justify-center rounded-full",children:(0,c.jsx)(n.l_A,{className:"!text-[#FDFFFF]"})})})}catch(e){console.error("Failed to copy text:",e)}};return(0,c.jsx)("div",{className:(0,p.cn)("h-[400px]",h),children:(0,c.jsxs)(r.Vq,{open:x,onOpenChange:g,children:[(0,c.jsx)(r.hg,{asChild:!0,children:(0,c.jsx)("div",{className:"w-full h-full rounded-2xl cursor-pointer relative",style:{background:'url("'.concat(u,'") rgba(0,0,0,0.3)'),backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundBlendMode:"darken"},children:(0,c.jsx)("div",{className:"absolute bottom-0 left-0 w-full z-50 bg-transparent rounded-b-2xl py-4",children:(0,c.jsx)("p",{className:"text-white text-xs px-4",children:a})})})}),(0,c.jsxs)(r.cZ,{className:"sm:max-w-[425px] md:max-w-[500px] min-h-[85vh] bg-black/95 border border-white/10 backdrop-blur-sm text-white",children:[(0,c.jsx)(r.fK,{}),(0,c.jsx)("div",{className:"w-full",children:(0,c.jsx)(o.DefaultPlayer,{className:"w-full h-[400px] rounded-3xl mt-4",children:(0,c.jsx)("source",{src:"".concat(t),type:"video/mp4",className:""})})}),(0,c.jsx)("div",{className:"w-full flex items-end justify-end mt-2",children:(0,c.jsx)("div",{className:"flex items-center gap-x-2 flex-wrap sm:flex-nowrap justify-end",children:(0,c.jsxs)("div",{className:"flex items-center gap-x-2 text-sm text-neutral-200 pt-2",children:[(0,c.jsx)("div",{onClick:()=>S(f),className:"cursor-pointer bg-gray-500/40 hover:bg-gray-500/30 rounded-md flex items-center justify-center p-2",children:(0,c.jsx)(s.VD6,{})}),(null==f?void 0:f.length)>10?(null==f?void 0:f.slice(0,10))+"...":f]})})}),(0,c.jsxs)("div",{className:"mt-4 px-2",children:[(0,c.jsxs)("div",{className:"mt-4",children:[(0,c.jsx)("h4",{className:"text-xs text-neutral-500",children:"Title"}),(0,c.jsx)("p",{className:"text-neutral-200 text-sm mt-2",children:a})]}),(0,c.jsxs)("div",{className:"mt-4",children:[(0,c.jsx)("h4",{className:"text-xs text-neutral-500",children:"Source"}),(0,c.jsxs)("p",{className:"text-neutral-200 text-sm mt-2",children:["FEATURED_ASSETS"===m&&"#featured-assets","PUBLIC_ASSETS"===m&&"#community-creations"]})]}),(0,c.jsx)(d.Z,{asset_url:t,public_thumbnail:u,className:"!bg-[#4F46E5] hover:!bg-[#4F46E5]/30",isPublicClip:!0})]}),(0,c.jsx)(r.cN,{})]})]})})}},96498:function(e,a,t){t.r(a);var c=t(57437),l=t(18413),r=t(7908),o=t(2265),s=t(88148);t(22810);var i=t(61975);a.default=e=>{var a;let{userId:t,limit:d}=e,[p,n]=(0,o.useState)(!0),[u,v]=(0,o.useState)(null),[m,f]=(0,o.useState)(!1),[h,x]=(0,o.useState)(d||1),g=async()=>{try{var e,a,c,l,o;n(!0);let s=await r.Z.get("".concat("http://23.176.184.83:8000/api","/assets/get-recent-created-video?user_id=").concat(t,"&&asset_status=DRAFT&&limit=").concat(h||1));(null==s?void 0:null===(e=s.data)||void 0===e?void 0:e.success)&&(null==s?void 0:null===(c=s.data)||void 0===c?void 0:null===(a=c.videos)||void 0===a?void 0:a.length)>0?(v(null==s?void 0:null===(l=s.data)||void 0===l?void 0:l.videos),console.log(null==s?void 0:null===(o=s.data)||void 0===o?void 0:o.video),n(!1)):(n(!1),f(!0),x(1))}catch(e){console.log(e),n(!1)}};return(0,o.useEffect)(()=>{t&&g()},[t]),(0,o.useEffect)(()=>{x(d)},[d]),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-".concat(h," gap-4"),children:[(null==u?void 0:u.length)>0&&(null==u?void 0:u.map((e,a)=>(0,c.jsx)("div",{className:"mt-6",children:(0,c.jsx)("div",{className:"bg-gray-500/0 backdrop-blur-md px-0 py-0 min-h-72 rounded-2xl",children:(0,c.jsx)("div",{className:"mt-0 flex items-center gap-x-4 w-full",children:!p&&(0,c.jsx)("div",{className:"w-full bg-gray-500/20 p-2 rounded-3xl",children:(0,c.jsx)(s.DefaultPlayer,{className:"h-[300px] rounded-3xl",children:(0,c.jsx)("source",{src:"".concat(null==e?void 0:e.location),type:"video/mp4",className:""})})})})})},a))),m&&!p&&(0,c.jsx)("div",{className:"py-2 mt-4",children:(0,c.jsxs)("div",{className:"border-2 border-neutral-500/20 w-full h-[250px] rounded-2xl flex flex-col gap-y-2 items-center justify-center  text-neutral-300/50",children:[(0,c.jsx)(i.LsT,{className:"text-5xl"}),(0,c.jsx)("p",{className:"text-sm",children:"No Recent Videos"}),(0,c.jsx)("p",{className:"text-xs",children:"Your recent creation will appear here"})]})})]}),p&&(0,c.jsx)("div",{className:"grid grid-cols-1 lg:grid-cols-".concat(h," gap-y-4 w-full mt-6 gap-4"),children:null===(a=Array.from(Array(d)))||void 0===a?void 0:a.map((e,a)=>(0,c.jsx)(l.O,{className:"w-full h-[300px] bg-gray-500/20 flex items-center justify-center",children:(0,c.jsx)(l.O,{className:"bg-gray-400/40 w-[50px] h-[50px] rounded-lg"})},a))})]})}},18413:function(e,a,t){t.d(a,{O:function(){return r}});var c=t(57437),l=t(84353);function r(e){let{className:a,...t}=e;return(0,c.jsx)("div",{className:(0,l.cn)("animate-pulse rounded-md bg-neutral-900/10 dark:bg-neutral-50/10",a),...t})}},56767:function(e,a,t){t.d(a,{L:function(){return c}});let c=[{id:"p-df9f9e0f-a3b1-4d0a-92b7-6c655a85bd9f",category:"minecraft",source:"PUBLIC_ASSETS",title:"TENZ teach a way to play good",url:"".concat("http://23.176.184.83:5000/api/v1","/uploads/public/1.mp4"),cover:"".concat("http://23.176.184.83:5000/api/v1","/uploads/covers/1.jpg")},{id:"p-31853b92-1fa8-409c-a552-0ece4f2c939f",category:"minecraft",source:"PUBLIC_ASSETS",title:"Encounter with a smurf reyna",url:"".concat("http://23.176.184.83:5000/api/v1","/uploads/public/2.mp4"),cover:"".concat("http://23.176.184.83:5000/api/v1","/uploads/covers/2.jpg")},{id:"p-f28d1faa-5d49-4d73-a865-9b63f8498765",category:"minecraft",source:"PUBLIC_ASSETS",title:"Sunset Map new changes",url:"".concat("http://23.176.184.83:5000/api/v1","/uploads/public/3.mp4"),cover:"".concat("http://23.176.184.83:5000/api/v1","/uploads/covers/3.jpg")},{id:"p-ca1bc359-0d7f-4503-80eb-56748d7c8560",category:"minecraft",source:"PUBLIC_ASSETS",title:"Valorant has a problem",url:"".concat("http://23.176.184.83:5000/api/v1","/uploads/public/4.mp4"),cover:"".concat("http://23.176.184.83:5000/api/v1","/uploads/covers/4.jpg")},{id:"p-38085d61-120a-4664-aef6-36715f9e1b12",category:"minecraft",source:"PUBLIC_ASSETS",title:"Who clutches here?",url:"".concat("http://23.176.184.83:5000/api/v1","/uploads/public/5.mp4"),cover:"".concat("http://23.176.184.83:5000/api/v1","/uploads/covers/5.jpg")},{id:"p-5fbc343d-75e2-48b6-9a27-c520be9e482d",category:"minecraft",source:"PUBLIC_ASSETS",title:"Pulled this variants out of the drafts",url:"".concat("http://23.176.184.83:5000/api/v1","/uploads/public/6.mp4"),cover:"".concat("http://23.176.184.83:5000/api/v1","/uploads/covers/6.jpg")},{id:"p-847614dd-93d9-4b52-ae19-a10f2343d1d5",category:"minecraft",source:"PUBLIC_ASSETS",title:"This is why valorant is a horror game",url:"".concat("http://23.176.184.83:5000/api/v1","/uploads/public/7.mp4"),cover:"".concat("http://23.176.184.83:5000/api/v1","/uploads/covers/7.jpg")},{id:"p-488b55c8-d18f-490e-927a-11ebd754c57b",category:"minecraft",source:"PUBLIC_ASSETS",title:"Bro is cooked for this game",url:"".concat("http://23.176.184.83:5000/api/v1","/uploads/public/8.mp4"),cover:"".concat("http://23.176.184.83:5000/api/v1","/uploads/covers/8.jpg")},{id:"p-36d3c912-f476-4ec3-bc1f-09202c8a47a6",category:"minecraft",source:"PUBLIC_ASSETS",title:"IShowSpeed Minecraft chase",url:"".concat("http://23.176.184.83:5000/api/v1","/uploads/public/9.mp4"),cover:"".concat("http://23.176.184.83:5000/api/v1","/uploads/covers/9.jpg")},{id:"p-36f1a3ed-3961-4293-a3a4-f839ad3da5dd",category:"minecraft",source:"PUBLIC_ASSETS",title:"I found temple of notch",url:"".concat("http://23.176.184.83:5000/api/v1","/uploads/public/10.mp4"),cover:"".concat("http://23.176.184.83:5000/api/v1","/uploads/covers/10.jpg")},{id:"p-5109709e-ac84-4db3-98ff-a9e99b1cced1",category:"minecraft",source:"PUBLIC_ASSETS",title:"Minecraft Meme",url:"".concat("http://23.176.184.83:5000/api/v1","/uploads/public/11.mp4"),cover:"".concat("http://23.176.184.83:5000/api/v1","/uploads/covers/11.jpg")},{id:"p-544e212f-7542-4332-acaa-5dcf3a68de37",category:"minecraft",source:"PUBLIC_ASSETS",title:"Minecraft Oddly Satisfying",url:"".concat("http://23.176.184.83:5000/api/v1","/uploads/public/12.mp4"),cover:"".concat("http://23.176.184.83:5000/api/v1","/uploads/covers/12.jpg")},{id:"p-151c0ea9-bcdc-4f2e-ae4a-d536ba5ac5f0",category:"minecraft",source:"PUBLIC_ASSETS",title:"Would you win?",url:"".concat("http://23.176.184.83:5000/api/v1","/uploads/public/13.mp4"),cover:"".concat("http://23.176.184.83:5000/api/v1","/uploads/covers/13.jpg")},{id:"p-407400dd-bfef-477a-99d1-1de06cbf0911",category:"minecraft",source:"PUBLIC_ASSETS",title:"The Architect",url:"".concat("http://23.176.184.83:5000/api/v1","/uploads/public/14.mp4"),cover:"".concat("http://23.176.184.83:5000/api/v1","/uploads/covers/14.jpg")},{id:"p-254b081c-63b2-45b1-813b-4514adfe85a4",category:"minecraft",source:"PUBLIC_ASSETS",title:"In hardcore playing 14 hours",url:"".concat("http://23.176.184.83:5000/api/v1","/uploads/public/15.mp4"),cover:"".concat("http://23.176.184.83:5000/api/v1","/uploads/covers/15.jpg")},{id:"p-13e5439d-4d6f-4318-9f46-2bbdad52e19f",category:"minecraft",source:"FEATURED_ASSETS",title:"Noob VS Pro | Funny Moments 101 | Caught live | 4k Live",url:"".concat("http://23.176.184.83:5000/api/v1","/uploads/public/p-13e5439d-4d6f-4318-9f46-2bbdad52e19f.mp4"),cover:"".concat("http://23.176.184.83:5000/api/v1","/uploads/covers/p-cf525eee-03bd-4deb-a4ec-98d158be7911.jpg")},{id:"p-544e212f-7542-4332-acaa-5dcf3a68de37",category:"minecraft",source:"FEATURED_ASSETS",title:"How to build a indestructible house in minecraft",url:"".concat("http://23.176.184.83:5000/api/v1","/uploads/public/p-544e212f-7542-4332-acaa-5dcf3a68de37.mp4"),cover:"".concat("http://23.176.184.83:5000/api/v1","/uploads/covers/p-6bb07356-be55-425d-851a-26fa12d37269.jpg")},{id:"p-2cdbb438-10f1-40d4-9774-982b73504f34",category:"minecraft",source:"FEATURED_ASSETS",title:"Minecraft Gaming -969 IQ | Hot shot | Brain Dead Moment",url:"".concat("http://23.176.184.83:5000/api/v1","/uploads/public/p-2cdbb438-10f1-40d4-9774-982b73504f34.mp4"),cover:"".concat("http://23.176.184.83:5000/api/v1","/uploads/covers/p-478e616f-ed25-40a9-8ad9-4a56fa01d348.png")}]}}]);