import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Terminal, Code2, Github, Linkedin, Mail, Phone, ChevronDown, ExternalLink, Award, Calendar, MapPin, X, Send, Target, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Index() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    position: '',
    inquiryType: '',
    message: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'experience', 'projects', 'skills', 'education', 'ctfs'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('https://formspree.io/f/mnnbqega', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          position: formData.position,
          inquiryType: formData.inquiryType,
          message: formData.message,
          _subject: `${formData.inquiryType} Inquiry from ${formData.name}`,
        }),
      });

      if (response.ok) {
        // Success - reset form and close modal
        setFormData({
          name: '',
          email: '',
          company: '',
          position: '',
          inquiryType: '',
          message: ''
        });
        setIsContactModalOpen(false);

        // Show success message (optional - you could add a toast notification)
        alert('Thank you! Your message has been sent successfully.');
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending form:', error);
      alert('Sorry, there was an error sending your message. Please try again.');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-mono text-xl font-bold text-cyber-blue"
            >
              &lt;Shreya/&gt;
            </motion.div>
            <div className="hidden md:flex space-x-8">
              {['About', 'Experience', 'Projects', 'Skills', 'Education', 'CTFs'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm transition-colors ${
                    activeSection === item.toLowerCase() 
                      ? 'text-cyber-blue' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="flex space-x-4">
              <Button variant="outline" size="sm" asChild>
                <a href="https://github.com/ShreyaTrivediGit" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="https://www.linkedin.com/in/shreya-trivedi-3a1b56249/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden cyber-grid">
        <div className="absolute inset-0 bg-gradient-to-br from-cyber-blue/5 via-transparent to-cyber-purple/5" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-bold mb-6 text-glow"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <span className="text-cyber-blue">SHREYA</span><br />
              <span className="text-cyber-purple">TRIVEDI</span>
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mb-8"
            >
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Shield className="w-6 h-6 text-cyber-green" />
                <span className="font-mono text-xl text-cyber-green">ASPIRING SOC ANALYST and DIGITAL FORENSIC ENTHUSIAST</span>
                <Terminal className="w-6 h-6 text-cyber-blue" />
              </div>
              <p className="text-xl md:text-2xl text-muted-foreground mb-2">
                Cybersecurity & Digital Forensics Enthusiast | Aspiring SOC Analyst
              </p>
              <p className="text-lg text-muted-foreground">
                Passionate about securing systems with SIEM monitoring, forensic investigations & vulnerability analysis.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12"
            >
              <Button size="lg" className="glow-effect" onClick={() => scrollToSection('projects')}>
                <Code2 className="mr-2 w-5 h-5" />
                View My Work
              </Button>
              <Dialog open={isContactModalOpen} onOpenChange={setIsContactModalOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="lg">
                    <Mail className="mr-2 w-5 h-5" />
                    Hire Me!
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-cyber-blue">Get In Touch</DialogTitle>
                    <DialogDescription>
                      I'm excited to hear about opportunities in cybersecurity and digital forensics!
                    </DialogDescription>
                  </DialogHeader>

                  <form onSubmit={handleFormSubmit} className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          placeholder="Your name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@company.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          placeholder="Your company"
                          value={formData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="position">Your Position</Label>
                        <Input
                          id="position"
                          placeholder="Your role/title"
                          value={formData.position}
                          onChange={(e) => handleInputChange('position', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="inquiryType">Type of Inquiry *</Label>
                      <Select value={formData.inquiryType} onValueChange={(value) => handleInputChange('inquiryType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Full-time Job">Full-time Job Opportunity</SelectItem>
                          <SelectItem value="Internship">Internship Opportunity</SelectItem>
                          <SelectItem value="Freelance">Freelance Project</SelectItem>
                          <SelectItem value="Consulting">Consulting Work</SelectItem>
                          <SelectItem value="Collaboration">Collaboration</SelectItem>
                          <SelectItem value="General">General Inquiry</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell me about the opportunity, requirements, or any questions you have..."
                        rows={4}
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        required
                      />
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsContactModalOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="glow-effect"
                        disabled={!formData.name || !formData.email || !formData.inquiryType || !formData.message}
                      >
                        <Send className="mr-2 w-4 h-4" />
                        Send Message
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="flex items-center justify-center space-x-8 text-sm text-muted-foreground"
            >
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>shreya.trivedi2026@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+91-7016389523</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={() => scrollToSection('about')}
        >
          <div className="flex flex-col items-center space-y-2 text-cyber-blue">
            <span className="text-sm font-mono">SCROLL</span>
            <ChevronDown className="w-6 h-6 animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-12 text-center">
              <span className="text-cyber-blue">&lt;</span>
              About Me
              <span className="text-cyber-blue">/&gt;</span>
            </h2>
            
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 items-start">
              {/* Professional Photo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="lg:col-span-1 md:col-span-2 lg:order-first md:order-last flex justify-center"
              >
                <Card className="cyber-border glow-effect w-fit">
                  <CardContent className="p-6">
                    <div className="relative">
                      <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-cyber-blue/30 shadow-2xl mx-auto">
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets%2F42d13a39a56244c684e5f34593b2f4a4%2Fcfe79b21b5ad452ea9881c65afbf26fe?format=webp&width=800"
                          alt="Shreya Trivedi - Cybersecurity Professional"
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2">
                        <div className="bg-cyber-green rounded-full p-2 border-2 border-background">
                          <Shield className="w-6 h-6 text-background" />
                        </div>
                      </div>
                    </div>
                    <div className="text-center mt-6">
                      <h3 className="text-xl font-bold text-cyber-blue mb-2">Shreya Trivedi</h3>
                      <p className="text-sm text-cyber-green font-mono">Aspiring Cybersecurity Analyst</p>
                      <div className="flex justify-center space-x-4 mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsContactModalOpen(true)}
                        >
                          <Mail className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <a href="https://linkedin.com/in/shreya-trivedi" target="_blank" rel="noopener noreferrer">
                            <Linkedin className="w-4 h-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Professional Summary */}
              <div className="lg:col-span-2">
                <Card className="cyber-border glow-effect">
                  <CardContent className="p-8">
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-cyber-green">Professional Summary</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        <strong className="text-cyber-blue">Fresh graduate</strong> passionate about cybersecurity and digital forensics,
                        eager to launch my career as a <strong className="text-cyber-green">SOC Analyst</strong>. Currently pursuing B.Tech in ICT
                        with hands-on learning through internships and personal projects.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        Developing expertise in <strong className="text-cyber-purple">SIEM monitoring</strong>, log analysis, secure code review,
                        and forensic investigations. Strong academic foundation with <strong className="text-cyber-orange">CGPA 9.73</strong>
                        and commitment to continuous learning in cybersecurity.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        Ready to contribute analytical thinking, attention to detail, and enthusiasm for
                        <strong className="text-cyber-blue"> SOC operations</strong> and cyber defense to a dynamic security team.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Skills Section */}
              <div className="lg:col-span-3 grid md:grid-cols-2 gap-6 mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-cyber-green">Skills I'm Developing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        'SIEM Monitoring',
                        'Log Analysis',
                        'Digital Forensics',
                        'Secure Code Review',
                        'Incident Response',
                        'Vulnerability Assessment',
                        'SOC Operations',
                        'Threat Detection'
                      ].map((skill) => (
                        <Badge key={skill} variant="secondary" className="justify-center py-2">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-cyber-purple">Tools I'm Learning</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'Wazuh', 'Splunk', 'Autopsy', 'Burp Suite',
                        'Wireshark', 'FTK Imager', 'Nmap', 'Metasploit'
                      ].map((tool) => (
                        <Badge key={tool} variant="outline" className="text-cyber-blue border-cyber-blue">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-card/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-12 text-center">
              <span className="text-cyber-blue">&lt;</span>
              Experience
              <span className="text-cyber-blue">/&gt;</span>
            </h2>

            <div className="max-w-4xl mx-auto space-y-8">
              {/* SOC Analyst Intern */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="cyber-border">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div>
                        <CardTitle className="text-cyber-green text-xl">SOC Analyst Intern</CardTitle>
                        <p className="text-cyber-blue font-semibold">Psy9 Security</p>
                      </div>
                      <div className="text-right text-sm text-muted-foreground mt-2 md:mt-0">
                        <div className="flex items-center md:justify-end space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>May 2025 – Jul 2025</span>
                        </div>
                        <div className="flex items-center md:justify-end space-x-2 mt-1">
                          <MapPin className="w-4 h-4" />
                          <span>Ahmedabad, Gujarat</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start space-x-2">
                        <span className="text-cyber-blue mt-1">•</span>
                        <span>Learned to detect and triage <strong className="text-foreground">50+ security alerts daily</strong> using Wazuh SIEM, firewall (Sophos, Fortinet), and endpoint logs, gaining experience in reducing false positives.</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-cyber-green mt-1">•</span>
                        <span>Developed skills in automating forensic workflows in Linux through scripting log parsing and memory analysis, contributing to <strong className="text-cyber-green">~20% efficiency improvement</strong>.</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-cyber-purple mt-1">•</span>
                        <span>Gained hands-on experience in disk analysis and digital evidence preservation using forensic tools, learning proper chain of custody procedures.</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-cyber-orange mt-1">•</span>
                        <span>Collaborated with senior analysts on phishing, brute-force, and malware incidents, building foundational SOC incident handling skills.</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Other Internships */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="text-cyber-blue">Cybersecurity Intern</CardTitle>
                      <p className="text-sm font-semibold">Code Alpha • Feb 2025 • Remote</p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Built my first Python-based packet sniffer to understand TCP/UDP/ICMP traffic analysis</li>
                        <li>• Learned secure code review techniques, identifying <strong className="text-cyber-orange">10+ vulnerabilities</strong> including SQLi, XSS, and Path Traversal</li>
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 0 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="text-cyber-orange">Cybersecurity Intern </CardTitle>
                      <p className="text-sm font-semibold">Clifford Chance Forage • Jul 2024 • Remote</p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Analyzed case studies of recent global data breaches, linking root causes to gaps in compliance (GDPR, ISO)</li>
                        <li>• Proposed corrective measures aligned with legal and business continuity requirements</li>
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="text-cyber-purple">Blockchain & Web3 Security (Externship)</CardTitle>
                      <p className="text-sm font-semibold">Webacy • Oct 2024 • Remote</p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Explored Solidity smart contract security through vulnerability review exercises</li>
                        <li>• Expanded knowledge of blockchain-specific exploits and emerging security challenges</li>
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-12 text-center">
              <span className="text-cyber-blue">&lt;</span>
              Projects
              <span className="text-cyber-blue">/&gt;</span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                {
                  title: "Digital Forensics Learning Project",
                  description: "Self-taught digital forensics by recovering deleted files and analyzing metadata from disk images using Autopsy and Sleuth Kit, creating my first forensic reports.",
                  tech: ["Autopsy", "Sleuth Kit", "Digital Forensics"],
                  color: "cyber-blue"
                },
                {
                  title: "Security Vulnerability Discovery",
                  description: "Practiced secure code review techniques, learning to identify SQLi, Path Traversal, Command Injection, and XSS vulnerabilities while studying OWASP guidelines.",
                  tech: ["OWASP", "Security Review", "Vulnerability Assessment"],
                  color: "cyber-green"
                },
                {
                  title: "Network Analysis Tool Development",
                  description: "Developed my networking skills by building a Python packet sniffer to capture and analyze TCP/UDP/ICMP traffic, learning low-level network concepts.",
                  tech: ["Python", "Network Analysis", "Security"],
                  color: "cyber-purple"
                },
                {
                  title: "Web Security Learning Lab",
                  description: "Practiced web application security testing by discovering XSS vulnerabilities in test environments using Burp Suite, building documentation skills.",
                  tech: ["Burp Suite", "XSS", "Web Security"],
                  color: "cyber-pink"
                },
                {
                  title: "Embedded Systems Project",
                  description: "Explored embedded programming by creating a hardware-based Chrome Dino game replica with custom features, learning ATmega 2560 development.",
                  tech: ["ATmega 2560", "Embedded Systems", "C++"],
                  color: "cyber-orange"
                },
                {
                  title: "Interactive Learning Application",
                  description: "Developed React skills by building an interactive anatomy explorer, combining my interest in education technology with front-end development.",
                  tech: ["React", "JavaScript", "Interactive Design"],
                  color: "cyber-blue"
                }
              ].map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:glow-effect transition-all duration-300 group cursor-pointer">
                    <CardHeader>
                      <CardTitle className={`text-${project.color} group-hover:text-glow transition-all duration-300`}>
                        {project.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-card/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-12 text-center">
              <span className="text-cyber-blue">&lt;</span>
              Technical Skills
              <span className="text-cyber-blue">/&gt;</span>
            </h2>

            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
              <Card className="cyber-border">
                <CardHeader>
                  <CardTitle className="text-cyber-green flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Security & Forensics Tools</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {['Wazuh', 'Autopsy', 'Sleuth Kit', 'FTK Imager', 'Burp Suite', 'Wireshark', 'Nmap', 'Metasploit', 'RegRipper'].map((tool) => (
                      <Badge key={tool} variant="secondary" className="hover:bg-cyber-green/20 transition-colors">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="cyber-border">
                <CardHeader>
                  <CardTitle className="text-cyber-blue flex items-center space-x-2">
                    <Code2 className="w-5 h-5" />
                    <span>Programming & Scripting</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {['Python', 'C/C++', 'Bash', 'Linux Command Line', 'JavaScript', 'React'].map((lang) => (
                      <Badge key={lang} variant="secondary" className="hover:bg-cyber-blue/20 transition-colors">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="cyber-border">
                <CardHeader>
                  <CardTitle className="text-cyber-purple flex items-center space-x-2">
                    <Terminal className="w-5 h-5" />
                    <span>Networking & OS</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {['TCP/IP', 'DNS', 'VPN', 'Firewalls', 'Linux & Windows OS', 'Cisco Packet Tracer'].map((skill) => (
                      <Badge key={skill} variant="secondary" className="hover:bg-cyber-purple/20 transition-colors">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="cyber-border">
                <CardHeader>
                  <CardTitle className="text-cyber-orange flex items-center space-x-2">
                    <Award className="w-5 h-5" />
                    <span>Growing Competencies</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {['SIEM Monitoring', 'Log & Traffic Analysis', 'Digital Forensics', 'Vulnerability Assessment', 'Incident Response'].map((comp) => (
                      <Badge key={comp} variant="secondary" className="hover:bg-cyber-orange/20 transition-colors">
                        {comp}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-12 text-center">
              <span className="text-cyber-blue">&lt;</span>
              Education & Certifications
              <span className="text-cyber-blue">/&gt;</span>
            </h2>

            <div className="max-w-4xl mx-auto space-y-8">
              {/* Education */}
              <Card className="cyber-border glow-effect">
                <CardHeader>
                  <CardTitle className="text-cyber-green text-xl">Education</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">B.Tech. in Information and Communication Technology</h3>
                        <p className="text-cyber-blue">Pandit Deendayal Energy University, Gujarat</p>
                        <p className="text-cyber-orange font-bold">CGPA: 9.73</p>
                      </div>
                      <div className="text-right mt-2 md:mt-0">
                        <p className="text-muted-foreground">2022 – 2026</p>
                      </div>
                    </div>
                    <div className="border-t border-border pt-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div>
                          <h4 className="font-semibold">Higher Secondary Education</h4>
                          <p className="text-muted-foreground">Prakash Higher Secondary School, Gujarat</p>
                        </div>
                        <div className="text-right mt-2 md:mt-0">
                          <p className="text-cyber-green">Class 12: 94.4% (2022)</p>
                          <p className="text-cyber-blue">Class 10: 96% (2020)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Certifications */}
              <Card className="cyber-border">
                <CardHeader>
                  <CardTitle className="text-cyber-purple text-xl">Certifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      'Fortinet Certified Associate in Cybersecurity (2025)',
                      'Autopsy Basics – Cybrary (2025)',
                      'Digital Forensic Basics – Cybrary (2025)',
                      'Cytra – Web Application Security 101 (2025)',
                      'OPSWAT Network Security Associate (2024)',
                      'Splunk – Intro to Splunk (2024)',
                      'Cisco – Intro to Cybersecurity (2024)',
                      'Ethical Hacking Workshop – THM/PDEU (2023)'
                    ].map((cert) => (
                      <div key={cert} className="flex items-center space-x-2 p-3 rounded border border-border/50 hover:border-cyber-blue/50 transition-colors">
                        <Award className="w-4 h-4 text-cyber-orange flex-shrink-0" />
                        <span className="text-sm">{cert}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card className="cyber-border">
                <CardHeader>
                  <CardTitle className="text-cyber-blue text-xl">Research & Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded border border-cyber-blue/20 bg-cyber-blue/5">
                      <h4 className="font-semibold text-cyber-blue mb-2">IEEE AIMV 2025 Research Presentation</h4>
                      <p className="text-muted-foreground text-sm">
                        Co-authored and presented my first research paper "Analysis and Forecasting of Sea Ice Concentration for Antarctic using Time Series",
                        demonstrating analytical skills and achieving <strong className="text-cyber-green">&gt;90% forecasting accuracy</strong> using ConvLSTM & XGBoost models.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTFs and Challenges Section */}
      <section id="ctfs" className="py-20 bg-card/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-12 text-center">
              <span className="text-cyber-blue">&lt;</span>
              CTFs & Security Challenges
              <span className="text-cyber-blue">/&gt;</span>
            </h2>

            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Capture The Flag Challenges */}
                <Card className="cyber-border">
                  <CardHeader>
                    <CardTitle className="text-cyber-green flex items-center space-x-2">
                      <Target className="w-5 h-5" />
                      <span>Capture The Flag (CTF) Platforms</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 rounded border border-cyber-green/20 bg-cyber-green/5">
                        <h4 className="font-semibold text-cyber-green mb-1">PWN.College – Linux Luminarium</h4>
                        <p className="text-sm text-muted-foreground">Binary exploitation labs and advanced Linux security challenges</p>
                      </div>
                      <div className="p-3 rounded border border-cyber-blue/20 bg-cyber-blue/5">
                        <h4 className="font-semibold text-cyber-blue mb-1">OverTheWire – Bandit</h4>
                        <p className="text-sm text-muted-foreground">Shell mastery & privilege escalation challenges</p>
                      </div>
                      <div className="p-3 rounded border border-cyber-purple/20 bg-cyber-purple/5">
                        <h4 className="font-semibold text-cyber-purple mb-1">PicoCTF</h4>
                        <p className="text-sm text-muted-foreground">Disk forensic & Linux security challenges</p>
                      </div>
                      <div className="p-3 rounded border border-cyber-orange/20 bg-cyber-orange/5">
                        <h4 className="font-semibold text-cyber-orange mb-1">TryHackMe & HackTheBox</h4>
                        <p className="text-sm text-muted-foreground">SOC operations, privilege escalation, penetration testing</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Security Training & Labs */}
                <Card className="cyber-border">
                  <CardHeader>
                    <CardTitle className="text-cyber-purple flex items-center space-x-2">
                      <Zap className="w-5 h-5" />
                      <span>Security Training & Labs</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 rounded border border-cyber-pink/20 bg-cyber-pink/5">
                        <h4 className="font-semibold text-cyber-pink mb-1">PortSwigger Web Security Academy</h4>
                        <p className="text-sm text-muted-foreground">SQLi, OS Command Injection, XXE, CSRF, Request Smuggling</p>
                      </div>
                      <div className="p-3 rounded border border-cyber-blue/20 bg-cyber-blue/5">
                        <h4 className="font-semibold text-cyber-blue mb-1">Practical Security Skills</h4>
                        <p className="text-sm text-muted-foreground">Hands-on experience with vulnerability identification and exploitation techniques</p>
                      </div>
                      <div className="p-3 rounded border border-cyber-green/20 bg-cyber-green/5">
                        <h4 className="font-semibold text-cyber-green mb-1">Continuous Learning</h4>
                        <p className="text-sm text-muted-foreground">Active participation in cybersecurity challenges to build practical skills</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-center mt-8"
              >
                <p className="text-muted-foreground text-lg">
                  <strong className="text-cyber-blue">Building practical cybersecurity skills</strong> through hands-on challenges and real-world scenarios
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-card/30">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-6 mb-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsContactModalOpen(true)}
              >
                <Mail className="w-4 h-4 mr-2" />
                Email
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="https://github.com/ShreyaTrivediGit" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="https://linkedin.com/in/shreya-trivedi" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </a>
              </Button>
            </div>
            <p className="text-muted-foreground text-sm">
              © 2025 Shreya Trivedi. Ready to start my journey in cybersecurity and make a difference.
            </p>
            <p className="text-cyber-blue font-mono text-xs mt-2">
              &lt;/portfolio&gt;
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
