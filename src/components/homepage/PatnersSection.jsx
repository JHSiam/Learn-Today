import React from 'react';
import { FaRegHandshake, FaFacebookF } from 'react-icons/fa';
import { SiApple, SiUdemy } from 'react-icons/si';

const partners = [
  {
    name: 'Facebook',
    logo: <FaFacebookF className="text-blue-600 text-5xl" />,
    description: 'Facebook collaborates with us to bring innovative social experiences.',
    bgColor: 'bg-blue-50',
  },
  {
    name: 'Apple',
    logo: <SiApple className="text-gray-800 text-5xl" />,
    description: 'Apple supports us with cutting-edge technology solutions.',
    bgColor: 'bg-gray-50',
  },
  {
    name: 'Udemy',
    logo: <SiUdemy className="text-orange-500 text-5xl" />,
    description: 'Udemy collaborates to enhance learning opportunities.',
    bgColor: 'bg-yellow-50',
  },
];

const PartnersSection = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
          <FaRegHandshake className="text-primary" /> Our Partners
        </h2>
        <p className="text-gray-600">We are proud to collaborate with industry-leading organizations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {partners.map((partner, index) => (
          <div
            key={index}
            className={`shadow-md border border-gray-200 rounded-lg overflow-hidden ${partner.bgColor}`}
          >
            <div className="flex items-center justify-center p-4">
              {partner.logo}
            </div>
            <div className="text-center p-4">
              <h3 className="text-xl font-semibold mb-2">{partner.name}</h3>
              <p className="text-gray-600">{partner.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnersSection;
