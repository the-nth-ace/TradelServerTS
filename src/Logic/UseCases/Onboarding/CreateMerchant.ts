// import { MerchantOnboardingUseCaseArgs } from "Logic/UseCases/Onboarding/TypeChecking";
// import SettingsUserRoleService from "Api/Modules/Client/OnboardingAndAuthentication/Services/SettingsUserRoleService";
// import MerchantService from "Logic/Services/MerchantService";
// import { InternalServerError } from "Api/Modules/Common/Exceptions/InternalServerError";
// import {
//   EMAIL_IN_USE,
//   ROLE_DOES_NOT_EXIST,
//   SUCCESS,
// } from "Api/Modules/Common/Helpers/Messages/SystemMessages";
// import UsersService from "Api/Modules/Client/OnboardingAndAuthentication/Services/UsersService";
// import { BadRequestError } from "Api/Modules/Common/Exceptions/BadRequestError";
// import Event from "Lib/Events";
// import { eventTypes } from "Lib/Events/Listeners/TypeChecking/eventTypes";
// import UserTokensService from "Api/Modules/Client/OnboardingAndAuthentication/Services/UserTokensService";
// import { UserTokenTypesEnum } from "TypeChecking/../../../Api/Modules/Client/OnboardingAndAuthentication/TypeChecking/UserTokens";
// import { generateStringOfLength } from "Utils/generateStringOfLength";
// import { businessConfig } from "Config/businessConfig";
// import { JwtHelper } from "Api/Modules/Common/Helpers/JwtHelper";
//
// export class CreateMerchant {
//   public static async execute(
//     merchantOnboardingArgs: MerchantOnboardingUseCaseArgs
//   ) {
//     const {
//       email,
//       firstName,
//       lastName,
//       password,
//       phoneNumber,
//       storeName,
//       queryRunner,
//     } = merchantOnboardingArgs;
//
//     const foundUser = await UsersService.getUserByEmail(email);
//
//     if (foundUser) throw new BadRequestError(EMAIL_IN_USE);
//
//     const merchantRole =
//       await SettingsUserRoleService.findSettingsUserRoleByName("merchant");
//
//     if (!merchantRole) throw new InternalServerError(ROLE_DOES_NOT_EXIST);
//
//     await queryRunner.startTransaction();
//     try {
//       const user = await UsersService.createUserRecord({
//         firstName,
//         lastName,
//         email,
//         roleId: merchantRole.id,
//         queryRunner,
//         password,
//       });
//
//       await MerchantService.createMerchantRecord({
//         userId: user.id,
//         phoneNumber,
//         storeName,
//         queryRunner,
//       });
//
//       const token = generateStringOfLength(businessConfig.emailTokenLength);
//
//       const otpToken = await UserTokensService.createUserTokenRecord({
//         userId: user.id,
//         queryRunner,
//         expiresOn: UserTokensService.getEmailTokenExpiresOn(),
//         tokenType: UserTokenTypesEnum.EMAIL,
//         token,
//       });
//       await queryRunner.commitTransaction();
//
//       Event.emit(eventTypes.user.signUp, {
//         userEmail: user.email,
//         activationToken: otpToken.token,
//       });
//
//       const accessToken = JwtHelper.signUser(user);
//       return {
//         user: {
//           identifier: user.identifier,
//           email: user.email,
//           first_name: user.firstName,
//           last_name: user.lastName,
//         },
//         access_token: accessToken,
//       };
//     } catch (typeOrmError) {
//       console.error(typeOrmError);
//       await queryRunner.rollbackTransaction();
//       throw new InternalServerError();
//     }
//   }
// }
