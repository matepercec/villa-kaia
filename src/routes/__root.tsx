import {QueryClient,QueryClientProvider} from "@tanstack/react-query";
import {Outlet,createRootRouteWithContext,HeadContent,Scripts,useRouter} from "@tanstack/react-router";
import {type ReactNode} from "react";
import appCss from "../styles.css?url";
import appMeta from "../app-meta.json";
import {brandPaper} from "../villa";


export const Route=createRootRouteWithContext<{queryClient:QueryClient}>()({
 head:()=>({meta:[{charSet:"utf-8"},{name:"viewport",content:"width=device-width, initial-scale=1"},{title:appMeta.og_title},{name:"description",content:appMeta.og_description},{name:"theme-color",content:brandPaper},{property:"og:title",content:appMeta.og_title},{property:"og:description",content:appMeta.og_description},{property:"og:type",content:"website"},{property:"og:image",content:appMeta.og_image_url},{name:"twitter:card",content:"summary_large_image"},{name:"twitter:image",content:appMeta.og_image_url}],links:[{rel:"stylesheet",href:appCss},{rel:"icon",href:"/assets/brand/favicon.ico"},{rel:"apple-touch-icon",href:"/assets/brand/apple-touch-icon.png"},{rel:"manifest",href:"/site.webmanifest"}]}),
 shellComponent:Shell,component:Root,notFoundComponent:()=> <main className="section"><h1>Villa Kaia</h1><p>Stranica nije pronađena / Page not found / Seite nicht gefunden.</p><a href="/">Villa Kaia ↗</a></main>,errorComponent:ErrorPage
});
function ErrorPage({reset}:{reset:()=>void}){const router=useRouter();return <main className="section"><h1>Villa Kaia</h1><p>Molimo pokušajte ponovno. Please try again. Bitte erneut versuchen.</p><button onClick={()=>{router.invalidate();reset();}}>↻</button></main>;}
function Shell({children}:{children:ReactNode}){return <html lang="hr"><head><HeadContent/></head><body>{children}<Scripts/></body></html>;}
function Root(){const {queryClient}=Route.useRouteContext();return <QueryClientProvider client={queryClient}><Outlet/></QueryClientProvider>;}
