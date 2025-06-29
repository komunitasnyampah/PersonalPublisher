import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  User, Download, Share2, Edit, Camera, MapPin, 
  Mail, Globe, Github, Linkedin, ExternalLink
} from "lucide-react";
import {
  AboutSection,
  ContactInfo,
  SkillsSection,
  ExperienceSection,
  EducationSection,
  ProjectsSection,
  AchievementsSection,
  RecentPostsSection
} from "@/components/cv-sections";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  
  // Profile data - in real app this would come from API/database
  const profileData = {
    // Basic Info
    fullName: "Sarah Chen",
    title: "Environmental Engineer & Sustainability Consultant",
    location: "Jakarta, Indonesia",
    email: "sarah.chen@nyampahbersama.id",
    phone: "+62 812 3456 7890",
    website: "https://sarahchen.dev",
    bio: "Passionate environmental engineer dengan 5+ tahun pengalaman dalam sustainable technology dan renewable energy solutions. Aktif dalam komunitas hijau dan advocate untuk zero waste lifestyle.",
    
    // Social Media
    social: {
      github: "https://github.com/sarahchen",
      linkedin: "https://linkedin.com/in/sarahchen-env",
      portfolio: "https://sarahchen.dev"
    },
    
    // Stats
    stats: {
      posts: 24,
      followers: 1247,
      following: 389,
      likes: 3456,
      views: 15678,
      projects: 12
    },
    
    // Experience
    experience: [
      {
        position: "Senior Environmental Consultant",
        company: "GreenTech Solutions",
        period: "2022 - Present",
        location: "Jakarta, Indonesia",
        description: "Leading environmental impact assessments dan sustainability initiatives untuk corporate clients. Managed team of 5 engineers dalam renewable energy projects."
      },
      {
        position: "Environmental Engineer",
        company: "EcoSmart Indonesia",
        period: "2020 - 2022", 
        location: "Bandung, Indonesia",
        description: "Developed waste management solutions dan renewable energy systems. Collaborated dengan government agencies untuk environmental compliance programs."
      },
      {
        position: "Junior Sustainability Analyst",
        company: "Green Future Corp",
        period: "2019 - 2020",
        location: "Surabaya, Indonesia", 
        description: "Conducted environmental research dan sustainability reporting. Assisted dalam carbon footprint analysis untuk various industries."
      }
    ],
    
    // Education
    education: [
      {
        degree: "Master of Environmental Engineering",
        institution: "Institut Teknologi Bandung",
        period: "2017 - 2019",
        location: "Bandung, Indonesia",
        gpa: "3.85/4.00"
      },
      {
        degree: "Bachelor of Chemical Engineering", 
        institution: "Universitas Indonesia",
        period: "2013 - 2017",
        location: "Depok, Indonesia",
        gpa: "3.72/4.00"
      }
    ],
    
    // Skills
    skills: {
      technical: [
        "Environmental Impact Assessment",
        "Renewable Energy Systems", 
        "Waste Management",
        "Carbon Footprint Analysis",
        "AutoCAD", 
        "MATLAB",
        "Python",
        "GIS Mapping"
      ],
      soft: [
        "Project Management",
        "Team Leadership", 
        "Public Speaking",
        "Technical Writing",
        "Cross-cultural Communication",
        "Problem Solving"
      ]
    },
    
    // Projects/Portfolio
    projects: [
      {
        title: "Solar Panel Optimization System",
        description: "Developed AI-powered solar panel positioning system yang increased efficiency by 23%",
        tech: ["Python", "Machine Learning", "IoT"],
        link: "https://github.com/sarahchen/solar-optimizer",
        image: "/api/placeholder/300/200"
      },
      {
        title: "Zero Waste Campus Initiative", 
        description: "Led university-wide program yang reduced waste by 67% dalam 6 months",
        tech: ["Project Management", "Data Analysis", "Community Outreach"],
        link: "https://zerowaste-itb.com",
        image: "/api/placeholder/300/200"
      },
      {
        title: "Carbon Tracker Mobile App",
        description: "Mobile app untuk personal carbon footprint tracking dengan 10k+ downloads",
        tech: ["React Native", "Node.js", "PostgreSQL"],
        link: "https://carbontracker.app",
        image: "/api/placeholder/300/200"
      }
    ],
    
    // Achievements
    achievements: [
      {
        title: "Young Environmental Leader Award",
        issuer: "Ministry of Environment Indonesia",
        year: "2023",
        description: "Recognition untuk outstanding contribution dalam environmental sustainability"
      },
      {
        title: "Best Innovation Award",
        issuer: "Indonesia Green Technology Conference",
        year: "2022", 
        description: "Winner untuk Solar Panel Optimization System project"
      },
      {
        title: "Certified Environmental Professional",
        issuer: "Institute of Environmental Professionals",
        year: "2021",
        description: "Professional certification dalam environmental engineering"
      }
    ],
    
    // Recent Posts/Articles
    recentPosts: [
      {
        title: "5 Cara Mudah Mengurangi Carbon Footprint di Rumah",
        date: "2024-06-25",
        views: 1234,
        likes: 89
      },
      {
        title: "Masa Depan Energi Terbarukan di Indonesia",
        date: "2024-06-20", 
        views: 2156,
        likes: 145
      },
      {
        title: "Implementasi Zero Waste Lifestyle untuk Pemula",
        date: "2024-06-15",
        views: 1876,
        likes: 112
      }
    ]
  };

  const downloadCV = () => {
    // In real app, this would generate and download PDF
    alert("CV PDF akan didownload (fitur dalam development)");
  };

  const shareProfile = () => {
    // In real app, this would copy profile URL to clipboard
    navigator.clipboard.writeText(window.location.href);
    alert("Link profil berhasil dicopy!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8" id="profile-page">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm border mb-8 overflow-hidden">
          {/* Cover Image */}
          <div className="h-48 bg-gradient-to-r from-green-400 via-blue-500 to-green-600 relative">
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="absolute top-4 right-4 flex gap-2">
              <Button onClick={shareProfile} size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
              <Button onClick={downloadCV} size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                <Download className="h-4 w-4 mr-1" />
                Download CV
              </Button>
              <Button onClick={() => setIsEditing(!isEditing)} size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
            </div>
          </div>
          
          {/* Profile Info */}
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-16">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                  <User className="h-16 w-16 text-gray-400" />
                </div>
                <button className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border hover:bg-gray-50">
                  <Camera className="h-4 w-4 text-gray-600" />
                </button>
              </div>
              
              {/* Basic Info */}
              <div className="flex-1 pt-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-1" id="profile-name">
                  {profileData.fullName}
                </h1>
                <p className="text-xl text-gray-600 mb-2" id="profile-title">
                  {profileData.title}
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {profileData.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    {profileData.email}
                  </div>
                  <div className="flex items-center gap-1">
                    <Globe className="h-4 w-4" />
                    <a href={profileData.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Portfolio
                    </a>
                  </div>
                </div>
                
                {/* Social Links */}
                <div className="flex gap-3 mb-4">
                  <a href={profileData.social.github} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                    <Github className="h-5 w-5" />
                  </a>
                  <a href={profileData.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href={profileData.social.portfolio} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{profileData.stats.posts}</p>
                    <p className="text-xs text-gray-500">Posts</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{profileData.stats.followers.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Followers</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{profileData.stats.following}</p>
                    <p className="text-xs text-gray-500">Following</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{profileData.stats.likes.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Likes</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{profileData.stats.views.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Views</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{profileData.stats.projects}</p>
                    <p className="text-xs text-gray-500">Projects</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <AboutSection bio={profileData.bio} />
            
            <ContactInfo 
              email={profileData.email}
              phone={profileData.phone}
              website={profileData.website}
              location={profileData.location}
            />

            <SkillsSection skills={profileData.skills} />

            <RecentPostsSection recentPosts={profileData.recentPosts} />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Experience */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Pengalaman Kerja
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {profileData.experience.map((exp, index) => (
                  <div key={index} className="relative">
                    {index !== profileData.experience.length - 1 && (
                      <div className="absolute left-6 top-12 bottom-0 w-px bg-gray-200"></div>
                    )}
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Briefcase className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{exp.position}</h3>
                        <p className="text-blue-600 font-medium">{exp.company}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {exp.period}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {exp.location}
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Pendidikan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {profileData.education.map((edu, index) => (
                  <div key={index} className="relative">
                    {index !== profileData.education.length - 1 && (
                      <div className="absolute left-6 top-12 bottom-0 w-px bg-gray-200"></div>
                    )}
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <GraduationCap className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{edu.degree}</h3>
                        <p className="text-blue-600 font-medium">{edu.institution}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {edu.period}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {edu.location}
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            GPA: {edu.gpa}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Projects Portfolio */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Portfolio Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {profileData.projects.map((project, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="w-full h-32 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                        <Camera className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="font-semibold mb-2">{project.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {project.tech.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm flex items-center gap-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        View Project
                      </a>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Penghargaan & Sertifikasi
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profileData.achievements.map((achievement, index) => (
                  <div key={index} className="flex gap-4 p-4 border rounded-lg">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Award className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{achievement.title}</h3>
                      <p className="text-blue-600 font-medium text-sm">{achievement.issuer}</p>
                      <p className="text-gray-500 text-sm mb-2">{achievement.year}</p>
                      <p className="text-gray-700 text-sm">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}