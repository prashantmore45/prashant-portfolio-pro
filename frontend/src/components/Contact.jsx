import { useState } from "react";
import api from "../api/axios";
import { motion as Motion } from "framer-motion";
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
    <section id="contact" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <Motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-bold text-center mb-16"
        >
          Get In <span className="text-primary">Touch</span>
        </Motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Contact Info */}
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold">Let's talk about your project</h3>
            <p className="text-gray-400 leading-relaxed">
              I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
            
            <div className="flex items-center gap-4 text-gray-300">
              <div className="w-12 h-12 bg-surface rounded-full flex items-center justify-center text-primary text-xl">
                <FaEnvelope />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email Me</p>
                <p className="font-medium">prashantmorepm05@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-gray-300">
              <div className="w-12 h-12 bg-surface rounded-full flex items-center justify-center text-primary text-xl">
                <FaMapMarkerAlt />
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">Pune, India</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4 bg-surface p-8 rounded-2xl border border-white/5">
            <div className="grid md:grid-cols-2 gap-4">
              <input 
                name="name" 
                placeholder="Your Name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
                className="w-full bg-background p-3 rounded border border-white/10 focus:border-primary outline-none text-white" 
              />
              <input 
                name="email" 
                type="email" 
                placeholder="Your Email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
                className="w-full bg-background p-3 rounded border border-white/10 focus:border-primary outline-none text-white" 
              />
            </div>
            
            <textarea 
              name="message" 
              rows="4" 
              placeholder="Your Message" 
              value={formData.message} 
              onChange={handleChange} 
              required 
              className="w-full bg-background p-3 rounded border border-white/10 focus:border-primary outline-none text-white" 
            />

            <button 
              type="submit" 
              disabled={status === "sending"}
              className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${
                status === "success" ? "bg-green-500 text-white" : "bg-primary hover:bg-violet-700 text-white"
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