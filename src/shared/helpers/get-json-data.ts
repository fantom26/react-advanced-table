export default async function getJsonData(url: string) {
  const data = await fetch(url, {
    headers: {
      accept: "application/json"
    }
  });

  const json = await data.json();

  return json;
}
