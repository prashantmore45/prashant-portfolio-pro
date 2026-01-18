import { useState } from "react";
import api from "../api/axios";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaPaperPlane, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await api.post("/contact", formData);
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus(null), 5000);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };


  return (
    <section id="contact" className="py-16 md:py-24 px-4 md:px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-3xl md:text-5xl font-bold text-center mb-12 md:mb-16"
        >
          Get In <span className="text-primary">Touch</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          <div className="space-y-8 text-center md:text-left">
            <h3 className="text-2xl font-semibold">Let's talk about your project</h3>
            <p className="text-gray-400 leading-relaxed">
              I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
            
            <div className="flex flex-col md:flex-row items-center gap-4 text-gray-300">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-primary text-xl border border-white/10">
                <FaEnvelope />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email Me</p>
                <p className="font-medium">prashantmorepm05@gmail.com</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4 text-gray-300">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-primary text-xl border border-white/10">
                <FaMapMarkerAlt />
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">Pune, India</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 bg-white/5 p-6 md:p-8 rounded-2xl border border-white/10 backdrop-blur-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                name="name" 
                placeholder="Your Name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
                className="w-full bg-black/20 p-3 rounded-lg border border-white/10 focus:border-primary outline-none text-white transition-colors" 
              />
              <input 
                name="email" 
                type="email" 
                placeholder="Your Email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
                className="w-full bg-black/20 p-3 rounded-lg border border-white/10 focus:border-primary outline-none text-white transition-colors" 
              />
            </div>
            
            <textarea 
              name="message" 
              rows="4" 
              placeholder="Your Message" 
              value={formData.message} 
              onChange={handleChange} 
              required 
              className="w-full bg-black/20 p-3 rounded-lg border border-white/10 focus:border-primary outline-none text-white transition-colors resize-none" 
            />

            <button 
              type="submit" 
              disabled={status === "sending"}
              className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${
                status === "success" ? "bg-green-500 text-white" : "bg-primary hover:bg-violet-700 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]"
              }`}
            >
              {status === "sending" ? "Sending..." : status === "success" ? "Message Sent! ✅" : <>Send Message <FaPaperPlane/></>}
            </button>
            
            {status === "error" && <p className="text-red-400 text-center text-sm">Failed to send message. Please try again.</p>}
          </form>

        </div>
      </div>
    </section>
  );
};

export default Contact;