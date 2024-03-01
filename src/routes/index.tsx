import React, { Suspense, lazy } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'


const RoutesComponent: React.FC =()=>{

    const Home = lazy(()=> import('../pages/home') );
    const Signup = lazy(()=> import('../pages/signup'));

    const Layout = lazy(()=>import('../container/layout'));
    const AdminLayout = lazy(()=>import('../container/adminLayout'));
    const VerifySignUp = lazy(()=>import('../pages/verifySignup'));
    const Login = lazy(()=>import('../pages/login'));
    const About = lazy(()=>import('../pages/about'));
    const ForgotPassword = lazy(()=>import('../pages/forgotPassword'));
    const ResetPassword = lazy(()=>import('../pages/resetPassword'));
    const AdminDashboard = lazy(()=>import('../pages/admin/dashboard'));
    const RegisteredUsers = lazy(()=>import('../pages/admin/registeredUsers'));
    const ContactedUsers = lazy(()=>import('../pages/admin/contactedUsers'));
    const OurProducts = lazy(()=>import('../pages/ourProducts'));
    const OurServices = lazy(()=>import('../pages/ourServices'));
    const OurClients = lazy(()=>import('../pages/ourClients'));
    const Consultation = lazy(()=>import('../pages/consultation'));
    const CraneCalculator = lazy(()=>import('../pages/craneCalculator'));

    return(
        
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path='/' element={<Layout/>}>
                    <Route index path='/' element={<Home/>}/>
                    <Route index path='/about' element={<About/>}/>
                    <Route index path='/products' element={<OurProducts/>}/>
                    <Route index path='/clients' element={<OurClients/>}/>
                    <Route index path='/services' element={<OurServices/>}/>
                    <Route index path='/consultation' element={<Consultation/>}/>
                    <Route index path='/craneCalculator' element={<CraneCalculator/>}/>
                </Route>
                {/* <Route index path='/home' element={<Home/>}/> */}
                <Route path='/signup' element={<Signup/>}/>
                <Route path='/verifysignup' element={<VerifySignUp/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/forgotpassword' element={<ForgotPassword/>}/>
                <Route path='/resetpassword' element={<ResetPassword/>}/>
                <Route path='/admin' element={<AdminLayout/>}>
                    <Route path='dashboard' element={<AdminDashboard/>}/>
                    <Route path='registeredusers' element={<RegisteredUsers/>}/>
                    <Route path='contactedusers' element={<ContactedUsers/>}/>
                </Route>
                
            </Routes>

        </Suspense>
        
    )
}

export default RoutesComponent;