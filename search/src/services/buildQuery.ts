import { FilterQuery } from 'mongoose';
import { AnnonceDoc } from '../models/annonce';

export const buildQuery = (criteria: {
  // age: { min: string; max: string };
  title: string;
}) => {
  const query: FilterQuery<AnnonceDoc> = {};

  if (criteria.title) {
    query.$text = { $search: criteria.title };
  }

  // if (criteria.age) {
  //   query.age = {
  //     $gte: criteria.age.min,
  //     $lte: criteria.age.max,
  //   };
  // }

  return query;
};
