import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    wrapper: ({ children }) => (
      <section className="min-h-screen px-6 md:px-12 lg:px-20 pt-32 pb-20">
        <div className="prose-dark mx-auto max-w-4xl">
          {children}
        </div>
      </section>
    ),
  }
}