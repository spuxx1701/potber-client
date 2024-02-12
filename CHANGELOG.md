# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/).

## [1.18.2]

### Changed

- Videos on autoplay are now muted by default.

### Fixed

- Fixed an issue where copying a direct link to a post would not return the link in the proper format.
- Fixed an issue that would break the styles of `ember-cli-notifications`.

### Chores

- Bumped `@types/ember__service` from `4.0.2` to `4.0.9`.
- Bumped `ember-cli-notifications` from `8.0.0` to `9.0.0`.

## [1.18.1] - 2024-01-31

### Fixed

- The refresh button in the sidebar should no longer cause visual artifacts while the sidebar is collapsed.

## [1.18.0] - 2024-01-29

### Added

- Added an option to hide global and announcement threads.
- Added dynamic transitions. They can be enabled via the 'Transitions' setting.
- Added warning notifications in case certain requests take longer than expected.
- `ApiService` now offers internal status handling as well as silent requests.

### Changed

- Improved how deleted users are being displayed.
- `/threads` route data is now being loaded lazily. A skeleton thread page will be rendered during load.
- If automatic refreshing of the newsfeed is enabled, the newsfeed will now also be refreshed when browsing and on a regular interval.
- Avatars are now enabled by default.
- Clicking on a an avatar now shows the user profile.

### Fixed

- The post form's submit button now shows whether the post has been submitted (both in desktop and mobile view).
- Fixed an issue that would lead to the kebap menu being cut off if the option 'Darken read posts' was enabled.
- Fixed a couple of styling inconsistencies.

### Chores

