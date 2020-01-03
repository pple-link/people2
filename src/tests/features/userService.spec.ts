import { UserService, UserAccountService } from "../../services";
import { Provider, IsAdmin, Sex, Blood, Job } from "../../models/Enum";
import { connectDatabase } from "../../database";
import { QueryRunner } from "typeorm";
import { User, UserAccount } from "../../models";
let queryRunner: QueryRunner | null = null;

beforeAll(async () => {
  const conn = await connectDatabase();
  queryRunner = conn.createQueryRunner();
  await queryRunner.startTransaction();
});

describe("user service", () => {
  let userAccount: Partial<UserAccount>;
  it("New userAccount", async () => {
    const userAccountService = new UserAccountService();
    userAccount = await userAccountService.getOrNewAccount({
      provider: Provider["KAKAO"],
      clientId: "123"
    });
    expect({
      id: userAccount.id,
      provider: userAccount.provider,
      clientId: userAccount.clientId
    }).toEqual({
      id: userAccount.id,
      provider: Provider.KAKAO,
      clientId: "123"
    });
  });

  it("getOrNew user", async () => {
    const userService = new UserService(new UserAccountService());
    const user: User = await userService.createOrUpdate(
      {
        nickname: "재규",
        name: "이재규",
        birthday: new Date("1995-03-27"),
        profile:
          "https://avatars0.githubusercontent.com/u/31264094?s=400&u=aa1c2297c86fa294929c4c43616e06482d1e99b5&v=4",
        phone: "01099375774",
        email: "tech@pple.link",
        sex: Sex["MALE"],
        blood: Blood["RHPO"],
        job: Job["STUDENT"],
        inflow: "그냥 들어왔어요",
        lastLoginDate: new Date(),
        isAdmin: IsAdmin["ADMIN"]
      },
      userAccount.id!
    );
    delete user.createdAt;
    delete user.updatedAt;
    delete user.lastLoginDate;
    expect(user).toEqual({
      id: user.id,
      nickname: "재규",
      name: "이재규",
      birthday: new Date("1995-03-27"),
      profile:
        "https://avatars0.githubusercontent.com/u/31264094?s=400&u=aa1c2297c86fa294929c4c43616e06482d1e99b5&v=4",
      phone: "01099375774",
      email: "tech@pple.link",
      sex: Sex["MALE"],
      blood: Blood["RHPO"],
      job: Job["STUDENT"],
      inflow: "그냥 들어왔어요",
      isAdmin: IsAdmin["ADMIN"]
    });
  });

  it("get user", async () => {
    const userService = new UserService(new UserAccountService());
    const user = await userService.getByClientId("123");
    delete user!.createdAt;
    delete user!.updatedAt;
    delete user!.lastLoginDate;
    delete user!.userAccount;
    expect(user).toEqual({
      id: user!.id,
      nickname: "재규",
      name: "이재규",
      birthday: "1995-03-27",
      profile:
        "https://avatars0.githubusercontent.com/u/31264094?s=400&u=aa1c2297c86fa294929c4c43616e06482d1e99b5&v=4",
      phone: "01099375774",
      email: "tech@pple.link",
      sex: Sex["MALE"],
      blood: Blood["RHPO"],
      job: Job["STUDENT"],
      inflow: "그냥 들어왔어요",
      isAdmin: IsAdmin["ADMIN"]
    });
  });
});

afterAll(async () => {
  if (queryRunner) {
    await queryRunner.release();
  }
});
