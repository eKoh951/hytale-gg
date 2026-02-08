import type { SurveyConfig } from './types'

export const serverOwnerSurvey: SurveyConfig = {
  slug: 'server-owner',
  titleKey: 'survey.owner.title',
  descriptionKey: 'survey.owner.description',
  thankYou: {
    titleKey: 'survey.owner.thankYou.title',
    descriptionKey: 'survey.owner.thankYou.description',
    showDiscordInput: true,
  },
  screenOut: {
    titleKey: 'survey.owner.screenOut.title',
    descriptionKey: 'survey.owner.screenOut.description',
  },
  sections: [
    // ── Section 1: Screening & Server Profile ──
    {
      key: 'screening_profile',
      titleKey: 'survey.owner.sections.screening_profile.title',
      questions: [
        {
          key: 'q1',
          type: 'single_select',
          titleKey: 'survey.owner.q1.title',
          subtitleKey: 'survey.owner.q1.subtitle',
          options: [
            { key: 'owner', labelKey: 'survey.owner.q1.options.owner' },
            { key: 'admin_coowner', labelKey: 'survey.owner.q1.options.admin_coowner' },
            { key: 'staff_moderator', labelKey: 'survey.owner.q1.options.staff_moderator' },
            { key: 'not_managing', labelKey: 'survey.owner.q1.options.not_managing', screenOut: true },
          ],
        },
        {
          key: 'q2',
          type: 'single_select',
          titleKey: 'survey.owner.q2.title',
          options: [
            { key: 'less_1_week', labelKey: 'survey.owner.q2.options.less_1_week' },
            { key: '1_2_weeks', labelKey: 'survey.owner.q2.options.1_2_weeks' },
            { key: '3_4_weeks', labelKey: 'survey.owner.q2.options.3_4_weeks' },
            { key: 'more_than_month', labelKey: 'survey.owner.q2.options.more_than_month' },
            { key: 'before_ea', labelKey: 'survey.owner.q2.options.before_ea' },
          ],
        },
        {
          key: 'q3',
          type: 'single_select',
          titleKey: 'survey.owner.q3.title',
          options: [
            { key: '1_5', labelKey: 'survey.owner.q3.options.1_5' },
            { key: '6_20', labelKey: 'survey.owner.q3.options.6_20' },
            { key: '21_50', labelKey: 'survey.owner.q3.options.21_50' },
            { key: '51_100', labelKey: 'survey.owner.q3.options.51_100' },
            { key: '100_plus', labelKey: 'survey.owner.q3.options.100_plus' },
          ],
        },
        {
          key: 'q4',
          type: 'single_select',
          titleKey: 'survey.owner.q4.title',
          hasOtherOption: true,
          options: [
            { key: 'survival_smp', labelKey: 'survey.owner.q4.options.survival_smp' },
            { key: 'pvp_factions', labelKey: 'survey.owner.q4.options.pvp_factions' },
            { key: 'rpg_adventure', labelKey: 'survey.owner.q4.options.rpg_adventure' },
            { key: 'creative_building', labelKey: 'survey.owner.q4.options.creative_building' },
            { key: 'minigames', labelKey: 'survey.owner.q4.options.minigames' },
            { key: 'multiple_modes', labelKey: 'survey.owner.q4.options.multiple_modes' },
            { key: 'other', labelKey: 'survey.owner.q4.options.other' },
          ],
        },
        {
          key: 'q5',
          type: 'single_select',
          titleKey: 'survey.owner.q5.title',
          subtitleKey: 'survey.owner.q5.subtitle',
          hasOtherOption: true,
          options: [
            { key: 'self_hosted', labelKey: 'survey.owner.q5.options.self_hosted' },
            { key: 'oracle_free', labelKey: 'survey.owner.q5.options.oracle_free' },
            { key: 'gportal', labelKey: 'survey.owner.q5.options.gportal' },
            { key: 'ghostcap', labelKey: 'survey.owner.q5.options.ghostcap' },
            { key: 'game_host_bros', labelKey: 'survey.owner.q5.options.game_host_bros' },
            { key: 'dathost', labelKey: 'survey.owner.q5.options.dathost' },
            { key: 'pine_hosting', labelKey: 'survey.owner.q5.options.pine_hosting' },
            { key: 'wasabi_hosting', labelKey: 'survey.owner.q5.options.wasabi_hosting' },
            { key: 'no_disclose', labelKey: 'survey.owner.q5.options.no_disclose' },
            { key: 'other', labelKey: 'survey.owner.q5.options.other' },
          ],
        },
        {
          key: 'q6',
          type: 'single_select',
          titleKey: 'survey.owner.q6.title',
          subtitleKey: 'survey.owner.q6.subtitle',
          options: [
            { key: 'free', labelKey: 'survey.owner.q6.options.free' },
            { key: '1_10', labelKey: 'survey.owner.q6.options.1_10' },
            { key: '11_25', labelKey: 'survey.owner.q6.options.11_25' },
            { key: '26_50', labelKey: 'survey.owner.q6.options.26_50' },
            { key: '50_plus', labelKey: 'survey.owner.q6.options.50_plus' },
            { key: 'no_disclose', labelKey: 'survey.owner.q6.options.no_disclose' },
          ],
        },
      ],
    },

    // ── Section 2: Current Discovery & Pain Points ──
    {
      key: 'discovery_pain',
      titleKey: 'survey.owner.sections.discovery_pain.title',
      descriptionKey: 'survey.owner.sections.discovery_pain.description',
      questions: [
        {
          key: 'q7',
          type: 'multi_select',
          titleKey: 'survey.owner.q7.title',
          subtitleKey: 'survey.owner.q7.subtitle',
          hasOtherOption: true,
          options: [
            { key: 'hytaletop100', labelKey: 'survey.owner.q7.options.hytaletop100' },
            { key: 'hyservers', labelKey: 'survey.owner.q7.options.hyservers' },
            { key: 'hytale_universe', labelKey: 'survey.owner.q7.options.hytale_universe' },
            { key: 'hytale_servers_com', labelKey: 'survey.owner.q7.options.hytale_servers_com' },
            { key: 'serverlist_gg', labelKey: 'survey.owner.q7.options.serverlist_gg' },
            { key: 'reddit', labelKey: 'survey.owner.q7.options.reddit' },
            { key: 'discord', labelKey: 'survey.owner.q7.options.discord' },
            { key: 'ingame_browser', labelKey: 'survey.owner.q7.options.ingame_browser' },
            { key: 'own_website', labelKey: 'survey.owner.q7.options.own_website' },
            { key: 'not_listed', labelKey: 'survey.owner.q7.options.not_listed' },
            { key: 'other', labelKey: 'survey.owner.q7.options.other' },
          ],
        },
        {
          key: 'q8',
          type: 'csat_scale',
          titleKey: 'survey.owner.q8.title',
        },
        {
          key: 'q9',
          type: 'multi_select',
          titleKey: 'survey.owner.q9.title',
          subtitleKey: 'survey.owner.q9.subtitle',
          hasOtherOption: true,
          constraints: { exact: 3 },
          options: [
            { key: 'getting_new_players', labelKey: 'survey.owner.q9.options.getting_new_players' },
            { key: 'keeping_players', labelKey: 'survey.owner.q9.options.keeping_players' },
            { key: 'standing_out', labelKey: 'survey.owner.q9.options.standing_out' },
            { key: 'getting_feedback', labelKey: 'survey.owner.q9.options.getting_feedback' },
            { key: 'competing_paid', labelKey: 'survey.owner.q9.options.competing_paid' },
            { key: 'figuring_wants', labelKey: 'survey.owner.q9.options.figuring_wants' },
            { key: 'technical_problems', labelKey: 'survey.owner.q9.options.technical_problems' },
            { key: 'managing_staff', labelKey: 'survey.owner.q9.options.managing_staff' },
            { key: 'other', labelKey: 'survey.owner.q9.options.other' },
          ],
        },
      ],
    },

    // ── Section 3: Listing Friction & Automation ──
    {
      key: 'listing_friction',
      titleKey: 'survey.owner.sections.listing_friction.title',
      descriptionKey: 'survey.owner.sections.listing_friction.description',
      questions: [
        {
          key: 'q10',
          type: 'single_select',
          titleKey: 'survey.owner.q10.title',
          subtitleKey: 'survey.owner.q10.subtitle',
          hasOtherOption: true,
          options: [
            { key: 'writing_description', labelKey: 'survey.owner.q10.options.writing_description' },
            { key: 'creating_banners', labelKey: 'survey.owner.q10.options.creating_banners' },
            { key: 'vote_rewards', labelKey: 'survey.owner.q10.options.vote_rewards' },
            { key: 'multiple_sites', labelKey: 'survey.owner.q10.options.multiple_sites' },
            { key: 'keeping_updated', labelKey: 'survey.owner.q10.options.keeping_updated' },
            { key: 'initial_visibility', labelKey: 'survey.owner.q10.options.initial_visibility' },
            { key: 'verification', labelKey: 'survey.owner.q10.options.verification' },
            { key: 'not_listed', labelKey: 'survey.owner.q10.options.not_listed' },
            { key: 'other', labelKey: 'survey.owner.q10.options.other' },
          ],
        },
        {
          key: 'q11',
          type: 'single_select',
          titleKey: 'survey.owner.q11.title',
          subtitleKey: 'survey.owner.q11.subtitle',
          options: [
            { key: 'love_it', labelKey: 'survey.owner.q11.options.love_it' },
            { key: 'great_can_edit', labelKey: 'survey.owner.q11.options.great_can_edit' },
            { key: 'approve_first', labelKey: 'survey.owner.q11.options.approve_first' },
            { key: 'rather_myself', labelKey: 'survey.owner.q11.options.rather_myself' },
            { key: 'not_listed_elsewhere', labelKey: 'survey.owner.q11.options.not_listed_elsewhere' },
          ],
        },
      ],
    },

    // ── Section 4: Directory Feature Prioritization ──
    {
      key: 'feature_prioritization',
      titleKey: 'survey.owner.sections.feature_prioritization.title',
      descriptionKey: 'survey.owner.sections.feature_prioritization.description',
      questions: [
        {
          key: 'q12',
          type: 'multi_select',
          titleKey: 'survey.owner.q12.title',
          subtitleKey: 'survey.owner.q12.subtitle',
          hasOtherOption: true,
          constraints: { exact: 3 },
          options: [
            { key: 'fair_ranking', labelKey: 'survey.owner.q12.options.fair_ranking' },
            { key: 'detailed_analytics', labelKey: 'survey.owner.q12.options.detailed_analytics' },
            { key: 'player_reviews', labelKey: 'survey.owner.q12.options.player_reviews' },
            { key: 'respond_reviews', labelKey: 'survey.owner.q12.options.respond_reviews' },
            { key: 'creator_reviews', labelKey: 'survey.owner.q12.options.creator_reviews' },
            { key: 'status_monitoring', labelKey: 'survey.owner.q12.options.status_monitoring' },
            { key: 'discord_notifications', labelKey: 'survey.owner.q12.options.discord_notifications' },
            { key: 'easy_claiming', labelKey: 'survey.owner.q12.options.easy_claiming' },
            { key: 'auto_imported', labelKey: 'survey.owner.q12.options.auto_imported' },
            { key: 'other', labelKey: 'survey.owner.q12.options.other' },
          ],
        },
        {
          key: 'q13',
          type: 'point_allocation',
          titleKey: 'survey.owner.q13.title',
          subtitleKey: 'survey.owner.q13.subtitle',
          constraints: { sum: 100 },
          options: [
            { key: 'traffic_sources', labelKey: 'survey.owner.q13.options.traffic_sources' },
            { key: 'listing_conversion', labelKey: 'survey.owner.q13.options.listing_conversion' },
            { key: 'player_retention', labelKey: 'survey.owner.q13.options.player_retention' },
            { key: 'review_themes', labelKey: 'survey.owner.q13.options.review_themes' },
            { key: 'competitor_comparison', labelKey: 'survey.owner.q13.options.competitor_comparison' },
            { key: 'promotion_tracking', labelKey: 'survey.owner.q13.options.promotion_tracking' },
          ],
        },
        {
          key: 'q14',
          type: 'multi_select',
          titleKey: 'survey.owner.q14.title',
          subtitleKey: 'survey.owner.q14.subtitle',
          constraints: { max: 2 },
          options: [
            { key: 'player_retention', labelKey: 'survey.owner.q14.options.player_retention' },
            { key: 'review_themes', labelKey: 'survey.owner.q14.options.review_themes' },
            { key: 'tracking_links', labelKey: 'survey.owner.q14.options.tracking_links' },
            { key: 'alerts', labelKey: 'survey.owner.q14.options.alerts' },
            { key: 'export_data', labelKey: 'survey.owner.q14.options.export_data' },
            { key: 'compare_servers', labelKey: 'survey.owner.q14.options.compare_servers' },
            { key: 'none', labelKey: 'survey.owner.q14.options.none' },
          ],
        },
        {
          key: 'q14b',
          type: 'single_select',
          titleKey: 'survey.owner.q14b.title',
          options: [
            { key: 'under_5', labelKey: 'survey.owner.q14b.options.under_5' },
            { key: '5_10', labelKey: 'survey.owner.q14b.options.5_10' },
            { key: '10_20', labelKey: 'survey.owner.q14b.options.10_20' },
            { key: 'free_trial', labelKey: 'survey.owner.q14b.options.free_trial' },
            { key: 'wouldnt_pay', labelKey: 'survey.owner.q14b.options.wouldnt_pay' },
            { key: 'depends', labelKey: 'survey.owner.q14b.options.depends' },
          ],
        },
      ],
    },

    // ── Section 5: Reviews & Trust ──
    {
      key: 'reviews_trust',
      titleKey: 'survey.owner.sections.reviews_trust.title',
      descriptionKey: 'survey.owner.sections.reviews_trust.description',
      questions: [
        {
          key: 'q15',
          type: 'single_select',
          titleKey: 'survey.owner.q15.title',
          options: [
            { key: 'great_feedback', labelKey: 'survey.owner.q15.options.great_feedback' },
            { key: 'fine_respond', labelKey: 'survey.owner.q15.options.fine_respond' },
            { key: 'worried_fake', labelKey: 'survey.owner.q15.options.worried_fake' },
            { key: 'prefer_votes', labelKey: 'survey.owner.q15.options.prefer_votes' },
          ],
        },
        {
          key: 'q16',
          type: 'single_select',
          titleKey: 'survey.owner.q16.title',
          options: [
            { key: 'welcome_free', labelKey: 'survey.owner.q16.options.welcome_free' },
            { key: 'welcome_know', labelKey: 'survey.owner.q16.options.welcome_know' },
            { key: 'see_before', labelKey: 'survey.owner.q16.options.see_before' },
            { key: 'not_interested', labelKey: 'survey.owner.q16.options.not_interested' },
          ],
        },
        {
          key: 'q17',
          type: 'single_select',
          titleKey: 'survey.owner.q17.title',
          subtitleKey: 'survey.owner.q17.subtitle',
          options: [
            { key: 'binary_steam', labelKey: 'survey.owner.q17.options.binary_steam' },
            { key: 'stars_amazon', labelKey: 'survey.owner.q17.options.stars_amazon' },
            { key: 'multi_criteria', labelKey: 'survey.owner.q17.options.multi_criteria' },
            { key: 'no_reviews', labelKey: 'survey.owner.q17.options.no_reviews' },
          ],
        },
      ],
    },

    // ── Section 6: Final ──
    {
      key: 'final',
      titleKey: 'survey.owner.sections.final.title',
      questions: [
        {
          key: 'q18',
          type: 'open_text',
          titleKey: 'survey.owner.q18.title',
          subtitleKey: 'survey.owner.q18.subtitle',
        },
      ],
    },
  ],
}
