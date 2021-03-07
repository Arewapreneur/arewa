export default function handler(req, res) {
  if (req.method === 'POST') {
    axios.post(
      'https://sandboxapi.fsi.ng/nibss/bvnr/VerifySingleBVN',
      (err, response) => {
        if (error) {
          throw error;
        }
        nibss.Bvnr.VerifySingleBVN({
          bvn: '22285614288',
          sandbox_key: '3c47f1e48aa32425b63f241aba9cf4cf',
          organisation_code: '11111',
          password: "^o'e6EXK5T ~^j2=",
          ivkey: "eRpKTBjdOq6T67D0",
          aes_key: "9+CZaWqfyI/fwezX",
          host: ''
        }).then(result => {
          res.status(200).json({
            result,
            message: "Message sent"
          }).catch(err => {
            res.json(err)
          })
        })
      })
  } else {
    // Handle any other HTTP method
  }
}
