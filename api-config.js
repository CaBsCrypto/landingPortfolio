// Social Media API Configuration
// Replace these with your actual API keys and tokens

const API_CONFIG = {
    // YouTube Data API v3
    // Get your API key from: https://console.developers.google.com/
    YOUTUBE_API_KEY: 'YOUR_YOUTUBE_API_KEY',
    
    // Twitter API v2
    // Get your Bearer Token from: https://developer.twitter.com/
    TWITTER_BEARER_TOKEN: 'YOUR_TWITTER_BEARER_TOKEN',
    
    // Telegram Bot API
    // Create a bot with @BotFather and get the token
    TELEGRAM_BOT_TOKEN: 'YOUR_TELEGRAM_BOT_TOKEN',
    
    // Instagram Basic Display API
    // Requires Facebook Developer account and app approval
    INSTAGRAM_ACCESS_TOKEN: 'YOUR_INSTAGRAM_ACCESS_TOKEN',
    
    // TikTok API (if available)
    // TikTok doesn't have a public API for follower counts
    TIKTOK_API_KEY: 'YOUR_TIKTOK_API_KEY'
};

// Alternative: Use third-party services for social media data
const THIRD_PARTY_SERVICES = {
    // Social Media APIs that aggregate data from multiple platforms
    SOCIALBLADE_API: 'YOUR_SOCIALBLADE_API_KEY',
    RAPIDAPI_SOCIAL: 'YOUR_RAPIDAPI_KEY',
    
    // Web scraping services (be careful with rate limits)
    SCRAPING_BEE_API: 'YOUR_SCRAPING_BEE_API_KEY',
    BRIGHT_DATA_API: 'YOUR_BRIGHT_DATA_API_KEY'
};

// Instructions for getting API keys:

/*
1. YOUTUBE API:
   - Go to https://console.developers.google.com/
   - Create a new project or select existing
   - Enable YouTube Data API v3
   - Create credentials (API Key)
   - Replace 'YOUR_YOUTUBE_API_KEY' with your actual key

2. TWITTER API:
   - Go to https://developer.twitter.com/
   - Apply for developer account
   - Create a new app
   - Generate Bearer Token
   - Replace 'YOUR_TWITTER_BEARER_TOKEN' with your actual token

3. TELEGRAM BOT:
   - Message @BotFather on Telegram
   - Create a new bot with /newbot
   - Get the bot token
   - Replace 'YOUR_TELEGRAM_BOT_TOKEN' with your actual token

4. INSTAGRAM API:
   - Go to https://developers.facebook.com/
   - Create a Facebook app
   - Add Instagram Basic Display product
   - Get access token (requires approval)
   - Replace 'YOUR_INSTAGRAM_ACCESS_TOKEN' with your actual token

5. TIKTOK API:
   - TikTok doesn't provide public API for follower counts
   - Consider using third-party services or web scraping
   - Be aware of rate limits and terms of service

IMPORTANT NOTES:
- Never commit API keys to public repositories
- Use environment variables in production
- Implement proper error handling
- Respect rate limits and terms of service
- Consider using a backend service to hide API keys
*/

// Export configuration (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { API_CONFIG, THIRD_PARTY_SERVICES };
}
