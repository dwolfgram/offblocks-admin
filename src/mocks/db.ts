import { drop, factory, manyOf, oneOf, primaryKey } from '@mswjs/data'

import persist from './persist'
import { NullableProperty } from '@mswjs/data/lib/nullable'

const generateRandomId = () => Math.random().toString().split('.')[1] ?? ''

export const db = factory({
  user: {
    id: primaryKey(generateRandomId),
    email: String,
    password: String,
  },
  account: {
    id: primaryKey(generateRandomId),
    cards: manyOf('card'),
    date_created: Date,
    name: String,
    owner: oneOf('user'),
  },
  transaction: {
    id: primaryKey(generateRandomId),
    account: oneOf('account'),
    amount: String,
    card: oneOf('card'),
    currency: String,
    currency_symbol: String,
    date_confirmed: new NullableProperty(Date),
    date_created: Date,
    merchant_details: {
      name: String,
      category_id: Number,
      category_name: String,
    },
    status: String,
  },
  card: {
    id: primaryKey(generateRandomId),
    brand: String,
    last_4: String,
  },
})

persist(db)

export const dropDB = () => drop(db)
// dropDB()

export const createDummyData = (userId: string) => {
  const user = db.user.findFirst({ where: { id: { equals: userId } } })
  if (!user) {
    return
  }
  const card = db.card.create({
    brand: 'visa',
    last_4: '7291',
  })
  const account = db.account.create({
    cards: [card],
    date_created: Date(),
    name: 'OffBlocks',
    owner: user,
  })
  for (const _ of Array.from({ length: 500 })) {
    const status = Math.random() < 0.5 ? 'confirmed' : 'pending'
    db.transaction.create({
      account,
      amount: (Math.random() * 25 + 25).toFixed(2),
      card,
      currency: 'USD',
      currency_symbol: '$',
      date_confirmed: status === 'confirmed' ? Date() : null,
      date_created: Date(),
      merchant_details: {
        name: 'Uber',
        category_name: 'rideshare',
        category_id: Math.floor(Math.random() * 10) + 1,
      },
      status,
    })
  }
}
