import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AddJob from './Pages/AddJob';
import Dashboard from './Pages/Dashboard';
import SignIn from './Pages/Sign-In';
import ViewJobs from './Pages/ViewJobs';
import ViewUsers from './Pages/ViewUsers';
import { useEffect, useState } from 'react';
import { auth } from './Services/Firebase/firebaseConfig';
import AppliedJobs from './Pages/AppliedJobs';

function App() {
  const [isSignedin, setIsSignedin] = useState(false);
  // const [signedinUser, setSignedinUser] = useState(null);
  useEffect(() => {
    //  if (isSignedin) {
    //   console.log("signed in");
    //  }

    const checkAuth = (auth);
    const unsubscribe = checkAuth.onAuthStateChanged(async (user) => {

      if (user !== null) {
        setIsSignedin(true);
      } else {
        setIsSignedin(false);
      }
    });
    return () => unsubscribe();
  }, [isSignedin]);

  return (
    <>
      {/* <ViewUsers /> */}
      {/* <Dashboard /> */}
      {/* <SignIn />
      <br /><br /><br />
      <AddJob />
      <br /><br /><br />
      <ViewJobs />
      <br /><br /><br />
      <br /><br /><br />
       */}

      <BrowserRouter>
        <Routes>
          <Route path='/' element={isSignedin ? <Navigate to="/dashboard" /> : <SignIn setIsSignedin={setIsSignedin} />} />
          <Route path='/dashboard' element={isSignedin ? <Dashboard /> : <Navigate to="/" />} />
          <Route path='/add' element={isSignedin ? <AddJob /> : <Navigate to="/" />} />
          <Route path='/jobs' element={isSignedin ? <ViewJobs /> : <Navigate to="/" />} />
          <Route path='/users' element={isSignedin ? <ViewUsers /> : <Navigate to="/" />} />
          <Route path='/applied' element={isSignedin ? <AppliedJobs /> : <Navigate to="/" />} />
          
          {/* <Route path='/signin' element={isSignedin ? <Navigate to="/" /> : <SignInPage setIsSignedin={setIsSignedin} />} /> */}

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
