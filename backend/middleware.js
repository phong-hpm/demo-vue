module.exports = async (req, res, next) => {
  const { nanoid } = await import('nanoid');

  if (req.method === 'POST') {
    req.body = { id: nanoid(), ...req.body };
  }

  next();
};
