import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import SectionReveal from './SectionReveal'

export default function Contact() {
    return (
        <section id="contact" className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionReveal>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Visit Us</h2>
                        <div className="w-24 h-1 bg-black mx-auto mb-6 rounded-full"></div>
                        <p className="text-xl text-gray-600">Experience our service in person at our Mumbai store.</p>
                    </div>
                </SectionReveal>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info & Map */}
                    <SectionReveal delay={0.2}>
                        <div className="space-y-8">
                            <div className="bg-white p-8 rounded-2xl shadow-sm space-y-6 hover:shadow-md transition-shadow">
                                <div className="flex items-start space-x-6">
                                    <div className="bg-black p-4 rounded-full text-white shadow-lg">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-1">Our Location</h3>
                                        <p className="text-gray-600 leading-relaxed">Poonawala Building No 1, Shop No- 5 & 6, <br />Lower Parel West, Mumbai 400013</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-6">
                                    <div className="bg-black p-4 rounded-full text-white shadow-lg">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-1">Phone</h3>
                                        <p className="text-gray-600">+91 96199 27279</p>
                                        <p className="text-gray-600">+91 93248 38159</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-6">
                                    <div className="bg-black p-4 rounded-full text-white shadow-lg">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-1">Email</h3>
                                        <p className="text-gray-600">markopticalco@gmail.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-6">
                                    <div className="bg-black p-4 rounded-full text-white shadow-lg">
                                        <Clock size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-1">Hours</h3>
                                        <p className="text-gray-600">Mon - Sat: 10:00 AM - 9:00 PM</p>
                                        <p className="text-gray-600">Sun: Closed</p>
                                    </div>
                                </div>
                            </div>

                            {/* Google Map Embed */}
                            <div className="rounded-2xl overflow-hidden shadow-lg h-80 border-4 border-white">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.956389656828!2d72.83688461490216!3d18.99525698713295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce40ffcfc0d1%3A0x600c3c3a96860000!2sLower%20Parel%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1645555555555!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    title="Google Maps Location"
                                ></iframe>
                            </div>
                        </div>
                    </SectionReveal>

                    {/* Contact Form */}
                    <SectionReveal delay={0.4}>
                        <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-100">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h3>
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Name</label>
                                        <input type="text" id="name" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition bg-gray-50 focus:bg-white" placeholder="Your Name" />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Email</label>
                                        <input type="email" id="email" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition bg-gray-50 focus:bg-white" placeholder="your@email.com" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Subject</label>
                                    <select id="subject" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none text-gray-700 transition bg-gray-50 focus:bg-white">
                                        <option>General Inquiry</option>
                                        <option>Book Eye Exam</option>
                                        <option>Order Status</option>
                                        <option>Frame Repair</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Message</label>
                                    <textarea id="message" rows={5} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition bg-gray-50 focus:bg-white" placeholder="How can we help?"></textarea>
                                </div>
                                <button type="submit" className="w-full bg-black text-white py-4 rounded-lg font-bold hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </SectionReveal>
                </div>
            </div>
        </section>
    )
}
