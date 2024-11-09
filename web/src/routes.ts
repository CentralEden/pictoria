export const ROUTES = {
    HOME: '/',
    PROFILE: '/profile',
  } as const
  
  export type RoutePath = typeof ROUTES[keyof typeof ROUTES]