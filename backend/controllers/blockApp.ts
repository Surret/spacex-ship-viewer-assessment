import { BlockApp } from '../common/types/backend';
import { AuthScope } from '../config';

const blockApp = async (
  {
    buildVersion,
    deviceBrand,
  }: {
    buildVersion: string;
    deviceBrand: string;
  },
  authScope: AuthScope,
): Promise<BlockApp> => {
  if (Number(buildVersion) < 2 && deviceBrand === 'Apple' && Number(buildVersion) !== 0) {
    return {
      title: 'Update your app',
      message: 'Unfortunately this version is no longer up to date. Please update the app from the App Store.',
    };
  }
  // Block android/other version before build ...
  else if (Number(buildVersion) < 2 && deviceBrand !== 'Apple' && Number(buildVersion) !== 0) {
    return {
      title: 'Update your app',
      message: 'Unfortunately this version is no longer up to date. Please update the app from the Google Play Store.',
    };
  }
  return { title: null, message: null };
};

const blockAppController = {
  blockApp,
};

export { blockAppController };
