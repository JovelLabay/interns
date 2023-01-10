export const data = {
  meta: {
    landingPage: 'Interns',
    landingContentDescription: 'This app was was developed by Jovellabay',
  },
  landingPage: {
    featureDescriptions: [
      {
        description: 'Easy to rate compaines',
        iconName: 'VscGraph',
      },
      {
        description: 'Fast and suited jobs for you',
        iconName: 'FiPlayCircle',
      },
      {
        description: 'Bring home the real experience',
        iconName: 'BiShoppingBag',
      },
      {
        description: 'Be confident and now to learn',
        iconName: 'MdOutlinePerson',
      },
    ],
  },
  links: {
    linkMenu: [
      {
        name: 'Home',
        link: '/',
      },
      {
        name: 'Services',
        link: '/views/welcome/service',
      },
      {
        name: 'Learn More',
        link: '/views/welcome/about',
      },
    ],
  },
  headerButtons: {
    headButtons: [
      { url: '/views/user/company/dashboard', name: 'Company' },
      { url: '/views/user/student/dashboard', name: 'Student' },
    ],
  },
  footerLinks: [
    {
      footerTitle: 'Services',
      footerLinks: ['Internships', 'Students', 'Experiences'],
    },
    {
      footerTitle: 'About',
      footerLinks: ['Learn More', 'Contact Us'],
    },
  ],
  footerSocials: {
    reserves: 'All rights reserved',
    address: 'Cagayan de Oro City, Philippines',
  },
  services: [
    {
      id: 1,
      description:
        'Students and interns can use the app in a way where they have the most suited hub for internship programs in which field they belong too.',
    },
    {
      id: 2,
      description:
        'Use and navigate using the app and find the most suited internship programs that you’d like the most where top companies are waiting for you.',
    },
    {
      id: 3,
      description:
        'We would be proud that students and interns have been able to complete the required hours to be deployed in a real-world situation.',
    },
  ],
  aboutDescriptions: [
    {
      id: 1,
      title: 'Trust',
      description:
        'Live your trust with us,  for us to help you find your most suited internship.',
    },
    {
      id: 2,
      title: 'Easy',
      description: 'Easy to customize and filter internships just for you.',
    },
    {
      id: 3,
      title: 'Account',
      description: 'Your accounts will be safe with us.',
    },
  ],
  cookieBanner: {
    title: 'We just want to know if what type of user are you?',
    description:
      'Clicking either of the options below means you agree to the terms and conditions imposed in this software.',
    options: ['Company', 'Student'],
  },
  others: {
    developers: 'Developed by Eluvent Corporation',
  },

  // COMPANY DASHBOARD
  company: {
    questionnaireType: [
      { id: 101, name: 'Select' },
      { id: 1, name: 'Essay' },
      { id: 2, name: 'Multiple Choice' },
      { id: 3, name: 'True or False' },
    ],
  },
  admin: {
    tabs: [
      { id: 1, name: 'Student' },
      { id: 2, name: 'Companies' },
      { id: 3, name: 'Template Forms' },
      { id: 4, name: 'Professionals' },
      { id: 5, name: 'Activity Logs' },
    ],
    companyApplicationStatus: [
      { id: 1, name: 'Approved' },
      { id: 2, name: 'Pending' },
      { id: 3, name: 'Rejected' },
      { id: 4, name: 'To Be Reviewed' },
    ],
    collegeDeanProfession: [
      { id: 101, name: 'Select' },
      { id: 1, name: 'Artist' },
      { id: 2, name: 'Accountant' },
      { id: 3, name: 'Lawyer' },
      { id: 4, name: 'Engineer' },
      { id: 5, name: 'Physician' },
      { id: 6, name: 'Teacher' },
    ],
    collegeType: [
      { id: 101, name: 'Select' },
      { id: 1, name: 'College' },
      { id: 2, name: 'School' },
    ],
  },
  networkProvider: [
    { id: 1, name: 'Globe' },
    { id: 2, name: 'Smart' },
    { id: 3, name: 'Sun' },
    { id: 4, name: 'TNT' },
    { id: 5, name: 'TM' },
    { id: 6, name: 'Dito' },
  ],
  companyDashboardMenu: [
    { id: 1, name: 'Home' },
    { id: 2, name: 'Interns' },
    { id: 3, name: 'Internship Programs' },
    { id: 4, name: 'Applicants' },
  ],
  schoolDashBoardHeaderManageUsers: [
    { id: 1, name: 'Add User' },
    { id: 2, name: 'View Users' },
  ],
  formTemplates: [
    { id: 1, name: 'Waiver', completeName: 'Waiver Form' },
    { id: 2, name: 'LOI', completeName: 'Letter of Intent' },
    { id: 3, name: 'MOA', completeName: 'Memorandum of Agreement' },
  ],
  gender: [
    { id: 1, name: 'Male' },
    { id: 2, name: 'Female' },
    { id: 3, name: 'Other' },
    { id: 4, name: 'Prefer not to say' },
  ],
  colors: [
    { id: 1, name: 'red' },
    { id: 2, name: 'blue' },
    { id: 3, name: 'green' },
    { id: 4, name: 'yellow' },
    { id: 5, name: 'orange' },
    { id: 6, name: 'purple' },
    { id: 7, name: 'pink' },
    { id: 8, name: 'brown' },
    { id: 9, name: 'grey' },
    { id: 10, name: 'black' },
  ],
  months: [
    { id: 101, name: 'MM' },
    { id: 1, name: 'Jan' },
    { id: 2, name: 'Feb' },
    { id: 3, name: 'Mar' },
    { id: 4, name: 'Apr' },
    { id: 5, name: 'May' },
    { id: 6, name: 'Jun' },
    { id: 7, name: 'Jul' },
    { id: 8, name: 'Aug' },
    { id: 9, name: 'Sept' },
    { id: 10, name: 'Oct' },
    { id: 11, name: 'Nov' },
    { id: 12, name: 'Dec' },
  ],
  days: [
    { id: 101, name: 'DD' },
    { id: 1, name: '01' },
    { id: 2, name: '02' },
    { id: 3, name: '03' },
    { id: 4, name: '04' },
    { id: 5, name: '05' },
    { id: 6, name: '06' },
    { id: 7, name: '07' },
    { id: 8, name: '08' },
    { id: 9, name: '09' },
    { id: 10, name: '10' },
    { id: 11, name: '11' },
    { id: 12, name: '12' },
    { id: 13, name: '13' },
    { id: 14, name: '14' },
    { id: 15, name: '15' },
    { id: 16, name: '16' },
    { id: 17, name: '17' },
    { id: 18, name: '18' },
    { id: 19, name: '19' },
    { id: 20, name: '20' },
    { id: 21, name: '21' },
    { id: 22, name: '22' },
    { id: 23, name: '23' },
    { id: 24, name: '24' },
    { id: 25, name: '25' },
    { id: 26, name: '26' },
    { id: 27, name: '27' },
    { id: 28, name: '28' },
    { id: 29, name: '29' },
    { id: 30, name: '30' },
    { id: 31, name: '31' },
  ],
  years: [
    { id: 101, name: 'YYYY' },
    { id: 25, name: '2023' },
    { id: 23, name: '2022' },
    { id: 1, name: '2021' },
    { id: 2, name: '2020' },
    { id: 3, name: '2019' },
    { id: 4, name: '2018' },
    { id: 5, name: '2017' },
    { id: 6, name: '2016' },
    { id: 7, name: '2015' },
    { id: 8, name: '2014' },
    { id: 9, name: '2013' },
    { id: 10, name: '2012' },
    { id: 11, name: '2011' },
    { id: 12, name: '2010' },
    { id: 13, name: '2009' },
    { id: 14, name: '2008' },
    { id: 15, name: '2007' },
    { id: 16, name: '2006' },
    { id: 17, name: '2005' },
    { id: 18, name: '2004' },
    { id: 19, name: '2003' },
    { id: 20, name: '2002' },
    { id: 21, name: '2001' },
    { id: 22, name: '2000' },
  ],

  // STUDENT DASHBOARD
  navigationLinks: [
    {
      id: 1,
      name: 'Saved Companies',
      path: 'savedCompanies',
      slug: '/views/user/student/savedCompanies',
    },
    {
      id: 2,
      name: 'Account Preferences',
      path: 'accountPreferences',
      slug: '/views/user/student/accountPreferences',
    },
    {
      id: 3,
      name: 'Coversations',
      path: 'coversations',
      slug: '/views/user/student/others/savedCompanies',
    },
    {
      id: 4,
      name: 'Theme',
      path: 'theme',
      slug: '/views/user/student/others/savedCompanies',
    },
    {
      id: 5,
      name: 'Exit Interns',
      path: 'exitInterns',
      slug: '/views/user/student/others/savedCompanies',
    },
  ],
  dashboardMenu: [
    { id: 1, name: 'Find Internships' },
    { id: 2, name: 'View Companies' },
  ],
  listFilter: [
    { id: 1, filterName: 'All' },
    { id: 2, filterName: 'Urgent' },
    { id: 3, filterName: 'Environemnt | On-site' },
    { id: 4, filterName: 'With Allowance' },
  ],

  backRoute: '/views/user/student/dashboard',
  internshipsRoute: '/views/user/student/internships/',
  companiesRoute: '/views/user/student/dashboard',

  // ACCOUNT PREFERENCES TABS
  accountPreferencesTabs: [
    { id: 1, name: 'Details' },
    { id: 2, name: 'Forms' },
    { id: 3, name: 'Documents' },
  ],
};
