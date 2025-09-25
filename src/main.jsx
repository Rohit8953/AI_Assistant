import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider, ClerkLoaded, ClerkLoading } from '@clerk/clerk-react'
import { Provider } from 'react-redux'
import store from './Redux/store.js'
import { Sparkles } from 'lucide-react'

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file');
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <ClerkLoading>
           <div className="flex flex-col items-center min-h-screen justify-center py-12">
                <div className="relative mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                        <Sparkles className="w-8 h-8 text-blue-500 animate-spin" />
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-20 animate-ping"></div>
                </div>
            </div>
        </ClerkLoading>

        <ClerkLoaded>
          <Provider store={store}>
            <App />
          </Provider>
        </ClerkLoaded>
      </ClerkProvider>
    </StrictMode>
  </BrowserRouter>
)
