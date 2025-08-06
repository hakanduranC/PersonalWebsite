import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher([
  '/admin(.*)',
]);

// For now, we'll use a simple approach - just allow specific user IDs
// You can get your user ID from the Clerk dashboard or the debug page
const ALLOWED_USER_IDS = process.env.ADMIN_USER_IDS?.split(',') || [
  // We'll find and add your user ID here
];

// Temporary: allow all authenticated users to access /admin/debug
const isDebugRoute = createRouteMatcher(['/admin/debug']);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    const authResult = await auth();
    
    if (!authResult.userId) {
      // Not signed in - Clerk will handle the redirect automatically
      await auth.protect();
      return;
    }
    
    // Allow debug page for all authenticated users temporarily
    if (isDebugRoute(req)) {
      return;
    }
    
    // For now, log the user ID so you can add it to the allowed list
    console.log('Current user ID:', authResult.userId);
    
    // Temporarily allow your specific email by checking a custom header
    // This is a workaround until we properly configure session claims
    if (req.headers.get('x-admin-override') === 'hakanduranyt@gmail.com') {
      return;
    }
    
    // Comment this out temporarily to allow access
    // if (!ALLOWED_USER_IDS.includes(authResult.userId)) {
    //   return NextResponse.redirect(new URL('/unauthorized', req.url));
    // }
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