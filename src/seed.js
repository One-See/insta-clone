import { collection, addDoc } from "firebase/firestore/lite";

export async function seedDatabase(firebase) {
    const users = [
      {
        userId: 'vP0hawmXTcY8KUnvy1TAHIhS2ar1',
        username: 'vamsi',
        fullName: 'vamsi tanakala',
        emailAddress: 'pavanvamsi890@gmail.com',
        following: ['2'],
        followers: ['2', '3', '4'],
        dateCreated: Date.now()
      },
      {
        userId: '2',
        username: 'trump',
        fullName: 'Donald Trump',
        emailAddress: 'donald@trump.com',
        following: [],
        followers: ['vP0hawmXTcY8KUnvy1TAHIhS2ar1'],
        dateCreated: Date.now()
      },
      {
        userId: '3',
        username: 'putin',
        fullName: 'Vladimir Putin',
        emailAddress: 'putin@vlad.com',
        following: [],
        followers: ['vP0hawmXTcY8KUnvy1TAHIhS2ar1'],
        dateCreated: Date.now()
      },
      {
        userId: '4',
        username: 'modi',
        fullName: 'Narendra Modi',
        emailAddress: 'narendra@modi.com',
        following: [],
        followers: ['vP0hawmXTcY8KUnvy1TAHIhS2ar1'],
        dateCreated: Date.now()
      }
    ];
  
    for (let k = 0; k < users.length; k++) {
      await addDoc(collection(firebase, 'users'), users[k]);
    }
  
    for (let i = 1; i <= 5; ++i) {
      await addDoc(collection(firebase, 'photos'),
        {
          photoId: i,
          userId: '2',
          imageSrc: `/src/assets/images/${i}.jpg`,
          caption: `${i+3}th photo I took this day!`,
          likes: [],
          comments: [
            {
              displayName: 'trump',
              comment: 'Love this place, looks like my animal farm!'
            },
            {
              displayName: 'putin',
              comment: 'Would you mind if I used this picture?'
            }
          ],
          userLatitude: '40.7128°',
          userLongitude: '74.0060°',
          dateCreated: Date.now()
        });
    }
  }
  