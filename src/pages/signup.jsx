import { useState } from 'react';
import { FaEnvelope, FaLock, FaUser, FaTimes, FaStickyNote } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const API=import.meta.env.VITE_API_BASE_URL

export default function SignUpModal({onClose ,goToLogin}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [success,setSuccess]=useState(false)
  const [message,setMessage]=useState("")
  const navigate=useNavigate()
  const handleSubmit = async(e) => {
    e.preventDefault();
    const res=await axios.post(`${API}/auth/signup`,{
        name:formData.name,
        email:formData.email,
        password:formData.password
    })
    if(res.data.success){
        goToLogin()
    }else{
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
        
        {/* Modal Container */}
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
          
          {/* Header */}
          <div className="p-8 pb-0">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="text-2xl">
                  <FaStickyNote className="text-[#8A00C4]" />
                </div>
                <h2 className="text-2xl font-bold text-white">Join Notify</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition"
              >
                <FaTimes />
              </button>
            </div>
            
            <p className="text-gray-400 text-sm mb-6">
              Start capturing your thoughts in seconds.
            </p>
          </div>
            {success && <div className="mb-4 p-3 bg-red-900/30 border border-red-500/50 rounded-lg text-red -300 text-sm">{message}</div>}
          {/* Form */}
          <div className="p-8 pt-0">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Name Field */}
              <div>
                <label className="text-gray-300 text-sm mb-2 block">Full Name</label>
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8A00C4] transition"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="text-gray-300 text-sm mb-2 block">Email Address</label>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8A00C4] transition"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="text-gray-300 text-sm mb-2 block">Password</label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8A00C4] transition"
                    required
                  />
                </div>
              </div>

              {/* Sign Up Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#8A00C4] to-[#6A00FF] hover:from-[#9A00D4] hover:to-[#7A00FF] text-white py-3 rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-purple-500/30"
              >
                Create Account
              </button>

              {/* Already have an account */}
              <div className="text-center pt-4 border-t border-white/10">
                <p className="text-gray-500 text-sm">
                  Already have an account?{' '}
                  <button 
                    onClick={goToLogin}
                    type="button"
                    className="text-[#8A00C4] hover:text-[#9A00D4] font-medium"
                  >
                    Login
                  </button>
                </p>
              </div>

            </form>
          </div>

          {/* Decorative Bottom */}
          <div className="h-1 bg-gradient-to-r from-[#8A00C4] via-[#6A00FF] to-[#8A00C4]"></div>
        </div>

        {/* Optional: Subtle glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[#8A00C4] to-[#6A00FF] rounded-2xl blur-xl opacity-20 -z-10"></div>
      </div>
    </div>
  );
}