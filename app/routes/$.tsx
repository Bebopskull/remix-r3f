// app/routes/$.tsx - Catch-all route for all pages
import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  // Validate that the route exists in your content map
  const validRoutes = [
    '/',
    '/products',
    '/products/time-machine',
    '/products/luv',
    '/products/elections-ontario',
    '/products/camp-kazoo',
    '/products/aquazette',
    '/products/morgane-et-ses-organes',
    '/products/the-self',
    '/products/shiny-talking-people',
    '/products/exos',
    '/products/invitame-a-la-playa',
    '/lab',
    '/about',
    '/about/team',
    '/about/team/bea',
    '/about/team/ed'
  ];
  
  // If route doesn't exist, throw 404
  if (!validRoutes.includes(pathname)) {
    throw new Response("Not Found", { status: 404 });
  }
  
  return json({ 
    pathname,
    timestamp: new Date().toISOString()
  });
};

export const meta: MetaFunction = ({ data, location }) => {
  const pathname = location.pathname;
  
  // Comprehensive meta data for all routes
  const getPageInfo = (path: string) => {
    const routes = {
      '/': {
        title: "nikai.xyz - Digital Experiences & Virtual Universes",
        description: "We create innovative digital experiences and virtual universes",
      },
      '/products': {
        title: "Products - nikai.xyz",
        description: "Our portfolio of digital products and experiences",
      },
      '/products/time-machine': {
        title: "Time Machine - nikai.xyz",
        description: "Interactive temporal experience design",
      },
      '/products/luv': {
        title: "Luv - Laboratoire d'univers Virtuels - nikai.xyz",
        description: "Virtual universe laboratory for immersive experiences",
      },
      '/products/elections-ontario': {
        title: "Elections Ontario - nikai.xyz",
        description: "Interactive electoral information system",
      },
      '/products/camp-kazoo': {
        title: "CampKazoo - nikai.xyz",
        description: "Virtual camp experience platform",
      },
      '/products/aquazette': {
        title: "Aquazette - nikai.xyz",
        description: "Aquatic-themed digital experience",
      },
      '/products/morgane-et-ses-organes': {
        title: "Morgane et ses organes - nikai.xyz",
        description: "Interactive anatomical experience",
      },
      '/products/the-self': {
        title: "The Self - nikai.xyz",
        description: "Introspective digital experience",
      },
      '/products/shiny-talking-people': {
        title: "Shiny Talking People - nikai.xyz",
        description: "Social interaction digital experience",
      },
      '/products/exos': {
        title: "Exos - nikai.xyz",
        description: "External systems exploration",
      },
      '/products/invitame-a-la-playa': {
        title: "Invitame a la Playa - nikai.xyz",
        description: "Beach-themed virtual experience",
      },
      '/lab': {
        title: "Lab - nikai.xyz",
        description: "Research and development playground",
      },
      '/about': {
        title: "About - nikai.xyz",
        description: "About our team and studio",
      },
      '/about/team': {
        title: "Team - nikai.xyz",
        description: "Meet our creative team",
      },
      '/about/team/bea': {
        title: "Béa - Founder & Producer - nikai.xyz",
        description: "Meet Béa, Founder, Producer and Developer at nikai.xyz",
      },
      '/about/team/ed': {
        title: "Ed - Creative Director - nikai.xyz",
        description: "Meet Ed, Creative Director and Developer at nikai.xyz",
      },
    };
    
    return routes[path] || routes['/'];
  };

  const { title, description } = getPageInfo(pathname);
  
  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: `https://nikai.xyz${pathname}` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];
};

// Return null since all 3D content is handled by ContentManager
export default function CatchAllRoute() {
  return null;
}