/**
 * Single Source of Truth for portfolio content.
 *
 * Every fact in this file comes from Prajwal Y Jain's actual resume or
 * verified GitHub repositories. Do NOT add unverified claims, statistics,
 * links, or placeholder values here.
 */

export const personal = {
  name: 'Prajwal Y Jain',
  displayName: 'PRAJWAL Y JAIN',
  email: 'prajuyjain2204as@gmail.com',
  phone: '+91 74836 25561',
  phoneHref: 'tel:+917483625561',
  tagline: 'AI & Data Science Undergraduate',
  headline: 'Computer Science undergraduate focused on Applied AI & Data Science',
  githubUsername: 'Prajwal0422',
  resumeUrl: '/assets/Prajwal_Y_Jain-Resume.pdf',
  resumeFilename: 'Prajwal_Y_Jain-Resume.pdf',
};

export const socialLinks = {
  github: 'https://github.com/Prajwal0422',
  linkedin: 'https://linkedin.com/in/prajwal-y-jain',
  email: 'mailto:prajuyjain2204as@gmail.com',
  phone: 'tel:+917483625561',
  // Instagram intentionally omitted — no verified profile provided.
};

export const about = {
  summary:
    'Computer Science undergraduate with a strong interest in applied Artificial Intelligence and Data Science, focused on building AI-enabled software systems. Hands-on academic project experience with Python, basic machine learning, and NLP components — from data preparation to model training. Motivated by software engineering and problem-solving, and eager to grow through practical AI integration in real-world systems.',
};

export const education = {
  degree: 'Bachelor of Engineering in Computer Science (AI & Data Science)',
  university: 'Visvesvaraya Technological University (VTU)',
  location: 'Karnataka, India',
  completion: 'Expected 2026',
  cgpa: '8.6',
  cgpaScale: '10',
  cgpaPeriod: 'Till 6th Semester',
};

/**
 * Skill levels are qualitative and honest:
 *  - 'Academic'          = learned and applied in academic projects
 *  - 'Working Knowledge' = comfortable applying with guidance
 *  - 'Beginner'          = early familiarity
 * `barWidth` is a purely visual weight and does NOT imply mastery.
 */
export const skills = [
  {
    category: 'Programming',
    items: [
      { name: 'Python', level: 'Working Knowledge', barWidth: 75 },
      { name: 'C', level: 'Academic', barWidth: 60 },
      { name: 'Java', level: 'Academic', barWidth: 55 },
      { name: 'JavaScript', level: 'Beginner', barWidth: 40 },
    ],
  },
  {
    category: 'Data Handling',
    items: [
      { name: 'Data Cleaning', level: 'Working Knowledge', barWidth: 70 },
      { name: 'Dataset Preparation', level: 'Working Knowledge', barWidth: 70 },
      { name: 'Basic EDA', level: 'Working Knowledge', barWidth: 65 },
    ],
  },
  {
    category: 'Predictive Modeling',
    items: [
      { name: 'Regression Concepts', level: 'Academic', barWidth: 60 },
      { name: 'Classification Concepts', level: 'Academic', barWidth: 60 },
    ],
  },
  {
    category: 'NLP',
    items: [
      { name: 'Text Preprocessing', level: 'Academic', barWidth: 65 },
      { name: 'Intent Recognition', level: 'Academic', barWidth: 60 },
    ],
  },
  {
    category: 'AI Models',
    items: [
      { name: 'ClinicalBERT', level: 'Academic', barWidth: 55 },
      { name: 'EfficientNet-B4', level: 'Academic', barWidth: 55 },
    ],
  },
  {
    category: 'Libraries',
    items: [
      { name: 'NumPy', level: 'Working Knowledge', barWidth: 70 },
      { name: 'Pandas', level: 'Working Knowledge', barWidth: 70 },
      { name: 'Scikit-learn', level: 'Working Knowledge', barWidth: 70 },
      { name: 'Matplotlib', level: 'Working Knowledge', barWidth: 65 },
    ],
  },
  {
    category: 'Tools',
    items: [
      { name: 'Git', level: 'Working Knowledge', barWidth: 65 },
      { name: 'GitHub', level: 'Working Knowledge', barWidth: 65 },
      { name: 'Jupyter Notebook', level: 'Working Knowledge', barWidth: 70 },
    ],
  },
  {
    category: 'Web',
    items: [
      { name: 'HTML', level: 'Beginner', barWidth: 50 },
      { name: 'CSS', level: 'Beginner', barWidth: 50 },
    ],
  },
];

