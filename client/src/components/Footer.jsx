import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-gray-900 border-t border-gray-800 text-gray-400 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2 space-y-4">
                        <h3 className="text-white text-2xl font-bold tracking-wider">MARK OPTICAL</h3>
                        <p className="max-w-md text-gray-400 leading-relaxed">
                            Providing the best eye care in India since 2000.
                            Latest trends in frames, lenses, and sunglasses with expert dispensing.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-white transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white text-md font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-white transition">Home</a></li>
                            <li><a href="#shop" className="hover:text-white transition">Shop Collection</a></li>
                            <li><a href="#about" className="hover:text-white transition">About Us</a></li>
                            <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white text-md font-semibold mb-4">Contact Us</h4>
                        <ul className="space-y-2">
                            <li className="flex items-start">
                                <MapPin size={18} className="mr-2 mt-1 flex-shrink-0" />
                                <span>Lower Parel & Lal Baug, Mumbai</span>
                            </li>
                            <li className="flex items-center">
                                <Phone size={18} className="mr-2" />
                                <span>+91 96199 27279</span>
                            </li>
                            <li className="flex items-center">
                                <Mail size={18} className="mr-2" />
                                <span>markopticalco@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
                    <p>&copy; {new Date().getFullYear()} Mark Optical Co. All rights reserved.</p>
                    <p className="mt-2 md:mt-0">Designed with precision.</p>
                </div>
            </div>
        </footer>
    )
}
