import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import BlogImg1 from "../../assets/blogimg1.png";
import BlogImg2 from "../../assets/blogimg2.png";
import BlogImg3 from "../../assets/blogimg3.png";
import BlogImg4 from "../../assets/blogimg4.png";
import { useTheme } from "../../context/ThemeContext";
import Scroll from "../scroll/RightScroll";

const blogPosts = [
  {
    title: "MERN Stack Development: The Key to Scalable Web Apps",
    date: "12 Feb 2025",
    image: BlogImg1,
    content:
      "The MERN stack—MongoDB, Express.js, React.js, and Node.js—has revolutionized full-stack web development, allowing developers to build high-performing applications with a seamless workflow . " +
      "\n\n" +
      "React provides a dynamic and interactive front-end experience, while Node.js and Express.js handle server-side operations efficiently. MongoDB, a NoSQL database, offers flexibility in data storage, making it ideal for modern applications." +
      "\n\n" +
      "Developers leveraging the MERN stack benefit from full JavaScript compatibility, reducing complexity in development. With Redux for state management and API integrations, apps become more powerful and user-friendly. Cloud hosting solutions like AWS and Vercel further enhance scalability." +
      "\n\n" +
      "By mastering MERN, developers can create everything from small-scale applications to enterprise-level solutions. Its adaptability and open-source community support make it a go-to choice for web development.",
  },
  {
    title: "DevOps: Automating and Accelerating Software Delivery",
    date: "12 Feb 2025",
    image: BlogImg2,
    content:
      "DevOps bridges the gap between development and operations, making software delivery faster and more reliable. It emphasizes automation, continuous integration, and efficient deployment pipelines." +
      "\n\n" +
      "With tools like Jenkins and GitHub Actions, developers can automate testing and deployments, reducing errors and improving efficiency. Docker and Kubernetes simplify containerization, ensuring applications run consistently across different environments." +
      "\n\n" +
      "Infrastructure as Code (IaC) tools like Terraform enable teams to manage cloud resources efficiently, while monitoring tools like Prometheus and Grafana provide real-time system insights." +
      "\n\n" +
      "By adopting DevOps, businesses can reduce downtime, enhance collaboration, and optimize workflows. It's no longer just a methodology—it's an essential approach to modern software development.",
  },
  {
    title: "Digital Marketing in 2025: The Age of AI and Automation",
    date: "12 Feb 2025",
    image: BlogImg3,
    content:
      "The digital marketing landscape is evolving rapidly, with AI-driven tools redefining engagement strategies. Automation, data analytics, and personalization are now key components of successful campaigns." +
      "\n\n" +
      "AI-powered chatbots and automated email marketing tools like Mailchimp and HubSpot are transforming customer interactions. Social media platforms leverage machine learning for precise audience targeting, ensuring higher engagement rates." +
      "\n\n" +
      "SEO remains essential, but modern optimization focuses on user intent, voice search, and AI-generated content. Google's algorithms prioritize high-quality, informative content, making content marketing more valuable than ever.",
  },
  {
    title: "AWS: The Future of Cloud Computing",
    date: "12 Feb 2025",
    image: BlogImg4,
    content:
      "Amazon Web Services (AWS) offers a robust cloud computing platform that enables businesses to scale effortlessly. With services like EC2 for computing, S3 for storage, and Lambda for serverless computing, AWS provides a comprehensive solution for developers." +
      "\n\n" +
      "One of AWS's greatest strengths is its flexibility—developers can choose from various database options like DynamoDB, RDS, or Aurora, depending on application needs. AWS CloudFront ensures fast content delivery, while Route 53 simplifies domain management." +
      "\n\n" +
      "Security is another crucial aspect, with AWS offering IAM for access control and security groups to protect infrastructure. The ability to automate deployments using AWS CDK or CloudFormation makes resource management easier and more efficient." +
      "\n\n" +
      "AWS continues to evolve, integrating AI, machine learning, and serverless technologies, making it a preferred choice for scalable cloud solutions.",
  },
];

const Blog = () => {
  const [expandedPosts, setExpandedPosts] = useState({});
  const { isDarkMode } = useTheme();

  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: false });
  }, []);

  const toggleReadMore = (index) => {
    setExpandedPosts((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <section className="min-h-screen py-10 overflow-x-hidden md:overflow-x-visible">
      <div className="px-4">
        <h2
          className={`text-4xl md:text-5xl text-center font-medium mb-10 ${
            isDarkMode ? "text-[#E3D5A7]" : "text-[#14213D]"
          }`}
          style={{ fontFamily: "Inria Sans" }}
          data-aos="fade-right"
        >
          My Blogs
        </h2>

        <h2
          className={`text-justify md:text-2xl lg:text-3xl md:font-medium max-w-7xl mx-auto mb-14 ${
            isDarkMode ? "text-[#E3D5A7]" : "text-[#14213D]"
          }`}
          style={{ fontFamily: "Inria Sans" }}
        >
          Explore insightful articles covering the latest in technology,
          development practices, and industry trends. Each post offers valuable
          perspectives and practical knowledge to help you stay ahead in the
          ever-evolving tech landscape.
        </h2>

        <div className="grid grid-cols-1 gap-10 lg:mx-20">
          {blogPosts.map((post, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-start p-6 border rounded-2xl ${
                isDarkMode
                  ? "border-[#e9e1b4] bg-[#FFFFFF15]"
                  : "border-[#14213d] bg-[#f7f7f7]"
              }`}
              data-aos={index % 2 === 0 ? "fade-left" : "fade-right"}
            >
              <div className="flex-1 pr-6">
                <h3
                  className={`text-2xl md:text-3xl ${
                    isDarkMode ? "text-[#E3D5A7]" : "text-[#14213d]"
                  } font-medium mb-3`}
                  style={{ fontFamily: "Inria Sans" }}
                >
                  {post.title}
                </h3>
                <p
                  className={`text-sm md:text-base ${
                    isDarkMode ? "text-white" : "text-[#14213d]"
                  } mb-4`}
                  style={{ fontFamily: "Inria Sans" }}
                >
                  {post.date}
                </p>
                <div
                  className={`${
                    isDarkMode ? "text-white" : "text-[#14213d]"
                  } text-base md:text-lg leading-relaxed`}
                  style={{ fontFamily: "Inria Sans" }}
                >
                  {expandedPosts[index]
                    ? post.content.split("\n\n").map((para, i) => (
                        <p key={i} className="mb-4">
                          {para}
                        </p>
                      ))
                    : post.content.split(" ").slice(0, 50).join(" ") + "..."}
                </div>
                <button
                  onClick={() => toggleReadMore(index)}
                  className={`${
                    isDarkMode ? "text-[#e9e1b4]" : "text-[#14213d]"
                  } mt-4 text-sm md:text-base font-medium hover:opacity-80 transition-opacity`}
                >
                  {expandedPosts[index] ? "SHOW LESS" : "READ MORE →"}
                </button>
              </div>
              <img
                src={post.image}
                alt={post.title}
                className="w-full md:w-48 h-48 object-cover rounded-lg mt-4 md:mt-0"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10">
        <Scroll />
      </div>
    </section>
  );
};

export default Blog;
