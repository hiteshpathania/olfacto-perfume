"use client";

import { useState } from "react";

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    // ADD YOUR WEB3FORMS KEY HERE
    formData.append("access_key", "26abbafc-b263-47b4-a396-d47e8f704ace");
    formData.append("subject", "New Inquiry - Olfacto Perfume");
    formData.append("from_name", "Olfacto Contact Us");

    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
    } catch (error) {
      console.error("Message failed to send", error);
    }

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      form.reset();
    }, 4000);
  };

  return (
    <div className="min-h-screen pb-24">
      <div className="bg-gray-50 py-20 md:py-28 px-4 sm:px-6 lg:px-8 text-center border-b border-gray-100">
        <h1 className="text-3xl md:text-5xl font-bold tracking-[0.2em] uppercase mb-4 text-black">Contact Us</h1>
        <p className="text-gray-500 text-xs md:text-sm tracking-widest uppercase max-w-xl mx-auto">
          Whether you're looking for your signature scent or want to build the brand with us, we're listening.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          <div className="flex flex-col justify-center space-y-12">
            <div>
              <h2 className="text-lg font-bold tracking-widest uppercase mb-3 border-l-4 border-black pl-4">Customer Support</h2>
              <p className="text-gray-600 text-sm leading-relaxed pl-5">Have a question about your order, need a fragrance recommendation, or looking for something entirely different and custom? Reach out to our dedicated support team.</p>
              <p className="text-black font-semibold text-xs tracking-widest uppercase mt-4 pl-5">Email: olfactoperfume@gmail.com</p>
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-widest uppercase mb-3 border-l-4 border-black pl-4">Collaborations & Marketing</h2>
              <p className="text-gray-600 text-sm leading-relaxed pl-5">Want to be a part of the Olfacto movement? We are always looking to partner with creators, visionaries, and marketers who align with our luxury streetwear aesthetic.</p>
              <p className="text-black font-semibold text-xs tracking-widest uppercase mt-4 pl-5">Email: olfactoperfume@gmail.com</p>
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-widest uppercase mb-3 border-l-4 border-black pl-4">Operating Hours</h2>
              <p className="text-gray-600 text-sm leading-relaxed pl-5">Monday to Saturday <br /> 10:00 AM - 7:00 PM (IST)</p>
            </div>
          </div>

          <div className="bg-white border border-gray-100 p-8 md:p-12 shadow-[0_0_40px_rgba(0,0,0,0.03)] relative overflow-hidden">
            <h2 className="text-xl font-bold tracking-widest uppercase mb-8">Send a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[10px] tracking-widest uppercase text-gray-500 mb-2">Name</label>
                  <input required name="Sender_Name" type="text" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors bg-transparent rounded-none text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] tracking-widest uppercase text-gray-500 mb-2">Email</label>
                  <input required name="Sender_Email" type="email" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors bg-transparent rounded-none text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] tracking-widest uppercase text-gray-500 mb-2">Subject / Topic</label>
                {/* MOVED defaultValue="" UP HERE TO THE SELECT TAG */}
                <select required name="Topic" defaultValue="" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors bg-transparent rounded-none text-sm text-gray-700 cursor-pointer">
                  {/* REMOVED 'selected' FROM THIS OPTION */}
                  <option value="" disabled>Select an option...</option>
                  <option value="Order Support">Order Support</option>
                  <option value="Custom Request">Custom Fragrance Request</option>
                  <option value="Collaboration">Marketing / Collaboration</option>
                  <option value="Other">Other Inquiry</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] tracking-widest uppercase text-gray-500 mb-2">Your Message</label>
                <textarea required name="Message" rows={4} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors bg-transparent rounded-none text-sm resize-none"></textarea>
              </div>
              <button type="submit" className="w-full bg-black text-white py-5 text-sm tracking-widest uppercase hover:bg-gray-800 transition-colors">
                Submit Inquiry
              </button>
            </form>

            <div className={`absolute inset-0 bg-black text-white flex flex-col items-center justify-center transition-transform duration-500 ease-in-out z-20 ${isSubmitted ? 'translate-y-0' : 'translate-y-full'}`}>
              <h3 className="text-2xl font-bold tracking-widest uppercase mb-2">Message Sent</h3>
              <p className="text-xs text-gray-400 tracking-widest uppercase text-center px-4">Our team will get back to you shortly.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}