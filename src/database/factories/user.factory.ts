import * as Faker from "@faker-js/faker";
import { define } from "typeorm-seeding";
import { User } from "../../entities";
import { ROLE, USER_STATUS } from "../../constants";
import config from "../../config";

define(User, (faker: typeof Faker) => {
  const user = new User();
  user.email = config.ADMIN_EMAIL
  user.role = ROLE.ADMIN
  user.active = Boolean(USER_STATUS.ACTIVE)
  user.created_at = new Date()
  user.updated_at = new Date()
  return user;
});
