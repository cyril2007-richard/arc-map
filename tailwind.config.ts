import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		fontFamily: {
			'mono': ['JetBrains Mono', 'monospace'],
			'futuristic': ['Orbitron', 'sans-serif'],
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				flow: {
					canvas: 'hsl(var(--flow-canvas))',
					grid: 'hsl(var(--flow-grid))'
				},
				node: {
					file: 'hsl(var(--node-file))',
					function: 'hsl(var(--node-function))',
					class: 'hsl(var(--node-class))',
					import: 'hsl(var(--node-import))',
					error: 'hsl(var(--node-error))',
					typescript: 'hsl(var(--node-typescript))',
					javascript: 'hsl(var(--node-javascript))',
					react: 'hsl(var(--node-react))',
					css: 'hsl(var(--node-css))'
				},
				edge: {
					default: 'hsl(var(--edge-default))',
					import: 'hsl(var(--edge-import))',
					export: 'hsl(var(--edge-export))',
					error: 'hsl(var(--edge-error))'
				}
			},
			boxShadow: {
				'glow-primary': 'var(--glow-primary)',
				'glow-secondary': 'var(--glow-secondary)',
				'glow-accent': 'var(--glow-accent)',
				'glow-error': 'var(--glow-error)',
				'glow-node': 'var(--glow-node)',
				'border-glow': 'var(--border-glow)',
				'border-accent': 'var(--border-accent)',
				'cyber': '0 0 20px currentColor, inset 0 0 20px rgba(255,255,255,0.1)',
				'neon': '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor'
			},
			animation: {
				'pulse-glow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'fade-in': 'fadeIn 0.3s ease-out',
				'slide-up': 'slideUp 0.3s ease-out',
				'glow-pulse': 'glowPulse 2s ease-in-out infinite alternate'
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				slideUp: {
					'0%': { transform: 'translateY(100%)' },
					'100%': { transform: 'translateY(0)' }
				},
				glowPulse: {
					'0%': { boxShadow: '0 0 5px currentColor' },
					'100%': { boxShadow: '0 0 20px currentColor, 0 0 30px currentColor' }
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
