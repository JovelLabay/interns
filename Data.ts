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
        'We would be proud that students and interns have able to complete the required hours to be deployed in the real world situation.',
    },
  ],
  aboutDescriptions: [
    {
      id: 1,
      title: 'Trust',
      description: 'Live your trust with for you to help find internships.',
    },
    {
      id: 2,
      title: 'Easy',
      description: 'Easy to customize and filter internhips just for you.',
    },
    {
      id: 3,
      title: 'Account',
      description: 'Your accounts will be safe with us.',
    },
  ],
  // COOKIE BANNER
  cookieBanner: {
    title: 'We just want to know if what type of user are you?',
    description:
      'Clicking either the options below means you aggreed to the terms and condition impost in this software.',
    options: ['Company', 'Student'],
  },
  // DASHBOARD (COMPANY, STUDENT , ADMIN)
  admin: {
    tabs: [
      { id: 1, name: 'Student' },
      { id: 2, name: 'Companies' },
      { id: 3, name: 'Type of Company' },
      { id: 4, name: 'Professionals' },
    ],
    colleges: [
      { id: 1, name: 'Agriculture', category: 'College' },
      { id: 2, name: 'Arts and Sciences', category: 'College' },
      { id: 3, name: 'Computer Studes', category: 'College' },
      { id: 4, name: 'Engineering', category: 'College' },
      { id: 5, name: 'Nursing', category: 'College' },
      { id: 6, name: 'Business and Management', category: 'School' },
      { id: 7, name: 'Education', category: 'School' },
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
    { id: 3, name: 'Applicants' },
    { id: 4, name: 'Internship Programs' },
    { id: 5, name: 'Students' },
  ],
  schoolDashBoardHeaderManageUsers: [
    { id: 1, name: 'Add User' },
    { id: 2, name: 'View Users' },
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
  // create an array of years from 1900 to current year
  years: [
    { id: 101, name: 'YYYY' },
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
    { id: 23, name: '1999' },
  ],
  typeOfCompany: [
    { id: 101, name: 'Select' },
    { id: 1, name: 'IT' },
    { id: 2, name: 'Business' },
    { id: 3, name: 'Engineering' },
    { id: 4, name: 'Education' },
    { id: 5, name: 'Agriculture' },
  ],
  locationOfCompany: [
    { id: 101, name: 'Select' },
    { id: 1, name: 'Cagayan de Oro City' },
  ],
};
