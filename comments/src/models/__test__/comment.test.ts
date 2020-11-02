import mongoose from 'mongoose';
import { Annonce } from '../annonce';
import { Comment } from '../comment';

it('implements optimistic concurrency control', async (done) => {
  // Create an instance of annonce
  const annonce = Annonce.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: 'Perceuse Bosh 18v en bon état',
  });
  await annonce.save();

  // Create an instance of a comment
  const comment = Comment.build({
    userId: '123',
    annonce,
    text: 'good deal',
    createdAt: new Date(),
  });

  // Save the comment to the database
  await comment.save();

  // fetch the comment twice
  const firstInstance = await Comment.findById(comment.id);
  const secondInstance = await Comment.findById(comment.id);

  // make two separate changes to the comments we fetched
  firstInstance!.set({ text: 'Good Deal' });
  secondInstance!.set({ text: 'Good Deal!!' });

  // save the first fetched comment
  await firstInstance!.save();

  // save the second fetched comment and expect an error
  try {
    await secondInstance!.save();
  } catch (err) {
    return done();
  }

  throw new Error('Should not reach this point');
});

it('increments the version number on multiple saves', async () => {
  const annonce = Annonce.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: 'Perceuse Bosh 18v en bon état',
  });
  await annonce.save();

  const comment = Comment.build({
    userId: '123',
    annonce,
    text: 'good deal',
    createdAt: new Date(),
  });

  await comment.save();
  expect(comment.version).toEqual(0);
  await comment.save();
  expect(comment.version).toEqual(1);
  await comment.save();
  expect(comment.version).toEqual(2);
});
