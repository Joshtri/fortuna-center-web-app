/**
 * YouTube OAuth - Callback Handler
 * GET /api/auth/youtube/callback
 */

import { NextRequest, NextResponse } from 'next/server';
import { exchangeCodeForTokens } from '@/lib/youtube/client';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    // Handle OAuth error
    if (error) {
      console.error('YouTube OAuth Error:', error);
      return NextResponse.redirect(
        new URL(`/dashboard?error=${error}`, request.url)
      );
    }

    // Validate auth code
    if (!code) {
      return NextResponse.redirect(
        new URL('/dashboard?error=no_code', request.url)
      );
    }

    // Exchange code for tokens
    const tokens = await exchangeCodeForTokens(code);

    // TODO: Store tokens securely
    // Options:
    // 1. Store in database associated with user
    // 2. Store in encrypted session
    // 3. Store in secure cookie

    // For now, we'll redirect with success
    // In production, you should:
    // - Save tokens to database
    // - Associate with current user
    // - Encrypt refresh token

    console.log('YouTube OAuth Success:', {
      accessToken: tokens.access_token?.substring(0, 10) + '...',
      hasRefreshToken: !!tokens.refresh_token,
      expiresIn: tokens.expiry_date,
    });

    // Redirect to dashboard with success message
    return NextResponse.redirect(
      new URL('/dashboard?youtube_auth=success', request.url)
    );
  } catch (error: any) {
    console.error('YouTube OAuth Callback Error:', error);
    return NextResponse.redirect(
      new URL(`/dashboard?error=${error.message}`, request.url)
    );
  }
}
