import { motion } from 'framer-motion'
import { Eye, ShieldCheck, Award } from 'lucide-react'
import SectionReveal from './SectionReveal'

const features = [
    {
        icon: <Eye className="w-8 h-8 text-white" />,
        title: "Our Vision",
        description: "Eyecare is our motive, spectacle dispensing is our passion. We believe in delivering the best products at the best prices."
    },
    {
        icon: <Award className="w-8 h-8 text-white" />,
        title: "Our Mission",
        description: "We have gained a trust tag from our customers and aim to grow further on this trust, creating the best customer experience."
    },
    {
        icon: <ShieldCheck className="w-8 h-8 text-white" />,
        title: "Quality Guarantee",
        description: "We guarantee 100% customer satisfaction. We are quality driven and ensure every spectacle delivered is quality checked."
    }
]

export default function Features() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionReveal>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Why Choose Us</h2>
                        <div className="w-24 h-1 bg-black mx-auto rounded-full"></div>
                    </div>
                </SectionReveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {features.map((feature, index) => (
                        <SectionReveal key={index} delay={index * 0.1}>
                            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                                <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </SectionReveal>
                    ))}
                </div>
            </div>
        </section>
    )
}
