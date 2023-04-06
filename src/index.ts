import 'dotenv/config';
import axios from 'axios';

const main = async () => {
  try {
    const response = await axios.get(`${process.env.BASE_URL}type/3`, {});
    console.log('result', response.data);
    console.log('done!');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

main();
