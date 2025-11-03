import createMDX from '@next/mdx';

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

const nextConfig = {
  // Removed 'output: export' to enable API routes and server-side rendering
  // Removed 'images: { unoptimized: true }' - not needed for Vercel
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

export default withMDX(nextConfig);