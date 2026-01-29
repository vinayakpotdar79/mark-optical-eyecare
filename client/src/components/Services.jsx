import { motion } from 'framer-motion'
import { ScanEye, Glasses, Accessibility, Wrench } from 'lucide-react'
import SectionReveal from './SectionReveal'

const services = [
    {
        icon: <ScanEye className="w-10 h-10 text-white" />,
        title: "Computerized Eye Testing",
        description: "Experience precision with our state-of-the-art computerized eye testing equipment. Our optometrists ensure accurate prescriptions for your perfect vision."
    },
    {
        icon: <Accessibility className="w-10 h-10 text-white" />,
        title: "Contact Lens Clinic",
        description: "New to contact lenses? We provide comprehensive fitting sessions, teaching you how to insert, remove, and care for your lenses safely."
    },
    {
        icon: <Glasses className="w-10 h-10 text-white" />,
        title: "Premium Frame Styling",
        description: "Not sure what suits you? Our styling experts analyze your face shape and personal style to recommend frames that enhance your personality."
    },
    {
        icon: <Wrench className="w-10 h-10 text-white" />,
        title: "Repair & Adjustments",
        description: "Loose screws? Bent frames? Visit us for quick repairs, ultrasonic cleaning, and nose-pad replacements to keep your eyewear like new."
    }
]

export default function Services() {
    return (
        <section id="services" className="py-24 bg-zinc-50 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionReveal>
                    <div className="text-center mb-16">
                        <span className="text-indigo-600 font-bold tracking-wider uppercase text-sm mb-2 block">Our Expertise</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Premium Eye Care Services</h2>
                        <div className="w-24 h-1 bg-black mx-auto rounded-full"></div>
                        <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
                            Beyond standard vision correction, we provide comprehensive eye health solutions using the latest diagnostic technology.
                        </p>
                    </div>
                </SectionReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {services.map((service, index) => (
                        <SectionReveal key={index} delay={index * 0.1}>
                            <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500 z-0"></div>

                                <div className="relative z-10 flex flex-col sm:flex-row items-start gap-8">
                                    <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-indigo-600 transition-all duration-300 flex-shrink-0">
                                        {service.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">{service.title}</h3>
                                        <p className="text-gray-600 leading-relaxed text-lg">
                                            {service.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </SectionReveal>
                    ))}
                </div>
            </div>
        </section>
    )
}
