const users = [{
  id: 1,
  name: 'Brad',
  schoolId: 805
}, {
  id: 2,
  name: 'Jenny',
  schoolId: 401
}];

const grades = [{
  id: 1,
  schoolId: 805,
  grade: 87
}, {
  id: 2,
  schoolId: 401,
  grade: 99
}, {
  id: 3,
  schoolId: 805,
  grade: 74
}];

const getUser = (id) => {
  return new Promise((resolve, reject) => {
    const user = users.find((user) => user.id === id);

    if (user) {
      resolve(user);
    } else {
      reject(`Unable to find user with id ${id}.`);
    }
  });
};

const getGrades = (schoolId) => {
  return new Promise((resolve, reject) => {
    resolve(grades.filter(grade => grade.schoolId === schoolId));
  });
};

const getStatus = (userId) => {
  let user;
  return getUser(userId).then((tempUser) => {
    user = tempUser;
    return getGrades(user.schoolId);
  }).then((grades) => {
    let average = 0;

    if (grades.length > 0) {
      average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
    }
    return `${user.name} has a ${average}%  in the class.`;
  });
};

const getStatusAlt = async (userId) => {
  const user = await getUser(userId);
  const grades = await getGrades(user.schoolId);
  let average = 0;

  if (grades.length > 0) {
    average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
  }

  return `${user.name} has a ${average}%  in the class.`;
};

getStatusAlt(2).then((status) => {
  console.log(status);
}).catch((e) => {
  console.log(e);
});

// getUser(2).then((user) => {
//   console.log(user);
// }, (e) => {
//   console.log(e);
// });

// getGrades(805).then((grades) => {
//   if (grades) {
//     console.log(grades);
//   } else {
//     console.log('No grades found.');
//   }
// }).catch((e) => {
//   console.log(e);
// });

// getStatus(2).then((status) => {
//   console.log(status);
// }, (e) => {
//   console.log(e);
// });