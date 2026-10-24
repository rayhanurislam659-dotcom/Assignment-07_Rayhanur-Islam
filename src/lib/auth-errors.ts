type AuthErrorLike = {
  message?: string;
  code?: string;
  status?: number;
} | null;

const ERROR_MESSAGES: Record<string, string> = {
  INVALID_EMAIL_OR_PASSWORD: "ইমেইল বা পাসওয়ার্ড ঠিক নেই। আবার চেষ্টা করুন।",
  INVALID_EMAIL: "সঠিক ইমেইল ঠিকানা দিন।",
  INVALID_PASSWORD: "পাসওয়ার্ড সঠিক নয়।",
  PASSWORD_TOO_SHORT: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।",
  PASSWORD_TOO_LONG: "পাসওয়ার্ড অনেক বড় হয়ে গেছে।",
  USER_ALREADY_EXISTS: "এই ইমেইল দিয়ে একটি অ্যাকাউন্ট আগেই তৈরি করা হয়েছে।",
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL:
    "এই ইমেইল দিয়ে একটি অ্যাকাউন্ট আগেই তৈরি করা হয়েছে।",
  INVALID_NAME: "আপনার নাম কমপক্ষে ২ অক্ষরের হতে হবে।",
  EMAIL_NOT_VERIFIED: "প্রথমে ইমেইল যাচাই করুন।",
  TOO_MANY_REQUESTS: "একটু বেশি চেষ্টা হয়ে গেছে। কিছুক্ষণ পর আবার চেষ্টা করুন।",
  PROVIDER_NOT_FOUND: "এই সোশ্যাল লগইনটি এখনো চালু করা হয়নি।",
  SOCIAL_ACCOUNT_ALREADY_LINKED:
    "এই সোশ্যাল অ্যাকাউন্টটি অন্য একটি অ্যাকাউন্টে যুক্ত আছে।",
};

export function getAuthErrorMessage(
  error: AuthErrorLike,
  fallback = "কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।",
): string {
  if (!error) return fallback;
  if (error.code && ERROR_MESSAGES[error.code]) {
    return ERROR_MESSAGES[error.code];
  }
  return fallback;
}
