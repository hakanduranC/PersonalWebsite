import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher([
  '/admin(.*)',
]);

// Add your email here or use environment variable
const ALLOWED_EMAILS = process.env.ADMIN_EMAILS?.split(',') || [
  'hakanduranyt@gmail.com', // Only Hakan can access admin
];

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    const { userId, sessionClaims } = await auth();
    
    if (!userId) {
      // Not signed in
      return auth.redirectToSignIn();
    }
    
    const userEmail = sessionClaims?.email as string;
    
    if (!ALLOWED_EMAILS.includes(userEmail)) {
      // User is signed in but not authorized
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};