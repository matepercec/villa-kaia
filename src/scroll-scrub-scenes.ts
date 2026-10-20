import {copy,type Lang} from "./villa";
import type {ScrollScrubScene,ScrollScrubTheme} from "./components/scroll-scrub/scroll-scrub";
import {createElement} from "react";
export const scrollScrubTheme:ScrollScrubTheme={accent:"#E4E2D9",background:"#30372F",ink:"#FFFFFF",muted:"#FFFFFF"};
const arrival={hr:{label:"Dolazak",body:"Vaš odmor počinje ovdje."},en:{label:"Arrival",body:"Your holiday begins here."},de:{label:"Ankunft",body:"Hier beginnt Ihr Urlaub."}};
function makeScenes(lang:Lang):ScrollScrubScene[]{
 const flight:ScrollScrubScene={id:"aerial-arrival",label:arrival[lang].label,title:"Villa Kaia",body:arrival[lang].body,clip:"/assets/world/arrival.mp4",mobileClip:"/assets/world/arrival-mobile.mp4",poster:"/assets/world/arrival-poster.jpg",mobilePoster:"/assets/world/arrival-mobile-poster.jpg",scroll:1.5,linger:0,actions:createElement("a",{href:"#booking",className:"tour-cta"},copy[lang].cta+" ↗")};
 return [flight,...copy[lang].titles.map((title,i)=>({id:"tour-"+i,label:copy[lang].labels[i],title,body:copy[lang].bodies[i],clip:"/assets/world/scene-0"+(i+1)+".mp4",mobileClip:"/assets/world/scene-0"+(i+1)+"-mobile.mp4",poster:"/assets/world/scene-0"+(i+1)+"-poster.jpg",mobilePoster:"/assets/world/scene-0"+(i+1)+"-mobile-poster.jpg",scroll:i===5?2.4:1.3,linger:0,actions:i===5?createElement("a",{href:"#booking",className:"tour-cta"},copy[lang].cta+" ↗"):undefined}))];
}
export const scenesByLanguage={hr:makeScenes("hr"),en:makeScenes("en"),de:makeScenes("de")};
