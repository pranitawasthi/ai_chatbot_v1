// import React, { useState, useRef, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Upload, Send, X, FileText, MessageCircle, AlertCircle, Check } from 'lucide-react';
// import { marked } from 'marked';
// import './App.css';

// const API_BASE_URL = 'https://ai-chatbot-v1-backend.onrender.com';

// // Header Component
// const Header = () => (
//   <motion.div 
//     className="header"
//     initial={{ opacity: 0, y: -20 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.6 }}
//   >
//     <div className="header-shimmer" />
//     <motion.h1 
//       className="header-title"
//       initial={{ scale: 0.9 }}
//       animate={{ scale: 1 }}
//       transition={{ duration: 0.5, delay: 0.2 }}
//     >
//       <MessageCircle className="header-icon" />
//       PDF Chat AI
//     </motion.h1>
//     <motion.p 
//       className="header-subtitle"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5, delay: 0.4 }}
//     >
//       Upload your PDF and start an intelligent conversation
//     </motion.p>
//   </motion.div>
// );

// // Upload Section Component
// const UploadSection = ({ onFileUpload, uploadedFile, onFileChange }) => {
//   const [isDragging, setIsDragging] = useState(false);
//   const fileInputRef = useRef(null);

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = (e) => {
//     e.preventDefault();
//     setIsDragging(false);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     setIsDragging(false);
//     const files = e.dataTransfer.files;
//     if (files.length > 0) {
//       onFileUpload(files[0]);
//     }
//   };

//   const handleFileSelect = (e) => {
//     if (e.target.files.length > 0) {
//       onFileUpload(e.target.files[0]);
//     }
//   };

//   return (
//     <motion.div 
//       className="upload-section"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: 0.3 }}
//     >
//       {!uploadedFile ? (
//         <motion.div
//           className={`upload-area ${isDragging ? 'dragging' : ''}`}
//           onClick={() => fileInputRef.current?.click()}
//           onDragOver={handleDragOver}
//           onDragLeave={handleDragLeave}
//           onDrop={handleDrop}
//           whileHover={{ scale: 1.02 }}
//           whileTap={{ scale: 0.98 }}
//         >
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ duration: 0.5, delay: 0.5 }}
//           >
//             <Upload className="upload-icon" />
//           </motion.div>
//           <div className="upload-text">
//             <h3>Click to upload or drag & drop</h3>
//             <p>Supports PDF files up to 10MB</p>
//           </div>
//           <input
//             ref={fileInputRef}
//             type="file"
//             accept=".pdf"
//             onChange={handleFileSelect}
//             style={{ display: 'none' }}
//           />
//         </motion.div>
//       ) : (
//         <motion.div 
//           className="file-status"
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.4 }}
//         >
//           <div className="file-info">
//             <Check className="file-icon" />
//             <div className="file-details">
//               <span className="file-name">{uploadedFile.name}</span>
//               <span className="file-size">
//                 {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
//               </span>
//             </div>
//           </div>
//           <motion.button
//             className="change-file-btn"
//             onClick={onFileChange}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <X size={16} />
//             Change
//           </motion.button>
//         </motion.div>
//       )}
//     </motion.div>
//   );
// };

// // Message Component
// const Message = ({ message, sender }) => (
//   <motion.div
//     className={`message ${sender}`}
//     initial={{ opacity: 0, y: 20, scale: 0.95 }}
//     animate={{ opacity: 1, y: 0, scale: 1 }}
//     transition={{ duration: 0.4 }}
//   >
//     <div className="message-content">
//       <div dangerouslySetInnerHTML={{ __html: marked(message) }} />
//     </div>
//   </motion.div>
// );

