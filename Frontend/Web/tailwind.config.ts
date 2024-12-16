import type { Config } from "tailwindcss";
//import tailwindScrollbar from 'tailwind-scrollbar';


const config: Config = {
    darkMode: ["class"],
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			'white-perso': '#f8f9fa',
  			'white-perso2': '#e9ecef',
  			mainColor: '#1f2937',
  			mainColorDisabled: '#d1d5db',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		zIndex: {
  			'100': '100'
  		},
  		spacing: {
  			'0.5/10': '5%',
  			'1/10': '10%',
  			'1.5/10': '15%',
  			'2/10': '20%',
  			'2.5/10': '25%',
  			'3/10': '30%',
  			'3.5/10': '35%',
  			'4/10': '40%',
  			'4.5/10': '45%',
  			'5/10': '50%',
  			'5.5/10': '55%',
  			'6/10': '60%',
  			'6.5/10': '65%',
  			'7/10': '70%',
  			'7.5/10': '75%',
  			'8/10': '80%',
  			'8.5/10': '85%',
  			'9/10': '90%',
  			'9.5/10': '95%',
  			'10/10': '100%'
  		},
  		minWidth: {
  			'0.5/10': '5%',
  			'1/10': '10%',
  			'1.5/10': '15%',
  			'2/10': '20%',
  			'2.5/10': '25%',
  			'3/10': '30%',
  			'3.5/10': '35%',
  			'4/10': '40%',
  			'4.5/10': '45%',
  			'5/10': '50%',
  			'5.5/10': '55%',
  			'6/10': '60%',
  			'6.5/10': '65%',
  			'7/10': '70%',
  			'7.5/10': '75%',
  			'8/10': '80%',
  			'8.5/10': '85%',
  			'9/10': '90%',
  			'9.5/10': '95%',
  			'10/10': '100%'
  		},
  		maxWidth: {
  			'0.5/10': '5%',
  			'1/10': '10%',
  			'1.5/10': '15%',
  			'2/10': '20%',
  			'2.5/10': '25%',
  			'3/10': '30%',
  			'3.5/10': '35%',
  			'4/10': '40%',
  			'4.5/10': '45%',
  			'5/10': '50%',
  			'5.5/10': '55%',
  			'6/10': '60%',
  			'6.5/10': '65%',
  			'7/10': '70%',
  			'7.5/10': '75%',
  			'8/10': '80%',
  			'8.5/10': '85%',
  			'9/10': '90%',
  			'9.5/10': '95%',
  			'10/10': '100%'
  		},
  		width: {
  			'0.5/10': '5%',
  			'1/10': '10%',
  			'1.5/10': '15%',
  			'2/10': '20%',
  			'2.5/10': '25%',
  			'3/10': '30%',
  			'3.5/10': '35%',
  			'4/10': '40%',
  			'4.5/10': '45%',
  			'5/10': '50%',
  			'5.5/10': '55%',
  			'6/10': '60%',
  			'6.5/10': '65%',
  			'7/10': '70%',
  			'7.5/10': '75%',
  			'8/10': '80%',
  			'8.5/10': '85%',
  			'9/10': '90%',
  			'9.5/10': '95%',
  			'10/10': '100%'
  		},
  		minHeight: {
  			'0.5/10': '5%',
  			'1/10': '10%',
  			'1.5/10': '15%',
  			'2/10': '20%',
  			'2.5/10': '25%',
  			'3/10': '30%',
  			'3.5/10': '35%',
  			'4/10': '40%',
  			'4.5/10': '45%',
  			'5/10': '50%',
  			'5.5/10': '55%',
  			'6/10': '60%',
  			'6.5/10': '65%',
  			'7/10': '70%',
  			'7.5/10': '75%',
  			'8/10': '80%',
  			'8.5/10': '85%',
  			'9/10': '90%',
  			'9.5/10': '95%',
  			'10/10': '100%'
  		},
  		maxHeight: {
  			'0.5/10': '5%',
  			'1/10': '10%',
  			'1.5/10': '15%',
  			'2/10': '20%',
  			'2.5/10': '25%',
  			'3/10': '30%',
  			'3.5/10': '35%',
  			'4/10': '40%',
  			'4.5/10': '45%',
  			'5/10': '50%',
  			'5.5/10': '55%',
  			'6/10': '60%',
  			'6.5/10': '65%',
  			'7/10': '70%',
  			'7.5/10': '75%',
  			'8/10': '80%',
  			'8.5/10': '85%',
  			'9/10': '90%',
  			'9.5/10': '95%',
  			'10/10': '100%'
  		},
  		height: {
  			'0.5/10': '5%',
  			'1/10': '10%',
  			'1.5/10': '15%',
  			'2/10': '20%',
  			'2.5/10': '25%',
  			'3/10': '30%',
  			'3.5/10': '35%',
  			'4/10': '40%',
  			'4.5/10': '45%',
  			'5/10': '50%',
  			'5.5/10': '55%',
  			'6/10': '60%',
  			'6.5/10': '65%',
  			'7/10': '70%',
  			'7.5/10': '75%',
  			'8/10': '80%',
  			'8.5/10': '85%',
  			'9/10': '90%',
  			'9.5/10': '95%',
  			'10/10': '100%'
  		},
  		fontSize: {
  			xxs: '.5rem',
  			xxxs: '.4rem'
  		},
  		letterSpacing: {
  			tightest: '-.075em',
  			tighter: '-.05em',
  			tight: '-.025em',
  			normal: '0',
  			wide: '.025em',
  			wider: '.05em',
  			widest: '.1em',
  			max: '0.55em'
  		},
  		screens: {
  			resw400: '400px'
  		},
  		fontFamily: {
  			merriweather: ['Merriweather', 'serif'],
  			Poppins: ['Poppins', 'sans-serif']
  		},
  		fontWeight: {
  			light: '300',
  			regular: '400',
  			medium: '500',
  			'semi-bold': '600',
  			bold: '700',
  			'extra-bold': '800',
  			black: '900',
  			italic: 'italic',
  			'extrabold-italic': '800 italic'
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
  
  
  plugins: [
      //require("tailwindcss-animate")
],}
export default config;