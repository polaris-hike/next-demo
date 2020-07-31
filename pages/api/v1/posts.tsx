import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";



const PostsIndex: NextApiHandler = (req, res) => {

  res.statusCode = 200;
  res.json({ name: 'John Doe' })
}

export default PostsIndex;