// // Error Component
// const ErrorMessage = ({ error, onClose }) => (
//   <AnimatePresence>
//     {error && (
//       <motion.div
//         className="error-message"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: -20 }}
//         transition={{ duration: 0.3 }}
//       >
//         <AlertCircle className="error-icon" />
//         <span>{error}</span>
//         <motion.button
//           className="error-close"
//           onClick={onClose}
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.9 }}
//         >
//           <X size={16} />
//         </motion.button>
//       </motion.div>
//     )}
//   </AnimatePresence>
// );

// // Chat Container Component
// const ChatContainer = ({ messages, onSendMessage, uploadedFile, error, onErrorClose }) => {
//   const [message, setMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   const handleSend = async () => {
//     if (!message.trim() || !uploadedFile || isLoading) return;

//     const userMessage = message;
//     setMessage('');
//     setIsLoading(true);

//     onSendMessage(userMessage, 'user');

//     try {
//       const formData = new FormData();
//       formData.append('pdf', uploadedFile);
//       formData.append('message', userMessage);

//       const response = await fetch(`${API_BASE_URL}/chat`, {
//         method: 'POST',
//         body: formData
//       });

//       if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
//       const data = await response.json();
//       onSendMessage(data.response, 'ai');
//     } catch (error) {
//       onSendMessage('❌ Sorry, I encountered an error. Please try again.', 'ai');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSend();
//     }
//   };

//   return (
//     <motion.div 
//       className="chat-container"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5, delay: 0.2 }}
//     >
//       <ErrorMessage error={error} onClose={onErrorClose} />
      
//       <div className="messages">
//         {messages.map((msg, index) => (
//           <Message key={index} message={msg.content} sender={msg.sender} />
//         ))}
//         {isLoading && (
//           <motion.div
//             className="loading-message"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.3 }}
//           >
//             <div className="loading-dots">
//               <motion.div
//                 className="loading-dot"
//                 animate={{ y: [0, -8, 0] }}
//                 transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
//               />
//               <motion.div
//                 className="loading-dot"
//                 animate={{ y: [0, -8, 0] }}
//                 transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
//               />
//               <motion.div
//                 className="loading-dot"
//                 animate={{ y: [0, -8, 0] }}
//                 transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
//               />
//             </div>
//           </motion.div>
//         )}
//         <div ref={messagesEndRef} />
//       </div>

//       <motion.div 
//         className="input-section"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 0.4 }}
//       >
//         <div className="input-container">
//           <motion.textarea
//             className="message-input"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             onKeyPress={handleKeyPress}
//             placeholder={uploadedFile ? "Ask about your PDF..." : "Upload PDF to chat..."}
//             disabled={!uploadedFile || isLoading}
//             rows={1}
//             whileFocus={{ scale: 1.02 }}
//           />
//           <motion.button
//             className="send-button"
//             onClick={handleSend}
//             disabled={!uploadedFile || !message.trim() || isLoading}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <Send className="send-icon" />
//             Send
//           </motion.button>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

// // Main App Component
// const App = () => {
//   const [uploadedFile, setUploadedFile] = useState(null);
//   const [messages, setMessages] = useState([
//     {
//       sender: 'ai',
//       content: '👋 Hello! Upload a PDF file and I\'ll help you chat with its contents. Ask me questions about the document!'
//     }
//   ]);
//   const [error, setError] = useState('');
//   const [showIntro, setShowIntro] = useState(true);

//   const handleFileUpload = (file) => {
//     if (file.type !== 'application/pdf') {
//       setError('Please select a PDF file.');
//       return;
//     }
//     if (file.size > 10 * 1024 * 1024) {
//       setError('File size should be less than 10MB.');
//       return;
//     }

//     setUploadedFile(file);
//     setError('');
//     setShowIntro(false);
    
//     const successMessage = {
//       sender: 'ai',
//       content: `✅ PDF "${file.name}" uploaded successfully! You can now ask questions about it.`
//     };
//     setMessages(prev => [...prev, successMessage]);
//   };

