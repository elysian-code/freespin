// src/types/supabaseTypes.ts

export type User = {
    id: string;                 // UUID of the user
    email: string;              // User's email
    name: string;               // User's name
    is_verified: boolean;       // Email verification status
    created_at: string;         // Timestamp of when the user was created
  } | null;
  
  export type AccountBalance = {
    id: string;                 // UUID of the balance entry
    user_id: string;            // UUID referencing the user
    main_balance: number;       // Total balance in the user's account
    available_balance: number;  // Amount available for spending/investment
    withdrawable_balance: number; // Amount available for withdrawal
    investment_balance: number; // Amount currently invested
    updated_at: string;         // Timestamp of the last update to balances
  };
  
  export type Fund = {
    id: string;                 // UUID of the fund entry
    user_id: string;            // UUID referencing the user
    amount: number;             // Transaction amount
    transaction_type: 'deposit' | 'withdrawal'; // Type of transaction
    crypto_type: string;        // Type of cryptocurrency used
    wallet_address: string;     // Wallet address used for the transaction
    status: 'pending' | 'success' | 'failed';  // Status of the transaction
    created_at: string;         // Timestamp of the transaction
  } | null;
  
  export type Investment = {
    id: string;                 // UUID of the investment entry
    user_id: string;            // UUID referencing the user
    amount: number;             // Investment amount
    investment_type: string;    // Type of investment (e.g., crypto, stock)
    status: 'active' | 'completed' | 'failed';  // Status of the investment
    created_at: string;         // Timestamp of the investment creation
    updated_at: string;         // Timestamp of the last update
  } | null;
  
  export type UserSetting = {
    id: string;                 // UUID of the settings entry
    user_id: string;            // UUID referencing the user
    receive_email_notifications: boolean;  // If the user wants to receive email notifications
    receive_sms_notifications: boolean;    // If the user wants to receive SMS notifications
    receive_push_notifications: boolean;   // If the user wants to receive push notifications
  } | null;
  
  export type Notification = {
    id: string;                 // UUID of the notification entry
    user_id: string;            // UUID referencing the user
    title: string;              // Title of the notification
    message: string;            // Notification message content
    is_read: boolean;           // Whether the notification has been read
    created_at: string;         // Timestamp of when the notification was created
  } | null;
  
  export type Verification = {
    id: string;                 // UUID of the verification entry
    user_id: string;            // UUID referencing the user
    document_type: string;      // Type of document used for verification (e.g., passport, ID)
    document_url: string;       // URL to the uploaded document
    status: 'pending' | 'approved' | 'rejected';  // Status of the verification
    created_at: string;         // Timestamp of the verification request
    updated_at: string;         // Timestamp of the last update to the verification status
  } | null;
  
  export type Transaction = {
    id: string;                 // UUID of the transaction entry
    user_id: string;            // UUID referencing the user
    transaction_type: 'deposit' | 'withdrawal';  // Type of transaction
    crypto_type: string;        // Type of cryptocurrency used
    wallet_address: string;     // Wallet address used for the transaction
    amount: number;             // Amount transferred
    status: 'pending' | 'completed' | 'failed';  // Status of the transaction
    created_at: string;         // Timestamp of the transaction creation
  } | null;
  
  export type AuditLog = {
    id: string;                 // UUID of the audit log entry
    user_id: string;            // UUID referencing the user
    action: string;             // Description of the action taken
    created_at: string;         // Timestamp of the action
  } | null;
  