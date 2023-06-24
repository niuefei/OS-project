
const data = [];

for (let i = 0; i < 256; i++) {
  const item = {
    number: i,
    nextNumber: null,
    status: 0,
    file: null,
    size: 4,
  };

  data.push(item);
}
export const storage = data