import type { SurveyConfig } from './types'

export const playerDiscoverySurvey: SurveyConfig = {
  slug: 'player-discovery',
  titleKey: 'survey.player.title',
  descriptionKey: 'survey.player.description',
  thankYou: {
    titleKey: 'survey.player.thankYou.title',
    descriptionKey: 'survey.player.thankYou.description',
    showDiscordInput: true,
  },
  screenOut: {
    titleKey: 'survey.player.screenOut.title',
    descriptionKey: 'survey.player.screenOut.description',
  },
  sections: [
    // ── Section 1: Screening ──
    {
      key: 'screening',
      titleKey: 'survey.player.sections.screening.title',
      questions: [
        {
          key: 'q1',
          type: 'single_select',
          titleKey: 'survey.player.q1.title',
          options: [
            { key: 'not_played', labelKey: 'survey.player.q1.options.not_played', screenOut: true },
            { key: 'less_1_week', labelKey: 'survey.player.q1.options.less_1_week' },
            { key: '1_2_weeks', labelKey: 'survey.player.q1.options.1_2_weeks' },
            { key: '3_4_weeks', labelKey: 'survey.player.q1.options.3_4_weeks' },
            { key: 'more_than_month', labelKey: 'survey.player.q1.options.more_than_month' },
          ],
        },
        {
          key: 'q2',
          type: 'single_select',
          titleKey: 'survey.player.q2.title',
          options: [
            { key: '1', labelKey: 'survey.player.q2.options.1' },
            { key: '2_3', labelKey: 'survey.player.q2.options.2_3' },
            { key: '4_6', labelKey: 'survey.player.q2.options.4_6' },
            { key: '7_10', labelKey: 'survey.player.q2.options.7_10' },
            { key: 'more_than_10', labelKey: 'survey.player.q2.options.more_than_10' },
          ],
        },
        {
          key: 'q3',
          type: 'single_select',
          titleKey: 'survey.player.q3.title',
          subtitleKey: 'survey.player.q3.subtitle',
          hasOtherOption: true,
          options: [
            { key: 'survival_smp', labelKey: 'survey.player.q3.options.survival_smp' },
            { key: 'pvp_factions', labelKey: 'survey.player.q3.options.pvp_factions' },
            { key: 'rpg_adventure', labelKey: 'survey.player.q3.options.rpg_adventure' },
            { key: 'creative_building', labelKey: 'survey.player.q3.options.creative_building' },
            { key: 'minigames', labelKey: 'survey.player.q3.options.minigames' },
            { key: 'multiple_equally', labelKey: 'survey.player.q3.options.multiple_equally' },
            { key: 'other', labelKey: 'survey.player.q3.options.other' },
          ],
        },
      ],
    },

    // ── Section 2: Discovery ──
    {
      key: 'discovery',
      titleKey: 'survey.player.sections.discovery.title',
      descriptionKey: 'survey.player.sections.discovery.description',
      questions: [
        {
          key: 'q4',
          type: 'multi_select',
          titleKey: 'survey.player.q4.title',
          subtitleKey: 'survey.player.q4.subtitle',
          hasOtherOption: true,
          constraints: { max: 3 },
          options: [
            { key: 'friend_wom', labelKey: 'survey.player.q4.options.friend_wom' },
            { key: 'youtube', labelKey: 'survey.player.q4.options.youtube' },
            { key: 'tiktok', labelKey: 'survey.player.q4.options.tiktok' },
            { key: 'twitch', labelKey: 'survey.player.q4.options.twitch' },
            { key: 'discord', labelKey: 'survey.player.q4.options.discord' },
            { key: 'reddit', labelKey: 'survey.player.q4.options.reddit' },
            { key: 'server_listing', labelKey: 'survey.player.q4.options.server_listing' },
            { key: 'ingame_browser', labelKey: 'survey.player.q4.options.ingame_browser' },
            { key: 'twitter', labelKey: 'survey.player.q4.options.twitter' },
            { key: 'other', labelKey: 'survey.player.q4.options.other' },
          ],
        },
        {
          key: 'q5',
          type: 'csat_scale',
          titleKey: 'survey.player.q5.title',
        },
        {
          key: 'q6',
          type: 'single_select',
          titleKey: 'survey.player.q6.title',
          subtitleKey: 'survey.player.q6.subtitle',
          hasOtherOption: true,
          options: [
            { key: 'too_many_options', labelKey: 'survey.player.q6.options.too_many_options' },
            { key: 'cant_tell_active', labelKey: 'survey.player.q6.options.cant_tell_active' },
            { key: 'dont_match_description', labelKey: 'survey.player.q6.options.dont_match_description' },
            { key: 'cant_find_playstyle', labelKey: 'survey.player.q6.options.cant_find_playstyle' },
            { key: 'same_servers_top', labelKey: 'survey.player.q6.options.same_servers_top' },
            { key: 'no_reviews', labelKey: 'survey.player.q6.options.no_reviews' },
            { key: 'listings_outdated', labelKey: 'survey.player.q6.options.listings_outdated' },
            { key: 'too_laggy', labelKey: 'survey.player.q6.options.too_laggy' },
            { key: 'dont_know_anyone', labelKey: 'survey.player.q6.options.dont_know_anyone' },
            { key: 'other', labelKey: 'survey.player.q6.options.other' },
          ],
        },
      ],
    },

    // ── Section 3: What Matters ──
    {
      key: 'what_matters',
      titleKey: 'survey.player.sections.what_matters.title',
      descriptionKey: 'survey.player.sections.what_matters.description',
      questions: [
        {
          key: 'q7',
          type: 'multi_select',
          titleKey: 'survey.player.q7.title',
          subtitleKey: 'survey.player.q7.subtitle',
          hasOtherOption: true,
          constraints: { exact: 3 },
          options: [
            { key: 'friendly_community', labelKey: 'survey.player.q7.options.friendly_community' },
            { key: 'low_lag', labelKey: 'survey.player.q7.options.low_lag' },
            { key: 'unique_gameplay', labelKey: 'survey.player.q7.options.unique_gameplay' },
            { key: 'mod_variety', labelKey: 'survey.player.q7.options.mod_variety' },
            { key: 'no_p2w', labelKey: 'survey.player.q7.options.no_p2w' },
            { key: 'active_players', labelKey: 'survey.player.q7.options.active_players' },
            { key: 'good_moderation', labelKey: 'survey.player.q7.options.good_moderation' },
            { key: 'close_region', labelKey: 'survey.player.q7.options.close_region' },
            { key: 'regular_updates', labelKey: 'survey.player.q7.options.regular_updates' },
            { key: 'other', labelKey: 'survey.player.q7.options.other' },
          ],
        },
        {
          key: 'q8',
          type: 'single_select',
          titleKey: 'survey.player.q8.title',
          subtitleKey: 'survey.player.q8.subtitle',
          dependsOn: { questionKey: 'q7', useSelectedAsOptions: true },
          options: [],
        },
        {
          key: 'q9',
          type: 'single_select',
          titleKey: 'survey.player.q9.title',
          options: [
            { key: 'stick_with_one', labelKey: 'survey.player.q9.options.stick_with_one' },
            { key: 'every_few_weeks', labelKey: 'survey.player.q9.options.every_few_weeks' },
            { key: 'every_few_days', labelKey: 'survey.player.q9.options.every_few_days' },
            { key: 'multiple_regularly', labelKey: 'survey.player.q9.options.multiple_regularly' },
            { key: 'havent_found', labelKey: 'survey.player.q9.options.havent_found' },
          ],
        },
      ],
    },

    // ── Section 4: Feature Prioritization (MaxDiff) ──
    {
      key: 'feature_prioritization',
      titleKey: 'survey.player.sections.feature_prioritization.title',
      descriptionKey: 'survey.player.sections.feature_prioritization.description',
      questions: [
        {
          key: 'q10',
          type: 'maxdiff',
          titleKey: 'survey.player.q10.title',
          subtitleKey: 'survey.player.q10.subtitle',
          options: [
            { key: 'text_reviews', labelKey: 'survey.player.q10.options.text_reviews' },
            { key: 'video_review', labelKey: 'survey.player.q10.options.video_review' },
            { key: 'realtime_count', labelKey: 'survey.player.q10.options.realtime_count' },
            { key: 'vibe_tags', labelKey: 'survey.player.q10.options.vibe_tags' },
          ],
        },
        {
          key: 'q11',
          type: 'maxdiff',
          titleKey: 'survey.player.q11.title',
          subtitleKey: 'survey.player.q11.subtitle',
          options: [
            { key: 'server_of_day', labelKey: 'survey.player.q11.options.server_of_day' },
            { key: 'difficulty_filter', labelKey: 'survey.player.q11.options.difficulty_filter' },
            { key: 'lfg_board', labelKey: 'survey.player.q11.options.lfg_board' },
            { key: 'friends_play', labelKey: 'survey.player.q11.options.friends_play' },
          ],
        },
        {
          key: 'q12',
          type: 'maxdiff',
          titleKey: 'survey.player.q12.title',
          subtitleKey: 'survey.player.q12.subtitle',
          options: [
            { key: 'reviewer_hours', labelKey: 'survey.player.q12.options.reviewer_hours' },
            { key: 'owner_responds', labelKey: 'survey.player.q12.options.owner_responds' },
            { key: 'retention_rate', labelKey: 'survey.player.q12.options.retention_rate' },
            { key: 'hide_p2w', labelKey: 'survey.player.q12.options.hide_p2w' },
            { key: 'actively_updated', labelKey: 'survey.player.q12.options.actively_updated' },
          ],
        },
      ],
    },

    // ── Section 5: Reviews & Trust ──
    {
      key: 'reviews_trust',
      titleKey: 'survey.player.sections.reviews_trust.title',
      descriptionKey: 'survey.player.sections.reviews_trust.description',
      questions: [
        {
          key: 'q13',
          type: 'single_select',
          titleKey: 'survey.player.q13.title',
          options: [
            { key: 'very_likely', labelKey: 'survey.player.q13.options.very_likely' },
            { key: 'strong_experience', labelKey: 'survey.player.q13.options.strong_experience' },
            { key: 'unlikely', labelKey: 'survey.player.q13.options.unlikely' },
            { key: 'not_interested', labelKey: 'survey.player.q13.options.not_interested' },
          ],
        },
        {
          key: 'q14',
          type: 'multi_select',
          titleKey: 'survey.player.q14.title',
          subtitleKey: 'survey.player.q14.subtitle',
          constraints: { max: 2 },
          options: [
            { key: 'hours_played', labelKey: 'survey.player.q14.options.hours_played' },
            { key: 'specific_aspects', labelKey: 'survey.player.q14.options.specific_aspects' },
            { key: 'screenshots_video', labelKey: 'survey.player.q14.options.screenshots_video' },
            { key: 'recent_review', labelKey: 'survey.player.q14.options.recent_review' },
            { key: 'helpful_votes', labelKey: 'survey.player.q14.options.helpful_votes' },
            { key: 'sentiment_summary', labelKey: 'survey.player.q14.options.sentiment_summary' },
            { key: 'username_visible', labelKey: 'survey.player.q14.options.username_visible' },
            { key: 'recent_vs_alltime', labelKey: 'survey.player.q14.options.recent_vs_alltime' },
          ],
        },
        {
          key: 'q15',
          type: 'single_select',
          titleKey: 'survey.player.q15.title',
          options: [
            { key: 'binary_steam', labelKey: 'survey.player.q15.options.binary_steam' },
            { key: 'stars_amazon', labelKey: 'survey.player.q15.options.stars_amazon' },
            { key: 'multi_criteria', labelKey: 'survey.player.q15.options.multi_criteria' },
            { key: 'just_label', labelKey: 'survey.player.q15.options.just_label' },
          ],
        },
      ],
    },

    // ── Section 6: Research Behavior & Demographics ──
    {
      key: 'research_demographics',
      titleKey: 'survey.player.sections.research_demographics.title',
      questions: [
        {
          key: 'q16',
          type: 'multi_select',
          titleKey: 'survey.player.q16.title',
          subtitleKey: 'survey.player.q16.subtitle',
          constraints: { max: 2 },
          options: [
            { key: 'just_join', labelKey: 'survey.player.q16.options.just_join' },
            { key: 'check_listing', labelKey: 'survey.player.q16.options.check_listing' },
            { key: 'join_discord', labelKey: 'survey.player.q16.options.join_discord' },
            { key: 'youtube_twitch', labelKey: 'survey.player.q16.options.youtube_twitch' },
            { key: 'ask_friends', labelKey: 'survey.player.q16.options.ask_friends' },
            { key: 'mobile_browse', labelKey: 'survey.player.q16.options.mobile_browse' },
            { key: 'save_bookmark', labelKey: 'survey.player.q16.options.save_bookmark' },
            { key: 'follow_updates', labelKey: 'survey.player.q16.options.follow_updates' },
          ],
        },
        {
          key: 'q17',
          type: 'single_select',
          titleKey: 'survey.player.q17.title',
          hasOtherOption: true,
          options: [
            { key: 'english', labelKey: 'survey.player.q17.options.english' },
            { key: 'spanish', labelKey: 'survey.player.q17.options.spanish' },
            { key: 'portuguese', labelKey: 'survey.player.q17.options.portuguese' },
            { key: 'french', labelKey: 'survey.player.q17.options.french' },
            { key: 'german', labelKey: 'survey.player.q17.options.german' },
            { key: 'other', labelKey: 'survey.player.q17.options.other' },
          ],
        },
      ],
    },
  ],
}
