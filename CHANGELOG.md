# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/).

## [1.2.0] - unreleased

### Added

- The board dropdown menu does now contain a button for navigating to the first page.

### Changed

- When navigating to board and thread pages, the scroll position will no longer reset before the entire page has rendered.
- The loading indicator will now only be shown for slow transitions.

### Fixed

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
