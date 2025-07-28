# Overview Screen

## Purpose
The overview screen serves authentication portal for mointoring for new surgery order letters and autoposting to an airtable

## ECW Integration
- **Authentication**: OAuth2 PKCE flow for eClinicalWorks
- **Manual Process**: Requires user to click "Connect ECW" button
- **Automatic Polling**: Currently implementing background data fetching

## Airtable Integration  
- **Auto and Manual ECW polling**: User must click "Connect ECW" button to authenthciate first. That 
- **Sample Data**: Posts surgery case information (ACL repair example)
- **Auto-Sync**


## Overall Flow
1. User authenticates with ECW manually (main)/home route
2. Application polls ECW which autoposts to Airtable
