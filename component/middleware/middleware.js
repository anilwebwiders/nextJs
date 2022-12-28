import jwt from "jsonwebtoken";

const auth = async (req, res) => {
  const token = req.headers.authorization;

  if (!token) return res.status(400).json({ err: "Invalid Authentication." });

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  if (!decoded)
    return res.status(400).json({ err: "Invalid Authentication." });
  else {
    return { validated: true, user_id: decoded?.user_id };
  }
};

export default auth;
