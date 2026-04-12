import { TOKEN_TYPE, USER_CLIENT, USER_STATUS } from '@common/enums';
import {
  comparePassword,

  generateToken,

  hashPassword,

} from '@common/utils';
import { TOKEN_TIME } from '@constant/auth';
import {

  MAPPING_ENCRYPT_TOKEN,
  MODEL_AUTH_CONFIRM_PASSWORD_NOT_MATCH,
  MODEL_AUTH_OLD_PASSWORD_INVALID,

} from '@constant/index';
import { TokenRepository } from '@modules/token/repository/token.repository';
import { Users } from '@modules/databases/user.entity';
import { UserRepository } from '@modules/users/repository/users.repository';
import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import * as dayjs from 'dayjs';
import { LogoutDto, UserLoginDto } from './dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { AccessToken, ClientBasic, ICreateToken } from './interfaces';
import { UserRegisterDto } from './dto/register.dto';
import { ERROR_CODE } from '@constant/error-code';
// envConfig no longer required here
import { AdminRepository } from '@modules/admins/repository/admin.repository';
import { CommonServiceService } from '@modules/common-service/common-service.service';
import axios from 'axios';
import {
  OIDC_TOKEN_ENDPOINT,
  OIDC_CLIENT_ID,
  OIDC_CLIENT_SECRET,
  OIDC_REDIRECT_URI,
  OIDC_USERINFO_ENDPOINT,
} from '@configuration/env.config';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenRepository: TokenRepository,
    private readonly userRepository: UserRepository,
    private readonly adminRepository: AdminRepository,
    private readonly commonService: CommonServiceService,
  ) { }

  checkPassword(password: string, hash: string, messageError?: string, errorCode = ERROR_CODE.A007) {
    if (!comparePassword(password, hash)) throw new BadRequestException(errorCode);
    return true;
  }
  async checkAccountExist(email: string, client: USER_CLIENT) {
    let account;
    if (client === USER_CLIENT.USER) {
      account = await this.userRepository.findOneBy({ email, status: USER_STATUS.ACTIVE });
    } else {
      account = await this.adminRepository.findOneBy({ email, status: USER_STATUS.ACTIVE });
    }
    if (!account) throw new BadRequestException(ERROR_CODE.A007);
    return account;
  }


  async login(data: UserLoginDto, platform, client: USER_CLIENT, header: ClientBasic): Promise<AccessToken> {
    const { email, password, remember_me } = data;
    const { domain, device_hash } = header;
    const user = await this.checkAccountExist(email, client);
    this.checkPassword(password, user.password);
    return this.createToken(user.id, client, domain, device_hash, false, remember_me, platform.is_mobile);
  }

  async register(payload: UserRegisterDto, header: ClientBasic): Promise<AccessToken> {
    const { email, password, date_of_birth, first_name, last_name, phone, gender } = payload as any;
    // Simple registration flow: create user if email not already registered.
    const existing = await this.userRepository.findOneBy({ email });
    if (existing) {
      throw new BadRequestException(ERROR_CODE.A007);
    }

    const data: any = {
      email,
      status: USER_STATUS.ACTIVE,
      password: hashPassword(password),
      first_name,
      last_name,
      phone,
      gender,
      date_of_birth,
      country_iso: undefined,
    };
    const newUser = await this.userRepository.createData(data as any);
    const { domain, device_hash } = header;
    return this.createToken(newUser.id, newUser.client, domain, device_hash, false, false);
  }


  async createToken(
    user: number,
    client: USER_CLIENT,
    domain: string,
    device_hash: string,
    ask_change_pwd: boolean = false,
    remember_me: boolean = false,
    is_mobile: boolean = false,
  ) {
    const {
      token,
      expired_at,
      id: token_ref,
    } = await this.generateTokenRecord({
      user,
      client,
      type: TOKEN_TYPE.LOGIN,
      remember_me,
      device_hash,
      is_mobile,
    });
    const { token: refresh_token, expired_at: refresh_token_expired_at } = await this.generateTokenRecord({
      token_ref,
      user,
      type: TOKEN_TYPE.REFRESH_TOKEN,
      remember_me,
      device_hash,
      client,
      is_mobile,
    });

    return {
      token,
      expired_at,
      refresh_token,
      refresh_token_expired_at,
      ask_change_pwd,
    };
  }

  /**
   * tokentype
   */
  async generateTokenRecord(payload: ICreateToken) {
    const { token_ref = null, user, type, remember_me = false, client, device_hash, is_mobile } = payload;
    let time;
    // const time_extend_remember_login = remember_me ? 5 : 0; //14 day
    const time_extend_remember_login = remember_me ? 14 * 24 * 60 : 0; //14 day
    switch (type) {
      case TOKEN_TYPE.LOGIN:
        time = TOKEN_TIME[`${client}_TIME`];
        break;
      case TOKEN_TYPE.REFRESH_TOKEN:
        time = TOKEN_TIME[`${client}_REFRESH`];
        break;
      case TOKEN_TYPE.RECOVER_PASSWORD:
        time = TOKEN_TIME.RECOVER_PASSWORD;
        break;
      case TOKEN_TYPE.DELETE_ACCOUNT:
        time = TOKEN_TIME.DELETE_ACCOUNT;
        break;
      default:
        break;
    }
    const user_id = client === USER_CLIENT.USER ? user : undefined;
    const admin_id = client === USER_CLIENT.ADMIN ? user : undefined;
    const expiresMs = new Date().getTime() + (time + time_extend_remember_login) * 60 * 1000;
    const expired_at = new Date(expiresMs);
    const options: any = {
      token: '',
      token_ref,
      type,
      device_hash,
      options: payload.options || {},
      client,
    };
    if (user_id !== undefined) options.user_id = user_id;
    if (admin_id !== undefined) options.admin_id = admin_id;


    Object.keys(options.options).forEach((key) => {
      !options.options[key] && delete options.options[key];
    });

    let value = {};
    MAPPING_ENCRYPT_TOKEN.forEach((u) => {
      value[u.fieldName] = options[u.fieldMapping];
    });
    Object.keys(value).forEach((key) => {
      !value[key] && delete value[key];
    });
    if (admin_id) {
      value['uid'] = admin_id;
    }

    if (user_id) {
      value['uid'] = user_id;
    }
    const access_token = generateToken(value);
    const savePayload: any = { ...options, expired_at, access_token, client };
    // remove null/undefined fields to satisfy TypeORM typings
    if (savePayload.user_id === undefined) delete savePayload.user_id;
    if (savePayload.admin_id === undefined) delete savePayload.admin_id;
    const { id } = await this.tokenRepository.save(savePayload);

    return {
      id,
      token: access_token,
      expired_at,
    };
  }

  async logOut(payload: LogoutDto) {
    const { access_token } = payload;
    const rs = await this.tokenRepository.checkTokenValid(access_token, [TOKEN_TYPE.LOGIN]);

    await this.tokenRepository.delete({ access_token });
    // await this.tokenRepository.delete({ refresh_token: rs.id });
    return { logout: true };
  }

  async profile(user: Users) {
    return user;
  }

  async updatePassword(id: number, user_id: number, password: string) {
    await this.userRepository.updateOne({ id }, { password: hashPassword(password) });
    await this.tokenRepository.destroyTokenUser(user_id, [TOKEN_TYPE.LOGIN, TOKEN_TYPE.REFRESH_TOKEN]);
  }
  async changePassword(data: ChangePasswordDto, user_id: number) {
    const { password, confirm_password, old_password } = data;
    if (password != confirm_password) throw new BadRequestException(MODEL_AUTH_CONFIRM_PASSWORD_NOT_MATCH);
    if (password === old_password) throw new BadRequestException(ERROR_CODE.CP002);
    const rs = await this.userRepository.findOneBy({ id: user_id });
    // this.checkPassword(old_password, rs.password, MODEL_AUTH_OLD_PASSWORD_INVALID, ERROR_CODE.CP001);
    // await this.updatePassword(rs.id, rs.id, password);
  }

  /**
   * Handle OIDC callback: exchange code for token, get userinfo, create/find local user and return access token
   */
  async handleOidcCallback(code: string, header: ClientBasic): Promise<AccessToken> {
    if (!OIDC_TOKEN_ENDPOINT || !OIDC_USERINFO_ENDPOINT || !OIDC_CLIENT_ID || !OIDC_CLIENT_SECRET) {
      throw new BadRequestException('OIDC not configured');
    }

    // Exchange code for tokens
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', OIDC_REDIRECT_URI);
    params.append('client_id', OIDC_CLIENT_ID);
    params.append('client_secret', OIDC_CLIENT_SECRET);

    const tokenResp = await axios.post(OIDC_TOKEN_ENDPOINT, params.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    const tokenData = tokenResp.data;
    const accessToken = tokenData.access_token;
    if (!accessToken) throw new BadRequestException('Failed to get access_token from OIDC provider');

    // Get userinfo
    const userinfoResp = await axios.get(OIDC_USERINFO_ENDPOINT, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const userinfo = userinfoResp.data;

    // Map userinfo to local user fields
    const email = userinfo.email;
    const first_name = userinfo.given_name || userinfo.first_name || '';
    const last_name = userinfo.family_name || userinfo.last_name || '';
    const sub = userinfo.sub || userinfo.id;

    if (!email) throw new BadRequestException('OIDC provider did not return email');

    // Find or create user
    let user = await this.userRepository.findOneBy({ email });
    if (!user) {
      const newUser: any = {
        email,
        first_name,
        last_name,
        status: USER_STATUS.ACTIVE,
      };
      user = await this.userRepository.createData(newUser as any);
    }

    const { domain, device_hash } = header || { domain: '', device_hash: '' };
    return this.createToken(user.id, USER_CLIENT.USER, domain, device_hash, false, false, false);
  }

}
