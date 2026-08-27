import { useState } from 'react';
import { Send, Mail } from 'lucide-react';
import { personal } from '../data/portfolioData';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [opened, setOpened] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Honest behavior: no backend is wired up yet, so we hand the message
  // to the visitor's email client via mailto: instead of pretending it was sent.
  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio message from ${formData.name}`);
    const body = encodeURIComponent(
      `${formData.message}\n\n— ${formData.name} (${formData.email})`
    );
    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
    setOpened(true);
    setTimeout(() => setOpened(false), 8000);
  };

  return (
    <form
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
          className="w-full px-6 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
          style={{
            background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.9) 0%, rgba(0, 150, 255, 1) 100%)',
            boxShadow: '0 10px 40px rgba(0, 212, 255, 0.4)',
          }}
        >
          {opened ? (
            <>
              <Mail className="w-5 h-5" />
              <span>Opening your email app…</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Send Message</span>
            </>
          )}
        </button>

        <p className="text-xs text-gray-500 text-center">
          Your email client will open to send this message directly to{' '}
          <span className="text-cyan-400">{personal.email}</span>.
        </p>
      </div>
    </form>
  );
};

export default ContactForm;
