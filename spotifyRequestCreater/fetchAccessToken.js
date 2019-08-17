import axios from 'axios';

export default () => {
  return {
    isSuccess: true,
    content:
      'BQBV6BnbG8TkGvHsc7vahyvpNbo4Ce2WDoa2nKTdvcWFROkkFkXZ5tsYfHIepYStnqgv6S8GYuzLB7h8oP4',
  };
};

// export default async () => {
//   try {
//     const clientId = '731ab5d2412b4279bbea3944891ab09f';
//     const clientSecret = '137f5e23e229492097087a2a56ae944c';
//     const params = new URLSearchParams();
//     params.append('grant_type', 'client_credentials');
//     const apiResponse = await axios.post(
//       'https://accounts.spotify.com/api/token',
//       params,
//       {
//         headers: {
//           Authorization: `Basic ${Buffer.from(
//             `${clientId}:${clientSecret}`,
//           ).toString('base64')}`,
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//       },
//     );
//     return {
//       isSuccess: true,
//       content: apiResponse.data.access_token,
//     };
//   } catch (error) {
//     return {
//       isSuccess: false,
//       content: error,
//     };
//   }
// };
