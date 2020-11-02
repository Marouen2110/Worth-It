import request from 'supertest';
import { app } from '../../app';

const createAnnonce = () => {
  return request(app)
    .post('/api/annonces')
    .set('Cookie', global.signin())
    .send({
      title: 'visseuse perceuse bosch',
      description:
        'vends visseuse bosch 18v avec 2 batteries, et le chargeur le tout dans un bon etat  et fontionne tres bien.',
      image:
        'https://img6.leboncoin.fr/ad-large/a50fb854ea5aba384fa7d41949ef5ef3e3977281.jpg',
      adress: 'Bobigny (93000)',
      phone: '0607080910',
      price: 130,
      shippingFee: 5,
      voteCount: 0,
    });
};

it('can fetch a list of tickets', async () => {
  await createAnnonce();
  await createAnnonce();
  await createAnnonce();

  const response = await request(app).get('/api/annonces').send().expect(200);

  expect(response.body.length).toEqual(3);
});
