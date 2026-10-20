import {createFileRoute} from "@tanstack/react-router";
import {useEffect,useRef,useState} from "react";
import {ScrollScrub} from "@/components/scroll-scrub/scroll-scrub";
import {scenesByLanguage,scrollScrubTheme} from "@/scroll-scrub-scenes";
import {copy,locales,photos,estimateStay,type Lang} from "@/villa";
export const Route=createFileRoute("/")({
 validateSearch:(s:Record<string,unknown>)=>({lang:(["hr","en","de"].includes(String(s.lang))?s.lang:"hr") as Lang}),
 component:Villa,
});
const email="mpercec.private@gmail.com";
const iso=(d:Date)=>[d.getFullYear(),String(d.getMonth()+1).padStart(2,"0"),String(d.getDate()).padStart(2,"0")].join("-");
function Villa(){
 const {lang}:{lang:Lang}=Route.useSearch();const navigate=Route.useNavigate();const t=copy[lang];const locale=locales[lang];
 const [today,setToday]=useState("2026-10-19");const [month,setMonth]=useState(new Date(2026,9,1));
 const [arrival,setArrival]=useState("");const [departure,setDeparture]=useState("");const [guests,setGuests]=useState(2);
 const [activePhoto,setActivePhoto]=useState(0);const dialog=useRef<HTMLDialogElement>(null);
 const [notice,setNotice]=useState("");const [error,setError]=useState(false);const [draft,setDraft]=useState("");
 useEffect(()=>{const now=new Date();setToday(iso(now));setMonth(new Date(now.getFullYear(),now.getMonth(),1));},[]);
 useEffect(()=>{document.documentElement.lang=lang;document.title="Villa Kaia | "+t.cta;setNotice("");setDraft("");},[lang,t.cta]);
 const estimate=arrival>=today?estimateStay(arrival,departure):null;
 const money=(n:number)=>new Intl.NumberFormat(locale,{style:"currency",currency:"EUR",maximumFractionDigits:0}).format(n);
 function selectDate(value:string){setError(false);setNotice("");setDraft("");if(!arrival||departure||value<=arrival){setArrival(value);setDeparture("");}else setDeparture(value);}
 function message(){if(!estimate)return "";return [t.request,"",t.arrival+": "+arrival,t.departure+": "+departure,t.guests+": "+guests,t.estimate+": "+money(estimate.total)+" ("+estimate.nights+" "+(estimate.nights===1?t.nightSingle:t.nights)+")","",t.confirm].join("\n");}
 function openEmail(){if(!estimate){setError(true);return;}const text=message();setDraft(text);window.location.href="mailto:"+email+"?subject="+encodeURIComponent(t.subject)+"&body="+encodeURIComponent(text);}
 async function copyRequest(){if(!estimate){setError(true);return;}setDraft(message());try{await navigator.clipboard.writeText(message());setNotice(t.copied);}catch{setNotice("");}}
 function calendar(offset:number){
 const d=new Date(month.getFullYear(),month.getMonth()+offset,1);const first=(d.getDay()+6)%7;const days=new Date(d.getFullYear(),d.getMonth()+1,0).getDate();
 return <div className="calendar-month" key={offset}><h3>{new Intl.DateTimeFormat(locale,{month:"long",year:"numeric"}).format(d)}</h3>
 <div className="calendar-grid weekdays">{Array.from({length:7},(_,i)=><span key={i}>{new Intl.DateTimeFormat(locale,{weekday:"short"}).format(new Date(2026,9,19+i))}</span>)}</div>
 <div className="calendar-grid">{Array.from({length:first},(_,i)=><span key={"blank"+i}/>)}
 {Array.from({length:days},(_,i)=>{const date=iso(new Date(d.getFullYear(),d.getMonth(),i+1));const selected=date===arrival||date===departure;return <button type="button" key={date} disabled={date<today} aria-label={new Intl.DateTimeFormat(locale,{dateStyle:"full"}).format(new Date(d.getFullYear(),d.getMonth(),i+1))} aria-pressed={selected} className={(selected?"selected ":"")+(arrival&&departure&&date>arrival&&date<departure?"in-range":"")} onClick={()=>selectDate(date)}>{i+1}</button>;})}</div></div>;
 }
 return <>
 <a className="skip-link" href="#booking">{t.skip}</a>
 <header className="site-header"><a className="wordmark" href="#top" aria-label="Villa Kaia"><img src="/assets/brand/mark.png" alt="" width="30" height="30"/><span>VILLA KAIA</span></a>
 <nav className="main-nav" aria-label={t.footer}>{t.nav.map((label,i)=><a key={i} href={["#villa","#gallery","#booking","#rates"][i]}>{label}</a>)}</nav>
 <div className="languages" aria-label="Language">{(["hr","en","de"] as Lang[]).map((l,i)=><button key={l} lang={l} type="button" aria-label={["Hrvatski","English","Deutsch"][i]} aria-pressed={lang===l} onClick={()=>navigate({search:{lang:l},replace:true,resetScroll:false})}><span aria-hidden="true">{["🇭🇷","🇬🇧","🇩🇪"][i]}</span> {l.toUpperCase()}</button>)}</div></header>
 <main id="top">
 <ScrollScrub scenes={scenesByLanguage[lang]} theme={scrollScrubTheme} className="villa-tour"/>
 <p className="tour-caption">{t.tourNote}</p>
 <section className="intro section" id="villa"><div className="intro-copy"><p className="eyebrow">KRINGA · ISTRA</p><h2>{t.intro}</h2><p>{t.introBody}</p><div className="facts">{t.facts.slice(0,3).map((f,i)=><div key={f}><img src={"/assets/brand/icon-"+i+".png"} alt="" width="36" height="36"/><span>{f}</span></div>)}</div></div><img className="terrace-image" src={photos[1]} alt={t.photos[1]} width="1024" height="651" loading="lazy"/></section>
 <section className="gallery section" id="gallery"><h2>{t.gallery}</h2><p className="section-lead">{t.galleryBody}</p><div className="photo-grid">{[3,4,5].map((n,i)=><figure key={n} className={"gallery-photo photo-"+i}><button onClick={()=>{setActivePhoto(n);dialog.current?.showModal();}} aria-label={t.photos[n]}><img src={photos[n]} alt={t.photos[n]} loading="lazy" width="1024" height="651"/></button><figcaption>{t.photos[n]} <span aria-hidden="true">↗</span></figcaption></figure>)}</div><div className="comfort-strip">{t.facts.slice(3).map((f,i)=><span key={f}><img src={"/assets/brand/icon-"+(i+3)+".png"} alt="" width="28" height="28"/>{f}</span>)}</div></section>
 <section className="booking section" id="booking"><h2>{t.book}</h2><p className="section-lead">{t.bookBody}</p>
 <div className="booking-layout"><div className="calendars"><div className="calendar-toolbar"><span>{t.availability}</span><div><button type="button" aria-label={t.prev} disabled={month.getFullYear()===Number(today.slice(0,4))&&month.getMonth()===Number(today.slice(5,7))-1} onClick={()=>setMonth(new Date(month.getFullYear(),month.getMonth()-1,1))}>←</button><button type="button" aria-label={t.next} onClick={()=>setMonth(new Date(month.getFullYear(),month.getMonth()+1,1))}>→</button></div></div><div className="months">{calendar(0)}{calendar(1)}</div><button className="clear-dates" type="button" onClick={()=>{setArrival("");setDeparture("");setDraft("");setError(false);}}>{t.reset}</button><p className="availability-note">{t.availabilityNote}</p></div>
 <form className="reservation" onSubmit={e=>{e.preventDefault();openEmail();}}>
 <label htmlFor="arrival">{t.arrival}</label><input id="arrival" type="date" min={today} value={arrival} required onChange={e=>{setArrival(e.target.value);setError(false);setDraft("");}}/>
 <label htmlFor="departure">{t.departure}</label><input id="departure" type="date" min={arrival||today} value={departure} required onChange={e=>{setDeparture(e.target.value);setError(false);setDraft("");}}/>
 <label htmlFor="guests">{t.guests}</label><select id="guests" value={guests} onChange={e=>{setGuests(Number(e.target.value));setDraft("");setNotice("");}}>{Array.from({length:8},(_,i)=><option value={i+1} key={i}>{i+1}</option>)}</select>
 <div className="estimate" aria-live="polite"><span>{t.estimate}</span><strong>{estimate?money(estimate.total):t.select}</strong>{estimate&&<small>{estimate.nights} {estimate.nights===1?t.nightSingle:t.nights}</small>}</div>
 {error&&<p role="alert" id="booking-error">{t.error}</p>}
 <button className="enquire" type="submit">{t.send} <span aria-hidden="true">↗</span></button>
 <button className="copy-enquiry" type="button" onClick={copyRequest}>{t.copy}</button><p className="mail-note">{t.mailNote}</p><p aria-live="polite">{notice}</p>
 {draft&&<textarea className="enquiry-draft" aria-label={t.subject} readOnly value={draft} rows={8}/>}
 </form></div></section>
 <section className="rates section" id="rates"><img src={photos[2]} alt={t.photos[2]} loading="lazy" width="1024" height="651"/><div><h2>{t.prices}</h2><div className="rate-rows">{[350,450,600].map((rate,i)=><div className="rate-row" key={rate}><div><h3>{t.seasons[i]}</h3><p>{t.periods[i]}</p></div><strong>{money(rate)}</strong></div>)}</div><p className="rate-note">{t.priceNote}</p></div></section>
 <section className="location section"><div><p className="eyebrow">KRINGA, HRVATSKA</p><h2>{t.location}</h2><p>{t.locationBody}</p><a className="map-link" href="https://maps.app.goo.gl/qtL7XFw6o5UyoP6Y7" target="_blank" rel="noreferrer">{t.map} <span aria-hidden="true">↗</span></a></div><div className="location-mark"><span>45.1849° N</span><strong>Kringa</strong><span>13.8330° E</span></div></section>
 <section className="night-finale"><img src={photos[6]} alt={t.photos[6]} loading="lazy" width="2506" height="1240"/><div><h2>{t.night}</h2><a href="#booking">{t.cta} <span aria-hidden="true">↗</span></a></div></section>
 </main><footer><a className="wordmark" href="#top">VILLA KAIA</a><p>{t.footer}</p><a href={"mailto:"+email}>{t.email}</a><small>{t.privacy}</small></footer>
 <dialog ref={dialog} className="lightbox" onClick={e=>{if(e.target===e.currentTarget)dialog.current?.close();}}><button className="close-lightbox" type="button" onClick={()=>dialog.current?.close()}>{t.close} ×</button><img src={photos[activePhoto]} alt={t.photos[activePhoto]}/><p>{t.photos[activePhoto]}</p><div className="lightbox-thumbs">{photos.map((p,i)=><button key={p} type="button" aria-label={t.photos[i]} aria-pressed={i===activePhoto} onClick={()=>setActivePhoto(i)}><img src={p} alt="" loading="lazy"/></button>)}</div></dialog>
 </>;
}
