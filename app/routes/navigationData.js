// Navigation data structure
export const navigationData = {
  projects: [
    { 
      title: 'Luv - Laboratoire d\'univers Virtuels', 
      path: '/products/luv', 
      id: 'luv',
      subItems: [
        { title: 'Elections Ontario', path: '/products/luv/elections-ontario', id: 'elections-ontario' },
        { title: 'CampKazoo', path: '/products/luv/camp-kazoo' },
        { title: 'Aquazette', path: '/products/luv/aquazette' },
        { title: 'Morgane et ses organes', path: '/products/luv/morgane-et-ses-organes' },
        { title: 'Time Machine', path: '/products/luv/time-machine' }
      ]
    },
    { title: 'The Self', path: '/products/the-self' },
    { title: 'Shiny Talking People', path: '/products/shiny-talking-people' },
    { title: 'Exos', path: '/products/exos' },
    { title: 'Invitame a la Playa', path: '/products/invitame-a-la-playa' }
  ],
  lab: [
    { title: 'Current Experiments', path: '/lab/experiments' },
    { title: 'Research & Development', path: '/lab/research' },
    { title: 'Prototypes', path: '/lab/prototypes' },
    { title: 'Open Source', path: '/lab/open-source' }
  ],
  about: [
    { title: 'Studio Overview', path: '/about' },
    { title: 'Our Team', path: '/about/team' },
    { title: 'Béa - Founder/Producer', path: '/about/team/bea' },
    { title: 'Ed - Creative Director', path: '/about/team/ed' },
    { title: 'Contact', path: '/contact' }
  ]
};