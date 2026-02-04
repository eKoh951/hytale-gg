import { createClient } from '@/lib/supabase/server';
import { isSupportedLocale, type Locale } from '@/i18n/locales';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { locale } = await request.json();

    // Validate locale
    if (!locale || !isSupportedLocale(locale)) {
      return NextResponse.json(
        { error: 'Invalid locale' },
        { status: 400 }
      );
    }

    // Get authenticated user
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Update user preference in Supabase (parallel with cookie update in middleware)
    const { error } = await supabase
      .from('user_preferences')
      .upsert({
        user_id: user.id,
        preferred_locale: locale as Locale,
        auto_detect: false // User explicitly chose a language
      }, {
        onConflict: 'user_id'
      });

    if (error) {
      console.error('[API] Error updating language preference:', { userId: user.id, locale, error: error.message });
      return NextResponse.json(
        { error: 'Failed to update preference' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('[API] Unexpected error updating language preference:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
