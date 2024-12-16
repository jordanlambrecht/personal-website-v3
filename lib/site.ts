export type SiteConfig = typeof siteConfig

export type NavItem = {
  label: string
  href: string
}

export const siteConfig = {
  name: 'Next.js + NextUI',
  description: 'Make beautiful websites regardless of your design experience.',
  navItems: [
    {
      label: 'Home',
      path: '/',
    },
    {
      label: 'About',
      path: '/about',
    },
    {
      label: 'Pixel Bakery',
      path: '/pixel-bakery',
    },
    {
      label: 'Lists',
      path: '/lists',
    },
    {
      label: 'Product Design',
      path: '/product-design',
    },
    {
      label: 'Other Projects',
      path: '/other-projects',
    },
  ],
  navMenuItems: [
    {
      label: 'Profile',
      path: '/profile',
    },
    {
      label: 'Dashboard',
      path: '/dashboard',
    },
    {
      label: 'Projects',
      path: '/projects',
    },
  ],
  // links: {
  //   github: 'https://github.com/nextui-org/nextui',
  //   instagram: 'https://'
  // },
}
