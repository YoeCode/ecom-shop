import { v4 as uuid } from 'uuid';
export const fileNamer = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: Function,
) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  if (!file) return callback(new Error('File is empty'), false);

  const fileExtension = file.mimetype.split('/')[1];
  const fileName = `${uuid()}.${fileExtension}`;
  callback(null, fileName);
};