//   const handleFileChange = () => {
//     setUploadedFile(null);
//     setShowIntro(true);
//     setMessages([
//       {
//         sender: 'ai',
//         content: '👋 Hello! Upload a PDF file and I\'ll help you chat with its contents. Ask me questions about the document!'
//       }
//     ]);
//   };

//   const handleSendMessage = (content, sender) => {
//     setMessages(prev => [...prev, { content, sender }]);
//   };

//   const handleErrorClose = () => {
//     setError('');
//   };

//   return (
//     <div className="app">
//       <motion.div 
//         className="container"
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.6 }}
//       >
//         <AnimatePresence>
//           {showIntro && (
//             <motion.div
//               className="intro-section"
//               initial={{ height: 'auto', opacity: 1 }}
//               exit={{ height: 0, opacity: 0 }}
//               transition={{ duration: 0.5 }}
//             >
//               <Header />
//               <UploadSection
//                 onFileUpload={handleFileUpload}
//                 uploadedFile={uploadedFile}
//                 onFileChange={handleFileChange}
//               />
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <ChatContainer
//           messages={messages}
//           onSendMessage={handleSendMessage}
//           uploadedFile={uploadedFile}
//           error={error}
//           onErrorClose={handleErrorClose}
//         />
//       </motion.div>
//     </div>
//   );
// };

// export default App;













import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Send, X, FileText, MessageCircle, AlertCircle, Check } from 'lucide-react';
import { marked } from 'marked';
import './App.css';

const API_BASE_URL = 'https://ai-chatbot-v1-backend.onrender.com';

// Custom hook for dynamic viewport height
const useViewportHeight = () => {
  useEffect(() => {
    const setVH = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Set initial value
    setVH();

    // Update on resize and orientation change
    const handleResize = () => {
      clearTimeout(window.resizeTimer);
      window.resizeTimer = setTimeout(setVH, 100);
    };

    const handleOrientationChange = () => {
      setTimeout(setVH, 100);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);

    // iOS Safari specific fixes
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      const handleFocus = () => setTimeout(setVH, 300);
      const handleBlur = () => setTimeout(setVH, 300);

      // Add focus/blur listeners for input elements
      document.addEventListener('focusin', handleFocus);
      document.addEventListener('focusout', handleBlur);

      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('orientationchange', handleOrientationChange);
        document.removeEventListener('focusin', handleFocus);
        document.removeEventListener('focusout', handleBlur);
        clearTimeout(window.resizeTimer);
      };
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
      clearTimeout(window.resizeTimer);
    };
  }, []);
};

// Header Component
const Header = () => (
  <motion.div 
    className="header"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <div className="header-shimmer" />
    <motion.h1 
      className="header-title"
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <MessageCircle className="header-icon" />
      PDF Chat AI
    </motion.h1>
    <motion.p 
      className="header-subtitle"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      Upload your PDF and start an intelligent conversation
    </motion.p>
  </motion.div>
);

