const toastLiveExample = document.querySelector('#liveToast');

export const createUserApi = async (data) => {
  try {
    const response = await fetch('https://frontend-test.frenet.dev/v1/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.status === 201) {
      document.querySelector('.closeModal').click();
      const toast = new bootstrap.Toast(toastLiveExample);

      toast.show();
    }
  } catch (error) {
    console.error(error);
  }
};

export const editUserApi = async (user, name) => {
  try {
    const response = await fetch(`https://frontend-test.frenet.dev/v1/user/${name}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    // if (response.status === 201) {
    //   document.querySelector('.closeModal').click();
    //   const toast = new bootstrap.Toast(toastLiveExample);

    //   toast.show();
    // }
  } catch (error) {
    console.error(error);
  }
};

export const deleteUserApi = async (name) => {
  console.log(name);
  try {
    const response = await fetch(`https://frontend-test.frenet.dev/v1/user/${name}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // if (response.status === 201) {
    //   document.querySelector('.closeModal').click();
    //   const toast = new bootstrap.Toast(toastLiveExample);

    //   toast.show();
    // }
  } catch (error) {
    console.error(error);
  }
};

export const createQuote = async (newQuote) => {
  try {
    const response = await fetch('https://frontend-test.frenet.dev/v1/quote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newQuote),
    });

    const listQuotes = await response.json();
    return listQuotes;
  } catch (error) {
    console.error(error);
  }
};

export const getUserFormApi = async (username) => {
  try {
    const response = await fetch(`https://frontend-test.frenet.dev/v1/user/${username}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    console.error(error);
  }
};
