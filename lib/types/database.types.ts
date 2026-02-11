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
      reviews: {
        Row: {
          content: string | null
          created_at: string | null
          helpful_count: number | null
          id: string
          ip_address: string | null
          is_featured: boolean | null
          is_verified_purchase: boolean | null
          language: string | null
          last_updated: string | null
          owner_response_at: string | null
          playtime_hours: number | null
          playtime_hours_approx: string | null
          rating: number | null
          server_id: string
          status: Database["public"]["Enums"]["review_status"]
          tags: string[] | null
          type: Database["public"]["Enums"]["review_type"]
          updated_at: string | null
          user_id: string
          version: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          helpful_count?: number | null
          id?: string
          ip_address?: string | null
          is_featured?: boolean | null
          is_verified_purchase?: boolean | null
          language?: string | null
          last_updated?: string | null
          owner_response_at?: string | null
          playtime_hours?: number | null
          playtime_hours_approx?: string | null
          rating?: number | null
          server_id: string
          status?: Database["public"]["Enums"]["review_status"]
          tags?: string[] | null
          type?: Database["public"]["Enums"]["review_type"]
          updated_at?: string | null
          user_id: string
          version?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          helpful_count?: number | null
          id?: string
          ip_address?: string | null
          is_featured?: boolean | null
          is_verified_purchase?: boolean | null
          language?: string | null
          last_updated?: string | null
          owner_response_at?: string | null
          playtime_hours?: number | null
          playtime_hours_approx?: string | null
          rating?: number | null
          server_id?: string
          status?: Database["public"]["Enums"]["review_status"]
          tags?: string[] | null
          type?: Database["public"]["Enums"]["review_type"]
          updated_at?: string | null
          user_id?: string
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_server_id_fkey"
            columns: ["server_id"]
            isOneToOne: false
            referencedRelation: "servers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      servers: {
        Row: {
          address: string | null
          category: string | null
          created_at: string | null
          description: string | null
          discord_invite: string | null
          featured_description: string | null
          id: string
          ip_address: string | null
          is_featured: boolean | null
          is_premium: boolean | null
          last_seen: string | null
          logo_url: string | null
          max_players: number | null
          name: string
          owner_id: string | null
          player_count: number | null
          port: number | null
          quality_score: number | null
          region: string | null
          server_version: string | null
          status: string | null
          tags: string[] | null
          updated_at: string | null
          uptime: number | null
          verification_status: string | null
          website: string | null
        }
        Insert: {
          address?: string | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          discord_invite?: string | null
          featured_description?: string | null
          id?: string
          ip_address?: string | null
          is_featured?: boolean | null
          is_premium?: boolean | null
          last_seen?: string | null
          logo_url?: string | null
          max_players?: number | null
          name: string
          owner_id?: string | null
          player_count?: number | null
          port?: number | null
          quality_score?: number | null
          region?: string | null
          server_version?: string | null
          status?: string | null
          tags?: string[] | null
          updated_at?: string | null
          uptime?: number | null
          verification_status?: string | null
          website?: string | null
        }
        Update: {
          address?: string | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          discord_invite?: string | null
          featured_description?: string | null
          id?: string
          ip_address?: string | null
          is_featured?: boolean | null
          is_premium?: boolean | null
          last_seen?: string | null
          logo_url?: string | null
          max_players?: number | null
          name?: string
          owner_id?: string | null
          player_count?: number | null
          port?: number | null
          quality_score?: number | null
          region?: string | null
          server_version?: string | null
          status?: string | null
          tags?: string[] | null
          updated_at?: string | null
          uptime?: number | null
          verification_status?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "servers_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      server_tags: {
        Row: {
          created_at: string | null
          id: string
          server_id: string
          tag_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          server_id: string
          tag_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          server_id?: string
          tag_id?: string
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
      survey_responses: {
        Row: {
          created_at: string | null
          id: string
          response_data: Json
          survey_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          response_data: Json
          survey_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          response_data?: Json
          survey_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "survey_responses_survey_id_fkey"
            columns: ["survey_id"]
            isOneToOne: false
            referencedRelation: "surveys"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "survey_responses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      surveys: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          questions: Json
          title: string
          type: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          questions: Json
          title: string
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          questions?: Json
          title?: string
          type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      tags: {
        Row: {
          color: string | null
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          name: string
          status: Database["public"]["Enums"]["tag_status"]
          type: Database["public"]["Enums"]["tag_type"]
          use_count?: number | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          status?: Database["public"]["Enums"]["tag_status"]
          type?: Database["public"]["Enums"]["tag_type"]
          use_count?: number | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          status?: Database["public"]["Enums"]["tag_status"]
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
          role?: Database["public"]["Enums"]["app_role"]
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
