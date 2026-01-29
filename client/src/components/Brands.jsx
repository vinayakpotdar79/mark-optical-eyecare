import { motion } from "framer-motion";

const brands = [
    "Ray-Ban",
    "Oakley",
    "Gucci",
    "Prada",
    "Versace",
    "Tom Ford",
    "Persol",
    "Burberry",
    "Carrera",
    "Vogue",
    "Maui Jim",
    "Police",
    "Armani Exchange",
    "Fossil",
    "Titan",
];

export default function Brands() {
    return (
        <section className="py-10 bg-black text-white border-y border-white/10 overflow-hidden">
            <div className="flex gap-16 items-center">
                <motion.div
                    className="flex gap-16 items-center flex-shrink-0"
                    animate={{ x: "-100%" }}
                    transition={{
                        duration: 30, // Adjust speed
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    {[...brands, ...brands, ...brands].map((brand, index) => (
                        <span
                            key={index}
                            className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-transparent stroke-text opacity-50 hover:opacity-100 transition-opacity cursor-default whitespace-nowrap"
                            style={{ WebkitTextStroke: "1px white" }}
                        >
                            {brand}
                        </span>
                    ))}
                </motion.div>

                {/* Duplicate for seamless loop */}
                <motion.div
                    className="flex gap-16 items-center flex-shrink-0"
                    animate={{ x: "-100%" }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    {[...brands, ...brands, ...brands].map((brand, index) => (
                        <span
                            key={`dup-${index}`}
                            className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-transparent stroke-text opacity-50 hover:opacity-100 transition-opacity cursor-default whitespace-nowrap"
                            style={{ WebkitTextStroke: "1px white" }}
                        >
                            {brand}
                        </span>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
