export type AppTheme = {
  colors: {
    background: string;
    surface: string;
    surfaceMuted: string;
    text: string;
    muted: string;
    border: string;
    brand: string;
    brandSoft: string;
    success: string;
    successSoft: string;
    warning: string;
    warningSoft: string;
    danger: string;
    dangerSoft: string;
  };
  spacing: { xs: number; sm: number; md: number; lg: number; xl: number };
  radius: { sm: number; md: number; lg: number };
};

const shared = {
  spacing: { xs: 6, sm: 10, md: 16, lg: 24, xl: 32 },
  radius: { sm: 10, md: 16, lg: 24 }
} as const;

export const lightTheme: AppTheme = {
  ...shared,
  colors: {
    background: '#F7F8FA',
    surface: '#FFFFFF',
    surfaceMuted: '#F0F3F6',
    text: '#15202B',
    muted: '#65727E',
    border: '#D7DEE5',
    brand: '#155EEF',
    brandSoft: '#EAF1FF',
    success: '#067647',
    successSoft: '#ECFDF3',
    warning: '#B54708',
    warningSoft: '#FFF4E8',
    danger: '#B42318',
    dangerSoft: '#FEF3F2'
  }
};

export const darkTheme: AppTheme = {
  ...shared,
  colors: {
    background: '#0F141A',
    surface: '#171D24',
    surfaceMuted: '#222A33',
    text: '#F5F7FA',
    muted: '#A7B2BD',
    border: '#343D47',
    brand: '#78A7FF',
    brandSoft: '#172746',
    success: '#62D49B',
    successSoft: '#143528',
    warning: '#FFB56B',
    warningSoft: '#3A2917',
    danger: '#FF8A80',
    dangerSoft: '#3A1E1C'
  }
};

export const theme = lightTheme;
