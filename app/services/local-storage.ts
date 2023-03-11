import { action } from '@ember/object';
import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import ENV from 'potber-client/config/environment';
import Board from 'potber-client/models/board';
import MessagesService from './messages';
import { clean, valid, gt } from 'semver';
import CustomStore from './custom-store';
import { Settings } from './settings';
import Post from 'potber-client/models/post';
import { PersistedSavedPost } from 'potber-client/components/features/bookmarks/saved-posts/post';

const PREFIX = 'potber-';

export default class LocalStorageService extends Service {
  @service declare store: CustomStore;
  @service declare messages: MessagesService;

  @tracked boardFavorites: Board[] | null = [];
  @tracked savedPosts: Post[] | null = [];

  async initialize() {
    await this.getBoardFavorites();
  }

  /**
   * Reads 'settings' from localStorage.
   * @returns The raw settings object or null.
   */
  readSettings(): Settings | null {
    try {
      const jsonString = localStorage.getItem(`${PREFIX}settings`);
      const rawSettings: Settings = JSON.parse(jsonString || '{}');
      return rawSettings;
    } catch (error) {
      // Return null in case of any issues during load.
      return null;
    }
  }

  /**
   * Writes 'settings' to localStorage.
   * @param settings The settings object.
   */
  writeSettings(settings: Settings) {
    const jsonString = JSON.stringify(settings);
    localStorage.setItem(`${PREFIX}settings`, jsonString);
  }

  /**
   * Gets the board favorite IDs from localStorage and triggers an async update of
   * the board favorites.
   * @returns {Promise<Board[]>} A promise of the board favorites.
   */
  @action async getBoardFavorites() {
    const string = localStorage.getItem(`${PREFIX}boardFavorites`);
    try {
      const boards: Board[] = [];
      if (string) {
        const ids = string?.split(',') || [];
        for (const id of ids) {
          boards.push(await this.store.findRecord('board', id));
        }
      }
      this.boardFavorites = boards;
    } catch (error) {
      this.messages.log(
        `Error while attempting to fetch board-favorites: ${error}`,
        { type: 'error', context: this.constructor.name }
      );
      this.boardFavorites = null;
    }
    return this.boardFavorites;
  }

  /**
   * Saves the board favorite IDs to localStorage and triggers an async update of
   * the board favorites.
   */
  @action setBoardFavorites(ids: string[]) {
    // Remove duplicates
    const unqiueIds = [...new Set(ids)];
    localStorage.setItem(`${PREFIX}boardFavorites`, unqiueIds.toString());
    this.messages.log(`${PREFIX}boardFavorites set to: '${unqiueIds}'.`, {
      context: this.constructor.name,
    });
    this.getBoardFavorites();
  }

  /**
   * Gets the saved posts from local storage and fetches their contents from the API.
   * @param options (optional) More options.
   * @returns The saved posts.
   */
  @action async getSavedPosts(options?: { reload?: boolean }) {
    if (!this.savedPosts || this.savedPosts.length === 0 || options?.reload) {
      const string = localStorage.getItem(`${PREFIX}savedPosts`);
      try {
        const posts: Post[] = [];
        if (string) {
          const persistedPosts: PersistedSavedPost[] = JSON.parse(string);
          for (const persistedPost of persistedPosts) {
            posts.push(
              await this.store.findRecord('post', persistedPost.id, {
                adapterOptions: {
                  queryParams: {
                    threadId: persistedPost.threadId,
                  },
                },
              })
            );
          }
        }
        this.savedPosts = posts;
      } catch (error) {
        this.messages.log(
          `Error while attempting to fetch saved posts: ${error}`,
          { type: 'error', context: this.constructor.name }
        );
        this.savedPosts = null;
      }
    }
    return this.savedPosts;
  }

  /**
   * Saves the given posts to localStorage and updates the savedPosts property.
   * @param posts The posts to save.
   */
  @action setSavedPosts(posts: Post[]) {
    const keys: PersistedSavedPost[] = [];
    for (const post of posts) {
      keys.push({ id: post.id, threadId: post.threadId });
    }
    localStorage.setItem(`${PREFIX}savedPosts`, JSON.stringify(keys));
    this.messages.log(
      `${PREFIX}savedPosts set to: '${JSON.stringify(keys)}'.`,
      {
        context: this.constructor.name,
      }
    );
    this.savedPosts = [...posts];
  }

  /**
   * Reads the last encounted app version and returns the current unencounted version
   * if it is higher than the last encounted version.
   */
  getUnencountedVersion() {
    const encounteredVersion = localStorage.getItem(
      `${PREFIX}lastEncountedVersion`
    );
    if (!valid(encounteredVersion)) return undefined;
    if (
      gt(
        clean(ENV.APP['version'] as string) as string,
        clean(encounteredVersion as string) as string
      )
    ) {
      return clean(ENV.APP['version'] as string) as string;
    }
    return undefined;
  }

  /**
   * Sets the last encounted app version to the current app version and stores it.
   */
  setEncounteredVersion() {
    const version = (clean(ENV.APP['version'] as string) as string) || '';
    localStorage.setItem(`${PREFIX}lastEncountedVersion`, version);
    this.messages.log(`${PREFIX}lastEncountedVersion set to: '${version}'.`, {
      context: this.constructor.name,
    });
  }
}
