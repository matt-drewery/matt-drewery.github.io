<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Matt Drewery | Web Developer</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --primary: #2563eb;
            --dark: #1e293b;
            --light: #f8fafc;
            --gray: #64748b;
            --accent: #3b82f6;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        
        html {
            scroll-behavior: smooth;
        }
        
        body {
            background-color: var(--light);
            color: var(--dark);
            line-height: 1.6;
        }
        
        header {
            background-color: var(--dark);
            color: var(--light);
            padding: 1.5rem;
            position: fixed;
            width: 100%;
            top: 0;
            z-index: 1000;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .logo {
            font-size: 1.5rem;
            font-weight: 700;
        }
        
        .logo span {
            color: var(--primary);
        }
        
        .nav-links {
            display: flex;
            gap: 2rem;
        }
        
        .nav-links a {
            color: var(--light);
            text-decoration: none;
            font-weight: 500;
            transition: color 0.3s;
        }
        
        .nav-links a:hover {
            color: var(--primary);
        }
        
        .hero {
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            background-color: var(--dark);
            color: var(--light);
            padding: 0 1rem;
            position: relative;
        }
        
        .hero-content {
            max-width: 800px;
        }
        
        .hero h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
        
        .hero p {
            font-size: 1.25rem;
            margin-bottom: 2rem;
            color: var(--gray);
        }
        
        .hero-buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
        }
        
        .btn {
            display: inline-block;
            padding: 0.75rem 1.5rem;
            border-radius: 4px;
            text-decoration: none;
            font-weight: 500;
            transition: all 0.3s;
        }
        
        .btn-primary {
            background-color: var(--primary);
            color: white;
        }
        
        .btn-primary:hover {
            background-color: #1d4ed8;
        }
        
        .btn-outline {
            border: 2px solid var(--primary);
            color: var(--primary);
        }
        
        .btn-outline:hover {
            background-color: var(--primary);
            color: white;
        }
        
        section {
            padding: 5rem 1rem;
        }
        
        .section-title {
            text-align: center;
            margin-bottom: 3rem;
        }
        
        .section-title h2 {
            font-size: 2rem;
            display: inline-block;
            position: relative;
        }
        
        .section-title h2::after {
            content: '';
            display: block;
            width: 50%;
            height: 3px;
            background-color: var(--primary);
            position: absolute;
            bottom: -10px;
            left: 25%;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .about-content {
            display: flex;
            gap: 2rem;
            align-items: center;
        }
        
        .about-text {
            flex: 1;
        }
        
        .skills {
            margin-top: 2rem;
        }
        
        .skill-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-top: 1rem;
        }
        
        .skill-tag {
            background-color: var(--primary);
            color: white;
            padding: 0.4rem 0.8rem;
            border-radius: 20px;
            font-size: 0.9rem;
        }
        
        .portfolio-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 2rem;
        }
        
        .portfolio-item {
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s;
        }
        
        .portfolio-item:hover {
            transform: translateY(-5px);
        }
        
        .portfolio-img {
            width: 100%;
            height: 200px;
            background-color: #e2e8f0;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .portfolio-content {
            padding: 1.5rem;
        }
        
        .portfolio-title {
            margin-bottom: 0.5rem;
        }
        
        .portfolio-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin: 1rem 0;
        }
        
        .portfolio-tag {
            background-color: #e2e8f0;
            color: var(--gray);
            padding: 0.3rem 0.6rem;
            border-radius: 20px;
            font-size: 0.8rem;
        }
        
        .portfolio-links {
            display: flex;
            gap: 1rem;
            margin-top: 1rem;
        }
        
        .portfolio-links a {
            color: var(--primary);
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 0.3rem;
            font-size: 0.9rem;
        }
        
        .contact-form {
            max-width: 600px;
            margin: 0 auto;
        }
        
        .form-group {
            margin-bottom: 1.5rem;
        }
        
        .form-control {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #cbd5e1;
            border-radius: 4px;
            font-size: 1rem;
        }
        
        textarea.form-control {
            resize: vertical;
            min-height: 150px;
        }
        
        .btn-form {
            width: 100%;
            padding: 0.75rem;
            background-color: var(--primary);
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 1rem;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        
        .btn-form:hover {
            background-color: #1d4ed8;
        }
        
        footer {
            background-color: var(--dark);
            color: var(--light);
            text-align: center;
            padding: 2rem 1rem;
        }
        
        .footer-links {
            display: flex;
            justify-content: center;
            gap: 1.5rem;
            margin: 1.5rem 0;
        }
        
        .footer-links a {
            color: var(--light);
            font-size: 1.5rem;
            transition: color 0.3s;
        }
        
        .footer-links a:hover {
            color: var(--primary);
        }
        
        .back-to-top {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: var(--primary);
            color: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            opacity: 0;
            transition: opacity 0.3s;
        }
        
        .back-to-top.visible {
            opacity: 1;
        }
        
        .contact-info {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 2rem;
            margin-bottom: 3rem;
        }
        
        .contact-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .contact-item i {
            color: var(--primary);
            font-size: 1.2rem;
        }
        
        @media (max-width: 768px) {
            .about-content {
                flex-direction: column;
            }
            
            .hero h1 {
                font-size: 2.5rem;
            }
            
            .hero p {
                font-size: 1rem;
            }
            
            .hero-buttons {
                flex-direction: column;
            }
            
            .nav-links {
                display: none;
            }
            
            .contact-info {
                flex-direction: column;
                align-items: center;
            }
        }
    </style>
</head>
<body>
    <header>
        <nav>
            <div class="logo">Matt<span>Drewery</span></div>
            <div class="nav-links">
                <a href="#home">Home</a>
                <a href="#about">About</a>
                <a href="#portfolio">Portfolio</a>
                <a href="#contact">Contact</a>
            </div>
        </nav>
    </header>

    <section id="home" class="hero">
        <div class="hero-content">
            <h1>Matt Drewery</h1>
            <p>Web Developer & Digital Craftsman</p>
            <div class="hero-buttons">
                <a href="#portfolio" class="btn btn-primary">View My Work</a>
                <a href="#contact" class="btn btn-outline">Contact Me</a>
            </div>
        </div>
    </section>

    <section id="about">
        <div class="container">
            <div class="section-title">
                <h2>About Me</h2>
            </div>
            <div class="about-content">
                <div class="about-text">
                    <p>I'm a passionate web developer with expertise in creating responsive, user-friendly websites and applications. My approach combines clean code, modern design principles, and performance optimization to deliver exceptional digital experiences.</p>
                    <p>With a strong foundation in both front-end and back-end technologies, I bring ideas to life through thoughtful planning and meticulous execution. I'm constantly exploring new technologies and methodologies to stay at the forefront of web development.</p>
                    <div class="skills">
                        <h3>Technical Skills</h3>
                        <div class="skill-tags">
                            <span class="skill-tag">HTML5</span>
                            <span class="skill-tag">CSS3</span>
                            <span class="skill-tag">JavaScript</span>
                            <span class="skill-tag">React</span>
                            <span class="skill-tag">Node.js</span>
                            <span class="skill-tag">Responsive Design</span>
                            <span class="skill-tag">UI/UX</span>
                            <span class="skill-tag">Git</span>
                            <span class="skill-tag">WordPress</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="portfolio" style="background-color: #f1f5f9;">
        <div class="container">
            <div class="section-title">
                <h2>My Portfolio</h2>
            </div>
            <div class="portfolio-grid">
                <!-- Portfolio Item 1 -->
                <div class="portfolio-item">
                    <div class="portfolio-img">
                        <img src="/api/placeholder/400/320" alt="E-commerce Website" />
                    </div>
                    <div class="portfolio-content">
                        <h3 class="portfolio-title">E-commerce Platform</h3>
                        <p>A responsive e-commerce website with integrated payment processing and inventory management.</p>
                        <div class="portfolio-tags">
                            <span class="portfolio-tag">React</span>
                            <span class="portfolio-tag">Node.js</span>
                            <span class="portfolio-tag">MongoDB</span>
                        </div>
                        <div class="portfolio-links">
                            <a href="#"><i class="fas fa-external-link-alt"></i> Live Demo</a>
                            <a href="#"><i class="fab fa-github"></i> GitHub</a>
                        </div>
                    </div>
                </div>
                
                <!-- Portfolio Item 2 -->
                <div class="portfolio-item">
                    <div class="portfolio-img">
                        <img src="/api/placeholder/400/320" alt="Corporate Website" />
                    </div>
                    <div class="portfolio-content">
                        <h3 class="portfolio-title">Corporate Website</h3>
                        <p>A professional website for a financial services company featuring custom animations and CMS integration.</p>
                        <div class="portfolio-tags">
                            <span class="portfolio-tag">HTML5</span>
                            <span class="portfolio-tag">CSS3</span>
                            <span class="portfolio-tag">JavaScript</span>
                            <span class="portfolio-tag">WordPress</span>
                        </div>
                        <div class="portfolio-links">
                            <a href="#"><i class="fas fa-external-link-alt"></i> Live Demo</a>
                            <a href="#"><i class="fab fa-github"></i> GitHub</a>
                        </div>
                    </div>
                </div>
            </section>

            <section id="contact">
        <div class="container">
            <div class="section-title">
                <h2>Contact Me</h2>
            </div>
            <div class="contact-info">
                <div class="contact-item">
                    <i class="fas fa-envelope"></i>
                    <span>matt.drewery@gmail.com</span>
                </div>
                <div class="contact-item">
                    <i class="fas fa-phone"></i>
                    <span>07551 307284</span>
                </div>
                <div class="contact-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>Peterborough, United Kingdom</span>
                </div>
            </div>
            <div class="contact-form">
                <form>
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Your Name" required>
                    </div>
                    <div class="form-group">
                        <input type="email" class="form-control" placeholder="Your Email" required>
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Subject">
                    </div>
                    <div class="form-group">
                        <textarea class="form-control" placeholder="Your Message" required></textarea>
                    </div>
                    <button type="submit" class="btn-form">Send Message</button>
                </form>
            </div>
        </div>
    </section>

    <footer>
        <div class="footer-links">
            <a href="#"><i class="fab fa-github"></i></a>
            <a href="#"><i class="fab fa-linkedin"></i></a>
            <a href="#"><i class="fab fa-twitter"></i></a>
            <a href="#"><i class="fab fa-dribbble"></i></a>
        </div>
        <p>&copy; 2025 Matt Drewery. All rights reserved.</p>
    </footer>

    <a href="#home" class="back-to-top">
        <i class="fas fa-arrow-up"></i>
    </a>

    <script>
        // Back to top button functionality
        const backToTop = document.querySelector('.back-to-top');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
    </script>
