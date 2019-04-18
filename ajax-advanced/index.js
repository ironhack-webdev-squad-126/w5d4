const baseURL = 'http://localhost:1337';

document.getElementById('update-form').onsubmit = event => {
  event.preventDefault();
  const name = document.getElementById('name-update').value;
  const occupation = document.getElementById('occupation-update').value;
  const location = document.getElementById('location-update').value;
  const id = document.getElementById('id-update').value;
  axios
    .put(`${baseURL}/superheroes/${id}`, { name, occupation, location })
    .then(response => {
      const { data } = response;
      console.log(data);
    })
    .catch(err => {
      console.error(err);
    });
};

document.getElementById('character-form').onsubmit = event => {
  event.preventDefault();
  const name = document.getElementById('name-input').value;
  const occupation = document.getElementById('occupation-input').value;
  const location = document.getElementById('location-input').value;
  axios
    .post(`${baseURL}/superheroes`, { name, occupation, location })
    .then(response => {
      const { data } = response;
      console.log(data);
      const { id, name, occupation, location } = data;
      const newCharacterHTML = `
      <li id=${id}>
          <p>${id}</p>
          <p>${name}</p>
          <p>${occupation}</p>
          <p>${location}</p>
      </li>
      `;
      document.getElementById('characters-list').innerHTML += newCharacterHTML;
      document.getElementById('character-form').reset();
    })
    .catch(err => {
      console.error(err);
    });
};

const getCharacters = () => {
  axios.get(`${baseURL}/superheroes`).then(response => {
    const { data } = response;
    data.forEach(character => {
      const { id, name, occupation, location } = character;
      const newCharacterHTML = `
        <li id=${id}>
            <p>${id}</p>
            <p>${name}</p>
            <p>${occupation}</p>
            <p>${location}</p>
        </li>
        `;
      document.getElementById('characters-list').innerHTML += newCharacterHTML;
    });
  });
};

getCharacters();
