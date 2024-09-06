export type Json =
  | string
  | number
  | boolean
  | null
  | {[key: string]: Json | undefined}
  | Json[];

export type Database = {
  public: {
    Tables: {
      announcements: {
        Row: {
          contents: string;
          created_at: string | null;
          id: number;
          subject: string;
        };
        Insert: {
          contents: string;
          created_at?: string | null;
          id?: never;
          subject: string;
        };
        Update: {
          contents?: string;
          created_at?: string | null;
          id?: never;
          subject?: string;
        };
        Relationships: [];
      };
      appointment: {
        Row: {
          address: string;
          appointment_agreement_deadline_date: string | null;
          appointment_date: string;
          appointment_status: string;
          contents: string | null;
          created_at: string | null;
          deal_piggy_count: number;
          id: number;
          latitude: number | null;
          longitude: number | null;
          participant_count: number;
          place_name: string;
          proposer_id: string | null;
          subject: string | null;
        };
        Insert: {
          address: string;
          latitude?: number | null;
          longitude?: number | null;
          appointment_agreement_deadline_date?: string | null;
          appointment_date: string;
          appointment_status?: string;
          contents?: string | null;
          created_at?: string | null;
          deal_piggy_count: number;
          id?: number;
          participant_count?: number;
          place_name: string;
          proposer_id?: string | null;
          subject?: string | null;
        };
        Update: {
          address?: string;
          appointment_agreement_deadline_date?: string | null;
          appointment_date?: string;
          appointment_status?: string;
          contents?: string | null;
          created_at?: string | null;
          deal_piggy_count?: number;
          id?: never;
          latitude?: number | null;
          longitude?: number | null;
          participant_count?: number;
          place_name?: string;
          proposer_id?: string | null;
          subject?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_appointment_status';
            columns: ['appointment_status'];
            isOneToOne: false;
            referencedRelation: 'appointment_status_category';
            referencedColumns: ['appointment_status'];
          },
          {
            foreignKeyName: 'fk_user_id';
            columns: ['proposer_id'];
            isOneToOne: false;
            referencedRelation: 'users_nickname';
            referencedColumns: ['id'];
          },
        ];
      };
      appointment_cancellation_request_log: {
        Row: {
          appointment_id: number | null;
          cancellation_status: string | null;
          id: number;
          response_at: string | null;
          user_id: string | null;
        };
        Insert: {
          appointment_id?: number | null;
          cancellation_status?: string | null;
          id?: never;
          response_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          appointment_id?: number | null;
          cancellation_status?: string | null;
          id?: never;
          response_at?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_appointment_id';
            columns: ['appointment_id'];
            isOneToOne: false;
            referencedRelation: 'appointment';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'fk_status';
            columns: ['cancellation_status'];
            isOneToOne: false;
            referencedRelation: 'appointment_status_category';
            referencedColumns: ['appointment_status'];
          },
          {
            foreignKeyName: 'fk_user_id';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users_nickname';
            referencedColumns: ['id'];
          },
        ];
      };
      appointment_participants: {
        Row: {
          agreement_status: string;
          appointment_id: number | null;
          certification_latitude: number | null;
          certification_longitude: number | null;
          certification_status: boolean | null;
          certification_time: string | null;
          created_at: string | null;
          id: number;
          list_displayed: boolean | null;
          nickname: string | null;
          pinned: boolean | null;
          updated_at: string | null;
          user_id: string | null;
        };
        Insert: {
          agreement_status?: string;
          appointment_id?: number | null;
          certification_latitude?: number | null;
          certification_longitude?: number | null;
          certification_status?: boolean | null;
          certification_time?: string | null;
          created_at?: string | null;
          id?: never;
          list_displayed?: boolean | null;
          nickname?: string | null;
          pinned?: boolean | null;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          agreement_status?: string;
          appointment_id?: number | null;
          certification_latitude?: number | null;
          certification_longitude?: number | null;
          certification_status?: boolean | null;
          certification_time?: string | null;
          created_at?: string | null;
          id?: never;
          list_displayed?: boolean | null;
          nickname?: string | null;
          pinned?: boolean | null;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_appointment_id';
            columns: ['appointment_id'];
            isOneToOne: false;
            referencedRelation: 'appointment';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'fk_nickname';
            columns: ['nickname'];
            isOneToOne: false;
            referencedRelation: 'users_nickname';
            referencedColumns: ['nickname'];
          },
          {
            foreignKeyName: 'fk_user_id';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users_nickname';
            referencedColumns: ['id'];
          },
        ];
      };
      appointment_status_category: {
        Row: {
          appointment_status: string;
          description: string;
          id: number;
        };
        Insert: {
          appointment_status: string;
          description: string;
          id?: never;
        };
        Update: {
          appointment_status?: string;
          description?: string;
          id?: never;
        };
        Relationships: [];
      };
      frquently_asked_questions: {
        Row: {
          answer: string;
          created_at: string | null;
          id: number;
          question: string;
        };
        Insert: {
          answer: string;
          created_at?: string | null;
          id?: never;
          question: string;
        };
        Update: {
          answer?: string;
          created_at?: string | null;
          id?: never;
          question?: string;
        };
        Relationships: [];
      };
      inquiry_log: {
        Row: {
          contents: string | null;
          email: string | null;
          id: number;
          inquiry_date: string | null;
          response: string | null;
          response_date: string | null;
          subject: string | null;
          user_id: string | null;
        };
        Insert: {
          contents?: string | null;
          email?: string | null;
          id?: never;
          inquiry_date?: string | null;
          response?: string | null;
          response_date?: string | null;
          subject?: string | null;
          user_id?: string | null;
        };
        Update: {
          contents?: string | null;
          email?: string | null;
          id?: never;
          inquiry_date?: string | null;
          response?: string | null;
          response_date?: string | null;
          subject?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_user_id';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users_nickname';
            referencedColumns: ['id'];
          },
        ];
      };
      notification_category: {
        Row: {
          description: string | null;
          filter_criteria: string | null;
          id: number;
          notification_category: string;
        };
        Insert: {
          description?: string | null;
          filter_criteria?: string | null;
          id?: never;
          notification_category: string;
        };
        Update: {
          description?: string | null;
          filter_criteria?: string | null;
          id?: never;
          notification_category?: string;
        };
        Relationships: [];
      };
      notification_log: {
        Row: {
          confirmed_at: string | null;
          confirmed_status: boolean | null;
          created_at: string | null;
          filter_criteria: string | null;
          id: number;
          notification_category: string | null;
          notification_contents: string | null;
          notification_displayed: boolean | null;
          notification_subject: string | null;
          redirect_key_id_value: number | null;
          redirect_key_type: string | null;
          user_id: string | null;
        };
        Insert: {
          confirmed_at?: string | null;
          confirmed_status?: boolean | null;
          created_at?: string | null;
          filter_criteria?: string | null;
          id?: never;
          notification_category?: string | null;
          notification_contents?: string | null;
          notification_displayed?: boolean | null;
          notification_subject?: string | null;
          redirect_key_id_value?: number | null;
          redirect_key_type?: string | null;
          user_id?: string | null;
        };
        Update: {
          confirmed_at?: string | null;
          confirmed_status?: boolean | null;
          created_at?: string | null;
          filter_criteria?: string | null;
          id?: never;
          notification_category?: string | null;
          notification_contents?: string | null;
          notification_displayed?: boolean | null;
          notification_subject?: string | null;
          redirect_key_id_value?: number | null;
          redirect_key_type?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_notification_category';
            columns: ['notification_category', 'filter_criteria'];
            isOneToOne: false;
            referencedRelation: 'notification_category';
            referencedColumns: ['notification_category', 'filter_criteria'];
          },
          {
            foreignKeyName: 'fk_redirect_key_type';
            columns: ['redirect_key_type'];
            isOneToOne: false;
            referencedRelation: 'notification_redirect_key_category';
            referencedColumns: ['redirect_key_type'];
          },
          {
            foreignKeyName: 'fk_user_id';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users_nickname';
            referencedColumns: ['id'];
          },
        ];
      };
      notification_redirect_key_category: {
        Row: {
          id: number;
          redirect_key_description: string | null;
          redirect_key_type: string;
        };
        Insert: {
          id?: never;
          redirect_key_description?: string | null;
          redirect_key_type: string;
        };
        Update: {
          id?: never;
          redirect_key_description?: string | null;
          redirect_key_type?: string;
        };
        Relationships: [];
      };
      orderd_log: {
        Row: {
          id: number;
          orderd_date: string | null;
          ordered_goods_id: string;
          user_id: string;
        };
        Insert: {
          id?: never;
          orderd_date?: string | null;
          ordered_goods_id: string;
          user_id: string;
        };
        Update: {
          id?: never;
          orderd_date?: string | null;
          ordered_goods_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_user_id';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users_nickname';
            referencedColumns: ['id'];
          },
        ];
      };
      payment_terms: {
        Row: {
          contents: string | null;
          created_at: string | null;
          id: number;
          title: string | null;
        };
        Insert: {
          contents?: string | null;
          created_at?: string | null;
          id?: never;
          title?: string | null;
        };
        Update: {
          contents?: string | null;
          created_at?: string | null;
          id?: never;
          title?: string | null;
        };
        Relationships: [];
      };
      piggy: {
        Row: {
          id: number;
          latest_piggy_count: number;
          user_id: string;
        };
        Insert: {
          id?: never;
          latest_piggy_count?: number;
          user_id: string;
        };
        Update: {
          id?: never;
          latest_piggy_count?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_id';
            columns: ['user_id'];
            isOneToOne: true;
            referencedRelation: 'users_nickname';
            referencedColumns: ['id'];
          },
        ];
      };
      piggy_changed_category: {
        Row: {
          changed_category: string;
          id: number;
        };
        Insert: {
          changed_category: string;
          id?: never;
        };
        Update: {
          changed_category?: string;
          id?: never;
        };
        Relationships: [];
      };
      piggy_changed_log: {
        Row: {
          appointment_id: number | null;
          changed_category: string | null;
          diff_piggy_count: number | null;
          diff_piggy_date: string | null;
          gift_id: number | null;
          id: number;
          present_piggy_count: number | null;
          purchase_id: number | null;
          user_id: string;
        };
        Insert: {
          appointment_id?: number | null;
          changed_category?: string | null;
          diff_piggy_count?: number | null;
          diff_piggy_date?: string | null;
          gift_id?: number | null;
          id?: never;
          present_piggy_count?: number | null;
          purchase_id?: number | null;
          user_id: string;
        };
        Update: {
          appointment_id?: number | null;
          changed_category?: string | null;
          diff_piggy_count?: number | null;
          diff_piggy_date?: string | null;
          gift_id?: number | null;
          id?: never;
          present_piggy_count?: number | null;
          purchase_id?: number | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_appointment_id';
            columns: ['appointment_id'];
            isOneToOne: false;
            referencedRelation: 'appointment';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'fk_changed_category';
            columns: ['changed_category'];
            isOneToOne: false;
            referencedRelation: 'piggy_changed_category';
            referencedColumns: ['changed_category'];
          },
          {
            foreignKeyName: 'fk_gift_id';
            columns: ['gift_id'];
            isOneToOne: false;
            referencedRelation: 'piggy_gift_log';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'fk_id';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'piggy';
            referencedColumns: ['user_id'];
          },
          {
            foreignKeyName: 'fk_purchase_id';
            columns: ['purchase_id'];
            isOneToOne: false;
            referencedRelation: 'piggy_purchase_log';
            referencedColumns: ['id'];
          },
        ];
      };
      piggy_gift_log: {
        Row: {
          gift_date: string | null;
          gift_piggy_count: number;
          gift_piggy_id_from: string;
          gift_piggy_id_to: string;
          id: number;
        };
        Insert: {
          gift_date?: string | null;
          gift_piggy_count: number;
          gift_piggy_id_from: string;
          gift_piggy_id_to: string;
          id?: never;
        };
        Update: {
          gift_date?: string | null;
          gift_piggy_count?: number;
          gift_piggy_id_from?: string;
          gift_piggy_id_to?: string;
          id?: never;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_id';
            columns: ['gift_piggy_id_to'];
            isOneToOne: false;
            referencedRelation: 'piggy';
            referencedColumns: ['user_id'];
          },
        ];
      };
      piggy_purchase_category: {
        Row: {
          id: number;
          payment_amount: number;
          piggy_count: number;
        };
        Insert: {
          id?: never;
          payment_amount: number;
          piggy_count: number;
        };
        Update: {
          id?: never;
          payment_amount?: number;
          piggy_count?: number;
        };
        Relationships: [];
      };
      piggy_purchase_log: {
        Row: {
          id: number;
          payment_amount: number;
          purchase_date: string | null;
          purchase_piggy_count: number;
          user_id: string;
        };
        Insert: {
          id?: never;
          payment_amount: number;
          purchase_date?: string | null;
          purchase_piggy_count: number;
          user_id: string;
        };
        Update: {
          id?: never;
          payment_amount?: number;
          purchase_date?: string | null;
          purchase_piggy_count?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_id';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'piggy';
            referencedColumns: ['user_id'];
          },
          {
            foreignKeyName: 'fk_piggy_purchase';
            columns: ['purchase_piggy_count', 'payment_amount'];
            isOneToOne: false;
            referencedRelation: 'piggy_purchase_category';
            referencedColumns: ['piggy_count', 'payment_amount'];
          },
        ];
      };
      service_terms: {
        Row: {
          contents: string | null;
          created_at: string | null;
          id: number;
          title: string | null;
        };
        Insert: {
          contents?: string | null;
          created_at?: string | null;
          id?: never;
          title?: string | null;
        };
        Update: {
          contents?: string | null;
          created_at?: string | null;
          id?: never;
          title?: string | null;
        };
        Relationships: [];
      };
      testtable: {
        Row: {
          name: string | null;
          target: boolean | null;
        };
        Insert: {
          name?: string | null;
          target?: boolean | null;
        };
        Update: {
          name?: string | null;
          target?: boolean | null;
        };
        Relationships: [];
      };
      user_friend_relationship: {
        Row: {
          friend_request_date: string | null;
          id: number;
          id_from: string;
          id_to: string;
        };
        Insert: {
          friend_request_date?: string | null;
          id?: never;
          id_from: string;
          id_to: string;
        };
        Update: {
          friend_request_date?: string | null;
          id?: never;
          id_from?: string;
          id_to?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_id_from';
            columns: ['id_from'];
            isOneToOne: false;
            referencedRelation: 'users_nickname';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'fk_id_to';
            columns: ['id_to'];
            isOneToOne: false;
            referencedRelation: 'users_nickname';
            referencedColumns: ['id'];
          },
        ];
      };
      user_signup: {
        Row: {
          social_login_type: string | null;
          sso_id: string | null;
          user_id: string | null;
        };
        Insert: {
          social_login_type?: string | null;
          sso_id?: string | null;
          user_id?: string | null;
        };
        Update: {
          social_login_type?: string | null;
          sso_id?: string | null;
          user_id?: string | null;
        };
        Relationships: [];
      };
      users_nickname: {
        Row: {
          created_at: string | null;
          email: string;
          id: string;
          nickname: string;
          notification_agreement: boolean | null;
          payment_terms_agreement: boolean;
          service_terms_agreement: boolean;
          social_login_type: string | null;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          email: string;
          id: string;
          nickname?: string;
          notification_agreement?: boolean | null;
          payment_terms_agreement?: boolean;
          service_terms_agreement?: boolean;
          social_login_type?: string | null;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          email?: string;
          id?: string;
          nickname?: string;
          notification_agreement?: boolean | null;
          payment_terms_agreement?: boolean;
          service_terms_agreement?: boolean;
          social_login_type?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      description: {
        Args: {
          table_name_input: string;
        };
        Returns: {
          column_name: string;
          data_type: string;
          is_nullable: string;
          column_default: string;
          constraint_type: string;
        }[];
      };
      insert_appointment_participants: {
        Args: {
          appointment_id: number;
          participants_uuid: string[];
        };
        Returns: undefined;
      };
      select_appointment_list_detail: {
        Args: {
          user_uuid: string;
        };
        Returns: undefined;
      };
      selet_my_profile: {
        Args: {
          user_uuid: string;
        };
        Returns: undefined;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | {schema: keyof Database},
  TableName extends PublicTableNameOrOptions extends {schema: keyof Database}
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends {schema: keyof Database}
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
      PublicSchema['Views'])
  ? (PublicSchema['Tables'] &
      PublicSchema['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | {schema: keyof Database},
  TableName extends PublicTableNameOrOptions extends {schema: keyof Database}
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends {schema: keyof Database}
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | {schema: keyof Database},
  TableName extends PublicTableNameOrOptions extends {schema: keyof Database}
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends {schema: keyof Database}
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | {schema: keyof Database},
  EnumName extends PublicEnumNameOrOptions extends {schema: keyof Database}
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends {schema: keyof Database}
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
  ? PublicSchema['Enums'][PublicEnumNameOrOptions]
  : never;
