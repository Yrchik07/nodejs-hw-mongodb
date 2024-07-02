import { ENV_VARS } from '../constants/index.js';
import { env } from '../utils/env.js';
import { saveFileToLocalMachine } from './saveFileToLocalMachine.js';
import { saveToCloudiary } from './saveToCloudiary.js';
export const saveFile = async (file) => {
    if (!file) return;
  let url;
  if (env(ENV_VARS.IS_CLOUDINARY_ENABLED) === 'true') {
    url = await saveToCloudiary(file);
  } else {
    url = await saveFileToLocalMachine(file);
  }

  return url;
};
