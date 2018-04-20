## Comment App Routes
- Should be able to navigate to an individual comment in the feed

## Comment Reactions
- Need better wording here

## Add a comment flag system
- Allow users to flag a comment once

## Allow hosts to kick a user out of an event
- Keep the signup but mark it as "banned".
- Update app logic to account for this.

## Notifications
- Send out notifications when someone replies to your comment, reacts to your comment
- Allow hosts to send a notification to everyone signed up
- Allow admins to send a notification to everyone
- Integrate with the browser api + service worker
- Send notifications to user if moderation action is taken (Kicked from event, banned, post flagged)
https://www.mongodb.com/blog/post/schema-design-for-social-inboxes-in-mongodb

^ Im not sure I like the approaches outlined in that post, so -->
 1. Something generates a 'notification'.
   * Has a message,
   * Optionally references an ID of something like a comment or a user,
   * Set target parameters (eg: signup id, user id, 'all'),
 2. App polls notification endpoint for most recent notifications and api joins "read" records on it.
 3. User marks notifications as read. This hits the API and generates a new "read" record
    for the notification.

## Add a moderation log
- View paginated log of comment flags, users removed from events, banned users, etc
 - Store a description of the action + Relevant Identifiers
 - The person who took the action
 - Who it was taken against
- Let people either resolve or acknowledge the log
  - eg: resolve comment flag === flagging the comment.
- Allow a version of the moderation log to exist on the event page for host user + admins

## "Online House Party"
- Allow users to fetch/post here regardless of event signup status
- Add more secondary CTA's to join the online house party

## Profile page
- Profile details
- Show signups/comments, give people option to hide this data from public view.

## Upload photos
- Change profile photo
- Add to top-level comment

## Add multi-process cluster
- ...

## Error Status pages

Open
----

## Server Side Rendering?

## Surge Hosting Still?
