import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import './App.css';
import Skeleton from './components/Skeleton';

const App = () => {
  const [activeSection, setActiveSection] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('light');
  
  // Set active section based on scroll position
  useEffect(() => {
    // Load theme from localStorage or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.body.className = savedTheme;
    
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Show loading for 1.5 seconds
    
    const handleScroll = () => {
      const sections = ['introduction', 'biography', 'education', 'skills', 'projects', 'experience', 'achievements', 'references'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && element.offsetTop + element.offsetHeight > scrollPosition) {
          setActiveSection(section);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
      // Close sidebar on mobile after clicking
      if (window.innerWidth <= 768) {
        setSidebarOpen(false);
      }
    }
  };
  
  // Toggle sidebar on mobile
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.className = newTheme;
    localStorage.setItem('theme', newTheme);
  };
  
  return (
    <div className="app">
      <Helmet>
        <title>Personal Wiki - Abhaya Bikram Shahi</title>
        <link rel="canonical" href="https://wiki.abhayabikramshahi.xyz/" />
        <meta name="description" content="Personal wiki and portfolio of Abhaya Bikram Shahi - showcasing biography, education, skills, projects, and achievements" />
        <meta name="keywords" content="Abhaya Bikram Shahi, personal wiki, portfolio, biography, skills, projects, achievements" />
        <meta name="author" content="Abhaya Bikram Shahi" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Personal Wiki - Abhaya Bikram Shahi" />
        <meta property="og:description" content="Personal wiki and portfolio of Abhaya Bikram Shahi" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://wiki.abhayabikramshahi.xyz/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Personal Wiki - Abhaya Bikram Shahi" />
        <meta name="twitter:description" content="Personal wiki and portfolio of Abhaya Bikram Shahi" />
        <meta name="twitter:url" content="https://wiki.abhayabikramshahi.xyz/" />
      </Helmet>
      
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className={`menu-toggle ${sidebarOpen ? 'active' : ''}`} onClick={toggleSidebar}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <h1 className="site-title">Personal Wiki</h1>
          </div>
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Search personal information..." 
              className="search-input"
            />
            <button 
              className="theme-toggle" 
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </header>
      
      <div className="main-container">
        {/* Sidebar */}
        <aside className={`sidebar ${sidebarOpen ? 'active' : ''}`}>
          <nav className="toc">
            <h2>Contents</h2>
            <ul>
              <li>
                <button 
                  className={activeSection === 'introduction' ? 'active' : ''}
                  onClick={() => scrollToSection('introduction')}
                >
                  Introduction
                </button>
              </li>
              <li>
                <button 
                  className={activeSection === 'biography' ? 'active' : ''}
                  onClick={() => scrollToSection('biography')}
                >
                  Biography
                </button>
              </li>
              <li>
                <button 
                  className={activeSection === 'education' ? 'active' : ''}
                  onClick={() => scrollToSection('education')}
                >
                  Education
                </button>
              </li>
              <li>
                <button 
                  className={activeSection === 'skills' ? 'active' : ''}
                  onClick={() => scrollToSection('skills')}
                >
                  Skills
                </button>
              </li>
              <li>
                <button 
                  className={activeSection === 'projects' ? 'active' : ''}
                  onClick={() => scrollToSection('projects')}
                >
                  Projects
                </button>
              </li>
              <li>
                <button 
                  className={activeSection === 'experience' ? 'active' : ''}
                  onClick={() => scrollToSection('experience')}
                >
                  Experience
                </button>
              </li>
              <li>
                <button 
                  className={activeSection === 'achievements' ? 'active' : ''}
                  onClick={() => scrollToSection('achievements')}
                >
                  Achievements
                </button>
              </li>
              <li>
                <button 
                  className={activeSection === 'references' ? 'active' : ''}
                  onClick={() => scrollToSection('references')}
                >
                  References
                </button>
              </li>
            </ul>
          </nav>
        </aside>
        
        {/* Main Content */}
        <main className="main-content">
          {loading ? (
            <>
              {/* Loading Introduction */}
              <section id="introduction" className="section">
                <Skeleton type="heading" />
                <Skeleton type="paragraph" count={2} />
              </section>
              
              {/* Loading Biography */}
              <section id="biography" className="section">
                <Skeleton type="heading" />
                <Skeleton type="paragraph" count={3} />
              </section>
              
              {/* Loading Education */}
              <section id="education" className="section">
                <Skeleton type="heading" />
                <Skeleton type="paragraph" count={1} />
                <div className="education-item">
                  <Skeleton type="text" count={3} />
                </div>
                <div className="education-item">
                  <Skeleton type="text" count={3} />
                </div>
                <Skeleton type="paragraph" count={1} />
              </section>
              
              {/* Loading Skills */}
              <section id="skills" className="section">
                <Skeleton type="heading" />
                <div className="skills-container">
                  <div className="skill-category">
                    <Skeleton type="heading" count={1} />
                    <Skeleton type="list" count={1} />
                  </div>
                  <div className="skill-category">
                    <Skeleton type="heading" count={1} />
                    <Skeleton type="list" count={1} />
                  </div>
                </div>
              </section>
              
              {/* Loading Projects */}
              <section id="projects" className="section">
                <Skeleton type="heading" />
                <div className="project-item">
                  <Skeleton type="text" count={3} />
                </div>
                <div className="project-item">
                  <Skeleton type="text" count={3} />
                </div>
                <div className="project-item">
                  <Skeleton type="text" count={3} />
                </div>
              </section>
              
              {/* Loading Experience */}
              <section id="experience" className="section">
                <Skeleton type="heading" />
                <div className="experience-item">
                  <Skeleton type="text" count={3} />
                </div>
                <div className="experience-item">
                  <Skeleton type="text" count={3} />
                </div>
                <div className="experience-item">
                  <Skeleton type="text" count={3} />
                </div>
              </section>
              
              {/* Loading Achievements */}
              <section id="achievements" className="section">
                <Skeleton type="heading" />
                <Skeleton type="list" count={1} />
              </section>
              
              {/* Loading References */}
              <section id="references" className="section">
                <Skeleton type="heading" />
                <Skeleton type="paragraph" count={1} />
                <Skeleton type="heading" count={1} />
                <Skeleton type="list" count={1} />
                <div className="footer-note">
                  <Skeleton type="text" count={2} />
                </div>
              </section>
            </>
          ) : (
            <>
              {/* Introduction */}
              <section id="introduction" className="section">
                <h1>Introduction</h1>
                <p>Welcome to my personal wiki. This is a complete profile of my personal details, experience, and accomplishments. This personal information website is designed in a clean and minimalistic style, as in the case of Wikipedia.</p>
                <p>My name is Abhaya Bikram Shahi, and this page serves as a central repository of information about my professional journey, education, skills, and accomplishments.</p>
              </section>
              
              {/* Biography */}
              <section id="biography" className="section">
                <h1>Biography</h1>
                <p>I’m a passionate technologist driven by curiosity, problem-solving, and continuous growth. My journey is shaped by hands-on experience, constant learning, and a strong desire to build things that actually matter..</p>
                <p>With a solid technical foundation and a creative mindset, I work across multiple domains to design and develop practical, scalable solutions. I enjoy breaking down complex challenges, experimenting with new technologies, and turning ideas into functional systems.</p>
                <p>Throughout my journey, I’ve focused on building reliable, performance-driven applications while collaborating with others in environments that encourage innovation and learning. I believe technology is not just about writing code—it’s about creating impact, improving experiences, and pushing boundaries.</p>
                <p>I’m always exploring new tools, frameworks, and ideas, staying adaptable in a fast-moving tech world and committed to growing both personally and professionally.</p>
              </section>
              
            {/* Education */}
<section id="education" className="section">
  <h1>Education</h1>

  <div className="education-item">
    <h3>HighSchool Level (Class 10) – Computer Science</h3>
    <p><strong>School:</strong> Badimalika Secondary School</p>
    <p><strong>Status:</strong> Currently Studying</p>
    <p>
      Studying core computer science concepts alongside academics, with a
      strong focus on practical learning. Actively involved in web development,
      app development, and real-world tech projects beyond the classroom.
    </p>
  </div>

  <div className="education-item">
    <h3>Self-Taught Developer & Continuous Learner</h3>
    <p>
      Learned web development, app development, and programming through
      hands-on projects, online resources, documentation, and experimentation.
      Comfortable working with modern tools, frameworks, and real production
      projects.
    </p>
  </div>

  <p>
    I strongly believe skills are built through practice. Alongside formal
    education, I continuously learn new technologies, build products, and
    improve by solving real problems.
  </p>
</section>

              
              {/* Skills */}
              <section id="skills" className="section">
                <h1>Skills</h1>
                <div className="skills-container">
                  <div className="skill-category">
                    <h3>Technical Skills</h3>
                    <ul>
                      <li>JavaScript/TypeScript</li>
                      <li>React, Node.js</li>
                      <li>HTML, CSS</li>
                      <li>Python</li>
                      <li>SQL, MongoDB</li>
                    </ul>
                  </div>
                  <div className="skill-category">
                    <h3>Professional Skills</h3>
                    <ul>
                      <li>Project Management</li>
                      <li>Team Leadership</li>
                      <li>Problem Solving</li>
                      <li>Communication</li>
                      <li>Technical Writing</li>
                    </ul>
                  </div>
                </div>
              </section>
              
             {/* Projects */}
<section id="projects" className="section">
  <h1>Projects</h1>

  <div className="project-item">
    <h3>Badimalika Secondary School Website</h3>
    <p><strong>Role:</strong> Full Stack Web Developer</p>
    <p>
      Designed and developed the official school website with a modern UI.
      Implemented pages for notices, vacancies, class progress tracking, and
      user management with backend APIs. Focused on performance, clarity, and
      real-world usability.
    </p>
  </div>

  <div className="project-item">
    <h3>Password Manager Web App</h3>
    <p><strong>Role:</strong> Frontend Developer</p>
    <p>
      Built a secure and clean password manager interface using React and
      TypeScript. Implemented responsive layouts, mobile/desktop views,
      password strength indicators, and smooth navigation.
    </p>
  </div>

  <div className="project-item">
    <h3>Abhaya Language (Custom Programming Language)</h3>
    <p><strong>Role:</strong> Creator & Developer</p>
    <p>
      Created a custom programming language in C with its own syntax,
      interpreter, functions, loops, and CLI support. Also built a dedicated
      website with documentation, code playground, and examples.
    </p>
  </div>

  <div className="project-item">
    <h3>FaceSmash-Style Photo Voting Platform</h3>
    <p><strong>Role:</strong> Full Stack Developer</p>
    <p>
      Developed a PHP-based photo voting platform with uploads, categories,
      admin panel, voting system, face detection integration using Python, and
      real-time statistics.
    </p>
  </div>

  <div className="project-item">
    <h3>Video Sharing Platform</h3>
    <p><strong>Role:</strong> Full Stack Developer</p>
    <p>
      Built a React-based video sharing application with PHP backend including
      login/signup, upload, likes, comments, subscriptions, reports, and
      membership system with a dark UI theme.
    </p>
  </div>

  <div className="project-item">
    <h3>3D Car Game (Three.js)</h3>
    <p><strong>Role:</strong> Frontend Developer</p>
    <p>
      Created a 3D car driving game using Three.js featuring a moving car,
      dynamic roads, buildings, trees, and camera controls to explore real-time
      3D rendering.
    </p>
  </div>

  <div className="project-item">
    <h3>Health & Nutrition Web App</h3>
    <p><strong>Role:</strong> Web Developer</p>
    <p>
      Developed a health-focused web application that calculates calories,
      protein, and nutritional requirements based on user weight and goals.
    </p>
  </div>

  <div className="project-item">
    <h3>Android Applications (Java)</h3>
    <p><strong>Role:</strong> Android Developer</p>
    <p>
      Built multiple Android apps using Android Studio and Java, including a
      counter app, to-do list app with offline support, and utility-based
      applications focusing on clean UI and functionality.
    </p>
  </div>

  <div className="project-item">
    <h3>Freelance & Client Projects</h3>
    <p><strong>Role:</strong> Web & App Developer</p>
    <p>
      Worked on various freelance and organizational projects involving web
      development, UI/UX design, backend APIs, and deployment for real clients
      and institutions.
    </p>
  </div>
</section>

           {/* Experience */}
<section id="experience" className="section">
  <h1>Experience</h1>

  <div className="experience-item">
    <h3>Web & App Developer</h3>
    <p><strong>Organization:</strong> Badimalika Secondary School</p>
    <p><strong>Duration:</strong> Ongoing</p>
    <p>
      Developed and managed the official school website and internal systems.
      Worked on notice, vacancy, class progress, and user management features.
      Handled frontend, backend APIs, deployment, and ongoing maintenance.
    </p>
  </div>

  <div className="experience-item">
    <h3>Web Developer</h3>
    <p><strong>Company:</strong> Saga Service</p>
    <p><strong>Duration:</strong> Past Experience</p>
    <p>
      Contributed to web development projects including UI implementation,
      functionality improvements, and performance optimization. Gained
      real-world experience working with client requirements and production
      systems.
    </p>
  </div>

  <div className="experience-item">
    <h3>Freelance Developer</h3>
    <p><strong>Type:</strong> Independent Projects & Clients</p>
    <p><strong>Duration:</strong> Ongoing</p>
    <p>
      Worked on multiple freelance and personal projects involving web
      development, app development, UI/UX design, backend logic, and deployment.
      Delivered functional, real-world solutions based on client and user needs.
    </p>
  </div>

  <div className="experience-item">
    <h3>Self-Taught Programmer</h3>
    <p><strong>Focus:</strong> Continuous Learning & Building</p>
    <p>
      Learned and applied programming concepts through hands-on projects,
      experimentation, and problem-solving. Regularly explore new technologies,
      frameworks, and tools to improve skills and adaptability.
    </p>
  </div>
</section>

           {/* Achievements */}
<section id="achievements" className="section">
  <h1>Achievements</h1>
  <ul>
    <li>
      Built and launched multiple real-world websites and applications used by
      schools, organizations, and users.
    </li>
    <li>
      Developed the official website of Badimalika Secondary School and led its
      digital presence.
    </li>
    <li>
      Created a custom programming language (Abhaya Language) with its own
      syntax, interpreter, and documentation.
    </li>
    <li>
      Successfully delivered full-stack projects including web apps, Android
      apps, and backend systems at a young age.
    </li>
    <li>
      Self-taught multiple technologies including React, TypeScript, Java,
      PHP, Python, and Three.js through hands-on projects.
    </li>
    <li>
      Actively contributed to freelance and organizational projects, gaining
      real production-level experience.
    </li>
    <li>
      Recognized within school and local community for technical skills,
      innovation, and initiative in technology projects.
    </li>
  </ul>
</section>

              {/* References */}
              <section id="references" className="section">
                <h1>References</h1>
                <div className="references-container">
                  <h3>Professional References</h3>
                  <p>Available upon request. Please contact me directly for professional references.</p>
                  
                  <h3>External Links</h3>
                  <ul>
                    <li><a href="" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a></li>
                    <li><a href="https://github.com/abhayaos" target="_blank" rel="noopener noreferrer">GitHub Repository</a></li>
                    <li><a href="https://abhayabikramshahi.xyz" target="_blank" rel="noopener noreferrer">Professional Portfolio</a></li>
                    <li><a href="https://abhaya.dev/resume" target="_blank" rel="noopener noreferrer">Resume/CV</a></li>
                  </ul>
                </div>
                
                <div className="footer-note">
                  <p>This personal wiki was created by <strong>Abhaya Bikram Shahi</strong></p>
                  <p>Last updated: January 2026</p>
                </div>
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;