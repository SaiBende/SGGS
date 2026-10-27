// Shared Clerk appearance so the prebuilt auth components match the app.
// The `auth-clerk` wrapper additionally removes Clerk's outer card chrome so
// the form sits directly inside the white auth panel.
export const clerkAppearance = {
  variables: {
    colorPrimary: '#5b4ae8',
    colorBackground: '#ffffff',
    colorText: '#0b0b10',
    colorTextSecondary: '#6b6b74',
    colorInputBackground: '#fbfbf8',
    colorInputText: '#0b0b10',
    colorNeutral: '#0b0b10',
    borderRadius: '0.75rem',
    fontFamily: "'Inter Variable', Inter, ui-sans-serif, system-ui, sans-serif",
    fontSize: '14px',
  },
  elements: {
    rootBox: 'w-full min-w-0',
    cardBox: 'w-full min-w-0 max-w-full border-0 bg-transparent shadow-none',
    card: 'w-full min-w-0 max-w-full border-0 bg-transparent p-0 shadow-none',
    headerTitle: 'hidden',
    headerSubtitle: 'hidden',
    formButtonPrimary:
      'bg-ink hover:bg-brand-600 text-white shadow-none text-sm font-semibold h-11 rounded-xl',
    formFieldInput:
      'bg-canvas border border-ink/15 text-ink rounded-xl h-11 focus:border-brand-500',
    formFieldLabel: 'text-ink/75 text-[13px] font-semibold',
    footer: { background: 'transparent' },
    footerAction: { background: 'transparent' },
    footerActionText: 'text-muted text-xs',
    footerActionLink: 'text-brand-600 hover:text-brand-700 font-semibold text-xs',
    footerPages: { background: 'transparent' },
    footerPagesLink: 'text-muted hover:text-ink',
    socialButtonsBlockButton:
      'border border-ink/15 bg-white text-ink hover:bg-ink/[0.03] h-11 rounded-xl',
    socialButtonsBlockButtonText: 'text-ink font-medium text-sm',
    dividerLine: 'bg-ink/10',
    dividerText: 'text-muted text-[11px]',
    identityPreviewEditButton: 'text-brand-600',
    formResendCodeLink: 'text-brand-600 font-semibold',
    otpCodeFieldInput: 'border-ink/15 rounded-lg',
    alert: 'rounded-xl',
    alertText: 'text-[13px]',
  },
};
