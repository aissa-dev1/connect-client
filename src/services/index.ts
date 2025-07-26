import { AuthService } from "./auth";
import { BlockService } from "./block";
import { FriendshipService } from "./friendship";
import { MessageService } from "./message";
import { ProfileService } from "./profile";
import { UserService } from "./user";

class Services {
  readonly auth = new AuthService();
  readonly user = new UserService();
  readonly profile = new ProfileService();
  readonly friendship = new FriendshipService();
  readonly block = new BlockService();
  readonly message = new MessageService();
}

const services = new Services();

export { services };
