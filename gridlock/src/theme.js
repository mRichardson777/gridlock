// Gridlock Design System
// Option 1: Clean & Modern

export const colors = {
  // Backgrounds
  background: '#F8F7F4',       // warm off-white
  surface: '#FFFFFF',          // card/panel white
  gridBackground: '#E8E4DC',   // slightly warm grid bg

  // The Hero
  redCar: '#E8362A',           // the escape car — pops hard
  redCarDark: '#C42D23',       // shadow / border

  // Other vehicles (muted so red dominates)
  car1: '#6B9BD2',             // soft blue
  car2: '#7BC67E',             // soft green
  car3: '#F0A500',             // warm amber
  car4: '#A78BCA',             // soft purple
  car5: '#F08080',             // soft coral
  car6: '#5BB8B4',             // soft teal
  car7: '#B0A090',             // warm gray

  // Grid
  gridLine: '#D4CFC6',         // subtle grid lines
  exitArrow: '#E8362A',        // matches red car

  // UI
  textPrimary: '#1A1A1A',      // near black
  textSecondary: '#6B6560',    // muted warm gray
  textMuted: '#A09890',        // very muted

  // Accents
  accent: '#E8362A',           // primary action color = red car
  accentLight: '#FDE8E6',      // light red tint (backgrounds)

  // States
  success: '#3DAA6F',
  successLight: '#E6F7EE',
  border: '#E0DBD3',

  // Pro / Premium
  gold: '#C9972A',
  goldLight: '#FBF3E0',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radius = {
  sm: 6,
  md: 12,
  lg: 20,
  full: 999,
};

export const typography = {
  // Using system fonts for now (will add custom later)
  h1: { fontSize: 32, fontWeight: '700', letterSpacing: -0.5, color: colors.textPrimary },
  h2: { fontSize: 24, fontWeight: '700', letterSpacing: -0.3, color: colors.textPrimary },
  h3: { fontSize: 18, fontWeight: '600', color: colors.textPrimary },
  body: { fontSize: 16, fontWeight: '400', color: colors.textPrimary },
  bodySmall: { fontSize: 14, fontWeight: '400', color: colors.textSecondary },
  label: { fontSize: 12, fontWeight: '600', letterSpacing: 0.5, color: colors.textMuted },
  mono: { fontSize: 14, fontFamily: 'Courier', color: colors.textPrimary },
};

export const shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  strong: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
};
