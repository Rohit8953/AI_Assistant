import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider, ClerkLoaded, ClerkLoading } from '@clerk/clerk-react'
import { Provider } from 'react-redux'
import store from './Redux/store.js'

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
          {/* Loader UI (can be a spinner, animation, etc.) */}
          <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
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
