import React from 'react';
import { Link } from 'react-router-dom';
import { useContact } from '../../hooks/useContact.js';

const Footer = () => {
  const { contact } = useContact();

  return (
    <footer className="bg-gray-800 text-white px-12 py-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 text-center md:text-left">
        <div>
          <h3 className="font-lexend_exa font-black text-lg mb-2">ROGER JR. H. CHEGYEM</h3>
          <div className="font-lexend_exa font-light space-y-1">
            {contact?.location && <p>{contact.location.toUpperCase()}</p>}
            {contact?.email && (
              <a href={`mailto:${contact.email}`} className="block underline mt-2 hover:opacity-80">
                {contact.email}
              </a>
            )}
            {contact?.phone && <p>{contact.phone}</p>}
          </div>
        </div>

        <div>
          <h3 className="font-lexend_exa font-black text-lg mb-2">NAVIGATION</h3>
          <ul className="font-lexend_exa font-light space-y-1">
            {[['/', 'HOME'], ['/portfolio', 'PORTFOLIO'], ['/resume', 'RESUME'], ['/contact', 'CONTACT']].map(
              ([to, label]) => (
                <li key={to}>
                  <Link to={to} className="hover:opacity-80">{label}</Link>
                </li>
              )
            )}
          </ul>
        </div>

        <div>
          <h3 className="font-lexend_exa font-black text-lg mb-2">LINKS</h3>
          <ul className="font-lexend_exa font-light space-y-1">
            {contact?.linkedin && (
              <li>
                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                  LINKEDIN
                </a>
              </li>
            )}
            {contact?.github && (
              <li>
                <a href={contact.github} target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                  GITHUB
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
