import React, { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Loader2 } from 'lucide-react'
import { Project, Message } from '../types'

interface ChatInterfaceProps {
  currentProject: Project | null
  updateProject: (project: Project) => void
  isDarkMode: boolean
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  currentProject,
  updateProject,
  isDarkMode
}) => {
  const [message, setMessage] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [currentProject?.messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || !currentProject || isGenerating) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: message.trim(),
      isUser: true,
      timestamp: new Date()
    }

    const updatedProject = {
      ...currentProject,
      messages: [...currentProject.messages, userMessage]
    }
    updateProject(updatedProject)
    setMessage('')
    setIsGenerating(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `I'll help you build that! Based on your request "${message.trim()}", I'll generate the necessary code files and structure. This would typically involve creating components, setting up the architecture, and implementing the features you described.`,
        isUser: false,
        timestamp: new Date()
      }

      const finalProject = {
        ...updatedProject,
        messages: [...updatedProject.messages, aiResponse],
        files: [
          {
            id: '1',
            name: 'App.tsx',
            content: `import React from 'react'\n\nfunction App() {\n  return (\n    <div className="min-h-screen bg-gray-100">\n      <h1>Generated from: ${message.trim()}</h1>\n    </div>\n  )\n}\n\nexport default App`,
            language: 'typescript',
            path: 'src/App.tsx'
          },
          {
            id: '2',
            name: 'index.css',
            content: `body {\n  margin: 0;\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto';\n}\n\n/* Generated styles for: ${message.trim()} */`,
            language: 'css',
            path: 'src/index.css'
          }
        ]
      }
      updateProject(finalProject)
      setIsGenerating(false)
    }, 2000)
  }

  if (!currentProject) {
    return (
      <div className={`flex-1 flex items-center justify-center p-8 ${
        isDarkMode ? 'text-slate-400' : 'text-slate-500'
      }`}>
        <div className="text-center">
          <Bot size={64} className="mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-medium mb-2">No Project Selected</h3>
          <p className="text-sm">Create a new project to start building with AI</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col max-w-2xl">
      <div className={`flex-1 overflow-y-auto p-6 space-y-4`}>
        {currentProject.messages.length === 0 ? (
          <div className={`text-center py-12 ${
            isDarkMode ? 'text-slate-400' : 'text-slate-500'
          }`}>
            <Bot size={48} className="mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">Start Building</h3>
            <p className="text-sm">Describe what you want to build and I'll generate the code for you</p>
          </div>
        ) : (
          currentProject.messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${
                msg.isUser ? 'justify-end' : 'justify-start'
              }`}
            >
              {!msg.isUser && (
                <div className={`p-2 rounded-xl ${
                  isDarkMode
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                    : 'bg-gradient-to-r from-blue-500 to-purple-500'
                }`}>
                  <Bot className="text-white" size={16} />
                </div>
              )}
              
              <div className={`max-w-[80%] p-4 rounded-2xl backdrop-blur-sm ${
                msg.isUser
                  ? isDarkMode
                    ? 'bg-white/20 border border-white/30 text-white'
                    : 'bg-white/40 border border-white/50 text-slate-800'
                  : isDarkMode
                    ? 'bg-slate-900/40 border border-white/20 text-white'
                    : 'bg-white/60 border border-white/40 text-slate-800'
              }`}>
                <p className="text-sm leading-relaxed">{msg.content}</p>
                <p className={`text-xs mt-2 ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </p>
              </div>

              {msg.isUser && (
                <div className={`p-2 rounded-xl ${
                  isDarkMode
                    ? 'bg-white/20 border border-white/30'
                    : 'bg-white/40 border border-white/50'
                }`}>
                  <User className={isDarkMode ? 'text-white' : 'text-slate-700'} size={16} />
                </div>
              )}
            </div>
          ))
        )}
        
        {isGenerating && (
          <div className="flex items-start space-x-3">
            <div className={`p-2 rounded-xl ${
              isDarkMode
                ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                : 'bg-gradient-to-r from-blue-500 to-purple-500'
            }`}>
              <Bot className="text-white" size={16} />
            </div>
            <div className={`p-4 rounded-2xl backdrop-blur-sm ${
              isDarkMode
                ? 'bg-slate-900/40 border border-white/20'
                : 'bg-white/60 border border-white/40'
            }`}>
              <div className="flex items-center space-x-2">
                <Loader2 className={`animate-spin ${
                  isDarkMode ? 'text-purple-400' : 'text-blue-600'
                }`} size={16} />
                <span className={`text-sm ${
                  isDarkMode ? 'text-white' : 'text-slate-800'
                }`}>
                  Generating your project...
                </span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="p-6 border-t backdrop-blur-xl">
        <form onSubmit={handleSendMessage} className="flex space-x-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe what you want to build..."
            disabled={isGenerating}
            className={`flex-1 px-4 py-3 rounded-xl backdrop-blur-sm border transition-all duration-200 focus:outline-none focus:ring-2 ${
              isDarkMode
                ? 'bg-white/10 border-white/20 text-white placeholder-slate-400 focus:ring-purple-500/50'
                : 'bg-white/30 border-white/30 text-slate-800 placeholder-slate-500 focus:ring-blue-500/50'
            }`}
          />
          <button
            type="submit"
            disabled={!message.trim() || isGenerating}
            className={`p-3 rounded-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
              isDarkMode
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
            } text-white`}
          >
            {isGenerating ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <Send size={20} />
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
