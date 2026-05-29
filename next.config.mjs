import createMDX from '@next/mdx';

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

// External destination for retired /methods (essays now live on the Ghost blog).
const GHOST_APPLIED_AI = 'https://gnowledge-karden.ghost.io/tag/appliedai/';

const nextConfig = {
  // Note: do NOT reintroduce `output: 'export'` — it breaks the /api/contact route
  // (see docs/VERCEL-DEPLOYMENT-PLAN.md). Server-side rendering must stay enabled.
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],

  // 301 redirects for the eight→three route consolidation (spec §3). The old URLs
  // are live/indexed; these preserve inbound links and search equity.
  async redirects() {
    return [
      { source: '/specializations', destination: '/', statusCode: 301 },
      { source: '/approach', destination: '/', statusCode: 301 },
      { source: '/results', destination: '/', statusCode: 301 },
      { source: '/governance', destination: '/', statusCode: 301 },
      { source: '/engagement', destination: '/#engage', statusCode: 301 },
      // /methods now points to the external Ghost Applied AI tag.
      { source: '/methods', destination: GHOST_APPLIED_AI, statusCode: 301 },
    ];
  },
};

export default withMDX(nextConfig);
