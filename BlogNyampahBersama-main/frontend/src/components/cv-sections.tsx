import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  User, Mail, Phone, Globe, MapPin, Calendar,
  Briefcase, GraduationCap, Code, Star, Trophy,
  Award, FileText, Camera, ExternalLink, Eye, Heart
} from "lucide-react";

interface ContactInfoProps {
  email: string;
  phone: string;
  website: string;
  location: string;
}

export function ContactInfo({ email, phone, website, location }: ContactInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Kontak
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-3 text-sm">
          <Mail className="h-4 w-4 text-gray-500" />
          <span>{email}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Phone className="h-4 w-4 text-gray-500" />
          <span>{phone}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Globe className="h-4 w-4 text-gray-500" />
          <a href={website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            {website}
          </a>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <MapPin className="h-4 w-4 text-gray-500" />
          <span>{location}</span>
        </div>
      </CardContent>
    </Card>
  );
}

interface AboutSectionProps {
  bio: string;
}

export function AboutSection({ bio }: AboutSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Tentang Saya
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 text-sm leading-relaxed">{bio}</p>
      </CardContent>
    </Card>
  );
}

interface SkillsSectionProps {
  skills: {
    technical: string[];
    soft: string[];
  };
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="h-5 w-5" />
          Keahlian
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium text-sm mb-2">Technical Skills</h4>
          <div className="flex flex-wrap gap-1">
            {skills.technical.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-medium text-sm mb-2">Soft Skills</h4>
          <div className="flex flex-wrap gap-1">
            {skills.soft.map((skill, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface ExperienceItem {
  position: string;
  company: string;
  period: string;
  location: string;
  description: string;
}

interface ExperienceSectionProps {
  experience: ExperienceItem[];
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="h-5 w-5" />
          Pengalaman Kerja
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {experience.map((exp, index) => (
          <div key={index} className="relative">
            {index !== experience.length - 1 && (
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
  );
}

interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  location: string;
  gpa: string;
}

interface EducationSectionProps {
  education: EducationItem[];
}

export function EducationSection({ education }: EducationSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5" />
          Pendidikan
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {education.map((edu, index) => (
          <div key={index} className="relative">
            {index !== education.length - 1 && (
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
  );
}

interface ProjectItem {
  title: string;
  description: string;
  tech: string[];
  link: string;
  image: string;
}

interface ProjectsSectionProps {
  projects: ProjectItem[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5" />
          Portfolio Projects
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
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
  );
}

interface AchievementItem {
  title: string;
  issuer: string;
  year: string;
  description: string;
}

interface AchievementsSectionProps {
  achievements: AchievementItem[];
}

export function AchievementsSection({ achievements }: AchievementsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5" />
          Penghargaan & Sertifikasi
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {achievements.map((achievement, index) => (
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
  );
}

interface RecentPostItem {
  title: string;
  date: string;
  views: number;
  likes: number;
}

interface RecentPostsSectionProps {
  recentPosts: RecentPostItem[];
}

export function RecentPostsSection({ recentPosts }: RecentPostsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Post Terbaru
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {recentPosts.map((post, index) => (
          <div key={index} className="border-l-2 border-green-200 pl-3">
            <h4 className="font-medium text-sm hover:text-blue-600 cursor-pointer">
              {post.title}
            </h4>
            <p className="text-xs text-gray-500 mb-1">{post.date}</p>
            <div className="flex gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {post.views}
              </span>
              <span className="flex items-center gap-1">
                <Heart className="h-3 w-3" />
                {post.likes}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}