# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/).

## [1.10.0] - unreleased

### Added

- The project now uses [glint](https://github.com/typed-ember/glint) for typechecking. Temporarily, the linting job is no longer required to succeed for pipelines to finish.
- The project now includes support for [gjs/gts template syntax](https://github.com/ember-template-imports/ember-template-imports) (meaning [first class component templates](https://rfcs.emberjs.com/id/0779-first-class-component-templates/)).

### Changed

- The nav button that returns the user the parent layer (e.g. the board if the user is currently in a thread) now uses an upwards arrow to better stand out from similar functions.
- When navigating to a thread via a bookmark, read posts will now be marked via a separator instead of decreased opacity.
- Copying a post url now uses the origianal forum's url.
- Specific forum.mods.de urls will now point to the corresponding potber urls. The behavior can be disabled in the settings.
- Several parts of the app have been refactored.

### Fixed

- Fixed an issue with the sidebar not closing in mobile devices when navigating to an unread private message.
- Fixed an issue with long words not properly being broken into a new line.
- HTMl and emojis in private messages are now being parsed properly.

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
