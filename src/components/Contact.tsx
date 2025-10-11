import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Globe, MessageCircle, Calendar, Zap, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    projectType: 'consulting'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus('idle');

    try {
      // EmailJS configuration - replace with your actual service details
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        project_type: formData.projectType,
        to_name: 'Adil Omer'
      };

      await emailjs.send(
        'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
        templateParams,
        'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
      );

      setSubmissionStatus('success');

      // Reset form only on success
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        projectType: 'consulting'
      });

    } catch (error) {
      console.error('Form submission failed:', error);
      setSubmissionStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const projectTypes = [
    { value: 'consulting', label: 'Technical Consulting', icon: '🔧' },
    { value: 'fulltime', label: 'Full-time Position', icon: '💼' },
    { value: 'contract', label: 'Contract Work', icon: '📋' },
    { value: 'freelance', label: 'Freelance Project', icon: '🛠️' },
    { value: 'collaboration', label: 'Collaboration', icon: '🤝' },
    { value: 'other', label: 'Other Opportunity', icon: '💡' }
  ];

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().toLocaleString('en-US', { month: 'long' });
  const currentDay = new Date().getDate();

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium mb-4">
            <MessageCircle className="h-4 w-4" />
            Let's Connect
          </div>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-6">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            I'm always interested in discussing new opportunities, technical challenges, 
            and innovative projects. Let's explore how we can create something extraordinary together.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-2 space-y-8">
            {/* Availability Status */}
            <div className="relative p-8 bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-3xl border border-emerald-200 dark:border-emerald-800 overflow-hidden">
              <div className="absolute top-4 right-4">
                <div className="w-4 h-4 bg-emerald-500 rounded-full animate-pulse"></div>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-emerald-500 rounded-xl">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-300">
                    Currently Available
                  </h3>
                  <p className="text-emerald-600 dark:text-emerald-400 text-sm">
                    Ready for new challenges
                  </p>
                </div>
              </div>
              <p className="text-emerald-700 dark:text-emerald-300 mb-4">
                Open to full-time opportunities, consulting projects, and technical advisory roles.
              </p>
              <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
                <Calendar className="h-4 w-4" />
                Response time: Within 24 hours (Current date: {currentDay} {currentMonth} {currentYear})
              </div>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Get In Touch
              </h3>
              
              <div className="space-y-4">
                {[
                  {
                    icon: Mail,
                    label: 'Email',
                    value: 'adilazhariosman@gmail.com',
                    href: 'mailto:adilazhariosman@gmail.com',
                    color: 'from-blue-500 to-cyan-500'
                  },
                  {
                    icon: Phone,
                    label: 'Phone',
                    value: '+60 13-903 4997',
                    href: 'tel:+60139034997',
                    color: 'from-emerald-500 to-teal-500'
                  },
                  {
                    icon: MapPin,
                    label: 'Location',
                    value: 'Shah Alam, Selangor, Malaysia',
                    href: 'https://www.google.com/maps/place/Shah+Alam,+Selangor,+Malaysia',
                    color: 'from-purple-500 to-pink-500'
                  }
                ].map((contact, index) => (
                  <div key={index} className="group flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className={`p-3 bg-gradient-to-r ${contact.color} rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                      <contact.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {contact.label}
                      </p>
                      {contact.href !== '#' ? (
                        <a 
                          href={contact.href}
                          target={contact.label === 'Location' ? '_blank' : '_self'} // Open location in new tab
                          rel={contact.label === 'Location' ? 'noopener noreferrer' : ''}
                          className="text-blue-600 dark:text-blue-400 hover:underline transition-colors duration-200"
                        >
                          {contact.value}
                        </a>
                      ) : (
                        <p className="text-gray-600 dark:text-gray-300">
                          {contact.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                Connect Online
              </h4>
              <div className="flex gap-4">
                {[
                  { icon: Github, href: 'https://github.com/AdilAzhari', label: 'GitHub', color: 'hover:bg-gray-800' },
                  { icon: Linkedin, href: 'https://github.com/AdilAzhari', label: 'LinkedIn', color: 'hover:bg-blue-600' },
                  { icon: Globe, href: 'https://your-blog-or-portfolio.dev', label: 'Portfolio', color: 'hover:bg-emerald-600' } // Changed label from Blog to Portfolio
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:text-white shadow-lg hover:shadow-xl ${social.color}`}
                  >
                    <social.icon className="h-5 w-5" />
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-900 p-8 lg:p-12 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Start a Conversation
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Project Type Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                    What type of opportunity are you interested in? *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {projectTypes.map((type) => (
                      <label
                        key={type.value}
                        className={`relative flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                          formData.projectType === type.value
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500'
                        }`}
                      >
                        <input
                          type="radio"
                          name="projectType"
                          value={type.value}
                          checked={formData.projectType === type.value}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <span className="text-xl">{type.icon}</span>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {type.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Name and Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200 hover:border-blue-300 dark:hover:border-blue-500"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200 hover:border-blue-300 dark:hover:border-blue-500"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200 hover:border-blue-300 dark:hover:border-blue-500"
                    placeholder="Brief description of your inquiry"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200 hover:border-blue-300 dark:hover:border-blue-500 resize-none"
                    placeholder="Tell me about the opportunity, project requirements, timeline, budget, or what you'd like to discuss..."
                  />
                </div>

                {/* Submission Status Message */}
                {submissionStatus === 'success' && (
                  <div className="p-4 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 rounded-lg flex items-center gap-3 animate-fade-in">
                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                    <div>
                      <p className="font-semibold">Message sent successfully!</p>
                      <p className="text-sm opacity-90">Thank you for reaching out. I'll get back to you within 24 hours.</p>
                    </div>
                  </div>
                )}
                {submissionStatus === 'error' && (
                  <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-lg flex items-center gap-3 animate-fade-in">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="font-semibold">Failed to send message</p>
                      <p className="text-sm opacity-90">Please try again later or contact me directly at adilazhariosman@gmail.com</p>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:scale-100 disabled:shadow-none"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
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