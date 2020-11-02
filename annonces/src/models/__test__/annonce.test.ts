import { Annonce } from '../annonce';

it('implements optimistic concurrency control', async (done) => {
  // Create an instance of a ticket
  const annonce = Annonce.build({
    title: 'visseuse perceuse bosch',
    description:
      'vends visseuse bosch 18v avec 2 batteries, et le chargeur le tout dans un bon etat  et fontionne tres bien.',
    image:
      'https://img6.leboncoin.fr/ad-large/a50fb854ea5aba384fa7d41949ef5ef3e3977281.jpg',
    adress: 'Bobigny (93000)',
    phone: '0607080910',
    price: 130,
    shippingFee: 5,
    userId: '123',
    voteCount: 0,
  });

  // Save the ticket to the database
  await annonce.save();

  // fetch the ticket twice
  const firstInstance = await Annonce.findById(annonce.id);
  const secondInstance = await Annonce.findById(annonce.id);

  // make two separate changes to the tickets we fetched
  firstInstance!.set({ price: 110 });
  secondInstance!.set({ price: 150 });

  // save the first fetched ticket
  await firstInstance!.save();

  // save the second fetched ticket and expect an error
  try {
    await secondInstance!.save();
  } catch (err) {
    return done();
  }

  throw new Error('Should not reach this point');
});

it('increments the version number on multiple saves', async () => {
  const annonce = Annonce.build({
    title: 'visseuse perceuse bosch',
    description:
      'vends visseuse bosch 18v avec 2 batteries, et le chargeur le tout dans un bon etat  et fontionne tres bien.',
    image:
      'https://img6.leboncoin.fr/ad-large/a50fb854ea5aba384fa7d41949ef5ef3e3977281.jpg',
    adress: 'Bobigny (93000)',
    phone: '0607080910',
    price: 130,
    shippingFee: 5,
    userId: '123',
    voteCount: 0,
  });

  await annonce.save();
  expect(annonce.version).toEqual(0);
  await annonce.save();
  expect(annonce.version).toEqual(1);
  await annonce.save();
  expect(annonce.version).toEqual(2);
});
