## One-to-One relation

### User model with Profile One-to-One relation

```prisma
model User {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  email    String @unique
  password String

  profile Profile?
}

model Profile {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  firstName   String?
  lastName    String?
  displayName String?

  bio         String?
  dateOfBirth String?
  gender      Gender?

  phoneNumber Int?

  // Adding One-to-one relations to profile
  userId Int   @unique
  user   User? @relation(fields: [userId], references: [id])
}

enum Gender {
  MALE
  FEMALE
  OTHER
}
```

<br/>

# Insert

### Insert profile for existing User

```javascript
await prisma.profile.create({
  data: {
    firstName: 'John',
    lastName: 'Doe',
    displayName: 'johnny',
    bio: 'I love coding',
    dateOfBirth: '1990-01-01',
    gender: 'MALE', // assuming 'Gender' is an enum
    phoneNumber: 1234567890,
    user: {
      connect: {
        id: 1, // ID of existing user
      },
    },
  },
});
```

<br/>
###

<br/>

### Insert User alogn with Profile information at once

```javascript
await prisma.user.create({
  data: {
    email: 'jane@example.com',
    password: 'securePassword',
    profile: {
      create: {
        firstName: 'Jane',
        lastName: 'Doe',
        displayName: 'jdoe',
        bio: 'Writer and traveler',
        dateOfBirth: '1985-07-10',
        gender: 'FEMALE',
        phoneNumber: 9876543210,
      },
    },
  },
});
```

<br/>
<br/>
<br/>

# Fetch

### Fetch User information with profile

```javascript
const userWithProfile = await prisma.user.findUnique({
  where: { id: 1 }, // or use email, etc.
  include: {
    profile: true,
  },
});
```

### Fetch users with their profiles

```javascript
const users = await prisma.user.findMany({
  include: {
    profile: true,
  },
});
```

### Fetch with selected properties

```javascript
const user = await prisma.user.findUnique({
  where: { id: 1 },
  select: {
    email: true,
    profile: {
      select: {
        firstName: true,
        displayName: true,
      },
    },
  },
});
```
