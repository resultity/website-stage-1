// app/routes.ts
export const ROUTES = {
  home: { href: '/', external: false },
  nodeInstall: { href: '/node/install', external: false },
  blog: { href: 'https://medium.com/@resultity', external: true },
  docs: { href: 'https://docs.resultity.com', external: true },
  docsSubclouds: { href: 'https://docs.resultity.com/', external: true },
  docsSpace: {href: 'https://docs.resultity.com/web/space', external: true},
  docsAPI: {href: 'https://docs.resultity.com/inference', external: true},
  docsRCP: {href: 'https://docs.resultity.com/economy/rcp', external: true},
  tg: { href: 'https://t.me/resultity', external: true },
  github: { href: 'https://github.com/resultity', external: true },
  x: { href: 'https://x.com/resultity_ai', external: true },
  roadmap: { href: '/roadmap', external: false },
  vision: { href: '/vision', external: false },
  token:  { href: '/token', external: false },
  node: { href: '/node', external: false },
  cloud: { href: '/cloud', external: false },
  testnet: { href: '/testnet', external: false },
  privacy: { href: '/privacy', external: false },
} as const;

export type RouteKey = keyof typeof ROUTES;
