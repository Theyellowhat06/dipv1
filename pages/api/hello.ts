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
  var method = req.method
  console.log('body',req.body)
  var body = req.body
  var query = req.query
  console.log('param',req.query)
  if(method == 'GET'){
    axios.get(`http://localhost:3050/${query.param}`, {params: query}).then(response=>{
      res.status(200).json({result: response.data})
    }).catch(err => {
      res.status(200).json({result: err.data})
    })
  }else if(method == 'POST'){
    axios.post(`http://localhost:3050/${body.param}`, body).then(response=>{
      res.status(200).json({result: response.data})
    }).catch(err => {
      res.status(200).json({result: err.data})
    })
  }else if(method == 'PUT'){

  }
  
  
}
