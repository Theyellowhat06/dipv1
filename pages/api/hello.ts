// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  var method = req.method;
  console.log('body',req.body);
  console.log('param',req.query);
  if(method == 'GET'){
    axios.post('http://localhost:3050/user/login', {username: 'test', password: '123'}).then(response=>{
      res.status(200).json({result: response.data})
    }).catch(err => {
      res.status(200).json({result: err.data})
    })
  }else if(method == 'POST'){

  }else if(method == 'PUT'){

  }
  
  
}
