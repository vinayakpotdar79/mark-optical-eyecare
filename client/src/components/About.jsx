import { motion } from 'framer-motion'
import SectionReveal from './SectionReveal'

export default function About() {
    return (
        <section id="about" className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <SectionReveal>
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-gray-100 rounded-2xl transform rotate-3 transition-transform group-hover:rotate-2"></div>
                            <img
                                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80"
                                alt="Optical Store Interior"
                                className="relative rounded-lg shadow-xl w-full object-cover h-[500px]"
                            />
                        </div>
                    </SectionReveal>

                    <div className="space-y-8">
                        <SectionReveal delay={0.2}>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">About Mark Optical Co.</h2>
                            <div className="w-20 h-1 bg-black rounded-full mt-4"></div>
                        </SectionReveal>

                        <SectionReveal delay={0.3}>
                            <p className="text-xl text-gray-600 leading-relaxed">
                                Founded in 2000 in Mumbai, Mark Optical Co. has grown to become a trusted name in eye care.
                                With over 18 years of experience, we pride ourselves on blending scientific precision with
                                modern fashion.
                            </p>
                        </SectionReveal>

                        <SectionReveal delay={0.4}>
                            <p className="text-lg text-gray-500 leading-relaxed">
                                Our mission is simple: to provide the best eye care solutions tailored to your unique needs.
                                Whether it's precision testing, finding the perfect frame, or repairing your favorite pair,
                                we treat every customer like family.
                            </p>
                        </SectionReveal>

                        <SectionReveal delay={0.5}>
                            <div className="grid grid-cols-2 gap-8 pt-4">
                                <div className="text-center p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                                    <span className="block text-4xl font-bold text-black mb-1">18+</span>
                                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Years Experience</span>
                                </div>
                                <div className="text-center p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                                    <span className="block text-4xl font-bold text-black mb-1">90k+</span>
                                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Happy Customers</span>
                                </div>
                            </div>
                        </SectionReveal>
                    </div>
                </div>
            </div>
        </section>
    )
}
