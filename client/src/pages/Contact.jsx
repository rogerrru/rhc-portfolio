import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/layout/Header.jsx';
import Footer from '../components/layout/Footer.jsx';
import SEOHead from '../components/shared/SEOHead.jsx';
import contactPic from '../assets/home/rectangle-5.svg';

const CONTACT = {
  email: 'rhchegyem@gmail.com',
  phone: '(+63) 976 185 3106',
  location: 'Baguio City, Philippines',
  linkedin: 'https://www.linkedin.com/in/roger-chegyem-4737a6369/',
  github: 'https://github.com/rogerrru',
};

const Contact = () => {
  return (
    <div className="w-screen min-h-screen flex flex-col">
      <SEOHead
        title="Contact"
        description="Get in touch with Roger Jr. H. Chegyem — open to collaboration, projects, and opportunities."
      />
      <Header />

      <main className="flex-1 flex items-center justify-center px-5 py-10 pb-20">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="text-center md:text-right"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="font-lexend_exa text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">
              CONTACT ME.
            </h1>

            <div className="font-lexend_exa space-y-3 text-xl text-gray-800">
              <a href={`mailto:${CONTACT.email}`} className="block hover:underline">
                {CONTACT.email}
              </a>
              <p>{CONTACT.phone}</p>
              <p className="text-gray-500 text-base">{CONTACT.location}</p>
              <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className="block hover:underline">
                LinkedIn
              </a>
              <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" className="block hover:underline">
                GitHub
              </a>
            </div>
          </motion.div>

          <motion.div
            className="bg-gray-300 rounded-xl overflow-hidden"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <img src={contactPic} alt="Contact illustration" className="w-full" />
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
