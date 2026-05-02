import React from 'react';
import { FaRegHandshake, FaFacebookF } from 'react-icons/fa';
import { SiApple, SiUdemy } from 'react-icons/si';

const partners = [
  {
    name: 'Facebook',
    logo: <FaFacebookF className="text-blue-400 text-5xl" />,
    description: 'Facebook collaborates with us to bring innovative social experiences.',
  },
  {
    name: 'Apple',
    logo: <SiApple className="text-gray-300 text-5xl" />,
    description: 'Apple supports us with cutting-edge technology solutions.',
  },
  {
    name: 'Udemy',
    logo: <SiUdemy className="text-orange-400 text-5xl" />,
    description: 'Udemy collaborates to enhance learning opportunities.',
  },
];

const PartnersSection = () => {
  return (
    <section className="container mx-auto px-4 py-16 relative z-10">
      {/* Title */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3 text-white">
          <FaRegHandshake className="text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]" /> 
          Our Partners
        </h2>
        <p className="text-gray-300 max-w-xl mx-auto">
          We are proud to collaborate with industry-leading organizations.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {partners.map((partner, index) => (
          <div
            key={index}
            className="relative group backdrop-blur-md bg-gradient-to-b from-purple-500/10 to-purple-800/5 border border-purple-500/20 rounded-2xl p-6 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300 ease-in-out"
          >
            {/* Glow Behind */}
            <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>

            <div className="flex items-center justify-center mb-4 relative z-10">
              {partner.logo}
            </div>
            <div className="text-center relative z-10">
              <h3 className="text-xl font-semibold mb-2 text-white">{partner.name}</h3>
              <p className="text-gray-300 text-sm">{partner.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PartnersSection;
