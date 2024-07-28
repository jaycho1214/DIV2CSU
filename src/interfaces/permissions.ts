import z from 'zod';

export const Permission = z.enum([
  'Admin',
  'Commander',
  'UserAdmin',
  'DeleteUser',
  'VerifyUser',
  'GivePermissionUser',
  'ResetPasswordUser',
  'PointAdmin',
  'ViewPoint',
  'GiveMeritPoint',
  'GiveLargeMeritPoint',
  'GiveDemeritPoint',
  'GiveLargeDemeritPoint',
  'UsePoint',
]);

export type Permission = z.infer<typeof Permission>;
