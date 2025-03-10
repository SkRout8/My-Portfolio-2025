export interface Project {
  id: string;
  subtitle: string;
  title: string;
  description: string;
  preview: string;
  tech: string[];
  links: {
    website: string;
    github: string;
    video: string;
  };
  color: string;
}

export const projects: Project[] = [
  {
    id: "mail-domain",
    subtitle: "AI Enhancer",
    title: "AI Image Enhacer",
    description: "The AI Image Enhancer is a web-based application that utilizes advanced AI models to enhance image quality, resolution, and overall appearance. It applies deep learning techniques to upscale low-quality images, remove noise, sharpen details, and improve colors. The project is designed to help photographers, designers, and general users improve their images effortlessly.",
    preview: "Avalibile Soon",
    tech: ["Javascript", "Tailwind CSS", "HTML", "React", "Node.js", "Express.js", "OpenAI", "Vercel"],
    links: {
      website: "",
      github: "",
      video: ""
    },
    color: "from-[#10B981] to-[#059669]"
  },
  {
    id: "Nexa AI",
    subtitle: "An AI based Voice Assistant",
    title: "Nexa AI",
    description: "Nexa AI is an intelligent Voice assistant designed to provide users with instant, accurate, and interactive responses. It leverages advanced AI models to assist with queries, automate tasks, and enhance productivity. Whether it's answering general knowledge questions, scheduling tasks, or offering personalized recommendations, Nexa AI is built to make daily activities more efficient.",
    preview: "Avalible Soon",
    tech: ["Express.js", "React", "Node.js", "TypeScript", "Next Js", "GeminiAI", "Vercel"],
    links: {
      website: "",
      github: "",
      video: ""
    },
    color: "from-[#4F46E5] to-[#7C3AED]"
  },
  
]; 