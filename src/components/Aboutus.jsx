import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-[#121212] text-white p-8 font-[Product Sans]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[#95d5b2] mb-6">About Me</h1>

        <p className="text-lg leading-relaxed mb-5">
          Hi, I'm <strong>Mohammed Tousif</strong>.<br />
          I’m a Computer Science Engineering graduate with a strong interest in full-stack development and building meaningful tech solutions.
          During my academic journey, I actively participated in real-world problem-solving events and was a finalist in
          <strong> Smart India Hackathon (SIH) 2023</strong>, which helped me sharpen my collaborative and technical skills.
        </p>

        <p className="text-lg leading-relaxed mb-5">
          I have hands-on experience with <strong>Core Java, HTML, CSS, JavaScript</strong>, and the <strong>MERN stack</strong>.
          I enjoy crafting both the backend logic and the frontend interface of applications, ensuring a smooth user experience
          with clean and functional code.
        </p>

        <p className="text-lg leading-relaxed mb-5">
          I’m currently upskilling through a <strong>Java Full Stack Development program at TAP Academy</strong>, where I’m working
          on live projects that involve user interface design, REST APIs, and responsive web development.
        </p>

        <p className="text-lg leading-relaxed mb-5">
          I’m now looking for opportunities where I can contribute, learn, and grow as a software developer while working on impactful projects.
        </p>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-[#95d5b2] mb-3">Connect with me:</h2>
          <div className="flex gap-6">
            <a
              href="https://www.instagram.com/s7imshady/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#f4a261] hover:underline"
            >
              Instagram
            </a>
            <a
              href="https://github.com/Tousif7401"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#64dfdf] hover:underline"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
