import type { CaseStudySection, CaseStudyStats } from './projects'

// Content sourced from the Printivo case study in the portfolio presentation.
// Image slots use placeholders until the Figma exports are dropped into
// public/images/projects/printivo/.

export const printivoCaseStudy: CaseStudySection[] = [
  {
    kicker: 'The Problem',
    heading: 'Customers stopped ordering — and we could not figure out why',
    body: [
      'Customer feedback had turned into a stream of complaints, and analytics confirmed the pain: an 89.3% bounce rate, the highest the platform had ever seen. New and existing customers simply did not like ordering via the website.',
    ],
    bullets: [
      'Lower sales coming from the website',
      'An 89.3% bounce rate in Google Analytics',
      'A ton of negative feedback from platform users',
      'Platform problems spiralling into missed delivery promises',
    ],
  },
  {
    kicker: 'Role & Approach',
    heading: 'Lead product designer, embedded with every customer-facing team',
    body: [
      'I started by jumping on calls with marketing, customer care and the tech department to understand what they had been dealing with — positive and negative feedback alike. Marketing gave me a list of frequent customers to interview, with a ₦2,000 coupon approved as a thank-you for participants.',
      'The team: one product designer (me), one product manager, two front-end and two back-end developers. The project ran roughly fourteen weeks — discovery, internal and user research, a UX audit of the existing platform, user flows, explorations, and high-fidelity design alongside the developers.',
    ],
  },
  {
    kicker: 'Research',
    heading: 'Video interviews with everyone — staff and customers',
    body: [
      'Fourteen customers were interviewed in total: eight frequent customers from the marketing team’s list and six volunteers recruited from social media, whom I also observed completing real orders while thinking out loud. Internally, support kept fielding calls asking for information already on the site, and tech kept fixing orders submitted without print files.',
    ],
    bullets: [
      'Users want to know if Printivo can create designs for them, and what that entails',
      'Users want clear details on each product',
      'The homepage is too busy to navigate',
      'Search returns the wrong results',
      'Customers phone in orders and send files via WhatsApp',
      'Orders keep being placed without print files',
    ],
  },
  {
    kicker: 'Goals',
    heading: 'Well-defined goals for business and customers',
    body: [
      'The UX audit was compiled into goals with the Printivo team. For the business: increase conversion, reduce churn and bounce, and improve customer satisfaction. For customers: quicker task completion, less frustration, and a more intuitive way of finding relevant information. Improving delivery speed became an off-platform workstream of its own.',
    ],
  },
  {
    kicker: 'Sketches',
    heading: 'Letting go of the old layout',
    body: [
      'I grabbed my iPad and explored rough sketches for the landing page. Initially I did not want to deviate too far from the existing design — then I let go of that constraint and experimented with a minimalistic approach.',
    ],
    image: {
      src: '/images/projects/printivo/sketches.svg',
      alt: 'Early iPad sketches of the Printivo landing page',
      caption: 'Rough landing-page sketches — replace with the sketch exports from Figma.',
    },
  },
  {
    kicker: 'The Redesign',
    heading: 'A search-first, decluttered experience end to end',
    body: [
      'The homepage was rebuilt around the way customers actually shop: clutter removed, search made the obvious entry point, and popular products and categories clearly defined instead of dead links. Category and product pages surface the details customers kept phoning in about — materials, finishing, delivery windows and per-quantity pricing.',
      'Sign-in became a modal so the ordering flow is never broken, and checkout was rebuilt as a guided, minimal sequence — customer info, shipping, payment, success — with the cost breakdown always visible.',
    ],
    image: {
      src: '/images/projects/printivo/homepage.svg',
      alt: 'Old Printivo homepage beside the redesigned homepage',
      caption: 'Old vs new homepage — replace with the before/after exports from Figma.',
    },
  },
  {
    kicker: 'Design System',
    heading: 'A design system built alongside the developers',
    body: [
      'A few pages into high fidelity, the core components were already defined and documented — colour primitives, type ramp, cards, modals and forms — so development could move in parallel and the design could scale after handoff.',
    ],
    image: {
      src: '/images/projects/printivo/design-system.svg',
      alt: 'Printivo style guide components',
      caption: 'Style-guide basics — replace with the design-system export from Figma.',
    },
  },
]

export const printivoStats: CaseStudyStats = {
  beforeLabel: 'Before redesign',
  afterLabel: 'After redesign',
  before: [
    'Average monthly users: 198',
    'Monthly new users: 194',
    'Average page views per session: 7.06s',
    'Bounce rate: 71.6% – 89.3%',
  ],
  after: [
    'Average monthly users grew by 580%',
    'Monthly new users grew by 160.08%',
    'Average session time grew by 2min 7secs',
    'Bounce rate reduced to 10.72%',
  ],
}
