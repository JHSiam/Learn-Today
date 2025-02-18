import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
  return (
    <div className="bg-base-100 py-12 px-6 md:px-12 lg:px-24 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-primary mb-6">Contact Us</h2>
        <p className="text-lg text-gray-500 mb-8">
          Have questions or need assistance? Feel free to reach out to us.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="card bg-base-200 shadow-lg p-6 rounded-xl hover:scale-105 transition-transform">
          <FaEnvelope className="text-5xl text-primary mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-accent">Email Us</h3>
          <p className="text-gray-500 mt-2">support@edulearn.com</p>
        </div>

        <div className="card bg-base-200 shadow-lg p-6 rounded-xl hover:scale-105 transition-transform">
          <FaPhone className="text-5xl text-primary mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-accent">Call Us</h3>
          <p className="text-gray-500 mt-2">+1 (234) 567-890</p>
        </div>

        <div className="card bg-base-200 shadow-lg p-6 rounded-xl hover:scale-105 transition-transform">
          <FaMapMarkerAlt className="text-5xl text-primary mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-accent">Visit Us</h3>
          <p className="text-gray-500 mt-2">123 Learning St, Knowledge City</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