/**
 * Curated featured projects. All details are taken from the resume and
 * verified GitHub repositories — nothing invented.
 * `githubUrl` is null when no verified public repository exists.
 */
export const featuredProjects = [
  {
    id: 'featured-blockchain-ai-healthcare',
    name: 'AI-Powered Blockchain-Based Healthcare Prediction System',
    flagship: true,
    description:
      'Planned a healthcare system with three functional modules combining AI prediction and blockchain-based record management.',
    highlights: [
      'Three functional modules for the healthcare workflow',
      'ClinicalBERT used to analyze over 200 clinical text records',
      'EfficientNet-B4 for medical image classification',
      'Blockchain-based record verification using Ethereum concepts',
      'Encrypted off-chain storage using MongoDB',
    ],
    tech: ['ClinicalBERT', 'EfficientNet-B4', 'Ethereum', 'MongoDB'],
    githubUrl:
      'https://github.com/Prajwal0422/Blockchain-and-AI-healthcare-management-system',
    homepage: null,
  },
  {
    id: 'featured-law-assistant',
    name: 'Personal Law Assistant (AI Chatbot)',
    flagship: false,
    description:
      'AI chatbot that answers personal law queries using NLP-based intent classification and text preprocessing.',
    highlights: [
      'Handles 20+ personal law query variations',
      'NLP-based intent classification',
      'Text preprocessing pipeline',
      'Tested across multiple scenarios',
    ],
    tech: ['Python', 'NLP', 'Intent Classification'],
    githubUrl: null, // No verified public repository available
    homepage: null,
  },
  {
    id: 'featured-student-performance',
    name: 'Student Performance Prediction',
    flagship: false,
    description:
      'Regression-based model that estimates student performance from structured academic datasets.',
    highlights: [
      'Regression-based performance estimation',
      'Structured academic datasets',
      'Training and validation workflow',
      'Data cleaning and basic exploratory analysis',
    ],
    tech: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib'],
    githubUrl:
      'https://github.com/Prajwal0422/Student%20Performance',
    homepage: null,
  },
];

export const internship = {
  role: 'Artificial Intelligence Intern',
  company: 'CODSOFT',
  mode: 'Virtual',
  // Dates intentionally omitted — no verified dates available.
  duration: null,
  achievements: [
    'Completed five guided artificial intelligence and machine learning tasks',
    'Executed two predictive models using Python under structured guidance',
    'Practiced data preprocessing and model execution workflows',
  ],
};

export const publication = {
  title: 'Blockchain & AI-Powered Healthcare Management System',
  journal: 'International Journal of Innovative Research in Technology (IJIRT)',
  volume: '12',
  issue: '8',
  date: 'January 2026',
  issn: '2349-6002',
  // No verified paper URL available — the UI must not invent one.
  link: null,
};

/**
 * Verified certifications. `image` is reserved for certificate images that
 * will be uploaded later — the UI must gracefully handle `image: null`.
 */
export const certifications = [
  {
    title: 'Introduction to Programming in C',
    issuer: 'NPTEL',
    date: null,
    image: null,
    verificationUrl: null,
    description: 'Foundational programming course in C covering problem solving and core programming concepts.',
  },
  {
    title: 'The Joy of Computing Using Python',
    issuer: 'NPTEL',
    date: null,
    image: null,
    verificationUrl: null,
    description: 'Python programming course covering practical computing and problem solving.',
  },
  {
    title: 'Artificial Intelligence Internship',
    issuer: 'CODSOFT',
    date: null,
    image: null,
    verificationUrl: null,
    description: 'Virtual AI internship with guided machine learning tasks and predictive modeling.',
  },
  {
    title: 'Artificial Intelligence Training',
    issuer: 'Codec Technologies',
    date: null,
    image: null,
    verificationUrl: null,
    description: 'Online artificial intelligence training program.',
  },
];

/** Navigation anchors — must match the section ids rendered in Act 3. */
export const navigation = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Education', id: 'education' },
  { label: 'Projects', id: 'projects' },
  { label: 'Skills', id: 'skills' },
  { label: 'Experience', id: 'experience' },
  { label: 'Publications', id: 'publication' },
  { label: 'Certifications', id: 'certifications' },
  { label: 'Contact', id: 'contact' },
];

const portfolioData = {
  personal,
  socialLinks,
  about,
  education,
  skills,
  featuredProjects,
  internship,
  publication,
  certifications,
  navigation,
};

export default portfolioData;
