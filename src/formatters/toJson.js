function toJson1(data) {
  return JSON.stringify(data);
}

const toJson2 = (data) => toJson1(data);

export default toJson2;
