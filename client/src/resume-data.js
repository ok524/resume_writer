const Resume = {
  jobAds: {
    link: null
  },
  header: {
    name: null,
    email: null,
    phone: null,
    github: null,
    linkedin: null,
    address: null,
    website: null
  },
  objectives: {
    objective: null
  },
  resumetitle: null,
  education: [
    {
      institutionName: null,
      startDate: null,
      endDate: null,
      educationLevel: null,
      speciality: null,
      isVisible: true
    }
  ],
  experience: [
    {
      position: null,
      company: null,
      startDate: null,
      endDate: null,
      achievements: [''],
      isVisible: true
    }
  ],
  technicalSkills: [
    {
      category: 'Development Languages',
      keywords: [
        { name: null, level: 5 }
      ],
      isVisible: true,
    },
    {
      category: 'Technologies',
      keywords: [
        { name: null, level: 5 }
      ],
      isVisible: true,
    },
  ]
};

export default Resume;