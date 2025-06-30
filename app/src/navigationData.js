// Navigation data structure
const navigationData = {
  projects: [
    { title: 'Time Machine: Live Online', path: '/projects/time-machine' },
    { 
      title: 'LUV', 
      path: '/projects/luv', 
      id: 'luv',
      LUVProjects: [
        // { title: 'Elections Ontario', path: '/projects/luv/elections-ontario', id: 'elections-ontario' },
        // { title: 'CampKazoo', path: '/projects/luv/camp-kazoo' },
        // { title: 'Aquazette', path: '/projects/luv/aquazette' },
        // { title: 'Morgane et ses organes', path: '/projects/luv/morgane-et-ses-organes' },
        // { title: 'Time Machine', path: '/projects/luv/time-machine' }
      ]
    },
    { title: 'The Self', path: '/projects/the-self' },
    // { title: 'Shiny Talking People', path: '/products/shiny-talking-people' },
    { title: 'Exos', path: '/projects/exos' },
    { title: 'Invitame a la Playa', path: '/projects/invitame-a-la-playa' }
  ],
  lab: [
    { title: 'Current Experiments', path: '/lab/experiments' },
    { title: 'Research & Development', path: '/lab/research' },
    { title: 'Prototypes', path: '/lab/prototypes' },
    { title: 'Open Source', path: '/lab/open-source' }
  ],
  about: [
    // { title: 'Studio Overview', path: '/about' },
    { title: 'Our Team', path: '/about/team',
      members: [{ title: 'Béa', path: '/about/team/bea' },
        { title: 'Ed', path: '/about/team/ed' }
      ]},
    ,
    { title: 'Contact', path: '/contact' }
  ]
};

const fullNavigationData = {
  projects: [
    { title: 'Time Machine: Live Online', path: '/projects/time-machine' },
    {
      title: 'LUV',
      path: '/projects/luv',
      id: 'luv',
      LUVProjects: [
        { title: 'Elections Ontario', path: '/projects/luv/elections-ontario', id: 'elections-ontario' },
        { title: 'CampKazoo', path: '/projects/luv/camp-kazoo' },
        { title: 'Aquazette', path: '/projects/luv/aquazette' },
        { title: 'Morgane et ses organes', path: '/projects/luv/morgane-et-ses-organes' },
        { title: 'Time Machine', path: '/projects/luv/time-machine' }
      ]
    },
    { title: 'The Self', path: '/projects/the-self' },
    { title: 'Shiny Talking People', path: '/products/shiny-talking-people' },
    { title: 'Exos', path: '/projects/exos' },
    { title: 'Invitame a la Playa', path: '/projects/invitame-a-la-playa' }
  ],
  lab: [
    { title: 'Current Experiments', path: '/lab/experiments' },
    { title: 'Research & Development', path: '/lab/research' },
    { title: 'Prototypes', path: '/lab/prototypes' },
    { title: 'Open Source', path: '/lab/open-source' }
  ],
  about: [
    // { title: 'Studio Overview', path: '/about' },
    {
      title: 'Our Team', path: '/about/team',
      members: [{ title: 'Béa', path: '/about/team/bea' },
      { title: 'Ed', path: '/about/team/ed' }
      ]
    },
    ,
    { title: 'Contact', path: '/contact' }
  ]
};

const currentNavigationData = navigationData;

export { navigationData, fullNavigationData, currentNavigationData };