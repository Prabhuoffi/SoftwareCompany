import React from "react";
import {
  FaLaptopCode,
  FaLightbulb,
  FaUsers,
  FaHandshake,
} from "react-icons/fa";
import { motion } from "framer-motion";

// Reusable Component for Sections
const Section = ({ children, className }) => (
  <section className={`py-16 px-8 md:px-24 ${className}`}>
    {children}
  </section>
);

// Reusable Component for Content Blocks
const ContentBlock = ({ Icon, title, description, initial, animate, transition }) => (
  <motion.div
    className="text-center mb-8 md:mb-0"
    initial={initial}
    animate={animate}
    transition={transition}
  >
    {Icon && <Icon className=" text-purple-400  text-5xl mb-4 mx-auto" />}
    <h3 className="text-2xl font-semibold mb-2">{title}</h3>
    <p className="text-lg">{description}</p>
  </motion.div>
);

// Reusable Component for Team Members
const TeamMember = ({ image, name, position }) => (
  <motion.div
    className="text-center mb-8 md:mb-0"
    whileHover={{ scale: 1.05, rotate: 2 }}
    transition={{ duration: 0.3 }}
  >
    <img
      src={image}
      alt={`${name} - ${position}`}
      className="w-36 h-36 rounded-full mx-auto mb-4 object-cover shadow-lg"
      loading="lazy"
    />
    <h3 className="text-2xl font-semibold">{name}</h3>
    <p className="text-lg">{position}</p>
  </motion.div>
);

const AboutUs = () => {
  // Data Arrays for Services, Team, and Values
  const services = [
    {
      icon: FaLaptopCode,
      title: "Web Development",
      description: "Building responsive and robust websites tailored to your business needs.",
    },
    {
      icon: FaLightbulb,
      title: "Innovation",
      description: "Implementing the latest technologies to drive your business forward.",
    },
    {
      icon: FaUsers,
      title: "Teamwork",
      description: "Collaborating closely with clients to achieve shared goals.",
    },
  ];

  const teamMembers = [
    {
      image: "https://www.passionned.com/wp/wp-content/uploads/it-manager-1024x682.png",
      name: "Jane Doe",
      position: "Chief Executive Officer",
    },
    {
      image: "https://th.bing.com/th/id/OIP.k3rrY7eKqLxuGovPkgrOPwHaE8?w=1409&h=941&rs=1&pid=ImgDetMain",
      name: "John Smith",
      position: "Lead Developer",
    },
    {
      image: "https://th.bing.com/th/id/OIP.Y3omkDARuaMKyb7nT8LohQHaF7?w=750&h=600&rs=1&pid=ImgDetMain",
      name: "Emily Johnson",
      position: "Project Manager",
    },
  ];

  const values = [
    {
      icon: FaHandshake,
      title: "Integrity",
      description: "Upholding honesty and strong moral principles in all our actions.",
      delay: 0,
    },
    {
      icon: FaLightbulb,
      title: "Innovation",
      description: "Continuously seeking creative solutions to meet evolving challenges.",
      delay: 0.5,
    },
    {
      icon: FaUsers,
      title: "Collaboration",
      description: "Fostering a collaborative environment to achieve shared success.",
      delay: 1,
    },
  ];

  return (
    <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-purple-100 text-black font-sans">
      {/* Header Section */}
      <header className="text-black py-32 text-center">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-6"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          About Our Company
        </motion.h1>
        <motion.p
          className="text-xl max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Delivering innovative solutions to empower businesses worldwide.
        </motion.p>
      </header>

      {/* Our Vision & Mission */}
      <Section>
        <div className="md:flex justify-between items-center">
          {/* Our Vision */}
          <motion.div
            className="md:w-1/2 mb-8 md:mb-0"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-3xl font-semibold mb-4 flex items-center">
              <FaLightbulb className="text-purple-400  mr-2" /> Our Vision
            </h2>
            <p className="text-lg">
              To be a global leader in providing cutting-edge technology solutions that drive success and innovation for our clients.
            </p>
          </motion.div>

          {/* Our Mission */}
          <motion.div
            className="md:w-1/2"
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-3xl font-semibold mb-4 flex items-center">
              <FaHandshake className="text-purple-400  mr-2" /> Our Mission
            </h2>
            <p className="text-lg">
              To deliver high-quality, scalable, and efficient solutions that meet the unique needs of our clients, fostering long-term partnerships and mutual growth.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Our Services */}
      <Section className="bg-purple-200">
        <h2 className="text-3xl font-semibold  text-center mb-12">Our Services</h2>
        <div className="md:flex justify-around">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="text-center mb-8 md:mb-0 w-full md:w-1/3 px-4"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <service.icon className="text-purple-400  text-5xl mb-4 mx-auto" />
              <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
              <p className="text-lg">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Our Team */}
      <Section>
        <h2 className="text-3xl font-semibold text-center mb-12">Meet Our Team</h2>
        <div className="md:flex justify-around">
          {teamMembers.map((member, index) => (
            <TeamMember
              key={index}
              image={member.image}
              name={member.name}
              position={member.position}
            />
          ))}
        </div>
      </Section>

      {/* Our Values */}
      <Section className="bg-purple-200">
        <h2 className="text-3xl font-semibold  text-center mb-12">Our Values</h2>
        <div className="md:flex justify-around">
          {values.map((value, index) => (
            <ContentBlock
              key={index}
              Icon={value.icon}
              title={value.title}
              description={value.description}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: value.delay }}
            />
          ))}
        </div>
      </Section>
    </div>
  );
};

export default AboutUs;
