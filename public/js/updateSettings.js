// const updateData = async (name, email) => {
//   //console.log(email, password);
//   try {
//     const res = await axios({
//       method: 'PATCH',
//       url: 'http://127.0.0.1:3000/api/v1/users/updateMe',
//       data: {
//         name,
//         email
//       }
//     });

//     if (res.data.status === 'success') {
//       showAlert('success', 'Data update successfully!');
//     }
//   } catch (err) {
//     showAlert('error', err.response.data.message);
//   }
// };
const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? '/api/v1/users/updateMyPassword'
        : '/api/v1/users/updateMe';

    const res = await axios({
      method: 'PATCH',
      url,
      data
    });

    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} update successfully!`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');

// if (userDataForm)
//   userDataForm.addEventListener('submit', e => {
//     e.preventDefault();
//     const name = document.getElementById('name').value;
//     const email = document.getElementById('email').value;
//     updateSettings({ name, email }, 'data');
//   });
if (userDataForm)
  userDataForm.addEventListener('submit', e => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);

    updateSettings(form, 'data');
  });

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async e => {
    e.preventDefault();
    console.log('click password');
    document.querySelector('.btn--save-password').textContent = 'Updating...';
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );

    document.querySelector('.btn--save-password').textContent = 'save';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });

document.querySelector('.nav__el--logout').addEventListener('click', logout);
