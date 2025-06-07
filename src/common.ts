// Z-Index Theme Constants
export const Z_INDEX = {
  // Base levels
  BASE: 0,
  CONTENT: 1,
  
  // Schema Builder specific
  TABLE: 10,
  CONNECTION_LINE: 15,
  DRAGGING_ITEM: 20,
  TOOLBAR: 30,
  
  // UI Components
  DROPDOWN: 40,
  MODAL_BACKDROP: 50,
  MODAL: 50,
  DIALOG: 50,
  SELECT_CONTENT: 50,
  
  // Highest priority
  TOOLTIP: 60,
  NOTIFICATION: 70,
} as const

// Helper function to get z-index values
export const getZIndex = (level: keyof typeof Z_INDEX): number => Z_INDEX[level]

export const VDT_CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || ''