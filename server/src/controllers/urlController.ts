import { Request, Response } from 'express';

import type { URLDoc } from '~/types/url';

import Url from '@src/models/Url';
import generateUUID from '@src/util/generateUUID';

import logger from '../logger';

interface AuthRequest extends Request {
  context?: {
    userId?: string;
  };
}

export async function list(req: AuthRequest, res: Response) {
  try {
    const userId = `${req.context?.userId}`;

    const urls = await Url.find<URLDoc>({ user_id: userId });

    return res.send(JSON.stringify(urls));
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error);
    }

    return res
      .status(500)
      .send({ error: 'There was an error listing the Urls!' });
  }
}

export async function access(req: AuthRequest, res: Response) {
  try {
    const url = await Url.findOne<URLDoc>({
      short: req.params.shortUrl,
    });

    if (url === null) {
      return res.sendStatus(404);
    }

    url.clicks++;
    url.save();

    return res.json({ url: url.full });
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error);
    }

    return res
      .status(500)
      .send({ error: 'There was an error accessing the Url!' });
  }
}

export async function shorten(req: AuthRequest, res: Response) {
  try {
    const { fullUrl } = req.body;
    const userId = `${req.context?.userId}`;

    const existingURLs = await Url.find<URLDoc>({
      user_id: userId,
    });

    const existingURL = existingURLs.find(urls => urls.full === fullUrl);

    if (existingURL) {
      return res.status(208).send(JSON.stringify(existingURL));
    }

    const uuid = generateUUID(existingURLs.map(urls => urls.short));

    const newURL: URLDoc = await Url.create({
      user_id: userId,
      full: fullUrl,
      short: uuid,
    });

    return res.status(201).send(JSON.stringify(newURL));
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error);
    }

    return res
      .status(500)
      .send({ error: 'There was an error shortening the URL!' });
  }
}

export async function remove(req: AuthRequest, res: Response) {
  try {
    const { shortUrl } = req.params;
    const userId = `${req.context?.userId}`;

    const url = await Url.deleteOne({
      user_id: userId,
      short: shortUrl,
    });

    if (url.deletedCount === 0) {
      return res.sendStatus(404);
    }

    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error);
    }

    return res
      .status(500)
      .send({ error: 'There was an error deleting the URL!' });
  }
}
