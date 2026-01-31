import { useState } from 'react';
import axios from 'axios';
import { FaEnvelope, FaLock, FaTimes, FaStickyNote } from 'react-icons/fa';
const API=import.meta.env.VITE_API_BASE_URL
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginModal({onClose ,goToSignup}) {
    const navigate=useNavigate()
    const [success,setSuccess]=useState(false)
    const [message,setMessage]=useState("")
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const {setUser}=useAuth()
  const handleSubmit = async(e) => {
    e.preventDefault();
    const res=await axios.post(`${API}/auth/login`,{
        email:formData.email,
        password:formData.password
    })
    if(res.data.success){
      localStorage.setItem("token",res.data.token)
      setUser(res.data.user)
      navigate('/dashboard')

    }
    else{
        setSuccess(true)
        setMessage(res.data.message)
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-md">
        
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
          
          {/* Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaStickyNote className="text-[#8A00C4] text-xl" />
                <h2 className="text-xl font-bold text-white">Login</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition"
              >
                <FaTimes />
              </button>
            </div>
          </div>
            {success && <div className="mb-4 p-3 bg-red-900/30 border border-red-500/50 rounded-lg text-red-300 text-sm">{message}</div>}
          {/* Form */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Email */}
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8A00C4] transition"
                  required
                />
              </div>

              {/* Password */}
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8A00C4] transition"
                  required
                />
              </div>
              {/* Sign In Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#8A00C4] to-[#6A00FF] hover:from-[#9A00D4] hover:to-[#7A00FF] text-white py-3 rounded-lg font-medium transition-all"
              >
                Login
              </button>

              {/* Sign Up Link */}
              <div className="text-center pt-2">
                <p className="text-gray-400 text-sm">
                  Don't have an account?{' '}
                  <button 
                    onClick={goToSignup}
                    type="button"
                    className="text-[#8A00C4] hover:text-[#9A00D4] font-medium"
                  >
                    Sign Up
                  </button>
                </p>
              </div>

            </form>
          </div>

        </div>

      </div>
    </div>
  );
}