- Migrated build system to [embroider](https://github.com/embroider-build/embroider).
- Introduced [postcss and other modern css tools](https://discuss.emberjs.com/t/ember-modern-css/19614).
- Migrated several components to `.gts` and the css module pattern.
- Added /metrics route to the NGINX server.
- Staging and production builds no longer use different build pipelines. Environment-specific values are now being injected through `injected-config.js` served by NGINX.

## [1.17.5] - 2023-12-23

### Fixed

- Fixed the unbearable situation of potber not using christmas icons.

## [1.17.4] - 2023-12-21

### Fixed

- In Safari, the preview and submit buttons of the post form have now also been moved to the footer to prevent the buttons not being visible.

## [1.17.3] - 2023-12-21

### Fixed

- Fixed an issue that would prevent scroll position to update properly after certain route changes.

## [1.17.2] - 2023-12-21

### Fixed

- Fixed an issue that would cause post order to be reversed after navigating from the post form view to the thread view.

## [1.17.1] - 2023-12-21

### Fixed

- Improved backwards compatibility regarding login routes.

## [1.17.0] - 2023-12-21

### Added

- Bookmarks now indicate whether the corresponding thread has been closed.
- Added the option to delete bookmarks via the kebap menu within the thread view.
- The in-app changelog now includes a `chores` section.

### Changed

- The application now uses [potber-auth](https://github.com/spuxx1701/potber-auth) for authentication.

### Fixed

- Fixed an issue that would cause tables not being displayed properly on Chrome.
- Fixed an issue where direct links to a thread (without providing a post id) would cause an error.
- Ordered lists are now being parsed properly.
- Various smaller fixes.

### Chores

- Added support for `nvm`.
- Started the migration from `ember-data` to a custom solution for data fetching and handling. The reasoning behind this change can be read [here](https://github.com/spuxx1701/potber-client/issues/213).

## [1.16.0] - 2023-11-13

### Added

- Users can now navigate to the top or bottom of a thread's page via the kebap menu.
- Implemented `InfoButton` component. `Dropdown` can now has an optional `InfoButton` block.
- Users can now control whether the app should jump to the bottom of the page when navigating to a thread from a board.

### Changed

- Gestures can now also be enabled for only the sidebar.
- Desktop layout was slightly improved.

### Fixed

- Minor improvements to overscrolling behavior.
- Various smaller fixes.

## [1.15.0] - 2023-11-02

### Added

- Implemented basic support for gestures. It can be enabled in the settings.
- Implemented a togglable debug mode. It can be enabled in the settings.

## [1.14.0] - 2023-10-27

### Added

- Author names now show whether the user account has been locked.

## Changed

- App received a new branding again (hopefully for the last time). Thanks to user `Sir Maximilion` for the great animation!

### Fixed

- Account for another possible syntax when replacing forum URLs with potber URLs.
- Specific combinations of the `[url]` and `[img]` tags are now being parsed proeprly.
- Large tables are now readable.
- Various smaller fixes.

## [1.13.0] - 2023-10-20

### Added

- It is now possible to report posts via the kebap menu in the post header.
- It is now possible to mark private messages as unread.
- It is now possible to move private messages to another folder.
- It is now possible to delete private messages.
- Introduced `ember-intl` for easier maintenance of texts.

## [1.12.0] - 2023-10-19

### Added

- The application now supports customized color themes.

### Changed

- The `bookmarks` route has been slightly redesigned.
- Grouping and categories within the settings have been redesigned.
- Avatars are now `on` by default.

### Fixed

- Fixed a couple of issues affecting menu buttons.
- Fixed an issue where words would not wrap properly across line breaks.

## [1.11.1] - 2023-10-18

### Fixed

- `[mod]` tags are now not being parsed when used by a user without moderation privileges.

## [1.11.0] - 2023-10-18

### Changed

- PWA received a new branding.
- On mobile devices, nav buttons are now being hidden when the sidebar is expanded.
- Updated `robots.txt` to prevent search bots from indexing the page.

### Fixed

- Fixed an issue that prevented the loading indicator from being visible.
- Fixed an issue that prevented certain forum.mods.de links to be parsed properly.
- Fixed an issue that prevented navigating to the full user profile.
- Fixed an issue that prevented URLs from being parsed properly if they contained emoji patterns.

## [1.10.2] - 2023-10-14

### Fixed

- Fixed an issue that prevented posts from navigating to the original forum version of a post.
- Fixed an issue that caused original forum urls to not be replaced with the corresponding potber urls in some cases.

## [1.10.1] - 2023-10-13

### Changed

- Reenabled darkening posts that have already been read as an optional behavior.
- Slight visual changes to tables.

### Fixed

- Fixed an issue that prevented `video` tags from being parsed if they contained the `play` parameter.
- Fixed an issue that affected parsing lists.

## [1.10.0] - 2023-10-12

### Added

- The project now uses [glint](https://github.com/typed-ember/glint) for typechecking. Temporarily, the linting job is no longer required to succeed for pipelines to finish.
- The project now includes support for [gjs/gts template syntax](https://github.com/ember-template-imports/ember-template-imports) (meaning [first class component templates](https://rfcs.emberjs.com/id/0779-first-class-component-templates/)).
- When embedding images, users may now provide a second URL that will be used as the thumbnail.

### Changed

- The nav button that returns the user the parent layer (e.g. the board if the user is currently in a thread) now uses an upwards arrow to better stand out from similar functions.
- When navigating to a thread via a bookmark, read posts will now be marked via a separator instead of decreased opacity.
- Copying a post url now uses the origianal forum's url.
- Specific forum.mods.de urls will now point to the corresponding potber urls. The behavior can be disabled in the settings.
- Several parts of the app have been refactored.

### Fixed

- Fixed an issue with the sidebar not closing in mobile devices when navigating to an unread private message.
- Fixed an issue with long words not properly being broken into a new line.
- HTML and emojis in private messages are now being parsed properly.

## [1.9.1] - 2023-09-07

### Fixed

- Fixed an issue where submitting a post was not possible.

## [1.9.0] - 2023-09-07

### Added

- Videos are now embedded into containers that include a hyperlink to the video source.

### Fixed

- Embedded youtube videos no allow switching to fullscreen.
- Fixed an issue with the menu button of a saved post in the bookmarks menu expanding outside the viewport.
- Improved user experience within the post form for mobile Chrome and Firefox. In particular, the visual keyboard no longer hides the submit button.
- Fixed a couple of issues caused by the customizable font size.
- Fixed various minor visual bugs.

## [1.8.0] - 2023-09-06

### Added

- Users may now customize the font size.

### Changed

- Page content now uses a fair amount of bottom padding in desktop mode to make it easier to read the bottom-most posts.
- The app skeleton now uses a cute kitty as a busy indicator. 😻

### Fixed

- The app no longer creates double line breaks in case of CRLF line endings.

## [1.7.1] - 2023-08-18

### Fixed

- Fixed an issue with the loading indicator not being visible.
- Fixed an issue where certain emojis would not be parsed properly.
- Fixed an issue where URL tags would not be parsed properly if they would cover multiple lines.
- Fixed an issue with the PWA header's color not maching the application's header color.

## [1.7.0] - 2023-07-24

### Added

- Private messages can now viewed inside the application.
- User profiles now include information about the account age.
- The application now has a loading skeleton that improves perceived responsiveness.

### Changed

- The application now uses `potber-api`'s new `posts/:id/quote` route when quoting messages.

### Fixed

- `<textarea>` now inherits font settings.
- `staging` build process now properly fingerprints.
- Occasionally, the version check fails on cold starts of the PWA. If that happens, the application no longer breaks.

## [1.6.2] - 2023-07-21

### Changed

- Passwords may now contain up to 100 characters.

## [1.6.1] - 2023-07-15

### Fixed

- Fixed a bug where editing a post was not possible.

## [1.6.0] - 2023-07-15

### Added

- Custom `<textarea>` component added. The component may also be used via the `input` modal.

### Changed

- `[code]`, `[quote]` and `[spoiler]` tag buttons in the post form now use textarea modals.

### Fixed

- Removed some `console.log()`s.

## [1.5.3] - 2023-06-30

### Fixed

- BBCode that is contained in [code] tags will no longer be parsed to HTML.

## [1.5.2] - 2023-06-17

### Fixed

- Post content is now being sanitized and all HTML is being escaped before parsing BBCode.

## [1.5.1] - 2023-06-08

### Fixed

- Video tags now use valid HTML and no longer prevent successive content from rendering.

### Changed

- Some minor changes to session management in preparation for `v6` of `ember-simple-auth`.

## [1.5.0] - 2023-06-04

### Added

- Added support for `[trigger]` tag.

### Changed

- The BBCode parser has been rewritten from the ground up. BBCode parsing should now work much better.

## [1.4.0] - 2023-06-04

### Changed

- Significantly improved desktop experience.

### Fixed

- Worked on fixing the BBCode parsing. Unfortunately, this is not noticable by the user yet.
- The PWA now respects both the device's orientation and rotation lock.
- Added missing 'FrogeLove' meme.
- Fixed some unit tests not being executed properly.

## [1.3.0] - 2023-06-02

### Added

- The newsfeed now displays and links to unread incoming private messages. A red indicator on top of sidebar toggle indicates unread messages.
- Froge memes are now available.
- The PWA now supports landscape orientation.
- You can now tap on a post author's name to see their profile.

### Changed

- The application was moved to a kubernetes environment. By that, the application gained several beneficial features like high availability or rolling updates.
- Deployment is now handled via Flux GitOps pipelines. Prior environments have been replaced with a staging and a production environment. Deployment to staging is triggerd via commits to master. Deployment to production is triggered via releasing semantic versioning tags.

### Fixed

- Fixed multiple mostly visual bugs.

## [1.2.1] - 2023-04-02

### Fixed

- Fixed an issue where the scroll position would mess up when quoting posts.

## [1.2.0] - 2023-04-01

### Added

- The post form now includes a preview function.
- Added the ability to save posts locally.
- Added a dialog to post form for adding specific memes.
- The sidebar toggle now displays a small dot indicating whether there are any news.
- The board dropdown menu does now contain a button for navigating to the first page.

### Changed

- When navigating to board and thread pages, the scroll position will no longer reset before the entire page has rendered.
- The loading indicator will now only be shown for slow transitions.

### Fixed

- When opening bookmarks, the correct number of posts are now being faded out.
- Various improvements and fixes to the scroll behavior after page changes.
- When switching boards, the page is no longer being persisted.
- Spoiler button now uses the correct tags.
- Fixed multiple mostly visual bugs.

## [1.1.1] - 2022-02-27

### Fixed

- Fixed avatars not being displayed.

## [1.1.0] - 2022-02-27

### Added

- Sidebar layout and position is now customizable.
- Added function to navigate back to various pages.
- Added a new home page that displays the same quickstart menu as the sidebar does.
- Expanding the sidebar now also refreshes the newsfeed.

### Changed

- Moves session view to settings route.
- Settings are now stored as a single localStorage property.

### Removed

- Removed session route.

### Fixed

- Fixed multiple mostly visual bugs.

## [1.0.3] - 2023-02-23

### Fixed

- Fixed an issue where the post context menu was being clipped.

## [1.0.2] - 2023-02-21

### Fixed

- Fixed an issue where embedded videos would prevent the following post content from rendering properly.
- Fixed an issue where BBCode code blocks and tables were not scrollable horizontally.
- Fixed an issue where posts would not display properly in 'Hobelware' design mode.

## [1.0.1] - 2023-02-19

### Fixed

- Fixed an issue where the bottom nav would occupy too much space on iOS.

## [1.0.0] - 2023-02-19

### Initial release.
