const getCurrencies = async () => {
  const URL = 'https://economia.awesomeapi.com.br/json/all';
  const request = await fetch(URL);
  const requestJson = await request.json();
  return requestJson;
};

export default getCurrencies;
