console.log("Скрипт загружен");

function loadUsers() {
  axios.get('https://jsonplaceholder.typicode.com/users')
    .then(response => {
      console.log("Пользователи загружены:", response.data);
      renderUserList(response.data);
    })
    .catch(error => {
      console.error("Ошибка при загрузке пользователей:", error);
    });
}

function renderUserList(users) {
  const usersList = document.getElementById('usersList');

  if (!usersList) {
    console.error("Элемент usersList не найден");
    return;
  }

  usersList.innerHTML = '';

  users.forEach(user => {
    const li = document.createElement('li');
    const link = document.createElement('a');

    link.href = "#";
    link.textContent = `${user.name} (${user.email})`;
    link.dataset.userId = user.id;

    link.addEventListener('click', (e) => {
      e.preventDefault();
      console.log("Пользователь выбран:", user.name);
      loadUserComments(user.id);
    });

    li.appendChild(link);
    usersList.appendChild(li);
  });
}

function loadUserComments(userId) {
  console.log("Загрузка комментариев для пользователя с ID:", userId);

  axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${userId}`)
    .then(response => {
      console.log("Комментарии загружены:", response.data);
      renderCommentsList(response.data);
    })
    .catch(error => {
      console.error("Ошибка при загрузке комментариев:", error);
    });
}

function renderCommentsList(comments) {
  const commentsList = document.getElementById('commentsList');

  if (!commentsList) {
    console.error("Элемент commentsList не найден");
    return;
  }

  commentsList.innerHTML = '';

  if (comments.length > 0) {
    comments.forEach(comment => {
      const li = document.createElement('li');
      li.textContent = `${comment.name}: ${comment.body}`;
      commentsList.appendChild(li);
    });
  } else {
    commentsList.innerHTML = '<li>Комментарии отсутствуют</li>';
  }
}

loadUsers();
