import { UserService, UserAccountService } from "../../services";
import { Provider, IsAdmin, Sex, Blood, Job } from "../../models/Enum";
import { connectDatabase } from "../../database";
import { QueryRunner } from "typeorm";
import { Container } from "typedi";
import { User, UserAccount } from "../../models";
let queryRunner: QueryRunner | null = null;

beforeAll(async () => {
  const conn = await connectDatabase();
  queryRunner = conn.createQueryRunner();
  await queryRunner.startTransaction();
});

describe("user service", () => {
  it("New userAccount", async () => {
    let userAccount: Partial<UserAccount>;
    const userAccountService = Container.get(UserAccountService);
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
    const userService = Container.get(UserService);
    const user: User = await userService.createOrUpdate(
      {
        nickname: "재규4",
        name: "이재규3",
        birthday: new Date("1995-03-27"),
        profile:
          "https://avatars0.githubusercontent.com/u/31264094?s=400&u=aa1c2297c86fa294929c4c43616e06482d1e99b5&v=4",
        phone: "01199475774",
        email: "p23@pple.link",
        sex: Sex["MALE"],
        blood: Blood["RHPO"],
        job: Job["STUDENT"],
        inflow: "그냥 들어왔어요",
        lastLoginDate: new Date(),
        isAdmin: IsAdmin["ADMIN"]
      },
      "1234952090"
    );
    delete user.createdAt;
    delete user.updatedAt;
    delete user.lastLoginDate;
    expect(user).toEqual({
      id: user.id,
      nickname: "재규4",
      name: "이재규3",
      birthday: new Date("1995-03-27"),
      profile:
        "https://avatars0.githubusercontent.com/u/31264094?s=400&u=aa1c2297c86fa294929c4c43616e06482d1e99b5&v=4",
      phone: "01199475774",
      email: "p23@pple.link",
      sex: Sex["MALE"],
      blood: Blood["RHPO"],
      job: Job["STUDENT"],
      inflow: "그냥 들어왔어요",
      isAdmin: IsAdmin["ADMIN"]
    });
  });

  it("get user", async () => {
    const userAccountService = Container.get(UserAccountService);
    const account = await userAccountService.getByClientId("1234952090");
    delete account.user!.createdAt;
    delete account.user!.updatedAt;
    delete account.user!.lastLoginDate;
    delete account.user!.userAccount;
    expect(account.user).toEqual({
      id: account.user!.id,
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
