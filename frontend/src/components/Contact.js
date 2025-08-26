import React, { useState, useRef } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaCopy } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error('Please fill all required fields correctly', { position: 'bottom-right' });
      return;
    }
    setLoading(true);
    try {
      await axios.post('https://portfolio-backend-82ts.onrender.com/api/contact', formData);
      toast.success('Message sent successfully! I’ll reply within 24-48 hours.', {
        position: 'bottom-right',
      });
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
      formRef.current.focus(); // Refocus form for accessibility
    } catch (error) {
      toast.error('Error sending message. Please try again.', { position: 'bottom-right' });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.info('Copied to clipboard!', { position: 'bottom-right' });
  };

  return (
    <section className="container py-18">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-dark dark:text-light mb-8 leading-tight">Contact Me</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white dark:bg-[#1F2937] p-6 rounded-xl2 shadow-soft"
            role="form"
            aria-labelledby="contact-form-title"
          >
            <h3 id="contact-form-title" className="sr-only">Contact Form</h3>
            <form onSubmit={handleSubmit} className="space-y-4" ref={formRef} tabIndex={-1}>
              <div>
                <label className="text-sm text-dark/70 dark:text-light/70 leading-relaxed">Name</label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40 dark:focus:ring-[#06B6D4]/40 transition-colors ${
                    errors.name ? 'border-red-500 dark:border-red-400' : 'border-dark/10 dark:border-light/10'
                  }`}
                  aria-invalid={errors.name ? 'true' : 'false'}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  required
                />
                {errors.name && (
                  <p id="name-error" className="text-sm text-red-500 dark:text-red-400 mt-1">
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm text-dark/70 dark:text-light/70 leading-relaxed">Email</label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40 dark:focus:ring-[#06B6D4]/40 transition-colors ${
                    errors.email ? 'border-red-500 dark:border-red-400' : 'border-dark/10 dark:border-light/10'
                  }`}
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  required
                />
                {errors.email && (
                  <p id="email-error" className="text-sm text-red-500 dark:text-red-400 mt-1">
                    {errors.email}
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm text-dark/70 dark:text-light/70 leading-relaxed">Message</label>
                <motion.textarea
                  whileFocus={{ scale: 1.01 }}
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40 dark:focus:ring-[#06B6D4]/40 transition-colors ${
                    errors.message ? 'border-red-500 dark:border-red-400' : 'border-dark/10 dark:border-light/10'
                  }`}
                  rows="5"
                  aria-invalid={errors.message ? 'true' : 'false'}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  required
                />
                {errors.message && (
                  <p id="message-error" className="text-sm text-red-500 dark:text-red-400 mt-1">
                    {errors.message}
                  </p>
                )}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={loading}
                className="btn-primary disabled:opacity-60 flex items-center gap-2"
                aria-disabled={loading}
              >
                {loading && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  />
                )}
                {loading ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>

          {/* Right: Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-white dark:bg-[#1F2937] p-6 rounded-xl2 shadow-soft">
              <h3 className="text-2xl font-semibold text-primary dark:text-[#06B6D4] mb-4 leading-tight">My Details</h3>
              <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-3 mb-3">
                <FaEnvelope className="text-primary dark:text-[#06B6D4]" />
                <span className="text-dark dark:text-light">yuvrajsingh78905@gmail.com</span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => handleCopy('yuvrajsingh78905@gmail.com')}
                  className="text-primary dark:text-[#06B6D4] hover:text-accent dark:hover:text-[#0891B2] transition-colors"
                  aria-label="Copy email"
                >
                  <FaCopy />
                </motion.button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-3 mb-3">
                <FaPhone className="text-primary dark:text-[#06B6D4]" />
                <span className="text-dark dark:text-light">+91-8597792547</span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => handleCopy('+91-8597792547')}
                  className="text-primary dark:text-[#06B6D4] hover:text-accent dark:hover:text-[#0891B2] transition-colors"
                  aria-label="Copy phone number"
                >
                  <FaCopy />
                </motion.button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-primary dark:text-[#06B6D4]" />
                <span className="text-dark dark:text-light">Asansol, India</span>
              </motion.div>
            </div>
            <div className="bg-white dark:bg-[#1F2937] p-6 rounded-xl2 shadow-soft flex items-center gap-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://linkedin.com/in/your-profile"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary dark:text-[#06B6D4] hover:text-accent dark:hover:text-[#0891B2] transition-colors"
                aria-label="LinkedIn profile"
              >
                <FaLinkedin size={24} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://github.com/akatsuki9887"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary dark:text-[#06B6D4] hover:text-accent dark:hover:text-[#0891B2] transition-colors"
                aria-label="GitHub profile"
              >
                <FaGithub size={24} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://x.com/your-profile"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary dark:text-[#06B6D4] hover:text-accent dark:hover:text-[#0891B2] transition-colors"
                aria-label="X profile"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </motion.div>
      <ToastContainer
        position="bottom-right"
        theme="colored"
        toastClassName="bg-white dark:bg-[#1F2937] text-dark dark:text-light border border-dark/10 dark:border-light/10"
      />
    </section>
  );
};

export default Contact;