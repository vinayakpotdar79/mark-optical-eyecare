import SectionReveal from './SectionReveal'
import { Star } from 'lucide-react'

const testimonials = [
    {
        name: "Dhanashree Pednekar",
        role: "Loyal Customer",
        content: "Amazing and exceptional service from Mark Opticals always! I have been ordering spectacles and contact lenses from them for over 15 years now. They always have the latest styles and frames.",
        rating: 5
    },
    {
        name: "Sagar Shah",
        role: "Customer",
        content: "Very quick service. It was an absolute delight to see the new year with my new glasses. Mr. Ansh is a very kind and friendly gentleman. His guidance has been very helpful.",
        rating: 5
    },
    {
        name: "Vaishnavi Ghatge",
        role: "Customer",
        content: "Extremely happy with Mark Optical Co. I am an old customer; past 8 years I am purchasing Glasses/Sunglasses almost for my whole family members from this place. They are like family.",
        rating: 5
    }
]

export default function Testimonials() {
    return (
        <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <SectionReveal>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">What Our Customers Say</h2>
                        <div className="w-24 h-1 bg-white mx-auto rounded-full opacity-50"></div>
                    </div>
                </SectionReveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <SectionReveal key={index} delay={index * 0.1}>
                            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/10 hover:bg-white/20 transition-colors">
                                <div className="flex mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} size={18} className="text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <p className="text-gray-300 mb-6 leading-relaxed italic">"{testimonial.content}"</p>
                                <div>
                                    <h4 className="font-bold text-lg">{testimonial.name}</h4>
                                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                                </div>
                            </div>
                        </SectionReveal>
                    ))}
                </div>
            </div>
        </section>
    )
}
