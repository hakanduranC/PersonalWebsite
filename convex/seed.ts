import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const seedData = mutation({
  args: { force: v.optional(v.boolean()) },
  handler: async (ctx, args) => {
    // Check if data already exists
    const existingContent = await ctx.db.query("content").first();
    if (existingContent && !args.force) {
      return { message: "Data already seeded. Use force=true to re-seed." };
    }

    // If forcing, clear existing content
    if (args.force) {
      const allContent = await ctx.db.query("content").collect();
      for (const item of allContent) {
        await ctx.db.delete(item._id);
      }
    }

    // Seed Education Data
    const educationData = [
      {
        section: "education" as const,
        title: "Technical University of Munich",
        subtitle: "Master of Science in Computer Science",
        period: "2022 – Present",
        content: "",
        metadata: {
          location: "Munich, Germany",
          logoUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tum-logo-Ur1AylbzkA5M7dRnaW7j6Q6Yp3FJL5.png"
        },
        order: 0,
        published: true
      },
      {
        section: "education" as const,
        title: "Atilim University",
        subtitle: "Bachelor of Science in Computer Engineering",
        period: "2016 – 2021",
        content: "GPA: 3.68/4.00 (Top of the Department)",
        metadata: {
          location: "Ankara, Turkey",
          logoUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/atilim-universitesi-logo-en-lnTPHhTj8df0W1vYj6XJShCKkSTCDN.svg"
        },
        order: 1,
        published: true
      },
      {
        section: "education" as const,
        title: "Poznan University of Technology",
        subtitle: "Exchange student (Erasmus+) in Computer Science",
        period: "2019 – 2020",
        content: "",
        metadata: {
          location: "Poznan, Poland",
          logoUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/poznan-university-of-technology-oGuUPBTe1uFgJcniy8UDNl1aEtmXXB.png"
        },
        order: 2,
        published: true
      }
    ];

    // Seed Experience Data
    const experienceData = [
      {
        section: "experience" as const,
        title: "Everstox GmbH",
        subtitle: "IT & Media Working Student",
        period: "May 2024 – Present",
        content: `- Responsible for office IT infrastructure, including hardware management, network troubleshooting, and software deployments.
- Managed Microsoft Intune for device enrollment, compliance policies, and security configurations.
- Developed and maintained AWS Lambda functions for automation tasks and system integrations.
- Handled AWS secret key management, ensuring secure storage and controlled access.
- Worked with Terraform to provision and manage cloud resources efficiently.
- Provided technical support for employees, troubleshooting software and hardware issues.
- Assisted in IT asset tracking, procurement, and documentation.`,
        metadata: {
          location: "Munich, Germany",
          logoUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/everstox2-SBlviJdAdil5FWxEzfPJtUnnPmKbHA.png"
        },
        order: 0,
        published: true
      },
      {
        section: "experience" as const,
        title: "Technical University Of Munich",
        subtitle: "Full Stack Web Developer - Hiwi Assistant",
        period: "November 2022 – March 2024",
        content: `- Participated in TUM's CommonRoad project, focusing on web application development and maintenance.
- Implemented a Docker-driven, master-worker architecture for handling academic and competition submissions.
- Applied React and Material UI for front-end development; Django and PostgreSQL for back-end.
- Managed full spectrum of front-end, back-end, and DevOps tasks.
- Played a key role in establishing the submission system infrastructure for the ARCH project, applying innovative tech solutions.`,
        metadata: {
          location: "Munich, Germany",
          logoUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tum-logo-Ur1AylbzkA5M7dRnaW7j6Q6Yp3FJL5.png"
        },
        order: 1,
        published: true
      },
      {
        section: "experience" as const,
        title: "Blickfeld Gmbh",
        subtitle: "Software Developer Intern",
        period: "October 2021 – March 2022",
        content: `- Developed software solutions to enhance efficiency and coordination across teams at Blickfeld GmbH.
- Involved in an advanced Django project, focusing on creating and implementing endpoints in the Django Rest API.
- Engineered various algorithms for these endpoints to optimize functionality.
- Created React applications capable of utilizing the developed endpoints.
- Gained practical experience with Docker.
- Proficient in setting up and managing Git pipelines.`,
        metadata: {
          location: "Munich, Germany",
          logoUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-blickfeld-RnRJ719COyPc0STRooDqkXeDA2OwaH.svg"
        },
        order: 2,
        published: true
      }
    ];

    // Seed Projects Data
    const projectsData = [
      {
        section: "projects" as const,
        title: "FlexfitAI (TUM DevOps Course Project)",
        period: "March 2025 – Present",
        content: `Key contributor to a team project designing and implementing a full-stack web application based on modern DevOps principles, featuring a Generative AI component.
        
- Engineered a Retrieval-Augmented Generation (RAG) system using Python, LangChain, and a vector database (e.g., Weaviate) for the GenAI module.
- Implemented containerization for all application microservices (client, server, GenAI, DB) using Docker and Docker Compose.
- Developed and managed CI/CD pipelines with GitHub Actions for automated building, testing, and deployment to a Kubernetes staging environment.
- Orchestrated deployment using Kubernetes (Helm/raw manifests) and configured system observability with Prometheus and Grafana.`,
        tags: ["React", "Spring Boot", "Python", "Docker", "Kubernetes", "GitHub Actions", "Prometheus", "Grafana", "LangChain", "Weaviate"],
        metadata: {
          logoUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tum-logo-Ur1AylbzkA5M7dRnaW7j6Q6Yp3FJL5.png",
          featured: true
        },
        order: 0,
        published: true
      },
      {
        section: "projects" as const,
        title: "Connactz SetList Integration with Spotify",
        period: "October 2023 – October 2024",
        content: "Participated in an TUM Interdisciplinary Project aimed at developing an internal tool for the Connactz platform. Enabled users to create their own setlists using Spotify, leveraging Angular and Node.js in the technology stack.",
        tags: ["Angular", "Node.js", "Spotify API"],
        metadata: {
          logoUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/con-O8upI8GPTV4QmEngQ9db2NXCvU6uti.svg",
          featured: true
        },
        order: 1,
        published: true
      },
      {
        section: "projects" as const,
        title: "CommonRoad and ARCH Submission Systems",
        period: "November 2022 - March 2024",
        content: "Contributed to projects using Django, React, S3 Buckets, PostgreSQL, RabbitMQ, Swagger, Docker, GitLab CI. Master-Worker Architecture systems for processing, grading, and storing submissions, and facilitated user competitions.",
        tags: ["Django", "React", "PostgreSQL", "Docker", "RabbitMQ", "S3", "GitLab CI", "Swagger"],
        metadata: {
          logoUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CommonRoad-cehhXCbWRQabJSHdiu25vmLbu8opfX.svg",
          featured: true
        },
        order: 2,
        published: true
      },
      {
        section: "projects" as const,
        title: "E-Farmers",
        period: "January 2021 - June 2021",
        content: "Developed an e-commerce graduation project, featuring a React.js frontend and Django REST API backend. Integrated smart box design using Arduino, with PostgreSQL and Amazon RDS for database management, Amazon S3 for storage, and Heroku for deployment.",
        tags: ["React.js", "Django REST API", "PostgreSQL", "Amazon RDS", "Amazon S3", "Arduino", "Heroku"],
        metadata: {},
        order: 3,
        published: true
      }
    ];

    // Seed Skills Data
    const skillsData = [
      {
        section: "skills" as const,
        title: "Programming Languages",
        content: "",
        tags: ["Python", "C/C++", "C#", "Java", "JavaScript", "SQL"],
        order: 0,
        published: true
      },
      {
        section: "skills" as const,
        title: "Frameworks & Libraries",
        content: "",
        tags: ["Django", "React", "Angular", "Spring", "Node.js (basic)", ".NET Core (basic)", "Flask (basic)", "LangChain"],
        order: 1,
        published: true
      },
      {
        section: "skills" as const,
        title: "Tools & Cloud Technologies",
        content: "",
        tags: ["Git", "GitHub Actions", "GitLab CI", "Docker", "Kubernetes", "Helm", "Prometheus", "Grafana", "PostgreSQL", "MySQL", "AWS (S3, RDS, Lambda)", "Terraform", "Weaviate"],
        order: 2,
        published: true
      },
      {
        section: "skills" as const,
        title: "Concepts & Methodologies",
        content: "",
        tags: ["RESTful APIs", "Microservices", "Containerization", "DevOps (CI/CD)", "Cloud-Native Deployment", "Observability", "RAG (Retrieval-Augmented Generation)", "Agile/Scrum", "Security & Privacy"],
        order: 3,
        published: true
      },
      {
        section: "skills" as const,
        title: "Academic Interests",
        content: "",
        tags: ["AI & Deep Learning", "Large Language Models", "Safety", "Resilient Cognitive Systems"],
        order: 4,
        published: true
      },
      {
        section: "skills" as const,
        title: "Languages",
        content: "",
        tags: ["Turkish (native)", "English (C1 certified)", "German (A2 in use)"],
        order: 5,
        published: true
      },
      {
        section: "skills" as const,
        title: "Hobbies & Interests",
        content: "",
        tags: ["Game Development", "Web Applications"],
        order: 6,
        published: true
      }
    ];

    // Insert all data
    for (const item of [...educationData, ...experienceData, ...projectsData, ...skillsData]) {
      await ctx.db.insert("content", item);
    }

    return { message: "Data seeded successfully!" };
  },
});