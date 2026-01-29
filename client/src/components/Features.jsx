import { motion } from "framer-motion";
import { Eye, ShieldCheck, Award } from "lucide-react";
import SectionReveal from "./SectionReveal";

const features = [
  {
    icon: <Eye className="w-8 h-8 text-white" />,
    title: "Our Vision",
    description:
      "Eyecare is our motive, spectacle dispensing is our passion. We believe in delivering the best products at the best prices.",
  },
  {
    icon: <Award className="w-8 h-8 text-white" />,
    title: "Our Mission",
    description:
      "We have gained a trust tag from our customers and aim to grow further on this trust, creating the best customer experience.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-white" />,
    title: "Quality Guarantee",
    description:
      "We guarantee 100% customer satisfaction. We are quality driven and ensure every spectacle delivered is quality checked.",
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-neutral-950 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl mix-blend-screen"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl mix-blend-screen"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Why Choose Us
            </h2>
            <div className="w-24 h-1 bg-indigo-500 mx-auto rounded-full"></div>
            <p className="mt-6 text-xl text-gray-400 max-w-2xl mx-auto">
              We combine decades of expertise with cutting-edge technology to deliver the best vision care.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <SectionReveal key={index} delay={index * 0.1}>
              <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-indigo-500/50 hover:bg-white/10 transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-indigo-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                  {feature.description}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
