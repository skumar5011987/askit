
// import './App.css';
import { AuthProvider } from './context/authContext';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Navbar } from './components/navbar';
import { Dashboard } from './components/dashboard';
import PrivateRoute from './middleware/privateRoute';
import PostCreate from './components/createPost';
import AuthForm from './components/auth';

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path='/' element={<AuthForm />} />
        <Route path='/dashboard' element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path='/posts/new' element={
          <PrivateRoute>
            <PostCreate />
          </PrivateRoute>
        } />
        
      <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
