import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher([
  '/admin(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    const { userId, sessionClaims } = await auth();
    
    if (!userId) {
      // Not signed in - Clerk will handle the redirect automatically
      await auth.protect();
      return;
    }
    
    // Check if user has admin role in their public metadata
    const userRole = sessionClaims?.metadata?.role;
    
    console.log('User ID:', userId);
    console.log('User Role:', userRole);
    
    if (userRole !== 'admin') {
      // User is signed in but not an admin
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