

export default function contentRequest(request)
{
    let client = contentful.createClient(
        {
            space: "bevaw7cnpfpm",
            accessToken: "NZY3bOsXMAdP8kafTHktHbLjN6ssUKtqCNQqjEuq8g8",
        })
    
    client
        .getEntries()
        .then(entry => 
            {
              request(entry.items);
            })
        .catch(err => console.log(err));
}

