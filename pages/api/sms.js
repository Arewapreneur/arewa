export default function handler(req, res) {
  if (req.method === 'POST') {
      axios.post('https://sandboxapi.fsi.ng/atlabs/messaging', (err, response) => {
          if (error) {
            throw error;
          }
          atlabs.SMS.SMSService({
            sandbox_key: "3c47f1e48aa32425b63f241aba9cf4cf",
            payload: {
              to: snapshot.user?.phoneNumber,
              from: "FSI",
              message: "Congratulation, You request are successfully made. We will get back to you soon. Thanks"
            }
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
