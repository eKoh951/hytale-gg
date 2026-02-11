export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          color: string
          created_at: string | null
          description: string | null
          icon: string
          id: string
          name: string
        }
        Insert: {
          color: string
          created_at?: string | null
          description?: string | null
          icon: string
          id?: string
          name: string
        }
        Update: {
          color?: string
          created_at?: string | null
          description?: string | null
          icon?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      avatar_uploads: {
        Row: {
          file_size: number | null
          id: string
          mime_type: string | null
          storage_path: string
          uploaded_at: string | null
          user_id: string
        }
        Insert: {
          file_size?: number | null
          id?: string
          mime_type?: string | null
          storage_path: string
          uploaded_at?: string | null
          user_id: string
        }
        Update: {
          file_size?: number | null
          id?: string
          mime_type?: string | null
          storage_path?: string
          uploaded_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "avatar_uploads_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      featured_servers: {
        Row: {
          created_at: string | null
          featured_date: string
          id: string
          position: number
          quality_score_at_feature: number | null
          section: string
          server_id: string
        }
        Insert: {
          created_at?: string | null
          featured_date: string
          id?: string
          position: number
          quality_score_at_feature?: number | null
          section: string
          server_id: string
        }
        Update: {
          created_at?: string | null
          featured_date?: string
          id?: string
          position?: number
          quality_score_at_feature?: number | null
          section?: string
          server_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "featured_servers_server_id_fkey"
            columns: ["server_id"]
            isOneToOne: false
            referencedRelation: "servers"
            referencedColumns: ["id"]
          },
        ]
      }
      owner_responses: {
        Row: {
          created_at: string | null
          id: string
          owner_id: string
          response_text: string
          review_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          owner_id: string
          response_text: string
          review_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          owner_id?: string
          response_text?: string
          review_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "owner_responses_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: true
            referencedRelation: "reviews"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          discord_id: string | null
          display_name: string
          id: string
          level: number | null
          location: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          discord_id?: string | null
          display_name: string
          id: string
          level?: number | null
          location?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          discord_id?: string | null
          display_name?: string
          id?: string
          level?: number | null
          location?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      review_comments: {
        Row: {
          comment_text: string
          created_at: string | null
          id: string
          parent_comment_id: string | null
          review_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          comment_text: string
          created_at?: string | null
          id?: string
          parent_comment_id?: string | null
          review_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          comment_text?: string
          created_at?: string | null
          id?: string
          parent_comment_id?: string | null
          review_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "review_comments_parent_comment_id_fkey"
            columns: ["parent_comment_id"]
            isOneToOne: false
            referencedRelation: "review_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "review_comments_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: false
            referencedRelation: "reviews"
            referencedColumns: ["id"]
          },
        ]
      }
      review_media: {
        Row: {
          created_at: string | null
          id: string
          review_id: string
          sort_order: number | null
          thumbnail_url: string | null
          type: string
          url: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          review_id: string
          sort_order?: number | null
          thumbnail_url?: string | null
          type: string
          url: string
        }
        Update: {
          created_at?: string | null
          id?: string
          review_id?: string
          sort_order?: number | null
          thumbnail_url?: string | null
          type?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "review_media_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: false
            referencedRelation: "reviews"
            referencedColumns: ["id"]
          },
        ]
      }
      review_ratings: {
        Row: {
          created_at: string | null
          dimension_id: string
          review_id: string
          score: number
        }
        Insert: {
          created_at?: string | null
          dimension_id: string
          review_id: string
          score: number
        }
        Update: {
          created_at?: string | null
          dimension_id?: string
          review_id?: string
          score?: number
        }
        Relationships: [
          {
            foreignKeyName: "review_ratings_dimension_id_fkey"
            columns: ["dimension_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "review_ratings_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: false
            referencedRelation: "reviews"
            referencedColumns: ["id"]
          },
        ]
      }
      review_reactions: {
        Row: {
          created_at: string | null
          id: string
          reaction: string
          review_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          reaction: string
          review_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          reaction?: string
          review_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "review_reactions_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: false
            referencedRelation: "reviews"
            referencedColumns: ["id"]
          },
        ]
      }
      review_saves: {
        Row: {
          created_at: string | null
          review_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          review_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          review_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "review_saves_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: false
            referencedRelation: "reviews"
            referencedColumns: ["id"]
          },
        ]
      }
      review_votes: {
        Row: {
          created_at: string | null
          id: string
          review_id: string
          user_id: string
          vote_type: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          review_id: string
          user_id: string
          vote_type: string
        }
        Update: {
          created_at?: string | null
          id?: string
          review_id?: string
          user_id?: string
          vote_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "review_votes_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: false
            referencedRelation: "reviews"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          created_at: string | null
          entity_id: string
          entity_type: string
          funny_count: number | null
          helpful_count: number | null
          id: string
          is_creator_review: boolean | null
          is_recommended: boolean | null
          play_duration_text: string | null
          rating_overall: number
          review_text: string | null
          review_type: Database["public"]["Enums"]["review_type"]
          status: Database["public"]["Enums"]["review_status"] | null
          updated_at: string | null
          user_id: string
          video_platform: string | null
          video_url: string | null
        }
        Insert: {
          created_at?: string | null
          entity_id: string
          entity_type?: string
          funny_count?: number | null
          helpful_count?: number | null
          id?: string
          is_creator_review?: boolean | null
          is_recommended?: boolean | null
          play_duration_text?: string | null
          rating_overall: number
          review_text?: string | null
          review_type?: Database["public"]["Enums"]["review_type"]
          status?: Database["public"]["Enums"]["review_status"] | null
          updated_at?: string | null
          user_id: string
          video_platform?: string | null
          video_url?: string | null
        }
        Update: {
          created_at?: string | null
          entity_id?: string
          entity_type?: string
          funny_count?: number | null
          helpful_count?: number | null
          id?: string
          is_creator_review?: boolean | null
          is_recommended?: boolean | null
          play_duration_text?: string | null
          rating_overall?: number
          review_text?: string | null
          review_type?: Database["public"]["Enums"]["review_type"]
          status?: Database["public"]["Enums"]["review_status"] | null
          updated_at?: string | null
          user_id?: string
          video_platform?: string | null
          video_url?: string | null
        }
        Relationships: []
      }
      server_media: {
        Row: {
          aspect_ratio: string | null
          created_at: string | null
          id: string
          server_id: string
          sort_order: number | null
          source: string | null
          thumbnail_url: string | null
          type: string
          uploaded_by: string | null
          url: string
        }
        Insert: {
          aspect_ratio?: string | null
          created_at?: string | null
          id?: string
          server_id: string
          sort_order?: number | null
          source?: string | null
          thumbnail_url?: string | null
          type: string
          uploaded_by?: string | null
          url: string
        }
        Update: {
          aspect_ratio?: string | null
          created_at?: string | null
          id?: string
          server_id?: string
          sort_order?: number | null
          source?: string | null
          thumbnail_url?: string | null
          type?: string
          uploaded_by?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "server_media_server_id_fkey"
            columns: ["server_id"]
            isOneToOne: false
            referencedRelation: "servers"
            referencedColumns: ["id"]
          },
        ]
      }
      server_metrics: {
        Row: {
          checked_at: string
          id: string
          latency_ms: number | null
          player_count: number | null
          server_id: string
          status: string
        }
        Insert: {
          checked_at?: string
          id?: string
          latency_ms?: number | null
          player_count?: number | null
          server_id: string
          status: string
        }
        Update: {
          checked_at?: string
          id?: string
          latency_ms?: number | null
          player_count?: number | null
          server_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "server_metrics_server_id_fkey"
            columns: ["server_id"]
            isOneToOne: false
            referencedRelation: "servers"
            referencedColumns: ["id"]
          },
        ]
      }
      server_metrics_2026_02: {
        Row: {
          checked_at: string
          id: string
          latency_ms: number | null
          player_count: number | null
          server_id: string
          status: string
        }
        Insert: {
          checked_at?: string
          id?: string
          latency_ms?: number | null
          player_count?: number | null
          server_id: string
          status: string
        }
        Update: {
          checked_at?: string
          id?: string
          latency_ms?: number | null
          player_count?: number | null
          server_id?: string
          status?: string
        }
        Relationships: []
      }
      server_metrics_2026_03: {
        Row: {
          checked_at: string
          id: string
          latency_ms: number | null
          player_count: number | null
          server_id: string
          status: string
        }
        Insert: {
          checked_at?: string
          id?: string
          latency_ms?: number | null
          player_count?: number | null
          server_id: string
          status: string
        }
        Update: {
          checked_at?: string
          id?: string
          latency_ms?: number | null
          player_count?: number | null
          server_id?: string
          status?: string
        }
        Relationships: []
      }
      server_tags: {
        Row: {
          created_at: string | null
          server_id: string
          tag_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          server_id: string
          tag_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          server_id?: string
          tag_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "server_tags_server_id_fkey"
            columns: ["server_id"]
            isOneToOne: false
            referencedRelation: "servers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "server_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      servers: {
        Row: {
          category: string
          cover_url: string | null
          created_at: string | null
          current_status: string | null
          description: string
          discord_url: string | null
          hosting_provider: string | null
          icon_url: string | null
          id: string
          ip_address: string
          language: string | null
          last_featured_at: string | null
          listed_by: string
          name: string
          owner_id: string | null
          port: number | null
          quality_score: number | null
          rating_avg: number | null
          recommend_pct: number | null
          region: string
          review_count: number | null
          slug: string
          updated_at: string | null
          verification_code: string | null
          verification_expires_at: string | null
          verification_status: string | null
          video_url: string | null
          website_url: string | null
        }
        Insert: {
          category: string
          cover_url?: string | null
          created_at?: string | null
          current_status?: string | null
          description: string
          discord_url?: string | null
          hosting_provider?: string | null
          icon_url?: string | null
          id?: string
          ip_address: string
          language?: string | null
          last_featured_at?: string | null
          listed_by: string
          name: string
          owner_id?: string | null
          port?: number | null
          quality_score?: number | null
          rating_avg?: number | null
          recommend_pct?: number | null
          region: string
          review_count?: number | null
          slug: string
          updated_at?: string | null
          verification_code?: string | null
          verification_expires_at?: string | null
          verification_status?: string | null
          video_url?: string | null
          website_url?: string | null
        }
        Update: {
          category?: string
          cover_url?: string | null
          created_at?: string | null
          current_status?: string | null
          description?: string
          discord_url?: string | null
          hosting_provider?: string | null
          icon_url?: string | null
          id?: string
          ip_address?: string
          language?: string | null
          last_featured_at?: string | null
          listed_by?: string
          name?: string
          owner_id?: string | null
          port?: number | null
          quality_score?: number | null
          rating_avg?: number | null
          recommend_pct?: number | null
          region?: string
          review_count?: number | null
          slug?: string
          updated_at?: string | null
          verification_code?: string | null
          verification_expires_at?: string | null
          verification_status?: string | null
          video_url?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      survey_answers: {
        Row: {
          answer: Json
          answered_at: string | null
          id: number
          question_key: string
          response_id: number
        }
        Insert: {
          answer: Json
          answered_at?: string | null
          id?: never
          question_key: string
          response_id: number
        }
        Update: {
          answer?: Json
          answered_at?: string | null
          id?: never
          question_key?: string
          response_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "survey_answers_response_id_fkey"
            columns: ["response_id"]
            isOneToOne: false
            referencedRelation: "survey_responses"
            referencedColumns: ["id"]
          },
        ]
      }
      survey_responses: {
        Row: {
          completed_at: string | null
          created_at: string | null
          current_step: number
          id: number
          locale: string
          metadata: Json | null
          respondent_id: string | null
          screened_out: boolean | null
          session_token: string
          started_at: string | null
          survey_id: number
          total_steps: number
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          current_step?: number
          id?: never
          locale?: string
          metadata?: Json | null
          respondent_id?: string | null
          screened_out?: boolean | null
          session_token: string
          started_at?: string | null
          survey_id: number
          total_steps: number
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          current_step?: number
          id?: never
          locale?: string
          metadata?: Json | null
          respondent_id?: string | null
          screened_out?: boolean | null
          session_token?: string
          started_at?: string | null
          survey_id?: number
          total_steps?: number
        }
        Relationships: [
          {
            foreignKeyName: "survey_responses_survey_id_fkey"
            columns: ["survey_id"]
            isOneToOne: false
            referencedRelation: "surveys"
            referencedColumns: ["id"]
          },
        ]
      }
      surveys: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          slug: string
          status: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: never
          slug: string
          status?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: never
          slug?: string
          status?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      tag_suggestions: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          merged_into_tag_id: string | null
          name: string
          reviewed_by: string | null
          status: string | null
          suggested_by: string
          type: Database["public"]["Enums"]["tag_type"]
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          merged_into_tag_id?: string | null
          name: string
          reviewed_by?: string | null
          status?: string | null
          suggested_by: string
          type: Database["public"]["Enums"]["tag_type"]
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          merged_into_tag_id?: string | null
          name?: string
          reviewed_by?: string | null
          status?: string | null
          suggested_by?: string
          type?: Database["public"]["Enums"]["tag_type"]
        }
        Relationships: [
          {
            foreignKeyName: "tag_suggestions_merged_into_tag_id_fkey"
            columns: ["merged_into_tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      tags: {
        Row: {
          approved_by: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          name: string
          slug: string
          status: Database["public"]["Enums"]["tag_status"] | null
          type: Database["public"]["Enums"]["tag_type"]
          use_count: number | null
        }
        Insert: {
          approved_by?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          name: string
          slug: string
          status?: Database["public"]["Enums"]["tag_status"] | null
          type: Database["public"]["Enums"]["tag_type"]
          use_count?: number | null
        }
        Update: {
          approved_by?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          name?: string
          slug?: string
          status?: Database["public"]["Enums"]["tag_status"] | null
          type?: Database["public"]["Enums"]["tag_type"]
          use_count?: number | null
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          achievement_id: string
          id: string
          unlocked_at: string | null
          user_id: string
        }
        Insert: {
          achievement_id: string
          id?: string
          unlocked_at?: string | null
          user_id: string
        }
        Update: {
          achievement_id?: string
          id?: string
          unlocked_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_achievements_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_activity: {
        Row: {
          action: string
          created_at: string | null
          id: string
          server_name: string | null
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string | null
          id?: string
          server_name?: string | null
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string | null
          id?: string
          server_name?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_activity_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_preferences: {
        Row: {
          auto_detect: boolean
          created_at: string
          id: string
          preferred_locale: string
          updated_at: string
          user_id: string
        }
        Insert: {
          auto_detect?: boolean
          created_at?: string
          id?: string
          preferred_locale?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          auto_detect?: boolean
          created_at?: string
          id?: string
          preferred_locale?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: number
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          role: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_stats: {
        Row: {
          achievements_unlocked: number | null
          created_at: string | null
          hours_played: number | null
          id: string
          servers_joined: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          achievements_unlocked?: number | null
          created_at?: string | null
          hours_played?: number | null
          id?: string
          servers_joined?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          achievements_unlocked?: number | null
          created_at?: string | null
          hours_played?: number | null
          id?: string
          servers_joined?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_stats_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      custom_access_token_hook: { Args: { event: Json }; Returns: Json }
      generate_username: { Args: { display_name: string }; Returns: string }
      is_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "moderator"
      locale_enum: "en" | "es"
      review_status: "published" | "flagged" | "removed"
      review_type: "quick" | "detailed"
      tag_status: "predefined" | "experimental" | "established" | "archived"
      tag_type: "category" | "vibe" | "dimension"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator"],
      locale_enum: ["en", "es"],
      review_status: ["published", "flagged", "removed"],
      review_type: ["quick", "detailed"],
      tag_status: ["predefined", "experimental", "established", "archived"],
      tag_type: ["category", "vibe", "dimension"],
    },
  },
} as const
