import express, { Request, Response } from 'express';
import { NotFoundError } from '@worth-it/common';
import { Message } from '../models/message';
import { Annonce } from '../models/annonce';
import { Discussion } from '../models/discussion';

interface DiscussionPerAnnonce {
  annonceId: string;
  annonceTitle: string;
  discussionId: string;
}

const router = express.Router();

router.get(
  '/api/discussion/messages/user',
  async (req: Request, res: Response) => {
    const listDiscussionIds = await Message.find({
      userId: req.currentUser!.id,
    })
      .populate('discussion')
      .distinct('discussion');

    const listDiscussionPerAnnonce: DiscussionPerAnnonce[] = [];

    for (let id of listDiscussionIds) {
      const discussion = await Discussion.findById(id);
      if (discussion) {
        const annonce = await Annonce.findById(discussion.annonceId);
        const discussionPerAnnonce = {
          annonceId: annonce!.id,
          annonceTitle: annonce!.title,
          discussionId: id,
        };
        listDiscussionPerAnnonce.push(discussionPerAnnonce);
      }
    }
    res.send(listDiscussionPerAnnonce);
  }
);

export { router as indexIdAnnonceMessagePerUser };
