import { nanoid } from 'nanoid';

function generateUUID(shortUrls: string[], retry = 20) {
  const uuid = nanoid(5);

  if (retry > 0 && shortUrls.includes(uuid)) {
    generateUUID([uuid], retry - 1);
  }

  return uuid;
}

export default generateUUID;
