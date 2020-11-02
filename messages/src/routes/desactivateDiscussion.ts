import express, { Request, Response } from 'express';
import {
  DiscussionStatus,
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
} from '@worth-it/common';
import { Discussion } from '../models/discussion';

const router = express.Router();

router.post(
  '/api/discussion/:discussionId',
  requireAuth,
  async (req: Request, res: Response) => {
    const desactivatedDiscussion = await Discussion.findById(
      req.params.discussionId
    );

    if (!desactivatedDiscussion) {
      throw new NotFoundError();
    }

    if (
      req.currentUser!.id !== desactivatedDiscussion.buyerId ||
      req.currentUser!.id !== desactivatedDiscussion.sellerId
    ) {
      throw new NotAuthorizedError();
    }

    desactivatedDiscussion.status = DiscussionStatus.Desactivated;

    await desactivatedDiscussion.save();

    res.send(desactivatedDiscussion);
  }
);

export { router as desactivateDiscussionRouter };
