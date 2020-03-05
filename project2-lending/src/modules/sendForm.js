const sendForm = (form) => {
  const errorMessage = 'Что-то пошло не так...',
    loadMessage = 'Загрузка...',
    successMessage = 'Спасибо! Мы скоро с вами свяжемся';

  const statusMessage = document.createElement('div');
  statusMessage.style.cssText = `
    color: #fff;
    font-size: 2rem;`;

  // formValid
  form.addEventListener('input', (e) => {
    const target = e.target;
    if (target.matches('input.form-phone')) {
      target.value = target.value.replace(/[^\+\d)]/, '');
    }
    if (target.matches('input.form-name') || target.matches('input#form2-name') || target.matches('input.mess')) {
      target.value = target.value.replace(/[^а-яё\s]/gi, '');
    }
  });

  const postData = (body) => {
    return fetch('./server.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body
    }
    );
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    form.appendChild(statusMessage);
    statusMessage.textContent = loadMessage;

    const formData = new FormData(form),
      formInputs = form.querySelectorAll('input');

    // let body = {};

    // formData.forEach((val, key) => {
    //   body[key] = val;
    // });

    postData(formData)
      .then(
        (response) => {
          if (response.status !== 200) {
            throw new Error('status network not 200');
          }
          statusMessage.textContent = successMessage;
          formInputs.forEach((item) => {
            item.value = '';
          });
        })
      .catch(
        (error) => {
          statusMessage.textContent = errorMessage;
          console.log(error);
        }
      );

  });

};

export default sendForm;