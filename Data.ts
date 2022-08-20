export const data = {
  meta: {
    landingPage: 'Interns',
    landingContentDescription: 'This app was was developed by Jovellabay',
  },
  landingPage: {
    featureDescriptions: [
      {
        description: 'Eassy to rate compaines',
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
      { url: '/views/user/company/auth', name: 'Company' },
      { url: '/views/user/student/auth', name: 'Student' },
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
};
