import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {routing} from './routing';
 
export default getRequestConfig(async ({requestLocale}) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  // Import split domain files and merge them
  const [
    common,
    auth,
    home,
    servers,
    creators,
    branding,
    profile,
    submit,
    surveyCommon,
    surveyPlayer,
    surveyOwner,
  ] = await Promise.all([
    import(`../messages/${locale}/common.json`),
    import(`../messages/${locale}/auth.json`),
    import(`../messages/${locale}/home.json`),
    import(`../messages/${locale}/servers.json`),
    import(`../messages/${locale}/creators.json`),
    import(`../messages/${locale}/branding.json`),
    import(`../messages/${locale}/profile.json`),
    import(`../messages/${locale}/submit.json`),
    import(`../messages/${locale}/survey-common.json`),
    import(`../messages/${locale}/survey-player.json`),
    import(`../messages/${locale}/survey-owner.json`),
  ]);

  return {
    locale,
    messages: {
      ...common.default,
      ...auth.default,
      ...home.default,
      ...servers.default,
      ...creators.default,
      ...branding.default,
      ...profile.default,
      ...submit.default,
      // Deep-merge survey sub-keys from 3 files
      survey: {
        ...surveyCommon.default.survey,
        ...surveyPlayer.default.survey,
        ...surveyOwner.default.survey,
      },
    },
  };
});