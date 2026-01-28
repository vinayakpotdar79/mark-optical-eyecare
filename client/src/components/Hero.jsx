import { motion as M1 } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50" /> {/* Overlay */}
      </div>

      <div className="relative z-10 text-center px-4 max-w-7xl mx-auto w-full">
        <M1.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          See the World Clearly
        </M1.h1>

        <M1.p
          className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto font-light"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Premium eyewear for the modern visionary.{" "}
          <br className="hidden md:block" />
          Experience comfort, style, and precision with Mark Optical Co.
        </M1.p>

        <M1.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#shop"
            className="inline-block bg-white text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
          >
            Shop Collection
          </a>
          <a
            href="#contact"
            className="inline-block bg-transparent border-2 border-white text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all duration-300"
          >
            Book Eye Test
          </a>
        </M1.div>
      </div>
    </section>
  );
}
