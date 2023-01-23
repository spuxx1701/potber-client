import { action } from '@ember/object';
import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import ENV from 'potber/config/environment';
import { Board } from './api/types/board';
import ApiService from 'potber/services/api';
import MessagesService from './messages';
import { clean, valid, gt } from 'semver';

const PREFIX = 'potber-';

export default class LocalStorageService extends Service {
  @service declare api: ApiService;
  @service declare messages: MessagesService;

  @tracked avatarStyle: string = this.getAvatarStyle();
  @tracked boxStyle: string = this.getBoxStyle();
  @tracked boardFavorites: Board[] | null = [];

  /**
   * Initializes the localStorage service.
   */
  @action initialize() {
    this.getBoardFavorites();
  }

  /**
   * Gets 'avatarStyle' from localStorage.
   * @returns The way avatars should be displayed.
   */
  @action getAvatarStyle() {
    this.avatarStyle = localStorage.getItem(`${PREFIX}avatarStyle`) || 'none';
    return this.avatarStyle;
  }

  /**
   * Saves 'avatarStyle' to localStorage.
   * @param value The new value for 'avatarStyle'.
   */
  @action setAvatarStyle(value: 'none' | 'small') {
    localStorage.setItem(`${PREFIX}avatarStyle`, `${value}`);
    this.messages.log(`${PREFIX}avatarStyle set to '${value}'.`, {
      context: this.constructor.name,
    });
    this.avatarStyle = value;
  }

  /**
   * Gets 'boxStyle' from localStorage.
   * @returns The general design of the app.
   */
  @action getBoxStyle() {
    this.boxStyle = localStorage.getItem(`${PREFIX}boxStyle`) || 'rect';
    return this.boxStyle;
  }

  /**
   * Saves 'boxStyle' to localStorage.
   * @param value The new value for 'boxStyle'.
   */
  @action setBoxStyle(value: 'rect' | 'round') {
    localStorage.setItem(`${PREFIX}boxStyle`, `${value}`);
    this.messages.log(`${PREFIX}boxStyle set to: '${value}'.`, {
      context: this.constructor.name,
    });
    this.boxStyle = value;
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
          boards.push(await this.api.getBoard(id));
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
