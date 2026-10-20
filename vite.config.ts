import {tanstackStart} from '@tanstack/react-start/plugin/vite';
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {nitro} from 'nitro/vite';
import {fileURLToPath} from 'node:url';
export default defineConfig({resolve:{alias:{'@':fileURLToPath(new URL('./src',import.meta.url))}},plugins:[tanstackStart(),nitro({preset:'vercel'}),react()]});
