import { useState } from "react";
import Background from "../components/Background";
import SignUpModal from "./signup";
import LoginModal from "./login";
import {
  FaPenAlt,
  FaBolt,
  FaLock,
  FaMobileAlt,
  FaStickyNote,
  FaShoppingCart,
  FaExternalLinkAlt,
  FaUsers,
  FaArrowRight,
  FaHeart,
  FaGithub,
  FaSignInAlt,
  FaUserPlus,
  FaUser,
  FaCheckCircle,
  FaClock,
  FaBriefcase,
  FaStar,
  FaCheck,
  FaLightbulb,
  FaPlus,
  FaEdit,
  FaFolderOpen,
  FaSync
} from 'react-icons/fa';

import { HiOutlineArrowRight } from 'react-icons/hi';

export default function Home() {
  const [activeModal,setActiveModal]=useState(null)
  return (
    <>
      <Background>



{/* Sticky Navbar */}
<nav className="fixed top-0 left-0 right-0 z-50 w-full py-4 px-6 flex justify-between items-center">
  <div className="text-white font-bold text-2xl flex items-center gap-2">
    <FaStickyNote className="text-[#8A00C4]" /> Notify
  </div>
  
  <div className="flex items-center gap-1 rounded-full bg-white/10 backdrop-blur-sm p-1 border border-white/20">
    <button onClick={() =>{setActiveModal("login")}} className="px-6 py-2 text-gray-300 hover:text-white rounded-full font-medium transition-all duration-300 hover:bg-white/5">
      Login
    </button>
    <button onClick={() => {setActiveModal("signup")}} className="px-6 py-2 bg-gradient-to-r from-[#8A00C4] to-[#6A00FF] text-white rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30">
      Sign Up
    </button>
  </div>
</nav>


{/* ------------------------------Hero------------------------------------------------- */}

<div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
  <h2 className="font-sans text-8xl font-black tracking-tighter text-white mb-8">
  Capture your thoughts.
  <br />
  <span className="font-bold text-gray-300">Organize your life.</span>
</h2>
  <p className="text-xl text-gray-300 mb-8 max-w-2xl">
    A fast, simple notes app to write, manage, and access your ideas anytime, anywhere.
  </p>
  <div className="flex gap-4">
  <button  onClick={() => {setActiveModal("login")}} className="bg-gradient-to-r from-[#8A00C4] to-[#6A00FF] hover:from-[#7A00B4] hover:to-[#5A00EE] text-white px-8 py-3 rounded-full font-medium flex items-center gap-2 shadow-lg hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300">
    <FaBolt /> Get Started Free
  </button>
  <button onClick={() => {document.getElementById("preview").scrollIntoView({ behavior: "smooth" })}} className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-3 rounded-full font-medium border border-white/20 hover:border-white/40 transition-all duration-300">
    See Demo
  </button>
</div>
</div>

{/* ------------------------------Features------------------------------------------------- */}


<div className="py-16 px-4">
  <h2 className="text-5xl font-bold text-white text-center mb-12">
    Why Choose Our Notes App?
  </h2>
  
  <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
    {/* Feature 1 */}
    <div className="bg-white/5 p-6 rounded-xl text-center">
      <FaBolt className="text-3xl text-blue-400 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-white mb-2">Lightning Fast</h3>
      <p className="text-gray-400">Open and write notes instantly</p>
    </div>
    
    {/* Feature 2 */}
    <div className="bg-white/5 p-6 rounded-xl text-center">
      <FaLock className="text-3xl text-green-400 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-white mb-2">Fully Private</h3>
      <p className="text-gray-400">Your notes are yours alone</p>
    </div>
    
    {/* Feature 3 */}
    <div className="bg-white/5 p-6 rounded-xl text-center">
      <FaMobileAlt className="text-3xl text-purple-400 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-white mb-2">Everywhere</h3>
      <p className="text-gray-400">Access on all your devices</p>
    </div>
  </div>
</div>

{/* ------------------------------Note Preview------------------------------------------------- */}

<div id="preview" className="py-16 px-4">
  <div className="max-w-4xl mx-auto bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl">
    {/* Window Controls */}
    <div className="flex gap-2 mb-6">
      <div className="w-3 h-3 rounded-full bg-red-500"></div>
      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
      <div className="w-3 h-3 rounded-full bg-green-500"></div>
      <div className="ml-auto text-gray-400 text-sm">My Workspace</div>
    </div>
    
    {/* Notes Grid */}
    <div className="grid md:grid-cols-2 gap-6">
      {/* Personal Notes */}
      <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/20 p-6 rounded-xl border border-purple-500/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-purple-500/20">
            <FaUser className="text-purple-400" />
          </div>
          <h3 className="text-white font-semibold text-lg">Personal Notes</h3>
        </div>
        <ul className="space-y-3">
          <li className="flex items-start gap-2 text-gray-300">
            <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
            <span>Meeting notes - Project updates</span>
          </li>
          <li className="flex items-start gap-2 text-gray-300">
            <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
            <span>Grocery shopping list</span>
          </li>
          <li className="flex items-start gap-2 text-gray-300">
            <FaClock className="text-yellow-400 mt-1 flex-shrink-0" />
            <span>React component ideas</span>
          </li>
        </ul>
      </div>
      
      {/* Work Notes */}
      <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/20 p-6 rounded-xl border border-blue-500/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-blue-500/20">
            <FaBriefcase className="text-blue-400" />
          </div>
          <h3 className="text-white font-semibold text-lg">Work Notes</h3>
        </div>
        <ul className="space-y-3">
          <li className="flex items-start gap-2 text-gray-300">
            <FaClock className="text-yellow-400 mt-1 flex-shrink-0" />
            <span>Team meeting agenda</span>
          </li>
          <li className="flex items-start gap-2 text-gray-300">
            <FaStar className="text-purple-400 mt-1 flex-shrink-0" />
            <span>Project deadlines</span>
          </li>
          <li className="flex items-start gap-2 text-gray-300">
            <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
            <span>Client feedback notes</span>
          </li>
        </ul>
      </div>
    </div>
    
    {/* Quick Stats */}
    <div className="mt-8 pt-8 border-t border-white/10">
      <div className="flex justify-center gap-8 text-center">
        <div>
          <div className="text-2xl font-bold text-white">12</div>
          <div className="text-gray-400 text-sm">Active Notes</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-white">3</div>
          <div className="text-gray-400 text-sm">Categories</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-white">28</div>
          <div className="text-gray-400 text-sm">Total Created</div>
        </div>
      </div>
    </div>
    
    {/* CTA */}
    <div className="mt-8 text-center">
      <div className="text-gray-400 mb-3">Sign up to unlock unlimited notes</div>
      <button  onClick={() => {setActiveModal("signup")}} className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium">
        Start Free Today <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  </div>
</div>

{/* ------------------------------Actions------------------------------------------------- */}

<div className="py-16 px-4 text-center">
  <h2 className="text-5xl font-bold text-white mb-6">
    Ready to Start Writing?
  </h2>
  <p className="text-gray-300 mb-8 max-w-xl mx-auto">
    Join thousands who organize their thoughts with us.
  </p>
  <button onClick={() => {setActiveModal("signup")}} className="bg-gradient-to-r from-[#8A00C4] to-[#6A00FF] text-white px-10 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl transition flex items-center gap-2 mx-auto">
    Create Free Account <FaArrowRight />
  </button>
  <p className="text-gray-500 text-sm mt-4">
    No credit card needed • Free forever plan
  </p>
</div>

{/* ------------------------------Footer------------------------------------------------- */}

<footer className="py-8 px-4 border-t border-white/10">
    <div className="max-w-6xl mx-auto">
        
        {/* Single Row Layout */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Logo & Tagline */}
        <div className="flex items-center gap-4">
            <div className="text-white font-bold text-xl flex items-center gap-2">
            <FaStickyNote className="text-[#8A00C4]" /> Notify
            </div>
            <div className="hidden md:block text-gray-500 text-sm">
            Your thoughts, organized.
            </div>
        </div>
        
        {/* Center: Copyright (Mobile: Above, Desktop: Center) */}
        <div className="text-gray-500 text-sm order-first md:order-none">
            © {new Date().getFullYear()} Notify • Made with <FaHeart className="inline text-red-400 mx-1" /> • Open Source
        </div>
        
        {/* Right: GitHub Button */}
        <a 
            href="https://github.com/xveekay" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
            <FaGithub />
            <span className="text-sm">GitHub</span>
        </a>
        
        </div>
        
    </div>
    </footer>


    {/* -------------------------------SignUp--------------------------- */}
    {activeModal=='signup' &&(
      <SignUpModal 
        onClose={() => {setActiveModal(null)}} 
        goToLogin={()=>{setActiveModal("login")}}
      />
    )}
    {activeModal=='login' &&(
      <LoginModal  
        onClose={() => {setActiveModal(null)}} 
        goToSignup={()=>{setActiveModal("signup")}}
      />
    )}
      </Background>
    </>
  );
}