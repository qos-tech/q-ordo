import type { Config } from 'tailwindcss'

const config: Config = {
  // A seção 'content' é crucial. Ela diz ao Tailwind para varrer todos
  // estes arquivos em busca de classes, para que ele saiba qual CSS gerar.
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // A seção 'theme' é onde personalizaremos as cores, fontes e espaçamentos
  // do nosso design system no futuro.
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  // A seção 'plugins' é onde adicionaremos plugins do Tailwind,
  // como o de formulários ou tipografia.
  plugins: [],
}
export default config
