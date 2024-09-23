module.exports = {
  theme: {
    extend: {
      transform: ['hover', 'focus'],
      textStrokeWidth: {
        '1': '1px',
        '2': '2px',
      },
      textStrokeColor: {
        white: '#ffffff',
      },
    },
  },
  variants: {
    extend: {
      rotate: ['group-hover'],
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-stroke': {
          '-webkit-text-stroke-width': '1px',
          '-webkit-text-stroke-color': '#ffffff',
        },
        '.text-stroke-2': {
          '-webkit-text-stroke-width': '2px',
          '-webkit-text-stroke-color': '#ffffff',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
};
