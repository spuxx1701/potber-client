# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/).

## [1.3.0] - unreleased

### Added

- You can now tap on a post author's name to see their profile.

### Changed

- The application was moved to a kubernetes environment. By that, the application gained several beneficial features like high availability or rolling updates.
- Deployment is now handled via Flux GitOps pipelines. Prior environments have been replaced with a staging and a production environment. Deployment to staging is triggerd via commits to master. Deployment to production is triggered via releasing semantic versioning tags.

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
