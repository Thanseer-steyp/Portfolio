import {
  logo,
  backend,
  creator,
  mobile,
  web,
  github,
  gitlab,
  menu,
  close,
  python,
  postgresql,
  css,
  gearXpert,
  project2,
  project3,
  mysql,
  express,
  aws,
  mui,
  gsap,
  framer,
  figma,
  git,
  html,
  javascript,
  mongodb,
  nodejs,
  reactjs,
  redux,
  tailwind,
  threejs,
  firstTestimonial,
  secondTestimonial,
  thirdTestimonial,
  nextjs,
  django,
} from "../assets";

// Import Tekisky separately
import tekisky from "../assets/company/tekisky.png";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Full-Stack Developer",
    icon: web,
  },
  {
    title: "Frontend Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Ui UX Designer",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },

  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "nextjs",
    icon: nextjs,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "python",
    icon: python,
  },
  ,
  {
    name: "django",
    icon: django,
  },
  {
    name: "Postgresql",
    icon: postgresql,
  },

  {
    name: "git",
    icon: git,
  },
  {
    name: "github",
    icon: github,
  },
  {
    name: "gitlab",
    icon: gitlab,
  },
];

const experiences = [
  {
    title: "Full-Stack Developer",
    company_name: "Talrop",
    icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/01-09-2022/Talrop_logo.svg",
    iconBg: "#fff",
    date: "June 2025 - present",
    points: [
      "Developing scalable backend systems using Python, Django, and Django REST Framework.",
      "Creating and integrating REST APIs consumed by React-based frontend applications.",
      "Optimizing database queries and ensuring application performance and security.",
      "Implementing responsive and interactive UIs using React and modern JavaScript practices.",
      "Participating in code reviews and maintaining clean, maintainable codebases.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "Didn't think a website could match our product's beauty, but Thanseer made it happen!",
    name: "MD Mustaqeem",
    designation: "Ecommerce",
    company: "QuickMart",
    image: firstTestimonial,
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Thanseer does.",
    name: "Sameer Panavoor",
    designation: "Writer",
    company: "Mondana Universe",
    image: secondTestimonial,
  },
  {
    testimonial:
      "After Thanseer optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Sinan",
    designation: "Student",
    company: "456 Enterprises",
    image: thirdTestimonial,
  },
];
const projects = [
  {
    name: "She  Has",
    description:
      "She is a premium kids clothing brand offering stylish, comfortable, and durable apparel made from high-quality imported materials. The platform provides a smooth shopping experience with modern design, secure checkout, and scalable performance tailored for growing brands.",
    tags: [
      {
        name: "python",
        color: "blue-text-gradient",
      },
      {
        name: "django",
        color: "green-text-gradient",
      },
      {
        name: "react",
        color: "pink-text-gradient",
      },
      {
        name: "nextjs",
        color: "white-text-gradient",
      },
    ],
    image: project2,
    source_code_link: "https://github.com/",
  },
  {
    name: "Furnicon",
    description:
      "Furnicon is a modern furniture e-commerce platform offering a wide range of high-quality furniture at budget-friendly prices. The website is designed for performance and usability, allowing customers to explore, compare, and purchase furniture effortlessly and securely online.",
    tags: [
      {
        name: "python",
        color: "blue-text-gradient",
      },
      {
        name: "django",
        color: "green-text-gradient",
      },
      {
        name: "react",
        color: "pink-text-gradient",
      },
      {
        name: "nextjs",
        color: "white-text-gradient",
      },
    ],
    image: project3,
    source_code_link: "https://github.com/",
  },
];

export { services, technologies, experiences, testimonials, projects };
