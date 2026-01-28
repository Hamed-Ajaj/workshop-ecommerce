import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/navbar.tsx'
import { Toaster } from './components/ui/sonner.tsx'

createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<StrictMode>
			<div className='w-full flex flex-col'>
				<Navbar />
				<main className='w-full'>
					<App />
				</main>
			</div>
			<Toaster />
		</StrictMode>
	</BrowserRouter>
)
