const employees = [
  {
    name: "Mahafujul Haque",
    designation: "Jr. Full Stack Developer",
    age: "24",
    url: "/passport_photo.jpg",
    bio: "A passionate developer, keen on learning new technologies and building scalable web applications.",
  },
  {
    name: "Aarav Sharma",
    designation: "Jr. Full Stack Developer",
    age: "24",
    url: "/passport_photo_male.jpg",
    bio: "Enthusiastic about creating user-friendly web applications with strong attention to detail and performance.",
  },
  {
    name: "Vihaan Patel",
    designation: "Software Engineer",
    age: "28",
    url: "/passport_photo_male.jpg",
    bio: "Experienced in building robust backend systems and optimizing application performance for better user experiences.",
  },
  {
    name: "Isha Rao",
    designation: "Frontend Developer",
    age: "26",
    url: "/passport_photo_female.jpg",
    bio: "Specializes in creating responsive interfaces with a focus on delivering smooth user experiences.",
  },
  {
    name: "Rohan Verma",
    designation: "Backend Developer",
    age: "30",
    url: "/passport_photo_male.jpg",
    bio: "Focused on building efficient backend services with a strong emphasis on security and scalability.",
  },
  {
    name: "Aditi Nair",
    designation: "DevOps Engineer",
    age: "29",
    url: "/passport_photo_female.jpg",
    bio: "Skilled in automation and continuous integration, ensuring smooth development workflows and deployments.",
  },
  {
    name: "Krish Iyer",
    designation: "QA Engineer",
    age: "23",
    url: "/passport_photo_male.jpg",
    bio: "Dedicated to improving software quality through comprehensive testing and bug detection practices.",
  },
  {
    name: "Meera Singh",
    designation: "UI/UX Designer",
    age: "27",
    url: "/passport_photo_female.jpg",
    bio: "Designs engaging interfaces with a focus on user experience and modern visual trends.",
  },
  {
    name: "Kabir Joshi",
    designation: "Cloud Engineer",
    age: "31",
    url: "/passport_photo_male.jpg",
    bio: "Expert in cloud infrastructure, ensuring scalable, secure, and cost-effective solutions for businesses.",
  },
  {
    name: "Tanvi Kulkarni",
    designation: "Mobile App Developer",
    age: "25",
    url: "/passport_photo_female.jpg",
    bio: "Passionate about building high-quality mobile apps that provide seamless user experiences.",
  },
  {
    name: "Arjun Reddy",
    designation: "Data Scientist",
    age: "32",
    url: "/passport_photo_male.jpg",
    bio: "Experienced in data analysis and predictive modeling to drive data-driven business decisions.",
  },
  {
    name: "Saanvi Chatterjee",
    designation: "Product Manager",
    age: "34",
    url: "/passport_photo_female.jpg",
    bio: "Strategic thinker, leading product development from ideation to launch with a user-first approach.",
  },
  {
    name: "Rishi Das",
    designation: "Tech Lead",
    age: "36",
    url: "/passport_photo_male.jpg",
    bio: "Leads technical teams, ensuring efficient development processes and delivery of quality software.",
  },
  {
    name: "Ananya Kapoor",
    designation: "Machine Learning Engineer",
    age: "28",
    url: "/passport_photo_female.jpg",
    bio: "Focuses on developing ML models to solve real-world problems and optimize business operations.",
  },
  {
    name: "Devansh Gupta",
    designation: "Junior Software Engineer",
    age: "24",
    url: "/passport_photo_male.jpg",
    bio: "Learns rapidly, eager to contribute to team success by writing clean and efficient code.",
  },
  {
    name: "Priya Bhatt",
    designation: "Jr. Full Stack Developer",
    age: "22",
    url: "/passport_photo_female.jpg",
    bio: "Enjoys solving complex problems and delivering user-friendly web applications.",
  },
  {
    name: "Aditya Malhotra",
    designation: "IT Support Specialist",
    age: "27",
    url: "/passport_photo_male.jpg",
    bio: "Provides technical support and troubleshooting for software and hardware issues.",
  },
  {
    name: "Siddharth Mehta",
    designation: "Security Engineer",
    age: "35",
    url: "/passport_photo_male.jpg",
    bio: "Protects company assets by implementing security measures and monitoring potential threats.",
  },
  {
    name: "Lakshmi Rangan",
    designation: "Site Reliability Engineer",
    age: "29",
    url: "/passport_photo_female.jpg",
    bio: "Optimizes system performance and uptime, ensuring reliable and scalable services.",
  },
  {
    name: "Nitin Agrawal",
    designation: "Junior Database Administrator",
    age: "26",
    url: "/passport_photo_male.jpg",
    bio: "Manages database performance and performs regular maintenance for optimal efficiency.",
  },
  {
    name: "Pooja Desai",
    designation: "Jr. Full Stack Developer",
    age: "24",
    url: "/passport_photo_female.jpg",
    bio: "Builds interactive web applications with a passion for learning new technologies.",
  },
  {
    name: "Aakash Srivastava",
    designation: "Technical Support Engineer",
    age: "30",
    url: "/passport_photo_male.jpg",
    bio: "Solves technical issues efficiently, ensuring minimal downtime and smooth operations.",
  },
  {
    name: "Sneha Shetty",
    designation: "Junior DevOps Engineer",
    age: "23",
    url: "/passport_photo_female.jpg",
    bio: "Automates development pipelines and supports continuous integration practices.",
  },
  {
    name: "Raghav Bansal",
    designation: "Software Intern",
    age: "22",
    url: "/passport_photo_male.jpg",
    bio: "Motivated intern eager to gain hands-on experience in software development.",
  },
  {
    name: "Tara Menon",
    designation: "Jr. Full Stack Developer",
    age: "25",
    url: "/passport_photo_female.jpg",
    bio: "Develops full-stack solutions with a keen eye for detail and quality.",
  },
  {
    name: "Aniket Bose",
    designation: "Frontend Intern",
    age: "24",
    url: "/passport_photo_male.jpg",
    bio: "Learning frontend technologies to build interactive and modern web applications.",
  },
  {
    name: "Varun Jain",
    designation: "Backend Developer",
    age: "28",
    url: "/passport_photo_male.jpg",
    bio: "Specializes in server-side development, focusing on performance and reliability.",
  },
];

export default function clickHandler() {
  employees.map(async (employee) => {
    try {
      const res = await fetch(
        "http://localhost:8080/api/employee-controller/add",
        {
          //http://localhost:3000/create-employee
          method: "POST",
          body: JSON.stringify({
            name: employee.name,
            designation: employee.designation,
            age: employee.age,
            url: employee.url,
            bio: employee.bio,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  });
}