// Upload Section Component
const UploadSection = ({ onFileUpload, uploadedFile, onFileChange }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files.length > 0) {
      onFileUpload(e.target.files[0]);
    }
  };

  return (
    <motion.div 
      className="upload-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {!uploadedFile ? (
        <motion.div
          className={`upload-area ${isDragging ? 'dragging' : ''}`}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Upload className="upload-icon" />
          </motion.div>
          <div className="upload-text">
            <h3>Click to upload or drag & drop</h3>
            <p>Supports PDF files up to 10MB</p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
        </motion.div>
      ) : (
        <motion.div 
          className="file-status"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="file-info">
            <Check className="file-icon" />
            <div className="file-details">
              <span className="file-name">{uploadedFile.name}</span>
              <span className="file-size">
                {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
              </span>
            </div>
          </div>
          <motion.button
            className="change-file-btn"
            onClick={onFileChange}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <X size={16} />
            Change
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};

// Message Component
const Message = ({ message, sender }) => (
  <motion.div
    className={`message ${sender}`}
    initial={{ opacity: 0, y: 20, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.4 }}
  >
    <div className="message-content">
      <div dangerouslySetInnerHTML={{ __html: marked(message) }} />
    </div>
  </motion.div>
);

// Error Component
const ErrorMessage = ({ error, onClose }) => (
  <AnimatePresence>
    {error && (
      <motion.div
        className="error-message"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <AlertCircle className="error-icon" />
        <span>{error}</span>
        <motion.button
          className="error-close"
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X size={16} />
        </motion.button>
      </motion.div>
    )}
  </AnimatePresence>
);

// Chat Container Component
const ChatContainer = ({ messages, onSendMessage, uploadedFile, error, onErrorClose }) => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [message]);

  const handleSend = async () => {
    if (!message.trim() || !uploadedFile || isLoading) return;

    const userMessage = message;
    setMessage('');
    setIsLoading(true);

    onSendMessage(userMessage, 'user');

    try {
      const formData = new FormData();
      formData.append('pdf', uploadedFile);
      formData.append('message', userMessage);

      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      const data = await response.json();
      onSendMessage(data.response, 'ai');
    } catch (error) {
      onSendMessage('❌ Sorry, I encountered an error. Please try again.', 'ai');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <motion.div 
      className="chat-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <ErrorMessage error={error} onClose={onErrorClose} />
      
      <div className="messages">
        {messages.map((msg, index) => (
          <Message key={index} message={msg.content} sender={msg.sender} />
        ))}
        {isLoading && (
          <motion.div
            className="loading-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="loading-dots">
              <motion.div
                className="loading-dot"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
              />
              <motion.div
                className="loading-dot"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
              />
              <motion.div
                className="loading-dot"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
              />
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <motion.div 
        className="input-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="input-container">
          <motion.textarea
            ref={textareaRef}
            className="message-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={uploadedFile ? "Ask about your PDF..." : "Upload PDF to chat..."}
            disabled={!uploadedFile || isLoading}
            rows={1}
            whileFocus={{ scale: 1.02 }}
          />
          <motion.button
            className="send-button"
            onClick={handleSend}
            disabled={!uploadedFile || !message.trim() || isLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Send className="send-icon" />
            Send
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Main App Component
const App = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      content: '👋 Hello! Upload a PDF file and I\'ll help you chat with its contents. Ask me questions about the document!'
    }
  ]);
  const [error, setError] = useState('');
  const [showIntro, setShowIntro] = useState(true);

  // Apply viewport height fix
  useViewportHeight();

  const handleFileUpload = (file) => {
    if (file.type !== 'application/pdf') {
      setError('Please select a PDF file.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('File size should be less than 10MB.');
      return;
    }

    setUploadedFile(file);
    setError('');
    setShowIntro(false);
    
    const successMessage = {
      sender: 'ai',
      content: `✅ PDF "${file.name}" uploaded successfully! You can now ask questions about it.`
    };
    setMessages(prev => [...prev, successMessage]);
  };

  const handleFileChange = () => {
    setUploadedFile(null);
    setShowIntro(true);
    setMessages([
      {
        sender: 'ai',
        content: '👋 Hello! Upload a PDF file and I\'ll help you chat with its contents. Ask me questions about the document!'
      }
    ]);
  };

  const handleSendMessage = (content, sender) => {
    setMessages(prev => [...prev, { content, sender }]);
  };

  const handleErrorClose = () => {
    setError('');
  };

  return (
    <div className="app">
      <motion.div 
        className="container"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <AnimatePresence>
          {showIntro && (
            <motion.div
              className="intro-section"
              initial={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Header />
              <UploadSection
                onFileUpload={handleFileUpload}
                uploadedFile={uploadedFile}
                onFileChange={handleFileChange}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <ChatContainer
          messages={messages}
          onSendMessage={handleSendMessage}
          uploadedFile={uploadedFile}
          error={error}
          onErrorClose={handleErrorClose}
        />
      </motion.div>
    </div>
  );
};

export default App;
