import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter,RouterProvider} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Signup from './components/AuthentificationPages/Signup.jsx';
import Dashboard from './Dashboard.jsx'
import Login from './components/AuthentificationPages/Login.jsx'
import Wallet from './components/Wallet.jsx';
import CreateAcount from './components/CreateAcount.jsx';
import SuccessAcount from './components/SuccessAcount.jsx';
import Categories from './components/Categories.jsx';
import Subcategories from './components/Subcategories.jsx';
import Budget from './components/Budget.jsx';
import CreateBudget from './components/CreateBudget.jsx';
import SuccessBudget from './components/SuccessBudget.jsx';
import Transaction from './components/Transaction.jsx';
import { AuthProvider } from './AuthContext.jsx';
import ProtectedRoute from './ProtectedRoutes.jsx';





const routes= createBrowserRouter([
  {
     path:"/",
     element: <Login/>
  },
  {
    path:"/signup",
    element: <Signup/>
 },
{
  path:"/dashboard",
  element:
    <Dashboard /> 
},
{
  path:"/wallet",
  element:<ProtectedRoute>
    <Wallet/>
  </ProtectedRoute>
  
},
{
  path:"/createacount",
  element:<ProtectedRoute>
    <CreateAcount/>
  </ProtectedRoute>
  
},
{
  path:"/toastacountsuccescreated",
  element:<ProtectedRoute>
    <SuccessAcount/>
  </ProtectedRoute>
},
{
  path:"/Categories",
  element:<ProtectedRoute>
    <Categories/>
  </ProtectedRoute>
  
},
{
  path:"/subcategories",
  element:<ProtectedRoute>
          <Subcategories/>
          </ProtectedRoute>
  
},
{
  path:"/budget",
  element:<ProtectedRoute>
    <Budget/>
  </ProtectedRoute>
  
},
{
  path:"/createbudget",
  element:<ProtectedRoute>
    <CreateBudget/>
  </ProtectedRoute>
},
{
  path:"/toastbudgetsuccescreated",
  element:<ProtectedRoute>
  <SuccessBudget/>
 </ProtectedRoute>
},
{
  path:"/transaction",
  element:<ProtectedRoute>
          <Transaction/>
         </ProtectedRoute>
}

])

createRoot(document.getElementById('root')).render(
  
    <AuthProvider>
    <StrictMode>
    <Toaster />
    <RouterProvider router={routes} />
  </StrictMode>
  </AuthProvider>

)
