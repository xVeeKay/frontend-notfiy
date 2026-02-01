import { useEffect, useState } from 'react';
import { 
  FaSearch, 
  FaPlus, 
  FaSignOutAlt, 
  FaUser, 
  FaStickyNote, 
  FaTag,
  FaCalendar,
  FaEllipsisV,
  FaStar,
  FaEdit,
  FaTrash,
  FaBold,
  FaItalic,
  FaHeading,
  FaListUl,
  FaTimes, 
  FaLink, 
  FaCode, 
  FaChevronDown,
  FaBars,
} from 'react-icons/fa';
import { MdPushPin } from "react-icons/md";
import { CgNotes } from "react-icons/cg";
const API=import.meta.env.VITE_API_BASE_URL
import AppAlert from '../components/AppAlert';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Heading from '@tiptap/extension-heading'
import { useAuth } from '../context/AuthContext';


export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [alert, setAlert] = useState({
    type: "",
    title: "",
    message: ""
  });

  const [success,setSuccess]=useState(false)
  const [message,setMessage]=useState(null)
  const navigate=useNavigate()
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [editingNote,setEditingNote]=useState(null)
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    tags: '',
    pinned: false
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({
        levels: [1, 2, 3], // H1, H2, H3
      }),
    ],
    content: newNote.content,
    onUpdate: ({ editor }) => {
      setNewNote(prev => ({ ...prev, content: editor.getHTML() }))
    },
  })
  const {user,loading,setUser}=useAuth()
  useEffect(()=>{
    fetchNotes()
  },[])
  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
    }
  }, [loading, user, navigate]);
  if(!user){
    return <div>Loading...</div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  
    async function fetchNotes() {
        const res=await axios.get(`${API}/notes`,{
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }
        })
        if(!res.data.success){
          navigate("/")
        }
        setNotes(res.data.notes)
    }
  async function handleNoteCreation(){
    const res=await axios.post(`${API}/notes`,{
      title:newNote.title,
      content:newNote.content,
      tags:newNote.tags,
      pinned:newNote.pinned
    },{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    })
    if(!res.data.success){
      setSuccess(true)
      setMessage(res.data.message)
      return
    }
    await fetchNotes()
    if (editor) {
      editor.commands.clearContent();
    }
    setNewNote({
      title:'',
      content:'',
      tags:'',
      pinned:false
    })
    setShowCreateModal(false)
  }
  async function handleEdit(note){
    setEditingNote(note)
    setNewNote({
      title:note.title,
      content:note.content,
      tags:note.tags,
      pinned:note.pinned
    })
    setShowEditModal(true)
  }

  const handleUpdateNote = async () => {
    try {
      const res = await axios.post(`${API}/notes/${editingNote._id}`, {
        title: newNote.title,
        content: newNote.content,
        tags: newNote.tags,
        pinned: newNote.pinned
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      
      if (res.data.success) {
        await fetchNotes();
        setShowEditModal(false);
        setEditingNote(null);
        if (editor) {
          editor.commands.clearContent();
        }
        setNewNote({
          title: '',
          content: '',
          tags: '',
          pinned: false
        });
        console.log("here")
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccess(false);
          setMessage(null);
        }, 3000);
      }
    } catch (error) {
      setSuccess(true);
      setMessage(error.response?.data?.message || "Error updating note");
    }
  }
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const pinnedNotes = filteredNotes.filter(note => note.pinned);
  const otherNotes = filteredNotes.filter(note => !note.pinned);

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/70 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 bg-black/40 backdrop-blur-xl border-r border-white/10 p-6 transform transition-transform duration-300 z-50 lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:relative lg:z-0`}>
        <div className="flex items-center justify-between mb-10 lg:justify-start">
          <div className="flex items-center gap-3">
            <FaStickyNote className="text-2xl text-[#8A00C4]" />
            <h1 className="text-2xl font-bold">Notify</h1>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2"
          >
            <FaTimes />
          </button>
        </div>

        <div className="mb-8">
          <div className="p-4 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#8A00C4] to-[#6A00FF] flex items-center justify-center shadow-xl shadow-purple-500/30">
                  <FaUser className="text-xl" />
                </div>
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-[#0a0a0a]"></div>
              </div>
              <div>
                <div className="text-gray-400 text-sm mb-1">Welcome back</div>
                <div className="font-bold text-xl">{user.name}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Simple Stats Section */}
        <div className="mb-8 flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <CgNotes className="text-purple-400" />
            </div>
            <div>
              <div className="text-sm text-gray-400">Notes</div>
              <div className="text-xl font-bold">{notes.length}</div>
            </div>
          </div>
          
          <div className="h-8 w-px bg-white/10"></div>
          
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-yellow-500/20">
              <MdPushPin className="text-yellow-400" />
            </div>
            <div>
              <div className="text-sm text-gray-400">Pinned</div>
              <div className="text-xl font-bold">{pinnedNotes.length}</div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <button 
            onClick={() => {
              setShowCreateModal(true);
              if (window.innerWidth < 1024) {
                setSidebarOpen(false);
              }
            }}
            className="w-full flex items-center gap-3 p-3 rounded-full bg-gradient-to-r from-[#8A00C4] to-[#6A00FF] hover:from-[#9A00D4] hover:to-[#7A00FF] transition-all"
          >
            <FaPlus /> Create New Note
          </button>
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <button 
            onClick={() => setShowLogoutModal(true)}
            className="w-full flex items-center gap-3 p-3 rounded-full hover:bg-red-500/20 hover:text-red-300 transition"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 p-4 md:p-6 lg:p-8">
        
        {/* Header with Mobile Menu Button */}
        <div className="flex items-center justify-between mb-6 lg:mb-8">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2"
          >
            <FaBars className="text-xl" />
          </button>
          <div className="relative max-w-xl w-full lg:w-auto">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8A00C4] transition"
            />
          </div>
        </div>

        {/* Pinned Notes Section */}
        {pinnedNotes.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <MdPushPin className="text-purple-400"/>Pinned Notes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pinnedNotes.map(note => (
                <NoteCard key={note._id} note={note} fetchNotes={fetchNotes} handleEdit={handleEdit}/>
              ))}
            </div>
          </div>
        )}

        {/* All Notes Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><CgNotes className='text-purple-400'/>All Notes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherNotes.map(note => (
              <NoteCard key={note._id} note={note} fetchNotes={fetchNotes} handleEdit={handleEdit}/>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredNotes.length === 0 && (
          <div className="text-center py-10 lg:py-20">
            <FaStickyNote className="text-6xl text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl text-gray-400 mb-2">No notes found</h3>
            <p className="text-gray-500">Try a different search or create a new note</p>
          </div>
        )}

      </div>

      {/* Create Note Modal - Responsive */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-lg">
            
            {/* Subtle Glow Layer */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#8A00C4]/20 via-transparent to-[#8A00C4]/20 rounded-xl blur-md opacity-60"></div>
            
            {/* Inner Glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-br from-[#8A00C4]/10 via-transparent to-[#6A00FF]/10 rounded-lg blur-sm opacity-40"></div>
            
            {/* Modal Container */}
            <div className="relative bg-[#0a0a0a] border border-[#8A00C4]/40 rounded-lg shadow-2xl">
              {success && <div className="mb-4 p-3 bg-red-900/30 border border-red-500/50 rounded-lg text-red-300 text-sm">{message}</div>}
              {/* Compact Header with subtle glow */}
              <div className="px-4 sm:px-5 py-3 border-b border-[#8A00C4]/30 flex justify-between items-center bg-gradient-to-r from-[#0a0a0a] via-[#111111] to-[#0a0a0a]">
                <input
                  type="text"
                  placeholder="Note title..."
                  value={newNote.title}
                  onChange={(e) => setNewNote({...newNote, title: e.target.value})}
                  className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none font-medium focus:text-[#8A00C4] transition-colors text-sm sm:text-base"
                />
                <button 
                  onClick={() => setShowCreateModal(false)} 
                  className="p-1.5 rounded-full hover:bg-[#8A00C4]/10 text-gray-400 hover:text-white transition ml-2"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 space-y-4">
                
                {/* Formatting Bar + Textarea */}
                <div>
                  <div className="flex gap-2 mb-2 overflow-x-auto">
                    <button
                      onClick={() => editor?.chain().focus().toggleBold().run()}
                      className={`px-3 py-1.5 rounded text-sm hover:bg-white/10 ${editor?.isActive('bold') ? 'bg-purple-700' : 'text-gray-400'} flex-shrink-0`}
                      title="Bold"
                    >
                      B
                    </button>
                    <button
                      onClick={() => editor?.chain().focus().toggleItalic().run()}
                      className={`px-3 py-1.5 rounded text-sm hover:bg-white/10 ${editor?.isActive('italic') ? 'bg-purple-700' : 'text-gray-400'} flex-shrink-0`}
                      title="Italic"
                    >
                      I
                    </button>
                  </div>

                  <EditorContent
                    editor={editor}
                    className="min-h-[120px] sm:min-h-[150px] bg-[#111111]/50 border border-[#8A00C4]/30 rounded px-3 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-[#8A00C4] focus:ring-1 focus:ring-[#8A00C4]/30 transition text-sm"
                  />
                </div>

                {/* Tags */}
                <div>
                  <div className="text-xs text-gray-400 mb-1">Tags</div>
                  <input
                    type="text"
                    placeholder="work, ideas, personal"
                    value={newNote.tags}
                    onChange={(e) => setNewNote({...newNote, tags: e.target.value})}
                    className="w-full bg-[#111111]/50 border border-[#8A00C4]/30 rounded px-3 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-[#8A00C4] focus:ring-1 focus:ring-[#8A00C4]/30 transition text-sm"
                  />
                </div>

                {/* Pin Toggle with glow */}
                <div className="flex items-center justify-between p-3 rounded bg-gradient-to-r from-[#111111] to-[#0a0a0a] border border-[#8A00C4]/20">
                  <div>
                    <div className="text-sm text-white">Pin this note</div>
                    <div className="text-xs text-gray-500">Keep at top</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      id="pin"
                      checked={newNote.pinned}
                      onChange={(e) => setNewNote({...newNote, pinned: e.target.checked})}
                      className="sr-only peer"
                    />
                    {/* Glow on toggle */}
                    <div className="absolute -inset-1 bg-[#8A00C4]/20 rounded-full blur-sm opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                    <div className="relative w-8 h-4 bg-gray-800 rounded-full peer peer-checked:bg-[#8A00C4]"></div>
                    <div className="absolute left-0.5 top-0.5 bg-gray-400 rounded-full h-3 w-3 transition-all peer-checked:translate-x-4 peer-checked:bg-white peer-checked:shadow-[0_0_8px_#8A00C4]"></div>
                  </label>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-3">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 py-2.5 text-sm text-gray-400 hover:text-white rounded-full border border-gray-700 hover:border-gray-600 transition"
                  >
                    Cancel
                  </button>
                  <div className="relative flex-1">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#8A00C4] to-[#6A00FF] rounded-full blur opacity-50"></div>
                    <button
                      onClick={handleNoteCreation}
                      type="submit"
                      className="relative w-full py-2.5 bg-gradient-to-r from-[#8A00C4] to-[#6A00FF] hover:from-[#9A00D4] hover:to-[#7A00FF] rounded-full text-sm font-medium text-white"
                    >
                      Create Note
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Logout Modal - Responsive */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-white/10 shadow-2xl w-full max-w-xs sm:max-w-sm md:max-w-md p-6 sm:p-8">
            
            <div className="text-center mb-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                <FaSignOutAlt className="text-xl sm:text-2xl text-red-400" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold mb-2">Logout</h2>
              <p className="text-gray-400 text-sm sm:text-base">Are you sure you want to logout?</p>
            </div>

            <div className="flex gap-3 sm:gap-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-3 rounded-full border border-white/20 hover:bg-white/10 transition text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                onClick={() => {localStorage.removeItem("token");setUser(null);navigate('/')}}
                className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 py-3 rounded-full font-semibold transition-all text-sm sm:text-base"
              >
                Logout
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Edit Note Modal - Responsive */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-lg">
            
            {/* Subtle Glow Layer */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-transparent to-blue-500/20 rounded-xl blur-md opacity-60"></div>
            
            {/* Inner Glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-500/10 via-transparent to-blue-600/10 rounded-lg blur-sm opacity-40"></div>
            
            {/* Modal Container */}
            <div className="relative bg-[#0a0a0a] border border-blue-500/40 rounded-lg shadow-2xl">
              {success && <div className="mb-4 p-3 bg-blue-900/30 border border-blue-500/50 rounded-lg text-blue-300 text-sm">{message}</div>}
              
              {/* Compact Header with subtle glow */}
              <div className="px-4 sm:px-5 py-3 border-b border-blue-500/30 flex justify-between items-center bg-gradient-to-r from-[#0a0a0a] via-[#111111] to-[#0a0a0a]">
                <input
                  type="text"
                  placeholder="Note title..."
                  value={newNote.title}
                  onChange={(e) => setNewNote({...newNote, title: e.target.value})}
                  className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none font-medium focus:text-blue-400 transition-colors text-sm sm:text-base"
                />
                <button 
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingNote(null);
                    setNewNote({
                      title: '',
                      content: '',
                      tags: '',
                      pinned: false
                    });
                  }} 
                  className="p-1.5 rounded-full hover:bg-blue-500/10 text-gray-400 hover:text-white transition ml-2"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 space-y-4">
                
                {/* Formatting Bar + Textarea */}
                <div>
                  <div className="flex gap-2 mb-2 overflow-x-auto">
                    <button
                      onClick={() => editor?.chain().focus().toggleBold().run()}
                      className={editor?.isActive('bold') ? 'bg-blue-700 px-2 rounded flex-shrink-0' : 'px-2 hover:bg-white/10 rounded flex-shrink-0'}
                    >
                      <FaBold />
                    </button>
                    <button
                      onClick={() => editor?.chain().focus().toggleItalic().run()}
                      className={editor?.isActive('italic') ? 'bg-blue-700 px-2 rounded flex-shrink-0' : 'px-2 hover:bg-white/10 rounded flex-shrink-0'}
                    >
                      <FaItalic />
                    </button>
                  </div>

                  <EditorContent
                    editor={editor}
                    className="min-h-[120px] sm:min-h-[150px] bg-[#111111]/50 border border-blue-500/30 rounded px-3 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition text-sm"
                  />
                </div>

                {/* Tags */}
                <div>
                  <div className="text-xs text-gray-400 mb-1">Tags</div>
                  <input
                    type="text"
                    placeholder="work, ideas, personal"
                    value={newNote.tags}
                    onChange={(e) => setNewNote({...newNote, tags: e.target.value})}
                    className="w-full bg-[#111111]/50 border border-blue-500/30 rounded px-3 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition text-sm"
                  />
                </div>

                {/* Pin Toggle with glow */}
                <div className="flex items-center justify-between p-3 rounded bg-gradient-to-r from-[#111111] to-[#0a0a0a] border border-blue-500/20">
                  <div>
                    <div className="text-sm text-white">Pin this note</div>
                    <div className="text-xs text-gray-500">Keep at top</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      id="pin"
                      checked={newNote.pinned}
                      onChange={(e) => setNewNote({...newNote, pinned: e.target.checked})}
                      className="sr-only peer"
                    />
                    {/* Glow on toggle */}
                    <div className="absolute -inset-1 bg-blue-500/20 rounded-full blur-sm opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                    <div className="relative w-8 h-4 bg-gray-800 rounded-full peer peer-checked:bg-blue-500"></div>
                    <div className="absolute left-0.5 top-0.5 bg-gray-400 rounded-full h-3 w-3 transition-all peer-checked:translate-x-4 peer-checked:bg-white peer-checked:shadow-[0_0_8px_#3b82f6]"></div>
                  </label>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-3">
                  <button
                    onClick={() => {
                      setShowEditModal(false);
                      setEditingNote(null);
                      setNewNote({
                        title: '',
                        content: '',
                        tags: '',
                        pinned: false
                      });
                    }}
                    className="flex-1 py-2.5 text-sm text-gray-400 hover:text-white rounded-full border border-gray-700 hover:border-gray-600 transition"
                  >
                    Cancel
                  </button>
                  <div className="relative flex-1">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full blur opacity-50"></div>
                    <button
                      onClick={handleUpdateNote}
                      type="submit"
                      className="relative w-full py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-full text-sm font-medium text-white"
                    >
                      Update Note
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// Note Card Component
function NoteCard({ note, fetchNotes ,handleEdit}) {
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate=useNavigate()

  const handlePinToggle = async () => {
    try {
      const res = await axios.put(`${API}/notes/${note._id}`, {
        pinned: !note.pinned
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      
      if (res.data.success) {
        fetchNotes();
        setShowMenu(false);
      }
    } catch (error) {
      console.error("Error toggling pin:", error);
    }
  };
  const handleDelete=async()=>{
    try {
      const res=await axios.delete(`${API}/notes/${note._id}`,{
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      })
      if(!res.data.success){
        navigate('/')
        return
      }
      fetchNotes()
      setShowDeleteModal(false)
      setShowMenu(false)
    } catch (error) {
      console.log("error while deleting,", error)
      navigate('/')
    }
  }

  return (
    <>
      <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition group relative">
        <div className="flex justify-between items-start mb-3">
          <h3 
            className="font-semibold text-base sm:text-lg truncate pr-2" 
            style={{cursor:"pointer"}} 
            onClick={()=>handleEdit(note)}
          >
            {note.title}
          </h3>
          
          {/* Three-dot menu button with relative positioning */}
          <div className="relative">
            <button 
              onClick={() => setShowMenu(!showMenu)}
              className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 rounded"
            >
              <FaEllipsisV className="text-gray-400" />
            </button>
            
            {/* Dropdown Menu - positioned relative to the button */}
            {showMenu && (
              <div className="absolute right-0 top-full mt-1 w-40 sm:w-48 bg-[#1a1a1a] border border-white/10 rounded-lg shadow-xl z-10">
                <div className="p-1">
                  {/* Pin/Unpin Option */}
                  <button
                    onClick={handlePinToggle}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs sm:text-sm rounded hover:bg-white/5 text-white"
                  >
                    {note.pinned ? (
                      <>
                        <MdPushPin className="text-yellow-400" />
                        Unpin Note
                      </>
                    ) : (
                      <>
                        <MdPushPin className="text-gray-400" />
                        Pin Note
                      </>
                    )}
                  </button>
                  
                  {/* Delete Option */}
                  <button
                    onClick={() => {
                      setShowDeleteModal(true);
                      setShowMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs sm:text-sm rounded hover:bg-white/5 text-red-400"
                  >
                    <FaTrash />
                    Delete Note
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="text-gray-400 text-sm mb-4 line-clamp-3 flex justify-between items-center" dangerouslySetInnerHTML={{ __html: note.content }}/>
        
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {note.tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-[#8A00C4]/20 text-[#8A00C4] rounded text-xs">
                {tag}
              </span>
            ))}
          </div>
          
          <div className="text-gray-500 text-xs sm:text-sm flex items-center gap-1">
            <FaCalendar /> {new Date(note.date).toLocaleDateString()}
          </div>
        </div>
        
        {/* Click outside to close - moved to the end */}
        {showMenu && (
          <div 
            className="fixed inset-0 z-0" 
            onClick={() => setShowMenu(false)}
          />
        )}
      </div>

      {/* Delete Confirmation Modal - Responsive */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-white/10 shadow-2xl w-full max-w-xs sm:max-w-sm md:max-w-md p-6 sm:p-8">
            <div className="text-center mb-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                <FaTrash className="text-xl sm:text-2xl text-red-400" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold mb-2">Delete Note</h2>
              <p className="text-gray-400 text-sm sm:text-base">Are you sure you want to delete "{note.title}"? This action cannot be undone.</p>
            </div>

            <div className="flex gap-3 sm:gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-3 rounded-full border border-white/20 hover:bg-white/10 transition text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 py-3 rounded-full font-semibold transition-all text-sm sm:text-base"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}