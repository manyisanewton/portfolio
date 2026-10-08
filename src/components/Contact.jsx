import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiSend, FiMail, FiMapPin, FiPhone, FiMessageSquare, FiClock, FiShield, FiArrowUpRight } from 'react-icons/fi';
import { useCursor } from '../context/CursorContext';
import { MagneticButton, TiltCard } from './ui';
import { useToast } from './ui';

const Contact = () => {
  const { setCursorVariant } = useCursor();
  const { success: showSuccess, error: showError } = useToast();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const accessKey = '0a65ca1a-d319-4083-b22b-6d191e558381';

  const handleMouseEnter = () => setCursorVariant('link');
  const handleMouseLeave = () => setCursorVariant('default');

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    else if (formData.message.trim().length < 20) newErrors.message = 'Message must be at least 20 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: accessKey, ...formData }),
      });

      const result = await res.json();

      if (result.success) {
        showSuccess('Message Sent!', 'Thank you for reaching out. I\'ll get back to you within 24 hours.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        console.error('Error from Web3Forms:', result);
        showError('Something went wrong', result.message || 'Please try again or email directly.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      showError('Network Error', 'Could not send the message. Please check your connection or email directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-shell scroll-mt-24 sm:scroll-mt-28"
      aria-labelledby="contact-heading"
    >
      <div className="container relative z-10">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,1fr)_520px] lg:gap-20">
          {/* Left: Info & Context */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="space-y-9"
          >
            <div className="max-w-xl">
              <span className="section-kicker">Contact</span>
              <h2 id="contact-heading" className="section-heading mt-2">
                Let&apos;s build something great.
              </h2>
              <p className="section-subheading">
                Have a project in mind? Let&apos;s talk.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-5 border-t pt-8" style={{ borderColor: 'var(--border-light)' }}>
              <div>
                <h3 className="font-display text-xl font-semibold" style={{ color: 'var(--fg-primary)' }}>
                  Direct channels
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  { icon: FiMail, label: 'Email', value: 'manyisanewton26@gmail.com', href: 'mailto:manyisanewton26@gmail.com' },
                  { icon: FiPhone, label: 'Phone', value: '+254 799 425417', href: 'tel:+254799425417' },
                  { icon: FiMapPin, label: 'Location', value: 'Nairobi, Kenya', href: null },
                  { icon: FiMessageSquare, label: 'WhatsApp', value: 'Chat directly', href: 'https://wa.me/254799425417' },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.08 }}
                    className="group rounded-2xl border bg-white/80 p-4 shadow-[0_6px_20px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(15,23,42,0.08)]"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl" style={{ background: 'var(--color-cyan-soft)' }}>
                        <item.icon className="h-5 w-5" style={{ color: 'var(--color-cyan)' }} />
                      </div>
                      {item.href && <FiArrowUpRight className="h-4 w-4 text-slate-300 transition-colors group-hover:text-cyan-500" />}
                    </div>
                    <div className="mt-4">
                      <div className="text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: 'var(--fg-tertiary)' }}>{item.label}</div>
                      {item.href ? <a href={item.href} className="mt-1 block break-words text-sm font-semibold text-slate-800 transition-colors group-hover:text-cyan-600">{item.value}</a> : <span className="mt-1 block text-sm font-semibold text-slate-800">{item.value}</span>}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Availability */}
            <TiltCard intensity={3} scale={1.005} glow={false} className="p-5 sm:p-6">
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                <div className="flex items-center gap-4">
                  <div className="relative flex h-3 w-3 flex-shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Available for new work</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 whitespace-nowrap rounded-full bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
                  <FiClock className="h-4 w-4" />
                  Replies in 24h
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          >
            <TiltCard intensity={4} scale={1.005} glow={false} className="p-6 sm:p-8 lg:p-9">
              <div className="mb-8 border-b pb-6" style={{ borderColor: 'var(--border-light)' }}>
                <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-cyan-600">
                  <FiMessageSquare className="h-4 w-4" />
                  Project enquiry
                </div>
                <h3 className="font-display text-2xl font-semibold text-slate-900 sm:text-3xl">Tell me about your project.</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">A few details are enough.</p>
              </div>
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="label">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className={`input-field ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                      aria-invalid={errors.name ? 'true' : 'false'}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      disabled={isSubmitting}
                    />
                    {errors.name && (
                      <motion.p id="name-error" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-1.5 text-sm text-red-500" role="alert">
                        {errors.name}
                      </motion.p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="label">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      className={`input-field ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                      aria-invalid={errors.email ? 'true' : 'false'}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      disabled={isSubmitting}
                    />
                    {errors.email && (
                      <motion.p id="email-error" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-1.5 text-sm text-red-500" role="alert">
                        {errors.email}
                      </motion.p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="label">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="What would you like to build?"
                    rows={6}
                    required
                    className={`input-field min-h-[160px] resize-y ${errors.message ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                    aria-invalid={errors.message ? 'true' : 'false'}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    disabled={isSubmitting}
                  />
                  {errors.message && (
                    <motion.p id="message-error" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-1.5 text-sm text-red-500" role="alert">
                      {errors.message}
                    </motion.p>
                  )}
                  <div className="mt-2 text-right text-xs" style={{ color: 'var(--fg-tertiary)' }}>
                    {formData.message.length}/5000
                  </div>
                </div>

                <div className="pt-2">
                  <MagneticButton
                    type="submit"
                    variant="primary"
                    magneticStrength={0.3}
                    className="w-full justify-center py-4 text-lg"
                    disabled={isSubmitting}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <FiSend className="h-5 w-5 ml-2" />
                      </>
                    )}
                  </MagneticButton>
                </div>

                <div
                  className="flex flex-col items-center justify-between gap-3 border-t pt-5 text-xs text-slate-500 sm:flex-row"
                  style={{ borderColor: 'var(--border-light)' }}
                >
                  <span className="flex items-center gap-2"><FiShield className="h-4 w-4 text-emerald-500" /> Private</span>
                  <span className="flex items-center gap-2"><FiClock className="h-4 w-4 text-cyan-500" /> Reply in 24h</span>
                </div>
              </form>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
