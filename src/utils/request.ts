function request(word: string) {
  const url = `https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=69a96244-dfb7-497b-9447-f92422c8e18d`;
  return fetch(url).then(response => response.json());
  // dictionary api will only return an empty array or an array of similar words if the word doesn't exist
  // check for at least one object in an array and call it good yo
}

export default request;