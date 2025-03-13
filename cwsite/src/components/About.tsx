import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Define the type for div elements with motion props
type MotionDivProps = React.ComponentProps<typeof motion.div>;

const About = () => {
  return (
    <section id="about" className="py-20 px-4 md:px-8 bg-gradient-to-b from-almost-black to-dark-grey">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">What is Crypto Waffle?</h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Crypto Waffle is a <span className="text-teal font-medium">weekly Instagram live show</span> where 
            <span className="text-yellow font-medium"> finance meets crypto technology</span>. Each 
            <span className="text-teal font-medium"> one-hour</span> episode is packed with expert insights, 
            real-time analysis, and entertaining discussions on all things crypto.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="section-subtitle">Why Join Crypto Waffle?</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-yellow text-xl mr-3">✔️</span>
                <div>
                  <span className="font-medium text-teal">Stay Ahead</span> – Get real-time insights on the 
                  latest crypto trends and market movements
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-yellow text-xl mr-3">✔️</span>
                <div>
                  <span className="font-medium text-teal">Learn & Earn</span> – Discover strategies to make 
                  money in crypto and understand blockchain tech
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-yellow text-xl mr-3">✔️</span>
                <div>
                  <span className="font-medium text-teal">Engage in Real-Time</span> – Ask your burning 
                  questions and interact directly with our experts
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-yellow text-xl mr-3">✔️</span>
                <div>
                  <span className="font-medium text-teal">Laugh & Learn</span> – Enjoy incredible stories from 
                  crypto veterans that make the complex world of crypto fun
                </div>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-md aspect-video rounded-lg overflow-hidden shadow-xl">
              <Image 
                src="/images/Crypto Waffle Template(2).png"
                alt="Crypto Waffle Show"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About; 