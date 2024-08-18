import Service from '@ember/service';
import { service } from '@ember/service';
import LocalStorageService from './local-storage';
import { tracked } from '@glimmer/tracking';

export interface BlockedUser {
  id: string;
  name: string;
}

export interface Socials {
  blockedUsers: BlockedUser[];
}

export default class SocialsService extends Service implements Socials {
  @service declare localStorage: LocalStorageService;
  @tracked blockedUsers: BlockedUser[] = [];

  load = (): Socials => {
    let socials = this.localStorage.readSocials();
    if (!socials) socials = { blockedUsers: [] };
    this.blockedUsers = socials.blockedUsers;
    return socials;
  };

  save = (): void => {
    console.log(this.blockedUsers);
    this.localStorage.writeSocials({ blockedUsers: this.blockedUsers });
  };

  blockUser = (userId: string, username: string) => {
    if (!this.blockedUsers.find((user) => user.id === userId)) {
      this.blockedUsers = [
        ...this.blockedUsers,
        { id: userId, name: username },
      ];
      this.save();
    }
  };

  unblockUser = (userId: string) => {
    const newArray = [...this.blockedUsers];
    newArray.splice(
      this.blockedUsers.findIndex((user) => user.id === userId),
      1,
    );
    this.blockedUsers = newArray;
    this.save();
  };

  isUserBlocked(userIdOrName: string) {
    return this.blockedUsers.find(
      (user) => user.id === userIdOrName || user.name === userIdOrName,
    )
      ? true
      : false;
  }
}
