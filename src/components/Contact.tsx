import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Globe, CheckCircle, AlertCircle } from 'lucide-react';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const EMAILJS_CONFIGURED = Boolean(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY);

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    projectType: 'fulltime'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus('idle');

    if (EMAILJS_CONFIGURED) {
      try {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
            project_type: formData.projectType,
          },
          EMAILJS_PUBLIC_KEY
        );
        setSubmissionStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '', projectType: 'fulltime' });
      } catch {
        setSubmissionStatus('error');
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    // Fallback when EmailJS isn't configured: open the visitor's email client.
    try {
      const body = [
        `Name: ${formData.name}`,
        `Email: ${formData.email}`,
        `Type: ${formData.projectType}`,
        '',
        formData.message,
      ].join('\n');

      const mailto = `mailto:adilazhariosman@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;

      setSubmissionStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '', projectType: 'fulltime' });
    } catch {
      setSubmissionStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const projectTypes = [
    { value: 'fulltime', label: 'Full-time Position' },
    { value: 'contract', label: 'Contract Work' },
    { value: 'freelance', label: 'Freelance Project' },
    { value: 'consulting', label: 'Technical Consulting' },
    { value: 'collaboration', label: 'Collaboration' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <section id="contact" className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-accent font-mono text-sm tracking-widest uppercase mb-3">Let's Connect</p>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Ready to Build Something?
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Open to full-time roles, freelance projects, and technical consulting. I'll respond within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left — Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Availability */}
            <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-200 dark:border-emerald-800">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                <span className="font-bold text-emerald-800 dark:text-emerald-300">Currently Available</span>
              </div>
              <p className="text-emerald-700 dark:text-emerald-400 text-sm">
                Open to full-time opportunities, consulting, and freelance projects.
              </p>
            </div>

            {/* Direct contacts */}
            <div className="space-y-3">
              {[
                { icon: Mail, label: 'Email', value: 'adilazhariosman@gmail.com', href: 'mailto:adilazhariosman@gmail.com' },
                { icon: Phone, label: 'Phone', value: '+60 13-903 4997', href: 'tel:+60139034997' },
                { icon: MapPin, label: 'Location', value: 'Shah Alam, Selangor, Malaysia', href: 'https://www.google.com/maps/place/Shah+Alam,+Selangor,+Malaysia' },
              ].map((contact) => (
                <a
                  key={contact.label}
                  href={contact.href}
                  target={contact.label === 'Location' ? '_blank' : undefined}
                  rel={contact.label === 'Location' ? 'noopener noreferrer' : undefined}
                  className="group flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-accent-300 dark:hover:border-accent-700 transition-colors duration-200"
                >
                  <div className="p-2.5 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <contact.icon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">{contact.label}</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{contact.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Find me online</h4>
              <div className="flex gap-3">
                {[
                  { icon: Github, href: 'https://github.com/AdilAzhari', label: 'GitHub' },
                  { icon: Linkedin, href: 'https://linkedin.com/in/adil-omer-8aab21167', label: 'LinkedIn' },
                  { icon: Globe, href: 'https://adilomer.xyz', label: 'Portfolio' },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="p-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-500 dark:text-gray-400 hover:text-accent hover:border-accent-300 dark:hover:border-accent-700 transition-colors duration-200"
                  >
                    <s.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-900 p-8 lg:p-10 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Start a Conversation</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Project type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    What can I help you with?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {projectTypes.map((type) => (
                      <label
                        key={type.value}
                        className={`flex items-center justify-center p-3 rounded-xl border-2 cursor-pointer text-sm font-medium transition-colors duration-200 ${
                          formData.projectType === type.value
                            ? 'border-accent bg-accent-50 dark:bg-accent-900/20 text-accent-700 dark:text-accent-300'
                            : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-accent-300 dark:hover:border-accent-600'
                        }`}
                      >
                        <input type="radio" name="projectType" value={type.value} checked={formData.projectType === type.value} onChange={handleChange} className="sr-only" />
                        {type.label}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Full Name *</label>
                    <input
                      type="text" id="name" name="name" required
                      value={formData.name} onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email Address *</label>
                    <input
                      type="email" id="email" name="email" required
                      value={formData.email} onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Subject *</label>
                  <input
                    type="text" id="subject" name="subject" required
                    value={formData.subject} onChange={handleChange}
                    placeholder="Brief description of your inquiry"
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Message *</label>
                  <textarea
                    id="message" name="message" required rows={5}
                    value={formData.message} onChange={handleChange}
                    placeholder="Tell me about the opportunity, requirements, timeline..."
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 resize-none"
                  />
                </div>

                {/* Status messages */}
                {submissionStatus === 'success' && (
                  <div className="flex items-center gap-3 p-4 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300 rounded-xl border border-emerald-200 dark:border-emerald-700">
                    <CheckCircle className="h-5 w-5 flex-shrink-0" />
                    <p className="text-sm font-medium">
                      {EMAILJS_CONFIGURED
                        ? "Message sent. I'll reply within 24 hours."
                        : "Your email client should open now. I'll reply within 24 hours."}
                    </p>
                  </div>
                )}
                {submissionStatus === 'error' && (
                  <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded-xl border border-red-200 dark:border-red-700">
                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    <p className="text-sm font-medium">Something went wrong. Email me directly at adilazhariosman@gmail.com</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-accent hover:bg-accent-600 disabled:bg-gray-400 text-white font-semibold rounded-xl transition-colors duration-200 text-sm"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
