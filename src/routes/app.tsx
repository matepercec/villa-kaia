import {createFileRoute,redirect} from "@tanstack/react-router";
export const Route=createFileRoute("/app")({beforeLoad:()=>{throw redirect({to:"/",search:{lang:"hr"}});}});
