(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[475],{6670:function(e,t,l){(window.__NEXT_P=window.__NEXT_P||[]).push(["/[project]",function(){return l(9496)}])},451:function(e,t,l){"use strict";l.d(t,{Z:function(){return a}});var s=l(5893),r=l(3935),o=l(6958);function a(e){let{project:t,color:l,backgroundColor:a}=e;return r.createPortal((0,s.jsxs)("div",{className:"floatingCard fixed w-[250px] h-[500px]",style:{backgroundColor:l,right:"-60vw",bottom:0,transform:"rotateX(30deg)"},children:[(0,s.jsxs)(o.Z,{className:"font-mono uppercase",gradient:!1,speed:50,style:{color:a,width:"calc(100% - 20px)"},children:[t.title," -- ",t.title," -- ",t.title," -- ",t.title," -- ",t.title," -- ",t.title," --"]}),(0,s.jsx)("div",{className:"absolute",style:{top:"calc(50% - 20px)",transform:"translateX(-1px)"},children:(0,s.jsxs)(o.Z,{className:"font-mono uppercase",gradient:!1,speed:25,style:{color:a,width:"calc(500px - 20px)",transform:"rotate(90deg)"},children:[t.title," -- ",t.title," -- ",t.title," -- ",t.title," -- ",t.title," -- ",t.title," --"]})}),(0,s.jsx)("div",{className:"absolute",style:{left:"-100%",top:"50%",transform:"translateX(19px)"},children:(0,s.jsxs)(o.Z,{className:"font-mono uppercase",gradient:!1,speed:25,style:{color:a,width:"calc(500px - 20px)",transform:"rotate(-90deg)"},children:[t.title," -- ",t.title," -- ",t.title," -- ",t.title," -- ",t.title," -- ",t.title," --"]})}),(0,s.jsx)("div",{className:"absolute",style:{top:"100%",transform:"translate(20px, -100%)"},children:(0,s.jsxs)(o.Z,{className:"font-mono uppercase",gradient:!1,speed:50,style:{color:a,width:"calc(100% - 20px)",transform:"rotate(180deg)"},children:[t.title," -- ",t.title," -- ",t.title," -- ",t.title," -- ",t.title," -- ",t.title," --"]})}),(0,s.jsx)("p",{className:"absolute font-bold inset-[26px] text-2xl uppercase",style:{color:a,textAlign:"justify"},children:t.description})]}),document.querySelector(".crt"))}},5048:function(e,t,l){"use strict";l.d(t,{Z:function(){return d}});var s=l(5893),r=l(7294),o=l(9849),a=l(3935);let n=null,i=null,c=null;function d(e){let{scene:t,onLoad:l,onItemSelected:d,hidden:m}=e,u=document.querySelector(".container3d"),x=null==u?void 0:u.getBoundingClientRect(),[h,p]=(0,r.useState)({background:"repeating-radial-gradient(#000 0 0.0001%,#FFF 0 0.0002%) 50% 0/2500px 2500px, repeating-conic-gradient(#000 0 0.0001%,#FFF 0 0.0002%) 60% 60%/2500px 2500px",backgroundBlendMode:"difference",animation:"b .2s infinite alternate"});return n||(n=null==x?void 0:x.width,c=null==x?void 0:x.x),(!i||i<400)&&(i=(null==x?void 0:x.height)+40),window.addEventListener("resize",()=>{n=null==(x=null==(u=document.querySelector(".container3d"))?void 0:u.getBoundingClientRect())?void 0:x.width,c=null==x?void 0:x.x,i=null==x?void 0:x.height,document.querySelector(".spline-container").style.top=(null==x?void 0:x.y)-40+"px",document.querySelector(".spline-container").style.left=c+"px",document.querySelector(".spline-container").style.width=n+"px",document.querySelector(".spline-container").style.height=i+40+"px"}),a.createPortal((0,s.jsx)("div",{className:"spline-container fixed",style:{top:(null==x?void 0:x.y)-40,left:c,width:n,height:i,clipPath:"polygon(15% 0%, 91% 0%, 99% 100%, 0% 100%)",visibility:m?"hidden":"visible"},children:(0,s.jsx)(o.Z,{scene:t,onLoad:l,onMouseDown:function(e){d(e.target.name)},onMouseHover:function(e){console.log("Hovering",e.target)}})}),document.querySelector(".crt"))}},9496:function(e,t,l){"use strict";l.r(t),l.d(t,{__N_SSG:function(){return O},default:function(){return R}});var s=l(5893),r=l(9008),o=l.n(r),a=l(1163),n=l(7294),i=l(6958),c=l(7568),d=l.n(c),m=l(8573),u=l(4579),x=l(5675),h=l.n(x);let p={},f=e=>{let{image:t}=e,{alternativeText:l,width:r,height:o}=t.data.attributes;return(0,s.jsx)(h(),{layout:"responsive",height:o,width:r,objectFit:"contain",src:function(e){let{url:t}=e.data.attributes,l=t.startsWith("/")?(0,u.p)(t):t;return l}(t),alt:l||"",className:"my-6",style:p})};var g=l(6038),j=e=>{let{color:t,backgroundColor:l,name:r,url:o}=e;return(0,s.jsxs)("a",{href:o,target:"_blank",onMouseOver:function(){g.p8.to(".external-overlay",{clipPath:"inset(0 0 0 0%)",duration:1,ease:"Expo.easeOut"})},onMouseLeave:function(){g.p8.to(".external-overlay",{clipPath:"inset(0 0 0 100%)",duration:1,ease:"Expo.easeOut"})},className:"relative flex align-center justify-between pl-12 -mx-10 border-y-8 y-20",style:{borderColor:t,width:"calc(100% + 6rem)"},children:[(0,s.jsxs)("div",{className:"py-6",children:[(0,s.jsx)("div",{className:"font-mono uppercase",children:"Visit Page"}),(0,s.jsx)("div",{className:"font-black text-3xl uppercase",children:r}),(0,s.jsx)("div",{className:"w-28 absolute top-8 right-0 overflow-hidden",children:(0,s.jsx)("svg",{width:"48",height:"48",version:"1.1",viewBox:"0 0 700 700",xmlns:"http://www.w3.org/2000/svg",style:{fill:t},children:(0,s.jsxs)("g",{"fill-rule":"evenodd",children:[(0,s.jsx)("path",{d:"m132.39 547.11-49.496-49.496 494.98-494.98 49.496 49.496z"}),(0,s.jsx)("path",{d:"m560 525v-525h70v525z"}),(0,s.jsx)("path",{d:"m105 70v-70h525v70z"})]})})})]}),(0,s.jsxs)("div",{className:"absolute external-overlay inset-0 flex align-center justify-between y-20",style:{paddingLeft:"5.5rem",backgroundColor:t,color:l,clipPath:"inset(0 0 0 100%)"},children:[(0,s.jsxs)("div",{className:"pt-6",style:{marginLeft:"-2.5rem"},children:[(0,s.jsx)("div",{className:"font-mono uppercase",children:"Visit Page"}),(0,s.jsx)("div",{className:"font-black text-3xl uppercase",children:r})]}),(0,s.jsx)("div",{className:"w-28 absolute top-8 right-0 overflow-hidden",children:(0,s.jsx)("svg",{width:"48",height:"48",version:"1.1",viewBox:"0 0 700 700",xmlns:"http://www.w3.org/2000/svg",style:{fill:l},children:(0,s.jsxs)("g",{"fill-rule":"evenodd",children:[(0,s.jsx)("path",{d:"m132.39 547.11-49.496-49.496 494.98-494.98 49.496 49.496z"}),(0,s.jsx)("path",{d:"m560 525v-525h70v525z"}),(0,s.jsx)("path",{d:"m105 70v-70h525v70z"})]})})})]})]})},v=l(9417),y=l(7814),b=e=>{let{author:t,content:l,color:r,backgroundColor:o}=e;return(0,s.jsxs)("div",{className:"border-8",style:{borderColor:r},children:[(0,s.jsxs)("div",{className:"flex pa-2 pb-3",style:{backgroundColor:r},children:[(0,s.jsx)(y.G,{className:"mr-2",icon:v.y1i,style:{fontSize:24,color:o}}),(0,s.jsx)("div",{className:"font-mono uppercase",style:{color:o},children:t})]}),(0,s.jsx)("p",{className:"m-2 font-mono",children:l})]})},N=e=>{let{src:t,className:l,style:r,caption:o}=e;return(0,s.jsxs)("div",{children:[(0,s.jsx)("img",{src:t,className:l,style:r}),o?(0,s.jsx)("p",{className:"mt-2 text-small w-40",children:o}):""]})},w=e=>{let{images:t,color:l,backgroundColor:r}=e;return(0,s.jsx)(s.Fragment,{children:(0,s.jsx)(i.Z,{className:"marquee",gradient:!1,speed:10,style:{color:r,alignItems:"start"},children:t.map(e=>(0,s.jsx)(N,{src:e.url,className:"object-contain h-full mr-6",style:{maxHeight:400},caption:e.caption}))})})},C=l(4288),k=e=>{let{block:t,color:l,backgroundColor:r}=e;return(0,s.jsxs)("div",{className:"border-8 my-4",style:{borderColor:l},children:[(0,s.jsx)("div",{className:"flex pa-2 pb-3",style:{backgroundColor:l},children:(0,s.jsx)("div",{className:"font-mono uppercase",style:{color:r},children:"OBJECTIVE"})}),t.items.map(e=>(0,s.jsxs)("div",{className:"flex items-center mx-2",children:[(0,s.jsx)(y.G,{className:"mr-2",icon:C.chG,style:{fontSize:18,color:l}}),(0,s.jsx)("p",{className:"m-2 font-mono",children:e.textline})]}))]})},E=e=>{let{items:t,color:l,backgroundColor:r}=e,[o,a]=(0,n.useState)(0);return(0,s.jsxs)("div",{className:"flex",children:[(0,s.jsx)("div",{className:"w-1/4 border-8 cursor-pointer",style:{borderColor:l},children:t.map((e,t)=>(0,s.jsx)("button",{className:"block w-full",onClick:()=>a(t),style:{backgroundColor:o==t?l:r,color:o==t?r:l},children:e.key}))}),(0,s.jsxs)("div",{className:"w-3/4 p-4",children:[(0,s.jsx)("h3",{children:t[o].key}),(0,s.jsx)("p",{className:"font-mono",children:t[o].value})]})]})};let T={};var P=e=>{let{section:t,color:l,backgroundColor:r}=e;return(0,s.jsx)("ul",{children:t.map((e,t)=>(function(e,t,l,r,o){switch(console.log("RENDER BLOCK",e,t,l),t.toLowerCase()){case"shared.rich-text":return(0,s.jsx)("li",{className:"section-item",children:(0,s.jsx)(m.D,{className:"".concat(d().variable," font-mono w-full"),children:l.body,style:{color:r}})},e);case"shared.external":return(0,s.jsx)("li",{className:"section-item",children:(0,s.jsx)(j,{color:r,backgroundColor:o,name:l.name,url:l.url})},e);case"shared.recommendation":return(0,s.jsx)("li",{className:"section-item",children:(0,s.jsx)(b,{author:l.author,content:l.content,color:r,backgroundColor:o})},e);case"shared.media":return(0,s.jsx)("li",{className:"section-item",children:(0,s.jsx)(f,{image:l.file})},e);case"shared.image":return(0,s.jsx)("li",{className:"section-item",children:(0,s.jsx)("img",{className:"my-6",src:l.url,alt:""})},e);case"shared.video":return(0,s.jsx)("li",{className:"section-item",children:(0,s.jsx)("video",{autoPlay:!0,muted:!0,loop:!0,style:T,src:l.url})},e);case"shared.objective":return(0,s.jsx)("li",{className:"section-item",children:(0,s.jsx)(k,{block:l,color:r,backgroundColor:o})},e);case"shared.carousel":return(0,s.jsx)("li",{className:"section-item",children:(0,s.jsx)(w,{images:l.images})},e);case"shared.desplegable":return(0,s.jsx)("li",{className:"section-item",children:(0,s.jsx)(E,{items:l.item,color:r,backgroundColor:o})},e);default:return(0,s.jsx)("li",{className:"section-item",children:(0,s.jsx)("div",{})},e)}})(t,e.__component,e,l,r))})},B=l(5048),S=l(451),_=l(6546),O=!0;function R(e){let{project:t,nextProject:l,color:r,backgroundColor:c,goToProject:d,onTransition:m,setTransition:u,...x}=e;console.log(l);let h=(0,a.useRouter)(),p=(0,n.useRef)(null),f=(0,n.useRef)(null),[j,v]=(0,n.useState)(!1),[y,b]=(0,n.useState)(0),[N,w]=(0,n.useState)(!0),[C,k]=(0,n.useState)(!1),[E,T]=(0,n.useState)({id:0,name:"ABOUT"}),[O,R]=(0,n.useState)({background:"repeating-radial-gradient(#000 0 0.0001%,#FFF 0 0.0002%) 50% 0/2500px 2500px, repeating-conic-gradient(#000 0 0.0001%,#FFF 0 0.0002%) 60% 60%/2500px 2500px",backgroundBlendMode:"difference",animation:"b .2s infinite alternate"}),[q,z]=(0,n.useState)({}),I="";t.technologies.data.forEach(e=>{I+=e.attributes.name.toUpperCase()+" // "}),(0,n.useEffect)(()=>{setInterval(()=>{v(!j)},2e3),_.ScrollTrigger.create({trigger:".container3d",scroller:"#scrollarea",start:"top top",end:"50% top",onEnterBack:e=>w(!0),onLeave:e=>w(!1)})},[]),(0,n.useEffect)(()=>{var e,l,s,o;f.current.scrollTo(0,0),R({background:"repeating-radial-gradient(".concat(c," 0 0.0001%,").concat(r," 0 0.0002%) 50% 0/2500px 2500px, repeating-conic-gradient(").concat(c," 0 0.0001%,").concat(r," 0 0.0002%) 60% 60%/2500px 2500px"),backgroundBlendMode:"difference",animation:"b .2s infinite alternate"}),document.getElementById("projectBar").style.height=document.getElementById("scrollarea").offsetHeight+"px",document.getElementById("projectBar__rotated-content").style.width=(null===(e=document.getElementById("projectBar"))||void 0===e?void 0:e.offsetHeight)+"px",document.getElementById("projectBar__rotated-content").style.height=(null===(l=document.getElementById("projectBar"))||void 0===l?void 0:l.offsetWidth)+"px";let a=((null===(s=document.getElementById("projectBar"))||void 0===s?void 0:s.offsetWidth)-(null===(o=document.getElementById("projectBar"))||void 0===o?void 0:o.offsetHeight))/2;document.getElementById("projectBar__rotated-content").style.top=-a+"px",document.getElementById("projectBar__rotated-content").style.left=a+"px",g.p8.set(".navbarProjectTitle",{yPercent:110}),setTimeout(()=>{u(!1)},1e3),z({});let n={},i=null;t.content.forEach(e=>{console.log(e),"section.section-name"===e.__component?(n[e.name]=[],i=n[e.name]):i.push(e)}),console.log(n),z(n);let d=g.p8.timeline(),m=document.querySelector(".tv-off");null==m||m.getBoundingClientRect(),document.querySelector("#scrollarea"),d.to(".tv-off__top, .tv-off__bottom",{height:0,duration:.5,ease:"Expo.easeIn"}),d.set(".tv-off",{zIndex:0,display:"none"})},[h.asPath]);let F=!1,X=e=>{let t=e.currentTarget.clientHeight,s=e.currentTarget.scrollHeight,r=e.currentTarget.scrollTop;b((t+r)/s*100);let o=Array.from(document.getElementsByClassName("contentBlock"));for(let e=o.length-1;e>0;e-=1)if(console.log(r,o[e].id.toUpperCase(),o[e].offsetTop),r>o[e].offsetTop){T({id:e,name:o[e].id.toUpperCase()});break}if(r>0)F||(F=!0,g.p8.to(".navbarProjectTitle",{yPercent:0,duration:1}),g.p8.to(".floatingCard",{right:"-25vw",top:.6*window.innerHeight,zIndex:20,rotation:0}));else{var a;F=!1;let e=window.innerWidth-(null===(a=document.querySelector("main"))||void 0===a?void 0:a.getBoundingClientRect().right);g.p8.to(".floatingCard",{right:e+200,bottom:-60,rotation:-18}),g.p8.to(".navbarProjectTitle",{yPercent:110,duration:1})}l&&(t+r>s-p.current.clientHeight/2?C||(k(!0),g.p8.to(".nextProjectOverlay",{clipPath:"inset(0 0% 0 0)",duration:3,ease:"linear",overwrite:!0,onComplete:()=>d("next")})):C&&(k(!1),g.p8.to(".nextProjectOverlay",{clipPath:"inset(0 100% 0 0)",duration:3,ease:"linear",overwrite:!0})))},J={transformOrigin:"bottom right",transform:"rotate(-90deg)",position:"absolute",top:0,right:12,fontSize:"2em"};return"linear-gradient(130deg, ".concat(r," 25%, ").concat(c," 25%, ").concat(c," 50%, ").concat(r," 50%, ").concat(r," 75%, ").concat(c," 75%, ").concat(c," 100%)"),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(o(),{children:[(0,s.jsxs)("title",{children:[t.title," - Andriu Garcia"]}),(0,s.jsx)("meta",{name:"description",content:t.description}),(0,s.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"})]}),(0,s.jsxs)("main",{ref:f,id:"scrollarea",className:"overflow-y-scroll h-full",style:{color:r},onScroll:X,children:[(0,s.jsx)("div",{id:"topProject"}),(0,s.jsxs)("div",{className:"grid grid-cols-8 grid-rows-6 h-full",children:[(0,s.jsxs)("div",{className:"container3d relative row-start-1 row-end-5 col-start-1 col-end-7 border-r-8",style:{borderColor:r},children:[m||!N?(0,s.jsx)("div",{className:"w-full h-full",style:O}):(0,s.jsx)(s.Fragment,{}),m?(0,s.jsx)(s.Fragment,{}):(0,s.jsx)(B.Z,{scene:t.spline,onLoad:function(){var e;let t=window.innerWidth-(null===(e=document.querySelector("main"))||void 0===e?void 0:e.getBoundingClientRect().right);g.p8.to(".floatingCard",{right:t+200,top:.6*window.innerHeight,zIndex:20,rotation:-18}),_.ScrollTrigger.refresh()},hidden:!N})]}),(0,s.jsx)("div",{className:"row-start-1 row-end-5 col-start-7 col-end-9 overflow-hidden",children:t.highlights.map(e=>{let{highlight:t}=e;return(0,s.jsx)("div",{className:"p-6",children:(0,s.jsx)("div",{className:"highlight text-xl",children:t.toUpperCase()})})})}),(0,s.jsxs)("div",{className:"row-start-5 row-end-7 col-start-1 col-end-9 border-y-8",style:{borderColor:r},children:[(0,s.jsx)("div",{className:"h-1/3 flex items-center border-b-8",style:{borderColor:r,backgroundColor:r},children:(0,s.jsx)(i.Z,{className:"marquee",gradient:!1,speed:40,style:{color:c,fontSize:"56px"},children:m?"////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////":I})}),(0,s.jsx)("div",{className:"h-2/3 pl-10 flex items-center",style:{borderColor:r},children:(0,s.jsx)("h1",{className:"project-title overflow-y-hidden text-9xl font-black uppercase flex",children:t.title.split("").map(e=>(0,s.jsx)("div",{className:"title-char",children:e}))})})]})]}),(0,s.jsxs)("div",{className:"flex content",children:[m?"":(0,s.jsx)("div",{className:"w-[70%]",children:Object.entries(q).map(e=>(console.log("SECTION",e),(0,s.jsxs)("div",{id:e[0].toLowerCase(),className:"contentBlock flex",children:[(0,s.jsx)("div",{className:"relative border-8 -ml-4 -mt-2 w-20 mh-40",style:{borderColor:r},children:(0,s.jsx)("div",{className:"sticky h-80 top-0 pr-2",children:(0,s.jsx)("h2",{className:"text-xl font-black uppercase",style:{color:r,...J},children:e[0]})})}),(0,s.jsx)("section",{className:"pb-10 px-10",style:{width:"calc(100% - 5rem)"},children:(0,s.jsx)(P,{section:e[1],color:r,backgroundColor:c})})]})))}),(0,s.jsx)("div",{className:"border-l-8 w-[30%]",style:{marginLeft:"auto",borderColor:r},children:(0,s.jsx)("div",{id:"projectBar",className:"sticky top-0",children:(0,s.jsxs)("div",{id:"projectBar__rotated-content",className:"absolute flex",style:{transform:"rotate(-90deg)"},children:[(0,s.jsx)("div",{className:"absolute top-0 right-2 h-6 w-1",style:{backgroundColor:r}}),(0,s.jsx)("div",{className:"absolute top-0 right-2 h-6 w-1 mr-2",style:{backgroundColor:r}}),(0,s.jsx)("div",{className:"absolute top-0 right-2 h-6 w-1 mr-4",style:{backgroundColor:r}}),(0,s.jsxs)("div",{className:"w-1/3 relative flex flex-col justify-between items-center p-6",children:[(0,s.jsxs)("div",{className:"relative w-[200px] aspect-square rounded-full",style:{backgroundColor:r},children:[(0,s.jsx)("div",{className:"absolute top-[50%] left-[50%] w-20 h-20 rounded-full",style:{backgroundColor:c,transform:"translate(-50%, -50%)"}}),(0,s.jsx)("div",{className:"absolute top-[50%] left-[50%] w-1 h-1 rounded-full",style:{backgroundColor:r,transform:"translate(-50%, -50%)"}}),(0,s.jsx)("div",{className:"circleText",style:{transform:"rotate(".concat(3.6*y,"deg)")},children:(0,s.jsx)("p",{className:"uppercase text-mono",children:"".concat(E.name," \xb7 ").concat(E.name," \xb7 ").concat(E.name," \xb7 ").concat(E.name," \xb7 ").split("").map((e,t)=>(0,s.jsx)("span",{style:{color:c,transform:"rotate("+360*t/((E.name.length+3)*4)+"deg"},children:e}))})}),(0,s.jsx)("div",{className:"absolute bottom-[-12px] right-0 w-6 h-6 rounded-full",style:{backgroundColor:r}})]}),(0,s.jsx)("div",{className:"font-black text-5xl",style:{color:r},children:"PROJECT"}),(0,s.jsxs)("div",{className:"absolute top-6 right-0",children:[(0,s.jsx)("div",{className:"w-6 h-6",style:{backgroundColor:r}}),(0,s.jsx)("div",{className:"w-6 h-6 mt-4",style:{backgroundColor:r}})]})]}),(0,s.jsxs)("div",{className:"w-2/3 relative p-6 flex flex-col justify-between",children:[(0,s.jsxs)("div",{className:"relative flex flex-col justify-start items-end flex-wrap w-full h-[50%]",children:[(0,s.jsx)("div",{className:"absolute text-xl font-bold top-0 left-0",children:"["}),(0,s.jsx)("div",{className:"absolute text-xl font-bold bottom-0 right-0",children:"]"}),Object.entries(q).map((e,t)=>(0,s.jsx)("div",{className:"w-[30%]",children:(0,s.jsx)("div",{className:"font-bold",style:{backgroundColor:E.id===t?r:c,color:E.id===t?c:r},children:t+1+"   "+e[0].toUpperCase()})}))]}),(0,s.jsxs)("div",{children:[(0,s.jsxs)("div",{className:"flex justify-end mb-2",children:[(0,s.jsx)("div",{className:"w-6 h-6 mr-2",style:{backgroundColor:r}}),(0,s.jsx)("div",{className:"recordingSquare w-6 h-6 border-4",style:{borderColor:r,backgroundColor:j?r:c}})]}),(0,s.jsx)(i.Z,{className:"marquee font-mono uppercase",gradient:!1,speed:12,style:{color:r,fontSize:"12px"},children:[...Array(32)].map((e,t)=>" "+E.name+" \xb7 ")}),(0,s.jsx)("div",{className:"border-4 relative",style:{width:"100%",height:32,borderColor:r},children:(0,s.jsx)("div",{className:"scrollStatus absolute right-0 top-0 bottom-0",style:{backgroundColor:r,left:100-y+"%"}})})]})]})]})})})]}),l?(0,s.jsxs)("div",{ref:p,className:"relative -mt-2",children:[(0,s.jsx)("div",{className:"border-y-8",style:{borderColor:r},children:(0,s.jsx)(i.Z,{className:"marquee",gradient:!1,speed:40,style:{fontSize:"56px"},children:"NEXT PROJECT -- NEXT PROJECT -- NEXT PROJECT -- NEXT PROJECT -- NEXT PROJECT -- NEXT PROJECT --"})}),(0,s.jsx)("div",{className:"nextProject pl-10 flex items-center",style:{borderColor:r},children:(0,s.jsx)("span",{className:"overflow-y-hidden text-9xl font-black uppercase flex",children:l.title})}),(0,s.jsxs)("div",{className:"nextProjectOverlay absolute z-10 inset-0",style:{clipPath:"inset(0 100% 0 0)"},children:[(0,s.jsx)("div",{className:"border-y-8",style:{backgroundColor:r,color:c,borderColor:r},children:(0,s.jsx)(i.Z,{className:"marquee",gradient:!1,speed:40,style:{fontSize:"56px"},children:"NEXT PROJECT -- NEXT PROJECT -- NEXT PROJECT -- NEXT PROJECT -- NEXT PROJECT -- NEXT PROJECT --"})}),(0,s.jsx)("div",{className:"pl-10 flex items-center",style:{backgroundColor:r,color:c,borderColor:c},children:(0,s.jsx)("span",{className:"overflow-y-hidden text-9xl font-black uppercase flex",children:l.title})})]})]}):"",(0,s.jsx)(S.Z,{project:t,color:r,backgroundColor:c})]})]})}}},function(e){e.O(0,[918,690,649,774,888,179],function(){return e(e.s=6670)}),_N_E=e.O()}]);