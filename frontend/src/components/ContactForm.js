import { useState, useRef } from 'react';
import gsap from 'gsap';
import { Send, CheckCircle } from 'lucide-react';

const ContactForm = () => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle, sending, success, error

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    // Simulate form submission
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });

      // Reset status after 3 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    }, 1500);
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="glass rounded-3xl p-8"
      style={{
        background: 'rgba(0, 20, 40, 0.6)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(0, 212, 255, 0.3)',
      }}
    >
      <h3 className="text-2xl font-heading font-bold mb-6 text-cyan-400">
        Send a Message
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-cyan-500/30 text-white focus:outline-none focus:border-cyan-400 transition-colors"
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-cyan-500/30 text-white focus:outline-none focus:border-cyan-400 transition-colors"
            placeholder="your.email@example.com"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-cyan-500/30 text-white focus:outline-none focus:border-cyan-400 transition-colors resize-none"
            placeholder="Your message..."
          />
        </div>

        <button
          type="submit"
          disabled={status === 'sending' || status === 'success'}
          className="w-full px-6 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: status === 'success' 
              ? 'linear-gradient(135deg, rgba(0, 255, 100, 0.9) 0%, rgba(0, 200, 80, 1) 100%)'
              : 'linear-gradient(135deg, rgba(0, 212, 255, 0.9) 0%, rgba(0, 150, 255, 1) 100%)',
            boxShadow: '0 10px 40px rgba(0, 212, 255, 0.4)',
          }}
        >
          {status === 'sending' && (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
              <span>Sending...</span>
            </>
          )}
          {status === 'success' && (
            <>
              <CheckCircle className="w-5 h-5" />
              <span>Message Sent!</span>
            </>
          )}
          {status === 'idle' && (
            <>
              <Send className="w-5 h-5" />
              <span>Send Message</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
