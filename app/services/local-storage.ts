import { action } from '@ember/object';
import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { Board } from './api/types/board';
import ApiService from 'potber/services/api';
import LoggerService from './logger';

const PREFIX = 'potber-';

export default class LocalStorageService extends Service {
  @service declare api: ApiService;
  @service declare logger: LoggerService;

  @tracked mainNavPosition: string = this.getMainNavPosition();
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
   * Gets 'mainNavPosition' from localStorage.
   * @returns The position of the main nav.
   */
  @action getMainNavPosition() {
    this.mainNavPosition =
      localStorage.getItem(`${PREFIX}mainNavPosition`) || 'bottom';
    return this.mainNavPosition;
  }

  /**
   * Saves 'mainNavPosition' to localStorage.
   * @param value The new value for 'mainNavPosition'.
   */
  @action setMainNavPosition(value: 'top' | 'bottom') {
    localStorage.setItem(`${PREFIX}mainNavPosition`, value);
    this.mainNavPosition = value;
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
      this.logger.log(
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
    this.getBoardFavorites();
  }
}
